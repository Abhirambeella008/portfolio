import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Code2, Rocket, Briefcase, GraduationCap, Award, Trophy, Mail, Phone, MapPin, Linkedin, Github, Send, Download } from 'lucide-react';
import { profile, stats, skills, internships, projects, education, certifications, achievements } from '../data.js';
import { API } from '../api.js';
import { Page, Counter, Tilt, card, chip, rise } from '../components/ui.jsx';

const h3 = 'font-display text-lg font-bold text-slate-800 dark:text-sky-50';

export function About() {
  return (
    <Page icon={User} title="About me">
      <div className="grid items-center gap-10 md:grid-cols-5">
        <Tilt {...rise()} className="md:col-span-2">
          <div className="relative mx-auto max-w-xs">
            <div className="absolute -inset-3 animate-spin-slow rounded-[2rem] bg-gradient-to-r from-rose-500 via-amber-400 to-pink-500 opacity-60 blur-lg dark:from-sky-300 dark:via-blue-500 dark:to-cyan-300" />
            <img src="/photo.jpg" alt={profile.name} className="relative aspect-[3/4] w-full rounded-[1.75rem] object-cover object-top ring-4 ring-white/80 dark:ring-sky-200/40" />
          </div>
        </Tilt>
        <motion.div {...rise(1)} className="md:col-span-3">
          <p className={`${card} leading-relaxed`}>{profile.bio}</p>
          <a href={profile.resume} download className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-600 to-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rose-500/30 transition hover:scale-105 dark:from-sky-400 dark:to-blue-500 dark:text-slate-950 dark:shadow-sky-500/30"><Download size={16} /> Download resume</a>
        </motion.div>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} {...rise(i + 2)} className={`${card} text-center`}>
            <div className="font-display text-4xl font-extrabold text-rose-600 dark:text-sky-300"><Counter {...s} /></div>
            <div className="mt-1 text-xs">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </Page>
  );
}

export function Skills() {
  return (
    <Page icon={Code2} title="Skills & Expertise">
      <div className="grid gap-6 md:grid-cols-3">
        {skills.map((s, i) => (
          <Tilt key={s.title} {...rise(i)} className={card}>
            <div className={`mb-4 h-1 w-12 rounded bg-gradient-to-r ${s.bar}`} />
            <h3 className={`${h3} mb-4`}>{s.title}</h3>
            <div className="flex flex-wrap gap-2">
              {s.items.map((t, j) => (
                <motion.span key={t} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + i * 0.1 + j * 0.05, type: 'spring' }} whileHover={{ scale: 1.1, y: -2 }}
                  className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium dark:border-sky-300/25 dark:bg-sky-400/10 dark:text-sky-50">{t}</motion.span>
              ))}
            </div>
          </Tilt>
        ))}
      </div>
    </Page>
  );
}

export function Projects() {
  return (
    <Page icon={Rocket} title="Projects">
      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((p, i) => (
          <Tilt key={p.title} {...rise(i)} className={card}>
            <h3 className={h3}>{p.title}</h3>
            <p className="mb-3 text-xs text-rose-500 dark:text-sky-300">{p.stack}</p>
            <ul className="list-disc space-y-2 pl-4 text-sm leading-relaxed">{p.points.map((x) => <li key={x}>{x}</li>)}</ul>
            <div className="mt-4 flex flex-wrap gap-2">{p.tags.map((t) => <span key={t} className={chip}>{t}</span>)}</div>
          </Tilt>
        ))}
      </div>
    </Page>
  );
}

export function Internships() {
  return (
    <Page icon={Briefcase} title="Internships">
      <div className="grid gap-6 md:grid-cols-2">
        {internships.map((n, i) => (
          <motion.div key={n.role} {...rise(i)} className={card}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div><h3 className={h3}>{n.role}</h3><p className="text-sm">{n.org}</p></div>
              <span className="rounded-full border border-pink-300 bg-pink-50 px-2.5 py-0.5 text-[11px] font-medium text-rose-500 dark:border-sky-300/30 dark:bg-sky-400/10 dark:text-sky-200">{n.date}</span>
            </div>
            <ul className="mt-4 list-disc space-y-2 pl-4 text-sm leading-relaxed">{n.points.map((x) => <li key={x}>{x}</li>)}</ul>
          </motion.div>
        ))}
      </div>
    </Page>
  );
}

