class_name TurnOrderDisplay
extends NinePatchRect

var display_slots: Array[TurnOrderSlot] = []
var combatants_in_order: Array = []
var prev_order: Array = []
var turn_order_slot: TurnOrderSlot

@onready var turn_order_container = $TurnOrderContainer


func _ready():
	turn_order_container = $TurnOrderContainer
	turn_order_container.slots.clear()
	display_slots.clear()
	combatants_in_order.clear()
	prev_order.clear()


func _on_battle_manager_battle_started(turn_order: Array) -> void:
	combatants_in_order = turn_order.duplicate()
	for i in range(combatants_in_order.size()):
		var slot = ClassDB.instantiate("TurnOrderSlot") as TurnOrderSlot
		if slot:
			slot.combatant = combatants_in_order[i]
			slot.index = i
			turn_order_container.add_child(slot)
			display_slots.append(slot)
		else:
			push_error("Failed to instantiate TurnOrderSlot.")


func _on_battle_manager_turn_order_updated(turn_order: Array) -> void:
	# Implementation for updating the turn order display will go here
	# Remove the front slot to make room for the new turn
	# turn_order_container.slots[0].queue_free()
	combatants_in_order = turn_order.duplicate()
	if display_slots.size() < combatants_in_order.size():
		# Add new slots if there are more combatants
		for i in range(display_slots.size(), combatants_in_order.size()):
			var slot = ClassDB.instantiate("TurnOrderSlot") as TurnOrderSlot
			slot.combatant = combatants_in_order[i - 1]
			turn_order_container.add_child(slot)
			display_slots.append(slot)
	elif display_slots.size() > combatants_in_order.size():
		# Remove excess slots if there are fewer combatants
		for i in range(display_slots.size() - 1, combatants_in_order.size() - 1, -1):
			var slot = display_slots[i]
			slot.queue_free()
			display_slots.remove_at(i)
	#Animate the slots to reflect the new order
	var tween = create_tween().bind_node(display_slots[0])
	(
		tween
		. tween_property(display_slots[0], "custom_minimum_size", Vector2(64, 0), 0.5)
		. set_trans(Tween.TRANS_SINE)
		. set_ease(Tween.EASE_OUT)
	)
	tween.parallel().tween_property(display_slots[0], "size", Vector2.RIGHT, 0.5).set_trans(Tween.TRANS_SINE).set_ease(
		Tween.EASE_OUT
	)
	tween.chain().tween_callback(Callable(self, "pop_front_slot"))
	display_slots[0].index = -1


func pop_front_slot() -> void:
	if display_slots.size() > 0:
		var front_slot = display_slots[0]
		front_slot.queue_free()
		display_slots.remove_at(0)
