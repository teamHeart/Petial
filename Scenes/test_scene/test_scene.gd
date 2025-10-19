class_name TestScene
extends Node2D

## Currently a test scene for camera shake effects.

@onready var sprite: Sprite2D = $Sprite2D
@onready var camera: Camera2D = $Camera2D
@onready var label: Label = $Camera2D/Label
@export_range(1.0, 1000.0, 1.0) var camera_shake_intensity = 2.0
@export var shake_timer = 0.0
var original_camera_position = Vector2.ZERO


func _ready():
	camera.enabled = true
	original_camera_position = camera.position
	shake_timer = 10.0


func _process(delta):
	label.text = (
		"Shake Timer: "
		+ str(snappedf(shake_timer, 0.1))
		+ "\nShake Intensity: "
		+ str(camera_shake_intensity)
	)
	if shake_timer > 0.0:
		shake_timer -= delta
		var shake_offset = Vector2.ONE.rotated(randf() * TAU) * log(camera_shake_intensity + 1) * 1
		camera.position = original_camera_position + shake_offset
	else:
		camera.position = original_camera_position
