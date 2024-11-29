// import {
//     AmbientLight,
//     Clock,
//     Mesh,
//     MeshStandardMaterial,
//     PerspectiveCamera,
//     PointLight,
//     Scene,
//     SphereGeometry,
//     Vector3,
//     WebGLRenderer
//   } from 'https://cdn.skypack.dev/three@0.136';

//   import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136/examples/jsm/controls/OrbitControls.js';
  
//   // Thanks https://github.com/stegu/psrdnoise !!!
//   const psrdnoise = `
//   vec4 permute(vec4 i) {
//     vec4 im = mod(i, 289.0);
//     return mod(((im*34.0)+10.0)*im, 289.0);
//   }
  
//   float psrdnoise(vec3 x, vec3 period, float alpha, out vec3 gradient)
//   {
//     const mat3 M = mat3(0.0, 1.0, 1.0, 1.0, 0.0, 1.0,  1.0, 1.0, 0.0);
//     const mat3 Mi = mat3(-0.5, 0.5, 0.5, 0.5,-0.5, 0.5, 0.5, 0.5,-0.5);
//     vec3 uvw = M * x;
//     vec3 i0 = floor(uvw), f0 = fract(uvw);
//     vec3 g_ = step(f0.xyx, f0.yzz), l_ = 1.0 - g_;
//     vec3 g = vec3(l_.z, g_.xy), l = vec3(l_.xy, g_.z);
//     vec3 o1 = min( g, l ), o2 = max( g, l );
//     vec3 i1 = i0 + o1, i2 = i0 + o2, i3 = i0 + vec3(1.0);
//     vec3 v0 = Mi * i0, v1 = Mi * i1, v2 = Mi * i2, v3 = Mi * i3;
//     vec3 x0 = x - v0, x1 = x - v1, x2 = x - v2, x3 = x - v3;
//     if(any(greaterThan(period, vec3(0.0)))) {
//       vec4 vx = vec4(v0.x, v1.x, v2.x, v3.x);
//       vec4 vy = vec4(v0.y, v1.y, v2.y, v3.y);
//       vec4 vz = vec4(v0.z, v1.z, v2.z, v3.z);
//       if(period.x > 0.0) vx = mod(vx, period.x);
//       if(period.y > 0.0) vy = mod(vy, period.y);
//       if(period.z > 0.0) vz = mod(vz, period.z);
//       i0 = floor(M * vec3(vx.x, vy.x, vz.x) + 0.5);
//       i1 = floor(M * vec3(vx.y, vy.y, vz.y) + 0.5);
//       i2 = floor(M * vec3(vx.z, vy.z, vz.z) + 0.5);
//       i3 = floor(M * vec3(vx.w, vy.w, vz.w) + 0.5);
//     }
//     vec4 hash = permute( permute( permute( 
//         vec4(i0.z, i1.z, i2.z, i3.z ))
//         + vec4(i0.y, i1.y, i2.y, i3.y ))
//         + vec4(i0.x, i1.x, i2.x, i3.x ));
//     vec4 theta = hash * 3.883222077;
//     vec4 sz = hash * -0.006920415 + 0.996539792;
//     vec4 psi = hash * 0.108705628;
//     vec4 Ct = cos(theta), St = sin(theta);
//     vec4 sz_prime = sqrt( 1.0 - sz*sz );
//     vec4 gx, gy, gz;
//     if(alpha != 0.0) {
//       vec4 px = Ct * sz_prime, py = St * sz_prime, pz = sz;
//       vec4 Sp = sin(psi), Cp = cos(psi), Ctp = St*Sp - Ct*Cp;
//       vec4 qx = mix( Ctp*St, Sp, sz), qy = mix(-Ctp*Ct, Cp, sz);
//       vec4 qz = -(py*Cp + px*Sp);
//       vec4 Sa = vec4(sin(alpha)), Ca = vec4(cos(alpha));
//       gx = Ca*px + Sa*qx; gy = Ca*py + Sa*qy; gz = Ca*pz + Sa*qz;
//     }
//     else {
//       gx = Ct * sz_prime; gy = St * sz_prime; gz = sz;  
//     }
//     vec3 g0 = vec3(gx.x, gy.x, gz.x), g1 = vec3(gx.y, gy.y, gz.y);
//     vec3 g2 = vec3(gx.z, gy.z, gz.z), g3 = vec3(gx.w, gy.w, gz.w);
//     vec4 w = 0.5-vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3));
//     w = max(w, 0.0); vec4 w2 = w * w, w3 = w2 * w;
//     vec4 gdotx = vec4(dot(g0,x0), dot(g1,x1), dot(g2,x2), dot(g3,x3));
//     float n = dot(w3, gdotx);
//     vec4 dw = -6.0 * w2 * gdotx;
//     vec3 dn0 = w3.x * g0 + dw.x * x0;
//     vec3 dn1 = w3.y * g1 + dw.y * x1;
//     vec3 dn2 = w3.z * g2 + dw.z * x2;
//     vec3 dn3 = w3.w * g3 + dw.w * x3;
//     gradient = 39.5 * (dn0 + dn1 + dn2 + dn3);
//     return 39.5 * n;
//   }
//   `
  
