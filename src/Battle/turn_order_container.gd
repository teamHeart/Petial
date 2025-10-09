class_name TurnOrderContainer
extends VBoxContainer

@export var slots: Array = []
func _ready() -> void:
	for slot in get_children(true):
		slots.append(slot)
		slot.index = slots.size() - 1
	pos()

func pos():
	for i in range(slots.size()):
		if i == 0:
			slots[i].position = Vector2(0, 0)
		else:
			slots[i].position = Vector2(0, slots[i-1].position.y + slots[i-1].size.y)