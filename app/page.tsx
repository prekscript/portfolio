"use client";

import { useState, useEffect, useRef } from "react";
import HomeView from "./components/views/HomeView";
import AboutView from "./components/views/AboutView";
import ProjectsView from "./components/views/ProjectsView";
import ExperienceView from "./components/views/ExperienceView";
import SkillsView from "./components/views/SkillsView";
import ContactView from "./components/views/ContactView";
import CopilotPanel from "./components/CopilotPanel";

type FileId = "home" | "about" | "projects" | "experience" | "skills" | "contact";

interface TabFile {
  id: FileId;
  name: string;
  icon: string;
}

const FILES: TabFile[] = [
  { id: "home",       name: "home.tsx",       icon: "[home]" },
  { id: "about",      name: "about.html",     icon: "[user]" },
  { id: "projects",   name: "projects.js",    icon: "[rocket]" },
  { id: "experience", name: "experience.ts",  icon: "[work]" },
  { id: "skills",     name: "skills.json",    icon: "[zap]" },
  { id: "contact",    name: "contact.css",    icon: "[mail]" },
];

const TERMINAL_BOOT: TermLine[] = [
  { type: "prompt", text: "~/preksha-portfolio" },
  { type: "cmd",   text: " npm run dev" },
  { type: "out",   text: "▲ Next.js 15.1.0" },
  { type: "out",   text: "  - Local: http://localhost:3000" },
  { type: "out",   text: "  - ready in 842ms" },
  { type: "blank", text: "" },
  { type: "prompt", text: "~/preksha-portfolio" },
  { type: "cmd",   text: " git log --oneline -5" },
  { type: "green", text: "a3f91c2 feat: add Talent Match AI - local llm pipeline" },
  { type: "green", text: "b72d410 fix: sign language model accuracy → 85%" },
  { type: "green", text: "c901fae feat: GuardianOS terminal dashboard" },
  { type: "green", text: "d14a8b3 chore: add 3am-figma-spree assets" },
  { type: "green", text: "e004c72 init: what if we built something that helps people?" },
  { type: "blank", text: "" },
  { type: "prompt", text: "~/preksha-portfolio" },
  { type: "cmd",   text: "" },
];

const LINE_COUNT = 120;

type TermLine = { type: "prompt" | "cmd" | "out" | "green" | "err" | "blank"; text: string };

const HELP_TEXT: TermLine[] = [
  { type: "out", text: "Available commands:" },
  { type: "green", text: "  help                 show this list" },
  { type: "green", text: "  about                open about.html" },
  { type: "green", text: "  projects             open projects.js" },
  { type: "green", text: "  skills               open skills.json" },
  { type: "green", text: "  experience           open experience.ts" },
  { type: "green", text: "  contact              open contact.css" },
  { type: "green", text: "  open <section>       jump to a section" },
  { type: "green", text: "  ls                   list files" },
  { type: "green", text: "  cat <file>           print a file's summary" },
  { type: "green", text: "  whoami               who's viewing this" },
  { type: "green", text: "  socials              print social links" },
  { type: "green", text: "  clear                clear the terminal" },
];

const FILE_SUMMARIES: Record<FileId, TermLine[]> = {
  home: [{ type: "out", text: "Preksha Chawla — Full-Stack Engineer | ML Developer | Creative Director." }],
  about: [{ type: "out", text: "B.Tech CSE @ VIT Chennai (2023-2027), CGPA 8.53. Believes in co-creating with real people, not just code." }],
  projects: [
    { type: "out", text: "Talent Match AI, GuardianOS, Hush, Parable — open the projects tab for details." },
  ],
  experience: [
    { type: "out", text: "ML Intern @ Navodita Infotech · Frontend Dev @ Incite Gravity · Creative Head @ Zvia Tech · Social Media Manager @ Tinashe." },
  ],
  skills: [{ type: "out", text: "Python, TypeScript, React, Next.js, TensorFlow, OpenCV, and more — see skills.json." }],
  contact: [{ type: "out", text: "chawlapreksha25@gmail.com · linkedin.com/in/preksha-chawla · github.com/prekscript" }],
};

function getView(id: FileId) {
  switch (id) {
    case "home":       return <HomeView />;
    case "about":      return <AboutView />;
    case "projects":   return <ProjectsView />;
    case "experience": return <ExperienceView />;
    case "skills":     return <SkillsView />;
    case "contact":    return <ContactView />;
  }
}

