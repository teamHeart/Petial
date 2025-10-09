# goto

The `goto` command transfers execution to the line marked by a label elsewhere in the script. Labels are plain identifiers placed on their own line and typically terminated with a colon (`:`) or declared with a `label` directive depending on the script dialect used in this project. Use `goto` sparingly — labels make control flow explicit but can reduce readability when overused.

## Syntax

```feyscript
goto <label>

label <label>
<code>
```

## Arguments

- `<label>` — The identifier of a previously defined label in the same script. Must match exactly.

## Behavior

- Execution continues from the first line after the label.
- If the given label does not exist, the runtime raises an error and the script stops (or reports an error according to the runtime's error-handling mode).

## Examples

Define a label and jump to it:

```feyscript
start:
  print "begin"
  goto end

middle:
  print "this is skipped"

end:
  print "done"
```

Using a label directive (alternate style):

```feyscript
label loop
  print "looping"
  goto loop
```

## Notes

- Prefer structured constructs (loops, functions) when available. `goto` is useful for small scripts, legacy code, or where explicit low-level control is needed.
- Labels are typically resolved at parse/load time; duplicate labels may be disallowed or shadow previous definitions depending on the implementation.

## See also

- [**loop**](loop.md) — Repeats a block of code multiple times.
- [**if**](if.md) — Conditional execution of code blocks.
