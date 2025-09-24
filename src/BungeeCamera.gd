class_name Bungee_Cam
extends Node2D

@export var PartyLeader: CharacterBody2D

var _PartyLeader: CharacterBody2D

func _ready():
	_PartyLeader = PartyLeader
	pass

func _physics_process(delta: float) -> void:
	var vel: float = pow((self.position.distance_to(_PartyLeader.position)),1.25)
	var dir:= Vector2.from_angle(self.position.angle_to_point(_PartyLeader.position))
	
	var velocity = (vel if vel >= 2 else 0. ) * dir
	self.position += velocity * delta

	return
