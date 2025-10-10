class_name InspectorEnhancer extends RefCounted

var base_control: Control = EditorInterface.get_base_control()
var inspector: EditorInspector = EditorInterface.get_inspector()

func perform():
	inspector.edited_object_changed.connect(on_inspector_edited_object_changed)

	# add Expand Modified only Button
	var property_filter_bar: HBoxContainer = get_inspector_property_filter_bar()
	var property_filter_button = property_filter_bar.get_children().back() as MenuButton
	
	var expand_modified_only_button := Button.new()
	expand_modified_only_button.name = "expand_modified_only_button"
	expand_modified_only_button.flat = true
	expand_modified_only_button.icon = base_control.get_theme_icon("EditInternal", "EditorIcons")
	expand_modified_only_button.focus_mode = Control.FocusMode.FOCUS_NONE
	expand_modified_only_button.tooltip_text = "Expand Non-Default only"
	expand_modified_only_button.disabled = property_filter_button.disabled
	expand_modified_only_button.pressed.connect(show_modified_only)
	property_filter_button.add_sibling(expand_modified_only_button)
	
	inspector.gui_input.connect(func(event: InputEvent):
		if event is InputEventMouseButton:
			if event.button_mask == MouseButtonMask.MOUSE_BUTTON_MASK_MIDDLE:
				show_modified_only()
	)
	
func show_modified_only():
	var property_filter_bar: HBoxContainer = get_inspector_property_filter_bar()
	var property_filter_button = property_filter_bar.get_children()[-2]
	var popup_menu: PopupMenu = property_filter_button.get_popup()
	popup_menu.id_pressed.emit(popup_menu.get_item_id(1))
	popup_menu.id_pressed.emit(popup_menu.get_item_id(2))

func on_inspector_edited_object_changed():
	# auto show AnimationNodeStateMachineTransition property
	if inspector.get_edited_object() is AnimationNodeStateMachineTransition:
		var sections: Array[Node] = inspector.find_children("*", "EditorInspectorSection", true, false)
		if sections.size() > 0:
			sections[0].unfold()
		if sections.size() > 1:
			sections[1].unfold()
	
	# Expand Modified only Button disable or not
	var property_filter_bar: HBoxContainer = get_inspector_property_filter_bar()
	var property_filter_button = property_filter_bar.get_children()[-2]
	var expand_modified_only_button := property_filter_bar.get_children().back() as Button
	await Engine.get_main_loop().create_timer(0.001).timeout
	expand_modified_only_button.disabled = property_filter_button.disabled

func get_inspector_property_filter_bar() -> HBoxContainer:
	for control in inspector.get_parent().get_children() as Array[Control]:
		if control.get_child_count() > 1 && control.get_child(1) is MenuButton && control.get_child(1).icon == base_control.get_theme_icon("Tools", "EditorIcons"):
			return control
	return null
