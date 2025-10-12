# Apply

([Back to Index](../README.md#commands))  
([Back to Battle Commands](../README.md#battle-specific-commands))

Apply a status effect to a target (for example: poisoned, stunned, burned). These effects usually have durations and may modify behavior.

## AI / Usage

`apply` is a typical low-level effect primitive used by both player and enemy AI after deciding on a target and effect. Enemy AI behaviors (for example, use-poison, interrupt-target) map to `apply` calls when executed by the battle engine.

## Syntax

```feyscript
apply <target> <effect_name> [duration <turns>] [chance <percent>]
```

## Parameters

- `<target>` — the target to receive the effect.
- `<effect_name>` — identifier of the status effect (for example `poisoned`, `stunned`).
- `duration <turns>` — optional duration in turns. If omitted, the effect lasts indefinitely or until removed.
- `chance <percent>` — optional percentage chance the effect applies (0–100). Defaults to 100 if omitted.

## Examples

```feyscript
apply target poisoned duration 4 chance 100
```

```feyscript
apply self stunned duration 1
```

## Notes

- All status effect names are the past participle form of the effect (for example: `poisoned`, `burned`, `frozen`).
- Applying an effect that the target already has may refresh or stack the effect, depending on game mechanics.
- Effects depend on the game's status system. Use `remove` to clear effects early.
- Some effects may stack or have special interactions; check your game's mechanics.
- Use `damage` for direct HP changes rather than status effects.

## See also

- [**remove**](remove.md) — remove status effects
- [**damage**](damage.md) — direct HP changes
