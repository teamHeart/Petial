class_name BattleCell
extends Node2D

## The position of the cell in the grid

var pos: Vector2i
var occupant: Combatant = null
var highlighted: bool = false
var highlight_color: Color = Color(1, 1, 0, 0.5) # Yellow highlight by default
var default_color: Color = Color(1, 1, 1, 0) # Transparent by default
var move_range:= 0
var attack_range:= 0

static var _move_range_processing_queue := []
var _processed:= false

enum Neighbors { UP, RIGHT, DOWN, LEFT }
var neighbors: Array = [null, null, null, null] # UP, RIGHT, DOWN, LEFT

func _init(tpos: Vector2i):
	pos = tpos

func is_occupied() -> bool:
	return occupant != null

func calculate_move_range():
	# Reset processing queue and processed flags
	_move_range_processing_queue.clear()
	for row in get_parent().grid:
		for cell in row:
			cell._processed = false
			if cell.is_occupied():
				cell._processed = true
				cell.move_range = 999
	move_range = 0
	_processed = true
	_move_range_processing_queue.append(self)

	while _move_range_processing_queue.size() > 0:
		var cell = _move_range_processing_queue.pop_front()
		for neighbor in cell.neighbors:
			if neighbor and not neighbor._processed:
				neighbor._processed = true
				neighbor.move_range = cell.move_range + 1
				_move_range_processing_queue.append(neighbor)
		


	# for neighbor in neighbors:
	# 	if neighbor and not neighbor._processed:
	# 		_move_range_processing_queue.append(neighbor)
	# 		neighbor._processed = true
	# 		neighbor.move_range = mrange + 1



	# for cell in _move_range_processing_queue:
	# 	cell.calculate_move_range(mrange + 1)
			
	# 		# if neighbor.move_range == 999:
	# 		# 	neighbor.calculate_move_range(mrange + 1)
	# 		# else:
	# 		# 	neighbor.move_range = min(neighbor.move_range, mrange + 1)

	# Implement pathfinding logic here to determine reachable cells within the move range
