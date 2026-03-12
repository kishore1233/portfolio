// App.jsx
import React, { useRef, useState } from 'react';
import './styles/globals.css';
import { useCursor, useTypewriter, useScrollReveal, useThreeBackground } from './hooks/usePortfolioHooks';
import { typewriterPhrases } from './data/portfolioData';
import { NavBar, Hero, Experience, Projects, Skills, Certifications, Contact, ProjectModal } from './components/index';

export default function App() {
  const canvasRef = useRef(null);
  const { cursorRef, ringRef, hovered } = useCursor();
  const typewriterText = useTypewriter(typewriterPhrases);
  const [activeProject, setActiveProject] = useState(null);

  useThreeBackground(canvasRef);
  useScrollReveal('.reveal');

  return (
    <>
      {/* Three.js background */}
      <canvas id="bg-canvas" ref={canvasRef} />

      {/* Custom cursor */}
      <div ref={cursorRef} className={`cursor${hovered ? ' hovered' : ''}`} />
      <div ref={ringRef} className="cursor-ring" />

      {/* Navigation */}
      <NavBar />

      {/* Page content */}
      <main>
        <Hero typewriterText={typewriterText} />
        <Experience />
        <Projects onProjectClick={setActiveProject} />
        <Skills />
        <Certifications />
        <Contact />
      </main>

      {/* Project detail modal */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </>
  );
}
