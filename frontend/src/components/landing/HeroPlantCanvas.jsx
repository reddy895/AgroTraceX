// src/components/landing/HeroPlantCanvas.jsx
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const HeroPlantCanvas = () => {
  const mountRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 500;
    let height = container.clientHeight || 500;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.08);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 1.3, 5.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.8);
    keyLight.position.set(4, 7, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xcccccc, 1.6);
    fillLight.position.set(-4, 3, -2);
    scene.add(fillLight);

    // Rim light for the glowing glass leaf silhouette
    const rimLight = new THREE.PointLight(0xffffff, 4.2, 14);
    rimLight.position.set(0, 3, -2.5);
    scene.add(rimLight);

    // Hover interactive glow light
    const hoverGlowLight = new THREE.PointLight(0xffffff, 1.0, 9);
    hoverGlowLight.position.set(0, 1.5, 1.8);
    scene.add(hoverGlowLight);

    // --- Main Plant Container Group ---
    const plantGroup = new THREE.Group();
    scene.add(plantGroup);

    // --- 1. Base Soil / Faceted Rock Substrate ---
    const rockGeo = new THREE.DodecahedronGeometry(0.72, 1);
    // Deform vertices slightly to make organic rock mound
    const posAttr = rockGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const y = posAttr.getY(i);
      // Flatten bottom half
      if (y < 0) {
        posAttr.setY(i, y * 0.45);
      }
      const noise = (Math.sin(i * 3.7) + Math.cos(i * 2.1)) * 0.04;
      posAttr.setX(i, posAttr.getX(i) + noise);
      posAttr.setZ(i, posAttr.getZ(i) + noise);
    }
    rockGeo.computeVertexNormals();

    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.85,
      metalness: 0.15,
      flatShading: true
    });
    const rockMesh = new THREE.Mesh(rockGeo, rockMat);
    rockMesh.position.y = -0.15;
    plantGroup.add(rockMesh);

    // Wireframe overlay for dark-tech scientific aesthetic
    const rockWireMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.1
    });
    const rockWireMesh = new THREE.Mesh(rockGeo, rockWireMat);
    rockWireMesh.position.y = -0.15;
    plantGroup.add(rockWireMesh);

    // Subtle emergence ring collar
    const collarGeo = new THREE.TorusGeometry(0.12, 0.02, 16, 32);
    collarGeo.rotateX(Math.PI / 2);
    const collarMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.9,
      roughness: 0.2
    });
    const collar = new THREE.Mesh(collarGeo, collarMat);
    collar.position.set(0, 0.22, 0);
    plantGroup.add(collar);

    // --- 2. Curved Glass Stem ---
    const stemCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.22, 0),
      new THREE.Vector3(0.04, 0.65, 0.02),
      new THREE.Vector3(-0.03, 1.25, -0.02),
      new THREE.Vector3(0.02, 1.75, 0.03),
      new THREE.Vector3(0, 2.15, 0)
    ]);

    const stemGeo = new THREE.TubeGeometry(stemCurve, 64, 0.055, 16, false);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: 0x1f1f1f,
      roughness: 0.18,
      metalness: 0.04,
      transmission: 0.35,
      thickness: 0.5,
      ior: 1.48,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide
    });
    const stemMesh = new THREE.Mesh(stemGeo, glassMat);
    plantGroup.add(stemMesh);

    // Glowing internal vascular stem vein
    const stemVeinGeo = new THREE.TubeGeometry(stemCurve, 32, 0.012, 8, false);
    const stemVeinMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.85
    });
    const stemVeinMesh = new THREE.Mesh(stemVeinGeo, stemVeinMat);
    plantGroup.add(stemVeinMesh);

    // Luminous frosted white material for the leaves (brilliantly white with soft translucent depth)
    const leafMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: 0x282828,
      roughness: 0.22,
      metalness: 0.04,
      transmission: 0.28,
      thickness: 0.4,
      ior: 1.48,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.94,
      side: THREE.DoubleSide
    });

    // --- 3. Procedural Curved Glass Leaves with Glowing Veins ---
    const createLeaf = (length = 1.0, maxWidth = 0.46) => {
      const leafGroup = new THREE.Group();

      // Parametric-like leaf surface
      const segmentsU = 24;
      const segmentsV = 16;
      const positions = [];
      const uvs = [];
      const indices = [];

      for (let i = 0; i <= segmentsU; i++) {
        const u = i / segmentsU; // 0 (stem attachment) to 1 (tip)
        // Natural leaf width curve: 0 at base, peak at 40%, 0 at tip
        const widthFactor = Math.sin(Math.PI * Math.pow(u, 0.75)) * maxWidth;
        // Arch curvature along length
        const z = -Math.sin(u * Math.PI * 0.7) * (length * 0.35);
        const y = u * length;

        for (let j = 0; j <= segmentsV; j++) {
          const v = j / segmentsV; // 0 (left edge) to 1 (right edge)
          const offset = (v - 0.5) * 2; // -1 to 1
          const x = offset * widthFactor;
          // Leaf trough / cross-section cup curvature
          const troughY = Math.pow(Math.abs(offset), 2) * 0.05;

          positions.push(x, y + troughY, z);
          uvs.push(u, v);
        }
      }

      for (let i = 0; i < segmentsU; i++) {
        for (let j = 0; j < segmentsV; j++) {
          const a = i * (segmentsV + 1) + j;
          const b = (i + 1) * (segmentsV + 1) + j;
          const c = (i + 1) * (segmentsV + 1) + (j + 1);
          const d = i * (segmentsV + 1) + (j + 1);

          indices.push(a, b, d);
          indices.push(b, c, d);
        }
      }

      const leafGeo = new THREE.BufferGeometry();
      leafGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      leafGeo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
      leafGeo.setIndex(indices);
      leafGeo.computeVertexNormals();

      const leafMesh = new THREE.Mesh(leafGeo, leafMat);
      leafGroup.add(leafMesh);

      // Fine Glowing Internal Veins
      const veinPoints = [];
      // 1. Central Rachis / Midrib
      const midribSteps = 28;
      for (let i = 0; i < midribSteps; i++) {
        const u1 = i / midribSteps;
        const u2 = (i + 1) / midribSteps;
        const z1 = -Math.sin(u1 * Math.PI * 0.7) * (length * 0.35) + 0.005;
        const z2 = -Math.sin(u2 * Math.PI * 0.7) * (length * 0.35) + 0.005;
        veinPoints.push(
          new THREE.Vector3(0, u1 * length, z1),
          new THREE.Vector3(0, u2 * length, z2)
        );

        // 2. Secondary Lateral Veins branching off
        if (i % 3 === 1 && u1 > 0.15 && u1 < 0.85) {
          const w = Math.sin(Math.PI * Math.pow(u1, 0.75)) * maxWidth * 0.85;
          const vy = (u1 + 0.08) * length;
          const vz = -Math.sin((u1 + 0.08) * Math.PI * 0.7) * (length * 0.35) + 0.005;

          // Left lateral vein
          veinPoints.push(
            new THREE.Vector3(0, u1 * length, z1),
            new THREE.Vector3(-w, vy, vz)
          );
          // Right lateral vein
          veinPoints.push(
            new THREE.Vector3(0, u1 * length, z1),
            new THREE.Vector3(w, vy, vz)
          );
        }
      }

      const veinGeo = new THREE.BufferGeometry().setFromPoints(veinPoints);
      const veinMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 1.0,
        blending: THREE.AdditiveBlending
      });
      const veinLines = new THREE.LineSegments(veinGeo, veinMat);
      leafGroup.add(veinLines);

      return { leafGroup, veinMat, leafMesh };
    };

    // Instantiate 6 beautifully arranged leaves (spiral phyllotaxis)
    const leafConfigs = [
      // Lower cotyledon leaves (large, broad, arching outward)
      { pos: new THREE.Vector3(0.04, 0.85, 0.02), rot: [0.95, 0.4, -0.6], len: 1.15, width: 0.52 },
      { pos: new THREE.Vector3(-0.04, 0.95, -0.02), rot: [0.95, 3.4, 0.6], len: 1.15, width: 0.52 },
      // Middle vegetative leaves
      { pos: new THREE.Vector3(0.01, 1.35, 0.03), rot: [0.85, 1.7, -0.4], len: 1.0, width: 0.44 },
      { pos: new THREE.Vector3(-0.02, 1.45, -0.01), rot: [0.85, 4.8, 0.4], len: 0.95, width: 0.42 },
      // Upper developing true leaves
      { pos: new THREE.Vector3(0.02, 1.85, 0.01), rot: [0.65, 0.9, -0.3], len: 0.75, width: 0.35 },
      { pos: new THREE.Vector3(-0.01, 1.95, -0.02), rot: [0.65, 3.9, 0.3], len: 0.72, width: 0.34 },
      // Apical shoot bud (youngest unfurling leaf)
      { pos: new THREE.Vector3(0, 2.15, 0), rot: [0.35, 2.3, 0.1], len: 0.5, width: 0.22 }
    ];

    const leafObjects = [];
    leafConfigs.forEach((cfg) => {
      const { leafGroup, veinMat, leafMesh } = createLeaf(cfg.len, cfg.width);
      leafGroup.position.copy(cfg.pos);
      leafGroup.rotation.set(cfg.rot[0], cfg.rot[1], cfg.rot[2]);
      plantGroup.add(leafGroup);
      leafObjects.push({ group: leafGroup, veinMat, leafMesh, baseRot: [...cfg.rot] });
    });

    // Set initial plant position & scale
    plantGroup.position.set(0, -0.9, 0);
    plantGroup.scale.set(1.15, 1.15, 1.15);

    // --- Mouse Tracking & Parallax Interpolation ---
    let mouseX = 0;
    let mouseY = 0;
    let targetRotY = 0;
    let targetRotX = 0;
    let smoothMouseRotY = 0;
    let smoothMouseRotX = 0;
    let autoRotationY = 0;
    let targetScale = 1.15;
    let currentScale = 1.15;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      // Normalized coordinates (-1 to 1)
      mouseX = (clientX / width) * 2 - 1;
      mouseY = -(clientY / height) * 2 + 1;

      targetRotY = mouseX * 0.45;
      targetRotX = -mouseY * 0.2;
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      targetScale = 1.22;
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      mouseX = 0;
      mouseY = 0;
      targetRotY = 0;
      targetRotX = 0;
      targetScale = 1.15;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    // --- Animation Loop ---
    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();

      // Continuous slow smooth auto-rotation around Y axis (never stops)
      autoRotationY += delta * 0.105;

      // Smooth mouse offset interpolation
      smoothMouseRotY = THREE.MathUtils.lerp(smoothMouseRotY, targetRotY, 0.045);
      smoothMouseRotX = THREE.MathUtils.lerp(smoothMouseRotX, targetRotX, 0.045);

      // Continuous 360-degree rotation combined with subtle mouse tilt
      plantGroup.rotation.y = autoRotationY + smoothMouseRotY;
      plantGroup.rotation.x = smoothMouseRotX + Math.cos(time * 0.8) * 0.02;

      // Smooth scale lerp on hover
      currentScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.05);
      plantGroup.scale.set(currentScale, currentScale, currentScale);

      // Camera subtle parallax
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX * 0.35, 0.035);
      camera.position.y = THREE.MathUtils.lerp(
        camera.position.y,
        1.3 + mouseY * 0.2 + Math.sin(time * 0.5) * 0.03,
        0.035
      );
      camera.lookAt(0, 0.5, 0);

      // Leaf subtle micro-swaying (biological breathing)
      leafObjects.forEach((leaf, idx) => {
        const sway = Math.sin(time * 1.2 + idx * 1.1) * 0.025;
        leaf.group.rotation.x = leaf.baseRot[0] + sway;
      });

      // Glow lights intensity adjustment on hover
      const targetGlow = targetScale > 1.16 ? 4.8 : 1.2;
      hoverGlowLight.intensity = THREE.MathUtils.lerp(
        hoverGlowLight.intensity,
        targetGlow,
        0.06
      );

      renderer.render(scene, camera);
    };

    animate();

    // --- Resize Handling ---
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      scene.traverse((child) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => mat.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[420px] sm:h-[500px] lg:h-[580px] select-none flex items-center justify-center">
      {/* Subtle Atmospheric Black/White Radial Backdrop Halo */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${isHovered ? 'opacity-40' : 'opacity-20'
          }`}
        style={{
          background:
            'radial-gradient(circle at 50% 55%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.02) 45%, transparent 70%)'
        }}
      />

      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Subtle Floating 3D Telemetry Tooltip Badge */}
      <div className="absolute bottom-4 right-6 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-3xs font-mono text-neutral-400">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
        <span>THREE.JS VASCULAR GENETICS SIMULATION</span>
      </div>
    </div>
  );
};
