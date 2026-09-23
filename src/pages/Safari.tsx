// src/pages/Seasons.tsx
import { motion } from 'framer-motion';
import {
  Users,
  ShieldCheck,
  Send,
  Shield,
  Sun,
  Leaf,
  Tent,
  Camera,
  Moon
} from 'lucide-react';
import { useState } from 'react';
import imageTip from '@/assets/Zibras2.jpg';
import ryanPhoto from '@/assets/IMG_0764.JPG.jpeg';

// Replaced "Seasons" with "The Daily Rhythm" for a more immersive experience
const dailyRhythm = [
  {
    time: "05:30",
    title: "The Dawn Patrol",
    description: "Departing before first light. The bush is cool, predators are active, and the golden hour light paints the savannah in cinematic hues.",
    icon: Sun
  },
  {
    time: "12:00",
    title: "The Midday Siesta",
    description: "As the sun peaks, we retreat to the lodge. Gourmet bush lunches, rest, and afternoon post-processing workshops in the comfort of your suite.",
    icon: Tent
  },
  {
    time: "16:00",
    title: "The Golden Hour",
    description: "The light softens. We track big cats and elephants as they emerge from the shadows, capturing the most dramatic portraits of the day.",
    icon: Camera
  },
  {
    time: "20:00",
    title: "Under the Stars",
    description: "Night drives with spotlights reveal elusive nocturnal creatures, followed by sundowners and storytelling around the campfire.",
    icon: Moon
  }
];

const reasons = [
  {
    icon: Users,
    title: 'Year-Round Residents',
    description: 'The Mara\'s \'Big Five\' and legendary predator populations don\'t follow a calendar. Lion prides, elusive leopards, and resident elephant herds call this land home 365 days a year.'
  },
  {
    icon: ShieldCheck,
    title: 'Ancestral Wisdom',
    description: 'Our guides are Maasai warriors who have lived in harmony with this ecosystem for generations. Their ability to read the tracks and interpret the sounds of the bush is unparalleled.'
  },
  {
    icon: Leaf,
    title: 'Sustainable Sanctuary',
    description: 'By traveling with us, you directly support local conservancies and wildlife protection initiatives that keep the Mara wild for future generations.'
  }
];

