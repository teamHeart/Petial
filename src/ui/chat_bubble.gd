class_name ChatBubble
extends PanelContainer
## A text box that displays character dialogue with an optional character portrait.[br]
## It supports text wrapping and dynamic resizing based on content.[br]
## Supports BBCode for text formatting.

@warning_ignore("UNUSED_SIGNAL")
signal next_pressed()

var _fsm: FiniteStateMachine


class Processing extends State:
	_on_enter = func(_prev_state: State) -> void:
		pass