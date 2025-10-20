extends Node

## This script initializes the Steam API and provides a method to unlock achievements.
## It checks if Steam is running and handles initialization errors.


# Setup Steam callbacks
func _process(_delta: float) -> void:
	Steam.run_callbacks()


# Wrapper to connect Steam signals to functions
func steam_callback_wrapper(this_signal: String, this_function: String) -> void:
	var callback_connect: int = Steam.connect(this_signal, Callable(self, this_function))
	if callback_connect > OK:
		print("Connected to Steam callback:", this_signal)


func _on_user_stats_received(steam_id: int, result: int, app_id: int) -> void:
	if steam_id != Steam.getSteamID():
		return
	if app_id != Steam.getAppID():
		return
	if result != Steam.RESULT_OK:
		print("Failed to receive user stats from Steam.")
		return
	# Settings.load_steam_stats()
	# Settings.load_steam_achievements()


func initialize_steam() -> void:
	if Engine.has_singleton("Steam"):
		if Steam.isSteamRunning():
			var initialize_data: Dictionary = Steam.steamInitEx(480, true)
			print("Steam initialized:", initialize_data)

			if initialize_data["status"] != Steam.STEAM_API_INIT_RESULT_OK:
				print("Steam initialization failed with status:", initialize_data["verbal"])
				return
		else:
			return
	Steam.inputInit()
	Steam.enableDeviceCallbacks()
	SteamControllerInput.init()
