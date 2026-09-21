// src/pages/Seasons.tsx
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Users,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { useState } from 'react';
const imageTip = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDReA46eRDPeHY4o6yDYHTd36_sJn-59UdcP2pFbXwR4INSAi23RDYh3he1FlWeucXLEkW-XUd14jDSq0TmlQb9uL6frQZ2hAu1CUqlTOK3BhnpqOYQap2PKLZoDwjibuBBbj2jh2NBN8di2HMurvMGzn3wpArzu8grzmhHEoieZir7uwj6KtBEDltKyyFhGDz2hiqKdeWYKqc2OO5X4HzeSeBJ5Qu__8QlqFpgC_EkVVaUt9-JPKxw';
const ryanPhoto = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuovc8w2rReCG1-2MFkhyBtTgDD1vGyTesLec7C_hHGuAVF5JqxFnkOT4_BuimDFIAPgiY2xnPlNFHrPtJm8yWx0cCmE1Pon-f0Uw74gCuFFs1tJJuThTX_ar7DLl6rD4B3qxavFgzn0JU5X-wNy0_3tIb1fB5VJ9qzu6TCDRXW06mdtIAErljnO3LsF99arCh4Y57Bb4SN6GWFwY_0QXpMXgLhGs91G-0GQ4fJEZcRSzijbud8PA8';


const seasons = [
  {
    title: 'The Great Migration',
    months: 'July – October',
    color: 'bg-savanna-gold/80',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdXEX76hJzD2jcqWfXcZvOyYCcUSfSnRnxcvoWxnbj19MiHLpmXSlYZLoA9Kys1CpudF3s27aXMuQsSOPJi-dCx_BJaX1YhgqxaRb20E9XqJf3HdvX52WddOBG3Rj1lunu3ocb8vMZ4Kx9M6hg-u0Yr9oS1Tq7uG8Scs71UTnvTq2fiHisa7VPfyvm7fzYDpc-zfppxb62iZ153u0pAiM3VMppMJRlJLotekRcm6lzWyzxtTaQreuLUw',
    alt: 'Great Migration river crossing',
    description: 'Witness the world\'s most spectacular wildlife event as millions of wildebeest and zebras traverse the Mara River under the watchful eyes of predators.'
  },
  {
    title: 'The Emerald Season',
    months: 'November – May',
    color: 'bg-savanna-forest/80',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBz6LXNEsEChzlMSlewNeqH5-sq-W8FIMhRWT76-UjnziEEYegYUk5_MEsFoKdvK6PQSp_HAIgCNvTV0TOgglUhWtVzQq9k8bm1_y65QRDCNGCihot4URcCpLVELQ1GZli7yzcguhcm7aud1QNGyovIq9dImxxJBnue2koesWgQYoNWQISqhA7VAHhBcBLgKAG0I1BtmTIsjf6kfxJFCZGw9n7sB40M6vpcHDkiyV20Wqiw2iEPowuMLg',
    alt: 'Lush green Mara landscape',
    description: 'A paradise for photographers and bird enthusiasts. Dramatic storm clouds, crystal-clear air, and vibrant green landscapes provide a breathtaking backdrop.'
  },
  {
    title: 'The Calving Season',
    months: 'January – February',
    color: 'bg-savanna-earth/80',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_8FsztTkZTT3dqbZqnMEYO2NGu0JDxOeZNLy4sI13rD3zMgheV_5VwUVjKeCgdDfHmQXfOn8M2U5u14mj7N6aXb8BrvcaxvQMi-AqR8t-L5exo5pnT2cCV1FNwKn60QIOCkrCcJt7G1-il3KfdbXzHu1L_LzuSDS69bk8R6hc8scYH01cnFRzlfDazphajHxLXAa1UjFKYKa_yinmc8w5r9gStP9WM9mRGRb-uKl3sqP-e_lvvYu89w',
    alt: 'Newborn wildebeest calf',
    description: 'A time of abundance and high tension as thousands of calves are born, attracting the Mara\'s legendary big cats in a display of raw survival and new life.'
  }
];

