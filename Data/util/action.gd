extends DBElement
class_name Action

@export var use_in_battle: bool = true
@export var use_outside_battle: bool = true
enum target_types {user = 0b1 << 0,ally = 0b1 << 1,enemy = 0b1 << 2,area = 0b1 << 3}
@export var target_type: int = target_types.enemy
enum action_types {physical = 0, magical = 1, healing = 2, status = 3}
@export var action_type: action_types = action_types.physical
enum aoe_types {single = 0, line = 1, plus = 2, square = 3, x = 4, line2 = 5, line3 = 6, wall3 = 7, wall5 = 8}
@export var aoe_type: aoe_types = aoe_types.single
@export var use_range: int = 1

@export var effect: String  = ""