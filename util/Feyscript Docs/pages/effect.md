# Effect

([Back to Index](../README.md#commands))

Apply a named visual effect to the screen or to a specific object. Effects can be one-shot (flash, tint) or persistent (sparkle, vignette) and often accept duration and intensity parameters.

## Syntax

```feyscript
effect <name> [target <actor_id|screen>] [duration <seconds>] [intensity <value>] [params...]
```

## Parameters

- `<name>` — the effect identifier (for example: `flash`, `tint`, `vignette`, `blur`, `sparkle`).
- `target <actor_id|screen>` — optional. Specify an actor id to apply the effect to that actor, or `screen` to affect the whole screen. If omitted, the default is `screen`.
- `duration <seconds>` — optional. How long the effect lasts (may be fractional).
- `intensity <value>` — optional. Numerical intensity or strength of the effect (semantics depend on the effect).
- `[params...]` — optional, effect-specific named parameters.

## Examples

```feyscript
# Sparkle an object briefly
effect sparkle target Gobdo duration 1 intensity 0.5
```

```feyscript
# Flash the screen white briefly
effect flash duration 0.2
```

```feyscript
# Tint a single actor blue for 3 seconds
effect tint target Gobdo duration 3 intensity 0.6 color "#5aa9ff"
```

## Notes

- Effect names and available parameters depend on your game's runtime and the engine's effect system. Check your engine docs for supported effects.
- When targeting an actor, the actor must exist and be visible for most visual effects to be noticeable.
- Use modest intensity and short durations for disruptive effects (flash) to avoid disorienting players.
- Combine `effect` with `wait` and `camera` commands to build cinematic moments.

## See also

- [**camera**](camera.md) — camera movements and shakes
- [**setbackground**](setbackground.md) — change the background image
- [**animation**](animation.md) — animate an actor's sprite
- [**sound**](sound.md) — play sound effects to accompany visual effects
