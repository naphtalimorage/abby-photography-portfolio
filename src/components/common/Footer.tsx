import { FaInstagram, FaFacebook } from "react-icons/fa6";
import { MapPin, Mail, ArrowRight } from "lucide-react";
import { Logo } from "./Logo.tsx";

const quickLinks = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Safaris", href: "/tours" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
];

const socialLinks = [
  { icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/ryan_wild_gallery" },
  { icon: FaFacebook, label: "Facebook", href: "https://www.facebook.com/share/1BVGAUKuqv/" },
];

const Footer = () => {
  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-savanna-charcoal text-savanna-cream overflow-hidden">
      {/* Subtle top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-savanna-gold/60 to-transparent" />

      {/* Faint background texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_50%_50%,_var(--savanna-gold)_1px,_transparent_1px)] bg-[length:24px_24px]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-[64px] pt-16 pb-8 md:pb-12">
        {/* Main footer grid */}
        <div className="grid md:grid-cols-12 gap-10 md:gap-8 mb-12">
          {/* Brand column */}
          <div className="md:col-span-5">
            <Logo className="mb-5" />
            <p className="text-savanna-cream/70 font-light text-base leading-relaxed max-w-sm">
              Fine art photography and guided safaris capturing the untamed spirit
              of the Maasai Mara with elegance and authenticity.
            </p>

            {/* Location & contact */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-savanna-cream/60 text-base">
                <MapPin size={16} className="text-savanna-gold flex-shrink-0" />
                <span>Narok, Maasai Mara, Kenya</span>
              </div>
              <div className="flex items-center gap-3 text-savanna-cream/60 text-base">
                <Mail size={16} className="text-savanna-gold flex-shrink-0" />
                <a
                  href="mailto:ryanryanny44@gmail.com"
                  className="hover:text-savanna-gold transition-colors"
                >
                  ryanryanny44@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 md:col-start-7">
            <p className="text-sm tracking-[0.3em] uppercase mb-5 text-savanna-gold font-medium">
              Explore
            </p>
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleScroll(link.href)}
                  className="block text-savanna-cream/60 text-base hover:text-savanna-gold hover:translate-x-1 transition-all duration-300 group py-1"
                >
                  <span className="inline-flex items-center gap-2">
                    <span className="w-0 group-hover:w-3 h-[1px] bg-savanna-gold transition-all duration-300" />
                    {link.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Social / Follow Along */}
          <div className="md:col-span-3">
            <p className="text-sm tracking-[0.3em] uppercase mb-5 text-savanna-gold font-medium">
              Follow the Journey
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-savanna-gold/20 text-savanna-cream/60 hover:text-savanna-gold hover:border-savanna-gold hover:bg-savanna-gold/10 transition-all duration-300 min-h-[44px] min-w-[44px]"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>

            {/* Newsletter mini CTA */}
            <div className="mt-6 pt-6 border-t border-savanna-gold/10">
              <p className="text-sm text-savanna-cream/50 mb-3 font-medium">
                Subscribe for field dispatches
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent border-b border-savanna-gold/20 text-savanna-cream text-base py-3 placeholder:text-savanna-cream/30 focus:outline-none focus:border-savanna-gold transition-colors"
                />
                <button className="text-savanna-gold hover:text-savanna-cream transition-colors px-4 py-2">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-savanna-gold/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-savanna-cream/40 text-sm tracking-wider font-medium">
            © 2026 Abby Wild Gallery. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-savanna-cream/40 font-medium">
            <a href="/privacy" className="hover:text-savanna-gold transition-colors">
              Privacy
            </a>
            <a href="/terms" className="hover:text-savanna-gold transition-colors">
              Terms
            </a>
            <a href="/licensing" className="hover:text-savanna-gold transition-colors">
              Licensing
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
