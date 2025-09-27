extends Sprite2D
class_name Combatant

var grid_cell: BattleCell


func _init():
	pass

func _init(data: Battler):
	load_from_data(data)

func load_from_data(data: Battler) -> bool:
	if not data:
		return false
	return true