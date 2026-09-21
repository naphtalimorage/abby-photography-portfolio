import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Shield, X, ArrowRight } from 'lucide-react';
import { FaInstagram as Instagram, FaYoutube as Youtube } from 'react-icons/fa';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '../ui/button';
import {UserAvatar} from './UserAvatar.tsx';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Reels', path: '/portfolio' },
    { name: 'Gallary', path: '/#services' },
    { name: 'About', path: '/tours' },
    { name: 'Services', path: '/about' },
    { name: 'FAQ', path: '/#contact' },
    { name: 'Contact', path: '/#contact' },

  ];

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
        <div className="h-20 w-full px-6 md:px-12 lg:px-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <UserAvatar size="lg" interactive={false} fallbackText="A" className="border-savanna-gold/30" />
            <div className="flex flex-col">
              <span className="text-lg font-display font-bold text-foreground tracking-wide">
                Abby Wild
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-savanna-gold font-medium">
                Gallery
              </span>
            </div>
          </Link>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-colors ${
                  location.pathname === link.path || (link.path.startsWith('#') && location.pathname === '/')
                    ? 'text-savanna-gold'
                    : 'text-foreground hover:text-savanna-gold'
                }`}
              >
                {link.name}
                {(location.pathname === link.path || (link.path.startsWith('#') && location.pathname === '/')) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-savanna-gold"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
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
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence mode="sync">
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-savanna-charcoal/80 backdrop-blur-sm z-[60]"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="lg:hidden fixed right-0 top-0 h-full w-[85%] max-w-sm bg-background border-l border-savanna-gold/20 flex flex-col z-[70] shadow-2xl"
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
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="min-touch-target"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 flex flex-col overflow-y-auto p-6 space-y-2">
                {navLinks.map((link) => (
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
