/**
 * Example component demonstrating the useNavigation hook usage
 * This shows how the core navigation infrastructure works
 */

import React from 'react';
import { useNavigation } from '@/hooks/useNavigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const NavigationExample: React.FC = () => {
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
    <div className="p-6 bg-card rounded-lg border">
      <h3 className="text-lg font-semibold mb-4">Navigation Infrastructure Demo</h3>
      
      {/* Current State Display */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Active Section:</span>
          <Badge variant="default">{activeSection}</Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Is Scrolling:</span>
          <Badge variant={isScrolling ? "destructive" : "secondary"}>
            {isScrolling ? "Yes" : "No"}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Mobile Menu:</span>
          <Badge variant={isMobileMenuOpen ? "destructive" : "secondary"}>
            {isMobileMenuOpen ? "Open" : "Closed"}
          </Badge>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="mb-6">
        <h4 className="text-md font-medium mb-3">Section Navigation</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? "default" : "outline"}
              size="sm"
              onClick={() => navigateToSection(section.id)}
              className="text-xs"
            >
              {section.title}
            </Button>
          ))}
        </div>
      </div>

      {/* Mobile Menu Controls */}
      <div className="mb-6">
        <h4 className="text-md font-medium mb-3">Mobile Menu Controls</h4>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleMobileMenu}
          >
            Toggle Menu
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={closeMobileMenu}
            disabled={!isMobileMenuOpen}
          >
            Close Menu
          </Button>
        </div>
      </div>

      {/* Section Information */}
      <div>
        <h4 className="text-md font-medium mb-3">Available Sections</h4>
        <div className="space-y-1">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`text-sm p-2 rounded ${
                activeSection === section.id 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-muted-foreground'
              }`}
            >
              <span className="font-medium">{section.title}</span>
              {section.hash && (
                <span className="ml-2 text-xs opacity-70">#{section.hash}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};