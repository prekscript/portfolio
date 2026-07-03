"use client";

type Token = { t: string; c?: string };
type Line  = Token[];

const lines: Line[] = [
  [{ t: "// about.tsx - Who is Preksha?", c: "cmt" }],
  [],
  [{ t: "const", c: "kw2" }, { t: " about", c: "fn" }, { t: ": ", c: "wh" }, { t: "AboutMe", c: "typ" }, { t: " = {", c: "wh" }],
  [{ t: "  name", c: "attr" }, { t: ": ", c: "wh" }, { t: '"Preksha Chawla"', c: "str" }, { t: ",", c: "wh" }],
  [{ t: "  based", c: "attr" }, { t: ": ", c: "wh" }, { t: '"Chennai, Tamil Nadu"', c: "str" }, { t: ",", c: "wh" }],
  [{ t: "  studying", c: "attr" }, { t: ": {", c: "wh" }],
  [{ t: "    degree", c: "attr" }, { t: ": ", c: "wh" }, { t: '"B.Tech Computer Science & Engineering"', c: "str" }, { t: ",", c: "wh" }],
  [{ t: "    university", c: "attr" }, { t: ": ", c: "wh" }, { t: '"Vellore Institute of Technology, Chennai"', c: "str" }, { t: ",", c: "wh" }],
  [{ t: "    year", c: "attr" }, { t: ": ", c: "wh" }, { t: '"2023 - 2027"', c: "str" }, { t: ",", c: "wh" }],
  [{ t: "    cgpa", c: "attr" }, { t: ": ", c: "wh" }, { t: "8.72", c: "num" }, { t: ",", c: "wh" }],
  [{ t: "  },", c: "wh" }],
  [],
  [{ t: "  buildingPhilosophy", c: "attr" }, { t: ": `", c: "str" }],
  [{ t: '    Most of what I build starts with a late-night "what if?"', c: "str" }],
  [{ t: "    or something I've seen people struggle with around me.", c: "str" }],
  [],
  [{ t: "    I'm big on co-creating - whether it's with designers, devs,", c: "str" }],
  [{ t: "    or just honest conversations with users.", c: "str" }],
  [],
  [{ t: "    The best ideas don't come from perfect code.", c: "str" }],
  [{ t: "    They come from messy Google Docs, 3am Figma sprees,", c: "str" }],
  [{ t: "    and asking one question over and over:", c: "str" }],
  [{ t: '    "Does this actually help someone?"', c: "acc" }],
  [{ t: "  `,", c: "str" }],
  [],
  [{ t: "  certifications", c: "attr" }, { t: ": [", c: "wh" }],
  [{ t: '    "Web Developer Bootcamp - Udemy (2024)",', c: "str" }],
  [{ t: '    "Python for Computer Vision with OpenCV - Udemy (2024)",', c: "str" }],
  [{ t: "  ],", c: "wh" }],
  [],
  [{ t: "  leadership", c: "attr" }, { t: ": [", c: "wh" }],
  [{ t: "    {", c: "wh" }],
  [{ t: "      role", c: "attr" }, { t: ": ", c: "wh" }, { t: '"Social Media Lead"', c: "str" }, { t: ",", c: "wh" }],
  [{ t: "      org", c: "attr" }, { t: ": ", c: "wh" }, { t: '"IEEE Computer Society VIT"', c: "str" }, { t: ",", c: "wh" }],
  [{ t: "      impact", c: "attr" }, { t: ": ", c: "wh" }, { t: '"Recruitment campaigns, event creatives, outreach & branding"', c: "str" }],
  [{ t: "    },", c: "wh" }],
  [{ t: "    {", c: "wh" }],
  [{ t: "      role", c: "attr" }, { t: ": ", c: "wh" }, { t: '"Volunteer"', c: "str" }, { t: ",", c: "wh" }],
  [{ t: "      org", c: "attr" }, { t: ": ", c: "wh" }, { t: '"Pledge a Smile NGO"', c: "str" }, { t: ",", c: "wh" }],
  [{ t: "      impact", c: "attr" }, { t: ": ", c: "wh" }, { t: '"Tech-enabled fundraisers, volunteer teams, community impact"', c: "str" }],
  [{ t: "    },", c: "wh" }],
  [{ t: "  ],", c: "wh" }],
  [{ t: "}", c: "wh" }],
  [],
  [{ t: "export default", c: "kw" }, { t: " about", c: "fn" }],
];

export default function AboutView() {
  return (
    <div className="code-body">
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
