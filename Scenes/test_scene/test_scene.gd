class_name TestScene
extends Node2D

## Currently a test scene for camera shake effects.

@onready var sprite: Sprite2D = $Sprite2D
@onready var camera: Camera2D = $Camera2D
@onready var label: Label = $Camera2D/Label
@onready var chat_timer: Timer = $Timer
@onready var button: Button = $Button
@onready var chat_bubble :PackedScene = preload("res://Prefab/chat_bubble.tscn")

@export_range(1.0, 1000.0, 1.0) var camera_shake_intensity = 2.0
@export var shake_timer = 0.0
var original_camera_position = Vector2.ZERO


func _ready():
	camera.enabled = true
	original_camera_position = camera.position
	button.pressed.connect(func() -> void:
		make_bubble()
	)
	chat_timer.timeout.connect(func() -> void:
		make_bubble()
	)
	chat_timer.start()

func make_bubble():
	var bubble_instance = chat_bubble.instantiate()
	Settings.chat_speed = Settings.ChatSpeed.SLOW
	bubble_instance.character_name = "C'laire Rhel is gay"
	bubble_instance.character_portrait_texture = load("res://img/Temp Images/Nature_portraits.png")
	bubble_instance.full_text.push_back("Hello there! This is a test chat bubble.")
	bubble_instance.full_text.push_back("Here's another line of dialogue to display.")
	bubble_instance.full_text.push_back("Camera shake effects are fun, aren't they?")
	bubble_instance.full_text.push_back("We can have multiple lines in a single bubble.\nIsn't that great?")
	bubble_instance.full_text.push_back("This is the final message in this bubble.")
	add_child(bubble_instance)

func _process(delta):
	label.text = (
		"Shake Timer: "
		+ str(snappedf(shake_timer, 0.1))
		+"\nShake Intensity: "
		+ str(camera_shake_intensity)
	)
	if shake_timer > 0.0:
		shake_timer -= delta
		var shake_offset = Vector2.ONE.rotated(randf() * TAU) * log(camera_shake_intensity + 1) * 1
		camera.position = original_camera_position + shake_offset
	else:
		camera.position = original_camera_position
