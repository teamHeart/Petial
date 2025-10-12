
# Move

([Back to Index](../README.md#commands))  
([Back to Battle Commands](../README.md#battle-specific-commands))

Move the current actor (the one executing the script, i.e. `self`) to a position on the battle grid. `move` is used by AI for repositioning, flanking, or retreating.

## Syntax

```feyscript
move <x> <y>
```

## Parameters

- `<x>` `<y>` — battle grid coordinates to move to.

## AI / Usage

Enemy AI will use `move` to reposition before attacks, to seek cover, or to execute movement patterns. The engine is responsible for pathfinding and collision handling; if your engine supports interpolation or easing, handle that internally.

## Examples

```feyscript
# Move self to coordinates
move 120 200
```

```feyscript
# Step to a nearby tile
move 121 200
```

## Notes

- will move the actor to the specified grid coordinates while avoiding obstacles and staying within the actor's movement range.
- If the target position is unreachable, the actor will move as close as possible.

## See also

- [**attack**](attack.md)
- [**wait**](wait.md)
