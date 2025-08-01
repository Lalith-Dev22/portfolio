import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: "Frontend Development",
    skills: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Three.js", level: 80 },
    ]
  },
  {
    title: "Design & Animation",
    skills: [
      { name: "Figma", level: 90 },
      { name: "Framer Motion", level: 85 },
      { name: "GSAP", level: 80 },
      { name: "Blender", level: 75 },
      { name: "After Effects", level: 70 },
    ]
  },
  {
    title: "Backend & Tools",
    skills: [
      { name: "Node.js", level: 80 },
      { name: "GraphQL", level: 75 },
      { name: "Docker", level: 70 },
      { name: "Git", level: 95 },
      { name: "Webpack", level: 80 },
    ]
  }
];

export const SkillsSection = () => {
  return (
    <section id="skills" className="min-h-screen flex items-center section-padding py-16 sm:py-24">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
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
              Skills & Expertise
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              A diverse toolkit for bringing digital visions to life
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                className="glass-card p-8 space-y-6"
              >
                <h3 className="text-2xl font-bold text-primary">{category.title}</h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-primary rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ 
                            duration: 1.5, 
                            delay: categoryIndex * 0.2 + skillIndex * 0.1,
                            ease: "easeOut"
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tech Stack Visual */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center space-y-8"
          >
            <h3 className="text-3xl font-bold text-foreground">Technologies I Love</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "React", "TypeScript", "Next.js", "Tailwind", "Framer Motion", 
                "Three.js", "Node.js", "GraphQL", "Docker", "Figma"
              ].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="glass-card px-6 py-3 text-sm font-medium text-primary hover:bg-primary/10 transition-all duration-300 cursor-pointer"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};