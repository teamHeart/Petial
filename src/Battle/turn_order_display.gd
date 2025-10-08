class_name TurnOrderDisplay
extends NinePatchRect

@onready var turn_order_container = $TurnOrderContainer
var display_slots: Array[Sprite2D] = []
var combatants_in_order: Array = []
var prev_order: Array = []

func _ready():
	pass


func _on_battle_manager_turn_order_updated(order: Array) -> void:
	if combatants_in_order == order:
		return # No change in order
	prev_order = combatants_in_order.duplicate()
	combatants_in_order = order.duplicate()
	var change_array = []
	for combatant in combatants_in_order:
		if prev_order.has(combatant):
			change_array.append(prev_order.find(combatant) - combatants_in_order.find(combatant))
		else:
			change_array.append(null) # New combatant added
	print("Change array: ", change_array)

	_update_display(change_array)

func _update_display(_change_array):
	# Clear existing slots
	for slot in display_slots:
		slot.queue_free()
	display_slots.clear()
	# Create new slots based on combatants_in_order
	for i in range(combatants_in_order.size()):
		var combatant = combatants_in_order[i][0]
		var slot = Sprite2D.new()
		if combatant:
			slot.texture = combatant.sprite_frames.get_frame_texture(combatant.animation, 0)
		else:
			slot.texture = null
		if i == 0:
			slot.scale = Vector2(1, 1) # Larger for the next combatant
			slot.position = Vector2(34, 34)
		else:
			slot.scale = Vector2(0.75, 0.75) # Smaller for others
			slot.position = Vector2(26, 40 + (i * 48)) # Adjust spacing as needed
		turn_order_container.add_child(slot)
		display_slots.append(slot)

func move_slot(index: int, change: int) -> void:
	if index < 0 or index >= display_slots.size():
		return
	var slot = display_slots[index]
	var target_y = slot.position.y - (change * 48) # Assuming each slot is 48 pixels apart
	var tween = create_tween()
	tween.tween_property(slot, "position:y", target_y, 0.5).as_relative()

func add_slot(combatant) -> void:
	var slot = Sprite2D.new()
	if combatant:
		slot.texture = combatant.sprite_frames.get_frame_texture(combatant.animation, 0)
	else:
		slot.texture = null
	slot.scale = Vector2(0.75, 0.75)
	slot.position = Vector2(26, 40 + (display_slots.size() * 48)) # Adjust spacing as needed
	turn_order_container.add_child(slot)
	display_slots.append(slot)

func remove_slot(index: int) -> void:
	if index < 0 or index >= display_slots.size():
		return
	var slot = display_slots[index]
	slot.queue_free()
	display_slots.remove_at(index)

func clear_slots() -> void:
	for slot in display_slots:
		slot.queue_free()
	display_slots.clear()

func _on_battle_manager_battle_ended():
	clear_slots()
	combatants_in_order.clear()
	prev_order.clear()

func _on_battle_manager_battle_started():
	clear_slots()
	combatants_in_order.clear()
	prev_order.clear()

