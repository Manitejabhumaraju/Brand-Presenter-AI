import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  DollarSign, 
  TrendingUp, 
  Eye, 
  Briefcase, 
  Share2, 
  CheckCircle2, 
  Sparkles, 
  ArrowUpRight,
  Activity,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { formatCurrency, formatNumber, getFreshnessLabel } from '../../utils/formatters';
import { PlatformBadge } from '../common/PlatformBadge';

export const CreatorDashboardView: React.FC = () => {
  const { 
    currentCreatorUser, 
    campaigns, 
    setActiveTab, 
    setConnectPlatformModalOpen 
  } = useApp();

  // Active deliverables for this creator
  const myDeliverables = campaigns.flatMap(c => 
    (c.deliverables || []).filter(d => 
      d.creatorId === currentCreatorUser.id || 
      (c.creatorIds || []).includes(currentCreatorUser.id) ||
      (typeof d.creatorName === 'string' && d.creatorName.includes('Aarav'))
    )
  );

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150">
      
      {/* 1. CREATOR BENTO HEADER */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Creator Intelligence</span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs text-zinc-400">Welcome back, {currentCreatorUser.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            CREATOR <span className="text-emerald-500">WORKSPACE</span>
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-0.5">
            Real-time commercial revenue, escrow milestone verification, and social audience telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('creator_profile')}
            className="bg-zinc-100 text-zinc-950 px-5 py-2.5 rounded-full text-xs font-bold tracking-tight hover:bg-white transition-colors shadow-sm"
          >
            Preview Profile
          </button>
          <button
            onClick={() => setConnectPlatformModalOpen(true)}
            className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200 px-5 py-2.5 rounded-full text-xs font-bold tracking-tight transition-colors flex items-center gap-2"
          >
            <Share2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Connect Accounts</span>
          </button>
        </div>
      </header>

      {/* 2. CREATOR CORE BENTO GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Bento Cell 1: Commercial Revenue (col-span-2 row-span-2) */}
        <div className="sm:col-span-2 sm:row-span-2 bg-zinc-900 border border-zinc-800 rounded-[2rem] p-7 flex flex-col justify-between relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <h2 className="text-zinc-400 text-xs font-bold uppercase tracking-widest">
                Commercial Revenue (30d)
              </h2>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase tracking-wider">
                Escrow Guaranteed
              </span>
            </div>

            <div className="flex items-baseline gap-2 mt-4">
              <span className="text-5xl sm:text-6xl font-light tracking-tighter text-zinc-100">₹1,45,000</span>
              <span className="text-emerald-400 font-bold text-sm">+24% MoM</span>
            </div>
            <p className="text-zinc-400 text-xs mt-2 max-w-md">
              ₹85,000 committed in live contracts across Cult.fit and Boat campaigns.
            </p>
          </div>

          {/* Equalizer Wave / Trend */}
          <div className="relative z-10 mt-6">
            <div className="flex justify-between items-end mb-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              <span>Payout Release History</span>
              <span className="text-emerald-400">100% On-Time</span>
            </div>
            <div className="flex gap-2 items-end h-24">
              <div className="flex-1 bg-emerald-500/20 border-t-2 border-emerald-500 rounded-t-sm" style={{ height: '40%' }} />
              <div className="flex-1 bg-emerald-500/20 border-t-2 border-emerald-500 rounded-t-sm" style={{ height: '65%' }} />
              <div className="flex-1 bg-emerald-500/20 border-t-2 border-emerald-500 rounded-t-sm" style={{ height: '55%' }} />
              <div className="flex-1 bg-emerald-500/20 border-t-2 border-emerald-500 rounded-t-sm" style={{ height: '80%' }} />
              <div className="flex-1 bg-emerald-500/20 border-t-2 border-emerald-500 rounded-t-sm" style={{ height: '70%' }} />
              <div className="flex-1 bg-emerald-500/30 border-t-2 border-emerald-400 rounded-t-sm" style={{ height: '95%' }} />
            </div>
          </div>
        </div>

        {/* Bento Cell 2: AI Fit Score */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 flex flex-col justify-center items-center text-center group">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-3 border border-emerald-500/20">
            <div className="w-3.5 h-3.5 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,1)]" />
          </div>
          <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-1">AI Match Score</p>
          <p className="text-4xl font-light tracking-tight text-zinc-100">{currentCreatorUser.aiScore.overall}<span className="text-emerald-500 font-bold text-2xl">/100</span></p>
          <p className="text-[11px] text-emerald-400 mt-1 font-semibold">Top 5% in category</p>
        </div>

        {/* Bento Cell 3: Profile Views */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 flex flex-col justify-center text-center group">
          <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-1">Brand Impressions</p>
          <p className="text-5xl font-light tracking-tight text-zinc-100">420</p>
          <p className="text-emerald-400 text-xs mt-2 font-semibold">+18 brand agency searches</p>
        </div>

        {/* Bento Cell 4: Active Deals */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 flex flex-col justify-center gap-2 text-center">
          <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Active Milestones</p>
          <p className="text-4xl font-light tracking-tight text-zinc-100">{myDeliverables.length}</p>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mt-1">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '66%' }} />
          </div>
          <span className="text-[11px] text-zinc-400">2 Pending Review</span>
        </div>

        {/* Bento Cell 5: Benchmark Standing */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 flex flex-col justify-center items-center gap-1.5 text-center">
          <div className="text-3xl font-bold text-zinc-100">52nd %ile</div>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Rate Card Benchmark</p>
          <p className="text-[11px] text-emerald-400 font-semibold">92% commercial win rate</p>
        </div>

      </div>

      {/* 3. PROFILE STRENGTH & CONNECTED PLATFORMS BENTO ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Profile Completion Meter */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              Profile Completeness
            </h3>
            <span className="text-sm font-bold text-emerald-400">{currentCreatorUser.profileCompletion}%</span>
          </div>

          <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
            <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${currentCreatorUser.profileCompletion}%` }} />
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            Profiles with 95%+ completion receive 3.4x more commercial inquiries and priority search placement.
          </p>

          <div className="space-y-2.5 text-xs pt-1">
            <div className="flex items-center justify-between text-zinc-300">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Identity Verification</span>
              </span>
              <span className="font-bold text-emerald-400">Done</span>
            </div>
            <div className="flex items-center justify-between text-zinc-300">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>3 Connected Channels</span>
              </span>
              <span className="font-bold text-emerald-400">Done</span>
            </div>
            <div className="flex items-center justify-between text-zinc-300">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Commercial Rate Card</span>
              </span>
              <span className="font-bold text-emerald-400">Done</span>
            </div>
          </div>
        </div>

        {/* Connected Channels & Synchronization Bento */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                Connected Social Platforms
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">Live OAuth synchronization telemetry</p>
            </div>
            <button
              onClick={() => setConnectPlatformModalOpen(true)}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1.5"
            >
              <span>Manage platforms</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {currentCreatorUser.platforms.map(p => {
              const freshness = getFreshnessLabel(p.syncFreshness);
              return (
                <div key={p.id} className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <PlatformBadge platform={p.platform} showName size="sm" />
                    <span className="flex items-center gap-1.5 text-[10px] text-zinc-400">
                      <span className={`w-2 h-2 rounded-full ${freshness.dotColor}`} />
                      <span>{freshness.label}</span>
                    </span>
                  </div>

                  <div className="pt-1">
                    <div className="text-[10px] uppercase font-bold text-zinc-500">Audience</div>
                    <div className="text-lg font-bold text-zinc-100">{formatNumber(p.followers)}</div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-zinc-850">
                    <span>Eng: <strong className="text-emerald-400">{p.engagementRate}%</strong></span>
                    <span>Avg {formatNumber(p.avgViews)} views</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 4. ACTIVE CAMPAIGN DELIVERABLES BENTO PIPELINE */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">
              Assigned Campaign Milestones & Deliverables
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">Upcoming deadlines and draft submissions under contract</p>
          </div>
          <button
            onClick={() => setActiveTab('creator_campaigns')}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
          >
            View all deals →
          </button>
        </div>

        <div className="space-y-3">
          {myDeliverables.map(deliv => (
            <div key={deliv.id} className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <PlatformBadge platform={deliv.platform} size="sm" />
                <div>
                  <div className="font-bold text-zinc-100 text-sm">{deliv.title}</div>
                  <div className="text-zinc-500 text-xs mt-0.5">
                    Deliverable for <strong className="text-zinc-300">Cult.fit</strong> • Due date: <span className="font-semibold text-rose-400">{deliv.dueDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 self-end sm:self-auto">
                <span className="font-bold text-zinc-100 text-sm">{formatCurrency(deliv.payoutAmount)}</span>
                <span className={`px-2.5 py-1 rounded-full font-bold uppercase tracking-wider text-[10px] ${
                  deliv.status === 'in_progress' ? 'bg-zinc-800 text-zinc-300' :
                  deliv.status === 'review' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                  'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }`}>
                  {deliv.status.replace('_', ' ')}
                </span>
                <button
                  onClick={() => setActiveTab('creator_messages')}
                  className="px-4 py-2 bg-zinc-100 hover:bg-white text-zinc-950 rounded-full font-bold text-xs transition-colors shadow-sm"
                >
                  Upload Draft
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
