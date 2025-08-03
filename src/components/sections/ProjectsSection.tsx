import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
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
  Rocket
} from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Check-In/Check-Out System",
    description: "A real-time intern time tracking system with authentication and session management.",
    fullDescription: "A comprehensive time tracking solution designed specifically for intern management. The system features real-time clock-in/out functionality, secure authentication, automated session management, and detailed reporting capabilities. Built with modern web technologies to ensure scalability and performance.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    tags: ["React-Bootstrap", "Node.js", "MongoDB"],
    liveUrl: "#",
    codeUrl: "#",
    status: "production",
    lines: "1.2k",
    commits: "24",
    category: "WEB DEVELOPMENT",
    year: "2024",
    duration: "3 weeks",
    client: "Internal Project",
    role: "Full Stack Developer",
    challenge: "Creating a reliable time tracking system that handles concurrent users and provides accurate reporting for intern management.",
    solution: "Implemented real-time WebSocket connections, robust authentication middleware, and comprehensive data validation to ensure accurate time tracking.",
    technologies: [
      { name: "React Bootstrap", type: "Frontend" },
      { name: "Node.js", type: "Backend" },
      { name: "MongoDB", type: "Database" },
      { name: "JWT", type: "Authentication" },
      { name: "Socket.io", type: "Real-time" }
    ],
    features: [
      "Real-time clock in/out functionality",
      "Secure user authentication",
      "Automated session management",
      "Detailed reporting dashboard",
      "Multi-user concurrent support"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1509909756405-be0199881695?w=800&h=600&fit=crop"
    ]
  },
  {
    id: 2,
    title: "Support Ticket Platform",
    description: "Web-based system for managing and resolving raised tickets with status and commenting.",
    fullDescription: "A comprehensive ticket management system that streamlines customer support operations. Features include ticket creation, assignment, status tracking, commenting system, and advanced filtering capabilities. Designed to improve response times and customer satisfaction.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    tags: ["React", "Express.js", "MongoDB"],
    liveUrl: "#",
    codeUrl: "#",
    status: "beta",
    lines: "1.5k",
    commits: "30",
    category: "WEB APPLICATION",
    year: "2024",
    duration: "4 weeks",
    client: "Enterprise Client",
    role: "Lead Developer",
    challenge: "Building a scalable ticket management system that can handle high volumes of support requests while maintaining excellent user experience.",
    solution: "Developed a modular architecture with efficient database indexing, real-time notifications, and intuitive user interface for both customers and support agents.",
    technologies: [
      { name: "React", type: "Frontend" },
      { name: "Express.js", type: "Backend" },
      { name: "MongoDB", type: "Database" },
      { name: "Redis", type: "Caching" },
      { name: "Nodemailer", type: "Email Service" }
    ],
    features: [
      "Ticket creation and management",
      "Real-time status updates",
      "Comment and reply system",
      "Advanced filtering and search",
      "Email notifications",
      "Priority-based assignment"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
    ]
  },
  {
    id: 3,
    title: "Static Perfume Shop Website",
    description: "Elegant static site for showcasing perfume products, with Firebase-backed product management.",
    fullDescription: "A beautifully crafted e-commerce website for a luxury perfume retailer. The site combines elegant design with functional product management, featuring Firebase integration for dynamic content updates, responsive design for all devices, and optimized performance.",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=400&fit=crop",
    tags: ["HTML", "CSS", "Firebase"],
    liveUrl: "#",
    codeUrl: "#",
    status: "production",
    lines: "600",
    commits: "12",
    category: "E-COMMERCE",
    year: "2024",
    duration: "2 weeks",
    client: "Luxury Perfume Boutique",
    role: "Frontend Developer & Designer",
    challenge: "Creating an elegant, fast-loading website that showcases luxury perfumes while maintaining easy content management for the client.",
    solution: "Developed a static site with Firebase integration for dynamic content, implemented elegant animations, and ensured perfect performance across all devices.",
    technologies: [
      { name: "HTML5", type: "Markup" },
      { name: "CSS3", type: "Styling" },
      { name: "JavaScript", type: "Functionality" },
      { name: "Firebase", type: "Backend Service" },
      { name: "Netlify", type: "Hosting" }
    ],
    features: [
      "Elegant product showcase",
      "Firebase-powered CMS",
      "Responsive design",
      "Fast loading times",
      "SEO optimized",
      "Contact form integration"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1594736797933-d0801ba2fe65?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop"
    ]
  },
  {
    id: 4,
    title: "Intern Task Monitoring Dashboard",
    description: "Task tracker dashboard for interns to view, filter, and manage assigned work items.",
    fullDescription: "A comprehensive task management dashboard specifically designed for intern supervision and productivity tracking. Features include task assignment, progress monitoring, deadline management, and performance analytics to help mentors guide interns effectively.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    tags: ["React", "Tailwind CSS", "Node.js"],
    liveUrl: "#",
    codeUrl: "#",
    status: "development",
    lines: "2.3k",
    commits: "37",
    category: "PRODUCTIVITY TOOL",
    year: "2024",
    duration: "5 weeks",
    client: "HR Department",
    role: "Full Stack Developer",
    challenge: "Creating an intuitive dashboard that helps mentors track intern progress while providing interns with clear task visibility and goal setting.",
    solution: "Built a comprehensive dashboard with drag-and-drop task management, real-time progress tracking, and detailed analytics to improve intern productivity and mentor oversight.",
    technologies: [
      { name: "React", type: "Frontend" },
      { name: "Tailwind CSS", type: "Styling" },
      { name: "Node.js", type: "Backend" },
      { name: "PostgreSQL", type: "Database" },
      { name: "Chart.js", type: "Analytics" }
    ],
    features: [
      "Drag-and-drop task management",
      "Real-time progress tracking",
      "Deadline notifications",
      "Performance analytics",
      "Mentor-intern communication",
      "Goal setting and tracking"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop"
    ]
  },
  {
    id: 5,
    title: "E-learning Platform",
    description: "Interactive online learning platform with video streaming and progress tracking.",
    fullDescription: "A comprehensive e-learning platform designed to deliver interactive educational content with seamless video streaming, progress tracking, and student-teacher communication tools. The platform supports multiple course formats, interactive quizzes, and detailed analytics for educators.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
    tags: ["Vue.js", "Laravel", "MySQL"],
    liveUrl: "#",
    codeUrl: "#",
    status: "production",
    lines: "3.2k",
    commits: "45",
    category: "EDUCATION",
    year: "2024",
    duration: "6 weeks",
    client: "Educational Institute",
    role: "Full Stack Developer",
    challenge: "Building a scalable learning management system that supports diverse content types while maintaining excellent performance and user engagement.",
    solution: "Implemented a microservices architecture with efficient video streaming, interactive learning modules, and comprehensive progress tracking system.",
    technologies: [
      { name: "Vue.js", type: "Frontend" },
      { name: "Laravel", type: "Backend" },
      { name: "MySQL", type: "Database" },
      { name: "Redis", type: "Caching" },
      { name: "AWS S3", type: "Storage" }
    ],
    features: [
      "Video streaming and playback",
      "Interactive course modules",
      "Progress tracking system",
      "Student-teacher messaging",
      "Quiz and assessment tools",
      "Certificate generation"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop"
    ]
  },
  {
    id: 6,
    title: "Weather Analytics App",
    description: "Real-time weather tracking with predictive analytics and data visualization.",
    fullDescription: "A sophisticated weather application that provides real-time weather data, predictive analytics, and beautiful data visualizations for weather enthusiasts and professionals. Features include historical data analysis, weather alerts, and customizable dashboards.",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop",
    tags: ["React Native", "Python", "PostgreSQL"],
    liveUrl: "#",
    codeUrl: "#",
    status: "beta",
    lines: "2.8k",
    commits: "33",
    category: "MOBILE APP",
    year: "2024",
    duration: "4 weeks",
    client: "Weather Service Provider",
    role: "Mobile Developer",
    challenge: "Creating a mobile weather app that processes large amounts of meteorological data while providing intuitive visualizations and accurate predictions.",
    solution: "Developed a React Native app with Python-based machine learning backend for weather prediction and PostgreSQL for efficient data storage and retrieval.",
    technologies: [
      { name: "React Native", type: "Mobile Framework" },
      { name: "Python", type: "Backend" },
      { name: "PostgreSQL", type: "Database" },
      { name: "TensorFlow", type: "ML Framework" },
      { name: "Chart.js", type: "Visualization" }
    ],
    features: [
      "Real-time weather updates",
      "Predictive weather analytics",
      "Interactive weather maps",
      "Historical data analysis",
      "Weather alerts and notifications",
      "Customizable dashboard widgets"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop"
    ]
  }
];

