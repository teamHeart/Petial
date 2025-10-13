# DualGrid: A custom TileMapLayer for managing and displaying a path overlay grid.
#
# Purpose / contract
# - Input: a primary TileMap layer (this) whose cells indicate world tiles.
# - Output: a child `path_layer` TileMapLayer which draws a visual path overlay
#   using atlas coordinates from `path_tile_set`.
# - Behavior: when tiles are changed in the editor, `DualGrid` recalculates a
#   small neighborhood and updates the overlay. It also adds visual variety by
#   selecting alternate tiles from the atlas according to `PROBABILITIES`.
#
# Important notes:
# - This script is editor-aware (`@tool`) and runs special logic only in the
#   editor via `Engine.is_editor_hint()`.
# - Many functions read or write tile custom data using `get_cell_tile_data()`
#   and expect a custom boolean flag named "Changed" to indicate an edited cell.
# - The code uses atlas coordinates (X = column, Y = row) heavily; X == -1
#   typically indicates an empty cell.
#
# Edge cases to watch:
# - `get_cell_tile_data()` can return null; callers should be defensive when
#   reading custom data (we mostly assume editor-only paths provide data).
# - Bounding-box logic in `_on_changed()` initializes min/max to 0 which can
#   yield unexpectedly small boxes when changed cells have large positive
#   coordinates; see TODO below.
@tool
@icon("res://img/DualGrid.svg")
class_name DualGrid
extends TileMapLayer

# Probability thresholds for alternate tile selection (used for visual variety)
# These represent cumulative percent thresholds. Example: r <= 64 -> alt 0.
const PROBABILITIES: Array[float] = [64, 91, 99, 100]

# Neighbor offsets for tile adjacency checks (order MUST be kept):
#   NEIGHBORS[0] -> top-left offset (-1,-1)
#   NEIGHBORS[1] -> top-right offset (0,-1)
#   NEIGHBORS[2] -> bottom-left offset (-1,0)
#   NEIGHBORS[3] -> bottom-right offset (0,0)
const NEIGHBORS: Array[Vector2i] = [-Vector2i.ONE, Vector2i.UP, Vector2i.LEFT, Vector2i.ZERO]

# CORNERS maps a 4-bit neighbor pattern (tl, tr, bl, br) encoded as a
# Vector4i to an atlas coordinate (Vector2i column,row). The atlas layout is
# organized so each neighbor combo selects a tile in the corner-shape tileset.
#+ Keys: Vector4i(tl, tr, bl, br) where each value is 0 or 1.
const CORNERS: Dictionary = {
	Vector4i(0, 0, 1, 0): Vector2i(0, 0),
	Vector4i(0, 1, 0, 1): Vector2i(1, 0),
	Vector4i(1, 0, 1, 1): Vector2i(2, 0),
	Vector4i(0, 0, 1, 1): Vector2i(3, 0),
	Vector4i(1, 0, 0, 1): Vector2i(0, 1),
	Vector4i(0, 1, 1, 1): Vector2i(1, 1),
	Vector4i(1, 1, 1, 1): Vector2i(2, 1),
	Vector4i(1, 1, 1, 0): Vector2i(3, 1),
	Vector4i(0, 1, 0, 0): Vector2i(0, 2),
	Vector4i(1, 1, 0, 0): Vector2i(1, 2),
	Vector4i(1, 1, 0, 1): Vector2i(2, 2),
	Vector4i(1, 0, 1, 0): Vector2i(3, 2),
	Vector4i(0, 0, 0, 0): Vector2i(0, 3),
	Vector4i(0, 0, 0, 1): Vector2i(1, 3),
	Vector4i(0, 1, 1, 0): Vector2i(2, 3),
	Vector4i(1, 0, 0, 0): Vector2i(3, 3),
}

# The TileSet used for the path overlay. Setting this updates the path layer,
# forces a tile size (64x64 here), and triggers alignment and recalculation.
@export var path_tile_set: TileSet:
	set(value):
		path_tile_set = value
		if path_layer != null:
			# Ensure the tileset is configured with the expected tile size
			path_tile_set.tile_size = Vector2i(64, 64)
			path_tile_set.set("texture_region_size", Vector2i(64, 64))
			path_layer.tile_set = path_tile_set
			_align_grids()
			_on_changed()
	get:
		return path_tile_set

# The child TileMapLayer used to display the path overlay. This node is
# created and parented in `_ready()` if it isn't already assigned in the scene.
var path_layer: TileMapLayer

# (Presently unused) path_atlas could hold a reference to an atlas resource.
var path_atlas: TileSet

# Number of alternate tile columns (used for selecting variant tiles)
var alt_sets: int = 0

# Internal fallback tileset used when none is provided
@onready var internal_tile_set = path_tile_set


