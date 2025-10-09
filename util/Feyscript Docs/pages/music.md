# Music

The `music` command is used to control music playback in a Feyscript script. It allows you to play, pause, stop, and manage music tracks, as well as control volume fade-in and fade-out.

## Syntax

```feyscript
music <action> [parameters]
```

## Parameters

- `play <track>`: Plays the specified music track. The track can be a file path or a predefined track name.
- `pause`: Pauses the currently playing music track.
- `stop`: Stops the currently playing music track.
- `fadein <duration>`: Fades in the music over the specified duration (in seconds).
- `fadeout <duration>`: Fades out the music over the specified duration (in seconds).
- `fadeto <duration> <track>`: Fades out the current music over the specified duration and then plays the specified track.
- `setvolume <level>`: Sets the music volume to the specified level (0 to 100).
- `loop <true|false>`: Sets whether the music should loop when it reaches the end.

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
- Ensure that the music files are in a supported format (e.g., MP3, WAV).
- The `fadein` and `fadeout` actions can be used to create smooth transitions between music tracks.
- The `loop` parameter is useful for background music that should play continuously.
- Volume levels are typically set between 0 (mute) and 100 (maximum volume).
- You can combine multiple music commands to create complex audio experiences in your scripts.
- The `fadeto` action is particularly useful for transitioning between different scenes or moods in your script.
- Make sure to test your music commands to ensure they work as expected in your specific environment or application.

## See Also

- [**sound**](./sound.md): For controlling sound effects in your script.
- [**animation**](./animation.md): For controlling animations in your script.
- [**wait**](./wait.md): For adding delays in your script.