@tool
class_name OoOoOo
extends RichTextEffect
## A rich text effect that applies a wavy "OoOoOo" animation to text. [br]
## Syntax: [OoOoOo freq=5.0 amp=5.0 span=10.0]{text}[/OoOoOo][br]
## Parameters:[br]
## - freq: The period of the wave (in 1/Hz) (default: 5.0)[br]
## - amp: The amplitude of the wave (as a percentage [0-100]) (default: 5.0)[br]
## - span: The span of the wave (number of characters from crest to crest) (default: 10.0)

var bbcode = "OoOoOo"


func get_text_server():
	return TextServerManager.get_primary_interface()


@warning_ignore_start("unused_variable")


func _process_custom_fx(char_fx: CharFXTransform) -> bool:
	var speed = char_fx.env.get("freq", 2.5)
	var amplitude = min(max(char_fx.env.get("amp", 25.0), 0.0), 100.0) / 100.0
	var frequency = char_fx.env.get("span", 10.0)
	var time = char_fx.elapsed_time
	var position = char_fx.range
	var scale = (
		(((sin((time * 4.0 / speed) + (((position.x as float) / frequency) * TAU)) - 1.0) * 0.5) * amplitude) + 1.0
	)
	char_fx.transform = char_fx.transform.scaled_local(Vector2(scale, scale))
	if char_fx.range.x == 0:
		print(char_fx.glyph_index)
	return true
