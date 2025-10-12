
# Set Turn

([Back to Index](../README.md#commands))  
([Back to Battle Commands](../README.md#battle-specific-commands))

Immediately set which entity's turn it is in a turn-based battle system.

## AI / Usage

`setturn` can be used by enemy AI controllers to force a specific entity to act next (e.g., chain attacks). Engines typically implement this by reordering the turn queue or adjusting internal timers.

## Syntax

```feyscript
setturn <entity_id>
```

## Parameters

- `<entity_id>` — id/name of the entity whose turn will be set.

## Examples

```feyscript
setturn self
```

## Notes

- This command manipulates turn order/state; its behavior depends on the battle engine implementation.

## See also

- [**damage**](damage.md)
- [**heal**](heal.md)
