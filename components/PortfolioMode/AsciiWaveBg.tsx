import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface Props {
  themeMode: 'terminal' | 'paper';
  scrambleTrigger?: number;
}

const CanvasWrapper = styled.div<{
  themeMode: 'terminal' | 'paper';
  $isSurging: boolean;
}>`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
  opacity: ${({ themeMode, $isSurging }) => {
    if ($isSurging) return 0.48;
    return themeMode === 'terminal' ? 0.32 : 0.38;
  }};
  transition: opacity 0.45s ease;
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

const SCRAMBLE_CHARS = '0123456789ABCDEF#$%&@*+=-/<>[]{}';
const SURGE_DURATION_MS = 1600;

/**
 * Animated Interactive ASCII Wave Background.
 * Waves continuously undulate across the viewport and dynamically disperse / ripple
 * whenever the user moves their cursor across the screen.
 */
const AsciiWaveBg = ({
  themeMode,
  scrambleTrigger = 0,
}: Props): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const themeModeRef = useRef<'terminal' | 'paper'>(themeMode);
  const scrambleStartTimeRef = useRef<number>(0);
  const [isSurging, setIsSurging] = useState(false);

  useEffect(() => {
    themeModeRef.current = themeMode;
  }, [themeMode]);

  useEffect(() => {
    if (scrambleTrigger <= 0) return;

    scrambleStartTimeRef.current = Date.now();
    setIsSurging(true);
    const timerId = window.setTimeout(() => {
      setIsSurging(false);
    }, 1250);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [scrambleTrigger]);

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
    let cursorTime = 0;
    let momentum = 0; // Cursor circle physics momentum (0 to 2)
    let lastEventX = -2000;
    let lastEventY = -2000;

    const mouse = {
      x: -2000,
      y: -2000,
      targetX: -2000,
      targetY: -2000,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;

      if (lastEventX > -1000 && lastEventY > -1000) {
        const deltaDist = Math.hypot(
          e.clientX - lastEventX,
          e.clientY - lastEventY
        );
        // Cursor speed builds the ripple energy.
        momentum = Math.min(
          1.2,
          momentum + Math.min(0.4, deltaDist * 0.04) + 0.08
        );
      } else {
        momentum = 0.8;
      }
      lastEventX = e.clientX;
      lastEventY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -2000;
      mouse.targetY = -2000;
      lastEventX = -2000;
      lastEventY = -2000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    const charWidth = 10;
    const charHeight = 12;
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

      cursorTime += 0.04 + momentum * 0.08;

      // Momentum settles in roughly 1.2 seconds.
      momentum *= 0.965;
      if (momentum < 0.01) momentum = 0;

      mouse.x += (mouse.targetX - mouse.x) * 0.16;
      mouse.y += (mouse.targetY - mouse.y) * 0.16;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.font = '8.5px "JetBrains Mono", Consolas, monospace';
      // Darker tone for paper (light) mode (#3f3f46) for clear, crisp contrast
      ctx.fillStyle =
        themeModeRef.current === 'terminal' ? '#a1a1aa' : '#3f3f46';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      let scrambleBurst = 0;
      if (scrambleStartTimeRef.current > 0) {
        const elapsed = Date.now() - scrambleStartTimeRef.current;
        if (elapsed < SURGE_DURATION_MS) {
          const progress = elapsed / SURGE_DURATION_MS;
          scrambleBurst = Math.pow(1 - progress, 1.3);
        } else {
          scrambleStartTimeRef.current = 0;
        }
      }

      const W = window.innerWidth;
      const H = window.innerHeight;
      const cursorRadius = 80 + momentum * 260;

      for (let r = 0; r < rows; r++) {
        const rowTearX =
          scrambleBurst > 0.03 && Math.random() < scrambleBurst * 0.42
            ? (Math.random() - 0.5) * scrambleBurst * 28
            : 0;

        for (let c = 0; c < cols; c++) {
          const x = c * charWidth + charWidth / 2;
          const y = r * charHeight + charHeight / 2;

          const wave1 =
            Math.sin(c * 0.14 + time * 1.1) * Math.cos(r * 0.14 + time * 0.9);
          const wave2 = Math.sin(c * 0.08 + r * 0.08 - time * 0.7) * 0.8;
          let val = (wave1 + wave2) * (1.6 + scrambleBurst * 1.4);

          if (momentum > 0.01) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < cursorRadius) {
              const influence = (1 - dist / cursorRadius) * momentum;
              const ripple =
                Math.sin(dist * 0.1 - cursorTime * 5.5) * influence * 4.5;
              val += ripple + influence * 2.5;
            }

            // Reflect the ripple off each viewport edge to create interference.
            const dLeft = Math.hypot(x + mouse.x, dy);
            if (dLeft < cursorRadius) {
              const infL = (1 - dLeft / cursorRadius) * momentum * 1.3;
              val += Math.sin(dLeft * 0.1 - cursorTime * 5.5) * infL * 4.0;
            }

            const dRight = Math.hypot(x - (2 * W - mouse.x), dy);
            if (dRight < cursorRadius) {
              const infR = (1 - dRight / cursorRadius) * momentum * 1.3;
              val += Math.sin(dRight * 0.1 - cursorTime * 5.5) * infR * 4.0;
            }

            const dTop = Math.hypot(dx, y + mouse.y);
            if (dTop < cursorRadius) {
              const infT = (1 - dTop / cursorRadius) * momentum * 1.3;
              val += Math.sin(dTop * 0.1 - cursorTime * 5.5) * infT * 4.0;
            }

            const dBottom = Math.hypot(dx, y - (2 * H - mouse.y));
            if (dBottom < cursorRadius) {
              const infB = (1 - dBottom / cursorRadius) * momentum * 1.3;
              val += Math.sin(dBottom * 0.1 - cursorTime * 5.5) * infB * 4.0;
            }
          }

          const normalized = Math.max(0, Math.min(1, (val + 3.2) / 6.4));
          const charIndex = Math.floor(normalized * ASCII_RAMP.length);
          const clampedIdx = Math.max(
            0,
            Math.min(ASCII_RAMP.length - 1, charIndex)
          );
          let char = ASCII_RAMP[clampedIdx];

          if (
            (scrambleBurst > 0.03 && Math.random() < scrambleBurst * 0.68) ||
            (momentum > 0.25 &&
              clampedIdx > 12 &&
              Math.random() < momentum * 0.15)
          ) {
            char =
              SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }

          if (char) {
            ctx.fillText(char, x + rowTearX, y);
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
  }, []);

  return (
    <CanvasWrapper
      themeMode={themeMode}
      $isSurging={isSurging}
      aria-hidden="true"
    >
      <StyledCanvas ref={canvasRef} />
    </CanvasWrapper>
  );
};

export default AsciiWaveBg;
