# Set

([Back to Index](../README.md#commands))

The `set` command assigns a value to a variable. Use it to create or update
local or global variables. Prefix a variable with `Global.` to target the
global scope.

## Syntax

```feyscript
set <variable_name> <value>
set <variable_name> <expression>
set Global.<variable_name> <value>
set Global.<variable_name> <expression>
```

## Parameters

- `<variable_name>` — the name to assign. Must start with a letter or underscore.
- `Global.` — optional prefix to write to the global namespace.
- `<value>` — a literal value (string/number/boolean) or an expression.
- `<expression>` — any valid Feyscript expression (math, logic, function calls, etc.).

## Examples

```feyscript
set myVar 10                                       # sets a local variable myVar to 10
set myBool true                                    # sets a local variable myBool to true
set myString "Hello, World!"                       # sets a local variable myString to "Hello, World!"
set mySum (5 + 3)                                  # sets a local variable mySum to 8
set Global.globalVar 42                            # sets global variable globalVar to 42
set Global.globalString "Global Hello"             # sets global variable globalString to "Global Hello"
set Global.globalSum (Global.globalVar + myVar)    # sets global variable globalSum to 52
```

## Notes

- `set` will overwrite existing variables.
- Prefer explicit `Global.` writes only when you need cross-script persistence.

## See also

- [**print**](print.md) — inspect variable values