const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig = {
    production: { color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/30', dot: 'bg-green-400' },
    beta: { color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30', dot: 'bg-yellow-400' },
    development: { color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/30', dot: 'bg-blue-400' }
  };

  const config = statusConfig[status as keyof typeof statusConfig];

  return (
    <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-md text-xs font-mono ${config.bg} ${config.border} border`}>
      <div className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`}></div>
      <span className={config.color}>{status}</span>
    </div>
  );
};

const ProjectCard = ({ project, index, onClick, isAllProjects = false }: any) => (
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
        <span className="text-sm font-mono text-muted-foreground">{project.title.toLowerCase().replace(/\s+/g, '-')}.tsx</span>
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
      <div className="h-full w-full" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px'
      }}></div>
    </div>
  </motion.div>
);

export const ProjectsSection = () => {
  const [currentView, setCurrentView] = useState('projects');
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Reset scroll and clear selected project when returning to main view
  const handleBackToPortfolio = () => {
    setSelectedProject(null);
    setCurrentView('projects');
    // Small delay to ensure state is updated before scrolling
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleExploreAll = () => {
    setCurrentView('allProjects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setCurrentView('projectDetail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentView === 'allProjects') {
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
                    <Share2 className="h-4 w-4" />
                  </Button>
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
                  Explore my complete portfolio of projects, showcasing diverse skills and innovative solutions across different domains.
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

  if (currentView === 'projectDetail' && selectedProject) {
    return (
      <div className="min-h-screen bg-background fixed inset-0 z-50 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={`project-detail-${selectedProject.id}`}
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
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-6 py-12">
              <div className="grid lg:grid-cols-2 gap-12 mb-16">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-orange-500">
                      <Monitor className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
                        {selectedProject.category}
                      </p>
                      <p className="text-sm text-muted-foreground">{selectedProject.year}</p>
                    </div>
                  </div>

                  <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                    {selectedProject.title}
                  </h1>

                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {selectedProject.fullDescription || selectedProject.description}
                  </p>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Client</p>
                        <p className="text-sm text-muted-foreground">{selectedProject.client}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Duration</p>
                        <p className="text-sm text-muted-foreground">{selectedProject.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Year</p>
                        <p className="text-sm text-muted-foreground">{selectedProject.year}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Target className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Category</p>
                        <p className="text-sm text-muted-foreground">{selectedProject.category}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative"
                >
                  <img 
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-96 object-cover rounded-lg shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-lg"></div>
                </motion.div>
              </div>

              {/* Project Overview Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-16"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-foreground mb-4">Project Overview</h2>
                  <p className="text-muted-foreground">
                    Discover the story behind this project, from initial challenges to final results.
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                        <Target className="h-5 w-5 text-orange-500" />
                        The Challenge
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedProject.challenge || "This project addressed complex technical challenges while maintaining excellent user experience and performance standards."}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                        <Rocket className="h-5 w-5 text-blue-500" />
                        My Role
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedProject.role} - Responsible for end-to-end development, from initial concept and design to deployment and maintenance.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        The Solution
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedProject.solution || "Implemented a comprehensive solution using modern technologies and best practices."}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 glass-card">
                        <GitBranch className="h-8 w-8 text-primary mx-auto mb-2" />
                        <p className="text-sm font-mono text-muted-foreground">Full Stack</p>
                      </div>
                      <div className="text-center p-4 glass-card">
                        <Code className="h-8 w-8 text-primary mx-auto mb-2" />
                        <p className="text-sm font-mono text-muted-foreground">Development</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Technologies Section */}
              {selectedProject.technologies && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="mb-16"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <Zap className="h-6 w-6 text-purple-500" />
                    <h2 className="text-2xl font-bold text-foreground">Technologies</h2>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedProject.technologies.map((tech: any, index: number) => (
                      <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-4 glass-card hover:bg-card/20 transition-all duration-300"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <div>
                          <p className="font-medium text-foreground">{tech.name}</p>
                          <p className="text-xs text-muted-foreground">{tech.type}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Features Section */}
              {selectedProject.features && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="mb-16"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <Star className="h-6 w-6 text-yellow-500" />
                    <h2 className="text-2xl font-bold text-foreground">Key Features</h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedProject.features.map((feature: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-4 glass-card hover:bg-card/20 transition-all duration-300"
                      >
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <p className="text-muted-foreground">{feature}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Visual Showcase */}
              {selectedProject.gallery && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="mb-16"
                >
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-foreground mb-4">Visual Showcase</h2>
                    <p className="text-muted-foreground">
                      Explore the visual design and user interface elements that bring this project to life.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {selectedProject.gallery.map((image: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 }}
                        className="relative group cursor-pointer"
                      >
                        <img 
                          src={image}
                          alt={`${selectedProject.title} screenshot ${index + 1}`}
                          className="w-full h-64 object-cover rounded-lg shadow-lg group-hover:shadow-2xl transition-all duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end">
                          <p className="text-white p-4 text-sm">View Screenshot {index + 1}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:scale-105 font-mono text-white border-0"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Project Details
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // Default Projects Section
  const featuredProjects = projects.slice(0, 4);

  return (
    <section id="projects" className="min-h-screen flex items-center section-padding py-24">
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
                className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
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
                onClick={handleExploreAll}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:scale-105 font-mono text-white border-0"
              >
                <Terminal className="h-4 w-4 mr-2" />
                explore --all --projects
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};