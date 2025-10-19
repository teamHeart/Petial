# Remove

([Back to Index](../README.md#commands))  
([Back to Battle Commands](../README.md#battle-specific-commands))

Remove a previously applied status effect from a target.

## Syntax

```feyscript
remove <target> <effect_name>
```

## Parameters

- `<target>` — the target to remove the effect from.
- `<effect_name>` — the status effect identifier to remove.

## Examples

```feyscript
remove target poisoned
```

## Notes

- Some effects may be immutable (engine-dependent) and cannot be removed early.
- Removing an effect that the target does not have will have no effect and will not cause an error.

## See also

- [**apply**](apply.md) — apply status effects
