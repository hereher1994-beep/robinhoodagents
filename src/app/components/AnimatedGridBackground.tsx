'use client';

import React, { useEffect, useRef } from 'react';

export default function AnimatedGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Data stream particles
    const streams: { x: number; y: number; speed: number; length: number; opacity: number; hue: number }[] = [];
    for (let i = 0; i < 18; i++) {
      streams.push({
        x: Math.random(),
        y: Math.random(),
        speed: 0.003 + Math.random() * 0.004,
        length: 40 + Math.random() * 80,
        opacity: 0.1 + Math.random() * 0.2,
        hue: Math.random() > 0.7 ? 270 : 120, // purple or green
      });
    }

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gridSize = 55;
      const cols = Math.ceil(canvas.width / gridSize) + 1;
      const rows = Math.ceil(canvas.height / gridSize) + 1;

      // Draw grid lines with radial fade
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize;
          const y = j * gridSize;
          const dx = (x - canvas.width / 2) / canvas.width;
          const dy = (y - canvas.height / 2) / canvas.height;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pulse = Math.sin(time * 0.018 - dist * 9) * 0.5 + 0.5;
          const opacity = 0.025 + pulse * 0.045;

          ctx.strokeStyle = `rgba(0, 200, 5, ${opacity})`;
          ctx.lineWidth = 0.5;

          if (i < cols - 1) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + gridSize, y);
            ctx.stroke();
          }
          if (j < rows - 1) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + gridSize);
            ctx.stroke();
          }

          // Intersection dots
          if (i < cols - 1 && j < rows - 1) {
            const dotPulse = Math.sin(time * 0.025 + i * 0.7 + j * 0.5) * 0.5 + 0.5;
            if (dotPulse > 0.85) {
              ctx.beginPath();
              ctx.arc(x, y, 1, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(0, 200, 5, ${dotPulse * 0.3})`;
              ctx.fill();
            }
          }
        }
      }

      // Floating orb particles
      for (let i = 0; i < 20; i++) {
        const x = (Math.sin(time * 0.004 + i * 2.4) * 0.42 + 0.5) * canvas.width;
        const y = (Math.cos(time * 0.003 + i * 1.8) * 0.42 + 0.5) * canvas.height;
        const radius = 1.2 + Math.sin(time * 0.01 + i) * 0.8;
        const alpha = 0.15 + Math.sin(time * 0.007 + i) * 0.12;

        const isGreen = i % 3 !== 0;
        const color = isGreen
          ? `rgba(0, 200, 5, ${alpha})`
          : `rgba(124, 58, 237, ${alpha * 0.8})`;

        // Glow halo
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 6);
        gradient.addColorStop(0, isGreen ? `rgba(0, 200, 5, ${alpha * 0.4})` : `rgba(124, 58, 237, ${alpha * 0.3})`);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(x, y, radius * 6, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }

      // Vertical data streams
      streams.forEach((stream, i) => {
        const x = stream.x * canvas.width;
        const yPos = ((time * stream.speed + stream.y) % 1.2) * canvas.height - stream.length;
        const hue = stream.hue;

        const grad = ctx.createLinearGradient(x, yPos, x, yPos + stream.length);
        grad.addColorStop(0, `hsla(${hue}, 100%, 55%, 0)`);
        grad.addColorStop(0.5, `hsla(${hue}, 100%, 55%, ${stream.opacity})`);
        grad.addColorStop(1, `hsla(${hue}, 100%, 55%, 0)`);

        ctx.beginPath();
        ctx.moveTo(x, yPos);
        ctx.lineTo(x, yPos + stream.length);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // Radial center glow
      const centerGrad = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.4
      );
      const glowPulse = Math.sin(time * 0.01) * 0.5 + 0.5;
      centerGrad.addColorStop(0, `rgba(0, 200, 5, ${0.02 + glowPulse * 0.02})`);
      centerGrad.addColorStop(0.5, `rgba(124, 58, 237, ${0.01 + glowPulse * 0.01})`);
      centerGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = centerGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time++;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}