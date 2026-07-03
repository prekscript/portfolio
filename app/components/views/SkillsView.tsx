"use client";

const skillGroups = [
  {
    label: "// Programming Languages",
    skills: [
      "Python",
      "Java",
      "C++",
      "C",
      "JavaScript",
      "TypeScript",
      "SQL",
    ],
  },
  {
    label: "// AI & Machine Learning",
    skills: [
      "OpenAI Agents SDK",
      "TensorFlow",
      "OpenCV",
      "scikit-learn",
      "Isolation Forest",
      "Pandas",
      "NumPy",
      "Prompt Engineering",
    ],
  },
  {
    label: "// Web Development",
    skills: [
      "React",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
      "REST APIs",
      "Firebase",
      "Gradio",
    ],
  },
  {
    label: "// Blockchain",
    skills: [
      "Solidity",
      "Ethereum",
      "Web3",
      "IPFS",
      "zkSNARKs",
      "Smart Contracts",
    ],
  },
  {
    label: "// Developer Tools",
    skills: [
      "Git",
      "GitHub",
      "Docker",
      "Linux",
      "Figma",
      "VS Code",
    ],
  },
  {
    label: "// Currently Exploring",
    skills: [
      "LangGraph",
      "CrewAI",
      "Ollama",
      "MCP",
      "RAG",
      "Azure",
      "CloudSim Plus",
    ],
  },
];

export default function SkillsView() {
  return (
    <div className="code-body">
      <div className="code-line"><span className="cmt">{"// skills.tsx - Toolkit"}</span></div>
      <div className="code-line">&nbsp;</div>
      <div className="skills-container" style={{ marginTop: "16px" }}>
        {skillGroups.map((g) => (
          <div key={g.label}>
            <div className="skill-group-title">{g.label}</div>
            <div className="skill-pills">
              {g.skills.map((s) => (
                <div className="skill-pill" key={s}>
                  {s}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
