class_name BattleScene
extends Node2D

enum HighlightTypes { NONE = 0, MOVE = 5, START = 6, ATTACK = 1 }

@export var grid_size: Vector2i = Vector2i(13, 6)
@export var cell_size: Vector2 = Vector2(64, 48)
@export var enemies: Array[Combatant] = []
@export var allies: Array[Ally] = []
@export var battle_back: Texture2D
@export var battle_music: AudioStream

var battle_grid: BattleGrid
var highlight_grid: TileMapLayer
var selected_combatant: Combatant

var attack_button: Button
var skill_button: Button
var item_button: Button
var end_turn_button: Button
var flee_button: Button
var instant_victory_button: Button

# Called when the node enters the scene tree for the first time.

@onready var battle_manager = $BattleManager
@onready var action_palette = $HUD/ActionPalette


func _ready() -> void:
	attack_button = action_palette.find_child("Attack") as Button
	skill_button = action_palette.find_child("Skill") as Button
	item_button = action_palette.find_child("Item") as Button
	end_turn_button = action_palette.find_child("EndTurn") as Button
	flee_button = action_palette.find_child("Flee") as Button
	instant_victory_button = action_palette.find_child("InstantVictory") as Button
	highlight_grid = find_child("HighlightOverlay") as TileMapLayer
	battle_grid = BattleGrid.new(grid_size)
	add_child(battle_grid)
	if battle_back:
		var back_sprite = Sprite2D.new()
		back_sprite.texture = battle_back
		back_sprite.z_index = -1
		add_child(back_sprite)
	if battle_music:
		var music_player = AudioStreamPlayer.new()
		music_player.stream = battle_music
		music_player.autoplay = true
		add_child(music_player)
	for ally in allies:
		ally.position = battle_grid.get_cell(ally.occupied_cell_pos).position
		ally.occupied_cell = battle_grid.get_cell(ally.occupied_cell_pos)
		ally.occupied_cell.occupant = ally
	for enemy in enemies:
		enemy.position = battle_grid.get_cell(enemy.occupied_cell_pos).position
		enemy.occupied_cell = battle_grid.get_cell(enemy.occupied_cell_pos)
		enemy.occupied_cell.occupant = enemy
	selected_combatant = allies[0]
	turn_start(selected_combatant)

	battle_manager._start_battle()


func _show_action_palette():
	action_palette.visible = true
	var tween = create_tween().bind_node(action_palette)
	(
		tween
		. tween_property(action_palette, "size", Vector2(1086, 68), 0.5)
		. set_trans(Tween.TRANS_SINE)
		. set_ease(Tween.EASE_IN_OUT)
	)


func _hide_action_palette():
	var tween = create_tween().bind_node(action_palette)
	(
		tween
		. tween_property(action_palette, "size", Vector2(0, 68), 0.5)
		. set_trans(Tween.TRANS_SINE)
		. set_ease(Tween.EASE_IN_OUT)
	)
	tween.tween_callback(func(): action_palette.visible = false)


func _on_state_entered(new_state):
	match new_state:
		battle_manager.TurnState.START_TURN:
			turn_start(battle_manager.current_combatant)
			battle_manager.change_turn_state(battle_manager.TurnState.MOVE)
		battle_manager.TurnState.MOVE:
			_hide_action_palette()
			show_move_range()
		battle_manager.TurnState.MOVING:
			pass
		battle_manager.TurnState.SELECT_COMMAND:
			attack_button.grab_focus()
			_show_action_palette()
		battle_manager.TurnState.END_TURN:
			battle_manager._on_turn_ended(battle_manager.current_combatant)
			battle_manager.change_turn_state(battle_manager.TurnState.WAITING)
		battle_manager.TurnState.WAITING:
			battle_manager.change_turn_state(battle_manager.TurnState.START_TURN)
		battle_manager.TurnState.FLEEING:
			var counter_pos = 0
			for ally in allies:
				var tween = create_tween().bind_node(ally)
				(
					tween
					. tween_property(
						ally,
						"position",
						ally.position + Vector2(get_viewport().get_visible_rect().size.x, 0),
						1.0
					)
					. set_delay(0.1 * counter_pos)
				)
				tween.chain().tween_callback(func(): get_tree().free())
				counter_pos += 1


func _on_state_exited(old_state):
	match old_state:
		TurnState.START_TURN:
			pass
		TurnState.MOVE:
			hide_move_range()
		TurnState.MOVING:
			pass
		TurnState.SELECT_COMMAND:
			attack_button.release_focus()
			skill_button.release_focus()
			item_button.release_focus()
			end_turn_button.release_focus()
			flee_button.release_focus()
			instant_victory_button.release_focus()
		TurnState.END_TURN:
			pass


