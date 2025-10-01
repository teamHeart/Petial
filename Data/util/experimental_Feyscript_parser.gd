# A small Feyscript -> AST parser in GDScript
# Usage:
#   var p = FeyscriptParser.new()
#   var ast = p.parse("apply poison to target chance 25 duration 3")
#   printd(ast)
#
# This parser is intentionally small and forgiving: it tokenizes by whitespace
# (with quoted-string support), recognizes common keywords (to, as, chance,
# duration, repeat, from, if/then/else, { }), and returns a Dictionary-based AST.

extends Reference
class_name FeyscriptParser

# Public entry
func parse(text: String) -> Dictionary:
	var tokens = _tokenize(text)
	var i = 0
	var nodes : Array = []
	while i < tokens.size():
		var node
		var ni
		node, ni = _parse_node(tokens, i)
		if node != null:
			nodes.append(node)
		i = ni
	# return single node if only one, otherwise a sequence
	if nodes.size() == 0:
		return {"node_type":"Empty"}
	if nodes.size() == 1:
		return nodes[0]
	return {"node_type":"Sequence", "children": nodes}

# ----- Tokenizer -----
func _tokenize(text: String) -> Array:
	var toks : Array = []
	var i = 0
	var n = text.length()
	while i < n:
		var c = text[i]
		if c.is_space():
			i += 1
			continue
		# quoted string support
		if c == '"' or c == "'":
			var q = c
			var j = i + 1
			var s = ""
			while j < n and text[j] != q:
				s += text[j]
				j += 1
			toks.append(s)
			i = j + 1
			continue
		# braces as tokens
		if c == "{" or c == "}":
			toks.append(c)
			i += 1
			continue
		# punctuation that can attach to numbers (like %)
		if c == "%":
			toks.append("%")
			i += 1
			continue
		# normal token: read until whitespace or brace or quote
		var j = i
		var s2 = ""
		while j < n:
			var cj = text[j]
			if cj.is_space() or cj == "{" or cj == "}" or cj == '"' or cj == "'" :
				break
			s2 += cj
			j += 1
		# strip trailing commas or backslashes used for line continuation
		s2 = s2.strip_edges(",\\")
		if s2 != "":
			# makeoperators consistent: keep as-is but lowercase for keywords
			toks.append(s2.to_lower())
		i = j
	return toks

# ----- Node parsing -----
func _parse_node(tokens: Array, i: int) -> Array:
	if i >= tokens.size():
		return [null, i + 1]
	var t = tokens[i]
	if t == "if":
		return _parse_if(tokens, i)
	# otherwise statement or bare token sequence
	return _parse_statement(tokens, i)

func _parse_if(tokens: Array, i: int) -> Array:
	# if <condition> then <stmt_or_block> [else <stmt_or_block>] [done]
	i += 1
	var cond_tokens = []
	while i < tokens.size() and tokens[i] != "then" and tokens[i] != "{":
		# allow condition like "target is frozen" or "user.hp < 50"
		cond_tokens.append(tokens[i])
		i += 1
	var condition = _parse_condition(cond_tokens)
	# parse then
	var then_nodes : Array = []
	if i < tokens.size() and tokens[i] == "{":
		var block, ni = _parse_block(tokens, i)
		then_nodes = block
		i = ni
	else:
		# expect 'then' then a single statement or a following token
		if i < tokens.size() and tokens[i] == "then":
			i += 1
		var node, ni = _parse_node(tokens, i)
		if node:
			then_nodes.append(node)
		i = ni
	# optional else
	var else_nodes : Array = []
	if i < tokens.size() and tokens[i] == "else":
		i += 1
		if i < tokens.size() and tokens[i] == "{":
			var block2, ni2 = _parse_block(tokens, i)
			else_nodes = block2
			i = ni2
		else:
			var node2, ni2 = _parse_node(tokens, i)
			if node2:
				else_nodes.append(node2)
			i = ni2
	# consume optional 'done'
	if i < tokens.size() and tokens[i] == "done":
		i += 1
	return [{
		"node_type": "If",
		"condition": condition,
		"then": then_nodes,
		"else": else_nodes
	}, i]

func _parse_block(tokens: Array, i: int) -> Array:
	# assumes tokens[i] == "{"
	i += 1
	var children = []
	while i < tokens.size() and tokens[i] != "}":
		var node, ni = _parse_node(tokens, i)
		if node:
			children.append(node)
		i = ni
	# consume "}"
	if i < tokens.size() and tokens[i] == "}":
		i += 1
	return [children, i]

