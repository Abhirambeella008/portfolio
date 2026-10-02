import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, animate, useInView, useMotionValue, useSpring } from 'framer-motion';
import { User, Code2, Rocket, Briefcase, GraduationCap, Award, Trophy, Mail, ArrowLeft, X, Maximize2 } from 'lucide-react';

export const pages = [
  { path: '/about', label: 'About', icon: User, grad: 'from-emerald-400 to-teal-500' },
  { path: '/skills', label: 'Skills', icon: Code2, grad: 'from-sky-400 to-blue-500' },
  { path: '/projects', label: 'Projects', icon: Rocket, grad: 'from-orange-400 to-rose-500' },
  { path: '/internships', label: 'Internships', icon: Briefcase, grad: 'from-cyan-400 to-sky-500' },
  { path: '/education', label: 'Education', icon: GraduationCap, grad: 'from-violet-400 to-purple-500' },
  { path: '/certifications', label: 'Certifications', icon: Award, grad: 'from-pink-400 to-rose-500' },
  { path: '/achievements', label: 'Achievements', icon: Trophy, grad: 'from-amber-300 to-yellow-500' },
  { path: '/contact', label: 'Contact', icon: Mail, grad: 'from-rose-500 to-orange-500' },
];

export const card = 'rounded-2xl border border-white/60 bg-white/70 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl dark:border-sky-300/15 dark:bg-slate-900/50 dark:shadow-black/20 dark:hover:border-sky-300/40 dark:hover:shadow-sky-500/10';
export const chip = 'rounded-full border border-slate-200 px-2.5 py-0.5 text-[11px] dark:border-sky-300/30 dark:text-sky-100';
export const rise = (i = 0) => ({ initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.25 + i * 0.1, duration: 0.5 } });

export const pageMotion = {
  initial: { opacity: 0, y: 30, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -20, filter: 'blur(8px)' },
  transition: { duration: 0.35 },
};

export function Page({ icon: Icon, title, banner, bannerAlt, children }) {
  return (
    <motion.div {...pageMotion} className="mx-auto max-w-5xl px-6 pb-24 pt-24">
      <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 text-xs transition hover:-translate-x-1 dark:border-sky-300/20 dark:bg-slate-900/50 dark:text-sky-100">
        <ArrowLeft size={13} /> Back to Portfolio
      </Link>
      <div className="relative mb-12 mt-10 text-center">
        <motion.div initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
          className="mx-auto mb-5 grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-pink-500 to-orange-400 text-white shadow-lg shadow-pink-500/30 dark:from-sky-400 dark:to-blue-500 dark:shadow-sky-400/30"><Icon /></motion.div>
        <h1 className="title-grad font-display text-4xl font-extrabold md:text-5xl">{title}</h1>
        <motion.div initial={{ width: 0 }} animate={{ width: 96 }} transition={{ delay: 0.5, duration: 0.6 }} className="mx-auto mt-4 h-1 rounded bg-gradient-to-r from-pink-500 to-orange-400 dark:from-sky-300 dark:to-blue-500" />
      </div>
      {banner && <Banner src={banner} alt={bannerAlt} />}
      {children}
    </motion.div>
  );
}

export function Counter({ to, suffix = '', decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: 'easeOut', onUpdate: setV });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{v.toFixed(decimals)}{suffix}</span>;
}

export function Tilt({ children, className, max = 8, ...rest }) {
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 15 }), sry = useSpring(ry, { stiffness: 200, damping: 15 });
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
  };
  const leave = () => { rx.set(0); ry.set(0); };
  return <motion.div {...rest} onMouseMove={move} onMouseLeave={leave} className={className} style={{ rotateX: srx, rotateY: sry, transformPerspective: 800 }}>{children}</motion.div>;
}

export function Magnetic({ children }) {
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 12 }), sy = useSpring(y, { stiffness: 200, damping: 12 });
  const move = (e) => { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.35); y.set((e.clientY - r.top - r.height / 2) * 0.35); };
  return <motion.div onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ x: sx, y: sy }}>{children}</motion.div>;
}

// Section picture with an animated border. Click it to see the full-size image.
export function Banner({ src, alt = '' }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open]);
  return (
    <>
      <motion.button type="button" onClick={() => setOpen(true)} aria-label={`Enlarge picture: ${alt}`}
        initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.35, duration: 0.6 }}
        className="group relative mx-auto mb-14 block w-full max-w-4xl animate-shimmer overflow-hidden rounded-[1.75rem] bg-gradient-to-r from-rose-400 via-amber-300 to-pink-400 bg-[length:200%_auto] p-[3px] shadow-xl shadow-rose-500/10 dark:from-sky-300 dark:via-blue-400 dark:to-cyan-200 dark:shadow-sky-500/20">
        <img src={src} alt={alt} loading="eager" decoding="async" className="block h-auto w-full rounded-[1.5rem] saturate-[.92] transition duration-500 group-hover:saturate-100" />
        <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-slate-900/70 px-3 py-1 text-[11px] font-medium text-white opacity-0 backdrop-blur transition group-hover:opacity-100 group-focus-visible:opacity-100">
          <Maximize2 size={12} /> Click to enlarge
        </span>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}
            className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/90 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
            <button type="button" aria-label="Close" className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"><X size={20} /></button>
            <motion.img initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }} src={src} alt={alt} className="max-h-[92vh] max-w-full rounded-2xl object-contain shadow-2xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
