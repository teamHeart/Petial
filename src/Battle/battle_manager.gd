extends Node2D
class_name BattleManager

# Signals
signal battle_started
signal battle_ended(victory: bool)
signal turn_ended(combatant: Combatant)
signal turn_started(combatant: Combatant)
signal action_performed(action: Action, performer: Combatant, target: Node2D)

enum BattleState {
		START,
		PLAYER_TURN,
		ENEMY_TURN,
		VICTORY,
		DEFEAT
}
enum TurnState {
		START_TURN,
		MOVE,
		MOVING,
		SELECT_COMMAND,
		ATTACK,
		ATTACKING,
		ITEM_SELECT,
		ITEM_TARGET,
		ITEM_USE,
		SKILL_SELECT,
		SKILL_TARGET,
		SKILL_USE,
		WAITING,
		GUARDING,
		END_TURN,
		RUNNING
}

@export var battle_state: int = BattleState.START
@export var turn_state: int = TurnState.MOVE
@export var current_combatant: Combatant = null
@export var combatants: Array = []
@export var turn_order_queue_size: int = 33
@export var turn_order_display_size: int = 9

static var instance: BattleManager = self

var turn_order_queue: Array = []
var turn_order_display_queue: Array = []
var turn_count: int = 0
var current_turn_change_value: int = 0


func _ready():
	instance = self
	battle_state = BattleState.START
	turn_state = TurnState.MOVE
	combatants = []

func change_battle_state(new_state: int) -> void:
	if battle_state == new_state:
		return 
	battle_state = new_state
	match battle_state:
		BattleState.START:
			_start_battle()
		BattleState.PLAYER_TURN:
			# _start_player_turn()
			pass
		BattleState.ENEMY_TURN:
			# _start_enemy_turn()
			pass
		BattleState.VICTORY:
			# _end_battle(true)
			pass
		BattleState.DEFEAT:
			# _end_battle(false)
			pass
	return 

func change_turn_state(new_state: int) -> bool:
	if turn_state == new_state:
		return false
	match turn_state:
		TurnState.START_TURN:
			if new_state == TurnState.MOVE:
				turn_state = new_state
				# _start_turn()
				return true
		TurnState.MOVE:
			if new_state in [TurnState.MOVING, TurnState.SELECT_COMMAND]:
				turn_state = new_state
				# _start_moving()
				return true
		TurnState.MOVING:
			if new_state == TurnState.MOVE:
				turn_state = new_state
				# _end_moving()
				return true
		TurnState.SELECT_COMMAND:
			if new_state in [TurnState.MOVE, TurnState.ATTACK, TurnState.ITEM_SELECT, TurnState.SKILL_SELECT, TurnState.GUARDING, TurnState.END_TURN, TurnState.RUNNING]:
				turn_state = new_state
				# _select_command()
				return true
		TurnState.ATTACK:
			if new_state in [TurnState.ATTACKING, TurnState.SELECT_COMMAND]:
				turn_state = new_state
				# _start_attacking()
				return true
		TurnState.ATTACKING:
			if new_state == TurnState.END_TURN:
				turn_state = new_state
				# _end_attacking()
				return true
		TurnState.ITEM_SELECT:
			if new_state in [TurnState.ITEM_TARGET, TurnState.SELECT_COMMAND]:
				turn_state = new_state
				# _start_item_targeting()
				return true
		TurnState.ITEM_TARGET:
			if new_state in [TurnState.ITEM_USE, TurnState.ITEM_SELECT]:
				turn_state = new_state
				# _start_item_use()
				return true
		TurnState.ITEM_USE:
			if new_state == TurnState.END_TURN:
				turn_state = new_state
				# _end_item_use()
				return true
		TurnState.SKILL_SELECT:
			if new_state in [TurnState.SKILL_TARGET, TurnState.SELECT_COMMAND]:
				turn_state = new_state
				# _start_skill_targeting()
				return true
		TurnState.SKILL_TARGET:
			if new_state in [TurnState.SKILL_USE, TurnState.SKILL_SELECT]:
				turn_state = new_state
				# _start_skill_use()
				return true
		TurnState.SKILL_USE:
			if new_state == TurnState.END_TURN:
				turn_state = new_state
				# _end_skill_use()
				return true
		TurnState.GUARDING:
			if new_state == TurnState.END_TURN:
				turn_state = new_state
				# _end_guarding()
				return true
		TurnState.END_TURN:
			if new_state == TurnState.WAITING:
				turn_state = new_state
				# _end_turn()
				return true	
		TurnState.WAITING:
			if new_state == TurnState.START_TURN:
				turn_state = new_state
				# _waiting()
				return true
		TurnState.RUNNING:
			if new_state == TurnState.END_TURN:
				turn_state = new_state
				# _end_running()
				return true
	return false

func _start_battle():
	emit_signal("battle_started")
	_initialize_combatants()
	_calculate_turn_order()
	if turn_order_queue[0] is Ally:
		change_battle_state(BattleState.PLAYER_TURN)
	else:
		change_battle_state(BattleState.ENEMY_TURN)

func _calculate_turn_order():
	turn_order_queue.clear()
	turn_order_display_queue.clear()
	while turn_order_queue.size() < turn_order_queue_size:
		var min_turn_timer = 9999
		var next_combatant: Combatant = null
		# Find the combatant with the lowest turn timer
		for combatant in combatants:
			if combatant.turn_timer < min_turn_timer:
				min_turn_timer = combatant.turn_timer
				next_combatant = combatant
		if next_combatant:
			turn_order_queue.append(next_combatant)
		for combatant in combatants:
			combatant.turn_timer -= min_turn_timer
			if combatant == next_combatant:
				combatant.turn_timer = 1.0/sqrt(combatant.speed)
	turn_order_display_queue = turn_order_queue.duplicate() 
	turn_order_display_queue.resize(turn_order_display_size)
	update_turn_order_display()
	return

func update_turn_order_display():
	pass
"""
	var hud = get_node("/root/Main/HUD")
	if hud:
  	hud.update_turn_order(turn_order_display_queue)
  return	
"""

func _initialize_combatants():
	combatants.clear()
	var allies = get_tree().get_nodes_in_group("Allies")
	var enemies = get_tree().get_nodes_in_group("Enemies")
	for ally in allies:
		if ally is Combatant:
			combatants.append(ally)
	for enemy in enemies:
		if enemy is Combatant:
			combatants.append(enemy)
	return

