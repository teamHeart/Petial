# Camera

The `camera` is a special object that determines what part of the game world is visible on the screen. It can be moved, shaken, and zoomed to create dynamic and engaging scenes.

## syntax

```feyscript
camera <action> [parameters]
```

## Parameters

- `<action>`: The action to perform on the camera. This can be one of the following:
	- `move`: Move the camera to a specified position.
	- `shake`: Shake the camera for a specified duration and intensity.
	- `zoom`: Zoom the camera in or out to a specified level.
	- `follow`: Make the camera follow a specified object.
	- `set`: Set the camera to a specific position and zoom level.

- `[parameters]`: The parameters for the specified action. These vary depending on the action being performed.
  - `camera move` `<x>` `<y>` `<duration>`: Moves the camera to the specified (x, y) coordinates over the given duration in seconds.
  - `camera move` `<actor_id>` `<duration>`: Moves the camera to the specified actor's position over the given duration in seconds.
  - `camera shake` `<intensity>` `<duration>`: Shakes the camera with the specified intensity for the given duration in seconds.
  - `camera zoom` `<level>` `<duration>`: Zooms the camera to the specified level over the given duration in seconds. A level of 1 is normal, greater than 1 is zoomed in, and less than 1 is zoomed out.
  - `camera follow` `<actor_id>`: Makes the camera follow the specified actor.
  - `camera set` `<x>` `<y>` `<zoom_level>`: Instantly sets the camera to the specified (x, y) coordinates and zoom level.

## Examples

```feyscript
camera move 100 200 2.0  # Move camera to (100, 200) over 2 seconds
camera shake 5 1.0       # Shake camera with intensity 5 for 1 second
camera zoom 1.5 1.0      # Zoom in to level 1.5 over 1 second
camera follow player     # Make camera follow the player actor
camera set 0 0 1.0       # Instantly set camera to (0, 0) with normal zoom
```

## Notes

- The camera's position is typically defined in world coordinates, which may differ from screen coordinates depending on the game's design.
- When using `camera follow`, the camera will automatically adjust its position to keep the specified actor centered on the screen.
- The `camera shake` effect can be used to enhance the impact of events such as explosions or collisions.
- The `camera zoom` action can be used to create dramatic effects, such as zooming in on a character during a critical moment or zooming out to reveal a larger scene.
- It's important to consider the player's experience when manipulating the camera, as excessive movement or shaking can cause discomfort or disorientation.
- Always test camera movements and effects to ensure they enhance the gameplay experience without causing confusion or discomfort for players.

## See Also

- [**setbackground**](./setbackground.md): Change the background image or color of the scene.
- [**hideactor**](./hideactor.md): Hide an actor from the scene.
- [**showactor**](./showactor.md): Show an actor in the scene.
- [**moveactor**](./moveactor.md): Move an actor to a specified position.
- [**sound**](./sound.md): Play sound effects or music in the scene.
- [**wait**](./wait.md): Pause the script for a specified duration.