const Seasons = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    season: '',
    groupSize: '',
    vision: ''
  });

  return (
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Background Image with Parallax */}
          <div className="absolute inset-0 z-0">
            <motion.div
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 15, ease: "easeOut" }}
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${imageTip})`
                }}
            />
            <div className="absolute inset-0 bg-linear-to-r from-savanna-charcoal/95 via-savanna-charcoal/70 to-savanna-charcoal/40" />
          </div>

          {/* Content */}
          <div className="relative z-10 w-full px-4 sm:px-6 md:px-16 lg:px-16 py-20 md:py-16">
            <div className="max-w-7xl mx-auto">
              {/* Top Badges */}
              <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="flex flex-wrap items-center gap-3 mb-8"
              >
              <span className="inline-flex items-center px-3 py-1 bg-savanna-gold/20 border border-savanna-gold/40 text-savanna-gold text-[10px] sm:text-xs tracking-[0.2em] uppercase font-semibold rounded-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-savanna-gold mr-2 animate-pulse"></span>
                2025–2026 Bespoke Expeditions
              </span>
                <span className="inline-flex items-center text-savanna-cream/70 text-[10px] sm:text-xs tracking-[0.15em] uppercase font-medium">
                <Shield className="w-3.5 h-3.5 mr-1.5 text-savanna-gold" />
                Private Conservancy Access
              </span>
              </motion.div>

              {/* Main Content */}
              <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="max-w-3xl"
              >
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-savanna-cream mb-4 leading-[0.95]">
                  The Eternal <span className="italic text-savanna-gold">Mara</span>
                </h1>

                <p className="font-display italic text-savanna-gold text-xl sm:text-xl md:text-2xl mb-8">
                  The Heart of East Africa & Beyond
                </p>

                <p className="text-savanna-cream/80 text-sm sm:text-base max-w-2xl leading-relaxed mb-10">
                  High-end bespoke wildlife photography safaris personally guided across the Maasai Mara, Serengeti, Amboseli, and Samburu ecosystems. Travel inside custom-rigged 4x4 Land Cruisers featuring 360° roof hatches, fluid gimbal heads, beanbag stabilizers, and evening masterclass post-processing in private field tent suites.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-16">
                  <a
                      href="#rhythm"
                      className="inline-flex items-center justify-center px-8 py-4 bg-savanna-charcoal/80 border border-savanna-cream/20 text-savanna-cream text-xs tracking-[0.2em] uppercase font-semibold hover:bg-savanna-charcoal transition-all duration-300"
                  >
                    Experience the Rhythm
                  </a>
                  <a
                      href="#inquire"
                      className="inline-flex items-center justify-center px-8 py-4 bg-savanna-gold text-savanna-charcoal text-xs tracking-[0.2em] uppercase font-semibold hover:bg-savanna-gold/90 transition-all duration-300"
                  >
                    Design Your Safari
                  </a>
                </div>
              </motion.div>

              {/* Scroll Indicator */}
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="absolute bottom-40 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2"
              >
                <span className="text-savanna-cream/40 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-px h-12 bg-linear-to-b from-savanna-gold to-transparent"
                />
              </motion.div>

              {/* Stats Row */}
              <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 bg-savanna-charcoal/40 backdrop-blur-sm border border-savanna-cream/10 p-6 md:p-8 rounded-lg"
              >
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-savanna-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-savanna-cream/50 tracking-[0.15em] uppercase font-semibold mb-1">
                      Exclusivity
                    </p>
                    <p className="text-savanna-cream text-sm font-medium">
                      Max 3 Per Vehicle
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-savanna-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-savanna-cream/50 tracking-[0.15em] uppercase font-semibold mb-1">
                      Permissions
                    </p>
                    <p className="text-savanna-cream text-sm font-medium">
                      Unrestricted Off-Road
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Sun className="w-5 h-5 text-savanna-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-savanna-cream/50 tracking-[0.15em] uppercase font-semibold mb-1">
                      Optimal Light
                    </p>
                    <p className="text-savanna-cream text-sm font-medium">
                      Daily Sunrise Drives
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 col-span-2 md:col-span-1">
                  <Leaf className="w-5 h-5 text-savanna-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] text-savanna-cream/50 tracking-[0.15em] uppercase font-semibold mb-1">
                      Conservation
                    </p>
                    <p className="text-savanna-cream text-sm font-medium">
                      100% Carbon-Offset & MEP
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* The Daily Rhythm (Replaces Seasonal Perspectives) */}
        <section id="rhythm" className="py-20 md:py-32 px-4 sm:px-6 md:px-16 lg:px-16 bg-savanna-charcoal/10">
          <div className="max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-16 md:mb-20 text-center md:text-left"
            >
              <div className="flex items-center gap-4 mb-6 justify-center md:justify-start">
                <div className="w-20 h-0.5 bg-savanna-gold" />
                <span className="text-savanna-gold text-xs tracking-[0.4em] uppercase font-semibold">
                The Experience
              </span>
              </div>

              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground font-light leading-[0.95] mb-6">
                <span className="block">The Daily</span>
                <span className="block italic text-savanna-gold mt-2">Rhythm</span>
              </h2>

              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed mx-auto md:mx-0">
                A bespoke safari is not just a destination; it is a way of life. Here is how your days will unfold in the wild.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {dailyRhythm.map((item, index) => (
                  <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: index * 0.1 }}
                      className="group relative p-8 md:p-10 bg-background border border-border/30 hover:border-savanna-gold/40 transition-all duration-500 hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 flex items-center justify-center border border-savanna-gold/30 group-hover:bg-savanna-gold/10 transition-colors duration-500">
                        <item.icon className="w-5 h-5 text-savanna-gold" />
                      </div>
                      <span className="font-display text-2xl text-savanna-gold/30 group-hover:text-savanna-gold transition-colors duration-500">
                    {item.time}
                  </span>
                    </div>

                    <h3 className="font-display text-2xl md:text-3xl text-foreground font-light mb-4">
                      {item.title}
                    </h3>

                    <p className="text-muted-foreground text-base leading-relaxed">
                      {item.description}
                    </p>

                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-savanna-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why the Mara */}
        <section className="py-16 md:py-24 lg:py-32 px-6 md:px-16 lg:px-[64px] bg-savanna-charcoal/30 border-y border-savanna-gold/10">
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
            >
              <div className="relative overflow-hidden">
                <img src={ryanPhoto} alt="Photographer & Filmmaker" loading="lazy" width={800} height={1000} className="w-full object-cover aspect-[4/5]" />
                <div className="absolute inset-0 bg-savanna-gold/0 hover:bg-savanna-gold/5 transition-colors duration-500" />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-savanna-gold/10 rounded-full blur-3xl -z-10" />
            </motion.div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-savanna-gold" />
                <span className="text-savanna-gold text-sm tracking-[0.4em] uppercase font-medium">
                Beyond the Migration
              </span>
              </div>

              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground font-light mb-8 leading-[0.95]">
                <span className="block">Why the</span>
                <span className="block italic text-savanna-gold mt-2">Mara?</span>
              </h2>

              <div className="space-y-6">
                {reasons.map((reason, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="shrink-0">
                        <div className="w-12 h-12 flex items-center justify-center border border-savanna-gold/30">
                          <reason.icon className="w-5 h-5 text-savanna-gold" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-display text-xl text-foreground font-light mb-2">
                          {reason.title}
                        </h4>
                        <p className="text-muted-foreground text-base leading-relaxed">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Inquiry Section */}
        <section id="inquire" className="py-16 md:py-24 lg:py-32 px-6 md:px-16 lg:px-[64px] bg-savanna-charcoal/30">
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-savanna-gold" />
              <span className="text-savanna-gold text-sm tracking-[0.4em] uppercase font-medium">
              Begin Your Journey
            </span>
              <div className="w-12 h-px bg-savanna-gold" />
            </div>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground font-light mb-6 leading-[0.95]">
              <span className="block">Design Your</span>
              <span className="block italic text-savanna-gold mt-2">Perfect Safari</span>
            </h2>

            <p className="text-muted-foreground text-base md:text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
              Share your vision with us, and our expert planners will craft a bespoke expedition tailored to your specific interests and timing.
            </p>

            <form className="text-left bg-background border border-border/30 p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-2">
                  <label className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-medium">
                    Full Name
                  </label>
                  <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-b border-border/50 focus:border-savanna-gold focus:ring-0 py-3 transition-colors text-foreground placeholder:text-muted-foreground/40"
                      placeholder="Elena Richards"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-medium">
                    Email Address
                  </label>
                  <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent border-b border-border/50 focus:border-savanna-gold focus:ring-0 py-3 transition-colors text-foreground placeholder:text-muted-foreground/40"
                      placeholder="elena@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-medium">
                    Preferred Time of Year
                  </label>
                  <select
                      value={formData.season}
                      onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                      className="w-full bg-transparent border-b border-border/50 focus:border-savanna-gold focus:ring-0 py-3 transition-colors text-foreground appearance-none cursor-pointer"
                  >
                    <option value="">Select a time</option>
                    <option value="migration">The Great Migration (Jul-Oct)</option>
                    <option value="emerald">The Emerald Season (Nov-May)</option>
                    <option value="calving">The Calving Season (Jan-Feb)</option>
                    <option value="general">Not Sure / General Interest</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-medium">
                    Group Size
                  </label>
                  <input
                      type="number"
                      value={formData.groupSize}
                      onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
                      className="w-full bg-transparent border-b border-border/50 focus:border-savanna-gold focus:ring-0 py-3 transition-colors text-foreground placeholder:text-muted-foreground/40"
                      placeholder="2"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-medium">
                    Your Vision
                  </label>
                  <textarea
                      value={formData.vision}
                      onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                      className="w-full bg-transparent border-b border-border/50 focus:border-savanna-gold focus:ring-0 py-3 transition-colors text-foreground placeholder:text-muted-foreground/40 resize-none min-h-[120px]"
                      placeholder="Tell us about the moments you want to capture..."
                  />
                </div>
              </div>

              <div className="text-center pt-8">
                <button
                    type="submit"
                    className="group inline-flex items-center gap-3 px-12 py-5 bg-savanna-gold text-savanna-charcoal text-sm tracking-[0.2em] uppercase font-semibold hover:bg-savanna-gold/90 hover:shadow-lg hover:shadow-savanna-gold/30 transition-all"
                >
                  <span>Send Inquiry</span>
                  <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="mt-4 text-sm tracking-wider text-muted-foreground">
                  One of our specialist guides will respond within 24 hours.
                </p>
              </div>
            </form>
          </motion.div>
        </section>
      </div>
  );
};

export default Seasons;