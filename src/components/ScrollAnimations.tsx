import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollAnimationProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

export const ScrollAnimation = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.4, // Faster default duration
  className = '',
  threshold = 0.1 // Lower threshold for earlier triggering
}: ScrollAnimationProps) => {
  const ref = useRef(null);
  // Reduced margin and added threshold for smoother triggering
  const isInView = useInView(ref, { 
    once: true, 
    margin: '-50px', // Reduced from -100px
    amount: threshold 
  });
  const controls = useAnimation();

  // Reduced initial displacement for smoother effect
  const directionVariants = {
    up: { y: 40, opacity: 0 }, // Reduced from 60
    down: { y: -40, opacity: 0 }, // Reduced from -60
    left: { x: 40, opacity: 0 }, // Reduced from 60
    right: { x: -40, opacity: 0 } // Reduced from -60
  };

  useEffect(() => {
    if (isInView) {
      controls.start({
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          duration,
          delay,
          // Smoother, more natural easing
          ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuart
          type: "spring",
          stiffness: 100,
          damping: 15
        }
      });
    }
  }, [isInView, controls, delay, duration]);

  return (
    <motion.div
      ref={ref}
      initial={directionVariants[direction]}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
  threshold?: number;
}

export const StaggerContainer = ({ 
  children, 
  staggerDelay = 0.08, // Slightly faster stagger
  className = '',
  threshold = 0.1
}: StaggerContainerProps) => {
  const ref = useRef(null);
  // Reduced margin and added threshold
  const isInView = useInView(ref, { 
    once: true, 
    margin: '-30px', // Reduced from -50px
    amount: threshold 
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            duration: 0.3 // Added container duration
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ 
  children, 
  direction = 'up',
  className = ''
}: { 
  children: ReactNode; 
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}) => {
  // Reduced displacement for smoother stagger effect
  const directionVariants = {
    up: { y: 20, opacity: 0 }, // Reduced from 30
    down: { y: -20, opacity: 0 }, // Reduced from -30
    left: { x: 20, opacity: 0 }, // Reduced from 30
    right: { x: -20, opacity: 0 } // Reduced from -30
  };

  return (
    <motion.div
      variants={{
        hidden: directionVariants[direction],
        visible: {
          x: 0,
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.4, // Faster duration
            ease: [0.25, 0.46, 0.45, 0.94], // Smoother easing
            type: "spring",
            stiffness: 120,
            damping: 12
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Enhanced Button with improved hover effects
interface EnhancedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const EnhancedButton = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = ''
}: EnhancedButtonProps) => {
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border-2 border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/50'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      whileHover={{ 
        scale: 1.02, // Reduced scale for subtler effect
        y: -1, // Reduced lift
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ 
        scale: 0.98, // Less aggressive tap scale
        transition: { duration: 0.1 }
      }}
      onClick={onClick}
      className={`
        ${variants[variant]} 
        ${sizes[size]} 
        font-semibold rounded-xl transition-all duration-200
        relative overflow-hidden group
        transform-gpu will-change-transform
        ${className}
      `}
      style={{
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.2s ease-out'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
      }}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/20"
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ 
          opacity: 1, 
          scale: 1,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

// Optional: Performance-optimized version for heavy pages
interface FastScrollAnimationProps extends ScrollAnimationProps {
  reducedMotion?: boolean;
}

export const FastScrollAnimation = ({ 
  children, 
  direction = 'up',
  delay = 0,
  duration = 0.3,
  className = '',
  threshold = 0.05,
  reducedMotion = false
}: FastScrollAnimationProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: '0px', // No margin for immediate triggering
    amount: threshold 
  });

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const variants = {
    up: { 
      initial: { y: 30, opacity: 0 },
      animate: { y: 0, opacity: 1 }
    },
    down: { 
      initial: { y: -30, opacity: 0 },
      animate: { y: 0, opacity: 1 }
    },
    left: { 
      initial: { x: 30, opacity: 0 },
      animate: { x: 0, opacity: 1 }
    },
    right: { 
      initial: { x: -30, opacity: 0 },
      animate: { x: 0, opacity: 1 }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={variants[direction].initial}
      animate={isInView ? variants[direction].animate : variants[direction].initial}
      transition={{
        duration,
        delay,
        ease: "easeOut"
      }}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
};