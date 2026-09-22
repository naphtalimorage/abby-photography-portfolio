import { Camera, Mail, Medal, PlayCircle, ArrowRight, Sparkles } from "lucide-react";
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
      className="w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-[64px] bg-gradient-to-b from-background via-background to-savanna-gold/5 overflow-hidden relative"
      id="about"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-savanna-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-savanna-gold/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-savanna-gold/10 border border-savanna-gold/20 mb-6 max-w-full">
            <Sparkles className="w-4 h-4 text-savanna-gold shrink-0" />
            <span className="text-[10px] sm:text-xs leading-4 tracking-[0.12em] sm:tracking-[0.2em] uppercase text-savanna-gold font-medium">
              The Story Behind The Shutter
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-4">
            Crafting Living Legacies from the{' '}
            <span className="italic text-savanna-gold font-normal">Maasai Mara</span> to the
            World
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Portrait Side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              {/* Main Portrait with Organic Shape */}
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-savanna-gold/20">
                <img
                  alt="Abby Wild Portrait"
                  className="w-full aspect-[4/5] object-cover"
                  src={portraitUrl}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-savanna-charcoal/40 via-transparent to-transparent"></div>
              </div>

              {/* Floating Badge - Top Right */}
              <div className="absolute top-3 right-3 sm:-top-4 sm:-right-4 bg-savanna-gold text-savanna-charcoal px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl shadow-xl shadow-savanna-gold/30">
                <div className="text-center">
                  <span className="block text-[10px] leading-[14px] uppercase tracking-widest font-bold">
                    ESTD
                  </span>
                  <span className="block text-2xl font-bold leading-none">
                    2023
                  </span>
                  <span className="block text-[8px] leading-[14px] uppercase tracking-widest">
                    NAIROBI
                  </span>
                </div>
              </div>

              {/* Floating Credential Badge - Bottom Left */}
              <div className="absolute bottom-3 left-3 sm:-bottom-4 sm:-left-4 bg-savanna-charcoal/95 backdrop-blur-md text-savanna-cream px-4 sm:px-5 py-3 rounded-xl shadow-xl border border-savanna-gold/30 flex items-center gap-3 max-w-[calc(100%-1.5rem)]">
                <div className="w-10 h-10 rounded-full bg-savanna-gold/20 flex items-center justify-center">
                  <Medal className="w-5 h-5 text-savanna-gold" />
                </div>
                <div>
                  <p className="text-xs leading-4 uppercase tracking-[0.15em] font-medium">
                    Expedition Guide
                  </p>
                  <p className="text-xs leading-4 uppercase tracking-[0.15em] text-savanna-gold/80">
                    & Fellow
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2 flex flex-col gap-6">
            {/* Narrative */}
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-foreground leading-relaxed font-medium">
                My photography journey began in 2025, when I started following photographers
                and guests from around the world during game drives.
                Assisting them with their equipment and watching how
                they captured wildlife sparked my passion for photography.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                I was later invited to Saruni Basecamp for a six-month photography training, where I
                developed my skills and attended several conferences,
                gaining valuable experience and inspiration.
              </p>
              <p className="text-base md:text-lg text-muted-foreground/80 leading-relaxed">
                Today, I am working on wildlife films, using stable cameras to capture unique
                moments while continuing to sharpen my editing skills.
                My goal is to tell meaningful stories through photography and film,
                bringing the beauty of wildlife closer to people.
              </p>
            </div>

            {/* Specialties Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              {specialties.map((specialty) => (
                <div
                  key={specialty}
                  className="flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-lg hover:border-savanna-gold/30 transition-colors group"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-savanna-gold group-hover:scale-125 transition-transform"></div>
                  <span className="text-sm text-foreground leading-5 tracking-wide">
                    {specialty}
                  </span>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <a
                className="flex items-center gap-3 px-5 py-3 bg-card border border-border rounded-lg hover:border-savanna-gold/50 hover:bg-savanna-gold/5 transition-all group"
                href="https://www.instagram.com/ryan_wild_gallery"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Camera className="w-5 h-5 text-muted-foreground group-hover:text-savanna-gold transition-colors" />
                <span className="text-sm text-foreground leading-5 tracking-wider">
                  @ABBYWILDPHOTO
                </span>
              </a>
              <a
                className="flex items-center gap-3 px-5 py-3 bg-card border border-border rounded-lg hover:border-savanna-gold/50 hover:bg-savanna-gold/5 transition-all group"
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <PlayCircle className="w-5 h-5 text-muted-foreground group-hover:text-savanna-gold transition-colors" />
                <span className="text-sm text-foreground leading-5 tracking-wider">
                  YOUTUBE
                </span>
              </a>
              <a
                className="flex items-center gap-3 px-5 py-3 bg-card border border-border rounded-lg hover:border-savanna-gold/50 hover:bg-savanna-gold/5 transition-all group"
                href="mailto:abigaelnaisianoi605@gmail.com"
              >
                <Mail className="w-5 h-5 text-muted-foreground group-hover:text-savanna-gold transition-colors" />
                <span className="text-sm text-foreground leading-5 tracking-wider">
                  EMAIL
                </span>
              </a>
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <a
                href="/about"
                className="inline-flex items-center gap-3 px-8 py-4 bg-savanna-gold text-savanna-charcoal rounded-lg hover:bg-savanna-gold/90 transition-all shadow-lg shadow-savanna-gold/20 hover:shadow-savanna-gold/30 font-medium tracking-wider uppercase text-sm group"
              >
                <span>Read Full Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
