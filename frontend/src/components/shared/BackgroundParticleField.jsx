// src/components/shared/BackgroundParticleField.jsx
import React, { useEffect, useRef } from 'react';

export const BackgroundParticleField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive particle count
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const count = isMobile ? 65 : isTablet ? 120 : 210;
    const interactionRadius = isMobile ? 0 : isTablet ? 110 : 150;

    // Initialize particles
    const particles = [];
    for (let i = 0; i < count; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const radius = 1.0 + Math.random() * 2.2;
      const baseAlpha = 0.12 + Math.random() * 0.45;

      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        radius,
        baseAlpha,
        alpha: baseAlpha,
        speed: 0.3 + Math.random() * 0.6,
        phaseX: Math.random() * Math.PI * 2,
        phaseY: Math.random() * Math.PI * 2,
        driftAmp: 15 + Math.random() * 25
      });
    }

    let mouseX = -9999;
    let mouseY = -9999;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      // Re-anchor base positions proportionally
      particles.forEach((p) => {
        p.baseX = Math.random() * width;
        p.baseY = Math.random() * height;
      });
    };

    window.addEventListener('resize', handleResize);

    let startTime = performance.now();

    const render = (currentTime) => {
      animationId = requestAnimationFrame(render);
      const time = (currentTime - startTime) * 0.001;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < count; i++) {
        const p = particles[i];

        // 1. Natural continuous floating biological drift
        const driftX = Math.sin(time * p.speed + p.phaseX) * p.driftAmp;
        const driftY = Math.cos(time * p.speed * 0.8 + p.phaseY) * (p.driftAmp * 0.8);

        let targetX = p.baseX + driftX;
        let targetY = p.baseY + driftY;
        let targetAlpha = p.baseAlpha;

        // 2. Mouse interactive localized displacement
        if (interactionRadius > 0 && mouseX > -900) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.hypot(dx, dy);

          if (dist < interactionRadius && dist > 0.001) {
            const factor = (1.0 - dist / interactionRadius);
            const force = factor * 35; // Gentle displacement away
            targetX += (dx / dist) * force;
            targetY += (dy / dist) * force;
            targetAlpha = Math.min(0.9, p.baseAlpha + factor * 0.35); // Subtle brightening
          }
        }

        // 3. Smooth spring easing (never jerky)
        p.x += (targetX - p.x) * 0.055;
        p.y += (targetY - p.y) * 0.055;
        p.alpha += (targetAlpha - p.alpha) * 0.06;

        // 4. Wrap around screen bounds
        if (p.x < -20) p.x = p.baseX = width + 20;
        if (p.x > width + 20) p.x = p.baseX = -20;
        if (p.y < -20) p.y = p.baseY = height + 20;
        if (p.y > height + 20) p.y = p.baseY = -20;

        // 5. Draw soft glowing white particle mote
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.45)';
        ctx.shadowBlur = p.radius * 2.5;
        ctx.fill();
      }
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      style={{ opacity: 0.85 }}
    />
  );
};
