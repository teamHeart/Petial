extends Sprite2D

func _on_blink(intensity: float) -> void:
	material.set_shader_parameter("blink_intensity", intensity)

func _on_button_pressed() -> void:
	var tween := create_tween()
	tween.tween_method(_on_blink, 1.0, 0.0, 0.5)