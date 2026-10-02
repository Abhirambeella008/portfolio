import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useTransform } from 'framer-motion';
import { useLook } from './useLook.js';

const chips = [
  { t: 'React', cls: 'left-[-8%] top-[16%]', k: 1.6 },
  { t: 'Java', cls: 'right-[-9%] top-[40%]', k: -1.4 },
  { t: 'MongoDB', cls: 'bottom-[14%] left-[-6%]', k: 1.2 },
];

// Cartoon avatar that turns its head toward the cursor in 3D. Click to flip to the real photo.
export default function Avatar() {
  const box = useRef(null);
  const idle = useRef();
  const look = useLook(box, { tilt: 18, shift: 16 });
  const bgX = useTransform(look.nx, [-1, 1], [24, -24]);
  const chipX = useTransform(look.nx, [-1, 1], [-26, 26]);
  const [msg, setMsg] = useState('Hey! Move your mouse around 👋');
  const [real, setReal] = useState(false);
  const [wow, setWow] = useState(false);

  useEffect(() => {
    const move = (e) => {
      const r = box.current.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height * 0.4), d = Math.hypot(dx, dy);
      setWow(d < 120);
      if (d < 160) setMsg('Hey! You found me 👋');
      else if (Math.abs(dx) > Math.abs(dy)) setMsg(dx < 0 ? 'Anyone over there on the left? 👀' : 'Psst, my projects are that way →');
      else setMsg(dy < 0 ? 'Looking up? 450+ DSA problems solved 🚀' : 'Scroll down, there is more to see ↓');
      clearTimeout(idle.current);
      idle.current = setTimeout(() => setMsg('Still there? Say hi on the contact page 😄'), 5000);
    };
    window.addEventListener('pointermove', move);
    return () => { window.removeEventListener('pointermove', move); clearTimeout(idle.current); };
  }, []);

  const flip = () => { setReal((r) => !r); setMsg(real ? 'Back to my cartoon self 😎' : "That's the real me! 😄"); };

  return (
    <div ref={box} className="relative mx-auto w-72 sm:w-80 lg:w-[26rem]">
      <motion.div style={{ x: bgX }} className="absolute inset-4 animate-blob rounded-full bg-gradient-to-br from-rose-300/70 to-amber-200/80 blur-2xl dark:from-sky-400/40 dark:to-cyan-200/30" />
      {[0, 1].map((i) => <span key={i} className="absolute inset-2 animate-pulse-ring rounded-full border border-pink-400/50 dark:border-sky-300/50" style={{ animationDelay: `${i * 2}s` }} />)}
      <span className="absolute inset-8 animate-spin-slow rounded-full border-2 border-dashed border-orange-300/70 dark:border-sky-200/60" />

      <AnimatePresence mode="wait">
        <motion.div key={msg} initial={{ opacity: 0, y: 8, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }}
          className="absolute -top-10 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-2xl bg-white px-4 py-2 text-xs font-medium text-slate-700 shadow-xl dark:bg-slate-800 dark:text-sky-50">
          {msg}
          <span className="absolute -bottom-1 left-1/2 size-3 -translate-x-1/2 rotate-45 bg-white dark:bg-slate-800" />
        </motion.div>
      </AnimatePresence>

      {chips.map((c, i) => (
        <motion.div key={c.t} style={{ x: chipX }} className={`absolute z-10 ${c.cls}`}>
          <span className="block animate-float rounded-full border border-white/70 bg-white/80 px-3 py-1 text-[11px] font-bold text-rose-600 shadow-lg backdrop-blur dark:border-sky-300/30 dark:bg-slate-800/90 dark:text-sky-200" style={{ animationDelay: `${-i * 2}s` }}>{c.t}</span>
        </motion.div>
      ))}

      <div role="button" tabIndex={0} aria-label="Flip between cartoon and photo" onClick={flip} onKeyDown={(e) => e.key === 'Enter' && flip()}
        className="relative aspect-[633/664] [perspective:1100px]">
        <motion.div animate={{ rotateY: real ? 180 : 0 }} transition={{ type: 'spring', stiffness: 70, damping: 14 }} className="relative size-full [transform-style:preserve-3d]">
          <div className="absolute inset-0 [backface-visibility:hidden]">
            <motion.img src="/cartoon.png" alt="Cartoon avatar of Beella Om Abhiram" draggable={false}
              style={{ rotateY: look.rotY, rotateX: look.rotX, x: look.x, y: look.y, transformPerspective: 800 }}
              animate={{ scale: wow ? 1.06 : 1 }} transition={{ type: 'spring', stiffness: 200, damping: 14 }}
              className="size-full select-none object-contain drop-shadow-[0_25px_30px_rgba(30,41,59,0.35)]" />
            <AnimatePresence>
              {wow && <motion.span initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 12 }} exit={{ scale: 0 }} className="absolute right-[6%] top-[8%] text-4xl">😮</motion.span>}
            </AnimatePresence>
          </div>
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <img src="/photo.jpg" alt="Beella Om Abhiram" className="size-full rounded-[2rem] object-cover object-top shadow-2xl ring-4 ring-white/80 dark:ring-sky-200/40" />
          </div>
        </motion.div>
      </div>
      <p className="mt-3 text-center text-[11px] text-slate-500 dark:text-slate-300">Click me to meet the real me</p>
    </div>
  );
}
