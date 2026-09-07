import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface IronManTitleProps {
  state: "idle" | "listening" | "processing" | "speaking";
}

export default function IronManTitle({ state }: IronManTitleProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 380;
    const height = container.clientHeight || 320;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 6.2);

    // 2. High Quality WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 3. Materials: Metallic Stark Crimson, Brushed Titanium Gold, Chrome & Glowing Arc Cyan
    const crimsonMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xa10c1c),
      emissive: new THREE.Color(0x2b0206),
      metalness: 0.9,
      roughness: 0.2,
      clearcoat: 0.95,
      clearcoatRoughness: 0.1,
      reflectivity: 0.95,
    });

    const goldMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xf6ba2b),
      emissive: new THREE.Color(0x381f02),
      metalness: 0.94,
      roughness: 0.16,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xdde5ed),
      metalness: 0.95,
      roughness: 0.15,
    });

    const darkTitaniumMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x1a1a20),
      metalness: 0.85,
      roughness: 0.4,
    });

    const arcCyanGlowMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x00f0ff),
    });

    const arcWhiteCoreMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xffffff),
    });

    // 4. Create Master 3D Iron Man Title Emblem Group
    const emblemGroup = new THREE.Group();

    // --- A. CENTRAL STARK ARC REACTOR CORE ---
    const arcCoreGroup = new THREE.Group();

    // Outer Arc Bezel Ring (Gold)
    const outerBezelGeo = new THREE.TorusGeometry(1.25, 0.1, 24, 64);
    const outerBezel = new THREE.Mesh(outerBezelGeo, goldMat);
    arcCoreGroup.add(outerBezel);

    // Middle Crimson Segmented Ring
    const midCrimsonRingGeo = new THREE.TorusGeometry(1.05, 0.07, 16, 48);
    const midCrimsonRing = new THREE.Mesh(midCrimsonRingGeo, crimsonMat);
    arcCoreGroup.add(midCrimsonRing);

    // 10 Turbine Blades around the Core (Gold & Chrome)
    const bladeCount = 10;
    for (let i = 0; i < bladeCount; i++) {
      const angle = (i / bladeCount) * Math.PI * 2;
      const bladeGeo = new THREE.BoxGeometry(0.08, 0.28, 0.12);
      const blade = new THREE.Mesh(bladeGeo, i % 2 === 0 ? goldMat : chromeMat);
      blade.position.set(Math.cos(angle) * 0.9, Math.sin(angle) * 0.9, 0.02);
      blade.rotation.z = angle + Math.PI / 4;
      arcCoreGroup.add(blade);
    }

    // Inner Glowing Cyan Ring
    const innerCyanRingGeo = new THREE.TorusGeometry(0.72, 0.06, 16, 36);
    const innerCyanRing = new THREE.Mesh(innerCyanRingGeo, arcCyanGlowMat);
    arcCoreGroup.add(innerCyanRing);

    // Triangle Mark-VII Center Prism
    const triGeo = new THREE.CylinderGeometry(0.46, 0.46, 0.15, 3);
    triGeo.rotateX(Math.PI / 2);
    const triMesh = new THREE.Mesh(triGeo, goldMat);
    triMesh.position.set(0, 0, 0.04);
    arcCoreGroup.add(triMesh);

    // Supernova Core Glowing Cyan Inset
    const coreLightMesh = new THREE.Mesh(new THREE.SphereGeometry(0.24, 24, 24), arcCyanGlowMat);
    coreLightMesh.position.set(0, 0, 0.08);
    arcCoreGroup.add(coreLightMesh);

    const coreWhiteCenter = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), arcWhiteCoreMat);
    coreWhiteCenter.position.set(0, 0, 0.12);
    arcCoreGroup.add(coreWhiteCenter);

    // Point Light from Arc Reactor
    const arcLight = new THREE.PointLight(0x00f0ff, 3.2, 5);
    arcLight.position.set(0, 0, 0.8);
    arcCoreGroup.add(arcLight);

    emblemGroup.add(arcCoreGroup);

    // --- B. METALLIC HORIZONTAL TITLE WINGS ("IRON MAN" STARK BADGE) ---
    // Left Wing Plate (Crimson with Gold Insets)
    const wingLGeo = new THREE.BoxGeometry(1.6, 0.5, 0.18);
    const wingL = new THREE.Mesh(wingLGeo, crimsonMat);
    wingL.position.set(-1.65, 0, -0.05);
    wingL.rotation.y = 0.22;
    emblemGroup.add(wingL);

    const wingGoldLGeo = new THREE.BoxGeometry(1.35, 0.15, 0.22);
    const wingGoldL = new THREE.Mesh(wingGoldLGeo, goldMat);
    wingGoldL.position.set(-1.65, 0.12, -0.04);
    wingGoldL.rotation.y = 0.22;
    emblemGroup.add(wingGoldL);

    const wingCyanStripeL = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.04, 0.24), arcCyanGlowMat);
    wingCyanStripeL.position.set(-1.65, -0.12, -0.03);
    wingCyanStripeL.rotation.y = 0.22;
    emblemGroup.add(wingCyanStripeL);

    // Right Wing Plate (Crimson with Gold Insets)
    const wingRGeo = new THREE.BoxGeometry(1.6, 0.5, 0.18);
    const wingR = new THREE.Mesh(wingRGeo, crimsonMat);
    wingR.position.set(1.65, 0, -0.05);
    wingR.rotation.y = -0.22;
    emblemGroup.add(wingR);

    const wingGoldRGeo = new THREE.BoxGeometry(1.35, 0.15, 0.22);
    const wingGoldR = new THREE.Mesh(wingGoldRGeo, goldMat);
    wingGoldR.position.set(1.65, 0.12, -0.04);
    wingGoldR.rotation.y = -0.22;
    emblemGroup.add(wingGoldR);

    const wingCyanStripeR = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.04, 0.24), arcCyanGlowMat);
    wingCyanStripeR.position.set(1.65, -0.12, -0.03);
    wingCyanStripeR.rotation.y = -0.22;
    emblemGroup.add(wingCyanStripeR);

    // Top Crest Bar
    const topBarGeo = new THREE.BoxGeometry(2.4, 0.18, 0.14);
    const topBar = new THREE.Mesh(topBarGeo, darkTitaniumMat);
    topBar.position.set(0, 1.45, -0.05);
    emblemGroup.add(topBar);

    const topBarGold = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.08, 0.18), goldMat);
    topBarGold.position.set(0, 1.45, -0.03);
    emblemGroup.add(topBarGold);

    // Bottom Crest Bar
    const bottomBarGeo = new THREE.BoxGeometry(2.4, 0.18, 0.14);
    const bottomBar = new THREE.Mesh(bottomBarGeo, darkTitaniumMat);
    bottomBar.position.set(0, -1.45, -0.05);
    emblemGroup.add(bottomBar);

    const bottomBarGold = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.08, 0.18), goldMat);
    bottomBarGold.position.set(0, -1.45, -0.03);
    emblemGroup.add(bottomBarGold);

    // 4 Corner Screws / Bolts
    const screwPositions = [
      [-1.9, 0.18, 0.06],
      [-1.9, -0.18, 0.06],
      [1.9, 0.18, 0.06],
      [1.9, -0.18, 0.06],
    ];
    screwPositions.forEach((pos) => {
      const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.1, 8), chromeMat);
      screw.rotation.x = Math.PI / 2;
      screw.position.set(pos[0], pos[1], pos[2]);
      emblemGroup.add(screw);
    });

    scene.add(emblemGroup);

    // --- C. HOLOGRAPHIC ORBITAL HUD RINGS ---
    const hudRingGroup = new THREE.Group();

    const ring1 = new THREE.Mesh(
      new THREE.RingGeometry(2.1, 2.14, 64),
      new THREE.MeshBasicMaterial({ color: 0x00f0ff, side: THREE.DoubleSide, transparent: true, opacity: 0.5 })
    );
    hudRingGroup.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.RingGeometry(2.45, 2.48, 48),
      new THREE.MeshBasicMaterial({ color: 0xffd700, side: THREE.DoubleSide, transparent: true, opacity: 0.4 })
    );
    ring2.rotation.x = 0.3;
    hudRingGroup.add(ring2);

    const ring3 = new THREE.Mesh(
      new THREE.RingGeometry(2.8, 2.83, 36),
      new THREE.MeshBasicMaterial({ color: 0xff003c, side: THREE.DoubleSide, transparent: true, opacity: 0.3 })
    );
    ring3.rotation.y = -0.3;
    hudRingGroup.add(ring3);

    scene.add(hudRingGroup);

    // Floating Nanotech Energy Particles
    const particleCount = 75;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 7;
      positions[i + 1] = (Math.random() - 0.5) * 7;
      positions[i + 2] = (Math.random() - 0.5) * 4;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particleGeo,
      new THREE.PointsMaterial({ color: 0x00f0ff, size: 0.04, transparent: true, opacity: 0.65 })
    );
    scene.add(particles);

    // --- 5. LIGHTING: STUDIO METALLIC REFLECTIONS ---
    const ambientLight = new THREE.AmbientLight(0x20050a, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5e6, 3.5);
    keyLight.position.set(3.5, 4.5, 4.5);
    scene.add(keyLight);

    const cyanRimLight = new THREE.DirectionalLight(0x00f0ff, 4.0);
    cyanRimLight.position.set(-4.5, 2, -2.5);
    scene.add(cyanRimLight);

    const crimsonFillLight = new THREE.DirectionalLight(0xff003c, 2.5);
    crimsonFillLight.position.set(0, -3.5, 2);
    scene.add(crimsonFillLight);

    // --- 6. ANIMATION LOOP: ROTATING & PULSING (स्मॉल/पल्स करता रहे और घूमता रहे) ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // State-based speeds
      const rotSpeed =
        state === "processing" ? 1.5 : state === "speaking" ? 1.0 : state === "listening" ? 0.8 : 0.55;

      // 1. Continuous 360° 3D Y-Axis Rotation ("घूमता रहे")
      emblemGroup.rotation.y = elapsedTime * rotSpeed;

      // Gentle realistic pitch & roll tilt
      emblemGroup.rotation.x = Math.sin(elapsedTime * 1.3) * 0.08;
      emblemGroup.rotation.z = Math.cos(elapsedTime * 0.9) * 0.04;

      // Turbine Counter-Spin
      arcCoreGroup.rotation.z = -elapsedTime * 0.8;

      // 2. Continuous Smooth Scaling / Breathing / Pulsing ("स्मॉल और पल्स करता रहे")
      let scaleBase = 1.0;
      let pulseAmp = 0.08;
      let pulseFreq = 2.0;

      if (state === "speaking") {
        pulseAmp = 0.13;
        pulseFreq = 4.0;
      } else if (state === "listening") {
        pulseAmp = 0.1;
        pulseFreq = 2.8;
      } else if (state === "processing") {
        pulseAmp = 0.15;
        pulseFreq = 5.0;
      }

      const dynamicScale = scaleBase + Math.sin(elapsedTime * pulseFreq) * pulseAmp;
      emblemGroup.scale.set(dynamicScale, dynamicScale, dynamicScale);

      // Arc Glow Intensity Pulse
      arcLight.intensity = 2.8 + Math.sin(elapsedTime * 5) * 1.2;

      // 3. Orbit HUD Rings & Particles
      ring1.rotation.z = elapsedTime * 0.35;
      ring2.rotation.z = -elapsedTime * 0.55;
      ring3.rotation.z = elapsedTime * 0.25;

      particles.rotation.y = elapsedTime * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 380;
      const newH = container.clientHeight || 320;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [state]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none">
      <div
        ref={mountRef}
        className="w-[300px] h-[240px] sm:w-[360px] sm:h-[280px] md:w-[420px] md:h-[320px] flex items-center justify-center"
      />
    </div>
  );
}
