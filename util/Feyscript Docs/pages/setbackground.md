<<<<<<< HEAD
# Set Background

The `setbackground` command is used to change the background image of the current scene in your Feyscript project. This command allows you to specify a new background image by providing the file path to the image you want to use.

## Syntax

```feyscript
setbackground <image_path> [<fade true/false>] [<fade_duration>]
```

## Parameters

- `<image_path>`: The file path to the background image you want to set. This parameter is required.
- `<fade true/false>`: An optional parameter that specifies whether to fade the transition to the new background. If set to `true`, the background will fade in; if set to `false`, the background will change instantly. The default value is `false`.
- `<fade_duration>`: An optional parameter that specifies the duration of the fade effect in seconds. This parameter is only relevant if the `fade` parameter is set to `true`. The default value is `1.0` seconds.

## Example

```feyscript
setbackground "images/forest.png" true 2.0
```

In this example, the background image is changed to "images/forest.png" with a fade effect that lasts for 2 seconds.

```feyscript
setbackground "images/city.png" false

```
In this example, the background image is changed to "images/city.png" instantly without any fade effect.

## Notes
- Ensure that the image file path is correct and that the image exists in the specified location.
- The `setbackground` command can be used multiple times in a script to change the background as needed.
- If the `fade` parameter is not specified, the background will change instantly by default.
- If the `fade_duration` parameter is not specified, it will default to 1.0 seconds when fading is enabled.
- Actors and other scene elements will remain in their current positions when the background is changed.

## See Also
- [**wait**](./wait.md): Pauses the script for a specified duration.
- [**moveactor**](./moveactor.md): Moves an actor to a specified position on the screen.
- [**showactor**](./showactor.md): Displays an actor on the screen.
- [**hideactor**](./hideactor.md): Hides an actor from the screen.
- [**music**](./music.md): Plays background music in the scene.
- [**sound**](./sound.md): Plays a sound effect in the scene.
=======
# Set Background

The `setbackground` command is used to change the background image of the current scene in your Feyscript project. This command allows you to specify a new background image by providing the file path to the image you want to use.

## Syntax

```feyscript
setbackground <image_path> [<fade true/false>] [<fade_duration>]
```

## Parameters

- `<image_path>`: The file path to the background image you want to set. This parameter is required.
- `<fade true/false>`: An optional parameter that specifies whether to fade the transition to the new background. If set to `true`, the background will fade in; if set to `false`, the background will change instantly. The default value is `false`.
- `<fade_duration>`: An optional parameter that specifies the duration of the fade effect in seconds. This parameter is only relevant if the `fade` parameter is set to `true`. The default value is `1.0` seconds.

## Example

```feyscript
setbackground "images/forest.png" true 2.0
```

In this example, the background image is changed to "images/forest.png" with a fade effect that lasts for 2 seconds.

```feyscript
setbackground "images/city.png" false

```
In this example, the background image is changed to "images/city.png" instantly without any fade effect.

## Notes
- Ensure that the image file path is correct and that the image exists in the specified location.
- The `setbackground` command can be used multiple times in a script to change the background as needed.
- If the `fade` parameter is not specified, the background will change instantly by default.
- If the `fade_duration` parameter is not specified, it will default to 1.0 seconds when fading is enabled.
- Actors and other scene elements will remain in their current positions when the background is changed.

## See Also
- [**wait**](./wait.md): Pauses the script for a specified duration.
- [**moveactor**](./moveactor.md): Moves an actor to a specified position on the screen.
- [**showactor**](./showactor.md): Displays an actor on the screen.
- [**hideactor**](./hideactor.md): Hides an actor from the screen.
- [**music**](./music.md): Plays background music in the scene.
- [**sound**](./sound.md): Plays a sound effect in the scene.
>>>>>>> 3104484cc8018e463cf43bb35e2b9007e52e7788
- [**movecamera**](./movecamera.md): Moves the camera to a specified position in the scene.