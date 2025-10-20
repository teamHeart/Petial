class_name FeyscriptParser
extends RefCounted

## Responsible for turning a raw Feyscript string into a list of command
## dictionaries that the `FeyscriptInterpreter` can execute.

# Current limitations / design notes:
# - This is a line-oriented, space-tokenized parser. It intentionally keeps
#   parsing simple for now. The `_parse_args()` function is the placeholder
#   where more robust handling (quoted strings, escaped characters) should be
#   implemented.
# - `COMMANDS` is the authoritative list of supported command tokens. When you
#   add a new command, add its name to `COMMANDS` and implement a corresponding
#   handler in the `_tokenize()` match block (or replace the match with a
#   dispatch table).

#region Properties and Constants
## List of recognized operators for expression parsing
const OPERATORS := [
	"(",
	")",
	"+",
	"-",
	"*",
	"/",
	"%",
	"==",
	"!=",
	"<",
	">",
	"<=",
	">=",
	"and",
	"or",
	"not",
	"is",
]

## List of supported Feyscript command tokens[br]
## See https://github.com/teamHeart/Petial/wiki/Feyscript#commands for details.
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
## Individual lines of the input script[br][PackedStringArray]
var _lines: PackedStringArray = []
## Individual tokens of the current line being processed[br][PackedStringArray]
var _tokens: PackedStringArray = []
## Current command token being processed[br][String]
var _command_token: String = ""
## Current command dictionary being built[br][Dictionary][br]Data Shape:[br]
## - type: Command type string[br]
## - ...command-specific fields...
var _command: Dictionary = {}
## Arguments of the current command being processed[br][code]Array<Dictionary>[/code][br]
## Data Shape of each argument dictionary:[br]
## - [code]type[/code]: "literal" | "variable" | "expression"[br]
## - ...other fields...
var _args: Array[Dictionary] = []

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
## Public entrypoint used by the interpreter. Resets the parser, tokenizes
## the script, and returns a simple dictionary containing the parsed
## commands and labels.


func parse_script(script: String) -> Dictionary:  # ():
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


##	Very small tokenizer that splits the input into lines, then space-tokenizes
##	each non-empty, non-comment line. This function constructs a command
##	dictionary for each recognized command token and appends it to `commands`.
## [br]
## Parameters:
## - script: The input script string to tokenize.
func _tokenize(script: String) -> void:  # ():
	"""
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
		_tokens.remove_at(0)  # Remove the command token from args
		# _args = _tokens if _tokens.size() > 1 else PackedStringArray()
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


## Parse the passed arguments into structured data,
## resolving strings, expressions, variables, and literals
## [br]
## Data Shape:[br]
## - [code]type[/code]: "literal" | "variable" | "expression" | "operator"[br]
## - [code]raw[/code]: Raw argument string[br]
## - ...other fields...[br]
## See [method FeyscriptParser._resolve_string] for string resolution details.
func _parse_args() -> void:  # ():
	_args.clear()
	# var expr_queue: Array = []
	var argument: Dictionary = {"type": "", "raw": "", "value": null}
	var string_mode: bool = false
	for arg in _tokens:
		match arg:
			# comments
			_ when arg.begins_with("#"):
				# Skip comments
				return

			# String literals

			# - Single Token Strings
			_ when arg.begins_with('"') and arg.ends_with('"') and not string_mode:
				argument["type"] = "literal"
				string_mode = true
				argument["raw"] = arg
				argument["value"] = arg.substr(1, arg.length() - 2)

			# - Multi-Token Strings (start)
			_ when arg.begins_with('"'):
				string_mode = true
				argument["type"] = "literal"
				argument["raw"] = arg
				argument["value"] = arg.substr(1)

			# - Multi-Token Strings (end)
			_ when arg.ends_with('"') and string_mode:
				string_mode = false
				_args[_args.size() - 1]["value"] += " " + arg.substr(0, arg.length() - 1)

				# Handle escaped characters
				var escaped_str = _args[_args.size() - 1]["value"]
				escaped_str = escaped_str.replace("\\n", "\n")
				escaped_str = escaped_str.replace("\\t", "\t")
				escaped_str = escaped_str.replace('\\"', '"')
				_args[_args.size() - 1]["value"] = escaped_str

			# - Multi-Token Strings (middle)
			_ when string_mode:
				_args[_args.size() - 1]["value"] += " " + arg

			# Variable references

			# External/global variables
			_ when arg.begins_with("@") and not string_mode:
				argument["type"] = "variable"
				argument["raw"] = arg
				argument["value"] = arg.substr(1)

			# Local variables
			_ when arg.begins_with("$") and not string_mode:
				# - Check for prior variable declaration
				if not _variables.has(arg.substr(1)):
					push_error("Undefined variable '%s' at line %d" % [arg, _current_line + 1])
				argument["type"] = "variable"
				argument["raw"] = arg
				argument["value"] = arg.substr(1)

			# Expressions (not yet implemented)
			_ when arg in OPERATORS and not string_mode:
				argument["type"] = "operator"
				argument["raw"] = arg
				argument["value"] = arg

			# All Other Literals
			_:
				argument["type"] = "Literal"
				argument["raw"] = arg
				match arg.to_lower():
					"true":
						argument["value"] = true
					"false":
						argument["value"] = false
					"null":
						argument["value"] = null
					_ when arg.is_valid_int():
						argument["value"] = arg as int
					_ when arg.is_valid_float():
						argument["value"] = arg as float
					_:
						argument["value"] = arg
		_args.append(argument)
	_resolve_expressions()


## Resolve an operator into an expression dictionary.
## This function is responsible for taking a raw operator string and
## breaking it down into its component parts for easier evaluation.[br]
## Data Shape:[br]
## - type: "expression"[br]
## - raw: Raw operator string[br]
## - operator: Operator string[br]
## - arg1: First operand[br]
## - arg2: Second operand[br]
func _resolve_expressions():
	# Placeholder implementation for operator resolution. This should be
	# expanded to properly parse and structure expressions based on the
	# specific operators and their operands.
	return


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
	var variable = _args[0]["value"]
	var value = _args[1]
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
	var message = _args[0]
	_command = {"type": "print", "message": message}


func _end():
	# Marker command used to denote the end of a block or script in some
	# control-flow constructs. Kept simple for now.
	_command = {"type": "end"}

#endregion

#region Operators

#endregion
