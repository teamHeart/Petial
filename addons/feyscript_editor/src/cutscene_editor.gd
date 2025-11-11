@tool
extends VBoxContainer

const dialogue_node_scene = preload("res://addons/feyscript_editor/scn/Nodes/dialogue_node.tscn")


#region Declarations

var selected_node: GraphNode = null

@onready var new_node_button: Button = $ToolBar/Margin/HBox/HBoxLeft/NewNodeButton
@onready var delete_node_button: Button = $ToolBar/Margin/HBox/HBoxLeft/DeleteNodeButton

@onready var cut_button: Button = $ToolBar/Margin/HBox/HBoxLeft/CutButton
@onready var copy_button: Button = $ToolBar/Margin/HBox/HBoxLeft/CopyButton
@onready var paste_button: Button = $ToolBar/Margin/HBox/HBoxLeft/PasteButton

@onready var test_scene_button: Button = $ToolBar/Margin/HBox/HBoxRight/TestSceneButton

@onready var save_button: Button = $ToolBar/Margin/HBox/HBoxRight/SaveButton
@onready var save_as_button: Button = $ToolBar/Margin/HBox/HBoxRight/SaveAsButton
@onready var close_button: Button = $ToolBar/Margin/HBox/HBoxRight/CloseButton

@onready var graph_edit: GraphEdit = $GraphEdit
#endregion Declarations


#region Boilerplate
func _ready():
    new_node_button.connect("pressed", _on_new_node_pressed)
    delete_node_button.connect("pressed", _on_delete_node_pressed)
    cut_button.connect("pressed", _on_cut_pressed)
    copy_button.connect("pressed", _on_copy_pressed)
    paste_button.connect("pressed", _on_paste_pressed)
    test_scene_button.connect("pressed", _on_test_scene_pressed)
    save_button.connect("pressed", _on_save_pressed)
    save_as_button.connect("pressed", _on_save_as_pressed)
    close_button.connect("pressed", _on_close_pressed)
#endregion Boilerplate


#region Button Press Handling
func _on_new_node_pressed():
    var node_instance = dialogue_node_scene.instantiate()
    graph_edit.add_child(node_instance)
    node_instance.connect("node_selected", func():
        selected_node = node_instance
    )

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