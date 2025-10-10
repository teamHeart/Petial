class_name State
extends Node

## A base class for states in a finite state machine.
## Each state can define valid transitions to other states.

@export var valid_states: Array[State] = []

signal state_entered()#():
signal state_exited()#():

func enter():
	emit_signal("state_entered")
	pass

func exit():
	emit_signal("state_exited")
	pass

func process(_delta):
	pass

func physics_process(_delta):
	pass

func input (_event):
	pass

func can_transition_to(state: State) -> bool:
	if not state:
		return false
	return state in valid_states
