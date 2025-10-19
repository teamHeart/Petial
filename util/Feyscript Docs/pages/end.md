# End

([Back to Index](../README.md#commands))

Immediately terminates execution of the current Feyscript script. Use `end`
when you need to stop processing the rest of the script right away. This
command takes no arguments and returns nothing.

## Syntax

```feyscript
end
```

## Parameters

- This command does not accept any parameters.

## Examples

```feyscript
# Stop the script immediately (nothing after this line runs)
end

# Example usage inside a conditional
if Global.player.has_key == false
  say Narrator "You need a key to open this door."
  end   # prevent further script actions when the player lacks a key
end
```

## Notes

- `end` halts the current script's execution immediately. Any commands after an `end` statement in the same script will not run.
- `end` does not throw an error or return a value; it is a control flow directive designed to stop processing.
- If you need to jump to another label or resume from a different point, prefer `goto` or structured control flow instead of `end`.

## See also

- [**goto**](goto.md) — jumps to a specified label within the script.
- [**label**](label.md) — defines a point in the script to jump to.
