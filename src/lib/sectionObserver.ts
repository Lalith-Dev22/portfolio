/**
 * Efficient intersection observer system for section tracking
 * Provides optimized section detection with proper cleanup and error handling
 */

import { NAVIGATION_SECTIONS, type NavigationSection } from '@/hooks/useNavigation';
import { throttle } from './navigationUtils';

// Observer configuration interface
export interface SectionObserverConfig {
  threshold?: number | number[];
  rootMargin?: string;
  updateDelay?: number;
  debugMode?: boolean;
}

// Section visibility information
export interface SectionVisibility {
  sectionId: string;
  element: HTMLElement;
  isVisible: boolean;
  intersectionRatio: number;
  boundingRect: DOMRectReadOnly;
}

// Callback function type for section changes
export type SectionChangeCallback = (activeSection: string, visibilityData: SectionVisibility[]) => void;

// Default observer configuration
const DEFAULT_CONFIG: Required<SectionObserverConfig> = {
  threshold: [0.1, 0.3, 0.5, 0.7],
  rootMargin: '-10% 0px -30% 0px',
  updateDelay: 100,
  debugMode: false
};

/**
 * Advanced section observer class for efficient section tracking
 */
export class SectionObserver {
  private observer: IntersectionObserver | null = null;
  private config: Required<SectionObserverConfig>;
  private callback: SectionChangeCallback | null = null;
  private observedElements = new Map<string, HTMLElement>();
  private visibilityData = new Map<string, SectionVisibility>();
  private isActive = false;
  private throttledUpdate: () => void;

  constructor(config: SectionObserverConfig = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.throttledUpdate = throttle(this.updateActiveSection.bind(this), this.config.updateDelay);
  }

  /**
   * Initialize the observer with a callback function
   */
  public initialize(callback: SectionChangeCallback): void {
    this.callback = callback;
    this.createObserver();
    this.isActive = true;
    
    if (this.config.debugMode) {
      console.log('SectionObserver initialized with config:', this.config);
    }
  }

  /**
   * Start observing sections
   */
  public observe(): void {
    if (!this.observer || !this.isActive) {
      console.warn('SectionObserver not properly initialized');
      return;
    }

    this.findAndObserveSections();
    
    if (this.config.debugMode) {
      console.log(`Observing ${this.observedElements.size} sections:`, 
        Array.from(this.observedElements.keys()));
    }
  }

  /**
   * Stop observing and cleanup
   */
  public disconnect(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    
    this.observedElements.clear();
    this.visibilityData.clear();
    this.isActive = false;
    
    if (this.config.debugMode) {
      console.log('SectionObserver disconnected');
    }
  }

  /**
   * Get current visibility data for all observed sections
   */
  public getVisibilityData(): SectionVisibility[] {
    return Array.from(this.visibilityData.values());
  }

  /**
   * Get the currently active section
   */
  public getActiveSection(): string {
    const visibilityData = this.getVisibilityData();
    return this.determineActiveSection(visibilityData);
  }

  /**
   * Manually trigger a section update (useful for programmatic navigation)
   */
  public forceUpdate(): void {
    if (this.isActive) {
      this.updateActiveSection();
    }
  }

  /**
   * Check if a specific section is currently visible
   */
  public isSectionVisible(sectionId: string): boolean {
    const data = this.visibilityData.get(sectionId);
    return data ? data.isVisible : false;
  }

  /**
   * Get intersection ratio for a specific section
   */
  public getSectionIntersectionRatio(sectionId: string): number {
    const data = this.visibilityData.get(sectionId);
    return data ? data.intersectionRatio : 0;
  }

