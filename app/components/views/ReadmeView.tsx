"use client";

const techPills = [
  { label: "Python", color: "#569cd6", icon: "🐍" },
  { label: "TypeScript", color: "#3178c6", icon: "◆" },
  { label: "React / Next.js", color: "#4ec9b0", icon: "⚛" },
  { label: "TensorFlow", color: "#ff5fa8", icon: "🧠" },
  { label: "FastAPI", color: "#4ec9b0", icon: "⚡" },
];

export default function ReadmeView() {
  return (
    <div className="page-wrap">
      <div className="readme-heading" style={{ marginTop: 0 }}>Preksha Chawla</div>
      <div className="page-subtitle">B.Tech CSE @ VIT Chennai · Chennai, India 🇮🇳</div>

      <div className="readme-pill-row">
        {techPills.map((p) => (
          <span key={p.label} className="readme-pill" style={{ borderColor: p.color + "66", color: p.color }}>
            {p.icon} {p.label}
          </span>
        ))}
      </div>

      <div className="readme-section-title">💜 About</div>
      <p className="readme-p">
        Hi, Preksha on this side! I'm a Full-Stack Engineer, ML Developer, and Creative
        Director, currently a B.Tech CSE student at VIT Chennai. I care about systems that are
        genuinely intelligent and useful — not just impressive on paper. When I'm not shipping
        code, I'm probably deep in a Figma file or thinking through the UX of something nobody
        asked for yet.
      </p>
      <div className="focus-item" style={{ marginBottom: 6 }}>
        <span className="fi-icon">🚀</span>
        <span>Building end-to-end products across backend, frontend, and ML</span>
      </div>
      <div className="focus-item" style={{ marginBottom: 6 }}>
        <span className="fi-icon">🤖</span>
        <span>Deep interest in computer vision, NLP, and applied ML pipelines</span>
      </div>
      <div className="focus-item" style={{ marginBottom: 6 }}>
        <span className="fi-icon">✨</span>
        <span>Always learning, always shipping</span>
      </div>

      <div className="readme-heading">Stack</div>

      <div className="readme-stack-label">Languages:</div>
      <div className="readme-pill-group">
        {["Python", "TypeScript", "JavaScript", "Java", "C", "C++"].map((s) => (
          <span key={s} className="readme-tech-pill">{s}</span>
        ))}
      </div>

      <div className="readme-stack-label">Web &amp; Cloud:</div>
      <div className="readme-pill-group">
        {["React", "Next.js", "Node.js", "Tailwind CSS", "Firebase"].map((s) => (
          <span key={s} className="readme-tech-pill">{s}</span>
        ))}
      </div>

      <div className="readme-stack-label">AI / ML:</div>
      <div className="readme-pill-group">
        {["TensorFlow", "OpenCV", "scikit-learn", "Pandas", "NumPy"].map((s) => (
          <span key={s} className="readme-tech-pill">{s}</span>
        ))}
      </div>

      <div className="readme-stack-label">Tools:</div>
      <div className="readme-pill-group">
        {["Git", "Docker", "Figma", "VS Code", "Linux"].map((s) => (
          <span key={s} className="readme-tech-pill">{s}</span>
        ))}
      </div>
    </div>
  );
}
