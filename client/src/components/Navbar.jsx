import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { Sun, Moon, FileText, Menu, X } from 'lucide-react';
import { profile } from '../data.js';
import { pages } from './ui.jsx';

export default function Navbar() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const toggle = () => {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch { /* storage blocked */ }
    setDark(next);
  };
  const link = ({ isActive }) => `transition hover:text-rose-600 dark:hover:text-sky-300 ${isActive ? 'font-semibold text-rose-600 dark:text-sky-300' : ''}`;
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur dark:border-sky-300/15 dark:bg-[#0a1428]/80">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 text-xs">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-rose-600 dark:text-sky-200">
          <motion.span whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }} className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-rose-500 to-amber-400 text-sm text-white dark:from-sky-400 dark:to-blue-500">BA</motion.span>
          {profile.name}
        </Link>
        <div className="hidden items-center gap-4 xl:flex">
          {pages.map((p) => <NavLink key={p.path} to={p.path} className={link}>{p.label}</NavLink>)}
        </div>
        <div className="flex items-center gap-2">
          <a href={profile.resume} download className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-400 px-3 py-1.5 font-semibold text-white transition hover:scale-105 dark:from-sky-400 dark:to-blue-500 dark:text-slate-950"><FileText size={13} /> Resume</a>
          <button onClick={toggle} aria-label="Toggle dark mode" className="rounded-full p-1.5 hover:bg-black/5 dark:text-sky-200 dark:hover:bg-sky-300/10">{dark ? <Sun size={16} /> : <Moon size={16} />}</button>
          <button onClick={() => setOpen((o) => !o)} aria-label="Menu" className="rounded-full p-1.5 dark:text-sky-200 xl:hidden">{open ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden xl:hidden">
            <div className="flex flex-col gap-3 px-6 pb-4 text-sm" onClick={() => setOpen(false)}>
              {pages.map((p) => <NavLink key={p.path} to={p.path} className={link}>{p.label}</NavLink>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div style={{ scaleX: scrollYProgress }} className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-gradient-to-r from-rose-500 to-amber-400 dark:from-sky-300 dark:to-blue-500" />
    </header>
  );
}
