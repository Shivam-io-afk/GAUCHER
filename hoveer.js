window.onload = function () {
  document.querySelectorAll('#folll').forEach(container => {
    const imageElement = container.querySelector('#mainimg_1');
    if (!imageElement) return;

    let easeFactor = 0.02;
    let scene, camera, renderer, planeMesh;
    let mousePosition = { x: 0.5, y: 0.5 };
    let targetMousePosition = { x: 0.5, y: 0.5 };
    let aberrationIntensity = 0.0;
    let prevPosition = { x: 0.5, y: 0.5 };

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec2 vUv;
      uniform sampler2D u_texture;
      uniform vec2 u_mouse;
      uniform vec2 u_prevMouse;
      uniform float u_aberrationIntensity;

      void main() {
        vec2 gridUV = floor(vUv * vec2(20.0, 20.0)) / vec2(20.0, 20.0);
        vec2 centerOfPixel = gridUV + vec2(1.0/20.0, 1.0/20.0);

        vec2 mouseDirection = u_mouse - u_prevMouse;
        vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
        float pixelDistanceToMouse = length(pixelToMouseDirection);
        float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);

        vec2 uvOffset = strength * -mouseDirection * 0.2;
        vec2 uv = vUv - uvOffset;

        vec4 colorR = texture2D(u_texture, uv + vec2(strength * u_aberrationIntensity * 0.01, 0.0));
        vec4 colorG = texture2D(u_texture, uv);
        vec4 colorB = texture2D(u_texture, uv - vec2(strength * u_aberrationIntensity * 0.01, 0.0));

        gl_FragColor = vec4(colorR.r, colorG.g, colorB.b, 1.0);
      }
    `;

    function initializeScene(texture) {
      scene = new THREE.Scene();

      const containerWidth = imageElement.offsetWidth;
      const containerHeight = imageElement.offsetHeight;
      const containerAspect = containerWidth / containerHeight;
      const imageAspect = texture.image.width / texture.image.height;

      camera = new THREE.PerspectiveCamera(80, containerAspect, 0.01, 10);
      camera.position.z = 1;

      const shaderUniforms = {
        u_mouse: { value: new THREE.Vector2() },
        u_prevMouse: { value: new THREE.Vector2() },
        u_aberrationIntensity: { value: 0.0 },
        u_texture: { value: texture }
      };

      // Adjust plane scale like object-fit: contain
      let scaleX = 1, scaleY = 1;
      if (imageAspect > containerAspect) {
        scaleY = containerAspect / imageAspect;
      } else {
        scaleX = imageAspect / containerAspect;
      }

      const geometry = new THREE.PlaneGeometry(scaleX * 2, scaleY * 2);

      planeMesh = new THREE.Mesh(
        geometry,
        new THREE.ShaderMaterial({
          uniforms: shaderUniforms,
          vertexShader,
          fragmentShader
        })
      );

      scene.add(planeMesh);

      renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(containerWidth, containerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);

      // Make canvas overlay image
      renderer.domElement.style.position = 'absolute';
      renderer.domElement.style.top = '0';
      renderer.domElement.style.left = '0';
      renderer.domElement.style.zIndex = '2';
      renderer.domElement.style.pointerEvents = 'none';

      container.appendChild(renderer.domElement);
    }

    function animateScene() {
      requestAnimationFrame(animateScene);

      mousePosition.x += (targetMousePosition.x - mousePosition.x) * easeFactor;
      mousePosition.y += (targetMousePosition.y - mousePosition.y) * easeFactor;

      planeMesh.material.uniforms.u_mouse.value.set(mousePosition.x, 1.0 - mousePosition.y);
      planeMesh.material.uniforms.u_prevMouse.value.set(prevPosition.x, 1.0 - prevPosition.y);

      aberrationIntensity = Math.max(0.0, aberrationIntensity - 0.05);
      planeMesh.material.uniforms.u_aberrationIntensity.value = aberrationIntensity;

      renderer.render(scene, camera);
    }

    container.addEventListener("mousemove", function (event) {
      easeFactor = 0.02;
      const rect = container.getBoundingClientRect();
      prevPosition = { ...targetMousePosition };

      targetMousePosition.x = (event.clientX - rect.left) / rect.width;
      targetMousePosition.y = (event.clientY - rect.top) / rect.height;

      aberrationIntensity = 1;
    });

    container.addEventListener("mouseenter", function (event) {
      easeFactor = 0.02;
      const rect = container.getBoundingClientRect();

      mousePosition.x = targetMousePosition.x = (event.clientX - rect.left) / rect.width;
      mousePosition.y = targetMousePosition.y = (event.clientY - rect.top) / rect.height;
    });

    container.addEventListener("mouseleave", function () {
      easeFactor = 0.05;
      targetMousePosition = { ...prevPosition };
    });

    const loader = new THREE.TextureLoader();
    loader.load(
      imageElement.src,
      function (texture) {
        texture.minFilter = THREE.LinearFilter;
        initializeScene(texture);
        animateScene();
      },
      undefined,
      function (err) {
        console.error("Texture load error:", err);
      }
    );
  });
};
