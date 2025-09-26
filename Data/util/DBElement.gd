class_name DBElement
extends JSON

var _id := 0
var _name := "New Element"
@export var id: int = 0:
	set(newid):
		_id = newid
	get():
		return _id

@export var name: String = "New Element":
	set(newname):
		_name = newname
	get():
		return _name