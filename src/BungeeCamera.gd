class_name BungeeCam
extends Node2D

@export var party_leader: CharacterBody2D

var _party_leader: CharacterBody2D


func _ready():
	_party_leader = party_leader


func _physics_process(delta: float) -> void:
	var vel: float = pow(self.position.distance_to(_party_leader.position), 1.25)
	var dir := Vector2.from_angle(self.position.angle_to_point(_party_leader.position))

	var velocity = (vel if vel >= 2 else 0.) * dir
	self.position += velocity * delta

	return
