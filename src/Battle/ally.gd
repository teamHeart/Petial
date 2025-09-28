extends Combatant
class_name Ally

func _init(data: DBAlly):
	load_from_data(data)
	super._init(data)

func load_from_data(data: Battler) -> bool:
	if not data:
		return false
	return true