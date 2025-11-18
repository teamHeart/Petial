class_name Battler
extends DBElement

@export var level: int
@export var experience: int
@export var attack: int
@export var defense: int
@export var max_hp: int
@export var speed: int
@export var move_speed: int
@export var exp_curve: Curve = Curve.new()
@export var portraits: Dictionary[String, Texture2D]
@export var skill_list: Array[Skill]
@export var animation: SpriteFrames
@export var turn_order_sprite: Texture2D

func get_exp_to_next_level() -> int:
	var next_level_exp = exp_curve.interpolate_baked(level + 1)
	var current_level_exp = exp_curve.interpolate_baked(level)
	return int(next_level_exp - current_level_exp)