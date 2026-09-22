import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';

const faqs = [
  {
    question: 'When is the best time to see the Great Migration?',
    answer: 'The Great Migration typically arrives in the Maasai Mara between July and October. However, wildlife viewing is exceptional year-round with different species movements and breeding cycles to observe.'
  },
  {
    question: 'What camera gear do you recommend for a safari?',
    answer: 'I recommend a telephoto lens (at least 400mm) for wildlife, a wide-angle for landscapes, and two camera bodies to avoid lens changes in dusty conditions. We offer gear consultations prior to your trip.'
  },
  {
    question: 'Do I need a private vehicle for photography?',
    answer: 'Absolutely. For photographers, a private vehicle is essential. It allows for the patience required to wait for perfect light or action and provides the space needed for equipment and maneuvering.'
  },
  {
    question: 'How far in advance should I book my safari?',
    answer: 'We recommend booking at least 6-12 months in advance, especially for peak migration season (July-October). This ensures availability of preferred accommodations and allows time for proper preparation.'
  },
  {
    question: 'What is included in a photography workshop?',
    answer: 'Our workshops include field instruction, composition guidance, post-processing lessons, gear consultation, and personalized feedback. All workshops are conducted in small groups to ensure individual attention.'
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id={"faq"} className="relative py-16 sm:py-24 md:py-32 bg-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--savanna-gold)_1px,_transparent_1px)] bg-[length:40px_40px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left - Header & Intro */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:sticky lg:top-32"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-savanna-gold" />
                <span className="text-savanna-gold text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.4em] uppercase font-medium">
                  Preparation
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-light text-foreground leading-[1.05] sm:leading-[0.95] mb-6">
                <span className="block">Frequently</span>
                <span className="block italic text-savanna-gold mt-2">Asked</span>
              </h2>

              <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
                Everything you need to know before embarking on your Mara adventure.
                Can't find what you're looking for? Reach out directly.
              </p>

              {/* Contact CTA */}
              <div className="pt-8 border-t border-border/30">
                <div className="flex items-center gap-3 mb-4">
                  <HelpCircle className="w-5 h-5 text-savanna-gold" />
                  <span className="text-foreground text-base font-semibold">
                    Still have questions?
                  </span>
                </div>
                <a
                  href="mailto:ryanryanny44@gmail.com"
                  className="group inline-flex items-center gap-2 text-savanna-gold text-sm tracking-widest uppercase hover:gap-3 transition-all duration-300 font-medium"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right - FAQ Accordion */}
          <div className="lg:col-span-8">
            <div className="space-y-0">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group border-b-0 border-border/30 "
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full py-6 md:py-8 text-left transition-all duration-300"
                  >
                    <div className="flex items-start gap-4 md:gap-6">
                      {/* Number */}
                      <div className="shrink-0 pt-0.5">
                        <span className={`font-display text-sm md:text-base transition-colors duration-300 ${
                          openIndex === index
                            ? 'text-savanna-gold'
                            : 'text-muted-foreground/40'
                        }`}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Question */}
                      <div className="flex-1">
                        <h3 className={`font-display text-sm md:text-md lg:text-lg font-light leading-snug transition-colors duration-300 ${
                          openIndex === index
                            ? 'text-savanna-gold'
                            : 'text-foreground group-hover:text-savanna-gold/80'
                        }`}>
                          {faq.question}
                        </h3>
                      </div>

                      {/* Icon */}
                      <div className="shrink-0 pt-1">
                        <motion.div
                          animate={{ rotate: openIndex === index ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className={`w-8 h-8 flex items-center justify-center border transition-all duration-300 ${
                            openIndex === index
                              ? 'border-savanna-gold bg-savanna-gold/10'
                              : 'border-border/50 group-hover:border-savanna-gold/50'
                          }`}
                        >
                          <ChevronDown
                            size={16}
                            className={`transition-colors duration-300 ${
                              openIndex === index
                                ? 'text-savanna-gold'
                                : 'text-muted-foreground'
                            }`}
                          />
                        </motion.div>
                      </div>
                    </div>
                  </button>

                  {/* Answer */}
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 md:pb-8 pl-0 sm:pl-10 md:pl-14">
                          <div className="flex items-start gap-4">
                            <div className="w-8 h-px bg-savanna-gold/40 mt-3 shrink-0" />
                            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
