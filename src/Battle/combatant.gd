class_name Combatant
extends AnimatedSprite2D

@export var battler: Battler
@export var occupied_cell_pos: Vector2i
@export_range(1, 6, 1) var move_range: int
@export var attack: int
@export var defense: int
@export var max_hp: int
@export var speed: int
@export var skill_list: Array[Skill] = []


var current_hp: int
var turn_timer: float = 0.0
var turn_counter: int = 0
var predicted_turn_timer: float = 0.0
var is_dead: bool = false
var occupied_cell: BattleCell
var _tween: Tween


func _ready():
	load_from_data(battler)
	if sprite_frames:
		offset = Vector2(0, -sprite_frames.get_frame_texture(animation, frame).get_size().y / 2.0)
	else:
		offset = Vector2.ZERO
	z_index = occupied_cell_pos.y + 1000  # Ensure drawn above grid
	play(animation)
	turn_timer = 1.0 / sqrt(speed)


func load_from_data(data: Battler) -> bool:
	if not data:
		# print("Invalid battler data")
		return false
	move_range = data.move_speed
	# print("Move range set to ", move_range, " for ", data.name)
	attack = data.attack
	# print("Attack set to ", attack, " for ", data.name)
	defense = data.defense
	# print("Defense set to ", defense, " for ", data.name)
	max_hp = data.max_hp
	current_hp = max_hp
	# print("Max HP set to ", max_hp, " for ", data.name)
	speed = data.speed
	# print("Speed set to ", speed, " for ", data.name)
	if data.animation:
		sprite_frames = data.animation
	return true


func move_to_cell(cell: BattleCell):
	if not cell or _tween or cell.is_occupied() or cell.move_range > move_range:
		return
	_tween = create_tween().bind_node(self)
	(
		_tween
		. tween_property(self, "position", cell.position, 0.125)
		. set_trans(Tween.TRANS_SINE)
		. set_ease(Tween.EASE_OUT)
	)
	_tween.tween_callback(func(): _tween = null)
	_tween.play()
	if occupied_cell:
		occupied_cell.occupant = null
	occupied_cell = cell
	cell.occupant = self
	z_index = occupied_cell.pos.y + 1000  # Ensure drawn above grid
