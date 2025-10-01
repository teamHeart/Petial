class_name Feyscript

static func parse_feyscript(input: String) -> Array:
	var lines = input.split("\n", false)
	var commands: Dictionary = []
	for line in lines:
		line = line.strip_edges()
		if line == "" or line.begins_with("#"):
			continue
		var parts = line.split(" ", false, 1)
		var command = parts[0]
		var args = []
		if parts.size() > 1:
			args = parts[1].split(" ")
		commands.append({"command": command, "args": args})
	return commands

static func execute_commands(commands: Array, context: Dictionary):
	for cmd in commands:
		match cmd["command"]:
			## print command: prints arguments to the console
			"print":
				if cmd["args"].size() > 0:
					print(cmd["args"].join(" "))
			
			## set command: sets a variable in the context
			"set":
				if cmd["args"].size() == 2:
					var var_name = cmd["args"][0]
					var var_value = cmd["args"][1]
					context[var_name] = var_value

			## get command: retrieves a variable from the context and prints it
			"get":
				if cmd["args"].size() == 1:
					var var_name = cmd["args"][0]
					if context.has(var_name):
						print(context[var_name])
					else:
						print("Variable " var_name " not found in context.")
			
			## add command: adds two numbers and stores the result in the context
			"add":
				if cmd["args"].size() == 3:
					var var_name = cmd["args"][0]
					var num1 = float(cmd["args"][1])
					var num2 = float(cmd["args"][2])
					context[var_name] = str(num1 + num2)

			## subtract command: subtracts two numbers and stores the result in the context
			"subtract":
				if cmd["args"].size() == 3:
					var var_name = cmd["args"][0]
					var num1 = float(cmd["args"][1])
					var num2 = float(cmd["args"][2])
					context[var_name] = str(num1 - num2)

			## multiply command: multiplies two numbers and stores the result in the context
			"multiply":
				if cmd["args"].size() == 3:
					var var_name = cmd["args"][0]
					var num1 = float(cmd["args"][1])
					var num2 = float(cmd["args"][2])
					context[var_name] = str(num1 * num2)

			## divide command: divides two numbers and stores the result in the context
			"divide":
				if cmd["args"].size() == 3:
					var var_name = cmd["args"][0]
					var num1 = float(cmd["args"][1])
					var num2 = float(cmd["args"][2])
					if num2 != 0:
						context[var_name] = str(num1 / num2)
					else:
						print("Error: Division by zero.")


			## if command: conditional execution based on variable value
			"if":
				# This is a placeholder for future implementation
				_if(cmd["args"], context)
				pass
			
			## then command: marks the start of the then block
			"then":
				# This is a placeholder for future implementation

				pass

			## else command: marks the start of the else block
			"else":
				# This is a placeholder for future implementation
				pass

			## done command: marks the end of a conditional block
			"done":
				# This is a placeholder for future implementation
				pass

			## loop command: starts a loop
			"loop":
				# This is a placeholder for future implementation
				pass

			## endloop command: ends a loop
			"endloop":
				# This is a placeholder for future implementation
				pass

			## damage command: applies damage to a target
			"damage":
				# This is a placeholder for future implementation
				_damage(cmd["args"], context)
				pass

			## heal command: heals a target
			"heal":
				# This is a placeholder for future implementation
				_heal(cmd["args"], context)
				pass

			## remove command: removes a status effect from a target
			"remove":
				# This is a placeholder for future implementation
				_remove(cmd["args"], context)
				pass

			## apply command: applies a status effect to a target
			"apply":
				# This is a placeholder for future implementation
				_apply(cmd["args"], context)
				pass

			## wait command: pauses execution for a specified duration
			"wait":
				# This is a placeholder for future implementation
				pass

			## play command: plays a sound effect or animation
			"play":
				# This is a placeholder for future implementation
				_play(cmd["args"], context)
				pass

			## spawn command: spawns an entity in the game world
			"spawn":
				# This is a placeholder for future implementation
				_spawn(cmd["args"], context)
				pass

			## despawn command: removes an entity from the game world
			"despawn":
				# This is a placeholder for future implementation
				_despawn(cmd["args"], context)
				pass

			## move command: moves an entity to a specified location
			"move":
				# This is a placeholder for future implementation
				_move(cmd["args"], context)
				pass

			## attack command: makes an entity perform an attack
			"attack":
				# This is a placeholder for future implementation
				_attack(cmd["args"], context)
				pass

			## defend command: makes an entity perform a defensive action
			"defend":
				# This is a placeholder for future implementation
				_defend(cmd["args"], context)
				pass

			## cast command: makes an entity cast a spell or ability
			"cast":
				# This is a placeholder for future implementation
				_cast(cmd["args"], context)
				pass

			## do command: makes an entity perform a special action
			"do":
				# This is a placeholder for future implementation
				_do(cmd["args"], context)
				pass

			## use command: makes an entity use an item
			"use":
				# This is a placeholder for future implementation
				_use(cmd["args"], context)
				pass

			## waitfor command: waits for a specific event or condition
			"waitfor":
				# This is a placeholder for future implementation
				pass

			## say command: makes an entity say a line of dialogue
			"say":
				# This is a placeholder for future implementation
				_say(cmd["args"], context)
				pass

			## ask command: prompts the player with a question
			"ask":
				# This is a placeholder for future implementation
				_ask(cmd["args"], context)
				pass

			## option command: presents the player with a choice
			"option":
				# This is a placeholder for future implementation
				pass

			## goto command: jumps to a specified label in the script
			"goto":
				# This is a placeholder for future implementation
				_goto(cmd["args"], context)
				pass

			## label command: defines a label for use with goto
			"label":
				# This is a placeholder for future implementation
				_label(cmd["args"], context)
				pass

			## end command: marks the end of a sequence of actions
			"end":
				return

			## Unknown command
			_:
				print("Unknown command: %s" % cmd["command"])


"""
# Example usage:
# var feyscript_code = """
# # This is a comment
# set health 100
# print Player health is
# get health
# end
# """
# var commands = Feyscript.parse_feyscript(feyscript_code)
# var context = {}
# Feyscript.execute_commands(commands, context)
# Output:
# Player health is
#	100
# Context now contains: {"health": "100"}
# Note: All values are treated as strings in this simple implementation.
# You can extend this by adding more commands and handling different data types as needed.
"""