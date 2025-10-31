class_name Debug
extends Node

static var in_debug_mode: bool:
	get:
		return OS.is_debug_build()
	set(_value):
		# Suppress setter as this is read-only
		pass


static func _print(message: Variant) -> void:
	if in_debug_mode:
		print("[DEBUG]: \n", message)
