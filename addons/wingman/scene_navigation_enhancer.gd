class_name SceneNavigationEnhancer extends RefCounted

var base_control: Control = EditorInterface.get_base_control()
var file_system_dock: FileSystemDock = EditorInterface.get_file_system_dock()
var script_editor: ScriptEditor = EditorInterface.get_script_editor()
var editor_selection: EditorSelection = EditorInterface.get_selection()
var scene_selector := OptionButton.new()
var scenes_instantiate = {}

func perform():
	#add Scene selector
	var editor_selector := base_control.get_child(0).get_child(0).get_child(2)
	scene_selector.get_popup().id_pressed.connect(func(idx: int):
		var tree_item = scene_selector.get_item_metadata(idx)
		if tree_item != null:
			if tree_item.has("editor_type") && tree_item["editor_type"].length() > 0:
				EditorInterface.set_main_screen_editor(tree_item["editor_type"])
			EditorInterface.open_scene_from_path(tree_item["path"])
			file_system_dock.navigate_to_path(tree_item["path"])
	)
	scene_selector.add_theme_font_override("font", editor_selector.get_child(0).get_theme_font("font"))
	scene_selector.add_theme_font_size_override("font_size", editor_selector.get_child(0).get_theme_font_size("font_size"))
	scene_selector.get_popup().add_theme_color_override("font_disabled_color", Color.WHITE)
	
	editor_selector.add_child(scene_selector)
	editor_selector.move_child(scene_selector, 0)

	editor_selection.selection_changed.connect(init_scene_selector)
	init_scene_selector()

func init_scene_selector():
	scene_selector.clear()

	var scene_file_tree := get_file_tree("res://", "tscn")
	# tidy_scene_file_tree(scene_file_tree)
	var scenes_info = generate_scenes_info(scene_file_tree)
	
	for i in scenes_info.size():
		var scene_info = scenes_info[i]
		var is_dir = scene_info["type"] == "dir"
		var path = scene_info["path"]
		var title = scene_info["title"]
		var indent = scene_info["indent"]
		var cls = scene_info["class"]
		var editor_type = scene_info["editor_type"] if scene_info.has("editor_type") else ""
		scene_selector.add_icon_item(base_control.get_theme_icon(cls, "EditorIcons"), title)
		scene_selector.get_popup().set_item_indent(i, indent * 2)
		scene_selector.set_item_disabled(i, is_dir)
		scene_selector.set_item_metadata(i, {"path": path, "editor_type": editor_type})
		scene_selector.set_item_tooltip(i, path)

	for i in scene_selector.item_count:
		scene_selector.get_popup().set_item_as_radio_checkable(i, false)

	if EditorInterface.get_edited_scene_root():
		var edited_scene_file = EditorInterface.get_edited_scene_root().scene_file_path
		for i in scenes_info.size():
			if edited_scene_file == scenes_info[i]["path"]:
				scene_selector.selected = i
	else:
		scene_selector.selected = -1

func generate_scenes_info(scene_file_tree: Dictionary) -> Array:
	var scenes_info = []
	var dir_path = scene_file_tree["path"]
	var dir_indent = dir_path.split("/").size() - 3
	var dir_title = dir_path
	if dir_title != "res://":
		dir_title = (dir_title.split("/") as Array).pop_back()
		dir_indent += 1
	scenes_info.push_back({"type": "dir", "path": scene_file_tree["path"], "title": dir_title, "indent": dir_indent, "class": "Folder"})
	
	if scene_file_tree.has("directories"):
		for directory in scene_file_tree["directories"]:
			var directory_path = directory["path"]
			scenes_info.append_array(generate_scenes_info(directory))

	if scene_file_tree.has("files"):
		for file_path in scene_file_tree["files"]:
			var file_indent = file_path.split("/").size() - 2
			if !scenes_instantiate.has(file_path):
				var scene_instance = (ResourceLoader.load(file_path) as PackedScene).instantiate()
				var scene_class = scene_instance.get_class()
				var scene_name = scene_instance.name
				scene_instance.queue_free()
				var editor_type = "3D" if scene_class is Node3D else "2D"
				scenes_instantiate[file_path] = {"title": scene_name, "class": scene_class, "editor_type": editor_type}
			var info = {"type": "file", "path": file_path, "indent": file_indent}.merged(scenes_instantiate[file_path])
			scenes_info.push_back(info)

	return scenes_info

func tidy_scene_file_tree(scene_file_tree: Dictionary):
	scene_file_tree.erase("allFiles")
	for d in scene_file_tree["directories"]:
		tidy_scene_file_tree(d)

func get_file_tree(path: String, includes_ext: Variant = null) -> Dictionary:
	var dir_access = DirAccess.open(path)
	var directories = []
	var files = []
	var all_files = []
	
	dir_access.get_files()
	for dir_name in dir_access.get_directories():
		if dir_name == "addons":
			continue
		var child_dir_path = path.path_join(dir_name)
		var sub_tree = get_file_tree(child_dir_path, includes_ext)
		if sub_tree["allFiles"].size() > 0:
			directories.append(sub_tree)
			for f in sub_tree["allFiles"]:
				all_files.append(f)

	for file_name in dir_access.get_files():
		if file_name.ends_with("." + includes_ext):
			var file_path = path.path_join(file_name)
			files.append(file_path)
			all_files.append(file_path)
	
	return {"path": path, "directories": directories, "files": files, "allFiles": all_files}
