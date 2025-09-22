class_name Database
extends Node

static var instance: Database

var _Accessories: Dictionary = {}
var _Armors: Dictionary = {}
var _Characters: Dictionary = {}
var _Classes: Dictionary = {}
var _Enemies: Dictionary = {}
var _Items: Dictionary = {}
var _Skills: Dictionary = {}
var _States: Dictionary = {}
var _Weapons: Dictionary = {}

func _init():
    instance = self
    var currentDir: String
    var dir = DirAccess.open("res://Data/")
    if dir:
        dir.list_dir_begin()        
        var file_name = dir.get_next()
        while file_name != "":
            if file_name.ends_with(".tres"):
                var resource = ResourceLoader.load("res://Data/" + file_name)
                if resource:
                    var key = file_name.get_basename()
                    self.set(key, resource)
            else:
                if dir.current_is_dir() and file_name != "." and file_name != "..":
                    currentDir = "res://Data/" + file_name + "/"
                    var subDir = DirAccess.open(currentDir)
                    if subDir:
                        subDir.list_dir_begin()
                        var sub_file_name = subDir.get_next()
                        while sub_file_name != "":
                            if sub_file_name.ends_with(".tres"):
                                var sub_resource = ResourceLoader.load(currentDir + sub_file_name)
                                if sub_resource:
                                    var sub_key = sub_file_name.get_basename()
                                    var subDataBase:Dictionary
                                    match file_name:
                                        "Accessories":
                                            subDataBase = _Accessories
                                        "Armors":
                                            subDataBase = _Armors
                                        "Characters":
                                            subDataBase = _Characters
                                        "Classes":
                                            subDataBase = _Classes
                                        "Enemies":
                                            subDataBase = _Enemies
                                        "Items":
                                            subDataBase = _Items
                                        "Skills":
                                            subDataBase = _Skills
                                        "States":
                                            subDataBase = _States
                                        "Weapons":
                                            subDataBase = _Weapons
                                        _:
                                            pass
                                    if subDataBase != null:
                                        subDataBase[sub_key] = sub_resource
                            sub_file_name = subDir.get_next()
                        subDir.list_dir_end()
            file_name = dir.get_next()
        dir.list_dir_end()
