class_name Ally
extends Combatant


func _init():
	pass


func _ready():
	load_from_data(battler)
	if sprite_frames:
		offset = Vector2(0, -sprite_frames.get_frame_texture(animation, frame).get_size().y / 2.0)


## Loads data from a Battler instance into this Ally.
## @param data: Battler - The battler data to load.
## @return bool - True if data was loaded successfully, false otherwise.
func load_from_data(data: Battler) -> bool:
	if not data:
		return false
	super.load_from_data(data)
	return true