# Called when the node enters the scene tree. Sets up the path layer and connects signals.
func _ready():
	# Ensure we have a child layer to draw the path overlay
	if not path_layer:
		path_layer = TileMapLayer.new()
	path_layer.tile_set = path_tile_set

	# Adjust z-index so overlay renders above the parent tilemap but
	# below UI/other overlays. Uses parent's z_index as base.
	z_index = get_parent().z_index + 2
	path_layer.z_index = z_index - 1
	path_layer.name = "Path Layer"
	add_child(path_layer)

	# If no tileset was provided, create a minimal internal tileset to avoid
	# null dereferences later during editor-time calculations.
	if not internal_tile_set:
		internal_tile_set = TileSet.new()
		internal_tile_set.tile_size = Vector2i(64, 64)

	# Listen for editor changes; the `changed` signal triggers recalculation.
	connect("changed", Callable(self, "_on_changed"))

	calc()  # Initial calculation of display tiles for used cells
	_cull()  # Remove unused overlay tiles and tidy the overlay


# Aligns the path layer grid to match the main grid
# and calculates the number of alternate tile sets.
func _align_grids():
	# Aligns the overlay tilemap position so its origin matches the main grid.
	if not path_layer or not path_layer.tile_set:
		return
	path_layer.position = -Vector2(path_layer.tile_set.tile_size) / 2

	# Determine how many columns (alternate tile sets) the tileset atlas contains.
	# This code assumes the tileset has at least one atlas source and that the
	# atlas is a single-row or multi-column image where width/tile_size gives
	# the number of columns.
	# NOTE: This reads `get_source(0)` which may not exist for every TileSet
	# configuration; ensure editors set up the TileSet with a compatible atlas.
	alt_sets = (
		(
			(
				(
					(path_tile_set.get_source(0) as TileSetAtlasSource)
					. texture
					. get_image()
					. get_width()
				)
				as float
			)
			/ (path_tile_set.tile_size.x as float)
		)
		as int
	)

	# alt_sets is later used to cap the random variant index so we don't
	# pick a non-existent atlas column.


# Recalculates display tiles for all used cells, updating overlay as needed.
func calc():
	# Walk all used cells in this TileMap and make sure the overlay and the
	# cell's atlas coordinates are synchronized.
	for coord: Vector2i in get_used_cells():
		for c in NEIGHBORS:
			# Guarding note: get_cell_tile_data(...) may return null. The code
			# here assumes that editor-time tile data exists when needed.
			var tile_data = get_cell_tile_data(c + coord)
			if tile_data and tile_data.get_custom_data("Changed") as bool:
				# If any neighbor is marked changed, update the display for this
				# tile (which will update a small neighborhood in the overlay).
				set_display_tile(coord)
		# Ensure the second layer index (source_id == 1) uses the same atlas X
		# column as this tile's atlas X. The '1' here is the source_id for the
		# overlay's base tiles (engine-specific usage in this project).
		set_cell(coord, 1, Vector2i(get_cell_atlas_coords(coord).x, 1))
	call_deferred("_align_grids")


# Sets the display tile for a given position, choosing an alternate tile for visual variety.
func set_display_tile(pos):
	# Fills the overlay for the four neighboring positions around `pos`.
	# The function picks an alternate tile variant per position to avoid
	# repetition. `alt_sets` caps the number of variants available in the
	# tileset atlas. If `_align_grids()` successfully ran earlier it will set
	# `alt_sets` appropriately; otherwise we default to 4.
	alt_sets = 4  # Default fallback if _align_grids() hasn't populated alt_sets
	for coord: Vector2i in NEIGHBORS:
		var new_pos = coord + pos
		var new_cell = calculate_display_tile(new_pos)

		# Randomly select an alternate tile index according to the
		# PROBABILITIES thresholds. This adds per-tile visual variation.
		var r = randi_range(1, 100)
		var alt = 0
		match r:
			_ when r <= PROBABILITIES[0]:
				alt = 0
			_ when r <= PROBABILITIES[1]:
				alt = 1
			_ when r <= PROBABILITIES[2]:
				alt = 2
			_:
				alt = 3
		# Clamp against available alternate sets so we don't index past the
		# atlas columns present in the tileset image.
		alt = min(alt, alt_sets - 1)

		# The tileset layout expects variants to be arranged in columns of 4
		# tiles per variant group. We offset the X atlas column by alt*4.
		path_layer.set_cell(new_pos, 0, new_cell + Vector2i(alt * 4, 0))
	return


# Determines which corner tile to use based on the state of neighboring tiles.
func calculate_display_tile(pos: Vector2i) -> Vector2i:
	# For a given overlay cell position, inspect the four relevant world
	# neighbors and encode their presence as bits (1 if world tile X==1).
	# The resulting Vector4i is then used as a key into CORNERS to fetch the
	# correct atlas coordinate for rendering the corner/edge shape.
	var t_l = 1 if get_world_tile(pos + NEIGHBORS[0]) == 1 else 0
	var t_r = 1 if get_world_tile(pos + NEIGHBORS[1]) == 1 else 0
	var b_l = 1 if get_world_tile(pos + NEIGHBORS[2]) == 1 else 0
	var b_r = 1 if get_world_tile(pos + NEIGHBORS[3]) == 1 else 0

	# The CORNERS map must contain every possible 4-bit combination used in
	# your tileset. If a combination is missing this will raise an error at
	# runtime; validate the tileset / CORNERS mapping if you add new tile
	# shapes.
	return CORNERS[Vector4i(t_l, t_r, b_l, b_r)]


