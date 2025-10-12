# Cast

([Back to Index](../README.md#commands))  
([Back to Battle Commands](../README.md#battle-specific-commands))

Use `cast` to perform a named ability or spell. `cast` is higher-level than `damage` or `apply` — the engine typically resolves the ability's effects, area, cost, and animations.

## Syntax

```feyscript
cast <ability_name> [<target>] [<x> <y>]
```

## Parameters

- `<ability_name>` — the identifier of the ability or spell (for example `fireball`, `healing_wave`). Each ability defines its target type (single-target, area, self, etc.).
- `<target>` — optional single-target identifier when the ability expects an actor target (for example `target` or `self`).
- `<x>` `<y>` — optional world coordinates for abilities that target a position/area. Use coordinates when the ability's definition expects a position rather than an actor id.

- Note: `<target>` and `<x> <y>` are mutually exclusive. If the ability requires a target, exactly one of these must be provided depending on the ability's target type.
- Abilities define their internal parameters (power, element, chance). Do not pass `power`, `as`, or `chance`.

## AI / Usage

Enemy AI will commonly call `cast` when executing non-trivial abilities. The AI decides when and whom to target; the engine applies the ability's effects according to its definition.

## Examples

```feyscript
# Single-target cast
cast lightning_bolt target
```

```feyscript
# Area cast at world coordinates (x, y)
cast meteor_shower 7 3
```

## Notes

- Use `cast` for complex abilities that may combine damage, status effects, or multiple hits.
- Validation: Engines should validate that calls to `cast` satisfy the ability's expected target type and report/ignore incorrect usages.
- If the ability targets an area, the coordinates must be valid within the battle grid.
- For simple HP-only effects, `damage` may be more explicit.

## See also

- [**attack**](attack.md) — simple physical attack primitive
- [**damage**](damage.md) — low-level damage primitive
- [**apply**](apply.md) — status effects
