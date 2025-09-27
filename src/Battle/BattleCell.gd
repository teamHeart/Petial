class_name BattleCell
extends Node2D

## The position of the cell in the grid

var pos: Vector2i
var occupant: Battler = null
var highlighted: bool = false
var highlight_color: Color = Color(1, 1, 0, 0.5) # Yellow highlight by default
var default_color: Color = Color(1, 1, 1, 0) # Transparent by default
var move_range:= 0
var attack_range:= 0


enum Neighbors { UP, RIGHT, DOWN, LEFT }
var neighbors: Array = [null, null, null, null] # UP, RIGHT, DOWN, LEFT

func _init(tpos: Vector2i):
	pos = tpos

func is_occupied() -> bool:
	return occupant != null