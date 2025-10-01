import { motion } from "framer-motion";
import ProfileCard from "@/components/ProfileCard";

export const AboutSection = () => {
  return (
    <>
      <style>{`
        .themed-profile-card .pc-card-wrapper::before {
          background: linear-gradient(145deg, 
            rgba(15, 118, 110, 0.15) 0%,
            rgba(20, 184, 166, 0.1) 50%,
            rgba(15, 118, 110, 0.08) 100%) !important;
          filter: none !important;
          opacity: 1 !important;
          border-radius: 16px !important;
        }
        
        .themed-profile-card .pc-card-wrapper:hover::before {
          background: linear-gradient(145deg, 
            rgba(15, 118, 110, 0.2) 0%,
            rgba(20, 184, 166, 0.15) 50%,
            rgba(15, 118, 110, 0.12) 100%) !important;
        }
        
        .themed-profile-card .pc-card {
          background: rgba(15, 23, 42, 0.8) !important;
          backdrop-filter: blur(12px) saturate(180%) !important;
          border: 1px solid rgba(148, 163, 184, 0.1) !important;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
          animation: none !important;
          border-radius: 16px !important;
        }
        
        .themed-profile-card .pc-shine {
          display: none !important;
        }
        
        .themed-profile-card .pc-glare {
          background: linear-gradient(135deg, 
            rgba(15, 118, 110, 0.1) 0%,
            transparent 50%) !important;
          mix-blend-mode: overlay !important;
          opacity: 0.6 !important;
        }
        
        .themed-profile-card .pc-inside {
          background: rgba(15, 23, 42, 0.6) !important;
          backdrop-filter: blur(8px) !important;
          border-radius: 12px !important;
        }
        
        .themed-profile-card .pc-user-info {
          background: rgba(15, 23, 42, 0.8) !important;
          backdrop-filter: blur(12px) !important;
          border: 1px solid rgba(148, 163, 184, 0.15) !important;
          border-radius: 12px !important;
        }

        .themed-profile-card .pc-avatar {
          border: 3px solid rgba(15, 118, 110, 0.3) !important;
          box-shadow: 0 4px 16px rgba(15, 118, 110, 0.2) !important;
        }

        .themed-profile-card .pc-name {
          color: hsl(var(--foreground)) !important;
        }

        .themed-profile-card .pc-title {
          color: hsl(var(--muted-foreground)) !important;
        }

        .themed-profile-card .pc-handle {
          color: hsl(var(--primary)) !important;
        }

        .themed-profile-card .pc-status {
          color: rgba(34, 197, 94, 0.9) !important;
        }

        .themed-profile-card .pc-contact-btn {
          background: linear-gradient(145deg, 
            hsl(var(--primary)) 0%,
            hsl(var(--primary)/80%) 100%) !important;
          border: 1px solid hsl(var(--primary)/30%) !important;
          color: hsl(var(--primary-foreground)) !important;
          transition: all 0.3s ease !important;
        }

        .themed-profile-card .pc-contact-btn:hover {
          background: linear-gradient(145deg, 
            hsl(var(--primary)/90%) 0%,
            hsl(var(--primary)/70%) 100%) !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 6px 20px rgba(15, 118, 110, 0.3) !important;
        }

        /* Ensure crisp text rendering */
        .themed-profile-card * {
          -webkit-font-smoothing: antialiased !important;
          -moz-osx-font-smoothing: grayscale !important;
          text-rendering: optimizeLegibility !important;
        }

        /* Remove any unwanted effects */
        .themed-profile-card:hover {
          filter: none !important;
        }

        /* Custom glass effect for profile card integration */
        .profile-container {
          background: rgba(15, 23, 42, 0.3);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: 20px;
          padding: 1.5rem;
        }
      `}</style>
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
            className="space-y-12"
          >
            <div className="text-center space-y-4">
               <motion.h2
                id="about-heading"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gradient"
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
                className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4"
              >
                MERN Stack Developer | AI Enthusiast | Passionate about
                real-time, scalable solutions
              </motion.p>
            </div>

            {/* Main content container with reduced gap */}
            <div className="glass-card p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4 items-center">
                {/* Profile Card Section */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="flex justify-center lg:justify-start"
                >
                  <div className="profile-container">
                    <ProfileCard
                      avatarUrl="/src/Assets/profile.png"
                      name="Lalith Kishore"
                      title="MERN Stack Developer"
                      handle="lalithkishore"
                      status="Available for Work"
                      contactText="Let's Connect"
                      showUserInfo={true}
                      enableTilt={true}
                      enableMobileTilt={false}
                      behindGradient="none"
                      innerGradient="none"
                      className="w-full max-w-xs themed-profile-card"
                      onContactClick={() => {
                        const contactSection = document.getElementById("contact");
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                    />
                  </div>
                </motion.div>

                {/* Content Section */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-4"
                >
                  {/* Main Content */}
                  <div className="space-y-4">
                    <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                      I'm Lalith Kishore, a Bengaluru-based developer and tech
                      enthusiast. From building AI-powered HR chatbots to creating
                      interview assistants and scalable intern management systems,
                      I've focused on crafting real-time web apps that blend
                      intelligence with usability.
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                      Whether it's AI integration or end-to-end full-stack
                      systems, I bring curiosity, consistency, and creativity to
                      every project. I love using technology to solve problems
                      that matter.
                    </p>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4" role="list">
                    <motion.div
                      className="glass-card p-3 sm:p-4 text-center"
                      role="listitem"
                      whileHover={{ scale: 1.05, y: -3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-lg sm:text-xl font-bold text-primary">
                        Real-time
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Web & AI Systems Builder
                      </div>
                    </motion.div>
                    <motion.div
                      className="glass-card p-3 sm:p-4 text-center"
                      role="listitem"
                      whileHover={{ scale: 1.05, y: -3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-lg sm:text-xl font-bold text-primary">
                        AI-Powered
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Chatbots, HR Tools, & Assistants
                      </div>
                    </motion.div>
                  </div>

                  {/* Philosophy Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="glass-card py-6 px-4 space-y-4"
                  >
                    <h3 className="text-lg sm:text-xl font-bold text-primary">
                      My Philosophy
                    </h3>
                    <blockquote className="text-sm italic text-muted-foreground border-l-4 border-primary pl-3">
                      "I believe great code is simple, purposeful, and
                      human-centric. Each function I write is aimed at solving a
                      real problem, not just fulfilling a requirement."
                    </blockquote>
                    <ul className="space-y-2" role="list">
                      <li className="flex items-center space-x-2">
                        <div
                          className="w-1.5 h-1.5 bg-primary rounded-full"
                          aria-hidden="true"
                        ></div>
                        <span className="text-sm text-muted-foreground">
                          AI-driven innovation
                        </span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div
                          className="w-1.5 h-1.5 bg-primary rounded-full"
                          aria-hidden="true"
                        ></div>
                        <span className="text-sm text-muted-foreground">
                          Scalable system architecture
                        </span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div
                          className="w-1.5 h-1.5 bg-primary rounded-full"
                          aria-hidden="true"
                        ></div>
                        <span className="text-sm text-muted-foreground">
                          Real-time development expertise
                        </span>
                      </li>
                    </ul>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};