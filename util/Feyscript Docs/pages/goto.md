# goto

([Back to Index](../README.md#commands))

Jump execution to a named label elsewhere in the same script. `goto` is a
low-level control directive — handy for short scripts or special cases, but
prefer structured control flow (loops, conditionals) for readability.

## Syntax

```feyscript
goto <label>

# label (define a jump target)
label <label>
  <statements>
```

## Parameters

- `<label>` — identifier for a label defined in the current script. Labels
  are plain identifiers (often followed by `:` in some dialects) and must
  match exactly.

## Behavior

- Execution resumes at the first statement after the target label.
- If the label cannot be found, the runtime reports an error and stops the script.

## Examples

```feyscript
label start
  print "begin"
  goto end

label skipped
  print "this won't run"

label end
  print "done"
```

```feyscript
# Alternate explicit label directive
label loop
  print "looping"
  goto loop
```

## Notes

- Use `goto` sparingly; overuse can make scripts harder to follow.
- Labels are commonly resolved when the script is loaded — duplicate
  labels are disallowed and will result in an error.
- Labels are case-sensitive and must be unique within a script.
- Avoid using `goto` to jump into or out of control structures (loops,
  conditionals) as this can lead to unpredictable behavior.
- The `label` command does not create a scope; variables remain accessible across jumps.
- The `label` command does not affect execution flow by itself; it simply
  marks a position in the script.

## See also

- [**loop**](loop.md) — repeat blocks of statements
- [**if**](if.md) — branch logic
