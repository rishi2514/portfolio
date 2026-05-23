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
  <svg className={`${className} fill-current`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const LinkedInIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764.784 1.764 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
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
    
    // Intersection Observer to update active navigation section on scroll
    const sections = ["hero", "about", "skills", "experience", "projects", "contact"];
    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.25, rootMargin: "-10% 0px -40% 0px" }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach(obs => {
        if (obs) {
          obs.observer.unobserve(obs.el);
          obs.observer.disconnect();
        }
      });
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
      icon: <Code className="w-5 h-5 text-indigo-500" />,
      skills: ["TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "SQL"]
    },
    {
      title: "Frameworks & Libraries",
      icon: <Globe className="w-5 h-5 text-purple-500" />,
      skills: ["Next.js (App Router)", "React.js", "React Native", "Expo"]
    },
    {
      title: "Styling & Design Tools",
      icon: <Palette className="w-5 h-5 text-pink-500" />,
      skills: ["Tailwind CSS", "CorelDRAW", "Responsive Layouts", "UI/UX Principles"]
    },
    {
      title: "Professional Skills",
      icon: <Sparkles className="w-5 h-5 text-emerald-500" />,
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

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden font-sans selection:bg-indigo-500/30">
      
      {/* Floating Background Blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-75 h-75 sm:w-125 sm:h-125 rounded-full bg-indigo-500/10 blur-[80px] sm:blur-[120px] dark:bg-indigo-900/10 animate-float" />
        <div className="absolute top-[40%] right-[-10%] w-62.5 h-62.5 sm:w-112.5 sm:h-112.5 rounded-full bg-purple-500/10 blur-[80px] sm:blur-[120px] dark:bg-purple-900/10 animate-float-delayed" />
  <div className="absolute bottom-[10%] left-[20%] w-75 h-75 sm:w-125 sm:h-125 rounded-full bg-pink-500/5 blur-[80px] sm:blur-[120px] dark:bg-pink-900/5 animate-float-slow" />
      </div>

      {/* STICKY GLASSMORPHIC NAVBAR */}
      <header className="sticky top-0 z-40 w-full glass transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Brand/Logo */}
          <a href="#hero" className="flex items-center gap-2 group">
            <span className="h-10 w-10 rounded-xl bg-linear-to-tr from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform duration-300">
              RY
            </span>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-base tracking-tight bg-clip-text text-transparent bg-linear-to-r from-zinc-900 to-zinc-700 dark:from-zinc-50 dark:to-zinc-300 group-hover:text-indigo-500 transition-colors">
                Rishi Kumar Yadav
              </span>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-semibold tracking-wider uppercase leading-none">
                Frontend Developer
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            {["About", "Skills", "Experience", "Projects", "Contact"].map((section) => {
              const id = section.toLowerCase();
              const isActive = activeSection === id;
              return (
                <a
                  key={section}
                  href={`#${id}`}
                  className={`px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 ${
                    isActive 
                      ? "text-indigo-600 bg-indigo-500/10 dark:text-indigo-400 dark:bg-indigo-500/5" 
                      : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-500/5"
                  }`}
                >
                  {section}
                </a>
              );
            })}
          </nav>

          {/* Action Buttons: Theme Toggle & Resume download */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-300 focus:outline-none shadow-sm hover:scale-105"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 font-semibold text-sm hover:bg-zinc-800 dark:hover:bg-zinc-200 hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-1"
            >
              Contact Me
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Navigation controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-300 focus:outline-none shadow-sm"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-300 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {isMobileMenuOpen && (
          <div className="md:hidden w-full border-t border-zinc-200 dark:border-zinc-800 bg-background/95 backdrop-blur-lg px-4 py-6 flex flex-col gap-3 shadow-xl">
            {["About", "Skills", "Experience", "Projects", "Contact"].map((section) => {
              const id = section.toLowerCase();
              const isActive = activeSection === id;
              return (
                <a
                  key={section}
                  href={`#${id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-semibold tracking-wide transition-all ${
                    isActive 
                      ? "text-indigo-600 bg-indigo-500/10 dark:text-indigo-400 dark:bg-indigo-500/5" 
                      : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  }`}
                >
                  {section}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 w-full py-3 text-center rounded-xl bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-md flex items-center justify-center gap-1"
            >
              Hire Me
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 py-4 sm:py-8 flex flex-col gap-24 sm:gap-36">
        
        {/* 1. HERO SECTION */}
        <section id="hero" className="min-h-[70vh] sm:min-h-[80vh] flex flex-col justify-center py-8 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            
            {/* Slogan and details */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex self-center lg:self-start items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold text-xs sm:text-sm tracking-wider uppercase animate-pulse">
                <Sparkles className="w-3.5 h-3.5" />
                Available for Freelanceing
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight sm:leading-none text-zinc-900 dark:text-zinc-50">
                Crafting Premium <br className="hidden sm:inline" />
                <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                  Web & Mobile
                </span> <br className="hidden lg:inline" />
                User Interfaces
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg lg:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                I am a front-end developer specializing in building beautiful, highly performant cross-platform applications. Leverages React, Next.js, React Native, TypeScript, and Tailwind CSS to ship code faster and refine digital products.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-2">
                <a
                  href="#projects"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 text-white font-bold text-base hover:opacity-95 hover:shadow-xl shadow-indigo-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  View My Projects
                  <ArrowRight className="w-4 h-4" />
                </a>
                
                <a
                  href="#contact"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-bold text-base transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-sm"
                >
                  Get In Touch
                </a>
              </div>

              {/* Tech Stack quick badges */}
              <div className="flex flex-col gap-2 mt-4 text-zinc-500 dark:text-zinc-400">
                <span className="text-xs uppercase font-extrabold tracking-wider">Primary Tech Stack</span>
                <div className="flex flex-wrap justify-center lg:justify-start gap-2.5">
                  {["Next.js", "React Native", "TypeScript", "Tailwind CSS", "React.js"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3.5 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Profile visual banner */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative w-72 h-72 sm:w-96 sm:h-96">
                
                {/* Decorative glowing gradient borders */}
                <div className="absolute inset-0 rounded-3xl bg-linear-to-tr from-indigo-500 via-purple-500 to-pink-500 opacity-20 dark:opacity-30 blur-[20px] animate-pulse-glow" />
                
                <div className="absolute inset-2 rounded-3xl bg-linear-to-br from-indigo-600 to-purple-600 p-0.5 shadow-2xl">
                  <div className="w-full h-full rounded-[22px] bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
                    
                    {/* Floating elements inside visual frame */}
                    <div className="h-20 w-20 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/5 flex items-center justify-center mb-6">
                      <Code className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    
                    <h3 className="font-extrabold text-xl sm:text-2xl text-zinc-800 dark:text-zinc-100 leading-snug">
                      Rishi Kumar Yadav
                    </h3>
                    
                    <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mt-1 uppercase tracking-wider">
                      Frontend Developer
                    </p>
                    
                    <div className="w-16 h-1 bg-linear-to-r from-indigo-600 to-purple-600 rounded-full my-4" />
                    
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                      &ldquo;I bridge the gap between creative visual layouts and scalable type-safe code execution.&rdquo;
                    </p>

                    <div className="flex gap-4 mt-6">
                      <a href="https://linkedin.com/in/rishi2514" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all">
                        <LinkedInIcon className="w-5 h-5" />
                      </a>
                      <a href="https://github.com/rishi2514" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all">
                        <GitHubIcon className="w-5 h-5" />
                      </a>
                      <a href="mailto:rsy81179105@gmail.com" className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all">
                        <Mail className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. ABOUT ME SECTION */}
        <section id="about" className="scroll-mt-24">
          <div className="flex flex-col gap-12">
            
            {/* Title block */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                About Me
              </h2>
              <div className="h-1.5 w-16 bg-indigo-600 dark:bg-indigo-400 rounded-full mt-3 mx-auto md:mx-0" />
            </div>

            {/* Description layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              <div className="md:col-span-7 flex flex-col gap-6 font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm sm:text-base">
                <p>
                  My journey into software engineering has been entirely intentional. While completing my Bachelor&apos;s degree via distance learning, I chose to dedicate that flexibility to self-study, immersing myself in frontend layouts, styling models, and JavaScript programming.
                </p>
                <p>
                  I formalized this experience through a structured <span className="text-zinc-900 dark:text-zinc-50 font-bold">Diploma in Web Designing</span> at the Lal Bahadur Shastri Training Institute, graduating with First Division. This bridged the creative UI/UX fundamentals with high-performance JS architectures.
                </p>
                <p>
                  Today, I collaborate in teams building scalable products. Most recently, I drive development on the <span className="text-zinc-900 dark:text-zinc-50 font-bold">AUM TASK</span> corporate platform, implementing secure mobile flows in React Native and performance-optimized pages in Next.js.
                </p>
                <p>
                  I leverage modern AI engineering tools like Antigravity to write clean, type-safe code, validate constraints early, and deploy state-of-the-art experiences quickly.
                </p>
              </div>

              {/* Information Sidebar */}
              <div className="md:col-span-5 glass rounded-2xl p-6 sm:p-8 flex flex-col gap-6">
                <h3 className="font-extrabold text-lg sm:text-xl text-zinc-900 dark:text-zinc-50">
                  Quick Details
                </h3>
                
                <div className="flex flex-col gap-4">
                  
                  <div className="flex items-center gap-3.5 text-zinc-600 dark:text-zinc-400">
                    <div className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-900">
                      <MapPin className="w-4 h-4 text-indigo-500" />
                    </div>
                    <div className="flex flex-col text-xs sm:text-sm">
                      <span className="font-bold text-zinc-950 dark:text-zinc-50">Location</span>
                      <span>Delhi Cantt, New Delhi, India</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 text-zinc-600 dark:text-zinc-400">
                    <div className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-900">
                      <Mail className="w-4 h-4 text-indigo-500" />
                    </div>
                    <div className="flex flex-col text-xs sm:text-sm">
                      <span className="font-bold text-zinc-950 dark:text-zinc-50">Email</span>
                      <a href="mailto:rsy81179105@gmail.com" className="hover:text-indigo-500 hover:underline">rsy81179105@gmail.com</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 text-zinc-600 dark:text-zinc-400">
                    <div className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-900">
                      <Phone className="w-4 h-4 text-indigo-500" />
                    </div>
                    <div className="flex flex-col text-xs sm:text-sm">
                      <span className="font-bold text-zinc-950 dark:text-zinc-50">Phone</span>
                      <a href="tel:+919315283938" className="hover:text-indigo-500 hover:underline">+91 9315283938</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 text-zinc-600 dark:text-zinc-400">
                    <div className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-900">
                      <GraduationCap className="w-4 h-4 text-indigo-500" />
                    </div>
                    <div className="flex flex-col text-xs sm:text-sm">
                      <span className="font-bold text-zinc-950 dark:text-zinc-50">Education</span>
                      <span>Diploma in Web Design & BA</span>
                    </div>
                  </div>

                </div>

                <hr className="border-zinc-200 dark:border-zinc-800" />

                <div className="flex justify-center gap-3.5">
                  <a
                    href="https://linkedin.com/in/rishi2514"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 text-center rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 font-bold text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 transition-all flex items-center justify-center gap-1.5"
                  >
                    <LinkedInIcon className="w-4 h-4" />
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/rishi2514"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 text-center rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 font-bold text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 transition-all flex items-center justify-center gap-1.5"
                  >
                    <GitHubIcon className="w-4 h-4" />
                    GitHub
                  </a>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 3. SKILLS SECTION */}
        <section id="skills" className="scroll-mt-24">
          <div className="flex flex-col gap-12">
            
            {/* Title */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                Skills & Tech Stack
              </h2>
              <div className="h-1.5 w-16 bg-indigo-600 dark:bg-indigo-400 rounded-full mt-3 mx-auto md:mx-0" />
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {skillCategories.map((category) => (
                <div key={category.title} className="glass rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-sm hover:shadow-md transition-all hover:scale-[1.01]">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900">
                      {category.icon}
                    </div>
                    <h3 className="font-extrabold text-lg sm:text-xl text-zinc-800 dark:text-zinc-100">
                      {category.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/80 text-sm font-bold text-zinc-800 dark:text-zinc-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 4. EXPERIENCE SECTION */}
        <section id="experience" className="scroll-mt-24">
          <div className="flex flex-col gap-12">
            
            {/* Title */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                Work Experience
              </h2>
              <div className="h-1.5 w-16 bg-indigo-600 dark:bg-indigo-400 rounded-full mt-3 mx-auto md:mx-0" />
            </div>

            {/* Timeline */}
            <div className="relative border-l-2 border-zinc-200 dark:border-zinc-800 pl-6 sm:pl-10 ml-3 sm:ml-6 flex flex-col gap-12 sm:gap-16">
              {experiences.map((exp) => (
                <div key={exp.company} className="relative group">
                  
                  {/* Timeline dot */}
                  <span className="absolute -left-8.75 sm:-left-12.75 top-1.5 h-6 w-6 rounded-full border-4 border-background bg-indigo-600 dark:bg-indigo-400 flex items-center justify-center shadow group-hover:scale-110 transition-transform" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4">
                    <div className="flex flex-col">
                      <h3 className="font-extrabold text-lg sm:text-xl text-zinc-900 dark:text-zinc-50">
                        {exp.role}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1 text-sm font-bold text-indigo-600 dark:text-indigo-400">
                        <span>{exp.company}</span>
                        <span className="h-1 w-1 rounded-full bg-zinc-400" />
                        <span className="text-zinc-500 dark:text-zinc-400">{exp.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-zinc-500 dark:text-zinc-400">
                      <span className="px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 uppercase">
                        {exp.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.duration}
                      </span>
                    </div>
                  </div>

                  <ul className="list-disc pl-5 text-sm sm:text-base font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed flex flex-col gap-3.5">
                    {exp.details.map((detail, dIdx) => (
                      <li key={dIdx} className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Education timeline cards */}
            <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <h3 className="font-extrabold text-xl sm:text-2xl text-zinc-900 dark:text-zinc-50 mb-8 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-indigo-500" />
                Education
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {educations.map((edu) => (
                  <div key={edu.degree} className="glass rounded-2xl p-6 sm:p-8 flex flex-col  gap-6">
                    <div className="flex flex-col gap-2">
                      <div className="text-xs font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
                        {edu.duration}
                      </div>
                      
                      <h4 className="font-extrabold text-base sm:text-lg text-zinc-900 dark:text-zinc-50 leading-snug">
                        {edu.degree}
                      </h4>
                      
                      <div className="text-sm font-bold text-zinc-500 dark:text-zinc-400 leading-tight">
                        {edu.institution}
                      </div>
                    </div>
                    
                    <p className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed pt-2 border-t border-zinc-200/60 dark:border-zinc-800/80">
                      {edu.notes}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* 5. PROJECTS SECTION */}
        <section id="projects" className="scroll-mt-24">
          <div className="flex flex-col gap-12">
            
            {/* Title & Filters */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                  Featured Projects
                </h2>
                <div className="h-1.5 w-16 bg-indigo-600 dark:bg-indigo-400 rounded-full mt-3 mx-auto md:mx-0" />
              </div>

              {/* Filtering Controls */}
              <div className="flex justify-center gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 self-center md:self-auto border border-zinc-200/50 dark:border-zinc-800/50">
                {(["all", "web", "mobile"] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setProjectFilter(filter)}
                    className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold tracking-wide uppercase transition-all duration-300 ${
                      projectFilter === filter
                        ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm"
                        : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className="group cursor-pointer flex flex-col justify-between rounded-2xl glass p-6 sm:p-8 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 dark:hover:shadow-indigo-900/10 border-zinc-200/70 dark:border-zinc-800/60 transition-all duration-300"
                >
                  <div className="flex flex-col gap-4">
                    
                    {/* Category Label and Icon */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {proj.categories.map((cat) => (
                          <span key={cat} className="text-[10px] sm:text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase bg-indigo-500/10 dark:bg-indigo-500/5 px-2.5 py-1 rounded">
                            {cat === "mobile" ? "Mobile Client" : cat === "web" ? "Web App" : "Design / Brand"}
                          </span>
                        ))}
                      </div>
                      
                      <div className="p-2 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 group-hover:text-indigo-500 transition-colors flex gap-1">
                        {proj.categories.includes("mobile") && <Smartphone className="w-4 h-4" />}
                        {proj.categories.includes("web") && <Globe className="w-4 h-4" />}
                        {proj.categories.includes("design") && <Palette className="w-4 h-4" />}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <h3 className="font-extrabold text-base sm:text-lg text-zinc-900 dark:text-zinc-50 leading-snug group-hover:text-indigo-500 transition-colors">
                        {proj.title}
                      </h3>
                      <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">{proj.duration}</span>
                    </div>

                    <p className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3">
                      {proj.summary}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 mt-6">
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tech.slice(0, 3).map((t) => (
                        <span key={t} className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded">
                          {t}
                        </span>
                      ))}
                      {proj.tech.length > 3 && (
                        <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 px-2 py-1 rounded">
                          +{proj.tech.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                      View Details
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 6. CONTACT SECTION */}
        <section id="contact" className="scroll-mt-24">
          <div className="flex flex-col gap-12">
            
            {/* Title */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                Get In Touch
              </h2>
              <div className="h-1.5 w-16 bg-indigo-600 dark:bg-indigo-400 rounded-full mt-3 mx-auto md:mx-0" />
            </div>

            {/* Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Contact information details */}
              <div className="lg:col-span-5 flex flex-col gap-8">
                
                <div className="flex flex-col gap-4">
                  <h3 className="font-extrabold text-xl sm:text-2xl text-zinc-900 dark:text-zinc-50">
                    Let&apos;s discuss your product
                  </h3>
                  
                  <p className="text-sm sm:text-base font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    I am actively seeking Frontend Developer roles and collaborations. Feel free to shoot me an email, give me a call, or connect with me via LinkedIn. I&apos;d love to chat!
                  </p>
                </div>

                <div className="flex flex-col gap-6">
                  
                  <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-400">
                    <div className="p-3.5 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/5 text-indigo-600 dark:text-indigo-400 shadow-sm">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col text-xs sm:text-sm">
                      <span className="font-extrabold text-zinc-950 dark:text-zinc-50">Email</span>
                      <a href="mailto:rsy81179105@gmail.com" className="hover:text-indigo-500 hover:underline">rsy81179105@gmail.com</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-400">
                    <div className="p-3.5 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/5 text-indigo-600 dark:text-indigo-400 shadow-sm">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col text-xs sm:text-sm">
                      <span className="font-extrabold text-zinc-950 dark:text-zinc-50">Phone</span>
                      <a href="tel:+919315283938" className="hover:text-indigo-500 hover:underline">+91 9315283938</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-400">
                    <div className="p-3.5 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/5 text-indigo-600 dark:text-indigo-400 shadow-sm">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col text-xs sm:text-sm">
                      <span className="font-extrabold text-zinc-950 dark:text-zinc-50">Address</span>
                      <span>Jharera Village, Delhi Cantt, New Delhi - 110010</span>
                    </div>
                  </div>

                </div>

                <hr className="border-zinc-200 dark:border-zinc-800" />

                {/* Social presence */}
                <div className="flex flex-col gap-3">
                  <span className="text-xs uppercase font-extrabold text-zinc-400 tracking-wider">Social Presence</span>
                  <div className="flex gap-4">
                    <a
                      href="https://linkedin.com/in/rishi2514"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all shadow-sm"
                    >
                      <LinkedInIcon className="w-5 h-5" />
                    </a>
                    
                    <a
                      href="https://github.com/rishi2514"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all shadow-sm"
                    >
                      <GitHubIcon className="w-5 h-5" />
                    </a>
                  </div>
                </div>

              </div>

              {/* Interactive Contact Form */}
              <div className="lg:col-span-7 glass rounded-2xl p-6 sm:p-8">
                <form onSubmit={handleContactSubmit} className="flex flex-col gap-5">
                  
                  {/* Name and Email inputs side-by-side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`px-4 py-3 rounded-xl border ${
                          formErrors.name ? "border-red-500 bg-red-500/5" : "border-zinc-200 dark:border-zinc-800"
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500/30 text-sm bg-transparent`}
                        placeholder="John Doe"
                      />
                      {formErrors.name && (
                        <span className="text-xs text-red-500 font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {formErrors.name}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`px-4 py-3 rounded-xl border ${
                          formErrors.email ? "border-red-500 bg-red-500/5" : "border-zinc-200 dark:border-zinc-800"
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500/30 text-sm bg-transparent`}
                        placeholder="john@example.com"
                      />
                      {formErrors.email && (
                        <span className="text-xs text-red-500 font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {formErrors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Subject input */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="subject" className="text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`px-4 py-3 rounded-xl border ${
                        formErrors.subject ? "border-red-500 bg-red-500/5" : "border-zinc-200 dark:border-zinc-800"
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500/30 text-sm bg-transparent`}
                      placeholder="Project Discussion"
                    />
                    {formErrors.subject && (
                      <span className="text-xs text-red-500 font-semibold flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {formErrors.subject}
                      </span>
                    )}
                  </div>

                  {/* Message input */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`px-4 py-3 rounded-xl border ${
                        formErrors.message ? "border-red-500 bg-red-500/5" : "border-zinc-200 dark:border-zinc-800"
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500/30 text-sm bg-transparent resize-none`}
                      placeholder="Hi Rishi, I'd like to talk about..."
                    />
                    {formErrors.message && (
                      <span className="text-xs text-red-500 font-semibold flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {formErrors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 w-full py-4 text-center rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.01] hover:shadow-lg disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      "Sending Message..."
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* Success State */}
                  {submitSuccess && (
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-sm text-center flex items-center justify-center gap-2 animate-pulse">
                      <CheckCircle className="w-4 h-4" />
                      Message sent successfully! I&apos;ll get back to you shortly. This is a mock form, so no actual message was sent. But I appreciate the thought!
                    </div>
                  )}

                </form>
              </div>

            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="mt-24 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-950/20 py-8 text-center text-xs sm:text-sm font-semibold text-zinc-500 dark:text-zinc-400 z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} Rishi Kumar Yadav. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span>using Next.js & Tailwind CSS v4</span>
          </div>

          <div className="flex gap-4">
            <a href="https://linkedin.com/in/rishi2514" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500">LinkedIn</a>
            <a href="https://github.com/rishi2514" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500">GitHub</a>
          </div>
        </div>
      </footer>

      {/* PROJECT DETAILS MODAL / DRAWER */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-4xl rounded-2xl glass p-6 sm:p-8 flex flex-col gap-6 max-h-[90vh] overflow-y-auto shadow-2xl border-zinc-200 dark:border-zinc-800 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="flex flex-col gap-1.5 pr-10">
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.categories.map((cat) => (
                  <span key={cat} className="text-[10px] sm:text-xs font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase bg-indigo-500/10 dark:bg-indigo-500/5 px-2.5 py-1 rounded self-start">
                    {cat === "mobile" ? "Mobile Application" : cat === "web" ? "Web Application" : "Design / Multimedia"}
                  </span>
                ))}
              </div>
              
              <h3 className="font-extrabold text-xl sm:text-3xl text-zinc-900 dark:text-zinc-50 mt-1 leading-snug">
                {selectedProject.title}
              </h3>

              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-2 text-xs sm:text-sm font-bold text-zinc-500">
                <span className="text-indigo-600 dark:text-indigo-400">{selectedProject.role}</span>
                <span className="h-1 w-1 rounded-full bg-zinc-400" />
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {selectedProject.duration}
                </span>
              </div>
            </div>

            <hr className="border-zinc-200 dark:border-zinc-800" />

            {/* Modal Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Main descriptions and features */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                
                <div className="flex flex-col gap-2">
                  <h4 className="font-extrabold text-base sm:text-lg text-zinc-900 dark:text-zinc-50">
                    Project Overview
                  </h4>
                  <p className="text-sm sm:text-base font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <h4 className="font-extrabold text-base sm:text-lg text-zinc-900 dark:text-zinc-50">
                    Key Features Developed
                  </h4>
                  
                  <ul className="list-disc pl-5 text-sm sm:text-base font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed flex flex-col gap-2.5">
                    {selectedProject.features.map((feature, fIdx) => (
                      <li key={fIdx}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-3">
                  <h4 className="font-extrabold text-base sm:text-lg text-zinc-900 dark:text-zinc-50">
                    Milestones & Impact
                  </h4>
                  
                  <ul className="list-disc pl-5 text-sm sm:text-base font-medium text-zinc-600 dark:text-zinc-400 leading-relaxed flex flex-col gap-2.5">
                    {selectedProject.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="text-zinc-900 dark:text-zinc-100">{highlight}</li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Sidebar specifications */}
              <div className="lg:col-span-4 flex flex-col gap-6 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/80">
                <h4 className="font-extrabold text-base text-zinc-900 dark:text-zinc-50">
                  Specifications
                </h4>

                <div className="flex flex-col gap-4 text-xs sm:text-sm">
                  
                  <div className="flex flex-col gap-1">
                    <span className="font-extrabold text-zinc-400 uppercase tracking-wider text-[10px]">Framework / Engine</span>
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">
                      {selectedProject.categories.includes("mobile") && selectedProject.categories.includes("web")
                        ? "React Native & Next.js"
                        : selectedProject.categories.includes("mobile")
                        ? "React Native (Expo)"
                        : selectedProject.categories.includes("web")
                        ? "Next.js (React)"
                        : "Adobe / Multimedia"}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-extrabold text-zinc-400 uppercase tracking-wider text-[10px]">Technologies Used</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {selectedProject.tech.map((t) => (
                        <span key={t} className="text-[10px] font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-200/50 dark:bg-zinc-800/50 px-2 py-1 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex flex-col gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                    {selectedProject.link && (
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 font-bold text-center hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all flex items-center justify-center gap-1.5"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Visit Project
                      </a>
                    )}
                    
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold text-center hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all flex items-center justify-center gap-1.5"
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
