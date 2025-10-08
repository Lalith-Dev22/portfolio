import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Code, Star, Zap, Terminal, CheckCircle, Eye, Heart, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { SplineBackground } from "@/components/SplineBackground";

// Project data matching ProjectsSection format
const projects = [
  {
    id: 1,
    title: "AI-Powered HR Management System",
    description: "A comprehensive HR platform with AI-driven candidate screening, automated scheduling, and predictive analytics for workforce management.",
    image: "/src/Assets/AI-hr1.png",
    tags: ["React", "Node.js", "Python", "TensorFlow", "MongoDB", "AWS"],
    liveUrl: "https://hr-ai-demo.com",
    githubUrl: "https://github.com/lalith/hr-ai",
    status: "production",
    lines: "5.2k",
    commits: "68",
    category: "AI/ML",
    year: "2025",
    duration: "6 months",
    team: "4 developers",
    views: "2.4k",
    likes: "186",
    features: [
      "AI-powered resume screening",
      "Automated interview scheduling",
      "Performance analytics dashboard",
      "Employee onboarding automation"
    ]
  },
  {
    id: 2,
    title: "Smart Recruitment Dashboard",
    description: "Modern recruitment platform with real-time analytics, candidate tracking, and intelligent matching algorithms.",
    image: "/src/Assets/Ai-hr2.png",
    tags: ["React", "TypeScript", "Express.js", "PostgreSQL", "Redis"],
    liveUrl: "https://recruitment-smart.com",
    githubUrl: "https://github.com/lalith/recruitment-dashboard",
    status: "beta",
    lines: "3.8k",
    commits: "52",
    category: "Web App",
    year: "2024",
    duration: "4 months",
    team: "3 developers",
    views: "1.8k",
    likes: "142",
    features: [
      "Real-time candidate tracking",
      "Advanced search & filtering",
      "Interview scheduling system",
      "Analytics & reporting"
    ]
  },
  {
    id: 3,
    title: "Employee Performance Analytics",
    description: "Data visualization platform for tracking employee performance metrics with predictive insights and goal management.",
    image: "/src/Assets/Ai-hr3.png",
    tags: ["Vue.js", "D3.js", "Python", "FastAPI", "PostgreSQL"],
    liveUrl: "https://performance-analytics.com",
    githubUrl: "https://github.com/lalith/performance-analytics",
    status: "production",
    lines: "4.1k",
    commits: "63",
    category: "Analytics",
    year: "2024",
    duration: "5 months",
    team: "2 developers",
    views: "3.1k",
    likes: "234",
    features: [
      "Interactive data visualizations",
      "Performance trend analysis",
      "Goal tracking & management",
      "Custom reporting tools"
    ]
  },
  {
    id: 4,
    title: "HR Automation Suite",
    description: "Complete HR automation solution with workflow management, document processing, and compliance tracking.",
    image: "/src/Assets/Ai-hr4.png",
    tags: ["Angular", "Node.js", "MySQL", "Docker", "AWS Lambda"],
    liveUrl: "https://hr-automation.com",
    githubUrl: "https://github.com/lalith/hr-automation",
    status: "production",
    lines: "6.7k",
    commits: "89",
    category: "Enterprise",
    year: "2024",
    duration: "8 months",
    team: "5 developers",
    views: "4.2k",
    likes: "312",
    features: [
      "Workflow automation",
      "Document management",
      "Compliance tracking",
      "Integration APIs"
    ]
  },
  {
    id: 5,
    title: "Modern Portfolio Website",
    description: "A sleek, responsive portfolio website showcasing projects with advanced animations and modern design principles.",
    image: "/src/Assets/portfolio1.png",
    tags: ["React", "Framer Motion", "Tailwind CSS", "TypeScript"],
    liveUrl: "https://lalith-portfolio.com",
    githubUrl: "https://github.com/lalith/portfolio",
    status: "production",
    lines: "2.5k",
    commits: "42",
    category: "Portfolio",
    year: "2025",
    duration: "2 months",
    team: "1 developer",
    views: "5.7k",
    likes: "423",
    features: [
      "Responsive design",
      "Smooth animations",
      "Dark/Light mode",
      "SEO optimized"
    ]
  },
  {
    id: 6,
    title: "E-Commerce Platform",
    description: "Full-featured e-commerce solution with inventory management, payment processing, and customer analytics.",
    image: "/src/Assets/portfolio2.png",
    tags: ["Next.js", "Stripe", "Prisma", "PostgreSQL", "Vercel"],
    liveUrl: "https://ecommerce-demo.com",
    githubUrl: "https://github.com/lalith/ecommerce",
    status: "development",
    lines: "8.2k",
    commits: "124",
    category: "E-Commerce",
    year: "2024",
    duration: "10 months",
    team: "6 developers",
    views: "3.9k",
    likes: "287",
    features: [
      "Product catalog management",
      "Payment processing",
      "Order tracking",
      "Customer analytics"
    ]
  }
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

const ProjectsOverview = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "AI/ML", "Web App", "Analytics", "Enterprise", "Portfolio", "E-Commerce"];

  const codeSnippets = [
    '{ innovation: "∞", creativity: "unlimited" }',
    'while(coding) { dreams.push("reality"); }',
    'const magic = passion + code + design;',
    'function buildAmazing() { return "success"; }',
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Enhanced Fixed Background - Matching Home Section */}
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
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                opacity: 0,
              }}
              animate={{
                x: typeof window !== 'undefined' ? window.innerWidth + 200 : 1500,
                opacity: [0, 0.3, 0.3, 0],
              }}
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
      <div className="relative z-10">
        {/* Enhanced Header */}
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-6 border-b border-border/50 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="order-1"
            >
              <Button
                variant="ghost"
                onClick={() => navigate("/home")}
                className="flex items-center gap-2 hover:bg-primary/10 glass-card backdrop-blur-md border-primary/20 font-mono text-xs sm:text-sm"
                size="sm"
              >
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Back to Portfolio</span>
                <span className="xs:hidden">Back</span>
              </Button>
            </motion.div>
            
            <motion.div
              className="text-center flex-1 order-2 sm:order-2 w-full sm:w-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient mb-2">
                Project Showcase
              </h1>
              <p className="text-muted-foreground text-xs sm:text-sm md:text-base font-mono">
                Crafting digital experiences with passion and precision
              </p>
            </motion.div>
            
            {/* Spacer for desktop layout balance */}
            <div className="hidden sm:block w-24 order-3" />
          </div>

          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap gap-2 py-6 justify-center px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-background/60 backdrop-blur-sm border border-border/50 hover:bg-primary/10 hover:border-primary/30"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Enhanced Projects Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 60 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                className="glass-card overflow-hidden group hover:bg-card/20 transition-all duration-500 relative border border-primary/10 hover:border-primary/30 cursor-pointer"
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                {/* Terminal Header */}
                <div className="flex items-center justify-between p-3 sm:p-4 bg-card/40 border-b border-primary/10">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    <div className="flex gap-1.5 sm:gap-2 flex-shrink-0">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/60"></div>
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/60"></div>
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/60"></div>
                    </div>
                    <span className="text-xs sm:text-sm font-mono text-muted-foreground truncate">
                      {project.title.toLowerCase().replace(/\s+/g, "-").substring(0, 20)}.tsx
                    </span>
                  </div>
                  <div className="flex-shrink-0">
                    <StatusBadge status={project.status} />
                  </div>
                </div>

                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-40 sm:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
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

                  {/* Stats Overlay */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
                      <Eye className="h-3 w-3 text-primary" />
                      <span className="text-xs font-medium">{project.views}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
                      <Heart className="h-3 w-3 text-red-400" />
                      <span className="text-xs font-medium">{project.likes}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  {/* Code Stats */}
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

                  {/* Project Info */}
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 font-mono flex items-center gap-2 leading-tight">
                      <span className="line-clamp-2">{project.title}</span>
                      {project.status === "production" && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="flex-shrink-0"
                        >
                          <Award className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400" />
                        </motion.div>
                      )}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
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

                  {/* Project Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    <div className="flex items-center gap-2 p-2 sm:p-3 rounded-lg bg-gradient-to-r from-primary/10 to-purple/10 border border-primary/20">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs text-muted-foreground">Duration</div>
                        <div className="text-xs sm:text-sm font-medium text-foreground truncate">{project.duration}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 sm:p-3 rounded-lg bg-gradient-to-r from-purple/10 to-pink/10 border border-purple/20">
                      <Users className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs text-muted-foreground">Team</div>
                        <div className="text-xs sm:text-sm font-medium text-foreground truncate">{project.team}</div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Grid Pattern Overlay */}
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
            ))}
          </motion.div>

          {/* Enhanced Call to Action */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="relative max-w-4xl mx-auto">
              {/* Background Glow */}
              <div className="absolute inset-0 -z-10">
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full opacity-20 blur-3xl"
                  style={{
                    background: `conic-gradient(from 0deg, hsl(173 80% 40%), hsl(280 80% 50%), hsl(173 80% 40%))`,
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none z-20">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsOverview;