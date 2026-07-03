"use client";

type FileId =
  | "home"
  | "about"
  | "projects"
  | "experience"
  | "skills"
  | "contact"
  | "readme";

export default function HomeView({
  onNavigate,
}: {
  onNavigate: (id: FileId) => void;
}) {
  return (
    <div className="hero">
      <div className="page-comment">
        // Building AI systems, full-stack applications & solving real-world problems
      </div>

      <h1 className="hero-name">
        <span className="line1">Preksha</span>
        <span className="line2">Chawla</span>
      </h1>

      <div className="hero-badges">
        <span className="hero-badge">
          <span
            className="bdot"
            style={{ background: "var(--accent-teal)" }}
          />
          Full-Stack Developer
        </span>

        <span className="hero-badge">
          <span
            className="bdot"
            style={{ background: "var(--accent-blue)" }}
          />
          AI & ML Engineer
        </span>

        <span className="hero-badge">
          <span
            className="bdot"
            style={{ background: "var(--ink-light)" }}
          />
          Agentic AI Builder
        </span>

        <span className="hero-badge pink">
          B.Tech CSE • CGPA 8.72
        </span>
      </div>

      <div className="hero-tagline">
        Building intelligent software that solves real problems.
      </div>

      <p className="hero-desc">
        I'm a Computer Science student at <b className="hl-blue">VIT Chennai</b>{" "}
        passionate about <b className="hl-blue">AI</b>,{" "}
        <b className="hl-blue">Agentic Systems</b>,{" "}
        <b className="hl-blue">Machine Learning</b>,{" "}
        <b className="hl-blue">Blockchain</b>, and{" "}
        <b className="hl-blue">Full-Stack Development</b>.
        <br />
        <br />
        I enjoy building products that combine intelligent automation with great
        user experiences—from AI research assistants and healthcare platforms to
        accessibility tools and modern web applications.
      </p>

      <div className="hero-actions">
        <button
          className="hero-btn primary"
          onClick={() => onNavigate("projects")}
        >
          View Projects
        </button>

        <button
          className="hero-btn outline"
          onClick={() => onNavigate("about")}
        >
          About Me
        </button>

        <button
          className="hero-btn outline"
          onClick={() => onNavigate("contact")}
        >
          Contact
        </button>
      </div>

      <div className="hero-stats">
        <div className="hero-stat">
          <div className="hero-stat-num">8.72</div>
          <div className="hero-stat-label">CGPA</div>
        </div>

        <div className="hero-stat">
          <div className="hero-stat-num">5+</div>
          <div className="hero-stat-label">Major Projects</div>
        </div>

        <div className="hero-stat">
          <div className="hero-stat-num">3</div>
          <div className="hero-stat-label">Internships & Leadership Roles</div>
        </div>

        <div className="hero-stat">
          <div className="hero-stat-num">∞</div>
          <div className="hero-stat-label">Curiosity</div>
        </div>
      </div>
    </div>
  );
}