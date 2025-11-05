class_name State
extends Node

## A base class for states in a finite state machine.
## Each state can define valid transitions to other states.
## States may either be defined via subclassing or by assigning
## callables to the various lifecycle hooks.

signal state_entered  # ():
signal state_exited  # ():

@export var valid_states: Array[State] = []
var _on_enter: Callable = func(_prev_state: State) -> void: pass
var _on_exit: Callable = func(_next_state: State) -> void: pass
var _on_process: Callable = func(_delta: float) -> void: pass
var _on_physics_process: Callable = func(_delta: float) -> void: pass
var _on_input: Callable = func(_event: InputEvent) -> void: pass
var _on_unhandled_input: Callable = func(_event: InputEvent) -> void: pass


func enter(_prev_state: State):
	_on_enter.call(_prev_state)
	emit_signal("state_entered")


func exit(_next_state: State):
	_on_exit.call(_next_state)
	emit_signal("state_exited")


func process(_delta):
	_on_process.call(_delta)


func physics_process(_delta):
	_on_physics_process.call(_delta)


func input(_event):
	_on_input.call(_event)


func unhandled_input(_event):
	_on_unhandled_input.call(_event)


func can_transition_to(state: State) -> bool:
	if not state:
		return false
	return state in valid_states
