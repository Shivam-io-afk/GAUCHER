const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("webgl-canvas"),
  alpha: true,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Load font
const loader = new THREE.FontLoader();
loader.load(
  "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
  function (font) {
    const geometry = new THREE.TextGeometry("GAUCHER", {
      font: font,
      size: 1,
      height: 0.2,
      curveSegments: 12,
    });

    geometry.center(); // Center the text

    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0.0 },
      },
      vertexShader: `
        varying vec2 vUv;
        uniform float u_time;
        void main() {
          vUv = uv;
          vec3 pos = position;
          pos.x += sin(pos.y * 10.0 + u_time * 5.0) * 0.05;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float u_time;
        void main() {
          vec2 uv = vUv;
          float r = sin(u_time + uv.x * 10.0) * 0.5 + 0.5;
          float g = sin(u_time + uv.y * 10.0 + 1.0) * 0.5 + 0.5;
          float b = sin(u_time + uv.x * 5.0 + uv.y * 5.0) * 0.5 + 0.5;
          gl_FragColor = vec4(r, g, b, 1.0);
        }
      `,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      material.uniforms.u_time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    }

    animate();
  }
);
