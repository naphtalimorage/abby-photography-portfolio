import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface Slide {
  index: number;
  subtitle: string;
  title: string;
  desc: string;
  number: string;
  image: string;
}

const slides: Slide[] = [
  {
    index: 0,
    subtitle: 'Chasing The Endless Savanna',
    title: 'The Untamed Rhythm of East Africa',
    desc: 'Immersive private photographic expeditions and museum-grade fine art prints curated directly from the heart of the Maasai Mara, Serengeti, and Great Rift Valley.',
    number: '01 / 03',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDReA46eRDPeHY4o6yDYHTd36_sJn-59UdcP2pFbXwR4INSAi23RDYh3he1FlWeucXLEkW-XUd14jDSq0TmlQb9uL6frQZ2hAu1CUqlTOK3BhnpqOYQap2PKLZoDwjibuBBbj2jh2NBN8di2HMurvMGzn3wpArzu8grzmhHEoieZir7uwj6KtBEDltKyyFhGDz2hiqKdeWYKqc2OO5X4HzeSeBJ5Qu__8QlqFpgC_EkVVaUt9-JPKxw',
  },
  {
    index: 1,
    subtitle: 'Silent Stalkers of the Mara',
    title: 'Predator Kingdom at Golden Hour',
    desc: 'Witness apex predators navigating ancient territorial corridors under the guidance of elite Samburu scouts and master wildlife mentor Ryan Wild.',
    number: '02 / 03',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC42nOr0J6YwVnsvsUgtTn4Zm7uwuvcujTDkYDozLWRX1zHzgcK-Bu9zuIjKUtjB2CzF8RNlVwq19koJxwDaunm4EgNe-uuRezT8rwBfSmzd4td005r5xH4eO8N7WAMRsA0shYMV8zeiMANpQ5NasvyU1c5TvxK1vzZJV_meuYzKR7oHOD8dEuM17TqFDG_Opj3UfZ0qAWpMGgV1wIIHnLUo2JICn9ScIjjOd3XLQ4Ty414soUPha_s',
  },
  {
    index: 2,
    subtitle: 'Vibrant Samburu Traditions',
    title: 'Ancestral Kenya in Living Memory',
    desc: 'Rare cultural photographic privileges into indigenous pastoralist lineages along the Ewaso Nyiro River and Northern frontier borders.',
    number: '03 / 03',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYD8qaIzMRnvL7gn0JGzdIFloNHQlzH4l2RnZC3Pn5yQAd5N56KtkUy9QmwyNv454vDG0l0K_j3HDe0SpOJZsdDxr6yCOz0uvL0_gqE5hbWXdtd9iVMORoSxDVf5cNT29hLKgcu0jcb4kz6mXGM_tceDeHiuk-xlDaLdBlfSehtzIeplmCPxXkIVREN6yH_Wley8BR7qvzbQVroLrkn8QxIpKR1dsd6GbiqYMuXk5S5Vm8uwbl1re',
  },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalTime = 6000;

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrent((prev) => (prev + 1) % slides.length);
          return 0;
        }
        return prev + 100 / (intervalTime / 50);
      });
    }, 50);

    return () => clearInterval(timer);
  }, [current]);

  const showSlide = (index: number) => {
    setCurrent((index + slides.length) % slides.length);
    setProgress(0);
  };

  return (
    <section
      className="relative w-full  min-h-screen overflow-hidden -mt-20 flex items-end select-none"
      id="hero-carousel"
    >
      {/* Slides Container */}
      <div className="absolute inset-0 w-full h-full" id="hero-slides-wrapper">
        <AnimatePresence mode="wait">
          {slides.map((slide) => (
            <motion.div
              key={slide.index}
              initial={{ opacity: 0 }}
              animate={{ opacity: current === slide.index ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className={`absolute inset-0 w-full h-full ${
                current === slide.index ? 'z-10' : 'z-0'
              }`}
              data-index={slide.index}
            >
              <motion.div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('${slide.image}')` }}
                initial={{ scale: 1.05 }}
                animate={{ scale: current === slide.index ? 1 : 1.05 }}
                transition={{ duration: 10, ease: 'easeOut' }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-savanna-charcoal via-savanna-charcoal/40 to-savanna-charcoal/60"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-savanna-charcoal/90 via-savanna-charcoal/30 to-transparent"></div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Editorial Corner Accents */}
      <div className="absolute top-24 left-6 md:left-10 w-8 h-8 pointer-events-none opacity-40 z-20 flex flex-col justify-between">
        <div className="w-full h-[1px] bg-savanna-gold"></div>
        <div className="w-[1px] h-full bg-savanna-gold -mt-8"></div>
      </div>
      <div className="absolute top-24 right-6 md:right-16 w-8 h-8 pointer-events-none opacity-40 z-20 flex flex-col items-end justify-between">
        <div className="w-full h-[1px] bg-savanna-gold"></div>
        <div className="w-[1px] h-full bg-savanna-gold -mt-8"></div>
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-20 w-full px-6 md:px-12 flex flex-col justify-end">
        <div className="max-w-4xl flex flex-col gap-4">
          {/* Category Pill Badge */}
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-savanna-gold/10 backdrop-blur-md border border-savanna-gold/30 text-savanna-gold text-xs tracking-[0.25em] uppercase font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-savanna-gold animate-pulse"></span>
              Safaris & Expeditions
            </span>
            <span className="text-xs tracking-[0.2em] uppercase text-savanna-cream/70">
              {slides[current].subtitle}
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            key={`title-${current}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display text-4xl md:text-6xl lg:text-4xl text-savanna-cream leading-tight"
          >
            The Untamed Rhythm {' '}
            <span className="italic text-savanna-gold font-normal">of East Africa</span>
          </motion.h1>

          {/* Narrative Description */}
          <motion.p
            key={`desc-${current}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-lg text-savanna-cream/80 max-w-2xl line-clamp-3 md:line-clamp-none"
          >
            {slides[current].desc}
          </motion.p>

          {/* CTA Action Group */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <Link
              to="/#contact"
              className="inline-flex items-center justify-center bg-savanna-gold text-savanna-charcoal hover:bg-savanna-gold/90 text-xs tracking-[0.14em] uppercase font-medium px-8 py-4 transition-all duration-300 shadow-lg shadow-savanna-gold/20 hover:shadow-xl hover:shadow-savanna-gold/30 active:scale-95"
            >
              Book Experience
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center bg-savanna-charcoal/60 hover:bg-savanna-charcoal/80 backdrop-blur-md text-savanna-cream border border-savanna-gold/30 text-xs tracking-[0.14em] uppercase px-8 py-4 transition-all duration-300 hover:border-savanna-gold/50"
            >
              View Gallery
            </Link>
          </motion.div>
        </div>

        {/* Slide Navigation Bar & Timer Controls */}
        <div className="mt-12 pt-6 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Progress Bar & Indicator */}
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <span className="text-xs text-savanna-gold tracking-widest min-w-[56px] font-medium">
              {slides[current].number}
            </span>
            <div className="relative w-full h-[2px] bg-savanna-gold/20 overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-savanna-gold"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.05, ease: 'linear' }}
              />
            </div>
          </div>

          {/* Manual Buttons */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <button
              aria-label="Previous Slide"
              className="w-11 h-11 flex items-center justify-center bg-savanna-charcoal/60 hover:bg-savanna-gold hover:text-savanna-charcoal text-savanna-cream border border-savanna-gold/30 transition-all duration-300 active:scale-95"
              onClick={() => showSlide(current - 1)}
              type="button"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              aria-label="Next Slide"
              className="w-11 h-11 flex items-center justify-center bg-savanna-charcoal/60 hover:bg-savanna-gold hover:text-savanna-charcoal text-savanna-cream border border-savanna-gold/30 transition-all duration-300 active:scale-95"
              onClick={() => showSlide(current + 1)}
              type="button"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Animated Down Indicator */}
      <Link
        to="#video-reels"
        aria-label="Scroll to content"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-1 text-savanna-cream/70 hover:text-savanna-gold transition-colors"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">
          Explore
        </span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </Link>
    </section>
  );
}
