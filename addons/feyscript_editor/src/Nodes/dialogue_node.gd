@tool
extends GraphNode
#region Declarations

@onready var data_container: HBoxContainer = $VBoxContainer/DataContainer
@onready var p1: PanelContainer = $VBoxContainer/DataContainer/P1
@onready var p2: PanelContainer = $VBoxContainer/DataContainer/P2
@onready var texture_rect: TextureRect = $VBoxContainer/DataContainer/P1/Margin/TextureRect
@onready var rich_text_label: TextEdit = $VBoxContainer/DataContainer/P2/Margin2/RichTextLabel
@onready var bubble_type_select: OptionButton = $VBoxContainer/BubbleTypeSelect

#endregion Declarations

func _ready():
    bubble_type_select.connect("item_selected",func(idx):
        match idx:
            0:
                p1.visible = true
                data_container.move_child(p1, 0)
                texture_rect.flip_h = true
            1:
                p1.visible = true
                data_container.move_child(p2, 0)
                texture_rect.flip_h = false
            2:
                p1.visible = false
    )
