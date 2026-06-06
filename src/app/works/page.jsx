"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { FaChevronUp, FaDroplet } from "react-icons/fa6";
import Nav from "../../_component/Nav/Nav";

gsap.registerPlugin(ScrollTrigger);

// Project data based on existing Works component
const projects = [
  // Dev Projects
  {
    id: "emr-system",
    title: "EMR System",
    category: "Dev Projects",
    image: "/emr.webp",
    description: "Comprehensive Electronic Medical Records system with patient management, appointment scheduling, and reporting capabilities.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    github: "#",
    live: "#",
  },
  {
    id: "dev-project-2",
    title: "Multi-Vendor E-commerce Platform",
    category: "Dev Projects", 
    image: "/img-5.webp",
    description: "Full-featured e-commerce solution with vendor management, inventory tracking, and advanced analytics dashboard.",
    tech: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
    github: "#",
    live: "#",
  },
  {
    id: "dev-project-3",
    title: "Real-time Analytics Dashboard",
    category: "Dev Projects",
    image: "/img-6.webp",
    description: "Real-time data visualization platform with custom widgets and automated reporting features.",
    tech: ["React", "D3.js", "WebSocket", "Python"],
    github: "#",
    live: "#",
  },
  // UX Projects
  {
    id: "ux-project-1",
    title: "Mobile Banking Redesign",
    category: "UX Projects",
    image: "/img-1.webp",
    description: "Complete redesign of banking app with improved user flows and accessibility features.",
    tech: ["Figma", "User Research", "Prototyping", "Usability Testing"],
    github: "#",
    live: "#",
  },
  {
    id: "ux-project-2",
    title: "Travel Booking Platform",
    category: "UX Projects",
    image: "/img-2.webp",
    description: "Streamlined booking experience focusing on intuitive navigation and conversion optimization.",
    tech: ["User Journey Mapping", "Wireframing", "A/B Testing", "UI Design"],
    github: "#",
    live: "#",
  },
  {
    id: "ux-project-3",
    title: "Healthcare Portal",
    category: "UX Projects",
    image: "/img-3.webp",
    description: "Patient portal with telehealth integration and medical record access.",
    tech: ["Design Systems", "Accessibility", "Information Architecture", "Prototyping"],
    github: "#",
    live: "#",
  },
  // 3D Projects
  {
    id: "3d-project-1",
    title: "Sicepat Logistics Visualization",
    category: "3D Projects",
    image: "/sicepat.webp",
    description: "3D visualization of logistics routes and delivery networks for Sicepat courier service.",
    tech: ["Blender", "Three.js", "React Three Fiber", "Animation"],
    github: "#",
    live: "#",
  },
  {
    id: "3d-project-2",
    title: "Holy Creative Project",
    category: "3D Projects",
    image: "/holy.webp",
    description: "Creative 3D art and animation project exploring abstract concepts and visual storytelling.",
    tech: ["Blender", "Cinema 4D", "Octane Render", "After Effects"],
    github: "#",
    live: "#",
  },
  {
    id: "3d-project-3",
    title: "Yarsi Educational 3D",
    category: "3D Projects",
    image: "/yarsi.webp",
    description: "Educational 3D models and simulations for Yarsi University medical program.",
    tech: ["Blender", "Unity", "Medical Illustration", "3D Modeling"],
    github: "#",
    live: "#",
  },
  // PM and Analyst Projects
  {
    id: "pm-project-1",
    title: "Digital Transformation Initiative",
    category: "PM and Analyst",
    image: "/pm2.webp",
    description: "Led digital transformation for airline operations, improving efficiency and customer satisfaction.",
    tech: ["Agile Methodology", "Stakeholder Management", "Change Management", "Business Analysis"],
    github: "#",
    live: "#",
  }
];

