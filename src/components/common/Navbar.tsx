import { useState, useEffect, useMemo   } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Shield, X, ArrowRight } from 'lucide-react';
import { FaInstagram as Instagram, FaYoutube as Youtube } from 'react-icons/fa';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '../ui/button';
import {UserAvatar} from './UserAvatar.tsx';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const location = useLocation();
  const navigationItems = useMemo(() => [
    { id: 'home', label: 'Home' },
    { id: 'reels', label: 'Reels' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' }
  ], []);

// Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100; // Offset for header height

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    // Set initial active section
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigationItems]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
    setActiveSection(sectionId);
  };

  const isActive = (sectionId: string) => activeSection === sectionId;

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);



  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-xl shadow-lg border-b border-border/30'
            : 'bg-transparent'
        }`}
      >
        <div className="h-16 md:h-20 w-full px-4 sm:px-6 md:px-12 lg:px-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 min-w-0 shrink">
            <UserAvatar size="lg" interactive={false} fallbackText="A" className="border-savanna-gold/30 shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="text-base sm:text-lg font-display font-bold text-foreground tracking-wide truncate">
                Abby Wild
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-savanna-gold font-medium">
                Gallery
              </span>
            </div>
          </Link>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex space-x-8">
            {navigationItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative font-medium transition-all duration-300 ${
                        isActive(item.id)
                            ? 'text-amber-600'
                            : 'text-gray-700 hover:text-amber-600'
                    }`}
                >
                  {item.label}
                  {isActive(item.id) && (
                      <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-600 rounded-full transition-all duration-300"></div>
                  )}
                </button>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1 sm:gap-4 shrink-0">
            {/* Admin Shield Link */}
            <Link
              to="/login"
              className="hidden md:flex p-4 text-muted-foreground hover:text-savanna-gold transition-colors min-touch-target"
              title="Admin Portal"
            >
              <Shield className="w-5 h-5" strokeWidth={1.5} />
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Book Now Button - Desktop */}
            <Button
              asChild
              className="hidden md:inline-flex bg-savanna-gold text-savanna-charcoal hover:bg-savanna-gold/90 text-xs tracking-[0.2em] uppercase font-medium px-6 py-2.5 transition-all shadow-lg shadow-savanna-gold/20 active:scale-95"
            >
              <Link to="/#contact">Book Now</Link>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden min-touch-target"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence mode="sync">
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-savanna-charcoal/80 backdrop-blur-sm z-[60]"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="lg:hidden fixed right-0 top-0 h-full w-[min(85%,24rem)] bg-background border-l border-savanna-gold/20 flex flex-col z-[70] shadow-2xl pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-6 border-b border-border/30 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <UserAvatar size="lg" interactive={false} fallbackText="A" className="border-savanna-gold/30" />
                  <div className="flex flex-col">
                    <span className="text-lg font-display font-bold text-foreground tracking-wide">
                      Abby Wild
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-savanna-gold font-medium">
                      Gallery
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(false)}
                  className="min-touch-target"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 flex flex-col overflow-y-auto p-6 space-y-2">
                {navigationItems.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative flex items-center justify-between py-4 text-lg font-medium transition-colors ${
                      location.pathname === link.path || (link.path.startsWith('#') && location.pathname === '/')
                        ? 'text-savanna-gold'
                        : 'text-foreground hover:text-savanna-gold'
                    }`}
                  >
                    <span>{link.name}</span>
                    {(location.pathname === link.path || (link.path.startsWith('#') && location.pathname === '/')) && (
                      <ArrowRight className="w-5 h-5" />
                    )}
                  </Link>
                ))}
              </div>

              {/* Admin Access Section */}
              <div className="p-6 border-t border-border/30">
                <Link
                  to="/login"
                  className="flex items-center gap-3 py-3 text-foreground hover:text-savanna-gold transition-colors"
                >
                  <Shield className="w-5 h-5" strokeWidth={1.5} />
                  <span className="font-medium">Admin Access</span>
                </Link>
              </div>

              {/* Social Links */}
              <div className="p-6 border-t border-border/30">
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/ryan_wild_gallery"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 text-muted-foreground hover:text-savanna-gold transition-colors min-touch-target"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a
                    href="https://www.youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 text-muted-foreground hover:text-savanna-gold transition-colors min-touch-target"
                  >
                    <Youtube className="h-6 w-6" />
                  </a>
                </div>
              </div>

              {/* Book Now Button */}
              <div className="p-6 border-t border-border/30">
                <Button
                  asChild
                  className="w-full bg-savanna-gold text-savanna-charcoal hover:bg-savanna-gold/90 text-xs tracking-[0.2em] uppercase font-medium py-4 transition-all shadow-lg shadow-savanna-gold/20 active:scale-95"
                >
                  <Link to="/#contact">Book Experience</Link>
                </Button>
              </div>

              {/* Copyright */}
              <div className="p-6 text-center text-xs text-muted-foreground">
                <p>© 2026 Abby Wild Gallery. All rights reserved.</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
