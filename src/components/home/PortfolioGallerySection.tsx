import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/intergration/supabase/Client.ts";
import SmartImage from "../common/SmartImage";

const categories = ["ALL", "WEDDINGS", "PORTRAITS", "BIG CATS", "PEOPLE & CULTURE", "EVENTS", "GREAT MIGRATION", "LANDSCAPES"];

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
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-[64px]">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3 font-medium">Portfolio</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground">
            The <span className="italic text-savanna-gold">Captured</span> Moments
          </h2>
        </motion.div>

        {/* Mobile Filters */}
        <div className="block lg:hidden mb-8">
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
                  rounded-full
                  transition
                  text-sm font-medium
                  ${
                    active === cat
                      ? "bg-savanna-gold text-savanna-charcoal"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Desktop Sidebar Filter */}
          <aside className="hidden lg:block md:col-span-2 lg:col-span-2">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="sticky top-32">
              <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6 font-medium">Filter</p>
              <div className="space-y-1">
                {categories.map((cat, index) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className="group w-full flex items-center gap-3 py-3 text-left transition-all duration-300 min-h-[44px]"
                  >
                    <div className={`h-[1px] transition-all duration-500 ${active === cat ? "w-8 bg-savanna-gold" : "w-4 bg-border group-hover:w-6 group-hover:bg-savanna-gold/50"}`} />
                    <span className={`text-sm tracking-widest uppercase transition-colors duration-300 ${active === cat ? "text-savanna-gold font-semibold" : "text-muted-foreground group-hover:text-foreground font-medium"}`}>
                      {cat}
                    </span>
                    {active === cat && <span className="text-[10px] text-savanna-gold/60 ml-auto">{String(index + 1).padStart(2, "0")}</span>}
                  </button>
                ))}
              </div>
            </motion.div>
          </aside>

          {/* Grid */}
          <section className="md:col-span-full lg:col-span-10">
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
              <AnimatePresence mode="popLayout">
                {photos.map((photo, i) => {
                  const isLeft = i % 2 === 0;
                  return (
                    <motion.div
                      key={photo.id || photo.title + i}
                      layout
                      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="relative aspect-[4/5] bg-card overflow-hidden group cursor-pointer border border-border hover:border-savanna-gold/30"
                      onClick={() => setLightbox(i)}
                    >
                      <div className="relative w-full h-full">
                        <SmartImage
                          src={photo.src}
                          alt={photo.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 transition-all duration-500 flex items-end bg-gradient-to-t from-savanna-charcoal/90 via-transparent to-transparent opacity-0 group-hover:opacity-100">
                          <div className="p-5 sm:p-7">
                            <p className="text-savanna-gold text-sm sm:text-base tracking-widest uppercase mb-1 font-semibold">{photo.category}</p>
                            <p className="text-savanna-cream font-display text-xl sm:text-2xl mt-1 line-clamp-2">{photo.title}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {/* Portfolio actions */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-12 md:mt-16 w-full pt-10 border-t border-border/50">
              {totalCount > 20 && (
                <Link to="/portfolio" className="group w-full sm:w-auto flex justify-center items-center gap-3 px-8 py-4 bg-savanna-gold text-savanna-charcoal text-sm tracking-widest uppercase hover:bg-savanna-gold/90 transition-all duration-300 rounded-lg min-h-[48px] font-bold shadow-lg shadow-savanna-gold/20 hover:shadow-xl hover:shadow-savanna-gold/30">
                  View Full Portfolio <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-savanna-charcoal/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-12 overflow-hidden" onClick={() => setLightbox(null)}>
            <button className="absolute top-3 right-3 sm:top-6 sm:right-6 text-savanna-cream/80 hover:text-savanna-cream bg-savanna-charcoal/50 hover:bg-savanna-charcoal/80 backdrop-blur-sm rounded-full p-2 transition-all z-50 min-h-[44px] min-w-[44px] flex items-center justify-center border border-savanna-gold/20" onClick={(e) => { e.stopPropagation(); setLightbox(null); }} aria-label="Close lightbox">
              <X size={24} className="sm:w-8 sm:h-8" strokeWidth={1.5} />
            </button>

            <button className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 text-savanna-cream/80 hover:text-savanna-cream bg-savanna-charcoal/50 hover:bg-savanna-charcoal/80 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all z-50 min-h-[44px] min-w-[44px] flex items-center justify-center border border-savanna-gold/20" onClick={(e) => { e.stopPropagation(); prevImage(); }} aria-label="Previous image">
              <ChevronLeft className="w-5 h-5 sm:w-8 sm:h-8" strokeWidth={1.5} />
            </button>
            <button className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 text-savanna-cream/80 hover:text-savanna-cream bg-savanna-charcoal/50 hover:bg-savanna-charcoal/80 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all z-50 min-h-[44px] min-w-[44px] flex items-center justify-center border border-savanna-gold/20" onClick={(e) => { e.stopPropagation(); nextImage(); }} aria-label="Next image">
              <ChevronRight className="w-5 h-5 sm:w-8 sm:h-8" strokeWidth={1.5} />
            </button>

            <div className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center px-4 sm:px-8 md:px-12" onClick={(e) => e.stopPropagation()}>
              <div className="relative w-full h-full flex items-center justify-center">
                <motion.div key={lightbox} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }} className="max-w-full max-h-full w-full h-full shadow-2xl rounded-lg overflow-hidden">
                  <SmartImage src={photos[lightbox]?.src} alt={photos[lightbox]?.title} loading="eager" priority className="!h-full !w-full object-contain bg-savanna-charcoal/10" style={{ objectFit: "contain" }} />
                </motion.div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-center bg-gradient-to-t from-savanna-charcoal/90 via-savanna-charcoal/60 to-transparent pointer-events-none">
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} key={`info-${lightbox}`} transition={{ delay: 0.2 }}>
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-savanna-gold mb-1">
                    {photos[lightbox]?.category} — {lightbox + 1} / {photos.length}
                  </p>
                  <h3 className="font-display text-xl sm:text-2xl font-light text-savanna-cream line-clamp-1">{photos[lightbox]?.title}</h3>
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
