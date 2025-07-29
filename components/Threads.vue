<!-- src/components/Threads.vue -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Renderer, Program, Mesh, Triangle, Color } from 'ogl';

// Define props
const props = defineProps({
  color: {
    type: Array,
    default: () => [1, 1, 1], // Default white color
  },
  amplitude: {
    type: Number,
    default: 1,
  },
  distance: {
    type: Number,
    default: 0,
  },
  enableMouseInteraction: {
    type: Boolean,
    default: false,
  },
});

// Shader code (same as provided)
const vertexShader = `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
  `;

const fragmentShader = `
  precision highp float;
  uniform float iTime;
  uniform vec3 iResolution;
  uniform vec3 uColor;
  uniform float uAmplitude;
  uniform float uDistance;
  uniform vec2 uMouse;

  #define PI 3.1415926538

  const int u_line_count = 40;
  const float u_line_width = 7.0;
  const float u_line_blur = 10.0;

  float pixel(float count, vec2 resolution) {
      return 1.0 / max(resolution.x, resolution.y) * count;
  }

  float Perlin2D(vec2 P)
  {
      vec2 Pi = floor(P);
      vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);
      vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);
      Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;
      Pt += vec2(26.0, 161.0).xyxy;
      Pt *= Pt;
      Pt = Pt.xzxz * Pt.yyww;
      vec4 hash_x = fract(Pt * (1.0 / 951.135664));
      vec4 hash_y = fract(Pt * (1.0 / 642.949883));
      vec4 grad_x = hash_x - 0.49999;
      vec4 grad_y = hash_y - 0.49999;
      vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y) * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);
      grad_results *= 1.4142135623730950488016887242097;
      vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);
      vec4 blend2 = vec4(blend, vec2(1.0 - blend));
      return dot(grad_results, blend2.zxzx * blend2.wwyy);
  }

  float line(vec2 st, float width, float perc, float offset) {
      float split_offset = (perc * 0.4);
      float split_point = 0.1 + split_offset;

      float amplitude_normal = smoothstep(split_point, 0.7, st.x);
      float amplitude_strength = 0.5;
      float amplitude = amplitude_normal * amplitude_strength * uAmplitude * (1.0 + (uMouse.y - 0.5) * 0.2);

      float time_scaled = iTime / 10.0 + (uMouse.x - 0.5) * 1.0;

      float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;

      float xnoise = mix(
          Perlin2D(vec2(time_scaled, st.x + perc) * 2.5),
          Perlin2D(vec2(time_scaled, st.x + time_scaled) * 3.5) / 1.5,
          st.x * 0.3
      );

      float y = 0.5 + (perc - 0.5) * uDistance + xnoise / 2.0 * amplitude;

      float line_start = smoothstep(
          y + (width / 2.0) + (u_line_blur * pixel(1.0, iResolution.xy) * blur),
          y,
          st.y
      );

      float line_end = smoothstep(
          y,
          y - (width / 2.0) - (u_line_blur * pixel(1.0, iResolution.xy) * blur),
          st.y
      );

      return clamp(
          (line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),
          0.0,
          1.0
      );
  }

  void mainImage( out vec4 fragColor, in vec2 fragCoord )
  {
      vec2 uv = fragCoord / iResolution.xy;

      float line_strength = 1.0;

      for (int i = 0; i < u_line_count; i++) {
          line_strength *= (1.0 - line(
              uv,
              u_line_width * pixel(1.0, iResolution.xy) * (1.0 - float(i) / float(u_line_count)),
              float(i) / float(u_line_count),
              (PI * 1.0) * float(i) / float(u_line_count)
          ));
      }

      float color = 1.0 - line_strength;
      fragColor = vec4(uColor * color, color);
  }

  void main() {
      mainImage(gl_FragColor, gl_FragCoord.xy);
  }
  `;

// Refs
const containerRef = ref(null);
const canvasRef = ref(null);
let renderer, gl, mesh, program;
let animationFrameId = null;

// Mouse handling
let currentMouse = [0.5, 0.5];
let targetMouse = [0.5, 0.5];

// Client-side initialization
onMounted(async () => {
  await nextTick(); // Ensure DOM is fully rendered
  const container = containerRef.value;
  const canvas = canvasRef.value;

  if (!container || !canvas) {
    console.error('Container or canvas ref is null!', { container, canvas });
    return;
  }

  try {
    // Initialize Renderer with explicit canvas
    renderer = new Renderer({
      canvas: canvas,
      dpr: Math.min(window.devicePixelRatio, 2), // Cap DPR for performance
      alpha: true,
    });
    gl = renderer.gl;

    if (!gl) {
      console.error('WebGL context could not be initialized!');
      return;
    }

    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Setup geometry and program
    const geometry = new Triangle(gl);
    program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new Color(
            gl.canvas.width,
            gl.canvas.height,
            gl.canvas.width / gl.canvas.height
          ),
        },
        uColor: { value: new Color(...props.color) },
        uAmplitude: { value: props.amplitude },
        uDistance: { value: props.distance },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
      },
    });
    mesh = new Mesh(gl, { geometry, program });

    // Resize handler
    const resize = () => {
      const { clientWidth, clientHeight } = container;
      renderer.setSize(clientWidth, clientHeight);
      program.uniforms.iResolution.value = new Color(
        clientWidth,
        clientHeight,
        clientWidth / clientHeight
      );
    };
    window.addEventListener('resize', resize);
    resize();

    // Mouse handlers
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      targetMouse = [x, y];
    };
    const handleMouseLeave = () => {
      targetMouse = [0.5, 0.5];
    };

    if (props.enableMouseInteraction) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    // Animation loop
    const update = (t) => {
      if (props.enableMouseInteraction) {
        const smoothing = 0.05;
        currentMouse[0] += smoothing * (targetMouse[0] - currentMouse[0]);
        currentMouse[1] += smoothing * (targetMouse[1] - currentMouse[1]);
        program.uniforms.uMouse.value[0] = currentMouse[0];
        program.uniforms.uMouse.value[1] = currentMouse[1];
      } else {
        program.uniforms.uMouse.value[0] = 0.5;
        program.uniforms.uMouse.value[1] = 0.5;
      }
      program.uniforms.iTime.value = t * 0.001;
      renderer.render({ scene: mesh });
      animationFrameId = requestAnimationFrame(update);
    };
    animationFrameId = requestAnimationFrame(update);
  } catch (error) {
    console.error('Error initializing OGL Renderer:', error);
  }
});

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  const container = containerRef.value;
  if (container && gl?.canvas && container.contains(gl.canvas)) {
    container.removeChild(gl.canvas);
  }
  window.removeEventListener('resize', () => {});
  if (props.enableMouseInteraction) {
    container?.removeEventListener('mousemove', () => {});
    container?.removeEventListener('mouseleave', () => {});
  }
  gl?.getExtension('WEBGL_lose_context')?.loseContext();
});
</script>

<template>
  <div
    ref="containerRef"
    style="width: 100%; height: 800px; position: relative"
  ></div>
</template>
