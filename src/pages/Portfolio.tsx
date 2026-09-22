// src/pages/Portfolio.tsx
import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, type PanInfo } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Camera,
  ArrowRight,
  Loader2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Info
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/intergration/supabase/Client.ts';
import SmartImage from '@/components/common/SmartImage';

const categories = ["ALL", "WEDDINGS", "PORTRAITS", "BIG CATS", "PEOPLE & CULTURE", "EVENTS", "GREAT MIGRATION", "LANDSCAPES"];

const getPublicUrl = (path: string) => {
  const { data } = supabase.storage.from('portfolio').getPublicUrl(path);
  return data.publicUrl;
};

// ============================================
// PREMIUM LIGHTBOX COMPONENT
// ============================================
const Lightbox = ({
                    items,
                    currentIndex,
                    onClose,
                    onNext,
                    onPrev,
                  }: {
  items: any[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [direction, setDirection] = useState(0);

  // Swipe gesture values
  const x = useMotionValue(0);
  const scale = useTransform(x, [-300, 0, 300], [0.9, 1, 0.9]);
  const opacity = useTransform(x, [-300, -100, 0, 100, 300], [0.3, 0.8, 1, 0.8, 0.3]);

  const currentItem = items[currentIndex];

  // Reset states when image changes
  useEffect(() => {
    setIsZoomed(false);
    setImageLoaded(false);
  }, [currentIndex]);

  // Handle swipe
  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 80;
    if (info.offset.x < -threshold) {
      setDirection(1);
      onNext();
    } else if (info.offset.x > threshold) {
      setDirection(-1);
      onPrev();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setDirection(1);
        onNext();
      } else if (e.key === 'ArrowLeft') {
        setDirection(-1);
        onPrev();
      } else if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'i' || e.key === 'I') {
        setShowInfo(prev => !prev);
      } else if (e.key === 'z' || e.key === 'Z') {
        setIsZoomed(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev, onClose]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [currentIndex]);

  return (
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[80] bg-savanna-charcoal/98 backdrop-blur-2xl overflow-hidden"
          onClick={onClose}
      >
        {/* Top Bar - Counter & Controls */}
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 md:p-6 bg-gradient-to-b from-savanna-charcoal/90 via-savanna-charcoal/50 to-transparent"
            onClick={(e) => e.stopPropagation()}
        >
          {/* Left: Counter */}
          <div className="flex items-center gap-4">
            <div className="flex items-baseline gap-2">
                        <span className="text-2xl sm:text-4xl md:text-5xl font-display text-savanna-gold font-light">
                            {String(currentIndex + 1).padStart(2, '0')}
                        </span>
              <div className="flex flex-col gap-1">
                <div className="w-10 md:w-14 h-[1px] bg-savanna-gold/60" />
                <span className="text-savanna-cream/40 text-xs md:text-sm tracking-widest font-medium">
                                {String(items.length).padStart(2, '0')}
                            </span>
              </div>
            </div>
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Info Toggle */}
            <button
                onClick={() => setShowInfo(!showInfo)}
                className={`w-10 h-10 md:w-11 md:h-11 flex items-center justify-center border transition-all duration-300 active:scale-90 ${
                    showInfo
                        ? 'border-savanna-gold text-savanna-gold bg-savanna-gold/10'
                        : 'border-savanna-cream/20 text-savanna-cream/60 hover:text-savanna-gold hover:border-savanna-gold'
                }`}
                aria-label="Toggle info"
            >
              <Info size={16} strokeWidth={1.5} />
            </button>

            {/* Zoom Toggle - Desktop only */}
            <button
                onClick={() => setIsZoomed(!isZoomed)}
                className={`hidden md:flex w-11 h-11 items-center justify-center border transition-all duration-300 active:scale-90 ${
                    isZoomed
                        ? 'border-savanna-gold text-savanna-gold bg-savanna-gold/10'
                        : 'border-savanna-cream/20 text-savanna-cream/60 hover:text-savanna-gold hover:border-savanna-gold'
                }`}
                aria-label="Toggle zoom"
            >
              {isZoomed ? <ZoomOut size={16} strokeWidth={1.5} /> : <ZoomIn size={16} strokeWidth={1.5} />}
            </button>

            {/* Close Button */}
            <button
                onClick={onClose}
                className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center border border-savanna-cream/20 text-savanna-cream/60 hover:text-error hover:border-error transition-all duration-300 active:scale-90"
                aria-label="Close lightbox"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <div
            className="relative w-full h-full flex flex-col md:flex-row items-center justify-center pt-16 pb-32 md:pt-20 md:pb-20 px-3 sm:px-4 md:px-20"
            onClick={(e) => e.stopPropagation()}
        >
          {/* Image Container - Swipeable on Mobile */}
          <motion.div
              className={`relative flex-1 w-full md:w-auto h-full flex items-center justify-center transition-all duration-500 ${
                  showInfo ? 'md:pr-8' : ''
              }`}
              style={{ x, scale, opacity }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={handleDragEnd}
          >
            {/* Gold Frame Corners - Desktop only */}
            <div className="hidden md:block absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-savanna-gold/40 pointer-events-none" />
            <div className="hidden md:block absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-savanna-gold/40 pointer-events-none" />
            <div className="hidden md:block absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-savanna-gold/40 pointer-events-none" />
            <div className="hidden md:block absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-savanna-gold/40 pointer-events-none" />

            {/* Loading State */}
            {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-10 h-10 text-savanna-gold animate-spin" />
                </div>
            )}

            {/* Image */}
            <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95, x: direction > 0 ? 50 : -50 }}
                animate={{ opacity: 1, scale: isZoomed ? 1.5 : 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className={`relative w-full h-full max-w-6xl max-h-[80vh] md:max-h-[85vh] cursor-zoom-in ${
                    isZoomed ? 'cursor-zoom-out' : ''
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
            >
              <SmartImage
                  src={currentItem.imageUrl}
                  alt={currentItem.title}
                  loading="eager"
                  onLoad={() => setImageLoaded(true)}
                  className={`w-full h-full object-contain transition-all duration-500 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
              />
            </motion.div>

            {/* Swipe Hint - Mobile only */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ delay: 1, duration: 3, times: [0, 0.3, 1] }}
                className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 text-savanna-cream/60 text-xs tracking-widest uppercase flex items-center gap-3 pointer-events-none font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Swipe to Navigate</span>
              <ChevronRight className="w-4 h-4" />
            </motion.div>
          </motion.div>

          {/* Info Panel - Side on Desktop, Hidden on Mobile when toggled */}
          <AnimatePresence mode="sync">
            {showInfo && (
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="hidden md:flex w-96 flex-shrink-0 flex-col justify-center pl-8 border-l border-savanna-gold/20"
                    onClick={(e) => e.stopPropagation()}
                >
                  {/* Category Badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-[1px] bg-savanna-gold" />
                    <span className="text-savanna-gold text-xs tracking-[0.3em] uppercase font-bold">
                                    {currentItem.category}
                                </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-display text-3xl lg:text-4xl text-savanna-cream font-light leading-tight mb-4">
                    {currentItem.title}
                  </h2>

                  {/* Description */}
                  <p className="text-savanna-cream/60 text-sm leading-relaxed mb-8 italic">
                    A moment frozen in time, capturing the raw essence of the African wilderness in its purest form.
                  </p>

                  {/* Metadata */}
                  <div className="space-y-4 pt-6 border-t border-savanna-gold/20">
                    {currentItem.location && (
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 flex items-center justify-center border border-savanna-gold/30 bg-savanna-gold/5 flex-shrink-0">
                            <MapPin size={14} className="text-savanna-gold" />
                          </div>
                          <div>
                            <p className="text-xs text-savanna-cream/40 tracking-widest uppercase mb-0.5 font-medium">
                              Location
                            </p>
                            <p className="text-savanna-cream/80 text-base">
                              {currentItem.location}
                            </p>
                          </div>
                        </div>
                    )}

                    {currentItem.specs && (
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 flex items-center justify-center border border-savanna-gold/30 bg-savanna-gold/5 flex-shrink-0">
                            <Camera size={14} className="text-savanna-gold" />
                          </div>
                          <div>
                            <p className="text-xs text-savanna-cream/40 tracking-widest uppercase mb-0.5 font-medium">
                              Camera Settings
                            </p>
                            <p className="text-savanna-cream/80 text-base font-mono">
                              {currentItem.specs}
                            </p>
                          </div>
                        </div>
                    )}

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 flex items-center justify-center border border-savanna-gold/30 bg-savanna-gold/5 flex-shrink-0">
                        <Maximize2 size={14} className="text-savanna-gold" />
                      </div>
                      <div>
                        <p className="text-xs text-savanna-cream/40 tracking-widest uppercase mb-0.5 font-medium">
                          Edition
                        </p>
                        <p className="text-savanna-cream/80 text-base">
                          Limited Edition • Signed
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className="mt-8 group w-full flex items-center justify-center gap-3 py-5 bg-savanna-gold text-savanna-charcoal text-sm tracking-[0.2em] uppercase font-bold hover:bg-savanna-gold/90 transition-all active:scale-95">
                    <span>Inquire About Print</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Navigation Bar */}
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="absolute bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-savanna-charcoal/95 via-savanna-charcoal/70 to-transparent"
            onClick={(e) => e.stopPropagation()}
        >
          {/* Progress Dots */}
          <div className="flex justify-center gap-1.5 py-4 px-4">
            {items.map((_, idx) => (
                <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      // Trigger navigation to specific index
                      const diff = idx - currentIndex;
                      if (diff > 0) {
                        for (let i = 0; i < diff; i++) onNext();
                      } else if (diff < 0) {
                        for (let i = 0; i < Math.abs(diff); i++) onPrev();
                      }
                    }}
                    className={`transition-all duration-300 ${
                        idx === currentIndex
                            ? 'w-8 h-1 bg-savanna-gold'
                            : 'w-1 h-1 bg-savanna-cream/30 hover:bg-savanna-cream/60'
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between px-4 md:px-8 pb-4 md:pb-6">
            <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDirection(-1);
                  onPrev();
                }}
                disabled={currentIndex === 0}
                className={`flex-1 md:flex-none flex items-center justify-center md:justify-start gap-2 md:gap-3 py-3 md:py-4 px-4 md:px-6 border border-savanna-cream/20 transition-all duration-300 active:scale-95 ${
                    currentIndex === 0
                        ? 'opacity-30 cursor-not-allowed'
                        : 'text-savanna-cream/80 hover:text-savanna-gold hover:border-savanna-gold'
                }`}
                aria-label="Previous image"
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
              <span className="hidden md:inline text-xs uppercase tracking-widest font-medium">Previous</span>
            </button>

            {/* Keyboard Hints - Desktop only */}
            <div className="hidden lg:flex items-center gap-4 text-savanna-cream/30 text-[10px] tracking-widest uppercase">
              <div className="flex items-center gap-1.5">
                <kbd className="px-2 py-1 border border-savanna-cream/20 text-savanna-cream/50">←</kbd>
                <kbd className="px-2 py-1 border border-savanna-cream/20 text-savanna-cream/50">→</kbd>
                <span>Navigate</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="px-2 py-1 border border-savanna-cream/20 text-savanna-cream/50">Z</kbd>
                <span>Zoom</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="px-2 py-1 border border-savanna-cream/20 text-savanna-cream/50">I</kbd>
                <span>Info</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="px-2 py-1 border border-savanna-cream/20 text-savanna-cream/50">ESC</kbd>
                <span>Close</span>
              </div>
            </div>

            <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDirection(1);
                  onNext();
                }}
                disabled={currentIndex === items.length - 1}
                className={`flex-1 md:flex-none flex items-center justify-center md:justify-end gap-2 md:gap-3 py-3 md:py-4 px-4 md:px-6 border border-savanna-cream/20 transition-all duration-300 active:scale-95 ${
                    currentIndex === items.length - 1
                        ? 'opacity-30 cursor-not-allowed'
                        : 'text-savanna-cream/80 hover:text-savanna-gold hover:border-savanna-gold'
                }`}
                aria-label="Next image"
            >
              <span className="hidden md:inline text-xs uppercase tracking-widest font-medium">Next</span>
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </motion.div>

        {/* Mobile Info Panel - Slides up from bottom */}
        <AnimatePresence mode="sync">
          {showInfo && (
              <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                  className="md:hidden absolute bottom-24 left-0 right-0 bg-savanna-charcoal/95 backdrop-blur-xl border-t border-savanna-gold/20 p-4 sm:p-5 max-h-[32vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
              >
                {/* Category */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-[1px] bg-savanna-gold" />
                  <span className="text-savanna-gold text-xs tracking-[0.3em] uppercase font-bold">
                                {currentItem.category}
                            </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl sm:text-2xl text-savanna-cream font-light mb-4">
                  {currentItem.title}
                </h3>

                {/* Metadata */}
                <div className="flex flex-col gap-4 text-savanna-cream/60 text-sm font-medium">
                  {currentItem.location && (
                      <div className="flex items-center gap-3">
                        <MapPin size={16} className="text-savanna-gold" />
                        <span>{currentItem.location}</span>
                      </div>
                  )}
                  {currentItem.specs && (
                      <div className="flex items-center gap-3">
                        <Camera size={16} className="text-savanna-gold" />
                        <span className="font-mono">{currentItem.specs}</span>
                      </div>
                  )}
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
  );
};

// ============================================
// MAIN PORTFOLIO COMPONENT
// ============================================
const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { data: allPhotos, isLoading, error } = useQuery({
    queryKey: ['portfolio-photos-all'],
    queryFn: async () => {
      const { data, error } = await supabase
          .from('photos')
          .select('*')
          .order('sort_order', { ascending: true });

      if (error) throw error;

      return data.map((photo) => ({
        id: photo.id,
        title: photo.title || 'Untitled',
        category: photo.category || 'Uncategorized',
        location: photo.location || 'Maasai Mara',
        specs: photo.camera_specs || '',
        imageUrl: photo.image_url || getPublicUrl(photo.storage_path),
      }));
    },
    staleTime: 5 * 60 * 1000,
  });

  const filteredItems = useMemo(() => {
    if (!allPhotos) return [];
    if (activeCategory === 'ALL') return allPhotos;
    return allPhotos.filter(photo =>
        photo.category.toUpperCase() === activeCategory.toUpperCase()
    );
  }, [allPhotos, activeCategory]);

  useEffect(() => {
    setLightboxIndex(null);
  }, [activeCategory]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextImage = useCallback(() => {
    if (lightboxIndex !== null && filteredItems.length > 0) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  }, [lightboxIndex, filteredItems.length]);

  const prevImage = useCallback(() => {
    if (lightboxIndex !== null && filteredItems.length > 0) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  }, [lightboxIndex, filteredItems.length]);

  if (isLoading) {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-savanna-gold animate-spin" />
            <p className="text-muted-foreground text-sm tracking-widest uppercase">Loading Portfolio</p>
          </div>
        </div>
    );
  }

  if (error) {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 mx-auto mb-4 border-2 border-error/30 bg-error/5 flex items-center justify-center">
              <X className="w-8 h-8 text-error" />
            </div>
            <h2 className="font-display text-2xl text-foreground mb-2">Failed to Load Portfolio</h2>
            <p className="text-muted-foreground mb-6">Unable to fetch photos. Please try refreshing.</p>
            <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-savanna-gold text-savanna-charcoal text-xs tracking-[0.2em] uppercase font-bold hover:bg-savanna-gold/90 transition-all"
            >
              Refresh Page
            </button>
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-background">
        {/* Header Section */}

        <section className="pt-10 sm:pt-16 pb-8 sm:pb-12 md:pt-24 md:pb-16 px-4 sm:px-6 flex items-center justify-center">
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center md:text-left"
          >
            <div className="flex items-center gap-4 mb-6 justify-center ">
              <div className="w-12 h-px bg-savanna-gold" />
              <span className="text-savanna-gold text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.4em] uppercase font-medium">
                                 Portfolio
                        </span>
              <div className="w-12 h-px bg-savanna-gold" />
            </div>

            <h1 className="flex flex-col items-center justify-center font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-savanna-cream mb-6 sm:mb-8 leading-[1.05] sm:leading-[0.95]">
              <span className="block">The Archive</span>
              <span className="block italic text-savanna-gold mt-2">Exhibition</span>
            </h1>

            <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mx-auto text-center px-1">
              A visual journey through the soul of the Maasai Mara. From the thunderous Great Migration to the silent gaze of a leopard, every frame captures a moment of raw, untamed elegance.
            </p>
          </motion.div>
        </section>

        {/* Category Filter */}
        <section className="px-4 sm:px-6 md:px-16 lg:px-16 max-w-[1600px] mx-auto mb-8 sm:mb-12 ">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border-b border-border/30"
          >
            <div className="flex gap-x-4 gap-y-4 overflow-x-auto hide-scrollbar">
              {categories.map((category) => (
                  <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`relative
                       whitespace-nowrap
                    px-4 sm:px-6 py-3
                    border
                    transition-all duration-300
                    text-sm tracking-wider uppercase font-medium ${
                          activeCategory === category
                              ? 'text-savanna-gold'
                              : 'text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    {category}
                    {activeCategory === category && (
                        <motion.div
                            layoutId="activeFilter"
                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-savanna-gold"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                    )}
                  </button>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Masonry Gallery */}
        <section className="px-4 sm:px-6 md:px-16 lg:px-[64px] max-w-[1600px] mx-auto pb-28 md:pb-24">
          {filteredItems.length === 0 ? (
              <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-24 text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 border-2 border-border/30 flex items-center justify-center">
                  <Camera className="w-10 h-10 text-muted-foreground/30" />
                </div>
                <h3 className="font-display text-2xl text-foreground mb-2">No Photos Found</h3>
                <p className="text-muted-foreground">
                  {activeCategory === 'ALL'
                      ? 'Start by uploading your first photo.'
                      : `No photos in "${activeCategory}" category yet.`}
                </p>
              </motion.div>
          ) : (
              <motion.div layout className="columns-1 md:columns-2 lg:columns-3 gap-4">
                <AnimatePresence mode="popLayout">
                  {filteredItems.map((item, index) => (
                      <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.4, delay: index * 0.03 }}
                          className="mb-4 break-inside-avoid group cursor-pointer relative overflow-hidden"
                          onClick={() => openLightbox(index)}
                      >
                        <div className={`relative overflow-hidden ${
                            index % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[3/4]'
                        } bg-savanna-charcoal/10`}>
                          <SmartImage
                              src={item.imageUrl}
                              alt={item.title}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-savanna-charcoal via-savanna-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                            <div className="absolute top-4 right-4 text-savanna-gold/60 text-sm tracking-widest font-medium">
                              {String(index + 1).padStart(2, '0')}
                            </div>

                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-8 h-[1px] bg-savanna-gold" />
                              <span className="text-savanna-gold text-xs tracking-[0.2em] uppercase font-semibold">
                                                    {item.category}
                                                </span>
                            </div>

                            <h3 className="font-display text-2xl md:text-3xl text-savanna-cream font-light leading-tight mb-2">
                              {item.title}
                            </h3>

                            <div className="flex items-center gap-2 text-savanna-cream/70 text-base font-medium">
                              <MapPin size={14} className="text-savanna-gold" />
                              <span>{item.location}</span>
                            </div>
                          </div>

                          <div className="absolute top-0 left-0 w-0 h-0 border-t-[30px] border-l-[30px] border-t-transparent border-l-savanna-gold/0 group-hover:border-l-savanna-gold/30 transition-all duration-500" />
                        </div>
                      </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
          )}
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-6 md:px-16 lg:px-[64px] max-w-[1600px] mx-auto text-center border-t border-border/30">
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-savanna-gold" />
              <span className="text-savanna-gold text-xs tracking-[0.4em] uppercase font-medium">
                            Fine Art
                        </span>
              <div className="w-12 h-[1px] bg-savanna-gold" />
            </div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground font-light mb-6">
              Bring the Mara to your Walls
            </h2>

            <p className="text-muted-foreground text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Limited edition fine art prints available. Each piece is hand-signed and numbered.
            </p>

            <button className="group inline-flex items-center gap-3 px-10 py-5 bg-savanna-gold text-savanna-charcoal text-xs tracking-[0.2em] uppercase font-medium hover:bg-savanna-gold/90 hover:shadow-lg hover:shadow-savanna-gold/30 transition-all duration-300">
              <span>Inquire about Prints</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </section>

        {/* Premium Lightbox */}
        <AnimatePresence mode="sync">
          {lightboxIndex !== null && (
              <Lightbox
                  items={filteredItems}
                  currentIndex={lightboxIndex}
                  onClose={closeLightbox}
                  onNext={nextImage}
                  onPrev={prevImage}
              />
          )}
        </AnimatePresence>
      </div>
  );
};

export default Portfolio;
