import { motion } from 'framer-motion';
import { Home, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--savanna-gold)_1px,_transparent_1px)] bg-[length:40px_40px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center relative z-10 max-w-2xl mx-auto"
      >
        {/* Decorative Lines */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-12 h-[1px] bg-savanna-gold" />
          <span className="text-savanna-gold text-xs tracking-[0.4em] uppercase font-medium">
            Lost in the Savanna
          </span>
          <div className="w-12 h-[1px] bg-savanna-gold" />
        </div>

        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', duration: 0.8 }}
          className="font-display text-8xl md:text-9xl text-savanna-gold mb-4 leading-none"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-display text-3xl md:text-4xl text-foreground mb-6 leading-tight"
        >
          Page Not <span className="italic text-savanna-gold">Found</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-muted-foreground text-base md:text-lg mb-12 max-w-md mx-auto leading-relaxed"
        >
          The page you're looking for doesn't exist or has been moved to a different location in the wild.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-savanna-gold text-savanna-charcoal text-sm tracking-[0.2em] uppercase font-medium hover:bg-savanna-gold/90 hover:shadow-lg hover:shadow-savanna-gold/30 transition-all duration-300"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/portfolio"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 border border-savanna-gold/40 text-foreground text-sm tracking-[0.2em] uppercase hover:bg-savanna-gold/10 hover:border-savanna-gold transition-all duration-300"
          >
            <span>View Portfolio</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
