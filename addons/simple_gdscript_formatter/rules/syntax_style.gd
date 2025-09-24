static func apply(code: String) -> String:
	# and or first
	code = RegEx.create_from_string(r" (and|or)\n(\s*)").sub(code, "\n$2$1 ", true)

	# avoid-unnecessary-parentheses
	code = RegEx.create_from_string(r"(if|while) \((.*)\):\n").sub(code, "$1 $2:\n", true)

	# if (a => if (\na
	code = RegEx.create_from_string(r"(\s)(if|while) \((.+)").sub(code, "$1$2 (\n$3", true)

	# enums with each item on its own line.
	var enum_regex = RegEx.create_from_string(r"(^|\n|\s)enum (.|\n)*?{(.|\n)*?}")
	var founds := enum_regex.search_all(code)
	for found in founds:
		var enum_string := found.get_string()
		var items := enum_string.split(",")
		var new_string: String
		if items.size() == 1:
			new_string = items[0]
			new_string = new_string[0] + new_string.substr(1).replace("\n", "")
			new_string = RegEx.create_from_string(r" ?{").sub(new_string, " {")
		elif items.size() > 1:
			for item in items:
				var prefix = ""
				var suffix = ""
				if not item.ends_with("}"):
					suffix += ","
				if not item.begins_with("\n"):
					prefix += "\n"
				new_string += prefix + item + suffix
			new_string = RegEx.create_from_string(r"(\n )*{\n*").sub(new_string, " {\n")
			new_string = RegEx.create_from_string(r"\s*}").sub(new_string, "\n}")
			new_string = RegEx.create_from_string(r"(\w),?(\n+})").sub(new_string, "$1,$2")
		code = _replace(code, enum_string, new_string)
	return code


static func _replace(text: String, what: String, forwhat: String) -> String:
	var index := text.find(what)
	if index != -1:
		text = text.substr(0, index) + forwhat + text.substr(index + what.length())
	return text
