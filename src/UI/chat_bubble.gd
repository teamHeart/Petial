extends Control

#region Declarations
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
@export_placeholder("This is some text. [wave]WwwoooOOoOooOOoooOoo![/wave]") var full_text: Array[String]
@export_placeholder("Character Name") var character_name: String
@export var character_portrait_texture: Texture2D
@export var _current_text_index: int = 0
@export var chat_speed: Settings.ChatSpeed:
	set(value):
		Settings.chat_speed = value
	get:
		return Settings.chat_speed

var chat_bubble_offscreen_x: int
var chat_bubble_position_y: int
var blink_tween: Tween = null
var _text_advance_counter: int = 0
var _text_advance_position: int = 0
var _appearing_state : State = State.new()
var _disappearing_state: State = State.new()
var _presenting_state: State = State.new()
var _idle_state: State = State.new()
var _tween: Tween = null

@onready var state_machine: FiniteStateMachine = $StateMachine
@onready var chat_text = $ChatPanel/HBoxContainer/MarginContainer2/ChatText
@onready var character_portrait = $ChatPanel/HBoxContainer/MarginContainer/CharacterPortrait
@onready var character_nameplate = $ChatPanel/Control/Nameplate/MarginContainer/NameplateName
@onready var finished_indicator = $ChatPanel/HBoxContainer/MarginContainer2/ChatText/FinishedIndicator
#endregion Declarations


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

	configure_states()

	# chat_bubble_offscreen_x = - get_viewport().get_visible_rect().size.x as int
	# chat_bubble_position_y = get_viewport().get_visible_rect().size.y as int
	position = Vector2(chat_bubble_offscreen_x, chat_bubble_position_y)
	finished_indicator.visible = false

	appeared.connect(_on_appeared)
	disappeared.connect(_on_disappeared)
	next_message_requested.connect(_on_next_message_requested)
	fully_displayed.connect(_on_fully_displayed)
	input_received.connect(_on_input_received)


func _process(delta: float) -> void: # ):
	if state_machine.current_state != null:
		state_machine._process(delta)


func _unhandled_input(event: InputEvent) -> void: # ):
	if state_machine.current_state != null:
		state_machine._input(event)


#endregion Standard Functions


#region Signal Processors
func _on_appeared() -> void:
	state_machine.change_state(_presenting_state)

func _on_disappeared() -> void:
	print("Chat bubble disappeared from screen.")
	queue_free()

func _on_next_message_requested() -> void:
	_current_text_index += 1
	if _current_text_index < full_text.size():
		chat_text.text = full_text[_current_text_index]
		chat_text.visible_characters = 0
		state_machine.change_state(_presenting_state)
	else:
		state_machine.change_state(_disappearing_state)
	print("Next message requested.")

func _on_fully_displayed() -> void:
	print("Chat bubble text fully displayed.")
	state_machine.change_state(_idle_state)

func _on_input_received() -> void:
	print("Input received for chat bubble.")

#endregion Signal Processors


#region States
func configure_states() -> void: # ):
	_ready_appearing_state()
	_ready_disappearing_state()
	_ready_idle_state()
	_ready_presenting_state()

	_appearing_state.valid_states = [_presenting_state]
	_presenting_state.valid_states = [_idle_state]
	_idle_state.valid_states = [_disappearing_state, _presenting_state]
	_disappearing_state.valid_states = []

	state_machine.states = [_appearing_state, _disappearing_state, _idle_state, _presenting_state]
	state_machine.change_state(_appearing_state)


func _ready_appearing_state():
	var state = _appearing_state
	state._on_enter = func(_prev_state): # ():
		_tween = create_tween()
		chat_text.visible_characters = 0
		_tween.tween_property(self, "position", Vector2(0, chat_bubble_position_y), 0.5)
		_tween.bind_node(self)
		_tween.finished.connect(func() -> void:
			emit_signal.call_deferred("appeared")
			_tween = null
		)	
	return


func _ready_disappearing_state() -> State:
	var state = _disappearing_state
	state._on_enter = func(_prev_state): # ():
		print("Entering Disappearing State")
		bubble_on_screen = false
		_tween = create_tween()
		_tween.chain().tween_property(self, "position", Vector2(chat_bubble_offscreen_x, position.y), 0.5)
		_tween.bind_node(self)
		# tween.tween_callback(go_signal.call("disappeared")).set_delay(0.5)
	return state


func _ready_idle_state() -> State:
	var state = _idle_state
	blink_tween = create_tween().bind_node(finished_indicator)

	state._on_enter = func(_prev_state):
		finished_indicator.visible = true
		# blink_tween.tween_property(finished_indicator, "size", Vector2(0, 0), 0.5)
		# blink_tween.tween_property(finished_indicator, "size", Vector2(20, 20), 0.5)
		# blink_tween.set_loops()

	state._on_exit = func(_next_state):
		finished_indicator.visible = false
		blink_tween = null
		_current_text_index += 1
		if _current_text_index < full_text.size():
			chat_text.text = full_text[_current_text_index]
			chat_text.visible_characters = 0
			
	state._on_input = func(event):
		if event.is_action_pressed("ui_accept"):
			emit_signal.call_deferred("next_message_requested")
	return state


func _ready_presenting_state():
	var state = _presenting_state
	state._on_enter = func(_prev_state): # ():
		_text_advance_counter = 0
		_text_advance_position = 0

	state._on_process = func(_delta):
		if Settings.chat_speed == Settings.ChatSpeed.INSTANT:
			chat_text.visible_characters = -1
			emit_signal.call_deferred("fully_displayed")
			return
		_text_advance_counter += 1
		if _text_advance_counter >= Settings.chat_speed:
			_text_advance_counter = 0
			_text_advance_position += 1
			chat_text.visible_characters = _text_advance_position
			if chat_text.visible_characters >= chat_text.get_total_character_count():
				emit_signal("fully_displayed")
	
	state._on_input = func(event):
		if event.is_action_pressed("ui_accept"):
			chat_text.visible_characters = -1
			emit_signal.call_deferred("fully_displayed")
#endregion States