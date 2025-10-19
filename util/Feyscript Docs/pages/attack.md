# Attack

([Back to Index](../README.md#commands))  
([Back to Battle Commands](../README.md#battle-specific-commands))

Perform a basic attack action against a target. `attack` is a high-level primitive that the engine resolves into hit checks, damage calculation, animations, and effects.

## Syntax

```feyscript
attack <target> [power <value>] [as <element>] [chance <percent>]
```

## Parameters

- `<target>` — the target identifier (for example: `target`, `self`, or a local actor id).
- `power <value>` — optional override for attack power; if omitted the attacker's default is used.
- `as <element>` — optional element tag (for example `fire`, `ice`) that may affect resistances.
- `chance <percent>` — optional hit chance override (0–100).

## AI / Usage

`attack` is the canonical action used by enemy AI to perform a standard offensive action. Higher-level AI decisions (choose-target, decide-ability) will map to `attack` calls when a simple strike is appropriate.

## Examples

```feyscript
# Basic attack the chosen target
attack target
```

```feyscript
# Stronger, elemental attack with reduced hit chance
attack target power 120 as fire chance 75
```

## Notes

- Damage applied by `attack` uses the engine's damage formula (see `damage` for lower-level usage).
- Use `cast` for abilities that have additional mechanics (area, multi-hit, status application).

## See also

- [**damage**](damage.md) — lower-level damage primitive
- [**cast**](cast.md) — cast abilities/spells
- [**ai-primitives**](ai-primitives.md) — overview of AI primitives
