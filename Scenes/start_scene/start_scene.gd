extends Node2D

@export var debug_mode: bool = true

@onready var select_panel = $PanelContainer
@onready var select_scene_panel = $PanelContainer2
@onready var item_list = $PanelContainer2/ItemList
@onready var select_scene = $PanelContainer/AspectRatioContainer/VBoxContainer/SelectScene as Button

func _ready() -> void:
	if debug_mode:
		var debug_label = Label.new()
		debug_label.text = "DEBUG MODE"
		debug_label.modulate = Color.RED
		debug_label.position = Vector2(-500, -300)
		add_child(debug_label)
	else:
		select_scene.disabled = true

func _on_select_scene_button_pressed() -> void:
	select_panel.visible = false
	select_scene_panel.visible = true

func _on_back_button_pressed() -> void:
	select_panel.visible = true
	select_scene_panel.visible = false

func _quit_game() -> void:
	get_tree().quit()


func _on_button_pressed() -> void:
	pass # Replace with function body.
