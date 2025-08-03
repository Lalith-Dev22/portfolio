import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Github, Linkedin, Loader2 } from 'lucide-react';
import { useState, useRef, FormEvent } from 'react';
import emailjs from '@emailjs/browser';

export const ContactSection = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Replace these with your actual EmailJS credentials
  const SERVICE_ID = 'service_zbluk9d';
  const TEMPLATE_ID = 'template_9gza6c8';
  const PUBLIC_KEY = 'gGNojYCaskp2rIiCe';

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Lalith', // Your name
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      console.error('EmailJS error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact me directly.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
              Ready to bring your ideas to life? Let's discuss your next project and create something extraordinary together.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-foreground">Get In Touch</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I'm always excited to work on new projects and collaborate with amazing people. 
                  Whether you have a specific idea in mind or just want to explore possibilities, 
                  I'd love to hear from you.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                {[
                  { icon: Mail, label: "Email", value: "lalithkrish24@gmail.com" },
                  { icon: Phone, label: "Phone", value: "+91 8050633809" },
                  { icon: MapPin, label: "Location", value: "Bengaluru, Karnataka, India" }
                ].map((contact, index) => (
                  <motion.div
                    key={contact.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center space-x-4 glass-card p-4 hover:bg-card/20 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <contact.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{contact.label}</div>
                      <div className="text-muted-foreground">{contact.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-foreground">Follow Me</h4>
                <div className="flex space-x-4">
                  {[
                    { icon: Github, url: "#", label: "GitHub" },
                    { icon: Linkedin, url: "#", label: "LinkedIn" },
                  ].map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.url}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center hover:shadow-glow transition-all duration-300"
                    >
                      <social.icon className="h-6 w-6 text-primary-foreground" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-card p-8 space-y-6"
            >
              <h3 className="text-2xl font-bold text-foreground">Send a Message</h3>
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      First Name <span className="text-destructive">*</span>
                    </label>
                    <Input 
                      name="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`bg-background/50 border-border/50 focus:border-primary transition-colors ${
                        errors.firstName ? 'border-destructive' : ''
                      }`}
                      disabled={isLoading}
                    />
                    {errors.firstName && (
                      <p className="text-xs text-destructive">{errors.firstName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Last Name <span className="text-destructive">*</span>
                    </label>
                    <Input 
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`bg-background/50 border-border/50 focus:border-primary transition-colors ${
                        errors.lastName ? 'border-destructive' : ''
                      }`}
                      disabled={isLoading}
                    />
                    {errors.lastName && (
                      <p className="text-xs text-destructive">{errors.lastName}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <Input 
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`bg-background/50 border-border/50 focus:border-primary transition-colors ${
                      errors.email ? 'border-destructive' : ''
                    }`}
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Subject <span className="text-destructive">*</span>
                  </label>
                  <Input 
                    name="subject"
                    placeholder="Project Discussion"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`bg-background/50 border-border/50 focus:border-primary transition-colors ${
                      errors.subject ? 'border-destructive' : ''
                    }`}
                    disabled={isLoading}
                  />
                  {errors.subject && (
                    <p className="text-xs text-destructive">{errors.subject}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Message <span className="text-destructive">*</span>
                  </label>
                  <Textarea 
                    name="message"
                    placeholder="Tell me about your project ideas..."
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`bg-background/50 border-border/50 focus:border-primary transition-colors resize-none ${
                      errors.message ? 'border-destructive' : ''
                    }`}
                    disabled={isLoading}
                  />
                  {errors.message && (
                    <p className="text-xs text-destructive">{errors.message}</p>
                  )}
                </div>
                
                <motion.div
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                >
                  <Button 
                    type="submit"
                    size="lg" 
                    disabled={isLoading}
                    className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center pt-16 border-t border-border/50"
          >
            <p className="text-muted-foreground">
              © 2025 Portfolio. Crafted with passion and precision.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};