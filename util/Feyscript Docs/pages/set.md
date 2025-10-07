# Set
([Back to Index](../Feyscript%20Docs.md#commands))\
`set` is a command that allows you to set the value of a variable. It can be used to set both global and local variables.
## Syntax
```feyscript
set <variable_name> <value>
set <variable_name> <expression>
set Global.<variable_name> <value>
set Global.<variable_name> <expression>
```

## Parameters
- `<variable_name>`: The name of the variable you want to set. Variable names must start with a letter or underscore and can contain letters, numbers, and underscores. If the variable does not exist, it will be created locally.
- `Global.`: Prefix used to indicate that the variable is global. If omitted, the variable is considered local to the current scope. If the global variable does not exist, it will cause an error.
- `<value>`: The value you want to assign to the variable. This can be a string, number, boolean, or any other valid Feyscript data type.
- `<expression>`: An expression that evaluates to a value. This can include arithmetic operations, function calls, or other variable references.

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
- When setting a variable, if the variable already exists, its value will be overwritten.
- Local variables are scoped to the block or function they are defined in, while global variables are variables defined outside of any function or block and can be accessed from anywhere.
- Be cautious when using global variables, as they can lead to unintended side effects if modified in different parts of the code.
- To reference a variable, simply use its name without the `set` command.