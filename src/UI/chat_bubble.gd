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

static var bubble_on_screen: bool = false

@export var bubble_type: BubbleType = BubbleType.LEFT
@export var full_text: Array[String] = []
@export var character_name: String = ""
@export var character_portrait_texture: Texture2D
@export var _current_text_index: int = 0

var chat_bubble_offscreen_x: int
var chat_bubble_position_y: int
var _text_advance_counter: int = 0
var _text_advance_position: int = 0
var _presenting_state: State = State.new()
var _idle_state: State = State.new()

@onready var state_machine: FiniteStateMachine = $StateMachine
@onready var chat_text = $ChatPanel/HBoxContainer/MarginContainer2/ChatText
@onready var character_portrait = $ChatPanel/HBoxContainer/MarginContainer/CharacterPortrait
@onready var character_nameplate = $ChatPanel/Control/Nameplate/MarginContainer/NameplateName


#region Standard Functions
func _ready() -> void: # ):
	if bubble_on_screen:
		queue_free()
		return
	if full_text.size() == 0:
		queue_free()
		return
	bubble_on_screen = true
	character_nameplate.text = character_name
	if character_portrait_texture:
		character_portrait.texture = character_portrait_texture
	chat_text.text = full_text[_current_text_index]

	_presenting_state._on_enter = _on_enter_presenting_state
	_presenting_state._on_process = _on_process_presenting_state
	_presenting_state._on_exit = _on_exit_presenting_state
	_presenting_state._on_input = _on_input

	_idle_state._on_exit = _on_exit_idle_state
	_idle_state._on_input = _on_input

	_presenting_state.valid_states = [_idle_state]
	_idle_state.valid_states = [_presenting_state]

	state_machine.states.append(_presenting_state)
	state_machine.states.append(_idle_state)

	state_machine.change_state(_presenting_state)

	input_received.connect(_on_input_received)
	fully_displayed.connect(_on_fully_displayed)
	next_message_requested.connect(_on_next_message_requested)
	appeared.connect(_on_appeared)
	disappeared.connect(func() -> void: queue_free())
	chat_bubble_offscreen_x = - get_viewport().get_visible_rect().size.x as int
	chat_bubble_position_y = get_viewport().get_visible_rect().size.y as int
	position = Vector2(chat_bubble_offscreen_x, chat_bubble_position_y)
	appear()

func _process(delta: float) -> void: # ):
	if state_machine.current_state != null:
		state_machine._process(delta)


func _unhandled_input(event: InputEvent) -> void: # ):
	if state_machine.current_state != null:
		state_machine._input(event)


#endregion Standard Functions


#region Signal Processors
func appear() -> void: # ):
	chat_text.visible_characters = 0
	var tween = create_tween().bind_node(self)
	tween.chain().tween_property(self, "position", Vector2(0, chat_bubble_position_y), 0.5)
	tween.tween_callback(func(): emit_signal.call("appeared"))


func disappear() -> void: # ):
	# visible = false
	bubble_on_screen = false
	var tween = create_tween().bind_node(self)
	tween.chain().tween_property(self, "position", Vector2(chat_bubble_offscreen_x, position.y), 0.5)
	tween.tween_callback(func(): emit_signal.call("disappeared"))


func _on_input_received() -> void: # ):
	if state_machine.current_state == _presenting_state:
		emit_signal.call_deferred("fully_displayed")
	else:
		emit_signal.call_deferred("next_message_requested")


func _on_fully_displayed() -> void: # ):
	state_machine.change_state(_idle_state)


func _on_next_message_requested() -> void: # ):
	if full_text.size() == 0:
		disappear()
		return
	if _current_text_index < full_text.size() - 1:
		state_machine.change_state.call_deferred(_presenting_state)
	else:
		disappear()
#endregion Signal Processors


#region State Callbacks
func _on_enter_presenting_state(_prev_state: State) -> void: # ():
	print("Entering Presenting State")
	_text_advance_counter = 0
	_text_advance_position = 0
	chat_text.visible_characters = 0
	chat_text.text = full_text[min(_current_text_index, full_text.size() - 1)]


func _on_process_presenting_state(_delta: float) -> void: # ):
	if _text_advance_position <= full_text[_current_text_index].length():
		if _text_advance_counter == Settings.chat_speed:
			_text_advance_counter = 0
			_text_advance_position += 1
		_text_advance_counter += 1
		chat_text.visible_characters = _text_advance_position
	else:
		emit_signal("fully_displayed")


func _on_exit_presenting_state(_next_state: State) -> void: # ():
	chat_text.visible_characters = -1


func _on_exit_idle_state(_next_state: State) -> void: # ():
	_current_text_index += 1


func _on_input(_event: InputEvent) -> void: # ():
	if Input.is_action_just_pressed("Confirm") or Input.is_action_just_pressed("Cancel"):
		emit_signal("input_received")


func _on_appeared() -> void: # ():
	state_machine.change_state(_presenting_state)
#endregion State Callbacks


#region States
func _ready_appearing_state() -> : State # ():
	var state = State.new()
	state._on_enter = func(_prev_state): # ():
		print("Entering Appearing State")
		chat_text.visible_characters = 0
		var tween = create_tween().bind_node(self)
		tween.chain().tween_property(self, "position", Vector2(0, chat_bubble_position_y), 0.5)
		tween.tween_callback(func(): emit_signal.call("appeared"))

#endregion States