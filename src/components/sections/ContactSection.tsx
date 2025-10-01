'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Earth from '@/components/ui/globe';
import { SparklesCore } from '@/components/ui/sparkles';
import { Label } from '@/components/ui/label';
import { Check, Loader2, Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

export const ContactSection = () => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true, amount: 0.3 });

  // EmailJS credentials
  const SERVICE_ID = 'service_zbluk9d';
  const TEMPLATE_ID = 'template_9gza6c8';
  const PUBLIC_KEY = 'gGNojYCaskp2rIiCe';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
        to_name: 'Lalith',
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      
      setName('');
      setEmail('');
      setMessage('');
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen flex items-center section-padding py-16 sm:py-24">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="space-y-16"
        >
          <div className="text-center space-y-6">
            <motion.h2 
              className="text-3xl sm:text-5xl md:text-7xl font-bold text-gradient"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Let's Connect
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Presenting you with the best UI possible. Let's discuss your next project and create something extraordinary together.
            </motion.p>
          </div>

          <div className="relative w-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]"
              style={{
                background: `radial-gradient(circle at center, hsl(173 80% 40%), transparent 70%)`,
              }}
            />
            <div
              className="absolute right-0 bottom-0 h-[300px] w-[300px] rounded-full opacity-10 blur-[100px]"
              style={{
                background: `radial-gradient(circle at center, hsl(172 82% 60%), transparent 70%)`,
              }}
            />

            <div className="relative z-10 border-border/40 bg-secondary/20 mx-auto max-w-6xl overflow-hidden rounded-[28px] border shadow-xl backdrop-blur-sm">
              <div className="grid lg:grid-cols-2">
                <div className="relative p-8 md:p-12" ref={formRef}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex w-full gap-2"
              >
                <h2 className="from-foreground to-foreground/80 mb-2 bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl">
                  Contact
                </h2>
                <span className="text-primary relative z-10 w-full text-4xl font-bold tracking-tight italic md:text-5xl">
                  Us
                </span>
                <SparklesCore
                  id="tsparticles"
                  background="transparent"
                  minSize={0.6}
                  maxSize={1.4}
                  particleDensity={500}
                  className="absolute inset-0 top-0 h-24 w-full"
                  particleColor="hsl(173 80% 40%)"
                />
              </motion.div>

              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.3 }}
                onSubmit={handleSubmit}
                className="mt-8 space-y-6"
              >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      required
                      className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                    />
            </motion.div>

            <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                    />
                  </motion.div>
                </div>
                
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your message"
                    required
                    className="h-40 resize-none bg-background/50 border-border/50 focus:border-primary transition-colors"
                  />
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full"
                >
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-primary text-primary-foreground shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset] hover:shadow-glow transition-all duration-500"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </span>
                    ) : isSubmitted ? (
                      <span className="flex items-center justify-center">
                        <Check className="mr-2 h-4 w-4" />
                        Message Sent!
                      </span>
                    ) : (
                      <span>Send Message</span>
                    )}
                  </Button>
                </motion.div>
              </motion.form>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative my-8 flex items-center justify-center overflow-hidden p-8"
            >
              <div className="flex flex-col items-center justify-center overflow-hidden w-full">
                <article className="relative mx-auto h-[400px] min-h-80 max-w-[500px] w-full overflow-hidden rounded-3xl border bg-gradient-to-b from-primary to-primary/5 p-8 text-3xl tracking-tight text-primary-foreground md:h-[500px] md:min-h-96 md:p-10 md:text-4xl md:leading-[1.05] lg:text-5xl">
                  Presenting you with the best UI possible.
                  <div className="absolute -right-20 -bottom-20 z-10 mx-auto flex h-full w-full max-w-[350px] items-center justify-center transition-all duration-700 hover:scale-105 md:-right-28 md:-bottom-28 md:max-w-[600px]">
                    <Earth
                      scale={1.2}
                      baseColor={[0.2, 0.7, 0.6]}
                      markerColor={[0, 0, 0]}
                      glowColor={[0.2, 0.7, 0.6]}
                    />
                  </div>
                </article>
              </div>
            </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};