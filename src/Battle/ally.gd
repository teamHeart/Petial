extends Combatant
class_name Ally


func _init():
	pass

func load_from_data(data: Battler) -> bool:
	if not data or data is not DBAlly:
		return false
	return true
	

