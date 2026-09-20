import { Link } from 'react-router-dom';

interface LogoProps {
  showText?: boolean;
  className?: string;
}

export function Logo({ showText = true, className = '' }: LogoProps) {
  return (
    <Link to="/" className={`flex items-center gap-3 ${className}`}>
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-savanna-gold flex-shrink-0"
      >
        {/* Outer circle with elegant stroke */}
        <circle cx="22" cy="22" r="20" stroke="currentColor" strokeWidth="1.5" fill="none" />
        
        {/* Eye shape - representing the photographer's vision */}
        <path
          d="M13 22C13 22 16.5 16 22 16C27.5 16 31 22 31 22C31 22 27.5 28 22 28C16.5 28 13 22 13 22Z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        
        {/* Pupil */}
        <circle cx="22" cy="22" r="3.5" fill="currentColor" />
        
        {/* Subtle accent dots */}
        <circle cx="22" cy="6" r="1" fill="currentColor" opacity="0.5" />
        <circle cx="22" cy="38" r="1" fill="currentColor" opacity="0.5" />
      </svg>
      
      {showText && (
        <div className="flex flex-col">
          <span className="text-lg font-display font-bold text-foreground tracking-wide">
            Abby Wild
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-savanna-gold font-medium">
            Gallery
          </span>
        </div>
      )}
    </Link>
  );
}
