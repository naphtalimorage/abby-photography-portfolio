import React from 'react';

interface LogoSVGProps {
    className?: string;
}

export const LogoSVG: React.FC<LogoSVGProps> = ({ className = "" }) => {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Background Circle */}
            <circle cx="50" cy="50" r="48" className="fill-savanna-gold/10 stroke-savanna-gold/20" strokeWidth="2" />

            {/* Stylized "RW" or Wildlife Path */}
            <path
                d="M30 70V30H45C50 30 55 33 55 40C55 47 50 50 45 50L55 70M45 50H30"
                className="stroke-savanna-gold"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M60 30L70 70L80 30"
                className="stroke-savanna-gold"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Eye-like or lens-like accent for "Gallery" feel */}
            <circle cx="50" cy="15" r="3" className="fill-savanna-gold" />
        </svg>
    );
};
