import { motion } from "framer-motion";

export const AboutSection = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center section-padding py-16 sm:py-24"
      aria-labelledby="about-heading"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="space-y-16"
        >
          <div className="text-center space-y-6">
            <motion.h2
              id="about-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gradient"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              About Me
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4"
            >
              MERN Stack Developer | AI Engineer | Passionate about real-time,
              scalable solutions
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                I'm Lalith Kishore, a Bengaluru-based developer and tech
                enthusiast. From building AI-powered HR chatbots to creating
                interview assistants and scalable intern management systems,
                I’ve focused on crafting real-time web apps that blend
                intelligence with usability.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                Whether it's AI integration or end-to-end full-stack systems, I
                bring curiosity, consistency, and creativity to every project. I
                love using technology to solve problems that matter.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-6" role="list">
                <div className="glass-card p-4 sm:p-6 text-center" role="listitem">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">
                    Real-time
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    Web & AI Systems Builder
                  </div>
                </div>
                <div className="glass-card p-4 sm:p-6 text-center" role="listitem">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">
                    AI-Powered
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    Chatbots, HR Tools, & Assistants
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-card py-10 px-4 sm:py-12 sm:px-6 md:py-14 md:px-8 space-y-6"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-primary">
                My Philosophy
              </h3>
              <blockquote className="text-sm sm:text-base md:text-lg italic text-muted-foreground border-l-4 border-primary pl-4 sm:pl-6">
                "I believe great code is simple, purposeful, and human-centric.
                Each function I write is aimed at solving a real problem, not
                just fulfilling a requirement."
              </blockquote>
              <ul className="space-y-4" role="list">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full" aria-hidden="true"></div>
                  <span className="text-muted-foreground">
                    AI-driven innovation
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full" aria-hidden="true"></div>
                  <span className="text-muted-foreground">
                    Scalable system architecture
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full" aria-hidden="true"></div>
                  <span className="text-muted-foreground">
                    Real-time development expertise
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
