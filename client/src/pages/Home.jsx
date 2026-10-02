import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, Send } from 'lucide-react';
import { profile, skills } from '../data.js';
import { pages, pageMotion, Tilt, Magnetic } from '../components/ui.jsx';
import Avatar from '../components/Avatar.jsx';

function Typed({ words }) {
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[i];
    const wait = !del && n === w.length ? 1400 : del ? 35 : 70;
    const t = setTimeout(() => {
      if (!del && n < w.length) setN(n + 1);
      else if (!del) setDel(true);
      else if (n > 0) setN(n - 1);
      else { setDel(false); setI((i + 1) % words.length); }
    }, wait);
    return () => clearTimeout(t);
  }, [n, del, i, words]);
  return <span>{words[i].slice(0, n)}<span className="animate-pulse">|</span></span>;
}

function Marquee() {
  const items = [...new Set(skills.flatMap((s) => s.items))];
  return (
    <div className="relative overflow-hidden border-y border-rose-100 bg-white/50 py-4 backdrop-blur [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] dark:border-sky-300/15 dark:bg-sky-400/5">
      <div className="flex w-max animate-marquee gap-10 text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-sky-100">
        {[...items, ...items].map((t, i) => <span key={i} className="flex items-center gap-10">{t}<span className="size-1.5 rounded-full bg-rose-400 dark:bg-sky-300" /></span>)}
      </div>
    </div>
  );
}

export default function Home() {
  const dots = useMemo(() => Array.from({ length: 16 }, () => ({
    left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
    size: 4 + Math.random() * 6, delay: -Math.random() * 7, dur: 5 + Math.random() * 6,
  })), []);

  return (
    <motion.div {...pageMotion} className="relative overflow-hidden">
      <div className="absolute -left-24 -top-24 size-96 animate-blob rounded-full bg-pink-400/30 blur-3xl dark:bg-sky-400/20" />
      <div className="absolute right-0 top-1/3 size-96 animate-blob rounded-full bg-amber-300/40 blur-3xl [animation-delay:-8s] dark:bg-cyan-300/15" />
      {dots.map((d, i) => (
        <span key={i} className="absolute animate-float rounded-full bg-pink-400/50 dark:bg-sky-300/50"
          style={{ left: d.left, top: d.top, width: d.size, height: d.size, animationDelay: `${d.delay}s`, animationDuration: `${d.dur}s` }} />
      ))}

      <section className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 pb-16 pt-32 lg:min-h-screen lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <p className="font-mono text-xs text-pink-500 dark:text-sky-300">&lt;&gt; Hi, my name is</p>
          <h1 aria-label={profile.name} className="mt-2 flex flex-wrap justify-center gap-x-4 title-grad font-display text-5xl font-extrabold md:text-6xl xl:text-7xl lg:justify-start">
            {profile.name.split(' ').map((word, w) => (
              <span key={w} aria-hidden="true" className="inline-flex overflow-hidden pb-1">
                {[...word].map((ch, i) => (
                  <motion.span key={i} className="inline-block" initial={{ y: '110%' }} animate={{ y: 0 }}
                    transition={{ delay: 0.2 + (w * 6 + i) * 0.04, type: 'spring', stiffness: 130, damping: 14 }}>{ch}</motion.span>
                ))}
              </span>
            ))}
          </h1>
          <p className="mt-3 h-10 animate-shimmer bg-gradient-to-r from-slate-700 via-pink-500 to-slate-700 bg-[length:200%_auto] bg-clip-text font-display text-2xl font-bold text-transparent md:text-3xl dark:from-sky-100 dark:via-sky-300 dark:to-sky-100">
            <Typed words={profile.roles} />
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-600 lg:mx-0 dark:text-slate-200">{profile.bio}</p>
          <div className="mt-8 flex justify-center gap-3 lg:justify-start">
            <Magnetic><Link to="/projects" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-600 to-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rose-500/30 dark:from-sky-400 dark:to-blue-500 dark:text-slate-950 dark:shadow-sky-500/30"><Eye size={16} /> View my work</Link></Magnetic>
            <Magnetic><Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-pink-300 px-5 py-2.5 text-sm font-semibold text-rose-600 hover:bg-pink-50 dark:border-sky-300/50 dark:text-sky-200 dark:hover:bg-sky-300/10"><Send size={16} /> Contact me</Link></Magnetic>
          </div>
        </div>
        <Avatar />
      </section>

      <Marquee />

      <section className="relative mx-auto max-w-4xl px-6 py-20">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {pages.map(({ path, label, icon: Icon, grad }, i) => (
            <Tilt key={path} max={12} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <Link to={path} className="flex flex-col items-center gap-3 rounded-2xl border border-white/60 bg-white/70 p-6 shadow-sm backdrop-blur transition hover:shadow-xl dark:border-sky-300/15 dark:bg-slate-900/50 dark:hover:border-sky-300/40">
                <span className={`grid size-12 place-items-center rounded-xl bg-gradient-to-br ${grad} text-white`}><Icon size={20} /></span>
                <span className="text-sm font-semibold text-slate-800 dark:text-sky-50">{label}</span>
              </Link>
            </Tilt>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
