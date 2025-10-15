class_name FeyscriptInterpreter
extends Node

#region Properties and Constants
static var instance: FeyscriptInterpreter

var _script: Dictionary = {}
var _current_command: Dictionary = {}
var _variables: Dictionary = {}
#endregion


#region Housekeeping Functions
func _reset() -> void:  #():
	_script.clear()
	_current_command.clear()
	_variables.clear()


static func get_instance() -> FeyscriptInterpreter:  #():
	if instance == null:
		instance = FeyscriptInterpreter.new()
	return instance


#endregion


#region Processing Functions
func _process_command(command: Dictionary) -> void:  #():
	match command["type"]:
		"set":
			_variables[command["variable"]] = command["value"]
		"print":
			print(
				(
					_variables[command["message"]]
					if command["message"] in _variables
					else command["message"]
				)
			)
		_:
			push_error("Unknown command type '%s'" % [command["type"]])
#endregion
