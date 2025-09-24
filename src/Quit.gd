extends Node2D

func _process(delta: float):
    delta = delta
    if Input.is_action_just_released("ui_cancel"):
        get_tree().quit()