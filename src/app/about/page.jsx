"use client";

import { useRef } from "react";
import ReactLenis from "lenis/react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  FaBuilding,
  FaGraduationCap,
  FaAward,
  FaCode,
  FaBrain,
  FaChartBar,
  FaCogs,
  FaHandshake,
  FaEnvelope,
  FaLinkedin,
  FaGlobe,
  FaMapMarkerAlt
} from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import dynamic from "next/dynamic";
import Nav from "../../_component/Nav/Nav";

const ExplosionContainer = dynamic(() => import("../../_component/ExplosionContainer"), {
  ssr: false,
});

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Fade in hero elements
      gsap.from(".hero-title", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      gsap.from(".hero-tagline", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
        ease: "power4.out",
      });

      gsap.from(".hero-meta", {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: "power4.out",
      });

      // Scroll Triggered Fades for sections
      const sections = gsap.utils.toArray(".about-section");
      sections.forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      });

      // Timeline items animations
      const timelineItems = gsap.utils.toArray(".timeline-item");
      timelineItems.forEach((item) => {
        gsap.from(item.querySelector(".timeline-content"), {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
          x: -30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });

        gsap.from(item.querySelector(".timeline-dot"), {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
          scale: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
        });
      });

      // Cards animations
      const gridCards = gsap.utils.toArray(".grid-card");
      gridCards.forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  });

  const skills = [
    {
      category: "Analytics",
      icon: <FaChartBar className="text-orange-500 text-xl" />,
      items: ["GA4", "Google Tag Manager", "Amadeus Data Feed", "DAPI/AIDL API"]
    },
    {
      category: "Product Management",
      icon: <FaHandshake className="text-orange-500 text-xl" />,
      items: ["Roadmap Planning", "Backlog Grooming", "User Stories", "Sprint Facilitation", "UAT"]
    },
    {
      category: "AI & Workflows",
      icon: <FaBrain className="text-orange-500 text-xl" />,
      items: ["LLM Use Case Scoping", "Personalization", "AI Workflow Tooling", "JavaScript / N8N / Dify"]
    },
    {
      category: "Design & Research",
      icon: <FaCogs className="text-orange-500 text-xl" />,
      items: ["Figma", "UX Research", "Competitor Analysis", "Usability Testing"]
    },
    {
      category: "Technical",
      icon: <FaCode className="text-orange-500 text-xl" />,
      items: ["JavaScript", "React JS", "Next.js", "HTML5 / CSS3", "REST APIs"]
    }
  ];

  const experiences = [
    {
      company: "Garuda Indonesia",
      role: "IT Business Alignment",
      period: "Nov 2023 - Present",
      points: [
        "Served as Commercial IT Business Alignment to coordinate commercial technical and business aspects (Amadeus, payment aggregators, loyalty systems, and external parties).",
        "Analyzed technical feasibility for API integration, data flow, user experience, and business impact.",
        "Acted as Product Owner for Garuda Indonesia's website and mobile app digital team, managing product roadmaps and prioritizing features in agile scrum environments.",
        "Led AI Transformation Taskforce, evaluating LLM-powered use cases including LLM-based flight searches and Knowledge Management Systems.",
        "Managed GTM and GA4 implementation tracking digital KPIs to inform product decisions and UX improvements.",
        "Won 1st Place in Customer Satisfaction (UX) category at Indonesia SOE Technology Adoption Award (Fordigi 2024).",
        "Recognized as Garuda Indonesia Best Employee of 2024 in the CEO's Directorate."
      ]
    },
    {
      company: "FXMedia Singapore",
      role: "Interaction Designer Intern",
      period: "Nov 2022 - May 2023",
      points: [
        "Created user interface designs, motion graphics, and graphic layouts for website, game, and VR/AR/XR platforms.",
        "Introduced Python programming and AI tools to increase workflow efficiency at FXMedia design team."
      ]
    },
    {
      company: "Tiket.com",
      role: "Product Designer Intern",
      period: "Feb 2022 - Jul 2022",
      points: [
        "Contributed to product design projects at a leading Indonesian e-commerce platform, covering wireframing, research planning, prototyping, and usability testing.",
        "Worked within cross-functional product teams to design customer journeys in agile cycles."
      ]
    }
  ];

  const volunteering = [
    {
      organization: "Barunastra ITS Roboboat Team",
      role: "Branding and Media Manager",
      period: "Jun 2020 – Nov 2022",
      description: "Responsible for branding, content creation, social media strategies, and judging materials (Poster, Video, Website). Team won multiple national and international roboboat championships."
    },
    {
      organization: "Paragon Technology and Innovation",
      role: "Production Manager at IPL",
      period: "Jul 2021 - Nov 2021",
      description: "Decided visual concepts and standard graphic manuals as a founding team member. Managed the production quality of all motion graphics, video assets, and websites."
    },
    {
      organization: "StudentsxCEOs League",
      role: "Head of Web Designer",
      period: "Mar 2021 - Jul 2021",
      description: "Led and organized a design/dev team to build a web presence from the ground up under limited timeline and human resources constraints."
    }
  ];

  const awards = [
    {
      title: "Garuda Indonesia's Best Employees of 2024",
      sub: "CEO's Directorate — Garuda Indonesia",
      desc: "Honored for directorate-level outstanding performance and dedication in leading key digital products.",
      year: "Dec 2024"
    },
    {
      title: "1st Place - Customer Satisfaction (UX) Category",
      sub: "Indonesia SOE's Technology Adoption Award (Fordigi 2024)",
      desc: "Awarded for Garuda Indonesia's App UX improvements among all Indonesian State-Owned Enterprises.",
      year: "Sep 2024"
    },
    {
      title: "2nd Place - Team's Website",
      sub: "International Roboboat Competition (IRC 2023) by Robonation",
      desc: "Won in Florida, USA as UI designer, video editor, and illustrator for the Roboboat team.",
      year: "May 2023"
    },
    {
      title: "1st Place - Design Documentation",
      sub: "International Roboboat Competition (IRC 2022) by Robonation",
      desc: "Recognized for leading technical documentation design and representation.",
      year: "Jun 2022"
    },
    {
      title: "1st Place - Team's Website",
      sub: "International Roboboat Competition (IRC 2021) by Robonation",
      desc: "Created the winning web platform for the international roboboat challenge.",
      year: "Jun 2021"
    },
    {
      title: "1st Place - Hull Design Skills Video",
      sub: "International Roboboat Competition (IRC 2021) by Robonation",
      desc: "Led the video editing and conceptualization of the hull design technical video submission.",
      year: "Jun 2021"
    },
    {
      title: "Top 10 - Web Design",
      sub: "Proto-a-than International Prototype Design Competition 2021",
      desc: "Finished in the top 10 on a highly competitive, 10-hour prototyping hackathon hosted by Binus University.",
      year: "Feb 2021"
    }
  ];

  return (
    <ReactLenis root options={{ gestureOrientation: "both", syncTouch: true }}>
      <Nav />

      <main ref={containerRef} className="bg-[#171717] min-h-screen text-white font-sans overflow-x-hidden selection:bg-orange-500 selection:text-black">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none z-0" />
        <div className="absolute top-[30vh] right-[10vw] w-72 h-72 rounded-full bg-orange-500/10 blur-[100px] pointer-events-none z-0" />
        <div className="absolute top-[120vh] left-[5vw] w-96 h-96 rounded-full bg-orange-500/5 blur-[120px] pointer-events-none z-0" />

        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-32 pb-16 max-w-7xl mx-auto z-10">
          <div className="flex flex-col gap-6 md:gap-8 max-w-6xl">
            <div className="hero-title font-display text-orange-500 text-5xl md:text-7xl lg:text-8xl">
              <a className="font-sans font-light text-white">Arkan</a> <a className="blur-xs">Aulia Farhan</a>
            </div>

            <p className="hero-tagline text-2xl md:text-3xl lg:text-4xl text-neutral-300 font-light font-sans leading-relaxed">
              Started in <span className="text-orange-500 font-semibold">design</span>, picked up <span className="text-orange-500 font-semibold">development</span> along the way,<br /> ended up in <span className="text-orange-500 font-semibold">product</span>.
            </p>

            <div className="hero-meta flex flex-wrap gap-6 items-center text-sm md:text-base text-neutral-400 font-light font-sans mt-4">
              <span className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-orange-500" /> Jakarta, Indonesia
              </span>
              <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full hidden sm:block" />
              <span>
                Product Owner @ Garuda Indonesia
              </span>
            </div>
          </div>
        </section>

        {/* Bio Section */}
        <section className="about-section px-6 md:px-12 lg:px-24 py-16 max-w-7xl mx-auto z-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4 flex items-start">
              <h2 className="font-display text-orange-500 text-4xl md:text-5xl leading-tight">
                The Philosophy
              </h2>
            </div>
            <div className="lg:col-span-8 text-neutral-300 font-light text-lg md:text-xl font-sans leading-relaxed flex flex-col gap-6">
              <p>
                At Garuda Indonesia, I picked up the full stack of what it takes to ship digital features—such as working with engineers, aligning stakeholders, tracking what actually moves the numbers.
              </p>
              <p>
                Trusted with managing major projects, especially digital channel development and AI transformations, I enjoy solving complex structural challenges. I like figuring out how things work and making them better.
              </p>
              <p className="text-orange-500/90 font-medium italic font-display text-2xl md:text-3xl mt-2">
                &ldquo;Not too flashy, just the one who gets it done when no one else can.&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="about-section px-6 md:px-12 lg:px-24 py-16 max-w-7xl mx-auto z-10 relative">
          <div className="mb-12">
            <h2 className="font-sans font-bold text-3xl md:text-4xl text-white tracking-tight uppercase flex items-center gap-4">
              Core Capabilities <span className="h-[2px] bg-orange-500/50 flex-grow" />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="grid-card bg-white/[0.02] border border-white/[0.08] hover:border-orange-500/30 hover:bg-white/[0.04] backdrop-blur-md rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    {skill.icon}
                    <h3 className="font-sans font-semibold text-lg text-white tracking-wide uppercase">
                      {skill.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, itemIdx) => (
                      <span
                        key={itemIdx}
                        className="bg-neutral-800/80 border border-neutral-700/50 text-neutral-300 text-xs px-3 py-1.5 rounded-full hover:border-orange-500/50 hover:text-white transition-all duration-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="about-section px-6 md:px-12 lg:px-24 py-16 max-w-7xl mx-auto z-10 relative">
          <div className="mb-16">
            <h2 className="font-sans font-bold text-3xl md:text-4xl text-white tracking-tight uppercase flex items-center gap-4">
              Professional Experience <span className="h-[2px] bg-orange-500/50 flex-grow" />
            </h2>
          </div>

          <div className="relative border-l-2 border-orange-500/20 ml-4 md:ml-8 pl-8 md:pl-12 flex flex-col gap-16 py-4">
            {experiences.map((exp, index) => (
              <div key={index} className="timeline-item relative">
                {/* Timeline Dot */}
                <div className="timeline-dot absolute -left-[45px] md:-left-[61px] top-1.5 w-6 h-6 rounded-full bg-[#171717] border-4 border-orange-500 flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.4)]" />

                <div className="timeline-content bg-white/[0.02] border border-white/[0.06] backdrop-blur-md rounded-2xl p-6 md:p-8 hover:border-orange-500/20 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2.5 font-sans">
                        <FaBuilding className="text-orange-500 text-lg md:text-xl" />
                        {exp.company}
                      </h3>
                      <h4 className="text-orange-500 font-sans tracking-wide font-medium mt-1 uppercase text-sm">
                        {exp.role}
                      </h4>
                    </div>
                    <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs px-3.5 py-1.5 rounded-full font-medium h-fit w-fit font-sans">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="flex flex-col gap-3 text-neutral-300 font-light text-base leading-relaxed list-none pl-0">
                    {exp.points.map((pt, ptIdx) => (
                      <li key={ptIdx} className="relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-orange-500 before:font-bold">
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Honors & Awards Section */}
        <section className="about-section px-6 md:px-12 lg:px-24 py-16 max-w-7xl mx-auto z-10 relative">
          <div className="mb-12">
            <h2 className="font-sans font-bold text-3xl md:text-4xl text-white tracking-tight uppercase flex items-center gap-4">
              Honors & Awards <span className="h-[2px] bg-orange-500/50 flex-grow" />
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {awards.map((award, index) => (
              <div
                key={index}
                className="grid-card bg-white/[0.02] border border-white/[0.08] hover:border-orange-500/30 hover:bg-white/[0.04] backdrop-blur-md rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <span className="text-orange-500 text-2xl">
                      <FaAward />
                    </span>
                    <span className="text-neutral-500 text-xs font-medium font-sans">
                      {award.year}
                    </span>
                  </div>
                  <h3 className="font-sans font-bold text-lg text-white mb-2 leading-snug">
                    {award.title}
                  </h3>
                  <h4 className="text-orange-500/90 text-xs font-semibold tracking-wide uppercase mb-3 font-sans">
                    {award.sub}
                  </h4>
                  <p className="text-neutral-400 font-light text-sm leading-relaxed font-sans">
                    {award.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Volunteering Section */}
        <section className="about-section px-6 md:px-12 lg:px-24 py-16 max-w-7xl mx-auto z-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Education */}
            <div>
              <div className="mb-8">
                <h2 className="font-sans font-bold text-2xl md:text-3xl text-white tracking-tight uppercase flex items-center gap-4">
                  Education <span className="h-[2px] bg-orange-500/50 flex-grow" />
                </h2>
              </div>

              <div className="grid-card bg-white/[0.02] border border-white/[0.08] hover:border-orange-500/20 backdrop-blur-md rounded-2xl p-6 md:p-8 transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2.5 font-sans">
                      <FaGraduationCap className="text-orange-500 text-2xl" />
                      Institut Teknologi Sepuluh Nopember
                    </h3>
                    <h4 className="text-orange-500 font-sans tracking-wide font-medium mt-1 uppercase text-sm">
                      Informatics Engineering
                    </h4>
                  </div>
                  <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs px-3.5 py-1.5 rounded-full font-medium h-fit w-fit font-sans">
                    2019 - 2023
                  </span>
                </div>

                <div className="text-neutral-300 font-light text-base leading-relaxed flex flex-col gap-4">
                  <p>
                    Coursework in Artificial Intelligence, Human-Computer Interaction, Web Programming, Data Structures, and Object-Oriented Programming.
                  </p>
                  <p>
                    Acquired hands-on experience applying Python, JavaScript (React, Next.js), and core engineering design methodologies inside key academic projects and international robotics teams.
                  </p>
                </div>
              </div>
            </div>

            {/* Volunteering */}
            <div>
              <div className="mb-8">
                <h2 className="font-sans font-bold text-2xl md:text-3xl text-white tracking-tight uppercase flex items-center gap-4">
                  Volunteering <span className="h-[2px] bg-orange-500/50 flex-grow" />
                </h2>
              </div>

              <div className="flex flex-col gap-6">
                {volunteering.map((vol, index) => (
                  <div
                    key={index}
                    className="grid-card bg-white/[0.02] border border-white/[0.08] hover:border-orange-500/20 backdrop-blur-md rounded-2xl p-6 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <div>
                        <h3 className="font-sans font-bold text-lg text-white leading-tight">
                          {vol.organization}
                        </h3>
                        <h4 className="text-orange-500 text-xs font-semibold tracking-wide uppercase mt-1 font-sans">
                          {vol.role}
                        </h4>
                      </div>
                      <span className="text-neutral-500 text-xs font-medium font-sans whitespace-nowrap">
                        {vol.period}
                      </span>
                    </div>
                    <p className="text-neutral-400 font-light text-sm leading-relaxed font-sans">
                      {vol.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="footer z-10 mt-16">
          <div className="flex flex-col justify-between h-full w-full max-w-7xl mx-auto pointer-events-auto">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 w-full pt-8">
              <div>
                <h2 className="font-display text-orange-500 text-5xl md:text-7xl leading-none mb-4">
                  Grab some Coffee?
                </h2>
                <p className="text-neutral-400 text-lg font-light max-w-md font-sans">
                  Always open for interesting projects, product roadmap brainstorming, frontend building, or discussing LLM workflows.
                </p>
              </div>

              <div className="flex flex-col gap-4 text-base font-sans text-neutral-300">
                <span className="text-orange-500 uppercase tracking-widest text-xs font-bold">Contact Details</span>
                <a href="mailto:arkanaulia@gmail.com" className="flex items-center gap-3 hover:text-orange-500 transition-colors duration-250">
                  <FaEnvelope className="text-orange-500" /> arkanaulia@gmail.com
                </a>
                <a href="https://linkedin.com/in/arkanaulia" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-orange-500 transition-colors duration-250">
                  <FaLinkedin className="text-orange-500" /> linkedin.com/in/arkanaulia
                </a>
                <a href="https://arkanaulia.super.site" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-orange-500 transition-colors duration-250">
                  <FaGlobe className="text-orange-500" /> arkanaulia.super.site
                </a>
              </div>
            </div>

            <div className="copyright-info border-t border-white/5 pt-8 mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-neutral-500 text-sm font-sans w-full">
              <p>&copy; {new Date().getFullYear()} arkanaulia. All rights reserved.</p>
              <p className="flex flex-row items-center gap-1">
                Built with Blood and Tears <FaDroplet className="text-orange-500 animate-pulse" />
              </p>
            </div>
          </div>
          <ExplosionContainer />
        </footer>
      </main>
    </ReactLenis>
  );
}