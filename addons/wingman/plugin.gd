@tool
extends EditorPlugin

var inspector_enhancer: InspectorEnhancer = InspectorEnhancer.new()
var scene_navigation_enhancer: SceneNavigationEnhancer = SceneNavigationEnhancer.new()

func _enter_tree() -> void:
	inspector_enhancer.perform()
	scene_navigation_enhancer.perform()

func _exit_tree() -> void:
	pass
