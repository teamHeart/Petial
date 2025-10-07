# Ask
([Back to Index](../Feyscript%20Docs.md#commands)) \
([Back to Control Flow](../Feyscript%20Docs.md#Control-Structures)) 

The `ask` command presents the player with a simple choice prompt and stores the result in a variable. It's useful for branching dialogue, simple menus, and getting quick input from the player during scripts. The command pauses execution until the player chooses an option.

## Syntax

```feyscript
ask <variable_name> "<prompt text>"
    option "<option text>" [<value>]
    option "<option text>" [<value>]

```

Multiple `option` lines can be provided to define choices. Each `option` may optionally include a single token following the text which will be used as the stored value for that option. When omitted the option's index (0-based) or the option text may be stored depending on interpreter configuration.

Example form with multiple options:

```feyscript
ask choice "What will you do?"
    option "Fight" "fight"
    option "Run" "run"
    option "Talk" "talk"

```

## Parameters

- `<variable_name>` — the name of the variable that will receive the player's selection.
- `"<prompt text>"` — the message shown to the player.
- `option "<option text>" [<value>]` — a line defining a selectable choice. You may optionally include a single value token after the quoted option text to control what gets written to the variable.
	- `"<option text>"` — the text displayed for this choice.
	- `[<value>]` (optional) — a single token (string or number) that will be stored in `<variable_name>` if this option is selected. If omitted, the interpreter will store the text itself in `<variable_name>`.

## Examples

```feyscript
ask action "What will you do?"
    option "Attack" "attack"
    option "Defend" "defend"
    option "Item" "item"


if action == "attack"
    say Narrator "You chose to attack."
elif action == "defend"
    say Narrator "You brace for impact."
else
    say Narrator "You open the item menu."
done
```

```feyscript
# Simple choices (value omitted -> text stored)
ask pick "Choose a direction"
    option "North"
    option "East"
    option "South"
    option "West"


# `pick` will now contain "North", "East", "South" or "West"
```

### Branching with if/elif (recommended)

A common, clear pattern is to store explicit values for each option and then
use an `if`/`elif`/`else` block to react to the player's choice. This keeps
flow easy to follow and avoids scattering `goto` jumps.

```feyscript
ask choice "What will you do?"
    option "Attack" "attack"
    option "Run" "run"
    option "Talk" "talk"


if choice == "attack"
    say Narrator "You chose to attack."
elif choice == "run"
    say Narrator "You choose to run away!"
elif choice == "talk"
    say Narrator "You try to talk it out."
else
    say Narrator "You hesitated."
done
```

## Notes

- The presentation of the choice UI is implementation-dependent; ensure your game's UI system listens for `ask` instructions and displays a modal prompt.
	- If no optional value is specified, interpreters will store the option's text.
	- If a value is specified, it will be stored instead.
- `ask` blocks execution until the player makes a selection; use sparingly inside performance-critical loops.

## See also

- [**say**](say.md) — display text and dialogue
- [**if**](if.md) — branch logic based on player choice
