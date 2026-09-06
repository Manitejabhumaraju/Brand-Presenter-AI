import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Creator, PlatformType, CreatorType } from '../../types';
import { 
  Search, 
  Filter, 
  Sparkles, 
  X, 
  Check, 
  ChevronDown, 
  LayoutGrid, 
  List, 
  Table as TableIcon, 
  Bookmark, 
  Scale, 
  ShieldCheck, 
  MapPin, 
  SlidersHorizontal,
  BookmarkPlus
} from 'lucide-react';
import { formatNumber, formatCurrency } from '../../utils/formatters';
import { PlatformBadge } from '../common/PlatformBadge';

export const DiscoveryView: React.FC = () => {
  const { 
    creators = [], 
    searchQuery = '', 
    setSearchQuery, 
    selectedPlatforms = [], 
    setSelectedPlatforms, 
    selectedCategories = [], 
    setSelectedCategories, 
    selectedCreatorTypes = [], 
    setSelectedCreatorTypes, 
    minFollowers = 0, 
    setMinFollowers, 
    maxPrice = 1000000, 
    setMaxPrice, 
    minEngagement = 0, 
    setMinEngagement, 
    selectedLocation = 'All Locations', 
    setSelectedLocation, 
    verifiedOnly = false, 
    setVerifiedOnly, 
    sortBy = 'ai_score', 
    setSortBy, 
    resetFilters, 
    activeFilterCount = 0, 
    savedCreatorIds = [], 
    toggleSaveCreator, 
    compareCreatorIds = [], 
    addToCompare, 
    setSelectedCreatorId, 
    setActiveTab, 
    setInquiryModalCreator, 
    setExplainMatchCreator,
    savedSearches = [],
    setSavedSearches,
    userRole
  } = useApp();

  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'table'>('grid');
  const [saveSearchNotification, setSaveSearchNotification] = useState('');

  // Platforms options
  const allPlatforms: PlatformType[] = ['instagram', 'youtube', 'tiktok', 'linkedin', 'twitter', 'twitch'];
  const allCategories = ['Tech & AI', 'Fitness & Wellness', 'Lifestyle & Travel', 'Finance & Investing', 'B2B SaaS', 'Gaming', 'Fashion & Beauty', 'Food & Culinary'];
  const allCreatorTypes: CreatorType[] = ['Influencer', 'UGC Creator', 'Educator', 'Podcaster', 'Freelance Creative', 'Consultant'];
  const allLocations = ['All Locations', 'Mumbai, India', 'Bangalore, India', 'Delhi NCR, India', 'London, UK', 'San Francisco, USA', 'Singapore', 'Dubai, UAE'];

  // Toggle platform filter
  const togglePlatform = (p: PlatformType) => {
    const list = selectedPlatforms || [];
    if (list.includes(p)) {
      setSelectedPlatforms?.(list.filter(item => item !== p));
    } else {
      setSelectedPlatforms?.([...list, p]);
    }
  };

  // Toggle category filter
  const toggleCategory = (cat: string) => {
    const list = selectedCategories || [];
    if (list.includes(cat)) {
      setSelectedCategories?.(list.filter(item => item !== cat));
    } else {
      setSelectedCategories?.([...list, cat]);
    }
  };

  // Toggle creator type filter
  const toggleCreatorType = (ct: CreatorType) => {
    const list = selectedCreatorTypes || [];
    if (list.includes(ct)) {
      setSelectedCreatorTypes?.(list.filter(item => item !== ct));
    } else {
      setSelectedCreatorTypes?.([...list, ct]);
    }
  };

  // Filtered & Sorted Creators
  const filteredCreators = useMemo(() => {
    return (creators || []).filter(c => {
      if (!c) return false;

      // Query filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = c.name?.toLowerCase().includes(q);
        const matchesHandle = c.handle?.toLowerCase().includes(q);
        const matchesCat = (c.categories || []).some(cat => cat.toLowerCase().includes(q));
        const matchesNiche = (c.niches || []).some(n => n.toLowerCase().includes(q));
        const matchesCity = c.location?.city?.toLowerCase().includes(q);
        if (!matchesName && !matchesHandle && !matchesCat && !matchesNiche && !matchesCity) return false;
      }

      // Platforms
      if ((selectedPlatforms || []).length > 0) {
        const hasPlatform = (c.platforms || []).some(p => (selectedPlatforms || []).includes(p.platform));
        if (!hasPlatform) return false;
      }

      // Categories
      if ((selectedCategories || []).length > 0) {
        const hasCategory = (c.categories || []).some(cat => (selectedCategories || []).includes(cat));
        if (!hasCategory) return false;
      }

      // Creator Types
      if ((selectedCreatorTypes || []).length > 0) {
        if (!(selectedCreatorTypes || []).includes(c.creatorType)) return false;
      }

      // Followers
      if ((c.stats?.totalFollowers || 0) < minFollowers) return false;

      // Price
      const minStartingPrice = c.pricing?.[0]?.priceMin || 0;
      if (minStartingPrice > maxPrice) return false;

      // Engagement
      if ((c.stats?.avgEngagementRate || 0) < minEngagement) return false;

      // Location
      if (selectedLocation && selectedLocation !== 'All Locations') {
        const cityMatch = selectedLocation.split(',')[0].trim();
        if (!c.location?.city?.includes(cityMatch)) return false;
      }

      // Verified
      if (verifiedOnly && !c.identityVerified) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'ai_score') return (b.aiScore?.overall || 0) - (a.aiScore?.overall || 0);
      if (sortBy === 'followers') return (b.stats?.totalFollowers || 0) - (a.stats?.totalFollowers || 0);
      if (sortBy === 'engagement') return (b.stats?.avgEngagementRate || 0) - (a.stats?.avgEngagementRate || 0);
      if (sortBy === 'price_asc') return (a.pricing?.[0]?.priceMin || 0) - (b.pricing?.[0]?.priceMin || 0);
      if (sortBy === 'campaigns') return (b.stats?.completedCampaigns || 0) - (a.stats?.completedCampaigns || 0);
      return 0;
    });
  }, [creators, searchQuery, selectedPlatforms, selectedCategories, selectedCreatorTypes, minFollowers, maxPrice, minEngagement, selectedLocation, verifiedOnly, sortBy]);

  // Handle Save Search
  const handleSaveCurrentSearch = () => {
    const newSearch = {
      id: 'search_' + Date.now(),
      name: searchQuery ? `Search: "${searchQuery}"` : `Filter: ${selectedCategories.join(', ') || 'Custom criteria'}`,
      query: searchQuery || 'Category filters',
      filters: {
        platforms: selectedPlatforms,
        categories: selectedCategories,
        minFollowers,
        maxPrice
      },
      matchCount: filteredCreators.length,
      lastUpdated: 'Just now',
      notifyOnNewMatches: true
    };
    setSavedSearches([newSearch, ...savedSearches]);
    setSaveSearchNotification('Search saved with automated alerts!');
    setTimeout(() => setSaveSearchNotification(''), 3000);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150">
      
      {/* 1. TOP DISCOVERY SEARCH & CONTROLS BENTO BLOCK */}
      <div className="bg-zinc-900 p-6 sm:p-7 rounded-[2rem] border border-zinc-800 shadow-sm space-y-4">
        
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Main Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-emerald-500 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search creator name, @handle, niche (e.g. 'Fintech', 'Clean Beauty')..."
              className="w-full pl-11 pr-10 py-3 bg-zinc-950 border border-zinc-800 rounded-full text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-3.5 text-zinc-500 hover:text-zinc-300">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Actions: Filter Toggle, Sort Dropdown, View Toggle */}
          <div className="flex items-center gap-2 flex-wrap">
            
            <button
              onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs font-semibold transition-all ${
                filterDrawerOpen || activeFilterCount > 0
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:bg-zinc-850'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="px-1.5 py-0.2 bg-emerald-500 text-zinc-950 rounded-full text-[10px] font-extrabold">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-9 py-2.5 bg-zinc-950 border border-zinc-800 rounded-full text-xs font-semibold text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                <option value="ai_score">Sort: AI Score</option>
                <option value="followers">Sort: Total Audience</option>
                <option value="engagement">Sort: Engagement Rate</option>
                <option value="price_asc">Sort: Lowest Starting Rate</option>
                <option value="campaigns">Sort: Completed Campaigns</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500 absolute right-3.5 top-3.5 pointer-events-none" />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-zinc-950 border border-zinc-800 p-1 rounded-full">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-full transition-colors ${viewMode === 'grid' ? 'bg-zinc-800 text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'}`}
                title="Bento Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-full transition-colors ${viewMode === 'list' ? 'bg-zinc-800 text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'}`}
                title="List View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-full transition-colors ${viewMode === 'table' ? 'bg-zinc-800 text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'}`}
                title="Matrix View"
              >
                <TableIcon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Save Search Button */}
            <button
              onClick={handleSaveCurrentSearch}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-zinc-950 hover:bg-zinc-850 border border-zinc-800 rounded-full text-xs font-semibold text-zinc-300 transition-colors"
              title="Save search and get alerts"
            >
              <BookmarkPlus className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Save Alert</span>
            </button>

          </div>

        </div>

        {/* Platform Quick Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs pt-1">
          <button
            onClick={() => setVerifiedOnly(!verifiedOnly)}
            className={`px-3.5 py-1.5 rounded-full border flex items-center gap-1.5 transition-all shrink-0 ${
              verifiedOnly
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 font-bold'
                : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verified Identity Only</span>
          </button>

          <div className="h-4 w-px bg-zinc-800 mx-1 shrink-0" />

          {allPlatforms.map(p => {
            const isSelected = (selectedPlatforms || []).includes(p);
            return (
              <button
                key={p}
                onClick={() => togglePlatform(p)}
                className={`px-3.5 py-1.5 rounded-full border flex items-center gap-1.5 transition-all shrink-0 ${
                  isSelected
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 font-bold'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <PlatformBadge platform={p} size="sm" />
                <span className="capitalize">{p}</span>
                {isSelected && <Check className="w-3 h-3 text-emerald-400" />}
              </button>
            );
          })}
        </div>

        {/* Save Search Feedback */}
        {saveSearchNotification && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-xs text-emerald-400 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{saveSearchNotification}</span>
          </div>
        )}

      </div>

      {/* 2. EXPANDABLE FILTER DRAWER BENTO BLOCK */}
      {filterDrawerOpen && (
        <div className="bg-zinc-900 p-6 sm:p-7 rounded-[2rem] border border-zinc-800 shadow-sm space-y-6 animate-in slide-in-from-top-2 duration-150 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-sm text-zinc-100">Advanced Neural Filters</span>
            </div>
            <button
              onClick={resetFilters}
              className="text-xs text-zinc-400 hover:text-rose-400 font-semibold transition-colors"
            >
              Reset all filters
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Category Select */}
            <div>
              <label className="block font-bold text-zinc-400 uppercase tracking-widest text-[10px] mb-2.5">
                Industry Categories
              </label>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {allCategories.map(cat => (
                  <label key={cat} className="flex items-center gap-2.5 cursor-pointer text-zinc-300 hover:text-white">
                    <input
                      type="checkbox"
                      checked={(selectedCategories || []).includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="rounded accent-emerald-500"
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Creator Type */}
            <div>
              <label className="block font-bold text-zinc-400 uppercase tracking-widest text-[10px] mb-2.5">
                Creator Classification
              </label>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {allCreatorTypes.map(ct => (
                  <label key={ct} className="flex items-center gap-2.5 cursor-pointer text-zinc-300 hover:text-white">
                    <input
                      type="checkbox"
                      checked={(selectedCreatorTypes || []).includes(ct)}
                      onChange={() => toggleCreatorType(ct)}
                      className="rounded accent-emerald-500"
                    />
                    <span>{ct}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Audience & Engagement Sliders */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-zinc-400 uppercase tracking-widest text-[10px]">
                    Min Audience
                  </span>
                  <span className="font-bold text-zinc-100">{formatNumber(minFollowers)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="500000"
                  step="10000"
                  value={minFollowers}
                  onChange={(e) => setMinFollowers(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-zinc-400 uppercase tracking-widest text-[10px]">
                    Min Engagement Rate
                  </span>
                  <span className="font-bold text-emerald-400">{minEngagement}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={minEngagement}
                  onChange={(e) => setMinEngagement(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Budget & Location */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-zinc-400 uppercase tracking-widest text-[10px]">
                    Max Starting Rate
                  </span>
                  <span className="font-bold text-zinc-100">{formatCurrency(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="200000"
                  step="5000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="block font-bold text-zinc-400 uppercase tracking-widest text-[10px] mb-1.5">
                  Primary Metro
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full p-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {allLocations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 3. ACTIVE FILTERS SUMMARY & COUNT */}
      <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
        <div className="flex items-center gap-2">
          <span>Displaying <strong className="text-zinc-100 font-bold">{filteredCreators.length}</strong> verified creators</span>
          {activeFilterCount > 0 && (
            <button
              onClick={resetFilters}
              className="text-emerald-400 hover:text-emerald-300 font-medium"
            >
              (Clear {activeFilterCount} active filters)
            </button>
          )}
        </div>
      </div>

      {/* 4. CREATORS RESULTS DISPLAY (BENTO GRID MODE) */}
      {filteredCreators.length === 0 ? (
        <div className="bg-zinc-900 p-12 rounded-[2rem] border border-zinc-800 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-zinc-800 text-zinc-500 mx-auto flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-zinc-100">No matching creators found</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            Try adjusting your budget, minimum follower threshold, or remove some category filters to see more results.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 bg-zinc-100 text-zinc-950 text-xs font-bold rounded-full hover:bg-white transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        
        /* BENTO GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCreators.map(c => {
            const isSaved = (savedCreatorIds || []).includes(c.id);
            const isCompared = (compareCreatorIds || []).includes(c.id);
            const startingPrice = c.pricing[0]?.priceMin || 25000;

            return (
              <div 
                key={c.id}
                className="bg-zinc-900 rounded-[2rem] border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between overflow-hidden group shadow-sm"
              >
                <div>
                  
                  {/* Card Top / Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between gap-3">
                      
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img 
                            src={c.avatar} 
                            alt={c.name} 
                            className="w-13 h-13 rounded-2xl object-cover border border-zinc-800"
                          />
                          {c.identityVerified && (
                            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-zinc-950 p-0.5 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]" title="Identity Verified">
                              <ShieldCheck className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h3 className="font-bold text-zinc-100 text-sm group-hover:text-emerald-400 transition-colors">
                              {c.name}
                            </h3>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 font-medium">
                              {c.creatorType}
                            </span>
                          </div>
                          <div className="text-xs text-zinc-500 mt-0.5">{c.handle}</div>
                          <div className="text-[11px] text-zinc-400 mt-0.5 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-zinc-500" />
                            <span>{c.location.city}, {c.location.country}</span>
                          </div>
                        </div>

                      </div>

                      {/* AI Match Pill */}
                      <button
                        onClick={() => setExplainMatchCreator(c)}
                        className="px-2.5 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-right transition-colors"
                        title="Explain AI Match"
                      >
                        <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                          <Sparkles className="w-3 h-3 text-emerald-400" />
                          <span>{c.aiScore.overall}%</span>
                        </div>
                      </button>

                    </div>

                    {/* Bio Snippet */}
                    <p className="text-xs text-zinc-400 mt-3.5 line-clamp-2 leading-relaxed">
                      {c.bio}
                    </p>

                    {/* Platform icons with metrics */}
                    <div className="mt-3.5 pt-3.5 border-t border-zinc-800/80 flex items-center gap-1.5 flex-wrap">
                      {c.platforms.map(p => (
                        <div key={p.id} className="flex items-center gap-1.5 bg-zinc-950 border border-zinc-800 px-2.5 py-1 rounded-full text-[11px]">
                          <PlatformBadge platform={p.platform} size="sm" />
                          <span className="font-semibold text-zinc-300">{formatNumber(p.followers)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Key Stats Bar */}
                    <div className="grid grid-cols-3 gap-2 mt-4 pt-3.5 border-t border-zinc-800/80 text-center">
                      <div className="p-2.5 bg-zinc-950 rounded-2xl border border-zinc-850">
                        <div className="text-[10px] uppercase font-bold text-zinc-500">Reach</div>
                        <div className="text-xs font-bold text-zinc-200 mt-0.5">
                          {formatNumber(c.stats.totalFollowers)}
                        </div>
                      </div>
                      <div className="p-2.5 bg-zinc-950 rounded-2xl border border-zinc-850">
                        <div className="text-[10px] uppercase font-bold text-zinc-500">Eng Rate</div>
                        <div className="text-xs font-bold text-emerald-400 mt-0.5">
                          {c.stats.avgEngagementRate}%
                        </div>
                      </div>
                      <div className="p-2.5 bg-zinc-950 rounded-2xl border border-zinc-850">
                        <div className="text-[10px] uppercase font-bold text-zinc-500">Starting</div>
                        <div className="text-xs font-bold text-zinc-200 mt-0.5">
                          {formatCurrency(startingPrice)}
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Card Footer Actions */}
                <div className="px-6 py-3.5 bg-zinc-950/80 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                  
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => toggleSaveCreator(c.id)}
                      className={`p-2 rounded-full border transition-colors ${
                        isSaved ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                      }`}
                      title={isSaved ? 'Remove from Saved' : 'Save Creator'}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-400' : ''}`} />
                    </button>

                    <button
                      onClick={() => addToCompare(c.id)}
                      className={`p-2 rounded-full border transition-colors ${
                        isCompared ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                      }`}
                      title="Add to Compare"
                    >
                      <Scale className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedCreatorId(c.id);
                        setActiveTab(userRole === 'creator' ? 'creator_profile' : 'creator_profile_view');
                      }}
                      className="px-4 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-bold text-xs transition-colors"
                    >
                      Profile
                    </button>

                    <button
                      onClick={() => setInquiryModalCreator(c)}
                      className="px-4 py-2 rounded-full bg-zinc-100 hover:bg-white text-zinc-950 font-bold text-xs shadow-sm transition-colors"
                    >
                      Inquire
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      ) : viewMode === 'list' ? (
        
        /* LIST VIEW */
        <div className="space-y-3">
          {filteredCreators.map(c => {
            const isSaved = (savedCreatorIds || []).includes(c.id);

            return (
              <div 
                key={c.id}
                className="bg-zinc-900 p-5 rounded-[2rem] border border-zinc-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <img 
                    src={c.avatar} 
                    alt={c.name} 
                    className="w-12 h-12 rounded-2xl object-cover border border-zinc-800 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-zinc-100 text-sm truncate">{c.name}</span>
                      <span className="text-xs text-zinc-500">{c.handle}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 font-semibold">
                        {c.creatorType}
                      </span>
                    </div>
                    <div className="text-xs text-zinc-400 mt-1 truncate">
                      {c.categories.join(' • ')} — {c.bio}
                    </div>
                    <div className="flex items-center gap-1.5 mt-2">
                      {c.platforms.map(p => (
                        <PlatformBadge key={p.id} platform={p.platform} size="sm" />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs shrink-0 self-end md:self-center">
                  <div className="text-right">
                    <div className="text-[10px] text-zinc-500 uppercase font-bold">Audience</div>
                    <div className="font-bold text-zinc-100 text-sm">{formatNumber(c.stats.totalFollowers)}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] text-zinc-500 uppercase font-bold">Engagement</div>
                    <div className="font-bold text-emerald-400 text-sm">{c.stats.avgEngagementRate}%</div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] text-zinc-500 uppercase font-bold">AI Score</div>
                    <div className="font-bold text-emerald-400 text-sm">{c.aiScore.overall}%</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleSaveCreator(c.id)}
                      className={`p-2.5 rounded-full border ${isSaved ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' : 'bg-zinc-950 border-zinc-800 text-zinc-400'}`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCreatorId(c.id);
                        setActiveTab(userRole === 'creator' ? 'creator_profile' : 'creator_profile_view');
                      }}
                      className="px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-750 text-zinc-200 font-bold"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => setInquiryModalCreator(c)}
                      className="px-4 py-2 rounded-full bg-zinc-100 hover:bg-white text-zinc-950 font-bold"
                    >
                      Inquire
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      ) : (
        
        /* TABLE MATRIX VIEW */
        <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 shadow-sm overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950 text-zinc-500 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-5 text-left">Creator</th>
                <th className="py-3.5 px-4 text-left">Platforms</th>
                <th className="py-3.5 px-4 text-left">Audience</th>
                <th className="py-3.5 px-4 text-left">Engagement</th>
                <th className="py-3.5 px-4 text-left">Avg Views</th>
                <th className="py-3.5 px-4 text-left">AI Score</th>
                <th className="py-3.5 px-4 text-left">Starting Rate</th>
                <th className="py-3.5 px-4 text-left">Deals</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80">
              {filteredCreators.map(c => (
                <tr key={c.id} className="hover:bg-zinc-850/50 transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <img src={c.avatar} alt={c.name} className="w-9 h-9 rounded-xl object-cover border border-zinc-800" />
                      <div>
                        <div className="font-bold text-zinc-100">{c.name}</div>
                        <div className="text-[10px] text-zinc-500">{c.handle}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex gap-1">
                      {c.platforms.map(p => (
                        <PlatformBadge key={p.id} platform={p.platform} size="sm" />
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-zinc-100">{formatNumber(c.stats.totalFollowers)}</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-400">{c.stats.avgEngagementRate}%</td>
                  <td className="py-3.5 px-4 text-zinc-300">{formatNumber(c.platforms[0]?.avgViews || 0)}</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-400">{c.aiScore.overall}%</td>
                  <td className="py-3.5 px-4 font-semibold text-zinc-200">{formatCurrency(c.pricing[0]?.priceMin || 25000)}</td>
                  <td className="py-3.5 px-4 text-zinc-400">{c.stats.completedCampaigns} deals</td>
                  <td className="py-3.5 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedCreatorId(c.id);
                          setActiveTab(userRole === 'creator' ? 'creator_profile' : 'creator_profile_view');
                        }}
                        className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-750 text-zinc-200 rounded-full font-bold text-[11px]"
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => setInquiryModalCreator(c)}
                        className="px-3 py-1.5 bg-zinc-100 hover:bg-white text-zinc-950 rounded-full font-bold text-[11px]"
                      >
                        Inquire
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      )}

    </div>
  );
};
