"use client";

const projects = [
  {
    icon: "[ai]",
    title: "Deep Research",
    desc: "A multi-agent AI research assistant built with the OpenAI Agents SDK that plans research, performs parallel web searches, generates comprehensive reports, and automatically emails results through an interactive Gradio interface.",
    tags: ["Python", "OpenAI Agents SDK", "Gradio", "AsyncIO", "Pydantic"],
    tagColor: "green",
    github: "https://github.com/prekscript/deep-research",
    live: "#",
  },
  {
    icon: "[blockchain]",
    title: "Mediledger 2.0",
    desc: "Blockchain-based pharmaceutical supply chain platform leveraging Ethereum, Zero-Knowledge Proofs, IPFS, and AI-powered anomaly detection to securely track drugs and verify patient records.",
    tags: ["Solidity", "Ethereum", "IPFS", "zkSNARKs", "Gemini API"],
    tagColor: "",
    github: "https://github.com/prekscript/Mediledger",
    live: "#",
  },
  {
    icon: "[asl]",
    title: "HushConnect",
    desc: "Real-time sign language recognition platform that converts gestures into text and speech using deep learning, improving accessibility through multilingual support and low-latency inference.",
    tags: ["TensorFlow", "OpenCV", "Python", "Firebase", "NumPy"],
    tagColor: "orange",
    github: "https://github.com/prekscript/hushconnect-",
    live: "#",
  },
  {
    icon: "[book]",
    title: "Parable",
    desc: "A community storytelling platform for sharing cultural experiences, featuring gamification, advanced search, user interactions, and a scalable serverless architecture.",
    tags: ["Next.js", "React", "Firebase", "Tailwind CSS", "REST APIs"],
    tagColor: "",
    github: "https://github.com/prekscript/parable",
    live: "#",
  },
];

export default function ProjectsView() {
  return (
    <div className="code-body">
      <div className="code-line"><span className="cmt">{"// projects.tsx - Selected Work"}</span></div>
      <div className="code-line">&nbsp;</div>
      <div className="projects-grid" style={{ marginTop: "16px" }}>
        {projects.map((p) => (
          <div className="project-card" key={p.title}>
            <div className="project-card-header">
              <div className="project-card-icon">{p.icon}</div>
              <div className="project-card-links">
                <a href={p.github} className="project-card-link" target="_blank" rel="noopener">
                  GitHub
                </a>
                <a href={p.live} className="project-card-link" target="_blank" rel="noopener">
                  Live ↗
                </a>
              </div>
            </div>
            <div className="project-card-title">{p.title}</div>
            <p className="project-card-desc">{p.desc}</p>
            <div className="project-card-tags">
              {p.tags.map((t) => (
                <span key={t} className={`tag-pill ${p.tagColor}`}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
