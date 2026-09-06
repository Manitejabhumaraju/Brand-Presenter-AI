import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Sparkles, 
  X, 
  ArrowRight
} from 'lucide-react';
import { formatNumber, formatCurrency } from '../../utils/formatters';

export const CommandPaletteModal: React.FC = () => {
  const { 
    globalSearchOpen, 
    setGlobalSearchOpen, 
    creators, 
    setSelectedCreatorId, 
    setActiveTab, 
    userRole
  } = useApp();

  const [query, setQuery] = useState('');

  if (!globalSearchOpen) return null;

  const filteredCreators = (creators || []).filter(c => {
    const q = (query || '').toLowerCase();
    return (
      (c.name || '').toLowerCase().includes(q) ||
      (c.handle || '').toLowerCase().includes(q) ||
      (c.categories || []).some(cat => (cat || '').toLowerCase().includes(q)) ||
      (c.location?.city || '').toLowerCase().includes(q) ||
      (c.niches || []).some(n => (n || '').toLowerCase().includes(q))
    );
  });

  const handleSelectCreator = (id: string) => {
    setSelectedCreatorId(id);
    setActiveTab(userRole === 'creator' ? 'creator_profile' : 'creator_profile_view');
    setGlobalSearchOpen(false);
  };

  const handleAiPromptApply = (prompt: string) => {
    setQuery(prompt);
    setActiveTab('discover');
    setGlobalSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-zinc-900 rounded-[2rem] shadow-2xl border border-zinc-800 overflow-hidden flex flex-col text-zinc-100">
        
        {/* Search Input Bar */}
        <div className="p-5 border-b border-zinc-800 flex items-center gap-3.5 bg-zinc-950">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search creators, niches, or AI query (e.g. 'Indian fitness under ₹50K')..."
            className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-zinc-500 hover:text-zinc-300">
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={() => setGlobalSearchOpen(false)}
            className="text-[10px] font-bold text-zinc-500 hover:text-zinc-300 px-2.5 py-1 bg-zinc-850 rounded-full border border-zinc-800"
          >
            ESC
          </button>
        </div>

        {/* AI Quick Prompt Suggestions */}
        <div className="px-5 py-3 bg-zinc-950/40 border-b border-zinc-800/80 flex items-center gap-2 overflow-x-auto text-xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 shrink-0">Try AI Search:</span>
          <button
            onClick={() => handleAiPromptApply('Fitness creators in Mumbai under ₹50,000')}
            className="shrink-0 px-3 py-1 bg-zinc-900 hover:bg-zinc-850 text-zinc-300 rounded-full border border-zinc-800 transition-colors text-[11px]"
          >
            Fitness in Mumbai &lt; ₹50K
          </button>
          <button
            onClick={() => handleAiPromptApply('B2B SaaS tech reviewers with >50K views')}
            className="shrink-0 px-3 py-1 bg-zinc-900 hover:bg-zinc-850 text-zinc-300 rounded-full border border-zinc-800 transition-colors text-[11px]"
          >
            B2B Tech &gt;50K Views
          </button>
          <button
            onClick={() => handleAiPromptApply('Performance ad UGC video editors with ROAS track record')}
            className="shrink-0 px-3 py-1 bg-zinc-900 hover:bg-zinc-850 text-zinc-300 rounded-full border border-zinc-800 transition-colors text-[11px]"
          >
            Direct-Response UGC Editors
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-4 divide-y divide-zinc-800/60">
          
          {/* Creators Section */}
          <div className="py-2">
            <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 px-3 mb-2 flex items-center justify-between">
              <span>Creators & Talent ({filteredCreators.length})</span>
            </div>
            {filteredCreators.length === 0 ? (
              <div className="p-6 text-center text-xs text-zinc-500">
                No creators found matching "{query}"
              </div>
            ) : (
              filteredCreators.slice(0, 5).map(c => (
                <button
                  key={c.id}
                  onClick={() => handleSelectCreator(c.id)}
                  className="w-full flex items-center justify-between p-3 hover:bg-zinc-950/70 rounded-2xl transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={c.avatar} 
                      alt={c.name} 
                      className="w-10 h-10 rounded-2xl object-cover border border-zinc-800"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-zinc-200 group-hover:text-emerald-400 transition-colors">
                          {c.name}
                        </span>
                        <span className="text-xs text-zinc-500">{c.handle}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 font-bold uppercase tracking-wider">
                          {c.creatorType}
                        </span>
                      </div>
                      <div className="text-xs text-zinc-500 mt-0.5 flex items-center gap-2">
                        <span>{c.location.city}, {c.location.country}</span>
                        <span>•</span>
                        <span>{c.categories.slice(0, 2).join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <div className="text-right">
                      <div className="font-bold text-zinc-200">{formatNumber(c.stats.totalFollowers)}</div>
                      <div className="text-[10px] text-emerald-400 font-semibold">{c.stats.avgEngagementRate}% ER</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
                  </div>
                </button>
              ))
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
