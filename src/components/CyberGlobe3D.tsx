import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface CyberGlobe3DProps {
  themeColor?: string;
  size?: number;
}

export default function CyberGlobe3D({
  themeColor = "#00f0ff",
  size = 170,
}: CyberGlobe3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const globeGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = size;
    const height = size;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 3.6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    globeGroupRef.current = globeGroup;
    scene.add(globeGroup);

    const mainColor = new THREE.Color(themeColor);

    // 1. Inner Wireframe Sphere
    const sphereGeo = new THREE.SphereGeometry(1.25, 18, 12);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: mainColor,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const globeMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(globeMesh);

    // 2. Latitude / Longitude Accent Rings
    const equatorGeo = new THREE.RingGeometry(1.24, 1.27, 32);
    const equatorMat = new THREE.MeshBasicMaterial({
      color: mainColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });
    const equator = new THREE.Mesh(equatorGeo, equatorMat);
    equator.rotation.x = Math.PI / 2;
    globeGroup.add(equator);

    // 3. Tilted Outer Orbit Ring with glowing satellite node
    const orbitRingGeo = new THREE.RingGeometry(1.52, 1.55, 48);
    const orbitRingMat = new THREE.MeshBasicMaterial({
      color: mainColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
    });
    const orbitRing = new THREE.Mesh(orbitRingGeo, orbitRingMat);
    orbitRing.rotation.x = Math.PI / 3;
    orbitRing.rotation.y = Math.PI / 6;
    globeGroup.add(orbitRing);

    // Glowing satellite node on orbit
    const satGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const satMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const satellite = new THREE.Mesh(satGeo, satMat);
    satellite.position.set(1.53, 0, 0);
    orbitRing.add(satellite);

    // 4. City Target Dots (Stark Tower, Malibu, Moscow, Tokyo, London)
    const pointsGeo = new THREE.BufferGeometry();
    const cityCoords = [
      [0.7, 0.4, 0.8],
      [-0.6, 0.5, 0.8],
      [0.2, 0.9, 0.6],
      [0.9, 0.6, -0.4],
      [-0.1, 0.8, 0.7],
      [-0.5, -0.5, 0.8],
    ];
    const positions = new Float32Array(cityCoords.flat());
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pointsMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.08,
      transparent: true,
      opacity: 0.9,
    });
    const pointsMesh = new THREE.Points(pointsGeo, pointsMat);
    globeGroup.add(pointsMesh);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDraggingRef.current && globeGroup) {
        globeGroup.rotation.y += 0.006;
        globeGroup.rotation.x = Math.sin(Date.now() * 0.001) * 0.15;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Mouse drag interaction
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !globeGroupRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      globeGroupRef.current.rotation.y += deltaX * 0.01;
      globeGroupRef.current.rotation.x += deltaY * 0.01;

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      cancelAnimationFrame(animationFrameId);
      dom.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [themeColor, size]);

  return (
    <div
      ref={mountRef}
      className="relative flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      style={{ width: size, height: size }}
      title="3D Global Defense Telemetry (Drag to rotate)"
    />
  );
}
