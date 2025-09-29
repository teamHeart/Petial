class_name Combatant
extends Sprite2D

var grid_cell: BattleCell

@export var battler: Battler
@export var occupied_cell_pos: Vector2i
@export_range(1, 5, 1) var move_range:= 3

var occupied_cell: BattleCell

var _tween: Tween
var _data: Battler


func _init():
	load_from_data(_data)
	if texture:
		offset = Vector2(0, -texture.get_height()/2.0)
	else:
		offset = Vector2.ZERO
	y_sort_enabled = true

func load_from_data(data: Battler) -> bool:
	if not data:
		return false
	return true


func move_to_cell(cell: BattleCell):
	if not cell or _tween or cell.is_occupied() or cell.move_range > move_range:
		return
	_tween = create_tween().bind_node(self)
	_tween.set_ease(Tween.EASE_OUT)
	_tween.tween_property(self, "position", cell.position, 0.125)
	_tween.tween_callback(func():
		_tween = null
	)
	_tween.play()
	occupied_cell.occupant = null
	occupied_cell = cell
	cell.occupant = self
