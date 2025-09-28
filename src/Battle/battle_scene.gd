class_name BattleScene
extends Node2D

@export var grid_size: Vector2i = Vector2i(8, 6)
@export var cell_size: Vector2 = Vector2(64, 64)
@export var enemies: Array[Combatant] = []
@export var allies: Array[Combatant] = []
@export var battle_back: Texture2D
@export var battle_music: AudioStream

var battle_grid: BattleGrid

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	pass 



func _process(_delta: float) -> void:
	pass
