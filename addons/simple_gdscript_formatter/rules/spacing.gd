const SYMBOLS = [
	r"\*\*=",
	r"\*\*",
	"<<=",
	">>=",
	"<<",
	">>",
	"==",
	"!=",
	">=",
	"<=",
	"&&",
	r"\|\|",
	r"\+=",
	"-=",
	r"\*=",
	"/=",
	"%=",
	"&=",
	r"\^=",
	r"\|=",
	"~=",
	":=",
	"->",
	r"&",
	r"\|",
	r"\^",
	"-",
	r"\+",
	"/",
	r"\*",
	">",
	"<",
	"-",
	"=",
	":",
	",",
];
const KEYWORDS = [
	"and",
	"is",
	"or",
	"not",
]


static func apply(code: String) -> String:
	var indent_regex = RegEx.create_from_string(r"(\n\t*) {4}")
	var new_code = indent_regex.sub(code, "$1\t", true)
	while(code != new_code):
		code = new_code
		new_code = indent_regex.sub(code, "$1\t", true)

	# strip inline tabs
	code = RegEx.create_from_string(r"(\S ?)\t+").sub(code, "$1 ", true)

	# strip left space
	code = RegEx.create_from_string(r"(\n\t*) *").sub(code, "$1", true)

	var symbols_regex = "(" + ")|(".join(SYMBOLS) + ")"
	var symbols_operator_regex = RegEx.create_from_string(" *?(" + symbols_regex + ") *")
	code = symbols_operator_regex.sub(code, " $1 ", true)

	# %
	code = RegEx.create_from_string(r" *?%([^a-zA-Z=])").sub(code, " % $1", true)

	# "\t* " => "\t*"
	code = RegEx.create_from_string(r"(\n\t*) *").sub(code, "$1", true)

	# ": =" => ":="
	code = RegEx.create_from_string(r": *=").sub(code, ":=", true)

	# "a (" => "a("
	code = RegEx.create_from_string(r"(?<=[\w\)\]]) *([\(:,])(?!=)").sub(code, "$1", true)

	# "if(" => "if ("
	code = RegEx.create_from_string(r"(\s)(if|elif)\(").sub(code, r"$1$2 (", true)

	# "a )" => "a)"
	code = RegEx.create_from_string(r" *([\)\}\]])").sub(code, "$1", true)

	var keywoisrd_regex = r"|".join(KEYWORDS)
	var keyword_operator_regex = RegEx.create_from_string(r"(?<=[ \)\]\t])(" + keywoisrd_regex + r")(?=[ \(\[])")
	code = keyword_operator_regex.sub(code, " $1 ", true)

	# strip left space
	code = RegEx.create_from_string(r"(\n\t*) *").sub(code, "$1", true)

	# "    " => " "
	code = RegEx.create_from_string(" +").sub(code, " ", true)

	# "= - a" => "= -a"
	code = RegEx.create_from_string(r"((" + symbols_regex + ") ?)- ").sub(code, "$1-", true)

	# "( a" => "(a"
	code = RegEx.create_from_string(r"([{\(\[]) *(" + symbols_regex + ")? *").sub(code, "$1$2", true)

	# inline {} spacing
	code = RegEx.create_from_string(r"{ ?(.*)? ?}").sub(code, "{ $1 }", true)

	# trim empty {}
	code = RegEx.create_from_string(r"{ +}").sub(code, "{}", true)

	# trim end
	code = RegEx.create_from_string("[ \t]*\n").sub(code, "\n", true)

	# fix indent
	code = _handle_indent(code, "[", "]")
	code = _handle_indent(code, "{", "}")
	code = _handle_indent(code, "(", ")")

	code = _trim_indent(code)

	# apply again
	code = _handle_indent(code, "[", "]")
	code = _handle_indent(code, "{", "}")
	code = _handle_indent(code, "(", ")")

	code = _align_comment(code)

	# trim end one more time
	code = RegEx.create_from_string("[ \t]*\n").sub(code, "\n", true)

	return code


static func _handle_indent(code: String, left: String, right: String) -> String:
	var i = 1
	var parts := find_outer_parentheses(code, i, left, right)
	var lambada_part = RegEx.create_from_string(r"\(func\(")
	while parts.size() > 0:
		for part in parts:
			var escaped := regex_escape(part)
			var reg := RegEx.create_from_string("(?<=^|\n)(.*?" + escaped + ")")
			var found := reg.search(code)
			if found:
				var block := found.get_string()
				var lines := block.split("\n")
				if lines.size() > 1:
					var base_indent := get_indent_level(lines[0])
					var indent_level = 1
					if lambada_part.search(lines[0]):
						indent_level = 2
					var formatted := format_block(lines, base_indent, indent_level, right)
					code = reg.sub(code, formatted)
		i += 1
		parts = find_outer_parentheses(code, i, left, right)
	return code


