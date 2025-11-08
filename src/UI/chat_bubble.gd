extends Control

#region Declarations
signal input_received(_event: InputEvent)
#): 
# stupid fucking syntax highlighter breaking on close parenthesis without an immediately following colon
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

var character_portrait: TextureRect = null
var character_nameplate: Label = null
var chat_text: RichTextLabel = null
var finished_indicator: TextureRect = null

var chat_bubble_offscreen_x: int
var chat_bubble_position_y: int
var blink_tween: Tween = null
var _current_chat_speed: Settings.ChatSpeed = Settings.ChatSpeed.NORMAL
var _text_advance_counter: int = 0
var _text_advance_position: int = 0
var _appearing_state: State = State.new()
var _disappearing_state: State = State.new()
var _presenting_state: State = State.new()
var _idle_state: State = State.new()
var _tween: Tween = null

@onready var state_machine: FiniteStateMachine = $StateMachine

@onready var left_chat_box = null
@onready var left_chat_text = $ChatPanel/HBoxContainer/MarginContainer2/ChatText
@onready var left_character_portrait = $ChatPanel/HBoxContainer/MarginContainer/CharacterPortrait
@onready var left_character_nameplate = $ChatPanel/Control/Nameplate/MarginContainer/NameplateName
@onready var left_finished_indicator = $ChatPanel/HBoxContainer/MarginContainer2/ChatText/FinishedIndicator

@onready var right_chat_box = null
@onready var right_chat_text = $ChatPanel/HBoxContainer/MarginContainer2/ChatText
@onready var right_character_portrait = $ChatPanel/HBoxContainer/MarginContainer/CharacterPortrait
@onready var right_character_nameplate = $ChatPanel/Control/Nameplate/MarginContainer/NameplateName
@onready var right_finished_indicator = $ChatPanel/HBoxContainer/MarginContainer2/ChatText/FinishedIndicator

@onready var system_chat_box = null
@onready var system_chat_text = $ChatPanel/HBoxContainer/MarginContainer2/ChatText
@onready var system_finished_indicator = $ChatPanel/HBoxContainer/MarginContainer2/ChatText/FinishedIndicator
#endregion Declarations


#region Standard Functions
func _ready():
	left_chat_box.visible = false
	right_chat_box.visible = false
	system_chat_box.visible = false
	match bubble_type:
		BubbleType.LEFT:
			left_chat_box.visible = true
			chat_bubble_offscreen_x = -get_viewport().get_visible_rect().size.x as int
			chat_bubble_position_y = get_viewport().get_visible_rect().size.y as int - 150
			character_portrait = left_character_portrait
			character_nameplate = left_character_nameplate
			chat_text = left_chat_text
			finished_indicator = left_finished_indicator
		BubbleType.RIGHT:
			right_chat_box.visible = true
			chat_bubble_offscreen_x = get_viewport().get_visible_rect().size.x as int
			chat_bubble_position_y = get_viewport().get_visible_rect().size.y as int - 150
			character_portrait = right_character_portrait
			character_nameplate = right_character_nameplate
			chat_text = right_chat_text
			finished_indicator = right_finished_indicator
		BubbleType.SYSTEM:
			system_chat_box.visible = true
			chat_bubble_offscreen_x = 0
			chat_bubble_position_y = get_viewport().get_visible_rect().size.y as int - 150
			character_portrait = null
			character_nameplate = null
			chat_text = system_chat_text
			finished_indicator = system_finished_indicator

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

	_current_chat_speed = chat_speed

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


func _process(delta: float):
	if state_machine.current_state != null:
		state_machine._process(delta)

func _gui_input(event: InputEvent):
	Debug._print("GUI input received in chat bubble.")
	emit_signal("input_received", event)

func _unhandled_input(event: InputEvent):
	emit_signal("input_received", event)


#endregion Standard Functions


#region Class Methods
func reset_chat_bubble():
	_text_advance_counter = 0
	_text_advance_position = 0
	_current_text_index = 0
	chat_text.text = full_text[_current_text_index]
	chat_text.visible_characters = 0


func set_portrait_texture(texture: Texture2D):
	if bubble_type == BubbleType.SYSTEM:
		return
	character_portrait.texture = texture
	if bubble_type == BubbleType.LEFT:
		character_portrait.flip_h = true
	else:
		character_portrait.flip_h = false

