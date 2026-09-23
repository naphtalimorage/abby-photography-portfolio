import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Globe } from 'lucide-react';
import { FaInstagram, FaTwitter } from 'react-icons/fa';
import masaiMara from '../../assets/landscape.jpg';
const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'abigaelnaisianoi605@gmail.com',
    href: 'mailto:abigaelnaisianoi605@gmail.com'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+254 715 422 803',
    href: 'tel:+254715422803'
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
    <section id="contact" className="relative min-h-screen bg-savanna-charcoal overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${masaiMara})` }} />
        <div className="absolute inset-0 bg-linear-to-br from-savanna-charcoal via-savanna-charcoal/95 to-savanna-charcoal/90" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8">
          {/* Left Side - Visual Content */}
          <motion.div
            className="lg:col-span-1 flex flex-col justify-center py-8 sm:py-12 lg:py-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-savanna-gold text-sm tracking-[0.4em] uppercase font-medium mb-6">
                Connect With Us
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-savanna-cream leading-tight mb-6">
                Start Your
                <span className="block italic text-savanna-gold mt-2">African Adventure</span>
              </h2>
              <p className="text-savanna-cream/70 text-lg leading-relaxed mb-12 max-w-md">
                From private safaris to fine art photography, let's create unforgettable experiences in the heart of East Africa.
              </p>
            </motion.div>

            {/* Contact Info Cards */}
            <div className="space-y-4 mb-12">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="group flex items-center gap-4 p-4 sm:p-5 bg-savanna-cream/5 backdrop-blur-sm border border-savanna-gold/20 hover:border-savanna-gold/50 hover:bg-savanna-gold/10 transition-all duration-300 min-w-0"
                >
                  <div className="w-14 h-14 flex items-center justify-center bg-savanna-gold/10 group-hover:bg-savanna-gold/20 transition-all duration-300 flex-shrink-0">
                    <item.icon className="w-6 h-6 text-savanna-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-savanna-cream/50 text-xs tracking-widest uppercase mb-1">
                      {item.label}
                    </p>
                    <p className="text-savanna-cream text-sm sm:text-base group-hover:text-savanna-gold transition-colors duration-300 break-all">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-6"
            >
              <a href="#" className="w-12 h-12 flex items-center justify-center border border-savanna-gold/30 text-savanna-cream/70 hover:text-savanna-gold hover:border-savanna-gold hover:bg-savanna-gold/10 transition-all duration-300">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 flex items-center justify-center border border-savanna-gold/30 text-savanna-cream/70 hover:text-savanna-gold hover:border-savanna-gold hover:bg-savanna-gold/10 transition-all duration-300">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 flex items-center justify-center border border-savanna-gold/30 text-savanna-cream/70 hover:text-savanna-gold hover:border-savanna-gold hover:bg-savanna-gold/10 transition-all duration-300">
                <Globe className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            className="lg:col-span-1 py-8 sm:py-12 lg:py-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-savanna-cream/5 backdrop-blur-md border border-savanna-gold/20 p-5 sm:p-8 md:p-10 lg:p-12">
              <div className="mb-8">
                <h3 className="font-display text-2xl text-savanna-cream mb-2">Send a Message</h3>
                <p className="text-savanna-cream/60 text-sm">Fill out the form below and we'll get back to you within 24 hours.</p>
              </div>

              <form className="space-y-6">
                {/* Name */}
                <div>
                  <input
                    type="text"
                    className="w-full bg-savanna-cream/5 border border-savanna-gold/20 focus:border-savanna-gold focus:bg-savanna-gold/5 px-5 py-4 text-savanna-cream placeholder:text-savanna-cream/40 transition-all duration-300 outline-none"
                    placeholder="Your Name"
                  />
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    className="w-full bg-savanna-cream/5 border border-savanna-gold/20 focus:border-savanna-gold focus:bg-savanna-gold/5 px-5 py-4 text-savanna-cream placeholder:text-savanna-cream/40 transition-all duration-300 outline-none"
                    placeholder="Email Address"
                  />
                </div>

                {/* Interest */}
                <div>
                  <select className="w-full bg-savanna-cream/5 border border-savanna-gold/20 focus:border-savanna-gold focus:bg-savanna-gold/5 px-5 py-4 text-savanna-cream appearance-none cursor-pointer transition-all duration-300 outline-none">
                    <option value="" className="bg-savanna-charcoal text-savanna-cream/40">Select Interest</option>
                    {interests.map((interest) => (
                      <option key={interest} value={interest} className="bg-savanna-charcoal text-savanna-cream">
                        {interest}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <textarea
                    className="w-full bg-savanna-cream/5 border border-savanna-gold/20 focus:border-savanna-gold focus:bg-savanna-gold/5 px-5 py-4 text-savanna-cream placeholder:text-savanna-cream/40 min-h-[140px] resize-none transition-all duration-300 outline-none"
                    placeholder="Your Message"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-savanna-gold text-savanna-charcoal text-sm tracking-[0.2em] uppercase font-semibold hover:bg-savanna-gold/90 transition-all duration-300"
                >
                  <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
