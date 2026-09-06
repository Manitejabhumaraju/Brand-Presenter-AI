import React from 'react';

interface BrandLogoProps {
  variant?: 'header' | 'full' | 'icon' | 'image' | 'footer';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'header',
  className = '',
  size = 'md',
  showTagline = true,
}) => {
  if (variant === 'image') {
    const heightClass = {
      sm: 'h-8',
      md: 'h-10',
      lg: 'h-14',
      xl: 'h-20',
    }[size];

    return (
      <div className={`inline-flex items-center ${className}`}>
        <img
          src="/brand-presenter-logo.png"
          alt="Brand Presenter AI"
          className={`${heightClass} w-auto object-contain rounded-xl border border-white/10 shadow-lg bg-white/5 backdrop-blur-sm p-1`}
          onError={(e) => {
            // Fallback if image fails to render
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
      </div>
    );
  }

  // Pure SVG/Vector Sculptural 'B' Emblem perfectly matching the 3D brand asset:
  // Features:
  // - The 3 vertical equalizer telemetry bars (purple, orange, coral)
  // - The sculptural folded 'B' ribbon flowing blue -> purple -> magenta -> orange
  // - The inset triangle play button
  const Emblem = ({ iconSize = 36 }: { iconSize?: number }) => (
    <div 
      className="relative shrink-0 flex items-center justify-center select-none"
      style={{ width: iconSize, height: iconSize }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(37,99,235,0.35)]"
      >
        <defs>
          {/* Signal / Equalizer gradients */}
          <linearGradient id="eq-1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
          <linearGradient id="eq-2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="60%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="eq-3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>

          {/* Main 3D Ribbon gradients */}
          <linearGradient id="ribbon-stem" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D2FF" />
            <stop offset="40%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1E1B4B" />
          </linearGradient>

          <linearGradient id="ribbon-upper" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="40%" stopColor="#3B82F6" />
            <stop offset="80%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#FBBF24" />
          </linearGradient>

          <linearGradient id="ribbon-loop-mid" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="35%" stopColor="#8B5CF6" />
            <stop offset="70%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>

          <linearGradient id="ribbon-bottom" x1="0%" y1="50%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4338CA" />
            <stop offset="40%" stopColor="#7C3AED" />
            <stop offset="75%" stopColor="#DB2777" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
        </defs>

        {/* 3 Left Equalizer / Analytics Bars */}
        <rect x="6" y="52" width="6" height="18" rx="3" fill="url(#eq-1)" />
        <rect x="15" y="42" width="6.5" height="34" rx="3.25" fill="url(#eq-2)" />
        <rect x="24.5" y="32" width="6.5" height="48" rx="3.25" fill="url(#eq-3)" />

        {/* Main Sculpted Stem of B */}
        <path
          d="M34 14C34 11.79 35.79 10 38 10H56C68 10 77 17 77 28C77 35.5 72 41 64 43.5C75 46.5 81 54 81 64C81 76.5 70.5 86 56 86H38C35.79 86 34 84.21 34 82V14Z"
          fill="url(#ribbon-stem)"
        />

        {/* Dynamic Curved Ribbon Loop Overlay */}
        <path
          d="M40 10H58C70 10 78 18 78 29C78 37 72 43 62 44.5C69 46.5 78 51 81 59C82.5 63 81.5 69 77 75C71 83 58 86 46 86C41 86 37 84 37 84C46 83 56 79 63 73C70 67 71 61 68 56C65 51 58 48 48 48H39V40H54C62 40 68 36 68 28C68 20 62 16 54 16H38L40 10Z"
          fill="url(#ribbon-upper)"
        />

        {/* Bottom swoosh loop with warm pink to orange gradient */}
        <path
          d="M38 78C46 78 57 74 65 67C72 61 74 54 69 49C65 45 57 44 48 44C43 51 38 60 38 78Z"
          fill="url(#ribbon-loop-mid)"
        />

        <path
          d="M39 80C50 80 62 76 71 69C78 63 80 55 75 49C71 56 64 64 54 69C46 73 40 76 39 80Z"
          fill="url(#ribbon-bottom)"
        />

        {/* Play Button Inset Triangle */}
        <path
          d="M48 27L63 36.5L48 46V27Z"
          fill="#FFFFFF"
          className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
        />
      </svg>
    </div>
  );

  if (variant === 'icon') {
    const sizeMap = { sm: 28, md: 36, lg: 48, xl: 64 };
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <Emblem iconSize={sizeMap[size]} />
      </div>
    );
  }

  // Header / Navigation compact logo
  if (variant === 'header') {
    return (
      <div className={`inline-flex items-center gap-2.5 sm:gap-3 text-left group ${className}`}>
        <Emblem iconSize={36} />
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="font-extrabold text-[15px] sm:text-[17px] tracking-tight text-white group-hover:text-white transition-colors">
              Brand
            </span>
            <span className="font-extrabold text-[15px] sm:text-[17px] tracking-tight bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              Presenter
            </span>
            <span className="font-extrabold text-[15px] sm:text-[17px] tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              AI
            </span>
          </div>

          {showTagline && (
            <div className="flex items-center gap-1 mt-0.5 text-[9px] uppercase tracking-[0.16em] font-semibold text-slate-400">
              <span>Where Brands Meet Real Creators</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Full / Hero / Modal Logo with Tagline and Pillars
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <div className="flex items-center gap-3 sm:gap-4 mb-2">
        <Emblem iconSize={size === 'xl' ? 68 : size === 'lg' ? 52 : 42} />
        <div className="text-left">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Brand
            </h1>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              Presenter
            </h1>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              AI
            </h1>
          </div>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.24em] font-bold text-slate-400 mt-1">
            Where Brands Meet Real Creators
          </p>
        </div>
      </div>

      {variant === 'full' && (
        <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] font-bold tracking-[0.18em] uppercase text-slate-400/90 mt-2 py-1 px-4 rounded-full bg-slate-900/60 border border-slate-800/80">
          <span className="hover:text-blue-400 transition-colors">Discover</span>
          <span className="text-purple-500/70">|</span>
          <span className="hover:text-purple-400 transition-colors">Analyze</span>
          <span className="text-pink-500/70">|</span>
          <span className="hover:text-pink-400 transition-colors">Collaborate</span>
          <span className="text-orange-500/70">|</span>
          <span className="hover:text-orange-400 transition-colors">Grow</span>
        </div>
      )}
    </div>
  );
};