export function Education() {
  return (
    <Page icon={GraduationCap} title="Education" banner="/sections/education.webp" bannerAlt="Education: B.Tech, Diploma and SSC">
      <div className="relative mx-auto max-w-2xl pl-8">
        <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1, delay: 0.3 }} className="absolute bottom-0 left-2 top-0 w-0.5 origin-top bg-gradient-to-b from-pink-500 to-orange-400 dark:from-sky-300 dark:to-blue-500" />
        {education.map((e, i) => (
          <motion.div key={e.title} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.25 }} className="relative mb-8">
            <span className="absolute -left-[1.85rem] top-6 size-3 rounded-full bg-orange-500 ring-4 ring-orange-200 dark:bg-sky-300 dark:ring-sky-300/30" />
            <div className={card}>
              <div className="flex flex-wrap justify-between gap-2"><h3 className={h3}>{e.title}</h3><span className="text-xs text-rose-500 dark:text-sky-300">{e.date}</span></div>
              <p className="mt-1 text-sm">{e.org}</p>
              <span className={`${chip} mt-3 inline-block`}>{e.score}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </Page>
  );
}

export function Certifications() {
  return (
    <Page icon={Award} title="Certifications" banner="/sections/certifications.webp" bannerAlt="Certifications: ServiceNow, SAP, SmartBridge, LearnSquare and NPTEL">
      <div className="grid gap-6 md:grid-cols-2">
        {certifications.map((c, i) => (
          <Tilt key={c.title} {...rise(i)} className={`${card} flex items-start gap-4`}>
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-pink-400 to-rose-500 text-white dark:from-sky-400 dark:to-blue-500"><Award size={18} /></span>
            <div><h3 className="font-semibold text-slate-800 dark:text-sky-50">{c.title}</h3><p className="mt-1 text-xs text-rose-500 dark:text-sky-300">{c.date}</p></div>
          </Tilt>
        ))}
      </div>
    </Page>
  );
}

export function Achievements() {
  return (
    <Page icon={Trophy} title="Achievements" banner="/sections/achievements.webp" bannerAlt="Achievements: 450+ DSA problems, hackathons and a led college project">
      <div className="mx-auto grid max-w-3xl gap-6">
        {achievements.map((a, i) => (
          <motion.div key={a} {...rise(i)} className={`${card} flex items-start gap-4`}>
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-300 to-yellow-500 text-white dark:from-sky-300 dark:to-cyan-400 dark:text-slate-900"><Trophy size={18} /></span>
            <p className="text-sm leading-relaxed">{a}</p>
          </motion.div>
        ))}
      </div>
    </Page>
  );
}

const info = [[Mail, profile.email, `mailto:${profile.email}`], [Phone, profile.phone, `tel:${profile.phone.replace(/\s/g, '')}`], [MapPin, profile.location], [Linkedin, 'LinkedIn', profile.linkedin], [Github, 'GitHub', profile.github]];
const field = 'w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 text-sm outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-200 dark:border-sky-300/25 dark:bg-slate-900/60 dark:text-sky-50 dark:placeholder:text-slate-400 dark:focus:border-sky-300 dark:focus:ring-sky-300/30';

export function Contact() {
  const [f, setF] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const r = await fetch(`${API}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) });
      if (!r.ok) throw new Error();
      setStatus('sent');
      setF({ name: '', email: '', message: '' });
    } catch { setStatus('error'); }
  };
  return (
    <Page icon={Mail} title="Get in touch" banner="/sections/contact.webp" bannerAlt="Contact details for Beella Om Abhiram">
      <div className="grid gap-6 md:grid-cols-5">
        <motion.div {...rise()} className={`${card} md:col-span-2`}>
          <h3 className={`${h3} mb-5`}>Contact details</h3>
          <ul className="space-y-4 text-sm">
            {info.map(([Icon, text, href]) => (
              <li key={text} className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 text-white dark:from-sky-400 dark:to-blue-500"><Icon size={16} /></span>
                {href ? <a href={href} target="_blank" rel="noreferrer" className="break-all transition hover:text-rose-600 dark:hover:text-sky-300">{text}</a> : <span>{text}</span>}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.form {...rise(1)} onSubmit={submit} className={`${card} space-y-4 md:col-span-3`}>
          <h3 className={h3}>Send a message</h3>
          <input required value={f.name} onChange={set('name')} placeholder="Your name" className={field} />
          <input required type="email" value={f.email} onChange={set('email')} placeholder="Your email" className={field} />
          <textarea required rows={5} value={f.message} onChange={set('message')} placeholder="Your message" className={field} />
          <button disabled={status === 'sending'} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-600 to-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rose-500/30 transition hover:scale-105 disabled:opacity-60 dark:from-sky-400 dark:to-blue-500 dark:text-slate-950 dark:shadow-sky-500/30">
            <Send size={15} /> {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
          {status === 'sent' && <p className="text-sm text-emerald-600 dark:text-emerald-300">Message sent. I'll reply soon.</p>}
          {status === 'error' && <p className="text-sm text-rose-600 dark:text-rose-300">Couldn't send the message. Email me directly at {profile.email}.</p>}
        </motion.form>
      </div>
    </Page>
  );
}
