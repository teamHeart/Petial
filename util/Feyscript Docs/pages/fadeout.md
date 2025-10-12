# Fade Out

([Back to Index](../README.md#commands))

Fade the screen out to black (or another color). Useful when leaving a scene or ending a cutscene.

## Syntax

```feyscript
fadeout <seconds> [color <hex|name>]
```

## Parameters

- `<seconds>` — duration of the fade-out in seconds (may be fractional).
- `color <hex|name>` — optional. The color to fade to (default: black).

## Examples

```feyscript
# Fade out to black over 1.0 seconds
fadeout 1.0
```

```feyscript
# Fade out to red over 0.6 seconds
fadeout 0.6 color "#ff0000"
```

## Notes

- Fade behavior depends on engine support for color and blending.
- Use `fadeout` before `fadein` when switching scenes for a smooth transition.

## See also

- [**fadein**](fadein.md) — fade the screen in from black
- [**transition**](transition.md) — transition between scenes with effects
