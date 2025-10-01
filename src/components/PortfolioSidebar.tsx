import { useEffect, useState, useRef, useCallback } from "react";
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
  { title: "Testimonials", icon: Star, hash: "testimonials" },
  { title: "Contact", icon: Mail, hash: "contact" },
];

export function PortfolioSidebar() {
  const { state, toggleSidebar, isMobile, openMobile, setOpenMobile } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("home");
  const [isUserNavigating, setIsUserNavigating] = useState(false);
  
  // Refs for cleanup and state management
  const observerRef = useRef(null);
  const timeoutRef = useRef(null);
  const userNavigationTimeoutRef = useRef(null);

  // Determine active section based on current location and scroll
  const isActive = (section) => {
    if (section.hash === null) {
      return activeSection === "home" || activeSection === "";
    }
    return activeSection === section.hash;
  };

  // Debounced function to prevent rapid state changes
  const debouncedSetActiveSection = useCallback((newSection) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      if (!isUserNavigating) {
        setActiveSection(newSection);
        
        // Update URL without triggering scroll
        const newHash = newSection === "home" ? "" : `#${newSection}`;
        const currentHash = window.location.hash;
        
        if (currentHash !== newHash) {
          if (newSection === "home") {
            window.history.replaceState({}, "", window.location.pathname);
          } else {
            window.history.replaceState({}, "", `#${newSection}`);
          }
        }
      }
    }, 100);
  }, [isUserNavigating]);

  const handleNavClick = (section) => {
    // Set user navigation flag to prevent observer interference
    setIsUserNavigating(true);
    
    // Clear any pending timeouts
    if (userNavigationTimeoutRef.current) {
      clearTimeout(userNavigationTimeoutRef.current);
    }

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
    
    // Reset user navigation flag after animation completes
    userNavigationTimeoutRef.current = setTimeout(() => {
      setIsUserNavigating(false);
    }, 1000);
    
    // Close mobile sidebar when navigating
    if (isMobile && openMobile) {
      setOpenMobile(false);
    }
  };

  // Initialize active section based on URL
  useEffect(() => {
    const hash = location.hash ? location.hash.substring(1) : "home";
    setActiveSection(hash);
  }, [location.hash]);

  // Set up intersection observer for section detection
  useEffect(() => {
    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (isUserNavigating) return; // Don't update during user navigation

        // Find the entry with the highest intersection ratio
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        if (visibleEntries.length === 0) return;

        const mostVisible = visibleEntries.reduce((prev, current) => {
          return current.intersectionRatio > prev.intersectionRatio ? current : prev;
        });

        const targetId = mostVisible.target.id;
        if (targetId) {
          debouncedSetActiveSection(targetId);
        } else if (mostVisible.target.classList.contains('hero-section') || 
                  mostVisible.target.classList.contains('home-section')) {
          debouncedSetActiveSection("home");
        }
      },
      {
        threshold: [0.2, 0.4, 0.6, 0.8],
        rootMargin: "-10% 0px -20% 0px"
      }
    );

    // Function to safely observe elements
    const observeElement = (selector, fallbackId = null) => {
      try {
        const element = typeof selector === 'string' ? 
          document.querySelector(selector) : selector;
        
        if (element && observerRef.current) {
          // Ensure element has an ID for tracking
          if (!element.id && fallbackId) {
            element.id = fallbackId;
          }
          observerRef.current.observe(element);
          return true;
        }
      } catch (error) {
        console.warn(`Failed to observe element: ${selector}`, error);
      }
      return false;
    };

    // Set up observation with error handling
    const setupObservation = () => {
      try {
        // Observe sections with hash-based navigation
        sections.forEach((section) => {
          if (section.hash) {
            observeElement(`#${section.hash}`);
          }
        });

        // Observe potential home/hero sections
        const heroSelectors = [
          '.hero-section',
          '#hero',
          '#home',
          '.home-section',
          'main > section:first-child:not([id])',
          'main > div:first-child:not([id])'
        ];

        let heroObserved = false;
        heroSelectors.forEach(selector => {
          if (!heroObserved) {
            heroObserved = observeElement(selector, 'hero-section');
          }
        });

        // If no hero section found, observe the first child of main
        if (!heroObserved) {
          const mainElement = document.querySelector('main');
          if (mainElement && mainElement.children.length > 0) {
            observeElement(mainElement.children[0], 'hero-section');
          }
        }

      } catch (error) {
        console.warn('Error setting up intersection observer:', error);
      }
    };

    // Set up observation after DOM is ready
    const timeoutId = setTimeout(setupObservation, 150);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [debouncedSetActiveSection, isUserNavigating]);

  // Handle browser navigation (back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = location.hash ? location.hash.substring(1) : "home";
      setActiveSection(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [location.hash]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (userNavigationTimeoutRef.current) {
        clearTimeout(userNavigationTimeoutRef.current);
      }
    };
  }, []);

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
                              duration: 0.4,
                              ease: "easeInOut",
                              staggerChildren: 0.05
                            }}
                            className="w-full"
                          >
                            <button
                              onClick={() => handleNavClick(section)}
                              className={`
                                flex items-center w-full rounded-lg transition-all duration-300 group relative overflow-hidden
                                ${collapsed ? 'h-11 justify-center p-2' : 'h-11 px-3 justify-start space-x-3'}
                                ${active 
                                  ? "bg-primary text-primary-foreground shadow-md border-2 border-primary" 
                                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground border-2 border-transparent"
                                }
                              `}
                            >
                              {/* Icon */}
                              <section.icon
                                className={`
                                  h-5 w-5 shrink-0 transition-all duration-300
                                  ${active ? "text-primary-foreground" : "text-sidebar-foreground group-hover:text-sidebar-accent-foreground"}
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
                                    transition={{
                                      duration: 0.3,
                                      ease: "easeInOut"
                                    }}
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