// src/components/home/VideoReels.tsx
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  ArrowRight,
  Loader2,
  Film,
  X,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Info,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState, useEffect, useCallback, useRef } from 'react';
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

  // Autoplay video when loaded
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

  // Lock body scroll when video modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [currentIndex]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => {
          console.log('Play failed:', err);
          setIsPlaying(false);
        });
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
          className="fixed inset-0 z-[80] bg-savanna-charcoal/98 backdrop-blur-2xl overflow-hidden"
          onClick={onClose}
          onMouseMove={handleMouseMove}
      >
        {/* Top Bar - Only show when controls are visible or paused */}
        <AnimatePresence mode="sync">
          {showControls && (
              <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-4 md:p-6 bg-linear-to-b from-savanna-charcoal/90 via-savanna-charcoal/50 to-transparent"
                  onClick={(e) => e.stopPropagation()}
              >
                {/* Counter */}
                <div className="flex items-baseline gap-2">
                            <span className="text-3xl md:text-4xl font-display text-savanna-gold font-light">
                                {String(currentIndex + 1).padStart(2, '0')}
                            </span>
                  <div className="flex flex-col gap-1">
                    <div className="w-8 md:w-12 h-px bg-savanna-gold/60" />
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
          <AnimatePresence mode="sync">
            {showInfo && showControls && (
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="hidden md:flex w-96 shrink-0 flex-col justify-center pl-8 border-l border-savanna-gold/20"
                >
                  {/* Category */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-px bg-savanna-gold" />
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
                      <div className="w-8 h-8 flex items-center justify-center border border-savanna-gold/30 bg-savanna-gold/5 shrink-0">
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
                      <div className="w-8 h-8 flex items-center justify-center border border-savanna-gold/30 bg-savanna-gold/5 shrink-0">
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
        <AnimatePresence mode="sync">
          {showControls && (
              <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 right-0 z-50 bg-linear-to-t from-savanna-charcoal/95 via-savanna-charcoal/70 to-transparent"
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
                  className="md:hidden absolute bottom-28 left-0 right-0 bg-savanna-charcoal/95 backdrop-blur-xl border-t border-savanna-gold/20 p-4 sm:p-5 max-h-[28vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-px bg-savanna-gold" />
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
        <section className="relative py-12 sm:py-16 md:py-24 lg:py-32 bg-background overflow-hidden">
          <div className="flex items-center justify-center min-h-100">
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
        <section className="relative py-12 sm:py-16 md:py-24 lg:py-32 bg-background overflow-hidden">
          <div className="flex items-center justify-center min-h-100 px-6">
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
        <section className="relative py-12 sm:py-16 md:py-24 lg:py-32 bg-background overflow-hidden">
          <div className="flex items-center justify-center min-h-100 px-6">
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
      <section id={"reels"} className="relative py-16 sm:py-20 md:py-28 lg:py-36 bg-savanna-charcoal overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-linear-to-br from-savanna-charcoal via-savanna-charcoal/95 to-savanna-charcoal/90" />
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--savanna-gold)_1px,transparent_1px)]" />
          </div>
          {/* Glowing orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-savanna-gold/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-savanna-gold/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          {/* Header */}
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-12 md:mb-16 text-center"
          >
            {/* Category Badge */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center gap-3 mb-6 px-5 py-2.5 bg-savanna-gold/10 backdrop-blur-lg border border-savanna-gold/30 rounded-full"
            >
              <div className="w-2 h-2 bg-savanna-gold rounded-full animate-pulse" />
              <span className="text-savanna-gold text-xs sm:text-sm tracking-[0.3em] uppercase font-semibold">
                Cinematic Archives
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-savanna-cream font-light leading-[1.05] mb-6 tracking-tight"
            >
              <span className="block">Wild</span>
              <span className="block italic text-savanna-gold">Moments</span>
            </motion.h2>

            {/* Description */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-savanna-cream/60 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
            >
              Experience the untamed beauty of Africa through our lens. Each reel tells a story of the wild.
            </motion.p>
          </motion.div>

          {/* Featured Reel - Large Hero Card */}
          {reels.length > 0 && (
              <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="mb-8 md:mb-12 relative group cursor-pointer"
                  onClick={() => openReel(0)}
              >
                <div className="relative aspect-[4/5] sm:aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-lg">
                  {/* Image */}
                  <SmartImage
                      src={reels[0].imageUrl}
                      alt={reels[0].alt}
                      loading="eager"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-savanna-charcoal/95 via-savanna-charcoal/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-savanna-charcoal/30 via-transparent to-savanna-charcoal/95" />

                  {/* Content - Centered */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 lg:p-16">
                    <div className="text-center max-w-4xl">
                      {/* Category Badge */}
                      <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                          className="inline-flex items-center gap-3 mb-6 px-5 py-2.5 bg-savanna-gold/10 backdrop-blur-lg border border-savanna-gold/40 rounded-full"
                      >
                        <div className="w-2 h-2 bg-savanna-gold rounded-full animate-pulse" />
                        <span className="text-savanna-gold text-xs sm:text-sm tracking-[0.3em] uppercase font-semibold">
                          {reels[0].subtitle}
                        </span>
                      </motion.div>

                      {/* Title */}
                      <motion.h3
                          initial={{ opacity: 0, y: 30, scale: 0.95 }}
                          whileInView={{ opacity: 1, y: 0, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                          className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-savanna-cream font-light leading-[1.1] mb-4 sm:mb-6 tracking-tight line-clamp-3"
                      >
                        <span className="block">{reels[0].title}</span>
                      </motion.h3>

                      {/* Play Button */}
                      <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex items-center gap-3 sm:gap-4 px-5 sm:px-8 py-3 sm:py-4 bg-savanna-gold text-savanna-charcoal hover:bg-savanna-gold/90 transition-all duration-300 rounded-full shadow-lg shadow-savanna-gold/20"
                      >
                        <Play size={20} className="fill-current" />
                        <span className="text-xs sm:text-sm tracking-[0.25em] uppercase font-bold">Watch Now</span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute top-4 md:top-6 right-4 md:right-6 px-3 py-1.5 bg-savanna-charcoal/80 backdrop-blur-md border border-savanna-gold/30 rounded">
                    <span className="text-savanna-cream text-xs tracking-widest font-medium">
                      {reels[0].duration}
                    </span>
                  </div>

                  {/* Play Overlay on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-savanna-charcoal/30">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-savanna-gold/90 backdrop-blur-sm flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500">
                      <Play size={32} className="text-savanna-charcoal fill-current ml-1" />
                    </div>
                  </div>
                </div>
              </motion.div>
          )}

          {/* Grid of Smaller Reels */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {reels.slice(1).map((reel, index) => (
                <motion.div
                    key={reel.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: Math.min(index * 0.08, 0.5) }}
                    className="relative group cursor-pointer overflow-hidden rounded-lg aspect-9/16"
                    onClick={() => openReel(index + 1)}
                >
                  {/* Image */}
                  <div className="absolute inset-0">
                    <SmartImage
                        src={reel.imageUrl}
                        alt={reel.alt}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-savanna-charcoal via-savanna-charcoal/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4">
                    {/* Duration */}
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-savanna-charcoal/70 backdrop-blur-sm border border-savanna-gold/20 rounded text-[9px] sm:text-[10px] text-savanna-cream tracking-widest">
                      {reel.duration}
                    </div>

                    {/* Play Button */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300">
                      <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-savanna-gold/90 backdrop-blur-sm flex items-center justify-center md:transform md:scale-0 md:group-hover:scale-100 transition-transform duration-300">
                        <Play size={16} className="text-savanna-charcoal fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Subtitle */}
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 md:transform md:translate-y-2 md:group-hover:translate-y-0">
                      <div className="w-2 sm:w-3 h-px bg-savanna-gold" />
                      <span className="text-savanna-gold text-[8px] sm:text-[9px] tracking-[0.2em] uppercase font-bold">
                        {reel.subtitle}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="font-display text-xs sm:text-sm md:text-base text-savanna-cream font-light leading-tight line-clamp-2">
                      {reel.title}
                    </h4>
                  </div>

                  {/* Border Glow on Hover */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-savanna-gold/30 transition-colors duration-300 rounded-lg pointer-events-none" />
                </motion.div>
            ))}
          </div>

          {/* View-all Button */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 md:mt-16 text-center"
          >
            <button
                className="inline-flex items-center gap-3 px-8 py-4 border border-savanna-gold/30 text-savanna-gold hover:bg-savanna-gold hover:text-savanna-charcoal transition-all duration-300 rounded-full text-xs tracking-[0.2em] uppercase font-bold group"
            >
              <span>View All Reels</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
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
