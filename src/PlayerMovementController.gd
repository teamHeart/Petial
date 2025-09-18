class_name PlayerMovementController
extends CharacterBody2D

func _physics_process(delta: float) -> void:
	#velocity = Vector2i.ZERO

	var speed := 300 if Input.is_action_pressed("Sprint") else 200

	var vel := Vector2.ZERO
	if Input.is_action_pressed("ui_up") || Input.is_action_just_released("ui_down"):
		vel.y -= 1
	if Input.is_action_pressed("ui_down") || Input.is_action_just_released("ui_up"):
		vel.y += 1
	if Input.is_action_pressed("ui_left")|| Input.is_action_just_released("ui_right"):
		vel.x -= 1;
	if Input.is_action_pressed("ui_right") || Input.is_action_just_released("ui_left"):
		vel.x += 1
	delta = delta
	velocity = speed * vel.normalized()

	var dir := vel.normalized()
	if dir:
		match dir:
			_ when dir.x > dir.y && dir.x > -dir.y:
				$AnimatedSprite2D.play("WalkRight")
				
			_:
				pass
	else:
		$AnimatedSprite2D.pause()
		$AnimatedSprite2D.set_frame_and_progress(3, 1.)

	move_and_slide()
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