func _unhandled_input(event: InputEvent) -> void:  #():
	match battle_manager.turn_state:
		battle_manager.TurnState.SELECT_COMMAND:
			if event.is_action_pressed("Cancel"):
				battle_manager.change_turn_state(battle_manager.TurnState.MOVE)
		battle_manager.TurnState.MOVE:
			_handle_actor_movement(event)


func _handle_actor_movement(event: InputEvent) -> void:
	#():
	if (
		battle_manager.turn_state == battle_manager.TurnState.MOVE
		and selected_combatant
		and not selected_combatant.is_dead
	):
		if event.is_action_pressed("ui_left"):
			selected_combatant.move_to_cell(
				selected_combatant.occupied_cell.neighbors[BattleGrid.Neighbors.LEFT]
			)
		elif event.is_action_pressed("ui_right"):
			selected_combatant.move_to_cell(
				selected_combatant.occupied_cell.neighbors[BattleGrid.Neighbors.RIGHT]
			)
		elif event.is_action_pressed("ui_up"):
			selected_combatant.move_to_cell(
				selected_combatant.occupied_cell.neighbors[BattleGrid.Neighbors.UP]
			)
		elif event.is_action_pressed("ui_down"):
			selected_combatant.move_to_cell(
				selected_combatant.occupied_cell.neighbors[BattleGrid.Neighbors.DOWN]
			)
		elif event.is_action_pressed("Confirm"):
			if selected_combatant in allies:
				battle_manager.change_turn_state(battle_manager.TurnState.SELECT_COMMAND)
				# battle_manager.emit_signal("turn_ended", selected_combatant)
			# if allies.size() > 0:
			# 	_selected_combatant_index = (_selected_combatant_index + 1) % allies.size()
			# 	selected_combatant = allies[_selected_combatant_index]
			# 	turn_start(selected_combatant)
	selected_combatant.z_index = selected_combatant.occupied_cell.pos.y


func set_position_in_grid(combatant: Combatant, cell_pos: Vector2i):
	if not combatant or not battle_grid:
		return
	var cell = battle_grid.get_cell(cell_pos)
	if not cell:
		return
	combatant.position = cell.position
	battle_grid.occupy_cell(cell_pos, combatant)


func turn_start(combatant: Combatant):
	selected_combatant = combatant
	if combatant:
		# for cell_row in battle_grid.grid:
		# 	for cell in cell_row:
		# 		cell.move_range = 999
		combatant.occupied_cell.calculate_move_range()
		if combatant in enemies:
			var rng = randi_range(0, 3) as BattleCell.Neighbors
			await get_tree().create_timer(0.25).timeout
			combatant.move_to_cell(combatant.occupied_cell.neighbors[rng])
			await get_tree().create_timer(0.5).timeout
			battle_manager.change_turn_state(battle_manager.TurnState.SELECT_COMMAND)
			battle_manager.change_turn_state(battle_manager.TurnState.END_TURN)


func highlight_cell(cell_pos: Vector2i, highlight_type: HighlightTypes):
	if not highlight_grid:
		return
	highlight_grid.set_cell(cell_pos, 2, Vector2i(highlight_type, 0))
	# print("Highlighting cell at ", cell_pos, " with type ", highlight_type)


func show_move_range():
	for y in range(battle_grid.grid_height):
		for x in range(battle_grid.grid_width):
			var cell = battle_grid.grid[y][x]
			if cell.move_range <= selected_combatant.move_range:
				highlight_cell(Vector2i(x, y), HighlightTypes.MOVE)
				if cell.move_range == 0:
					highlight_cell(Vector2i(x, y), HighlightTypes.START)
			else:
				highlight_cell(Vector2i(x, y), HighlightTypes.NONE)


func hide_move_range():
	for y in range(battle_grid.grid_height):
		for x in range(battle_grid.grid_width):
			highlight_cell(Vector2i(x, y), HighlightTypes.NONE)


func _on_attack_pressed():
	battle_manager.change_turn_state(battle_manager.TurnState.END_TURN)


func _on_skill_pressed():
	battle_manager.change_turn_state(battle_manager.TurnState.END_TURN)


func _on_item_pressed():
	battle_manager.change_turn_state(battle_manager.TurnState.END_TURN)


func _on_end_turn_pressed():
	battle_manager.change_turn_state(battle_manager.TurnState.END_TURN)


func _on_flee_pressed():
	battle_manager.change_turn_state(battle_manager.TurnState.FLEEING)


func _on_instant_victory_pressed():
	battle_manager.change_turn_state(battle_manager.TurnState.END_TURN)
