import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import image1 from '../../assets/Cheetah.jpg';
import image3 from '../../assets/Zibras2.jpg';
import image4 from '../../assets/zibras.jpg';
import image5 from '../../assets/Lions.jpg';
import image6 from '../../assets/Cheetah2.jpg';
import image7 from '../../assets/Leopard.jpg';
import image8 from '../../assets/Elephants.jpg';
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
    subtitle: 'Landscape',
    title: 'The Untamed Rhythm of East Africa',
    desc: 'Immersive private photographic expeditions and museum-grade fine art prints curated directly from the heart of the Maasai Mara, Serengeti, and Great Rift Valley.',
    number: '00 / 11', // Changed from 00/06
    image: image6,
  },
  {
    index: 1,
    subtitle: 'Safari',
    title: 'Predator Kingdom at Golden Hour',
    desc: 'Witness apex predators navigating ancient territorial corridors under the guidance of elite Samburu scouts and master wildlife mentor Ryan Wild.',
    number: '01 / 11', // Changed from 01/06
    image: image3,
  },
  {
    index: 2,
    subtitle: 'Landscape',
    title: 'The Untamed Rhythm of East Africa',
    desc: 'Immersive private photographic expeditions and museum-grade fine art prints curated directly from the heart of the Maasai Mara, Serengeti, and Great Rift Valley.',
    number: '02 / 11', // Changed from 02/06
    image: image4,
  },
  {
    index: 3,
    subtitle: 'Landscape',
    title: 'The Untamed Rhythm of East Africa',
    desc: 'Immersive private photographic expeditions and museum-grade fine art prints curated directly from the heart of the Maasai Mara, Serengeti, and Great Rift Valley.',
    number: '03 / 11', // Changed from 03/06
    image: image3,
  },
  {
    index: 4,
    subtitle: 'Cultural Traditions',
    title: 'Ancestral Kenya in Living Memory',
    desc: 'Rare cultural photographic privileges into indigenous pastoralist lineages along the Ewaso Nyiro River and Northern frontier borders.',
    number: '04 / 11', // Changed from 04/06
    image: image5,
  },
  {
    index: 5,
    subtitle: 'Landscape',
    title: 'The Untamed Rhythm of East Africa',
    desc: 'Immersive private photographic expeditions and museum-grade fine art prints curated directly from the heart of the Maasai Mara, Serengeti, and Great Rift Valley.',
    number: '05 / 11', // Changed from 05/06
    image: image3,
  },
  {
    index: 6,
    subtitle: 'Landscape',
    title: 'The Untamed Rhythm of East Africa',
    desc: 'Immersive private photographic expeditions and museum-grade fine art prints curated directly from the heart of the Maasai Mara, Serengeti, and Great Rift Valley.',
    number: '06 / 11', // Changed from 00/06
    image: image7,
  },
  {
    index: 7,
    subtitle: 'Safari',
    title: 'Predator Kingdom at Golden Hour',
    desc: 'Witness apex predators navigating ancient territorial corridors under the guidance of elite Samburu scouts and master wildlife mentor Ryan Wild.',
    number: '07 / 11', // Changed from 01/06
    image: image3,
  },
  {
    index: 8,
    subtitle: 'Landscape',
    title: 'The Untamed Rhythm of East Africa',
    desc: 'Immersive private photographic expeditions and museum-grade fine art prints curated directly from the heart of the Maasai Mara, Serengeti, and Great Rift Valley.',
    number: '08 / 11', // Changed from 02/06
    image: image1,
  },
  {
    index: 9,
    subtitle: 'Landscape',
    title: 'The Untamed Rhythm of East Africa',
    desc: 'Immersive private photographic expeditions and museum-grade fine art prints curated directly from the heart of the Maasai Mara, Serengeti, and Great Rift Valley.',
    number: '09 / 11', // Changed from 03/06
    image: image3,
  },
  {
    index: 10,
    subtitle: 'Cultural Traditions',
    title: 'Ancestral Kenya in Living Memory',
    desc: 'Rare cultural photographic privileges into indigenous pastoralist lineages along the Ewaso Nyiro River and Northern frontier borders.',
    number: '10 / 11', // Changed from 04/06
    image: image8,
  },
  {
    index: 11,
    subtitle: 'Landscape',
    title: 'The Untamed Rhythm of East Africa',
    desc: 'Immersive private photographic expeditions and museum-grade fine art prints curated directly from the heart of the Maasai Mara, Serengeti, and Great Rift Valley.',
    number: '11 / 11', // Changed from 05/06
    image: image5,
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
      className="relative w-full min-h-[100svh] overflow-hidden -mt-16 md:-mt-20 flex items-end select-none"
      id="hero-carousel"
    >
      {/* Slides Container */}
      {/* Slides Container */}
      <div className="absolute inset-0 w-full h-full" id="hero-slides-wrapper">
        {slides.map((slide) => (
            <motion.div
                key={slide.index}
                className={`absolute inset-0 w-full h-full ${
                    current === slide.index ? 'z-10' : 'z-0'
                }`}
                style={{
                  opacity: current === slide.index ? 1 : 0,
                  pointerEvents: current === slide.index ? 'auto' : 'none',
                }}
                data-index={slide.index}
            >
              <motion.div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${slide.image}')` }}
                  initial={{ scale: 1.05 }}
                  animate={{ scale: current === slide.index ? 1 : 1.05 }}
                  transition={{ duration: 10, ease: 'easeOut' }}
              >
                <div className="absolute inset-0 bg-linear-to-t from-savanna-charcoal via-savanna-charcoal/40 to-savanna-charcoal/60"></div>
                <div className="absolute inset-0 bg-linear-to-r from-savanna-charcoal/90 via-savanna-charcoal/30 to-transparent"></div>
              </motion.div>
            </motion.div>
        ))}
      </div>

      {/* Editorial Corner Accents */}
      <div className="absolute top-20 left-4 sm:left-6 md:left-10 w-6 h-6 sm:w-8 sm:h-8 pointer-events-none opacity-40 z-20 flex flex-col justify-between">
        <div className="w-full h-px bg-savanna-gold"></div>
        <div className="w-px h-full bg-savanna-gold -mt-6 sm:-mt-8"></div>
      </div>
      <div className="absolute top-20 right-4 sm:right-6 md:right-16 w-6 h-6 sm:w-8 sm:h-8 pointer-events-none opacity-40 z-20 flex flex-col items-end justify-between">
        <div className="w-full h-px bg-savanna-gold"></div>
        <div className="w-px h-full bg-savanna-gold -mt-6 sm:-mt-8"></div>
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-20 w-full px-4 sm:px-6 md:px-12 flex flex-col justify-end pb-28 md:pb-8">
        <div className="max-w-4xl flex flex-col gap-3 sm:gap-4">
          {/* Category Pill Badge */}
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3"
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
            className="font-display text-[1.65rem] sm:text-3xl md:text-5xl lg:text-6xl text-savanna-cream leading-tight text-left"
          >
            The Untamed Rhythm {' '}
            <span className="sm:block italic text-savanna-gold font-normal">of East Africa</span>
          </motion.h1>

          {/* Narrative Description */}
          <motion.p
            key={`desc-${current}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm sm:text-base md:text-lg text-savanna-cream/80 max-w-2xl line-clamp-3 md:line-clamp-none"
          >
            {slides[current].desc}
          </motion.p>

          {/* CTA Action Group */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col xs:flex-row flex-wrap items-stretch sm:items-center justify-start gap-3 sm:gap-4 pb-2"
          >
            <Link
              to="/#contact"
              className="inline-flex items-center justify-center bg-savanna-gold text-savanna-charcoal hover:bg-savanna-gold/90 text-xs tracking-[0.14em] uppercase font-medium px-6 sm:px-8 py-3.5 sm:py-4 min-h-11 transition-all duration-300 shadow-lg shadow-savanna-gold/20 hover:shadow-xl hover:shadow-savanna-gold/30 active:scale-95"
            >
              Book Experience
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center justify-center bg-savanna-charcoal/60 hover:bg-savanna-charcoal/80 backdrop-blur-md text-savanna-cream border border-savanna-gold/30 text-xs tracking-[0.14em] uppercase px-6 sm:px-8 py-3.5 sm:py-4 min-h-11 transition-all duration-300 hover:border-savanna-gold/50"
            >
              View Gallery
            </Link>
          </motion.div>
        </div>

        {/* Slide Navigation Bar & Timer Controls */}
        <div className="mt-8 sm:mt-6 pb-4 sm:pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          {/* Progress Bar & Indicator */}
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <span className="text-xs text-savanna-gold tracking-widest min-w-14 font-medium">
              {slides[current].number}
            </span>
            <div className="relative w-full h-0.5 bg-savanna-gold/20 overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-savanna-gold"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.05, ease: 'linear' }}
              />
            </div>
          </div>

          {/* Manual Buttons */}
          <div className="flex items-center gap-2 self-start md:self-auto">
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
