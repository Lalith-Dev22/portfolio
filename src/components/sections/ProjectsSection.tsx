import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Github,
  Code,
  Terminal,
  Zap,
  Star,
  ArrowLeft,
  Share2,
  Heart,
  Calendar,
  User,
  Monitor,
  Layers,
  Target,
  Users,
  CheckCircle,
  Clock,
  GitBranch,
  Database,
  Palette,
  Globe,
  Smartphone,
  Shield,
  Rocket,
} from "lucide-react";
import Image1 from "../../Assets/portfolio1.png";
import Image2 from "../../Assets/portfolio4.png";
import Image3 from "../../Assets/portfolio5.png";
import Image4 from "../../Assets/portfolio2.png";
import Image5 from "../../Assets/Ai-hr1.png";
import Image6 from "../../Assets/Ai-hr2.png";
import Image7 from "../../Assets/AI-hr3.png";
import Image8 from "../../Assets/Ai-hr4.png";

const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio website built with React and Framer Motion animations.",
    fullDescription:
      "A professionally designed portfolio website showcasing my skills, projects, and experience. Features smooth animations, responsive design, and interactive elements to create an engaging user experience. Built with modern web technologies to ensure performance and accessibility.",
    image: Image1,
    bannerImage: Image1,
    screenshots: [Image1, Image2, Image3, Image4],
    tags: ["React", "TypeScript", "Tailwind CSS"],
    liveUrl: "#",
    codeUrl: "#",
    githubUrl: "#",
    status: "production",
    lines: "2.5k",
    commits: "42",
    category: "WEB DEVELOPMENT",
    year: "2025",
    duration: "4 weeks",
    client: "Personal Project",
    team: "Solo Developer",
    views: "1.2k",
    likes: "89",
    role: "Full Stack Developer",
    myRole: "Full Stack Developer & UI/UX Designer",
    roleDescription: "Designed and developed the entire portfolio website from concept to deployment. Created a modern, responsive design system, implemented smooth animations with Framer Motion, and optimized for performance and accessibility across all devices.",
    challenge:
      "Creating a visually stunning portfolio that effectively showcases my skills and projects while maintaining excellent performance and accessibility.",
    solution:
      "Implemented a component-based architecture with Framer Motion for smooth animations, Tailwind CSS for responsive design, and optimized assets for fast loading times.",
    challenges: [
      {
        title: "Performance Optimization",
        description: "Ensuring fast loading times while maintaining rich animations and visual effects throughout the site.",
        solution: "Implemented lazy loading, optimized images with modern formats, and used React.memo for component optimization."
      },
      {
        title: "Cross-Device Compatibility",
        description: "Creating a seamless experience across desktop, tablet, and mobile devices with varying screen sizes.",
        solution: "Adopted a mobile-first approach with Tailwind CSS responsive utilities and extensive testing across different devices."
      },
      {
        title: "SEO & Accessibility",
        description: "Ensuring the portfolio is discoverable by search engines and accessible to users with disabilities.",
        solution: "Implemented semantic HTML, proper ARIA labels, meta tags for SEO, and tested with screen readers."
      }
    ],
    technologies: [
      { name: "React", type: "Frontend", description: "Component-based UI development" },
      { name: "TypeScript", type: "Language", description: "Type-safe development" },
      { name: "Tailwind CSS", type: "Styling", description: "Utility-first CSS framework" },
      { name: "Framer Motion", type: "Animations", description: "Smooth animations and transitions" },
      { name: "Vite", type: "Build Tool", description: "Fast development and build process" },
    ],
    techStack: [
      { name: "React", category: "Frontend", description: "Component-based UI development" },
      { name: "TypeScript", category: "Language", description: "Type-safe development" },
      { name: "Tailwind CSS", category: "Styling", description: "Utility-first CSS framework" },
      { name: "Framer Motion", category: "Animation", description: "Smooth animations and transitions" },
      { name: "Vite", category: "Build Tool", description: "Fast development and build process" },
    ],
    features: [
      "Responsive design for all devices",
      "Smooth page transitions and animations",
      "Interactive project showcases",
      "Dark/light mode toggle",
      "Contact form integration",
      "Optimized performance metrics",
    ],
    metrics: {
      performance: 98,
      userSatisfaction: 95,
      codeQuality: 92,
      testCoverage: 88
    },
    timeline: [
      { phase: "Design & Planning", duration: "1 week", status: "completed" },
      { phase: "Component Development", duration: "2 weeks", status: "completed" },
      { phase: "Animation Implementation", duration: "1 week", status: "completed" },
      { phase: "Testing & Optimization", duration: "3 days", status: "completed" },
      { phase: "Deployment", duration: "1 day", status: "completed" }
    ],
    gallery: [Image2, Image3, Image4],
  },
  {
    id: 2,
    title: "AI-HR Platform",
    description:
      "AI-powered HR solution using Hugging Face models for smart hiring, insights, and automation.",
    fullDescription:
      "AI-HR is a personal project focused on transforming human resource processes with the power of AI. Leveraging pre-trained Hugging Face models, it offers advanced features like resume parsing, sentiment analysis, and predictive retention analytics. The platform automates recruitment and improves HR decision-making through intelligent insights.",
    image: Image5,
    bannerImage: Image5,
    screenshots: [Image5, Image6, Image7, Image8],
    tags: ["React", "Node.js", "Hugging Face", "MongoDB"],
    liveUrl: "#",
    codeUrl: "#",
    githubUrl: "#",
    status: "production",
    lines: "5.2k",
    commits: "68",
    category: "HR TECH",
    year: "2025",
    duration: "10 weeks",
    client: "Personal Project",
    team: "Solo Developer",
    views: "2.4k",
    likes: "186",
    role: "Solo Developer / AI Engineer",
    myRole: "Lead Full-Stack Developer & AI Engineer",
    roleDescription: "Led the development of the entire platform from conception to deployment. Designed and implemented the AI algorithms for resume screening, developed the backend APIs, created the responsive frontend interface, and integrated machine learning models for predictive analytics.",
    challenge:
      "Creating an end-to-end HR platform that intelligently screens candidates, understands sentiment from interviews, and predicts employee retention — all without relying on manual HR processes.",
    solution:
      "Used React for frontend, Node.js for backend, and integrated Hugging Face models for NLP tasks like resume parsing and sentiment analysis. MongoDB was used for flexible data storage and Socket.io for real-time updates across modules.",
    challenges: [
      {
        title: "AI Model Integration",
        description: "Integrating multiple AI models for resume parsing, sentiment analysis, and predictive analytics while maintaining real-time performance.",
        solution: "Implemented a microservices architecture with dedicated ML services, used Redis for caching, and optimized model inference with TensorFlow Serving."
      },
      {
        title: "Scalability & Performance",
        description: "Ensuring the system could handle thousands of applications and users simultaneously without performance degradation.",
        solution: "Designed a horizontally scalable architecture using AWS Lambda, implemented database sharding, and used CDN for static assets."
      },
      {
        title: "Data Privacy & Compliance",
        description: "Managing sensitive employee data while ensuring GDPR compliance and implementing robust security measures.",
        solution: "Implemented end-to-end encryption, created audit trails, and designed role-based access control with multi-factor authentication."
      }
    ],
    technologies: [
      { name: "React", type: "Frontend", description: "Modern UI with hooks and context" },
      { name: "Node.js", type: "Backend", description: "RESTful APIs and microservices" },
      { name: "Hugging Face Transformers", type: "AI/NLP", description: "Neural networks for resume analysis" },
      { name: "MongoDB", type: "Database", description: "Document storage for flexible data" },
      { name: "Socket.io", type: "Real-Time Communication", description: "Live updates and notifications" },
    ],
    techStack: [
      { name: "React", category: "Frontend", description: "Modern UI with hooks and context" },
      { name: "Node.js", category: "Backend", description: "RESTful APIs and microservices" },
      { name: "Hugging Face", category: "AI/ML", description: "Pre-trained models for NLP tasks" },
      { name: "MongoDB", category: "Database", description: "Document storage for flexible data" },
      { name: "Socket.io", category: "Real-time", description: "Live updates and notifications" },
    ],
    features: [
      "NLP-based resume parsing and keyword extraction",
      "Sentiment analysis of interview text/audio using Hugging Face",
      "AI-powered candidate ranking and shortlisting",
      "Predictive employee retention dashboard",
      "Smart interview scheduling with reminders",
      "Role-based admin dashboard and analytics",
    ],
    metrics: {
      performance: 95,
      userSatisfaction: 92,
      codeQuality: 88,
      testCoverage: 85
    },
    timeline: [
      { phase: "Research & Planning", duration: "2 weeks", status: "completed" },
      { phase: "MVP Development", duration: "6 weeks", status: "completed" },
      { phase: "AI Integration", duration: "3 weeks", status: "completed" },
      { phase: "Testing & Optimization", duration: "2 weeks", status: "completed" },
      { phase: "Deployment & Launch", duration: "1 week", status: "completed" }
    ],
    gallery: [Image8, Image7, Image6],
  },
  

  // {
  //   id: 3,
  //   title: "AI-Powered Chatbot",
  //   description: "Intelligent conversational agent for customer support with natural language processing capabilities.",
  //   fullDescription: "An advanced chatbot solution that leverages artificial intelligence to provide automated customer support. The system understands natural language queries, learns from interactions, and provides relevant responses to common customer questions, reducing support ticket volume.",
  //   image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop",
  //   tags: ["Python", "TensorFlow", "NLP"],
  //   liveUrl: "#",
  //   codeUrl: "#",
  //   status: "beta",
  //   lines: "2.2k",
  //   commits: "38",
  //   category: "ARTIFICIAL INTELLIGENCE",
  //   year: "2024",
  //   duration: "6 weeks",
  //   client: "SaaS Company",
  //   role: "AI Engineer",
  //   challenge: "Creating an intelligent chatbot that can understand natural language queries and provide accurate, helpful responses while continuously improving from user interactions.",
  //   solution: "Implemented a machine learning model using TensorFlow and natural language processing techniques, with a feedback loop system for continuous improvement based on user interactions.",
  //   technologies: [
  //     { name: "Python", type: "Backend" },
  //     { name: "TensorFlow", type: "Machine Learning" },
  //     { name: "NLTK", type: "Natural Language Processing" },
  //     { name: "Flask", type: "API Framework" },
  //     { name: "MongoDB", type: "Database" }
  //   ],
  //   features: [
  //     "Natural language understanding",
  //     "Context-aware conversations",
  //     "Automated ticket classification",
  //     "Learning from user interactions",
  //     "Multi-language support",
  //     "Integration with CRM systems"
  //   ],
  //   gallery: [
  //     "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop",
  //     "https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=800&h=600&fit=crop",
  //     "https://images.unsplash.com/photo-1488229297570-58520851e868?w=800&h=600&fit=crop"
  //   ]
  // },
  // {
  //   id: 4,
  //   title: "Task Management App",
  //   description: "Collaborative productivity tool for teams to organize, track, and complete projects efficiently.",
  //   fullDescription: "A comprehensive task management application designed to help teams collaborate effectively. Features include task creation and assignment, progress tracking, deadline management, and team communication tools to streamline project workflows and boost productivity.",
  //   image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop",
  //   tags: ["React", "Firebase", "Material UI"],
  //   liveUrl: "#",
  //   codeUrl: "#",
  //   status: "production",
  //   lines: "2.7k",
  //   commits: "45",
  //   category: "PRODUCTIVITY TOOL",
  //   year: "2024",
  //   duration: "5 weeks",
  //   client: "Project Management Firm",
  //   role: "Full Stack Developer",
  //   challenge: "Building a task management system that balances powerful features with an intuitive interface, while enabling real-time collaboration for ributed teams.",
  //   solution: "Created a React application with Firebase for real-time data synchronization, user authentication, and cloud functions for automated notifications and task management.",
  //   technologies: [
  //     { name: "React", type: "Frontend" },
  //     { name: "Firebase", type: "Backend & Database" },
  //     { name: "Material UI", type: "Component Library" },
  //     { name: "Redux", type: "State Management" },
  //     { name: "Cloud Functions", type: "Serverless Computing" }
  //   ],
  //   features: [
  //     "Drag-and-drop task boards",
  //     "Real-time collaboration",
  //     "Task assignment and tracking",
  //     "Deadline notifications",
  //     "File attachments and sharing",
  //     "Team chat and comments"
  //   ],
  //   gallery: [
  //     "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop",
  //     "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=600&fit=crop",
  //     "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop"
  //   ]
  // },
  // {
  //   id: 5,
  //   title: "Fitness Tracking Platform",
  //   description: "Mobile application for tracking workouts, nutrition, and health metrics with personalized insights.",
  //   fullDescription: "A comprehensive fitness tracking solution that helps users monitor their workouts, nutrition, and health metrics. The platform provides personalized insights and recommendations based on user data, helping individuals achieve their fitness goals more effectively.",
  //   image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&h=400&fit=crop",
  //   tags: ["React Native", "Node.js", "GraphQL"],
  //   liveUrl: "#",
  //   codeUrl: "#",
  //   status: "production",
  //   lines: "3.5k",
  //   commits: "52",
  //   category: "HEALTH & FITNESS",
  //   year: "2024",
  //   duration: "7 weeks",
  //   client: "Fitness Startup",
  //   role: "Mobile Developer",
  //   challenge: "Creating a fitness tracking app that collects and analyzes various health metrics while providing an engaging, motivating experience that encourages consistent use.",
  //   solution: "Developed a React Native application with Node.js backend and GraphQL API, implementing data visualization, machine learning for personalized recommendations, and gamification elements.",
  //   technologies: [
  //     { name: "React Native", type: "Mobile Framework" },
  //     { name: "Node.js", type: "Backend" },
  //     { name: "GraphQL", type: "API" },
  //     { name: "MongoDB", type: "Database" },
  //     { name: "TensorFlow Lite", type: "ML for Mobile" }
  //   ],
  //   features: [
  //     "Workout tracking and planning",
  //     "Nutrition logging and analysis",
  //     "Health metrics visualization",
  //     "Personalized recommendations",
  //     "Social sharing and challenges",
  //     "Progress reports and insights"
  //   ],
  //   gallery: [
  //     "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=600&fit=crop",
  //     "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
  //     "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop"
  //   ]
  // },
  // {
  //   id: 6,
  //   title: "Real Estate Marketplace",
  //   description: "Property listing platform with advanced search, virtual tours, and agent communication tools.",
  //   fullDescription: "A comprehensive real estate marketplace that connects buyers, sellers, and agents. The platform features property listings with advanced search capabilities, virtual tours, mortgage calculators, and secure communication channels between users and real estate professionals.",
  //   image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
  //   tags: ["Angular", "Express.js", "PostgreSQL"],
  //   liveUrl: "#",
  //   codeUrl: "#",
  //   status: "beta",
  //   lines: "4.2k",
  //   commits: "61",
  //   category: "REAL ESTATE",
  //   year: "2024",
  //   duration: "9 weeks",
  //   client: "Real Estate Agency",
  //   role: "Full Stack Developer",
  //   challenge: "Building a feature-rich real estate platform that handles complex property data, search requirements, and secure communications while providing an intuitive user experience for both buyers and agents.",
  //   solution: "Developed an Angular application with Express.js backend and PostgreSQL database, implementing geospatial search, virtual tour integration, and real-time messaging between users.",
  //   technologies: [
  //     { name: "Angular", type: "Frontend" },
  //     { name: "Express.js", type: "Backend" },
  //     { name: "PostgreSQL", type: "Database" },
  //     { name: "Socket.io", type: "Real-time Communication" },
  //     { name: "AWS S3", type: "Media Storage" }
  //   ],
  //   features: [
  //     "Advanced property search filters",
  //     "Interactive maps and location data",
  //     "Virtual property tours",
  //     "Mortgage calculator and affordability tools",
  //     "Agent-client messaging system",
  //     "Saved searches and property alerts"
  //   ],
  //   gallery: [
  //     "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
  //     "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop",
  //     "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&h=600&fit=crop"
  //   ]
  // }
];

