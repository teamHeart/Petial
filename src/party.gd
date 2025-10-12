class_name Party
extends Node

static var speed: float

@export var leader: PlayerMovementController
@export var follow1: PartyFollower
@export var follow2: PartyFollower

@export_range(0.5, 2.0, 0.01) var springyness := 1.0
@export_range(50., 500., 10., "or_greater", "or_less") var walk_speed := 200.
@export_range(10, 200, 1) var social_distancing := 69
@export_range(10., 500000., 1.) var repulsion_force := 100.


# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	speed = walk_speed
	follow1.springyness = springyness
	follow2.springyness = springyness
	follow1._leader = leader
	follow2._leader = leader
	follow1.social_distancing = social_distancing
	follow2.social_distancing = social_distancing
	follow1._follow = follow2
	follow1._follow._follow = follow1


# Called every frame. 'delta' is the elapsed time since the previous frame.


func _process(_delta: float) -> void:
	if leader.velocity.length() > 50.:
		follow1.springyness += randf_range(-0.03, 0.03)
		follow2.springyness += randf_range(-0.03, 0.03)
		follow1.springyness = clamp(follow1.springyness, 1.2, 1.5)
		follow2.springyness = clamp(follow2.springyness, 1.2, 1.5)

	speed = walk_speed * (1.5 if Input.is_action_pressed("Sprint") else 1.)

	leader.speed = speed
	follow1.speed = speed
	follow2.speed = speed
