Feyscript Primer
Feyscript (overview)
- Purpose: a tiny, human-readable language to describe events.
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

Common patterns
- Attack damage: do damage 50 to target
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
- damage 50 to target
- heal 30 to self
- apply poison to target chance 25 duration 3
- 
	if target is frozen \
	&emsp;remove frozen from target \
	&emsp;say "Fire melts ice!" \
	else \
	&emsp;apply burning to target chance 25% duration 3 \
	&emsp;do damage 40 to target as fire \
	&emsp;if target is burning \
	&emsp;&emsp;say "Target is burning!" \
	&emsp;done \
	done

Keep it plain and restartable: prefer short verbs, explicit targets, and optional clauses at the end (if/chance/duration).\
Avoid complex nesting or advanced programming constructs; focus on clarity and simplicity for non-programmers.\
This primer provides a concise overview of Feyscript's syntax and semantics, focusing on clarity and ease of use for non-programmers while also giving implementers the necessary parsing guidelines.\
For more detailed examples and edge cases, refer to the full documentation.
