(function(){
  const canvas = document.getElementById('hero-canvas');
  if(!canvas) return;
  if(typeof THREE === 'undefined'){ canvas.style.display='none'; return; }

  const isMobile = window.innerWidth < 720 || /Mobi|Android/i.test(navigator.userAgent);
  const renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias: !isMobile});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(0,0,6);

  // fog
  scene.fog = new THREE.FogExp2(0x031016, 0.06);

  // lights
  const ambient = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambient);
  const rim = new THREE.DirectionalLight(0x78b9ff, 0.9);
  rim.position.set(-5,3,5);
  scene.add(rim);
  const warm = new THREE.PointLight(0xffe59e, 0.35, 20);
  warm.position.set(4,-2,3);
  scene.add(warm);

  // geometry - custom smooth icosahedron
  const geom = new THREE.IcosahedronGeometry(1.6, 5);
  const mat = new THREE.MeshPhysicalMaterial({color:0x9ef2cf, metalness:0.5, roughness:0.12, clearcoat:0.3, clearcoatRoughness:0.05, ior:1.4, reflectivity:0.5, emissive:0x042022, emissiveIntensity:0.08});
  const mesh = new THREE.Mesh(geom, mat);
  mesh.scale.set(1.05,1.05,1.05);
  scene.add(mesh);

  // particle field
  const pCount = isMobile? 160: 1200;
  const pGeom = new THREE.BufferGeometry();
  const positions = new Float32Array(pCount*3);
  const colors = new Float32Array(pCount*3);
  for(let i=0;i<pCount;i++){
    const r = 3 + Math.random()*8;
    const theta = Math.random()*Math.PI*2;
    const phi = Math.acos(2*Math.random()-1);
    positions[i*3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i*3+2] = r * Math.cos(phi);
    colors[i*3] = 0.48 + Math.random()*0.4;
    colors[i*3+1] = 0.8 + Math.random()*0.2;
    colors[i*3+2] = 0.7 + Math.random()*0.3;
  }
  pGeom.setAttribute('position', new THREE.BufferAttribute(positions,3));
  pGeom.setAttribute('color', new THREE.BufferAttribute(colors,3));
  const pMat = new THREE.PointsMaterial({size:isMobile?0.02:0.035, vertexColors:true, transparent:true, opacity:0.95});
  const particles = new THREE.Points(pGeom, pMat);
  scene.add(particles);

  // post animation
  window.addEventListener('resize', ()=>{
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w,h);
    camera.aspect = w/h; camera.updateProjectionMatrix();
  });

  let mouseX = 0, mouseY = 0;
  window.addEventListener('pointermove', (e)=>{ mouseX = (e.clientX / window.innerWidth) - 0.5; mouseY = (e.clientY / window.innerHeight) - 0.5; });

  let t=0;
  function animate(){
    requestAnimationFrame(animate);
    t += 0.01;
    mesh.rotation.x += 0.006 + mouseY*0.02;
    mesh.rotation.y += 0.01 + mouseX*0.04;
    mesh.position.y = Math.sin(t*0.55)*0.06;
    mesh.rotation.z += 0.003;
    particles.rotation.y += 0.0009;
    particles.rotation.x = Math.sin(t*0.12)*0.02;
    // subtle camera parallax
    camera.position.x += (mouseX*3 - camera.position.x) * 0.04;
    camera.position.y += (-mouseY*2 - camera.position.y) * 0.04;
    camera.lookAt(0,0,0);
    renderer.toneMappingExposure = 1.0;
    renderer.render(scene, camera);
  }
  animate();
})();
