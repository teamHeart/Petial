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
"""
Feyscript Primer
Plain-English Feyscript (overview)
- Purpose: a tiny, human-readable language to describe item/skill effects so non-programmers can write behavior.
- Style: one statement per line, reads like short English sentences. Keep it simple: verb + object + target + optional qualifiers.

Basic building blocks
- Statements: do damage 50 to target
- Verbs: do/deal, heal, apply, remove, set, add, grant, consume, revive, teleport, wait, show
- Targets: user, self, target, ally, all_allies, enemy, all_enemies, area, everyone
- Qualifiers: if <condition>, chance <percent>, duration <turns>, repeat <n>, as <type>, from <source>

Conditions & expressions
- Simple comparisons: user.hp < 50, target.status(frozen) == true
- Supported operators: <, <=, ==, !=, >=, >, and, or, not
- Simple functions/vars: user.hp, target.hp, user.mp, user.level, rand(a,b), target.status(name)

Grouping & control
- Blocks: use "then" on the same line or curly braces for multi-line blocks
	- if target.hp <= 0 then revive target
	- if user.level >= 5 { add atk 10 to user duration 3 }
- repeat n times { ... } runs statements n times
- sequence { ... } ensures statements are treated as one atomic effect

Common patterns
- Flat damage: do damage 50 to target
- Elemental: do damage 30 to target as fire
- Conditional heal: heal 40 to ally if ally.hp < 50
- Status with chance: apply stunned to target chance 30 duration 1
- Area attack: do damage 20 to all_enemies as wind

Comments and whitespace
- Comments start with #: # this is a comment
- Blank lines separate logical blocks; indentation is optional (use braces for nesting)

Parsing notes for implementer (concise)
- Tokenize by whitespace; treat quoted strings as single tokens for named statuses
- Prefer a simple AST: Statement -> Verb + Args + OptionalModifiers
- Allow natural order variations: both "do 50 damage to target" and "do damage 50 to target" should be accepted
- Make parsing forgiving: accept synonyms (target/target_1/first_target) and map to canonical internal names

Short examples
- do damage 50 to target
- heal 30 to ally if ally.hp <= 40
- apply poison to target chance 25 duration 3
- if target.status(dead) then revive target
- sequence { do damage 10 to all_enemies; apply slow to all_enemies duration 2 }

Keep it plain and restartable: prefer short verbs, explicit targets, and optional clauses at the end (if/chance/duration).

"""
@export var effect: String  = ""