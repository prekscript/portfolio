"use client";

import { useState, useEffect, useRef } from "react";
import HomeView from "./components/views/HomeView";
import AboutView from "./components/views/AboutView";
import ProjectsView from "./components/views/ProjectsView";
import ExperienceView from "./components/views/ExperienceView";
import SkillsView from "./components/views/SkillsView";
import ContactView from "./components/views/ContactView";
import ReadmeView from "./components/views/ReadmeView";
import CopilotPanel from "./components/CopilotPanel";

type FileId = "home" | "about" | "projects" | "experience" | "skills" | "contact" | "readme";

interface TabFile {
  id: FileId;
  name: string;
}

const FILES: TabFile[] = [
  { id: "home",       name: "home.tsx" },
  { id: "about",      name: "about.html" },
  { id: "projects",   name: "projects.js" },
  { id: "experience", name: "experience.ts" },
  { id: "skills",     name: "skills.json" },
  { id: "contact",    name: "contact.css" },
  { id: "readme",     name: "README.md" },
];

type Theme = { id: string; label: string; emoji: string; swatch: string };
const THEMES: Theme[] = [
  { id: "preksha",     label: "Preksha Dark", emoji: "💚", swatch: "#c8ff4d" },
  { id: "rose-pine",   label: "Rosé Pine",    emoji: "🌸", swatch: "#eb6f92" },
  { id: "tokyo-night", label: "Tokyo Night",  emoji: "🌃", swatch: "#7aa2f7" },
  { id: "catppuccin",  label: "Catppuccin",   emoji: "🐱", swatch: "#cba6f7" },
  { id: "nord",        label: "Nord",         emoji: "🧊", swatch: "#88c0d0" },
  { id: "gruvbox",     label: "Gruvbox",      emoji: "🔥", swatch: "#fabd2f" },
];

type TermLine = { type: "prompt" | "cmd" | "out" | "green" | "err" | "blank"; text: string };

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

const HELP_TEXT: TermLine[] = [
  { type: "out", text: "Available commands:" },
  { type: "green", text: "  help                 show this list" },
  { type: "green", text: "  about                open about.html" },
  { type: "green", text: "  projects             open projects.js" },
  { type: "green", text: "  skills               open skills.json" },
  { type: "green", text: "  experience           open experience.ts" },
  { type: "green", text: "  contact              open contact.css" },
  { type: "green", text: "  readme               open README.md" },
  { type: "green", text: "  theme <name>         switch color theme" },
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
  readme: [{ type: "out", text: "Full profile summary — role, stack, and philosophy in one page." }],
};

const SEARCH_INDEX: Record<FileId, string> = {
  home: "Preksha Chawla Full-Stack Engineer ML Developer Creative Director VIT Chennai backend engineering AI ML data science intelligent scalable always learning always shipping",
  about: "About Me VIT Chennai CGPA 8.53 education certifications leadership IEEE Computer Society Pledge a Smile NGO RAG MLOps vector databases NLP LLMs",
  projects: "Talent Match AI GuardianOS Hush Parable Next.js FastAPI Ollama Llama pgvector TensorFlow OpenCV Firebase sign language translator serverless storytelling",
  experience: "ML Intern Navodita Infotech Frontend Developer Incite Gravity Creative Head Zvia Tech Social Media Manager Tinashe internship dashboards Lighthouse",
  skills: "Python TypeScript JavaScript Java C C++ React Next.js Node.js Tailwind TensorFlow OpenCV scikit-learn Pandas NumPy Git Docker Figma VS Code Linux",
  contact: "email linkedin github phone location chawlapreksha25 gmail linkedin.com/in/preksha-chawla github.com/prekscript contact send message",
  readme: "Preksha Chawla stack languages tools AI ML Python TypeScript React Next.js TensorFlow FastAPI",
};

