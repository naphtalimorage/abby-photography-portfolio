// src/components/home/PortfolioSection.tsx
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/intergration/supabase/Client.ts";
import SmartImage from "../common/SmartImage";

const categories = ["ALL", "ELEPHANTS", "GIRAFFES", "BIG CATS", "PEOPLE & CULTURE", "BIRDS", "GREAT MIGRATION", "LANDSCAPES"];

const getPublicUrl = (path: string) => {
  const { data } = supabase.storage.from("portfolio").getPublicUrl(path);
  return data.publicUrl;
};

const getPhotoUrl = (photo: { image_url?: string | null; storage_path: string }) => {
  return photo.image_url || getPublicUrl(photo.storage_path);
};

const PortfolioGallerySection = () => {
  const [active, setActive] = useState("ALL");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const filterScrollRef = useRef<HTMLDivElement>(null);

  const { data: photosData, isLoading } = useQuery({
    queryKey: ["portfolio-photos-home", active],
    queryFn: async () => {
      let query = supabase
          .from("photos")
          .select("*", { count: "exact" })
          .order("sort_order", { ascending: true })
          .order("created_at", { ascending: false })
          .range(0, 19);

      if (active !== "ALL") {
        query = query.ilike("category", active);
      }

      const { data, error, count } = await query;
      if (error) throw error;

      return {
        photos: data.map((p) => ({
          id: p.id,
          src: getPhotoUrl(p),
          category: p.category,
          title: p.title,
        })),
        totalCount: count || 0,
      };
    },
    staleTime: 5 * 60 * 1000,
  });

  const photos = photosData?.photos || [];
  const totalCount = photosData?.totalCount || 0;

  const nextImage = useCallback(() => {
    if (lightbox !== null && photos.length > 0) {
      setLightbox((prev) => (prev! + 1) % photos.length);
    }
  }, [lightbox, photos.length]);

  const prevImage = useCallback(() => {
    if (lightbox !== null && photos.length > 0) {
      setLightbox((prev) => (prev! - 1 + photos.length) % photos.length);
    }
  }, [lightbox, photos.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightbox, nextImage, prevImage]);

  useEffect(() => {
    if (lightbox !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  useEffect(() => {
    if (!filterScrollRef.current) return;
    const activeIndex = categories.indexOf(active);
    const buttons = filterScrollRef.current.querySelectorAll("button");
    if (buttons[activeIndex]) {
      requestAnimationFrame(() => {
        buttons[activeIndex].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      });
    }
  }, [active]);

  const handleCategoryChange = (cat: string) => {
    if (typeof React !== "undefined" && "startTransition" in React) {
      React.startTransition(() => setActive(cat));
    } else {
      setActive(cat);
    }
  };

  // Loading state
  if (isLoading) {
    return (
        <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-savanna-charcoal overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--savanna-gold)_1px,_transparent_1px)] bg-[length:60px_60px]" />
          </div>
          <div className="relative px-4 sm:px-6 md:px-12 lg:px-[64px]">
            <div className="text-center mb-12">
              <p className="text-savanna-gold text-xs tracking-[0.4em] uppercase font-medium mb-3">Portfolio</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-savanna-cream font-light">
                Selected <span className="italic text-savanna-gold">Works</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
              {[...Array(8)].map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-savanna-gold/10 animate-pulse rounded-sm" />
              ))}
            </div>
          </div>
        </section>
    );
  }

  return (
      <section id={"gallery"} className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-savanna-charcoal overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--savanna-gold)_1px,_transparent_1px)] bg-[length:60px_60px]" />
        </div>

        <div className="relative px-4 sm:px-6 md:px-12 lg:px-[64px]">
          {/* Section Header */}
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12 sm:mb-16"
          >
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-0.5 bg-linear-to-r from-savanna-gold to-transparent" />
                  <span className="text-savanna-gold text-xs tracking-[0.4em] uppercase font-bold">
                    Portfolio
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-savanna-cream font-light leading-[0.95] sm:leading-[0.9]">
                  <span className="block">Selected</span>
                  <span className="block italic text-savanna-gold">Works</span>
                </h2>
              </div>
            </div>
          </motion.div>

          {/* Filter Bar */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 sm:mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Filter className="w-4 h-4 text-savanna-gold" />
              <span className="text-savanna-cream/60 text-xs tracking-widest uppercase">Filter by Category</span>
            </div>

            {/* Mobile Filters */}
            <div className="lg:hidden">
              <div
                  ref={filterScrollRef}
                  className="flex overflow-x-auto gap-3 pb-4 no-scrollbar"
              >
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={`
                  whitespace-nowrap
                  px-5 py-2.5
                  border
                  transition-all duration-300
                  text-xs tracking-wider uppercase font-medium
                  ${
                            active === cat
                                ? "border-savanna-gold bg-savanna-gold text-savanna-charcoal"
                                : "border-savanna-gold/30 text-savanna-cream/70 hover:border-savanna-gold/60 hover:text-savanna-cream"
                        }
              `}
                    >
                      {cat}
                    </button>
                ))}
              </div>
            </div>

            {/* Desktop Filters */}
            <div className="hidden lg:flex flex-wrap gap-3">
              {categories.map((cat) => (
                  <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`
                    px-5 py-2.5
                    border
                    transition-all duration-300
                    text-xs tracking-wider uppercase font-medium
                    ${
                              active === cat
                                  ? "border-savanna-gold bg-savanna-gold text-savanna-charcoal"
                                  : "border-savanna-gold/30 text-savanna-cream/70 hover:border-savanna-gold/60 hover:text-savanna-cream"
                      }
                  `}
                  >
                    {cat}
                  </button>
              ))}
            </div>
          </motion.div>

          {/* Masonry Grid */}
          <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-5 mb-12 md:mb-16"
          >
            <AnimatePresence mode="popLayout">
              {photos.map((photo, i) => (
                  <motion.div
                      key={photo.id || photo.title + i}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="relative aspect-[3/4] overflow-hidden rounded-sm cursor-pointer group"
                      onClick={() => setLightbox(i)}
                  >
                    {/* Image */}
                    <SmartImage
                        src={photo.src}
                        alt={photo.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-savanna-charcoal via-savanna-charcoal/20 to-transparent opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 md:p-5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 md:transform md:translate-y-4 md:group-hover:translate-y-0">
                      <span className="text-savanna-gold text-[10px] sm:text-xs tracking-[0.3em] uppercase font-semibold mb-2">
                        {photo.category}
                      </span>
                      <h3 className="text-savanna-cream font-display text-sm sm:text-base md:text-lg line-clamp-2">
                        {photo.title}
                      </h3>
                    </div>

                    {/* Border on Hover */}
                    <div className="absolute inset-0 border-2 border-savanna-gold/0 group-hover:border-savanna-gold/50 transition-all duration-500 pointer-events-none" />
                  </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {photos.length === 0 && (
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
              >
                <p className="text-savanna-cream/60 text-lg">No photos found in this category.</p>
              </motion.div>
          )}

          {/* CTA */}
          {totalCount > 20 && (
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-center"
              >
                <Link
                    to="/portfolio"
                    className="group inline-flex items-center justify-center gap-3 sm:gap-4 px-5 sm:px-10 py-4 sm:py-5 bg-transparent border-2 border-savanna-gold text-savanna-gold text-[10px] sm:text-xs tracking-[0.12em] sm:tracking-[0.2em] uppercase font-semibold hover:bg-savanna-gold hover:text-savanna-charcoal transition-all duration-300 text-center"
                >
                  <span>View Complete Collection</span>
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
          )}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox !== null && (
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[80] bg-savanna-charcoal flex items-center justify-center p-3 sm:p-4 md:p-8"
                  onClick={() => setLightbox(null)}
              >
                {/* Navigation Buttons */}
                <button
                    className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center bg-savanna-gold/10 hover:bg-savanna-gold/20 border border-savanna-gold/30 text-savanna-cream transition-all z-50"
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
                </button>
                <button
                    className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center bg-savanna-gold/10 hover:bg-savanna-gold/20 border border-savanna-gold/30 text-savanna-cream transition-all z-50"
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
                </button>

                {/* Close Button */}
                <button
                    className="absolute top-3 right-3 md:top-8 md:right-8 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center bg-savanna-gold/10 hover:bg-savanna-gold/20 border border-savanna-gold/30 text-savanna-cream transition-all z-50"
                    onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
                    aria-label="Close lightbox"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
                </button>

                {/* Image Container */}
                <div
                    className="relative max-w-6xl w-full max-h-[90vh] flex items-center justify-center"
                    onClick={(e) => e.stopPropagation()}
                >
                  <motion.div
                      key={lightbox}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-full h-full flex items-center justify-center"
                  >
                    <SmartImage
                        src={photos[lightbox]?.src}
                        alt={photos[lightbox]?.title}
                        loading="eager"
                        priority
                        className="max-w-full max-h-[70vh] sm:max-h-[85vh] object-contain"
                    />
                  </motion.div>

                  {/* Image Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 bg-gradient-to-t from-savanna-charcoal via-savanna-charcoal/80 to-transparent">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        key={`info-${lightbox}`}
                        transition={{ delay: 0.2 }}
                        className="text-center"
                    >
                      <p className="text-savanna-gold text-xs tracking-[0.3em] uppercase mb-2">
                        {photos[lightbox]?.category} — {lightbox + 1} / {photos.length}
                      </p>
                      <h3 className="font-display text-xl md:text-2xl text-savanna-cream">
                        {photos[lightbox]?.title}
                      </h3>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </section>
  );
};

export default PortfolioGallerySection;
