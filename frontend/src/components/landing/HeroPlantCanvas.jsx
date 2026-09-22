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

    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const auraParticleCount = isMobile ? 35 : isTablet ? 60 : 95;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.06);

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 1.15, 4.4);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // --- Lighting (Cinematic Monochrome White / Silver) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Key Light: highlights the tender 2-leaf curves and stem
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(3.5, 5.0, 4.0);
    scene.add(keyLight);

    // Rim Light: bright white edge silhouette from behind
    const rimLight = new THREE.DirectionalLight(0xffffff, 3.6);
    rimLight.position.set(-3.0, 4.0, -3.8);
    scene.add(rimLight);

    // Fill Light: subtle shadow fill
    const fillLight = new THREE.DirectionalLight(0x999999, 1.1);
    fillLight.position.set(-3.5, 0.5, 2.5);
    scene.add(fillLight);

    // Hover interactive glow point light
    const hoverGlowLight = new THREE.PointLight(0xffffff, 0.8, 6.0);
    hoverGlowLight.position.set(0, 1.3, 1.5);
    scene.add(hoverGlowLight);

    // --- 1. Procedural High-Resolution Botanical Leaf Texture ---
    const createBotanicalLeafTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');

      ctx.clearRect(0, 0, 1024, 1024);

      // Natural tender seedling cotyledon blade contour
      ctx.beginPath();
      ctx.moveTo(512, 950);

      // Left margin curve (smooth broad seedling expansion)
      ctx.bezierCurveTo(430, 890, 200, 730, 160, 510);
      ctx.bezierCurveTo(120, 330, 290, 180, 512, 70);

      // Right margin curve
      ctx.bezierCurveTo(734, 180, 904, 330, 864, 510);
      ctx.bezierCurveTo(824, 730, 594, 890, 512, 950);
      ctx.closePath();

      // Blade Body Gradient: Translucent white/silver with soft light diffusion
      const bodyGrad = ctx.createRadialGradient(512, 510, 30, 512, 510, 460);
      bodyGrad.addColorStop(0.0, 'rgba(255, 255, 255, 0.95)');
      bodyGrad.addColorStop(0.3, 'rgba(242, 247, 252, 0.86)');
      bodyGrad.addColorStop(0.65, 'rgba(218, 230, 242, 0.66)');
      bodyGrad.addColorStop(0.9, 'rgba(195, 212, 228, 0.45)');
      bodyGrad.addColorStop(1.0, 'rgba(255, 255, 255, 0.85)');
      ctx.fillStyle = bodyGrad;
      ctx.fill();

      // Crisp outer margin rim
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.stroke();

      ctx.save();
      ctx.clip();

      // Tertiary Micro-Capillary Network
      ctx.lineWidth = 1.0;
      ctx.strokeStyle = 'rgba(215, 230, 245, 0.25)';
      for (let side = -1; side <= 1; side += 2) {
        for (let i = 0; i < 9; i++) {
          const yStart = 870 - i * 85;
          for (let j = 0; j < 5; j++) {
            const frac = (j + 1) / 6;
            const xMid = 512 + side * (frac * 260);
            const yMid = yStart - frac * 55;
            ctx.beginPath();
            ctx.arc(xMid, yMid, 16, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      }

      // Secondary Lateral Veins (7 pairs curving gracefully toward apex)
      const lateralPairs = 7;
      for (let i = 0; i < lateralPairs; i++) {
        const t = (i + 1) / (lateralPairs + 1);
        const startY = 880 - t * 730;
        const endY = startY - 110;
        const reach = Math.sin(t * Math.PI) * 300 + 15;

        // Left lateral vein
        ctx.beginPath();
        ctx.moveTo(512, startY);
        ctx.quadraticCurveTo(512 - reach * 0.48, startY - 45, 512 - reach, endY);
        ctx.lineWidth = Math.max(1.8, 5.0 * (1 - t * 0.65));
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.78)';
        ctx.stroke();

        // Right lateral vein
        ctx.beginPath();
        ctx.moveTo(512, startY);
        ctx.quadraticCurveTo(512 + reach * 0.48, startY - 45, 512 + reach, endY);
        ctx.lineWidth = Math.max(1.8, 5.0 * (1 - t * 0.65));
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.78)';
        ctx.stroke();
      }

      // Primary Central Midrib: Bright glowing white
      ctx.beginPath();
      ctx.moveTo(512, 950);
      ctx.bezierCurveTo(512, 680, 512, 360, 512, 70);
      ctx.lineWidth = 13;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.shadowColor = 'rgba(255, 255, 255, 0.85)';
      ctx.shadowBlur = 12;
      ctx.stroke();

      // Sharp central highlight thread
      ctx.beginPath();
      ctx.moveTo(512, 950);
      ctx.bezierCurveTo(512, 680, 512, 360, 512, 70);
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'rgba(255, 255, 255, 1.0)';
      ctx.shadowBlur = 0;
      ctx.stroke();

      ctx.restore();

      const texture = new THREE.CanvasTexture(canvas);
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      return texture;
    };

    const leafTexture = createBotanicalLeafTexture();

    // High-end translucent white leaf material
    const leafMaterial = new THREE.MeshStandardMaterial({
      map: leafTexture,
      transparent: true,
      alphaTest: 0.08,
      roughness: 0.26,
      metalness: 0.05,
      side: THREE.DoubleSide,
      depthWrite: true,
      shadowSide: THREE.DoubleSide
    });

    // Stem and petiole material (silvery translucent white)
    const stemMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf5f8fb,
      roughness: 0.22,
      metalness: 0.06,
      transmission: 0.82,
      thickness: 0.5,
      ior: 1.46,
      clearcoat: 0.85,
      clearcoatRoughness: 0.15,
      transparent: true,
      opacity: 0.92,
      side: THREE.DoubleSide
    });

    // Internal vascular bundle material
    const vascularCoreMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.85
    });

    // Root material (delicate silver-white)
    const rootMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xd5dde5,
      roughness: 0.35,
      metalness: 0.08,
      transmission: 0.65,
      thickness: 0.35,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide
    });

    // --- Main Plant Container Group ---
    const plantGroup = new THREE.Group();
    scene.add(plantGroup);

    // --- 2. Minimalist Scientific Pedestal ---
    const pedestalGeo = new THREE.CylinderGeometry(0.65, 0.75, 0.12, 48);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x090a0d,
      roughness: 0.65,
      metalness: 0.35
    });
    const pedestalMesh = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestalMesh.position.y = -0.32;
    plantGroup.add(pedestalMesh);

    // Glowing telemetry circular ring on pedestal
    const ringGeo = new THREE.TorusGeometry(0.52, 0.007, 16, 64);
    ringGeo.rotateX(Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.45
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.y = -0.25;
    plantGroup.add(ringMesh);

    // Stem collar ring at emergence point
    const collarGeo = new THREE.TorusGeometry(0.1, 0.014, 16, 36);
    collarGeo.rotateX(Math.PI / 2);
    const collarMesh = new THREE.Mesh(collarGeo, stemMaterial);
    collarMesh.position.y = 0.05;
    plantGroup.add(collarMesh);

    // --- 3. Organic Branching Root System ---
    const rootGroup = new THREE.Group();
    plantGroup.add(rootGroup);

    // Central taproot descending into the dark void
    const taprootCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.05, 0),
      new THREE.Vector3(0.02, -0.15, 0.01),
      new THREE.Vector3(-0.03, -0.4, -0.02),
      new THREE.Vector3(0.02, -0.7, 0.02),
      new THREE.Vector3(0, -1.0, 0)
    ]);
    const taprootGeo = new THREE.TubeGeometry(taprootCurve, 36, 0.028, 10, false);
    const taprootMesh = new THREE.Mesh(taprootGeo, rootMaterial);
    rootGroup.add(taprootMesh);

    const taprootCoreGeo = new THREE.TubeGeometry(taprootCurve, 28, 0.007, 6, false);
    const taprootCoreMesh = new THREE.Mesh(taprootCoreGeo, vascularCoreMaterial);
    rootGroup.add(taprootCoreMesh);

    // 5 Lateral Roots radiating outwards and curving over pedestal into darkness
    const lateralRootAngles = [0, (2 * Math.PI) / 5, (4 * Math.PI) / 5, (6 * Math.PI) / 5, (8 * Math.PI) / 5];
    lateralRootAngles.forEach((ang, idx) => {
      const cosA = Math.cos(ang);
      const sinA = Math.sin(ang);
      const reach = 0.42 + (idx % 2) * 0.12;

      const path = [
        new THREE.Vector3(cosA * 0.05, 0.02, sinA * 0.05),
        new THREE.Vector3(cosA * (reach * 0.45), -0.12, sinA * (reach * 0.45)),
        new THREE.Vector3(cosA * (reach * 0.85), -0.32, sinA * (reach * 0.85)),
        new THREE.Vector3(cosA * (reach * 1.05), -0.62, sinA * (reach * 1.05))
      ];
      const curve = new THREE.CatmullRomCurve3(path);
      const geo = new THREE.TubeGeometry(curve, 20, 0.018, 8, false);
      const mesh = new THREE.Mesh(geo, rootMaterial);
      rootGroup.add(mesh);

      const coreGeo = new THREE.TubeGeometry(curve, 16, 0.005, 6, false);
      const coreMesh = new THREE.Mesh(coreGeo, vascularCoreMaterial);
      rootGroup.add(coreMesh);
    });

    // --- 4. Slender Organic Curved Stem (Hypocotyl) ---
    const stemCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.05, 0),
      new THREE.Vector3(0.035, 0.5, 0.015),
      new THREE.Vector3(-0.025, 1.0, -0.015),
      new THREE.Vector3(0.02, 1.45, 0.02),
      new THREE.Vector3(0, 1.82, 0)
    ]);

    const stemGeo = new THREE.TubeGeometry(stemCurve, 48, 0.042, 16, false);
    const stemMesh = new THREE.Mesh(stemGeo, stemMaterial);
    plantGroup.add(stemMesh);

    // Glowing internal vascular core
    const stemCoreGeo = new THREE.TubeGeometry(stemCurve, 36, 0.01, 8, false);
    const stemCoreMesh = new THREE.Mesh(stemCoreGeo, vascularCoreMaterial);
    plantGroup.add(stemCoreMesh);

    // Nodal collar ring where the 2 cotyledons attach
    const crownNodeGeo = new THREE.TorusGeometry(0.04, 0.01, 10, 24);
    crownNodeGeo.rotateX(Math.PI / 2);
    const crownNode = new THREE.Mesh(crownNodeGeo, stemMaterial);
    crownNode.position.set(0, 1.82, 0);
    plantGroup.add(crownNode);

    // --- 5. Curved Leaf Blade Construction ---
    const createCurvedLeafBlade = (length = 1.3, width = 0.74, archFactor = 0.32, cupFactor = 0.11) => {
      const segmentsU = 26;
      const segmentsV = 18;
      const positions = [];
      const uvs = [];
      const indices = [];

      for (let i = 0; i <= segmentsU; i++) {
        const u = i / segmentsU;

        const y = u * length;
        const z = -Math.sin(u * Math.PI * 0.72) * (length * archFactor) -
          Math.pow(u, 2.2) * (length * 0.15);

        for (let j = 0; j <= segmentsV; j++) {
          const v = j / segmentsV;
          const s = (v - 0.5) * 2;

          const x = s * (width * 0.5);
          const cupZ = Math.pow(Math.abs(s), 1.5) * (width * cupFactor) * (1.0 - u * 0.35);

          positions.push(x, y, z + cupZ);
          uvs.push(v, 1.0 - u);
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

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
      geo.setIndex(indices);
      geo.computeVertexNormals();

      return new THREE.Mesh(geo, leafMaterial);
    };

    // Creates a single cotyledon branch: Petiole + Leaf Blade
    const createCotyledon = ({ pLen = 0.45, length = 1.3, width = 0.74, roll = 0 }) => {
      const branchGroup = new THREE.Group();

      const petioleCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, pLen * 0.4, -pLen * 0.16),
        new THREE.Vector3(0, pLen * 0.85, -pLen * 0.45),
        new THREE.Vector3(0, pLen * 0.98, -pLen * 0.65)
      ]);
      const petioleGeo = new THREE.TubeGeometry(petioleCurve, 16, 0.018, 8, false);
      const petioleMesh = new THREE.Mesh(petioleGeo, stemMaterial);
      branchGroup.add(petioleMesh);

      const petioleCoreGeo = new THREE.TubeGeometry(petioleCurve, 12, 0.005, 6, false);
      const petioleCoreMesh = new THREE.Mesh(petioleCoreGeo, vascularCoreMaterial);
      branchGroup.add(petioleCoreMesh);

      const leafBlade = createCurvedLeafBlade(length, width, 0.32, 0.11);
      const endPoint = petioleCurve.getPointAt(1.0);
      const tangent = petioleCurve.getTangentAt(1.0);

      leafBlade.position.copy(endPoint);
      leafBlade.rotation.x = Math.atan2(-tangent.z, tangent.y) - 0.28;
      leafBlade.rotation.z = roll;
      branchGroup.add(leafBlade);

      return { branchGroup, leafBlade };
    };

    // --- 6. EXACTLY TWO COTYLEDON LEAVES (Left & Right Sprout Canopy) ---
    const crownPos = new THREE.Vector3(0, 1.82, 0);

    // Leaf 1 (Left Cotyledon): Spreading gracefully to the left
    const leftLeaf = createCotyledon({
      pLen: 0.48,
      length: 1.32,
      width: 0.76,
      roll: 0.06
    });
    leftLeaf.branchGroup.position.copy(crownPos);
    leftLeaf.branchGroup.rotation.y = Math.PI * 0.88; // ~158°
    leftLeaf.branchGroup.rotation.x = 0.82; // ~47° pitch outward
    plantGroup.add(leftLeaf.branchGroup);

    // Leaf 2 (Right Cotyledon): Spreading gracefully to the right (opposite side)
    const rightLeaf = createCotyledon({
      pLen: 0.48,
      length: 1.28,
      width: 0.74,
      roll: -0.06
    });
    rightLeaf.branchGroup.position.copy(crownPos);
    rightLeaf.branchGroup.rotation.y = -Math.PI * 0.12; // ~-22° (180° opposite)
    rightLeaf.branchGroup.rotation.x = 0.84; // ~48° pitch outward
    plantGroup.add(rightLeaf.branchGroup);

    // Tiny Center Apical Bud (Delicate emerging plumule shoot)
    const apicalBudGeo = new THREE.ConeGeometry(0.035, 0.25, 8);
    apicalBudGeo.rotateX(Math.PI);
    const apicalBud = new THREE.Mesh(apicalBudGeo, stemMaterial);
    apicalBud.position.set(0, 1.95, 0);
    plantGroup.add(apicalBud);

    const apicalCoreGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.22, 6);
    const apicalCore = new THREE.Mesh(apicalCoreGeo, vascularCoreMaterial);
    apicalCore.position.set(0, 1.95, 0);
    plantGroup.add(apicalCore);

    // --- 7. Local Micro Bio-Aura Particles Around Seedling ---
    const auraGeo = new THREE.BufferGeometry();
    const auraPos = new Float32Array(auraParticleCount * 3);
    const auraBasePos = new Float32Array(auraParticleCount * 3);
    const auraPhases = new Float32Array(auraParticleCount * 4);

    for (let i = 0; i < auraParticleCount; i++) {
      const i3 = i * 3;
      const rad = 0.35 + Math.random() * 1.5;
      const ang = Math.random() * Math.PI * 2;
      const x = Math.cos(ang) * rad;
      const y = -0.2 + Math.random() * 2.2;
      const z = Math.sin(ang) * rad;

      auraPos[i3] = auraBasePos[i3] = x;
      auraPos[i3 + 1] = auraBasePos[i3 + 1] = y;
      auraPos[i3 + 2] = auraBasePos[i3 + 2] = z;

      const i4 = i * 4;
      auraPhases[i4] = Math.random() * Math.PI * 2;
      auraPhases[i4 + 1] = Math.random() * Math.PI * 2;
      auraPhases[i4 + 2] = 0.4 + Math.random() * 0.6;
      auraPhases[i4 + 3] = 0.04 + Math.random() * 0.08;
    }

    auraGeo.setAttribute('position', new THREE.BufferAttribute(auraPos, 3));

    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d');
    const pGrad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    pGrad.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    pGrad.addColorStop(0.2, 'rgba(245, 250, 255, 0.8)');
    pGrad.addColorStop(0.5, 'rgba(210, 225, 240, 0.3)');
    pGrad.addColorStop(0.85, 'rgba(180, 200, 220, 0.06)');
    pGrad.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 64, 64);

    const auraTexture = new THREE.CanvasTexture(pCanvas);
    const auraMat = new THREE.PointsMaterial({
      size: isMobile ? 0.04 : 0.055,
      map: auraTexture,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const auraParticles = new THREE.Points(auraGeo, auraMat);
    plantGroup.add(auraParticles);

    // Initial plant position & scale (perfectly centered, ~45% hero visual)
    plantGroup.position.set(0, -0.88, 0);
    const baseScale = isMobile ? 0.95 : 1.15;
    plantGroup.scale.set(baseScale, baseScale, baseScale);

    // --- Interaction State & Continuous Rotation ---
    let mouseX = 0;
    let mouseY = 0;
    let smoothMouseRotY = 0;
    let smoothMouseRotX = 0;
    let autoRotationY = 0;
    let hoverProgress = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      mouseX = (clientX / width) * 2 - 1;
      mouseY = -(clientY / height) * 2 + 1;
    };

    let isHoveredLocal = false;

    const handleMouseEnter = () => {
      isHoveredLocal = true;
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      isHoveredLocal = false;
      setIsHovered(false);
      mouseX = 0;
      mouseY = 0;
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

      // 1. Continuous Automatic Rotation (0.105 radians/sec - very smooth, never stopping)
      autoRotationY += delta * 0.105;

      // 2. Mouse Parallax (Offset combined with continuous base rotation)
      const targetRotY = mouseX * 0.3;
      const targetRotX = -mouseY * 0.15;
      smoothMouseRotY = THREE.MathUtils.lerp(smoothMouseRotY, targetRotY, 0.045);
      smoothMouseRotX = THREE.MathUtils.lerp(smoothMouseRotX, targetRotX, 0.045);

      plantGroup.rotation.y = autoRotationY + smoothMouseRotY;
      plantGroup.rotation.x = smoothMouseRotX;
      plantGroup.rotation.z = -smoothMouseRotY * 0.2;

      // Subtle vertical breathing parallax
      plantGroup.position.y = -0.88 + Math.sin(time * 0.65) * 0.015 + mouseY * 0.035;

      // 3. Leaf Micro-Swaying (Biological breathing response on the 2 leaves)
      const sway = Math.sin(time * 1.2) * (0.02 + hoverProgress * 0.01);
      leftLeaf.branchGroup.rotation.x = 0.82 + sway;
      rightLeaf.branchGroup.rotation.x = 0.84 - sway * 0.8;

      // 4. Hover State Smoothing
      const targetHover = (isHoveredLocal || Math.hypot(mouseX, mouseY) < 0.55) ? 1.0 : 0.0;
      hoverProgress = THREE.MathUtils.lerp(hoverProgress, targetHover, 0.06);

      // Dynamic hover illumination
      hoverGlowLight.intensity = THREE.MathUtils.lerp(0.8, 2.2, hoverProgress);
      ringMesh.material.opacity = THREE.MathUtils.lerp(0.45, 0.8, hoverProgress);

      const currentScale = baseScale * (1.0 + hoverProgress * 0.03);
      plantGroup.scale.set(currentScale, currentScale, currentScale);

      // 5. Orbiting Bio-Aura Particles Motion
      const pos = auraGeo.attributes.position.array;
      for (let i = 0; i < auraParticleCount; i++) {
        const i3 = i * 3;
        const i4 = i * 4;
        const speed = auraPhases[i4 + 2];
        const amp = auraPhases[i4 + 3];

        pos[i3] = auraBasePos[i3] + Math.sin(time * speed + auraPhases[i4]) * amp;
        pos[i3 + 1] = auraBasePos[i3 + 1] + Math.cos(time * speed * 0.8 + auraPhases[i4 + 1]) * amp;
      }
      auraGeo.attributes.position.needsUpdate = true;

      // 6. Camera Subtle Cinematic Parallax
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX * 0.2, 0.035);
      camera.position.y = THREE.MathUtils.lerp(
        camera.position.y,
        1.15 + mouseY * 0.12 + Math.sin(time * 0.45) * 0.02,
        0.035
      );
      camera.lookAt(0, 0.85, 0);

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
      leafTexture.dispose();
      auraTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[420px] sm:h-[500px] lg:h-[580px] select-none flex items-center justify-center">
      {/* Subtle Atmospheric Monochrome Radial Backdrop Halo */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
          isHovered ? 'opacity-35' : 'opacity-15'
        }`}
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.015) 50%, transparent 70%)'
        }}
      />

      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />
    </div>
  );
};
