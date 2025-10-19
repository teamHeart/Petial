# Set Background

([Back to Index](../README.md#commands))

Change the background image for the current scene. Optionally fade the transition and control the fade duration.

## Syntax

```feyscript
setbackground <image_path> [fade <true|false>] [<fade_duration>]
```

## Parameters

- `<image_path>` — path to the background image to use (required).
- `fade <true|false>` — optional: whether to fade the transition. Defaults to `false`.
- `<fade_duration>` — optional: duration in seconds for the fade when `fade true` is used. Defaults to `1.0`.

## Examples

```feyscript
# Fade to a new background over 2 seconds
setbackground "images/forest.png" fade true 2.0
```

```feyscript
# Replace the background immediately
setbackground "images/city.png"
```

## Notes

- Verify the image path is correct and the file is included with your project.
- If `fade` is omitted the background switches immediately.
- Fade behavior and performance may vary by platform and runtime.

## See also

- [**wait**](wait.md) — pause script execution for timing
- [**moveactor**](moveactor.md) — move actors on screen
- [**showactor**](showactor.md) — display an actor
- [**hideactor**](hideactor.md) — hide an actor
- [**music**](music.md) — play background music
- [**sound**](sound.md) — play short sound effects
- [**movecamera**](movecamera.md) — move the camera in the scene
