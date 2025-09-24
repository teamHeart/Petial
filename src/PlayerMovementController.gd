class_name PlayerMovementController
extends CharacterBody2D


var speed := 0.
var _sprite: AnimatedSprite2D
var _collider: CollisionShape2D

func _ready() -> void:
	_collider = get_child(0) as CollisionShape2D
	_sprite = get_child(1) as AnimatedSprite2D

func _physics_process(_delta: float) -> void:
	#velocity = Vector2i.ZERO
	move_and_slide()
	var vel := Vector2.ZERO
	if Input.is_action_pressed("ui_up"):
		vel.y -= 1
	if Input.is_action_pressed("ui_down"):
		vel.y += 1
	if Input.is_action_pressed("ui_left"):
		vel.x -= 1;
	if Input.is_action_pressed("ui_right"):
		vel.x += 1
	velocity = speed * vel.normalized()
	if _collider != null:
		var collision = get_last_slide_collision()
		if collision != null:
				if collision.get_collider() is PartyFollower:
					velocity /= 1.
					
	if _sprite != null:
		if velocity.length() > 25.:
			var angle = velocity.angle()
			if angle > -PI/4. and angle <= PI/4.:
				_sprite.animation = "WalkRight"
			elif angle > PI/4. and angle <= 3*PI/4.:
				_sprite.animation = "WalkDown"
			elif angle > -3*PI/4. and angle <= -PI/4.:
				_sprite.animation = "WalkUp"
			else:
				_sprite.animation = "WalkLeft"	
		else:
			_sprite.frame = 0
			_sprite.frame_progress = .999
		_sprite.play()

	
#
#const SPEED = 300.0
#const JUMP_VELOCITY = -400.0
#
#
#func _physics_process(delta: float) -> void:
#	# Add the gravity.
#	if not is_on_floor():
#		velocity += get_gravity() * delta
#
#	# Handle jump.
#	if Input.is_action_just_pressed("ui_accept") and is_on_floor():
#		velocity.y = JUMP_VELOCITY
#
#	# Get the input direction and handle the movement/deceleration.
#	# As good practice, you should replace UI actions with custom gameplay actions.
#	var direction := Input.get_axis("ui_left", "ui_right")
#	if direction:
#		velocity.x = direction * SPEED
#	else:
#		velocity.x = move_toward(velocity.x, 0, SPEED)
#
#	move_and_slide()
#
