class_name FiniteStateMachine
extends Node

## A simple finite state machine implementation.
## States can be added to the `states` array, and transitions between states are managed.

signal state_changed(new_state)

@export var states: Array[State] = []

var current_state: State = null
var previous_state: State = null


func change_state(new_state: State) -> bool:  #():
	if not new_state or new_state == current_state:
		return false
	if new_state not in states:
		return false
	if current_state and not current_state.can_transition_to(new_state):
		return false
	if current_state:
		current_state.exit()
	previous_state = current_state
	current_state = new_state
	current_state.enter()
	emit_signal("state_changed", current_state)
	return true
