# Sound

The `sound` command is used to play sound effects in the game. It can be used to enhance the player's experience by adding audio cues for various actions or events.

## Syntax

```feyscript
sound <sound_name>
```

## Parameters

- `<sound_name>`: The name of the sound effect to be played. This should correspond to a sound file that has been added to the game's resources.

## Example

```feyscript
sound "door_open.wav"
```

```feyscript
loop 3
  sound "tick.wav"
  wait 1
endloop
sound "explosion.wav"
```

## Notes

- Ensure that the sound files are properly added to the game's resources and that the names used in the `sound` command match the file names.
- The `sound` command can be used in various parts of the script, such as in response to player actions or during specific events in the game.
- Multiple sound effects can be played in succession by using multiple `sound` commands in conjunction with the `wait` command to control timing.
- Be mindful of the overall audio experience; avoid playing too many sounds at once, which can lead to a cluttered and overwhelming auditory environment for the player.

## See Also
- [**music**](./music.md) - For background music control.
- [**wait**](./wait.md) - To control timing between sound effects.
- [**animation**](./animation.md) - To synchronize sound effects with animations.