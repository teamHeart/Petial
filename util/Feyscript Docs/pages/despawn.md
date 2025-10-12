# Despawn

([Back to Index](../README.md#commands))  
([Back to Battle Commands](../README.md#battle-specific-commands))

Remove an entity that was spawned or present in the scene.

## AI / Usage

`despawn` is often used by enemy AI or scripted events to remove temporary actors during a fight. Engines may run cleanup steps (free resources, remove from turn order) when this command is executed.

## Syntax

```feyscript
despawn <local_name>
```

## Parameters

- `<local_name>` — identifier of the entity to remove.

## Examples

```feyscript
despawn Gobdo
```

## Notes

- Despawning a persistent or essential entity may cause script errors; ensure it's safe to remove.

## See also

- [**spawn**](spawn.md) — create entities
