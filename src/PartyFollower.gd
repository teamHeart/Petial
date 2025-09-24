class_name PartyFollower
extends CharacterBody2D

var socialDistancing := 50.
var _leader: CharacterBody2D
var _follow: PartyFollower
var speed:= 0.0
var springyness:= 1.0
var repulsionForce:= 250.
@export var NavAgent: NavigationAgent2D
var _sprite: AnimatedSprite2D
var _collider: CollisionShape2D

func _ready():
	_sprite = $AnimatedSprite2D
	_collider = $CollisionShape2D

func _physics_process(_delta: float) -> void:

	### Follow The Leader

	var vel: float = pow(max(self.position.distance_to(_leader.position)-(socialDistancing*.875),0),springyness)
	var dir:= Vector2.from_angle(self.position.angle_to_point(_leader.position))
	vel = 0. if(self.position.distance_to(_leader.position) <= socialDistancing) else vel
	velocity = clamp(vel, 0., speed*1.5) * dir

	### ew cooties

	vel = (repulsionForce)/(pow(self.position.distance_to(_follow.position)/50.,2.))
	dir = -1. * Vector2.from_angle(self.position.angle_to_point(_follow.position))
	velocity += vel * dir

	vel = (repulsionForce)/(pow(self.position.distance_to(_leader.position)/50.,2.))
	dir = -1. * Vector2.from_angle(self.position.angle_to_point(_leader.position))
	velocity += vel * dir

	if velocity.length() < 100.:
		velocity = Vector2.ZERO				

	# if self.position.distance_to(_leader.position) > 50.:
	# 	NavAgent.target_position = _leader.position
	# 	vel = speed
	# 	dir = Vector2.from_angle(self.position.angle_to_point(NavAgent.path()))
	# 	velocity = vel * dir

		
	if  _sprite != null:
		if velocity.length() > 0.:
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
	move_and_slide()