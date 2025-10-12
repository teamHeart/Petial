# Print

([Back to Index](../README.md#commands))

Outputs text or expression results to the console or log. Useful for
debugging and quick inspections while developing scripts.

## Syntax

```feyscript
print <string>
print <number>
print <expression>
```

## Parameters

- `<string>`: A string literal to print.
- `<number>`: A numeric value to print.
- `<expression>`: Any valid Feyscript expression; the evaluated result will be printed.

## Examples

```feyscript
print "Hello, World!"                # Outputs: Hello, World!
print 42                             # Outputs: 42
print 3.14                           # Outputs: 3.14
print 5 + 10                         # Outputs: 15
print "The result is: " + (5 * 2)    # Outputs: The result is: 10
```

## Notes

- `print` is primarily a development tool. Remove or silence verbose prints in release builds if you don't want debug output visible to players.
- Use `print` for quick checks; prefer `say` for player-facing dialogue.

## See also

- [**set**](set.md) — assign values to variables
- [**say**](say.md) — display dialogue text to the player
