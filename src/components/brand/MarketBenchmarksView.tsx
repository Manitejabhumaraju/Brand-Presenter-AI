import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  TrendingUp, 
  BarChart3, 
  DollarSign, 
  Sparkles, 
  ShieldCheck, 
  ArrowUpRight,
  HelpCircle,
  Search,
  Filter
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { PlatformBadge } from '../common/PlatformBadge';

export const MarketBenchmarksView: React.FC = () => {
  const { setActiveTab } = useApp();
  const [selectedTier, setSelectedTier] = useState<'micro' | 'mid' | 'macro'>('mid');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');

  const benchmarkData = [
    {
      format: 'Dedicated 60s Instagram Reel',
      platform: 'instagram' as const,
      category: 'Fitness & Health',
      micro: { min: 25000, max: 45000, median: 35000, avgViews: 45000, cpe: 2.1 },
      mid: { min: 50000, max: 85000, median: 65000, avgViews: 140000, cpe: 1.8 },
      macro: { min: 120000, max: 250000, median: 175000, avgViews: 480000, cpe: 1.4 }
    },
    {
      format: 'Dedicated 8-12m YouTube Video',
      platform: 'youtube' as const,
      category: 'Tech & Engineering',
      micro: { min: 40000, max: 70000, median: 55000, avgViews: 30000, cpe: 3.2 },
      mid: { min: 80000, max: 150000, median: 110000, avgViews: 95000, cpe: 2.4 },
      macro: { min: 200000, max: 450000, median: 320000, avgViews: 350000, cpe: 1.9 }
    },
    {
      format: '60s YouTube Integration / Sponsor Spot',
      platform: 'youtube' as const,
      category: 'Education & FinTech',
      micro: { min: 20000, max: 35000, median: 28000, avgViews: 25000, cpe: 2.2 },
      mid: { min: 45000, max: 80000, median: 60000, avgViews: 85000, cpe: 1.7 },
      macro: { min: 110000, max: 220000, median: 160000, avgViews: 310000, cpe: 1.5 }
    },
    {
      format: 'TikTok / Short-form Product Review',
      platform: 'tiktok' as const,
      category: 'Beauty & Skincare',
      micro: { min: 18000, max: 30000, median: 24000, avgViews: 50000, cpe: 1.6 },
      mid: { min: 35000, max: 65000, median: 48000, avgViews: 160000, cpe: 1.2 },
      macro: { min: 90000, max: 180000, median: 135000, avgViews: 550000, cpe: 0.95 }
    },
    {
      format: 'Raw UGC Ad Bundle (3 Hooks + 2 CTAs)',
      platform: 'instagram' as const,
      category: 'D2C Consumer Brands',
      micro: { min: 20000, max: 35000, median: 28000, avgViews: 0, cpe: 1.9 },
      mid: { min: 40000, max: 70000, median: 55000, avgViews: 0, cpe: 1.5 },
      macro: { min: 80000, max: 140000, median: 110000, avgViews: 0, cpe: 1.1 }
    }
  ];

  const filteredData = benchmarkData.filter(d => 
    selectedPlatform === 'all' || d.platform === selectedPlatform
  );

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150 text-zinc-100">
      
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Pricing Telemetry</span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs text-zinc-400">Q4 Market Rate Benchmarks & Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            MARKET <span className="text-emerald-500">BENCHMARKS</span>
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-0.5">
            Audited transaction pricing across 2,400+ commercial contracts. Fair market medians prevent overpaying and ensure creator retention.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('discover')}
          className="flex items-center gap-2 bg-zinc-100 text-zinc-950 px-5 py-2.5 rounded-full text-xs font-bold tracking-tight hover:bg-white transition-colors shadow-sm"
        >
          <span>Find Creators in Budget</span>
        </button>
      </header>

      {/* Filter Row Bento */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Tier:</span>
          {(['micro', 'mid', 'macro'] as const).map(tier => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={`px-4 py-2 rounded-full font-bold uppercase tracking-wider text-[10px] transition-colors ${
                selectedTier === tier
                  ? 'bg-zinc-100 text-zinc-950'
                  : 'bg-zinc-950 text-zinc-400 border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {tier === 'micro' ? 'Micro (10k-50k)' : tier === 'mid' ? 'Mid-Tier (50k-250k)' : 'Macro (250k-1M+)'}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-zinc-400 font-bold uppercase tracking-wider text-[10px]">Platform:</span>
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="px-3.5 py-2 bg-zinc-950 border border-zinc-800 rounded-full text-zinc-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Channels</option>
            <option value="instagram">Instagram</option>
            <option value="youtube">YouTube</option>
            <option value="tiktok">TikTok</option>
          </select>
        </div>
      </div>

      {/* Benchmarks Bento Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 sm:p-7 space-y-4">
        <div className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center justify-between pb-2 border-b border-zinc-800">
          <span>Deliverable Format</span>
          <div className="flex items-center gap-8 text-right">
            <span className="w-28">Fair Range (₹)</span>
            <span className="w-24">Median Rate</span>
            <span className="w-20">Est. CPE</span>
          </div>
        </div>

        <div className="space-y-3">
          {filteredData.map((item, idx) => {
            const data = item[selectedTier];
            return (
              <div 
                key={idx} 
                className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <PlatformBadge platform={item.platform} size="sm" />
                  <div>
                    <div className="font-bold text-sm text-zinc-100">{item.format}</div>
                    <div className="text-[11px] text-zinc-500">{item.category}</div>
                  </div>
                </div>

                <div className="flex items-center gap-8 self-end sm:self-auto text-right">
                  <div className="w-28 text-zinc-400 font-medium">
                    {formatCurrency(data.min)} – {formatCurrency(data.max)}
                  </div>
                  <div className="w-24 font-bold text-emerald-400 text-sm">
                    {formatCurrency(data.median)}
                  </div>
                  <div className="w-20 font-semibold text-zinc-300">
                    ₹{data.cpe}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
