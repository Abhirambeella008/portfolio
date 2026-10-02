import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useMotionTemplate, useSpring } from 'framer-motion';

const COLORS = ['244,63,94', '251,146,60', '251,191,36', '236,72,153'];
const COLORS_DARK = ['125,211,252', '56,189,248', '186,230,253', '165,243,252'];

// Modern cursor: sparkle trail, magnetic ring that grows on links, click ripple + burst, soft spotlight.
export default function CursorFX() {
  const canvas = useRef(null);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const [ripples, setRipples] = useState([]);
  const x = useMotionValue(-300), y = useMotionValue(-300);
  const rx = useSpring(x, { stiffness: 140, damping: 18 }), ry = useSpring(y, { stiffness: 140, damping: 18 });
  const dx = useSpring(x, { stiffness: 700, damping: 40 }), dy = useSpring(y, { stiffness: 700, damping: 40 });
  const glow = useMotionTemplate`radial-gradient(420px circle at ${rx}px ${ry}px, rgb(var(--glow) / 0.13), transparent 65%)`;

  useEffect(() => {
    const c = canvas.current, ctx = c.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, parts = [], raf, last = { x: 0, y: 0 };
    const resize = () => { w = window.innerWidth; h = window.innerHeight; c.width = w * dpr; c.height = h * dpr; c.style.width = `${w}px`; c.style.height = `${h}px`; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    const spawn = (px, py, n, speed) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2, s = Math.random() * speed;
        parts.push({ x: px, y: py, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 0.3, life: 1, r: 2 + Math.random() * 3.2, c: (document.documentElement.classList.contains('dark') ? COLORS_DARK : COLORS)[(Math.random() * 4) | 0] });
      }
      if (parts.length > 160) parts.splice(0, parts.length - 160);
    };
    const move = (e) => {
      x.set(e.clientX); y.set(e.clientY);
      if (Math.hypot(e.clientX - last.x, e.clientY - last.y) > 6) { last = { x: e.clientX, y: e.clientY }; spawn(e.clientX, e.clientY, 2, 1.4); }
      setHover(!!(e.target.closest && e.target.closest('a,button,[role=button]')));
    };
    const press = (e) => {
      setDown(true); spawn(e.clientX, e.clientY, 16, 5);
      const id = Math.random();
      setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setRipples((r) => r.filter((q) => q.id !== id)), 700);
    };
    const release = () => setDown(false);
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      parts = parts.filter((p) => p.life > 0);
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy; p.vy += 0.02; p.life -= 0.025;
        ctx.fillStyle = `rgba(${p.c},${Math.max(p.life, 0) * 0.85})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    resize(); tick();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerdown', press);
    window.addEventListener('pointerup', release);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize); window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', press); window.removeEventListener('pointerup', release);
    };
  }, [x, y]);

  return (
    <>
      <motion.div className="pointer-events-none fixed inset-0 z-40" style={{ background: glow }} />
      <canvas ref={canvas} className="pointer-events-none fixed inset-0 z-[55]" />
      <motion.div className="pointer-events-none fixed left-0 top-0 z-[60] [@media(pointer:coarse)]:hidden" style={{ x: rx, y: ry }}>
        <motion.div animate={{ scale: down ? 0.6 : hover ? 2.2 : 1 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          className={`-ml-5 -mt-5 size-10 rounded-full border-2 ${hover ? 'border-rose-500 bg-rose-500/10 dark:border-sky-300 dark:bg-sky-300/10' : 'border-rose-500/60 dark:border-sky-300/60'}`} />
      </motion.div>
      <motion.div className="pointer-events-none fixed left-0 top-0 z-[60] [@media(pointer:coarse)]:hidden" style={{ x: dx, y: dy }}>
        <div className="-ml-[3px] -mt-[3px] size-1.5 rounded-full bg-rose-500 dark:bg-sky-300" />
      </motion.div>
      {ripples.map((r) => (
        <motion.span key={r.id} initial={{ scale: 0, opacity: 0.7 }} animate={{ scale: 3.2, opacity: 0 }} transition={{ duration: 0.7 }}
          className="pointer-events-none fixed z-[60] size-10 rounded-full border-2 border-rose-500 dark:border-sky-300" style={{ left: r.x - 20, top: r.y - 20 }} />
      ))}
    </>
  );
}
