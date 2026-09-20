// src/pages/About.tsx
import { motion, useMotionValue, useTransform, animate, useInView, useMotionValueEvent } from 'framer-motion';
import {
  Camera,
  Film,
  Award,
  Users,
  ArrowRight,
  Quote,
  Aperture,
  Sparkles,
  Heart,

  Mail,
  MapPin,
  Star,
  ChevronRight
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {FaFacebookSquare, FaInstagramSquare} from "react-icons/fa";
const ryanPhoto = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuovc8w2rReCG1-2MFkhyBtTgDD1vGyTesLec7C_hHGuAVF5JqxFnkOT4_BuimDFIAPgiY2xnPlNFHrPtJm8yWx0cCmE1Pon-f0Uw74gCuFFs1tJJuThTX_ar7DLl6rD4B3qxavFgzn0JU5X-wNy0_3tIb1fB5VJ9qzu6TCDRXW06mdtIAErljnO3LsF99arCh4Y57Bb4SN6GWFwY_0QXpMXgLhGs91G-0GQ4fJEZcRSzijbud8PA8';
// Animated Counter Component
const Counter = ({
                   value,
                   suffix = "",
                   label,
                   icon: Icon
                 }: {
  value: number;
  suffix?: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useMotionValueEvent(rounded, "change", (latest) => {
    setDisplayValue(latest);
  });

  useEffect(() => {
    if (inView) {
      animate(count, value, { duration: 2, ease: "easeOut" });
    }
  }, [inView, value, count]);

  return (
      <div className="group text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 flex items-center justify-center border border-savanna-gold/30 group-hover:border-savanna-gold group-hover:bg-savanna-gold/10 transition-all duration-300">
            <Icon className="w-5 h-5 text-savanna-gold" />
          </div>
        </div>
        <motion.p
            ref={ref}
            className="font-display text-4xl md:text-5xl text-savanna-gold font-light"
        >
          {displayValue}
          {suffix}
        </motion.p>
        <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mt-2 font-medium">
          {label}
        </p>
      </div>
  );
};

// Testimonial Card
const TestimonialCard = ({
                           quote,
                           name,
                           role,
                           rating
                         }: {
  quote: string;
  name: string;
  role: string;
  rating: number;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-savanna-charcoal/30 border border-border/30 p-6 md:p-8 hover:border-savanna-gold/40 transition-all duration-300"
    >
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? 'text-savanna-gold fill-savanna-gold' : 'text-muted-foreground/30'}`}
            />
        ))}
      </div>
      <Quote className="w-8 h-8 text-savanna-gold/20 fill-savanna-gold/20 mb-4" />
      <p className="text-savanna-cream/80 text-base md:text-lg leading-relaxed mb-6 italic">
        "{quote}"
      </p>
      <div className="flex items-center gap-3 pt-4 border-t border-border/30">
        <div className="w-10 h-10 rounded-full bg-savanna-gold/10 border border-savanna-gold/30 flex items-center justify-center">
          <span className="text-savanna-gold font-display text-sm">{name.charAt(0)}</span>
        </div>
        <div>
          <p className="text-foreground font-semibold text-base">{name}</p>
          <p className="text-muted-foreground text-sm font-medium">{role}</p>
        </div>
      </div>
    </motion.div>
);

const About = () => {
  return (
      <div className="min-h-screen bg-background">

        {/* Hero Section */}
        <section className="relative min-h-[70vh] md:min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10, ease: "easeOut" }}
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCqCKwFOpKQir3hMcSS8fCCA9zQAykHbQZWsf3Ss2qYYLnPtFM_G5FnllEvXHzuJmofSC1U0IsNFC2IoZ8i_RYz9jPwBYhfa8qqyP4-bMrnS8ifpWaOMywKRNH5LArT92F_9b_TZfWoMY6I1tqrKKOOyhDkBBsRnOMWGRsILzISFhWUDn82Em99NUqPBuxCxEq6v0IJZfyoJ4yyV8-M90SGVTMKYv9RNG9Q8MCTJ2qvko0s_Gs_DlgTtQ')`
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-savanna-charcoal/70 via-savanna-charcoal/40 to-background" />
          </div>

          <div className="relative z-10 px-6 md:px-16 lg:px-[64px] max-w-4xl mx-auto text-center pt-20">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-8 sm:w-12 h-[1px] bg-savanna-gold" />
                <span className="text-savanna-gold text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase font-medium">
                                The Photographer
                            </span>
                <div className="w-8 sm:w-12 h-[1px] bg-savanna-gold" />
              </div>

              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-savanna-cream leading-[1.1] sm:leading-[0.95] mb-4 sm:mb-6">
                <span className="block">Meet</span>
                <span className="block italic text-savanna-gold mt-1 sm:mt-2">Ryan</span>
              </h1>

              <p className="text-savanna-cream/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Photographer • Videographer • Tour Guide
              </p>
            </motion.div>
          </div>
        </section>

        <section className="relative py-12 md:py-24">
          <div className="max-w-[1600px] mx-auto px-5 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="lg:col-span-5 relative">
                <div className="relative max-w-sm sm:max-w-md mx-auto lg:max-w-none">
                  <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-savanna-gold/40" />
                  <div className="absolute -top-4 -right-4 w-16 h-16 border-t-2 border-r-2 border-savanna-gold/40" />
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 border-b-2 border-l-2 border-savanna-gold/40" />
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-savanna-gold/40" />

                  <div className="relative overflow-hidden">
                    <img src={ryanPhoto} alt="San - Photographer & Filmmaker" loading="lazy" width={800} height={1000} className="w-full object-cover aspect-[4/5]  " />
                    <div className="absolute inset-0 bg-savanna-gold/0 hover:bg-savanna-gold/5 transition-colors duration-500" />
                  </div>

                  <div className="absolute -bottom-6 -right-6 bg-savanna-charcoal border border-savanna-gold/30 p-4 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center bg-savanna-gold/10 border border-savanna-gold/30">
                        <Aperture className="w-5 h-5 text-savanna-gold" />
                      </div>
                      <div>
                        <p className="text-savanna-cream text-[10px] tracking-widest uppercase font-medium">Since</p>
                        <p className="text-savanna-gold font-display text-xl">2023</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-6 -left-6 bg-background border border-savanna-gold/30 px-6 py-3 shadow-xl hidden md:block">
                    <p className="font-display text-2xl italic text-savanna-gold">Ryan Wild Gallery</p>
                    <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">Photographer & Videographer</p>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="lg:col-span-7">
                <div className="mb-4 sm:mb-6">
                  <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-foreground leading-[1.1] sm:leading-[0.95] mb-4 sm:mb-6">
                    <span className="block">A Life Through</span>
                    <span className="block italic text-savanna-gold mt-1">The Lens</span>
                  </h2>
                </div>

                <div className="space-y-4 text-muted-foreground font-light leading-relaxed text-sm sm:text-base mb-6 md:mb-8">
                  <p>My photography journey began in <span className="text-foreground font-semibold">February 2023</span>, not behind the camera, but beside one. I started as a photographer's assistant, carrying equipment, setting up lighting, and learning by observing every shot. Those early experiences sparked a passion that inspired me to buy my first camera and dedicate myself to mastering the craft.</p><p>Through continuous practice, countless hours of learning, and real-world experience, I transformed my passion into a profession. After upgrading to my first full-frame camera, my work gained recognition, leading to more clients, referrals, and opportunities to grow as a creative storyteller.</p>
                  <p>Today, I specialize in <span className="text-foreground font-semibold">portrait, wildlife, and event photography</span>, capturing genuine emotions, unforgettable moments, and the beauty of nature. My philosophy is simple—every photograph should tell a meaningful story, preserving moments that people can relive for years to come.</p>
                </div>


                <div className="flex flex-wrap gap-2 mb-5">
                  {["Wildlife Photography", "Event Video", "Weddings", "Documentary", "Portraits", "Landscapes"].map((skill) => (
                      <span key={skill} className="px-4 py-2 border border-savanna-gold/30 text-savanna-gold text-sm tracking-[0.2em] uppercase font-medium hover:bg-savanna-gold/10 transition-colors">
                                        {skill}
                                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-5 border-b border-border/30">
                  <span className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-medium">Connect</span>
                  <div className="flex items-center gap-3">
                    <a href="https://www.instagram.com/ryan_wild_gallery" className="w-12 h-12 flex items-center justify-center border border-border/30 hover:border-savanna-gold hover:text-savanna-gold text-muted-foreground transition-all min-h-[44px]">
                      <FaInstagramSquare className="w-5 h-5" />
                    </a>
                    <a href="https://www.facebook.com/share/1BVGAUKuqv/" className="w-12 h-12 flex items-center justify-center border border-border/30 hover:border-savanna-gold hover:text-savanna-gold text-muted-foreground transition-all min-h-[44px]">
                      <FaFacebookSquare className="w-5 h-5" />
                    </a>
                    <a href="mailto:ryanryanny44@gmail.com" className="w-12 h-12 flex items-center justify-center border border-border/30 hover:border-savanna-gold hover:text-savanna-gold text-muted-foreground transition-all min-h-[44px]">
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-24 bg-savanna-charcoal/30 border-y border-border/30">
          <div className="max-w-[1600px] mx-auto px-6 md:px-16 lg:px-[64px]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <Counter value={10} suffix="+" label="Years Experience" icon={Camera} />
              <Counter value={350} suffix="+" label="Projects Completed" icon={Film} />
              <Counter value={180} suffix="+" label="Happy Clients" icon={Users} />
              <Counter value={15} label="Awards & Features" icon={Award} />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 md:py-24 lg:py-32 px-6 md:px-16 lg:px-[64px] bg-background">
          <div className="max-w-[1600px] mx-auto">
            {/* Header */}
            <motion.div
                className="text-center mb-16 md:mb-20 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-savanna-gold" />
                <span className="text-savanna-gold text-sm tracking-[0.4em] uppercase font-medium">
                                What I Offer
                            </span>
                <div className="w-12 h-[1px] bg-savanna-gold" />
              </div>

              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground font-light mb-6 leading-[0.95]">
                <span className="block">Services &</span>
                <span className="block italic text-savanna-gold mt-2">Expertise</span>
              </h2>

              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                From concept to final delivery, I provide end-to-end creative services
                tailored to your unique vision.
              </p>
            </motion.div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Camera,
                  title: "Photography",
                  description: "Wildlife, weddings, portraits, events, and lifestyle photography with a cinematic eye.",
                  features: ["High-resolution images", "Professional editing", "Quick turnaround"]
                },
                {
                  icon: Film,
                  title: "Videography",
                  description: "Cinematic video production for documentaries, events, and brand storytelling.",
                  features: ["4K/6K footage", "Drone cinematography", "Professional audio"]
                },
                {
                  icon: Sparkles,
                  title: "Video Editing",
                  description: "Post-production magic including color grading, sound design, and motion graphics.",
                  features: ["Color grading", "Sound design", "Motion graphics"]
                },
                {
                  icon: MapPin,
                  title: "Safari Photography",
                  description: "Specialized wildlife photography tours in East Africa's most iconic locations.",
                  features: ["Expert guidance", "Prime locations", "Ethical approach"]
                },
                {
                  icon: Heart,
                  title: "Weddings & Events",
                  description: "Capturing the emotion and beauty of your most important life moments.",
                  features: ["Full-day coverage", "Candid & posed", "Album design"]
                },
                {
                  icon: Users,
                  title: "Brand Content",
                  description: "Visual content creation for businesses, products, and marketing campaigns.",
                  features: ["Brand strategy", "Product shoots", "Social media content"]
                }
              ].map((service, index) => (
                  <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group relative p-8 border border-border/30 hover:border-savanna-gold/40 bg-background hover:bg-savanna-gold/5 transition-all duration-300"
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
                    <p className="text-muted-foreground text-base leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                            <ChevronRight className="w-3 h-3 text-savanna-gold" />
                            <span>{feature}</span>
                          </li>
                      ))}
                    </ul>

                    {/* Bottom Accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-savanna-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="py-16 md:py-24 lg:py-32">
          <div className="max-w-[1600px] mx-auto px-5 md:px-12 lg:px-16">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-savanna-gold" />
                <span className="text-savanna-gold text-xs tracking-[0.4em] uppercase font-medium">The Journey</span>
                <div className="w-12 h-[1px] bg-savanna-gold" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-foreground">
                Milestones of a <span className="italic text-savanna-gold">Creative Life</span>
              </h2>
            </motion.div>

            <div className="relative max-w-4xl mx-auto">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-savanna-gold/20 md:-translate-x-1/2" />

              {[
                {
                  year: "Feb 2023",
                  title: "The Beginning",
                  desc: "Started as a photography assistant, carrying bags and adjusting light stands. Watching quietly, learning angles, and observing how moments were captured."
                },
                {
                  year: "2023",
                  title: "My First Camera",
                  desc: "Bought my own small camera and began training shot by shot. Practiced daily, failed, improved, and learned through experience. Watched tutorials, asked questions, and experimented with different techniques."
                },
                {
                  year: "Dec 2023",
                  title: "First Paid Events",
                  desc: "Worked tirelessly at multiple events during the festive season. It was my first time earning real money from photography, which motivated me to push even harder."
                },
                {
                  year: "Jan 2024",
                  title: "Full-Frame Upgrade",
                  desc: "Saved enough to upgrade to my first full-frame camera. A huge milestone that transformed my work, making images sharper, cleaner, and more professional."
                },
                {
                  year: "2024",
                  title: "Multi-Style Photographer",
                  desc: "Expanded into portrait, wildlife, and events photography. From natural-light portraits to wildlife shoots, each new field taught me patience, timing, and how to connect with people and nature."
                },
                {
                  year: "Today",
                  title: "Still Rising",
                  desc: "From carrying someone else's camera to building my own name. Every shoot teaches me something new. Every frame pushes me to become better. Still learning, still chasing the perfect shot."
                },
              ].map((item, i) => (
                  <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className={`relative pl-12 md:pl-0 mb-12 last:mb-0 md:grid md:grid-cols-2 md:gap-12 ${
                          i % 2 === 0 ? "" : "md:text-right"
                      }`}
                  >
                    <div className="absolute left-0 md:left-1/2 top-2 w-8 h-8 flex items-center justify-center bg-background border-2 border-savanna-gold md:-translate-x-1/2 z-10">
                      <div className="w-2 h-2 bg-savanna-gold rounded-full" />
                    </div>
                    <div className={`${
                        i % 2 === 0 ? "md:col-start-1" : "md:col-start-2 md:text-left md:pl-12"
                    }`}>
                      <p className="text-savanna-gold font-display text-2xl mb-2">{item.year}</p>
                      <h3 className="font-display text-xl md:text-2xl text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-16 md:py-24 lg:py-32 px-6 md:px-16 lg:px-[64px] bg-background">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-savanna-gold" />
                <span className="text-savanna-gold text-xs tracking-[0.4em] uppercase font-medium">
                                My Approach
                            </span>
                <div className="w-12 h-[1px] bg-savanna-gold" />
              </div>

              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light text-foreground leading-tight mb-8">
                Every Frame <span className="italic text-savanna-gold">Tells a Story</span>
              </h2>

              <div className="grid md:grid-cols-3 gap-8 mt-12">
                {[
                  {
                    icon: Camera,
                    title: "Authenticity",
                    desc: "Real moments, real emotions. I believe in capturing life as it unfolds, not forcing it into a frame.",
                  },
                  {
                    icon: Aperture,
                    title: "Craftsmanship",
                    desc: "Every shot is composed with intention. From lighting to color grading, the details matter.",
                  },
                  {
                    icon: Film,
                    title: "Storytelling",
                    desc: "Beyond images — I create visual narratives that preserve memories for generations.",
                  },
                ].map((pillar, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        className="text-center"
                    >
                      <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center border border-savanna-gold/30 bg-savanna-gold/5">
                        <pillar.icon className="w-6 h-6 text-savanna-gold" />
                      </div>
                      <h3 className="font-display text-xl text-foreground mb-3">{pillar.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{pillar.desc}</p>
                    </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24 lg:py-32 bg-savanna-charcoal/30 border-y border-border/30">
          <div className="max-w-[1600px] mx-auto px-6 md:px-16 lg:px-[64px]">
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-savanna-gold" />
                <span className="text-savanna-gold text-xs tracking-[0.4em] uppercase font-medium">
                                Client Love
                            </span>
                <div className="w-12 h-[1px] bg-savanna-gold" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground font-light">
                What Clients <span className="italic text-savanna-gold">Say</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <TestimonialCard
                  quote="Ryan Wild Gallery captured our wedding day perfectly. Every photo tells a story, and we couldn't be happier with the results."
                  name="Sarah & James"
                  role="Wedding Clients"
                  rating={5}
              />
              <TestimonialCard
                  quote="Working with Ryan Wild Gallery on our brand campaign was a game-changer. His eye for detail and creative vision exceeded our expectations."
                  name="Michael Chen"
                  role="Marketing Director"
                  rating={5}
              />
              <TestimonialCard
                  quote="The safari photos Ryan took are absolutely breathtaking. He has an incredible ability to capture wildlife in their natural beauty."
                  name="Emma Thompson"
                  role="Safari Client"
                  rating={5}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 lg:py-32 px-6 md:px-16 lg:px-[64px] text-center bg-background relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--savanna-gold)_1px,_transparent_1px)] bg-[length:40px_40px]" />
          </div>

          <motion.div
              className="relative z-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-savanna-gold" />
              <Camera className="w-5 h-5 text-savanna-gold" />
              <div className="w-12 h-[1px] bg-savanna-gold" />
            </div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground font-light mb-8 leading-[0.95]">
              <span className="block">Let's Create Something</span>
              <span className="block italic text-savanna-gold mt-2">Unforgettable</span>
            </h2>

            <p className="text-muted-foreground text-base md:text-lg mb-12 leading-relaxed">
              Whether it's a wedding, a safari adventure, a brand story, or a personal portrait —
              I'd love to help you capture it beautifully.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-savanna-gold text-savanna-charcoal text-xs tracking-[0.2em] uppercase font-medium hover:bg-savanna-gold/90 hover:shadow-lg hover:shadow-savanna-gold/30 transition-all duration-300">
                <span>Book a Session</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="inline-flex items-center justify-center gap-3 px-10 py-5 border border-savanna-gold/40 text-savanna-cream text-xs tracking-[0.2em] uppercase hover:bg-savanna-gold/10 hover:border-savanna-gold transition-all duration-300">
                <span>View Portfolio</span>
              </button>
            </div>
          </motion.div>
        </section>
      </div>
  );
};

export default About;
