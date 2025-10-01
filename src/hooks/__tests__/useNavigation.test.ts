/**
 * Tests for the useNavigation hook
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useNavigation, NAVIGATION_SECTIONS } from '../useNavigation';

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({
      pathname: '/home',
      hash: '',
      search: '',
      state: null,
      key: 'default'
    })
  };
});

// Mock DOM methods
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true
});

Object.defineProperty(window, 'IntersectionObserver', {
  value: vi.fn().mockImplementation((callback) => ({
    observe: vi.fn(),
    disconnect: vi.fn(),
    unobserve: vi.fn()
  })),
  writable: true
});

// Mock getElementById
const mockGetElementById = vi.fn();
Object.defineProperty(document, 'getElementById', {
  value: mockGetElementById,
  writable: true
});

// Wrapper component for React Router
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('useNavigation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset window location
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/home',
        hash: '',
        search: '',
        href: 'http://localhost:3000/home'
      },
      writable: true
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useNavigation(), { wrapper });

    expect(result.current.activeSection).toBe('hero');
    expect(result.current.isScrolling).toBe(false);
    expect(result.current.isMobileMenuOpen).toBe(false);
    expect(result.current.sections).toEqual(NAVIGATION_SECTIONS);
  });

  it('should provide navigation actions', () => {
    const { result } = renderHook(() => useNavigation(), { wrapper });

    expect(typeof result.current.navigateToSection).toBe('function');
    expect(typeof result.current.setActiveSection).toBe('function');
    expect(typeof result.current.toggleMobileMenu).toBe('function');
    expect(typeof result.current.closeMobileMenu).toBe('function');
    expect(typeof result.current.openMobileMenu).toBe('function');
  });

  it('should toggle mobile menu', () => {
    const { result } = renderHook(() => useNavigation(), { wrapper });

    act(() => {
      result.current.toggleMobileMenu();
    });

    expect(result.current.isMobileMenuOpen).toBe(true);

    act(() => {
      result.current.toggleMobileMenu();
    });

    expect(result.current.isMobileMenuOpen).toBe(false);
  });

  it('should open and close mobile menu', () => {
    const { result } = renderHook(() => useNavigation(), { wrapper });

    act(() => {
      result.current.openMobileMenu();
    });

    expect(result.current.isMobileMenuOpen).toBe(true);

    act(() => {
      result.current.closeMobileMenu();
    });

    expect(result.current.isMobileMenuOpen).toBe(false);
  });

  it('should set active section', () => {
    const { result } = renderHook(() => useNavigation(), { wrapper });

    act(() => {
      result.current.setActiveSection('about');
    });

    expect(result.current.activeSection).toBe('about');
  });

  it('should navigate to hero section', () => {
    const { result } = renderHook(() => useNavigation(), { wrapper });

    act(() => {
      result.current.navigateToSection('hero');
    });

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    });
    expect(result.current.isScrolling).toBe(true);
  });

  it('should navigate to section with element', () => {
    const mockElement = document.createElement('div');
    mockElement.getBoundingClientRect = vi.fn().mockReturnValue({
      top: 500,
      height: 200
    });
    
    mockGetElementById.mockReturnValue(mockElement);

    const { result } = renderHook(() => useNavigation(), { wrapper });

    act(() => {
      result.current.navigateToSection('about');
    });

    expect(mockGetElementById).toHaveBeenCalledWith('about');
    expect(window.scrollTo).toHaveBeenCalled();
    expect(result.current.isScrolling).toBe(true);
  });

  it('should close mobile menu when navigating', () => {
    const { result } = renderHook(() => useNavigation(), { wrapper });

    // Open mobile menu first
    act(() => {
      result.current.openMobileMenu();
    });

    expect(result.current.isMobileMenuOpen).toBe(true);

    // Navigate to section
    act(() => {
      result.current.navigateToSection('about');
    });

    expect(result.current.isMobileMenuOpen).toBe(false);
  });

  it('should handle navigation sections configuration', () => {
    const { result } = renderHook(() => useNavigation(), { wrapper });

    expect(result.current.sections).toHaveLength(8);
    expect(result.current.sections[0]).toEqual({
      id: 'hero',
      title: 'Home',
      hash: null
    });
    expect(result.current.sections[1]).toEqual({
      id: 'about',
      title: 'About',
      hash: 'about'
    });
  });

  it('should navigate to different route when not on home page', () => {
    // Mock being on a different page
    vi.mocked(require('react-router-dom').useLocation).mockReturnValue({
      pathname: '/projects',
      hash: '',
      search: '',
      state: null,
      key: 'default'
    });

    const { result } = renderHook(() => useNavigation(), { wrapper });

    act(() => {
      result.current.navigateToSection('about');
    });

    expect(mockNavigate).toHaveBeenCalledWith('/home#about');
  });
});