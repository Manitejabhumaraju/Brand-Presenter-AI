import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Trash2, Play, Bell } from 'lucide-react';

export const SavedSearchesView: React.FC = () => {
  const { savedSearches, setSavedSearches, setActiveTab, setSearchQuery } = useApp();

  const handleRunSearch = (query: string) => {
    setSearchQuery(query);
    setActiveTab('discover');
  };

  const handleDeleteSearch = (id: string) => {
    setSavedSearches(savedSearches.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150">
      <header className="pb-2">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Automated Telemetry</span>
          <span className="text-zinc-600">•</span>
          <span className="text-xs text-zinc-400">Market Alerts</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
          SAVED SEARCHES & <span className="text-emerald-500">ALERTS</span>
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm mt-0.5">
          Monitor the marketplace continuously. Get notified when newly verified creators match your criteria.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {savedSearches.map(item => (
          <div key={item.id} className="bg-zinc-900 p-6 rounded-[2rem] border border-zinc-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm sm:text-base text-zinc-100">{item.name}</div>
                <div className="text-xs text-zinc-400 mt-1">
                  Query: <code className="bg-zinc-950 px-2 py-0.5 rounded-md text-emerald-400 font-mono text-[11px] border border-zinc-800">{item.query}</code>
                </div>
                <div className="mt-3 flex items-center gap-3 text-zinc-400">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase tracking-wider text-[10px]">
                    {item.matchCount} creators matched
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                    <Bell className="w-3 h-3 text-emerald-400" />
                    {item.notifyOnNewMatches ? 'Instant Alerts Active' : 'Alerts Paused'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => handleRunSearch(item.query)}
                className="flex items-center gap-2 px-5 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 font-bold rounded-full transition-colors shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Search</span>
              </button>
              <button
                onClick={() => handleDeleteSearch(item.id)}
                className="p-2.5 text-zinc-500 hover:text-rose-400 rounded-full"
                title="Delete saved search"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