const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig = {
    production: {
      color: "text-green-400",
      bg: "bg-green-400/10",
      border: "border-green-400/30",
      dot: "bg-green-400",
    },
    beta: {
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      border: "border-yellow-400/30",
      dot: "bg-yellow-400",
    },
    development: {
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-400/30",
      dot: "bg-blue-400",
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig];

  return (
    <div
      className={`inline-flex items-center gap-2 px-2 py-1 rounded-md text-xs font-mono ${config.bg} ${config.border} border`}
    >
      <div className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`}></div>
      <span className={config.color}>{status}</span>
    </div>
  );
};

const ProjectCard = ({
  project,
  index,
  onClick,
  isAllProjects = false,
}: any) => (
  <motion.div
    key={`project-${project.id}`} // Add explicit key
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: index * 0.1 }}
    className="glass-card overflow-hidden group hover:bg-card/20 transition-all duration-500 relative border border-primary/10 hover:border-primary/30 cursor-pointer"
    onClick={() => onClick(project)}
  >
    <div className="flex items-center justify-between p-4 bg-card/40 border-b border-primary/10">
      <div className="flex items-center gap-3">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
        </div>
        <span className="text-sm font-mono text-muted-foreground">
          {project.title.toLowerCase().replace(/\s+/g, "-")}.tsx
        </span>
      </div>
      <StatusBadge status={project.status} />
    </div>

    <div className="relative overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 text-xs font-mono text-primary/70">
            <Terminal className="h-3 w-3" />
            <span>npm run build</span>
            <div className="flex-1 h-px bg-primary/20"></div>
            <span className="text-green-400">✓</span>
          </div>
        </div>
      </div>
    </div>

    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between text-xs font-mono text-muted-foreground border-b border-primary/10 pb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Code className="h-3 w-3" />
            <span>{project.lines} lines</span>
          </div>
          <div className="flex items-center gap-1">
            <Github className="h-3 w-3" />
            <span>{project.commits} commits</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 fill-primary text-primary" />
          <span className="text-primary">Featured</span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 font-mono">
          {project.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed text-sm">
          {project.description}
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <Zap className="h-3 w-3" />
          <span>Tech Stack</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag: string, tagIndex: number) => (
            <motion.span
              key={`${project.id}-tag-${tagIndex}`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: tagIndex * 0.1 }}
              className="px-3 py-1.5 text-xs font-mono bg-primary/10 text-primary rounded-md border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-all duration-300 cursor-default"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </div>

    <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none">
      <div
        className="h-full w-full"
        style={{
          backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
          backgroundSize: "20px 20px",
        }}
      ></div>
    </div>
  </motion.div>
);

export const ProjectsSection = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("projects");

  // Reset scroll and clear selected project when returning to main view
  const handleBackToPortfolio = () => {
    setCurrentView("projects");
    // Small delay to ensure state is updated before scrolling
    setTimeout(() => {
      // Find the projects section element and scroll to it
      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: "smooth" });
      } else {
        // Fallback if element not found
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 100);
  };

  const handleExploreAll = () => {
    setCurrentView("allProjects");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProjectClick = (project: any) => {
    navigate(`/projects/${project.id}`);
  };

  if (currentView === "allProjects") {
    return (
      <div className="min-h-screen bg-background fixed inset-0 z-50 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key="all-projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="sticky top-0 bg-background/95 backdrop-blur-lg border-b border-primary/10 z-10"
            >
              <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={handleBackToPortfolio}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-mono"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Portfolio
                </Button>
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center space-y-6 mb-16"
              >
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                  All Projects
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Explore my complete portfolio of projects, showcasing diverse
                  skills and innovative solutions across different domains.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <ProjectCard
                    key={`all-${project.id}`}
                    project={project}
                    index={index}
                    onClick={handleProjectClick}
                    isAllProjects={true}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // Default Projects Section
  const featuredProjects = projects.slice(0, 4);

  return (
    <section
      id="projects"
      className="min-h-screen flex items-center section-padding py-24"
    >
      <div className="max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key="featured-projects"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-16"
          >
            <div className="text-center space-y-6">
              <motion.h2
                className="text-3xl sm:text-5xl md:text-7xl font-bold text-gradient"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Featured Projects
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-muted-foreground max-w-3xl mx-auto"
              >
                Showcasing innovation through code, design, and user experience
              </motion.p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={`featured-${project.id}`}
                  project={project}
                  index={index}
                  onClick={handleProjectClick}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-center"
            >
              <Button
                size="lg"
                onClick={() => navigate("/projects")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono border-0 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Terminal className="h-4 w-4 mr-2 relative z-10" />
                <span className="relative z-10">View All Projects</span>
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
