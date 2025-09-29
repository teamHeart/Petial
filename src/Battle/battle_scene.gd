class_name BattleScene
extends Node2D

enum HighlightTypes {
	NONE = 0,
	MOVE = 5,
	ATTACK = 1
}

@export var grid_size: Vector2i = Vector2i(8, 6)
@export var cell_size: Vector2 = Vector2(64, 64)
@export var enemies: Array[Combatant] = []
@export var allies: Array[Ally] = []
@export var battle_back: Texture2D
@export var battle_music: AudioStream

var battle_grid: BattleGrid
var highlight_grid: TileMapLayer
var selected_combatant: Combatant
var _selected_combatant_index := 0

# Called when the node enters the scene tree for the first time.

func _ready() -> void:
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
	selected_combatant = allies[0] if allies.size() > 0 else null
	turn_start(selected_combatant)


func _process(_delta: float) -> void:
	if Input.is_action_just_pressed("ui_left"):
		selected_combatant.move_to_cell(selected_combatant.occupied_cell.neighbors[BattleGrid.Neighbors.LEFT])
	elif Input.is_action_just_pressed("ui_right"):
		selected_combatant.move_to_cell(selected_combatant.occupied_cell.neighbors[BattleGrid.Neighbors.RIGHT])
	elif Input.is_action_just_pressed("ui_up"):
		selected_combatant.move_to_cell(selected_combatant.occupied_cell.neighbors[BattleGrid.Neighbors.UP])
	elif Input.is_action_just_pressed("ui_down"):
		selected_combatant.move_to_cell(selected_combatant.occupied_cell.neighbors[BattleGrid.Neighbors.DOWN])
	elif Input.is_action_just_pressed("ui_accept"):
		if allies.size() > 0:
			_selected_combatant_index = (_selected_combatant_index + 1) % allies.size()
			selected_combatant = allies[_selected_combatant_index]
			turn_start(selected_combatant)
	pass

func set_position_in_grid(combatant: Combatant, cell_pos: Vector2i):
	if not combatant or not battle_grid:
		return
	var cell = battle_grid.get_cell(cell_pos)
	if not cell:
		return
	combatant.position = cell.position
	battle_grid.occupy_cell(cell_pos, combatant)

	
func turn_start(combatant: Combatant):
	if combatant is Ally:
		# for cell_row in battle_grid.grid:
		# 	for cell in cell_row:
		# 		cell.move_range = 999
		combatant.occupied_cell.calculate_move_range()
		for y in range(battle_grid.grid_height):
			for x in range(battle_grid.grid_width):
				var cell = battle_grid.grid[y][x]
				if cell.move_range <= selected_combatant.move_range:
					highlight_cell(Vector2i(x,y), HighlightTypes.MOVE)
				else:
					highlight_cell(Vector2i(x,y), HighlightTypes.NONE)
				
func  highlight_cell(cell_pos: Vector2i, highlight_type: HighlightTypes):
	if not highlight_grid:
		return
	highlight_grid.set_cell(cell_pos, 2, Vector2i(highlight_type,0))
	print("Highlighting cell at ", cell_pos, " with type ", highlight_type)