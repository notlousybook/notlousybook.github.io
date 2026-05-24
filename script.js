(() => {
  'use strict'

  const CFG = {
    trail: {
      sliceCount: 6,
      staggerIn: 40,
      staggerOut: 25,
      revealDuration: 350,
      fadeDuration: 450,
      imageLifespan: 1000,
      mouseThreshold: 100,
    },
    explosion: {
      gravity: 0.2,
      friction: 0.98,
      horizontalForce: 22,
      verticalForce: 14,
      rotationSpeed: 12,
      imageSize: 70,
      resetDelay: 800,
      totalImages: 8,
    },
    cycleTexts: ['code', 'design', 'build', 'break', 'learn', 'ship'],
    lerpFactor: 0.08,
    blockGridSize: 100,
  }

  let lenis = null
  let trailRafId = null
  let parallaxRafs = []
  let trailMouseX = 0, trailMouseY = 0
  let trailLerpX = 0, trailLerpY = 0
  let trailLastX = 0, trailLastY = 0
  let trailCurrentIndex = 0
  let trailActiveImages = []

  function lerp(a, b, f) { return a + (b - a) * f }
  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)) }
  /* ─── TYPEWRITER ─── */
  function initTypewriter() {
    const el = document.getElementById('typewriter-text')
    if (!el) return
    const texts = SITE_CONFIG.hero.typewriterTexts || []
    let idx = 0, charIdx = 0, deleting = false
    function tick() {
      const current = texts[idx]
      if (!deleting) {
        charIdx++
        el.textContent = current.slice(0, charIdx)
        if (charIdx === current.length) { setTimeout(() => { deleting = true; tick() }, 2000); return }
        setTimeout(tick, 60 + Math.random() * 80)
      } else {
        charIdx--
        el.textContent = current.slice(0, charIdx)
        if (charIdx === 0) { deleting = false; idx = (idx + 1) % texts.length; setTimeout(tick, 400); return }
        setTimeout(tick, 30 + Math.random() * 40)
      }
    }
    tick()
  }

  /* ─── THREE.JS HERO SHADER ─── */
  function initHeroShader() {
    const canvas = document.getElementById('hero-canvas')
    if (!canvas || typeof THREE === 'undefined') return
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
    camera.position.z = 1
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false })
    function resizeCanvas() {
      const w = canvas.parentElement.clientWidth, h = canvas.parentElement.clientHeight
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
      if (uniforms) uniforms.uResolution.value.set(renderer.domElement.width, renderer.domElement.height)
    }
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    document.addEventListener('mousemove', e => {
      uniforms.uMouse.value.x = (e.clientX / window.innerWidth) * 2 - 1
      uniforms.uMouse.value.y = -(e.clientY / window.innerHeight) * 2 + 1
    })
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv;uniform float uTime;uniform vec2 uResolution;uniform vec2 uMouse;
        vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
        vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
        vec4 permute(vec4 x){return mod289(((x*34.0)+10.0)*x);}
        vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
        float snoise(vec3 v){
          const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
          vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
          vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;
          vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
          vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
          i=mod289(i);vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
          float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
          vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
          vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
          vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
          vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
          vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
          vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
          vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
          p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
          vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
          m=m*m;return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
        }
        void main(){
          vec2 uv=vUv;float ar=uResolution.x/uResolution.y;
          vec2 p=uv*2.0-1.0;p.x*=ar;float t=uTime*0.12;
          float n1=snoise(vec3(p*1.5+uMouse*0.3,t));float n2=snoise(vec3(p*2.8-vec2(0.5,0.7),t*0.7+2.0));
          float n3=snoise(vec3(p*4.2+vec2(1.2,0.3),t*0.5+4.0));float n=n1*0.5+n2*0.3+n3*0.2;n=n*0.5+0.5;
          vec3 c1=vec3(0.14,0.04,0.22);vec3 c2=vec3(0.02,0.06,0.18);vec3 c3=vec3(0.18,0.03,0.12);vec3 c4=vec3(0.01,0.04,0.10);
          vec3 col=mix(c1,c2,smoothstep(0.0,0.5,n));col=mix(col,c3,smoothstep(0.3,0.8,n));col=mix(col,c4,smoothstep(0.6,1.0,n));
          float glow=sin(n*14.0+t*0.6)*0.5+0.5;col+=vec3(0.06,0.02,0.10)*glow*0.35;
          float vig=1.0-length(p)*0.5;col*=vig;gl_FragColor=vec4(col,0.88);
        }
      `
    })
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
    scene.add(mesh)
    function animate() { uniforms.uTime.value += 0.01; renderer.render(scene, camera); requestAnimationFrame(animate) }
    animate()
  }

  /* ─── SMOOTH SCROLL ─── */
  function initSmoothScroll() {
    if (typeof Lenis === 'undefined') return
    lenis = new Lenis({ duration: 1.8, easing: t => Math.min(1, 1 - Math.pow(1 - t, 3)), orientation: 'vertical', smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(time => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
  }

  /* ─── PATTERN 3: Rotating Cycle Orb ─── */
  function initRotatingCycle() {
    const orb = document.querySelector('.craft-orb')
    if (!orb) return
    let currentCycle = 0
    const label = document.createElement('div')
    label.className = 'cycle-label active'
    label.textContent = CFG.cycleTexts[0]
    orb.appendChild(label)
    ScrollTrigger.create({
      trigger: '.craft-section', start: 'top bottom', end: 'bottom top',
      onUpdate: (self) => {
        const p = self.progress
        gsap.set(orb, { rotation: p * 720 })
        const nc = Math.floor(Math.abs(p * 720) / 360) % CFG.cycleTexts.length
        if (nc !== currentCycle) {
          currentCycle = nc
          label.textContent = CFG.cycleTexts[currentCycle]
          gsap.fromTo(label, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'expo.out' })
        }
      }
    })
  }

  /* ─── PATTERN 4: Expanding Tech Grid ─── */
  function initExpandingGrid() {
    const grid = document.getElementById('tech-grid')
    if (!grid) return
    const items = grid.querySelectorAll('.craft-tech-item')
    if (!items.length) return
    const isMobile = window.innerWidth < 768
    function onScroll() {
      const scrollY = window.scrollY, vh = window.innerHeight
      const rect = grid.getBoundingClientRect()
      const progress = clamp((scrollY - (rect.top + scrollY - vh)) / (rect.top + scrollY + rect.height - (rect.top + scrollY - vh)), 0, 1)
      if (!isMobile) {
        grid.style.gap = `${12 + progress * 16}px`
        items.forEach(item => { item.style.transform = `scale(${1 + progress * 0.08})` })
      }
    }
    gsap.ticker.add(onScroll)
    gsap.ticker.lagSmoothing(0)
  }

  /* ─── PATTERN 5A: SplitType Text Reveal (reverses on scroll up) ─── */
  function initTextReveals() {
    if (typeof SplitType === 'undefined') return
    const targets = [
      { sel: '.section-title', trigger: '.section-header' },
      { sel: '.craft-lede', trigger: '.craft-container' },
    ]
    targets.forEach(({ sel, trigger }) => {
      document.querySelectorAll(sel).forEach(el => {
        const split = new SplitType(el, { types: 'chars' })
        gsap.fromTo(split.chars,
          { y: '100%', opacity: 0, rotateX: -45 },
          { y: '0%', opacity: 1, rotateX: 0, duration: 1.2, ease: 'expo.out', stagger: { amount: 0.8 },
            scrollTrigger: { trigger: el.closest(trigger) || el.parentElement, start: 'top 85%', toggleActions: 'play none none reverse' }
          }
        )
      })
    })
  }

  /* ─── PATTERN 5B: Block Reveal (scrub-based, reveals then hides, reverses on scroll up) ─── */
  function initBlockReveal() {
    const pairs = [
      { el: document.querySelector('.craft-mh-left'), color: 'var(--accent)' },
      { el: document.querySelector('.craft-mh-right'), color: 'var(--accent-cyan)' },
    ]
    pairs.forEach(({ el, color }) => {
      if (!el) return
      el.style.position = 'relative'
      el.style.display = 'inline-block'
      const overlay = document.createElement('span')
      overlay.className = 'block-reveal-overlay'
      overlay.style.cssText = `position:absolute;inset:0;background:${color};z-index:2;pointer-events:none`
      el.appendChild(overlay)
      const tl = gsap.timeline({ paused: true })
      tl.set(overlay, { transformOrigin: 'left', scaleX: 0 })
        .to(overlay, { scaleX: 1, duration: 0.5, ease: 'expo.inOut' })
        .set(overlay, { transformOrigin: 'right' })
        .to(overlay, { scaleX: 0, duration: 0.5, ease: 'expo.inOut' })
      ScrollTrigger.create({
        trigger: el.closest('.craft-masthead') || el, start: 'top 85%', end: 'top 45%',
        scrub: 0.3, animation: tl
      })
    })
    // Apply block reveal to other text elements without existing animations
    document.querySelectorAll('.section-eyebrow, .section-desc, .craft-tech-header, .stat-label, .footer-tagline').forEach(el => {
      el.style.position = 'relative'
      const ov = document.createElement('span')
      ov.style.cssText = 'position:absolute;inset:0;background:var(--accent);z-index:2;pointer-events:none'
      el.appendChild(ov)
      const tl = gsap.timeline({ paused: true })
      tl.set(ov, { transformOrigin: 'left', scaleX: 0 })
        .to(ov, { scaleX: 1, duration: 0.4, ease: 'expo.inOut' })
        .set(ov, { transformOrigin: 'right' })
        .to(ov, { scaleX: 0, duration: 0.4, ease: 'expo.inOut' })
      ScrollTrigger.create({
        trigger: el.closest('section') || el.closest('footer') || el.parentElement,
        start: 'top 85%', end: 'top 50%', scrub: 0.3, animation: tl
      })
    })
  }

  /* ─── PATTERN 5C: Parallel Character Stagger (bio, reverses) ─── */
  function initParallelStagger() {
    const bio = document.querySelector('.craft-piece-bio p')
    if (!bio || typeof SplitType === 'undefined') return
    const split = new SplitType(bio, { types: 'lines,chars' })
    split.lines.forEach(line => {
      line.querySelectorAll('.char').forEach((char, i) => {
        gsap.fromTo(char, { y: '100%', opacity: 0 }, {
          y: '0%', opacity: 1, duration: 1.0, ease: 'expo.out', delay: i * 0.06,
          scrollTrigger: { trigger: bio.closest('.craft-piece'), start: 'top 85%', toggleActions: 'play none none reverse' }
        })
      })
    })
  }

  /* ─── PATTERN 6: Tilt Sections (entrance only — NO PIN) ─── */
  function initTiltSections() {
    document.querySelectorAll('.section').forEach(section => {
      const container = section.querySelector('.section-container')
      if (!container) return
      const orig = window.getComputedStyle(container).transform
      gsap.fromTo(container,
        { rotation: -1.5, transformOrigin: 'bottom left' },
        { rotation: 0, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'top 30%', scrub: true } }
      )
    })
  }

  /* ─── PATTERN 7: Parallax Lerp (with RAF cleanup) ─── */
  function initParallaxLerp() {
    document.querySelectorAll('.hero-bg-image, .marquee-bg-image, .craft-bg-image, .collab-bg-image').forEach(bg => {
      const speed = bg.classList.contains('hero-bg-image') ? 0.08 : 0.04
      let targetY = 0, currentY = 0, running = true
      ScrollTrigger.create({
        trigger: bg.parentElement, start: 'top bottom', end: 'bottom top',
        onUpdate: () => {
          const rect = bg.parentElement.getBoundingClientRect()
          targetY = (window.scrollY - (rect.top + window.scrollY)) * speed
        }
      })
      function animate() {
        if (!running) return
        currentY = lerp(currentY, targetY, CFG.lerpFactor)
        bg.style.transform = `translate3d(0, ${currentY.toFixed(2)}px, 0)`
        requestAnimationFrame(animate)
      }
      animate()
      parallaxRafs.push(() => { running = false })
    })
  }

  /* ─── PATTERN 8: Image Trail (simplified, no external deps) ─── */
  function initImageTrail() {
    if (window.innerWidth <= 768) return
    const container = document.getElementById('trail-container')
    if (!container) return
    const colors = ['#8b5cf6', '#06b6d4', '#f59e0b', '#10b981', '#a78bfa', '#f472b6', '#ec4899', '#6366f1']

    function createTrailImage() {
      const cr = container.getBoundingClientRect()
      const wrap = document.createElement('div')
      wrap.style.cssText = `position:absolute;left:${trailLerpX - cr.left}px;top:${trailLerpY - cr.top}px;pointer-events:none`
      for (let i = 0; i < CFG.trail.sliceCount; i++) {
        const slice = document.createElement('div')
        const h = 100 / CFG.trail.sliceCount
        slice.style.cssText = `position:absolute;width:100%;height:${h + 0.1}%;top:${i * h}%;overflow:hidden;clip-path:inset(50% 0 50% 0);transition:clip-path ${CFG.trail.revealDuration}ms ease ${i * CFG.trail.staggerIn}ms;border-radius:4px`
        const dot = document.createElement('div')
        dot.style.cssText = `width:120px;height:150px;border-radius:8px;background:${colors[(trailCurrentIndex + i) % colors.length]};opacity:0.35;transform:scale(0.8)`
        slice.appendChild(dot)
        wrap.appendChild(slice)
      }
      container.appendChild(wrap)
      trailCurrentIndex++
      requestAnimationFrame(() => {
        wrap.style.left = `${trailMouseX - cr.left}px`
        wrap.style.top = `${trailMouseY - cr.top}px`
        wrap.querySelectorAll('div').forEach(s => { s.style.clipPath = 'inset(0% 0 0% 0)' })
      })
      const entry = { el: wrap, born: Date.now() }
      trailActiveImages.push(entry)
      setTimeout(() => {
        entry.el.querySelectorAll('div').forEach((s, i) => {
          s.style.transition = `clip-path ${CFG.trail.fadeDuration}ms ease ${i * CFG.trail.staggerOut}ms`
          s.style.clipPath = 'inset(50% 0 50% 0)'
        })
        setTimeout(() => { entry.el.remove(); trailActiveImages = trailActiveImages.filter(a => a !== entry) }, CFG.trail.fadeDuration + CFG.trail.sliceCount * CFG.trail.staggerOut)
      }, CFG.trail.imageLifespan)
    }

    function render() {
      trailLerpX = lerp(trailLerpX, trailMouseX, 0.1)
      trailLerpY = lerp(trailLerpY, trailMouseY, 0.1)
      if (!trailLastX && !trailLastY) { trailLastX = trailMouseX; trailLastY = trailMouseY }
      if (Math.hypot(trailMouseX - trailLastX, trailMouseY - trailLastY) > CFG.trail.mouseThreshold) {
        createTrailImage(); trailLastX = trailMouseX; trailLastY = trailMouseY
      }
      trailRafId = requestAnimationFrame(render)
    }
    document.addEventListener('mousemove', e => { trailMouseX = e.clientX; trailMouseY = e.clientY })
    render()
  }

  /* ─── PATTERN 9: Tech Grid Hover Highlight ─── */
  function initHoverHighlight() {
    const grid = document.getElementById('tech-grid')
    if (!grid) return
    const items = grid.querySelectorAll('.craft-tech-item')
    if (!items.length) return
    const hl = document.createElement('div')
    hl.className = 'highlight-tracker'
    grid.style.position = 'relative'
    grid.appendChild(hl)
    const colors = ['#8b5cf6', '#06b6d4', '#f59e0b', '#10b981']
    items.forEach((item, i) => { item.dataset.color = colors[i % colors.length] })
    grid.addEventListener('mousemove', e => {
      const t = document.elementFromPoint(e.clientX, e.clientY)?.closest('.craft-tech-item')
      if (t) {
        const tr = t.getBoundingClientRect(), gr = grid.getBoundingClientRect()
        hl.style.cssText = `transform:translate3d(${tr.left - gr.left}px,${tr.top - gr.top}px,0);width:${tr.width}px;height:${tr.height}px;background:${t.dataset.color};opacity:0.15`
      }
    })
    grid.addEventListener('mouseleave', () => { hl.style.opacity = '0' })
  }

  /* ─── PATTERN 10: 3D Card Tilt (subtle, on doppel inner, no edge reveal) ─── */
  function init3DCardTilt() {
    document.querySelectorAll('.connect-card').forEach(card => {
      const inner = card.querySelector('.doppel')
      if (!inner) return
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width - 0.5
        const y = (e.clientY - r.top) / r.height - 0.5
        inner.style.transform = `rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`
        inner.style.transition = 'transform 0.08s ease'
      })
      card.addEventListener('mouseleave', () => {
        inner.style.transform = 'rotateY(0deg) rotateX(0deg)'
        inner.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1)'
      })
    })
  }

  /* ─── PATTERN 11: Physics Particle Explosion ─── */
  function initPhysicsExplosion() {
    const container = document.getElementById('footer-explosion')
    if (!container) return
    const colors = ['#8b5cf6', '#06b6d4', '#f59e0b', '#10b981', '#a78bfa', '#f472b6']
    let particles = [], animId = null, triggered = false

    class Particle {
      constructor(el, o) {
        this.el = el; this.x = 0; this.y = 0; this.r = 0
        this.g = o.gravity || 0.25; this.f = o.friction || 0.99
        const a = Math.random() * Math.PI * 2
        const force = (o.minForce || 3) + Math.random() * ((o.maxForce || 20) - (o.minForce || 3))
        this.vx = Math.cos(a) * force; this.vy = Math.sin(a) * force - (o.upward || 0); this.vr = (Math.random() - 0.5) * (o.rotSpeed || 10)
      }
      update() {
        this.vy += this.g; this.vx *= this.f; this.vy *= this.f; this.vr *= this.f
        this.x += this.vx; this.y += this.vy; this.r += this.vr
        this.el.style.transform = `translate3d(${this.x.toFixed(2)}px,${this.y.toFixed(2)}px,0) rotate(${this.r.toFixed(2)}deg)`
      }
    }

    function explode() {
      if (triggered) return; triggered = true; container.innerHTML = ''
      for (let i = 0; i < 8; i++) {
        const el = document.createElement('div')
        el.style.cssText = `position:absolute;bottom:0;width:60px;height:60px;left:${10 + Math.random() * 80}%;border-radius:50%;background:${colors[i % colors.length]};opacity:0.6`
        container.appendChild(el)
        particles.push(new Particle(el, { gravity: 0.2, friction: 0.98, minForce: 3, maxForce: 22, upward: 14, rotSpeed: 12 }))
      }
      function animate() {
        let done = true
        particles.forEach(p => { p.update(); if (p.y < container.clientHeight + 200) done = false })
        if (done) { cancelAnimationFrame(animId); particles = []; setTimeout(() => { triggered = false }, 800); return }
        animId = requestAnimationFrame(animate)
      }
      animate()
    }
    ScrollTrigger.create({ trigger: '#main-footer', start: 'top 75%', once: true, onEnter: explode })
  }

  /* ─── PATTERN 13: Block Grid Transition (colorful, full-screen fit, slow) ─── */
  function initBlockGridTransition() {
    const overlay = document.getElementById('block-grid-overlay')
    if (!overlay) return
    const s = 80
    const w = window.innerWidth, h = window.innerHeight
    const cols = Math.ceil(w / s), rows = Math.ceil(h / s)
    const offsetX = Math.floor((w - cols * s) / 2), offsetY = Math.floor((h - rows * s) / 2)
    function randomHue(i, j) {
      const base = (i * 17 + j * 31 + 137) % 360
      const drift = Math.sin(i * 0.7 + j * 1.3) * 50 + Math.cos(i * 0.3 - j * 0.9) * 30
      return Math.floor(((base + drift) % 360 + 360) % 360)
    }
    const frag = document.createDocumentFragment()
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const div = document.createElement('div')
      const h1 = randomHue(r, c), h2 = randomHue(r + 1, c + 1)
      div.style.cssText = `position:absolute;left:${offsetX + c * s}px;top:${offsetY + r * s}px;width:${s}px;height:${s}px;background:linear-gradient(180deg,hsl(${h1},65%,45%),hsl(${h2},60%,30%));opacity:1`
      frag.appendChild(div)
    }
    overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;pointer-events:none'
    overlay.appendChild(frag)
    gsap.to(overlay.children, { opacity: 0, duration: 0.12, stagger: { amount: 1.2, from: 'random' }, delay: 0.4, ease: 'expo.inOut', onComplete: () => { overlay.style.display = 'none' } })
  }

  /* ─── PATTERN 14: SVG Stroke Draw ─── */
  function initSVGDraw() {
    document.querySelectorAll('#deco-stroke-path, #deco-wave-path').forEach(path => {
      const len = path.getTotalLength()
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
      ScrollTrigger.create({ trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.5, onUpdate: (s) => gsap.set(path, { strokeDashoffset: len * (1 - s.progress) }) })
    })
  }

  /* ─── PATTERN 17: Footer Progress Bar (no pin — was hiding footer) ─── */
  function initPinnedFooter() {
    const footer = document.getElementById('main-footer')
    if (!footer) return
    const bar = document.createElement('div')
    bar.className = 'pinned-footer-progress'
    bar.style.cssText = 'position:absolute;top:-2px;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--accent),var(--accent-cyan));transform-origin:left;transform:scaleX(0);will-change:transform;z-index:3'
    footer.insertBefore(bar, footer.firstChild)
  }

  /* ─── PATTERN 18: Mobile Menu (GSAP stagger on existing element) ─── */
  function initMobileMenuGsap() {
    const hamburger = document.getElementById('hamburger-btn')
    const menu = document.getElementById('mobile-menu')
    const links = menu?.querySelectorAll('.mobile-menu-link')
    if (!hamburger || !menu || !links?.length) return

    menu.style.transition = 'none'
    links.forEach(l => { l.style.transition = 'none'; l.style.opacity = '0'; l.style.transform = 'translateY(48px) scale(0.92)' })

    gsap.set(menu, { opacity: 0, pointerEvents: 'none' })
    gsap.set(links, { y: 48, scale: 0.92, opacity: 0 })

    let isOpen = false
    function closeMenu() {
      if (!isOpen) return
      isOpen = false
      hamburger.classList.remove('active')
      hamburger.setAttribute('aria-expanded', 'false')
      document.body.style.overflow = ''
      gsap.to(links, { y: 48, scale: 0.92, opacity: 0, filter: 'blur(0px)', duration: 0.35, stagger: 0.05, ease: 'expo.inOut', overwrite: 'auto', onComplete: () => { gsap.set(menu, { pointerEvents: 'none', opacity: 0 }) } })
    }
    function openMenu() {
      if (isOpen) return
      isOpen = true
      hamburger.classList.add('active')
      hamburger.setAttribute('aria-expanded', 'true')
      document.body.style.overflow = 'hidden'
      gsap.set(menu, { opacity: 1, pointerEvents: 'auto', display: 'flex' })
      gsap.to(links, { y: 0, scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.6, stagger: 0.1, ease: 'expo.out', overwrite: 'auto' })
    }

    hamburger.addEventListener('click', () => { isOpen ? closeMenu() : openMenu() })

    // Link clicks close menu — no hamburger.click() to avoid toggle conflicts
    links.forEach(l => {
      l.addEventListener('click', (e) => {
        e.stopPropagation()
        closeMenu()
      })
    })
  }

  /* ─── PATTERN 19: Infinite SVG Text Path ─── */
  function initInfiniteTextPath() {
    document.querySelectorAll('.infinite-text-path').forEach(tp => {
      gsap.to(tp, { attr: { startOffset: '100%' }, duration: 45, ease: 'none', repeat: -1 })
    })
  }

  /* ─── CASCADE PROJECTS ─── */
  function renderCascadeProjects() {
    const stack = document.getElementById('projects-cascade')
    if (!stack || !SITE_CONFIG.projects) return
    const projects = SITE_CONFIG.projects
    const rotations = [-1.2, 1.8, -0.8, 2.1, -1.5, 0.9]
    const offsets = [0, 30, 60, 20, 50, 10]
    const zIndices = [6, 5, 4, 3, 2, 1]
    const styles = ['cascade-spotlight', 'cascade-bordered', '', 'cascade-glass', 'cascade-bordered-right', '']
    projects.forEach((p, i) => {
      const styleClass = styles[i % styles.length]
      const card = document.createElement('div')
      card.className = `cascade-card ${styleClass}`
      card.style.cssText = `--rotate:${rotations[i % rotations.length]}deg;--offset-y:${offsets[i % offsets.length]}px;--z:${zIndices[i % zIndices.length]};transition-delay:${i * 0.12}s`
      card.innerHTML = `<div class="doppel"><div class="doppel-inner"${styleClass === 'cascade-spotlight' ? ' style="background:rgba(139,92,246,0.04);border:1px solid rgba(139,92,246,0.08)"' : ''}><div class="cascade-card-header"><div class="cascade-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="${getIconPath(p.icon || 'folder')}"/></svg></div><span class="cascade-card-lang" style="${p.langColor ? 'color:' + p.langColor : ''}">${p.language || ''}</span></div><div class="cascade-card-name">${p.name}</div><div class="cascade-card-desc">${p.tagline || p.description}</div><div class="cascade-card-stats"><span class="cascade-card-stat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>${p.stars || 0}</span><span class="cascade-card-stat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3a3 3 0 00-3 3v12a3 3 0 003 3h12a3 3 0 003-3V6a3 3 0 00-3-3H6zm4 5h4M10 12h4M10 16h2"/></svg>${p.forks || 0}</span></div><div class="cascade-card-tags">${(p.tags || []).slice(0, 3).map(t => `<span class="cascade-card-tag">${t}</span>`).join('')}</div><a href="${p.url || '#'}" target="_blank" rel="noopener noreferrer" style="position:absolute;inset:0;z-index:1" aria-label="${p.name}"></a></div></div>`
      stack.appendChild(card)
    })
    const statsRow = document.getElementById('project-stats-row')
    if (statsRow && SITE_CONFIG.projectStats) {
      SITE_CONFIG.projectStats.forEach((s, i) => {
        const cardWrapper = document.createElement('div'); cardWrapper.className = 'stat-card'; cardWrapper.style.transitionDelay = `${i * 0.12}s`
        const isInfinity = s.target === '\u221E'
        cardWrapper.innerHTML = `<div class="stat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="${getStatIcon(s.icon || 'folder-open')}"/></svg></div><div class="stat-value${isInfinity ? ' infinity' : ''}" data-target="${s.target}">${isInfinity ? '\u221E' : '0'}</div><div class="stat-label">${s.label || ''}</div>`
        statsRow.appendChild(cardWrapper)
      })
      initStatCounters()
    }
    setTimeout(() => { observeReveal('.cascade-card'); observeReveal('.stat-card'); initCascadeTilt() }, 100)
  }

  function initCascadeTilt() {
    if (window.innerWidth <= 768) return
    document.querySelectorAll('.cascade-card').forEach(card => {
      const inner = card.querySelector('.doppel')
      if (!inner) return
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect()
        inner.style.cssText = `transform:perspective(800px) rotateY(${((e.clientX - r.left) / r.width - 0.5) * 6}deg) rotateX(${-((e.clientY - r.top) / r.height - 0.5) * 6}deg);transition:transform 0.15s cubic-bezier(0.23,1,0.32,1)`
      })
      card.addEventListener('mouseleave', () => { inner.style.cssText = 'transform:perspective(800px) rotateY(0deg) rotateX(0deg);transition:transform 0.5s cubic-bezier(0.23,1,0.32,1)' })
    })
  }

  /* ─── ICON HELPERS ─── */
  function getIconPath(name) {
    const icons = { 'crosshair': 'M12 2a10 10 0 1010 10M12 2a10 10 0 010 20M2 12h20M12 2v20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93', 'robot': 'M12 8V4m0 4a4 4 0 014 4v4a4 4 0 01-4 4m0-8a4 4 0 00-4 4v2M8 2l4 2 4-2M6 16h12M6 20h12', 'lightning': 'M13 2L3 14h9l-1 8 10-12h-9l1-8z', 'question': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8-8-3.59 8-8 8zm-1-6h2v2h-2zm0-2V8h2v4l-1 1h-1z', 'folder': 'M2 6a2 2 0 012-2h5l2 2h9a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6z', 'notebook': 'M4 2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2zm2 4h12M6 10h12M6 14h8M6 18h4' }
    return icons[name] || icons.folder
  }
  function getStatIcon(name) {
    const icons = { 'folder-open': 'M2 6a2 2 0 012-2h5l2 2h9a2 2 0 012 2v1M2 8l2.5 10.5A2 2 0 006.5 20h11a2 2 0 002-1.5L22 8', 'star': 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', 'push-pin': 'M12 2l4 6v4l2 2v2H6v-2l2-2V8l4-6zM10 18h4', 'infinity': 'M18.36 6.64a9 9 0 00-12.72 0M5.64 17.36a9 9 0 0012.72 0' }
    return icons[name] || icons['folder-open']
  }

  /* ─── MARQUEE ─── */
  function renderMarquee() {
    const track = document.getElementById('marquee-content')
    if (!track) return
    const items = SITE_CONFIG.techStack || []
    track.innerHTML = [...items, ...items].map(t => `<span class="marquee-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>${t.name}</span>`).join('')
  }

  /* ─── CRAFT ─── */
  function renderCraft() {
    const bio = document.getElementById('craft-bio')
    if (bio) { const p = bio.querySelector('p'); if (p) p.innerHTML = `hey, im <strong>notlousybook</strong> — a self-taught 15 yr old dev from pluto (not actually). i build stuff with code, mostly ai tools, creative coding projects, and whatever else feels interesting. some of it is even useful. also i play geometry dash.` }
    const statsGrid = document.getElementById('about-stats-grid')
    if (statsGrid && SITE_CONFIG.aboutStats) statsGrid.innerHTML = `<div class="craft-stats-grid">${SITE_CONFIG.aboutStats.map(s => `<div class="craft-stat"><div class="stat-value">${s.value}</div><div class="stat-label">${s.label}</div></div>`).join('')}</div>`
    const techGrid = document.getElementById('tech-grid')
    if (techGrid && SITE_CONFIG.techStack) techGrid.innerHTML = SITE_CONFIG.techStack.map(t => `<span class="craft-tech-item"><span class="tech-dot"></span>${t.name}</span>`).join('')
    observeReveal('.craft-piece')
  }

  /* ─── COLLAB ─── */
  function renderCollab() {
    const grid = document.getElementById('collab-grid')
    if (!grid || !SITE_CONFIG.collabCards) return
    grid.innerHTML = SITE_CONFIG.collabCards.map((c, i) => `<div class="connect-card" style="transition-delay:${i * 0.12}s"><div class="doppel"><div class="doppel-inner"><div class="connect-card-icon" style="color:${c.iconColor || 'var(--accent)'}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="${getCollabIcon(c.icon)}"/></svg></div><div class="connect-card-title">${c.title}</div><div class="connect-card-desc">${c.desc}</div></div></div></div>`).join('')
    observeReveal('.connect-card'); observeReveal('.connect-cta')
  }
  function getCollabIcon(name) {
    const icons = { 'puzzle-piece': 'M4 7a3 3 0 013-3h10a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7zm7 0v10M7 12h10', 'chat-text': 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10zM8 9h8M8 13h6', 'lightning': 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' }
    return icons[name] || icons.lightning
  }

  /* ─── INTERSECTION OBSERVER ─── */
  function observeReveal(selector) {
    const els = document.querySelectorAll(selector)
    if (!els.length) return
    const obs = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target) } }) }, { threshold: 0.08 })
    els.forEach(el => obs.observe(el))
  }

  /* ─── STAT COUNTER ─── */
  function initStatCounters() {
    document.querySelectorAll('.stat-card').forEach(card => {
      const valEl = card.querySelector('.stat-value')
      if (!valEl || !valEl.dataset.target) return
      const target = parseInt(valEl.dataset.target)
      if (isNaN(target)) return
      const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            obs.unobserve(entry.target)
            const start = performance.now()
            function tick(now) {
              const p = Math.min((now - start) / 1200, 1)
              valEl.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target)
              if (p < 1) requestAnimationFrame(tick); else valEl.textContent = target
            }
            requestAnimationFrame(tick)
          }
        })
      }, { threshold: 0.3 })
      obs.observe(card)
    })
  }

  document.getElementById('footer-year') && (document.getElementById('footer-year').textContent = new Date().getFullYear())

  /* ─── NAV ─── */
  function initNav() {
    const hamburger = document.getElementById('hamburger-btn')
    const mobileMenu = document.getElementById('mobile-menu')
    const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-link')
    if (!hamburger || !mobileMenu) return
    // Smooth scroll via Lenis for ALL nav links (desktop + mobile)
    navLinks.forEach(link => {
      link.addEventListener('click', e => {
        const href = link.getAttribute('href')
        if (href && href.startsWith('#') && lenis) {
          e.preventDefault()
          const target = document.querySelector(href)
          if (target) lenis.scrollTo(target, { offset: -60, duration: 1.4, easing: t => Math.min(1, 1 - Math.pow(1 - t, 3)) })
        }
      })
    })
    const sections = document.querySelectorAll('section[id]'), navItems = document.querySelectorAll('.nav-link')
    if (lenis) lenis.on('scroll', () => { let current = ''; sections.forEach(s => { if (s.getBoundingClientRect().top < 200) current = s.id }); navItems.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current)) })
  }

  /* ─── NAV HOVER EFFECT (desktop only — fullscreen blur + item text) ─── */
  function initNavHoverEffect() {
    if (window.innerWidth <= 768) return
    const links = document.querySelectorAll('.nav-link')
    if (!links.length) return
    let overlay = document.querySelector('.nav-hover-overlay')
    if (!overlay) {
      overlay = document.createElement('div')
      overlay.className = 'nav-hover-overlay'
      overlay.innerHTML = '<span class="nav-hover-text"></span>'
      document.body.appendChild(overlay)
    }
    const textEl = overlay.querySelector('.nav-hover-text')
    let hideTimer = null
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        clearTimeout(hideTimer)
        const txt = link.textContent.trim()
        if (textEl) textEl.textContent = txt
        overlay.classList.add('visible')
      })
      link.addEventListener('mouseleave', () => {
        hideTimer = setTimeout(() => { overlay.classList.remove('visible') }, 150)
      })
    })
    overlay.addEventListener('mouseenter', () => clearTimeout(hideTimer))
    overlay.addEventListener('mouseleave', () => { overlay.classList.remove('visible') })
  }

  /* ─── SECTION HEADER REVEALS (reverses on scroll up) ─── */
  function initSectionReveals() {
    document.querySelectorAll('.section .section-header').forEach(h => {
      gsap.fromTo(h, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: h.closest('.section'), start: 'top 85%', toggleActions: 'play none none reverse' } })
    })
  }

  /* ─── CURSOR GLOW ─── */
  function initCursorGlow() {
    const el = document.createElement('div')
    el.className = 'cursor-glow'; document.body.appendChild(el)
    let tx = 0, ty = 0, cx = 0, cy = 0
    document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; el.classList.add('visible') })
    document.addEventListener('mouseleave', () => el.classList.remove('visible'))
    function animate() { cx = lerp(cx, tx, 0.08); cy = lerp(cy, ty, 0.08); el.style.cssText += `left:${cx.toFixed(2)}px;top:${cy.toFixed(2)}px`; requestAnimationFrame(animate) }
    animate()
  }

  /* ─── HERO ENTRY (slowed) ─── */
  function initHeroEntry() {
    const title = document.querySelector('.hero-title')
    if (title) {
      const g1 = document.createElement('div'); g1.className = 'hero-glow-l'
      const g2 = document.createElement('div'); g2.className = 'hero-glow-r'
      title.appendChild(g1); title.appendChild(g2)
    }
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
    gsap.set('.hero-eyebrow, .hero-title, .hero-typewriter, .hero-actions .btn', { opacity: 0, y: 30 })
    tl.to('.hero-eyebrow', { y: 0, opacity: 1, duration: 1.4 }, 0.3)
      .to('.hero-title', { y: 0, opacity: 1, duration: 1.8 }, 0.6)
      .to('.hero-typewriter', { y: 0, opacity: 1, duration: 1.2 }, 1.0)
      .to('.hero-actions .btn', { y: 0, opacity: 1, duration: 1, stagger: 0.2 }, 1.4)
  }

  /* ─── INIT ─── */
  function init() {
    gsap.registerPlugin(ScrollTrigger)
    initSmoothScroll()
    initTypewriter()
    initHeroShader()
    initCursorGlow()
    renderCascadeProjects()
    renderMarquee()
    renderCraft()
    renderCollab()
    initNav()
    initHeroEntry()

    setTimeout(() => {
      initRotatingCycle()       // Pattern 3
      initExpandingGrid()       // Pattern 4
      initTextReveals()         // Pattern 5A
      initBlockReveal()         // Pattern 5B
      initParallelStagger()     // Pattern 5C
      initTiltSections()        // Pattern 6 (tilt only, no pin)
      initParallaxLerp()        // Pattern 7
      initImageTrail()          // Pattern 8
      initHoverHighlight()      // Pattern 9
      init3DCardTilt()          // Pattern 10
      initPhysicsExplosion()    // Pattern 11
      initBlockGridTransition() // Pattern 13
      initSVGDraw()             // Pattern 14
      initPinnedFooter()        // Pattern 17
      initMobileMenuGsap()      // Pattern 18
      initInfiniteTextPath()    // Pattern 19
      initNavHoverEffect()      // Nav hover blur

      ScrollTrigger.refresh()
    }, 50)

    observeReveal('.reveal')
    initSectionReveals()
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init)
  else init()
})()
