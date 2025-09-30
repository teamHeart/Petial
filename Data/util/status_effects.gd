extends Node
class_name StatusEffects
## This class manages status effects for entities in the game.
## It provides methods to apply, remove, and check status effects.

enum StatusEffect {
	POISONED	= 0b1 << 0, # Cured with [[ITEM]],Damage over time
	REGEN		= 0b1 << 1, # Cured with [[ITEM]],Health regeneration over time
	STUNNED		= 0b1 << 2, # Cured with [[ITEM]],Unable to act
	SLOWED		= 0b1 << 3, # Cured with [[ITEM]],Reduced turn speed, mutually exclusive with HASTED
	HASTED		= 0b1 << 4, # Cured with [[ITEM]],Increased turn speed, mutually exclusive with SLOWED
	BURNING		= 0b1 << 5, # Cured with [[ITEM]],Damage over time, healed by water, mutually exclusive with FROZEN
	FROZEN		= 0b1 << 6, # Cured with [[ITEM]],Unable to act, healed by fire, limited time duration, damage over time, mutually exclusive with BURNING
	SHIELDED	= 0b1 << 7, # Cured with [[ITEM]],Greatly reduced damage taken
	INVISIBLE	= 0b1 << 8, # Cured with [[ITEM]],Cannot be targeted by enemies
	CONFUSED	= 0b1 << 9, # Cured with [[ITEM]],May act randomly
	CHARMED		= 0b1 << 10,# Cured with [[ITEM]],Won't take actions that harm enemies
	SILENCED	= 0b1 << 11,# Cured with [[ITEM]],Cannot use magic abilities
	ROOTED		= 0b1 << 12,# Cured with [[ITEM]],Cannot move, can still act
	BLINDED		= 0b1 << 13,# Cured with [[ITEM]],Reduced accuracy
	WEAKENED	= 0b1 << 14,# Cured with [[ITEM]],Reduced damage output
	VULNERABLE	= 0b1 << 15 # Cured with [[ITEM]],Increased damage taken
}