static func format_block(lines: Array[String], base_indent: int, indent_level: int, right: String) -> String:
	var result := []
	indent_level += base_indent
	var block_indent_stack := []
	var match_indent_stack = []
	var if_indent_stack = []

	for i in lines.size():
		var line_indent = get_indent_level(lines[i])
		var line := lines[i].lstrip("\t")
		var is_comment_line := RegEx.create_from_string("^__COMMENT__").search(line)
		if not is_comment_line:
			while block_indent_stack.size() > 0 and line_indent <= block_indent_stack[-1]:
				block_indent_stack.pop_back()

			while match_indent_stack.size() > 0 and line_indent <= match_indent_stack[-1]:
				match_indent_stack.pop_back()

			while if_indent_stack.size() > 0 and line_indent <= if_indent_stack[-1] and not line.begins_with("):"):
				if_indent_stack.pop_back()

		if i == 0 or is_comment_line:
			result.append(lines[i])
		elif i == lines.size() - 1 and line.begins_with(right):
			result.append("\t".repeat(base_indent) + line)
		else:
			result.append("\t".repeat(indent_level + block_indent_stack.size() + if_indent_stack.size() + match_indent_stack.size()) + line)
		if RegEx.create_from_string(r"^(if|elif) \(").search(line):
			if_indent_stack.push_back(line_indent)
		if RegEx.create_from_string(r"^(if (?!\()|elif (?!\()|else|for|while)").search(line):
			block_indent_stack.push_back(line_indent)
		if match_indent_stack.size() > 0 and RegEx.create_from_string(":$").search(line):
			block_indent_stack.push_back(line_indent)
		if RegEx.create_from_string("^match").search(line):
			match_indent_stack.push_back(line_indent)

	return "\n".join(result)


static func get_indent_level(line: String) -> int:
	return line.length() - line.lstrip("\t").length()


static func regex_escape(text: String) -> String:
	var specials = "\\.+*?[^]$(){}=!<>|:-#\r\n\t\f"
	var result := []
	for c in text:
		if specials.find(c) != -1:
			result.append("\\")
		result.append(c)
	return "".join(result)


static func find_outer_parentheses(text: String, target_level: int, left: String, right: String) -> Array:
	var result := []
	var depth := 0
	var start := -1

	for i in range(text.length()):
		var c := text[i]
		if c == left:
			depth += 1
			if depth == target_level:
				start = i
		elif c == right:
			if depth == target_level and start != -1:
				result.append(text.substr(start, i - start + 1))
			depth -= 1
	return result


static func _trim_indent(code: String) -> String:
	var result := []
	var lines := code.split("\n")

	var block_indent_stack := []
	var last_indent := 0
	for i in lines.size():
		var line_indent = get_indent_level(lines[i])
		var line := lines[i].lstrip("\t")
		var is_comment_line := RegEx.create_from_string(r"^__COMMENT__").search(line)
		if not is_comment_line and not line.is_empty():
			while block_indent_stack.size() > 0 and line_indent <= block_indent_stack[-1]:
				block_indent_stack.pop_back()
		if is_comment_line:
			result.push_back(lines[i])
			continue
		elif line_indent > last_indent:
			block_indent_stack.push_back(last_indent)
		result.push_back("\t".repeat(block_indent_stack.size()) + line)
		if not is_comment_line and not line.is_empty():
			last_indent = line_indent
	return "\n".join(result)


static func _align_comment(code: String) -> String:
	var result := []
	var lines := code.split("\n")
	for i in range(lines.size() - 1, -1, -1):
		var line_indent = get_indent_level(lines[i])
		var line := lines[i].lstrip("\t")

		if (
				i == lines.size() - 1
				or RegEx.create_from_string(r"^__COMMENT__CODE").search(line)
		):
			result.push_front(lines[i])
		elif RegEx.create_from_string(r"^__COMMENT__").search(line):
			result.push_front("\t".repeat(get_indent_level(result[0])) + line)
		else:
			result.push_front(lines[i])

	return "\n".join(result)
