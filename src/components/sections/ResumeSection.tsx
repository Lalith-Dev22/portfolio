import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Download, Calendar, MapPin, Building2, GraduationCap, Briefcase, Award, User } from 'lucide-react';

const resumeData = {
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "Bengaluru North University (BNU)",
      period: "2021 - 2025",
      location: "Bengaluru, Karnataka, India",
      gpa: "—",
      relevant: ["Web Development", "Data Structures", "Operating Systems", "AI & ML", "DBMS"]
    }
  ],
  experience: [
    {
      title: "Developer Intern",
      company: "Dhruthzuci Tech Solutions",
      period: "Oct 2024 – Feb 2025",
      location: "Remote",
      type: "Internship",
      description: "Built internal platforms for intern management and static sites during my full stack internship.",
      achievements: [
        "Developed a real-time intern check-in/check-out system using React-Bootstrap and Node.js",
        "Created a task monitoring dashboard with real-time tracking and filtering",
        "Built a static perfume shop site integrated with Firebase for product management",
        "Integrated REST APIs into internal tools for better data flow"
      ],
      technologies: ["React", "Bootstrap", "Node.js", "Firebase", "MongoDB"]
    }
  ],
  skills: {
    frontend: ["React", "Bootstrap", "Tailwind CSS", "HTML5", "CSS3", "JavaScript"],
    backend: ["Node.js", "Express.js", "PHP", "Firebase", "MongoDB", "MySQL"],
    tools: ["Git", "Postman", "VS Code", "Netlify", "Render", "Figma"],
    soft: ["Problem Solving", "Adaptability", "Communication", "Time Management"]
  },
  projects: [
    {
      title: "Check-In/Check-Out System",
      description: "A real-time intern time tracking tool with activity logging and reporting features.",
      technologies: ["React-Bootstrap", "Node.js", "MongoDB"],
      link: "#",
      featured: true
    },
    {
      title: "Support Ticket Platform",
      description: "Internal tool for managing and resolving employee-raised tickets with comments and status.",
      technologies: ["React", "Express.js", "MongoDB"],
      link: "#",
      featured: true
    },
    {
      title: "Perfume Shop Static Website",
      description: "Static e-commerce showcase site using Firebase for dynamic product data handling.",
      technologies: ["HTML", "CSS", "Firebase"],
      link: "#",
      featured: false
    }
  ]
};


