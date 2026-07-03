"use client";

type Token = { t: string; c?: string };
type Line  = Token[];

const lines: Line[] = [
  [{ t: "// home.tsx - Preksha Chawla", c: "cmt" }],
  [],
  [{ t: "import", c: "kw" }, { t: " { Developer, Builder, Human } ", c: "wh" }, { t: "from", c: "kw" }, { t: " '@/preksha'", c: "str" }],
  [],
  [{ t: "const", c: "kw2" }, { t: " Preksha", c: "fn" }, { t: " = () => {", c: "wh" }],
  [{ t: "  return (", c: "wh" }],
  [{ t: "    <Developer", c: "tag" }],
  [{ t: "      name", c: "attr" }, { t: "=", c: "wh" }, { t: '"Preksha Chawla"', c: "str" }],
  [{ t: "      role", c: "attr" }, { t: "=", c: "wh" }, { t: '"Full-Stack Engineer | ML Developer | Creative Director"', c: "str" }],
  [{ t: "      university", c: "attr" }, { t: "=", c: "wh" }, { t: '"VIT Chennai, B.Tech CSE (2023-2027)"', c: "str" }],
  [{ t: "      cgpa", c: "attr" }, { t: "=", c: "wh" }, { t: '"8.72"', c: "str" }],
  [{ t: "    >", c: "tag" }],
  [{ t: "      <Philosophy>", c: "tag" }],
  [{ t: "        ", c: "wh" }, { t: '"Most of what I build starts with a late-night"', c: "str" }],
  [{ t: "        ", c: "wh" }, { t: '"what if?"', c: "acc" }, { t: " or something I've seen people struggle with around me.", c: "str" }],
  [{ t: "      </Philosophy>", c: "tag" }],
  [{ t: "      <Approach", c: "tag" }],
  [{ t: "        coCreating", c: "attr" }, { t: "=", c: "wh" }, { t: "true", c: "kw" }],
  [{ t: "        with", c: "attr" }, { t: '=["designers", "devs", "users"]', c: "wh" }],
  [{ t: "        bestIdeasComeFrom", c: "attr" }, { t: "=[", c: "wh" }],
  [{ t: '          "messy Google Docs",', c: "str" }],
  [{ t: '          "3am Figma sprees",', c: "str" }],
  [{ t: '          "asking: does this actually help someone?"', c: "str" }],
  [{ t: "        ]", c: "wh" }],
  [{ t: "      />", c: "tag" }],
  [{ t: "    </Developer>", c: "tag" }],
  [{ t: "  )", c: "wh" }],
  [{ t: "}", c: "wh" }],
  [],
  [{ t: "export default", c: "kw" }, { t: " Preksha", c: "fn" }],
  [],
  [{ t: "/*", c: "cmt" }],
  [{ t: "  Quick links:", c: "cmt" }],
  [{ t: "  Email  : chawlapreksha25@gmail.com", c: "cmt" }],
  [{ t: "  GitHub : github.com/prekscript", c: "cmt" }],
  [{ t: "  LinkedIn: linkedin.com/in/preksha-chawla", c: "cmt" }],
  [{ t: "  Location: Chennai, Tamil Nadu", c: "cmt" }],
  [{ t: "*/", c: "cmt" }],
];

export default function HomeView() {
  return (
    <div className="code-body view-prose">
      {lines.map((line, i) =>
        line.length === 0 ? (
          <div key={i} className="code-line">&nbsp;</div>
        ) : (
          <div key={i} className="code-line">
            {line.map((tok, j) => (
              <span key={j} className={tok.c || "wh"}>{tok.t}</span>
            ))}
          </div>
        )
      )}
    </div>
  );
}
