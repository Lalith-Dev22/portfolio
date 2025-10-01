import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplineBackground } from "./SplineBackground";
import { AboutSection } from "./sections/AboutSection";
import { SkillsSection } from "./sections/SkillsSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { ContactSection } from "./sections/ContactSection";
import Image1 from "../Assets/dev.png";
import Stairs from "./Stairs";

export const HomePage = () => {
  const [currentTech, setCurrentTech] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [animationsEnabled, setAnimationsEnabled] = useState(false);

  const techStack = [
    "React",
    "Node.js",
    "TypeScript",
    "Python",
    "MongoDB",
    "AWS",
  ];
  const codeSnippets = [
    'const developer = { passion: "coding", dream: "innovation" };',
    'function createAwesome() { return "digital experiences"; }',
    "while(learning) { skills++; opportunities.grow(); }",
  ];

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Only start animations after stair transition completes
    // Initial delay to let the stair animation finish
    const timer = setTimeout(() => {
      setAnimationsEnabled(true);
    }, 100);

    // Tech stack rotation - only start after animations are enabled
    let techInterval;
    if (animationsEnabled) {
      techInterval = setInterval(() => {
        setCurrentTech((prev) => (prev + 1) % techStack.length);
      }, 2000);
    }

    // Mouse tracking for parallax effects
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      clearTimeout(timer);
      if (techInterval) clearInterval(techInterval);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [animationsEnabled]);

  // Handle stair transition completion with GSAP animations
  const handleTransitionComplete = () => {
    setAnimationsEnabled(true);
    // Content is already visible, just enable interactions and dynamic animations
  };

  return (
    <Stairs onTransitionComplete={handleTransitionComplete}>
      <div
        className="bg-background relative overflow-hidden snap-y snap-mandatory min-h-screen"
        style={{ overflowY: "auto" }}
      >
      {/* Enhanced Fixed Background */}
      <div className="fixed inset-0 z-0">
        <SplineBackground className="opacity-20" />
        <div className="floating-bg" />

        {/* Animated Grid Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid-pattern animate-pulse" />
        </div>

        {/* Floating Code Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {codeSnippets.map((snippet, index) => (
            <motion.div
              key={index}
              className="absolute text-xs font-mono text-primary/20"
              initial={{
                x: -200,
                y: Math.random() * window.innerHeight,
                opacity: 0,
              }}
              animate={animationsEnabled ? {
                x: window.innerWidth + 200,
                opacity: [0, 0.3, 0.3, 0],
              } : {}}
              transition={{
                duration: 15 + index * 5,
                repeat: Infinity,
                delay: index * 5,
                ease: "linear",
              }}
            >
              {snippet}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div id="main-content" className="relative z-10">
        {/* Enhanced Hero Section */}
        <main className="min-h-screen flex items-center section-padding relative snap-start snap-always" role="main" aria-label="Hero section">
          {/* Enhanced Side Text with Status Indicator - Hidden on mobile/tablet */}
          <div className="fixed right-4 xl:right-8 top-1/2 -translate-y-1/2 z-20 hidden xl:block">
            <motion.div
              className="space-y-6"
              style={{
                transform: `translateX(${mousePosition.x * 5}px)`,
              }}
            >
              {/* <div className="writing-mode-vertical text-xl font-light tracking-[0.3em] text-muted-foreground/60">
                FULL STACK DEVELOPER
              </div> */}

              {/* Status Indicator */}
              {/* <div className="flex items-center gap-2 rotate-90 origin-center">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-green-500">AVAILABLE FOR HIRE</span>
              </div> */}
            </motion.div>
          </div>

          {/* Floating Tech Icons */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-8 h-8 opacity-10"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                animate={animationsEnabled ? {
                  y: [0, -20, 0],
                  rotate: [0, 180, 360],
                } : {}}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              >
                <div className="w-full h-full bg-primary rounded-lg"></div>
              </motion.div>
            ))}
          </div>

          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]" role="presentation">
            {/* Enhanced Left Content */}
            <div
              className="space-y-8"
              style={{
                transform: `translateX(${mousePosition.x * -10}px)`,
              }}
            >
              {/* Professional Badge */}
              <div className="inline-flex items-center gap-2 glass-card px-4 py-2 bg-primary/10 rounded-full mt-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-primary tracking-wider uppercase">
                  Full stack Developer
                </span>
              </div>

              {/* Dynamic Greeting */}
              <div className="space-y-2">
                <div className="text-lg text-muted-foreground">Hello! I'm</div>
              </div>

              {/* Enhanced Name with Typing Effect */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none">
                  <span className="text-primary inline-block">
                    LALITH
                  </span>
                  <br />
                  <span className="text-foreground inline-block">
                    KISHORE
                  </span>
                </h1>

                {/* Animated Underline */}
                <div className="h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full w-3/5" />
              </div>

              {/* Dynamic Title with Tech Stack */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-wrap">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                    Full Stack Developer
                  </h2>
                  <div className="flex items-center gap-2 text-sm sm:text-base">
                    <span className="text-muted-foreground">
                      specializing in
                    </span>
                    <motion.span
                      key={currentTech}
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.8 }}
                      className="text-primary font-bold text-lg sm:text-xl"
                    >
                      {techStack[currentTech]}
                    </motion.span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
                  I transform ideas into exceptional digital experiences through
                  <span className="text-primary font-semibold">
                    {" "}
                    clean code
                  </span>
                  ,
                  <span className="text-primary font-semibold">
                    {" "}
                    innovative solutions
                  </span>
                  , and
                  <span className="text-primary font-semibold">
                    {" "}
                    user-centric design
                  </span>
                  . Ready to bring your vision to life.
                </p>
              </div>

              {/* Enhanced Action Buttons */}
              <div>
                <a href="/Lalith_resume.pdf" download>
                  <motion.button
                    className="glass-card px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-4 bg-primary text-primary-foreground font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden w-full sm:w-auto mt-4"
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-primary opacity-100 transition-opacity duration-300"></div>
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span className="relative z-10 text-sm sm:text-base">
                      Download Resume
                    </span>
                  </motion.button>
                </a>
              </div>

              {/* Social Proof Mini Cards */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-muted-foreground">
                    Currently available
                  </span>
                </div>
                <div className="flex items-center gap-2"></div>
              </div>
            </div>

            {/* developer Image  */}
            <img
              src={Image1}
              alt="Lalith Kishore - Full Stack Developer, professional headshot with modern tech background"
              className="w-full max-w-md sm:max-w-lg md:max-w-xl object-contain pointer-events-none drop-shadow-[0_0_20px_hsl(var(--primary)_/_0.4)]"
            />
          </div>
        </main>

        {/* Other Sections with Full Viewport Heights */}

        <AboutSection />

        <SkillsSection />

        <ExperienceSection />

        <ProjectsSection />

        <TestimonialsSection />

        <ContactSection />
      </div>
    </div>
    </Stairs>
  );
};
