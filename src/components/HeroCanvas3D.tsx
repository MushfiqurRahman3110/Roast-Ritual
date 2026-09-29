import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Coffee, Sparkles } from 'lucide-react';

interface HeroCanvas3DProps {
  onInteract?: () => void;
  preset?: 'cup' | 'beans';
  onPresetChange?: (preset: 'cup' | 'beans') => void;
}

export const HeroCanvas3D: React.FC<HeroCanvas3DProps> = ({
  onInteract,
  preset,
  onPresetChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [internalPreset, setInternalPreset] = useState<'cup' | 'beans'>('cup');
  const [webGLSupported, setWebGLSupported] = useState(true);
  const activePreset = preset !== undefined ? preset : internalPreset;

  const setActivePreset = (newPreset: 'cup' | 'beans') => {
    setInternalPreset(newPreset);
    if (onPresetChange) {
      onPresetChange(newPreset);
    }
  };

  const activePresetRef = useRef(activePreset);
  activePresetRef.current = activePreset;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // WebGL support verification
    const checkWebGL = () => {
      try {
        const testCanvas = document.createElement('canvas');
        return !!(
          window.WebGLRenderingContext &&
          (testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl'))
        );
      } catch {
        return false;
      }
    };

    if (!checkWebGL()) {
      setWebGLSupported(false);
      return;
    }

    const isMobile = window.innerWidth < 768;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x1a100b, 0.035);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.8, isMobile ? 6.8 : 6.2);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile, powerPreference: 'high-performance' });
    } catch {
      setWebGLSupported(false);
      return;
    }

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Root groups for parallax & animation
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Option A Group: Floating Cup & Saucer
    const cupGroup = new THREE.Group();
    // Option B Group: 3D Hero Coffee Bean & Golden Halo Constellation
    const heroBeanGroup = new THREE.Group();
    // Background floating beans common to both
    const ambientBeansGroup = new THREE.Group();

    masterGroup.add(cupGroup);
    masterGroup.add(heroBeanGroup);
    masterGroup.add(ambientBeansGroup);

    // Track disposables for complete memory leak avoidance
    const disposables: { dispose: () => void }[] = [];
    const registerDisposable = <T extends { dispose: () => void }>(item: T): T => {
      disposables.push(item);
      return item;
    };

    // ----------------------------------------------------
    // 1. ADVANCED PROCEDURAL COFFEE BEAN GEOMETRY HELPER
    // ----------------------------------------------------
    const createCoffeeBeanGeometry = (scale = 1, highPoly = false) => {
      const segW = highPoly ? (isMobile ? 36 : 64) : 24;
      const segH = highPoly ? (isMobile ? 28 : 48) : 18;
      const geom = registerDisposable(new THREE.SphereGeometry(scale, segW, segH));
      const pos = geom.attributes.position;

      for (let i = 0; i < pos.count; i++) {
        let x = pos.getX(i);
        let y = pos.getY(i);
        let z = pos.getZ(i);

        x *= 0.84;
        y *= 1.34;
        z *= 0.64;

        const normY = y / (scale * 1.34);
        const taper = 1.0 - 0.12 * Math.pow(normY, 2);
        x *= taper;
        z *= taper;

        if (z > 0.02) {
          const cleftCenter = Math.sin(normY * 3.4) * 0.06 * scale;
          const distFromCleft = Math.abs(x - cleftCenter);
          const cleftWidth = 0.36 * scale;

          if (distFromCleft < cleftWidth) {
            const depthFactor = Math.cos((distFromCleft / cleftWidth) * (Math.PI / 2));
            z -= depthFactor * 0.38 * scale;
          } else {
            const lipDist = Math.abs(distFromCleft - cleftWidth);
            if (lipDist < 0.22 * scale) {
              z += (1 - lipDist / (0.22 * scale)) * 0.07 * scale;
            }
          }
        } else {
          z *= 1.1;
        }

        pos.setXYZ(i, x, y, z);
      }
      geom.computeVertexNormals();
      return geom;
    };

    // Coffee Bean Materials
    const beanMaterial = registerDisposable(
      new THREE.MeshStandardMaterial({
        color: 0x2e1a10,
        roughness: 0.32,
        metalness: 0.16,
      })
    );

    const heroBeanMaterial = registerDisposable(
      new THREE.MeshStandardMaterial({
        color: 0x3a2216,
        roughness: 0.25,
        metalness: 0.22,
      })
    );

    const goldenBeanMaterial = registerDisposable(
      new THREE.MeshStandardMaterial({
        color: 0xc68e56,
        roughness: 0.24,
        metalness: 0.55,
      })
    );

    const glowingCremaMaterial = registerDisposable(
      new THREE.MeshStandardMaterial({
        color: 0xe6b980,
        emissive: 0x9c6635,
        emissiveIntensity: 0.45,
        roughness: 0.3,
        metalness: 0.3,
      })
    );

    // ----------------------------------------------------
    // 2. OPTION A: CUP, SAUCER & COFFEE SURFACE
    // ----------------------------------------------------
    const saucerPoints: THREE.Vector2[] = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(1.1, 0.02),
      new THREE.Vector2(1.5, 0.12),
      new THREE.Vector2(1.65, 0.28),
      new THREE.Vector2(1.6, 0.29),
      new THREE.Vector2(1.42, 0.15),
      new THREE.Vector2(0.9, 0.06),
      new THREE.Vector2(0, 0.06),
    ];

    const saucerGeom = registerDisposable(new THREE.LatheGeometry(saucerPoints, isMobile ? 32 : 48));
    const porcelainMat = registerDisposable(
      new THREE.MeshStandardMaterial({
        color: 0x241a15,
        roughness: 0.25,
        metalness: 0.15,
      })
    );
    const saucer = new THREE.Mesh(saucerGeom, porcelainMat);
    saucer.position.y = -0.7;
    cupGroup.add(saucer);

    const cupPoints: THREE.Vector2[] = [
      new THREE.Vector2(0.48, 0),
      new THREE.Vector2(0.68, 0.08),
      new THREE.Vector2(0.85, 0.45),
      new THREE.Vector2(0.96, 0.95),
      new THREE.Vector2(1.0, 1.25),
      new THREE.Vector2(0.96, 1.25),
      new THREE.Vector2(0.9, 0.95),
      new THREE.Vector2(0.78, 0.45),
      new THREE.Vector2(0.62, 0.12),
      new THREE.Vector2(0.45, 0.08),
    ];

    const cupGeom = registerDisposable(new THREE.LatheGeometry(cupPoints, isMobile ? 32 : 48));
    const cupMesh = new THREE.Mesh(cupGeom, porcelainMat);
    cupMesh.position.y = -0.65;
    cupGroup.add(cupMesh);

    const handleCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.9, 0.35, 0),
      new THREE.Vector3(1.35, 0.25, 0),
      new THREE.Vector3(1.38, -0.2, 0),
      new THREE.Vector3(0.75, -0.32, 0),
    ]);
    const handleGeom = registerDisposable(new THREE.TubeGeometry(handleCurve, 24, 0.075, 10, false));
    const handleMesh = new THREE.Mesh(handleGeom, porcelainMat);
    cupGroup.add(handleMesh);

    // Crema / Latte Art Canvas Texture
    const cremaCanvas = document.createElement('canvas');
    cremaCanvas.width = 256;
    cremaCanvas.height = 256;
    const ctx = cremaCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(128, 128, 15, 128, 128, 128);
      grad.addColorStop(0, '#E6B980');
      grad.addColorStop(0.35, '#C68E56');
      grad.addColorStop(0.7, '#673D1E');
      grad.addColorStop(1, '#2B1D14');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);

      ctx.strokeStyle = '#FFF8F0';
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';

      for (let i = 0; i < 6; i++) {
        const yOffset = 90 + i * 14;
        const spread = (6 - i) * 8;
        ctx.beginPath();
        ctx.moveTo(128 - spread, yOffset);
        ctx.quadraticCurveTo(128, yOffset - 8, 128 + spread, yOffset);
        ctx.strokeStyle = `rgba(255, 245, 230, ${0.85 - i * 0.1})`;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.moveTo(128, 70);
      ctx.lineTo(128, 180);
      ctx.strokeStyle = 'rgba(255, 245, 230, 0.9)';
      ctx.lineWidth = 4;
      ctx.stroke();
    }

    const cremaTexture = registerDisposable(new THREE.CanvasTexture(cremaCanvas));
    const liquidGeom = registerDisposable(new THREE.CircleGeometry(0.92, 32));
    const liquidMat = registerDisposable(
      new THREE.MeshStandardMaterial({
        map: cremaTexture,
        roughness: 0.25,
        metalness: 0.1,
      })
    );
    const liquidMesh = new THREE.Mesh(liquidGeom, liquidMat);
    liquidMesh.rotation.x = -Math.PI / 2;
    liquidMesh.position.y = 0.52;
    cupGroup.add(liquidMesh);

    const rimGeom = registerDisposable(new THREE.TorusGeometry(0.96, 0.02, 12, isMobile ? 36 : 64));
    const goldRimMat = registerDisposable(
      new THREE.MeshStandardMaterial({
        color: 0xe6b980,
        metalness: 0.85,
        roughness: 0.2,
      })
    );
    const rimMesh = new THREE.Mesh(rimGeom, goldRimMat);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = 0.59;
    cupGroup.add(rimMesh);

    const cremaGlow = new THREE.PointLight(0xffdfba, 1.8, 4.0);
    cremaGlow.position.set(0, 1.2, 0);
    cupGroup.add(cremaGlow);

    // ----------------------------------------------------
    // 3. OPTION B: HERO 3D COFFEE BEAN & LIQUID GOLD ORBIT
    // ----------------------------------------------------
    const heroBeanGeom = createCoffeeBeanGeometry(1.65, true);
    const heroBeanMesh = new THREE.Mesh(heroBeanGeom, heroBeanMaterial);
    heroBeanMesh.position.set(0, 0.1, 0);
    heroBeanMesh.rotation.set(0.35, 0.65, 0.2);
    heroBeanGroup.add(heroBeanMesh);

    const cleftLineCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.04, 1.45, 0.25),
      new THREE.Vector3(0.02, 0.8, 0.52),
      new THREE.Vector3(-0.03, 0.0, 0.58),
      new THREE.Vector3(0.02, -0.8, 0.52),
      new THREE.Vector3(0.04, -1.45, 0.25),
    ]);
    const cleftTubeGeom = registerDisposable(new THREE.TubeGeometry(cleftLineCurve, 24, 0.045, 8, false));
    const cleftTubeMesh = new THREE.Mesh(cleftTubeGeom, glowingCremaMaterial);
    heroBeanMesh.add(cleftTubeMesh);

    const orbitRingGeom = registerDisposable(new THREE.TorusGeometry(2.35, 0.022, 12, isMobile ? 40 : 80));
    const orbitRingMesh = new THREE.Mesh(orbitRingGeom, goldRimMat);
    orbitRingMesh.rotation.x = Math.PI / 3;
    orbitRingMesh.rotation.y = Math.PI / 6;
    heroBeanGroup.add(orbitRingMesh);

    const orbitRingGeom2 = registerDisposable(new THREE.TorusGeometry(2.8, 0.015, 12, isMobile ? 40 : 80));
    const orbitRingMesh2 = new THREE.Mesh(orbitRingGeom2, goldenBeanMaterial);
    orbitRingMesh2.rotation.x = -Math.PI / 4;
    orbitRingMesh2.rotation.y = Math.PI / 4;
    heroBeanGroup.add(orbitRingMesh2);

    const constellationBeanGeom = createCoffeeBeanGeometry(0.32);
    const constellationBeans: {
      mesh: THREE.Mesh;
      radius: number;
      speed: number;
      angle: number;
      yOffset: number;
      rotSpeedX: number;
      rotSpeedY: number;
    }[] = [];

    const satelliteConfigs = [
      { radius: 2.1, speed: 0.7, y: 0.6, gold: true },
      { radius: 2.4, speed: -0.5, y: -0.5, gold: false },
      { radius: 2.7, speed: 0.9, y: 0.1, gold: false },
      { radius: 3.0, speed: -0.6, y: 0.8, gold: true },
    ];

    satelliteConfigs.forEach((cfg, idx) => {
      const bMesh = new THREE.Mesh(
        constellationBeanGeom,
        cfg.gold ? goldenBeanMaterial : beanMaterial
      );
      heroBeanGroup.add(bMesh);

      constellationBeans.push({
        mesh: bMesh,
        radius: cfg.radius,
        speed: cfg.speed,
        angle: (idx / satelliteConfigs.length) * Math.PI * 2,
        yOffset: cfg.y,
        rotSpeedX: (Math.random() - 0.5) * 0.03,
        rotSpeedY: (Math.random() - 0.5) * 0.03,
      });
    });

    const beanLight = new THREE.PointLight(0xe6b980, 2.5, 5.5);
    beanLight.position.set(0, 0.5, 1.8);
    heroBeanGroup.add(beanLight);

    // ----------------------------------------------------
    // 4. SURROUNDING AMBIENT BACKGROUND BEANS
    // ----------------------------------------------------
    const ambientBeanGeom = createCoffeeBeanGeometry(0.36);
    const ambientBeans: {
      mesh: THREE.Mesh;
      baseX: number;
      baseY: number;
      baseZ: number;
      rotSpeedX: number;
      rotSpeedY: number;
      rotSpeedZ: number;
      bobSpeed: number;
      bobOffset: number;
    }[] = [];

    const ambientPositions = [
      { x: -3.2, y: 1.4, z: -0.8, scale: 0.85, gold: false },
      { x: 3.1, y: -1.2, z: -0.5, scale: 0.95, gold: true },
      { x: -2.6, y: -1.6, z: 0.8, scale: 0.75, gold: false },
      { x: 2.8, y: 1.6, z: -0.2, scale: 0.8, gold: false },
    ];

    ambientPositions.forEach((pos, idx) => {
      const bMesh = new THREE.Mesh(
        ambientBeanGeom,
        pos.gold ? goldenBeanMaterial : beanMaterial
      );
      bMesh.scale.setScalar(pos.scale);
      bMesh.position.set(pos.x, pos.y, pos.z);
      ambientBeansGroup.add(bMesh);

      ambientBeans.push({
        mesh: bMesh,
        baseX: pos.x,
        baseY: pos.y,
        baseZ: pos.z,
        rotSpeedX: (Math.random() - 0.5) * 0.012,
        rotSpeedY: (Math.random() * 0.012 + 0.008) * (idx % 2 === 0 ? 1 : -1),
        rotSpeedZ: (Math.random() - 0.5) * 0.01,
        bobSpeed: 1.2 + Math.random() * 1.2,
        bobOffset: Math.random() * Math.PI * 2,
      });
    });

    // ----------------------------------------------------
    // 5. STEAM PARTICLE SYSTEM (Optimized for Mobile)
    // ----------------------------------------------------
    const steamCount = isMobile ? 65 : 110;
    const steamGeo = registerDisposable(new THREE.BufferGeometry());
    const steamPositions = new Float32Array(steamCount * 3);

    const steamParticleData: {
      x: number;
      y: number;
      z: number;
      vy: number;
      vx: number;
      vz: number;
      life: number;
      maxLife: number;
    }[] = [];

    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    if (pCtx) {
      const grad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 245, 235, 0.7)');
      grad.addColorStop(0.3, 'rgba(240, 225, 205, 0.35)');
      grad.addColorStop(0.7, 'rgba(220, 200, 180, 0.1)');
      grad.addColorStop(1, 'rgba(200, 180, 160, 0)');
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = registerDisposable(new THREE.CanvasTexture(pCanvas));

    for (let i = 0; i < steamCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.7;
      const x = Math.cos(angle) * radius;
      const y = -0.2 + Math.random() * 2.5;
      const z = Math.sin(angle) * radius;

      steamPositions[i * 3] = x;
      steamPositions[i * 3 + 1] = y;
      steamPositions[i * 3 + 2] = z;

      steamParticleData.push({
        x,
        y,
        z,
        vy: 0.009 + Math.random() * 0.012,
        vx: (Math.random() - 0.5) * 0.005,
        vz: (Math.random() - 0.5) * 0.005,
        life: Math.random() * 200,
        maxLife: 180 + Math.random() * 120,
      });
    }

    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));

    const steamMat = registerDisposable(
      new THREE.PointsMaterial({
        size: 0.55,
        map: particleTexture,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        color: 0xf5e6d3,
      })
    );

    const steamParticles = new THREE.Points(steamGeo, steamMat);
    masterGroup.add(steamParticles);

    // ----------------------------------------------------
    // 6. GOLDEN EMBER GLOW PARTICLES
    // ----------------------------------------------------
    const emberCount = isMobile ? 35 : 65;
    const emberGeo = registerDisposable(new THREE.BufferGeometry());
    const emberPositions = new Float32Array(emberCount * 3);
    const emberData: {
      speedY: number;
      swaySpeed: number;
      swayRadius: number;
      baseX: number;
      baseZ: number;
      phase: number;
    }[] = [];

    for (let i = 0; i < emberCount; i++) {
      const ex = (Math.random() - 0.5) * 9;
      const ey = (Math.random() - 0.5) * 6;
      const ez = (Math.random() - 0.5) * 4;

      emberPositions[i * 3] = ex;
      emberPositions[i * 3 + 1] = ey;
      emberPositions[i * 3 + 2] = ez;

      emberData.push({
        speedY: 0.004 + Math.random() * 0.006,
        swaySpeed: 1 + Math.random() * 2,
        swayRadius: 0.2 + Math.random() * 0.3,
        baseX: ex,
        baseZ: ez,
        phase: Math.random() * Math.PI * 2,
      });
    }

    emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));
    const emberMat = registerDisposable(
      new THREE.PointsMaterial({
        size: 0.12,
        map: particleTexture,
        transparent: true,
        opacity: 0.65,
        color: 0xe6b980,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    const embers = new THREE.Points(emberGeo, emberMat);
    masterGroup.add(embers);

    // ----------------------------------------------------
    // 7. LIGHTING
    // ----------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0x3e2723, 1.5);
    scene.add(ambientLight);

    const goldSpot = new THREE.SpotLight(0xe6b980, 4.5);
    goldSpot.position.set(3, 5, 4);
    goldSpot.angle = Math.PI / 4.2;
    goldSpot.penumbra = 0.8;
    scene.add(goldSpot);

    const caramelRim = new THREE.DirectionalLight(0xc68e56, 2.8);
    caramelRim.position.set(-4, 3, -3);
    scene.add(caramelRim);

    // ----------------------------------------------------
    // 8. MOUSE & TOUCH PARALLAX INTERACTION
    // ----------------------------------------------------
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let dragRotationX = 0;
    let dragRotationY = 0;

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const rect = container.getBoundingClientRect();
      const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);

      targetX = normX * 0.45;
      targetY = normY * 0.3;

      if (isDragging) {
        const deltaX = clientX - previousMousePosition.x;
        const deltaY = clientY - previousMousePosition.y;
        dragRotationY += deltaX * 0.007;
        dragRotationX += deltaY * 0.007;
      }
      previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // ----------------------------------------------------
    // 9. ANIMATION LOOP
    // ----------------------------------------------------
    let animationFrameId: number;
    let clock = new THREE.Clock();

    let cupScale = activePresetRef.current === 'cup' ? 1.0 : 0.0001;
    let beanScale = activePresetRef.current === 'beans' ? 1.0 : 0.0001;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      masterGroup.rotation.y = mouseX * 0.55 + dragRotationY;
      masterGroup.rotation.x = -mouseY * 0.35 + dragRotationX * 0.5;

      const isCupMode = activePresetRef.current === 'cup';

      const targetCupScale = isCupMode ? 1.0 : 0.0001;
      const targetBeanScale = isCupMode ? 0.0001 : 1.0;

      cupScale += (targetCupScale - cupScale) * 0.08;
      beanScale += (targetBeanScale - beanScale) * 0.08;

      cupGroup.scale.setScalar(cupScale);
      cupGroup.visible = cupScale > 0.02;

      heroBeanGroup.scale.setScalar(beanScale);
      heroBeanGroup.visible = beanScale > 0.02;

      if (cupGroup.visible) {
        cupGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.12;
        cupGroup.rotation.y = elapsedTime * 0.22;
      }

      if (heroBeanGroup.visible) {
        heroBeanMesh.rotation.y = elapsedTime * 0.35;
        heroBeanMesh.rotation.x = Math.sin(elapsedTime * 0.8) * 0.15 + 0.25;
        heroBeanGroup.position.y = Math.sin(elapsedTime * 1.3) * 0.14;

        orbitRingMesh.rotation.z = elapsedTime * 0.15;
        orbitRingMesh2.rotation.z = -elapsedTime * 0.12;

        constellationBeans.forEach((b) => {
          b.angle += b.speed * 0.015;
          b.mesh.position.x = Math.cos(b.angle) * b.radius;
          b.mesh.position.z = Math.sin(b.angle) * b.radius;
          b.mesh.position.y = b.yOffset + Math.sin(elapsedTime * 1.5 + b.radius) * 0.12;
          b.mesh.rotation.x += b.rotSpeedX;
          b.mesh.rotation.y += b.rotSpeedY;
        });
      }

      ambientBeans.forEach((b, idx) => {
        b.mesh.rotation.x += b.rotSpeedX;
        b.mesh.rotation.y += b.rotSpeedY;
        b.mesh.rotation.z += b.rotSpeedZ;
        b.mesh.position.y = b.baseY + Math.sin(elapsedTime * b.bobSpeed + b.bobOffset) * 0.18;
        b.mesh.position.x = b.baseX + Math.cos(elapsedTime * 0.8 + idx) * 0.08;
      });

      const sPositions = steamGeo.attributes.position.array as Float32Array;
      const steamOriginY = isCupMode ? 0.55 : -0.3;
      const steamRadius = isCupMode ? 0.45 : 0.85;

      for (let i = 0; i < steamCount; i++) {
        const p = steamParticleData[i];
        p.life += 1;
        p.y += p.vy;
        p.x += Math.sin(elapsedTime * 2 + i) * 0.003 + p.vx;
        p.z += Math.cos(elapsedTime * 2 + i) * 0.003 + p.vz;

        if (p.life > p.maxLife || p.y > 3.2) {
          p.life = 0;
          const angle = Math.random() * Math.PI * 2;
          const rad = Math.random() * steamRadius;
          p.x = Math.cos(angle) * rad;
          p.y = steamOriginY;
          p.z = Math.sin(angle) * rad;
        }

        sPositions[i * 3] = p.x;
        sPositions[i * 3 + 1] = p.y;
        sPositions[i * 3 + 2] = p.z;
      }
      steamGeo.attributes.position.needsUpdate = true;

      const ePositions = emberGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < emberCount; i++) {
        const ed = emberData[i];
        let ey = ePositions[i * 3 + 1] + ed.speedY;
        if (ey > 3.2) ey = -3.2;

        const sway = Math.sin(elapsedTime * ed.swaySpeed + ed.phase) * ed.swayRadius;
        ePositions[i * 3] = ed.baseX + sway;
        ePositions[i * 3 + 1] = ey;
        ePositions[i * 3 + 2] = ed.baseZ + Math.cos(elapsedTime * ed.swaySpeed) * 0.15;
      }
      emberGeo.attributes.position.needsUpdate = true;

      if (!isDragging) {
        dragRotationX *= 0.95;
        dragRotationY *= 0.95;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing select-none"
      onClick={() => onInteract && onInteract()}
      title="Drag to rotate, move mouse or touch for 3D parallax"
    >
      {/* Fallback for devices without WebGL */}
      {!webGLSupported && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-[#C68E56]/30 via-[#E6B980]/20 to-transparent flex items-center justify-center animate-pulse">
            <div className="w-48 h-48 rounded-full border-2 border-[#E6B980]/40 flex items-center justify-center">
              <Coffee className="w-24 h-24 text-[#E6B980]/80" />
            </div>
          </div>
        </div>
      )}

      {/* 3D Scene Controls Overlay with explicit Option A and Option B toggles */}
      <div className="absolute top-20 sm:top-24 right-3 sm:right-8 z-30 flex flex-col items-end gap-2 pointer-events-auto">
        <div className="backdrop-blur-md bg-black/60 border border-[#E6B980]/30 rounded-full px-3 py-1 sm:px-3.5 sm:py-1.5 text-[10px] sm:text-xs text-[#E6B980] flex items-center gap-1.5 sm:gap-2 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#E6B980] animate-ping"></span>
          <span className="font-mono tracking-wider">3D PARALLAX • DRAG TO SPIN</span>
        </div>

        <div className="flex bg-[#1A110C]/90 backdrop-blur-md border border-[#E6B980]/30 rounded-2xl p-1 shadow-2xl text-xs gap-1">
          {/* Option A button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActivePreset('cup');
            }}
            className={`min-h-[44px] px-3 sm:px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 text-xs ${
              activePreset === 'cup'
                ? 'bg-gradient-to-r from-[#C68E56] to-[#E6B980] text-[#180F0A] shadow-md font-bold'
                : 'text-[#E6B980]/70 hover:text-[#FFF8F0] hover:bg-white/5'
            }`}
            title="Option A: Floating Porcelain Cup & Steam"
            aria-label="Toggle Option A: Floating Cup"
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>Option A: Cup</span>
          </button>

          {/* Option B button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActivePreset('beans');
            }}
            className={`min-h-[44px] px-3 sm:px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 text-xs ${
              activePreset === 'beans'
                ? 'bg-gradient-to-r from-[#C68E56] to-[#E6B980] text-[#180F0A] shadow-md font-bold'
                : 'text-[#E6B980]/70 hover:text-[#FFF8F0] hover:bg-white/5'
            }`}
            title="Option B: 3D Coffee Bean Constellation & Steam"
            aria-label="Toggle Option B: 3D Coffee Bean"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Option B: Bean</span>
          </button>
        </div>
      </div>
    </div>
  );
};
