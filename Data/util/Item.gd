class_name Item
extends "res://Data/util/DBElement.gd"

@export_placeholder( "Item description" ) var description: String = ""
@export var price: int = 0
@export var consumable: bool = true
@export var targetSelf: bool = true
@export var targetAlly: bool = false
@export var targetEnemy: bool = false
@export var targetAll: bool = false
@export var battleUsable: bool = true
@export var fieldUsable: bool = true
@export var battleAnimation: String = "Heal"
@export var fieldAnimation: String = "Heal"
@export var effects: Array = []
@export var icon: Texture2D

