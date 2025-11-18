class_name TestScene
extends Node2D

## Currently a test scene for camera shake effects.

@onready var sprite: Sprite2D = $Sprite2D
@onready var chat_timer: Timer = $Timer
@onready var button: Button = $Button
@onready var chat_bubble = preload("res://Prefab/chat_bubble.tscn")

@export_range(1.0, 1000.0, 1.0) var camera_shake_intensity = 2.0
@export var shake_timer = 0.0
var original_camera_position = Vector2.ZERO
var start_time
var stop_time


func _ready():
	button.pressed.connect(func() -> void: make_bubble())
	chat_timer.timeout.connect(func() -> void: make_bubble())
	# chat_timer.start()


func make_bubble():
	# var bb = ChatBubble.new()
	# add_child(bb)
	# bb.set_character_name("Nature Spirit")
	# bb.set_portrait_texture(load("res://img/Temp Images/Nature_portraits.png"))
	var bubble_instance = chat_bubble.instantiate()
	bubble_instance.bubble_type = ChatBubble.BubbleType.LEFT
	bubble_instance.full_text.push_back("Hello there! This is a test chat bubble.")
	bubble_instance.full_text.push_back("Here's another line of dialogue to display.")
	bubble_instance.full_text.push_back("Camera shake effects are fun, aren't they?")
	bubble_instance.full_text.push_back("We can have multiple lines in a single bubble.[br]Isn't that great?")
	bubble_instance.full_text.push_back(
		"Want fun text effects? [rainbow freq=1.0 sat=0.8 val=0.8 speed=1.0]We can add those too![/rainbow]"
	)
	bubble_instance.full_text.push_back("We can even have [OoOoOo]custom effects[/OoOoOo] applied to the text! Just tell Claire what you want and she will do her best to make it!❤")

	bubble_instance.full_text.push_back("This is the final message in this bubble.")
	add_child(bubble_instance)
	bubble_instance.connect("appeared", func(): start_time = Time.get_ticks_msec())
	bubble_instance.connect(
		"fully_displayed",
		func():
			stop_time = Time.get_ticks_msec()
			print("Time to display full text: %d ms" % (stop_time - start_time))
	)
	bubble_instance.chat_text.install_effect(OoOoOo.new())
	bubble_instance.set_character_name("Nature Spirit")
	bubble_instance.set_portrait_texture(load("res://img/Temp Images/Nature_portraits.png"))

func _unhandled_input(event: InputEvent) -> void:
	if Input.is_action_just_pressed_by_event("Cancel", event):
		get_tree().quit()
