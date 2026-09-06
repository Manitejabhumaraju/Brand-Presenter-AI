import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FolderKanban, 
  Users, 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight, 
  Search, 
  Sparkles, 
  Bookmark,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Activity
} from 'lucide-react';
import { formatCurrency, formatNumber } from '../../utils/formatters';

export const BrandDashboardView: React.FC = () => {
  const { 
    campaigns, 
    creators, 
    savedCreatorIds, 
    shortlists, 
    setActiveTab, 
    setSelectedCreatorId,
    setInquiryModalCreator 
  } = useApp();

  const activeCampaigns = campaigns.filter(c => c.status === 'active' || c.status === 'recruiting');
  const totalBudgetSpent = campaigns.reduce((acc, c) => acc + c.spentBudget, 0);
  const totalBudget = campaigns.reduce((acc, c) => acc + c.totalBudget, 0);
  const budgetPercent = Math.min(100, Math.round((totalBudgetSpent / (totalBudget || 1)) * 100));

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150">
      
      {/* Header with Bento Brand Identity */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Campaign Operations</span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs text-zinc-400">Cult.fit Consumer Marketing</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            BRAND <span className="text-emerald-500">INTELLIGENCE</span>
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-0.5">
            Real-time neural creator matching, verified reach telemetry, and milestone tracking.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('discover')}
            className="flex items-center gap-2 bg-zinc-100 text-zinc-950 px-5 py-2.5 rounded-full text-xs font-bold tracking-tight hover:bg-white transition-colors shadow-sm"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Discover Talent</span>
          </button>
          <button
            onClick={() => setActiveTab('campaigns')}
            className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200 px-5 py-2.5 rounded-full text-xs font-bold tracking-tight transition-colors"
          >
            Workspace
          </button>
        </div>
      </header>

      {/* CORE BENTO GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Bento Cell 1: Hero Performance (col-span-2 row-span-2) */}
        <div className="sm:col-span-2 sm:row-span-2 bg-zinc-900 border border-zinc-800 rounded-[2rem] p-7 flex flex-col justify-between relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <h2 className="text-zinc-400 text-xs font-bold uppercase tracking-widest">
                Campaign Blended ROI
              </h2>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase tracking-wider">
                Direct Attributed
              </span>
            </div>

            <div className="flex items-baseline gap-2 mt-4">
              <span className="text-6xl sm:text-7xl font-light tracking-tighter text-zinc-100">4.2</span>
              <span className="text-emerald-500 font-bold text-3xl">x ROAS</span>
            </div>
            <p className="text-zinc-400 text-xs mt-2 max-w-md">
              Attribution index outperforms industry benchmarks by <strong className="text-emerald-400">18.4%</strong> across 6 high-conversion creator campaigns.
            </p>
          </div>

          {/* Bento Visual Bar Equalizer */}
          <div className="relative z-10 mt-6">
            <div className="flex justify-between items-end mb-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              <span>Weekly Conversion Trend</span>
              <span className="text-emerald-400">99.4% Peak</span>
            </div>
            <div className="flex gap-2 items-end h-28">
              <div className="flex-1 bg-emerald-500/20 border-t-2 border-emerald-500 rounded-t-sm" style={{ height: '35%' }} />
              <div className="flex-1 bg-emerald-500/20 border-t-2 border-emerald-500 rounded-t-sm" style={{ height: '55%' }} />
              <div className="flex-1 bg-emerald-500/20 border-t-2 border-emerald-500 rounded-t-sm" style={{ height: '50%' }} />
              <div className="flex-1 bg-emerald-500/20 border-t-2 border-emerald-500 rounded-t-sm" style={{ height: '75%' }} />
              <div className="flex-1 bg-emerald-500/20 border-t-2 border-emerald-500 rounded-t-sm" style={{ height: '90%' }} />
              <div className="flex-1 bg-emerald-500/20 border-t-2 border-emerald-500 rounded-t-sm" style={{ height: '65%' }} />
              <div className="flex-1 bg-emerald-500/20 border-t-2 border-emerald-500 rounded-t-sm" style={{ height: '88%' }} />
              <div className="flex-1 bg-emerald-500/30 border-t-2 border-emerald-400 rounded-t-sm" style={{ height: '96%' }} />
            </div>
          </div>
        </div>

        {/* Bento Cell 2: Security & Verification Verified */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 flex flex-col justify-center items-center text-center group">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-3 border border-emerald-500/20">
            <div className="w-3.5 h-3.5 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,1)]" />
          </div>
          <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-1">Audit Status</p>
          <p className="text-2xl font-bold text-zinc-100">100% Verified</p>
          <p className="text-[11px] text-zinc-500 mt-1">Zero bot anomalies</p>
        </div>

        {/* Bento Cell 3: Active Campaigns / Nodes */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 flex flex-col justify-center text-center group">
          <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-1">Active Deals</p>
          <p className="text-5xl font-light tracking-tight text-zinc-100">{activeCampaigns.length}</p>
          <p className="text-emerald-400 text-xs mt-2 font-semibold">+2 launching this week</p>
        </div>

        {/* Bento Cell 4: Budget Allocation & Gauge */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 flex flex-col justify-center gap-4">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">BUDGET DEPLOYED</span>
              <span className="text-xs font-bold text-zinc-200">{budgetPercent}%</span>
            </div>
            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${budgetPercent}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">COMMITTED</span>
              <span className="text-xs font-bold text-zinc-300">{formatCurrency(totalBudgetSpent)}</span>
            </div>
            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-zinc-400 h-full rounded-full" style={{ width: '65%' }} />
            </div>
          </div>
        </div>

        {/* Bento Cell 5: Primary Region */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 flex flex-col justify-center items-center gap-1.5 text-center">
          <div className="text-3xl font-bold text-zinc-100">INDIA / IN</div>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Primary Audience Market</p>
          <p className="text-[11px] text-zinc-400 mt-1">Tier 1 & Tier 2 Metro penetration</p>
        </div>

      </div>

      {/* SECONDARY BENTO ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Bento Event / Activity Tile (span 2) */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-col">
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-3">Recent Pipeline Milestones</p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] shrink-0" />
                <p className="text-sm text-zinc-200">
                  Kabir Sharma submitted draft for <strong className="text-zinc-100">Cultpass Elite Campaign</strong>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500/60 shrink-0" />
                <p className="text-sm text-zinc-300">
                  Rohan Varma published dedicated YouTube deep-dive (128K impressions in 4h)
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-zinc-600 shrink-0" />
                <p className="text-sm text-zinc-500">
                  Scheduled commercial payout milestone release for Ananya Sen
                </p>
              </div>
            </div>
          </div>

          <div className="shrink-0 self-end sm:self-center">
            <button
              onClick={() => setActiveTab('campaigns')}
              className="bg-zinc-100 text-zinc-950 px-6 py-3 rounded-full text-xs font-bold tracking-tight hover:bg-white transition-colors"
            >
              View Deliverables
            </button>
          </div>
        </div>

        {/* Bento Cell: System Health GREAT */}
        <div className="bg-emerald-500 text-zinc-950 rounded-[2rem] p-7 flex flex-col justify-between font-bold shadow-[0_0_30px_rgba(16,185,129,0.2)]">
          <div className="flex items-center justify-between">
            <p className="uppercase tracking-widest text-xs opacity-80">Telemetry Health</p>
            <Activity className="w-4 h-4 opacity-80" />
          </div>
          <div className="my-3">
            <div className="text-5xl tracking-tight leading-none font-extrabold">OPTIMAL</div>
            <p className="text-xs opacity-80 mt-1">100% Platform API synchronization</p>
          </div>
          <div className="text-right text-[10px] opacity-70 uppercase tracking-wider">
            Verified with YouTube & Instagram Live Sync
          </div>
        </div>

      </div>

      {/* LIVE CAMPAIGNS BENTO WORKSPACE */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">
              Live Campaigns & Deliverables
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">Milestone status across currently contracted creators</p>
          </div>
          <button
            onClick={() => setActiveTab('campaigns')}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1.5"
          >
            <span>Open workspace</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-4">
          {campaigns.map(camp => {
            const progress = Math.round((camp.spentBudget / camp.totalBudget) * 100);

            return (
              <div key={camp.id} className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3.5 hover:border-zinc-700 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-bold text-sm text-zinc-100">{camp.title}</h3>
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        camp.status === 'active' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-zinc-800 text-zinc-300'
                      }`}>
                        {camp.status}
                      </span>
                    </div>
                    <div className="text-xs text-zinc-500 mt-1">
                      Objective: {camp.objective} • Due {camp.endDate}
                    </div>
                  </div>

                  <div className="text-right text-xs">
                    <span className="font-bold text-zinc-100">{formatCurrency(camp.spentBudget)}</span>
                    <span className="text-zinc-500"> / {formatCurrency(camp.totalBudget)}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-500 h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>

                {/* Deliverables summary */}
                <div className="flex items-center justify-between text-xs pt-1 text-zinc-400 flex-wrap gap-2">
                  <div className="flex items-center gap-4">
                    <span>Creators: <strong className="text-zinc-200">{camp.creatorIds?.length || 0} contracted</strong></span>
                    <span>Deliverables: <strong className="text-zinc-200">{camp.deliverables?.length || 0} assigned</strong></span>
                  </div>
                  <button
                    onClick={() => setActiveTab('campaigns')}
                    className="text-xs text-emerald-400 font-semibold hover:underline"
                  >
                    View Milestone Tasks →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI-RECOMMENDED CREATORS BENTO CARDS */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">
                Neural Recommended Talent for Cult.fit
              </h2>
              <p className="text-xs text-zinc-500">Predicted high engagement & target audience overlap</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('discover')}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
          >
            Explore all →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {creators.slice(0, 3).map(c => (
            <div 
              key={c.id} 
              className="p-5 rounded-2xl border border-zinc-800 bg-zinc-950/80 hover:border-zinc-700 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div>
                <div className="flex items-center gap-3">
                  <img src={c.avatar} alt={c.name} className="w-11 h-11 rounded-2xl object-cover border border-zinc-800" />
                  <div>
                    <div className="font-bold text-sm text-zinc-100 flex items-center gap-1.5">
                      <span>{c.name}</span>
                      {c.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />
                      )}
                    </div>
                    <div className="text-[11px] text-zinc-500">{c.location.city} • {c.categories[0]}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                  <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                    <div className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Audience</div>
                    <div className="font-bold text-zinc-200 mt-0.5">{formatNumber(c.stats.totalFollowers)}</div>
                  </div>
                  <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                    <div className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Match Score</div>
                    <div className="font-bold text-emerald-400 mt-0.5">{c.aiScore.overall}% Fit</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => {
                    setSelectedCreatorId(c.id);
                    setActiveTab('creator_profile_view');
                  }}
                  className="flex-1 py-2 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-200 rounded-full text-xs font-bold text-center transition-colors"
                >
                  Profile
                </button>
                <button
                  onClick={() => setInquiryModalCreator(c)}
                  className="flex-1 py-2 bg-zinc-100 hover:bg-white text-zinc-950 rounded-full text-xs font-bold text-center transition-colors shadow-sm"
                >
                  Inquire
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
