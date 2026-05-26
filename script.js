import * as THREE from 'three'

(() => {
  'use strict'

  let CONFIG = null

  const CFG = {
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

  const MARQUEE = {
    // camera
    fov: 50,
    far: 5000,
    camMult: 1.2,

    // ring
    radiusProp: 1.2,
    radiusMax: 6000,

    // pills
    pillScale: 1.8,
    fontSize: 28,
    padX: 80,
    padY: 20,

    // motion
    rotSpeed: 0.004,

    // depth fade
    fadeMin: 0.05,
  }

  let currentBeat = 0.08
  let beatSharp = 0
  let beatOnset = 0
  let audioReactiveReady = false
  let lenis = null
  const animCallbacks = []
  let animPaused = false

  const isMobile = window.innerWidth <= 768
  const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2
  const isDebug = navigator.hardwareConcurrency === undefined

  function initAnimDriver() {
    function tick() {
      if (!animPaused) {
        for (let i = 0; i < animCallbacks.length; i++) animCallbacks[i]()
      }
      requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
    document.addEventListener('visibilitychange', () => {
      animPaused = document.hidden
    })
  }

  function lerp(a, b, f) { return a + (b - a) * f }
  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)) }

  function getOffsetTop(el) {
    let top = 0
    do { top += el.offsetTop || 0; el = el.offsetParent } while (el)
    return top
  }

  function initTypewriter() {
    const el = document.getElementById('typewriter-text')
    if (!el) return
    const texts = CONFIG.hero.typewriterTexts || []
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

  function initHeroShader() {
    const canvas = document.getElementById('hero-canvas')
    if (!canvas) return
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
    camera.position.z = 1
    let renderer
    try {
      const pixelRatio = isLowEnd ? Math.min(devicePixelRatio, 1) : Math.min(devicePixelRatio, 2)
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' })
      renderer.setPixelRatio(pixelRatio)
    } catch (e) { canvas.style.display = 'none'; return }

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uBeat: { value: 0 },
    }
    const mouseTarget = { x: 0, y: 0 }

    function resizeCanvas() {
      const w = canvas.parentElement.clientWidth, h = canvas.parentElement.clientHeight
      renderer.setSize(w, h)
      const pr = isLowEnd ? Math.min(devicePixelRatio, 1) : Math.min(devicePixelRatio, 2)
      renderer.setPixelRatio(pr)
      uniforms.uResolution.value.set(renderer.domElement.width, renderer.domElement.height)
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    document.addEventListener('mousemove', e => {
      mouseTarget.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseTarget.y = -(e.clientY / window.innerHeight) * 2 + 1
    })
    animCallbacks.push(() => {
      uniforms.uMouse.value.x = lerp(uniforms.uMouse.value.x, mouseTarget.x, 0.06)
      uniforms.uMouse.value.y = lerp(uniforms.uMouse.value.y, mouseTarget.y, 0.06)
    })
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv;uniform float uTime;uniform vec2 uResolution;uniform vec2 uMouse;uniform float uBeat;

        mat2 rot(float a){return mat2(cos(a),sin(a),-sin(a),cos(a));}
        float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}

        void main(){
          vec2 uv=vUv;float ar=uResolution.x/uResolution.y;
          vec2 p=(uv-0.5)*vec2(ar,1.0);float t=uTime*0.13;

          float bp=1.0+uBeat*0.8;vec2 wp=p;
          wp.x+=sin(t*0.31+wp.y*2.4)*0.12*bp;
          wp.y+=cos(t*0.26+wp.x*2.4)*0.12*bp;
          p=mix(p,wp,0.3+sin(t*0.1)*0.25+uBeat*0.15);

          vec2 m=uMouse*0.35;
          m+=vec2(sin(t*0.16)*0.07,cos(t*0.13)*0.07);
          m+=uBeat*0.1;

          vec2 q=p*rot(sin(t*0.2)*0.55);
          float f1=sin(q.x*2.3+q.y*1.7+t*0.5+m.x)*cos(q.y*2.1-q.x*1.3+t*0.4+m.y);
          vec2 q2=p*rot(cos(t*0.16)*0.75+0.5);
          float f2=sin(q2.x*4.1+q2.y*3.3+t*0.7+uBeat*2.0)*cos(q2.y*3.7-q2.x*2.9+t*0.6+uBeat*1.5);
          vec2 q3=p*rot(sin(t*0.24)*0.65+1.1);
          float f3=sin(q3.x*7.7+q3.y*5.9+t*1.1)*cos(q3.y*6.3-q3.x*5.1+t*1.0);
          float r=length(p+m*0.25);
          float f4=sin(r*5.0-t*0.9)*0.5+cos(r*3.5+t*0.6)*0.5;

          float flow=(f1*0.35+f2*0.28+f3*0.22+f4*0.15)*(1.0+uBeat*0.3);
          flow=flow*0.5+0.5;flow=min(flow,1.0);

          vec3 dk1=vec3(0.03,0.01,0.06);vec3 dk2=vec3(0.10,0.03,0.15);
          vec3 mid=vec3(0.22,0.10,0.28);vec3 accent=vec3(0.55,0.37,0.96);
          vec3 cyan=vec3(0.02,0.71,0.83);

          vec3 col=mix(dk1,dk2,smoothstep(0.0,0.35,flow));
          col=mix(col,mid,smoothstep(0.25,0.6,flow));

          float hi=pow(sin(flow*14.0+t*0.9)*0.5+0.5,3.0);
          vec3 hc=mix(accent,cyan,sin(flow*5.0+t*0.4+uBeat*2.0)*0.5+0.5);
          col+=hc*hi*0.45*(1.0+uBeat*0.6);

          float rglow=exp(-r*2.5)*0.25*(1.0+uBeat*1.2);
          col+=accent*rglow*0.15;col+=cyan*rglow*0.08;

          float edg=length(p);
          col.r+=sin(edg*12.0-t*0.6)*0.015;
          col.b+=cos(edg*12.0+t*0.5)*0.015;

          col*=1.0-edg*0.55;

          float g=hash(uv*uResolution*0.01);
          col+=(g-0.5)*0.012;

          gl_FragColor=vec4(col,0.88);
        }
      `
    })
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
    scene.add(mesh)
    animCallbacks.push(() => { uniforms.uTime.value += 0.01; uniforms.uBeat.value = currentBeat; renderer.render(scene, camera) })
  }

  function initSmoothScroll() {
    if (typeof Lenis === 'undefined') return
    lenis = new Lenis({ duration: 1.8, easing: t => Math.min(1, 1 - Math.pow(1 - t, 3)), orientation: 'vertical', smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(time => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
  }

  function initRotatingCycle() {
    const orb = document.querySelector('.things-glow')
    if (!orb) return
    let currentCycle = 0
    const label = document.createElement('div')
    label.className = 'cycle-label active'
    label.textContent = CFG.cycleTexts[0]
    orb.appendChild(label)
    ScrollTrigger.create({
      trigger: '.things-section', start: 'top bottom', end: 'bottom top',
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

  function initExpandingGrid() {
    const grid = document.getElementById('tech-grid')
    if (!grid) return
    const items = grid.querySelectorAll('.things-tool-item')
    if (!items.length) return
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

  function initTextReveals() {
    if (typeof SplitType === 'undefined') return
    const targets = [
      { sel: '.section-title', trigger: '.section-header' },
      { sel: '.things-intro', trigger: '.things-container' },
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

  function initBlockReveal() {
    const pairs = [
      { el: document.querySelector('.things-mh-left'), color: 'var(--accent)' },
      { el: document.querySelector('.things-mh-right'), color: 'var(--accent-cyan)' },
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
        trigger: el.closest('.things-header') || el, start: 'top 85%', end: 'top 45%',
        scrub: 0.3, animation: tl
      })
    })
    document.querySelectorAll('.section-eyebrow, .section-desc, .things-tool-header, .stat-label, .footer-tagline').forEach(el => {
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

  function initParallelStagger() {
    const bio = document.querySelector('.things-piece-bio p')
    if (!bio || typeof SplitType === 'undefined') return
    const split = new SplitType(bio, { types: 'lines,chars' })
    split.lines.forEach(line => {
      line.querySelectorAll('.char').forEach((char, i) => {
        gsap.fromTo(char, { y: '100%', opacity: 0 }, {
          y: '0%', opacity: 1, duration: 1.0, ease: 'expo.out', delay: i * 0.06,
          scrollTrigger: { trigger: bio.closest('.things-piece'), start: 'top 85%', toggleActions: 'play none none reverse' }
        })
      })
    })
  }

  function initTiltSections() {
    document.querySelectorAll('.section').forEach(section => {
      const container = section.querySelector('.section-container')
      if (!container) return
      gsap.fromTo(container,
        { rotation: -1.5, transformOrigin: 'bottom left' },
        { rotation: 0, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'top 30%', scrub: true } }
      )
    })
  }

  function initParallaxLerp() {
    document.querySelectorAll('.hero-bg-image, .marquee-bg-image, .things-bg-image, .collab-bg-image').forEach(bg => {
      const speed = bg.classList.contains('hero-bg-image') ? 0.08 : 0.04
      let targetY = 0, currentY = 0
      ScrollTrigger.create({
        trigger: bg.parentElement, start: 'top bottom', end: 'bottom top',
        onUpdate: () => {
          const rect = bg.parentElement.getBoundingClientRect()
          targetY = (window.scrollY - (rect.top + window.scrollY)) * speed
        }
      })
      animCallbacks.push(() => {
        currentY = lerp(currentY, targetY, CFG.lerpFactor)
        bg.style.transform = `translate3d(0, ${currentY.toFixed(2)}px, 0)`
      })
    })
  }

  function initHoverHighlight() {
    const grid = document.getElementById('tech-grid')
    if (!grid) return
    const items = grid.querySelectorAll('.things-tool-item')
    if (!items.length) return
    const hl = document.createElement('div')
    hl.className = 'highlight-tracker'
    grid.style.position = 'relative'
    grid.appendChild(hl)
    const colors = ['#8b5cf6', '#06b6d4', '#f59e0b', '#10b981']
    items.forEach((item, i) => { item.dataset.color = colors[i % colors.length] })
    grid.addEventListener('mousemove', e => {
      const t = document.elementFromPoint(e.clientX, e.clientY)?.closest('.things-tool-item')
      if (t) {
        const tr = t.getBoundingClientRect(), gr = grid.getBoundingClientRect()
        hl.style.cssText = `transform:translate3d(${tr.left - gr.left}px,${tr.top - gr.top}px,0);width:${tr.width}px;height:${tr.height}px;background:${t.dataset.color};opacity:0.15`
      }
    })
    grid.addEventListener('mouseleave', () => { hl.style.opacity = '0' })
  }

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

  function initPhysicsExplosion() {
    const container = document.getElementById('footer-explosion')
    if (!container) return
    const colors = ['#8b5cf6', '#06b6d4', '#f59e0b', '#10b981', '#a78bfa', '#f472b6']
    let particles = [], animId = null, triggered = false

    class Particle {
      constructor(el, o) {
        this.el = el; this.x = 0; this.y = 0; this.r = 0
        this.gravity = o.gravity || 0.15
        this.friction = o.friction || 0.97
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.8
        const force = (o.minForce || 3) + Math.random() * ((o.maxForce || 20) - (o.minForce || 3))
        this.vx = Math.cos(angle) * force
        this.vy = Math.sin(angle) * force
        this.vr = (Math.random() - 0.5) * (o.rotationSpeed || 8)
      }
      update() {
        this.vy += this.gravity
        this.vx *= this.friction
        this.vy *= this.friction
        this.vr *= this.friction
        this.x += this.vx
        this.y += this.vy
        this.r += this.vr
        this.el.style.transform = `translate3d(${this.x.toFixed(2)}px,${this.y.toFixed(2)}px,0) rotate(${this.r.toFixed(2)}deg)`
      }
    }

    function explode() {
      if (triggered) return
      triggered = true
      container.innerHTML = ''
      const containerH = container.offsetHeight
      for (let i = 0; i < 12; i++) {
        const el = document.createElement('div')
        const size = 20 + Math.random() * 40
        const startX = Math.random() * 80 + 10
        const startY = containerH * (0.3 + Math.random() * 0.5)
        el.style.cssText = `position:absolute;width:${size}px;height:${size}px;left:${startX}%;top:${startY}px;border-radius:${Math.random() > 0.5 ? '50%' : '4px'};background:${colors[i % colors.length]};opacity:${0.4 + Math.random() * 0.4}`
        container.appendChild(el)
        particles.push(new Particle(el, {
          gravity: 0.12 + Math.random() * 0.1,
          friction: 0.96 + Math.random() * 0.02,
          minForce: 5,
          maxForce: 18 + Math.random() * 10,
          upward: 0,
          rotationSpeed: 6 + Math.random() * 8
        }))
      }
      function animate() {
        let done = true
        particles.forEach(p => {
          p.update()
          const opacity = Math.max(0, 1 - (p.y + 100) / (container.clientHeight + 300))
          p.el.style.opacity = opacity.toFixed(2)
          if (p.y < container.clientHeight + 200 && opacity > 0.01) done = false
        })
        if (done) {
          cancelAnimationFrame(animId)
          particles = []
          setTimeout(() => { triggered = false }, 800)
          return
        }
        animId = requestAnimationFrame(animate)
      }
      animate()
    }
    ScrollTrigger.create({ trigger: '#main-footer', start: 'top 85%', once: true, onEnter: explode })
  }

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
    overlay.style.cssText = 'position:fixed;inset:0;z-index:9998;pointer-events:none'
    overlay.appendChild(frag)
    overlay._blocksReady = true
  }

  function playBlockGridExit() {
    const overlay = document.getElementById('block-grid-overlay')
    if (!overlay || !overlay._blocksReady) return
    gsap.to(overlay.children, { opacity: 0, duration: 0.12, stagger: { amount: 1.2, from: 'random' }, delay: 0.4, ease: 'expo.inOut', onComplete: () => { overlay.style.display = 'none' } })
  }

  function initSVGDraw() {
    const svg = document.querySelector('.deco-svg')
    document.querySelectorAll('#deco-stroke-path, #deco-wave-path').forEach(path => {
      path.style.opacity = '1'
      const len = path.getTotalLength()
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        }
      })
    })
    if (svg) {
      gsap.to(svg, {
        y: 80,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        }
      })
      gsap.to(svg, {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.things-section',
          start: 'top bottom',
          end: 'top 20%',
          scrub: 0.5,
        }
      })
    }
  }

  function initPinnedFooter() {
    const footer = document.getElementById('main-footer')
    if (!footer) return
    const bar = document.createElement('div')
    bar.className = 'pinned-footer-progress'
    bar.style.cssText = 'position:absolute;top:-2px;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--accent),var(--accent-cyan));transform-origin:left;transform:scaleX(0);will-change:transform;z-index:3'
    footer.insertBefore(bar, footer.firstChild)
    gsap.to(bar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '#main-footer',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      }
    })
  }

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

    links.forEach(l => {
      l.addEventListener('click', (e) => {
        e.stopPropagation()
        closeMenu()
      })
    })
  }

  function initInfiniteTextPath() {
    const els = document.querySelectorAll('.infinite-text-path')
    if (!els.length) return
    const offsets = new Array(els.length).fill(0)
    animCallbacks.push(() => {
      for (let i = 0; i < els.length; i++) {
        offsets[i] = (offsets[i] + 0.04) % 100
        els[i].setAttribute('startOffset', offsets[i] + '%')
      }
    })
  }

  function renderCascadeProjects() {
    const stack = document.getElementById('projects-cascade')
    if (!stack || !CONFIG.projects) return
    const projects = CONFIG.projects
    const rotations = [-1.2, 1.8, -0.8, 2.1, -1.5, 0.9]
    const offsets = [0, 30, 60, 20, 50, 10]
    const zIndices = [6, 5, 4, 3, 2, 1]
    const styles = ['cascade-spotlight', 'cascade-bordered', '', 'cascade-glass', 'cascade-bordered-right', '']

    const frag = document.createDocumentFragment()
    projects.forEach((p, i) => {
      const styleClass = styles[i % styles.length]
      const card = document.createElement('div')
      card.className = `cascade-card ${styleClass}`
      card.style.cssText = `--rotate:${rotations[i % rotations.length]}deg;--offset-y:${offsets[i % offsets.length]}px;--z:${zIndices[i % zIndices.length]};transition-delay:${i * 0.12}s`
      card.innerHTML = `<div class="doppel"><div class="doppel-inner"${styleClass === 'cascade-spotlight' ? ' style="background:rgba(139,92,246,0.04);border:1px solid rgba(139,92,246,0.08)"' : ''}><div class="cascade-card-header"><div class="cascade-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="${getIconPath(p.icon || 'folder')}"/></svg></div><span class="cascade-card-lang" style="${p.langColor ? 'color:' + p.langColor : ''}">${p.language || ''}</span></div><div class="cascade-card-name">${p.name}</div><div class="cascade-card-desc">${p.tagline || p.description}</div><div class="cascade-card-stats"><span class="cascade-card-stat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>${p.stars || 0}</span><span class="cascade-card-stat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3a3 3 0 00-3 3v12a3 3 0 003 3h12a3 3 0 003-3V6a3 3 0 00-3-3H6zm4 5h4M10 12h4M10 16h2"/></svg>${p.forks || 0}</span></div><div class="cascade-card-tags">${(p.tags || []).slice(0, 3).map(t => `<span class="cascade-card-tag">${t}</span>`).join('')}</div><a href="${p.url || '#'}" target="_blank" rel="noopener noreferrer" style="position:absolute;inset:0;z-index:1" aria-label="${p.name}"></a></div></div>`
      frag.appendChild(card)
    })
    stack.appendChild(frag)
    const statsRow = document.getElementById('project-stats-row')
    if (statsRow && CONFIG.projectStats) {
      CONFIG.projectStats.forEach((s, i) => {
        const cardWrapper = document.createElement('div'); cardWrapper.className = 'stat-card'; cardWrapper.style.transitionDelay = `${i * 0.12}s`
        const isInfinity = s.target === '\u221E'
        cardWrapper.innerHTML = `<div class="stat-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="${getStatIcon(s.icon || 'folder-open')}"/></svg></div><div class="stat-value${isInfinity ? ' infinity' : ''}" data-target="${s.target}">${isInfinity ? '\u221E' : '0'}</div><div class="stat-label">${s.label || ''}</div>`
        statsRow.appendChild(cardWrapper)
      })
      initStatCounters()
    }
    requestAnimationFrame(() => { observeReveal('.cascade-card'); observeReveal('.stat-card'); initCascadeTilt() })
  }

  function initCascadeTilt() {
    if (isMobile) return
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

  function getIconPath(name) {
    const icons = { 'crosshair': 'M12 2a10 10 0 1010 10M12 2a10 10 0 010 20M2 12h20M12 2v20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93', 'robot': 'M12 8V4m0 4a4 4 0 014 4v4a4 4 0 01-4 4m0-8a4 4 0 00-4 4v2M8 2l4 2 4-2M6 16h12M6 20h12', 'lightning': 'M13 2L3 14h9l-1 8 10-12h-9l1-8z', 'question': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8-8-3.59 8-8 8zm-1-6h2v2h-2zm0-2V8h2v4l-1 1h-1z', 'folder': 'M2 6a2 2 0 012-2h5l2 2h9a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6z', 'notebook': 'M4 2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2zm2 4h12M6 10h12M6 14h8M6 18h4' }
    return icons[name] || icons.folder
  }
  function getStatIcon(name) {
    const icons = { 'folder-open': 'M2 6a2 2 0 012-2h5l2 2h9a2 2 0 012 2v1M2 8l2.5 10.5A2 2 0 006.5 20h11a2 2 0 002-1.5L22 8', 'star': 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', 'push-pin': 'M12 2l4 6v4l2 2v2H6v-2l2-2V8l4-6zM10 18h4', 'infinity': 'M18.36 6.64a9 9 0 00-12.72 0M5.64 17.36a9 9 0 0012.72 0' }
    return icons[name] || icons['folder-open']
  }

  function renderMarquee() {
    const items = CONFIG.techStack || []
    if (!items.length) return
    initMarquee3D(items)
  }
  function initMarquee3D(items) {
    const container = document.querySelector('.marquee-section')
    if (!container) return
    const oldTrack = document.getElementById('marquee-content')
    if (oldTrack) oldTrack.style.display = 'none'

    let renderer, scene, camera, group, animFn, ro

    function createPillTexture(text) {
      const c = document.createElement('canvas')
      const ctx = c.getContext('2d')
      ctx.font = `500 ${MARQUEE.fontSize}px "Cabinet Grotesk", system-ui, sans-serif`
      const tw = ctx.measureText(text).width
      c.width = tw + MARQUEE.padX * 2
      c.height = MARQUEE.fontSize + MARQUEE.padY * 2 + 2
      const ctx2 = c.getContext('2d')
      const r = c.height / 2
      ctx2.beginPath(); ctx2.roundRect(0, 0, c.width, c.height, r); ctx2.closePath()
      ctx2.fillStyle = 'rgba(255,255,255,0.03)'
      ctx2.fill()
      ctx2.strokeStyle = 'rgba(255,255,255,0.06)'
      ctx2.lineWidth = 1; ctx2.stroke()
      ctx2.fillStyle = '#888'
      ctx2.font = `500 ${MARQUEE.fontSize}px "Cabinet Grotesk", system-ui, sans-serif`
      ctx2.textAlign = 'center'; ctx2.textBaseline = 'middle'
      ctx2.fillText(text, c.width / 2, c.height / 2)
      const tex = new THREE.CanvasTexture(c)
      tex.minFilter = THREE.LinearFilter
      return { tex, w: c.width, h: c.height }
    }

    function setup() {
      cleanup()
      const w = container.clientWidth, h = container.clientHeight
      if (w < 1 || h < 1) return
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(MARQUEE.fov, w / h, 0.1, MARQUEE.far)
      const radius = Math.min(w * MARQUEE.radiusProp, MARQUEE.radiusMax)
      camera.position.set(0, 0, radius * MARQUEE.camMult)
      camera.lookAt(0, 0, 0)

      const pr = isLowEnd ? Math.min(devicePixelRatio, 1) : Math.min(devicePixelRatio, 2)
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' })
      renderer.setSize(w, h)
      renderer.setPixelRatio(pr)
      renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;z-index:1'
      container.appendChild(renderer.domElement)

      group = new THREE.Group()
      const count = items.length
      items.forEach((item, i) => {
        const { tex, w: tw, h: th } = createPillTexture(item.name)
        const s = MARQUEE.pillScale
        const geo = new THREE.PlaneGeometry(tw * s, th * s)
        const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, side: THREE.DoubleSide })
        const mesh = new THREE.Mesh(geo, mat)
        const angle = (i / count) * Math.PI * 2
        mesh.position.set(Math.sin(angle) * radius, 0, Math.cos(angle) * radius)
        mesh.lookAt(mesh.position.x * 2, 0, mesh.position.z * 2)
        group.add(mesh)
      })
      scene.add(group)

      const _v = new THREE.Vector3()
      animFn = () => {
        group.rotation.y += MARQUEE.rotSpeed
        const camZ = camera.position.z
        group.children.forEach(mesh => {
          mesh.getWorldPosition(_v)
          const depth = camZ - _v.z
          const t = (depth - radius) / (radius * 2)
          mesh.material.opacity = 1.0 - t * (1 - MARQUEE.fadeMin)
        })
        renderer.render(scene, camera)
      }
      animCallbacks.push(animFn)
    }

    function cleanup() {
      if (animFn) { const i = animCallbacks.indexOf(animFn); if (i > -1) animCallbacks.splice(i, 1); animFn = null }
      if (renderer) { renderer.domElement.remove(); renderer.dispose(); renderer = null }
      if (scene) { scene.traverse(c => { if (c.isMesh) { c.geometry.dispose(); c.material.map?.dispose(); c.material.dispose() } }); scene = null }
    }

    setup()
    ro = new ResizeObserver(() => setup())
    ro.observe(container)
  }

  function renderCraft() {
    const bio = document.getElementById('things-bio')
    if (bio) { const p = bio.querySelector('p'); if (p) p.innerHTML = `hi lol, im <strong>notlousybook</strong> i think, a self-taught (&lt;-lie) 15 yr old developer coding random shi i pulled out of my ahh when i was sleeping or smthing, like putting my well paid ai workers (bro uses free tier tho) to code up the most random ahh code and repos, dw tho i make good quality assurace, i hate most quality skills and plugins or whatever i stay RAW, no no thats not what i meant don't get any idea YOU BAKA, ahhhh what is this portfolio, i'm never getting hired 😔✌️, (if u read this congrats ig idk for what reason tho, what else do i even put here atp 😭, this shi looks best with microsoft fluent emoji's btw and yes i glaze microsoft and whatever windows 11 or edge i love edging sm twin, i love people stealing all me data [&lt;- pirate lousy here]). Funfact i don't sell shi cuz i don't have a bank card or paypal or whatever but not like my projects get any attention anyway, if u looked at my site this much THANK YOU SO MUCH FOR READING THROUGH THIS I WOULD LOWK MARRY YOU IF U KNEW ME NGL THANK UUUU.` }
    const statsGrid = document.getElementById('about-stats-grid')
    if (statsGrid && CONFIG.aboutStats) statsGrid.innerHTML = `<div class="things-stats-grid">${CONFIG.aboutStats.map(s => `<div class="things-stat"><div class="stat-value">${s.value}</div><div class="stat-label">${s.label}</div></div>`).join('')}</div>`
    const techGrid = document.getElementById('tech-grid')
    if (techGrid && CONFIG.techStack) {
      const iconMap = {
        'Python':'python','JavaScript':'javascript','TypeScript':'typescript',
        'Three.js':'threedotjs','PyWebView':'python','Next.js':'nextdotjs',
        'Discord.py':'discord','Git':'git','HTML/CSS':'html5',
        'DeepSeek':'deepseek'
      }
      techGrid.innerHTML = CONFIG.techStack.map(t => {
        const slug = iconMap[t.name]
        const icon = slug
          ? `<img class="tech-icon" src="https://cdn.simpleicons.org/${slug}" alt="" loading="lazy" />`
          : `<span class="tech-dot"></span>`
        return `<span class="things-tool-item">${icon}${t.name}</span>`
      }).join('')
    }
    observeReveal('.things-piece')
  }

  function renderCollab() {
    const grid = document.getElementById('collab-grid')
    if (!grid || !CONFIG.collabCards) return
    grid.innerHTML = CONFIG.collabCards.map((c, i) => `<div class="connect-card" style="transition-delay:${i * 0.12}s"><div class="doppel"><div class="doppel-inner"><div class="connect-card-icon" style="color:${c.iconColor || 'var(--accent)'}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="${getCollabIcon(c.icon)}"/></svg></div><div class="connect-card-title">${c.title}</div><div class="connect-card-desc">${c.desc}</div></div></div></div>`).join('')
    observeReveal('.connect-card'); observeReveal('.connect-cta')
  }
  function getCollabIcon(name) {
    const icons = { 'puzzle-piece': 'M4 7a3 3 0 013-3h10a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7zm7 0v10M7 12h10', 'chat-text': 'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10zM8 9h8M8 13h6', 'lightning': 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' }
    return icons[name] || icons.lightning
  }

  function observeReveal(selector) {
    const els = document.querySelectorAll(selector)
    if (!els.length) return
    const obs = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target) } }) }, { threshold: 0.08 })
    els.forEach(el => obs.observe(el))
  }

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

  function initNav() {
    const hamburger = document.getElementById('hamburger-btn')
    const mobileMenu = document.getElementById('mobile-menu')
    const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-link')
    if (!hamburger || !mobileMenu) return
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

  function initNavHoverEffect() {
    if (isMobile) return
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

  function initSectionReveals() {
    document.querySelectorAll('.section .section-header').forEach(h => {
      gsap.fromTo(h, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: h.closest('.section'), start: 'top 85%', toggleActions: 'play none none reverse' } })
    })
  }

  function initCursorGlow() {
    if (isMobile) return
    const el = document.createElement('div')
    el.className = 'cursor-glow'; document.body.appendChild(el)
    let tx = 0, ty = 0, cx = 0, cy = 0
    document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; el.classList.add('visible') })
    document.addEventListener('mouseleave', () => el.classList.remove('visible'))
    animCallbacks.push(() => { cx = lerp(cx, tx, 0.08); cy = lerp(cy, ty, 0.08); el.style.cssText += `left:${cx.toFixed(2)}px;top:${cy.toFixed(2)}px` })
  }
  // ─── IndexedDB Audio Cache ───
  const DB_NAME = 'LousyWebCache', DB_VER = 1, STORE = 'audio'
  function dbOpen() {
    return new Promise((res, rej) => {
      const r = indexedDB.open(DB_NAME, DB_VER)
      r.onupgradeneeded = e => { const d = e.target.result; if (!d.objectStoreNames.contains(STORE)) d.createObjectStore(STORE, { keyPath: 'id' }) }
      r.onsuccess = e => res(e.target.result)
      r.onerror = e => rej(e.target.error)
    })
  }
  async function cacheGet(id) { try { const db = await dbOpen(); return new Promise((res, rej) => { const t = db.transaction(STORE, 'readonly'), r = t.objectStore(STORE).get(id); r.onsuccess = () => res(r.result?.blob || null); r.onerror = () => res(null) }) } catch { return null } }
  async function cacheSet(id, blob) { try { const db = await dbOpen(); return new Promise((res, rej) => { const t = db.transaction(STORE, 'readwrite'); t.objectStore(STORE).put({ id, blob, ts: Date.now() }); t.oncomplete = res; t.onerror = rej }) } catch {} }

  // ─── Toast System ───
  function showToast(msg, type = 'info', duration = 4000) {
    const c = document.getElementById('toast-container')
    if (!c) return
    const el = document.createElement('div')
    el.className = `toast toast-${type}`
    el.textContent = msg
    c.appendChild(el)
    setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 400) }, duration)
  }

  function initAudioReactivity() {
    const video = document.getElementById('bg-music')
    const overlay = document.getElementById('start-overlay')
    const loaderStatus = document.getElementById('loader-audio-status')
    const progressLine = document.getElementById('start-progress-line')
    const promptEl = document.getElementById('start-prompt')
    if (!video || !overlay) return

    let audioCtx, source, analyzer, filter, gain, dataArray, bufferLength
    const BASS_BINS_PCT = 0.1
    let bassBins = 0
    let started = false
    let videoSrcSet = false

    function setupAudioCtx() {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)()
        source = audioCtx.createMediaElementSource(video)
        analyzer = audioCtx.createAnalyser()
        analyzer.fftSize = 256
        filter = audioCtx.createBiquadFilter()
        filter.type = 'lowpass'; filter.frequency.value = 3200; filter.Q.value = 0.707
        gain = audioCtx.createGain()
        gain.gain.value = 1.0
        source.connect(analyzer); analyzer.connect(gain); gain.connect(filter); filter.connect(audioCtx.destination)
        bufferLength = analyzer.frequencyBinCount
        bassBins = Math.max(1, Math.floor(bufferLength * BASS_BINS_PCT))
        dataArray = new Uint8Array(bufferLength)
      } catch (e) {
        console.warn('Audio setup failed:', e)
        overlay.classList.add('hidden')
      }
    }

    function startPlayback() {
      if (started || !audioCtx) return
      started = true; audioStartTime = performance.now(); audioReactiveReady = true
      audioCtx.resume().then(() => video.play().catch(() => {})).catch(() => {})
      overlay.classList.add('warping')
      setTimeout(() => overlay.classList.add('hidden'), 750)
    }

    let audioStartTime = 0

    function updateProgress(pct, label) {
      if (progressLine) progressLine.style.width = Math.min(pct, 100) + '%'
      if (loaderStatus) {
        const dot = loaderStatus.querySelector('.loader-audio-dot')
        const txt = loaderStatus.querySelector('.loader-audio-text')
        if (txt) txt.textContent = label || 'preparing audio'
        if (dot) dot.style.animationPlayState = pct >= 100 ? 'paused' : 'running'
      }
    }

    function setVideoSrc(blob) {
      const url = URL.createObjectURL(blob)
      video.src = url
      videoSrcSet = true
    }

    function markReady() {
      overlay.classList.add('ready')
      if (promptEl) promptEl.textContent = 'click to start or somthing'
    }

    // ── Smart load logic ──
    ;(async () => {
      const cacheKey = 'audio_discord_checkpoint'
      const sourceUrl = video.querySelector('source')?.src
      if (!sourceUrl) return

      // 1. Try cache
      const cachedBlob = await cacheGet(cacheKey)
      if (cachedBlob) {
        updateProgress(100, "loaded from cache (i'm in ur browser)")
        setVideoSrc(cachedBlob)
        markReady()
        showToast('Audio ready (cached in my ahh)', 'success', 2500)
        return
      }

      // 2. Stream download with speed tracking
      try {
        const response = await fetch(sourceUrl)
        const total = +response.headers.get('Content-Length') || 0
        const reader = response.body.getReader()
        const chunks = []
        let downloaded = 0
        let startTime = performance.now()
        const speeds = []
        let readyToPlay = false
        let slowWarned = false
        let lastToastPct = 0

        // Estimate: 175kbps ≈ 22KB/s
        const EST_BITRATE_KBPS = 22

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          chunks.push(value)
          downloaded += value.length
          const elapsed = (performance.now() - startTime) / 1000
          const instantSpeed = (downloaded / 1024) / Math.max(elapsed, 0.1)
          speeds.push(instantSpeed)
          if (speeds.length > 30) speeds.shift()
          const avgSpeed = speeds.reduce((a, b) => a + b, 0) / speeds.length

          const pct = total ? Math.round(downloaded / total * 100) : 0
          const speedRatio = avgSpeed / EST_BITRATE_KBPS
          const bufferedSec = (downloaded / 1024) / EST_BITRATE_KBPS
          const needBuf = speedRatio < 0.8 ? 15 : speedRatio < 1.5 ? 8 : 3
          const label = `syncing audio ${pct}% (wtf is ts)`

          updateProgress(pct, label)

          // Download progress toast
          const toastPct = [25, 50, 75].find(t => pct >= t && lastToastPct < t)
          if (toastPct) { lastToastPct = toastPct; showToast(`Audio ${toastPct}% downloaded${toastPct === 75 ? ' guh' : ''}`, 'info', 2000) }

          // Check if we have enough buffer to play
          if (!readyToPlay && pct >= 5 && bufferedSec >= needBuf) {
            readyToPlay = true
            const partialBlob = new Blob(chunks, { type: 'audio/mpeg' })
            setVideoSrc(partialBlob)
            markReady()
          }

          // Slow connection warning
          if (!slowWarned && pct >= 10 && speedRatio < 0.5 && pct < 80) {
            slowWarned = true
            showToast('Slow connection — audio may stutter (brother from another mother)', 'warning', 5000)
          }
        }

        // Full download complete
        const fullBlob = new Blob(chunks, { type: 'audio/mpeg' })

        if (!readyToPlay) {
          setVideoSrc(fullBlob)
          markReady()
        } else if (videoSrcSet) {
          // We already set a blob URL, need to update. Create new one; old will be GC'd
          video.src = URL.createObjectURL(fullBlob)
        }

        updateProgress(100, 'audio ready (ig vro)')
        cacheSet(cacheKey, fullBlob)
        showToast('Audio fully loaded ✓ (yah enjoy)', 'success', 3000)

      } catch (e) {
        console.warn('Audio smart-load failed:', e)
        showToast('Audio may not play (what is your internet twin)', 'warning', 5000)
        // Fallback: let the video element use its original src
        video.load()
        markReady()
      }
    })()

    // ── Click handler ──
    function onClick() {
      if (!overlay.classList.contains('ready')) return
      setupAudioCtx()
      startPlayback()
      setTimeout(playBlockGridExit, 100)
    }
    overlay.addEventListener('click', onClick, { once: true })

    // ── Beat analysis loop ──
    let beatRunningAvg = 0.15
    let lastBeatTime = performance.now()
    const BEAT_COOLDOWN = 250

    animCallbacks.push(() => {
      if (!started || !analyzer || !dataArray) return
      analyzer.getByteFrequencyData(dataArray)

      let bassSum = 0
      for (let i = 0; i < bassBins; i++) bassSum += dataArray[i]
      const bass = bassSum / (bassBins * 255)

      let avgSum = 0
      for (let i = 0; i < bufferLength; i++) avgSum += dataArray[i]
      const avgAll = avgSum / (bufferLength * 255)

      const raw = bass * 0.6 + avgAll * 0.4
      const beat = clamp(raw, 0, 1)
      currentBeat = Math.max(0.08, currentBeat * 0.55 + beat * 0.45)

      // Running average for onset detection
      beatRunningAvg = beatRunningAvg * 0.92 + beat * 0.08

      // Warmup: skip onset detection for first 2s to let running avg stabilize
      const warmedUp = audioStartTime > 0 && performance.now() - audioStartTime > 2000

      // Onset — energy spike above running average
      const onset = beat / Math.max(beatRunningAvg, 0.01)
      const now = performance.now()
      const hit = warmedUp && onset > 1.4 && now - lastBeatTime > BEAT_COOLDOWN

      // UNIFORM beatSharp: fires at FULL 1.0 on every detected beat
      // no more weak vs strong variance — every beat hits the same intensity
      if (hit) {
        beatOnset = 1
        beatSharp = 1.0
        lastBeatTime = now
      } else {
        beatOnset *= 0.85
        beatSharp = Math.max(0, beatSharp * 0.88)
      }

      document.documentElement.style.setProperty('--beat', currentBeat.toFixed(3))
      document.documentElement.style.setProperty('--beat-sharp', beatSharp.toFixed(3))
    })
  }

  function initHeroEntry() {
    const title = document.querySelector('.hero-title')
    if (title) {
      const g1 = document.createElement('div'); g1.className = 'hero-glow-l'
      const g2 = document.createElement('div'); g2.className = 'hero-glow-r'
      title.appendChild(g1); title.appendChild(g2)
    }
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
    gsap.set('.hero-eyebrow, .hero-title-group, .hero-typewriter, .hero-actions .btn', { opacity: 0, y: 30 })
    tl.to('.hero-eyebrow', { y: 0, opacity: 1, duration: 1.4 }, 0.3)
      .to('.hero-title-group', { y: 0, opacity: 1, duration: 1.8 }, 0.6)
      .to('.hero-typewriter', { y: 0, opacity: 1, duration: 1.2 }, 1.0)
      .to('.hero-actions .btn', { y: 0, opacity: 1, duration: 1, stagger: 0.2 }, 1.4)
  }

  async function loadDiscordAvatar() {
    const img = document.getElementById('pfp-avatar')
    if (!img || !CONFIG.discordId) return
    try {
      const res = await fetch(`https://japi.rest/discord/v1/user/${CONFIG.discordId}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      const hash = json?.data?.avatar
      if (hash) {
        const ext = hash.startsWith('a_') ? 'gif' : 'png'
        img.src = `https://cdn.discordapp.com/avatars/${CONFIG.discordId}/${hash}.${ext}`
        img.onload = () => img.classList.add('loaded')
      }
    } catch {
      console.warn('Failed to load Discord avatar')
    }
  }

  function initHeroScrollPhases() {
    const hero = document.querySelector('.hero')
    if (!hero) return
    const heroBg = document.querySelector('.hero-bg-image')
    const heroOverlay = document.querySelector('.hero-overlay')
    const heroCanvas = document.getElementById('hero-canvas')
    const pinHeight = window.innerHeight * 0.6
    ScrollTrigger.create({
      trigger: hero,
      start: 'bottom bottom',
      end: `+=${pinHeight}`,
      pin: true,
      pinSpacing: true,
      scrub: 0.3,
      onUpdate: (self) => {
        const p = self.progress
        const phase1 = Math.min(p / 0.5, 1)
        const phase2 = Math.max(0, (p - 0.5) / 0.5)
        if (heroOverlay) {
          heroOverlay.style.opacity = (1 - phase1 * 0.6).toFixed(3)
          heroOverlay.style.transform = `translateY(${-phase1 * 80}px) scale(${1 - phase1 * 0.05})`
        }
        if (heroCanvas) {
          heroCanvas.style.opacity = (1 - phase1 * 0.5).toFixed(3)
          heroCanvas.style.transform = `scale(${1 + phase1 * 0.08})`
        }
        if (heroBg) {
          heroBg.style.transform = `translate3d(0, ${(-phase1 * 40).toFixed(1)}px, 0) scale(${1 + phase1 * 0.06})`
        }
        if (phase2 > 0) {
          const projectsSection = document.getElementById('projects')
          if (projectsSection) projectsSection.style.opacity = phase2.toFixed(3)
        }
      }
    })
  }

  const lazyQueue = []
  function whenVisible(el, fn, threshold = 0.05) {
    if (!el) return fn()
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          obs.disconnect()
          requestAnimationFrame(fn)
        }
      })
    }, { threshold })
    obs.observe(el)
    lazyQueue.push(obs)
  }

  async function init() {
    try {
      const res = await fetch('config.json')
      CONFIG = await res.json()
    } catch (_) {
      CONFIG = {}
    }
    gsap.registerPlugin(ScrollTrigger)
    initCore()
  }

  function initCore() {
    initAnimDriver()
    initSmoothScroll()
    initTypewriter()
    initHeroShader()
    initCursorGlow()
    initAudioReactivity()
    initNav()
    initHeroEntry()
    loadDiscordAvatar()
    observeReveal('.reveal')

    setTimeout(() => {
      initHeroScrollPhases()

      whenVisible(document.getElementById('projects'), () => {
        renderCascadeProjects()
        initSectionReveals()
      })
      whenVisible(document.querySelector('.marquee-section'), () => {
        renderMarquee()
      })
      whenVisible(document.getElementById('things'), () => {
        renderCraft()
        initRotatingCycle()
        initExpandingGrid()
        initTextReveals()
        initBlockReveal()
        initParallelStagger()
        initTiltSections()
        initParallaxLerp()
        initHoverHighlight()
      })
      whenVisible(document.getElementById('collab'), () => {
        renderCollab()
        init3DCardTilt()
      })
      whenVisible(document.getElementById('main-footer'), () => {
        initPhysicsExplosion()
        initPinnedFooter()
      })

      initBlockGridTransition()
      initMobileMenuGsap()
      initInfiniteTextPath()
      initSVGDraw()
      initNavHoverEffect()

      ScrollTrigger.refresh()

      document.getElementById('loader-overlay')?.classList.add('hidden')
    }, 50)
  }

  init()
})()
