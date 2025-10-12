# Delete Actor

> **⚠️ DEPRECATED**: This command is deprecated. Please use `actor delete` instead. See [**actor**](actor.md) for the unified actor command documentation.

The `deleteactor` command is used to remove an actor from the game world. This command is useful for cleaning up unused or unwanted actors.

This command has been superseded by the unified `actor` command. Use `actor delete` instead for new scripts.

## Syntax

```
deleteactor <local name>
```

## Parameters

- `<local name>`: The local name of the actor you want to delete.

## Example

```
deleteactor Gobdo
```

This command will delete the actor with the local name "Gobdo" from the game world, thereby removing Gobdo, Trapeze Troupe Director, from the scene.

## Notes

- Ensure that the actor you are trying to delete exists in the game world; otherwise, the command will not have any effect.
- Attempting to reference an actor after it has been deleted will result in an error.

## See Also

- [**actor**](actor.md) - Unified command for all actor operations (recommended).
- [**createactor**](createactor.md) - Command to create a new actor in the game world.
- [**moveactor**](moveactor.md) - Command to move an existing actor to a new location.
- [**setactor**](setactor.md) - Command to modify properties of an existing actor.
- [**say**](say.md) - Command to make an actor speak a line of dialogue.
- [**hideactor**](hideactor.md) - Command to hide an actor from view without deleting them.
- [**disableactor**](disableactor.md) - Command to disable an actor without deleting them.