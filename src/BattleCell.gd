class_name BattleCell
extends Node2D

## The position of the cell in the grid

var position: Vector2i
var occupied: bool = false
var highlighted: bool = false
var highlight_color: Color = Color(1, 1, 0, 0.5) # Yellow highlight by default
var default_color: Color = Color(1, 1, 1, 0) # Transparent by default
var move_range:= 0
var attack_range:= 0

func _init(pos: Vector2i):
	position = pos