export const ResumeSection = () => {
  return (
    <section id="resume" className="min-h-screen flex items-center section-padding py-16 sm:py-24">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="space-y-12 sm:space-y-16"
        >
          {/* Header */}
          <div className="text-center space-y-4 sm:space-y-6">
            <motion.h2 
              className="text-3xl sm:text-5xl md:text-7xl font-bold text-gradient"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Resume
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              A comprehensive overview of my professional journey and expertise
            </motion.p>
            
            {/* Download Resume Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-4"
            >
              <Button 
                size="lg"
                className="bg-gradient-primary hover:shadow-glow transition-all duration-500 hover:scale-105 text-sm sm:text-base"
              >
                <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Download Resume
              </Button>
            </motion.div>
          </div>

          {/* Resume Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Tabs defaultValue="experience" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto p-1 bg-card/50 backdrop-blur-lg">
                <TabsTrigger value="experience" className="text-xs sm:text-sm py-2 sm:py-3">
                  <Briefcase className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Experience</span>
                  <span className="sm:hidden">Exp</span>
                </TabsTrigger>
                <TabsTrigger value="education" className="text-xs sm:text-sm py-2 sm:py-3">
                  <GraduationCap className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Education</span>
                  <span className="sm:hidden">Edu</span>
                </TabsTrigger>
                <TabsTrigger value="skills" className="text-xs sm:text-sm py-2 sm:py-3">
                  <Award className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Skills</span>
                  <span className="sm:hidden">Skills</span>
                </TabsTrigger>
                <TabsTrigger value="projects" className="text-xs sm:text-sm py-2 sm:py-3">
                  <User className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Projects</span>
                  <span className="sm:hidden">Proj</span>
                </TabsTrigger>
              </TabsList>

              {/* Experience Tab */}
              <TabsContent value="experience" className="mt-6 sm:mt-8">
                <div className="space-y-4 sm:space-y-6">
                  {resumeData.experience.map((exp, index) => (
                    <motion.div
                      key={exp.title}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                    >
                      <Card className="glass-card hover:bg-card/20 transition-all duration-500">
                        <CardHeader className="pb-3 sm:pb-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                            <div className="space-y-1">
                              <CardTitle className="text-lg sm:text-xl text-foreground">{exp.title}</CardTitle>
                              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Building2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                  <span>{exp.company}</span>
                                </div>
                                <span className="hidden sm:inline">•</span>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                                  <span>{exp.location}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col sm:items-end gap-1 sm:gap-2">
                              <div className="flex items-center gap-1 text-xs sm:text-sm text-primary font-medium">
                                <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                                {exp.period}
                              </div>
                              <Badge variant="secondary" className="text-xs w-fit">
                                {exp.type}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3 sm:space-y-4">
                          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                            {exp.description}
                          </p>
                          
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm sm:text-base text-foreground">Key Achievements:</h4>
                            <ul className="space-y-1 sm:space-y-2">
                              {exp.achievements.map((achievement, achIndex) => (
                                <li key={achIndex} className="flex items-start space-x-2 sm:space-x-3">
                                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                                  <span className="text-xs sm:text-sm text-muted-foreground">{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {exp.technologies.map((tech) => (
                              <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Education Tab */}
              <TabsContent value="education" className="mt-6 sm:mt-8">
                <div className="space-y-4 sm:space-y-6">
                  {resumeData.education.map((edu, index) => (
                    <motion.div
                      key={edu.degree}
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                    >
                      <Card className="glass-card hover:bg-card/20 transition-all duration-500">
                        <CardHeader>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                            <div className="space-y-1">
                              <CardTitle className="text-lg sm:text-xl text-foreground">{edu.degree}</CardTitle>
                              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4" />
                                  <span>{edu.school}</span>
                                </div>
                                <span className="hidden sm:inline">•</span>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                                  <span>{edu.location}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col sm:items-end gap-1">
                              <div className="flex items-center gap-1 text-xs sm:text-sm text-primary font-medium">
                                <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                                {edu.period}
                              </div>
                              {edu.gpa && (
                                <Badge variant="secondary" className="text-xs w-fit">
                                  GPA: {edu.gpa}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm sm:text-base text-foreground">Relevant Coursework:</h4>
                            <div className="flex flex-wrap gap-1 sm:gap-2">
                              {edu.relevant.map((course) => (
                                <Badge key={course} variant="outline" className="text-xs">
                                  {course}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Skills Tab */}
              <TabsContent value="skills" className="mt-6 sm:mt-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {Object.entries(resumeData.skills).map(([category, skills], index) => (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="glass-card h-full">
                        <CardHeader className="pb-3 sm:pb-4">
                          <CardTitle className="text-base sm:text-lg text-primary capitalize">
                            {category === 'soft' ? 'Soft Skills' : `${category} ${category === 'frontend' || category === 'backend' ? 'Technologies' : 'Skills'}`}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {skills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Projects Tab */}
              <TabsContent value="projects" className="mt-6 sm:mt-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {resumeData.projects.map((project, index) => (
                    <motion.div
                      key={project.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="glass-card h-full hover:bg-card/20 transition-all duration-500 group">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base sm:text-lg text-foreground group-hover:text-primary transition-colors">
                              {project.title}
                            </CardTitle>
                            {project.featured && (
                              <Badge className="bg-gradient-primary text-xs">
                                Featured
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3 sm:space-y-4">
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {project.technologies.map((tech) => (
                              <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};