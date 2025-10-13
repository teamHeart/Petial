@tool
@icon("res://img/DualGrid.svg")
class_name DualGrid
extends TileMapLayer

const PROBABILITIES: Array[float] = [64, 91, 99, 100]

const NEIGHBORS: Array[Vector2i] = [-Vector2i.ONE, Vector2i.UP, Vector2i.LEFT, Vector2i.ZERO]
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

@export var path_tile_set: TileSet:
	set(value):
		path_tile_set = value
		if path_layer != null:
			path_tile_set.tile_size = Vector2i(64, 64)
			path_tile_set.set("texture_region_size", Vector2i(64, 64))
			path_layer.tile_set = path_tile_set
			_align_grids()
			_on_changed()
	get:
		return path_tile_set

var path_layer: TileMapLayer
var path_atlas: TileSet
var alt_sets: int = 0

@onready var internal_tile_set = path_tile_set


func _ready():
	if not path_layer:
		path_layer = TileMapLayer.new()
	path_layer.tile_set = path_tile_set
	z_index = get_parent().z_index + 2
	path_layer.z_index = z_index - 1
	path_layer.name = "Path Layer"
	add_child(path_layer)
	if not internal_tile_set:
		internal_tile_set = TileSet.new()
		internal_tile_set.tile_size = Vector2i(64, 64)
	connect("changed", Callable(self, "_on_changed"))
	calc()
	_cull()


func _align_grids():
	if not path_layer or not path_layer.tile_set:
		return
	path_layer.position = -Vector2(path_layer.tile_set.tile_size) / 2
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


func calc():
	for coord: Vector2i in get_used_cells():
		for c in NEIGHBORS:
			if get_cell_tile_data((c + coord)).get_custom_data("Changed") as bool:
				set_display_tile(coord)
		set_cell(
			coord,
			1,
			Vector2i(get_cell_atlas_coords(coord).x, 1)
		)
	call_deferred("_align_grids")


func set_display_tile(pos):
	alt_sets = 4
	for coord: Vector2i in NEIGHBORS:
		var new_pos = coord + pos
		var new_cell = calculate_display_tile(new_pos)
		
		# choose alt tile
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
		alt = min(alt, alt_sets - 1)
		# alt = 0
		path_layer.set_cell(new_pos, 0, new_cell + Vector2i(alt * 4, 0))
	return


func calculate_display_tile(pos: Vector2i) -> Vector2i:
	var t_l = 1 if get_world_tile(pos + NEIGHBORS[0]) == 1 else 0
	var t_r = 1 if get_world_tile(pos + NEIGHBORS[1]) == 1 else 0
	var b_l = 1 if get_world_tile(pos + NEIGHBORS[2]) == 1 else 0
	var b_r = 1 if get_world_tile(pos + NEIGHBORS[3]) == 1 else 0
	return CORNERS[Vector4i(t_l, t_r, b_l, b_r)]


func get_world_tile(pos: Vector2i) -> int:
	return get_cell_atlas_coords(pos).x


func _process(_delta: float) -> void:
	if Engine.is_editor_hint():
		if get_used_cells().is_empty():
			set_cell(Vector2i.ZERO, 1, Vector2i(0, 1))
		for cell in get_used_cells():
			if (
				get_cell_tile_data(cell).has_custom_data("Changed")
				and get_cell_tile_data(cell).get_custom_data("Changed")
			):
				_on_changed()
				return


func _set_cell(
	coords: Vector2i,
	source_id: int = -1,
	atlas_coords: Vector2i = Vector2i(-1, -1),
	alternative_tile: int = 0
) -> void:
	super.set_cell(coords, source_id, atlas_coords, alternative_tile)
	calc()


func _on_changed() -> void:
	if path_layer == null:
		return
	path_layer.tile_set = path_tile_set
	var min_x := 0
	var min_y := 0
	var max_x := 0
	var max_y := 0
	for t in get_used_cells():
		if (
			get_cell_tile_data(t) != null
			and get_cell_tile_data(t).has_custom_data("Changed")
			and get_cell_tile_data(t).get_custom_data("Changed")
		):
			min_x = min(t.x, min_x)
			min_y = min(t.y, min_y)
			max_x = max(t.x, max_x)
			max_y = max(t.y, max_y)
	for x in range(min_x - 1, max_x + 2):
		for y in range(min_y - 1, max_y + 2):
			if get_cell_atlas_coords(Vector2i(x, y)).x == -1:
				set_cell(Vector2i(x, y), 1, Vector2i(0, 1))

	if Engine.is_editor_hint() and path_tile_set and tile_set:
		calc()
		_cull()


func _cull() -> void:
	for cell in path_layer.get_used_cells():
		if get_world_tile(cell) != 1:
			# path_layer.erase_cell(cell)
			erase_cell(cell)
	for cell in path_layer.get_used_cells():
		if get_world_tile(cell) == 1:
			for i in range(3):
				if not get_world_tile(cell - NEIGHBORS[i]):
					path_layer.set_cell(cell - NEIGHBORS[i], 1, Vector2i(0, 1))
