import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { GradientBars } from '@/components/ui/gradient-bars';
import { TextReveal } from '@/components/ui/text-reveal';
import Stairs from './Stairs';

export const LandingPage = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
   const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleKnowMore = () => {
    navigate('/home');
  };

  return (
    <Stairs>
      <main className="min-h-screen relative overflow-hidden bg-background snap-y snap-mandatory" style={{ overflowY: 'auto' }} role="main" aria-label="Landing page">
        {/* Gradient Bars Background */}
        <GradientBars bars={30} colors={['#00e5d8', 'transparent']} />
        
        {/* Gradient Mesh Overlay */}
        <div className="floating-bg" />
        
        {/* Hero Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center section-padding snap-start snap-always">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="text-center space-y-8"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`
            }}
          >
            {/* Main Title */}
            <div className="space-y-4">
              <div className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black leading-none tracking-tighter text-gradient-animate">
                <motion.h1 
                className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black leading-none tracking-tighter text-gradient-animate"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              >
                DEVELOPER
              </motion.h1>
              </div>
              
              <div className="text-lg sm:text-2xl md:text-4xl lg:text-6xl font-light tracking-wide text-muted-foreground">
                <TextReveal 
                  delay={0.08}
                  duration={0.8}
                  from="bottom"
                >
                  Creative Developer
                </TextReveal>
              </div>
            </div>

            {/* Unique Introduction */}
            <div className="max-w-2xl mx-auto space-y-6 px-4">
              <div className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed text-center">
                <TextReveal delay={0.05} duration={1} from="bottom">
                  Crafting digital experiences that blur the line between art and technology. 
                  Where pixels meet passion, and code becomes poetry.
                </TextReveal>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="glass-card px-2 py-1 sm:px-4 sm:py-2 hover:bg-primary/10 transition-colors"
                >
                  Fullstack Developer
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                  className="glass-card px-2 py-1 sm:px-4 sm:py-2 hover:bg-primary/10 transition-colors"
                >
                  Frontend Developer
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.8 }}
                  className="glass-card px-2 py-1 sm:px-4 sm:py-2 hover:bg-primary/10 transition-colors"
                >
                  UI/UX Designer
                </motion.span>
              </div>
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="space-y-8"
            >
               <button
              onClick={handleKnowMore}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              aria-label="Navigate to portfolio sections"
              className="
                relative overflow-hidden
                bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-300
                hover:from-teal-300 hover:via-cyan-300 hover:to-teal-200
                active:from-teal-500 active:via-cyan-500 active:to-teal-400
                text-slate-900 font-bold
                
                /* Mobile First Typography */
                text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl
                
                /* Mobile First Padding and Sizing */
                px-6 py-3 
                xs:px-8 xs:py-3.5
                sm:px-10 sm:py-4 
                md:px-12 md:py-4.5
                lg:px-14 lg:py-5
                xl:px-16 xl:py-6
                
                /* Responsive Border Radius */
                rounded-xl sm:rounded-2xl lg:rounded-full
                
                /* Responsive Min Heights */
                min-h-[44px] 
                xs:min-h-[48px]
                sm:min-h-[52px] 
                md:min-h-[56px] 
                lg:min-h-[64px]
                xl:min-h-[68px]
                
                /* Full width on mobile, centered on larger screens */
                w-full max-w-xs
                xs:max-w-sm
                sm:max-w-md sm:w-auto
                md:max-w-lg
                lg:max-w-xl
                
                /* Transform and transitions with reduced motion support */
                transform transition-all duration-500 ease-out
                hover:scale-105 sm:hover:scale-110 
                hover:-translate-y-0.5 sm:hover:-translate-y-1
                active:scale-95 active:translate-y-0
                
                /* Responsive shadows */
                shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-2xl
                shadow-teal-500/20 sm:shadow-teal-500/30 
                hover:shadow-teal-400/30 sm:hover:shadow-teal-400/50
                
                /* Responsive borders */
                border border-teal-300/20 sm:border-teal-300/30 
                hover:border-teal-200/40 sm:hover:border-teal-200/50
                
                group cursor-pointer
                
                /* Touch-friendly tap targets */
                touch-manipulation select-none
                
                /* Focus styles for accessibility */
                focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2
                focus:ring-offset-slate-900
                
                /* Shimmer effect */
                before:absolute before:inset-0 
                before:rounded-xl sm:before:rounded-2xl lg:before:rounded-full
                before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
                before:translate-x-[-100%] hover:before:translate-x-[100%]
                before:transition-transform before:duration-700 before:ease-in-out
                
                /* Prevent text selection */
                select-none
              "
            >
              {/* Animated background glow - responsive sizing */}
              <div className={`
                absolute inset-0 
                rounded-xl sm:rounded-2xl lg:rounded-full
                bg-gradient-to-r from-teal-400 to-cyan-400
                opacity-0 group-hover:opacity-20 sm:group-hover:opacity-30
                blur-md sm:blur-xl 
                transition-all duration-500
                ${isHovered ? 'scale-125 sm:scale-150' : 'scale-100'}
              `} />
              
              {/* Button text with responsive spacing and animation */}
              <span className="
                relative z-10 flex items-center justify-center 
                gap-2 xs:gap-2.5 sm:gap-3
                transition-all duration-300
                group-hover:text-slate-800
                font-medium sm:font-bold
              ">
                {/* Responsive button text */}
                <span className="
                  block
                  text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl
                  tracking-wide sm:tracking-normal
                ">
                  Discover My Portfolio
                </span>
                
                {/* Animated arrow with responsive sizing */}
                <svg 
                  className={`
                    w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6
                    transition-all duration-300
                    ${isHovered ? 'translate-x-0.5 sm:translate-x-1 scale-105 sm:scale-110' : 'translate-x-0'}
                  `}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2.5} 
                    d="M13 7l5 5m0 0l-5 5m5-5H6" 
                  />
                </svg>
              </span>
              
              {/* Ripple effect on click/tap */}
              <div className="
                absolute inset-0 
                rounded-xl sm:rounded-2xl lg:rounded-full
                bg-white/20 opacity-0 scale-0
                group-active:opacity-100 group-active:scale-100
                transition-all duration-200
              " />
            </button>

            {/* Hover particles - only show on larger screens to avoid performance issues */}
            {/* {isHovered && (
              <div className="hidden sm:block">
                <div className="absolute -top-1 sm:-top-2 -left-1 sm:-left-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-teal-300 rounded-full animate-ping" />
                <div className="absolute -top-2 sm:-top-3 -right-0.5 sm:-right-1 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-cyan-300 rounded-full animate-pulse delay-100" />
                <div className="absolute -bottom-1 sm:-bottom-2 -right-1 sm:-right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-teal-400 rounded-full animate-ping delay-200" />
                <div className="absolute -bottom-0.5 sm:-bottom-1 -left-2 sm:-left-3 w-0.5 sm:w-1 h-0.5 sm:h-1 bg-cyan-400 rounded-full animate-pulse delay-300" />
              </div>
            )} */}
              
              {/* Scroll Indicator - commented out as in original
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col items-center space-y-2 opacity-60"
              >
                <span className="text-xs sm:text-sm tracking-wider">SCROLL TO EXPLORE</span>
                <ChevronDown className="h-4 w-4 sm:h-6 sm:w-6" />
              </motion.div> */}
            </motion.div>
          </motion.div>
        </div>
      </main>
    </Stairs>
  );
};