import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Home, User, Code, Briefcase, Mail, Star, Award, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const sections = [
  { title: "Home", url: "/home", icon: Home },
  { title: "About", url: "/home#about", icon: User },
  { title: "Skills", url: "/home#skills", icon: Code },
  { title: "Experience", url: "/home#experience", icon: Award },
  { title: "Projects", url: "/home#projects", icon: Briefcase },
  { title: "Resume", url: "/home#resume", icon: FileText },
  { title: "Testimonials", url: "/home#testimonials", icon: Star },
  { title: "Contact", url: "/home#contact", icon: Mail },
];

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();
  const currentPath = location.pathname + location.hash;

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === "/home" && location.pathname === "/home" && !location.hash) {
      return true;
    }
    return currentPath === path;
  };

  const handleNavClick = (url: string) => {
    setIsOpen(false);
    if (url.includes('#')) {
      const [, hash] = url.split('#');
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  // Auto-hide on scroll down
  const shouldHide = scrollY > 100;

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ 
          opacity: shouldHide ? 0.7 : 1,
          y: shouldHide ? -10 : 0
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-4 left-4 z-50 md:hidden"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          className="w-14 h-14 rounded-full bg-sidebar/90 backdrop-blur-lg border border-sidebar-border hover:bg-sidebar-accent transition-all duration-300 p-0 min-h-[44px] min-w-[44px]"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6 text-sidebar-foreground" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-6 w-6 text-sidebar-foreground" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Navigation Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[80vw] bg-sidebar border-l border-sidebar-border z-50 md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="p-6 border-b border-sidebar-border">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-lg">LK</span>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-sidebar-foreground">Lalith Kishore</h2>
                      <p className="text-xs text-sidebar-foreground/60">Creative Developer</p>
                    </div>
                  </motion.div>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto p-6">
                  <nav className="space-y-3">
                    {sections.map((section, index) => (
                      <motion.div
                        key={section.title}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                      >
                        <NavLink
                          to={section.url}
                          onClick={(e) => {
                            if (section.url.includes('#')) {
                              e.preventDefault();
                              handleNavClick(section.url);
                            } else {
                              setIsOpen(false);
                            }
                          }}
                          className={`flex items-center space-x-4 w-full p-4 rounded-xl transition-all duration-300 group min-h-[44px] ${
                            isActive(section.url)
                              ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-glow"
                              : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                          }`}
                          aria-current={isActive(section.url) ? "page" : undefined}
                        >
                          <section.icon className={`h-5 w-5 ${
                            isActive(section.url) 
                              ? 'text-sidebar-primary-foreground' 
                              : 'text-sidebar-foreground group-hover:text-sidebar-accent-foreground'
                          }`} />
                          <span className="font-medium">{section.title}</span>
                          {isActive(section.url) && (
                            <motion.div
                              layoutId="mobileActiveIndicator"
                              className="ml-auto w-2 h-2 bg-sidebar-primary-foreground rounded-full"
                            />
                          )}
                        </NavLink>
                      </motion.div>
                    ))}
                  </nav>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-sidebar-border">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                  >
                    <p className="text-xs text-sidebar-foreground/60">
                      © 2025 Portfolio
                    </p>
                    <p className="text-xs text-sidebar-foreground/40">
                      Built with passion
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};