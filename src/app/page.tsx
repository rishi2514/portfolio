"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import React, { useState, useEffect } from "react";
import { useTheme } from "./ThemeContext";
import {
  Menu, X, Sun, Moon, ExternalLink,
  Code, Sparkles, Smartphone, Globe, Palette,
  GraduationCap, Mail, Phone, MapPin, ArrowRight,
  CheckCircle, Calendar, AlertCircle, Heart
} from "lucide-react";

const GitHubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const LinkedInIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764.784 1.764 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

// Project Type Definition
interface Project {
  id: string;
  title: string;
  role: string;
  categories: ("web" | "mobile" | "design")[];
  tech: string[];
  description: string;
  summary: string;
  features: string[];
  duration: string;
  highlights: string[];
  link?: string;
  github?: string;
}

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [projectFilter, setProjectFilter] = useState<"all" | "web" | "mobile">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Contact Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.documentElement.classList.add("js");

    // Intersection Observer for section navigation
    const sections = ["hero", "about", "skills", "experience", "projects", "contact"];
    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.25, rootMargin: "-10% 0px -40% 0px" }
      );
      observer.observe(el);
      return { observer, el };
    });

    // Reveal observer
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("reveal-hidden");
            entry.target.classList.add("reveal");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal-trigger").forEach(el => {
      el.classList.add("reveal-hidden");
      revealObserver.observe(el);
    });

    return () => {
      observers.forEach(obs => { if (obs) { obs.observer.unobserve(obs.el); obs.observer.disconnect(); } });
      revealObserver.disconnect();
    };
  }, []);

  if (!mounted) return null;

  // Project Data
  const projects: Project[] = [
    {
      id: "aum-task",
      title: "AUM TASK (Enterprise Task Management System)",
      role: "Frontend Developer Intern",
      categories: ["mobile", "web"],
      tech: ["React Native", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Google Calendar API"],
      duration: "Dec 2025 - Present",
      summary: "A comprehensive Jira-style task management ecosystem designed to streamline enterprise task flows. Built the React Native mobile client and Next.js web dashboard.",
      description: "As Frontend Developer Intern at AUM Group, I have been actively driving the architecture and features of the AUM TASK product. I specialize in building type-safe UI views, seamless transitions, and native device interactions on both mobile and web clients.",
      features: [
        "Cross-Platform Native Client: Developed robust authentication and core workspace navigation in React Native.",
        "Server-Side Rendered Web App: Built Next.js web portal routes using TypeScript for optimal load speeds and state management.",
        "Google Calendar & Meet Integrations: Programmatic creation and synchronization of Google Meet events for sprint discussions.",
        "Note for Approval (NFA) Module: Dynamic workflow enabling personnel to draft and submit structural logs and notes to managers for digital signs.",
        "Real-time Dashboard: Interactive metrics visualizing task completion, approval statuses, and employee activity stats."
      ],
      highlights: [
        "Reduced initial application loading time by optimizing navigation state structures.",
        "Ensured type-safety across client-server communications with strict TypeScript interfaces.",
        "Collaborated in an agile scrum environment using Git/GitHub for PR reviews and continuous deployment."
      ],
      link: "https://task.aum.in",
      github: "https://github.com/rishi2514"
    },
    {
      id: "aayushicare",
      title: "aayushicare.com",
      role: "Frontend Developer",
      categories: ["web"],
      tech: ["HTML5", "CSS3", "JavaScript", "CorelDRAW", "Responsive Design", "SEO Optimization"],
      duration: "Jan 2025 - Aug 2025",
      summary: "End-to-end design, development, and launch of the corporate presence for Aayushi Hygiene and Care Pvt Ltd.",
      description: "Spearheaded the design and development of the corporate business website to establish a cohesive brand identity and digital outreach. Designed custom vector graphics and layouts, implementing them as clean, responsive code.",
      features: [
        "Semantic Architecture: Built from the ground up using clean, SEO-friendly HTML5 markup to ensure high visibility.",
        "Responsive Grid Layout: Created custom CSS media-query rules, verifying smooth displays on mobile, tablet, and ultra-wide screens.",
        "Brand Identity Assets: Designed vector logo and marketing illustrations in CorelDRAW, exporting optimized web formats.",
        "Interactive Elements: Implemented custom JS sliders, contact inquiries, and responsive navigation drawers."
      ],
      highlights: [
        "Successfully deployed the website, resulting in an immediate increase in digital inbound queries.",
        "Scored 95+ on Google Lighthouse audits for Performance, SEO, and Accessibility.",
        "Maintained cross-browser compatibility back to legacy versions."
      ],
      link: "https://aayushicare.com",
      github: "https://github.com/rishi2514"
    },
    {
      id: "epaathshaala",
      title: "ePaathshaala YouTube Platform",
      role: "Content Creator & Online Tutor",
      categories: ["design"],
      tech: ["Slide Design", "Video Production", "Technical Presentation", "Multimedia Editing", "Instructional UX"],
      duration: "Jul 2020 - Oct 2022",
      summary: "Designed and presented structured digital educational tutorials, reaching a broad audience with high-retention instructional slides.",
      description: "Engineered and structured visual slide decks and educational videos to translate complex academic concepts into simple, visual lessons. Managed media post-production, script analysis, and online delivery streams.",
      features: [
        "Instructional UX: Formulated visual layouts for slide decks to maximize learner attention and retention.",
        "Video Editing: Leveraged audio-visual software to produce clean, high-definition video lessons.",
        "Technical Communication: Developed strong presentation skills by explaining complex algorithms and concepts to self-taught students."
      ],
      highlights: [
        "Grew YouTube educational channel reach, demonstrating organic digital audience building.",
        "Refined public communication and technical documentation, leading to a user-centric design outlook.",
        "Authored educational curricula for hundreds of active online learners."
      ],
      link: "https://www.youtube.com/playlist?list=PLIpPiYr5jVxCREeX1pWfh8NVmttdijcmC"
    }
  ];

  // Skills Data
  const skillCategories = [
    {
      title: "Core Technologies",
      icon: <Code className="w-4 h-4" aria-hidden="true" />,
      skills: ["TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "SQL"]
    },
    {
      title: "Frameworks & Libraries",
      icon: <Globe className="w-4 h-4" aria-hidden="true" />,
      skills: ["Next.js (App Router)", "React.js", "React Native", "Expo"]
    },
    {
      title: "Styling & Design Tools",
      icon: <Palette className="w-4 h-4" aria-hidden="true" />,
      skills: ["Tailwind CSS", "CorelDRAW", "Responsive Layouts", "UI/UX Principles"]
    },
    {
      title: "Professional Skills",
      icon: <Sparkles className="w-4 h-4" aria-hidden="true" />,
      skills: ["Self-Directed Learning", "Creative Problem Solving", "Technical Communication", "Git / GitHub Version Control", "Scrum / Agile Teamwork"]
    }
  ];

  // Experience Data
  const experiences = [
    {
      role: "Frontend Developer",
      company: "AUM Group (Akshay Urja Manthan Pvt Ltd)",
      location: "Gurugram, Haryana",
      duration: "Dec 2025 - Present (6 mos)",
      type: "Internship",
      details: [
        "Engineering AUM TASK, a Jira-style task management system. Built mobile authentication, workspace navigation stack, and dashboard filters in React Native.",
        "Developing the platform's Next.js web application utilizing TypeScript to write modular, type-safe API consumers and layout tables.",
        "Integrating Google Calendar API for automated sprint scheduling and calendar syncing.",
        "Collaborating across teams to configure Node.js API endpoints and test pull requests via GitHub."
      ]
    },
    {
      role: "Frontend Developer",
      company: "Aayushi Hygiene and Care Pvt. Ltd.",
      location: "Dwarka, New Delhi",
      duration: "Jan 2025 - Aug 2025 (8 mos)",
      type: "Full-time",
      details: [
        "Created and launched the primary corporate website aayushicare.com from scratch.",
        "Engineered the front-end layout with native HTML5, CSS3, and JavaScript, optimizing code structures for speed and screen-reader accessibility.",
        "Designed vector logos, brand assets, and product graphics using CorelDRAW to establish a professional visual language."
      ]
    },
    {
      role: "Digital Services Specialist (CSC Operator)",
      company: "CSC Center (Khushmeet Documents)",
      location: "Delhi Cantt, New Delhi",
      duration: "Oct 2022 - Jan 2025 (2 yrs 4 mos)",
      type: "Self-Employed",
      details: [
        "Managed daily IT operations, client queries, and service delivery, handling high volumes of requests.",
        "Navigated government portals and database APIs for data-sensitive customer applications, ensuring security and accuracy.",
        "Maintained network routers, operating systems, and computing terminals to achieve zero operational downtime."
      ]
    },
    {
      role: "Educational Content Creator",
      company: "ePaathshaala (YouTube Channel)",
      location: "Delhi Cantt, New Delhi",
      duration: "Jul 2020 - Oct 2022 (2 yrs 4 mos)",
      type: "Freelance",
      details: [
        "Produced and published online educational videos on academic and tech subjects.",
        "Designed visual presentation slides and diagrams, translating complex topics into simplified digital material.",
        "Honed technical writing and clear public speaking skills while communicating with thousands of self-paced learners."
      ]
    }
  ];

  // Education Data
  const educations = [
    {
      degree: "Diploma in Web Designing",
      institution: "Lal Bahadur Shastri Training Institute (LBSTI)",
      location: "Munirka, New Delhi",
      duration: "Feb 2024 - Feb 2025",
      notes: "Completed with First Division. Bridged creative visual layout and programmatic logic, cementing core JavaScript, DOM manipulation, and React engineering skills."
    },
    {
      degree: "Bachelor of Arts",
      institution: "School of Open Learning, Delhi University (DU SOL)",
      location: "New Delhi, India",
      duration: "Aug 2020 - Aug 2023",
      notes: "Completed with First Division. Dedicated personal hours during distance study to master software engineering, algorithms, and frontend technology stacks."
    },
    {
      degree: "Higher Secondary Education (12th Grade)",
      institution: "CBSE Board",
      location: "New Delhi, India",
      duration: "Graduated 2020",
      notes: "Scored 85% with an early concentration in graphic design principles and problem-solving."
    }
  ];

  // Contact Form Validation and Submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }
    if (!formData.subject.trim()) errors.subject = "Subject is required";
    if (!formData.message.trim()) errors.message = "Message is required";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    // Mock API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // Filter projects based on category
  const filteredProjects = projects.filter(proj => {
    if (projectFilter === "all") return true;
    return proj.categories.includes(projectFilter);
  });

  const navLinks = ["About", "Skills", "Experience", "Projects", "Contact"];

  return (
    <div
      className="relative min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--color-paper)", color: "var(--color-ink)", overflowX: "clip" }}
    >

      {/* ═══ NAVIGATION — edge-aligned bar ═══ */}
      <header
        className="sticky top-0 w-full proof"
        style={{
          zIndex: "var(--z-sticky-nav)",
          borderBottom: "var(--rule-hair) solid var(--color-rule)",
          height: "var(--banner-height)"
        }}
      >
        <div className="container flex items-center justify-between h-full">
          {/* Brand */}
          <a
            href="#hero"
            className="flex items-center group"
            aria-label="Rishi, home"
            style={{ textDecoration: "none" }}
          >
            <span
              style={{
                fontFamily: "var(--font-calligraphy)",
                fontSize: "clamp(1.85rem, 2.2vw + 0.8rem, 2.4rem)",
                fontWeight: 400,
                color: "var(--color-ink)",
                lineHeight: 1,
                letterSpacing: "0.01em",
                transition: "color var(--dur-micro) var(--ease-out)"
              }}
            >
              Rishi
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map(section => {
              const id = section.toLowerCase();
              const isActive = activeSection === id;
              return (
                <a
                  key={section}
                  href={`#${id}`}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-sm)",
                    fontWeight: 500,
                    color: isActive ? "var(--color-accent)" : "var(--color-ink-2)",
                    padding: "6px 12px",
                    borderRadius: "2px",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    transition: "color var(--dur-micro) var(--ease-out)"
                  }}
                >
                  {section}
                </a>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                border: "var(--rule-hair) solid var(--color-rule)",
                borderRadius: "2px",
                background: "transparent",
                color: "var(--color-ink-2)",
                cursor: "pointer",
                transition: "background var(--dur-micro) var(--ease-out)"
              }}
              aria-label="Toggle theme"
            >
              {theme === "dark"
                ? <Sun className="w-4 h-4" aria-hidden="true" />
                : <Moon className="w-4 h-4" aria-hidden="true" />
              }
            </button>
            <a href="#contact" className="btn btn--primary" style={{ fontSize: "var(--text-sm)", minHeight: 36 }}>
              Contact Me
            </a>
          </div>

          {/* Mobile controls — with accessible touch targets */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                minWidth: 44,
                minHeight: 44,
                border: "var(--rule-hair) solid var(--color-rule)",
                borderRadius: "2px",
                background: "transparent",
                color: "var(--color-ink-2)",
                cursor: "pointer"
              }}
              aria-label="Toggle theme"
            >
              {theme === "dark"
                ? <Sun className="w-4 h-4" aria-hidden="true" />
                : <Moon className="w-4 h-4" aria-hidden="true" />
              }
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                minWidth: 44,
                minHeight: 44,
                border: "var(--rule-hair) solid var(--color-rule)",
                borderRadius: "2px",
                background: "transparent",
                color: "var(--color-ink)",
                cursor: "pointer"
              }}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden"
            style={{
              borderTop: "var(--rule-hair) solid var(--color-rule)",
              backgroundColor: "var(--color-paper)",
              padding: "var(--space-md) var(--space-md) var(--space-xl)",
              boxShadow: "var(--shadow-sheet)"
            }}
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map(section => {
                const id = section.toLowerCase();
                const isActive = activeSection === id;
                return (
                  <a
                    key={section}
                    href={`#${id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-md)",
                      fontWeight: 500,
                      color: isActive ? "var(--color-accent)" : "var(--color-ink)",
                      padding: "12px 14px",
                      minHeight: 44,
                      display: "flex",
                      alignItems: "center",
                      borderBottom: "var(--rule-hair) solid var(--color-rule)",
                      textDecoration: "none",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {section}
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn btn--primary"
                style={{ marginTop: "var(--space-md)", width: "100%", justifyContent: "center", minHeight: 48 }}
              >
                Hire Me
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* ═══ MAIN CONTENT ═══ */}
      <main className="flex-1 flex flex-col" style={{ gap: "var(--section-gap-l)" }}>

        {/* ─── 1. HERO — Ledge posture: name set huge at the base of the proof field ─── */}
        <section
          id="hero"
          className="proof hero-section"
          style={{
            position: "relative",
            maskImage: "linear-gradient(to bottom, oklch(97.2% 0.006 215), oklch(97.2% 0.006 215) 85%, transparent)"
          }}
        >
          <div className="container">
            {/* Availability status */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--space-xs)",
                marginBottom: "var(--space-md)",
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                fontWeight: 500,
                color: "var(--color-muted)"
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "var(--color-accent)",
                  display: "inline-block",
                  flexShrink: 0
                }}
              />
              Available for Freelancing
            </div>

            {/* Orange construction guide above the headline */}
            <div className="guide guide-draw" style={{ width: "100%", marginBottom: "var(--space-sm)" }} />

            {/* Signature headline: responsive clamp scaling from 2.25rem on phones to 6rem on desktop */}
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--display-weight)",
                fontSize: "clamp(2.25rem, 7vw + 0.5rem, 6rem)",
                letterSpacing: "var(--tracking-display)",
                lineHeight: 1.0,
                color: "var(--color-ink)",
                maxWidth: "none",
                marginBottom: "var(--space-sm)",
                overflowWrap: "break-word",
                wordBreak: "break-word"
              }}
            >
              Crafting Premium<br />
              Web &amp; Mobile<br />
              User Interfaces
            </h1>

            {/* Orange baseline guide */}
            <div className="guide" style={{ width: "100%", marginBottom: "var(--space-xl)" }} />

            {/* Lede + actions: flex column on mobile, row on desktop */}
            <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-16">
              <p
                className="lead"
                style={{ color: "var(--color-ink-2)", maxWidth: "52ch", flex: "1 1 auto" }}
              >
                I am a front-end developer specializing in building beautiful, highly performant cross-platform applications. Leverages React, Next.js, React Native, TypeScript, and Tailwind CSS to ship code faster and refine digital products.
              </p>

              <div
                className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto"
                style={{ minWidth: "fit-content" }}
              >
                <a href="#projects" className="btn btn--primary" style={{ justifyContent: "center" }}>
                  View My Projects
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <a href="#contact" className="btn" style={{ justifyContent: "center" }}>
                  Get In Touch
                </a>
              </div>
            </div>

            {/* Tech stack — index row */}
            <div className="set" style={{ marginTop: "var(--space-2xl)" }}>
              {["Next.js", "React Native", "TypeScript", "Tailwind CSS", "React.js"].map((tech, i) => (
                <div
                  key={tech}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "var(--space-sm) 0",
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-sm)",
                    fontWeight: 500,
                    color: i === 0 ? "var(--color-ink)" : "var(--color-ink-2)"
                  }}
                >
                  <span>{tech}</span>
                  {i === 0 && (
                    <span style={{ color: "var(--color-muted)", fontSize: "var(--text-xs)" }}>primary</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 2. ABOUT — Responsive Split Grid ─── */}
        <section id="about" className="scroll-mt-16">
          <div className="container">
            <div className="split-grid">
              {/* Head block on columns 1–5 (stacks on mobile) */}
              <div className="col-span-head reveal-trigger" style={{ "--i": "0" } as React.CSSProperties}>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "var(--display-weight)",
                    fontSize: "var(--text-section)",
                    letterSpacing: "var(--tracking-display)",
                    color: "var(--color-ink)",
                    maxWidth: "none"
                  }}
                >
                  About Me
                </h2>
                <div className="guide guide-draw" style={{ marginTop: "var(--space-md)", width: "48px" }} />
              </div>

              {/* Body on columns 7–12 (stacks on mobile) */}
              <div className="col-span-body reveal-trigger">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-lg)",
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-md)",
                    lineHeight: 1.65,
                    color: "var(--color-ink-2)"
                  }}
                >
                  <p>
                    My journey into software engineering has been entirely intentional. While completing my Bachelor&apos;s degree via distance learning, I chose to dedicate that flexibility to self-study, immersing myself in frontend layouts, styling models, and JavaScript programming.
                  </p>
                  <p>
                    I formalized this experience through a structured <strong style={{ color: "var(--color-ink)", fontWeight: 500 }}>Diploma in Web Designing</strong> at the Lal Bahadur Shastri Training Institute, graduating with First Division. This bridged the creative UI/UX fundamentals with high-performance JS architectures.
                  </p>
                  <p>
                    Today, I collaborate in teams building scalable products. Most recently, I drive development on the <strong style={{ color: "var(--color-ink)", fontWeight: 500 }}>AUM TASK</strong> corporate platform, implementing secure mobile flows in React Native and performance-optimized pages in Next.js.
                  </p>
                  <p>
                    I leverage modern AI engineering tools like Antigravity to write clean, type-safe code, validate constraints early, and deploy state-of-the-art experiences quickly.
                  </p>
                </div>

                {/* Quick Details card */}
                <div
                  className="crop"
                  style={{
                    marginTop: "var(--space-2xl)",
                    padding: "var(--space-xl)",
                    background: "var(--color-paper-2)",
                    borderRadius: "3px",
                    boxShadow: "var(--shadow-sheet)"
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: "var(--display-weight)",
                      fontSize: "var(--text-title)",
                      letterSpacing: "var(--tracking-display)",
                      color: "var(--color-ink)",
                      marginBottom: "var(--space-lg)"
                    }}
                  >
                    Quick Details
                  </h3>

                  <div className="set" style={{ borderTop: "var(--rule-hair) solid var(--color-rule)" }}>
                    {[
                      { icon: <MapPin className="w-4 h-4" aria-hidden="true" />, label: "Location", value: "Delhi Cantt, New Delhi, India" },
                      {
                        icon: <Mail className="w-4 h-4" aria-hidden="true" />, label: "Email",
                        value: <a href="mailto:rsy81179105@gmail.com" style={{ color: "inherit", textDecorationColor: "var(--color-accent)", wordBreak: "break-all" }}>rsy81179105@gmail.com</a>
                      },
                      {
                        icon: <Phone className="w-4 h-4" aria-hidden="true" />, label: "Phone",
                        value: <a href="tel:+919315283938" style={{ color: "inherit", textDecorationColor: "var(--color-accent)" }}>+91 9315283938</a>
                      },
                      { icon: <GraduationCap className="w-4 h-4" aria-hidden="true" />, label: "Education", value: "Diploma in Web Design & BA" }
                    ].map(item => (
                      <div
                        key={item.label}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "var(--space-md)",
                          padding: "var(--space-md) 0"
                        }}
                      >
                        <span style={{ color: "var(--color-accent)", marginTop: 2, flexShrink: 0 }}>{item.icon}</span>
                        <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                          <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: 500, color: "var(--color-muted)" }}>
                            {item.label}
                          </span>
                          <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: 400, color: "var(--color-ink)" }}>
                            {item.value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Social links: responsive row on tablet, stacked on narrow mobile */}
                  <div
                    className="flex flex-col sm:flex-row gap-3"
                    style={{ marginTop: "var(--space-lg)" }}
                  >
                    <a
                      href="https://linkedin.com/in/rishi2514"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn"
                      style={{ flex: 1, justifyContent: "center", fontSize: "var(--text-sm)" }}
                    >
                      <LinkedInIcon className="w-4 h-4" />
                      LinkedIn
                    </a>
                    <a
                      href="https://github.com/rishi2514"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn"
                      style={{ flex: 1, justifyContent: "center", fontSize: "var(--text-sm)" }}
                    >
                      <GitHubIcon className="w-4 h-4" />
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. SKILLS — Fluid responsive auto-fit grid ─── */}
        <section id="skills" className="scroll-mt-16" style={{ backgroundColor: "var(--color-paper-2)" }}>
          <div
            className="container"
            style={{ paddingTop: "var(--section-gap-s)", paddingBottom: "var(--section-gap-s)" }}
          >
            {/* Head */}
            <div style={{ marginBottom: "var(--space-2xl)" }}>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "var(--display-weight)",
                  fontSize: "var(--text-section)",
                  letterSpacing: "var(--tracking-display)",
                  color: "var(--color-ink)"
                }}
              >
                Skills &amp; Tech Stack
              </h2>
            </div>

            {/* Skills auto-fit grid: min(100%, 260px) guarantees no horizontal overflow on mobile */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
                gap: "var(--gap-columns)"
              }}
            >
              {skillCategories.map((category, idx) => (
                <div
                  key={category.title}
                  className="crop reveal-trigger"
                  style={{ "--i": idx } as React.CSSProperties}
                >
                  <div
                    style={{
                      backgroundColor: "var(--color-paper)",
                      borderRadius: "3px",
                      padding: "var(--space-xl)",
                      boxShadow: "var(--shadow-sheet)",
                      height: "100%"
                    }}
                  >
                    {/* Category header */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--space-sm)",
                        marginBottom: "var(--space-lg)",
                        paddingBottom: "var(--space-md)",
                        borderBottom: "var(--rule-hair) solid var(--color-ink)"
                      }}
                    >
                      <span style={{ color: "var(--color-accent)" }}>{category.icon}</span>
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: "var(--display-weight)",
                          fontSize: "var(--text-title)",
                          letterSpacing: "var(--tracking-display)",
                          color: "var(--color-ink)",
                          lineHeight: 1.2
                        }}
                      >
                        {category.title}
                      </h3>
                    </div>

                    {/* Skills list */}
                    <div className="set" style={{ borderTop: "none" }}>
                      {category.skills.map(skill => (
                        <div
                          key={skill}
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "var(--text-sm)",
                            fontWeight: 400,
                            color: "var(--color-ink-2)",
                            padding: "var(--space-xs) 0"
                          }}
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 4. EXPERIENCE — Responsive split-grid index rows ─── */}
        <section id="experience" className="scroll-mt-16">
          <div className="container">
            {/* Head */}
            <h2
              className="reveal-trigger"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--display-weight)",
                fontSize: "var(--text-section)",
                letterSpacing: "var(--tracking-display)",
                color: "var(--color-ink)",
                marginBottom: "var(--space-2xl)"
              }}
            >
              Work Experience
            </h2>

            {/* Timeline as responsive index rows */}
            <div className="set" style={{ borderTop: "var(--rule-hair) solid var(--color-ink)" }}>
              {experiences.map((exp, idx) => (
                <div
                  key={exp.company}
                  className="split-grid reveal-trigger"
                  style={{
                    "--i": idx,
                    padding: "var(--space-xl) 0"
                  } as React.CSSProperties}
                >
                  {/* Left: role + company */}
                  <div className="col-span-row-left">
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: "var(--display-weight)",
                        fontSize: "var(--text-title)",
                        letterSpacing: "var(--tracking-display)",
                        color: "var(--color-ink)",
                        lineHeight: 1.2,
                        marginBottom: "var(--space-xs)"
                      }}
                    >
                      {exp.role}
                    </h3>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "var(--text-sm)",
                        fontWeight: 500,
                        color: "var(--color-accent)"
                      }}
                    >
                      {exp.company}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "var(--text-sm)",
                        color: "var(--color-muted)",
                        marginTop: "var(--space-2xs)"
                      }}
                    >
                      {exp.location}
                    </div>
                  </div>

                  {/* Right: details */}
                  <div className="col-span-row-right">
                    {/* Duration + type badge */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--space-sm)",
                        marginBottom: "var(--space-md)",
                        fontFamily: "var(--font-body)",
                        fontSize: "var(--text-sm)",
                        color: "var(--color-muted)",
                        flexWrap: "wrap"
                      }}
                    >
                      <span
                        style={{
                          padding: "2px 8px",
                          border: "var(--rule-hair) solid var(--color-rule)",
                          borderRadius: "2px",
                          fontSize: "var(--text-xs)"
                        }}
                      >
                        {exp.type}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                        {exp.duration}
                      </span>
                    </div>

                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: "var(--space-sm)"
                      }}
                    >
                      {exp.details.map((detail, dIdx) => (
                        <li
                          key={dIdx}
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "var(--text-sm)",
                            lineHeight: 1.6,
                            color: "var(--color-ink-2)",
                            paddingLeft: "var(--space-md)",
                            borderLeft: "2px solid var(--color-rule)"
                          }}
                        >
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Education */}
            <div style={{ marginTop: "var(--space-2xl)", paddingTop: "var(--space-2xl)", borderTop: "var(--rule-hair) solid var(--color-rule)" }}>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "var(--display-weight)",
                  fontSize: "clamp(1.5rem, 2vw + 0.5rem, 2.5rem)",
                  letterSpacing: "var(--tracking-display)",
                  color: "var(--color-ink)",
                  marginBottom: "var(--space-xl)",
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-sm)"
                }}
              >
                <GraduationCap className="w-6 h-6" style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                Education
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
                  gap: "var(--gap-columns)"
                }}
              >
                {educations.map((edu) => (
                  <div
                    key={edu.degree}
                    className="crop reveal-trigger"
                    style={{
                      backgroundColor: "var(--color-paper-2)",
                      borderRadius: "3px",
                      padding: "var(--space-xl)",
                      boxShadow: "var(--shadow-sheet)"
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "var(--text-xs)",
                        fontWeight: 500,
                        color: "var(--color-accent)",
                        marginBottom: "var(--space-sm)"
                      }}
                    >
                      {edu.duration}
                    </div>
                    <h4
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: "var(--display-weight)",
                        fontSize: "var(--text-title)",
                        letterSpacing: "var(--tracking-display)",
                        color: "var(--color-ink)",
                        lineHeight: 1.2,
                        marginBottom: "var(--space-xs)"
                      }}
                    >
                      {edu.degree}
                    </h4>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "var(--text-sm)",
                        fontWeight: 500,
                        color: "var(--color-ink-2)",
                        marginBottom: "var(--space-md)"
                      }}
                    >
                      {edu.institution}
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "var(--text-sm)",
                        color: "var(--color-muted)",
                        lineHeight: 1.6,
                        borderTop: "var(--rule-hair) solid var(--color-rule)",
                        paddingTop: "var(--space-md)",
                        margin: 0
                      }}
                    >
                      {edu.notes}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── 5. PROJECTS — Responsive Index & Filters ─── */}
        <section
          id="projects"
          className="scroll-mt-16"
          style={{ backgroundColor: "var(--color-paper-2)", paddingTop: "var(--section-gap-s)", paddingBottom: "var(--section-gap-s)" }}
        >
          <div className="container">
            {/* Head + horizontal scrollable filters */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6" style={{ marginBottom: "var(--space-2xl)" }}>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "var(--display-weight)",
                  fontSize: "var(--text-section)",
                  letterSpacing: "var(--tracking-display)",
                  color: "var(--color-ink)"
                }}
              >
                Featured Projects
              </h2>

              {/* Filter controls — horizontally scrollable if needed on 320px screens */}
              <div
                role="group"
                aria-label="Filter projects"
                className="no-scrollbar"
                style={{
                  display: "flex",
                  gap: "var(--space-xs)",
                  padding: "var(--space-2xs)",
                  backgroundColor: "var(--color-paper)",
                  border: "var(--rule-hair) solid var(--color-rule)",
                  borderRadius: "3px",
                  overflowX: "auto",
                  maxWidth: "100%",
                  WebkitOverflowScrolling: "touch"
                }}
              >
                {(["all", "web", "mobile"] as const).map(filter => (
                  <button
                    key={filter}
                    onClick={() => setProjectFilter(filter)}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-sm)",
                      fontWeight: 500,
                      color: projectFilter === filter ? "var(--color-ink)" : "var(--color-muted)",
                      background: projectFilter === filter ? "var(--color-paper-2)" : "transparent",
                      border: projectFilter === filter ? "var(--rule-hair) solid var(--color-rule)" : "none",
                      borderRadius: "2px",
                      padding: "var(--space-xs) var(--space-md)",
                      cursor: "pointer",
                      transition: "all var(--dur-micro) var(--ease-out)",
                      whiteSpace: "nowrap",
                      minHeight: 36
                    }}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects index — responsive split grid */}
            <div className="set" style={{ borderTop: "var(--rule-hair) solid var(--color-ink)" }}>
              {filteredProjects.map((proj, idx) => (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className="split-grid reveal-trigger"
                  style={{
                    "--i": idx,
                    cursor: "pointer",
                    padding: "var(--space-xl) 0",
                    transition: "background var(--dur-short) var(--ease-out)"
                  } as React.CSSProperties}
                  role="button"
                  tabIndex={0}
                  aria-label={`View details for ${proj.title}`}
                  onKeyDown={e => { if (e.key === "Enter" || e.key === " ") setSelectedProject(proj); }}
                >
                  {/* Category + title */}
                  <div className="col-span-row-left">
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "var(--space-xs)",
                        marginBottom: "var(--space-sm)"
                      }}
                    >
                      {proj.categories.map(cat => (
                        <span
                          key={cat}
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "var(--text-xs)",
                            fontWeight: 500,
                            color: "var(--color-accent)",
                            padding: "2px 8px",
                            border: "var(--rule-hair) solid var(--color-accent)",
                            borderRadius: "2px"
                          }}
                        >
                          {cat === "mobile" ? "Mobile" : cat === "web" ? "Web" : "Design"}
                        </span>
                      ))}
                    </div>

                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: "var(--display-weight)",
                        fontSize: "var(--text-title)",
                        letterSpacing: "var(--tracking-display)",
                        color: "var(--color-ink)",
                        lineHeight: 1.2
                      }}
                    >
                      {proj.title}
                    </h3>
                  </div>

                  {/* Summary + tech + action */}
                  <div
                    className="col-span-row-right"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: "var(--space-md)"
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "var(--text-xs)",
                          color: "var(--color-muted)",
                          marginBottom: "var(--space-xs)",
                          display: "flex",
                          alignItems: "center",
                          gap: 4
                        }}
                      >
                        <Calendar className="w-3 h-3" aria-hidden="true" />
                        {proj.duration}
                      </div>
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "var(--text-sm)",
                          color: "var(--color-ink-2)",
                          lineHeight: 1.6,
                          margin: 0
                        }}
                      >
                        {proj.summary}
                      </p>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "var(--space-sm)" }}>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-xs)" }}>
                        {proj.tech.slice(0, 3).map(t => (
                          <span
                            key={t}
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: "var(--text-xs)",
                              fontWeight: 400,
                              color: "var(--color-muted)",
                              backgroundColor: "var(--color-paper-3)",
                              padding: "2px 8px",
                              borderRadius: "2px"
                            }}
                          >
                            {t}
                          </span>
                        ))}
                        {proj.tech.length > 3 && (
                          <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: "var(--color-muted)" }}>
                            +{proj.tech.length - 3} more
                          </span>
                        )}
                      </div>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "var(--space-xs)",
                          fontFamily: "var(--font-body)",
                          fontSize: "var(--text-sm)",
                          fontWeight: 500,
                          color: "var(--color-accent)"
                        }}
                      >
                        View details
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 6. CONTACT — Responsive Split Layout ─── */}
        <section id="contact" className="scroll-mt-16">
          <div className="container">
            <div className="split-grid">
              {/* Head block */}
              <div className="col-span-head reveal-trigger">
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "var(--display-weight)",
                    fontSize: "var(--text-section)",
                    letterSpacing: "var(--tracking-display)",
                    color: "var(--color-ink)"
                  }}
                >
                  Get In Touch
                </h2>
                <div className="guide guide-draw" style={{ marginTop: "var(--space-md)", width: "48px" }} />

                <div style={{ marginTop: "var(--space-2xl)", display: "flex", flexDirection: "column", gap: "var(--space-xl)" }}>
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: "var(--display-weight)",
                        fontSize: "var(--text-title)",
                        letterSpacing: "var(--tracking-display)",
                        color: "var(--color-ink)",
                        marginBottom: "var(--space-sm)"
                      }}
                    >
                      Let&apos;s discuss your product
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "var(--text-sm)",
                        color: "var(--color-ink-2)",
                        lineHeight: 1.65,
                        margin: 0,
                        maxWidth: "48ch"
                      }}
                    >
                      I am actively seeking Frontend Developer roles and collaborations. Feel free to shoot me an email, give me a call, or connect with me via LinkedIn. I&apos;d love to chat!
                    </p>
                  </div>

                  {/* Contact info */}
                  <div className="set" style={{ borderTop: "var(--rule-hair) solid var(--color-rule)" }}>
                    {[
                      {
                        icon: <Mail className="w-4 h-4" aria-hidden="true" />,
                        label: "Email",
                        value: <a href="mailto:rsy81179105@gmail.com" style={{ color: "inherit", wordBreak: "break-all" }}>rsy81179105@gmail.com</a>
                      },
                      {
                        icon: <Phone className="w-4 h-4" aria-hidden="true" />,
                        label: "Phone",
                        value: <a href="tel:+919315283938" style={{ color: "inherit" }}>+91 9315283938</a>
                      },
                      {
                        icon: <MapPin className="w-4 h-4" aria-hidden="true" />,
                        label: "Address",
                        value: "Jharera Village, Delhi Cantt, New Delhi - 110010"
                      }
                    ].map(item => (
                      <div
                        key={item.label}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "var(--space-md)",
                          padding: "var(--space-md) 0"
                        }}
                      >
                        <span style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: 500, color: "var(--color-muted)" }}>
                            {item.label}
                          </div>
                          <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--color-ink)" }}>
                            {item.value}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Social presence */}
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "var(--text-xs)",
                        fontWeight: 500,
                        color: "var(--color-muted)",
                        marginBottom: "var(--space-md)"
                      }}
                    >
                      Social presence
                    </div>
                    <div style={{ display: "flex", gap: "var(--space-md)" }}>
                      <a
                        href="https://linkedin.com/in/rishi2514"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                        aria-label="LinkedIn profile"
                        style={{ padding: "0 14px", minHeight: 44 }}
                      >
                        <LinkedInIcon className="w-5 h-5" />
                      </a>
                      <a
                        href="https://github.com/rishi2514"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                        aria-label="GitHub profile"
                        style={{ padding: "0 14px", minHeight: 44 }}
                      >
                        <GitHubIcon className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact form */}
              <div className="col-span-body reveal-trigger">
                <div
                  className="crop"
                  style={{
                    backgroundColor: "var(--color-paper-2)",
                    borderRadius: "3px",
                    padding: "var(--space-xl)",
                    boxShadow: "var(--shadow-sheet)"
                  }}
                >
                  <form onSubmit={handleContactSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
                    {/* Name + Email — 2 columns on tablet/desktop, stacked on mobile */}
                    <div className="contact-fields-grid">
                      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
                        <label
                          htmlFor="name"
                          style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--color-ink-2)" }}
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`studio-input${formErrors.name ? " error" : ""}`}
                          placeholder="John Doe"
                          autoComplete="name"
                        />
                        {formErrors.name && (
                          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "var(--text-xs)", fontWeight: 500, color: "var(--color-error)" }}>
                            <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                            {formErrors.name}
                          </span>
                        )}
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
                        <label
                          htmlFor="email"
                          style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--color-ink-2)" }}
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`studio-input${formErrors.email ? " error" : ""}`}
                          placeholder="john@example.com"
                          autoComplete="email"
                        />
                        {formErrors.email && (
                          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "var(--text-xs)", fontWeight: 500, color: "var(--color-error)" }}>
                            <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                            {formErrors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
                      <label
                        htmlFor="subject"
                        style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--color-ink-2)" }}
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className={`studio-input${formErrors.subject ? " error" : ""}`}
                        placeholder="Project Discussion"
                        autoComplete="off"
                      />
                      {formErrors.subject && (
                        <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "var(--text-xs)", fontWeight: 500, color: "var(--color-error)" }}>
                          <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                          {formErrors.subject}
                        </span>
                      )}
                    </div>

                    {/* Message */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
                      <label
                        htmlFor="message"
                        style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--color-ink-2)" }}
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        className={`studio-textarea${formErrors.message ? " error" : ""}`}
                        placeholder="Hi Rishi, I'd like to talk about..."
                      />
                      {formErrors.message && (
                        <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "var(--text-xs)", fontWeight: 500, color: "var(--color-error)" }}>
                          <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                          {formErrors.message}
                        </span>
                      )}
                    </div>

                    {/* Submit button — full width with touch target */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn--primary"
                      style={{
                        width: "100%",
                        justifyContent: "center",
                        minHeight: 48,
                        opacity: isSubmitting ? 0.6 : 1,
                        cursor: isSubmitting ? "not-allowed" : "pointer"
                      }}
                    >
                      {isSubmitting ? "Sending Message..." : (
                        <>
                          Send Message
                          <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </>
                      )}
                    </button>

                    {/* Success state */}
                    {submitSuccess && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "var(--space-xs)",
                          padding: "var(--space-md)",
                          backgroundColor: "color-mix(in oklab, var(--color-success) 8%, transparent)",
                          border: "var(--rule-hair) solid color-mix(in oklab, var(--color-success) 30%, transparent)",
                          borderRadius: "2px",
                          fontFamily: "var(--font-body)",
                          fontSize: "var(--text-sm)",
                          fontWeight: 500,
                          color: "var(--color-success)",
                          textAlign: "center"
                        }}
                      >
                        <CheckCircle className="w-4 h-4" aria-hidden="true" />
                        Message sent successfully! I&apos;ll get back to you shortly. This is a mock form, so no actual message was sent. But I appreciate the thought!
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ═══ FOOTER — colophon block ═══ */}
      <footer
        className="proof"
        style={{
          marginTop: "var(--section-gap-l)",
          borderTop: "var(--rule-hair) solid var(--color-rule)",
          paddingTop: "var(--space-2xl)",
          paddingBottom: "var(--space-2xl)"
        }}
      >
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
            {/* Wordmark */}
            <div>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "var(--display-weight)",
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  letterSpacing: "var(--tracking-display)",
                  color: "var(--color-ink)",
                  display: "block",
                  overflowWrap: "break-word"
                }}
              >
                Rishi Kumar Yadav
              </span>
              <div className="guide" style={{ width: "100%", marginTop: "var(--space-sm)" }} />
            </div>

            {/* Footer links + copyright — responsive stack on mobile */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-xs)",
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-sm)",
                  color: "var(--color-muted)"
                }}
              >
                <span>Built with</span>
                <Heart className="w-3.5 h-3.5" style={{ color: "var(--color-accent)" }} aria-hidden="true" />
                <span>using Next.js &amp; Tailwind CSS v4</span>
              </div>

              <div style={{ display: "flex", gap: "var(--space-lg)", flexWrap: "wrap" }}>
                <a
                  href="https://linkedin.com/in/rishi2514"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-sm)",
                    fontWeight: 400,
                    color: "var(--color-muted)",
                    textDecoration: "none"
                  }}
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/rishi2514"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-sm)",
                    fontWeight: 400,
                    color: "var(--color-muted)",
                    textDecoration: "none"
                  }}
                >
                  GitHub
                </a>
              </div>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-sm)",
                  color: "var(--color-muted)",
                  margin: 0
                }}
              >
                &copy; {new Date().getFullYear()} Rishi Kumar Yadav.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* ═══ PROJECT DETAILS MODAL — Fully responsive drawer on mobile ═══ */}
      {selectedProject && (
        <div
          className="modal-backdrop"
          onClick={e => { if (e.target === e.currentTarget) setSelectedProject(null); }}
          role="dialog"
          aria-modal="true"
          aria-label={`Project details: ${selectedProject.title}`}
        >
          <div className="crop modal-box">
            {/* Close */}
            <button
              onClick={() => setSelectedProject(null)}
              className="btn"
              aria-label="Close modal"
              style={{
                position: "absolute",
                top: "var(--space-md)",
                right: "var(--space-md)",
                minHeight: 40,
                minWidth: 40,
                padding: "0 10px"
              }}
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            {/* Category badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-xs)", marginBottom: "var(--space-md)", paddingRight: "var(--space-2xl)" }}>
              {selectedProject.categories.map(cat => (
                <span
                  key={cat}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-xs)",
                    fontWeight: 500,
                    color: "var(--color-accent)",
                    padding: "2px 8px",
                    border: "var(--rule-hair) solid var(--color-accent)",
                    borderRadius: "2px"
                  }}
                >
                  {cat === "mobile" ? "Mobile Application" : cat === "web" ? "Web Application" : "Design / Multimedia"}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: "var(--display-weight)",
                fontSize: "clamp(1.5rem, 3.5vw + 0.5rem, 2.75rem)",
                letterSpacing: "var(--tracking-display)",
                color: "var(--color-ink)",
                lineHeight: 1.1,
                marginBottom: "var(--space-sm)",
                paddingRight: "var(--space-xl)",
                overflowWrap: "break-word"
              }}
            >
              {selectedProject.title}
            </h3>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "var(--space-sm)",
                marginBottom: "var(--space-lg)",
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                color: "var(--color-muted)"
              }}
            >
              <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>{selectedProject.role}</span>
              <span>·</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                {selectedProject.duration}
              </span>
            </div>

            <div className="guide" style={{ marginBottom: "var(--space-xl)" }} />

            {/* Body: 2 columns on desktop, responsive stack on mobile */}
            <div className="modal-content-grid">
              {/* Main content */}
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xl)" }}>
                <div>
                  <h4
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: "var(--display-weight)",
                      fontSize: "var(--text-title)",
                      letterSpacing: "var(--tracking-display)",
                      color: "var(--color-ink)",
                      marginBottom: "var(--space-md)"
                    }}
                  >
                    Project Overview
                  </h4>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-sm)",
                      color: "var(--color-ink-2)",
                      lineHeight: 1.65,
                      margin: 0
                    }}
                  >
                    {selectedProject.description}
                  </p>
                </div>

                <div>
                  <h4
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: "var(--display-weight)",
                      fontSize: "var(--text-title)",
                      letterSpacing: "var(--tracking-display)",
                      color: "var(--color-ink)",
                      marginBottom: "var(--space-md)"
                    }}
                  >
                    Key Features Developed
                  </h4>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "var(--space-sm)"
                    }}
                  >
                    {selectedProject.features.map((feature, fIdx) => (
                      <li
                        key={fIdx}
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "var(--text-sm)",
                          color: "var(--color-ink-2)",
                          lineHeight: 1.6,
                          paddingLeft: "var(--space-md)",
                          borderLeft: "2px solid var(--color-rule)"
                        }}
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: "var(--display-weight)",
                      fontSize: "var(--text-title)",
                      letterSpacing: "var(--tracking-display)",
                      color: "var(--color-ink)",
                      marginBottom: "var(--space-md)"
                    }}
                  >
                    Milestones &amp; Impact
                  </h4>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "var(--space-sm)"
                    }}
                  >
                    {selectedProject.highlights.map((highlight, hIdx) => (
                      <li
                        key={hIdx}
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "var(--text-sm)",
                          color: "var(--color-ink)",
                          lineHeight: 1.6,
                          paddingLeft: "var(--space-md)",
                          borderLeft: "2px solid var(--color-accent)"
                        }}
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar specifications */}
              <div
                style={{
                  backgroundColor: "var(--color-paper-2)",
                  borderRadius: "3px",
                  padding: "var(--space-lg)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-md)"
                }}
              >
                <h4
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: "var(--display-weight)",
                    fontSize: "var(--text-title)",
                    letterSpacing: "var(--tracking-display)",
                    color: "var(--color-ink)",
                    borderBottom: "var(--rule-hair) solid var(--color-ink)",
                    paddingBottom: "var(--space-sm)"
                  }}
                >
                  Specifications
                </h4>

                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
                  <div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: 500, color: "var(--color-muted)", marginBottom: 4 }}>
                      Framework
                    </div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--color-ink)" }}>
                      {selectedProject.categories.includes("mobile") && selectedProject.categories.includes("web")
                        ? "React Native & Next.js"
                        : selectedProject.categories.includes("mobile")
                          ? "React Native (Expo)"
                          : selectedProject.categories.includes("web")
                            ? "Next.js (React)"
                            : "Adobe / Multimedia"}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: 500, color: "var(--color-muted)", marginBottom: "var(--space-xs)" }}>
                      Technologies
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2xs)" }}>
                      {selectedProject.tech.map(t => (
                        <span
                          key={t}
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "var(--text-xs)",
                            fontWeight: 400,
                            color: "var(--color-ink-2)",
                            backgroundColor: "var(--color-paper-3)",
                            padding: "2px 8px",
                            borderRadius: "2px"
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "var(--space-sm)",
                      paddingTop: "var(--space-md)",
                      borderTop: "var(--rule-hair) solid var(--color-rule)"
                    }}
                  >
                    {selectedProject.link && (
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--primary"
                        style={{ width: "100%", justifyContent: "center", minHeight: 44 }}
                      >
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                        Visit Project
                      </a>
                    )}
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                        style={{ width: "100%", justifyContent: "center", minHeight: 44 }}
                      >
                        <GitHubIcon className="w-4 h-4" />
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
