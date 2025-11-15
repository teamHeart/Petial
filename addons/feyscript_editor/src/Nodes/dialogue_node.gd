@tool
extends FeyscriptNode
#region Declarations

@onready var preview_pane: Control = $PreviewPane
@onready var preview_button: Button = $SpeakerDialogue/PreviewButton

#endregion Declarations

func _ready():
		preview_pane.visible = false
		$PreviewPane/ChatBubble.emit_signal("fully_displayed")

func _on_preview_toggled(toggled_on: bool) -> void:
	if toggled_on:
		preview_pane.visible = true
	else:
		preview_pane.visible = false