//   App()
  
//   function App () {
//     let renderer, scene, camera, cameraCtrl
//     let width, height
//     let material
  
//     const clock = new Clock()
  
//     const uniforms = {
//       uTime: { value: 0 },
//       uCoordScale1: { value: 0.60 },
//       uCoordScale2: { value: 13.4 },
//       uCoordScale3: { value: 2.2 },
//       uCoordScale4: { value: 9.2 },
//       uDisplacementScale: { value: 0.27 },
//       uBumpScale: { value: 0.100 }
//     }
  
//     init()
  
//     function init () {
//         // Set alpha to true for transparent background
//         renderer = new WebGLRenderer({ 
//           canvas: document.getElementById('blob'), 
//           antialias: true, 
//           alpha: true // Enable transparency
//         })
        
//         // Set the clear color to transparent (0x000000 is black, 0 is full transparency)
//         renderer.setClearColor(0x000000, 0)

      
//         camera = new PerspectiveCamera(75)
//         camera.position.z = 12
      
//         cameraCtrl = new OrbitControls(camera, renderer.domElement)
//         cameraCtrl.enableDamping = true
//         cameraCtrl.dampingFactor = 0.1
//         cameraCtrl.enableZoom = false
      
//         updateSize()
//         window.addEventListener('resize', updateSize)
      
//         initScene()
      
      
//         requestAnimationFrame(animate)
//       }
      
  
//     function initScene () {
//       scene = new Scene()
//       scene.add(new AmbientLight(0xcccccc))
  
//       const pointLight = new PointLight(0xff6060)
//       pointLight.position.set(30, 20, 10)
//       scene.add(pointLight)
  
//       const pointLight1 = new PointLight(0x6090ff)
//       pointLight1.position.set(-30, -20, -10)
//       scene.add(pointLight1)
  
//       const geometry = new SphereGeometry(5, 256, 256)
  
//       material = new MeshStandardMaterial({
//         metalness: 1,
//         roughness: 0.5,
//         onBeforeCompile: (shader) => {
//           shader.uniforms.uTime = uniforms.uTime
//           shader.uniforms.uCoordScale1 = uniforms.uCoordScale1
//           shader.uniforms.uCoordScale2 = uniforms.uCoordScale2
//           shader.uniforms.uCoordScale3 = uniforms.uCoordScale3
//           shader.uniforms.uCoordScale4 = uniforms.uCoordScale4
//           shader.uniforms.uDisplacementScale = uniforms.uDisplacementScale
//           shader.uniforms.uBumpScale = uniforms.uBumpScale
//           shader.vertexShader = `
//             uniform float uTime;
//             uniform float uCoordScale1;
//             uniform float uDisplacementScale;
//             varying vec3 vPosition;
//             ${psrdnoise}
//           ` + shader.vertexShader
//           shader.vertexShader = shader.vertexShader.replace(
//             '#include <begin_vertex>',
//             `
//               vPosition = position;
  
