
# End Battle

([Back to Index](../README.md#commands))  
([Back to Battle Commands](../README.md#battle-specific-commands))

Ends the current battle immediately, returning control to the overworld or next scene.

## AI / Usage

`endbattle` is a high-level directive that enemy AI or scripted events may trigger to force an immediate resolution (for example, a scripted defeat or escape). Engines will run end-of-battle flows (rewards, cleanup) when this command is executed.

## Syntax

```feyscript
endbattle [result <win|lose|flee>]
```

## Parameters

- `result <win|lose|flee>` — optional: specify the battle outcome.

## Examples

```feyscript
endbattle result win
```

## Notes

- Ending a battle may trigger rewards, experience gain, or other effects depending on the engine.

## See also

- [**spawn**](spawn.md)
- [**despawn**](despawn.md)
