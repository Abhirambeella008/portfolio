import { useEffect } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

const clamp = (v) => Math.max(-1, Math.min(1, v));

// Tracks the cursor relative to an element and returns smoothed 3D "look at" values.
export function useLook(ref, { tilt = 16, shift = 14 } = {}) {
  const nx = useMotionValue(0), ny = useMotionValue(0), near = useMotionValue(0);
  const sx = useSpring(nx, { stiffness: 110, damping: 18 }), sy = useSpring(ny, { stiffness: 110, damping: 18 });
  const rotY = useTransform(sx, [-1, 1], [-tilt, tilt]);
  const rotX = useTransform(sy, [-1, 1], [tilt * 0.6, -tilt * 0.6]);
  const x = useTransform(sx, [-1, 1], [-shift, shift]);
  const y = useTransform(sy, [-1, 1], [-shift * 0.5, shift * 0.5]);
  useEffect(() => {
    const move = (e) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height * 0.4);
      nx.set(clamp(dx / (window.innerWidth / 2)));
      ny.set(clamp(dy / (window.innerHeight / 2)));
      near.set(Math.hypot(dx, dy));
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [ref, nx, ny, near]);
  return { nx: sx, ny: sy, near, rotX, rotY, x, y };
}
