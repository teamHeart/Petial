# Wait

([Back to Index](../README.md#commands))

Pauses script execution either for a fixed duration or until the player
provides input. Use it to give the player time to read text or to wait for
animations and other timed events.

## Syntax

```feyscript
wait [<seconds>]
```

## Parameters

- `<seconds>` — optional number of seconds to pause. When omitted, execution waits for player input.

## Examples

```feyscript
wait 3           # pause for 3 seconds
wait             # pause until the player advances
```

## Notes

- `wait` is useful for pacing dialogue and sequencing animations.
- When using a numeric duration, prefer a small nonzero value (seconds may be fractional) to avoid stalls.
- `wait` with no duration blocks script progression until the player presses the confirm/cancel key.

## See also

- [**say**](say.md) — display dialogue and optionally wait
- [**ask**](ask.md) — prompt the player and wait for a choice