  /**
   * Create the intersection observer instance
   */
  private createObserver(): void {
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        threshold: this.config.threshold,
        rootMargin: this.config.rootMargin
      }
    );
  }

  /**
   * Handle intersection observer entries
   */
  private handleIntersection(entries: IntersectionObserverEntry[]): void {
    let hasChanges = false;

    entries.forEach(entry => {
      const sectionId = this.getSectionIdFromElement(entry.target as HTMLElement);
      if (!sectionId) return;

      const visibilityData: SectionVisibility = {
        sectionId,
        element: entry.target as HTMLElement,
        isVisible: entry.isIntersecting,
        intersectionRatio: entry.intersectionRatio,
        boundingRect: entry.boundingClientRect
      };

      // Update visibility data
      const previousData = this.visibilityData.get(sectionId);
      this.visibilityData.set(sectionId, visibilityData);

      // Check if there's a meaningful change
      if (!previousData || 
          previousData.isVisible !== visibilityData.isVisible ||
          Math.abs(previousData.intersectionRatio - visibilityData.intersectionRatio) > 0.1) {
        hasChanges = true;
      }

      if (this.config.debugMode) {
        console.log(`Section ${sectionId}:`, {
          visible: entry.isIntersecting,
          ratio: entry.intersectionRatio.toFixed(2),
          rect: entry.boundingClientRect
        });
      }
    });

    // Throttle updates to prevent excessive callback calls
    if (hasChanges) {
      this.throttledUpdate();
    }
  }

  /**
   * Update the active section based on current visibility data
   */
  private updateActiveSection(): void {
    if (!this.callback || !this.isActive) return;

    const visibilityData = this.getVisibilityData();
    const activeSection = this.determineActiveSection(visibilityData);
    
    this.callback(activeSection, visibilityData);
  }

  /**
   * Determine which section should be considered active
   */
  private determineActiveSection(visibilityData: SectionVisibility[]): string {
    // Filter to only visible sections
    const visibleSections = visibilityData.filter(data => data.isVisible);
    
    if (visibleSections.length === 0) {
      // No sections visible, determine based on scroll position
      return this.getActiveSectionByScrollPosition();
    }

    // Find section with highest intersection ratio
    let bestSection = visibleSections[0];
    let bestScore = this.calculateSectionScore(bestSection);

    visibleSections.forEach(section => {
      const score = this.calculateSectionScore(section);
      if (score > bestScore) {
        bestSection = section;
        bestScore = score;
      }
    });

    return bestSection.sectionId;
  }

  /**
   * Calculate a score for section visibility (higher = more active)
   */
  private calculateSectionScore(visibility: SectionVisibility): number {
    const { intersectionRatio, boundingRect } = visibility;
    
    // Base score from intersection ratio
    let score = intersectionRatio;
    
    // Bonus for sections that are more centered in viewport
    const viewportCenter = window.innerHeight / 2;
    const elementCenter = boundingRect.top + (boundingRect.height / 2);
    const distanceFromCenter = Math.abs(viewportCenter - elementCenter);
    const centerBonus = Math.max(0, 1 - (distanceFromCenter / window.innerHeight));
    
    // Combine scores
    score = (score * 0.7) + (centerBonus * 0.3);
    
    return score;
  }

  /**
   * Fallback method to determine active section by scroll position
   */
  private getActiveSectionByScrollPosition(): string {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    // If at the top, return hero
    if (scrollY < 200) {
      return 'hero';
    }

    // Find the section closest to the top of the viewport
    let closestSection = 'hero';
    let closestDistance = Infinity;

    this.observedElements.forEach((element, sectionId) => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrollY;
      const distance = Math.abs(scrollY + 100 - elementTop); // 100px offset

      if (distance < closestDistance) {
        closestDistance = distance;
        closestSection = sectionId;
      }
    });

    return closestSection;
  }

  /**
   * Find and observe all relevant sections in the DOM
   */
  private findAndObserveSections(): void {
    if (!this.observer) return;

    // Clear existing observations
    this.observedElements.clear();
    this.visibilityData.clear();

    // Observe sections based on navigation configuration
    NAVIGATION_SECTIONS.forEach(section => {
      if (section.hash) {
        const element = document.getElementById(section.hash);
        if (element) {
          this.observer!.observe(element);
          this.observedElements.set(section.id, element);
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
      const element = document.querySelector(selector) as HTMLElement;
      if (element && !this.observedElements.has('hero')) {
        // Ensure it has an ID for easier tracking
        if (!element.id) {
          element.id = 'hero-section';
        }
        this.observer!.observe(element);
        this.observedElements.set('hero', element);
      }
    });
  }

  /**
   * Get section ID from a DOM element
   */
  private getSectionIdFromElement(element: HTMLElement): string | null {
    const elementId = element.id;
    
    // Direct ID match
    const directMatch = NAVIGATION_SECTIONS.find(s => s.hash === elementId);
    if (directMatch) {
      return directMatch.id;
    }

    // Hero section special cases
    if (elementId === 'hero' || elementId === 'home' || elementId === 'hero-section' ||
        element.classList.contains('hero-section') || 
        element.classList.contains('home-section')) {
      return 'hero';
    }

    // Check if element is mapped in our observed elements
    for (const [sectionId, observedElement] of this.observedElements.entries()) {
      if (observedElement === element) {
        return sectionId;
      }
    }

    return null;
  }
}

/**
 * Factory function to create a configured section observer
 */
export function createSectionObserver(
  callback: SectionChangeCallback,
  config: SectionObserverConfig = {}
): SectionObserver {
  const observer = new SectionObserver(config);
  observer.initialize(callback);
  return observer;
}

/**
 * Hook-like function for easy integration with React components
 */
export function useSectionObserver(
  callback: SectionChangeCallback,
  config: SectionObserverConfig = {},
  dependencies: any[] = []
): SectionObserver {
  // This would typically use React hooks, but since we're in a utility file,
  // we'll return a configured observer that can be managed manually
  return createSectionObserver(callback, config);
}

/**
 * Utility to check if intersection observer is supported
 */
export function isIntersectionObserverSupported(): boolean {
  return 'IntersectionObserver' in window &&
         'IntersectionObserverEntry' in window &&
         'intersectionRatio' in window.IntersectionObserverEntry.prototype;
}

/**
 * Polyfill or fallback for browsers without intersection observer support
 */
export function createFallbackObserver(
  callback: SectionChangeCallback,
  config: SectionObserverConfig = {}
): { observe: () => void; disconnect: () => void } {
  let isActive = false;
  let intervalId: NodeJS.Timeout | null = null;

  const checkSections = () => {
    if (!isActive) return;

    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    let activeSection = 'hero';

    if (scrollY >= 200) {
      // Simple fallback logic
      NAVIGATION_SECTIONS.forEach(section => {
        if (section.hash) {
          const element = document.getElementById(section.hash);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
              activeSection = section.id;
            }
          }
        }
      });
    }

    callback(activeSection, []);
  };

  return {
    observe: () => {
      isActive = true;
      intervalId = setInterval(checkSections, config.updateDelay || 200);
    },
    disconnect: () => {
      isActive = false;
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }
  };
}