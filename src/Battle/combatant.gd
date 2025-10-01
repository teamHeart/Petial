class_name Combatant
extends AnimatedSprite2D

var grid_cell: BattleCell

@export var battler: Battler
@export var occupied_cell_pos: Vector2i
@export_range(1, 5, 1) var move_range: int
@export var attack : int
@export var defense : int
@export var max_hp : int
var current_hp : int
@export var speed : int

@export var skill_list: Array[Skill] = []

var occupied_cell: BattleCell

var _tween: Tween


func _ready():
	load_from_data(battler)
	if sprite_frames:
		offset = Vector2(0, -sprite_frames.get_frame_texture(animation, frame).get_size().y/2.0)
	else:
		offset = Vector2.ZERO
	y_sort_enabled = true
	play(animation)

func load_from_data(data: Battler) -> bool:
	if not data:
		print("Invalid battler data")
		return false
	move_range = data.move_speed
	print("Move range set to ", move_range, " for ", data.name)
	attack = data.attack
	print("Attack set to ", attack, " for ", data.name)
	defense = data.defense
	print("Defense set to ", defense, " for ", data.name)
	max_hp = data.max_hp
	current_hp = max_hp
	print("Max HP set to ", max_hp, " for ", data.name)
	speed = data.speed
	print("Speed set to ", speed, " for ", data.name)
	if data.animation:
		sprite_frames = data.animation
	return true

func move_to_cell(cell: BattleCell):
	if not cell or _tween or cell.is_occupied() or cell.move_range > move_range:
		return
	_tween = create_tween().bind_node(self)
	_tween.set_ease(Tween.EASE_OUT)
	_tween.tween_property(self, "position", cell.position, 0.125)
	_tween.tween_callback(func():
		_tween = null
	)
	_tween.play()
	if occupied_cell:
		occupied_cell.occupant = null
	occupied_cell = cell
	cell.occupant = self
