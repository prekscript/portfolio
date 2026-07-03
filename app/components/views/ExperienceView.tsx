"use client";

const experience = [
 
  {
    date: "Jun 2025 - Jul 2025",
    role: "Frontend Developer",
    org: "Incite Gravity",
    desc: "Built full-stack dashboards with React, Next.js, Node.js, Tailwind CSS, REST APIs, and Firebase. Optimized performance using code-splitting and lazy loading - improved Lighthouse score by 25%. Developed reusable React components and state management solutions.",
  },
  {
    date: "Mar 2024 - Jul 2024",
    role: "Creative Head",
    org: "Zvia Tech",
    desc: "Directed UI/UX strategy using Figma, wireframes, prototyping, and design systems for a cross-platform SaaS product. Coordinated designers, devs, and content teams. Reduced reported UI/UX issues by 40% through usability testing and integrated feedback loops.",
  },
  {
    date: "Apr 2022 - Apr 2023",
    role: "Social Media Manager",
    org: "Tinashe",
    desc: "Planned and executed multi-platform campaigns using analytics tools, scheduling platforms, and content management systems. Increased follower engagement by 35%. Partnered with photographers and influencers to strengthen visual identity and community reach.",
  },
];

export default function ExperienceView() {
  return (
    <div className="code-body">
      <div className="code-line"><span className="cmt">{"// experience.tsx - Work History"}</span></div>
      <div className="code-line">&nbsp;</div>
      <div className="exp-timeline" style={{ marginTop: "20px" }}>
        {experience.map((e, i) => (
          <div className="exp-item" key={i}>
            <div className="exp-dot" />
            <div className="exp-date">{e.date}</div>
            <div className="exp-role">{e.role}</div>
            <div className="exp-org">{e.org}</div>
            <p className="exp-desc">{e.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
