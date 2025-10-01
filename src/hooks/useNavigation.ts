import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Navigation section configuration
export interface NavigationSection {
  id: string;
  title: string;
  hash: string | null;
}

export const NAVIGATION_SECTIONS: NavigationSection[] = [
  { id: 'hero', title: 'Home', hash: null },
  { id: 'about', title: 'About', hash: 'about' },
  { id: 'skills', title: 'Skills', hash: 'skills' },
  { id: 'experience', title: 'Experience', hash: 'experience' },
  { id: 'projects', title: 'Projects', hash: 'projects' },
  { id: 'resume', title: 'Resume', hash: 'resume' },
  { id: 'testimonials', title: 'Testimonials', hash: 'testimonials' },
  { id: 'contact', title: 'Contact', hash: 'contact' }
];

// Navigation state interface
export interface NavigationState {
  activeSection: string;
  isScrolling: boolean;
  isMobileMenuOpen: boolean;
  sections: NavigationSection[];
}

// Navigation actions interface
export interface NavigationActions {
  navigateToSection: (sectionId: string) => void;
  setActiveSection: (sectionId: string) => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  openMobileMenu: () => void;
}

// Combined hook interface
export type UseNavigationReturn = NavigationState & NavigationActions;

// Scroll behavior options
interface ScrollOptions {
  behavior?: 'smooth' | 'instant';
  block?: 'start' | 'center' | 'end';
  offset?: number;
}

/**
 * Custom navigation hook that provides centralized navigation state management,
 * section detection, smooth scrolling, and URL hash synchronization
 */
