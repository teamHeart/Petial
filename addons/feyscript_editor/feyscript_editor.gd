@tool
extends EditorPlugin

var editor_panel = preload("res://addons/feyscript_editor/scn/cutscene_editor.tscn")
var editor_instance

func _enable_plugin() -> void:
	# Add autoloads here.
	pass


func _disable_plugin() -> void:
	# Remove autoloads here.
	pass


func _enter_tree() -> void:
	# Initialization of the plugin goes here.
	editor_instance = editor_panel.instantiate()
	add_control_to_dock(EditorPlugin.DOCK_SLOT_RIGHT_UL, editor_instance)
	pass


func _exit_tree() -> void:
	# Clean-up of the plugin goes here.
	remove_control_from_docks(editor_instance)
	remove_control_from_bottom_panel(editor_instance)
	editor_instance.free()
	pass
