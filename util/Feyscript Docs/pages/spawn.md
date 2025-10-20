# Spawn

([Back to Index](../README.md#commands))  
([Back to Battle Commands](../README.md#battle-specific-commands))

Spawn a new entity (enemy, ally, or object) into the battle or scene.

## AI / Usage

This command is commonly used by enemy AI scripts as a high-level primitive to introduce new actors into a battle. Implementations may expand `spawn` into multiple lower-level operations (allocate ID, place on map, enqueue turn) when executed by the battle engine.

## Syntax

```feyscript
spawn <type> <database_name> <local_name> <x> <y> [properties...]
```

## Parameters

- `<type>` — type of entity (`enemy`, `ally`, `object`).
- `<database_name>` — name in the game's database.
- `<local_name>` — script-local identifier for the spawned entity.
- `<x>` `<y>` — battle grid coordinates where the entity will appear.

## Examples

```feyscript
spawn enemy Goblin Gobdo 10 20
```

## Notes

- The coordinate (0, 0) is the top-left of the battle grid; coordinates increase to the right and downward.
- Use `despawn` to remove spawned entities when no longer needed.

## See also

- [**despawn**](despawn.md) — remove entities