export function useNavigation(): UseNavigationReturn {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Navigation state
  const [activeSection, setActiveSectionState] = useState<string>('hero');
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  
  // Refs for managing scroll behavior and observers
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const observerRef = useRef<IntersectionObserver>();
  const isNavigatingRef = useRef<boolean>(false);
  const lastScrollY = useRef<number>(0);

  /**
   * Updates the active section and synchronizes URL hash
   */
  const setActiveSection = useCallback((sectionId: string) => {
    if (activeSection === sectionId) return;
    
    setActiveSectionState(sectionId);
    
    // Update URL hash without causing page reload
    const section = NAVIGATION_SECTIONS.find(s => s.id === sectionId);
    if (section) {
      const newHash = section.hash ? `#${section.hash}` : '';
      const newUrl = `${location.pathname}${newHash}`;
      
      // Only update if the URL actually changed
      if (window.location.pathname + window.location.hash !== newUrl) {
        window.history.replaceState({}, '', newUrl);
      }
    }
  }, [activeSection, location.pathname]);

  /**
   * Smooth scroll to a specific section with proper offset calculation
   */
  const scrollToSection = useCallback((sectionId: string, options: ScrollOptions = {}) => {
    const {
      behavior = 'smooth',
      block = 'start',
      offset = 80 // Default offset for fixed headers
    } = options;

    // Find the section configuration
    const section = NAVIGATION_SECTIONS.find(s => s.id === sectionId);
    if (!section) return;

    setIsScrolling(true);
    isNavigatingRef.current = true;

    // Clear any existing scroll timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Handle hero/home section (scroll to top)
    if (section.hash === null) {
      window.scrollTo({
        top: 0,
        behavior
      });
      
      setActiveSection('hero');
      
      // Reset scrolling state
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
        isNavigatingRef.current = false;
      }, behavior === 'smooth' ? 1000 : 100);
      
      return;
    }

    // Find the target element
    const element = document.getElementById(section.hash);
    if (!element) {
      console.warn(`Section element not found: ${section.hash}`);
      setIsScrolling(false);
      isNavigatingRef.current = false;
      return;
    }

    // Calculate scroll position with offset
    const elementRect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetPosition = elementRect.top + scrollTop - offset;

    // Perform the scroll
    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior
    });

    // Update active section immediately for better UX
    setActiveSection(sectionId);

    // Reset scrolling state after animation completes
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
      isNavigatingRef.current = false;
    }, behavior === 'smooth' ? 1000 : 100);

  }, [setActiveSection]);

  /**
   * Navigate to a specific section (main navigation function)
   */
  const navigateToSection = useCallback((sectionId: string) => {
    // Close mobile menu if open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }

    // If we're not on the home page, navigate there first
    if (location.pathname !== '/home') {
      const section = NAVIGATION_SECTIONS.find(s => s.id === sectionId);
      const targetPath = section?.hash ? `/home#${section.hash}` : '/home';
      navigate(targetPath);
      return;
    }

    // Scroll to the section
    scrollToSection(sectionId);
  }, [location.pathname, navigate, scrollToSection, isMobileMenuOpen]);

  /**
   * Mobile menu control functions
   */
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const openMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(true);
  }, []);

  /**
   * Set up intersection observer for automatic section detection
   */
  useEffect(() => {
    // Only set up observer on the home page
    if (location.pathname !== '/home') {
      return;
    }

    // Clean up existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Skip if we're currently navigating programmatically
        if (isNavigatingRef.current || isScrolling) {
          return;
        }

        // Find the entry with the highest intersection ratio
        let bestEntry = entries[0];
        let bestRatio = 0;

        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            bestEntry = entry;
            bestRatio = entry.intersectionRatio;
          }
        });

        // Update active section based on the best intersecting element
        if (bestEntry && bestEntry.isIntersecting && bestRatio > 0.3) {
          const elementId = bestEntry.target.id;
          
          // Map element ID to section ID
          let sectionId = elementId;
          
          // Handle special cases for hero/home section
          if (elementId === 'hero' || elementId === 'home' || 
              bestEntry.target.classList.contains('hero-section') ||
              bestEntry.target.classList.contains('home-section')) {
            sectionId = 'hero';
          }

          // Find matching section
          const section = NAVIGATION_SECTIONS.find(s => 
            s.id === sectionId || s.hash === elementId
          );

          if (section) {
            setActiveSection(section.id);
          }
        }
      },
      {
        threshold: [0.1, 0.3, 0.5, 0.7],
        rootMargin: '-10% 0px -30% 0px' // Adjust when sections become "active"
      }
    );

    // Observe all sections
    const observeElements = () => {
      if (!observerRef.current) return;

      // Observe sections based on their hash or ID
      NAVIGATION_SECTIONS.forEach(section => {
        if (section.hash) {
          const element = document.getElementById(section.hash);
          if (element) {
            observerRef.current!.observe(element);
          }
        }
      });

      // Also observe potential hero/home sections
      const heroSelectors = [
        '#hero',
        '#home', 
        '.hero-section',
        '.home-section',
        'main > section:first-child',
        'main > div:first-child'
      ];

      heroSelectors.forEach(selector => {
        const element = document.querySelector(selector);
        if (element && observerRef.current) {
          // Ensure it has an ID for easier tracking
          if (!element.id) {
            element.id = 'hero-section';
          }
          observerRef.current.observe(element);
        }
      });
    };

    // Set up observation after DOM is ready
    const timeoutId = setTimeout(observeElements, 100);

    return () => {
      clearTimeout(timeoutId);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [location.pathname, isScrolling, setActiveSection]);

  /**
   * Handle initial section detection from URL hash
   */
  useEffect(() => {
    if (location.pathname !== '/home') {
      return;
    }

    // Set initial active section based on URL hash
    if (location.hash) {
      const hash = location.hash.substring(1);
      const section = NAVIGATION_SECTIONS.find(s => s.hash === hash);
      if (section) {
        setActiveSectionState(section.id);
        
        // Scroll to section after a brief delay to ensure DOM is ready
        setTimeout(() => {
          scrollToSection(section.id, { behavior: 'instant' });
        }, 100);
      }
    } else {
      // No hash means we're at the top (hero section)
      setActiveSectionState('hero');
    }
  }, [location.hash, location.pathname, scrollToSection]);

  /**
   * Handle browser back/forward navigation
   */
  useEffect(() => {
    const handlePopState = () => {
      if (location.pathname === '/home') {
        if (location.hash) {
          const hash = location.hash.substring(1);
          const section = NAVIGATION_SECTIONS.find(s => s.hash === hash);
          if (section) {
            scrollToSection(section.id, { behavior: 'smooth' });
          }
        } else {
          scrollToSection('hero', { behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [location.hash, location.pathname, scrollToSection]);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Return the complete navigation interface
  return {
    // State
    activeSection,
    isScrolling,
    isMobileMenuOpen,
    sections: NAVIGATION_SECTIONS,
    
    // Actions
    navigateToSection,
    setActiveSection,
    toggleMobileMenu,
    closeMobileMenu,
    openMobileMenu
  };
}