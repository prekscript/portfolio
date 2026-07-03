"use client";

import { useState, useRef, useEffect } from "react";

type FileId = "home" | "about" | "projects" | "experience" | "skills" | "contact";

type Msg = { role: "user" | "assistant"; text: string };

const SUGGESTIONS = [
  "Tell me about Deep Research",
  "What projects has Preksha built?",
  "What are her technical skills?",
  "How can I contact her?",
];

const PROJECTS_BLURB =
  "Preksha enjoys building AI-powered and full-stack applications:\n\n" +
  "• Deep Research — a multi-agent AI research assistant built using the OpenAI Agents SDK that plans research, performs parallel web searches, generates comprehensive reports, and emails results automatically.\n" +
  "• Mediledger 2.0 — blockchain-based pharmaceutical supply chain platform using Ethereum, Solidity, IPFS, Zero-Knowledge Proofs, Isolation Forest, and Gemini AI for counterfeit drug detection.\n" +
  "• HushConnect — a real-time sign-language recognition platform that converts gestures into text and speech using TensorFlow and OpenCV.\n" +
  "• Parable — a community storytelling platform for sharing cultural experiences, featuring gamification, advanced search, and a scalable serverless architecture.\n\n" +
  "Open the Projects tab to explore each project in more detail.";

const SKILLS_BLURB =
  "Her technical toolkit includes:\n\n" +
  "• Languages: Python, Java, C++, C, JavaScript, TypeScript, SQL\n" +
  "• AI & ML: OpenAI Agents SDK, TensorFlow, OpenCV, Scikit-learn, Isolation Forest, Pandas, NumPy\n" +
  "• Web: React, Next.js, Node.js, Tailwind CSS, Firebase, REST APIs, Gradio\n" +
  "• Blockchain: Solidity, Ethereum, Web3, IPFS, Smart Contracts, zkSNARKs\n" +
  "• Tools: Git, GitHub, Docker, Linux, VS Code, Figma\n" +
  "• Currently Exploring: LangGraph, CrewAI, Ollama, MCP, RAG, Azure";
const EXPERIENCE_BLURB =
  "A quick overview:\n\n" +
  "• Frontend Developer @ Incite Gravity (Jun–Jul 2026) — built full-stack dashboards using React, Next.js, Tailwind CSS, Firebase, and REST APIs.\n" +
  "• Creative Head @ Zvia Tech (Mar–Jul 2024) — led UI/UX strategy, prototyping, and design systems for a SaaS product.\n" +
  "• Social Media Manager @ Tinashe (Apr 2022–Apr 2023) — planned and executed multi-platform marketing campaigns that increased engagement by 35%.";
const ABOUT_BLURB =
  "Preksha Chawla is a Computer Science undergraduate at VIT Chennai (2023–2027, CGPA 8.72) with a passion for AI, full-stack development, and emerging technologies.\n\n" +
  "She enjoys building agentic AI systems, machine learning applications, and scalable web platforms while continuously exploring blockchain and cloud technologies.";
const CONTACT_BLURB =
  "Best ways to reach her:\n\n" +
  "• Email: chawlapreksha25@gmail.com\n" +
  "• LinkedIn: linkedin.com/in/preksha-chawla\n" +
  "• GitHub: github.com/prekscript\n" +
  "• Phone: +91 93542 06320\n\n" +
  "She's open to work and responds within 24 hours.";

