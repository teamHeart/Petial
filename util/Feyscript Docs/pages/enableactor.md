# Enable Actor

> **⚠️ DEPRECATED**: This command is deprecated. Please use `actor enable` instead. See [**actor**](actor.md) for the unified actor command documentation.

The `enableactor` command is used to enable an actor in the game. This makes the actor interactive and able to run its scripts.

This command has been superseded by the unified `actor` command. Use `actor enable` instead for new scripts.

## Syntax

```
enableactor <local name>
```

## Parameters

- `<local name>`: The local name of the actor to be enabled. This is a string that identifies the actor within the game.

## Example

```
enableactor Gobdo
```

This command enables the actor named "Gobdo", making her interactive and allowing her to run her associated scripts.

## Notes

- Ensure that the actor you are trying to enable has been properly defined and added to the game world.
- This command is typically used in scenarios where an actor has been disabled and needs to be re-enabled for interaction.

## See Also

- [**actor**](actor.md): Unified command for all actor operations (recommended).
- [**disableactor**](disableactor.md): Command to disable an actor.
- [**setactor**](setactor.md): Command to set or change an actor's properties.
- [**showactor**](showactor.md): Command to display an actor on the screen.
- [**createactor**](createactor.md): Command to create a new actor in the game.
