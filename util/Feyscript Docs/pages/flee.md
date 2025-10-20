# Flee

([Back to Index](../README.md#commands))  
([Back to Battle Commands](../README.md#battle-specific-commands))

Attempt to flee from battle. Success may depend on chance, enemy resistances, or battle rules.

## AI / Usage

`flee` is a high-level action intended for both player and enemy AI to attempt exiting a battle. Enemy AI can call `flee` as part of a retreat behavior; engines translate it into pathfinding, chance checks, and turn consumption as needed.

## Syntax

```feyscript
flee [chance <percent>]
```

## Parameters

- `chance <percent>` — optional: override the base flee chance.

## Examples

```feyscript
flee
```

```feyscript
flee chance 60
```

## Notes

- Outcome depends on the battle system; fleeing may fail and consume a turn.

## See also

- [**endbattle**](endbattle.md) — force the battle to end
