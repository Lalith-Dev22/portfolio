# Navigation Infrastructure

This directory contains the core navigation infrastructure for the portfolio application, providing centralized navigation state management, section detection, and smooth scrolling functionality.

## Overview

The navigation system consists of three main components:

1. **`useNavigation` Hook** - Central navigation state management
2. **Navigation Utilities** - Helper functions for scrolling and URL management
3. **Section Observer** - Efficient intersection observer system for section tracking

## Core Features

### ✅ Centralized Navigation State
- Single source of truth for navigation state
- Active section tracking
- Mobile menu state management
- Scroll state management

### ✅ Smooth Scrolling & URL Management
- Smooth scroll to sections with proper offset calculation
- URL hash synchronization without page reloads
- Browser back/forward navigation support
- Fallback for browsers without smooth scroll support

### ✅ Efficient Section Detection
- Intersection Observer API for performance
- Throttled updates to prevent excessive re-renders
- Fallback scroll-based detection
- Configurable thresholds and margins

### ✅ Mobile-First Design
- Mobile menu state management
- Touch-friendly navigation
- Responsive behavior
- Background scroll prevention

## Usage

### Basic Navigation Hook

```typescript
import { useNavigation } from '@/hooks/useNavigation';

function NavigationComponent() {
  const {
    activeSection,
    isScrolling,
    isMobileMenuOpen,
    sections,
    navigateToSection,
    toggleMobileMenu,
    closeMobileMenu
  } = useNavigation();

  return (
    <nav>
      {sections.map(section => (
        <button
          key={section.id}
          onClick={() => navigateToSection(section.id)}
          className={activeSection === section.id ? 'active' : ''}
        >
          {section.title}
        </button>
      ))}
    </nav>
  );
}
```

### Navigation Utilities

```typescript
import { 
  scrollToSection, 
  updateUrlHash, 
  getCurrentHash,
  findSectionById 
} from '@/lib/navigationUtils';

// Scroll to a section
await scrollToSection('about', { 
  behavior: 'smooth', 
  offset: 100 
});

// Update URL hash
updateUrlHash('about');

// Get current hash
const hash = getCurrentHash(); // Returns 'about' or null

// Find section by ID
const section = findSectionById('about');
```

### Section Observer

```typescript
import { createSectionObserver } from '@/lib/sectionObserver';

const observer = createSectionObserver(
  (activeSection, visibilityData) => {
    console.log('Active section:', activeSection);
    console.log('Visibility data:', visibilityData);
  },
  {
    threshold: [0.3, 0.7],
    rootMargin: '-10% 0px -30% 0px',
    debugMode: true
  }
);

observer.observe();

// Cleanup
observer.disconnect();
```

## Configuration

### Navigation Sections

The navigation sections are configured in `useNavigation.ts`:

```typescript
export const NAVIGATION_SECTIONS: NavigationSection[] = [
  { id: 'hero', title: 'Home', hash: null },
  { id: 'about', title: 'About', hash: 'about' },
  { id: 'skills', title: 'Skills', hash: 'skills' },
  // ... more sections
];
```

### Scroll Configuration

Default scroll behavior can be customized:

```typescript
const DEFAULT_SCROLL_CONFIG: ScrollConfig = {
  behavior: 'smooth',
  block: 'start',
  offset: 80 // Account for fixed headers
};
```

### Observer Configuration

Section observer behavior is configurable:

```typescript
const DEFAULT_CONFIG: SectionObserverConfig = {
  threshold: [0.1, 0.3, 0.5, 0.7],
  rootMargin: '-10% 0px -30% 0px',
  updateDelay: 100,
  debugMode: false
};
```

## API Reference

### useNavigation Hook

#### State Properties
- `activeSection: string` - Currently active section ID
- `isScrolling: boolean` - Whether a scroll animation is in progress
- `isMobileMenuOpen: boolean` - Mobile menu open state
- `sections: NavigationSection[]` - Available navigation sections

#### Action Methods
- `navigateToSection(sectionId: string): void` - Navigate to a specific section
- `setActiveSection(sectionId: string): void` - Set active section manually
- `toggleMobileMenu(): void` - Toggle mobile menu state
- `closeMobileMenu(): void` - Close mobile menu
- `openMobileMenu(): void` - Open mobile menu

### Navigation Utilities

#### Core Functions
- `scrollToSection(sectionId, config): Promise<boolean>` - Scroll to section
- `scrollToElement(element, config): Promise<void>` - Scroll to element
- `updateUrlHash(hash, pathname): void` - Update URL hash
- `getCurrentHash(): string | null` - Get current URL hash

#### Helper Functions
- `findSectionById(identifier): NavigationSection | undefined`
- `getActiveSectionFromUrl(): string`
- `isSectionActive(sectionId): boolean`
- `getCurrentVisibleSection(): string`

#### Performance Utilities
- `throttle<T>(func: T, delay: number): T` - Throttle function calls
- `debounce<T>(func: T, delay: number): T` - Debounce function calls

#### Mobile Utilities
- `preventBodyScroll(): void` - Prevent body scrolling
- `restoreBodyScroll(): void` - Restore body scrolling

### Section Observer

#### Core Methods
- `initialize(callback): void` - Initialize observer
- `observe(): void` - Start observing sections
- `disconnect(): void` - Stop observing and cleanup
- `forceUpdate(): void` - Manually trigger update

#### Query Methods
- `getActiveSection(): string` - Get currently active section
- `getVisibilityData(): SectionVisibility[]` - Get all visibility data
- `isSectionVisible(sectionId): boolean` - Check if section is visible
- `getSectionIntersectionRatio(sectionId): number` - Get intersection ratio

## Performance Considerations

### Optimizations Implemented
- **Throttled Updates**: Section changes are throttled to prevent excessive re-renders
- **Intersection Observer**: Uses native browser API for efficient section detection
- **Cleanup**: Proper cleanup of observers and timeouts
- **Fallbacks**: Graceful degradation for older browsers

### Best Practices
- Use `navigateToSection()` instead of direct scrolling for consistency
- Clean up observers when components unmount
- Use throttled/debounced functions for scroll event handlers
- Prefer intersection observer over scroll event listeners

## Browser Support

- **Modern Browsers**: Full support with Intersection Observer API
- **Legacy Browsers**: Fallback to scroll-based detection
- **Mobile**: Optimized for touch interactions and mobile viewports

## Testing

The navigation infrastructure includes comprehensive tests:

```bash
# Run navigation tests (when test setup is available)
npm test -- useNavigation.test.ts
```

## Requirements Satisfied

This implementation satisfies the following requirements from the specification:

- **1.5**: Browser back/forward navigation with proper state maintenance
- **3.1**: Smooth scrolling to sections with proper behavior
- **3.2**: URL hash updates synchronized with section changes
- **3.5**: Automatic active navigation state updates based on scroll position
- **6.3**: Efficient section detection without performance impact
- **6.4**: Optimized navigation state updates to prevent unnecessary re-renders

## Future Enhancements

- Keyboard navigation support (arrow keys, home/end)
- Accessibility improvements (ARIA labels, focus management)
- Animation customization options
- Section preloading for faster navigation
- Analytics integration for navigation tracking