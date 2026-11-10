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
  opacity: ${({ themeMode }) => (themeMode === 'terminal' ? 0.22 : 0.15)};
  transition: opacity 0.3s ease;
`;

const StyledCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
`;

const ASCII_RAMP = [
  '·',
  '.',
  ':',
  ';',
  '!',
  '~',
  '=',
  '+',
  '-',
  '<',
  '>',
  '*',
  'x',
  '#',
  '%',
  '&',
  '$',
  '@',
];

/**
 * Animated Interactive ASCII Wave Background.
 * Waves continuously undulate across the viewport and dynamically disperse / ripple
 * whenever the user moves their cursor across the screen.
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
      x: -2000,
      y: -2000,
      targetX: -2000,
      targetY: -2000,
      radius: 200,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -2000;
      mouse.targetY = -2000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    const charWidth = 14;
    const charHeight = 16;
    let cols = 0;
    let rows = 0;

    const handleResize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      if (typeof ctx.setTransform === 'function') {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      } else if (typeof ctx.scale === 'function') {
        ctx.scale(dpr, dpr);
      }

      cols = Math.ceil(window.innerWidth / charWidth);
      rows = Math.ceil(window.innerHeight / charHeight);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      time += 0.035;

      // Smooth mouse tracking
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.font = '11px "JetBrains Mono", Consolas, monospace';
      ctx.fillStyle = themeMode === 'terminal' ? '#a1a1aa' : '#71717a';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * charWidth + charWidth / 2;
          const y = r * charHeight + charHeight / 2;

          // Multi-frequency sine wave undulating across space
          const wave1 =
            Math.sin(c * 0.14 + time * 1.1) * Math.cos(r * 0.14 + time * 0.9);
          const wave2 = Math.sin(c * 0.08 + r * 0.08 - time * 0.7) * 0.8;
          let val = (wave1 + wave2) * 1.6;

          // Mouse perturbation / ripple repulsion
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const influence = 1 - dist / mouse.radius;
            // Push wave outward from cursor and create high-energy ripple
            const ripple = Math.sin(dist * 0.14 - time * 6) * influence * 3.2;
            val += ripple + influence * 1.8;
          }

          const normalized = Math.max(0, Math.min(1, (val + 3) / 6));
          const charIndex = Math.floor(normalized * ASCII_RAMP.length);
          const clampedIdx = Math.max(
            0,
            Math.min(ASCII_RAMP.length - 1, charIndex)
          );
          const char = ASCII_RAMP[clampedIdx];

          if (char) {
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
      <StyledCanvas ref={canvasRef} />
    </CanvasWrapper>
  );
};

export default AsciiWaveBg;
