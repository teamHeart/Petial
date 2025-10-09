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
	_populate_scene_list()

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

func _populate_scene_list() -> void:
	var scenes := []
	var dir = DirAccess.open("res://Scenes/")
	if dir:
		dir.list_dir_begin()
		var file_name = dir.get_next()
		while file_name != "":
			if file_name.ends_with(".tscn"):
				scenes.append("res://Scenes/" + file_name)
			file_name = dir.get_next()
		dir.list_dir_end()
	print(scenes)
	for scene_path in scenes:
		var scene_name = scene_path.get_file().get_basename().capitalize()
		item_list.add_item(scene_name)
		item_list.set_item_metadata(item_list.get_item_count() - 1, scene_path)

func _on_item_clicked(index: int, _pos, _button) -> void:
	var scene_path = item_list.get_item_metadata(index)
	var new_scene = ResourceLoader.load(scene_path)
	if new_scene:
		get_tree().change_scene_to_file(scene_path)
	else:
		print("Failed to load scene: " + scene_path)