function FileLangIcon({ id }: { id: FileId }) {
  const colors: Record<FileId, string> = {
    home: "#569cd6", about: "#e34c26", projects: "#dcdcaa",
    experience: "#569cd6", skills: "#c586c0", contact: "#264de4",
  };
  const labels: Record<FileId, string> = {
    home: "TS", about: "HTML", projects: "JS",
    experience: "TS", skills: "{ }", contact: "CSS",
  };
  return (
    <span style={{ fontSize: 10, color: colors[id], fontWeight: 700 }}>
      {labels[id]}
    </span>
  );
}

export default function Page() {
  const [openTabs, setOpenTabs]       = useState<TabFile[]>([FILES[0]]);
  const [activeTab, setActiveTab]     = useState<FileId>("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [folderOpen, setFolderOpen]   = useState(true);
  const [panelOpen, setPanelOpen]     = useState(true);
  const [termLines, setTermLines]     = useState<TermLine[]>([]);
  const [clock, setClock]             = useState("");
  const [termInput, setTermInput]     = useState("");
  const [cmdHistory, setCmdHistory]   = useState<string[]>([]);
  const [histIndex, setHistIndex]     = useState<number | null>(null);
  const [copilotOpen, setCopilotOpen] = useState(true);
  const termRef = useRef<HTMLDivElement>(null);
  const termInputRef = useRef<HTMLInputElement>(null);
  const bootDone = termLines.length >= TERMINAL_BOOT.length;

  // Build terminal lines gradually
  useEffect(() => {
    const iv = setInterval(() => {
      setTermLines((p) => {
        if (p.length >= TERMINAL_BOOT.length) {
          clearInterval(iv);
          return p;
        }
        return [...p, TERMINAL_BOOT[p.length]];
      });
    }, 180);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [termLines]);

  // Clock
  useEffect(() => {
    const update = () => {
      const t = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false });
      setClock(t);
    };
    update();
    const iv = setInterval(update, 1000);
    return () => clearInterval(iv);
  }, []);

  function openFile(file: TabFile) {
    if (!openTabs.find((t) => t.id === file.id)) {
      setOpenTabs((p) => [...p, file]);
    }
    setActiveTab(file.id);
  }

  function closeTab(id: FileId, e: React.MouseEvent) {
    e.stopPropagation();
    const next = openTabs.filter((t) => t.id !== id);
    setOpenTabs(next);
    if (activeTab === id) {
      setActiveTab(next.length ? next[next.length - 1].id : "home");
      if (!next.length) setOpenTabs([FILES[0]]);
    }
  }

  function openFileById(id: FileId) {
    const f = FILES.find((x) => x.id === id);
    if (f) openFile(f);
  }

  function runCommand(raw: string) {
    const cmd = raw.trim();
    const echoLines: TermLine[] = [
      { type: "prompt", text: "~/preksha-portfolio" },
      { type: "cmd", text: " " + cmd },
    ];

    if (cmd === "") {
      setTermLines((p) => [...p, ...echoLines]);
      return;
    }

    setCmdHistory((p) => [...p, cmd]);
    setHistIndex(null);

    if (cmd.toLowerCase() === "clear") {
      setTermLines([]);
      return;
    }

    const [name, ...rest] = cmd.split(" ");
    const arg = rest.join(" ").trim().toLowerCase();
    let out: TermLine[] = [];

    switch (name.toLowerCase()) {
      case "help":
        out = HELP_TEXT;
        break;
      case "about": case "projects": case "experience": case "skills": case "contact":
        openFileById(name.toLowerCase() as FileId);
        out = [{ type: "green", text: `Opening ${FILES.find((f) => f.id === name.toLowerCase())?.name} ...` }];
        break;
      case "open": {
        const target = FILES.find((f) => f.id === arg || f.name.toLowerCase().startsWith(arg));
        if (target) {
          openFile(target);
          out = [{ type: "green", text: `Opening ${target.name} ...` }];
        } else {
          out = [{ type: "err", text: `open: no such section "${arg}". Try: home, about, projects, experience, skills, contact.` }];
        }
        break;
      }
      case "ls":
        out = [{ type: "out", text: FILES.map((f) => f.name).join("   ") }];
        break;
      case "cat": {
        const target = FILES.find((f) => f.name.toLowerCase() === arg || f.id === arg);
        out = target ? FILE_SUMMARIES[target.id] : [{ type: "err", text: `cat: ${rest.join(" ") || "(missing file)"}: No such file` }];
        break;
      }
      case "whoami":
        out = [{ type: "out", text: "guest @ preksha-portfolio — probably a recruiter, a curious dev, or Preksha herself." }];
        break;
      case "socials":
        out = [
          { type: "out", text: "GitHub    github.com/prekscript" },
          { type: "out", text: "LinkedIn  linkedin.com/in/preksha-chawla" },
          { type: "out", text: "Email     chawlapreksha25@gmail.com" },
        ];
        break;
      case "date":
        out = [{ type: "out", text: new Date().toString() }];
        break;
      case "echo":
        out = [{ type: "out", text: rest.join(" ") }];
        break;
      case "sudo":
        out = [{ type: "err", text: "Nice try. This terminal runs on good vibes only, not root access." }];
        break;
      case "exit":
        out = [{ type: "err", text: "You can't exit — this is a portfolio, not a shell. Try 'contact' instead." }];
        break;
      default:
        out = [{ type: "err", text: `command not found: ${name}. Type 'help' to see available commands.` }];
    }

    setTermLines((p) => [...p, ...echoLines, ...out]);
  }

  function handleTermKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      runCommand(termInput);
      setTermInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!cmdHistory.length) return;
      const nextIndex = histIndex === null ? cmdHistory.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(nextIndex);
      setTermInput(cmdHistory[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIndex === null) return;
      const nextIndex = histIndex + 1;
      if (nextIndex >= cmdHistory.length) {
        setHistIndex(null);
        setTermInput("");
      } else {
        setHistIndex(nextIndex);
        setTermInput(cmdHistory[nextIndex]);
      }
    }
  }

  const activeFile = FILES.find((f) => f.id === activeTab)!;

  return (
    <div className={`ide ${copilotOpen ? "copilot-open" : ""}`}>
      {/* ── TITLE BAR ── */}
      <div className="titlebar">
        <div className="titlebar-dots">
          <div className="titlebar-dot r" />
          <div className="titlebar-dot y" />
          <div className="titlebar-dot g" />
        </div>
        <div className="titlebar-menu">
          {["File", "Edit", "View", "Go", "Run", "Terminal", "Help"].map((m) => (
            <span key={m}>{m}</span>
          ))}
          <span onClick={() => setCopilotOpen((p) => !p)} style={{ color: copilotOpen ? "var(--accent)" : undefined }}>
            Copilot
          </span>
        </div>
        <span>Preksha Chawla - Portfolio</span>
      </div>

      {/* ── ACTIVITY BAR ── */}
      <div className="actbar">
        <button
          className={`actbar-icon ${sidebarOpen ? "active" : ""}`}
          title="Explorer"
          onClick={() => setSidebarOpen((p) => !p)}
        >
          📁
        </button>
        <button className="actbar-icon" title="Search" onClick={() => openFile(FILES[0])}>🔍</button>
        <button className="actbar-icon" title="Source Control" onClick={() => openFile(FILES[2])}>🔀</button>
        <button className="actbar-icon" title="Extensions" onClick={() => openFile(FILES[4])}>🧩</button>
        <button
          className={`actbar-icon ${copilotOpen ? "active" : ""}`}
          title="Copilot"
          onClick={() => setCopilotOpen((p) => !p)}
        >
          ✦
        </button>
        <button
          className="actbar-icon"
          title="Contact"
          style={{ marginTop: "auto", marginBottom: 8 }}
          onClick={() => openFile(FILES[5])}
        >
          [mail]
        </button>
      </div>

      {/* ── SIDEBAR ── */}
      <div className={`sidebar ${sidebarOpen ? "" : "collapsed"}`}>
        <div className="sidebar-title">Explorer</div>
        <div className="file-tree">
          <div className="folder">
            <div className="folder-header" onClick={() => setFolderOpen((p) => !p)}>
              <span className={`folder-arrow ${folderOpen ? "open" : ""}`}>▶</span>
              <span className="folder-icon">📂</span>
              <span className="folder-name">PREKSHA-CHAWLA</span>
            </div>
            {folderOpen && (
              <div>
                {FILES.map((f) => (
                  <div
                    key={f.id}
                    className={`file-item ${activeTab === f.id ? "active" : ""}`}
                    onClick={() => openFile(f)}
                  >
                    <FileLangIcon id={f.id} />
                    <span>{f.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="sidebar-section">
            <div className="sidebar-section-header">Open Editors</div>
            {openTabs.map((t) => (
              <div
                key={t.id}
                className={`file-item ${activeTab === t.id ? "active" : ""}`}
                onClick={() => openFile(t)}
              >
                <FileLangIcon id={t.id} />
                <span>{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── EDITOR AREA ── */}
      <div className="editor-area">
        {/* Tab bar */}
        <div className="tabbar">
          {openTabs.map((t) => (
            <div
              key={t.id}
              className={`tab ${activeTab === t.id ? "active" : ""}`}
              onClick={() => setActiveTab(t.id)}
            >
              <FileLangIcon id={t.id} />
              <span>{t.name}</span>
              <button className="tab-close" onClick={(e) => closeTab(t.id, e)}>×</button>
            </div>
          ))}
        </div>

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span className="crumb">preksha-chawla</span>
          <span className="sep"> › </span>
          <span className="crumb">{activeFile?.name}</span>
        </div>

        {/* Editor + line numbers */}
        <div className="editor-content">
          <div className="line-numbers">
            {Array.from({ length: LINE_COUNT }, (_, i) => (
              <div key={i} className="line-number">{i + 1}</div>
            ))}
          </div>
          {getView(activeTab)}
        </div>

        {/* Terminal Panel */}
        <div className={`panel ${panelOpen ? "" : "collapsed"}`}>
          <div className="panel-header">
            <span className="panel-tab active">TERMINAL</span>
            <span className="panel-tab">PROBLEMS</span>
            <span className="panel-tab">OUTPUT</span>
            <button className="panel-close" onClick={() => setPanelOpen(false)}>∧</button>
          </div>
          <div className="terminal-body" ref={termRef} onClick={() => termInputRef.current?.focus()}>
            {termLines.map((line, i) => {
              if (!line) return null;
              if (line.type === "blank") return <div key={i}>&nbsp;</div>;
              if (line.type === "prompt")
                return (
                  <div key={i}>
                    <span className="t-prompt">{line.text}</span>
                    {i + 1 < termLines.length && termLines[i + 1]?.type === "cmd"
                      ? null
                      : !bootDone && <span className="t-cursor" />}
                  </div>
                );
              if (line.type === "cmd")
                return <span key={i} className="t-cmd">{line.text}{"\n"}</span>;
              if (line.type === "green")
                return <div key={i} className="t-green">{line.text}</div>;
              if (line.type === "err")
                return <div key={i} className="t-err">{line.text}</div>;
              return <div key={i} className="t-out">{line.text}</div>;
            })}
            {bootDone && (
              <div className="term-line-row">
                <span className="t-prompt">~/preksha-portfolio</span>
                <div className="term-input-line">
                  <input
                    ref={termInputRef}
                    className="term-input"
                    value={termInput}
                    onChange={(e) => setTermInput(e.target.value)}
                    onKeyDown={handleTermKeyDown}
                    autoFocus
                    spellCheck={false}
                    placeholder="type 'help'"
                  />
                </div>
                <span className="term-hint">↵</span>
              </div>
            )}
          </div>
        </div>

        {!panelOpen && (
          <button
            onClick={() => setPanelOpen(true)}
            style={{
              position: "absolute", bottom: 22, right: 60,
              background: "var(--sidebar-bg)", border: "1px solid var(--border)",
              color: "var(--ink-dim)", padding: "2px 10px", fontSize: 11,
              cursor: "pointer", borderRadius: 3,
            }}
          >
            ⊻ Terminal
          </button>
        )}
      </div>

      {/* ── COPILOT PANEL ── */}
      {copilotOpen && (
        <CopilotPanel onClose={() => setCopilotOpen(false)} openFile={openFileById} />
      )}

      {/* ── STATUS BAR ── */}
      <div className="statusbar">
        <div className="statusbar-left">
          <div className="statusbar-item">
            <span>⎇</span>
            <span>main</span>
          </div>
          <div className="statusbar-item">
            <span>↑1</span>
            <span>✦4</span>
          </div>
          <div className="statusbar-item">
            <span>✓ 0</span>
            <span>⚠ 0</span>
          </div>
        </div>
        <div className="statusbar-right">
          <div className="statusbar-item">TypeScript</div>
          <div className="statusbar-item">UTF-8</div>
          <div className="statusbar-item">Ln 1, Col 1</div>
          <div
            className="statusbar-item"
            onClick={() => setCopilotOpen((p) => !p)}
            style={{ cursor: "pointer" }}
          >
            ✦ Copilot
          </div>
          <div className="statusbar-item" onClick={() => openFile(FILES[5])} style={{ cursor: "pointer" }}>
            💬 Let's collab
          </div>
          <div className="statusbar-item">{clock}</div>
        </div>
      </div>
    </div>
  );
}
