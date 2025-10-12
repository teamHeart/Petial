class_name TurnOrderSlot
extends Panel

# var _acc: float = 0

@export var combatant: Combatant
@onready var icon: Sprite2D = $Icon
@export var index: int = 0


func _ready() -> void:
	icon = $Icon
	if combatant:
		icon.texture = combatant.battler.turn_order_sprite
		icon.centered = false


func set_combatant(c: Combatant) -> void:
	if c:
		icon.texture = c.battler.turn_order_sprite
	else:
		icon.texture = null


func clear_slot() -> void:
	icon.texture = null


func _draw() -> void:
	icon.scale = Vector2.ONE * remap(size.y, 32, 64, 0.75, 1.0)


func _process(_delta: float) -> void:
	size.y = max(64 - (0.5 * position.y), 32)
	custom_minimum_size.y = max(64 - (0.5 * position.y), 32)
	# _acc += delta * 128.0
	# position.y = pingpong(_acc, 128)
