import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Dr. Sarah Johnson",
    role: "Computer Science Professor",
    content:
      "Lalith demonstrated exceptional problem-solving skills and technical proficiency throughout the course. His ability to grasp complex algorithms and implement them efficiently was truly impressive. A dedicated and promising student.",
    rating: 5
  },
  {
    name: "Prof. Michael Chen",
    role: "Software Engineering Instructor",
    content:
      "Outstanding work on the capstone project! Lalith's attention to code quality, documentation, and user experience shows great maturity as a developer. His collaborative approach made him a valuable team member.",
    rating: 5
  },
  {
    name: "Dr. Priya Sharma",
    role: "Database Systems Professor",
    content:
      "Lalith's understanding of database design principles and optimization techniques was remarkable. His project on HR analytics showed both technical depth and practical application. Highly recommended for any development role.",
    rating: 5
  },
  {
    name: "Alex Thompson",
    role: "Study Group Partner",
    content:
      "Working with Lalith on our web development projects was amazing. He always brought innovative ideas and helped explain complex concepts to the team. His dedication to learning and sharing knowledge is inspiring.",
    rating: 5
  },
  {
    name: "Dr. Rajesh Kumar",
    role: "Machine Learning Professor",
    content:
      "Lalith's implementation of AI models in his HR platform project demonstrated excellent understanding of NLP and data processing. His ability to bridge theory with practical applications is commendable.",
    rating: 5
  },
  {
    name: "Lisa Rodriguez",
    role: "Project Team Lead",
    content:
      "Lalith was instrumental in our team's success. His full-stack development skills and problem-solving approach helped us deliver a polished product. He's someone you can always count on to deliver quality work.",
    rating: 5
  },
  {
    name: "Dr. James Wilson",
    role: "Academic Advisor",
    content:
      "Throughout his academic journey, Lalith has shown consistent growth and excellence. His portfolio projects demonstrate not just technical skills but also creativity and user-centric thinking. A bright future ahead!",
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
            Testimonials
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              What professors, peers, and mentors say about my academic journey and technical growth
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
              <div className="text-4xl font-bold text-primary">10+</div>
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
