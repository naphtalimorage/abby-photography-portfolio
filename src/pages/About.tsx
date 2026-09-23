// src/pages/About.tsx
import { motion } from 'framer-motion';
import {
  Camera,
  Film,
  Award,
  Users,
  ArrowRight,
  Quote,
  Map,
  Aperture,
  Sparkles,
  Heart,
  Compass,
  Mail,
  MapPin,
  Star,
  ChevronRight
} from 'lucide-react';
import {FaFacebookSquare, FaInstagramSquare} from "react-icons/fa";
import ryanPhoto from '@/assets/IMG_0764.JPG.jpeg'
import backgroundImage from '@/assets/landscape.jpg'

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
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10, ease: "easeOut" }}
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${backgroundImage})`
                }}
            />
            <div className="absolute inset-0 bg-linear-to-b from-savanna-charcoal/70 via-savanna-charcoal/40 to-background" />
          </div>

          <div className="relative z-10 px-4 sm:px-6 md:px-16 lg:px-16 max-w-5xl mx-auto text-center pb-16">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
            >

              {/* Top Label - More Editorial */}
              <div className="flex items-center justify-center gap-4 mb-8 sm:mb-12">
                <div className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent to-savanna-gold/50" />
                <span className="text-savanna-gold text-[10px] sm:text-xs tracking-[0.4em] uppercase font-semibold">
        The Artist Behind the Lens
      </span>
                <div className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent to-savanna-gold/50" />
              </div>

              {/* Main Title - Massive & Elegant */}
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-savanna-cream leading-[0.9] mb-6 sm:mb-8">
                <span className="block font-light">Meet</span>
                <span className="block italic text-savanna-gold mt-2 sm:mt-4">Abby</span>
              </h1>

              {/* The "Pull Quote" instead of a dry list */}
              <p className="font-display italic text-savanna-cream/80 text-lg sm:text-xl md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
                "I don't just take photos; I preserve the fleeting, wild soul of East Africa before it vanishes into the dust."
              </p>

              {/* Stylized Signature / Role */}
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 text-savanna-cream/50 text-xs tracking-widest uppercase">
                  <Camera className="w-4 h-4" />
                  <span>Photographer & Guide</span>
                </div>

                {/* Optional: "Read My Story" Link */}
                <a
                    href="#about-full"
                    className="mt-4 inline-flex items-center gap-2 text-savanna-gold text-xs tracking-[0.2em] uppercase font-semibold hover:text-savanna-cream transition-colors duration-300 group"
                >
                  Read the Journey
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Decorative Bottom Fade (Optional) */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-savanna-gold/30 to-transparent mt-12" />
            </motion.div>
          </div>
        </section>

        <section className="relative py-10 sm:py-12 md:py-16 lg:py-24">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-5 md:px-12 lg:px-16">
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
                        <p className="text-savanna-gold font-display text-xl">2025</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -bottom-6 -left-6 bg-background border border-savanna-gold/30 px-6 py-3 shadow-xl hidden md:block">
                    <p className="font-display text-2xl italic text-savanna-gold">ABBY Wild Gallery</p>
                    <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">Photographer & Videographer</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="lg:col-span-7"
              >
                <div className="mb-4 sm:mb-6">
                  <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-foreground leading-[1.1] sm:leading-[0.95] mb-4 sm:mb-6">
                    <span className="block">A Life Through</span>
                    <span className="block italic text-savanna-gold mt-1">The Lens</span>
                  </h2>
                </div>

                <div className="space-y-4 text-muted-foreground font-light leading-relaxed text-sm sm:text-base mb-6 md:mb-8">
                  <p>
                    My photography journey began in <span className="text-foreground font-semibold">2025</span>, when I started following photographers and guests from around the world during game drives. Assisting them with their equipment and watching how they captured wildlife sparked my passion for photography.
                  </p>
                  <p>
                    I was later invited to <span className="text-foreground font-semibold">Saruni Basecamp</span> for a six-month photography training, where I developed my skills and attended several conferences, gaining valuable experience and inspiration.
                  </p>
                  <p>
                    Today, I am working on <span className="text-foreground font-semibold">wildlife films and photography</span>, using stable cameras to capture unique moments while continuing to sharpen my editing skills. My goal is to tell meaningful stories, bringing the beauty of wildlife closer to people.
                  </p>
                </div>

                {/* Updated Skills/Tags to match the new narrative */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {[
                    "Wildlife Photography",
                    "Wildlife Filmmaking",
                    "Saruni Basecamp Trained",
                    "Conservation Storytelling",
                    "Photo & Video Editing",
                    "Game Drive Guiding"
                  ].map((skill) => (
                      <span
                          key={skill}
                          className="px-3 py-1.5 sm:px-4 sm:py-2 border border-savanna-gold/30 text-savanna-gold text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase font-medium hover:bg-savanna-gold/10 transition-colors cursor-default"
                      >
        {skill}
      </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-5 border-b border-border/30">
                  <span className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-medium">Connect</span>
                  <div className="flex items-center gap-3">
                    {/* Note: Update these href links with your actual social media profiles and email */}
                    <a
                        href="https://www.instagram.com/your_handle"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-border/30 hover:border-savanna-gold hover:text-savanna-gold text-muted-foreground transition-all min-h-[44px]"
                        aria-label="Instagram"
                    >
                      <FaInstagramSquare className="w-5 h-5" />
                    </a>
                    <a
                        href="https://www.facebook.com/your_page"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-border/30 hover:border-savanna-gold hover:text-savanna-gold text-muted-foreground transition-all min-h-[44px]"
                        aria-label="Facebook"
                    >
                      <FaFacebookSquare className="w-5 h-5" />
                    </a>
                    <a
                        href="mailto:your.email@example.com"
                        className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-border/30 hover:border-savanna-gold hover:text-savanna-gold text-muted-foreground transition-all min-h-[44px]"
                        aria-label="Email"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section - Editorial & Premium */}
        <section className="relative py-20 md:py-32 bg-savanna-charcoal border-y border-savanna-gold/10 overflow-hidden">
          {/* Subtle top and bottom gradient lines for a premium framed look */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-savanna-gold/20 to-transparent" />

          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
              {[
                {
                  value: "10", // Consider updating to "1" or "2" to match your 2023/2025 start date!
                  suffix: "+",
                  label: "Years in the Field",
                  icon: Compass // Changed from Camera to Compass for a safari/expedition feel
                },
                {
                  value: "350",
                  suffix: "+",
                  label: "Expeditions Led",
                  icon: Map
                },
                {
                  value: "180",
                  suffix: "+",
                  label: "Stories Preserved", // Much more poetic than "Happy Clients"
                  icon: Camera
                },
                {
                  value: "15",
                  suffix: "",
                  label: "Global Features",
                  icon: Award
                },
              ].map((stat, i) => (
                  <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      className="group text-center md:text-left relative"
                  >
                    {/* Elegant vertical divider for desktop (hidden on mobile, hidden for last item) */}
                    {i < 3 && (
                        <div className="hidden md:block absolute -right-6 lg:-right-8 top-1/2 -translate-y-1/2 w-px h-16 bg-savanna-gold/10 group-hover:bg-savanna-gold/30 transition-colors duration-500" />
                    )}

                    <div className="flex flex-col items-center md:items-start gap-3">
                      {/* Icon & Label Header */}
                      <div className="flex items-center gap-2 text-savanna-gold/60 group-hover:text-savanna-gold transition-colors duration-500 mb-1">
                        <stat.icon className="w-4 h-4 md:w-5 md:h-5" />
                        <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase font-semibold">
                Metric
              </span>
                      </div>

                      {/* Large Number */}
                      <div className="flex items-baseline gap-1">
              <span className="font-display text-4xl md:text-5xl lg:text-6xl text-savanna-cream font-light tracking-tight">
                {stat.value}
              </span>
                        {stat.suffix && (
                            <span className="font-display text-2xl md:text-3xl text-savanna-gold font-light">
                  {stat.suffix}
                </span>
                        )}
                      </div>

                      {/* Descriptive Label */}
                      <p className="text-savanna-cream/50 text-sm md:text-base tracking-wide font-medium">
                        {stat.label}
                      </p>
                    </div>
                  </motion.div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-savanna-gold/20 to-transparent" />
        </section>

        {/* Services Section */}
        <section className="py-16 md:py-24 lg:py-32 px-6 md:px-16 lg:px-16 bg-background">
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
                <div className="w-12 h-px bg-savanna-gold" />
                <span className="text-savanna-gold text-sm tracking-[0.4em] uppercase font-medium">
                                What I Offer
                            </span>
                <div className="w-12 h-px bg-savanna-gold" />
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
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-savanna-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
              {/* Center Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-savanna-gold/20 md:-translate-x-1/2" />

              {[
                {
                  year: "2025",
                  title: "The Spark",
                  desc: "My photography journey began in 2025, when I started following photographers and guests from all over the world during our game drives. I would assist them by carrying their equipment and observing how they captured wildlife and the beauty of the Mara. Those experiences sparked my passion for photography and inspired me to begin developing my own skills behind the camera."
                },
                {
                  year: "Training",
                  title: "Saruni Basecamp",
                  desc: "As my passion grew, I was invited to Saruni Basecamp for a six-month photography training, where I gained valuable experience and strengthened my understanding of photography. I also had the opportunity to attend several conferences, meet other photographers and creatives, and learn from different perspectives. Each experience has helped me grow both technically and creatively."
                },
                {
                  year: "Today",
                  title: "Wildlife Filmmaking",
                  desc: "Today, I am continuing to build my skills through wildlife photography and filmmaking. I am currently working on wildlife films, using stable cameras to capture unique moments in the wild while sharpening my editing skills. My goal is to tell meaningful stories through images and film, capturing the beauty of wildlife and moments that allow people to connect with nature."
                },
              ].map((item, i) => (
                  <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: i * 0.15 }}
                      className={`relative pl-12 md:pl-0 mb-16 last:mb-0 md:grid md:grid-cols-2 md:gap-12 ${
                          i % 2 === 0 ? "" : "md:text-right"
                      }`}
                  >
                    {/* Center Dot */}
                    <div className="absolute left-0 md:left-1/2 top-1 w-8 h-8 flex items-center justify-center bg-background border-2 border-savanna-gold md:-translate-x-1/2 z-10">
                      <div className="w-2 h-2 bg-savanna-gold rounded-full" />
                    </div>

                    {/* Content */}
                    <div className={`${
                        i % 2 === 0 ? "md:col-start-1" : "md:col-start-2 md:text-left md:pl-12"
                    }`}>
                      <p className="text-savanna-gold font-display text-2xl mb-2">{item.year}</p>
                      <h3 className="font-display text-xl md:text-2xl text-foreground mb-3">{item.title}</h3>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy Section - Deep Editorial Manifesto (Fully Responsive) */}
        <section className="relative py-20 md:py-32 lg:py-40 px-6 md:px-12 lg:px-20 bg-savanna-charcoal text-savanna-cream overflow-hidden">

          {/* Subtle Background Texture/Word for Museum Feel */}
          <div className="relative max-w-7xl mx-auto">

            {/* Asymmetrical Header */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-16 md:mb-24 lg:mb-32"
            >
              <div className="md:col-span-4 md:col-start-1">
        <span className="text-savanna-gold text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase font-semibold border-l-2 border-savanna-gold pl-3 md:pl-4">
          Chapter III <br className="hidden md:block" /> The Philosophy
        </span>
              </div>
              <div className="md:col-span-7 md:col-start-6">
                {/* Scaled down font sizes for mobile/tablet */}
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6 md:mb-8">
                  A manifesto in <br className="hidden md:block" />
                  <span className="italic text-savanna-gold">light and shadow.</span>
                </h2>
                <p className="text-savanna-cream/60 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
                  In the silence of the Mara, time does not pass; it accumulates. To photograph the wild is to surrender to its ancient rhythms, waiting for the exact fraction of a second where light, emotion, and instinct align.
                </p>
              </div>
            </motion.div>

            {/* The Three Pillars - Deep & Poetic */}
            {/* Reduced vertical spacing for mobile */}
            <div className="space-y-16 md:space-y-24 lg:space-y-32">
              {[
                {
                  num: "01",
                  title: "The Art of Stillness",
                  desc: "We do not hunt the moment; we let it find us. True authenticity requires a profound, almost meditative patience. We sit in the dust, we embrace the silence, and we allow the raw, unposed drama of the savannah to reveal itself without our interference.",
                  align: "md:col-start-1 md:col-end-7"
                },
                {
                  num: "02",
                  title: "Sculpting with Light",
                  desc: "The African sun does not merely illuminate; it sculpts. From the bruised purples of dawn to the bleeding golds of dusk, we treat light as our primary medium. It is a seamless marriage of advanced optics and cinematic intention, elevating fleeting shadows into timeless fine art.",
                  align: "md:col-start-6 md:col-end-13"
                },
                {
                  num: "03",
                  title: "Echoes of the Eternal",
                  desc: "A photograph is a pause button on eternity. We are not just capturing animals; we are preserving the ancient, untamed soul of the earth. These visual narratives are crafted to transcend the immediate moment, echoing the legacy of the wild for generations yet unborn.",
                  align: "md:col-start-1 md:col-end-7"
                },
              ].map((pillar, i) => (
                  <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-12 ${pillar.align}`}
                  >
                    {/* Massive Number - Scaled down for mobile */}
                    <div className="md:col-span-2 flex md:block items-center">
            <span className="font-display text-4xl md:text-6xl lg:text-7xl text-savanna-gold/20 font-light">
              {pillar.num}
            </span>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-10">
                      <h3 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl text-savanna-cream mb-4 md:mb-6">
                        {pillar.title}
                      </h3>
                      {/* Adjusted border padding for mobile */}
                      <p className="text-savanna-cream/50 text-sm md:text-base leading-relaxed md:leading-loose max-w-2xl border-l border-savanna-gold/20 pl-4 md:pl-8">
                        {pillar.desc}
                      </p>
                    </div>
                  </motion.div>
              ))}
            </div>

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
