import { useCallback, useEffect, useState } from 'react';

/**
 * Custom hook to detect whether the mouse is hovering an element.
 *@function useHover
 *@param {React.RefObject<HTMLElement>} ref - ref to React.Node or HTML element
 *@returns {boolean} isHovering - the hook returns a ref and a boolean value indicating whether the element with that ref is currently being hovered
 */

export default function useHover(ref: React.RefObject<HTMLElement>): boolean {
  const [isHovering, setIsHovering] = useState(false);

  const on = useCallback(() => setIsHovering(true), []);
  const off = useCallback(() => setIsHovering(false), []);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    node.addEventListener('mouseenter', on);
    node.addEventListener('mousemove', on);
    node.addEventListener('mouseleave', off);

    return function () {
      node.removeEventListener('mouseenter', on);
      node.removeEventListener('mousemove', on);
      node.removeEventListener('mouseleave', off);
    };
  }, [off, on, ref]);

  return isHovering;
}
