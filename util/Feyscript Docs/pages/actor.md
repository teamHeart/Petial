# Actor

The `actor` command is a unified command for managing actors in the game world. It consolidates all actor-related operations into a single command with various subcommands, providing a more consistent and organized interface for actor management.

## Syntax

```feyscript
actor <subcommand> [arguments...]
```

## Subcommands

The `actor` command supports the following subcommands:

### actor create

Creates a new actor in the game world.

```feyscript
actor create <actor_type> <database name> <local name> <x position> <y position>
```

**Parameters:**
- `<actor_type>`: The type of actor to create (e.g., "player", "npc", "enemy", "object").
- `<database name>`: The name of the actor as it appears in the database.
- `<local name>`: The local name assigned to the actor for identification within the script.
- `<x|y position>`: The initial position of the actor in the game world, specified as coordinates.

**Example:**
```feyscript
actor create enemy Goblin Gobdo 10 20
```

### actor delete

Removes an actor from the game world.

```feyscript
actor delete <local name>
```

**Parameters:**
- `<local name>`: The local name of the actor you want to delete.

**Example:**
```feyscript
actor delete Gobdo
```

### actor show

Makes an invisible actor visible in the scene.

```feyscript
actor show <local name>
```

**Parameters:**
- `<local name>`: The local name of the actor you want to show.

**Example:**
```feyscript
actor show Gobdo
```

### actor hide

Hides an actor from the scene without deleting them.

```feyscript
actor hide <local name>
```

**Parameters:**
- `<local name>`: The local name of the actor you want to hide.

**Example:**
```feyscript
actor hide Gobdo
```

### actor enable

Enables an actor, making it interactive and allowing its scripts to run.

```feyscript
actor enable <local name>
```

**Parameters:**
- `<local name>`: The local name of the actor to be enabled.

**Example:**
```feyscript
actor enable Gobdo
```

### actor disable

Disables an actor, making it non-interactive and preventing its scripts from running.

```feyscript
actor disable <local name>
```

**Parameters:**
- `<local name>`: The local name of the actor to be disabled.

**Example:**
```feyscript
actor disable Gobdo
```

### actor move

Moves an actor to a specified location in the game world.

```feyscript
actor move <local name> <x position> <y position> [<"speed"|"duration">] [<value>]
```

**Parameters:**
- `<local name>`: The local name of the actor you want to move.
- `<x|y position>`: The target x and y coordinates where you want the actor to move.
- `[<"speed"|"duration">]`: An optional parameter that specifies how the movement should be executed.
  - If you choose "speed", the actor will move at a constant speed to the target position.
  - If you choose "duration", the actor will take a specified amount of time to reach the target position.
  - If this parameter is omitted, the default behavior is to move the actor instantly to the target position.
- `[<value>]`: An optional numerical value that corresponds to the chosen movement type.
  - If "speed" is chosen, this value represents the speed at which the actor moves (units per second).
  - If "duration" is chosen, this value represents the time in seconds it will take for the actor to reach the target position.

**Example:**
```feyscript
actor move Gobdo 100 200 duration 2
```

### actor set

Changes the current sprite of an actor in the scene.

```feyscript
actor set <actor_id> <sprite_id>
```

**Parameters:**
- `<actor_id>`: The identifier of the actor whose sprite you want to change.
- `<sprite_id>`: The identifier of the new sprite to assign to the actor.

**Example:**
```feyscript
actor set Nim IdleLeft
```

## Notes

- The `actor` command provides a more organized and consistent way to manage actors compared to the individual commands.
- All actor-related operations can now be performed through this single command with different subcommands.
- The local name should be unique within the context of the script to avoid conflicts.
- Ensure that actor types, database names, and sprite IDs correspond to existing entries in your game's database.
- For backward compatibility, the old individual commands (`createactor`, `deleteactor`, etc.) are still supported but are considered deprecated.

## Migration from Legacy Commands

If you're using the older individual actor commands, you can easily migrate to the new unified `actor` command:

- `createactor ...` → `actor create ...`
- `deleteactor ...` → `actor delete ...`
- `showactor ...` → `actor show ...`
- `hideactor ...` → `actor hide ...`
- `enableactor ...` → `actor enable ...`
- `disableactor ...` → `actor disable ...`
- `moveactor ...` → `actor move ...`
- `setactor ...` → `actor set ...`

## See Also

- [**say**](say.md) - Command to make an actor speak a line of dialogue.
- [**animation**](animation.md) - Command to animate an actor's sprite.
- [**camera**](camera.md) - Command to control camera movement and effects.
- [**setbackground**](setbackground.md) - Command to change the background image.

## Legacy Commands

For documentation on the individual legacy commands, see:
- [**createactor**](createactor.md) - (Deprecated) Command to create a new actor.
- [**deleteactor**](deleteactor.md) - (Deprecated) Command to delete an actor.
- [**showactor**](showactor.md) - (Deprecated) Command to show an actor.
- [**hideactor**](hideactor.md) - (Deprecated) Command to hide an actor.
- [**enableactor**](enableactor.md) - (Deprecated) Command to enable an actor.
- [**disableactor**](disableactor.md) - (Deprecated) Command to disable an actor.
- [**moveactor**](moveactor.md) - (Deprecated) Command to move an actor.
- [**setactor**](setactor.md) - (Deprecated) Command to set an actor's sprite.
