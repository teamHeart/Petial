class_name Settings
extends Node

enum ChatSpeed {
	INSTANT = 0,
	FAST = 2,
	NORMAL = 4,
	SLOW = 6,
}

static var chat_speed: ChatSpeed = ChatSpeed.NORMAL
