# Use

([Back to Index](../README.md#commands))  
([Back to Battle Commands](../README.md#battle-specific-commands))

Use an item or inventory object. Items are defined in the game's data and carry their own effects (healing, buffs, revival, etc.).

## Syntax

```feyscript
use <item_id> [<target>] [<x> <y>]
```

## Parameters

- `<item_id>` — identifier of the item to use (for example `potion_small`, `bomb`).
- `<target>` — optional actor id when the item targets an actor.
- `<x>` `<y>` — optional coordinates for position-based items (throwables, area items).
- Note: `<target>` and `<x> <y>` are mutually exclusive. If the item requires a target, exactly one of these must be provided depending on the item's target type.

## AI / Usage

Enemy AI may `use` items to simulate consumable behaviors (self-heal, throw bomb). AI scripts should check availability (inventory, charges) before calling `use`.

## Examples

```feyscript
# Use a potion on self
use potion_small self
```

```feyscript
# Throw a bomb at coordinates
use bomb 4 7
```

## Notes

- Items and their effects are defined in game data; `use` triggers those definitions.
- Consider creating helper functions for common item usage patterns in AI scripts.
- Validation: Engines should validate that calls to `use` satisfy the item's expected target type and report/ignore incorrect usages.

## See also

- [**cast**](cast.md) — ability/spell primitive
- [**heal**](heal.md) — heal primitive
