import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
} from "lucide-react";

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

export function PortfolioSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const [currentHash, setCurrentHash] = useState(location.hash);

  const isActive = (path: string) => {
    if (path === "/home" && location.pathname === "/home" && !location.hash) {
      return true;
    }
    return path === `/home${currentHash}`;
  };

  const handleNavClick = (url: string) => {
    if (url.includes("#")) {
      const [, hash] = url.split("#");
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        setCurrentHash(`#${hash}`);
      }
    }
  };

  // Track which section is currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setCurrentHash(`#${visible.target.id}`);
        }
      },
      {
        threshold: 0.6,
      }
    );

    sections.forEach((section) => {
      const id = section.url.split("#")[1];
      if (id) {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Sidebar
      className={`${
        collapsed ? "w-14" : "w-60 sm:w-72"
      } transition-all duration-300 bg-sidebar border-r border-sidebar-border`}
      collapsible="icon"
    >
      <SidebarContent className="bg-gradient-dark">
        {/* Logo */}
        <div className={`p-4 border-b border-sidebar-border ${collapsed ? 'flex justify-center' : ''}`}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'}`}
          >
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shrink-0">
              <span className="text-primary-foreground font-bold text-lg">
                LK
              </span>
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <h2 className="text-lg font-bold text-sidebar-foreground truncate">
                  Lalith Kishore
                </h2>
                <p className="text-xs text-sidebar-foreground/60 truncate">
                  Creative Developer
                </p>
              </div>
            )}
          </motion.div>
        </div>

        <SidebarGroup className={collapsed ? "px-2" : "px-2 sm:px-4"}>
          <SidebarGroupLabel className="text-sidebar-foreground/80 mb-2 sm:mb-4 text-xs sm:text-sm">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {sections.map((section, index) => (
                <SidebarMenuItem key={section.title} className="w-full">
                  <SidebarMenuButton asChild className="w-full">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="w-full"
                    >
                      <NavLink
                        to={section.url}
                        onClick={(e) => {
                          if (section.url.includes("#")) {
                            e.preventDefault();
                            handleNavClick(section.url);
                          }
                        }}
                        className={`flex items-center w-full rounded-lg transition-all duration-300 group ${
                          collapsed 
                            ? 'h-10 w-10 mx-auto justify-center' 
                            : 'min-h-[44px] p-3 space-x-3'
                        } ${
                          isActive(section.url)
                            ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-glow"
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        }`}
                      >
                        <section.icon
                          className={`h-5 w-5 shrink-0 ${
                            isActive(section.url)
                              ? "text-sidebar-primary-foreground"
                              : "text-sidebar-foreground group-hover:text-sidebar-accent-foreground"
                          }`}
                        />
                        {!collapsed && (
                          <>
                            <span className="font-medium text-base truncate">
                              {section.title}
                            </span>
                            {isActive(section.url) && (
                              <motion.div
                                layoutId="activeIndicator"
                                className="ml-auto w-2 h-2 bg-sidebar-primary-foreground rounded-full"
                              />
                            )}
                          </>
                        )}
                      </NavLink>
                    </motion.div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer */}
        <div className={`mt-auto p-4 border-t border-sidebar-border ${collapsed ? 'flex justify-center' : ''}`}>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <p className="text-xs text-sidebar-foreground/60 truncate">© 2025 Portfolio</p>
              <p className="text-xs text-sidebar-foreground/40 truncate">
                Built with passion
              </p>
            </motion.div>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}