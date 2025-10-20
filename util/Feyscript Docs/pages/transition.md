# Transition

([Back to Index](../README.md#commands))

Switch between two scenes using a named transition effect. Transitions typically combine fades, wipes, or other visual effects and accept duration parameters.

## Syntax

```feyscript
transition <type> <to_scene> [duration <seconds>] [params...]
```

## Parameters

- `<type>` — name of the transition effect (for example: `fade`, `wipe`, `slide`, `zoom`, `dissolve`, etc.).
- `<to_scene>` — identifier or path of the scene to switch to.
- `duration <seconds>` — optional: how long the transition takes.
- `[params...]` — optional transition-specific parameters.

## Examples

```feyscript
# Simple crossfade to the next scene over 1.2 seconds
transition fade next_scene duration 1.2
```

```feyscript
# Slide to the 'menu' scene
transition slide menu duration 0.8 direction left
```

## Notes

- The list of available transition types depends on the engine/runtime.
- Use `fadeout`/`fadein` for simple scene switches if a named transition isn't available.

## See also

- [**fadeout**](fadeout.md) — fade the screen to black
- [**fadein**](fadein.md) — fade the screen in from black