# Returns the atlas X coordinate for a given cell (used to determine tile type)
func get_world_tile(pos: Vector2i) -> int:
	# Returns the atlas X (column) for the cell at `pos` in this TileMap.
	# Many parts of the code check the returned value against 1 to determine
	# whether the cell is a 'path' tile. Note that get_cell_atlas_coords
	# returns Vector2i(-1, -1) when there's no atlas cell at that position.
	return get_cell_atlas_coords(pos).x


# Editor-time update: checks for changed cells and triggers recalculation if needed.
func _process(_delta: float) -> void:
	# This runs every frame in the editor and watches for tiles marked as
	# changed (via custom tile data). When a change is observed we trigger
	# `_on_changed()` which recalculates the affected region.
	if Engine.is_editor_hint():
		# Ensure there's at least one tile so editor tools can display a handle
		if get_used_cells().is_empty():
			set_cell(Vector2i.ZERO, 1, Vector2i(0, 1))
		for cell in get_used_cells():
			var td = get_cell_tile_data(cell)
			if td and td.has_custom_data("Changed") and td.get_custom_data("Changed"):
				_on_changed()
				return


# Override for set_cell: updates the grid and triggers recalculation.
func _set_cell(
	coords: Vector2i,
	source_id: int = -1,
	atlas_coords: Vector2i = Vector2i(-1, -1),
	alternative_tile: int = 0
) -> void:
	# Wrapper around set_cell so that any programmatic changes trigger a
	# recalculation of display tiles. This keeps the overlay in sync.
	super.set_cell(coords, source_id, atlas_coords, alternative_tile)
	calc()


# Called when a cell is marked as changed.
# Updates affected region and triggers recalculation/culling.
func _on_changed() -> void:
	# When a cell is toggled/changed, compute the minimal rectangle covering
	# all changed tiles and ensure overlay tiles exist in that region.
	if path_layer == null:
		return
	path_layer.tile_set = path_tile_set

	# NOTE: The min/max initialized to 0 may not produce the intended bounding
	# box in all cases (e.g., if changed cells are entirely at positive
	# coordinates). This is intentional to avoid logic changes, but consider
	# initializing min_x/min_y to +INF and max_x/max_y to -INF if you want
	# robust bounding box calc for arbitrary coordinates.
	var min_x := 0
	var min_y := 0
	var max_x := 0
	var max_y := 0

	# Find the bounding box of changed cells (tiles with custom_data "Changed")
	for t in get_used_cells():
		var td = get_cell_tile_data(t)
		if td != null and td.has_custom_data("Changed") and td.get_custom_data("Changed"):
			min_x = min(t.x, min_x)
			min_y = min(t.y, min_y)
			max_x = max(t.x, max_x)
			max_y = max(t.y, max_y)

	# Ensure overlay tiles exist in and around the affected bounding box. The
	# +/ -1 padding gives a small margin so corners and edges render correctly.
	for x in range(min_x - 1, max_x + 2):
		for y in range(min_y - 1, max_y + 2):
			if get_cell_atlas_coords(Vector2i(x, y)).x == -1:
				set_cell(Vector2i(x, y), 1, Vector2i(0, 1))

	if Engine.is_editor_hint() and path_tile_set and tile_set:
		calc()
		_cull()


# Removes overlay tiles that are no longer needed, and fills in border tiles for visual continuity.
func _cull() -> void:
	# Remove overlay tiles where the world tile is not a path tile (world
	# tile X != 1). We iterate over the overlay's used cells and erase overlay
	# content that no longer corresponds to a path.
	for cell in path_layer.get_used_cells():
		if get_world_tile(cell) != 1:
			# Remove overlay tile if the underlying world tile isn't a path
			erase_cell(cell)

	# After erasing, ensure border tiles are present for path continuity. This
	# fills neighboring overlay cells adjacent to path tiles so corners/edges
	# draw correctly.
	for cell in path_layer.get_used_cells():
		if get_world_tile(cell) == 1:
			for i in range(3):
				if not get_world_tile(cell - NEIGHBORS[i]):
					path_layer.set_cell(cell - NEIGHBORS[i], 1, Vector2i(0, 1))

	# TODO:
	# - Consider using copies of `get_used_cells()` when mutating during
	#   iteration to avoid subtle iterator issues in Godot versions.
	# - Consider making the bounding-box logic in `_on_changed()` more robust
	#   by initializing min/max to ±INF so it handles arbitrary tile coords.