const expeditions = [
  {
    title: 'Migration Masterclass',
    subtitle: '10 Days • Peak Migration Focus',
    price: '$12,450',
    description: 'Position yourself at the river\'s edge for the world\'s most dramatic river crossings, led by award-winning wildlife photographers.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDESsm4fF0kr1OcRH6Vnf3X5M6IFXlK5PzdbYd2rPSCz1HwvlkXx0Loq0Jvsjd9lCAr7vcVCal42efZU5Qz8NcwH5vs6XT4zDxQY1dP8rGwCQoZPB-0HyCmYdnEK6AROJJkPHq7VYukSk8VWw2SfQ-OvDsiLeVagJiwLkcayEKIMOaaQSXOik_KnIh39PmKG0Ze4E_Do0O1sgydKhK4k3sEzlXaQJPT6NuX-OpEzQrpPrGj8LmR1hkxgQ'
  },
  {
    title: 'Lush Savanna Workshop',
    subtitle: '8 Days • Landscape & Birdlife',
    price: '$8,200',
    description: 'Capture the Mara in its most beautiful light. A deep dive into composition and storytelling amidst the vibrant greens of the Emerald Season.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9kfTLbhuntVCH1wCMybKCGBZ-1ikv6NDGfuu1pbnXUj4q1HtCMp25QAxoI93LqBX7-8lKgZ0lcWhVtS7iLiEwnoeeINiqpB1vmpiuPCfYkfPehRudp4abojBM-bIiG3XoPH6JioIAeVTMrz3Bcaqi1ToZAiUYCbyn_7lPhnLCe8bddiS_e75rziZJCZXdLeQDPqz8GDe3C4Lb5_lPjsSPrhwyRHXBS-D_w72WDRyILUTVior_45V9oA'
  },
  {
    title: 'Predator Pursuit',
    subtitle: '7 Days • Big Cat Specialist',
    price: '$9,150',
    description: 'Track the Mara\'s famous \'Marsh Pride\' and elusive cheetah families during the calving season\'s peak predator-prey activity.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAb0j9uHJNcb-pxgmXuP1VmYsprYnyPIJ-WeTcPe_X80PQSeko6Bnxk75YMgsLR6lhSTEsJJhvoSHBC2Sax5rvzxlL4KkKTl9zeJlqX02QoBJvLQaMA51yHsImi3TbHJT_GbrCu9kLwQIAv3S6IMUH-qLw0GJ7UvpXefUXyimodftfq-8zy8P09zl3iVS6UndjxL9NEquby1mRiCRaXzN57UsCT14eFql3eFHbRIGToJm9C5BP-_utS3g'
  }
];

