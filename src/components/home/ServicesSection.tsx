import { motion } from "framer-motion";
import {
  Camera,
  Briefcase,
  Megaphone,
  Compass,
  Wand2,
  Smartphone,
  ChevronRight,
  ArrowRight
} from "lucide-react";

const hardcodedServices = [
  {
    icon: Camera,
    title: "Wildlife Photography & Videography",
    description: "Capturing the raw, untamed beauty of nature with cinematic precision and ethical, non-intrusive practices.",
    features: ["High-resolution imagery", "4K/6K video footage", "Behavioral storytelling"]
  },
  {
    icon: Briefcase,
    title: "Corporate Photography & Videography",
    description: "Professional visual assets tailored for businesses, from executive portraits to company culture documentaries.",
    features: ["Executive headshots", "Workplace environment shoots", "Corporate documentary style"]
  },
  {
    icon: Megaphone,
    title: "Promotional & Marketing",
    description: "Strategic visual content designed to elevate your brand's marketing campaigns and drive audience engagement.",
    features: ["Product photography", "Campaign visuals", "Brand-aligned styling"]
  },
  {
    icon: Compass,
    title: "Travel & Tourism Content",
    description: "Immersive visual narratives that showcase destinations, lodges, and travel experiences to inspire wanderlust.",
    features: ["Destination highlights", "Lodge & resort features", "Experience-driven storytelling"]
  },
  {
    icon: Wand2,
    title: "Photo & Video Editing",
    description: "Expert post-production services including color grading, retouching, and motion graphics to polish your raw media.",
    features: ["Cinematic color grading", "Advanced photo retouching", "Sound design & mixing"]
  },
  {
    icon: Smartphone,
    title: "Social Media Content",
    description: "Dynamic, platform-optimized visual content designed to grow your audience and amplify your wildlife or travel brand.",
    features: ["Reels & short-form video", "Engaging carousel posts", "Consistent brand aesthetics"]
  }
];

const ServicesSection = () => {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
      <section id="services" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-[64px]">

          {/* Header */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 sm:mb-16"
          >
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">
              What I Offer
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground">
              Services & <span className="italic text-savanna-gold">Expertise</span>
            </h2>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hardcodedServices.map((service, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group relative p-8 border border-border/30 hover:border-savanna-gold/40 bg-background hover:bg-savanna-gold/5 transition-all duration-300 flex flex-col h-full"
                >
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-14 h-14 flex items-center justify-center border border-savanna-gold/30 group-hover:border-savanna-gold group-hover:bg-savanna-gold/10 transition-all duration-300">
                      <service.icon className="w-6 h-6 text-savanna-gold" />
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="font-display text-xl text-foreground mb-4">
                    {service.title}
                  </h4>

                  {/* Description */}
                  <p className="text-muted-foreground text-base leading-relaxed mb-6 flex-grow">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-8">
                    {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                          <ChevronRight className="w-3 h-3 text-savanna-gold shrink-0" />
                          <span>{feature}</span>
                        </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                      onClick={scrollToContact}
                      className="w-full py-3 border border-savanna-gold text-savanna-gold text-sm tracking-widest uppercase hover:bg-savanna-gold hover:text-savanna-charcoal transition-all duration-300 mt-auto flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-savanna-gold/20"
                  >
                    Request Quote
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-savanna-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
            ))}
          </div>

        </div>
      </section>
  );
};

export default ServicesSection;