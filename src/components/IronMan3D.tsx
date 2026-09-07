import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface IronMan3DProps {
  state: "idle" | "listening" | "processing" | "speaking";
}

export default function IronMan3D({ state }: IronMan3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 420;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.2);

    // 2. Renderer with High Dynamic Range & Shadows
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // 3. Materials: Ultra Realistic Metallic Car Paint & Gold Shaders
    // Candy Apple Stark Crimson (High Metalness, Sleek Clearcoat)
    const crimsonArmorMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x9a0816),
      emissive: new THREE.Color(0x220004),
      metalness: 0.88,
      roughness: 0.22,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });

    // Dark Titanium Burgundy for shadow recesses
    const darkArmorMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x350308),
      metalness: 0.9,
      roughness: 0.35,
    });

    // Stark Titanium Brushed Gold Faceplate
    const goldFaceplateMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xf5b324),
      emissive: new THREE.Color(0x2a1700),
      metalness: 0.92,
      roughness: 0.18,
      clearcoat: 0.85,
      clearcoatRoughness: 0.12,
    });

    // Dark Carbon Fiber / Interior Neck Gasket
    const carbonMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x111115),
      metalness: 0.7,
      roughness: 0.5,
    });

    // Glowing Arc / Eyes Cyan Material
    const glowingCyanMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x00f0ff),
    });

    const eyeCoreMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xffffff),
    });

    // 4. Build Iron Man Mark VII 3D Geometry Group
    const ironManGroup = new THREE.Group();

    // --- A. HELMET CRANIUM (Top & Back Skull) ---
    // Outer Cranium Sphere (Sculpted)
    const skullGeo = new THREE.SphereGeometry(1.35, 32, 28, 0, Math.PI * 2, 0, Math.PI * 0.78);
    skullGeo.scale(0.95, 1.15, 1.05);
    const skullMesh = new THREE.Mesh(skullGeo, crimsonArmorMat);
    skullMesh.position.set(0, 0.2, -0.15);
    ironManGroup.add(skullMesh);

    // Cranium Crown Crest (Top Ridge)
    const crownGeo = new THREE.BoxGeometry(0.55, 0.12, 1.4);
    const crownMesh = new THREE.Mesh(crownGeo, goldFaceplateMat);
    crownMesh.position.set(0, 1.5, -0.1);
    crownMesh.rotation.x = -0.15;
    ironManGroup.add(crownMesh);

    // Crown Side Flanges (Red)
    const flangeLGeo = new THREE.BoxGeometry(0.12, 0.1, 1.3);
    const flangeL = new THREE.Mesh(flangeLGeo, crimsonArmorMat);
    flangeL.position.set(-0.35, 1.48, -0.1);
    flangeL.rotation.z = 0.1;
    ironManGroup.add(flangeL);

    const flangeR = new THREE.Mesh(flangeLGeo, crimsonArmorMat);
    flangeR.position.set(0.35, 1.48, -0.1);
    flangeR.rotation.z = -0.1;
    ironManGroup.add(flangeR);

    // --- B. CHEEK ARMOR & TEMPORAL SIDES ---
    const cheekLGeo = new THREE.BoxGeometry(0.4, 1.1, 0.7);
    const cheekL = new THREE.Mesh(cheekLGeo, crimsonArmorMat);
    cheekL.position.set(-1.05, 0.15, 0.2);
    cheekL.rotation.set(0.1, 0.25, -0.15);
    ironManGroup.add(cheekL);

    const cheekR = new THREE.Mesh(cheekLGeo, crimsonArmorMat);
    cheekR.position.set(1.05, 0.15, 0.2);
    cheekR.rotation.set(0.1, -0.25, 0.15);
    ironManGroup.add(cheekR);

    // Ear Pod Discs (Gold + Cyan Indicator)
    const earDiscGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.12, 24);
    earDiscGeo.rotateZ(Math.PI / 2);

    const earL = new THREE.Mesh(earDiscGeo, goldFaceplateMat);
    earL.position.set(-1.28, 0.15, 0.05);
    ironManGroup.add(earL);

    const earCyanL = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.14, 16), glowingCyanMat);
    earCyanL.rotation.z = Math.PI / 2;
    earCyanL.position.set(-1.29, 0.15, 0.05);
    ironManGroup.add(earCyanL);

    const earR = new THREE.Mesh(earDiscGeo, goldFaceplateMat);
    earR.position.set(1.28, 0.15, 0.05);
    ironManGroup.add(earR);

    const earCyanR = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.14, 16), glowingCyanMat);
    earCyanR.rotation.z = Math.PI / 2;
    earCyanR.position.set(1.29, 0.15, 0.05);
    ironManGroup.add(earCyanR);

    // --- C. GOLDEN FACEPLATE (The Iconic Front Mask) ---
    // Forehead Plate (Angular)
    const foreheadGeo = new THREE.BoxGeometry(1.2, 0.65, 0.35);
    const foreheadMesh = new THREE.Mesh(foreheadGeo, goldFaceplateMat);
    foreheadMesh.position.set(0, 0.85, 0.72);
    foreheadMesh.rotation.x = -0.28;
    ironManGroup.add(foreheadMesh);

    // Forehead Red Diamond Inset
    const diamondGeo = new THREE.OctahedronGeometry(0.14, 0);
    const diamondMesh = new THREE.Mesh(diamondGeo, crimsonArmorMat);
    diamondMesh.position.set(0, 0.95, 0.92);
    ironManGroup.add(diamondMesh);

    // Brow Ridge Line (Dark Recess)
    const browGeo = new THREE.BoxGeometry(1.35, 0.14, 0.3);
    const browMesh = new THREE.Mesh(browGeo, darkArmorMat);
    browMesh.position.set(0, 0.52, 0.82);
    browMesh.rotation.x = -0.05;
    ironManGroup.add(browMesh);

    // Main Nose & Mid-Face Mask
    const midFaceGeo = new THREE.BoxGeometry(0.9, 0.5, 0.4);
    const midFaceMesh = new THREE.Mesh(midFaceGeo, goldFaceplateMat);
    midFaceMesh.position.set(0, 0.22, 0.84);
    ironManGroup.add(midFaceMesh);

    // Jaw / Chin Plate (Angular Bevel)
    const jawGeo = new THREE.BoxGeometry(0.78, 0.6, 0.45);
    const jawMesh = new THREE.Mesh(jawGeo, goldFaceplateMat);
    jawMesh.position.set(0, -0.32, 0.76);
    jawMesh.rotation.x = 0.28;
    ironManGroup.add(jawMesh);

    // Chin Tip Accent (Red with Gold Center Bolt)
    const chinTipGeo = new THREE.BoxGeometry(0.35, 0.2, 0.2);
    const chinTip = new THREE.Mesh(chinTipGeo, crimsonArmorMat);
    chinTip.position.set(0, -0.62, 0.72);
    ironManGroup.add(chinTip);

    // --- D. GLOWING CYAN LASER EYES WITH MULTI-LAYER BLOOM ---
    // Left Eye Slit (Tilted Angular Polygon)
    const eyeGeo = new THREE.BoxGeometry(0.34, 0.075, 0.08);

    const eyeL = new THREE.Mesh(eyeGeo, glowingCyanMat);
    eyeL.position.set(-0.38, 0.42, 0.96);
    eyeL.rotation.set(0, 0, -0.18);
    ironManGroup.add(eyeL);

    const eyeCoreL = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.04, 0.1), eyeCoreMat);
    eyeCoreL.position.set(-0.38, 0.42, 0.98);
    eyeCoreL.rotation.set(0, 0, -0.18);
    ironManGroup.add(eyeCoreL);

    // Right Eye Slit
    const eyeR = new THREE.Mesh(eyeGeo, glowingCyanMat);
    eyeR.position.set(0.38, 0.42, 0.96);
    eyeR.rotation.set(0, 0, 0.18);
    ironManGroup.add(eyeR);

    const eyeCoreR = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.04, 0.1), eyeCoreMat);
    eyeCoreR.position.set(0.38, 0.42, 0.98);
    eyeCoreR.rotation.set(0, 0, 0.18);
    ironManGroup.add(eyeCoreR);

    // Dynamic Eye Point Lights casting real cyan illumination onto the gold mask
    const eyeLightL = new THREE.PointLight(0x00f0ff, 2.5, 2.2);
    eyeLightL.position.set(-0.38, 0.42, 1.2);
    ironManGroup.add(eyeLightL);

    const eyeLightR = new THREE.PointLight(0x00f0ff, 2.5, 2.2);
    eyeLightR.position.set(0.38, 0.42, 1.2);
    ironManGroup.add(eyeLightR);

    // --- E. NECK GASKETS & COLLAR ---
    const neckGeo = new THREE.CylinderGeometry(0.65, 0.85, 0.65, 24);
    const neckMesh = new THREE.Mesh(neckGeo, carbonMat);
    neckMesh.position.set(0, -0.75, 0.05);
    ironManGroup.add(neckMesh);

    // --- F. CHEST ARMOR & MARK VII ARC REACTOR ---
    const chestGroup = new THREE.Group();
    chestGroup.position.set(0, -1.8, 0.1);

    // Main Chest Breastplate
    const chestPlateGeo = new THREE.BoxGeometry(2.4, 1.3, 1.1);
    const chestPlate = new THREE.Mesh(chestPlateGeo, crimsonArmorMat);
    chestPlate.position.set(0, 0, 0);
    chestGroup.add(chestPlate);

    // Left & Right Shoulder Pod Flares
    const shoulderLGeo = new THREE.BoxGeometry(0.9, 0.6, 0.8);
    const shoulderL = new THREE.Mesh(shoulderLGeo, crimsonArmorMat);
    shoulderL.position.set(-1.45, 0.35, -0.1);
    shoulderL.rotation.z = -0.3;
    chestGroup.add(shoulderL);

    const shoulderR = new THREE.Mesh(shoulderLGeo, crimsonArmorMat);
    shoulderR.position.set(1.45, 0.35, -0.1);
    shoulderR.rotation.z = 0.3;
    chestGroup.add(shoulderR);

    // Chest Golden Accents
    const chestGoldLGeo = new THREE.BoxGeometry(0.45, 0.9, 0.15);
    const chestGoldL = new THREE.Mesh(chestGoldLGeo, goldFaceplateMat);
    chestGoldL.position.set(-0.65, 0.05, 0.58);
    chestGoldL.rotation.z = -0.22;
    chestGroup.add(chestGoldL);

    const chestGoldR = new THREE.Mesh(chestGoldLGeo, goldFaceplateMat);
    chestGoldR.position.set(0.65, 0.05, 0.58);
    chestGoldR.rotation.z = 0.22;
    chestGroup.add(chestGoldR);

    // Glowing Arc Reactor Housing (Ring + Inner Core)
    const arcRingGeo = new THREE.TorusGeometry(0.38, 0.06, 16, 32);
    const arcRing = new THREE.Mesh(arcRingGeo, goldFaceplateMat);
    arcRing.position.set(0, 0.12, 0.58);
    chestGroup.add(arcRing);

    // Arc Reactor Glowing Core Disc
    const arcCoreGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.08, 32);
    arcCoreGeo.rotateX(Math.PI / 2);
    const arcCore = new THREE.Mesh(arcCoreGeo, glowingCyanMat);
    arcCore.position.set(0, 0.12, 0.57);
    chestGroup.add(arcCore);

    // Arc Reactor Inner White Super-Core
    const arcHotspot = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 16), eyeCoreMat);
    arcHotspot.position.set(0, 0.12, 0.62);
    chestGroup.add(arcHotspot);

    // Arc Reactor Point Light
    const arcLight = new THREE.PointLight(0x00f0ff, 3.5, 4.0);
    arcLight.position.set(0, 0.12, 0.9);
    chestGroup.add(arcLight);

    ironManGroup.add(chestGroup);

    // Position Iron Man in Center
    ironManGroup.position.set(0, 0.5, 0);
    scene.add(ironManGroup);

    // --- 5. 3D HOLOGRAPHIC HUD RINGS & PARTICLES ---
    // Outer HUD Rings in 3D Space
    const hudGroup = new THREE.Group();

    const ring1Geo = new THREE.RingGeometry(2.4, 2.45, 64);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    hudGroup.add(ring1);

    const ring2Geo = new THREE.RingGeometry(2.8, 2.84, 48);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xffd700,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = 0.2;
    hudGroup.add(ring2);

    const ring3Geo = new THREE.RingGeometry(3.3, 3.34, 36);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0xff003c,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.y = -0.2;
    hudGroup.add(ring3);

    scene.add(hudGroup);

    // Floating 3D Stark Nanotech Particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = (Math.random() - 0.5) * 8;
      positions[i + 2] = (Math.random() - 0.5) * 6;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.045,
      transparent: true,
      opacity: 0.7,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- 6. CINEMATIC STUDIO LIGHTING ---
    // Ambient Light (Subtle Fill)
    const ambientLight = new THREE.AmbientLight(0x1a0005, 1.2);
    scene.add(ambientLight);

    // Key Light (Warm Titanium Gold from Top Right)
    const keyLight = new THREE.DirectionalLight(0xfffaed, 3.2);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    // Stark Cyan Rim Light (Cool Cyber Glow from Left/Back)
    const cyanRimLight = new THREE.DirectionalLight(0x00f0ff, 4.0);
    cyanRimLight.position.set(-5, 2, -3);
    scene.add(cyanRimLight);

    // Crimson Fill Light from Bottom
    const redBottomLight = new THREE.DirectionalLight(0xff003c, 2.2);
    redBottomLight.position.set(0, -4, 2);
    scene.add(redBottomLight);

    // --- 7. ANIMATION LOOP ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotation Speed based on state
      const rotSpeed =
        state === "processing" ? 1.6 : state === "speaking" ? 1.1 : state === "listening" ? 0.9 : 0.6;

      // 1. Continuous 360° 3D Y-Axis Rotation ("घूमता रहे")
      ironManGroup.rotation.y = elapsedTime * rotSpeed;

      // Gentle realistic pitch & roll sway
      ironManGroup.rotation.x = Math.sin(elapsedTime * 1.2) * 0.08;
      ironManGroup.rotation.z = Math.cos(elapsedTime * 0.9) * 0.04;

      // 2. Continuous Smooth Scaling / Breathing / Pulsing ("स्मॉल और पल्स करता रहे")
      let scaleBase = 1.0;
      let pulseAmp = 0.09;
      let pulseFreq = 2.0;

      if (state === "speaking") {
        pulseAmp = 0.14;
        pulseFreq = 4.2;
      } else if (state === "listening") {
        pulseAmp = 0.11;
        pulseFreq = 2.8;
      } else if (state === "processing") {
        pulseAmp = 0.16;
        pulseFreq = 5.0;
      }

      const dynamicScale = scaleBase + Math.sin(elapsedTime * pulseFreq) * pulseAmp;
      ironManGroup.scale.set(dynamicScale, dynamicScale, dynamicScale);

      // Eye Lights Pulse
      const eyeIntensity = 2.0 + Math.sin(elapsedTime * 6) * (state === "speaking" ? 1.5 : 0.6);
      eyeLightL.intensity = eyeIntensity;
      eyeLightR.intensity = eyeIntensity;
      arcLight.intensity = 2.5 + Math.cos(elapsedTime * 5) * 1.2;

      // 3. Rotate 3D HUD Rings
      ring1.rotation.z = elapsedTime * 0.4;
      ring2.rotation.z = -elapsedTime * 0.6;
      ring3.rotation.z = elapsedTime * 0.3;

      // 4. Drift Particles
      particles.rotation.y = elapsedTime * 0.05;
      particles.rotation.x = Math.sin(elapsedTime * 0.03) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 360;
      const newH = container.clientHeight || 420;
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
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
      <div
        ref={mountRef}
        className="w-[320px] h-[380px] sm:w-[380px] sm:h-[440px] md:w-[440px] md:h-[500px] flex items-center justify-center"
      />
    </div>
  );
}
