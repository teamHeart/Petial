class_name FeyscriptInterpreter
extends Node

"""
FeyscriptInterpreter

Lightweight interpreter that executes a parsed Feyscript command list.

Design notes / responsibilities:
- This class receives the raw script (string or path ending in `.fey`), asks
  the `FeyscriptParser` to tokenize/parse it, and then executes the resulting
  commands in order.
- The interpreter currently implements only a minimal command set used for
  editor tooling and testing (`set`, `print`). More runtime/game commands are
  handled elsewhere and should be added here as needed.

Data shapes:
- _script: { "commands": Array<Dictionary>, "labels": Dictionary }
- command: { "type": String, ... command-specific fields ... }
- _variables: Dictionary used for script-local variables while running.

Extension points / TODOs:
- Add async/wait handling (so commands like `wait` or `say` can yield).
- Add error recovery and line-numbered error reporting when a command fails.
- Wire command handlers into game systems (actor lookup, inventory, etc.).
"""

#region Properties and Constants
static var instance: FeyscriptInterpreter
var parser: FeyscriptParser

# Parsed script structure produced by the parser; cleared between runs
var _script: Dictionary = {}
# The command currently being executed (for debugging / errors)
var _current_command: Dictionary = {}
# Script-local variables: set/used by `set` and other commands
var _variables: Dictionary = {}
#endregion


#region Housekeeping Functions
func _init() -> void:  # ():
	# Acquire the shared parser instance and ensure both parser and
	# interpreter are in a clean state. This is intentionally simple — the
	# parser is global/singleton in this implementation.
	parser = FeyscriptParser.get_instance()
	parser._reset()
	_reset()


func _reset() -> void:  # ():
	# Clear interpreter state between script runs so subsequent runs don't
	# accidentally reuse variables or commands from previous runs.
	_script.clear()
	_current_command.clear()
	_variables.clear()


static func get_instance() -> FeyscriptInterpreter:  # ():
	# Basic singleton accessor used by the rest of the toolchain / tests.
	if instance == null:
		instance = FeyscriptInterpreter.new()
	return instance


#endregion


#region Processing Functions
func run_script(script: String) -> void:  # ():
	"""
	Entry point to execute a Feyscript script. `script` may be the script
	contents or a path to a `.fey` file. Parsing and execution are synchronous
	in this lightweight interpreter.

	Current behavior:
	- If `script` ends with `.fey`, it will be opened and read.
	- The parser is reset and asked to parse the script into commands.
	- Each command is processed in turn by `_process_command`.

	Note: long-running or blocking commands (e.g., `say` that waits for
	player input) are not supported by this simple runner — add yields or a
	coroutine-based execution model if you need interactive commands.
	"""
	if script == "":
		push_error("No script provided to run_script()")
		return
	if parser == null or instance == null:
		push_error("Feyscript not initialized properly.")
		return
	if script.ends_with(".fey"):
		var file = FileAccess.open(script, FileAccess.READ)
		if file == null:
			push_error("Failed to open script file: %s" % script)
			return
		script = file.get_as_text()
		file.close()
	# Reset parser and interpreter state prior to parsing/execution
	parser._reset()
	instance._reset()
	_script = parser.parse_script(script)

	# Execute each parsed command in order. Command handlers are simple and
	# map 1:1 to parser-produced command dictionaries.
	for command in _script["commands"]:
		instance._process_command(command)


func _process_command(command: Dictionary) -> void:  # ():
	# Central dispatch for executing a single parsed command dictionary.
	# Add additional `match` arms here as you implement more commands.
	match command["type"]:
		"set":
			# Persist a script-local variable
			_variables[command["variable"]] = command["value"]
		"print":
			# Print a literal or a previously set variable value
			print(
				(
					_variables[command["message"]]
					if command["message"] in _variables
					else command["message"]
				)
			)
		_:
			# Unknown command: report with the command type so it's easier to
			# locate the offending line in the source script during debugging.
			push_error("Unknown command type '%s'" % [command["type"]])
#endregion
