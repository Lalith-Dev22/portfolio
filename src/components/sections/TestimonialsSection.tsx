import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechFlow Inc",
    content: "Working with this developer has been transformative for our product. The attention to detail and innovative solutions exceeded all expectations.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Michael Chen",
    role: "Creative Director", 
    company: "Design Studio",
    content: "Exceptional creativity combined with technical excellence. The interactive experiences created are simply breathtaking and user-friendly.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Emily Rodriguez",
    role: "CEO",
    company: "StartupXYZ",
    content: "The quality of work and professionalism is outstanding. Our website's performance and user engagement improved dramatically.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "David Kim",
    role: "Tech Lead",
    company: "Innovation Labs",
    content: "Incredible problem-solving skills and cutting-edge technical implementation. A true expert in modern web technologies.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  }
];

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="min-h-screen flex items-center section-padding py-16 sm:py-24">
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
              Client Testimonials
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              What clients say about our collaboration and the results we've achieved together
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="glass-card p-8 space-y-6 hover:bg-card/20 transition-all duration-500"
              >
                {/* Rating */}
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-primary fill-current" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-lg text-muted-foreground leading-relaxed italic">
                  "{testimonial.content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center space-x-4 pt-4 border-t border-border/50">
                  <img 
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                  />
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            <div className="glass-card p-8 space-y-4">
              <div className="text-4xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
            <div className="glass-card p-8 space-y-4">
              <div className="text-4xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Happy Clients</div>
            </div>
            <div className="glass-card p-8 space-y-4">
              <div className="text-4xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Project Success Rate</div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};