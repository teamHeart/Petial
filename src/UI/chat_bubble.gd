extends Control

signal input_received
signal fully_displayed
signal next_message_requested
signal appeared
signal disappeared

enum BubbleType {
	LEFT,
	RIGHT,
	SYSTEM,
}

@export var bubble_type: BubbleType = BubbleType.LEFT
@export var full_text: Array[String] = []
@export var character_name: String = ""
@export var character_portrait_texture: Texture2D

var chat_bubble_offscreen_x: int:
	get:
		return -get_viewport().get_visible_rect().size.x as int
var _current_text_index: int = -1
var _text_advance_counter: int = 0
var _text_advance_position: int = 0

@onready var state_machine: FiniteStateMachine = $StateMachine
@onready var chat_text = $ChatPanel/HBoxContainer/MarginContainer2/ChatText
@onready var character_portrait = $ChatPanel/HBoxContainer/MarginContainer/CharacterPortrait
@onready var character_nameplate = $ChatPanel/Control/Nameplate/MarginContainer/NameplateName
@onready var _presenting_state: State = state_machine.states[0]
@onready var _idle_state: State = state_machine.states[1]


#region Standard Functions
func _ready() -> void:  # ):
	character_nameplate.text = character_name
	if character_portrait_texture:
		character_portrait.texture = character_portrait_texture
	state_machine.change_state(_presenting_state)
	chat_text.text = full_text[_current_text_index]

	_presenting_state._on_enter = _on_enter_presenting_state
	_presenting_state._on_process = _on_process_presenting_state
	_presenting_state._on_exit = _on_exit_presenting_state
	_presenting_state._on_input = _on_input

	_idle_state._on_input = _on_input

	_presenting_state.valid_states = [_idle_state]
	_idle_state.valid_states = [_presenting_state]

	input_received.connect(_on_input_received)
	fully_displayed.connect(_on_fully_displayed)
	next_message_requested.connect(_on_next_message_requested)
	appeared.connect(func() -> void: state_machine.change_state(_presenting_state))
	disappeared.connect(func() -> void: queue_free())


func _process(delta: float) -> void:  # ):
	if state_machine.current_state != null:
		state_machine._process(delta)


func _input(event: InputEvent) -> void:  # ):
	if state_machine.current_state != null:
		state_machine._input(event)


#endregion Standard Functions


#region Signal Processors
func appear() -> void:  # ):
	var tween = create_tween().bind_node(self)
	tween.chain().tween_property(self, "position", Vector2.ZERO, 0.5)
	tween.tween_callback(emit_signal.call("appeared"))


func disappear() -> void:  # ):
	# visible = false
	var tween = create_tween().bind_node(self)
	tween.chain().tween_property(self, "position", Vector2(chat_bubble_offscreen_x, 0), 0.5)
	tween.tween_callback(emit_signal.call("disappeared"))


func _on_input_received() -> void:  # ):
	if state_machine.current_state == _presenting_state:
		emit_signal("fully_displayed")
	else:
		emit_signal("next_message_requested")


func _on_fully_displayed() -> void:  # ):
	state_machine.change_state(_idle_state)


func _on_next_message_requested() -> void:  # ):
	if full_text.size() == 0:
		disappear()
		return
	if _current_text_index < full_text.size() - 1:
		state_machine.change_state(_presenting_state)
	else:
		disappear()
#endregion Signal Processors


#region State Callbacks
func _on_enter_presenting_state(_prev_state: State) -> void:  # ():
	_text_advance_counter = 0
	_text_advance_position = 0
	chat_text.visible_characters = 0
	_current_text_index += 1
	chat_text.text = full_text[_current_text_index]


func _on_process_presenting_state(_delta: float) -> void:  # ):
	if _text_advance_position < full_text[_current_text_index].length():
		if _text_advance_counter == Settings.chat_speed:
			_text_advance_counter = 0
			_text_advance_position += 1
		_text_advance_counter += 1
		chat_text.visible_characters = _text_advance_position
	else:
		emit_signal("fully_displayed")


func _on_exit_presenting_state(_next_state: State) -> void:  # ():
	chat_text.visible_characters = -1


func _on_input(_event: InputEvent) -> void:  # ():
	if _event.is_action_pressed("Confirm") or _event.is_action_pressed("Cancel"):
		emit_signal("input_received")
#endregion State Callbacks
