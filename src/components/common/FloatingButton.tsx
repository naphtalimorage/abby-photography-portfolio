import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const FloatingButton = () => {
  return (
    <motion.a
      href="https://wa.me/254703542276?text=Hello%20Abby%20Wild,%20I'd%20like%20to%20inquire%20about%20your%20services."
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200, damping: 20 }}
      className="fixed bottom-24 md:bottom-6 right-6 z-40 w-14 h-14 bg-savanna-gold text-savanna-charcoal rounded-full flex items-center justify-center shadow-lg shadow-savanna-gold/30 hover:scale-110 hover:shadow-xl hover:shadow-savanna-gold/40 transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-savanna-gold animate-ping opacity-20" />

      <MessageCircle size={26} strokeWidth={2} />
    </motion.a>
  );
};

export default FloatingButton;
