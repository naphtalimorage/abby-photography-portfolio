// src/components/home/VideoReels.tsx
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Loader2,
  Film,
  X,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Info
} from 'lucide-react';
import { useRef, useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/intergration/supabase/Client.ts';
import SmartImage from '@/components/common/SmartImage';

// Helper to get public URL from storage path
const getPublicUrl = (path: string, bucket: string = 'video_reels') => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};

// ============================================
// VIDEO PLAYER MODAL COMPONENT
// ============================================
const VideoPlayerModal = ({
                            reels,
                            currentIndex,
                            onClose,
                            onNext,
                            onPrev,
                          }: {
  reels: any[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<number | null>(null);

  const currentReel = reels[currentIndex];
  const videoUrl = currentReel.videoUrl;

  // Reset states when reel changes
  useEffect(() => {
    setIsPlaying(true);
    setVideoLoaded(false);
    setProgress(0);
    setCurrentTime(0);
    setShowControls(true);
  }, [currentIndex]);

  // Auto-hide controls when playing
  useEffect(() => {
    if (isPlaying && videoLoaded) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000); // Hide after 3 seconds
    } else {
      setShowControls(true);
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying, videoLoaded]);

  // Show controls on mouse move
  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  }, [isPlaying]);

  // Auto-play video when loaded
  useEffect(() => {
    if (videoRef.current && videoLoaded) {
      videoRef.current.play().catch(err => {
        console.log('Auto-play prevented:', err);
        setIsPlaying(false);
      });
    }
  }, [videoLoaded, currentIndex]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onNext();
      else if (e.key === 'ArrowLeft') onPrev();
      else if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      } else if (e.key === 'i' || e.key === 'I') {
        setShowInfo(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const dur = videoRef.current.duration;
      setCurrentTime(current);
      setDuration(dur);
      setProgress((current / dur) * 100);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = percent * duration;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-savanna-charcoal/98 backdrop-blur-2xl overflow-hidden"
          onClick={onClose}
          onMouseMove={handleMouseMove}
      >
        {/* Top Bar - Only show when controls are visible or paused */}
        <AnimatePresence>
          {showControls && (
              <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 md:p-6 bg-gradient-to-b from-savanna-charcoal/90 via-savanna-charcoal/50 to-transparent"
                  onClick={(e) => e.stopPropagation()}
              >
                {/* Counter */}
                <div className="flex items-baseline gap-2">
                            <span className="text-3xl md:text-4xl font-display text-savanna-gold font-light">
                                {String(currentIndex + 1).padStart(2, '0')}
                            </span>
                  <div className="flex flex-col gap-1">
                    <div className="w-8 md:w-12 h-[1px] bg-savanna-gold/60" />
                    <span className="text-savanna-cream/40 text-[10px] md:text-xs tracking-widest">
                                    {String(reels.length).padStart(2, '0')}
                                </span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2 md:gap-3">
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

                  <button
                      onClick={onClose}
                      className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center border border-savanna-cream/20 text-savanna-cream/60 hover:text-error hover:border-error transition-all duration-300 active:scale-90"
                      aria-label="Close"
                  >
                    <X size={18} strokeWidth={1.5} />
                  </button>
                </div>
              </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div
            className="relative w-full h-full flex flex-col md:flex-row items-center justify-center pt-20 pb-28 md:pt-20 md:pb-20 px-4 md:px-20"
            onClick={(e) => e.stopPropagation()}
        >
          {/* Video Container */}
          <div className={`relative flex-1 w-full md:w-auto h-full flex items-center justify-center transition-all duration-500 ${
              showInfo ? 'md:pr-8' : ''
          }`}>
            {/* Gold Frame Corners */}
            <div className="hidden md:block absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-savanna-gold/40 pointer-events-none" />
            <div className="hidden md:block absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-savanna-gold/40 pointer-events-none" />
            <div className="hidden md:block absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-savanna-gold/40 pointer-events-none" />
            <div className="hidden md:block absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-savanna-gold/40 pointer-events-none" />

            {/* Loading State */}
            {!videoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-12 h-12 text-savanna-gold animate-spin" />
                </div>
            )}

            {/* Video Player */}
            <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-full max-w-6xl max-h-[80vh] md:max-h-[85vh]"
            >
              <video
                  ref={videoRef}
                  src={videoUrl}
                  className={`w-full h-full object-contain transition-opacity duration-500 ${
                      videoLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoadedData={() => setVideoLoaded(true)}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={() => setIsPlaying(false)}
                  playsInline
                  onClick={togglePlay}
              />

              {/* Play/Pause Overlay */}
              {!isPlaying && videoLoaded && (
                  <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center bg-savanna-charcoal/30 cursor-pointer"
                      onClick={togglePlay}
                  >
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-savanna-gold/90 backdrop-blur-sm flex items-center justify-center">
                      <Play size={32} className="text-savanna-charcoal fill-savanna-charcoal ml-1" />
                    </div>
                  </motion.div>
              )}
            </motion.div>
          </div>

          {/* Info Panel - Desktop */}
          <AnimatePresence>
            {showInfo && showControls && (
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="hidden md:flex w-96 flex-shrink-0 flex-col justify-center pl-8 border-l border-savanna-gold/20"
                >
                  {/* Category */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-[1px] bg-savanna-gold" />
                    <span className="text-savanna-gold text-[10px] tracking-[0.3em] uppercase font-bold">
                                    {currentReel.subtitle}
                                </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-display text-3xl lg:text-4xl text-savanna-cream font-light leading-tight mb-4">
                    {currentReel.title}
                  </h2>

                  {/* Description */}
                  <p className="text-savanna-cream/60 text-sm leading-relaxed mb-8 italic">
                    A cinematic journey into the heart of the Maasai Mara, capturing raw moments of wildlife in their natural habitat.
                  </p>

                  {/* Metadata */}
                  <div className="space-y-4 pt-6 border-t border-savanna-gold/20">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 flex items-center justify-center border border-savanna-gold/30 bg-savanna-gold/5 flex-shrink-0">
                        <Film size={14} className="text-savanna-gold" />
                      </div>
                      <div>
                        <p className="text-[10px] text-savanna-cream/40 tracking-widest uppercase mb-0.5">
                          Duration
                        </p>
                        <p className="text-savanna-cream/80 text-sm font-mono">
                          {currentReel.duration}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 flex items-center justify-center border border-savanna-gold/30 bg-savanna-gold/5 flex-shrink-0">
                        <Maximize size={14} className="text-savanna-gold" />
                      </div>
                      <div>
                        <p className="text-[10px] text-savanna-cream/40 tracking-widest uppercase mb-0.5">
                          Quality
                        </p>
                        <p className="text-savanna-cream/80 text-sm">
                          4K Ultra HD
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Keyboard Shortcuts */}
                  <div className="mt-8 pt-6 border-t border-savanna-gold/20">
                    <p className="text-[10px] text-savanna-cream/40 tracking-widest uppercase mb-3">
                      Keyboard Shortcuts
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-2 text-savanna-cream/60">
                        <kbd className="px-2 py-0.5 border border-savanna-cream/20">Space</kbd>
                        <span>Play/Pause</span>
                      </div>
                      <div className="flex items-center gap-2 text-savanna-cream/60">
                        <kbd className="px-2 py-0.5 border border-savanna-cream/20">M</kbd>
                        <span>Mute</span>
                      </div>
                      <div className="flex items-center gap-2 text-savanna-cream/60">
                        <kbd className="px-2 py-0.5 border border-savanna-cream/20">←→</kbd>
                        <span>Navigate</span>
                      </div>
                      <div className="flex items-center gap-2 text-savanna-cream/60">
                        <kbd className="px-2 py-0.5 border border-savanna-cream/20">ESC</kbd>
                        <span>Close</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Controls - Only show when controls are visible or paused */}
        <AnimatePresence>
          {showControls && (
              <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-savanna-charcoal/95 via-savanna-charcoal/70 to-transparent"
                  onClick={(e) => e.stopPropagation()}
              >
                {/* Progress Bar */}
                <div
                    className="mx-4 md:mx-8 mt-4 h-1 bg-savanna-cream/20 cursor-pointer group"
                    onClick={handleSeek}
                >
                  <div
                      className="h-full bg-savanna-gold relative transition-all"
                      style={{ width: `${progress}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-savanna-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                {/* Time & Controls */}
                <div className="flex items-center justify-between px-4 md:px-8 py-4 md:py-6">
                  {/* Left: Play controls */}
                  <div className="flex items-center gap-3">
                    <button
                        onClick={togglePlay}
                        className="w-12 h-12 flex items-center justify-center border border-savanna-gold/40 bg-savanna-gold/10 text-savanna-gold hover:bg-savanna-gold/20 transition-all active:scale-90"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? (
                          <Pause size={18} className="fill-savanna-gold" />
                      ) : (
                          <Play size={18} className="fill-savanna-gold ml-0.5" />
                      )}
                    </button>

                    <button
                        onClick={toggleMute}
                        className="w-10 h-10 flex items-center justify-center border border-savanna-cream/20 text-savanna-cream/60 hover:text-savanna-gold hover:border-savanna-gold transition-all active:scale-90"
                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>

                    <div className="text-savanna-cream/60 text-xs font-mono ml-2">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                  </div>

                  {/* Right: Navigation */}
                  <div className="flex items-center gap-2 md:gap-3">
                    <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onPrev();
                        }}
                        disabled={currentIndex === 0}
                        className={`w-10 h-10 md:w-11 md:h-11 flex items-center justify-center border transition-all duration-300 active:scale-90 ${
                            currentIndex === 0
                                ? 'opacity-30 cursor-not-allowed border-savanna-cream/20 text-savanna-cream/30'
                                : 'border-savanna-cream/20 text-savanna-cream/60 hover:text-savanna-gold hover:border-savanna-gold'
                        }`}
                        aria-label="Previous reel"
                    >
                      <ChevronLeft size={18} strokeWidth={1.5} />
                    </button>

                    <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNext();
                        }}
                        disabled={currentIndex === reels.length - 1}
                        className={`w-10 h-10 md:w-11 md:h-11 flex items-center justify-center border transition-all duration-300 active:scale-90 ${
                            currentIndex === reels.length - 1
                                ? 'opacity-30 cursor-not-allowed border-savanna-cream/20 text-savanna-cream/30'
                                : 'border-savanna-cream/20 text-savanna-cream/60 hover:text-savanna-gold hover:border-savanna-gold'
                        }`}
                        aria-label="Next reel"
                    >
                      <ChevronRight size={18} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>

                {/* Progress Dots */}
                <div className="flex justify-center gap-1.5 pb-4 px-4">
                  {reels.map((_, idx) => (
                      <button
                          key={idx}
                          onClick={() => {
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
                          aria-label={`Go to reel ${idx + 1}`}
                      />
                  ))}
                </div>
              </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Info Panel */}
        <AnimatePresence>
          {showInfo && showControls && (
              <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                  className="md:hidden absolute bottom-32 left-0 right-0 bg-savanna-charcoal/95 backdrop-blur-xl border-t border-savanna-gold/20 p-5 max-h-[30vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-[1px] bg-savanna-gold" />
                  <span className="text-savanna-gold text-[10px] tracking-[0.3em] uppercase font-bold">
                                {currentReel.subtitle}
                            </span>
                </div>
                <h3 className="font-display text-xl text-savanna-cream font-light mb-2">
                  {currentReel.title}
                </h3>
                <div className="flex items-center gap-4 text-savanna-cream/60 text-xs">
                  <div className="flex items-center gap-2">
                    <Film size={12} className="text-savanna-gold" />
                    <span>{currentReel.duration}</span>
                  </div>
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
  );
};

// ============================================
// MAIN VIDEO REELS COMPONENT
// ============================================
const VideoReels = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedReelIndex, setSelectedReelIndex] = useState<number | null>(null);

  // Fetch reels from Supabase
  const { data: reels, isLoading, error } = useQuery({
    queryKey: ['video-reels'],
    queryFn: async () => {
      const { data, error } = await supabase
          .from('video_reels')
          .select('*')
          .order('sort_order', { ascending: true })
          .limit(10);

      if (error) throw error;

      return data.map((reel) => ({
        id: reel.id,
        title: reel.title || 'Untitled Reel',
        subtitle: reel.category || 'Wildlife',
        imageUrl: reel.thumbnail_url || getPublicUrl(reel.storage_thumbnail_path),
        videoUrl: getPublicUrl(reel.storage_video_path),
        alt: reel.title || 'Video reel thumbnail',
        duration: reel.duration || '0:00',
      }));
    },
    staleTime: 5 * 60 * 1000,
  });

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

      const cardWidth = window.innerWidth < 768 ? 240 : 340;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(newIndex, (reels?.length || 0) - 1));
    }
  }, [reels]);

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [checkScroll]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 300);
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = window.innerWidth < 768 ? 240 : 340;
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 300);
    }
  };

  const openReel = (index: number) => {
    setSelectedReelIndex(index);
  };

  const closeReel = () => {
    setSelectedReelIndex(null);
  };

  const nextReel = useCallback(() => {
    if (selectedReelIndex !== null && reels && reels.length > 0) {
      setSelectedReelIndex((selectedReelIndex + 1) % reels.length);
    }
  }, [selectedReelIndex, reels]);

  const prevReel = useCallback(() => {
    if (selectedReelIndex !== null && reels && reels.length > 0) {
      setSelectedReelIndex((selectedReelIndex - 1 + reels.length) % reels.length);
    }
  }, [selectedReelIndex, reels]);

  // Loading State
  if (isLoading) {
    return (
        <section className="relative py-16 md:py-32 bg-background overflow-hidden">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-10 h-10 text-savanna-gold animate-spin" />
              <p className="text-muted-foreground text-sm tracking-widest uppercase">Loading Reels</p>
            </div>
          </div>
        </section>
    );
  }

  // Error State
  if (error) {
    return (
        <section className="relative py-16 md:py-32 bg-background overflow-hidden">
          <div className="flex items-center justify-center min-h-[400px] px-6">
            <div className="text-center max-w-md">
              <div className="w-16 h-16 mx-auto mb-4 border-2 border-error/30 bg-error/5 flex items-center justify-center">
                <Film className="w-8 h-8 text-error" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-2">Failed to Load Reels</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Unable to fetch video reels. Please try refreshing the page.
              </p>
            </div>
          </div>
        </section>
    );
  }

  // Empty State
  if (!reels || reels.length === 0) {
    return (
        <section className="relative py-16 md:py-32 bg-background overflow-hidden">
          <div className="flex items-center justify-center min-h-[400px] px-6">
            <div className="text-center max-w-md">
              <div className="w-16 h-16 mx-auto mb-4 border-2 border-border/30 flex items-center justify-center">
                <Film className="w-8 h-8 text-muted-foreground/30" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-2">No Reels Yet</h3>
              <p className="text-muted-foreground text-sm">
                Check back soon for new video content from the Mara.
              </p>
            </div>
          </div>
        </section>
    );
  }

  return (
      <section className="relative py-16 md:py-32 bg-background overflow-hidden pb-24 md:pb-12">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--savanna-gold)_1px,_transparent_1px)] bg-[length:40px_40px]" />
        </div>

        <div className="relative">
          {/* Header */}
          {/* Header */}
          <div className="px-5 md:px-16 lg:px-[64px] mb-8 md:mb-16">
            <div className="grid md:grid-cols-12">
              <div className="md:col-span-8 md:col-start-3 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                  <div className="flex items-center justify-center gap-4 mb-4 md:mb-6">
                    <div className="w-8 md:w-12 h-[1px] bg-savanna-gold" />
                    <span className="text-savanna-gold text-[10px] md:text-xs tracking-[0.4em] uppercase font-medium">
                                       Field Dispatches
                                    </span>
                    <div className="w-8 md:w-12 h-[1px] bg-savanna-gold" />
                  </div>

                  <h2 className="font-display gap-2 text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-foreground leading-[0.95]">
                    <span className="">Live from</span> {""}
                    <span className=" italic text-savanna-gold mt-2">
                                      the Mara
                                    </span>
                  </h2>

                  <p className="mt-4 md:mt-6 text-muted-foreground text-xs md:text-base max-w-md mx-auto leading-relaxed">
                    Real-time pulses of the wild — raw, unfiltered moments captured in the heart of Africa.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Reels Container */}
          <div
              ref={scrollRef}
              onScroll={checkScroll}
              className="flex overflow-x-auto hide-scrollbar gap-3 md:gap-6 px-5 md:px-16 lg:px-[64px] pb-4 snap-x snap-mandatory"
          >
            {reels.map((reel, index) => (
                <motion.div
                    key={reel.id}
                    className="flex-none w-[180px] sm:w-[200px] md:w-[220px] lg:w-[240px] aspect-[9/16] relative group cursor-pointer overflow-hidden snap-start"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    onClick={() => openReel(index)}
                >
                  {/* Image */}
                  <div className="absolute inset-0 overflow-hidden bg-savanna-charcoal/10">
                    <SmartImage
                        src={reel.imageUrl}
                        alt={reel.alt}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-active:scale-100"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-savanna-charcoal via-savanna-charcoal/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Duration Badge */}
                  <div className="absolute top-3 md:top-4 right-3 md:right-4 px-2 md:px-3 py-1 bg-savanna-charcoal/60 backdrop-blur-sm border border-savanna-gold/20">
                                <span className="text-savanna-cream text-[9px] md:text-[10px] tracking-widest font-medium">
                                    {reel.duration}
                                </span>
                  </div>

                  {/* Number */}
                  <div className="absolute top-3 md:top-4 left-3 md:left-4">
                                <span className="text-savanna-gold/60 text-[10px] md:text-xs tracking-widest font-medium">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    {/* Play Button */}
                    <motion.div
                        className="mb-3 md:mb-4"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border border-savanna-gold/40 bg-savanna-gold/10 backdrop-blur-sm group-hover:bg-savanna-gold/20 group-hover:border-savanna-gold group-active:bg-savanna-gold/30 transition-all duration-300">
                        <Play size={18} className="text-savanna-gold fill-savanna-gold/20 ml-0.5 md:ml-1" />
                      </div>
                    </motion.div>

                    {/* Subtitle */}
                    <div className="flex items-center gap-2 mb-1 md:mb-2">
                      <div className="w-4 md:w-6 h-[1px] bg-savanna-gold" />
                      <span className="text-savanna-gold text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-medium">
                                        {reel.subtitle}
                                    </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-lg md:text-2xl text-savanna-cream font-light leading-tight line-clamp-2">
                      {reel.title}
                    </h3>

                    {/* Watch indicator */}
                    <div className="hidden md:flex mt-4 items-center gap-2 text-savanna-cream/60 text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <span>Watch Now</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className="hidden md:block absolute top-0 left-0 w-0 h-0 border-t-[30px] border-l-[30px] border-t-transparent border-l-savanna-gold/0 group-hover:border-l-savanna-gold/30 transition-all duration-500" />
                </motion.div>
            ))}
          </div>

          {/* Mobile Scroll Indicators */}
          <div className="md:hidden flex justify-center gap-2 mt-6 px-5">
            {reels.map((_, index) => (
                <button
                    key={index}
                    onClick={() => scrollToIndex(index)}
                    className={`transition-all duration-300 ${
                        activeIndex === index
                            ? 'w-8 h-1 bg-savanna-gold'
                            : 'w-1 h-1 bg-savanna-gold/30'
                    }`}
                    aria-label={`Go to reel ${index + 1}`}
                />
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex justify-between items-center gap-4 mt-6 px-5">
            <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`flex-1 flex items-center justify-center gap-2 py-3 border transition-all duration-300 active:scale-95 ${
                    canScrollLeft
                        ? 'border-savanna-gold/30 text-foreground dark:text-savanna-cream/80 hover:border-savanna-gold hover:bg-savanna-gold/5'
                        : 'border-border/30 text-muted-foreground/30 cursor-not-allowed'
                }`}
            >
              <ChevronLeft size={16} strokeWidth={1.5} />
              <span className="text-[10px] uppercase tracking-widest">Previous</span>
            </button>

            <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`flex-1 flex items-center justify-center gap-2 py-3 border transition-all duration-300 active:scale-95 ${
                    canScrollRight
                        ? 'border-savanna-gold/30 text-foreground dark:text-savanna-cream/80 hover:border-savanna-gold hover:bg-savanna-gold/5'
                        : 'border-border/30 text-muted-foreground/30 cursor-not-allowed'
                }`}
            >
              <span className="text-[10px] uppercase tracking-widest">Next</span>
              <ChevronRight size={16} strokeWidth={1.5} />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:col-span-4 md:justify-end items-end gap-4 mt-8 px-16 lg:px-[64px]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center gap-4"
            >
              <button
                  onClick={() => scroll('left')}
                  disabled={!canScrollLeft}
                  className={`group w-12 h-12 flex items-center justify-center border transition-all duration-300 ${
                      canScrollLeft
                          ? 'border-savanna-gold/30 text-savanna-cream/80 hover:text-savanna-gold hover:border-savanna-gold hover:bg-savanna-gold/10'
                          : 'border-border/30 text-muted-foreground/30 cursor-not-allowed'
                  }`}
                  aria-label="Previous reel"
              >
                <ChevronLeft size={20} strokeWidth={1.5} />
              </button>

              <button
                  onClick={() => scroll('right')}
                  disabled={!canScrollRight}
                  className={`group w-12 h-12 flex items-center justify-center border transition-all duration-300 ${
                      canScrollRight
                          ? 'border-savanna-gold/30 text-savanna-cream/80 hover:text-savanna-gold hover:border-savanna-gold hover:bg-savanna-gold/10'
                          : 'border-border/30 text-muted-foreground/30 cursor-not-allowed'
                  }`}
                  aria-label="Next reel"
              >
                <ChevronRight size={20} strokeWidth={1.5} />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Video Player Modal */}
        <AnimatePresence>
          {selectedReelIndex !== null && (
              <VideoPlayerModal
                  reels={reels}
                  currentIndex={selectedReelIndex}
                  onClose={closeReel}
                  onNext={nextReel}
                  onPrev={prevReel}
              />
          )}
        </AnimatePresence>
      </section>
  );
};

export default VideoReels;