function searchFiles(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return FILES.filter(
    (f) => f.name.toLowerCase().includes(q) || SEARCH_INDEX[f.id].toLowerCase().includes(q)
  );
}
function getView(id: FileId, onNavigate: (id: FileId) => void) {
  switch (id) {
    case "home":       return <HomeView onNavigate={onNavigate} />;
    case "about":      return <AboutView />;
    case "projects":   return <ProjectsView />;
    case "experience": return <ExperienceView />;
    case "skills":     return <SkillsView />;
    case "contact":    return <ContactView />;
    case "readme":     return <ReadmeView />;
  }
}

function FileBadge({ id }: { id: FileId }) {
  const map: Record<FileId, { bg: string; fg: string; label: string }> = {
    home:       { bg: "transparent", fg: "#61dafb", label: "⚛" },
    about:      { bg: "#e34c26",     fg: "#fff",    label: "5" },
    projects:   { bg: "#f0db4f",     fg: "#222",    label: "JS" },
    experience: { bg: "#3178c6",     fg: "#fff",    label: "TS" },
    skills:     { bg: "transparent", fg: "#dcdcaa", label: "{ }" },
    contact:    { bg: "#264de4",     fg: "#fff",    label: "3" },
    readme:     { bg: "transparent", fg: "#4ec9b0", label: "M↓" },
  };
  const m = map[id];
  return (
    <span
      className="file-badge"
      style={{ background: m.bg, color: m.fg, fontSize: id === "skills" || id === "readme" ? 9 : 8 }}
    >
      {m.label}
    </span>
  );
}

