# Loop

([Back to Index](../README.md#commands))  
([Back to Control Flow](../README.md#Control-Structures))

Repeats a block of statements either a fixed number of times, while a
condition is true, or indefinitely until an explicit exit (`stoploop`) is
triggered. Use `endloop` to close the loop.

## Syntax

```feyscript
loop <condition>
  <statements>
endloop
```

```feyscript
loop <count>
  <statements>
endloop
```

```feyscript
loop
  <statements>
  if <condition>
    stoploop
  done
endloop
```

## Parameters

- `<condition>` — a boolean expression checked each iteration; the loop
  continues while it evaluates true.
- `<count>` — an integer specifying how many iterations to perform.
- `<statements>` — the block of commands executed each iteration.

## Examples

```feyscript
# Fixed count
loop 5
  print "This will print 5 times."
endloop
```

```feyscript
# Condition-based loop
set counter 0
loop counter < 3
  print "Counter is at: " + counter
  set counter counter + 1
endloop
```

```feyscript
# Infinite loop with explicit exit
set count 0
loop
  print "Count is: " + count
  set count count + 1
  if count >= 3
    stoploop
  done
endloop
```

## Notes

- Always provide a terminating condition or explicit `stoploop` to avoid
  accidental infinite loops.
- Nested loops are supported. Use clear variable names to avoid confusion.

## See also

- [**if**](if.md) — conditional execution of code blocks
- [**wait**](wait.md) — pause execution for a duration or until a condition is met
- [**set**](set.md) — assign values to variables