//               vec3 grad;
//               float d = psrdnoise(position * uCoordScale1 + uTime * vec3(0.1, 0.123, 0.134), vec3(240.0), 4.0 * uTime, grad);
//               grad *= 2.0;
//               vec3 transformed = position + uDisplacementScale * d * normal;
  
//               vec3 N_ = grad - dot(grad, normal) * normal;
//               vNormal = normal - uDisplacementScale * N_;
//               vNormal = normalize(vNormal);
//             `
//           )
//           shader.fragmentShader = `
//             uniform mat4 modelViewMatrix;
//             uniform float uTime;
//             uniform float uCoordScale2;
//             uniform float uCoordScale3;
//             uniform float uCoordScale4;
//             uniform float uBumpScale;
//             varying vec3 vPosition;
//             ${psrdnoise}
//           ` + shader.fragmentShader
//           shader.fragmentShader = shader.fragmentShader.replace(
//             '#include <normal_fragment_begin>',
//             `
//               // bump map
//               vec3 grad = vec3(0.0);
//               vec3 gradtemp = vec3(0.0);
//               float bump = psrdnoise(vPosition * uCoordScale2 + uTime * vec3(0.5, 0.7, 0.6), vec3(240.0), 0.0, grad);
//               grad *= 10.0;
//               bump += 0.5 * psrdnoise(vPosition * uCoordScale3 + 0.02 * grad + uTime * vec3(-0.7, -0.6, 0.5), vec3(240.0), 0.0, gradtemp);
//               grad = 10.0 * gradtemp;
//               bump += 0.25 * psrdnoise(vPosition * uCoordScale4 + uTime * vec3(-0.6, -0.5, -0.7), vec3(240.0), 0.0, gradtemp);
//               grad += 10.0 * gradtemp;
  
//               bump *= 0.2;
//               grad *= 0.2;
  
//               // normal
//               vec3 normal;
//               vec3 N_ = grad - dot(grad, vNormal) * vNormal;
//               normal = vNormal - uBumpScale * N_;
//               normal = normalize(normal);
//               normal = mat3(modelViewMatrix) * normal;
//               vec3 geometryNormal = normal;
//             `
//           )
//         }
//       })
//       const mesh = new Mesh(geometry, material)
//       scene.add(mesh)
//     }
  
//     function animate () {
//       requestAnimationFrame(animate)
  
//       uniforms.uTime.value = clock.getElapsedTime() * 0.5
  
//       if (cameraCtrl) cameraCtrl.update()
//       renderer.render(scene, camera)
//     }
  
//     function updateSize () {
//       width = window.innerWidth
//       height = window.innerHeight
//       if (renderer && camera) {
//         renderer.setSize(width, height)
//         camera.aspect = width / height
//         camera.updateProjectionMatrix()
//       }
//     }
//   }
  


  const terminal = document.querySelector(".terminal");
const hydra = document.querySelector(".hydra");
const rebootSuccessText = document.querySelector(".hydra_reboot_success");
const maxCharacters = 24;
const unloadedCharacter = ".";
const loadedCharacter = "#";
const spinnerFrames = ["/", "-", "\\", "|"];

// Clone the element and give the glitch classes
(glitchElement => {
  const glitch = glitchElement.cloneNode(true);
  const glitchReverse = glitchElement.cloneNode(true);
  glitch.classList.add("glitch--clone", "glitch--bottom");
  glitchReverse.classList.add("glitch--clone", "glitch--top");
  glitch.setAttribute("aria-hidden", "true");
  glitchReverse.setAttribute("aria-hidden", "true");

  glitchElement.insertAdjacentElement("afterend", glitch);
  glitchElement.insertAdjacentElement("afterend", glitchReverse);
})(terminal);

