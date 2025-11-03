shader_type canvas_item;

uniform sampler2D noise_1;
uniform sampler2D noise_2;
uniform sampler2D screen_texture : hint_screen_texture;
uniform float time_scale : hint_range(0.1, 10.0) = 1.0;
uniform float distortion_strength : hint_range(0.0, 0.05) = 0.0125;

void fragment() {
	float wrap_time = TIME/32.0 * time_scale;
	vec2 uv_noise_1 = texture(noise_1, vec2(UV.x, mod(UV.y+wrap_time,1.0))).xy;
	vec2 uv_noise_2 = texture(noise_2, vec2(mod(UV.x+wrap_time * 2.0, 1.0), UV.y)).xy;
	vec2 distort_uv_x = UV + vec2((uv_noise_1.x - 0.5) * distortion_strength, 0.0);
	vec2 distort_uv_y = UV + vec2(0.0, (uv_noise_2.y - 0.5) * distortion_strength);
	vec2 distort_uv = vec2(distort_uv_x.x, distort_uv_y.y);

	//COLOR = vec4(distort_uv.xy,0.0,1.0);
	COLOR = texture(screen_texture, distort_uv);
}