@warning_ignore("SHADOWED_VARIABLE_BASE_CLASS")


func set_character_name(name: String):
	if character_nameplate:
		character_nameplate.text = name


#endregion Class Methods


#region Signal Processors
func _on_appeared():
	Debug._print("Chat bubble appeared on screen.")
	state_machine.change_state(_presenting_state)


func _on_disappeared():
	Debug._print("Chat bubble disappeared from screen.")
	queue_free()


func _on_next_message_requested():
	Debug._print("Next message requested.")
	_current_text_index += 1
	if _current_text_index < full_text.size():
		chat_text.text = full_text[_current_text_index]
		chat_text.visible_characters = 0
		state_machine.change_state(_presenting_state)
	else:
		state_machine.change_state(_disappearing_state)


func _on_fully_displayed():
	Debug._print("Chat bubble text fully displayed.")
	state_machine.change_state(_idle_state)


func _on_input_received(_event: InputEvent):
	Debug._print("Input received for chat bubble.")
	state_machine.input(_event)


#endregion Signal Processors


#region States
func configure_states():
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


#region Appearing State
func _ready_appearing_state():
	var state = _appearing_state
	state._on_enter = func(_prev_state):
		_tween = get_tree().create_tween().bind_node(self)
		chat_text.visible_characters = 0
		_tween.tween_property(self, "position", Vector2(0, chat_bubble_position_y), 0.5)
		_tween.finished.connect(
			func():
				emit_signal.call_deferred("appeared")
				_tween = null
		)
	return


#endregion Appearing State


#region Disappearing State
func _ready_disappearing_state() -> State:
	var state = _disappearing_state
	state._on_enter = func(_prev_state):
		print("Entering Disappearing State")
		bubble_on_screen = false
		if _tween:
			_tween.kill()
		_tween = get_tree().create_tween().bind_node(self)
		_tween.tween_property(self, "position", Vector2(chat_bubble_offscreen_x, position.y), 0.5)
	return state


#endregion Disappearing State


#region Idle State
func _ready_idle_state() -> State:
	var state = _idle_state
	blink_tween = finished_indicator.create_tween()

	state._on_enter = func(_prev_state):
		finished_indicator.visible = true
		blink_tween.tween_property(finished_indicator, "size", Vector2(0, 0), 0.5)
		blink_tween.tween_property(finished_indicator, "size", Vector2(20, 20), 0.5)
		blink_tween.set_loops()

	state._on_exit = func(_next_state):
		finished_indicator.visible = false
		if blink_tween:
			blink_tween.kill()
		_current_text_index += 1
		if _current_text_index < full_text.size():
			chat_text.text = full_text[_current_text_index]
			chat_text.visible_characters = 0

	state._on_input = func(_event):
		if (
			Input.is_action_just_pressed_by_event("ui_accept", _event)
			or Input.is_action_just_pressed_by_event("ui_cancel", _event)
		):
			get_tree().root.set_input_as_handled()
			accept_event()
			emit_signal.call_deferred("next_message_requested")
	return state


#endregion Idle State


#region Presenting State
func _ready_presenting_state():
	var state = _presenting_state
	state._on_enter = func(_prev_state):
		_current_chat_speed = chat_speed
		_text_advance_counter = 0
		_text_advance_position = 0

	state._on_process = func(_delta):
		if _current_chat_speed == Settings.ChatSpeed.INSTANT:
			chat_text.visible_characters = -1
			emit_signal.call_deferred("fully_displayed")
			return
		_text_advance_counter += 1
		if _text_advance_counter >= _current_chat_speed:
			_text_advance_counter = 0
			_text_advance_position += 1
			chat_text.visible_characters = _text_advance_position
			if chat_text.visible_characters >= chat_text.get_total_character_count():
				emit_signal("fully_displayed")

	state._on_input = func(_event):
		if Input.is_action_just_pressed_by_event("ui_accept", _event):
			accept_event()
			_current_chat_speed = Settings.ChatSpeed.SUPER
		if _event.is_action_just_pressed_by_event("ui_cancel"):
			accept_event()
			_current_chat_speed = Settings.ChatSpeed.INSTANT
	return state
#endregion Presenting State
#endregion States
