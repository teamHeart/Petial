class_name FeyscriptParser
extends Node

"""
FeyscriptParser

Responsible for turning a raw Feyscript string into a list of command
dictionaries that the `FeyscriptInterpreter` can execute.

Current limitations / design notes:
- This is a line-oriented, space-tokenized parser. It intentionally keeps
  parsing simple for now. The `_parse_args()` function is the placeholder
  where more robust handling (quoted strings, escaped characters) should be
  implemented.
- `COMMANDS` is the authoritative list of supported command tokens. When you
  add a new command, add its name to `COMMANDS` and implement a corresponding
  handler in the `_tokenize()` match block (or replace the match with a
  dispatch table).
"""

#region Properties and Constants
const COMMANDS := [
	"actor",  # Reference an actor in the scene
	"animation",  # Play an animation on a specified object
	"apply",  # Apply a status effect to an actor
	"ask",  # Prompt the player with a question and handle the response
	"attack",  # Perform an attack action
	"camera",  # Control camera movements and effects
	"cast",  # Cast a spell or ability
	"damage",  # Inflict damage on an actor
	"despawn",  # Remove an actor from the scene
	"effect",  # Trigger a visual effect
	"end",  # End a block of commands
	"endbattle",  # End the current battle sequence
	"fadein",  # Fade the screen in from black
	"fadeout",  # Fade the screen out to black
	"flee",  # Attempt to flee from battle
	"give",  # Give an item or currency to an actor
	"goto",  # Jump to a specified label in the script
	"heal",  # Heal an actor for a specified amount
	"if",  # Conditional execution based on a variable
	"loop",  # Repeat a block of commands a specified number of times
	"move",  # Move the player to a specified location
	"music",  # Play background music
	"print",  # Print a message to the console
	"remove",  # Remove an item or status effect from an actor
	"say",  # Display dialogue text
	"set",  # Set a variable to a specified value
	"setbackground",  # Change the background image
	"setturn",  # Set the current turn in battle
	"sound",  # Play a sound effect
	"spawn",  # Spawn an actor in the scene
	"startbattle",  # Initiate a battle sequence
	"state",  # Change the state of an actor
	"take",  # Take an item or currency from an actor
	"transition",  # Perform a screen transition effect
	"use",  # Use an item from the inventory
	"wait"  # Pause execution for a specified duration
]

static var instance: FeyscriptParser
# Array of parsed command dictionaries produced during tokenization
var commands := []
# Map of label name -> command index or line number (used for `goto`)
var labels := {}
# Current line index while tokenizing (0-based)
var _current_line := 0
# Parser-local variables set by `set` during parse-time (used to resolve
# literals at parse-time in this simple implementation)
var _variables := {}

# Internal buffers used during tokenization
var _lines: PackedStringArray = []
var _tokens: PackedStringArray = []
var _command_token: String = ""
var _command: Dictionary = {}
var _args: PackedStringArray = []
#endregion


#region Housekeeping Functions
static func get_instance() -> FeyscriptParser:  # ():
	if instance == null:
		instance = FeyscriptParser.new()
	return instance


func _reset() -> void:  # ():
	# Clear all parser state so the parser can be reused across multiple
	# scripts without leaking previous data.
	commands.clear()
	labels.clear()
	_current_line = 0
	_variables.clear()
	_lines.clear()
	_tokens.clear()
	_command_token = ""
	_command.clear()
	_args.clear()


#endregion


#region Processing Functions
func _tokenize(script: String) -> void:  # ():
	"""
	Very small tokenizer that splits the input into lines, then space-tokenizes
	each non-empty, non-comment line. This function constructs a command
	dictionary for each recognized command token and appends it to `commands`.

	Limitations:
	- Quoted strings and escaped spaces are NOT handled. Implement `_parse_args`
		to add proper quoting and escaping support.
	- Command handlers are implemented inline (see the `match` below). When
		adding commands, extend the match block to populate `_command` with the
		expected fields.
	"""
	_lines = script.split("\n", false)
	for line in _lines:
		line = line.strip_edges()
		if line == "" or line.begins_with("#"):
			_current_line += 1
			continue  # Skip empty lines and comments
		# Simple whitespace split — see _parse_args() for improvements
		_tokens = line.split(" ", false)
		_command_token = _tokens[0].to_lower()
		_args = _tokens if _tokens.size() > 1 else PackedStringArray()
		_args.remove_at(0)  # Remove the command token from args
		_parse_args()
		if _command_token in COMMANDS:
			# Break out into methods for each command. Add implementations
			# here as commands are required by your scripting needs.
			match _command_token:
				# Commands that define labels or simple immediate data
				"set":
					_set_var()
				"print":
					_print()
				"end":
					_end()
				_:
					push_error(
						(
							"Command '%s' not yet implemented at line %d"
							% [_command_token, _current_line + 1]
						)
					)
			# Store line number for better error reporting at runtime
			_command["line"] = _current_line + 1
			commands.append(_command)
		else:
			push_error(
				"Unknown _command_token '%s' at line %d" % [_command_token, _current_line + 1]
			)
		_current_line += 1


func _parse_args() -> void:  # ():
	pass

func parse_script(script: String) -> Dictionary:  # ():
	# Public entrypoint used by the interpreter. Resets the parser, tokenizes
	# the script, and returns a simple dictionary containing the parsed
	# commands and labels.
	var parser = get_instance()
	parser._reset()
	parser._tokenize(script)
	print(
		(
			"Parsed %d commands and %d labels\n\tCommands:\n"
			% [parser.commands.size(), parser.labels.size()]
		)
	)
	for command in parser.commands:
		print("  - %s (line %d)" % [command["type"], command["line"]])
	return {"commands": parser.commands, "labels": parser.labels}


#endregion


#region Command Handlers
func _set_var() -> void:  # ():
	# Minimal `set` implementation used during parsing to resolve simple
	# literals into typed values (bool/null/number/string). This stores the
	# value into `_variables` and produces a `_command` entry describing the
	# `set` operation for the interpreter.
	if _args.size() < 2:
		push_error(
			(
				"Insufficient arguments for 'set' command at line %d\n\t\tSyntax: set <variable> <value>"
				% [_args[0], _current_line + 1]
			)
		)
		return
	var variable := _args[0]
	var value
	match _args[1].to_lower():
		"true":
			value = true
		"false":
			value = false
		"null":
			value = null
		_:
			if _args[1].is_valid_int():
				value = _args[1] as int
			elif _args[1].is_valid_float():
				value = _args[1] as float
			else:
				value = _args[1]
	_variables[variable] = value
	_command = {"type": "set", "variable": variable, "value": value}


func _print() -> void:  # ():
	# Produce a `print` command dictionary. If the argument is a previously
	# set variable, resolve it at parse-time to simplify runtime behavior.
	if _args.size() < 1:
		push_error(
			(
				"Insufficient arguments for 'print' command at line %d\n\tSyntax: print <message|variable>"
				% [_current_line + 1]
			)
		)
		return
	var message = _variables[_args[0]] if _args[0] in _variables else _args[0]
	_command = {"type": "print", "message": message}


func _end():
	# Marker command used to denote the end of a block or script in some
	# control-flow constructs. Kept simple for now.
	_command = {"type": "end"}

#endregion


#region Operators

#endregion