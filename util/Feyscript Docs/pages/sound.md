# Sound

([Back to Index](../README.md#commands))

Play short sound effects (SFX). Use `sound` for UI clicks, impact sounds,
and other non-music audio cues that enhance feedback during gameplay.

## Syntax

```feyscript
sound <sound_name>
```

## Parameters

- `<sound_name>` — file name or resource identifier for the effect.

## Examples

```feyscript
sound "door_open.wav"
```

```feyscript
loop 3
  sound "tick.wav"
  wait 1
endloop
sound "explosion.wav"
```

## Notes

- Ensure sound files are included in your game's resources and that the
  identifier matches exactly.
- Use `wait` between `sound` calls to control timing when playing effects in
  sequence.
- Avoid playing too many simultaneous sounds to keep audio clear.

## See also

- [**music**](music.md) — background music control
- [**wait**](wait.md) — timing and delays
- [**animation**](animation.md) — syncing SFX with visuals
