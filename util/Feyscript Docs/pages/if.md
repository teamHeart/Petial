
# If

([Back to Index](../README.md#commands))  
([Back to Control Flow](../README.md#Control-Structures))

Runs a block of statements when a condition is true. Use [`elif`](#elif) and [`else`](#else) for alternatives, and terminate the block with [`done`](#done).

## Syntax

```feyscript
if <condition>
  <statements>
done
```

```feyscript
if <condition>
  <statements>
elif <condition2>
  <statements>
else
  <statements>
done
```

## Parameters

- `<condition>` — any Feyscript expression that evaluates to true/false. Common operators: `==`, `!=`, `<`, `>`, `<=`, `>=`, `and`, `or`, `not`, `is`.
- `elif` — an optional additional branch evaluated only if prior conditions were false.
- `else` — an optional fallback branch executed when no prior condition is true (only one `else` allowed).
- `done` — required terminator for the `if` block.

## Examples

```feyscript
set age 20
if age >= 18
  print "You are an adult."
else
  print "You are a minor."
done
```

```feyscript
set score 85
if score >= 90
  print "You got an A."
elif score >= 80
  print "You got a B."
else
  print "You need to improve."
done
```

```feyscript
# Nested example
if Global.debug == true
  print "Debug mode on"
  if player.hp <= 0
    print "Player is down (debug)"
  done
done
```

## Elif

([Back to top](#if)) ([See in Commands index](../README.md#commands))

`elif` provides an additional conditional branch evaluated only if all
preceding `if`/`elif` conditions were false. Use `elif` to keep multiple
branches readable without deep nesting.

### Elif — Syntax

```feyscript
elif <condition>
  <statements>
```

### Elif — Parameters

- `<condition>` — any Feyscript expression that evaluates to true/false.

### Elif — Examples

```feyscript
set score 85
if score >= 90
  print "A"
elif score >= 80
  print "B"
elif score >= 70
  print "C"
else
  print "Below C"
done
```

## Else

([Back to top](#if)) ([See in Commands index](../README.md#commands))

`else` is the optional fallback branch that runs when no prior `if` or
`elif` condition evaluated to true.

### Else — Syntax

```feyscript
else
  <statements>
```

### Else — Parameters

- none — `else` does not take a condition; it always executes when reached.

### Else — Examples

```feyscript
set has_key false
if has_key == true
  print "You open the door."
else
  print "The door is locked."
done
```

### Else — Notes

## Done

([Back to top](#if)) ([See Control Flow](../README.md#Control-Structures))

`done` terminates an `if` block. Forgetting `done` will leave the block
unclosed and may cause the script to be parsed incorrectly.

### Done — Syntax

```feyscript
done
```

### Done — Parameters

- none — `done` is a standalone terminator.

### Done — Examples

```feyscript
if player.hp <= 0
  print "Player is down"
  endbattle
done
```

## Notes

- Conditions that evaluate to non-boolean values are interpreted by Feyscript's truthiness rules; prefer explicit boolean expressions.
- Indentation improves readability but is not syntactically required.
- `elif` is evaluated in order; once a true condition is found, later `elif` branches are skipped.
- Use `elif` for clarity instead of nested `if` blocks when checking multiple mutually-exclusive ranges.
- Only one `else` block is allowed per `if` chain.
- `else` must appear after any `if`/`elif` branches and before `done`.
- `done` is required to close `if` blocks. It is also used for other block-terminating constructs (see Control Structures in the README).
