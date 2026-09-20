import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, ArrowRight } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'ryanryanny44@gmail.com',
    href: 'mailto:ryanryanny44@gmail.com'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+254 703 542 276',
    href: 'tel:+254703542276'
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Narok, Maasai Mara, Kenya',
    href: 'https://maps.google.com'
  }
];

const interests = [
  'Portrait Photography',
  'Private Safari',
  'Event Photography',
  'Wedding Photography',
  'Corporate Event',
  'Other'
];

const Contact = () => {
  return (
    <section id="contact" className="relative py-24 md:py-32 bg-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--savanna-gold)_1px,_transparent_1px)] bg-[length:40px_40px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-[64px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-24 text-center"
        >
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-8 sm:w-12 h-[1px] bg-savanna-gold" />
            <span className="text-savanna-gold text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase font-medium">
              Get in Touch
            </span>
            <div className="w-8 sm:w-12 h-[1px] bg-savanna-gold" />
          </div>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-foreground leading-[1.1] sm:leading-[0.95]">
            <span className="block">Let's Design</span>
            <span className="block italic text-savanna-gold mt-1 sm:mt-2">Your Journey</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left - Info & Contact */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-10">
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
                Whether you're looking for a private safari, a photography workshop, or a fine art print for your home, I'm here to help you bring the Mara to life.
              </p>

              {/* Decorative Line */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-[1px] bg-gradient-to-r from-savanna-gold/40 to-transparent" />
                <p className="text-savanna-gold text-sm tracking-[0.3em] uppercase italic font-display">
                  Begin Your Story
                </p>
              </div>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4 mb-10">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group flex items-center gap-4 p-4 border border-border/30 hover:border-savanna-gold/40 bg-background hover:bg-savanna-gold/5 transition-all duration-300"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 flex items-center justify-center border border-savanna-gold/30 group-hover:border-savanna-gold group-hover:bg-savanna-gold/10 transition-all duration-300 flex-shrink-0">
                    <item.icon className="w-5 h-5 text-savanna-gold" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-muted-foreground text-xs sm:text-sm tracking-widest uppercase mb-1 font-medium">
                      {item.label}
                    </p>
                    <p className="text-foreground text-sm sm:text-base md:text-lg group-hover:text-savanna-gold transition-colors duration-300 truncate">
                      {item.value}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ArrowRight
                    size={16}
                    className="text-muted-foreground group-hover:text-savanna-gold group-hover:translate-x-1 transition-all duration-300"
                  />
                </motion.a>
              ))}
            </div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-8 border-t border-border/30"
            >
              <p className="text-muted-foreground text-sm tracking-widest uppercase mb-4 font-medium">
                Trusted by
              </p>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-muted-foreground/60 text-xs sm:text-base">
                <span>National Geographic</span>
                <span className="hidden sm:block w-1 h-1 bg-savanna-gold rounded-full" />
                <span>JW Marriott</span>
                <span className="hidden sm:block w-1 h-1 bg-savanna-gold rounded-full" />
                <span>Safari Magazine</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative bg-background border border-border/30 p-6 sm:p-8 md:p-12">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-savanna-gold/40" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-savanna-gold/40" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-savanna-gold/40" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-savanna-gold/40" />

              <form className="space-y-6 md:space-y-8">
                {/* Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-transparent border-b border-border/50 focus:border-savanna-gold focus:ring-0 py-3 transition-colors text-foreground placeholder:text-muted-foreground/40"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full bg-transparent border-b border-border/50 focus:border-savanna-gold focus:ring-0 py-3 transition-colors text-foreground placeholder:text-muted-foreground/40"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Interest */}
                <div className="space-y-2">
                  <label className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-medium">
                    Interest
                  </label>
                  <select className="w-full bg-transparent border-b border-border/50 focus:border-savanna-gold focus:ring-0 py-3 transition-colors text-foreground appearance-none cursor-pointer">
                    {interests.map((interest) => (
                      <option key={interest} value={interest} className="bg-background text-foreground">
                        {interest}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-medium">
                    Message
                  </label>
                  <textarea
                    className="w-full bg-transparent border-b border-border/50 focus:border-savanna-gold focus:ring-0 py-3 transition-colors text-foreground placeholder:text-muted-foreground/40 min-h-[120px] resize-none"
                    placeholder="Tell me about your dream safari..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="group w-full flex items-center justify-center gap-3 px-8 py-5 bg-savanna-gold text-savanna-charcoal text-sm tracking-[0.2em] uppercase font-semibold hover:bg-savanna-gold/90 hover:shadow-lg hover:shadow-savanna-gold/30 transition-all duration-300"
                >
                  <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                  <span>Send Inquiry</span>
                </button>

                {/* Privacy Note */}
                <p className="text-center text-muted-foreground/60 text-sm font-medium">
                  Your information is secure and will never be shared.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
