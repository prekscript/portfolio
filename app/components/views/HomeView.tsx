"use client";

type FileId = "home" | "about" | "projects" | "experience" | "skills" | "contact" | "readme";

export default function HomeView({ onNavigate }: { onNavigate: (id: FileId) => void }) {
  return (
    <div className="hero">
      <div className="page-comment">// hello world !! Welcome to my portfolio</div>

      <h1 className="hero-name">
        <span className="line1">Preksha</span>
        <span className="line2">Chawla</span>
      </h1>

      <div className="hero-badges">
        <span className="hero-badge"><span className="bdot" style={{ background: "var(--accent-teal)" }} />Full-Stack Engineer</span>
        <span className="hero-badge"><span className="bdot" style={{ background: "var(--accent-blue)" }} />ML Developer</span>
        <span className="hero-badge"><span className="bdot" style={{ background: "var(--ink-light)" }} />Creative Director</span>
        <span className="hero-badge pink">@ VIT Chennai</span>
      </div>

      <div className="hero-tagline">Always learning, always shipping ✨</div>

      <p className="hero-desc">
        I live at the crossroads of <b className="hl-blue">backend engineering</b>,{" "}
        <b className="hl-blue">AI/ML</b>, and <b className="hl-blue">creative direction</b>.
        Most of what I build starts with a late-night <b className="hl-pink">"what if?"</b> —
        or something I've seen people struggle with around me. I care about systems that are
        genuinely <b className="hl-white">intelligent and useful</b>, not just impressive on paper.
      </p>

      <div className="hero-actions">
        <button className="hero-btn primary" onClick={() => onNavigate("projects")}>
          📁 Projects
        </button>
        <button className="hero-btn outline" onClick={() => onNavigate("about")}>👤 About Me</button>
        <button className="hero-btn outline" onClick={() => onNavigate("contact")}>✉ Contact</button>
      </div>

      <div className="hero-stats">
        <div className="hero-stat">
          <div className="hero-stat-num">3+</div>
          <div className="hero-stat-label">Years</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num">4+</div>
          <div className="hero-stat-label">Projects</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num">∞</div>
          <div className="hero-stat-label">Curiosity</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num">↑</div>
          <div className="hero-stat-label">Always Learning</div>
        </div>
      </div>
    </div>
  );
}
