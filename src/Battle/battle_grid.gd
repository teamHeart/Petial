class_name BattleGrid
extends Node2D

@export var cell_height:= 64
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
			row.append(BattleCell.new(Vector2i(x,y))) # Initialize each cell to null (empty)
		grid.append(row)

func _ready():
	_initialize_grid()

func _initialize_grid():
	# set each cell's neighbors
	for y in range(grid_height):
		for x in range(grid_width):
			var cell = grid[y][x]
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