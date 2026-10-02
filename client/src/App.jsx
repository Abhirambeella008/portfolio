import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import CursorFX from './components/CursorFX.jsx';
import Aurora from './components/Aurora.jsx';
import Home from './pages/Home.jsx';
import { About, Skills, Projects, Internships, Education, Certifications, Achievements, Contact } from './pages/Pages.jsx';

export default function App() {
  const location = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50 font-sans text-slate-700 dark:from-[#071122] dark:via-[#0b1c3a] dark:to-[#08172f] dark:text-slate-200">
      <Aurora />
      <CursorFX />
      <Navbar />
      <div className="relative z-10">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/education" element={<Education />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </AnimatePresence>
      </div>
    </div>
  );
}
