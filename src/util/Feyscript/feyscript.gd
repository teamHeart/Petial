class_name Feyscript
extends Node

#region Properties and Constants
static var instance: Feyscript
var parser: FeyscriptParser
var interpreter: FeyscriptInterpreter
#endregion


#region Housekeeping Functions
static func get_instance() -> Feyscript:  #():
	if instance == null:
		instance = Feyscript.new()
	return instance

func _init() -> void:  #():
	parser = FeyscriptParser.get_instance()
	interpreter = FeyscriptInterpreter.get_instance()
	_reset()

func _reset() -> void:  #():
	parser._reset()
	interpreter._reset()
#endregion


#region Processing Functions
func run_script(script: String) -> void:  #():
	if script == "":
		push_error("No script provided to run_script()")
		return
	if parser == null or interpreter == null:
		push_error("Feyscript not initialized properly.")
		return
	if script.ends_with(".fey"):
		var file = FileAccess.open(script, FileAccess.READ)
		if file == null:
			push_error("Failed to open script file: %s" % script)
			return
		script = file.get_as_text()
		file.close()
	parser._reset()
	interpreter._reset()
	parser.parse_script(script)
	for command in parser.commands:
		interpreter._process_command(command)