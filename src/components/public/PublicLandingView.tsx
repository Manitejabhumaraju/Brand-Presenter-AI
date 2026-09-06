import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  Layers, 
  Building2,
  UserCheck
} from 'lucide-react';
import { formatNumber } from '../../utils/formatters';

export const PublicLandingView: React.FC = () => {
  const { creators, setUserRole, setActiveTab, setSelectedCreatorId } = useApp();

  const handleExploreDirectory = () => {
    setUserRole('brand');
    setActiveTab('discover');
  };

  const handleCreatorJoin = () => {
    setUserRole('creator');
    setActiveTab('creator_dashboard');
  };

  return (
    <div className="space-y-12 pb-20 animate-in fade-in duration-150">
      
      {/* 1. HERO BENTO BLOCK */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-zinc-900 text-white p-8 sm:p-14 border border-zinc-800 shadow-2xl">
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-950 border border-zinc-800 text-xs font-bold uppercase tracking-widest text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Social Intelligence & Creator Commerce</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            DISCOVER & CONTRACT <br />
            <span className="text-emerald-500">VERIFIED CREATORS</span> WITH REAL AUDIT DATA
          </h1>

          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            Direct OAuth sync from YouTube, Instagram, TikTok & LinkedIn. No vanity estimation, no synthetic followers. Real milestone escrow and commercial attribution.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <button
              onClick={handleExploreDirectory}
              className="w-full sm:w-auto px-7 py-3.5 bg-zinc-100 hover:bg-white text-zinc-950 font-bold text-xs rounded-full shadow-lg flex items-center justify-center gap-2 transition-all"
            >
              <Building2 className="w-4 h-4" />
              <span>Explore Marketplace as Brand</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleCreatorJoin}
              className="w-full sm:w-auto px-7 py-3.5 bg-zinc-950 hover:bg-zinc-850 text-zinc-200 font-bold text-xs rounded-full border border-zinc-800 flex items-center justify-center gap-2 transition-all"
            >
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>Claim Creator Profile</span>
            </button>
          </div>

          {/* Trust stats pill bar Bento */}
          <div className="pt-8 border-t border-zinc-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-xl sm:text-2xl font-black text-zinc-100">45,000+</div>
              <div className="text-[11px] text-zinc-500 mt-0.5">Verified Indian & Global Creators</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-emerald-400">100%</div>
              <div className="text-[11px] text-zinc-500 mt-0.5">Official API Authorized Data</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-zinc-100">4.2x</div>
              <div className="text-[11px] text-zinc-500 mt-0.5">Average Campaign ROAS</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-emerald-400">₹18 Cr+</div>
              <div className="text-[11px] text-zinc-500 mt-0.5">Commercial Deals Facilitated</div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. FEATURED TALENT SHOWCASE BENTO GRID */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-emerald-400">Verified Roster</div>
            <h2 className="text-xl font-bold text-zinc-100 tracking-tight mt-0.5">
              Featured Verified Creators
            </h2>
          </div>
          <button
            onClick={handleExploreDirectory}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5"
          >
            <span>View all creators</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {creators.slice(0, 3).map(c => (
            <div 
              key={c.id} 
              className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-6 shadow-sm hover:border-zinc-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3.5">
                  <img src={c.avatar} alt={c.name} className="w-13 h-13 rounded-2xl object-cover border border-zinc-800" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-zinc-100">{c.name}</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-xs text-zinc-500">{c.handle} • {c.location.city}</div>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 mt-3.5 line-clamp-2 leading-relaxed">{c.bio}</p>

                <div className="grid grid-cols-2 gap-2.5 my-4 text-xs">
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-850">
                    <div className="text-zinc-500 text-[10px] uppercase font-bold">Followers</div>
                    <div className="font-bold text-zinc-100 mt-0.5">{formatNumber(c.stats.totalFollowers)}</div>
                  </div>
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-850">
                    <div className="text-zinc-500 text-[10px] uppercase font-bold">AI Match</div>
                    <div className="font-bold text-emerald-400 mt-0.5">{c.aiScore.overall}/100</div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedCreatorId(c.id);
                  setUserRole('brand');
                  setActiveTab('creator_profile_view');
                }}
                className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-750 text-zinc-200 rounded-full text-xs font-bold transition-colors text-center"
              >
                Inspect Commercial Intelligence
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. PLATFORM ARCHITECTURE PILLARS BENTO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-zinc-900 p-6 sm:p-7 rounded-[2rem] border border-zinc-800 shadow-sm space-y-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-zinc-100 text-sm">Direct-API Verification</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Every metric is synced via YouTube Data API, Meta Graph API, and TikTok Creator Marketplace. Zero synthetic follower guessing.
          </p>
        </div>

        <div className="bg-zinc-900 p-6 sm:p-7 rounded-[2rem] border border-zinc-800 shadow-sm space-y-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-zinc-100 text-sm">Explainable Vouchmark Intelligence</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Every recommendation provides transparent rationale into why a creator is an optimal fit based on demographic affinity, past ROAS, and content cadence.
          </p>
        </div>

        <div className="bg-zinc-900 p-6 sm:p-7 rounded-[2rem] border border-zinc-800 shadow-sm space-y-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-zinc-100 text-sm">Escrow & Milestone Pipeline</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Contract proposals, deliverable drafts, revisions, and published URLs are verified and stored in a single unified workspace.
          </p>
        </div>

      </div>

      {/* 4. COMMERCIAL PRICING PLANS BENTO */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-400">Tiers & Access</div>
          <h2 className="text-2xl font-bold text-zinc-100 tracking-tight mt-1">Marketplace Access Plans</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Built for independent creators, high-growth consumer brands, and enterprise agency teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Creator Free Plan */}
          <div className="bg-zinc-900 p-7 rounded-[2rem] border border-zinc-800 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">For Creators</span>
              <div className="text-2xl font-black text-zinc-100">Free Forever</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Claim your commercial intelligence profile, sync multi-platform accounts, and receive verified brand briefs.
              </p>
              <ul className="space-y-2.5 text-xs text-zinc-300 pt-2">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Unlimited platform connects</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Commercial rate card builder</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Case study portfolio showcase</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 0% commission on inbound brand inquiries</li>
              </ul>
            </div>
            <button
              onClick={handleCreatorJoin}
              className="w-full py-3 bg-zinc-800 hover:bg-zinc-750 text-zinc-200 font-bold rounded-full text-xs transition-colors"
            >
              Claim Creator Account
            </button>
          </div>

          {/* Pro Brand Plan */}
          <div className="bg-zinc-900 p-7 rounded-[2rem] border-2 border-emerald-500/80 shadow-lg space-y-6 flex flex-col justify-between relative">
            <span className="absolute -top-3.5 right-7 px-3 py-0.5 rounded-full bg-emerald-500 text-zinc-950 text-[10px] font-black uppercase tracking-wider">
              Most Popular
            </span>
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">For Brands & Marketers</span>
              <div className="text-2xl font-black text-zinc-100">
                ₹14,999 <span className="text-xs text-zinc-500 font-normal">/ month</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Full access to creator discovery, verified audience demographic breakdowns, rate card intelligence, and campaign tracking.
              </p>
              <ul className="space-y-2.5 text-xs text-zinc-300 pt-2">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Full creator demographic insights</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Rate card & marketplace benchmarks</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Unlimited AI natural-language searches</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Full campaign deliverables pipeline</li>
              </ul>
            </div>
            <button
              onClick={handleExploreDirectory}
              className="w-full py-3 bg-zinc-100 hover:bg-white text-zinc-950 font-bold rounded-full text-xs transition-colors shadow-sm"
            >
              Start 14-Day Free Trial
            </button>
          </div>

          {/* Enterprise Agency */}
          <div className="bg-zinc-900 p-7 rounded-[2rem] border border-zinc-800 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">For Agencies & Networks</span>
              <div className="text-2xl font-black text-zinc-100">Custom Agency</div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Multi-brand management, automated contract generation, bulk talent exports, and dedicated account managers.
              </p>
              <ul className="space-y-2.5 text-xs text-zinc-300 pt-2">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Multi-brand client workspaces</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Custom API webhook access</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> White-label talent presentation decks</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Dedicated talent procurement lead</li>
              </ul>
            </div>
            <button
              onClick={handleExploreDirectory}
              className="w-full py-3 bg-zinc-800 hover:bg-zinc-750 text-zinc-200 font-bold rounded-full text-xs transition-colors"
            >
              Contact Enterprise Sales
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
