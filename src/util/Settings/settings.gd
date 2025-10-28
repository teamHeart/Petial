class_name Settings
extends Node

# Frame delay between each character when displaying chat text.
enum ChatSpeed {
	INSTANT = 0,
	FAST = 1,
	NORMAL = 4,
	SLOW = 6,
}

static var chat_speed: ChatSpeed = ChatSpeed.NORMAL
