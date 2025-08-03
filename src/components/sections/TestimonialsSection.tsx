import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Tousif Pasha",
    role: "Client",
    content:
      "Thank you for your excellent work on my portfolio. I truly appreciate your professionalism and attention to detail — it made the entire experience smooth. Looking forward to working with you again!",
    rating: 5
  },
  {
    name: "Vignesh. R",
    role: "Client",
    content:
      "Awesome service! I truly appreciate the professionalism and attention to detail. The entire experience was smooth, and I’m definitely looking forward to future collaborations.",
    rating: 5
  },
  {
    name: "Angel.R",
    role: "Client",
    content:
      "Thank you so much for all your help with the project. I couldn’t have done it without your support. Your ideas and guidance really helped us, and I’ve learned a lot from you. You truly made the project awesome.",
    rating: 5
  },
  {
    name: "Varsha",
    role: "Tech Lead",
    content:
"Working with you has been a delight. You brought clarity to my vision and translated it into an intuitive product. Deadlines were met, and quality was never compromised.",
    rating: 5
  },
  {
    name: "Amit Verma",
    role: "Engineering Manager",
    content:
      "Exceptional work ethic and technical ability. The final output exceeded my expectations in terms of performance, design, and scalability. Highly recommended!",
    rating: 5
  },
  {
    name: "Linda Carter",
    role: "UX Consultant",
    content:
      "Brilliant eye for detail and user experience. The interfaces delivered were modern, fluid, and extremely user-centric. I’d happily recommend your services to others.",
    rating: 5
  },
  {
    name: "Rajesh Iyer",
    role: "CTO",
    content:
      "Your dedication and skillset made a huge impact on my project. Everything was handled with utmost professionalism. It's rare to find such a reliable developer.",
    rating: 5
  }
];

export const TestimonialsSection = () => {
  const [showAll, setShowAll] = useState(false);

  const displayedTestimonials = showAll ? testimonials : testimonials.slice(0, 4);

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
            {displayedTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
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
                <div className="pt-4 border-t border-border/50">
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Toggle Button */}
          <div className="text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="mt-8 text-sm px-6 py-3 bg-primary text-white rounded-xl transition-all duration-300 hover:bg-primary/80"
            >
              {showAll ? "Show Less" : "View More Testimonials"}
            </button>
          </div>

          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center pt-8"
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
