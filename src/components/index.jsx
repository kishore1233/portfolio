// components/index.jsx — all UI components

import React, { useRef, useState, useEffect } from 'react';
import { useTilt } from '../hooks/usePortfolioHooks';
import { meta, contact, experience, projects, skills, certifications } from '../data/portfolioData';

/* ── NavBar ──────────────────────────────────────────────────── */
export function NavBar() {
  return (
    <nav>
      <a href="#hero" className="nav-logo">KK<span>.</span></a>
      <ul className="nav-links">
        <li><a href="#hero">Home</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#certs">Certs</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}

/* ── Hero ────────────────────────────────────────────────────── */
export function Hero({ typewriterText }) {
  const tiltRef = useRef(null);
  useTilt(tiltRef);

  return (
    <section id="hero" className="hero-section">
      <div className="hero-left">
        <div className="hero-tag">Available for Opportunities</div>
        <h1 className="hero-name">
          <span className="line1">KISHORE</span>
          <span className="line2">KUMAR K S</span>
        </h1>
        <p className="hero-title">
          &gt; <span className="typewriter-text">{typewriterText}</span>
          <span className="cursor-blink" />
        </p>
        <p className="hero-desc">{meta.tagline}</p>
        <div className="hero-cta">
          <a href="#projects" className="btn-primary">View Projects</a>
          <a href="#contact" className="btn-outline">Get In Touch</a>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-card-3d" ref={tiltRef}>
          {/* ── Photo or initials avatar ─────────────────────── */}
          {meta.photo ? (
            <img src={meta.photo} alt={meta.name} className="hero-avatar-photo" />
          ) : (
            <div className="hero-avatar">{meta.initials}</div>
          )}
          <div className="hero-card-name">{meta.name}</div>
          <div className="hero-card-role">// {meta.title}</div>
          <div className="hero-stats">
            {meta.stats.map((s) => (
              <div className="hero-stat" key={s.label}>
                <span className="hero-stat-num">{s.num}</span>
                <span className="hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
          <div className="hero-tech-stack">
            {meta.techStack.map((t) => <span className="tech-tag" key={t}>{t}</span>)}
          </div>
        </div>
      </div>

      <div className="scroll-hint">
        <div className="scroll-line" />
        <div className="scroll-text">Scroll</div>
      </div>
    </section>
  );
}

/* ── Experience ──────────────────────────────────────────────── */
export function Experience() {
  return (
    <section id="experience" style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
      <div className="section-label">Career Timeline</div>
      <h2 className="section-title">Experience</h2>
      <div className="exp-grid">
        {experience.map((exp) => (
          <div className={`exp-card reveal color-${exp.color}`} key={exp.id}>
            <div className="exp-badge">{exp.badge}</div>
            <div className="exp-period">{exp.period}</div>
            <div className="exp-title">{exp.title}</div>
            <div className="exp-company">{exp.company}</div>
            <ul className="exp-points">
              {exp.points.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
            {/* ── Certificate / external link ─────────────────── */}
            {exp.link && (
              <a
                href={exp.link}
                target="_blank"
                rel="noreferrer"
                className={`card-link link-${exp.color}`}
                onClick={(e) => e.stopPropagation()}
              >
                {exp.linkLabel}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Projects ────────────────────────────────────────────────── */
export function Projects({ onProjectClick }) {
  return (
    <section id="projects" style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
      <div className="section-label">Built From Scratch</div>
      <h2 className="section-title">Projects</h2>
      <div className="projects-grid">
        {projects.map((p) => (
          <div
            className={`project-card reveal color-${p.color}`}
            key={p.id}
            onClick={() => onProjectClick(p)}
          >
            <span className="project-icon">{p.icon}</span>
            <div className="project-name">{p.name}</div>
            <div className="project-desc">{p.description}</div>
            <div className="project-tech">
              {p.tech.slice(0, 4).map((t) => <span className="tech-tag" key={t}>{t}</span>)}
            </div>
            <div className="project-year">{p.year}</div>

            {/* ── GitHub + Live links ─────────────────────────── */}
            <div className="project-links" onClick={(e) => e.stopPropagation()}>
              {p.github && (
                <a href={p.github} target="_blank" rel="noreferrer" className={`proj-link link-${p.color}`}>
                  🐙 GitHub
                </a>
              )}
              {p.live && (
                <a href={p.live} target="_blank" rel="noreferrer" className={`proj-link link-${p.color}`}>
                  ↗ Live Demo
                </a>
              )}
            </div>

            <div className="view-details">VIEW DETAILS →</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Skills ──────────────────────────────────────────────────── */
export function Skills() {
  return (
    <section id="skills" style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
      <div className="section-label">Technical Arsenal</div>
      <h2 className="section-title">Skills</h2>
      <div className="skills-layout">
        {skills.map((g) => (
          <div className={`skill-group reveal accent-${g.accent}`} key={g.title}>
            <div className="skill-group-title">{g.title}</div>
            <div className="skill-pills">
              {g.pills.map((p) => <span className="skill-pill" key={p}>{p}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Certifications ──────────────────────────────────────────── */
export function Certifications() {
  return (
    <section id="certs" style={{ maxWidth: 1100, margin: '0 auto', width: '100%' }}>
      <div className="section-label">Verified Achievements</div>
      <h2 className="section-title">Certifications</h2>
      <div className="cert-list">
        {certifications.map((c, i) => (
          /* Wrap in <a> if link exists, otherwise plain div */
          c.link ? (
            <a
              href={c.link}
              target="_blank"
              rel="noreferrer"
              className="cert-item cert-item-link reveal"
              key={i}
            >
              <div className="cert-icon">{c.icon}</div>
              <div className="cert-text">{c.text}</div>
              <span className="cert-arrow">↗</span>
            </a>
          ) : (
            <div className="cert-item reveal" key={i}>
              <div className="cert-icon">{c.icon}</div>
              <div className="cert-text">{c.text}</div>
            </div>
          )
        ))}
      </div>
    </section>
  );
}

/* ── Contact ─────────────────────────────────────────────────── */
export function Contact() {
  return (
    <section id="contact" style={{ maxWidth: 800, margin: '0 auto', width: '100%', textAlign: 'center' }}>
      <div className="section-label">Let's Connect</div>
      <h2 className="section-title">Get In Touch</h2>
      <p className="contact-tagline">
        Currently pursuing B.Tech at SIETK Puttur (graduating May 2026).<br />
        Open to internships, collaborative projects, and full-time opportunities.
      </p>
      <div className="contact-links">
        <a href={`mailto:${contact.email}`} className="contact-link">
          <span className="contact-link-icon">✉</span>{contact.email}
        </a>
        <a href={`tel:${contact.phone}`} className="contact-link">
          <span className="contact-link-icon">📱</span>{contact.phone}
        </a>
        <a href="https://www.linkedin.com/in/k-s-kishore-kumar-0938ab270/" target="_blank" rel="noreferrer" className="contact-link">
          <span className="contact-link-icon">💼</span>LinkedIn Profile
        </a>
        <a href="https://github.com/kishore1233" target="_blank" rel="noreferrer" className="contact-link">
          <span className="contact-link-icon">🐙</span>GitHub Profile
        </a>
      </div>
      <div className="footer-line">Built with React · Three.js — Kishore Kumar K S © 2025</div>
    </section>
  );
}

/* ── Project Modal ───────────────────────────────────────────── */
export function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [project, onClose]);

  return (
    <div className={`modal-overlay${project ? ' open' : ''}`}>
      <div className="modal-backdrop" onClick={onClose} />
      {project && (
        <div className="modal-content">
          <button className="modal-close" onClick={onClose}>✕</button>
          <span className="modal-icon">{project.icon}</span>
          <div className="modal-title">{project.name}</div>
          <div className="modal-subtitle">{project.tech.slice(0,4).join(' · ')} · {project.year}</div>
          <div className="modal-desc">{project.description}</div>
          <ul className="modal-points">
            {project.points.map((pt, i) => <li key={i}>{pt}</li>)}
          </ul>
          <div className="modal-tags" style={{ marginBottom: '1.5rem' }}>
            {project.tech.map((t) => <span className="tech-tag" key={t}>{t}</span>)}
          </div>
          {/* ── Modal action links ───────────────────────────── */}
          <div className="modal-actions">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="modal-btn modal-btn-outline">
                🐙 GitHub Repo
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className="modal-btn modal-btn-primary">
                ↗ Live Demo
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
