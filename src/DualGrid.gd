@tool
@icon("res://img/DualGrid.svg")
class_name DualGrid
extends TileMapLayer

@export var pathTileSet: TileSet
@export var PathLayer: TileMapLayer
@onready var pathLayer: TileMapLayer = $PathLayer

func calc():
	for coord: Vector2i in get_used_cells():
		setDisplayTile(coord)
		set_cell(coord, 1, Vector2i(get_cell_atlas_coords(coord).x, 1))


const Neighbors: Array[Vector2i] = [-Vector2i.ONE, Vector2i.UP, Vector2i.LEFT, Vector2i.ZERO]
const corners: Dictionary = {
							Vector4i(0,0,1,0): Vector2i(0,0),
							Vector4i(0,1,0,1): Vector2i(1,0),
							Vector4i(1,0,1,1): Vector2i(2,0),
							Vector4i(0,0,1,1): Vector2i(3,0),

							Vector4i(1,0,0,1): Vector2i(0,1),
							Vector4i(0,1,1,1): Vector2i(1,1),
							Vector4i(1,1,1,1): Vector2i(2,1),
							Vector4i(1,1,1,0): Vector2i(3,1),

							Vector4i(0,1,0,0): Vector2i(0,2),
							Vector4i(1,1,0,0): Vector2i(1,2),
							Vector4i(1,1,0,1): Vector2i(2,2),
							Vector4i(1,0,1,0): Vector2i(3,2),

							Vector4i(0,0,0,0): Vector2i(0,3),
							Vector4i(0,0,0,1): Vector2i(1,3),
							Vector4i(0,1,1,0): Vector2i(2,3),
							Vector4i(1,0,0,0): Vector2i(3,3),
							}



func setDisplayTile(pos):
	for coord: Vector2i in Neighbors:
		var newPos = coord+pos
		var newCell = calculateDisplayTile(newPos)
		PathLayer.set_cell(newPos,0,newCell)
	return

func calculateDisplayTile(pos: Vector2i) -> Vector2i:
	var tl = 1 if getWorldTile(pos+Neighbors[0]) == 1 else 0
	var tR = 1 if getWorldTile(pos+Neighbors[1]) == 1 else 0
	var bl = 1 if getWorldTile(pos+Neighbors[2]) == 1 else 0
	var br = 1 if getWorldTile(pos+Neighbors[3]) == 1 else 0
	return corners[Vector4i(tl,tR,bl,br)]

func getWorldTile(pos: Vector2i) -> int:
	return get_cell_atlas_coords(pos).x

func _process(_delta: float) -> void:
	if Engine.is_editor_hint():
		if get_used_cells().is_empty():
			set_cell(Vector2i.ZERO,1,Vector2i(0,1))
		for cell in get_used_cells():
			if get_cell_tile_data(cell).has_custom_data("Changed") and get_cell_tile_data(cell).get_custom_data("Changed"):
				_on_changed()
				return

func _on_changed() -> void:
	if PathLayer == null:
		return
	PathLayer.tile_set = pathTileSet
	var minX:= 0
	var minY:= 0
	var maxX:= 0
	var maxY:= 0
	for t in get_used_cells():
		if get_cell_tile_data(t) != null and get_cell_tile_data(t).has_custom_data("Changed") and get_cell_tile_data(t).get_custom_data("Changed"):
			minX = min(t.x, minX)
			minY = min(t.y,  minY)
			maxX = max(t.x, maxX)
			maxY = max(t.y, maxY)
	for x in range(minX-1, maxX+2):
		for y in range(minY-1, maxY+2):
			if get_cell_atlas_coords(Vector2i(x,y)).x == -1:
				set_cell(Vector2i(x,y),1,Vector2i(0,1))

	if Engine.is_editor_hint():
		calc()
