# Set Actor

The `setactor` command is used to change the current sprite of an actor in the scene. This command is useful for updating the visual representation of characters during a scene.

## Syntax

```
setactor <actor_id> <sprite_id>
```

## Parameters

- `<actor_id>`: The identifier of the actor whose sprite you want to change. This should match the ID used when the actor was created.
- `<sprite_id>`: The identifier of the new sprite to assign to the actor. This should correspond to a sprite that has been previously defined in the project.

## Example

```feyscript
setactor Nim IdleLeft
```

## Notes

- Ensure that the actor and sprite IDs are valid and exist in the project to avoid errors.
- This command can be used multiple times to change the actor's sprite as needed throughout the scene.
- The change will take effect immediately, so it is often used in conjunction with dialogue or actions to reflect changes in the scene.
- You can use this command in combination with other commands like `moveactor` or `showactor` to create dynamic scenes.
- If you want to revert to the original sprite, you can call `setactor` again with the original sprite ID.
- This command does not affect the actor's position or other properties; it solely changes the visual representation.
- Make sure to test the scene after using this command to ensure that the sprite changes as expected.

## See Also

- [**showactor**](showactor.md) - Command to display an actor on the screen.
- [**moveactor**](moveactor.md) - Command to move an actor to a new position.
- [**hideactor**](hideactor.md) - Command to hide an actor from the screen.
- [**createactor**](createactor.md) - Command to create a new actor in the scene.
- [**deleteactor**](deleteactor.md) - Command to remove an actor from the scene.
- [**animation**](animation.md) - Command to animate an actor's sprite.
