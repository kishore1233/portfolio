// hooks/usePortfolioHooks.js
import { useEffect, useRef, useState, useCallback } from 'react';

/* ── Custom cursor ─────────────────────────────────────────── */
export function useCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ cx: 0, cy: 0, rx: 0, ry: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      pos.current.cx = e.clientX;
      pos.current.cy = e.clientY;
    };
    document.addEventListener('mousemove', onMove);

    let raf;
    const tick = () => {
      pos.current.rx += (pos.current.cx - pos.current.rx) * 0.12;
      pos.current.ry += (pos.current.cy - pos.current.ry) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.left = pos.current.cx + 'px';
        cursorRef.current.style.top  = pos.current.cy + 'px';
      }
      if (ringRef.current) {
        ringRef.current.style.left = pos.current.rx + 'px';
        ringRef.current.style.top  = pos.current.ry + 'px';
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return { cursorRef, ringRef, hovered };
}

/* ── Typewriter effect ─────────────────────────────────────── */
export function useTypewriter(phrases) {
  const [text, setText] = useState('');
  const state = useRef({ phraseIdx: 0, charIdx: 0, deleting: false });

  useEffect(() => {
    let timeout;
    const tick = () => {
      const { phraseIdx, charIdx, deleting } = state.current;
      const current = phrases[phraseIdx];
      if (!deleting) {
        setText(current.substring(0, charIdx + 1));
        state.current.charIdx++;
        if (state.current.charIdx === current.length) {
          state.current.deleting = true;
          timeout = setTimeout(tick, 1800);
          return;
        }
      } else {
        setText(current.substring(0, charIdx - 1));
        state.current.charIdx--;
        if (state.current.charIdx === 0) {
          state.current.deleting = false;
          state.current.phraseIdx = (phraseIdx + 1) % phrases.length;
        }
      }
      timeout = setTimeout(tick, state.current.deleting ? 55 : 90);
    };
    timeout = setTimeout(tick, 400);
    return () => clearTimeout(timeout);
  }, [phrases]);

  return text;
}

/* ── Scroll-reveal (IntersectionObserver) ──────────────────── */
export function useScrollReveal(selector = '.reveal') {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll(selector).forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [selector]);
}

/* ── Tilt card on hover ────────────────────────────────────── */
export function useTilt(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      el.style.transform = `perspective(600px) rotateX(${-y * 14}deg) rotateY(${x * 14}deg) scale(1.03)`;
    };
    const onLeave = () => { el.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale(1)'; };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, [ref]);
}

/* ── Three.js background canvas ───────────────────────────── */
export function useThreeBackground(canvasRef) {
  useEffect(() => {
    const THREE = window.THREE;
    if (!THREE || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050810);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 2, 10);

    scene.add(new THREE.AmbientLight(0x4040ff, 0.5));
    const pl1 = new THREE.PointLight(0x00e5ff, 1.5, 30); pl1.position.set(5, 5, 5); scene.add(pl1);
    const pl2 = new THREE.PointLight(0x9d4edd, 1.2, 30); pl2.position.set(-5, -3, -5); scene.add(pl2);

    // Grid
    const grid = new THREE.GridHelper(60, 30, 0x0a2a6e, 0x0a1a4e);
    grid.position.y = -2; scene.add(grid);

    // Particles
    const geo = new THREE.BufferGeometry();
    const N = 1200;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pos[i*3]   = (Math.random()-0.5)*60;
      pos[i*3+1] = (Math.random()-0.5)*30;
      pos[i*3+2] = (Math.random()-0.5)*60;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const particles = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0x00e5ff, size: 0.06, transparent: true, opacity: 0.7, sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false }));
    scene.add(particles);

    // Torus rings
    const mkTorus = (r, t, c, x, y, z, rx, ry) => {
      const m = new THREE.Mesh(new THREE.TorusGeometry(r, t, 16, 80), new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 0.5, metalness: 0.8, roughness: 0.2, transparent: true, opacity: 0.7 }));
      m.position.set(x,y,z); m.rotation.x = rx; m.rotation.y = ry; scene.add(m); return m;
    };
    const t1 = mkTorus(4,0.05,0x00e5ff,-2,1,-8,0.5,0.3);
    const t2 = mkTorus(3,0.04,0x9d4edd,4,-1,-12,1,-0.5);
    const t3 = mkTorus(2.5,0.04,0xff6b9d,-5,3,-15,-0.3,0.8);

    // Octahedra
    const mkOct = (s, c, x, y, z) => {
      const m = new THREE.Mesh(new THREE.OctahedronGeometry(s), new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 0.4, metalness: 0.9, roughness: 0.1, transparent: true, opacity: 0.8 }));
      m.position.set(x,y,z); scene.add(m); return m;
    };
    const o1 = mkOct(0.4,0x00e5ff,6,2,-5);
    const o2 = mkOct(0.3,0x9d4edd,-7,-1,-7);
    const o3 = mkOct(0.35,0xff6b9d,3,4,-10);
    const o4 = mkOct(0.25,0x00ff88,-3,5,-6);

    // Core sphere
    const coreMat = new THREE.MeshStandardMaterial({ color: 0x00e5ff, emissive: 0x00e5ff, emissiveIntensity: 1.5, metalness: 1, roughness: 0, transparent: true, opacity: 0.9 });
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.6,32,32), coreMat);
    core.position.set(0,0,-3); scene.add(core);
    const wire = new THREE.Mesh(new THREE.SphereGeometry(1.2,16,16), new THREE.MeshBasicMaterial({ color: 0x00e5ff, wireframe: true, transparent: true, opacity: 0.15 }));
    wire.position.copy(core.position); scene.add(wire);

    let scrollY = 0;
    let curScrollY = 0;
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll);

    let frame, tt = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      tt += 0.008;
      curScrollY += (scrollY - curScrollY) * 0.05;
      const sp = curScrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const tx = Math.sin(sp*Math.PI*1.8)*3;
      const ty = 2 - sp*3.5 + Math.sin(sp*Math.PI)*1.5;
      const tz = 10 - sp*12;
      camera.position.x += (tx - camera.position.x)*0.04;
      camera.position.y += (ty - camera.position.y)*0.04;
      camera.position.z += (tz - camera.position.z)*0.04;
      camera.lookAt(scene.position.x, scene.position.y, scene.position.z - 5);
      t1.rotation.z += 0.004; t1.rotation.x += 0.002;
      t2.rotation.z -= 0.003; t2.rotation.y += 0.003;
      t3.rotation.x += 0.005; t3.rotation.z += 0.002;
      o1.rotation.x += 0.01; o1.rotation.y += 0.008;
      o2.rotation.y += 0.012; o2.rotation.z += 0.005;
      o3.rotation.x -= 0.008; o3.rotation.z += 0.01;
      o4.rotation.y += 0.015;
      const pulse = 1 + Math.sin(tt*3)*0.15;
      core.scale.setScalar(pulse); wire.scale.setScalar(pulse*1.05);
      coreMat.emissiveIntensity = 1.2 + Math.sin(tt*3)*0.5;
      particles.rotation.y += 0.0005; particles.rotation.x += 0.0001;
      grid.position.z = (tt*0.5)%3-5;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth/window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, [canvasRef]);
}
