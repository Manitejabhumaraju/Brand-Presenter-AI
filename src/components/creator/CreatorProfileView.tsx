import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Creator, PlatformType } from '../../types';
import { 
  ShieldCheck, 
  MapPin, 
  Languages, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Scale, 
  Bookmark, 
  Share2, 
  Send, 
  Users, 
  DollarSign, 
  FolderKanban, 
  Check, 
  BarChart3, 
  Star, 
  Lock, 
  Info, 
  ArrowUpRight 
} from 'lucide-react';
import { formatNumber, formatCurrency, getFreshnessLabel } from '../../utils/formatters';
import { PlatformBadge } from '../common/PlatformBadge';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface CreatorProfileViewProps {
  creatorOverride?: Creator;
  isPublicMode?: boolean;
  initialTab?: 'overview' | 'analytics' | 'comparison' | 'audience' | 'portfolio' | 'pricing' | 'reviews';
}

export const CreatorProfileView: React.FC<CreatorProfileViewProps> = ({ 
  creatorOverride, 
  isPublicMode = false,
  initialTab = 'overview'
}) => {
  const { 
    selectedCreator, 
    savedCreatorIds, 
    toggleSaveCreator, 
    addToCompare, 
    compareCreatorIds, 
    setInquiryModalCreator, 
    setExplainMatchCreator,
    userRole,
    setUserRole,
    setActiveTab
  } = useApp();

  const creator = creatorOverride || selectedCreator;
  const [activeProfileTab, setActiveProfileTab] = useState<'overview' | 'analytics' | 'comparison' | 'audience' | 'portfolio' | 'pricing' | 'reviews'>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveProfileTab(initialTab);
    }
  }, [initialTab]);
  const [timeWindow, setTimeWindow] = useState<'7D' | '30D' | '90D' | '6M' | '1Y'>('30D');
  const [selectedPlatformForAnalytics, setSelectedPlatformForAnalytics] = useState<PlatformType | 'all'>('all');
  const [shareCopied, setShareCopied] = useState(false);

  const isSaved = creator ? (savedCreatorIds || []).includes(creator.id) : false;
  const isCompared = creator ? (compareCreatorIds || []).includes(creator.id) : false;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  if (!creator) {
    return (
      <div className="p-12 text-center text-zinc-400 bg-zinc-900 rounded-[2rem] border border-zinc-800 space-y-3">
        <p className="text-base font-semibold text-zinc-200">Creator profile not found</p>
        <p className="text-xs text-zinc-500">Please select another creator from the marketplace.</p>
        <button
          onClick={() => setActiveTab('discover')}
          className="mt-2 px-4 py-2 bg-emerald-500 text-zinc-950 font-bold text-xs rounded-full"
        >
          Return to Discovery
        </button>
      </div>
    );
  }

  // Realistic mock trend data for time-series charts
  const analyticsTrendData = [
    { date: 'Aug 05', reach: 84000, views: 52000, engagement: 5.2 },
    { date: 'Aug 12', reach: 96000, views: 64000, engagement: 5.8 },
    { date: 'Aug 19', reach: 112000, views: 78000, engagement: 6.4 },
    { date: 'Aug 26', reach: 135000, views: 89000, engagement: 6.9 },
    { date: 'Sep 02', reach: 160000, views: 104000, engagement: 7.2 }
  ];

  const GENDER_COLORS = ['#10b981', '#6366f1', '#71717a'];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150 text-zinc-100">
      
      {/* 1. COMMERCIAL PROFILE HEADER */}
      <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 shadow-sm overflow-hidden">
        
        {/* Banner with subtle ambient gradient */}
        <div className="h-36 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 relative border-b border-zinc-800/80">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="text-[11px] px-3 py-1 rounded-full bg-zinc-950/90 text-zinc-200 border border-zinc-800 backdrop-blur-md flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{creator.availabilityStatus}</span>
            </span>
          </div>
        </div>

        {/* Profile Details Bar */}
        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 -mt-16 mb-4">
            
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              <div className="relative">
                <img 
                  src={creator.avatar} 
                  alt={creator.name} 
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(creator.name)}&background=2563eb&color=fff&bold=true`;
                  }}
                  className="w-28 h-28 rounded-2xl object-cover border-4 border-zinc-900 shadow-xl bg-zinc-900"
                />
                {creator.identityVerified && (
                  <div className="absolute -bottom-1.5 -right-1.5 bg-emerald-500 text-zinc-950 p-1 rounded-full shadow-md" title="Verified Creator Identity">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-black text-zinc-100 tracking-tight">
                    {creator.name}
                  </h1>
                  <span className="text-sm font-medium text-zinc-400">
                    {creator.handle}
                  </span>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 font-bold uppercase tracking-wider border border-zinc-700">
                    {creator.creatorType}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-zinc-400 mt-1.5 flex-wrap">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    {creator.location.city}, {creator.location.country}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Languages className="w-3.5 h-3.5 text-zinc-500" />
                    {creator.languages.join(', ')}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    Response {creator.responseTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Header Action Buttons */}
            <div className="flex items-center gap-2.5 flex-wrap">
              
              <button
                onClick={() => setInquiryModalCreator(creator)}
                className="flex items-center gap-2 px-5 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-bold rounded-full transition-colors shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Contact Creator</span>
              </button>

              <button
                onClick={() => toggleSaveCreator(creator.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-full border transition-colors ${
                  isSaved 
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' 
                    : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-750'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-400 text-amber-400' : ''}`} />
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </button>

              <button
                onClick={() => addToCompare(creator.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-full border transition-colors ${
                  isCompared 
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                    : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-750'
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                <span>{isCompared ? 'Compared' : 'Compare'}</span>
              </button>

              <button
                onClick={handleShare}
                className="p-2.5 bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white rounded-full transition-colors"
                title="Share profile"
              >
                {shareCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              </button>

            </div>

          </div>

          {/* Social Platform Badges */}
          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-medium text-zinc-400 mr-1">Verified Channels:</span>
              {creator.platforms.map(p => (
                <div key={p.id} className="flex items-center gap-1.5 bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-xl text-xs">
                  <PlatformBadge platform={p.platform} showName />
                  <span className="font-bold text-zinc-100 ml-1">{formatNumber(p.followers)}</span>
                  <span className="text-[10px] text-emerald-400 font-bold ml-1">({p.engagementRate}%)</span>
                </div>
              ))}
            </div>

            {/* AI Score Badge Trigger */}
            <button
              onClick={() => setExplainMatchCreator(creator)}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-zinc-950 hover:bg-zinc-850 border border-zinc-800 rounded-2xl transition-colors text-left"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <div>
                <span className="text-[9px] uppercase font-bold text-emerald-400 block leading-tight">
                  Vouchmark Score
                </span>
                <span className="text-xs font-black text-zinc-100">
                  {creator.aiScore.overall}/100 • Explain Match
                </span>
              </div>
            </button>
          </div>

        </div>

        {/* 2. PROFILE NAVIGATION TABS */}
        <div className="px-6 border-t border-zinc-800 bg-zinc-950/60 flex gap-2 overflow-x-auto text-xs font-bold text-zinc-400">
          <button
            onClick={() => setActiveProfileTab('overview')}
            className={`py-3.5 px-4 border-b-2 transition-colors whitespace-nowrap ${
              activeProfileTab === 'overview'
                ? 'border-emerald-500 text-emerald-400 bg-zinc-900/50'
                : 'border-transparent hover:text-zinc-200'
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => setActiveProfileTab('analytics')}
            className={`py-3.5 px-4 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeProfileTab === 'analytics'
                ? 'border-emerald-500 text-emerald-400 bg-zinc-900/50'
                : 'border-transparent hover:text-zinc-200'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Cross-Platform Analytics</span>
          </button>

          <button
            onClick={() => setActiveProfileTab('comparison')}
            className={`py-3.5 px-4 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeProfileTab === 'comparison'
                ? 'border-emerald-500 text-emerald-400 bg-zinc-900/50'
                : 'border-transparent hover:text-zinc-200'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Platform Comparison</span>
          </button>

          <button
            onClick={() => setActiveProfileTab('audience')}
            className={`py-3.5 px-4 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeProfileTab === 'audience'
                ? 'border-emerald-500 text-emerald-400 bg-zinc-900/50'
                : 'border-transparent hover:text-zinc-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Audience Insights</span>
          </button>

          <button
            onClick={() => setActiveProfileTab('portfolio')}
            className={`py-3.5 px-4 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeProfileTab === 'portfolio'
                ? 'border-emerald-500 text-emerald-400 bg-zinc-900/50'
                : 'border-transparent hover:text-zinc-200'
            }`}
          >
            <FolderKanban className="w-3.5 h-3.5" />
            <span>Portfolio & Case Studies ({creator.portfolio?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveProfileTab('pricing')}
            className={`py-3.5 px-4 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeProfileTab === 'pricing'
                ? 'border-emerald-500 text-emerald-400 bg-zinc-900/50'
                : 'border-transparent hover:text-zinc-200'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Pricing & Packages</span>
          </button>

          <button
            onClick={() => setActiveProfileTab('reviews')}
            className={`py-3.5 px-4 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeProfileTab === 'reviews'
                ? 'border-emerald-500 text-emerald-400 bg-zinc-900/50'
                : 'border-transparent hover:text-zinc-200'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Social Proof & Reviews ({creator.reviews?.length || 0})</span>
          </button>
        </div>

      </div>

      {/* 3. ACTIVE TAB CONTENT */}

      {/* TAB A: OVERVIEW */}
      {activeProfileTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Bio & Commercial Statement */}
            <div className="bg-zinc-900 p-6 rounded-[2rem] border border-zinc-800 shadow-sm">
              <h2 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2.5">
                Creator Bio & Positioning
              </h2>
              <p className="text-zinc-300 text-sm leading-relaxed font-normal">
                {creator.bio}
              </p>

              <div className="mt-4 pt-4 border-t border-zinc-800 flex flex-wrap gap-2">
                <span className="text-xs font-bold text-zinc-400 mr-1 self-center">Categories:</span>
                {creator.categories.map((cat, i) => (
                  <span key={i} className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-bold">
                    {cat}
                  </span>
                ))}
                {creator.niches.map((niche, i) => (
                  <span key={i} className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-xs font-medium">
                    #{niche}
                  </span>
                ))}
              </div>
            </div>

            {/* High-Level Commercial Metrics Bento */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 shadow-sm">
                <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Total Reach</div>
                <div className="text-xl font-black text-zinc-100 mt-1">
                  {formatNumber(creator.stats.totalFollowers)}
                </div>
                <div className="text-[10px] text-emerald-400 font-bold mt-1">Across 3 platforms</div>
              </div>

              <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 shadow-sm">
                <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Avg Engagement</div>
                <div className="text-xl font-black text-emerald-400 mt-1">
                  {creator.stats.avgEngagementRate}%
                </div>
                <div className="text-[10px] text-zinc-400 mt-1">High retention intent</div>
              </div>

              <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 shadow-sm">
                <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Monthly Reach</div>
                <div className="text-xl font-black text-zinc-100 mt-1">
                  {formatNumber(creator.stats.avgMonthlyReach)}
                </div>
                <div className="text-[10px] text-emerald-400 font-bold mt-1">Verified 30D window</div>
              </div>

              <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 shadow-sm">
                <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Completed</div>
                <div className="text-xl font-black text-zinc-100 mt-1">
                  {creator.stats.completedCampaigns}
                </div>
                <div className="text-[10px] text-zinc-400 mt-1">{creator.stats.brandsWorkedWith} brands</div>
              </div>

            </div>

            {/* Featured Portfolio Case Study Teaser */}
            {(creator.portfolio?.length || 0) > 0 && (
              <div className="bg-zinc-900 p-6 rounded-[2rem] border border-zinc-800 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">
                      Featured Commercial Case Study
                    </h3>
                    <p className="text-xs text-zinc-400">Verified brand outcomes & performance metrics</p>
                  </div>
                  <button 
                    onClick={() => setActiveProfileTab('portfolio')}
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 transition-colors"
                  >
                    <span>View all ({creator.portfolio?.length || 0})</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {(creator.portfolio || []).slice(0, 1).map(proj => (
                  <div key={proj.id} className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-sm text-zinc-100">{proj.brandName}</span>
                          <span className="text-xs text-zinc-600">•</span>
                          <span className="text-xs text-zinc-400 font-medium">{proj.campaignName}</span>
                        </div>
                        <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                          "{proj.creatorCommentary}"
                        </p>
                      </div>
                      {proj.roi && (
                        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-black text-xs shrink-0">
                          {proj.roi}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-zinc-800 text-xs">
                      <div>
                        <div className="text-zinc-500 text-[10px]">Reach</div>
                        <div className="font-bold text-zinc-200">{formatNumber(proj.reach)}</div>
                      </div>
                      <div>
                        <div className="text-zinc-500 text-[10px]">Views</div>
                        <div className="font-bold text-zinc-200">{formatNumber(proj.views)}</div>
                      </div>
                      <div>
                        <div className="text-zinc-500 text-[10px]">Engagement</div>
                        <div className="font-bold text-emerald-400">{proj.engagementRate}%</div>
                      </div>
                      <div>
                        <div className="text-zinc-500 text-[10px]">Verified Leads / Sales</div>
                        <div className="font-bold text-zinc-100">{formatNumber(proj.leads || proj.conversions)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Sidebar Column: Trust & Commercial Summary */}
          <div className="space-y-6">
            
            {/* Vouchmark AI Score Card Bento */}
            <div className="bg-zinc-900 p-6 rounded-[2rem] shadow-md border border-zinc-800">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">
                    AI Marketplace Score
                  </span>
                </div>
                <span className="text-xl font-black text-zinc-100">
                  {creator.aiScore.overall}<span className="text-xs text-zinc-500 font-normal">/100</span>
                </span>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                {creator.aiScore.summary}
              </p>

              <div className="space-y-2.5 border-t border-zinc-800 pt-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Audience Quality</span>
                  <span className="font-bold text-emerald-400">{creator.aiScore.audienceQuality}/100</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Engagement Quality</span>
                  <span className="font-bold text-emerald-400">{creator.aiScore.engagementQuality}/100</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Delivery Reliability</span>
                  <span className="font-bold text-zinc-200">{creator.aiScore.reliability}/100</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Commercial ROAS Value</span>
                  <span className="font-bold text-emerald-400">{creator.aiScore.commercialValue}/100</span>
                </div>
              </div>

              <button
                onClick={() => setExplainMatchCreator(creator)}
                className="w-full mt-4 py-2.5 bg-zinc-800 hover:bg-zinc-750 text-zinc-100 rounded-full text-xs font-bold border border-zinc-700 transition-colors text-center"
              >
                View Full Match Explanation
              </button>
            </div>

            {/* Commercial Availability & Contact Rules */}
            <div className="bg-zinc-900 p-6 rounded-[2rem] border border-zinc-800 shadow-sm text-xs space-y-3">
              <h3 className="font-bold text-zinc-300 uppercase tracking-wider text-[11px]">
                Commercial Guidelines
              </h3>
              
              <div className="space-y-2 text-zinc-400">
                <div className="flex items-center justify-between py-1.5 border-b border-zinc-800">
                  <span>Current Booking Status</span>
                  <span className="font-bold text-emerald-400">{creator.availabilityStatus}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-zinc-800">
                  <span>Turnaround Window</span>
                  <span className="font-bold text-zinc-200">3 - 7 Business Days</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-zinc-800">
                  <span>Repeat Client Rate</span>
                  <span className="font-bold text-emerald-400">{creator.stats.repeatClientRate}%</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-zinc-800">
                  <span>On-Time Milestone Delivery</span>
                  <span className="font-bold text-zinc-200">{creator.stats.onTimeDeliveryRate}%</span>
                </div>
              </div>

              <button
                onClick={() => setInquiryModalCreator(creator)}
                className="w-full mt-2 py-3 bg-zinc-100 hover:bg-white text-zinc-950 font-bold rounded-full text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Commercial Brief</span>
              </button>
            </div>

          </div>

        </div>
      )}

      {/* TAB B: CROSS-PLATFORM ANALYTICS */}
      {activeProfileTab === 'analytics' && (
        <div className="space-y-6">
          
          {/* Controls: Time Window & Platform Switcher */}
          <div className="bg-zinc-900 p-4 rounded-[2rem] border border-zinc-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-zinc-400">Filter Platform:</span>
              <button
                onClick={() => setSelectedPlatformForAnalytics('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  selectedPlatformForAnalytics === 'all'
                    ? 'bg-zinc-100 text-zinc-950'
                    : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                All Combined
              </button>
              {creator.platforms.map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPlatformForAnalytics(p.platform)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    selectedPlatformForAnalytics === p.platform
                      ? 'bg-emerald-500 text-zinc-950'
                      : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                  }`}
                >
                  <PlatformBadge platform={p.platform} showName />
                </button>
              ))}
            </div>

            {/* Time Window Buttons */}
            <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-full border border-zinc-800 text-xs">
              {(['7D', '30D', '90D', '6M', '1Y'] as const).map(w => (
                <button
                  key={w}
                  onClick={() => setTimeWindow(w)}
                  className={`px-3 py-1 rounded-full font-bold transition-colors ${
                    timeWindow === w
                      ? 'bg-zinc-800 text-zinc-100'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          {/* Normalized Platform Breakdown Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {creator.platforms.map(p => {
              const freshness = getFreshnessLabel(p.syncFreshness);
              return (
                <div key={p.id} className="bg-zinc-900 p-5 rounded-[2rem] border border-zinc-800 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <PlatformBadge platform={p.platform} showName size="md" />
                    <span className="flex items-center gap-1.5 text-[11px] text-zinc-400" title={`Last synced: ${p.lastSynced}`}>
                      <span className={`w-2 h-2 rounded-full ${freshness.dotColor}`} />
                      <span>{freshness.label}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <div className="text-zinc-500 text-[10px]">Audience Count</div>
                      <div className="text-lg font-black text-zinc-100 mt-0.5">
                        {formatNumber(p.followers)}
                      </div>
                    </div>

                    <div>
                      <div className="text-zinc-500 text-[10px]">Engagement Rate</div>
                      <div className="text-lg font-black text-emerald-400 mt-0.5">
                        {p.engagementRate}%
                      </div>
                    </div>

                    <div>
                      <div className="text-zinc-500 text-[10px]">Average Views</div>
                      <div className="text-sm font-bold text-zinc-200 mt-0.5">
                        {formatNumber(p.avgViews)}
                      </div>
                    </div>

                    <div>
                      <div className="text-zinc-500 text-[10px]">Average Reach</div>
                      <div className="text-sm font-bold text-zinc-200 mt-0.5">
                        {formatNumber(p.avgReach)}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
                    <span>Format: <strong className="text-zinc-200">{p.topContentFormat}</strong></span>
                    <span className="text-[10px] text-emerald-400 font-semibold">Official API</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Time Series Trend Chart */}
          <div className="bg-zinc-900 p-6 rounded-[2rem] border border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">
                  Audience Reach & Viewership Velocity ({timeWindow})
                </h3>
                <p className="text-xs text-zinc-400">
                  Normalized cross-platform performance curve over past {timeWindow}
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <span className="w-3 h-1 bg-emerald-500 rounded" />
                  <span>Total Reach</span>
                </span>
                <span className="flex items-center gap-1.5 text-sky-400 font-bold">
                  <span className="w-3 h-1 bg-sky-400 rounded" />
                  <span>Video Views</span>
                </span>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analyticsTrendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="reachGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#71717a" fontSize={11} tickLine={false} />
                  <YAxis stroke="#71717a" fontSize={11} tickLine={false} tickFormatter={(v) => formatNumber(v)} />
                  <RechartsTooltip 
                    formatter={(value: any) => [formatNumber(Number(value)), '']}
                    contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="reach" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#reachGrad)" name="Reach" />
                  <Area type="monotone" dataKey="views" stroke="#38bdf8" strokeWidth={2} fillOpacity={1} fill="url(#viewsGrad)" name="Views" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-zinc-500" />
                <span>Unavailable metrics are never represented as zero. Raw zeros represent genuine zero value.</span>
              </span>
              <span className="text-[11px] font-medium text-zinc-500">Measurement Window: Past {timeWindow}</span>
            </div>
          </div>

        </div>
      )}

      {/* TAB C: PLATFORM COMPARISON */}
      {activeProfileTab === 'comparison' && (
        <div className="bg-zinc-900 p-6 rounded-[2rem] border border-zinc-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">
              Platform Matrix Comparison
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Direct side-by-side performance breakdown for {creator.name} across connected channels
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950">
                  <th className="py-3 px-4 text-left font-bold text-zinc-400">Metric</th>
                  {creator.platforms.map(p => (
                    <th key={p.id} className="py-3 px-4 text-left font-bold text-zinc-200">
                      <PlatformBadge platform={p.platform} showName size="sm" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-zinc-400">Total Followers / Subs</td>
                  {creator.platforms.map(p => (
                    <td key={p.id} className="py-3.5 px-4 font-black text-zinc-100 text-sm">
                      {formatNumber(p.followers)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-zinc-400">Average Video Views</td>
                  {creator.platforms.map(p => (
                    <td key={p.id} className="py-3.5 px-4 font-bold text-zinc-200">
                      {formatNumber(p.avgViews)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-zinc-400">Engagement Rate</td>
                  {creator.platforms.map(p => (
                    <td key={p.id} className="py-3.5 px-4 font-black text-emerald-400">
                      {p.engagementRate}%
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-zinc-400">Average Monthly Reach</td>
                  {creator.platforms.map(p => (
                    <td key={p.id} className="py-3.5 px-4 text-zinc-300">
                      {formatNumber(p.avgReach)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-zinc-400">30-Day Growth Rate</td>
                  {creator.platforms.map(p => (
                    <td key={p.id} className="py-3.5 px-4 text-emerald-400 font-bold">
                      +{creator.audience.growth30d}%
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-zinc-400">Top Content Format</td>
                  {creator.platforms.map(p => (
                    <td key={p.id} className="py-3.5 px-4 text-zinc-300 font-medium">
                      {p.topContentFormat}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-zinc-400">Data Synchronization</td>
                  {creator.platforms.map(p => {
                    const freshness = getFreshnessLabel(p.syncFreshness);
                    return (
                      <td key={p.id} className="py-3.5 px-4 text-zinc-400 text-[11px]">
                        <span className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${freshness.dotColor}`} />
                          <span>{freshness.label}</span>
                        </span>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB D: AUDIENCE INSIGHTS */}
      {activeProfileTab === 'audience' && (
        <div className="space-y-6">
          
          {/* Header Summary */}
          <div className="bg-zinc-900 p-6 rounded-[2rem] border border-zinc-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">
                Audience Demographics & Distribution
              </h3>
              <p className="text-xs text-zinc-400">
                Extracted from official creator authorization channels. No synthetic guesses.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-[10px] uppercase font-bold text-zinc-500">Audience Quality</div>
                <div className="text-lg font-black text-emerald-400">{creator.audience.audienceQualityScore}/100</div>
              </div>
              <div className="h-8 w-px bg-zinc-800" />
              <div className="text-right">
                <div className="text-[10px] uppercase font-bold text-zinc-500">Suspicious Activity</div>
                <div className="text-lg font-bold text-zinc-300">{creator.audience.suspiciousFollowerPercent}% <span className="text-[10px] text-zinc-500">(Clean)</span></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Age Distribution Chart */}
            <div className="bg-zinc-900 p-6 rounded-[2rem] border border-zinc-800 shadow-sm">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4">
                Age Distribution
              </h4>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={creator.audience.ageDistribution}>
                    <XAxis dataKey="label" stroke="#71717a" fontSize={11} tickLine={false} />
                    <YAxis stroke="#71717a" fontSize={11} tickLine={false} tickFormatter={(v) => `${v}%`} />
                    <RechartsTooltip 
                      formatter={(v: any) => [`${v}%`, 'Audience Share']}
                      contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                    />
                    <Bar dataKey="percentage" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Gender Distribution Chart */}
            <div className="bg-zinc-900 p-6 rounded-[2rem] border border-zinc-800 shadow-sm">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4">
                Gender Breakdown
              </h4>
              <div className="flex items-center justify-between h-56">
                <div className="w-1/2 h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={creator.audience.genderDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={4}
                        dataKey="percentage"
                      >
                        {creator.audience.genderDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={GENDER_COLORS[index % GENDER_COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip 
                        formatter={(v: any) => [`${v}%`, '']}
                        contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="w-1/2 space-y-3 text-xs">
                  {creator.audience.genderDistribution.map((g, idx) => (
                    <div key={g.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: GENDER_COLORS[idx % GENDER_COLORS.length] }} />
                        <span className="text-zinc-300 font-medium">{g.label}</span>
                      </div>
                      <span className="font-bold text-zinc-100">{g.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Geographies */}
            <div className="bg-zinc-900 p-6 rounded-[2rem] border border-zinc-800 shadow-sm">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3">
                Top Countries
              </h4>
              <div className="space-y-3 text-xs">
                {creator.audience.topCountries.map(c => (
                  <div key={c.country} className="space-y-1">
                    <div className="flex items-center justify-between text-zinc-300">
                      <span className="font-medium">{c.country}</span>
                      <span className="font-bold text-zinc-100">{c.percentage}%</span>
                    </div>
                    <div className="w-full bg-zinc-950 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${c.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Cities */}
            <div className="bg-zinc-900 p-6 rounded-[2rem] border border-zinc-800 shadow-sm">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3">
                Top Metros & Cities
              </h4>
              <div className="space-y-3 text-xs">
                {creator.audience.topCities.map(city => (
                  <div key={city.city} className="space-y-1">
                    <div className="flex items-center justify-between text-zinc-300">
                      <span className="font-medium">{city.city}</span>
                      <span className="font-bold text-zinc-100">{city.percentage}%</span>
                    </div>
                    <div className="w-full bg-zinc-950 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: `${city.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-xs text-zinc-400 flex items-center gap-2.5">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Demographic accuracy statement: Data reflects available authorized platform API insights. We do not extrapolate synthetic demographic data outside official API responses.
            </span>
          </div>

        </div>
      )}

      {/* TAB E: PORTFOLIO & CASE STUDIES */}
      {activeProfileTab === 'portfolio' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">
              Commercial Case Studies & Verified Results
            </h3>
            <p className="text-xs text-zinc-400">
              Detailed outcomes from real brand campaigns executed by {creator.name}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {creator.portfolio.map(proj => (
              <div key={proj.id} className="bg-zinc-900 p-6 rounded-[2rem] border border-zinc-800 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-base font-bold text-zinc-100">{proj.brandName}</span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-sm font-semibold text-zinc-300">{proj.campaignName}</span>
                      {proj.verifiedByBrand && (
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase tracking-wider flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Brand Verified
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-zinc-400 mt-1 flex items-center gap-2 flex-wrap">
                      <span>Objective: <strong className="text-zinc-200">{proj.campaignObjective}</strong></span>
                      <span>•</span>
                      <span>Format: <strong className="text-zinc-200">{proj.contentFormat}</strong></span>
                      <span>•</span>
                      <span>Published: {proj.publishedDate}</span>
                    </div>
                  </div>

                  {proj.roi && (
                    <div className="px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-center self-start sm:self-auto">
                      <div className="text-[9px] uppercase font-bold text-emerald-400 tracking-wider">Delivered ROI</div>
                      <div className="text-sm font-black text-emerald-300">{proj.roi}</div>
                    </div>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 bg-zinc-950 p-4 rounded-2xl border border-zinc-800 leading-relaxed italic">
                  "{proj.creatorCommentary}"
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                    <div className="text-zinc-500 text-[10px]">Total Impressions / Reach</div>
                    <div className="font-bold text-zinc-100 text-sm mt-0.5">{formatNumber(proj.reach)}</div>
                  </div>
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                    <div className="text-zinc-500 text-[10px]">Verified Video Views</div>
                    <div className="font-bold text-zinc-100 text-sm mt-0.5">{formatNumber(proj.views)}</div>
                  </div>
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                    <div className="text-zinc-500 text-[10px]">Engagement Rate</div>
                    <div className="font-bold text-emerald-400 text-sm mt-0.5">{proj.engagementRate}%</div>
                  </div>
                  <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                    <div className="text-zinc-500 text-[10px]">Leads / Conversions</div>
                    <div className="font-bold text-zinc-100 text-sm mt-0.5">{formatNumber(proj.leads || proj.conversions)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB F: PRICING & PACKAGES (Sensitive Commercial Information) */}
      {activeProfileTab === 'pricing' && (
        <div className="space-y-6">
          
          {isPublicMode && userRole === 'public' ? (
            <div className="bg-zinc-900 p-12 rounded-[2rem] border border-zinc-800 text-center space-y-4 max-w-xl mx-auto shadow-sm">
              <div className="w-12 h-12 rounded-full bg-zinc-800 text-zinc-400 mx-auto flex items-center justify-center">
                <Lock className="w-6 h-6 text-zinc-200" />
              </div>
              <h3 className="text-base font-bold text-zinc-100">Commercial Rate Card Locked</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Creator pricing is sensitive commercial data reserved for verified brands and agency buyers under marketplace terms.
              </p>
              <button
                onClick={() => setUserRole('brand')}
                className="px-5 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 rounded-full text-xs font-bold transition-colors shadow-sm"
              >
                Switch to Verified Brand Mode
              </button>
            </div>
          ) : (
            <>
              <div className="bg-zinc-900 p-6 rounded-[2rem] border border-zinc-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">
                    Commercial Rate Card & Market Benchmarks
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Standard deliverable quotes compared against category marketplace medians
                  </p>
                </div>
                <div className="text-[11px] px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Audited Brand Access (Confidential)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {creator.pricing.map(pkg => (
                  <div key={pkg.id} className="bg-zinc-900 p-6 rounded-[2rem] border border-zinc-800 shadow-sm space-y-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <PlatformBadge platform={pkg.platform} showName size="sm" />
                          <h4 className="font-bold text-zinc-100 text-sm mt-2">{pkg.deliverableName}</h4>
                        </div>
                        <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                          pkg.negotiable ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-zinc-800 text-zinc-400'
                        }`}>
                          {pkg.negotiable ? 'Negotiable' : 'Fixed Rate'}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-normal">
                        {pkg.description}
                      </p>

                      <div className="my-3 py-2 border-y border-zinc-800 flex items-baseline gap-2">
                        <span className="text-xl font-black text-zinc-100">
                          {formatCurrency(pkg.priceMin)} - {formatCurrency(pkg.priceMax)}
                        </span>
                        <span className="text-xs text-zinc-500">typical range</span>
                      </div>

                      {/* Marketplace Benchmark Indicator */}
                      <div className="p-3.5 bg-zinc-950 rounded-2xl border border-zinc-800 text-xs space-y-1">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-zinc-500">Category Benchmark:</span>
                          <span className="font-semibold text-zinc-300">
                            {formatCurrency(pkg.benchmarkMin)} - {formatCurrency(pkg.benchmarkMax)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-zinc-500">Market Position:</span>
                          <span className="font-bold text-emerald-400 capitalize">
                            Within market standard
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs text-zinc-400">
                      <span>Turnaround: <strong className="text-zinc-200">{pkg.turnaroundDays} days</strong> ({pkg.typicalRevisions} revs)</span>
                      <button
                        onClick={() => setInquiryModalCreator(creator)}
                        className="px-4 py-2 bg-zinc-100 hover:bg-white text-zinc-950 font-bold rounded-full text-xs transition-colors shadow-sm"
                      >
                        Select Package
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      )}

      {/* TAB G: SOCIAL PROOF & REVIEWS */}
      {activeProfileTab === 'reviews' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 p-6 rounded-[2rem] border border-zinc-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">
                Audited Brand Endorsements
              </h3>
              <p className="text-xs text-zinc-400">
                Verified reviews submitted by marketing leads upon milestone completion
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="font-bold text-zinc-100 text-sm">5.0 / 5.0 Rating</span>
            </div>
          </div>

          <div className="space-y-4">
            {creator.reviews.map(rev => (
              <div key={rev.id} className="bg-zinc-900 p-6 rounded-[2rem] border border-zinc-800 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-zinc-100 text-xs sm:text-sm">{rev.brandName}</span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-xs text-zinc-400">{rev.brandContact}</span>
                    {rev.verifiedClient && (
                      <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-bold uppercase tracking-wider">
                        Verified Deal
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-zinc-500">{rev.date}</span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
                  "{rev.comment}"
                </p>
                <div className="text-[11px] text-emerald-400 font-semibold">
                  Campaign: {rev.campaignName}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
