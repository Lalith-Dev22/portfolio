import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Github, Linkedin, Twitter, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Monitor } from 'lucide-react'; 
// Import WhatsApp icon
import { MessageCircle } from 'lucide-react';

export const ShareButton = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/Lalith-04',
      color: 'hover:text-gray-400'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/lalith-dev/',
      color: 'hover:text-blue-400'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: 'https://wa.me/+918050633809',
      color: 'hover:text-green-500'
    },
     {
      name: 'Portfolio',
      icon: Monitor,
      url: 'https://lalithdev.vercel.app/',
      color: 'hover:text-green-400'
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide on mobile when scrolling down, show when scrolling up
      if (window.innerWidth <= 768) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleShare = (url: string, name: string) => {
    if (name === 'Email') {
      window.location.href = url;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-4 right-4 md:top-6 md:right-6 z-50"
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button
                size="icon"
                className="glass-card bg-primary/90 hover:bg-primary border border-primary/50 hover:border-primary transition-all duration-300 group h-12 w-12 md:h-14 md:w-14 rounded-full hover:shadow-glow shadow-lg backdrop-blur-md"
              >
                <Share2 className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground group-hover:rotate-12 transition-transform duration-300" />
              </Button>
            </PopoverTrigger>
            
            <PopoverContent 
              className="w-64 p-4 glass-card bg-background/95 border border-primary/30 shadow-xl backdrop-blur-md"
              align="end"
              sideOffset={8}
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Connect with me</h4>
                  <p className="text-sm text-muted-foreground">
                    Let's build something amazing together
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {socialLinks.map((social, index) => (
                    <motion.button
                      key={social.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.1 }}
                      onClick={() => handleShare(social.url, social.name)}
                      className={`flex items-center gap-2 p-3 rounded-lg glass-card bg-card/40 hover:bg-primary/20 border border-primary/20 hover:border-primary/50 transition-all duration-200 text-sm group ${social.color} hover:shadow-md`}
                    >
                      <social.icon className="h-4 w-4 text-muted-foreground group-hover:text-inherit transition-colors" />
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                        {social.name}
                      </span>
                      <ExternalLink className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </motion.div>
      )}
    </AnimatePresence>
  );
};