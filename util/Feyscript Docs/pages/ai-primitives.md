# AI Primitives

([Back to Index](../README.md#commands))  
([Back to Battle Commands](../README.md#battle-specific-commands))

This page describes the high-level AI primitives that enemy scripts typically use to express behavior in battles. These commands are intentionally coarse-grained: the battle engine resolves them into lower-level operations (target selection, pathing, turn queue updates, animation triggers, resource checks).

## Purpose

- Give AI authors a small, readable vocabulary to express enemy behaviors.
- Keep AI logic declarative and easy to reason about (for example: "if low HP, retreat").
- Make it straightforward to map behavior tree or state-machine decisions to script-level commands.

## Common primitives

- `attack <target>` — perform a standard attack. The engine will resolve damage, animations, and hit checks.
- `cast <target> <spell>` — cast a named spell/ability on a target or area.
- `use <target> <item>` — use an item effect (healing, buff) on a target.
- `move <x> <y>` — reposition to coordinates (used by ambushers or repositioning behaviors).
- `spawn <type> <db> <local> <x> <y>` — introduce a new actor (minions, summons).
- `despawn <local>` — remove a previously spawned actor.
- `flee` — attempt to exit battle; engines translate to movement and chance checks.
- `heal <target> <amount>` — recover HP for an ally or self.
- `apply <target> <effect_name>` — apply a status effect (for example: `poisoned`, `stunned`).
- `setturn <entity>` — change turn order (use sparingly; engine may clamp or deny abuse).
- `endbattle [result <win|lose|flee>]` — force the battle to end (rare; used for scripted outcomes).

## Example behaviours

### Aggressor

````feyscript
# Aggressor: attack strongest threat, otherwise pick a random target
if Global.threat_table[enemy_id].max == true
  attack Global.threat_table[enemy_id]
else
  attack target
done
````

### Supporter

````feyscript
# Supporter: heal lowest-HP ally if below threshold; otherwise apply buff
if ally.hp <= 30
  heal ally 50
else
  apply ally stunned  # example: keep target unable to act
done
````

### Ambusher

````feyscript
# Ambusher: move into position then attack
move 120 200
attack player
````

## Best practices

- Keep AI decisions at a high level — let the engine handle low-level mechanics (hit calculations, animation timing). This keeps scripts portable and readable.
- Use descriptive local names for spawned actors (for example: `summon1`) so subsequent references are clear.
- Prefer `apply` for status effects and `damage` for raw HP changes when implementing complex abilities.
- Limit direct `setturn` usage; prefer normal turn queue manipulation unless you need scripted chains.

## See also

- [**spawn**](spawn.md)
- [**despawn**](despawn.md)
- [**attack**](attack.md)  (next in README list)
- [**cast**](cast.md)
- [**use**](use.md)
- [**move**](move.md)
- [**flee**](flee.md)
- [**heal**](heal.md)
- [**apply**](apply.md)
- [**setturn**](setturn.md)
- [**endbattle**](endbattle.md)
