import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  User,
  Clock,
  Target,
  CheckCircle,
  Code,
  Database,
  Palette,
  Globe,
  Smartphone,
  Shield,
  Rocket,
  Layers,
  ChevronLeft,
  ChevronRight,
  Share2,
  Heart,
  Star
} from 'lucide-react';

// Sample projects data (in a real app, this would come from an API)
const projects = [
  {
    id: 1,
    title: "Check-In/Check-Out System",
    tagline: "Real-time intern time tracking with secure authentication",
    description: "A comprehensive time tracking solution designed specifically for intern management. The system features real-time clock-in/out functionality, secure authentication, automated session management, and detailed reporting capabilities.",
    category: "WEB DEVELOPMENT",
    year: "2024",
    duration: "3 weeks",
    client: "Internal Project",
    role: "Full Stack Developer",
    status: "production",
    overview: "Built a scalable time tracking system that handles concurrent users while maintaining data accuracy and providing comprehensive reporting for intern management. The application focuses on user experience and reliability.",
    problemSolved: "Organizations struggled with manual time tracking processes that were prone to errors and difficult to audit. Our solution automated the entire process while providing transparency and accountability.",
    keyFeatures: [
      {
        title: "Real-time Clock Management",
        description: "Instant clock-in/out with WebSocket connections",
        icon: Clock
      },
      {
        title: "Secure Authentication",
        description: "JWT-based authentication with role management",
        icon: Shield
      },
      {
        title: "Session Management",
        description: "Automated session handling and validation",
        icon: Database
      },
      {
        title: "Reporting Dashboard",
        description: "Comprehensive analytics and time reports",
        icon: Target
      },
      {
        title: "Multi-user Support",
        description: "Concurrent user handling with real-time updates",
        icon: User
      }
    ],
    technologies: [
      { name: "React Bootstrap", type: "Frontend", color: "bg-blue-500" },
      { name: "Node.js", type: "Backend", color: "bg-green-500" },
      { name: "MongoDB", type: "Database", color: "bg-emerald-500" },
      { name: "JWT", type: "Authentication", color: "bg-purple-500" },
      { name: "Socket.io", type: "Real-time", color: "bg-orange-500" }
    ],
    whatILearned: "This project taught me the importance of real-time data synchronization and user state management. I gained expertise in WebSocket implementation, JWT authentication patterns, and building scalable backend architectures. The experience also highlighted the critical nature of data validation in time-sensitive applications.",
    gallery: [
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop"
    ],
    liveUrl: "https://checkin-system-demo.vercel.app",
    githubUrl: "https://github.com/username/checkin-system"
  },
  {
    id: 2,
    title: "Support Ticket Platform",
    tagline: "Streamlined customer support with intelligent ticket management",
    description: "A comprehensive ticket management system that streamlines customer support operations with advanced filtering, real-time notifications, and automated workflows.",
    category: "WEB APPLICATION",
    year: "2024",
    duration: "4 weeks",
    client: "Enterprise Client",
    role: "Lead Developer",
    status: "beta",
    overview: "Developed a scalable support platform that reduces response times and improves customer satisfaction through intelligent ticket routing and comprehensive tracking capabilities.",
    problemSolved: "Customer support teams were overwhelmed with unorganized ticket requests, leading to delayed responses and poor customer experience. Our platform provides structure, automation, and visibility.",
    keyFeatures: [
      {
        title: "Smart Ticket Routing",
        description: "AI-powered ticket assignment to appropriate agents",
        icon: Target
      },
      {
        title: "Real-time Notifications",
        description: "Instant updates on ticket status changes",
        icon: Rocket
      },
      {
        title: "Advanced Analytics",
        description: "Performance metrics and response time tracking",
        icon: Database
      },
      {
        title: "Multi-channel Support",
        description: "Email, chat, and web form integration",
        icon: Globe
      },
      {
        title: "Priority Management",
        description: "Automated priority assignment and escalation",
        icon: Star
      }
    ],
    technologies: [
      { name: "React", type: "Frontend", color: "bg-blue-500" },
      { name: "Express.js", type: "Backend", color: "bg-gray-600" },
      { name: "MongoDB", type: "Database", color: "bg-emerald-500" },
      { name: "Redis", type: "Caching", color: "bg-red-500" },
      { name: "Nodemailer", type: "Email Service", color: "bg-purple-500" }
    ],
    whatILearned: "This project enhanced my understanding of complex state management and real-time communication patterns. I learned to implement efficient caching strategies with Redis and gained experience in building scalable email notification systems.",
    gallery: [
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
    ],
    liveUrl: "https://support-platform-demo.vercel.app",
    githubUrl: "https://github.com/username/support-platform"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

export const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  
  const project = projects.find(p => p.id === parseInt(id || '1'));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Project Not Found</h1>
          <Button onClick={() => navigate('/home')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Button>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-background"
    >
      {/* Sticky Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-primary/10"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/home')}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-mono group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Portfolio
            </Button>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? "text-red-500" : "text-muted-foreground"}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <Badge variant="secondary" className="font-mono text-xs">
                  {project.category}
                </Badge>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  {project.title}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.tagline}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{project.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{project.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{project.role}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button asChild className="group">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                    Live Demo
                  </a>
                </Button>
                <Button variant="outline" asChild className="group">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                    View Code
                  </a>
                </Button>
              </div>
            </div>

            {/* Image Carousel */}
            <div className="relative group">
              <div className="relative overflow-hidden rounded-2xl bg-card/20 backdrop-blur-sm border border-primary/10">
                <motion.img
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  src={project.gallery[currentImageIndex]}
                  alt={`${project.title} - Screenshot ${currentImageIndex + 1}`}
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                />
                
                {/* Navigation Arrows */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Image Indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {project.gallery.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? 'bg-primary w-8'
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="problem">Problem</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="tech">Tech Stack</TabsTrigger>
              <TabsTrigger value="learning">Learning</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Project Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.overview}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 mt-6">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground">Client</h4>
                      <p className="text-sm text-muted-foreground">{project.client}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground">My Role</h4>
                      <p className="text-sm text-muted-foreground">{project.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="problem" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Rocket className="h-5 w-5 text-primary" />
                    Problem Solved
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.problemSolved}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {project.keyFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:bg-card/50 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <feature.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-semibold text-foreground">{feature.title}</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tech" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    Technologies Used
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {project.technologies.map((tech, index) => (
                      <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-card/30 border border-primary/10"
                      >
                        <div className={`w-3 h-3 rounded-full ${tech.color}`} />
                        <div>
                          <p className="font-medium text-foreground">{tech.name}</p>
                          <p className="text-xs text-muted-foreground">{tech.type}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="learning" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    What I Learned
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.whatILearned}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center space-y-6 p-8 rounded-2xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10"
        >
          <h3 className="text-2xl font-bold text-foreground">
            Interested in working together?
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I'm always excited to take on new challenges and collaborate on innovative projects.
            Let's discuss how we can bring your ideas to life.
          </p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => navigate('/home')} className="group">
              <User className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              View All Projects
            </Button>
            <Button variant="outline" onClick={() => navigate('/home')}>
              Get In Touch
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};