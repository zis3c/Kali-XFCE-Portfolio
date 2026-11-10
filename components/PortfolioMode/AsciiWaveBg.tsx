import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface Props {
  themeMode: 'terminal' | 'paper';
}

const CanvasWrapper = styled.div<{ themeMode: 'terminal' | 'paper' }>`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
  opacity: ${({ themeMode }) => (themeMode === 'terminal' ? 0.14 : 0.08)};
  transition: opacity 0.3s ease;
`;

const ASCII_RAMP = [' ', '·', '.', ':', '-', '~', '=', '+', '*', '%', '#', '@'];

/**
 * Animated Interactive ASCII Wave Background.
 * Waves continuously ripple across the screen and dynamically displace / scatter
 * whenever the user moves their cursor across the viewport.
 */
const AsciiWaveBg = ({ themeMode }: Props): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof canvas.getContext !== 'function') return;

    let ctx: CanvasRenderingContext2D | null = null;
    try {
      ctx = canvas.getContext('2d');
    } catch {
      return;
    }
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Mouse position and target (for smooth lerping)
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 160,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    const charWidth = 14;
    const charHeight = 18;
    let cols = 0;
    let rows = 0;

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);

      cols = Math.ceil(window.innerWidth / charWidth);
      rows = Math.ceil(window.innerHeight / charHeight);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      time += 0.025;

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.font = '12px "JetBrains Mono", Consolas, monospace';
      ctx.fillStyle = themeMode === 'terminal' ? '#fafafa' : '#09090b';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * charWidth + charWidth / 2;
          const y = r * charHeight + charHeight / 2;

          // Base multi-frequency sine wave
          const wave1 =
            Math.sin(c * 0.12 + time * 0.8) * Math.cos(r * 0.1 + time * 0.6);
          const wave2 = Math.sin((c + r) * 0.08 - time * 0.5) * 0.5;
          let height = wave1 + wave2;

          // Mouse cursor interaction (repulsion ripple)
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const influence = 1 - dist / mouse.radius;
            // Push wave outward from cursor and create high-frequency ripple
            const ripple = Math.sin(dist * 0.18 - time * 4) * influence * 1.8;
            height += ripple + influence * 0.8;
          }

          // Normalize height [-1.5, 2.5] to ASCII ramp index [0, ramp.length - 1]
          const normalized = Math.max(0, Math.min(1, (height + 1.2) / 2.6));
          const charIndex = Math.floor(normalized * (ASCII_RAMP.length - 1));
          const char = ASCII_RAMP[charIndex];

          if (char && char !== ' ') {
            ctx.fillText(char, x, y);
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [themeMode]);

  return (
    <CanvasWrapper themeMode={themeMode} aria-hidden="true">
      <canvas ref={canvasRef} />
    </CanvasWrapper>
  );
};

export default AsciiWaveBg;
