class_name BattleGrid
extends Node2D

@extern var cell_height:= 64
@extern var cell_width:= 64
@extern var grid_height:= 5
@extern var grid_width:= 13

var grid := []

func _ready():
	_initialize_grid()

func _initialize_grid():
	grid.clear()
	for y in range(grid_height):
		var row := []
		for x in range(grid_width):
			row.append(BattleCell(Vector2i(x,y))) # Initialize each cell to null (empty)
		grid.append(row)