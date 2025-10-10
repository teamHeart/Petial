extends Node2D
class_name BattleManager

# BattleManager
#
# Central controller for turn-based battles. Responsibilities:
# - Track all participating combatants (allies + enemies)
# - Compute and maintain the upcoming turn order using a speed-based timer
#   (turn timer interval is set as 1.0 / sqrt(speed) for each combatant).
# - Emit signals when the battle starts and when individual turns start/end
# - Maintain a lightweight battle and turn state machine so UI and scenes can
#   react to player vs enemy turns and sub-states (moving, selecting a command,
#   targeting, performing skills/items, etc.).
#
# Usage:
# - Add this node to your Battle scene and ensure combatants are in the
#   "Allies" and "Enemies" groups (or call `_initialize_combatants()` yourself)
# - Connect `turn_started`/`turn_ended` signals to UI/HUD or scene logic.
# - Call `change_battle_state()` to start or change states (e.g. START -> PLAYER_TURN)

# Signals
signal exited_state(old_state: TurnState) #():
signal entered_state(new_state: TurnState) #():
signal battle_started(turn_order: Array) #():
# Optional: emit battle_ended(victory: bool) when battle finishes
signal turn_ended(combatant: Combatant) #():
signal turn_started(combatant: Combatant) #():
signal turn_order_updated(turn_order: Array) #():
signal turn_order_altered() #():

# BattleState
# High level battle phases. Use `change_battle_state()` to transition.
enum BattleState {
	START,
	PLAYER_TURN,
	ENEMY_TURN,
	VICTORY,
	DEFEAT
}

'''# TurnState
# Granular per-combatant turn states. These represent sub-steps during a
# single combatant's turn (movement, selecting commands, using skills/items,
# attacking, waiting, guarding, etc.). UI and input code should switch behavior
# based on the current `turn_state`.'''

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
	INSTANT_WIN,
	FLEEING
}

# Current high-level battle state (START, PLAYER_TURN, ENEMY_TURN, ...).
@export var battle_state: int = BattleState.START

# Current granular turn state used during a combatant's turn.
@export var turn_state: int = TurnState.WAITING

# The combatant whose turn is currently active. Updated when `turn_started`
# is emitted and consumed by UI and input code.
@export var current_combatant: Combatant = null

# List of all combatants participating in this battle. Populated by
# `_initialize_combatants()` which gathers nodes in groups "Allies" and
# "Enemies".
@export var combatants: Array = []

# How many upcoming turns to precompute and keep in the queue. Increasing
# this makes the turn preview longer but costs a bit more CPU.
@export var turn_order_queue_size: int = 11
@export var turn_order_display_size: int = 9

static var instance: BattleManager

## Runtime fields
# The working queue of upcoming combatants (front is next to act).
var turn_order_queue: Array = []
# A display-friendly duplicate used for HUD updates.
var turn_order_display_queue: Array = []
# Simple counter of total turns elapsed in the battle.
var turn_count: int = 0


func _ready():
	instance = self
	battle_state = BattleState.START
	call_deferred("change_turn_state", TurnState.START_TURN)
	combatants = []

	# Note: don't call _start_battle() here automatically; the scene or
	# gameplay code should call `change_battle_state(BattleState.START)` to
	# initiate when ready (or call _start_battle() directly).


# Public: change the high-level battle state.
# new_state should be one of BattleState. This will run the transition
# logic associated with that state (for example, START will call
# `_start_battle()`). External systems (UI/hud/scene controllers) should
# call this to begin or update the battle flow.
func change_battle_state(new_state: int):
	if battle_state == new_state:
		return
	battle_state = new_state
	match battle_state:
		BattleState.START:
			_start_battle()
		BattleState.PLAYER_TURN:
			emit_signal("turn_started", current_combatant)
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

## change_turn_state(new_state)
# Manage the fine-grained state transitions for a single combatant's
# turn (MOVE, MOVING, SELECT_COMMAND, ATTACK, etc.). This enforces valid
# transitions and emits `turn_ended` when a turn completes.
func change_turn_state(new_state: int):
	if turn_state == new_state:
		return
	match turn_state:
		TurnState.START_TURN:
			if new_state == TurnState.MOVE:
				pass				# _start_turn()
			else:
				return
		TurnState.MOVE:
			if new_state in [TurnState.MOVING, TurnState.SELECT_COMMAND]:
				pass				# _start_moving()
			else:
				return
		TurnState.MOVING:
			if new_state == TurnState.MOVE:
				pass				# _end_moving()
			else:
				return
		TurnState.SELECT_COMMAND:
			if new_state in [TurnState.MOVE, TurnState.ATTACK, TurnState.ITEM_SELECT, TurnState.SKILL_SELECT, TurnState.GUARDING, TurnState.END_TURN, TurnState.FLEEING, TurnState.INSTANT_WIN]:
				pass				# _select_command()
			else:
				return
		TurnState.ATTACK:
			if new_state in [TurnState.ATTACKING, TurnState.SELECT_COMMAND]:
				pass				# _start_attacking()
			else:
				return
		TurnState.ATTACKING:
			if new_state == TurnState.END_TURN:
				pass				# _end_attacking()
			else:
				return
		TurnState.ITEM_SELECT:
			if new_state in [TurnState.ITEM_TARGET, TurnState.SELECT_COMMAND]:
				pass				# _start_item_targeting()
			else:
				return
		TurnState.ITEM_TARGET:
			if new_state in [TurnState.ITEM_USE, TurnState.ITEM_SELECT]:
				pass				# _start_item_use()
			else:
				return
		TurnState.ITEM_USE:
			if new_state == TurnState.END_TURN:
				pass				# _end_item_use()
			else:
				return
		TurnState.SKILL_SELECT:
			if new_state in [TurnState.SKILL_TARGET, TurnState.SELECT_COMMAND]:
				pass				# _start_skill_targeting()
			else:
				return
		TurnState.SKILL_TARGET:
			if new_state in [TurnState.SKILL_USE, TurnState.SKILL_SELECT]:
				pass				# _start_skill_use()
			else:
				return
		TurnState.SKILL_USE:
			if new_state == TurnState.END_TURN:
				pass				# _end_skill_use()
			else:
				return
		TurnState.GUARDING:
			if new_state == TurnState.END_TURN:
				pass				# _end_guarding()
			else:
				return
		TurnState.END_TURN:
			if new_state == TurnState.WAITING:
				emit_signal("turn_ended", current_combatant)
				pass
			else:
				return
		TurnState.WAITING:
			if new_state == TurnState.START_TURN:
				pass				# _waiting()
			else:
				return
		TurnState.FLEEING:
			if new_state == TurnState.END_TURN:
				pass				# _end_running()
			else:
				return

		TurnState.INSTANT_WIN:
			if new_state == TurnState.END_TURN:
				pass				# _end_instant_win()
			else:
				return

	emit_signal("exited_state", turn_state)
	turn_state = new_state
	emit_signal("entered_state", new_state)
	return


