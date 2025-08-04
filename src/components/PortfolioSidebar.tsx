import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Home,
  User,
  Code,
  Briefcase,
  Mail,
  Star,
  Award,
  FileText,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sections = [
  { title: "Home", icon: Home, hash: null },
  { title: "About", icon: User, hash: "about" },
  { title: "Skills", icon: Code, hash: "skills" },
  { title: "Experience", icon: Award, hash: "experience" },
  { title: "Projects", icon: Briefcase, hash: "projects" },
  { title: "Resume", icon: FileText, hash: "resume" },
  { title: "Testimonials", icon: Star, hash: "testimonials" },
  { title: "Contact", icon: Mail, hash: "contact" },
];

export function PortfolioSidebar() {
  const { state, toggleSidebar, isMobile, openMobile, setOpenMobile } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("home");

  // Determine active section based on current location and scroll
  const isActive = (section) => {
    if (section.hash === null) {
      return activeSection === "home";
    }
    return activeSection === section.hash;
  };

  const handleNavClick = (section) => {
    if (section.hash === null) {
      // Navigate to home/hero section
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveSection("home");
      window.history.pushState({}, "", window.location.pathname);
    } else {
      // Navigate to specific section
      const element = document.getElementById(section.hash);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        setActiveSection(section.hash);
        window.history.pushState({}, "", `#${section.hash}`);
      }
    }
    
    // Close mobile sidebar when navigating
    if (isMobile && openMobile) {
      setOpenMobile(false);
    }
  };

  // Track which section is currently in view
  useEffect(() => {
    // Set initial state based on current hash
    if (location.hash) {
      const hash = location.hash.substring(1);
      setActiveSection(hash);
    } else {
      setActiveSection("home");
    }

    // Function to update active section based on scroll position
    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 100; // Add offset for better detection
      
      // Check if we're at the top (home section)
      if (scrollPosition < 200) {
        if (activeSection !== "home") {
          setActiveSection("home");
          // Update URL to remove hash
          if (window.location.hash) {
            window.history.replaceState({}, "", window.location.pathname);
          }
        }
        return;
      }

      // Find the section that's currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.hash) {
          const element = document.getElementById(section.hash);
          if (element) {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + window.scrollY;
            
            // Check if this section is in view
            if (scrollPosition >= elementTop - 150) {
              if (activeSection !== section.hash) {
                setActiveSection(section.hash);
                // Update URL hash
                window.history.replaceState({}, "", `#${section.hash}`);
              }
              return;
            }
          }
        }
      }
    };

    // Intersection Observer for more accurate detection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            const id = entry.target.id;
            if (id) {
              setActiveSection(id);
            } else if (entry.target.classList.contains('hero-section') || 
                      entry.target.id === 'hero' || 
                      entry.target.classList.contains('home-section')) {
              setActiveSection("home");
            }
          }
        });
      },
      {
        threshold: [0.1, 0.3, 0.5, 0.7],
        rootMargin: "-20% 0px -30% 0px"
      }
    );

    // Throttled scroll handler as fallback
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Set up observers and listeners
    const setupObservation = () => {
      // Clear any existing observers
      observer.disconnect();
      
      // Observe all sections
      sections.forEach((section) => {
        if (section.hash) {
          const el = document.getElementById(section.hash);
          if (el) {
            observer.observe(el);
          }
        }
      });

      // Also observe potential home/hero sections
      const heroSelectors = [
        '.hero-section', 
        '#hero', 
        '#home', 
        '.home-section',
        'main > section:first-child',
        'main > div:first-child'
      ];
      
      heroSelectors.forEach(selector => {
        const heroSection = document.querySelector(selector);
        if (heroSection && !heroSection.id) {
          // Add an id if it doesn't have one for easier tracking
          heroSection.id = 'hero-section';
        }
        if (heroSection) {
          observer.observe(heroSection);
        }
      });

      // Initial update
      updateActiveSection();
    };

    // Set up observation after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(setupObservation, 100);

    // Add scroll listener as fallback
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.hash]);

  // Additional effect to handle hash changes from browser navigation
  useEffect(() => {
    const handleHashChange = () => {
      if (location.hash) {
        const hash = location.hash.substring(1);
        setActiveSection(hash);
      } else {
        setActiveSection("home");
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [location.hash]);

  // Mobile sidebar toggle button
  const MobileMenuButton = () => (
    <Button
      variant="ghost"
      size="icon"
      className="fixed top-4 right-4 z-50 md:hidden bg-sidebar/80 backdrop-blur-sm border border-sidebar-border rounded-full h-12 w-12 shadow-lg hover:bg-sidebar-accent/10 transition-all duration-200"
      onClick={() => setOpenMobile(!openMobile)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={openMobile ? 'close' : 'open'}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {openMobile ? (
            <X className="h-6 w-6 text-sidebar-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-sidebar-foreground" />
          )}
        </motion.div>
      </AnimatePresence>
    </Button>
  );

  return (
    <>
      {/* Mobile menu button */}
      {isMobile && <MobileMenuButton />}
      
      <Sidebar
        className={`${collapsed ? "w-16" : "w-64 sm:w-72"} 
          transition-all duration-300 ease-in-out
          bg-sidebar border-r border-sidebar-border
          backdrop-blur-sm`}
        collapsible="icon"
      >
        <SidebarContent className="bg-gradient-dark">
          {/* Logo Section - Clickable to toggle sidebar */}
          <div className={`${collapsed ? 'p-2' : 'p-4'} border-b border-sidebar-border/40 ${collapsed ? 'flex justify-center' : ''}`}>
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={toggleSidebar}
              className={`flex items-center w-full rounded-lg p-2 transition-all duration-300 hover:bg-sidebar-accent/20 group ${collapsed ? 'justify-center' : 'space-x-3'}`}
            >
              <motion.div 
                className={`relative bg-gradient-primary rounded-xl flex items-center justify-center shrink-0 shadow-glow group-hover:scale-105 transition-all duration-300 ${
                  collapsed ? 'w-8 h-8' : 'w-12 h-12'
                }`}
                layout
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <motion.span 
                  className={`text-primary-foreground font-bold ${
                    collapsed ? 'text-sm' : 'text-lg'
                  }`}
                  layout
                  transition={{ duration: 0.3 }}
                >
                  LK
                </motion.span>
                {/* Toggle indicator when collapsed */}
                {collapsed && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-sidebar-primary rounded-full flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 bg-sidebar-primary-foreground rounded-full"></div>
                  </motion.div>
                )}
              </motion.div>
              <AnimatePresence>
                {!collapsed && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="overflow-hidden flex-1 text-left"
                  >
                    <h2 className="text-lg font-bold text-sidebar-foreground truncate group-hover:text-sidebar-accent-foreground transition-colors">
                      Lalith Kishore
                    </h2>
                    <p className="text-sm text-sidebar-foreground/60 truncate group-hover:text-sidebar-foreground/80 transition-colors">
                      Creative Developer
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Subtle hover indicator */}
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  className="text-sidebar-foreground/30 group-hover:text-sidebar-foreground/60 transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              )}
            </motion.button>
          </div>

          {/* Navigation Section */}
          <SidebarGroup className={collapsed ? "px-2" : "px-4"}>
            <SidebarGroupLabel className="text-sidebar-foreground/80 mb-4 text-sm font-medium uppercase tracking-wider">
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    NAVIGATION
                  </motion.span>
                )}
              </AnimatePresence>
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                <AnimatePresence>
                  {sections.map((section, index) => {
                    const active = isActive(section);
                    
                    return (
                      <SidebarMenuItem key={section.title} className="w-full">
                        <SidebarMenuButton asChild className="w-full p-0">
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ 
                              delay: index * 0.03, 
                              duration: 0.3,
                              ease: "easeOut" 
                            }}
                            className="w-full"
                          >
                            <button
                              onClick={() => handleNavClick(section)}
                              className={`
                                flex items-center w-full rounded-lg transition-all duration-300 group relative overflow-hidden
                                ${collapsed ? 'h-11 justify-center p-0' : 'h-11 px-3 justify-start space-x-3'}
                                ${active 
                                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-glow" 
                                  : "text-sidebar-foreground hover:bg-sidebar-accent/30 hover:text-sidebar-accent-foreground"
                                }
                              `}
                            >
                              {/* Icon */}
                              <section.icon
                                className={`
                                  h-5 w-5 shrink-0 transition-all duration-300
                                  ${active ? "text-sidebar-primary-foreground" : "text-sidebar-foreground/70 group-hover:text-sidebar-accent-foreground"}
                                  ${!active && "group-hover:scale-110"}
                                `}
                              />
                              
                              {/* Label */}
                              <AnimatePresence>
                                {!collapsed && (
                                  <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className={`font-medium text-sm truncate transition-colors flex-1 text-left ${
                                      active ? "text-sidebar-primary-foreground" : "text-sidebar-foreground"
                                    }`}
                                  >
                                    {section.title}
                                  </motion.span>
                                )}
                              </AnimatePresence>
                              
                              {/* Active indicator dot */}
                              <AnimatePresence>
                                {!collapsed && active && (
                                  <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="w-2 h-2 bg-sidebar-primary-foreground rounded-full"
                                  />
                                )}
                              </AnimatePresence>
                            </button>
                          </motion.div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </AnimatePresence>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Footer */}
          <div className={`mt-auto ${collapsed ? 'p-2' : 'p-4'} border-t border-sidebar-border/40 ${collapsed ? 'flex justify-center' : ''}`}>
            <AnimatePresence>
              {!collapsed ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="text-center space-y-1"
                >
                  <p className="text-xs text-sidebar-foreground/60">© 2025 Portfolio</p>
                  <p className="text-xs text-sidebar-foreground/40">Built with passion</p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <p className="text-xs text-sidebar-foreground/40">LK</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </SidebarContent>
      </Sidebar>
    </>
  );
}