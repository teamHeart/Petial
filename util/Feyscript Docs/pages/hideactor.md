# Hide Actor

The `hideactor` command is used to hide an actor in the scene. This command is useful for managing the visibility of characters during a scene.

## Syntax

```
hideactor <local name>
```

## Parameters

- `<local name>`: The local name of the actor you want to hide. This is a string that identifies the actor within the scene.

## Example

```
hideactor Gobdo
```

In this example, the actor with the local name "Gobdo" will be hidden from the scene.

## Notes

- Ensure that the actor you want to hide has been previously defined in the scene.
- Hiding an actor does not remove them from the scene; it simply makes them invisible.
- You can use the `showactor` command to make the actor visible again.
- This command is typically used in conjunction with other scene management commands to create dynamic and engaging scenes.

## See Also

- [**showactor**](showactor.md): Command to show an actor in the scene.
- [**moveactor**](moveactor.md): Command to move an actor to a different position in the scene.
- [**setactor**](setactor.md): Command to set an actor's properties or attributes.
- [**deleteactor**](deleteactor.md): Command to remove an actor from the scene entirely.
- [**disableactor**](disableactor.md): Command to disable an actor's interactions without hiding them.