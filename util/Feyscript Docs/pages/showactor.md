# Show Actor

> **⚠️ DEPRECATED**: This command is deprecated. Please use `actor show` instead. See [**actor**](actor.md) for the unified actor command documentation.

The `showactor` command is used to make an invisible actor visible in the scene. If the actor is already visible, this command has no effect.

This command has been superseded by the unified `actor` command. Use `actor show` instead for new scripts.

## Syntax

```feyscript
showactor <local name>
```

## Parameters

- `<local name>`: The local name of the actor you want to show. This is a string that identifies the actor within the scene.

## Example

```feyscript
showactor Gobdo
```

In this example, the actor with the local name "Gobdo" will be made visible in the scene. If "Gobdo" was already visible, there would be no change.

## Notes

- Ensure that the actor you are trying to show has been previously defined and is currently invisible.
- This command does not affect the actor's position or state; it simply changes its visibility.
- You can use the `hideactor` command to make an actor invisible again if needed.
- The `showactor` command can be used in conjunction with other commands to create dynamic scenes where actors appear and disappear as needed.
- This command is typically used in scenarios where you want to reveal an actor at a specific moment in the narrative or gameplay.

## See Also

- [**actor**](actor.md): Unified command for all actor operations (recommended).
- [**hideactor**](hideactor.md): Command to hide an actor.
- [**moveactor**](moveactor.md): Command to move an actor to a different position.
- [**createactor**](createactor.md): Command to create a new actor in the scene.
