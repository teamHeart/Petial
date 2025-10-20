# Animation

([Back to Index](../README.md#commands))

Play animations on entities (players, NPCs, objects) or stop a currently-playing animation. Use `animation` to trigger named animations and optionally make them loop.

## Syntax

```feyscript
animation <entity> <animation_name|stop> [loop <true|false>]
```

## Parameters

- `<entity>` — the target entity (for example: `player`, `npc1`, `party_leader`).
- `<animation_name|stop>` — the name of the animation to play, or the keyword `stop` to halt playback.
- `[loop <true|false>]` — optional. When `true` the animation repeats until stopped. Defaults to `false` if omitted.

## Examples

```feyscript
# Play a walking animation on the player and loop it
animation player walk loop true
```

```feyscript
# Stop the current animation on an NPC
animation npc1 stop
```

```feyscript
# Play a one-shot dance animation
animation entity1 dance
```

## Notes

- Animation names are engine- and entity-specific. Check your entity's available animations before calling the command.
- If an entity doesn't support the requested animation, the command may be ignored or fall back to a default pose.
- Use `loop true` for long-running motions (idle/walk) and omit it for single-shot actions (attack/dance).
- Combine `animation` with timing commands like `wait` to sequence actions, or with `goto`/`label` to create cutscenes.
- Excessive simultaneous animations on many entities can affect performance; profile on target platforms when needed.

## See also

- [**music**](music.md) — control background music playback
- [**sound**](sound.md) — play short sound effects
- [**moveactor**](moveactor.md) — move actors around the scene
- [**wait**](wait.md) — pause script execution for timing
