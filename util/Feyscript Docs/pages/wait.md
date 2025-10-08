# Wait

([Back to Index](../Feyscript%20Docs.md#commands)) \
The `wait` command pauses the execution of the script for a specified duration or until user input is received.

## Syntax

```feyscript
wait             # Pauses until user input is received (e.g., pressing [Confirm] or [Cancel])
wait <duration>  # Pauses for the specified duration in seconds (e.g., wait 5)
```

## Parameters

- `<duration>`: (Optional) The number of seconds to wait. If omitted, the script will wait for user input.

## Examples

```feyscript
wait 3           # Pauses for 3 seconds
wait             # Pauses until the user presses [Confirm] or [Cancel]
```

## Notes

- The `wait` command is useful for creating delays in the script or waiting for user interaction
- When using `wait` without a duration, the script will resume execution only after the user provides input
- Ensure that the duration specified is a positive number to avoid unexpected behavior
- The `wait` command can be used in various scenarios, such as waiting for animations to complete or giving users time to read messages before proceeding
- The command can be interrupted by user actions, so consider the context in which it is used
- The `wait` command is non-blocking in nature, allowing other processes to run while waiting
- It is recommended to use `wait` judiciously to maintain a smooth user experience
- The `wait` command can be combined with other commands to create more complex interactions and timing sequences
- The command is versatile and can be adapted to different use cases within the script

## See Also

- [**say**](say.md): Displays dialogue text for a specified character and waits for input before continuing.
- [**ask**](ask.md): Prompts the user with a question and waits for a response.
