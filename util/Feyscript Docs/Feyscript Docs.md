# Feyscript Reference Documentation
Feyscript is a scripting language designed for creating interactive sequences of actions and events. It allows for simple and straightforward scripting of complex behaviors. \
This document provides a comprehensive reference for the Feyscript language, including its syntax, commands, and usage examples. \

## Table of Contents
1. [Introduction](#introduction)
2. [Basic Syntax](#basic-syntax)
3. [Commands](#commands)
4. [Control Structures](#control-structures)
5. [Variables](#variables)
6. [Operators](#operators)
7. [Examples](#examples)
8. [Best Practices](#best-practices)

## Introduction
([Back to Top](#feyscript-reference-documentation)) \
Feyscript is designed to be easy to read and write, making it accessible for anyone to create interactive scripts, regardless of their programming experience. \
Each script consists of a series of statements that define actions, conditions, and events. Each statement is executed in order, allowing for the creation of complex sequences of behavior. \
Statements are typically written on separate lines, and comments can be added using the `#` symbol, either on their own line or at the end of a statement.

## Basic Syntax
([Back to Top](#feyscript-reference-documentation)) 
- **Statements**: Each line in a Feyscript file represents a statement. Statements are executed in the order they appear.
- [**Commands**](#commands): Commands are the core of Feyscript and define specific actions or behaviors. Each command has a specific syntax and set of parameters.
- **Parameters**: Commands can take parameters, which are values that modify the behavior of the command. Parameters are typically separated by spaces.
- **Modifiers**: Some commands can be modified with additional keywords to change their behavior. Modifiers are usually placed after the command and before the parameters.
- **Comments**: Use `#` to add comments. Anything following `#` on the same line is ignored by the interpreter.
- **Whitespace**: Whitespace (spaces, tabs, and newlines) is generally ignored, except where it is used to separate tokens.
- **Indentation**: Indentation is not syntactically significant in Feyscript, but it is recommended to use consistent indentation for readability.
- **Line Continuation**: If a statement is too long to fit on one line, it can be continued on the next line using a backslash (`\`) at the end of the line.
- **Literals**:
	- **Strings**: Strings are enclosed in double quotes (`"`). To include a double quote inside a string, use the escape sequence `\"`.
	- **Numbers**: Numbers can be integers or floating-point values (e.g., `42`, `3.14`).
	- **Booleans**: The boolean values are `true` and `false`.
- **Identifiers**: Identifiers (names for variables) must start with a letter or underscore (`_`), followed by letters, digits, or underscores.
- **Operators**: Common operators include `+`, `-`, `*`, `/`, `==`, `!=`, `<`, `>`, `<=`, `>=`, `and`, `or`, `is`, and `not`.
- **End of Statements**: Statements are typically ended by a newline. However, if a statement is too long, it can be continued on the next line using a backslash (`\`) at the end of the line.
- **Case Sensitivity**: Feyscript is case-sensitive, meaning that `Variable`, `variable`, and `VARIABLE` are considered different identifiers.
- **End of File**: The end of a Feyscript file is indicated by the end of the text. There is a special `end` command that can be used to explicitly indicate the end of a script if needed.
- **Error Handling**: Feyscript provides basic error handling mechanisms, allowing scripts to gracefully handle unexpected situations.
- **File Inclusion**: Scripts can include other Feyscript files using the `include` command, allowing for modular code organization.
- **Data Structures**: Feyscript supports basic data structures such as lists and dictionaries for organizing data.
- **Debugging**: Basic debugging features are available, such as printing variable values and tracing execution flow.
- **Documentation**: It is recommended to document scripts thoroughly using comments to explain the purpose and functionality of different sections of code.
- [**Best Practices**](#best-practices): Follow best practices for code organization, naming conventions, and commenting to ensure that scripts are maintainable and understandable.
- [**Examples**](#examples): Refer to example scripts and tutorials to learn how to effectively use Feyscript for various applications.

## Commands
([Back to Top](#feyscript-reference-documentation)) \
Feyscript includes a variety of commands that can be used to create interactive scripts. Below is a list of common commands along with their syntax and descriptions. Click on each command for more details.
### Basic Commands
- [**print**](pages/print.md): Outputs text to the console or log.
- [**set**](pages/set.md): Assigns a value to a variable.
- [**get**](pages/get.md): Retrieves the value of a variable and prints it to the console or log.
- [**if**](pages/if.md): Starts a conditional block that executes if a specified condition is true.
- [**else**](pages/else.md): Specifies the block of code to execute if the preceding `if` condition is false.
- [**done**](pages/done.md): Ends a conditional block started by `if`.
- [**loop**](pages/loop.md): Starts a loop that repeats a block of code, and defines a specified number of times or a condition that repeats the loop if true.
- [**endloop**](pages/endloop.md): Ends a loop block started by `loop` 
- [**stoploop**](pages/stoploop.md): Exits the current loop immediately.

### General Commands
- [**wait**](pages/wait.md): Pauses the script for a specified duration (in seconds).
- [**say**](pages/say.md): Displays dialogue text for a specified character and wait for input before continuing.
- [**ask**](pages/ask.md): Prompts the user with a question and waits for input.
- [**option**](pages/option.md): Presents a choice to the user and waits for selection.
- [**goto**](pages/goto.md): Jumps to a specified label in the script.
- [**label**](pages/label.md): Defines a label that can be jumped to using the `goto` command.
- [**playmusic**](pages/playmusic.md): Starts playing a specified music track.
- [**stopmusic**](pages/stopmusic.md): Stops the currently playing music track.
- [**playsound**](pages/playsound.md): Plays a specified sound effect.
- [**stopsound**](pages/stopsound.md): Stops a specified sound effect.
- [**playanimation**](pages/playanimation.md): Plays an animation on a specified actor sprite.
- [**stopanimation**](pages/stopanimation.md): Stops an animation on a specified actor sprite.
- [**setactor**](pages/setactor.md): Changes the actor sprite to a specified image.
- [**setbackground**](pages/setbackground.md): Changes the background image to a specified image.
- [**showactor**](pages/showactor.md): Displays an actor sprite on the screen.
- [**hideactor**](pages/hideactor.md): Hides an actor sprite from the screen.
- [**moveactor**](pages/moveactor.md): Moves an actor sprite to a specified position on the screen.
- [**fadein**](pages/fadein.md): Fades in the screen from black to the current scene.
- [**fadeout**](pages/fadeout.md): Fades out the screen to black from the current scene.
- [**transition**](pages/transition.md): Transitions between two scenes with a specified effect.

### Battle-specific Commands
- [**damage**](pages/damage.md): Inflicts damage on a specified target, optionally as a specified element.
- [**heal**](pages/heal.md): Restores health to a specified target.
- [**apply**](pages/apply.md): Applies a status effect to a specified target.
- [**remove**](pages/remove.md): Removes a status effect from a specified target.
- [**flee**](pages/flee.md): Attempts to flee from battle.
- [**spawn**](pages/spawn.md): Spawns a new entity (enemy, ally, or other) in the battle.
- [**despawn**](pages/despawn.md): Removes an entity from the battle.
- [**endbattle**](pages/endbattle.md): Ends the current battle sequence.
- [**setturn**](pages/setturn.md): Sets the turn in the battle to a specified entity. \
 \
**Enemy-spcific Commands**
- [**attack**](pages/attack.md): Performs a standard attack on a specified target.
- [**cast**](pages/cast.md): Casts a spell or ability on a specified target.
- [**use**](pages/use.md): Uses an item on a specified target.
- [**move**](pages/move.md): Moves an enemy to a specified position or location.

### Modifiers
- **chance**: Specifies the probability of a command executing (e.g., `chance 50` for a 50% chance(`%` is optional)).
- **duration**: Specifies the duration for status effects. (e.g., `duration 5` for 5 turns).
- **as**: Specifies the element or type of an action (e.g., `as fire` for fire damage).

## Control Structures
([Back to Top](#feyscript-reference-documentation)) \
Feyscript provides several control structures to manage the flow of execution in a script. These include conditional statements and loops.
### Conditional Statements
- **if**: Starts a conditional block that executes if a specified condition is true.
- **else**: Specifies the block of code to execute if the preceding `if` condition is false.
- **done**: Ends a conditional block started by `if`.
### Loops
- **loop**: Starts a loop that repeats a block of code, and defines a specified number of times or a condition that repeats the loop if true.
- **endloop**: Ends a loop block started by `loop`.
- **stoploop**: Exits the current loop immediately.

## Variables
([Back to Top](#feyscript-reference-documentation)) \
Feyscript supports the use of variables to store and manipulate data. Variables can hold different types of values, including numbers, strings, and booleans.
### Declaring Variables
- Use the `set` command to declare and assign a value to a variable.
```
set variable_name value
```	
### Accessing Variables
- Use the `get` command to retrieve and print the value of a variable.
```	
get variable_name
```	
### Variable Naming Conventions
- Variable names must start with a letter or underscore (`_`), followed by letters, digits, or underscores.
- Variable names are case-sensitive.
- Avoid using reserved keywords as variable names.
### Variable Types
- **Numbers**: Integers and floating-point values (e.g., `42`, `3.14`).
- **Strings**: Text enclosed in double quotes (e.g., `"Hello, World!").
- **Booleans**: The boolean values are `true` and `false`.

## Operators
([Back to Top](#feyscript-reference-documentation)) \
Feyscript includes a variety of operators for performing operations on variables and values. These include arithmetic, comparison, and logical operators.
### Arithmetic Operators
- `+`: Addition
- `-`: Subtraction
- `*`: Multiplication
- `/`: Division
- `%`: Modulus (remainder)
### Comparison Operators
- `==`: Equal to
- `!=`: Not equal to
- `<`: Less than
- `>`: Greater than
- `<=`: Less than or equal to
- `>=`: Greater than or equal to
### Logical Operators
- `and`: Logical AND
- `or`: Logical OR
- `not`: Logical NOT
- `is`: Status effect check (e.g., `if target is poisoned`)
### Assignment Operators
- `=`: Assigns a value to a variable
- `+=`: Adds a value to a variable and assigns the result
- `-=`: Subtracts a value from a variable and assigns the result
- `*=`: Multiplies a variable by a value and assigns the result
- `/=`: Divides a variable by a value and assigns the result
- `%=`: Applies modulus to a variable by a value and assigns the result
### String Operators
- `+`: Concatenation (combining two strings)
- `*`: Repetition (repeating a string a specified number of times)
### Other Operators
- `.(period)`: Accesses properties or methods of an object (e.g., `object.property` or `object.method()`)

## Examples
([Back to Top](#feyscript-reference-documentation)) \
Here are some example scripts demonstrating various features of Feyscript.
### Example 1: Basic Dialogue
```
# This script displays a simple dialogue sequence
set character_name "Alice"
say character_name "Hello, welcome to the world of Feyscript!"
wait 2
say character_name "Let's embark on an adventure together!"
```

### Example 2: Conditional Statements
```	
# This script demonstrates the use of conditional statements
set player_health 50
if player_health < 20
		say none "Warning! Your health is low!"
else
		say none "You are in good health."
done
```	
### Example 3: Loops
```	
# This script demonstrates the use of loops
set count 0
loop count <= 5
	say "This is loop iteration number " + count
	set count count + 1
endloop
```
### Example 4: Variables and Operators
```		
# This script demonstrates the use of variables and operators
set score 0	
set bonus 10
set score score + bonus
say "Your total score is " + score
```	
### Example 5: Battle Commands
```	
# This script demonstrates the use of battle commands

damage target 30 as fire
say none target.name + " took 30 fire damage! Remaining health: " + enemy_health
apply enemy burning 
say none "Enemy is burning!"
```
### Example 6: Modifiers
```
# This script demonstrates the use of modifiers
damage target 50 as ice chance 75
say none "Attempted to deal 50 ice damage with a 75% chance."
```
## Best Practices
([Back to Top](#feyscript-reference-documentation)) \
To ensure that your Feyscript scripts are maintainable and understandable, consider the following best practices:
- **Consistent Naming Conventions**: Use clear and consistent naming conventions for variables and labels.
- **Commenting**: Add comments to explain the purpose and functionality of different sections of code.
- **Testing**: Regularly test your scripts to ensure they behave as expected.
- **Documentation**: Maintain thorough documentation of your scripts for future reference and collaboration.
- **Consistent Formatting**: Use consistent indentation and spacing to improve readability.
- **Consistent Flow**: Ensure that the flow of your script is logical and easy to follow.
- **Stay Updated**: Keep up with updates to the Feyscript language and its features to take advantage of new capabilities.
- **Backup Your Work**: Regularly back up your scripts to prevent data loss.
- **Use Meaningful Labels**: When using labels for `goto` and `ask`/`option` commands, choose meaningful names that reflect their purpose.
- **Avoid Deep Nesting**: Limit the depth of nested control structures to enhance readability and maintainability.
- **Limit Line Length**: Keep lines of code to a reasonable length to improve readability.
- **Use Constants**: Define constants for values that do not change to improve code clarity and maintainability.
- **Review and Refactor**: Periodically review and refactor your scripts to improve structure and eliminate redundancy.
- **Seek Feedback**: Share your scripts with others for feedback and suggestions for improvement.
- **Learn from Examples**: Study example scripts to understand different techniques and approaches in Feyscript.
- **Stay Organized**: Keep your scripts organized in a logical directory structure for easy access and management.
- **Use Descriptive Variable Names**: Choose variable names that clearly describe their purpose and content.
- **Test Edge Cases**: Consider and test edge cases to ensure your scripts handle unexpected inputs gracefully.
- **Keep Learning**: Continuously seek to improve your skills and knowledge of Feyscript and related technologies.
- **Have Fun**: Enjoy the process of creating and experimenting with Feyscript!