const WorksPage = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const projectRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.from(heroRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      // Animate projects as they come into view
      projectRefs.current.forEach((projectRef, index) => {
        if (projectRef) {
          gsap.from(projectRef, {
            scrollTrigger: {
              trigger: projectRef,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: index * 0.1,
          });
        }
      });

      // Parallax effect for title
      gsap.to(".works-title", {
        scrollTrigger: {
          trigger: ".works-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: -100,
        ease: "none",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Group projects by category
  const groupedProjects = projects.reduce((acc, project) => {
    if (!acc[project.category]) {
      acc[project.category] = [];
    }
    acc[project.category].push(project);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#171717] text-white font-sans overflow-x-hidden selection:bg-orange-500 selection:text-black" ref={containerRef}>
      <Nav />
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none z-0" />
      <div className="absolute top-[30vh] right-[10vw] w-72 h-72 rounded-full bg-orange-500/10 blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-[120vh] left-[5vw] w-96 h-96 rounded-full bg-orange-500/5 blur-[120px] pointer-events-none z-0" />

      {/* Hero Section */}
      <section className="works-hero relative min-h-[70vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-32 pb-16 max-w-7xl mx-auto z-10">
        <div className="flex flex-col gap-6 md:gap-8 max-w-6xl">
          <h1 ref={heroRef} className="works-title font-display text-orange-500 text-5xl md:text-7xl lg:text-8xl">
            Selected Works
          </h1>
          
          <p className="text-2xl md:text-3xl text-neutral-300 font-light font-sans leading-relaxed">
            A curated collection of my professional journey across diverse domains.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-6">
            {Object.keys(groupedProjects).map((category, index) => (
              <Link 
                key={category}
                href={`#${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-4 py-2 bg-white/10 hover:bg-orange-500/20 border border-white/30 hover:border-orange-500 rounded-full text-sm transition-all duration-300"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <main className="px-6 md:px-12 lg:px-24 py-16 max-w-7xl mx-auto z-10 relative">
        {Object.entries(groupedProjects).map(([category, projectsInCategory], categoryIndex) => (
          <section 
            id={category.toLowerCase().replace(/\s+/g, '-')}
            key={category} 
            className="mb-24 scroll-mt-32"
          >
            <div className="mb-12">
              <h2 className="font-display text-orange-500 text-3xl md:text-4xl uppercase tracking-wide">
                {category}
              </h2>
              <div className="h-0.5 w-24 bg-orange-500 mt-2" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectsInCategory.map((project, projectIndex) => (
                <div 
                  key={project.id}
                  ref={el => projectRefs.current[categoryIndex * 10 + projectIndex] = el}
                  className="bg-white/[0.02] border border-white/[0.08] hover:border-orange-500/30 rounded-2xl overflow-hidden transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={800}
                      height={500}
                      className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                      priority={projectIndex < 3} // Prioritize first few images
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div>
                        <h3 className="font-display text-white text-xl">{project.title}</h3>
                        <p className="text-orange-500 text-sm">{project.category}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-display text-white text-xl mb-2">{project.title}</h3>
                    
                    <p className="text-neutral-300 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, 3).map((tech, idx) => (
                        <span 
                          key={idx}
                          className="text-xs px-2.5 py-1 bg-white/10 border border-white/20 rounded-full text-neutral-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="text-xs px-2.5 py-1 bg-white/10 border border-white/20 rounded-full text-neutral-300">
                          +{project.tech.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-3">
                      <Link 
                        href={project.github}
                        className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors"
                      >
                        <FaGithub className="text-orange-500" /> Code
                      </Link>
                      <Link 
                        href={project.live}
                        className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors"
                      >
                        <FaExternalLinkAlt className="text-orange-500" /> Live Demo
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Footer Section */}
      <footer className="footer z-10 mt-16">
        <div className="flex flex-col justify-between h-full w-full max-w-7xl mx-auto pointer-events-auto">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-12 w-full pt-8">
            <div>
              <h2 className="font-display text-orange-500 text-5xl md:text-7xl leading-none mb-4">
                Interested in Collaboration?
              </h2>
              <p className="text-neutral-400 text-lg font-light max-w-md font-sans">
                I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            <div className="flex flex-col gap-4 text-base font-sans text-neutral-300">
              <span className="text-orange-500 uppercase tracking-widest text-xs font-bold">Connect With Me</span>
              <a href="mailto:arkanaulia@gmail.com" className="flex items-center gap-3 hover:text-orange-500 transition-colors duration-250">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> arkanaulia@gmail.com
              </a>
              <a href="https://linkedin.com/in/arkanaulia" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-orange-500 transition-colors duration-250">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg> linkedin.com/in/arkanaulia
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
      </footer>

      {/* Back to Top Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Link 
          href="#"
          className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300"
          aria-label="Back to top"
        >
          <FaChevronUp className="rotate-[-90deg]" />
        </Link>
      </div>
    </div>
  );
};

export default WorksPage;