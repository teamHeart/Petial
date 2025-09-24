@tool
class_name PathOverlayUpdate
extends TileMapLayer
"""
Signal emitted when the path overlay is changed.
"""
signal path_overlay_changed

func _process(_delta: float) -> void:
	if Engine.is_editor_hint():
			emit_signal("path_overlay_changed")
		