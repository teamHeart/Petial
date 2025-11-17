@tool
extends Control

const dialogue_node_scene = preload("uid://bbduuy5sybcae")
const text_node_scene = preload("uid://gehk3rcfxapf")


#region Declarations

var selected_node: GraphNode = null

@onready var new_node_button: Button = $Hb/CutsceneEditor/ToolBar/HBox/NewNodeButton
@onready var new_node_popup: Control = $C
@onready var node_list: ItemList = $C/PC/MC/NewNodeList
@onready var delete_node_button: Button = $Hb/CutsceneEditor/ToolBar/HBox/DeleteNodeButton

@onready var cut_button: Button = $Hb/CutsceneEditor/ToolBar/HBox/CutButton
@onready var copy_button: Button = $Hb/CutsceneEditor/ToolBar/HBox/CopyButton
@onready var paste_button: Button = $Hb/CutsceneEditor/ToolBar/HBox/PasteButton

@onready var test_scene_button: Button = $Hb/CutsceneEditor/ToolBar/HBox/TestSceneButton

@onready var save_button: Button = $Hb/CutsceneEditor/ToolBar/HBox/SaveButton
@onready var save_as_button: Button = $Hb/CutsceneEditor/ToolBar/HBox/SaveAsButton
@onready var close_button: Button = $Hb/CutsceneEditor/ToolBar/HBox/CloseButton

@onready var graph_edit: GraphEdit = $Hb/CutsceneEditor/GraphEdit
#endregion Declarations


#region Boilerplate
func _rejady():
	new_node_button.connect("pressed", _on_new_node_pressed)
	node_list.connect("item_selected", _on_node_list_item_selected)
	delete_node_button.connect("pressed", _on_delete_node_pressed)
	cut_button.connect("pressed", _on_cut_pressed)
	copy_button.connect("pressed", _on_copy_pressed)
	paste_button.connect("pressed", _on_paste_pressed)
	test_scene_button.connect("pressed", _on_test_scene_pressed)
	save_button.connect("pressed", _on_save_pressed)
	save_as_button.connect("pressed", _on_save_as_pressed)
	close_button.connect("pressed", _on_close_pressed)
	graph_edit.connect("gui_input", func(event):
		if event is InputEventMouseButton and event.pressed and event.button_index == MOUSE_BUTTON_LEFT:
			new_node_popup.visible = false
		if event is InputEventKey and event.pressed and (event.keycode == KEY_DELETE or event.keycode == KEY_BACKSPACE):
			_on_delete_node_pressed()
	)
	graph_edit.connect("connection_request", _on_graph_connection_request)
	graph_edit.connect("disconnection_request", _on_graph_disconnection_request)
	graph_edit.connect("popup_request", _on_popup_request)

	
#endregion Boilerplate


#region Signal Processing
func _on_node_selected(node: FeyscriptNode):
	selected_node = node

func _on_node_deselected(node: FeyscriptNode):
	if selected_node == node:
		selected_node = null

func _on_graph_connection_request(from_node: String, from_slot: int, to_node: String, to_slot: int):
	if from_node == to_node:
		return # Prevent self-connections
	Debug._print("Connection requested from %s slot %d to %s slot %d" % [from_node, from_slot, to_node, to_slot])
	var from_feyscript_node = graph_edit.find_child(from_node) as FeyscriptNode
	var to_feyscript_node = graph_edit.find_child(to_node) as FeyscriptNode
	Debug._print(from_feyscript_node)
	Debug._print(to_feyscript_node)
	# from_feyscript_node.connect("edited", to_feyscript_node._on_edit_received)
	Debug._print(graph_edit.connect_node(from_node, from_slot, to_node, to_slot))

func _on_graph_disconnection_request(from_node: String, from_slot: int, to_node: String, to_slot: int):
	Debug._print("Disconnection requested from %s slot %d to %s slot %d" % [from_node, from_slot, to_node, to_slot])
	find_child(from_node).disconnect("edited", (find_child(to_node) as FeyscriptNode)._on_edit_received)
	graph_edit.disconnect_node(from_node, from_slot, to_node, to_slot)

func _on_popup_request(position: Vector2):
	new_node_popup.position = position
	new_node_popup.visible = true
#endregion Signal Processing


#region Button Press Handling
func _on_new_node_pressed():
	new_node_popup.position = Vector2(0,31)
	new_node_popup.visible = !new_node_popup.visible

func _on_node_list_item_selected(index: int):
	var node_type = node_list.get_item_text(index)
	var node_instance: FeyscriptNode
	match node_type:
		"Dialogue Node":
			node_instance = dialogue_node_scene.instantiate()
			node_instance.connect("node_selected", func():
				selected_node = node_instance
			)
		"Text Node":
			node_instance = text_node_scene.instantiate()
			node_instance.connect("node_selected", func():
				selected_node = node_instance
			)
		_:
			Debug._print("Node type not recognized: %s" % node_type)
	
	if node_instance:
		node_instance.position_offset = graph_edit.get_local_mouse_position() + graph_edit.scroll_offset
		graph_edit.add_child(node_instance)
		node_instance.connect("node_selected", func():
			selected_node = node_instance
		)
		node_instance.connect("node_deselected", func():
			if selected_node == node_instance:
				selected_node = null
		)
		node_instance.emit_signal("node_selected")
	new_node_popup.visible = false
	

func _on_delete_node_pressed():
	if selected_node:
		selected_node.queue_free()
		selected_node = null
	

func _on_cut_pressed():
	pass

func _on_copy_pressed():
	pass

func _on_paste_pressed():
	pass

func _on_test_scene_pressed():
	pass

func _on_save_pressed():
	pass

func _on_save_as_pressed():
	pass

func _on_close_pressed():
	pass

#endregion Button Press Handling