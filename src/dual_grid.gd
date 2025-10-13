@tool
@icon("res://img/DualGrid.svg")
class_name DualGrid
extends TileMapLayer

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

@export var path_tile_set: TileSet

var path_layer: TileMapLayer

func calc():
	for coord: Vector2i in get_used_cells():
		set_display_tile(coord)
		set_cell(coord, 1, Vector2i(get_cell_atlas_coords(coord).x, 1))


func set_display_tile(pos):
	for coord: Vector2i in NEIGHBORS:
		var new_pos = coord + pos
		var new_cell = calculate_display_tile(new_pos)
		path_layer.set_cell(new_pos, 0, new_cell)
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

	if Engine.is_editor_hint():
		calc()
