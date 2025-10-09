# Loop

([Back to Index](../README.md#commands)) \
([Back to Control Flow](../README.md#Control-Structures)) \
The `loop` command is used to create a loop that repeats a block of code a specified number of times or while a certain condition is true. It is useful for iterating over a set of instructions multiple times without having to write the same code repeatedly. If no condition or number is provided, it will loop indefinitely until a `stoploop` command is encountered.

## Syntax

```feyscript
loop <condition> 
  <code block to loop>
endloop
```

```feyscript
loop <number of times> 
  <code block to loop>
endloop
```

```feyscript
loop 
  <code block to loop>
  if <condition> 
    stoploop
  end
endloop
```

## Parameters

- `<condition>`: A boolean expression that determines whether the loop should continue executing. The loop will continue as long as the condition evaluates to true.
- `<number of times>`: An integer that specifies how many times the loop should execute the code block.
- `<code block to loop>`: The block of code that will be executed repeatedly as long as the loop condition is met or the specified number of iterations has not been reached.

## Example

```feyscript
# Looping a specific number of times
loop 5
  print "This will print 5 times."
endloop
# Output:
# This will print 5 times.
# This will print 5 times.
# This will print 5 times.
# This will print 5 times.
# This will print 5 times.
```

```feyscript
# Looping with a condition
set counter 0
loop counter < 3
  print "Counter is at: " + counter
  set counter counter + 1
endloop
# Output:
# Counter is at: 0
# Counter is at: 1
# Counter is at: 2
# Note: The loop stops when counter reaches 3. Since 3 is not less than 3, the loop ends.
```

```feyscript
# Infinite loop with a stop condition
set count 0
loop
  print "Count is: " + count
  set count count + 1
  if count >= 3
    stoploop
  done
endloop
# Output:
# Count is: 0
# Count is: 1
# Count is: 2
# Count is: 3
# Note: The loop continues until count is 3 or greater, at which point the stoploop command is executed.
```

## Notes

- Ensure that the loop has a terminating condition to avoid infinite loops unless intentionally designed to do so
- The `stoploop` command can be used within the loop to exit the loop based on a specific condition.
- Nested loops are supported, allowing for complex iteration patterns.
- Be cautious with resource-intensive operations within loops, as they can lead to performance issues if not managed properly.

## See also

- [**if**](if.md) — conditional execution of code blocks
- [**wait**](wait.md) — pause execution for a duration or until a condition is met
- [**set**](set.md) — assign values to variables
