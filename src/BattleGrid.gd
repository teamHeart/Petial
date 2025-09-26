class_name BattleGrid
extends Node2D

const BattleCell = preload("res://src/BattleCell.gd")

@export var cell_height:= 64
@export var cell_width:= 64
@export var grid_height:= 5
@export var grid_width:= 13

var grid := []

func _ready():
	_initialize_grid()

func _initialize_grid():
	grid.clear()
	for y in range(grid_height):
		var row := []
		for x in range(grid_width):
			row.append(BattleCell.new(Vector2i(x,y))) # Initialize each cell to null (empty)
		grid.append(row)