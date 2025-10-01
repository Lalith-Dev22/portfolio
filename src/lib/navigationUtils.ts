/**
 * Navigation utilities for smooth scrolling, URL hash management,
 * and section detection functionality
 */

import { NAVIGATION_SECTIONS, type NavigationSection } from '@/hooks/useNavigation';

// Scroll behavior configuration
export interface ScrollConfig {
  behavior?: 'smooth' | 'instant' | 'auto';
  block?: 'start' | 'center' | 'end' | 'nearest';
  inline?: 'start' | 'center' | 'end' | 'nearest';
  offset?: number;
}

// Default scroll configuration
export const DEFAULT_SCROLL_CONFIG: ScrollConfig = {
  behavior: 'smooth',
  block: 'start',
  offset: 80 // Account for fixed headers
};

/**
 * Smoothly scrolls to a specific element with customizable options
 */
export function scrollToElement(
  element: HTMLElement, 
  config: ScrollConfig = DEFAULT_SCROLL_CONFIG
): Promise<void> {
  return new Promise((resolve) => {
    const { behavior = 'smooth', offset = 80 } = config;
    
    // Calculate target position with offset
    const elementRect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetPosition = elementRect.top + scrollTop - offset;
    
    // Perform scroll
    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: behavior as ScrollBehavior
    });
    
    // Resolve promise after scroll animation completes
    const duration = behavior === 'smooth' ? 1000 : 100;
    setTimeout(resolve, duration);
  });
}

/**
 * Scrolls to a section by its ID with error handling
 */
export function scrollToSection(
  sectionId: string, 
  config: ScrollConfig = DEFAULT_SCROLL_CONFIG
): Promise<boolean> {
  return new Promise((resolve) => {
    // Find section configuration
    const section = NAVIGATION_SECTIONS.find(s => s.id === sectionId);
    if (!section) {
      console.warn(`Navigation section not found: ${sectionId}`);
      resolve(false);
      return;
    }
    
    // Handle hero/home section (scroll to top)
    if (section.hash === null) {
      window.scrollTo({
        top: 0,
        behavior: (config.behavior || 'smooth') as ScrollBehavior
      });
      
      const duration = config.behavior === 'smooth' ? 1000 : 100;
      setTimeout(() => resolve(true), duration);
      return;
    }
    
    // Find target element
    const element = document.getElementById(section.hash);
    if (!element) {
      console.warn(`Section element not found: ${section.hash}`);
      resolve(false);
      return;
    }
    
    // Scroll to element
    scrollToElement(element, config)
      .then(() => resolve(true))
      .catch(() => resolve(false));
  });
}

/**
 * Updates the URL hash without causing a page reload
 */
export function updateUrlHash(hash: string | null, pathname: string = window.location.pathname): void {
  const newUrl = hash ? `${pathname}#${hash}` : pathname;
  const currentUrl = window.location.pathname + window.location.hash;
  
  // Only update if the URL actually changed
  if (currentUrl !== newUrl) {
    window.history.replaceState({}, '', newUrl);
  }
}

/**
 * Gets the current hash from the URL (without the # symbol)
 */
export function getCurrentHash(): string | null {
  const hash = window.location.hash;
  return hash ? hash.substring(1) : null;
}

/**
 * Finds a navigation section by various identifiers
 */
export function findSectionById(identifier: string): NavigationSection | undefined {
  return NAVIGATION_SECTIONS.find(section => 
    section.id === identifier || 
    section.hash === identifier ||
    section.title.toLowerCase() === identifier.toLowerCase()
  );
}

/**
 * Finds a navigation section by hash
 */
export function findSectionByHash(hash: string): NavigationSection | undefined {
  return NAVIGATION_SECTIONS.find(section => section.hash === hash);
}

/**
 * Gets the section ID that should be active based on current URL
 */
export function getActiveSectionFromUrl(): string {
  const hash = getCurrentHash();
  
  if (!hash) {
    return 'hero'; // Default to hero section
  }
  
  const section = findSectionByHash(hash);
  return section ? section.id : 'hero';
}

/**
 * Checks if a given section is currently active based on URL
 */
export function isSectionActive(sectionId: string): boolean {
  const activeSection = getActiveSectionFromUrl();
  return activeSection === sectionId;
}

/**
 * Throttle function for performance optimization
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;
  
  return (...args: Parameters<T>) => {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

/**
 * Gets the scroll position with cross-browser compatibility
 */
