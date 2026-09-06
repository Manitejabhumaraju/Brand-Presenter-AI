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
          src="/brand-presenter-icon.png"
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

  // Official brand mark (cropped from the brandpresenters.com logo asset)
  const Emblem = ({ iconSize = 36 }: { iconSize?: number }) => (
    <div
      className="relative shrink-0 flex items-center justify-center select-none rounded-lg overflow-hidden bg-white"
      style={{ width: iconSize, height: iconSize }}
    >
      <img
        src="/brand-presenter-icon.png"
        alt="Brand Presenter AI"
        className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(37,99,235,0.35)]"
      />
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
