class_name FeyscriptParser
extends Node

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
var commands := []
var labels := {}
var _current_line := 0
var _variables := {}

var _lines: Array[String] = []
var _tokens: Array[String] = []
var _command_token: String = ""
var _command: Dictionary = {}
var _args: Array[String] = []
#endregion


#region Housekeeping Functions
static func get_instance() -> FeyscriptParser:  #():
	if instance == null:
		instance = FeyscriptParser.new()
	return instance


func _reset() -> void:  #():
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
func _tokenize(script: String) -> void:  #():
	_lines = script.split("\n", false)
	for line in _lines:
		line = line.strip_edges()
		if line == "" or line.begins_with("#"):
			_current_line += 1
			continue  # Skip empty _lines and comments
		_tokens = line.split(" ", false)
		_command_token = _tokens[0].to_lower()
		_args = _tokens.pop_front() if _tokens.size() > 1 else []
		_parse_args()
		if _command_token in COMMANDS:
			# Break out into methods for each command
			match _command_token:
				# Commands that define labels
				"set":
					_set_var()
			commands.append({"_command": _command, "line": _current_line + 1})
		else:
			push_error(
				"Unknown _command_token '%s' at line %d" % [_command_token, _current_line + 1]
			)
		_current_line += 1


func _parse_args() -> void:  #():
	# Placeholder for argument parsing logic
	# go letter by letter to handle quoted strings, escape sequences, etc.
	# for now, just use the raw _args array
	pass


static func parse_script(script: String) -> Dictionary:  #():
	var parser = get_instance()
	parser._reset()
	parser._tokenize(script)
	print(
		(
			"Parsed %d commands and %d labels\n	Commands:\n"
			% [parser.commands.size(), parser.labels.size()]
		)
	)
	for command in parser.commands:
		print("  - %s (line %d)" % [command["_command"], command["line"]])
	return {"commands": parser.commands, "labels": parser.labels}


#endregion


#region Command Handlers
## Set a variable to a specified value
func _set_var() -> void:  #():
	if _args.size() < 2:
		push_error(
			(
				"Insufficient arguments for 'set' command at line %d\n		Syntax: set <variable> <value>"
				% [_args[0], _current_line + 1]
			)
		)
		return
	var variable := _args[0]
	var value := _args[1]
	_variables[variable] = value
	_command = {"type": "set", "variable": variable, "value": value}


func _print() -> void:  #():
	if _args.size() < 1:
		push_error(
			(
				"Insufficient arguments for 'print' command at line %d\n		Syntax: print <message|variable>"
				% [_current_line + 1]
			)
		)
		return
	var message = _variables[_args[0]] if _args[0] in _variables else _args[0]
	_command = {"type": "print", "message": message}
#endregion
