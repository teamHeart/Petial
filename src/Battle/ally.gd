extends Combatant
class_name Ally


func _init():
	pass

func _ready():
	load_from_data(battler)
	if sprite_frames:
		offset = Vector2(0, -sprite_frames.get_frame_texture(animation, frame).get_size().y/2.0)
func load_from_data(data: Battler) -> bool:
	if not data:
		return false
	super.load_from_data(data as Battler)
	return true
	