const reasons = [
  {
    icon: Users,
    title: 'Year-Round Residents',
    description: 'The Mara\'s \'Big Five\' and legendary predator populations don\'t follow a calendar. Lion prides, elusive leopards, and resident elephant herds call this land home 365 days a year.'
  },
  {
    icon: Users,
    title: 'Ancestral Wisdom',
    description: 'Our guides are Maasai warriors who have lived in harmony with this ecosystem for generations. Their ability to read the tracks and interpret the sounds of the bush is unparalleled.'
  },
  {
    icon: ShieldCheck,
    title: 'Sustainable Sanctuary',
    description: 'By traveling with Mara Capture, you directly support local conservancies and wildlife protection initiatives that keep the Mara wild for future generations.'
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
        <section className="relative min-h-[70vh] sm:min-h-[80vh] md:min-h-screen flex flex-col overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 12, ease: "easeOut" }}
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${imageTip})`
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background" />
          </div>

          {/* Content - Flex column to push scroll indicator down */}
          <div className="relative z-10 flex-1 flex flex-col justify-between items-center px-4 sm:px-6 md:px-16 py-12 sm:py-16">
            {/* Main content - centered vertically */}
            <div className="flex-1 flex gap-2 items-center justify-center w-full">
              <div className="text-center max-w-4xl mt-12 md:mt-0">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                                <span className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase text-savanna-cream/90 mb-4 block">
                                    The Heart of East Africa
                                </span>

                  <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-savanna-cream mb-6 md:mb-8 leading-[1.1] sm:leading-[0.95]">
                    <span className="block">The Eternal</span>
                    <span className="block italic text-savanna-gold mt-1 sm:mt-2">Mara</span>
                  </h1>

                  <p className="text-savanna-cream/80 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-4">
                    Experience the rhythmic pulse of the savanna, where every month reveals a new facet of nature's most dramatic theater.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 sm:mt-0">
                    <a
                        href="#seasons"
                        className="inline-flex items-center justify-center gap-2 px-8 py-5 bg-savanna-cream text-savanna-charcoal text-sm tracking-[0.2em] uppercase font-medium hover:bg-savanna-gold transition-all"
                    >
                      <span>Explore Seasons</span>
                      <ArrowRight size={14} />
                    </a>
                    <a
                        href="#inquire"
                        className="inline-flex items-center justify-center gap-2 px-8 py-5 border border-savanna-cream text-savanna-cream text-sm tracking-[0.2em] uppercase hover:bg-savanna-cream/10 transition-all"
                    >
                      <span>Design Your Safari</span>
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Scroll Indicator - positioned at the bottom of the hero */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  y: [0, -8, 0]
                }}
                transition={{
                  delay: 1.2,
                  duration: 1,
                  y: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="hidden md:flex flex-col items-center gap-1 pb-4 md:pb-2"
            >
              <span className="text-savanna-cream/40 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
              <div className="w-[1px] h-10 bg-gradient-to-b from-savanna-gold to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* Seasonal Perspectives */}
        <section id="seasons" className="py-16 md:py-24 lg:py-32 px-6 md:px-16 lg:px-[64px] bg-background">
          <div className="max-w-[1600px] mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-10 md:mb-16"
            >
              <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-8 sm:w-12 h-[1px] bg-savanna-gold" />
                <span className="text-savanna-gold text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase font-medium">
                                Cycles of Life
                            </span>
                <div className="w-8 sm:w-12 h-[1px] bg-savanna-gold" />
              </div>

              <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-foreground font-light leading-[1.1] sm:leading-[0.95]">
                <span className="block">Seasonal</span>
                <span className="block italic text-savanna-gold mt-1 sm:mt-2">Perspectives</span>
              </h2>

              <p className="mt-6 text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                From the golden dust of the migration to the vibrant greens of the rains, timing is the key to your perfect capture.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {seasons.map((season, index) => (
                  <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group cursor-pointer"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-6 border border-border/30 group-hover:border-savanna-gold/40 transition-all duration-500">
                      <div
                          className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                          style={{ backgroundImage: `url('${season.imageUrl}')` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-savanna-charcoal/90 via-savanna-charcoal/40 to-transparent" />

                      <div className="absolute bottom-6 left-6 right-6">
                                        <span className={`inline-block px-3 py-1 text-xs tracking-[0.2em] uppercase font-medium text-savanna-charcoal mb-3 ${season.color}`}>
                                            {season.months}
                                        </span>
                        <h3 className="font-display text-2xl text-savanna-cream font-light">
                          {season.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-base leading-relaxed">
                      {season.description}
                    </p>
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
                <img src={ryanPhoto} alt="San - Photographer & Filmmaker" loading="lazy" width={800} height={1000} className="w-full object-cover aspect-[4/5]  " />
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
                <div className="w-12 h-[1px] bg-savanna-gold" />
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
                      <div className="flex-shrink-0">
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

        {/* Signature Expeditions */}
        <section className="py-16 md:py-24 lg:py-32 px-6 md:px-16 lg:px-[64px] bg-background">
          <div className="max-w-[1600px] mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6"
            >
              <div className="max-w-xl">
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="w-8 sm:w-12 h-[1px] bg-savanna-gold" />
                  <span className="text-savanna-gold text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase font-medium">
                                    Curated Journeys
                                </span>
                </div>

                <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-foreground font-light leading-[1.1] sm:leading-[0.95]">
                  <span className="block">Signature</span>
                  <span className="block italic text-savanna-gold mt-1 sm:mt-2">Expeditions</span>
                </h2>

                <p className="mt-6 text-muted-foreground text-base md:text-lg leading-relaxed">
                  Carefully curated journeys designed for the discerning traveler and passionate photographer.
                </p>
              </div>

              <a
                  href="/safaris"
                  className="group inline-flex items-center gap-2 text-savanna-gold text-sm tracking-[0.2em] uppercase font-medium hover:gap-3 transition-all"
              >
                <span>View All Expeditions</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {expeditions.map((expedition, index) => (
                  <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group bg-background border border-border/30 hover:border-savanna-gold/40 overflow-hidden transition-all duration-300"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <div
                          className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                          style={{ backgroundImage: `url('${expedition.imageUrl}')` }}
                      />
                    </div>

                    <div className="p-6 md:p-8">
                      <h3 className="font-display text-2xl text-foreground font-light mb-2">
                        {expedition.title}
                      </h3>
                      <p className="text-muted-foreground text-base mb-6 font-medium">
                        {expedition.subtitle}
                      </p>
                      <p className="text-muted-foreground text-base leading-relaxed mb-8">
                        {expedition.description}
                      </p>
                      <div className="pt-6 border-t border-border/30 flex justify-between items-center">
                                        <span className="font-display text-2xl text-savanna-gold font-medium">
                                            From {expedition.price}
                                        </span>
                        <button className="text-sm tracking-[0.2em] uppercase text-foreground hover:text-savanna-gold transition-colors font-semibold">
                          Explore
                        </button>
                      </div>
                    </div>
                  </motion.div>
              ))}
            </div>
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
              <div className="w-12 h-[1px] bg-savanna-gold" />
              <span className="text-savanna-gold text-sm tracking-[0.4em] uppercase font-medium">
                            Begin Your Journey
                        </span>
              <div className="w-12 h-[1px] bg-savanna-gold" />
            </div>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground font-light mb-6 leading-[0.95]">
              <span className="block">Design Your</span>
              <span className="block italic text-savanna-gold mt-2">Perfect Season</span>
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
                    Preferred Season
                  </label>
                  <select
                      value={formData.season}
                      onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                      className="w-full bg-transparent border-b border-border/50 focus:border-savanna-gold focus:ring-0 py-3 transition-colors text-foreground appearance-none cursor-pointer"
                  >
                    <option value="">Select a season</option>
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
