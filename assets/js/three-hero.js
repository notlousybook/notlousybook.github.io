// three-hero.js — simple Three.js hero with graceful fallback
(function(){
  const canvas = document.getElementById('hero-canvas');
  if(!canvas) return;
  if(typeof THREE === 'undefined'){
    // hide canvas if Three.js not available
    canvas.style.display = 'none';
    return;
  }

  const isMobile = window.innerWidth < 720 || /Mobi|Android/i.test(navigator.userAgent); // mobile heuristic
  const renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias: !isMobile});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(0,0,6);

  const hemi = new THREE.HemisphereLight(0xffffff, 0x222244, 0.8);
  scene.add(hemi);
  const dir = new THREE.DirectionalLight(0xffffff, 0.8);
  dir.position.set(5,5,5);
  scene.add(dir);

  const geom = new THREE.TorusKnotGeometry(1.4,0.45,220,48); // higher detail for hero
  const mat = new THREE.MeshPhysicalMaterial({color:0x7ee8b6, metalness:0.8, roughness:0.15, clearcoat:0.2, clearcoatRoughness:0.05, emissive:0x062525, emissiveIntensity:0.18, reflectivity:0.6, ior:1.5});
  const mesh = new THREE.Mesh(geom, mat);
  scene.add(mesh);

  // particles
  const pCount = isMobile?120:600;
  const pGeom = new THREE.BufferGeometry();
  const positions = new Float32Array(pCount*3);
  for(let i=0;i<pCount;i++){
    const r = 2.6 + Math.random()*3.2;
    const theta = Math.random()*Math.PI*2;
    const phi = Math.acos(2*Math.random()-1);
    positions[i*3] = r * Math.sin(phi)*Math.cos(theta);
    positions[i*3+1] = r * Math.sin(phi)*Math.sin(theta);
    positions[i*3+2] = r * Math.cos(phi);
  }
  pGeom.setAttribute('position', new THREE.BufferAttribute(positions,3));
  const pMat = new THREE.PointsMaterial({color:0xcfeee0, size: isMobile?0.02:0.03, transparent:true, opacity:0.9});
  // subtle glow post process mimic (cheap) using sprite texture could be added later
  const particles = new THREE.Points(pGeom, pMat);
  scene.add(particles);

  window.addEventListener('resize', ()=>{
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w,h);
    camera.aspect = w/h; camera.updateProjectionMatrix();
  });

  let mouseX=0, mouseY=0;
  window.addEventListener('pointermove', (e)=>{
    mouseX = (e.clientX / window.innerWidth) - 0.5;
    mouseY = (e.clientY / window.innerHeight) - 0.5;
  });

  function animate(){
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.005 + mouseY*0.015;
    mesh.rotation.y += 0.01 + mouseX*0.03;
    mesh.rotation.z += 0.004;
    // gentle bobbing
    mesh.position.y = Math.sin(Date.now()*0.0009) * 0.07;
    particles.rotation.y += 0.0007;
    renderer.render(scene, camera);
  }
  animate();
})();