function generateReply(question: string): string {
  const q = question.toLowerCase();

  if (/\b(hire|available|open to work|freelance|opportunit)\b/.test(q)) {
    return "Yes — she's currently open to work. " + CONTACT_BLURB;
  }
  if (/\b(deep research|research assistant)\b/.test(q))
  return "Deep Research is a multi-agent AI research assistant built with the OpenAI Agents SDK. It orchestrates Planner, Search, Writer, and Email agents to automatically perform web research, generate detailed reports, and deliver them through a Gradio interface.";
  if (/\b(contact|email|reach|linkedin|phone|number)\b/.test(q)) return CONTACT_BLURB;
  if (/\b(mediledger|blockchain)\b/.test(q))
  return "Mediledger 2.0 is a blockchain-powered pharmaceutical supply chain platform that combines Ethereum, Solidity, IPFS, Zero-Knowledge Proofs, Isolation Forest, and Gemini AI to securely track drugs, verify medical records, and detect counterfeit products.";
  if (/\bhush/.test(q))
  return "HushConnect is a real-time sign language recognition platform that translates gestures into text and speech using TensorFlow and OpenCV. It supports multilingual communication and is optimized for low-latency predictions.";
  if (/\b(talent match)\b/.test(q))
    return "Talent Match AI is a zero-cost, full-stack AI candidate-matching platform — local LLM inference, semantic embeddings, and live web scraping for talent discovery. Built entirely without a single paid API, using Next.js 14, FastAPI, Ollama/Llama3.2, and pgvector.";
  if (/\b(guardian ?os)\b/.test(q))
    return "GuardianOS is an AI-assisted developer terminal with NLP debugging and automated script generation, paired with a React + Node dashboard for command analytics. It improved dev productivity by roughly 20%.";
  if (/\bhush\b/.test(q))
    return "Hush is a real-time sign-language detection platform that converts gestures to text and speech for inclusive communication — it hits 85% recognition accuracy in live scenarios, built with TensorFlow, OpenCV, and Firebase.";
  if (/\bparable\b/.test(q))
    return "Parable is a serverless community storytelling platform for crowd-sourced cultural exchange, with gamification, search, and dynamic rendering — built on Next.js, React, and Firebase.";
  if (/\b(project|built|build|portfolio piece|work on)\b/.test(q)) return PROJECTS_BLURB;
  if (/\b(skill|stack|tech|language|tool)\b/.test(q)) return SKILLS_BLURB;
  if (/\b(experience|intern|job|role|history|career)\b/.test(q)) return EXPERIENCE_BLURB;
  if (/\b(who|about|cgpa|university|vit|college|degree)\b/.test(q)) return ABOUT_BLURB;
  if (/\b(resume|cv)\b/.test(q))
    return "There's a resume file in the Explorer sidebar (Aahana_Bobade_Resume.pdf-style entry) — or just email her directly and she'll send it over.";
  if (/\b(hi|hello|hey|sup)\b/.test(q))
    return "Hey! I'm Preksha's Copilot. Ask me about her projects, skills, experience, or how to reach her.";
  if (/\bthank/.test(q)) return "Anytime — good luck exploring the rest of the portfolio!";

  return (
    "I don't have specifics on that yet — but I can tell you about her projects, skills, experience, " +
    "or how to get in touch. Try one of the suggestions below, or ask directly!"
  );
}

export default function CopilotPanel({
  onClose,
  openFile,
}: {
  onClose: () => void;
  openFile: (id: FileId) => void;
}) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, typing]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    setMessages((p) => [...p, { role: "user", text: trimmed }]);
    setInput("");
    setTyping(true);

    // side-effect: jump the editor to a relevant tab
    const q = trimmed.toLowerCase();
    if (/\bproject/.test(q)) openFile("projects");
    else if (/\bskill|stack|tech/.test(q)) openFile("skills");
    else if (/\bexperience|intern|career/.test(q)) openFile("experience");
    else if (/\bcontact|email|reach/.test(q)) openFile("contact");
    else if (/\babout|who is|cgpa/.test(q)) openFile("about");

    const delay = 500 + Math.random() * 500;
    setTimeout(() => {
      setMessages((p) => [...p, { role: "assistant", text: generateReply(trimmed) }]);
      setTyping(false);
    }, delay);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  return (
    <div className="copilot-panel">
      <div className="copilot-header">
        <span className="copilot-header-title">
          <span className="dot" />
          Preksha's Copilot
        </span>
        <span className="copilot-close" onClick={onClose}>×</span>
      </div>

      <div className="copilot-body" ref={bodyRef}>
        <div className="copilot-msg assistant">
          <span className="copilot-msg-label">Copilot</span>
          <div className="copilot-msg-bubble">
            Hi! I'm Preksha's Copilot 👋{"\n"}I can tell you about her projects, technical skills, experience, and how to get in touch. Try asking about Deep Research, Mediledger, HushConnect, or Parable.
          </div>
        </div>

        {messages.length === 0 && (
          <div className="copilot-suggestions">
            {SUGGESTIONS.map((s) => (
              <button key={s} className="copilot-chip" onClick={() => send(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`copilot-msg ${m.role}`}>
            <span className="copilot-msg-label">{m.role === "user" ? "You" : "Copilot"}</span>
            <div className="copilot-msg-bubble">{m.text}</div>
          </div>
        ))}

        {typing && (
          <div className="copilot-msg assistant">
            <span className="copilot-msg-label">Copilot</span>
            <div className="copilot-typing">
              <span /><span /><span />
            </div>
          </div>
        )}
      </div>

      <div className="copilot-footer">
        <div className="copilot-input-row">
          <textarea
            className="copilot-textarea"
            rows={1}
            placeholder="Ask Copilot about Preksha..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="copilot-send"
            disabled={!input.trim() || typing}
            onClick={() => send(input)}
          >
            ➤
          </button>
        </div>
        <div className="copilot-footer-hint">Rule-based demo assistant · answers from portfolio data</div>
      </div>
    </div>
  );
}