export default function Page() {
  const [openTabs, setOpenTabs]       = useState<TabFile[]>([FILES[0]]);
  const [activeTab, setActiveTab]     = useState<FileId>("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarMode, setSidebarMode] = useState<"explorer" | "search">("explorer");
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [panelOpen, setPanelOpen]     = useState(true);
  const [termLines, setTermLines]     = useState<TermLine[]>([]);
  const [clock, setClock]             = useState("");
  const [termInput, setTermInput]     = useState("");
  const [cmdHistory, setCmdHistory]   = useState<string[]>([]);
  const [histIndex, setHistIndex]     = useState<number | null>(null);
  const [copilotOpen, setCopilotOpen] = useState(true);
  const [themeId, setThemeId]         = useState("preksha");
  const [themePopup, setThemePopup]   = useState(false);
  const termRef = useRef<HTMLDivElement>(null);
  const termInputRef = useRef<HTMLInputElement>(null);
  const bootDone = termLines.length >= TERMINAL_BOOT.length;

  // Load saved theme
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("preksha-theme");
      if (saved && THEMES.some((t) => t.id === saved)) setThemeId(saved);
    } catch {}
  }, []);

  function selectTheme(id: string) {
    setThemeId(id);
    setThemePopup(false);
    try { window.localStorage.setItem("preksha-theme", id); } catch {}
  }

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

  function requestResume() {
    window.open(
      "mailto:chawlapreksha25@gmail.com?subject=Resume%20request&body=Hi%20Preksha%2C%20could%20you%20send%20over%20your%20resume%3F",
      "_blank"
    );
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
      case "about": case "projects": case "experience": case "skills": case "contact": case "readme":
        openFileById(name.toLowerCase() as FileId);
        out = [{ type: "green", text: `Opening ${FILES.find((f) => f.id === name.toLowerCase())?.name} ...` }];
        break;
      case "open": {
        const target = FILES.find((f) => f.id === arg || f.name.toLowerCase().startsWith(arg));
        if (target) {
          openFile(target);
          out = [{ type: "green", text: `Opening ${target.name} ...` }];
        } else {
          out = [{ type: "err", text: `open: no such section "${arg}". Try: home, about, projects, experience, skills, contact, readme.` }];
        }
        break;
      }
      case "theme": {
        const target = THEMES.find((t) => t.id === arg || t.label.toLowerCase().replace(/\s+/g, "-") === arg);
        if (target) {
          selectTheme(target.id);
          out = [{ type: "green", text: `Switched theme to ${target.label} ${target.emoji}` }];
        } else {
          out = [{ type: "err", text: `theme: unknown "${arg}". Try: ${THEMES.map((t) => t.id).join(", ")}.` }];
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
  const activeTheme = THEMES.find((t) => t.id === themeId)!;

  return (
    <div className={`ide ${copilotOpen ? "copilot-open" : ""}`} data-theme={themeId === "preksha" ? undefined : themeId}>
      {/* ── TITLE BAR ── */}
      <div className="titlebar">
        <div className="titlebar-dots">
          <div className="titlebar-dot r" />
          <div className="titlebar-dot y" />
          <div className="titlebar-dot g" />
        </div>
        <div className="titlebar-search">
          <span className="ts-icon">🔍</span>
          <span className="ts-path">preksha-chawla</span>
          <span className="ts-sep">:</span>
          <span>portfolio</span>
          <span className="titlebar-kbd">Ctrl</span>
          <span className="titlebar-kbd">P</span>
        </div>
      </div>

      {/* ── MENU BAR ── */}
      <div className="menubar">
        {["File", "Edit", "View", "Go", "Run"].map((m) => (
          <span key={m}>{m}</span>
        ))}
        <span
          onClick={() => setPanelOpen((p) => !p)}
          style={{ color: panelOpen ? "var(--accent-blue)" : undefined }}
        >
          Terminal
        </span>
        <span>Help</span>
        <span
          className="copilot-menu-item"
          onClick={() => setCopilotOpen((p) => !p)}
          style={{ color: copilotOpen ? "var(--syn-purple)" : undefined }}
        >
          Copilot
        </span>
      </div>

      {/* ── ACTIVITY BAR ── */}
      <div className="actbar">
        <button
          className={`actbar-icon ${sidebarOpen && sidebarMode === "explorer" ? "active" : ""}`}
          title="Explorer"
          onClick={() => {
            if (sidebarMode === "explorer") setSidebarOpen((p) => !p);
            else { setSidebarMode("explorer"); setSidebarOpen(true); }
          }}
        >
          📁
        </button>
        <button
          className={`actbar-icon ${sidebarOpen && sidebarMode === "search" ? "active" : ""}`}
          title="Search"
          onClick={() => {
            if (sidebarMode === "search") setSidebarOpen((p) => !p);
            else { setSidebarMode("search"); setSidebarOpen(true); }
            setTimeout(() => searchInputRef.current?.focus(), 0);
          }}
        >
          🔍
        </button>
        <button className="actbar-icon" title="Source Control" onClick={() => openFile(FILES[2])}>🔀</button>
        <button className="actbar-icon" title="Resume" onClick={requestResume}>⬇</button>
        <button
          className={`actbar-icon ${copilotOpen ? "active" : ""}`}
          title="Copilot"
          onClick={() => setCopilotOpen((p) => !p)}
        >
          ✦
        </button>
        <button
          className="actbar-icon"
          title="Color Theme"
          style={{ marginTop: "auto", marginBottom: 8 }}
          onClick={() => setThemePopup((p) => !p)}
        >
          ⚙
        </button>
      </div>

      {/* ── SIDEBAR ── */}
      <div className={`sidebar ${sidebarOpen ? "" : "collapsed"}`}>
        {sidebarMode === "explorer" ? (
          <>
            <div className="sidebar-title">Portfolio</div>
            <div className="file-tree">
              {FILES.map((f) => (
                <div
                  key={f.id}
                  className={`file-item ${activeTab === f.id ? "active" : ""}`}
                  onClick={() => openFile(f)}
                >
                  <FileBadge id={f.id} />
                  <span>{f.name}</span>
                </div>
              ))}
              <div className="file-item" onClick={requestResume}>
                <span className="file-badge" style={{ background: "#f40f02", color: "#fff", fontSize: 6.5 }}>PDF</span>
                <span>Preksha_Chawla_Resume.pdf</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="sidebar-title">Search</div>
            <div className="search-box-wrap">
              <input
                ref={searchInputRef}
                className="search-box"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
            <div className="file-tree">
              {searchQuery.trim() === "" && (
                <div className="search-empty">Type to search across all files</div>
              )}
              {searchQuery.trim() !== "" && searchFiles(searchQuery).length === 0 && (
                <div className="search-empty">No results for "{searchQuery}"</div>
              )}
              {searchFiles(searchQuery).map((f) => (
                <div
                  key={f.id}
                  className={`file-item search-result ${activeTab === f.id ? "active" : ""}`}
                  onClick={() => { openFile(f); }}
                >
                  <FileBadge id={f.id} />
                  <div>
                    <div>{f.name}</div>
                    <div className="search-snippet">
                      {SEARCH_INDEX[f.id].toLowerCase().includes(searchQuery.trim().toLowerCase())
                        ? "…" + SEARCH_INDEX[f.id].slice(
                            Math.max(0, SEARCH_INDEX[f.id].toLowerCase().indexOf(searchQuery.trim().toLowerCase()) - 20),
                            SEARCH_INDEX[f.id].toLowerCase().indexOf(searchQuery.trim().toLowerCase()) + 40
                          ) + "…"
                        : "matched filename"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="sidebar-footer">
          <button className="copilot-launcher" onClick={() => setCopilotOpen((p) => !p)}>
            <span className="copilot-launcher-icon">
              ✦
              <span className="copilot-launcher-dot" />
            </span>
            <span className="copilot-launcher-label">Preksha's Copilot</span>
            <span className="copilot-launcher-badge">AI</span>
          </button>
          <div className="sidebar-git-row">
            <span>🔀</span>
            <span className="git-name">main</span>
            <span className="git-ahead">↑1</span>
            <span className="git-dirty">✦4</span>
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
              <FileBadge id={t.id} />
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

        {/* Editor */}
        <div className="editor-content">
          {getView(activeTab, openFileById)}
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
            <span>⚠ 0</span>
          </div>
          <div className="statusbar-item">
            <span>⎇</span>
            <span>main</span>
          </div>
          <div className="statusbar-item" onClick={() => openFile(FILES[6])} style={{ cursor: "pointer" }}>
            Preksha's Portfolio
          </div>
        </div>
        <div className="statusbar-right">
          <div
            className="statusbar-item"
            onClick={() => setCopilotOpen((p) => !p)}
            style={{ cursor: "pointer" }}
          >
            Copilot
          </div>
          <div className="statusbar-item">
            {activeTab === "about" ? "HTML" : activeTab === "projects" ? "JavaScript"
              : activeTab === "skills" ? "JSON" : activeTab === "contact" ? "CSS"
              : activeTab === "readme" ? "Markdown" : "TypeScript React"}
          </div>
          <div className="statusbar-item">UTF-8</div>
          <div className="statusbar-item">Prettier</div>
          <div className="theme-popup-wrap">
            <div
              className="statusbar-item"
              onClick={() => setThemePopup((p) => !p)}
              style={{ cursor: "pointer" }}
            >
              <span>{activeTheme.emoji}</span>
              <span>{activeTheme.label}</span>
              <span style={{ fontSize: 9 }}>▲</span>
            </div>
            {themePopup && (
              <div className="theme-popup">
                <div className="theme-popup-title">Color Theme</div>
                {THEMES.map((t) => (
                  <div
                    key={t.id}
                    className={`theme-popup-row ${t.id === themeId ? "selected" : ""}`}
                    onClick={() => selectTheme(t.id)}
                  >
                    <span className="theme-swatch" style={{ background: t.swatch }} />
                    <span>{t.emoji}</span>
                    <span className="tp-name">{t.label}</span>
                    {t.id === themeId && <span className="tp-check">✓</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="statusbar-item">{clock}</div>
        </div>
      </div>
    </div>
  );
}