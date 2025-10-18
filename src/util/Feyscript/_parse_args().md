	# Below is a concise, actionable outline of what to do to implement and harden _parse_args() (no code included). Focus on correctness, predictable structure for handlers, and robust edge-case handling.

	1) Decide final _args shape and handler contract
	- Each parsed argument should be a Dictionary with at least:
		- type: "literal" | "variable" | "expression"
		- raw: original string form (unquoted)
		- value: resolved Variant for literals/expressions, null for unresolved variables
	- Document that command handlers will receive _args as Array[Dictionary] and must read value/raw accordingly.

	2) Token reassembly strategy
	- You currently call line.split(" ", false) in _tokenize(). Keep that, but implement reassembly in _parse_args:
		- Quoted strings: join tokens until a matching unescaped closing quote is found. Unescape standard sequences (\n, \", \') and escaped quotes. If closing quote never found, push an error containing line number.
		- Expressions spanning multiple tokens: detect when tokens form an expression rather than a single variable. Heuristic:
			- If token contains any operator or parentheses (+ - * / % ^ ( )), or
			- If an operator token appears immediately before/after a token (e.g., tokens like "1", "+", "2"), or
			- If parentheses open, keep appending tokens until parentheses are balanced.
		- Stop expression accumulation when you hit a token that is clearly the start of the next argument (e.g., a comma separator if you adopt one) or the end of tokens.

	3) Unescaping and normalization
	- For quoted strings: remove surrounding quotes, unescape escaped quote char and common sequences (\n, \t).
	- For unquoted literals: keep raw token as-is for further classification.

	4) Classification rules
	- After assembling a single logical arg string (unquoted):
		- Lowercase-check for "true", "false", "null" -> produce literal boolean/null.
		- is_valid_int()/is_valid_float() -> numeric literal with int/float value.
		- If looks like an expression (see heuristics above) -> attempt to evaluate with Godot Expression:
			- Use Expression.parse(expression_string, null) and Expression.execute(_variables) to evaluate at parse time.
			- Check parse/execute return values and expr.has_execute_failed(). If evaluation succeeded, produce type "expression" with value set to result.
			- On failure, fall back to variable (type "variable", value null) and/or push a parse warning.
		- Otherwise treat as variable name:
			- If variable name exists in _variables, treat as literal with resolved value (helpful for simple `print myvar` semantics).
			- Else keep as type "variable" and value null (defer runtime resolution).

	5) Use Expression safely
	- Expression allows evaluating fairly rich GDScript expressions. To avoid surprises:
		- Only parse/evaluate simple arithmetic / variable references. Avoid exposing global functions or objects from the parsing context.
		- Limit expressions you accept (operators, parentheses, numeric literals, variable names). If needed, run a quick security check that the expression contains only allowed characters (alphanumerics, _ . operators, parentheses) before calling Expression.parse.
		- Handle division by zero and execution failures gracefully by treating as variable or emitting a clear error.

	6) Errors and diagnostics
	- On malformed quoted strings or expression parse errors, use push_error() with line number.
	- When falling back from expression->variable, add an optional debug/warning message (not fatal) so script authors can fix typos.

	7) Mutate _args and maintain types
	- Replace the original _args (PackedStringArray) with a plain Array of Dictionaries as defined above.
	- Ensure any later code that expects _args[0] as string is updated to access _args[0]["raw"] or _args[0]["value"] accordingly.
	- Update _set_var, _print, and other handlers to use the new shape:
		- For set: variable name should still be _args[0]["raw"] (or enforce raw) and the right-hand value should come from _args[1]["value"] for literals/expressions or a runtime lookup if it's a variable (maybe error if unresolved at parse-time).
		- For print: if argument is type variable with value null, you can choose to store raw name (so interpreter resolves at runtime) or resolve now if exists in _variables.

	8) Edge cases to handle explicitly
	- Escaped quotes inside quoted strings: "He said \"hi\"" -> preserve inner quote.
	- Mixed quoting style across tokens (single vs double) and nested quotes (keep simple—do not attempt full nesting).
	- Expressions with spaces around operators (most common): ensure reassembly includes operator tokens like "+" and "-".
	- Negative numbers: "-5" should parse as numeric literal. Be careful not to mis-classify leading "-" as operator separate token if tokenizing produced ["-", "5"] (if split by space it's okay; otherwise reassembly should join).
	- Comment tokens in-line (if you allow inline comments, define delimiter and stop parsing args at comment start).

	9) Tests to write
	- Unit tests (small) parsing examples and expected _args output:
		- Quoted strings: say "Hello world" -> literal value "Hello world"
		- Escaped quotes and \n -> preserved/unescaped
		- Numbers: 42 -> int, 3.14 -> float
		- Booleans/null -> types true/false/null
		- Variables: myVar (unresolved) -> type variable, value null
		- Resolved variables: after set x 5, then print x -> print arg becomes literal value 5
		- Expressions: 1 + 2, (a + b) * 2 -> type expression with value if variables available; otherwise fallback
		- Malformed quote -> parse error emitted
	- Run parse_script() on small script snippets and verify commands & labels remain correct and command["line"] numbers are valid.

	10) Small integration checklist
	- Update any code that expects _args to be a PackedStringArray (search repo for _args usage) and adjust to new dict format.
	- Re-run Godot editor to catch compile-time errors (Engine.is_editor_hint guards may be required if you test in editor).
	- Run gdLinter/formatter if configured.

	11) Optional improvements (future)
	- Move tokenization (quoted strings and escaping) into a small state-machine scanner before initial split to avoid complex reassembly logic.
	- Introduce separators (commas) for multi-arg expressions to make detection easier.
	- Add a strict mode that disallows expression evaluation at parse-time and defers evaluation to the interpreter for better security and predictability.

	Follow these steps in order: implement robust reassembly of quoted strings first, then expression reassembly & evaluation, then classification, then update command handlers and tests. This minimizes breaking changes and makes it easy to validate each piece incrementally.
