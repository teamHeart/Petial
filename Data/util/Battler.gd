class_name Battler
extends "res://Data/util/DBElement.gd"

@export var level: int = 1
@export var experience: int = 0
@export var stats: Dictionary = {
	"max_hp": 10,
	"current_hp": 10,
	"attack": 5,
	"defense": 3
}