import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../common/BrandLogo';
import { 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  Layers, 
  Building2,
  UserCheck,
  BarChart3,
  TrendingUp,
  Search,
  CheckCircle2
} from 'lucide-react';
import { formatNumber } from '../../utils/formatters';

export const PublicLandingView: React.FC = () => {
  const { creators, setUserRole, setActiveTab, setSelectedCreatorId, activeTab, theme } = useApp();

  // "Pricing Plans" and "Marketplace Home" both render this same page (the pricing tiers live
  // further down it) - jump straight to that section instead of leaving the page looking like
  // nothing happened when the sidebar link is clicked.
  useEffect(() => {
    if (activeTab === 'public_pricing') {
      document.getElementById('pricing-plans')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (activeTab === 'public_home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeTab]);

  const handleExploreDirectory = () => {
    setUserRole('brand');
    setActiveTab('discover');
  };

  const handleCreatorJoin = () => {
    setUserRole('creator');
    setActiveTab('creator_onboarding');
  };

  return (
    <div className="space-y-12 pb-20 animate-in fade-in duration-150">
      
      {/* 1. HERO BENTO BLOCK */}
      <div className={`relative overflow-hidden rounded-[2.5rem] p-8 sm:p-14 border transition-all duration-200 ${
        theme === 'light'
          ? 'bg-gradient-to-b from-white via-slate-50 to-slate-100/90 text-slate-900 border-slate-200 shadow-xl'
          : 'bg-gradient-to-b from-slate-900/95 via-[#0A0E1A] to-[#070A12] text-white border-slate-800/80 shadow-2xl'
      }`}>
        {/* Subtle Ambient Radial Light Mesh */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 blur-3xl pointer-events-none ${
          theme === 'light'
            ? 'bg-gradient-to-b from-blue-500/10 via-purple-500/5 to-transparent'
            : 'bg-gradient-to-b from-blue-600/10 via-purple-600/5 to-transparent'
        }`} />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-7">
          
          {/* Official Brand Logo with Tagline & Pillars */}
          <div className="flex justify-center pb-2">
            <BrandLogo variant="full" size="xl" />
          </div>

          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest shadow-inner ${
            theme === 'light'
              ? 'bg-slate-100 text-slate-700 border-slate-300/80'
              : 'bg-slate-900/90 border-slate-700/60 text-slate-300'
          }`}>
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Enterprise Creator Commerce & Verified Intelligence
            </span>
          </div>

          <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] ${
            theme === 'light' ? 'text-slate-950' : 'text-white'
          }`}>
            DISCOVER & CONTRACT <br />
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              VERIFIED CREATORS
            </span> WITH ZERO GUESSWORK
          </h1>

          <p className={`text-xs sm:text-base leading-relaxed max-w-2xl mx-auto font-normal ${
            theme === 'light' ? 'text-slate-600' : 'text-slate-300'
          }`}>
            Direct authorized API sync from YouTube, Instagram, TikTok & LinkedIn. No synthetic follower inflation, no vanity estimations. Real milestone escrow, audited pricing benchmarks, and transparent attribution.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleExploreDirectory}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white font-bold text-xs rounded-full shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Building2 className="w-4 h-4" />
              <span>Explore Marketplace as Brand</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleCreatorJoin}
              className={`w-full sm:w-auto px-8 py-3.5 font-bold text-xs rounded-full border flex items-center justify-center gap-2 transition-all shadow-sm ${
                theme === 'light'
                  ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
                  : 'bg-slate-900 hover:bg-slate-850 text-slate-200 hover:text-white border-slate-700/80'
              }`}
            >
              <UserCheck className="w-4 h-4 text-purple-500" />
              <span>Claim Creator Profile</span>
            </button>
          </div>

          {/* Trust stats pill bar Bento */}
          <div className={`pt-8 border-t grid grid-cols-2 sm:grid-cols-4 gap-6 text-center ${
            theme === 'light' ? 'border-slate-200' : 'border-slate-800/80'
          }`}>
            <div>
              <div className={`text-2xl sm:text-3xl font-black tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                45,000+
              </div>
              <div className={`text-[11px] font-medium mt-1 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                Verified High-Engagement Creators
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent tracking-tight">100%</div>
              <div className={`text-[11px] font-medium mt-1 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                Official OAuth Platform Data
              </div>
            </div>
            <div>
              <div className={`text-2xl sm:text-3xl font-black tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                4.2x
              </div>
              <div className={`text-[11px] font-medium mt-1 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                Average Campaign ROAS
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent tracking-tight">₹18 Cr+</div>
              <div className={`text-[11px] font-medium mt-1 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                Protected Milestone Escrow
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. FOUR PILLARS ARCHITECTURE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bg-slate-900/80 p-6 rounded-[2rem] border border-slate-800 hover:border-blue-500/40 shadow-sm space-y-3 transition-all">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
            <Search className="w-5 h-5" />
          </div>
          <div className="text-[10px] uppercase font-bold tracking-widest text-blue-400">Pillar 01</div>
          <h3 className="font-bold text-white text-sm tracking-tight">Discover</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Multimodal discovery across 18 verticals. Filter by verified demographics, geographic footprint, and authentic audience engagement.
          </p>
        </div>

        <div className="bg-slate-900/80 p-6 rounded-[2rem] border border-slate-800 hover:border-purple-500/40 shadow-sm space-y-3 transition-all">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div className="text-[10px] uppercase font-bold tracking-widest text-purple-400">Pillar 02</div>
          <h3 className="font-bold text-white text-sm tracking-tight">Analyze</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Authorized platform telemetry with bot-detection, engagement consistency scoring, and fair market rate-card benchmarks.
          </p>
        </div>

        <div className="bg-slate-900/80 p-6 rounded-[2rem] border border-slate-800 hover:border-pink-500/40 shadow-sm space-y-3 transition-all">
          <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center border border-pink-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div className="text-[10px] uppercase font-bold tracking-widest text-pink-400">Pillar 03</div>
          <h3 className="font-bold text-white text-sm tracking-tight">Collaborate</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Institutional brief execution, direct creator messaging, draft review workflows, and milestone payment protection.
          </p>
        </div>

        <div className="bg-slate-900/80 p-6 rounded-[2rem] border border-slate-800 hover:border-orange-500/40 shadow-sm space-y-3 transition-all">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center border border-orange-500/20">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="text-[10px] uppercase font-bold tracking-widest text-orange-400">Pillar 04</div>
          <h3 className="font-bold text-white text-sm tracking-tight">Grow</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Attribution intelligence, conversion tracking, ROI post-mortems, and long-term brand ambassador roster building.
          </p>
        </div>

      </div>

      {/* 3. FEATURED TALENT SHOWCASE BENTO GRID */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Verified Creator Roster
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
              Featured Official Creators
            </h2>
          </div>
          <button
            onClick={handleExploreDirectory}
            className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 transition-colors"
          >
            <span>View all creators</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {creators.slice(0, 3).map(c => (
            <div 
              key={c.id} 
              className="bg-slate-900/90 rounded-[2rem] border border-slate-800 p-6 shadow-sm hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3.5">
                  <img 
                    src={c.avatar} 
                    alt={c.name} 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=2563eb&color=fff&bold=true`;
                    }}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-700" 
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-white">{c.name}</span>
                      <ShieldCheck className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="text-xs text-slate-400">{c.handle} • {c.location.city}</div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mt-3.5 line-clamp-2 leading-relaxed">{c.bio}</p>

                <div className="grid grid-cols-2 gap-2.5 my-4 text-xs">
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80">
                    <div className="text-slate-500 text-[10px] uppercase font-bold">Followers</div>
                    <div className="font-bold text-white mt-0.5">{formatNumber(c.stats.totalFollowers)}</div>
                  </div>
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80">
                    <div className="text-slate-500 text-[10px] uppercase font-bold">Match Score</div>
                    <div className="font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mt-0.5">
                      {c.aiScore.overall}/100
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedCreatorId(c.id);
                  setUserRole('brand');
                  setActiveTab('creator_profile_view');
                }}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white rounded-full text-xs font-bold transition-colors text-center border border-slate-700"
              >
                Inspect Commercial Intelligence
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. COMMERCIAL PRICING PLANS BENTO */}
      <div id="pricing-plans" className="space-y-6 scroll-mt-24">
        <div className="text-center max-w-xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-widest text-blue-400">Tiers & Access</div>
          <h2 className="text-2xl font-bold text-white tracking-tight mt-1">Marketplace Access Plans</h2>
          <p className="text-xs text-slate-400 mt-1">
            Built for independent creators, high-growth consumer brands, and enterprise agency teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Creator Free Plan */}
          <div className="bg-slate-900/90 p-7 rounded-[2rem] border border-slate-800 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">For Creators</span>
              <div className="text-2xl font-black text-white">Free Forever</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Claim your commercial intelligence profile, sync multi-platform accounts, and receive verified brand briefs.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-2">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Unlimited platform connects</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Commercial rate card builder</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Case study portfolio showcase</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> 0% commission on inbound brand inquiries</li>
              </ul>
            </div>
            <button
              onClick={handleCreatorJoin}
              className="w-full py-3 bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white font-bold rounded-full text-xs transition-colors border border-slate-700"
            >
              Claim Creator Account
            </button>
          </div>

          {/* Pro Brand Plan */}
          <div className="bg-gradient-to-b from-slate-900 to-[#0B1020] p-7 rounded-[2rem] border-2 border-blue-500/80 shadow-xl space-y-6 flex flex-col justify-between relative">
            <span className="absolute -top-3.5 right-7 px-3 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
              Most Popular
            </span>
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">For Brands & Marketers</span>
              <div className="text-2xl font-black text-white">
                ₹14,999 <span className="text-xs text-slate-400 font-normal">/ month</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Full access to creator discovery, verified audience demographic breakdowns, rate card intelligence, and campaign tracking.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-200 pt-2">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-400" /> Full creator demographic insights</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-400" /> Rate card & marketplace benchmarks</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-400" /> Unlimited AI natural-language searches</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-400" /> Full campaign deliverables pipeline</li>
              </ul>
            </div>
            <button
              onClick={handleExploreDirectory}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-full text-xs transition-colors shadow-md shadow-blue-500/25"
            >
              Start 14-Day Free Trial
            </button>
          </div>

          {/* Enterprise Agency */}
          <div className="bg-slate-900/90 p-7 rounded-[2rem] border border-slate-800 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">For Agencies & Networks</span>
              <div className="text-2xl font-black text-white">Custom Agency</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Multi-brand management, automated contract generation, bulk talent exports, and dedicated account managers.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300 pt-2">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-400" /> Multi-brand client workspaces</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-400" /> Custom API webhook access</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-400" /> White-label talent presentation decks</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-400" /> Dedicated talent procurement lead</li>
              </ul>
            </div>
            <button
              onClick={handleExploreDirectory}
              className="w-full py-3 bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white font-bold rounded-full text-xs transition-colors border border-slate-700"
            >
              Contact Enterprise Sales
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
