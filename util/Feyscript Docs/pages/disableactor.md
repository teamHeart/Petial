# Disable Actor

> **⚠️ DEPRECATED**: This command is deprecated. Please use `actor disable` instead. See [**actor**](actor.md) for the unified actor command documentation.

The `disableactor` command is used to disable an actor in the game. It suspends the actor's scripts and makes in non-interactive.

This command has been superseded by the unified `actor` command. Use `actor disable` instead for new scripts.

## Syntax

```feyscript
disableactor <local name>
```

## Parameters

- `<local name>`: The local name of the actor to be disabled. This is a string that identifies the actor within the game.

## Example

```feyscript
disableactor Gobdo
```

This command will disable the actor with the local name "Gobdo", suspending her scripts and making her non-interactive in the game.

## Notes

- The actor will remain in the game world but will not respond to any interactions or events.
- To re-enable the actor, you can use the `enableactor` command with the same local name.
- This command is useful for managing game states and controlling which actors are active at any given time.
- Make sure to use the correct local name of the actor to avoid errors.
- Disabling an actor does not remove them from the game; it only suspends their functionality.

## See Also

- [**actor**](actor.md): Unified command for all actor operations (recommended).
- [**enableactor**](enableactor.md): Command to re-enable a disabled actor.
- [**hideactor**](hideactor.md): Command to hide an actor from the game world.
- [**deleteactor**](deleteactor.md): Command to remove an actor from the game world.
