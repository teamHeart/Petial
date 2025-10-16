extends Node2D


# Called when the node enters the scene tree for the first time.
func _ready() -> void: #():
	# Initialize the scene
	var fs = Feyscript.get_instance()
	fs.run_script("res://src/util/Feyscript/test/test_scripts/set.fey")
	print(fs.parser.commands)
	print(fs.parser._variables)


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(_delta: float) -> void:
	# Update the scene
	pass
