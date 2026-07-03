"use client";

const focus = [
  {
    text: "Building scalable full-stack applications using React, Next.js, Node.js, TypeScript and Firebase.",
  },
  {
    text: "Developing Agentic AI systems with OpenAI Agents SDK, LangGraph, Ollama and LLM-powered workflows.",
  },
  {
    text: "Creating AI-powered applications that combine intelligent automation with intuitive user experiences.",
  },
  {
    text: "Exploring Machine Learning, Computer Vision, Blockchain and modern software architecture.",
  },
  {
    text: "Solving real-world problems through projects like Deep Research, MediLedger and Hush.",
  },
  {
    text: "Continuously learning new technologies while building production-ready software.",
  },
];

const certifications = [
  "Web Developer Bootcamp — Udemy (2024)",
  "Python for Computer Vision with OpenCV and Deep Learning — Udemy (2024)",
];

const leadership = [
  {
    role: "Social Media Lead",
    org: "IEEE Computer Society VIT",
    impact:
      "Led recruitment campaigns, event branding and technical outreach initiatives.",
  },
  {
    role: "Volunteer",
    org: "Pledge a Smile NGO",
    impact:
      "Organized fundraising initiatives and coordinated volunteers for community outreach programs.",
  },
];

export default function AboutView() {
  return (
    <div className="page-wrap">
      <h1 className="page-title">About Me</h1>

      <div className="page-subtitle">
        {"// building intelligent software, one project at a time"}
      </div>

      <div className="about-card">
        Hi! I'm <b className="hl-white">Preksha Chawla</b>, a B.Tech Computer
        Science and Engineering student at{" "}
        <b className="hl-blue">VIT Chennai</b> (2023–2027) with a{" "}
        <b className="hl-blue">CGPA of 8.72</b>.
        <br />
        <br />
        I'm passionate about{" "}
        <b className="hl-blue">Full-Stack Development</b>,{" "}
        <b className="hl-blue">Artificial Intelligence</b>,{" "}
        <b className="hl-blue">Agentic AI</b>,{" "}
        <b className="hl-blue">Machine Learning</b> and{" "}
        <b className="hl-blue">Blockchain</b>. I enjoy transforming ideas into
        scalable software that solves practical problems.
        <br />
        <br />
        Recently, I've been building projects including an AI-powered{" "}
        <b className="hl-pink">Deep Research Assistant</b>,{" "}
        <b className="hl-pink">MediLedger</b> for secure healthcare record
        management, and <b className="hl-pink">Hush</b>, an accessibility
        platform for sign language recognition. I'm always excited to learn,
        collaborate and build products that create meaningful impact.
      </div>

      <div className="section-label">Current Focus</div>

      <div className="focus-grid">
        {focus.map((item) => (
          <div className="focus-item" key={item.text}>
            <span>{item.text}</span>
          </div>
        ))}
      </div>

      <div className="section-label">Education</div>

      <div className="focus-item" style={{ marginBottom: 8 }}>
        <span>
          <b className="hl-white">
            B.Tech, Computer Science & Engineering
          </b>{" "}
          — Vellore Institute of Technology, Chennai (2023–2027) · CGPA 8.72
        </span>
      </div>

      <div className="section-label">Certifications</div>

      {certifications.map((certification) => (
        <div
          key={certification}
          className="focus-item"
          style={{ marginBottom: 8 }}
        >
          <span>{certification}</span>
        </div>
      ))}

      <div className="section-label">Leadership & Volunteering</div>

      {leadership.map((item) => (
        <div
          key={item.role}
          className="focus-item"
          style={{ marginBottom: 12 }}
        >
          <span>
            <b className="hl-white">{item.role}</b> · {item.org}
            <br />
            {item.impact}
          </span>
        </div>
      ))}
    </div>
  );
}