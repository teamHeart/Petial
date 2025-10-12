class_name StartScene
extends Node2D

@export var debug_mode: bool = true

@onready var select_panel = $AspectRatioContainer
@onready var select_scene_panel = $PanelContainer2
@onready var scene_list = $PanelContainer2/SceneList
var back_button: Button
var select_scene: Button


func _ready() -> void:
	_Steam.initialize_steam()
	var new_game = find_child("NewGame") as Button
	select_scene = find_child("SelectScene") as Button
	var load_game = find_child("LoadGame") as Button
	back_button = find_child("Back") as Button
	select_scene_panel.visible = false
	select_scene_panel.position = Vector2(1920, 1080)
	select_panel.visible = true
	select_panel.position = Vector2(-1023, 275)

	if debug_mode:
		var debug_label = Label.new()
		debug_label.text = "DEBUG MODE"
		debug_label.modulate = Color.RED
		debug_label.position = Vector2(-500, -300)
		add_child(debug_label)
		select_scene.grab_focus()
		new_game.disabled = true
		load_game.disabled = true
	else:
		select_scene.get_parent().remove_child(select_scene)
		select_scene.queue_free()
		new_game.grab_focus()
	# new_game.
	_populate_scene_list()


func _on_select_scene_button_pressed() -> void:
	select_panel.visible = false
	select_panel.position = Vector2(1920, 1080)
	select_scene_panel.position = Vector2(-400, -200)
	select_scene_panel.visible = true
	back_button.grab_focus()
	if scene_list.get_child_count() > 0:
		scene_list.get_children()[0].grab_focus()


func _on_back_button_pressed() -> void:
	select_panel.visible = true
	select_panel.position = Vector2(-1023, 275)
	select_scene_panel.position = Vector2(1920, 1080)
	select_scene_panel.visible = false
	select_scene.grab_focus()


func _quit_game() -> void:
	get_tree().quit()


func _on_button_pressed() -> void:
	pass  # Replace with function body.


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
	if scenes.size() == 0:
		scenes = ["uid://coteu2wi3o76p", "uid://drr2ei2e86qms"]
	for scene_path in scenes:
		var scene_name = scene_path.get_file().get_basename().capitalize()
		var button: Button = Button.new()
		button.text = scene_name
		button.name = scene_name + "_Button"
		button.connect("pressed", Callable(self, "_on_item_clicked").bind(scene_path))
		button.focus_neighbor_right = back_button.get_path()
		scene_list.add_child(button)
		var button_path := button.get_path()
		if scene_list.get_child_count() == 1:
			back_button.focus_neighbor_left = button_path
	for i in range(scene_list.get_child_count() - 2):
		var current_button = scene_list.get_child(i) as Button
		var next_button = scene_list.get_child(i + 1) as Button
		current_button.focus_neighbor_down = next_button.get_path()
		next_button.focus_neighbor_up = current_button.get_path()


func _on_item_clicked(scene_path: String) -> void:
	var new_scene = ResourceLoader.load(scene_path)
	if new_scene:
		get_tree().change_scene_to_file(scene_path)
	else:
		print("Failed to load scene: " + scene_path.get_basename())
