import React, { useEffect, useState } from 'react';
import * as Styled from './DesktopApps.styles';
import { Rnd } from 'react-rnd';
import { useDesktopApps } from './DesktopApps.config';
import DesktopButton from '../DesktopButton/DesktopButton';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { IDesktopApp } from '../../types/ui/desktop-app';

/**
 *Renders list of desktop apps with react-rnd for true freedom placement and grid snapping.
 *@function DesktopApps
 *@returns {JSX.Element} - Rendered DesktopApps component
 */
const DesktopApps = (): JSX.Element => {
  const [displayedDesktopApps, setDisplayedDesktopApps] = useState<
    IDesktopApp[]
  >([]);
  const { sortedAlphabetically, sortedByDate, sortedBySize } = useDesktopApps();
  const { sortDesktopIconsBy, removedApps, compressedApps } = useTypedSelector(
    (state) => state.ui
  );

  const [positions, setPositions] = useState<
    Record<string, { x: number; y: number }>
  >({});

  const [selectionBox, setSelectionBox] = useState<{
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
    isSelecting: boolean;
  } | null>(null);

  const [selectedAppIds, setSelectedAppIds] = useState<number[]>([]);

  useEffect(() => {
    if (sortDesktopIconsBy === 'name')
      setDisplayedDesktopApps(sortedAlphabetically);
    if (sortDesktopIconsBy === 'date') setDisplayedDesktopApps(sortedByDate);
    if (sortDesktopIconsBy === 'size') setDisplayedDesktopApps(sortedBySize);
  }, [
    sortDesktopIconsBy,
    removedApps.length,
    compressedApps.length,
    sortedAlphabetically,
    sortedByDate,
    sortedBySize,
  ]);

  // Initial layout calculation
  useEffect(() => {
    if (displayedDesktopApps.length === 0) return;

    setPositions((prev) => {
      // Only set initial positions if they haven't been set yet
      if (Object.keys(prev).length > 0) return prev;

      const newPositions: Record<string, { x: number; y: number }> = {};
      const availableHeight = window.innerHeight - 28;
      const maxPerColumn = Math.max(1, Math.floor(availableHeight / 84));

      displayedDesktopApps.forEach((app, index) => {
        const col = Math.floor(index / maxPerColumn);
        const row = index % maxPerColumn;
        newPositions[app.id] = { x: 12 + col * 84, y: 12 + row * 84 };
      });
      return newPositions;
    });
  }, [displayedDesktopApps]);

  // Window resize handler to prevent icons getting stuck off-screen and prevent stacking
  useEffect(() => {
    const handleResize = () => {
      setPositions((prev) => {
        let changed = false;
        const next = { ...prev };
        const availableHeight = window.innerHeight - 28;
        const availableWidth = window.innerWidth;

        const isOccupied = (
          targetX: number,
          targetY: number,
          excludeId: string
        ) => {
          return Object.keys(next).some(
            (id) =>
              id !== excludeId &&
              next[id].x === targetX &&
              next[id].y === targetY
          );
        };

        Object.keys(next).forEach((id) => {
          let { x, y } = next[id];

          // If icon is stuck below the screen, push it to the top of the next column
          while (y + 84 > availableHeight && availableHeight > 84) {
            y = 12;
            x += 84;
            changed = true;
          }

          // If pushing to next column made it fall off the right edge, clamp it
          if (x + 84 > availableWidth) {
            x = Math.max(12, availableWidth - 84);
            changed = true;
          }

          // Ensure it doesn't stack on top of another icon due to resizing
          while (isOccupied(x, y, id)) {
            y += 84;
            if (y + 84 > availableHeight) {
              y = 12;
              x += 84;
            }
            changed = true;
          }

          next[id] = { x, y };
        });

        return changed ? next : prev;
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Styled.DesktopContainer
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          setSelectionBox({
            startX: x,
            startY: y,
            currentX: x,
            currentY: y,
            isSelecting: true,
          });
          setSelectedAppIds([]);
        } else {
          setSelectedAppIds([]);
        }
      }}
      onMouseMove={(e) => {
        if (selectionBox?.isSelecting) {
          const rect = e.currentTarget.getBoundingClientRect();
          const currentX = e.clientX - rect.left;
          const currentY = e.clientY - rect.top;
          setSelectionBox((prev) =>
            prev ? { ...prev, currentX, currentY } : null
          );

          const left = Math.min(selectionBox.startX, currentX);
          const top = Math.min(selectionBox.startY, currentY);
          const right = Math.max(selectionBox.startX, currentX);
          const bottom = Math.max(selectionBox.startY, currentY);

          const newlySelected: number[] = [];
          displayedDesktopApps.forEach((app) => {
            const pos = positions[app.id];
            if (!pos) return;
            // Approximate icon bounding box
            const iconLeft = pos.x;
            const iconTop = pos.y;
            const iconRight = pos.x + 84;
            const iconBottom = pos.y + 84;

            if (
              left < iconRight &&
              right > iconLeft &&
              top < iconBottom &&
              bottom > iconTop
            ) {
              newlySelected.push(app.id);
            }
          });
          setSelectedAppIds(newlySelected);
        }
      }}
      onMouseUp={() => {
        if (selectionBox?.isSelecting) {
          setSelectionBox((prev) =>
            prev ? { ...prev, isSelecting: false } : null
          );
        }
      }}
      onMouseLeave={() => {
        if (selectionBox?.isSelecting) {
          setSelectionBox((prev) =>
            prev ? { ...prev, isSelecting: false } : null
          );
        }
      }}
    >
      {selectionBox?.isSelecting && (
        <Styled.SelectionBox
          style={{
            left: Math.min(selectionBox.startX, selectionBox.currentX),
            top: Math.min(selectionBox.startY, selectionBox.currentY),
            width: Math.abs(selectionBox.currentX - selectionBox.startX),
            height: Math.abs(selectionBox.currentY - selectionBox.startY),
          }}
        />
      )}
      {displayedDesktopApps.map((app) => {
        const pos = positions[app.id] || { x: 12, y: -1000 }; // hidden until positioned

        return (
          <Rnd
            key={app.id}
            position={{ x: pos.x, y: pos.y }}
            onDragStop={(e, d) => {
              setPositions((prev) => {
                const newPositions = { ...prev };
                const oldPos = prev[app.id];

                // Strictly normalize drop coordinates to the mathematical grid to prevent drifting
                const targetX = Math.round((d.x - 12) / 84) * 84 + 12;
                const targetY = Math.round((d.y - 12) / 84) * 84 + 12;

                // Find if any other app is already occupying this target grid location
                const occupyingAppId = Object.keys(prev).find(
                  (id) =>
                    String(Number(id)) !== String(app.id) &&
                    prev[id].x === targetX &&
                    prev[id].y === targetY
                );

                if (occupyingAppId) {
                  // Swap them! The occupying app moves to the old position of the dragged app.
                  newPositions[occupyingAppId] = oldPos;
                }

                newPositions[app.id] = { x: targetX, y: targetY };
                return newPositions;
              });
            }}
            bounds="parent"
            enableResizing={false}
            dragGrid={[84, 84]}
          >
            <DesktopButton
              variant={app.variant}
              text={app.text}
              iconSrc={app.iconSrc}
              iconSize={app.iconSize}
              action={app.action}
              willOpenWindowWith={app.willOpenWindowWith}
              isSelected={selectedAppIds.includes(app.id)}
              onSelect={(e) => {
                e.stopPropagation();
                if (e.ctrlKey || e.metaKey) {
                  setSelectedAppIds((prev) =>
                    prev.includes(app.id)
                      ? prev.filter((id) => id !== app.id)
                      : [...prev, app.id]
                  );
                } else {
                  setSelectedAppIds([app.id]);
                }
              }}
            />
          </Rnd>
        );
      })}
    </Styled.DesktopContainer>
  );
};

export default DesktopApps;
