// src/components/Layout/BottomNav.tsx
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GalleryVertical, Compass, Award, Mail } from 'lucide-react';

const BottomNav = () => {
  const navItems = [
    { icon: GalleryVertical, label: 'Home', path: '/' },
    { icon: Compass, label: 'Archive', path: '/portfolio' },
    { icon: Award, label: 'EXPEDITIONS ', path: '/tours' },
    { icon: Mail, label: 'THE GUIDE', path: '/about' }
  ];

  return (
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        {/* Gold accent line at top */}
        <div className="h-px bg-linear-to-r from-transparent via-savanna-gold/40 to-transparent" />

        {/* Navigation container with glass effect */}
        <div className="bg-background/95 backdrop-blur-xl border-t border-savanna-gold/10 shadow-[0_-8px_30px_rgba(0,0,0,0.2)]">
          <div className="flex justify-around items-center min-h-16 h-[calc(4.5rem+env(safe-area-inset-bottom))] px-2 sm:px-4 pb-[env(safe-area-inset-bottom)]">
            {navItems.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                        `relative flex flex-col items-center justify-center gap-1.5 flex-1 min-w-0 transition-all duration-500 ${
                            isActive
                                ? 'text-savanna-gold'
                                : 'text-muted-foreground/60 hover:text-foreground'
                        }`
                    }
                >
                  {({ isActive }) => (
                      <>
                        {/* Icon container */}
                        <div className="relative">
                          <motion.div
                              initial={false}
                              animate={{
                                scale: isActive ? 1.2 : 1,
                                y: isActive ? -4 : 0,
                              }}
                              transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 25
                              }}
                              className="flex items-center justify-center"
                          >
                            <item.icon
                                size={20}
                                strokeWidth={isActive ? 2.5 : 1.5}
                                className={`transition-all duration-500 ${isActive ? 'drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]' : ''}`}
                            />
                          </motion.div>

                          {/* Glow effect for active icon */}
                          {isActive && (
                              <motion.div
                                  layoutId="activeGlow"
                                  className="absolute inset-0 bg-savanna-gold/20 blur-xl rounded-full -z-10"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                              />
                          )}
                        </div>

                        {/* Label */}
                        <span
                            className={`text-[9px] uppercase tracking-[0.2em] font-bold transition-all duration-500 truncate max-w-full ${
                                isActive ? 'text-savanna-gold translate-y-0.5' : 'opacity-70'
                            }`}
                        >
                            {item.label}
                        </span>
                      </>
                  )}
                </NavLink>
            ))}
          </div>
        </div>
      </nav>
  );
};

export default BottomNav;
