# Create Actor

> **⚠️ DEPRECATED**: This command is deprecated. Please use `actor create` instead. See [**actor**](actor.md) for the unified actor command documentation.

The `createactor` command is used to create a new actor in the game world. An actor can be a player character, non-player character (NPC), or any other entity that can interact within the game environment.

This command has been superseded by the unified `actor` command. Use `actor create` instead for new scripts.

## Syntax

```feyscript
createactor <actor_type> <database name> <local name> <x position> <y position>
```

## Parameters

- `<actor_type>`: The type of actor to create (e.g., "player", "npc", "enemy", "object"). The type determines which sub-database to search for the actor's properties.
- `<database name>`: The name of the actor as it appears in the database.
- `<local name>`: The local name assigned to the actor for identification within the script.
- `<x|y position>`: The initial position of the actor in the game world, specified as coordinates (e.g., `10` `20`).

## Example

```feyscript
createactor enemy Goblin Gobdo 10 20

# "Gobdo, Trapeze Troupe Director" is stored in the database, and will be referenced in the script with the identifier "Gobdo". When refering to her in the script, use "Gobdo". When passed to a command that will display the name to the player, it will use her full name from her data, "Gobdo, Trapeze Troupe Director".
```

This command creates a new enemy actor of type "Goblin" at the coordinates (10, 20) and assigns it the local name "Gobdo, Trapeze Troupe Director".

## Notes

- When creating an actor in the game world, it will be immediately visible and interactive unless additional commands are used to modify its state.
- Ensure that the actor type and database name correspond to existing entries in your game's database.
- The local name should be unique within the context of the script to avoid conflicts.
- The position coordinates should be within the bounds of the game world to ensure proper placement of the actor.
- Additional properties and behaviors of the actor can be defined in the database entry associated with the specified database name.
- Test your scripts thoroughly to ensure that actors are created and behave as expected in the game environment.

## See Also

- [**actor**](actor.md): Unified command for all actor operations (recommended).
- [**deleteactor**](deleteactor.md): Command to remove an actor from the game world.
- [**moveactor**](moveactor.md): Command to change the position of an existing actor.
- [**setactor**](setactor.md): Command to modify properties of an existing actor.
- [**showactor**](showactor.md): Command to make an actor visible on the screen.
- [**hideactor**](hideactor.md): Command to make an actor invisible on the screen.