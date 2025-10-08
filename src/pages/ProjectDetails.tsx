import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Code, Star, Zap, Award, CheckCircle, Target, Rocket, Globe, Database, Palette, Monitor, Smartphone, Shield, Play, Download, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { SplineBackground } from "@/components/SplineBackground";
import CardFlip from "@/components/mvpblocks/card-flip";
import { useState, useEffect } from "react";

// Enhanced project data with detailed information
const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A modern, responsive portfolio website built with React and Framer Motion animations.",
    fullDescription: "A professionally designed portfolio website showcasing my skills, projects, and experience. Features smooth animations, responsive design, and interactive elements to create an engaging user experience. Built with modern web technologies to ensure performance and accessibility.",
    image: "/src/Assets/portfolio1.png",
    bannerImage: "/src/Assets/portfolio1.png",
    screenshots: ["/src/Assets/portfolio1.png", "/src/Assets/portfolio4.png", "/src/Assets/portfolio5.png", "/src/Assets/portfolio2.png"],
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    liveUrl: "#",
    githubUrl: "#",
    status: "production",
    lines: "2.5k",
    commits: "42",
    category: "WEB DEVELOPMENT",
    year: "2025",
    duration: "4 weeks",
    team: "Solo Developer",
    views: "1.2k",
    likes: "89",
    myRole: "Full Stack Developer & UI/UX Designer",
    roleDescription: "Designed and developed the entire portfolio website from concept to deployment. Created a modern, responsive design system, implemented smooth animations with Framer Motion, and optimized for performance and accessibility across all devices.",
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
    features: [
      "Responsive design for all devices",
      "Smooth page transitions and animations",
      "Interactive project showcases",
      "Dark/light mode toggle",
      "Contact form integration",
      "Optimized performance metrics"
    ],
    techStack: [
      { name: "React", category: "Frontend", description: "Component-based UI development" },
      { name: "TypeScript", category: "Language", description: "Type-safe development" },
      { name: "Tailwind CSS", category: "Styling", description: "Utility-first CSS framework" },
      { name: "Framer Motion", category: "Animation", description: "Smooth animations and transitions" },
      { name: "Vite", category: "Build Tool", description: "Fast development and build process" }
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
    ]
  },
  {
    id: 2,
    title: "AI-Powered HR Management System",
    description: "A comprehensive HR platform with AI-driven candidate screening, automated scheduling, and predictive analytics for workforce management.",
    fullDescription: "AI-HR is a revolutionary human resource management platform that leverages artificial intelligence to transform traditional HR processes. The system provides intelligent candidate screening, automated interview scheduling, predictive analytics for employee retention, and comprehensive workforce management tools.",
    image: "/src/Assets/AI-hr1.png",
    bannerImage: "/src/Assets/AI-hr1.png",
    screenshots: ["/src/Assets/AI-hr1.png", "/src/Assets/Ai-hr2.png", "/src/Assets/AI-hr3.png", "/src/Assets/Ai-hr4.png"],
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
    myRole: "Lead Full-Stack Developer & AI Engineer",
    roleDescription: "Led the development of the entire platform from conception to deployment. Designed and implemented the AI algorithms for resume screening, developed the backend APIs, created the responsive frontend interface, and integrated machine learning models for predictive analytics.",
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
    features: [
      "AI-powered resume screening with 95% accuracy",
      "Automated interview scheduling with calendar integration",
      "Performance analytics dashboard with predictive insights",
      "Employee onboarding automation",
      "Real-time collaboration tools",
      "Advanced reporting and analytics"
    ],
    techStack: [
      { name: "React", category: "Frontend", description: "Modern UI with hooks and context" },
      { name: "Node.js", category: "Backend", description: "RESTful APIs and microservices" },
      { name: "Python", category: "AI/ML", description: "Machine learning models and data processing" },
      { name: "TensorFlow", category: "AI/ML", description: "Neural networks for resume analysis" },
      { name: "MongoDB", category: "Database", description: "Document storage for flexible data" },
      { name: "AWS", category: "Cloud", description: "Lambda, S3, and EC2 for scalability" }
    ],
    metrics: {
      performance: 98,
      userSatisfaction: 95,
      codeQuality: 92,
      testCoverage: 88
    },
    timeline: [
      { phase: "Research & Planning", duration: "2 weeks", status: "completed" },
      { phase: "MVP Development", duration: "8 weeks", status: "completed" },
      { phase: "AI Integration", duration: "6 weeks", status: "completed" },
      { phase: "Testing & Optimization", duration: "4 weeks", status: "completed" },
      { phase: "Deployment & Launch", duration: "2 weeks", status: "completed" }
    ]
  },
  {
    id: 3,
    title: "E-Commerce Dashboard",
    description: "Comprehensive admin dashboard for e-commerce management with real-time analytics and inventory tracking.",
    fullDescription: "A powerful administrative dashboard designed for e-commerce businesses to manage products, orders, customers, and analytics. Features real-time data visualization, inventory management, sales tracking, and comprehensive reporting tools.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    bannerImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop"
    ],
    tags: ["Vue.js", "Express.js", "PostgreSQL", "Redis", "Chart.js"],
    liveUrl: "#",
    githubUrl: "#",
    status: "beta",
    lines: "4.1k",
    commits: "55",
    category: "E-COMMERCE",
    year: "2024",
    duration: "8 weeks",
    team: "3 developers",
    views: "1.8k",
    likes: "127",
    myRole: "Frontend Lead & UX Designer",
    roleDescription: "Led the frontend development team in creating an intuitive and powerful dashboard interface. Designed the user experience, implemented complex data visualizations, and ensured responsive design across all devices.",
    challenges: [
      {
        title: "Performance with Large Datasets",
        description: "Displaying thousands of products and orders without impacting user experience or browser performance.",
        solution: "Implemented virtual scrolling, pagination, and lazy loading. Used indexed database queries and data caching strategies."
      },
      {
        title: "Real-time Updates",
        description: "Ensuring inventory and order data stays synchronized across multiple admin users in real-time.",
        solution: "Integrated WebSocket connections for live updates and implemented optimistic UI updates with rollback capabilities."
      },
      {
        title: "Complex Data Relationships",
        description: "Managing complex relationships between products, orders, customers, and inventory across multiple views.",
        solution: "Designed a normalized state management system using Vuex with proper data normalization and relationship mapping."
      }
    ],
    features: [
      "Real-time sales analytics dashboard",
      "Inventory management with low stock alerts",
      "Order processing and fulfillment tracking",
      "Customer relationship management",
      "Advanced reporting and export features",
      "Multi-user access with role-based permissions"
    ],
    techStack: [
      { name: "Vue.js", category: "Frontend", description: "Progressive web framework for UI" },
      { name: "Express.js", category: "Backend", description: "Node.js web application framework" },
      { name: "PostgreSQL", category: "Database", description: "Relational database for complex queries" },
      { name: "Redis", category: "Cache", description: "In-memory data structure store" },
      { name: "Chart.js", category: "Visualization", description: "Interactive charts and graphs" }
    ],
    metrics: {
      performance: 91,
      userSatisfaction: 87,
      codeQuality: 89,
      testCoverage: 82
    },
    timeline: [
      { phase: "Requirements Analysis", duration: "1 week", status: "completed" },
      { phase: "UI/UX Design", duration: "2 weeks", status: "completed" },
      { phase: "Core Development", duration: "4 weeks", status: "completed" },
      { phase: "Integration & Testing", duration: "2 weeks", status: "completed" },
      { phase: "Beta Release", duration: "1 week", status: "completed" }
    ]
  },
  {
    id: 2,
    title: "Smart Recruitment Dashboard",
    description: "Modern recruitment platform with real-time analytics, candidate tracking, and intelligent matching algorithms.",
    fullDescription: "A sophisticated recruitment platform designed to streamline the hiring process with intelligent candidate matching, real-time analytics, and comprehensive tracking capabilities. The system provides recruiters with powerful tools to manage the entire recruitment lifecycle efficiently.",
    image: "/src/Assets/Ai-hr2.png",
    bannerImage: "/src/Assets/Ai-hr2.png",
    screenshots: ["/src/Assets/Ai-hr2.png", "/src/Assets/AI-hr1.png", "/src/Assets/Ai-hr4.png"],
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
    myRole: "Frontend Lead & System Architect",
    roleDescription: "Architected the entire frontend system, designed the user experience, implemented real-time features, and led the development of the matching algorithm interface.",
    challenges: [
      {
        title: "Real-time Data Synchronization",
        description: "Implementing real-time updates across multiple users viewing the same candidate data simultaneously.",
        solution: "Used WebSocket connections with Redis pub/sub for real-time updates and implemented optimistic UI updates."
      },
      {
        title: "Complex Search & Filtering",
        description: "Building an advanced search system that could handle complex boolean queries and filters efficiently.",
        solution: "Implemented Elasticsearch for full-text search with custom analyzers and built a visual query builder interface."
      }
    ],
    features: [
      "Real-time candidate tracking",
      "Advanced search & filtering",
      "Interview scheduling system",
      "Analytics & reporting",
      "Candidate communication hub",
      "Team collaboration tools"
    ],
    techStack: [
      { name: "React", category: "Frontend", description: "Component-based UI architecture" },
      { name: "TypeScript", category: "Language", description: "Type-safe development" },
      { name: "Express.js", category: "Backend", description: "RESTful API development" },
      { name: "PostgreSQL", category: "Database", description: "Relational data storage" },
      { name: "Redis", category: "Cache", description: "Session management and caching" }
    ],
    metrics: {
      performance: 94,
      userSatisfaction: 89,
      codeQuality: 95,
      testCoverage: 85
    },
    timeline: [
      { phase: "Design & Prototyping", duration: "3 weeks", status: "completed" },
      { phase: "Core Development", duration: "10 weeks", status: "completed" },
      { phase: "Testing & Refinement", duration: "3 weeks", status: "completed" },
      { phase: "Beta Launch", duration: "1 week", status: "completed" }
    ]
  }
];

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  const project = projects.find(p => p.id === parseInt(id || "0"));

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Project Not Found</h1>
          <Button onClick={() => navigate("/projects")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreenshot((prev) => (prev + 1) % project.screenshots.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [project.screenshots.length]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Banner */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="fixed inset-0 z-0">
          <SplineBackground className="opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/50 to-accent/20" />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-primary/10 rounded-full"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 4) * 20}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                delay: i * 0.7,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 py-20">
          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-6 left-6"
          >
            <Button
              variant="ghost"
              onClick={() => navigate("/projects")}
              className="glass-card backdrop-blur-md border-primary/20 hover:border-primary/40"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Status Badge */}
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary">
                  {project.category}
                </Badge>
                <Badge variant="outline" className={`
                  ${project.status === 'production' ? 'bg-green-500/10 border-green-500/30 text-green-400' : ''}
                  ${project.status === 'beta' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' : ''}
                  ${project.status === 'development' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : ''}
                `}>
                  {project.status}
                </Badge>
              </div>

              {/* Title */}
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gradient leading-tight">
                  {project.title}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-6">
                <Card className="glass-card border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Code className="h-8 w-8 text-primary" />
                      <div>
                        <p className="text-2xl font-bold text-foreground">{project.lines}</p>
                        <p className="text-sm text-muted-foreground">Lines of Code</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="glass-card border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Users className="h-8 w-8 text-purple-400" />
                      <div>
                        <p className="text-2xl font-bold text-foreground">{project.team}</p>
                        <p className="text-sm text-muted-foreground">Team Size</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Right Content - Project Banner/Screenshots */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative group">
                {/* Main Image */}
                <div className="relative overflow-hidden rounded-2xl glass-card border-primary/20">
                  <img
                    src={project.screenshots[currentScreenshot]}
                    alt={`${project.title} Screenshot ${currentScreenshot + 1}`}
                    className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  {/* Screenshot Navigation */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {project.screenshots.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentScreenshot(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === currentScreenshot 
                            ? 'bg-primary scale-125' 
                            : 'bg-white/40 hover:bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Floating Stats */}
                <div className="absolute -bottom-6 -right-6 grid grid-cols-2 gap-4">
                  <Card className="glass-card border-primary/20 p-3">
                    <div className="text-center">
                      <Star className="h-5 w-5 text-yellow-400 mx-auto mb-1" />
                      <p className="text-sm font-medium">{project.likes}</p>
                    </div>
                  </Card>
                  <Card className="glass-card border-primary/20 p-3">
                    <div className="text-center">
                      <Globe className="h-5 w-5 text-green-400 mx-auto mb-1" />
                      <p className="text-sm font-medium">{project.views}</p>
                    </div>
                  </Card>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-20">
        <div className="container mx-auto px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-5 glass-card bg-background/50 border-primary/20">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="role">My Role</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
              <TabsTrigger value="tech">Tech Stack</TabsTrigger>
              <TabsTrigger value="metrics">Metrics</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid lg:grid-cols-3 gap-8"
              >
                {/* Project Timeline */}
                <div className="lg:col-span-2 space-y-6">
                  <Card className="glass-card border-primary/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        Project Timeline
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {project.timeline.map((phase, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full ${
                            phase.status === 'completed' ? 'bg-green-400' : 'bg-gray-400'
                          }`} />
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{phase.phase}</p>
                            <p className="text-sm text-muted-foreground">{phase.duration}</p>
                          </div>
                          <CheckCircle className={`h-5 w-5 ${
                            phase.status === 'completed' ? 'text-green-400' : 'text-gray-400'
                          }`} />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Features */}
                  <Card className="glass-card border-primary/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-primary" />
                        Key Features
                      </CardTitle>
                      <CardDescription>
                        Discover the powerful features that make this project stand out
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {project.features.map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-primary/5 via-purple/5 to-pink/5 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg cursor-pointer"
                          >
                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <CheckCircle className="h-4 w-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{feature}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Interactive Feature Cards */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <CardFlip
                      title="High Performance"
                      subtitle="Optimized for speed"
                      description="Built with performance in mind, delivering lightning-fast user experiences."
                      features={["99.9% Uptime", "Sub-second Loading", "Optimized Assets", "CDN Integration"]}
                    />
                    <CardFlip
                      title="Scalable Architecture"
                      subtitle="Ready for growth"
                      description="Designed to handle millions of users with horizontal scaling capabilities."
                      features={["Microservices", "Load Balancing", "Auto Scaling", "Global CDN"]}
                    />
                    <CardFlip
                      title="Security First"
                      subtitle="Enterprise grade"
                      description="Implementing best-in-class security measures and compliance standards."
                      features={["End-to-End Encryption", "GDPR Compliant", "SOC2 Certified", "Multi-Factor Auth"]}
                    />
                  </div>
                </div>

                {/* Project Info Sidebar */}
                <div className="space-y-6">
                  <Card className="glass-card border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-lg">Project Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration</span>
                        <span className="font-medium">{project.duration}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Year</span>
                        <span className="font-medium">{project.year}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Team Size</span>
                        <span className="font-medium">{project.team}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Lines of Code</span>
                        <span className="font-medium">{project.lines}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Commits</span>
                        <span className="font-medium">{project.commits}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>

            {/* My Role Tab */}
            <TabsContent value="role" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="glass-card border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Rocket className="h-6 w-6 text-primary" />
                      {project.myRole}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {project.roleDescription}
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center p-6 rounded-lg bg-gradient-to-br from-primary/10 to-purple/10 border border-primary/20">
                        <Code className="h-12 w-12 text-primary mx-auto mb-4" />
                        <h3 className="font-semibold text-foreground mb-2">Development</h3>
                        <p className="text-sm text-muted-foreground">Full-stack development and architecture design</p>
                      </div>
                      <div className="text-center p-6 rounded-lg bg-gradient-to-br from-purple/10 to-pink/10 border border-purple/20">
                        <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                        <h3 className="font-semibold text-foreground mb-2">Leadership</h3>
                        <p className="text-sm text-muted-foreground">Team coordination and project management</p>
                      </div>
                      <div className="text-center p-6 rounded-lg bg-gradient-to-br from-pink/10 to-red/10 border border-pink/20">
                        <Target className="h-12 w-12 text-pink-400 mx-auto mb-4" />
                        <h3 className="font-semibold text-foreground mb-2">Strategy</h3>
                        <p className="text-sm text-muted-foreground">Technical decision making and planning</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Challenges Tab */}
            <TabsContent value="challenges" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {project.challenges.map((challenge, index) => (
                  <Card key={index} className="glass-card border-primary/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-red-400" />
                        {challenge.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Challenge:</h4>
                        <p className="text-muted-foreground">{challenge.description}</p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          Solution:
                        </h4>
                        <p className="text-muted-foreground">{challenge.solution}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </TabsContent>

            {/* Tech Stack Tab */}
            <TabsContent value="tech" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {project.techStack.map((tech, index) => (
                    <Card key={index} className="glass-card border-primary/20 hover:border-primary/40 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-foreground">{tech.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              {tech.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{tech.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            {/* Metrics Tab */}
            <TabsContent value="metrics" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Performance Overview */}
                <Card className="glass-card border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      Performance Metrics
                    </CardTitle>
                    <CardDescription>
                      Real-time performance indicators and project statistics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-8">
                      {Object.entries(project.metrics).map(([key, value], index) => {
                        const icons = {
                          performance: Monitor,
                          userSatisfaction: Users,
                          codeQuality: Code,
                          testCoverage: Shield
                        };
                        const IconComponent = icons[key as keyof typeof icons] || Target;
                        
                        return (
                          <motion.div
                            key={key}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                          >
                            <Card className="glass-card border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
                              <CardContent className="p-6">
                                <div className="space-y-4">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <IconComponent className="h-5 w-5 text-white" />
                                      </div>
                                      <h3 className="font-semibold text-foreground capitalize">
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                      </h3>
                                    </div>
                                    <motion.span 
                                      className="text-3xl font-bold text-primary"
                                      initial={{ opacity: 0 }}
                                      whileInView={{ opacity: 1 }}
                                      transition={{ delay: index * 0.1 + 0.3 }}
                                    >
                                      {value}%
                                    </motion.span>
                                  </div>
                                  <div className="space-y-2">
                                    <Progress value={value} className="h-3" />
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                      <span>0%</span>
                                      <span>100%</span>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Stats */}
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    { label: "Total Downloads", value: "45.2K", icon: Download, color: "text-green-400" },
                    { label: "GitHub Stars", value: "1.2K", icon: Star, color: "text-yellow-400" },
                    { label: "Active Users", value: "8.7K", icon: Users, color: "text-blue-400" },
                    { label: "Uptime", value: "99.9%", icon: Rocket, color: "text-purple-400" }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="glass-card border-primary/20 hover:border-primary/30 transition-all duration-300 group cursor-pointer">
                        <CardContent className="p-6 text-center">
                          <div className="space-y-4">
                            <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-purple/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                            <div>
                              <p className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{stat.value}</p>
                              <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetails;