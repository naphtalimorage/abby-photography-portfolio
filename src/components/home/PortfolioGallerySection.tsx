import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/intergration/supabase/Client.ts";
import SmartImage from "../common/SmartImage";

const categories = ["ALL", "PORTRAITS", "BIG CATS", "PEOPLE & CULTURE", "EVENTS", "GREAT MIGRATION", "LANDSCAPES"];

const getPublicUrl = (path: string) => {
  const { data } = supabase.storage.from("portfolio").getPublicUrl(path);
  return data.publicUrl;
};

const getPhotoUrl = (photo: { image_url?: string | null; storage_path: string }) => {
  return photo.image_url || getPublicUrl(photo.storage_path);
};

const Portfolio = () => {
  const [active, setActive] = useState("ALL");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const filterScrollRef = useRef<HTMLDivElement>(null);

  const { data: photosData } = useQuery({
    queryKey: ["portfolio-photos-home", active],
    queryFn: async () => {
      let query = supabase
        .from("photos")
        .select("*", { count: "exact" })
        .order("sort_order", { ascending: true })
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

  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-savanna-charcoal overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--savanna-gold)_1px,_transparent_1px)] bg-[length:60px_60px]" />
      </div>

      <div className="relative  max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-[64px]">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex justify-start flex-col gap-6">
            <div>
              <span className="inline-block text-savanna-gold text-xs tracking-[0.4em] uppercase font-medium mb-2">
                Selected Works
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-savanna-cream leading-tight">
                Visual {''}
                <span className=" italic text-savanna-gold ">Storytelling</span>
              </h2>
            </div>
            {/*<p className="text-savanna-cream/60 text-lg max-w-md">*/}
            {/*  A curated collection of moments captured across the African wilderness, from the Great Migration to intimate cultural encounters.*/}
            {/*</p>*/}
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
          <div className="flex items-center gap-4 mb-6">
            <Filter className="w-5 h-5 text-savanna-gold" />
            <span className="text-savanna-cream/60 text-sm tracking-widest uppercase">Filter by Category</span>
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
                    px-6 py-3
                    border
                    transition-all duration-300
                    text-sm tracking-wider uppercase font-medium
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
                  px-6 py-3
                  border
                  transition-all duration-300
                  text-sm tracking-wider uppercase font-medium
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-16"
        >
          <AnimatePresence mode="popLayout">
            {photos.map((photo, i) => (
              <motion.div
                key={photo.id || photo.title + i}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative group cursor-pointer overflow-hidden"
                onClick={() => setLightbox(i)}
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <SmartImage
                    src={photo.src}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-savanna-charcoal via-savanna-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <span className="text-savanna-gold text-xs tracking-[0.3em] uppercase font-semibold mb-2">
                      {photo.category}
                    </span>
                    <h3 className="text-savanna-cream font-display text-xl line-clamp-2">
                      {photo.title}
                    </h3>
                  </div>

                  {/* Border on Hover */}
                  <div className="absolute inset-0 border-2 border-savanna-gold/0 group-hover:border-savanna-gold/50 transition-all duration-500 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

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
              className="group inline-flex items-center gap-4 px-10 py-5 bg-transparent border-2 border-savanna-gold text-savanna-gold text-sm tracking-[0.2em] uppercase font-semibold hover:bg-savanna-gold hover:text-savanna-charcoal transition-all duration-300"
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
            className="fixed inset-0 z-50 bg-savanna-charcoal flex items-center justify-center p-4 md:p-8"
            onClick={() => setLightbox(null)}
          >
            {/* Navigation Buttons */}
            <button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-savanna-gold/10 hover:bg-savanna-gold/20 border border-savanna-gold/30 text-savanna-cream transition-all z-50"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" strokeWidth={2} />
            </button>
            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center bg-savanna-gold/10 hover:bg-savanna-gold/20 border border-savanna-gold/30 text-savanna-cream transition-all z-50"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" strokeWidth={2} />
            </button>

            {/* Close Button */}
            <button
              className="absolute top-4 md:top-8 right-4 md:right-8 w-14 h-14 flex items-center justify-center bg-savanna-gold/10 hover:bg-savanna-gold/20 border border-savanna-gold/30 text-savanna-cream transition-all z-50"
              onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" strokeWidth={2} />
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
                  className="max-w-full max-h-[85vh] object-contain"
                />
              </motion.div>

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-savanna-charcoal via-savanna-charcoal/80 to-transparent">
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
                  <h3 className="font-display text-2xl md:text-3xl text-savanna-cream">
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

export default Portfolio;