export function getScrollPosition(): { x: number; y: number } {
  return {
    x: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
    y: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
  };
}

/**
 * Checks if an element is in the viewport
 */
export function isElementInViewport(
  element: HTMLElement, 
  threshold: number = 0.5
): boolean {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
  const verticalInView = (rect.top <= windowHeight * (1 - threshold)) && 
                        ((rect.top + rect.height) >= windowHeight * threshold);
  const horizontalInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);
  
  return verticalInView && horizontalInView;
}

/**
 * Gets the currently visible section based on scroll position
 */
export function getCurrentVisibleSection(): string {
  const scrollY = getScrollPosition().y;
  
  // Check if we're at the top (hero section)
  if (scrollY < 200) {
    return 'hero';
  }
  
  // Check each section to find which one is most visible
  let currentSection = 'hero';
  let bestMatch = 0;
  
  NAVIGATION_SECTIONS.forEach(section => {
    if (section.hash) {
      const element = document.getElementById(section.hash);
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const elementHeight = rect.height;
        
        // Calculate how much of the element is visible
        const viewportTop = scrollY;
        const viewportBottom = scrollY + window.innerHeight;
        
        const visibleTop = Math.max(elementTop, viewportTop);
        const visibleBottom = Math.min(elementTop + elementHeight, viewportBottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        
        const visibilityRatio = visibleHeight / Math.min(elementHeight, window.innerHeight);
        
        // If this section is more visible than the current best match
        if (visibilityRatio > bestMatch && visibilityRatio > 0.3) {
          bestMatch = visibilityRatio;
          currentSection = section.id;
        }
      }
    }
  });
  
  return currentSection;
}

/**
 * Prevents body scroll (useful for mobile menus)
 */
export function preventBodyScroll(): void {
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.top = `-${getScrollPosition().y}px`;
  document.body.style.width = '100%';
}

/**
 * Restores body scroll
 */
export function restoreBodyScroll(): void {
  const scrollY = document.body.style.top;
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  
  if (scrollY) {
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }
}

/**
 * Validates if a section ID exists in the navigation configuration
 */
export function isValidSectionId(sectionId: string): boolean {
  return NAVIGATION_SECTIONS.some(section => section.id === sectionId);
}

/**
 * Gets the next section in the navigation order
 */
export function getNextSection(currentSectionId: string): NavigationSection | null {
  const currentIndex = NAVIGATION_SECTIONS.findIndex(s => s.id === currentSectionId);
  if (currentIndex === -1 || currentIndex === NAVIGATION_SECTIONS.length - 1) {
    return null;
  }
  return NAVIGATION_SECTIONS[currentIndex + 1];
}

/**
 * Gets the previous section in the navigation order
 */
export function getPreviousSection(currentSectionId: string): NavigationSection | null {
  const currentIndex = NAVIGATION_SECTIONS.findIndex(s => s.id === currentSectionId);
  if (currentIndex <= 0) {
    return null;
  }
  return NAVIGATION_SECTIONS[currentIndex - 1];
}

/**
 * Creates a navigation URL for a given section
 */
export function createNavigationUrl(sectionId: string, basePath: string = '/home'): string {
  const section = findSectionById(sectionId);
  if (!section) {
    return basePath;
  }
  
  return section.hash ? `${basePath}#${section.hash}` : basePath;
}

/**
 * Handles keyboard navigation (arrow keys, etc.)
 */
export function handleKeyboardNavigation(
  event: KeyboardEvent, 
  currentSection: string,
  navigateToSection: (sectionId: string) => void
): boolean {
  // Only handle navigation keys
  if (!['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
    return false;
  }
  
  // Prevent default scrolling behavior
  event.preventDefault();
  
  switch (event.key) {
    case 'ArrowUp': {
      const prevSection = getPreviousSection(currentSection);
      if (prevSection) {
        navigateToSection(prevSection.id);
        return true;
      }
      break;
    }
    case 'ArrowDown': {
      const nextSection = getNextSection(currentSection);
      if (nextSection) {
        navigateToSection(nextSection.id);
        return true;
      }
      break;
    }
    case 'Home': {
      navigateToSection('hero');
      return true;
    }
    case 'End': {
      const lastSection = NAVIGATION_SECTIONS[NAVIGATION_SECTIONS.length - 1];
      navigateToSection(lastSection.id);
      return true;
    }
  }
  
  return false;
}