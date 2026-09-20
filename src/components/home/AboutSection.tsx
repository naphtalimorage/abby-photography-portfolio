import { Camera, Mail, Medal, PlayCircle, ArrowRight } from "lucide-react";
import portraitUrl from "@/assets/IMG_0757.JPG.jpeg";
export function AboutSection() {

  const specialties = [
    'Wildlife & Safari Photography',
    'Aerial Cinematography',
    'Cultural Heritage',
    'Masterclass Tours',
    'Conservation Journalism',
  ];

  return (
    <section
      className="w-full py-24 md:py-32 px-6 md:px-12 lg:px-[64px] bg-background overflow-hidden"
      id="about-preview"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
        {/* Left Column: Portrait & Insignia */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-full max-w-md aspect-square bg-card p-3 shadow-2xl border border-border">
            {/* Decorative Gold Corner Brackets */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-savanna-gold -translate-x-1 -translate-y-1"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-savanna-gold translate-x-1 -translate-y-1"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-savanna-gold -translate-x-1 translate-y-1"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-savanna-gold translate-x-1 translate-y-1"></div>

            {/* Portrait */}
            <img
              alt="Abby Wild Portrait"
              className="w-full h-full object-cover"
              src={portraitUrl}
            />

            {/* Award Badge Chip */}
            <div className="absolute -bottom-4 left-6 px-4 py-2 bg-savanna-charcoal/95 backdrop-blur-md text-savanna-cream text-xs leading-4 uppercase tracking-[0.2em] shadow-lg flex items-center gap-2 border border-savanna-gold/30">
              <Medal className="w-4 h-4 text-savanna-gold" />
              Expedition Guide & Fellow
            </div>

            {/* Since Circular Seal */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-savanna-gold text-savanna-charcoal flex flex-col items-center justify-center text-center p-2 shadow-xl shadow-savanna-gold/30">
              <span className="text-[10px] leading-[14px] uppercase tracking-widest font-bold">
                ESTD
              </span>
              <span className="text-[24px] leading-[32px] font-bold leading-none">
                2023
              </span>
              <span className="text-[8px] leading-[14px] uppercase tracking-widest">
                NAIROBI
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative Biography */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-savanna-gold"></span>
            <span className="text-xs leading-4 tracking-[0.2em] uppercase text-savanna-gold">
              The Story Behind The Shutter
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
            Crafting Living Legacies from the{' '}
            <span className="italic text-savanna-gold font-normal">Maasai Mara</span> to the
            World
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Born with a restless fixation for raw horizons, Abby Wild spent her early
            career navigating conservation frontiers across Kenya, Tanzania, and Uganda.
            What began as solitary weeks tracking apex predators alongside indigenous
            Samburu and Maasai scouts evolved into an international fine art practice.
          </p>
          <p className="text-sm md:text-base text-muted-foreground/80 leading-relaxed">
            Abby's imagery rejects superficial tourist sensationalism in favor of
            patient, respectful intimacy. Whether spending fourteen hours silent in a
            custom gimballed Land Cruiser awaiting a lioness's glance or capturing the
            ancestral dignity of East African pastoralist cultures, every frame balances
            archival precision with profound ecological reverence.
          </p>

          {/* Specialty Badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            {specialties.map((specialty) => (
              <span
                key={specialty}
                className="px-3 py-1.5 bg-savanna-gold/10 border border-savanna-gold/30 text-foreground text-xs leading-4 tracking-wider uppercase"
              >
                {specialty}
              </span>
            ))}
          </div>

          {/* Direct Social Links */}
          <div className="flex items-center gap-6 pt-6 mt-2 border-t border-border/30">
            <a
              className="flex items-center gap-2 text-muted-foreground hover:text-savanna-gold transition-colors text-xs leading-4 tracking-widest"
              href="https://www.instagram.com/ryan_wild_gallery"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Camera className="w-4 h-4" />
              @RYANWILDPHOTO
            </a>
            <a
              className="flex items-center gap-2 text-muted-foreground hover:text-savanna-gold transition-colors text-xs leading-4 tracking-widest"
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <PlayCircle className="w-4 h-4" />
              YOUTUBE
            </a>
            <a
              className="flex items-center gap-2 text-muted-foreground hover:text-savanna-gold transition-colors text-xs leading-4 tracking-widest"
              href="mailto:ryanryanny44@gmail.com"
            >
              <Mail className="w-4 h-4" />
              DIRECT DESK
            </a>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <a
              href="/about"
              className="inline-flex items-center gap-2 text-savanna-gold text-sm tracking-widest uppercase hover:gap-3 transition-all duration-300 font-medium group"
            >
              <span>Read Full Story</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
