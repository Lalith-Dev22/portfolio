import { motion } from "framer-motion";

const experiences = [
  {
    title: "Developer Intern",
    company: "Dhruthzuci Tech Solutions",
    period: "Nov 2024 – Jan 2025",
    description:
      "Worked as a Developer Intern contributing to the creation of internal tools, static web solutions, and RESTful API integration for business workflows.",
    achievements: [
      "Developed a check-in/check-out system for interns using React-Bootstrap and Node.js",
      "Built a static company webpage with reusable components and modern UI practices",
      "Integrated REST APIs for internal tools to enable real-time data sync",
      "Created a support ticket platform to track, resolve, and comment on employee issues",
      "Implemented intern task monitoring interface with dashboard and filters",
    ],
  },
];

export const ExperienceSection = () => {
  return (
    <section
      id="experience"
      className="min-h-screen flex items-center section-padding py-16 sm:py-24"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="space-y-16"
        >
          {/* Header */}
          <div className="text-center space-y-6">
            <motion.h2
              className="text-3xl sm:text-5xl md:text-7xl font-bold text-gradient"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Experience
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              A journey through innovation, learning, and real-world
              contribution
            </motion.p>
          </div>

          {/* Experience Cards */}
          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="glass-card p-8 hover:bg-card/20 transition-all duration-500"
              >
                <div className="grid md:grid-cols-4 gap-8">
                  <div className="md:col-span-1 space-y-2">
                    <div className="text-sm text-primary font-semibold tracking-wider uppercase">
                      {experience.period}
                    </div>
                    <div className="text-lg font-bold text-foreground">
                      {experience.title}
                    </div>
                    <div className="text-muted-foreground">
                      {experience.company}
                    </div>
                  </div>

                  <div className="md:col-span-3 space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {experience.description}
                    </p>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">
                        Key Achievements:
                      </h4>
                      <ul className="space-y-2">
                        {experience.achievements.map(
                          (achievement, achIndex) => (
                            <motion.li
                              key={achIndex}
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.5,
                                delay: index * 0.2 + achIndex * 0.1,
                              }}
                              className="flex items-start space-x-3"
                            >
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-muted-foreground">
                                {achievement}
                              </span>
                            </motion.li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
