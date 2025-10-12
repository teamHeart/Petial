# Move Actor

> **⚠️ DEPRECATED**: This command is deprecated. Please use `actor move` instead. See [**actor**](actor.md) for the unified actor command documentation.

The `moveactor` command is used to move an actor to a specified location in the game world. This command can be used to create dynamic and interactive scenes by repositioning characters during gameplay and cutscenes.

This command has been superseded by the unified `actor` command. Use `actor move` instead for new scripts.

## Syntax

```feyscript
moveactor <local name> <x position> <y position> [<"speed"|"duration">] [<value>]
```

## Parameters

- `<local name>`: The local name of the actor you want to move. This is a string that identifies the actor within the script.
- `<x|y position>`: The target x and y coordinates where you want the actor to move. These should be numerical values representing the position in the game world. Each component can be a direct number (e.g., `100`, `250`) or a reference to another actor's position (e.g., `ActorName.position.x`, `ActorName.position.y`), a variable, or an expression that evaluates to a number.
- `[<"speed"|"duration">]`: An optional parameter that specifies how the movement should be executed. You can choose either "speed" or "duration".
	- If you choose "speed", the actor will move at a constant speed to the target position.
	- If you choose "duration", the actor will take a specified amount of time to reach the target position.
	- If this parameter is omitted, the default behavior is to move the actor instantly to the target position.
- `[<value>]`: An optional numerical value that corresponds to the chosen movement type.
	- If "speed" is chosen, this value represents the speed at which the actor moves (units per second).
	- If "duration" is chosen, this value represents the time in seconds it will take for the actor to reach the target position.
	- If this parameter is omitted, the default value is `1` if `duration`, and `100` if `speed`.

## Example

```feyscript
moveactor Nim 300 400 speed 150
moveactor Blue 500 600 duration 2
moveactor Astra 700 Astra.position.y
```

1. In the first example, the actor named "Nim" will move to the coordinates (300, 400) at a speed of 150 units per second (sprinting speed). The time taken for them to reach the destination will depend on the distance from their current position to the target position.
2. In the second example, the actor named "Blue" will move to the coordinates (500, 600) over a duration of 2 seconds, regardlesss of how far she is from the destination.
3. In the third example, the actor named "Astra" will instantly move to the x-coordinate of 700 while maintaining their current y-coordinate. She will teleport to their new position as neither speed nor duration is specified.

## Notes

- Ensure that the actor's local name is correctly defined in your script before using the `moveactor` command.
- The coordinates should be within the bounds of the game world to avoid unexpected behavior.
- Use the `moveactor` command in conjunction with other commands like `wait` to create smooth transitions and interactions in your scenes.
- The movement will be linear; if you need more complex paths, consider using multiple `moveactor` commands or additional scripting logic.

## See Also

- [**actor**](actor.md): Unified command for all actor operations (recommended).
- [**showactor**](showactor.md): Command to show an actor in the scene.
- [**hideactor**](hideactor.md): Command to hide an actor from the scene.
- [**createactor**](createactor.md): Command to create a new actor in the scene.
- [**setactor**](setactor.md): Command to change an actor's sprite.