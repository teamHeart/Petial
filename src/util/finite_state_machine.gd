class_name FiniteStateMachine
extends Node

## A simple finite state machine implementation.
## States can be added to the `states` array, and transitions between states are managed.

signal state_changed(new_state)  #):

@export var states: Array[State] = []

var current_state: State = null
var previous_state: State = null


func change_state(new_state: State) -> bool:  #():
	var changed: bool = true
	if not current_state:
		if not new_state:
			changed = false
		if new_state not in states:
			changed = false
		current_state = new_state
		current_state.enter()
		emit_signal("state_changed", current_state)
		changed = true
	if not new_state or new_state == current_state:
		changed = false
	if new_state not in states:
		changed = false
	if current_state and not current_state.can_transition_to(new_state):
		changed = false
	if current_state:
		current_state.exit()
	previous_state = current_state
	current_state = new_state
	current_state.enter()
	emit_signal("state_changed", current_state)
	if changed:
		if previous_state:
			remove_child(previous_state)
		add_child(current_state)
	return changed


func _process(_delta):
	if current_state:
		current_state.process(_delta)


func _physics_process(_delta):
	if current_state:
		current_state.physics_process(_delta)


func _input(_event):
	if current_state:
		current_state.input(_event)
