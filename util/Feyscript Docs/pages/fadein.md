# Fade In

([Back to Index](../README.md#commands))

Fade the screen in from black (or another color) to the current scene. Useful for smooth scene entrances and transitions.

## Syntax

```feyscript
fadein <seconds> [color <hex|name>]
```

## Parameters

- `<seconds>` — duration of the fade-in in seconds (may be fractional).
- `color <hex|name>` — optional. The color to fade from (default: black). Accepts hex like `#000000` or named colors where supported.

## Examples

```feyscript
# Fade in over 1.5 seconds from black
fadein 1.5
```

```feyscript
# Fade in from white over 0.8 seconds
fadein 0.8 color "#ffffff"
```

## Notes

- Fade behavior (color support and exact timing) depends on the runtime/engine implementation.
- Combine `fadein` with `music fadein` or `sound` commands to build polished scene entrances.

## See also

- [**fadeout**](fadeout.md) — fade the screen to black
- [**transition**](transition.md) — transition between scenes with effects
