<<<<<<< HEAD
# If

([Back to Index](../README.md#commands)) \
([Back to Control Flow](../README.md#Control-Structures)) \
The `if` statement is used to execute a block of code conditionally, based on whether a specified condition evaluates to true or false. It can be used in conjunction with `else` and `elif` statements to provide alternative code paths. The `if` statement must be terminated with an `done` statement.

## Syntax

```feyscript
if <condition>
  <code to execute if condition is true>
done
```

```feyscript
if <condition>
  <code to execute if condition is true>
else
  <code to execute if condition is false>
done
```

```feyscript
if <condition>
  <code to execute if condition is true>
elif <another condition>
  <code to execute if the first condition is false and the second condition is true>
else
  <code to execute if all conditions are false>
done
```

## Example

```feyscript
set age 20
if age >= 18
  print "You are an adult."
else
  print "You are a minor."
done
# Output: You are an adult.
```

```feyscript
set score to 85
if score >= 90
  print "You got an A."
elif score >= 80
  print "You got a B."
elif score >= 70
  print "You got a C."
else
  print "You need to improve."
done
# Output: You got a B.
```

```feyscript
set temperature to 30
if temperature > 30
  print "It's a hot day."
elif temperature > 20
  print "It's a warm day."
elif temperature > 10
  print "It's a cool day."
else
  print "It's a cold day."
done
# Output: It's a warm day.
```

```feyscript
set number to 5
if number % 2 == 0
  print "The number is even."
else
  print "The number is odd."
done
# Output: The number is odd.
```

```feyscript
set day to "Saturday"
if day == "Saturday" or day == "Sunday"
  print "It's the weekend!"
else
  print "It's a weekday."
done
# Output: It's the weekend!
```

```feyscript
set x to 10
set y to 20
if x < y and y < 30
  print "x is less than y and y is less than 30."
else
  print "The condition is not met."
done
# Output: x is less than y and y is less than 30.
```

```feyscript
set password to "secret"
if password == "secret"
  print "Access granted."
else
  print "Access denied."
done
# Output: Access granted.
```

```feyscript
set number to -5
if number > 0
  print "The number is positive."
elif number < 0
  print "The number is negative."
else
  print "The number is zero."
done
# Output: The number is negative.
```

## Notes

- Supported operators: `==`, `!=`, `<`, `>`, `<=`, `>=`, `and`, `or`, `not`, `is`.
- Expressions resolve game variables (e.g., `player.hp`, `Global.flags.foo`).
- Use `elif` for multiple branches instead of nested `if` statements.

- Indentation is important for readability, but the language does not enforce it.
- The `done` statement is mandatory to indicate the end of the `if` block.
- You can nest `if` statements within other `if`, `elif`, or `else` blocks for more complex logic.
- The `elif` and `else` blocks are optional and can be omitted if not needed.
- Only one `else` block is allowed per `if` statement, but multiple `elif` blocks can be used.
- Ensure that the conditions in `if` and `elif` statements evaluate to boolean values (true or false).

## See also

- [**ask**](ask.md) — present choices to the player
- [**loop**](loop.md) — repeat code blocks
=======
# If

([Back to Index](../README.md#commands)) \
([Back to Control Flow](../README.md#Control-Structures)) \
The `if` statement is used to execute a block of code conditionally, based on whether a specified condition evaluates to true or false. It can be used in conjunction with `else` and `elif` statements to provide alternative code paths. The `if` statement must be terminated with an `done` statement.

## Syntax

```feyscript
if <condition>
  <code to execute if condition is true>
done
```

```feyscript
if <condition>
  <code to execute if condition is true>
else
  <code to execute if condition is false>
done
```

```feyscript
if <condition>
  <code to execute if condition is true>
elif <another condition>
  <code to execute if the first condition is false and the second condition is true>
else
  <code to execute if all conditions are false>
done
```

## Example

```feyscript
set age 20
if age >= 18
  print "You are an adult."
else
  print "You are a minor."
done
# Output: You are an adult.
```

```feyscript
set score to 85
if score >= 90
  print "You got an A."
elif score >= 80
  print "You got a B."
elif score >= 70
  print "You got a C."
else
  print "You need to improve."
done
# Output: You got a B.
```

```feyscript
set temperature to 30
if temperature > 30
  print "It's a hot day."
elif temperature > 20
  print "It's a warm day."
elif temperature > 10
  print "It's a cool day."
else
  print "It's a cold day."
done
# Output: It's a warm day.
```

```feyscript
set number to 5
if number % 2 == 0
  print "The number is even."
else
  print "The number is odd."
done
# Output: The number is odd.
```

```feyscript
set day to "Saturday"
if day == "Saturday" or day == "Sunday"
  print "It's the weekend!"
else
  print "It's a weekday."
done
# Output: It's the weekend!
```

```feyscript
set x to 10
set y to 20
if x < y and y < 30
  print "x is less than y and y is less than 30."
else
  print "The condition is not met."
done
# Output: x is less than y and y is less than 30.
```

```feyscript
set password to "secret"
if password == "secret"
  print "Access granted."
else
  print "Access denied."
done
# Output: Access granted.
```

```feyscript
set number to -5
if number > 0
  print "The number is positive."
elif number < 0
  print "The number is negative."
else
  print "The number is zero."
done
# Output: The number is negative.
```

## Notes

- Supported operators: `==`, `!=`, `<`, `>`, `<=`, `>=`, `and`, `or`, `not`, `is`.
- Expressions resolve game variables (e.g., `player.hp`, `Global.flags.foo`).
- Use `elif` for multiple branches instead of nested `if` statements.

- Indentation is important for readability, but the language does not enforce it.
- The `done` statement is mandatory to indicate the end of the `if` block.
- You can nest `if` statements within other `if`, `elif`, or `else` blocks for more complex logic.
- The `elif` and `else` blocks are optional and can be omitted if not needed.
- Only one `else` block is allowed per `if` statement, but multiple `elif` blocks can be used.
- Ensure that the conditions in `if` and `elif` statements evaluate to boolean values (true or false).

## See also

- [**ask**](ask.md) — present choices to the player
- [**loop**](loop.md) — repeat code blocks
>>>>>>> 3104484cc8018e463cf43bb35e2b9007e52e7788
