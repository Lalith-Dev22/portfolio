import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SplineBackground } from './SplineBackground';
import { ChevronDown } from 'lucide-react';

export const LandingPage = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleKnowMore = () => {
    navigate('/home');
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-background snap-y snap-mandatory" style={{ overflowY: 'auto' }} role="main" aria-label="Landing page">
      {/* Floating Spline Background */}
      <SplineBackground className="opacity-30" />
      
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
            <motion.h1 
              className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black leading-none tracking-tighter text-gradient-animate"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            >
              DEVELOPER
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg sm:text-2xl md:text-4xl lg:text-6xl font-light tracking-wide text-muted-foreground"
            >
              Creative Developer
            </motion.div>
          </div>

          {/* Unique Introduction */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="max-w-2xl mx-auto space-y-6 px-4"
          >
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed text-center">
              Crafting digital experiences that blur the line between art and technology. 
              Where pixels meet passion, and code becomes poetry.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
              <span className="glass-card px-2 py-1 sm:px-4 sm:py-2">Fullstack Developer</span>
              <span className="glass-card px-2 py-1 sm:px-4 sm:py-2">Frontend Developer</span>
              <span className="glass-card px-2 py-1 sm:px-4 sm:py-2">UI/UX Designer</span>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="space-y-8"
          >
            <Button 
              onClick={handleKnowMore}
              size="lg"
              aria-label="Navigate to portfolio sections"
              className="bg-gradient-primary hover:shadow-glow transition-all duration-500 hover:scale-105 text-sm sm:text-lg md:text-xl px-6 py-3 sm:px-8 sm:py-4 md:px-12 md:py-6 rounded-full font-semibold w-auto min-h-[48px]"
            >
              Discover My Universe
            </Button>
            
            {/* Scroll Indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center space-y-2 opacity-60"
            >
              <span className="text-xs sm:text-sm tracking-wider">SCROLL TO EXPLORE</span>
              <ChevronDown className="h-4 w-4 sm:h-6 sm:w-6" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Secondary Content Section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center section-padding snap-start snap-always">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto text-center space-y-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-gradient">
            The Art of Digital Craftsmanship
          </h2>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Vision",
                description: "Transforming ideas into immersive digital experiences"
              },
              {
                title: "Innovation", 
                description: "Pushing boundaries with cutting-edge technologies"
              },
              {
                title: "Excellence",
                description: "Delivering perfection in every pixel and interaction"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="glass-card p-4 sm:p-6 md:p-8 space-y-4 hover:bg-card/20 transition-all duration-500"
              >
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary">{item.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
};