func _parse_statement(tokens: Array, i: int) -> Array:
	var start = i
	var verb = tokens[i]
	i += 1
	var args = {}
	var modifiers = {}
	var children = []
	# gather tokens until we hit a structural keyword terminating the statement
	while i < tokens.size():
		var tk = tokens[i]
		# structural break tokens
		if tk in ["then","else","done","{","}"]:
			break
		# Recognize keywords and collect values
		if _is_number_token(tk):
			# amount or numeric arg; prefer amount if verb indicates damage/heal
			var num = _to_number(tk)
			if not args.has("amount"):
				args["amount"] = num
			else:
				# ambiguous numeric value; store in last_numeric
				args["value_" + str(args.size())] = num
			i += 1
			continue
		if tk == "to":
			i += 1
			if i < tokens.size():
				args["target"] = tokens[i]
				i += 1
			continue
		if tk == "as":
			i += 1
			if i < tokens.size():
				args["element"] = tokens[i]
				i += 1
			continue
		if tk == "from":
			i += 1
			if i < tokens.size():
				args["source"] = tokens[i]
				i += 1
			continue
		if tk == "chance":
			i += 1
			if i < tokens.size():
				modifiers["chance"] = _to_number(tokens[i])
				i += 1
			continue
		if tk == "duration":
			i += 1
			if i < tokens.size():
				modifiers["duration"] = _to_number(tokens[i])
				i += 1
			continue
		if tk == "repeat":
			i += 1
			if i < tokens.size():
				modifiers["repeat"] = _to_number(tokens[i])
				i += 1
			continue
		# common natural-language patterns: "<verb> <effect> to target" for apply/remove
		# if effect/opposite not set yet, assume next token is an effect or arg
		if not args.has("effect") and verb in ["apply","remove","grant","consume","set","add"]:
			args["effect"] = tk
			i += 1
			continue
		# if token looks like a known target word
		if tk in ["user","self","target","ally","all_allies","enemy","all_enemies","area","everyone","first_target","target_1"]:
			args["target"] = tk
			i += 1
			continue
		# fallback: capture keyed tokens like "status(name)" or "user.hp"
		if tk.find("(") != -1 and tk.ends_with(")"):
			# keep as-is but store
			if not args.has("value"):
				args["value"] = tk
			else:
				args["extra"] = tk
			i += 1
			continue
		# percent token e.g., "25%" -> parse numeric portion
		if tk.ends_with("%") and _is_number_token(tk.substr(0, tk.length()-1)):
			modifiers["chance"] = _to_number(tk.substr(0, tk.length()-1))
			i += 1
			continue
		# unknown token: store in leftover list
		if not args.has("leftover"):
			args["leftover"] = [tk]
		else:
			args["leftover"].append(tk)
		i += 1
	# build statement node
	var node = {
		"node_type": "Statement",
		"verb": verb,
		"args": args,
		"modifiers": modifiers,
		"children": children
	}
	return [node, i]

# ----- Condition parsing (very small) -----
func _parse_condition(cond_tokens: Array) -> Dictionary:
	# handle patterns:
	#  - <var> is <status>
	#  - <var> <op> <value>   where op in < <= == != >= >
	if cond_tokens.size() == 0:
		return {"node_type":"Expression", "op":"true"}
	# try find comparison operator
	for op in ["<=", ">=", "==", "!=", "<", ">"]:
		for idx in range(cond_tokens.size()):
			if cond_tokens[idx] == op:
				var left = cond_tokens.slice(0, idx)
				var right = cond_tokens.slice(idx+1, cond_tokens.size())
				return {
					"node_type": "Expression",
					"op": op,
					"left": left.join(" "),
					"right": right.join(" ")
				}
	# 'is' style
	for idx in range(cond_tokens.size()):
		if cond_tokens[idx] == "is":
			var left2 = cond_tokens.slice(0, idx).join(" ")
			var right2 = cond_tokens.slice(idx+1, cond_tokens.size()).join(" ")
			return {
				"node_type": "Expression",
				"op": "is",
				"left": left2,
				"right": right2
			}
	# fallback: return raw joined expression
	return {"node_type":"Expression", "op":"raw", "raw": cond_tokens.join(" ")}

# ----- Helpers -----
func _is_number_token(tok: String) -> bool:
	# allow integers, floats, and percent-attached like "25%"
	if tok == null:
		return false
	var s = tok.strip_edges()
	if s.ends_with("%"):
		s = s.substr(0, s.length()-1)
	return s.is_valid_float()

func _to_number(tok: String) -> Variant:
	if tok == null:
		return null
	var s = tok.strip_edges()
	var negative = false
	if s.begins_with("-"):
		negative = true
		s = s.substr(1, s.length()-1)
	if s.ends_with("%"):
		s = s.substr(0, s.length()-1)
	if s.find(".") != -1:
		var fv = float(s)
		return -fv if negative else fv
	return int(s) * (-1 if negative else 1)

# ----- Quick examples for interactive testing (call from another script) -----
static func example_inputs() -> Array:
	return [
		"damage 50 to target",
		"apply poison to target chance 25 duration 3",
		"if target is frozen then remove frozen from target else apply burning to target chance 25 duration 3 done",
		"if user.hp < 50 { heal 40 to user }"
	]