# Camera

([Back to Index](../README.md#commands))

The `camera` controls which part of the game world is visible. It supports several subcommands; each subsection below documents one subcommand and provides examples.

## Move

```feyscript
camera move <x> <y> <duration>
camera move <actor_id> <duration>
```

Move the camera to a target position or to an actor's current position over the specified duration (in seconds).

Parameters

- `<x>` `<y>` — world coordinates to move to.
- `<actor_id>` — the id/name of an actor whose position will be targeted.
- `<duration>` — seconds to take for the move (may be fractional).

Example

```feyscript
camera move 100 200 2.0
camera move player 1.5
```

## Shake

```feyscript
camera shake <intensity> <duration>
```

Shake the camera to add impact to events. Intensity controls magnitude; duration is in seconds.

Parameters

- `<intensity>` — numerical intensity of the shake.
- `<duration>` — seconds to shake for.

Example

```feyscript
camera shake 5 0.8
```

## Zoom

```feyscript
camera zoom <level> <duration>
```

Zoom the camera to a specified level over duration. `1.0` is default/normal. Values greater than 1 zoom in; less than 1 zoom out.

Parameters

- `<level>` — numeric zoom level.
- `<duration>` — seconds to perform the zoom.

Example

```feyscript
camera zoom 1.5 1.0
```

## Follow

```feyscript
camera follow <actor_id>
```

Have the camera continuously follow an actor until another camera command overrides it.

Parameters

- `<actor_id>` — id/name of the actor to follow.

Example

```feyscript
camera follow player
```

## Set

```feyscript
camera set <x> <y> <zoom_level>
```

Instantly set the camera position and zoom.

Parameters

- `<x>` `<y>` — world coordinates to place the camera.
- `<zoom_level>` — numeric zoom level to set immediately.

Example

```feyscript
camera set 0 0 1.0
```

## Notes

- Coordinate systems and accepted values depend on your runtime/engine; test on target platforms.
- Use `camera move` for smooth pans and `camera set` for instant jumps.
- Excessive camera motion can be disorienting; use sparingly.

## See also

- [**setbackground**](setbackground.md) — change the scene background
- [**moveactor**](moveactor.md) — reposition actors
- [**wait**](wait.md) — pause script execution for timing
