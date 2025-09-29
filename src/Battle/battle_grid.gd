class_name BattleGrid
extends Node2D

@export var cell_height:= 48
@export var cell_width:= 64
@export var grid_height:= 5
@export var grid_width:= 13

enum Neighbors { UP, RIGHT, DOWN, LEFT }
var grid := []


func _init(grid_size: Vector2i):
	grid_height = grid_size.y
	grid_width = grid_size.x
	grid.clear()
	for y in range(grid_height):
		var row := []
		for x in range(grid_width):
			var cell = BattleCell.new(Vector2i(x,y))
			row.append(cell) # Initialize each cell to null (empty)
			add_child(cell)
		grid.append(row)

func _ready():
	_initialize_grid()

func _initialize_grid():
	# set each cell's neighbors
	for y in range(grid_height):
		for x in range(grid_width):
			var cell = grid[y][x]
			# Set the cell's position
			var parent_grid = get_parent().find_child("GridOverlay") as TileMapLayer
			if parent_grid == null:
				push_error("GridOverlay not found in parent node.")
				continue
			var pivot = Vector2(parent_grid.map_to_local(Vector2i(x, y)).x + parent_grid.position.x, parent_grid.position.y)
			var _skew = parent_grid.transform.get_skew()
			cell.position = pivot + Vector2.DOWN.rotated(_skew)*(y+0.5)*cell_height
			cell.move_range = -1
	#		cell.position = __parent_grid.map_to_local(Vector2i(x, y)) +__parent_grid.position - Vector2((y+0.5)*cell_height*sin((__parent_grid.transform.get_skew())), 0)
			# Set neighbors (up, right, down, left)
			if y > 0:
				cell.neighbors[Neighbors.UP] = grid[y - 1][x]
			if x < grid_width - 1:
				cell.neighbors[Neighbors.RIGHT] = grid[y][x + 1]
			if y < grid_height - 1:
				cell.neighbors[Neighbors.DOWN] = grid[y + 1][x]
			if x > 0:
				cell.neighbors[Neighbors.LEFT] = grid[y][x - 1]

func get_cell(pos: Vector2i) -> BattleCell:
	if pos.y < 0 or pos.y >= grid_height or pos.x < 0 or pos.x >= grid_width:
		return null
	return grid[pos.y][pos.x]
