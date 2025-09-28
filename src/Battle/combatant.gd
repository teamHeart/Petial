class_name Combatant
extends Sprite2D

var grid_cell: BattleCell

@export var battler: Battler

func _init(data: Battler):
	load_from_data(data)

func load_from_data(data: Battler) -> bool:
	if not data:
		return false
	return true