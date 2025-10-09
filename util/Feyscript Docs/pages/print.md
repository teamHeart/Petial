# Print

([Back to Index](../README.md#commands)) \
Prints a string to the console.

## Syntax

```feyscript
print <string>
print <number>
print <expression>
```

## Parameters

- `string`: The string to be printed.
- `number`: A number to be printed.
- `expression`: An expression whose result will be printed.

## Examples

```feyscript
print "Hello, World!"                # Outputs: Hello, World!
print 42                             # Outputs: 42
print 3.14                           # Outputs: 3.14
print 5 + 10                         # Outputs: 15
print "The result is: " + (5 * 2)    # Outputs: The result is: 10
```

## Notes

- Use `print` liberally while developing scripts to inspect values; remove or disable verbose prints in release builds if needed.

## See also

- [**set**](set.md) — assign values to variables