// Get all the loading bars
const loadingBars = document.querySelectorAll(".loading-bar");
const processAmounts = document.querySelectorAll(".process-amount");
const spinners = document.querySelectorAll(".spinner");
const rebootingText = document.querySelectorAll(".hydra_rebooting");
const glitches = document.querySelectorAll(".glitch--clone");

// Helper for random number
const RandomNumber = (min, max) => Math.floor(Math.random() * max) + min;

const Delay = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time))
};

const HideAll = elements =>
  elements.forEach(glitchGroup =>
    glitchGroup.forEach(element => element.classList.add("hidden")) );

const ShowAll = elements =>
  elements.forEach(glitchGroup =>
    glitchGroup.forEach(element => element.classList.remove("hidden")) );

// Render the bar to HTML
const RenderBar = (values) => {
  const currentLoaded = values.lastIndexOf(loadedCharacter) + 1;
  const loaded = values.slice(0, currentLoaded).join("");
  const unloaded = values.slice(currentLoaded).join("");

  // Update all the loading bars
  loadingBars.forEach(loadingBar => {
    loadingBar.innerHTML = `(${loaded}<span class="loading-bar--unloaded">${unloaded}</span>)`;
  });

  // Update all the percentages
  var loadingPercent = Math.floor(currentLoaded / maxCharacters * 100);
  processAmounts.forEach(processAmount => {
    processAmount.innerText = loadingPercent;
  });
};

// Update the loaded value and render it to HTML
const DrawLoadingBar = (values) => {
  return new Promise((resolve) => {
    const loadingBarAnimation = setInterval(() => {
      if (!values.includes(unloadedCharacter)) {
        clearInterval(loadingBarAnimation);
        resolve();
      }

      values.pop(unloadedCharacter);
      values.unshift(loadedCharacter);
      RenderBar(values);
    }, RandomNumber(50, 300));
  });
};

const DrawSpinner = (spinnerFrame = 0) => {
  return setInterval(() => {
    spinnerFrame += 1;
    spinners.forEach(
      spinner =>
        (spinner.innerText = `[${
          spinnerFrames[spinnerFrame % spinnerFrames.length]
        }]`)
    );
  }, RandomNumber(50, 300));
};

const AnimateBox = () => {
  const first = hydra.getBoundingClientRect();
  HideAll([spinners, glitches, rebootingText]);
  rebootSuccessText.classList.remove("hidden");
  rebootSuccessText.style.visibility = "hidden";
  const last = hydra.getBoundingClientRect();

  const hydraAnimation = hydra.animate([
    { transform: `scale(${first.width / last.width}, ${first.height / last.height})` },
    { transform: `scale(${first.width / last.width}, 1.2)` },
    { transform: `none` }
  ],{
    duration: 1000,
    easing: 'cubic-bezier(0,0,0.32,1)',
  });

  hydraAnimation.addEventListener('finish', () => {
    rebootSuccessText.removeAttribute("style");
    hydra.removeAttribute("style");
  });
};

const PlayHydra = async() => {
  terminal.classList.add("glitch");
  rebootSuccessText.classList.add("hidden");
  ShowAll([spinners, glitches, rebootingText]);
  const loadingBar = new Array(maxCharacters).fill(unloadedCharacter);
  const spinnerInterval = DrawSpinner();

  // Play the loading bar
  await DrawLoadingBar(loadingBar);
  
  // Loading is complete on the next frame, hide spinner and glitch
  requestAnimationFrame(() => {
    clearInterval(spinnerInterval);
    terminal.classList.remove("glitch");
    AnimateBox();
  });
};

// Start animation after 5 seconds (5000 ms)
const delayTime = 5000;  // Delay time in milliseconds
await Delay(delayTime);  // Wait for the specified delay time
PlayHydra();  // Start the animation after the delay


