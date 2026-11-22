import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

type SculpturePreset = 'orbital' | 'prism' | 'pulse';

// Pre-allocated math helpers outside render loop (zero GC churn)
const _dummy = new THREE.Object3D();
const _color = new THREE.Color();

function detectSoftwareGl(): boolean {
  try {
    const gl = document.createElement('canvas').getContext('webgl2');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return false;
  }
}

export function Hero3DCanvas() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const presetRef = useRef<SculpturePreset>('orbital');
  const pausedRef = useRef(false);
  const pointerTargetRef = useRef({ x: 0, y: 0 });
  const dragVelocityRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const lastPointerRef = useRef({ x: 0, y: 0 });

  const [preset, setPreset] = useState<SculpturePreset>('orbital');
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    presetRef.current = preset;
  }, [preset]);

  useEffect(() => {
    pausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareGl();
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const width = container.clientWidth || 520;
    const height = container.clientHeight || 480;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 6.4);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(
      isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2),
    );
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Studio environment reflection via RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envRT = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;
    pmremGenerator.dispose();

    // Warm/cool balanced studio lighting rig
    const hemiLight = new THREE.HemisphereLight(0xd0bcff, 0x0b0e23, 0.85);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff4ea, 1.9);
    keyLight.position.set(4.5, 5.5, 5);
    scene.add(keyLight);

    const rimCyanLight = new THREE.DirectionalLight(0x22d3ee, 1.7);
    rimCyanLight.position.set(-5, -2, 3.5);
    scene.add(rimCyanLight);

    const coreVioletLight = new THREE.PointLight(0x8b5cf6, 3.5, 16, 1.8);
    coreVioletLight.position.set(0, 0, 1.8);
    scene.add(coreVioletLight);

    // Composite 8-part procedural 3D abstract kinetic sculpture
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // Part 1: Faceted refractive outer crystal shell
    const outerCrystalGeo = new THREE.IcosahedronGeometry(1.08, 1);
    const outerCrystalMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#c4b5fd'),
      metalness: 0.15,
      roughness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      iridescence: 0.9,
      iridescenceIOR: 1.45,
      transmission: isSoftwareGl ? 0 : 0.72,
      transparent: true,
      opacity: isSoftwareGl ? 0.58 : 1,
      ior: 1.55,
      thickness: 1.2,
      attenuationColor: new THREE.Color('#8B5CF6'),
      attenuationDistance: 1.6,
      flatShading: true,
    });
    const outerCrystal = new THREE.Mesh(outerCrystalGeo, outerCrystalMat);
    sculptureGroup.add(outerCrystal);

    // Part 2: Glowing inner faceted octahedron core
    const innerCoreGeo = new THREE.OctahedronGeometry(0.56, 0);
    const innerCoreMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#4cd7f6'),
      emissive: new THREE.Color('#8B5CF6'),
      emissiveIntensity: 1.35,
      metalness: 0.35,
      roughness: 0.25,
      flatShading: true,
    });
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    sculptureGroup.add(innerCore);

    // Part 3: Precision wireframe cage around core
    const cageGeo = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.14, 1));
    const cageMat = new THREE.LineBasicMaterial({
      color: 0xd0bcff,
      transparent: true,
      opacity: 0.36,
    });
    const cageLines = new THREE.LineSegments(cageGeo, cageMat);
    sculptureGroup.add(cageLines);

    // Part 4-6: Three interlocking brushed-metal & anodized gyroscopic rings
    const ring1Geo = new THREE.TorusGeometry(1.62, 0.042, 24, 120);
    const ring1Mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#e2e1f3'),
      metalness: 0.94,
      roughness: 0.16,
      anisotropy: 0.75,
      clearcoat: 0.6,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.set(Math.PI * 0.28, Math.PI * 0.14, 0);
    sculptureGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.94, 0.032, 24, 120);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#8B5CF6'),
      emissive: new THREE.Color('#4c1d95'),
      emissiveIntensity: 0.45,
      metalness: 0.82,
      roughness: 0.24,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.set(-Math.PI * 0.32, Math.PI * 0.22, 0.4);
    sculptureGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(2.26, 0.024, 20, 128);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#22D3EE'),
      emissive: new THREE.Color('#0891b2'),
      emissiveIntensity: 0.55,
      metalness: 0.78,
      roughness: 0.2,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.set(Math.PI * 0.48, -Math.PI * 0.18, 0.2);
    sculptureGroup.add(ring3);

    // Part 7-9: Three orbiting faceted prism satellites on pivots
    const satellitePivot1 = new THREE.Group();
    const satellitePivot2 = new THREE.Group();
    const satellitePivot3 = new THREE.Group();
    sculptureGroup.add(satellitePivot1, satellitePivot2, satellitePivot3);

    const satGeo1 = new THREE.OctahedronGeometry(0.16, 0);
    const satMat1 = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#22D3EE'),
      emissive: new THREE.Color('#06B6D4'),
      emissiveIntensity: 0.9,
      metalness: 0.6,
      roughness: 0.15,
    });
    const sat1 = new THREE.Mesh(satGeo1, satMat1);
    sat1.position.set(1.62, 0, 0);
    satellitePivot1.add(sat1);
    satellitePivot1.rotation.copy(ring1.rotation);

    const satGeo2 = new THREE.TetrahedronGeometry(0.15, 0);
    const satMat2 = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#d0bcff'),
      emissive: new THREE.Color('#a855f7'),
      emissiveIntensity: 0.8,
      metalness: 0.75,
      roughness: 0.2,
    });
    const sat2 = new THREE.Mesh(satGeo2, satMat2);
    sat2.position.set(-1.94, 0, 0);
    satellitePivot2.add(sat2);
    satellitePivot2.rotation.copy(ring2.rotation);

    const satGeo3 = new THREE.IcosahedronGeometry(0.12, 0);
    const satMat3 = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#f8fafc'),
      metalness: 0.92,
      roughness: 0.12,
    });
    const sat3 = new THREE.Mesh(satGeo3, satMat3);
    sat3.position.set(0, 2.26, 0);
    satellitePivot3.add(sat3);
    satellitePivot3.rotation.copy(ring3.rotation);

    // Instanced starlight micro-crystal particle halo (120 instances)
    const particleCount = 120;
    const particleGeo = new THREE.OctahedronGeometry(0.032, 0);
    const particleMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.78,
    });
    const particleCloud = new THREE.InstancedMesh(
      particleGeo,
      particleMat,
      particleCount,
    );
    const paletteHex = ['#d0bcff', '#4cd7f6', '#a855f7', '#e2e1f3'];

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 2.4 + Math.random() * 1.9;
      _dummy.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi),
      );
      _dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      const scale = 0.55 + Math.random() * 1.15;
      _dummy.scale.setScalar(scale);
      _dummy.updateMatrix();
      particleCloud.setMatrixAt(i, _dummy.matrix);

      _color.set(paletteHex[i % paletteHex.length]);
      particleCloud.setColorAt(i, _color);
    }
    particleCloud.instanceMatrix.needsUpdate = true;
    if (particleCloud.instanceColor) {
      particleCloud.instanceColor.needsUpdate = true;
    }
    particleCloud.computeBoundingSphere();
    scene.add(particleCloud);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Pointer interaction handlers
    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      lastPointerRef.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      pointerTargetRef.current = {
        x: THREE.MathUtils.clamp(nx, -1, 1),
        y: THREE.MathUtils.clamp(ny, -1, 1),
      };

      if (isDraggingRef.current) {
        const dx = e.clientX - lastPointerRef.current.x;
        const dy = e.clientY - lastPointerRef.current.y;
        dragVelocityRef.current.x += dx * 0.008;
        dragVelocityRef.current.y += dy * 0.008;
        lastPointerRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const w = entry.contentRect.width;
      const h = entry.contentRect.height;
      if (w <= 0 || h <= 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(container);

    // Animation loop with software-WebGL afterDraw pacing
    const clock = new THREE.Clock();
    let frameId = 0;
    let disposed = false;
    let accumTime = 0;
    let currentScale = 1;
    let targetRingTilt = 0;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (!gl || !gl.fenceSync) {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const tick = () => {
      if (disposed) return;
      const delta = Math.min(clock.getDelta(), 0.05);
      const activeMode = presetRef.current;

      if (!pausedRef.current && !prefersReducedMotion) {
        accumTime += delta;
      }

      // Smoothly damp pointer tilt + drag inertia
      const targetRotY = pointerTargetRef.current.x * 0.35 + dragVelocityRef.current.x;
      const targetRotX = -pointerTargetRef.current.y * 0.25 + dragVelocityRef.current.y;

      sculptureGroup.rotation.y = THREE.MathUtils.damp(
        sculptureGroup.rotation.y,
        targetRotY + accumTime * 0.24,
        4.5,
        delta,
      );
      sculptureGroup.rotation.x = THREE.MathUtils.damp(
        sculptureGroup.rotation.x,
        targetRotX + Math.sin(accumTime * 0.5) * 0.12,
        4.5,
        delta,
      );

      // Mode-driven harmonic transformations
      const goalScale =
        activeMode === 'pulse'
          ? 1 + Math.sin(accumTime * 2.6) * 0.08
          : activeMode === 'prism'
            ? 1.12
            : 1.0;
      currentScale = THREE.MathUtils.damp(currentScale, goalScale, 6, delta);
      outerCrystal.scale.setScalar(currentScale);
      cageLines.scale.setScalar(currentScale * 1.01);

      const goalTilt = activeMode === 'prism' ? 0.65 : 0;
      targetRingTilt = THREE.MathUtils.damp(targetRingTilt, goalTilt, 5, delta);

      outerCrystal.rotation.y = accumTime * 0.38;
      outerCrystal.rotation.z = accumTime * 0.16;
      cageLines.rotation.copy(outerCrystal.rotation);

      innerCore.rotation.y = -accumTime * 0.65;
      innerCore.rotation.x = accumTime * 0.42;

      ring1.rotation.z = accumTime * 0.35 + targetRingTilt;
      ring2.rotation.x = -Math.PI * 0.32 + accumTime * 0.28 + targetRingTilt * 0.5;
      ring3.rotation.y = -Math.PI * 0.18 - accumTime * 0.32;

      satellitePivot1.rotation.z = accumTime * 0.85;
      satellitePivot2.rotation.z = -accumTime * 0.65;
      satellitePivot3.rotation.x = accumTime * 0.72;

      particleCloud.rotation.y = accumTime * 0.07;
      particleCloud.rotation.x = Math.sin(accumTime * 0.15) * 0.08;

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      resizeObserver.disconnect();
      domEl.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);

      outerCrystalGeo.dispose();
      outerCrystalMat.dispose();
      innerCoreGeo.dispose();
      innerCoreMat.dispose();
      cageGeo.dispose();
      cageMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      satGeo1.dispose();
      satMat1.dispose();
      satGeo2.dispose();
      satMat2.dispose();
      satGeo3.dispose();
      satMat3.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      envRT.dispose();
      renderer.dispose();

      if (domEl.parentNode === container) {
        container.removeChild(domEl);
      }
    };
  }, []);

  return (
    <div className="relative flex h-full min-h-[400px] lg:min-h-[520px] flex-col justify-between rounded-3xl border border-white/10 bg-[#0b0e23]/75 overflow-hidden shadow-[0_0_60px_-15px_rgba(139,92,246,0.35)]">
      {/* Subtle non-overlapping radial aura behind the 3D canvas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 55% 45%, rgba(139, 92, 246, 0.22), rgba(6, 182, 212, 0.12) 45%, transparent 72%)',
        }}
      />

      {/* Dedicated WebGL Mount Container — zero backdrop-filter overlays */}
      <div
        ref={mountRef}
        aria-label="Interactive 3D kinetic crystal sculpture — drag to orbit"
        role="img"
        className="relative z-10 flex-1 w-full cursor-grab active:cursor-grabbing"
      />

      {/* Solid / RGBA bottom control strip outside the WebGL area */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-[#0c0d19]/95 px-4 py-3">
        <span className="text-xs text-[#cbc3d7]">
          Drag sculpture to orbit
        </span>

        <div className="flex items-center gap-1.5" role="group" aria-label="3D Sculpture Mode">
          {(['orbital', 'prism', 'pulse'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setPreset(mode)}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium capitalize transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-cyan-400 ${
                preset === mode
                  ? 'bg-[#8B5CF6] text-white'
                  : 'bg-white/5 text-[#cbc3d7] hover:bg-white/10 hover:text-white'
              }`}
            >
              {mode}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setIsPaused((p) => !p)}
            aria-pressed={isPaused}
            className="ml-1 rounded-lg border border-white/15 bg-white/5 px-2.5 py-1 text-xs font-medium text-[#cbc3d7] transition-colors hover:border-cyan-400/60 hover:text-white whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-cyan-400"
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        </div>
      </div>
    </div>
  );
}
