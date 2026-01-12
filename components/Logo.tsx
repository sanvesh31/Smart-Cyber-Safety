
import React from 'react';

export const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const containerSizes = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-32 h-32'
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-6xl'
  };

  return (
    <div className={`${containerSizes[size]} relative flex items-center justify-center group`}>
      {/* Circuitry Decoration (Visible mainly in LG) */}
      {size === 'lg' && (
        <div className="absolute inset-0 scale-150 opacity-40">
          <svg viewBox="0 0 100 100" className="w-full h-full text-blue-400">
            <path d="M20 20 L30 30 M80 20 L70 30 M20 80 L30 70 M80 80 L70 70" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <circle cx="20" cy="20" r="1" fill="currentColor" />
            <circle cx="80" cy="20" r="1" fill="currentColor" />
            <circle cx="20" cy="80" r="1" fill="currentColor" />
            <circle cx="80" cy="80" r="1" fill="currentColor" />
            <path d="M50 5 L50 15 M50 85 L50 95 M5 50 L15 50 M85 50 L95 50" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
      )}

      {/* Hexagonal Shield Background */}
      <div 
        className="absolute inset-0 bg-slate-900 border-2 border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
        style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent"></div>
        {/* Scanning line effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/30 blur-sm animate-[scan_3s_ease-in-out_infinite]"></div>
      </div>

      {/* The Letter S */}
      <span className={`${textSizes[size]} font-black text-white z-10 select-none tracking-tighter drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]`}>
        S
      </span>

      {/* Outer Glow */}
      <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-2xl group-hover:bg-cyan-500/20 transition-all duration-700"></div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
