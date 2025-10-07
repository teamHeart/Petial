# Say
([Back to Index](../Feyscript%20Docs.md#commands)) \
The `say` command displays a text box with a message along with a character's portrait. It is commonly used for dialogues and narrative elements in games. The character's portrait is optional, and can be customized to reflect different emotions or states.
## Syntax
```feyscript
# Display a message with optional portrait, position, and duration
say <CharacterName> "<Message>" [<PortraitName>] [<Position>] [<Duration>]
# Clear and remove the text box
say clear
```
## Parameters
- `<CharacterName>`: The name of the character speaking. This should match a character defined in your game. If no character is needed, you can use a generic name like `Narrator`.
- `"<Message>"`: The text message to be displayed in the text box. It should be enclosed in double quotes. If the message contains double quotes, use a `\` to escape them.
- `[portrait=<PortraitName>]` (optional): The name of the portrait to be displayed alongside the message. This should match a portrait defined for the character. If not specified, the default portrait for the character will be used.
- `[position=<Position>]` (optional): The position of the text box on the screen. Common values are `top`, `center`, and `bottom`. If not specified, the default position is `top`.
- `[duration=<Duration>]` (optional): The duration in seconds for which the message will be displayed. If not specified, the message will remain until the player advances it (e.g., by clicking or pressing a key).
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