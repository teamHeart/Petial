@abstract
class_name FeyscriptNode
extends GraphNode

signal edited

enum FSNodeType {
	ACTION1,
	DIALOGUE2,
	BRANCH3,
	START4,
	END5,
	CUE6,
	TEXT7,
	TEXTURE8,
	ACTOR9,
	PORTRAIT10,
	SOUND11,
	MUSIC12,
	EFFECT13,
	BUBBLE_TYPE14,
}

@export var node_type: FSNodeType = FSNodeType.ACTION1


func _on_edit_received() -> void:
	emit_signal("edited")