# Music

([Back to Index](../README.md#commands))

Controls background music playback. Use `music` to play, stop, fade,
and adjust volume for music tracks used by your game.

## Syntax

```feyscript
music play <track>
music stop
music pause
music fadein <seconds>
music fadeout <seconds>
music fadeto <seconds> <track>
music setvolume <level>
music loop <true|false>
```

## Subcommands (short reference)

### play

`music play <track>` — start playing the specified track immediately.

### stop

`music stop` — stop playback of the current track.

### pause

`music pause` — pause the current track; playback may be resumable.

### fadein

`music fadein <seconds>` — fade audio in over the given duration.

### fadeout

`music fadeout <seconds>` — fade audio out over the given duration.

### fadeto

`music fadeto <seconds> <track>` — crossfade to a new track over duration.

### setvolume

`music setvolume <volume>` — set master music volume (0–100).

### loop

`music loop <true|false>` — enable or disable looping for the current track.

## Parameters

- `<track>` — track name or file path to play.
- `<seconds>` — number of seconds for fade operations (may be fractional).
- `<volume>` — numeric volume level (typically 0–100).
- `<true|false>` — boolean flag to enable/disable looping.

## Examples

```feyscript
music setvolume 0
music play "background.mp3"
music fadein 5
```

```feyscript
music fadeout 3
music stop
music play "villain_theme.mp3"
music loop true
music fadein 2
```

```feyscript
music setvolume 50
music play "battle_theme.mp3"
```

## Notes

- Ensure music files are in a supported format (MP3, WAV, OGG, etc.).
- Use `fadein`/`fadeout` for smooth transitions between tracks.
- `fadeto` lets you crossfade to a new track over a duration.
- Volume ranges and behavior may depend on the runtime; test on your target platform.

## See also

- [**sound**](sound.md) — control short sound effects
- [**animation**](animation.md) — visual transitions and animations
- [**wait**](wait.md) — pause script execution for timing
