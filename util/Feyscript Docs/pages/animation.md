# Animation

The `animation` command is used to play animations on entities. It can be used to play a specific animation or to stop an animation that is currently playing.

## Syntax

```feyscript
animation <entity> <animation_name|stop> [loop <true|false>]
```

## Parameters

- `<entity>`: The target entity on which the animation will be played. This can be a player, NPC, or any other entity that supports animations.
- `<animation_name|stop>`: The name of the animation to play or the keyword `stop` to stop the current animation.
- `[loop]` (optional): If specified, the animation will loop continuously until stopped.

## Examples

```feyscript
# Play a walk animation on the player
animation player walk true
```

```feyscript
# Stop the current animation on an NPC
animation npc1 stop
```

```feyscript
# Play a dance animation on an entity without looping
animation entity1 dance false
```

## Notes

- Ensure that the animation name provided is valid and supported by the entity.
- The `loop` parameter is optional and defaults to `false` if not specified.
- Stopping an animation will revert the entity to its default state.
- Some entities may not support certain animations, so check the entity's capabilities before using the command.
- The `animation` command can be combined with other commands to create complex behaviors and interactions in your scripts.
- Use the `animation` command in conjunction with event triggers to create dynamic and responsive animations based on game events.
- Be mindful of performance when using multiple animations simultaneously, as this may impact game performance.
- Test animations in different scenarios to ensure they behave as expected across various entity states and environments.
- Consider using the `animation` command in cutscenes or scripted events to enhance storytelling and immersion.

## See Also
- [**music**](./music.md) - Play music tracks.
- [**sound**](./sound.md) - Play sound effects.
- [**moveactor**](./moveactor.md) - Move entities to specified locations.
- [**wait**](./wait.md) - Pause script execution for a specified duration.