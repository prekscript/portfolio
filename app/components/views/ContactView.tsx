"use client";

const contact = {
  name: "Preksha Chawla",
  status: "Available for internships & collaborations",
  email: "chawlapreksha25@gmail.com",
  github: "https://github.com/prekscript",
  linkedin: "https://linkedin.com/in/preksha-chawla-34739a284",
  phone: "+91 9354206320",
  location: "Gurugram, Haryana, India",
};

const links = [
  {
    label: "Email",
    value: contact.email,
    href: `mailto:${contact.email}`,
  },
  {
    label: "GitHub",
    value: "github.com/prekscript",
    href: contact.github,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/preksha-chawla-34739a284",
    href: contact.linkedin,
  },
  {
    label: "Phone",
    value: contact.phone,
    href: `tel:${contact.phone.replace(/\s/g, "")}`,
  },
  {
    label: "Location",
    value: contact.location,
    href: "#",
  },
];

export default function ContactView() {
  return (
    <div className="code-body">
      <div className="code-line">
        <span className="cmt">// contact.ts</span>
      </div>

      <div className="code-line">&nbsp;</div>

      <div className="code-line">
        <span className="kw2">const</span>{" "}
        <span className="fn">developer</span>
        <span className="wh"> = </span>
        <span className="wh">{"{"}</span>
      </div>

      <div className="code-line">
        &nbsp;&nbsp;name:
        <span className="str"> "{contact.name}"</span>,
      </div>

      <div className="code-line">
        &nbsp;&nbsp;status:
        <span className="str"> "{contact.status}"</span>,
      </div>

      <div className="code-line">
        &nbsp;&nbsp;responseTime:
        <span className="str"> "~24 hours"</span>,
      </div>

      <div className="code-line">
        &nbsp;&nbsp;interests:
        <span className="str">
          {" "}
          ["AI", "Agentic AI", "Full Stack", "ML", "Blockchain"]
        </span>
      </div>

      <div className="code-line">
        <span className="wh">{"}"}</span>
      </div>

      <div className="code-line">&nbsp;</div>

      <div className="contact-links">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="contact-row"
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
          >
            <div>
              <span className="contact-label">{link.label}</span>
              <span className="contact-value">{link.value}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}