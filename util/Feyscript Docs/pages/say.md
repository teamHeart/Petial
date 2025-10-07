# Say
([Back to Index](../Feyscript%20Docs.md#commands)) 

Display dialogue text in a message box with an optional portrait. The `say`
command is the primary way to show spoken lines and narration to the player.

## Syntax

```feyscript
# Display a message with optional portrait, position, and duration
say <CharacterName> "<Message>" [<PortraitName>] [<Position>] [<Duration>]
# Clear and remove the text box
say clear
```

## Parameters

- `<CharacterName>` — speaker name (e.g., `Alice` or `Narrator`).
- `"<Message>"` — text to display (use `\"` to escape quotes).
- `<PortraitName>` — optional portrait name.
- `<Position>` — UI position (`top`, `center`, `bottom`).
- `<Duration>` — seconds to auto-advance; when omitted, waits for input.

## Examples

```feyscript
say Alice "Hello, welcome to our village!" portrait=happy position=top duration=5
say Bob "It's a beautiful day, isn't it?" portrait=smile position=center
say Alice "Yes, it is! Let's go explore." portrait=excited position=bottom
say Narrator "The sun sets over the horizon, casting a golden glow." position=top duration=10
```

## Notes
- Ensure that the character and portrait names match those defined in your game assets.
- The `say` command can be combined with other commands to create more complex interactions, such as branching dialogues or conditional messages.
- You can use special formatting within the message, such as line breaks (`\n`) or text styles (e.g., bold, italic, color, big, small, shake, wave) to enhance the presentation of the text.
- If you want to include special characters or escape sequences in the message, make sure to handle them appropriately to avoid syntax errors.
- If the `duration` parameter is not specified, the message will stay on the screen until the player interacts to advance the dialogue.
- If the Message string needs to be constructed dynamically, you must use the `set` command to create a variable and then pass that variable to the `say` command.
```feyscript
set greeting "Hello, " + Global.party.leader.name + "! Welcome to our village!"
say Alice greeting portrait=happy position=top
```
- To clear the text box and remove it from the screen, use the `say clear` command.

## See also

- [**ask**](pages/ask.md) — prompt for player choice