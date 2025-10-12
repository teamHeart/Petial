# Heal

([Back to Index](../README.md#commands))  
([Back to Battle Commands](../README.md#battle-specific-commands))

Restore health to a target. `heal` can restore a fixed amount or be used as a modifier for abilities.

## AI / Usage

`heal` is a common primitive used by enemy AI to recover allies. High-level AI behaviors (support, prioritize-low-hp) will map to `heal` calls after deciding targets and amounts.

## Syntax

```feyscript
heal <target> <amount> [chance <percent>]
```

## Parameters

- `<target>` — the target identifier (actor id, enemy id, or `target`).
- `<amount>` — numeric amount to restore.
- `chance <percent>` — optional chance the heal occurs.

## Examples

```feyscript
heal self 50
```

```feyscript
# 75% chance to heal an ally for 30
heal target 30 chance 75
```

## Notes

- Healing interactions (overheal, shields) depend on the battle system implementation.

## See also

- [**damage**](damage.md) — deal damage to targets
- [**apply**](apply.md) — apply status effects