# Internal: begin the battle sequence.
# Side-effects:
# - emits `battle_started`
# - collects combatants and seeds their timers
# - builds initial turn order and triggers the first high-level state
func _start_battle():
	_initialize_combatants()
	turn_order_queue.clear()
	turn_order_display_queue.clear()
	_calculate_turn_order()
	emit_signal("battle_started", turn_order_queue)
	current_combatant = turn_order_queue[0]
	if turn_order_queue.size() > 0 and turn_order_queue[0] is Ally:
		change_battle_state(BattleState.PLAYER_TURN)
	else:
		change_battle_state(BattleState.ENEMY_TURN)


# Internal: fill `turn_order_queue` up to `turn_order_queue_size`.
# This simulates a simple timer system where each combatant has a
# `turn_timer`. The next to act has the lowest remaining timer; after
# selecting one we decrement everyone's timer by that minimum and reset
# the chosen combatant's timer to 1/sqrt(speed). The algorithm is
# deterministic and cheap and is intended for turn previews and simple
# initiative behavior.
func _calculate_turn_order():
	while turn_order_queue.size() < turn_order_queue_size:
		var min_turn_timer = 9999
		var next_combatant: Combatant = null
		# Find the combatant with the lowest turn timer
		for combatant in combatants:
			if combatant.turn_timer < min_turn_timer and not combatant.is_dead:
				min_turn_timer = combatant.turn_timer
				next_combatant = combatant
		if next_combatant:
			turn_order_queue.append(next_combatant)
			next_combatant.turn_counter += 1
			turn_count += 1
		for combatant in combatants:
			if not combatant.is_dead:
				combatant.turn_timer -= min_turn_timer
			if combatant == next_combatant:
				combatant.turn_timer = 1.0/sqrt(combatant.speed)
	turn_order_display_queue = turn_order_queue.duplicate()

# Called when the active combatant completes their turn. Expected behavior:
# - If the finished combatant is at the front of the queued turns, remove it.
# - Recalculate the queue to refill upcoming entries.
# - Emit `turn_started` for the new front combatant so UI/scene can react.
func _on_turn_ended(combatant: Combatant):
	turn_state = TurnState.END_TURN
	if turn_order_queue.size() > 0 and combatant == turn_order_queue[0]:
		turn_order_queue.pop_front()
		_calculate_turn_order()
		emit_signal("turn_order_updated", turn_order_queue)
		if turn_order_queue.size() > 0:
			emit_signal("turn_started", turn_order_queue[0])
	return

func alter_turn_order():
	for combatant in combatants:
		combatant.predicted_turn_timer = combatant.turn_timer
	turn_order_queue.clear()
	_calculate_turn_order()
	emit_signal("turn_order_altered")

# Called when a combatant's turn is starting. Sets `current_combatant` and
# switches the high-level battle state so input/AI can be handled correctly.
func _on_turn_started(combatant: Combatant):
	current_combatant = combatant
	if combatant is Ally:
		change_battle_state(BattleState.PLAYER_TURN)
	else:
		change_battle_state(BattleState.ENEMY_TURN)
	# emit_signal("entered_state", TurnState.START_TURN)
	change_turn_state(TurnState.START_TURN)
	# (get_parent() as BattleScene).call_deferred("turn_start", combatant)
	return


# Process any status effects that should occur at the start of a turn.
# This is a stub: concrete implementations should iterate over the
# `current_combatant`'s status list and apply damage/healing/buffs/debuffs
# and decrement durations.
func _process_status_effects():
	# stub for processing status effects at the start of a turn
	pass



# Gather Combatant nodes from the scene. Expects that allies are in the
# "Allies" group and enemies in the "Enemies" group. Seeds each combatant's
# `turn_timer` with 1.0 / sqrt(speed) as the initial interval.
func _initialize_combatants():
	combatants.clear()
	combatants.append_array((get_parent() as BattleScene).allies)
	combatants.append_array((get_parent() as BattleScene).enemies)
	for combatant in combatants:
		if combatant is Combatant:
			combatant.turn_timer = 1.0 / sqrt(combatant.speed)
			combatant.turn_counter = 0
	return
