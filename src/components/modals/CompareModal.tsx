import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Scale, 
  X, 
  ShieldCheck
} from 'lucide-react';
import { formatNumber, formatCurrency } from '../../utils/formatters';
import { PlatformBadge } from '../common/PlatformBadge';

export const CompareModal: React.FC = () => {
  const { 
    isCompareOpen, 
    setIsCompareOpen, 
    compareCreatorIds, 
    removeFromCompare, 
    clearCompare, 
    creators, 
    setSelectedCreatorId, 
    setActiveTab, 
    setInquiryModalCreator,
    userRole
  } = useApp();

  if (!isCompareOpen) return null;

  const compareCreators = (creators || []).filter(c => (compareCreatorIds || []).includes(c.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-5xl bg-zinc-900 rounded-[2rem] shadow-2xl border border-zinc-800 overflow-hidden flex flex-col max-h-[90vh] text-zinc-100">
        
        {/* Modal Header */}
        <div className="px-6 py-5 bg-zinc-950 text-white flex items-center justify-between border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-100">Compare Creator Intelligence</h3>
              <p className="text-xs text-zinc-400">
                Side-by-side performance benchmarks, pricing ranges, and audience metrics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={clearCompare}
              className="text-xs text-zinc-400 hover:text-rose-400 font-semibold transition-colors"
            >
              Clear all
            </button>
            <button
              onClick={() => setIsCompareOpen(false)}
              className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Table */}
        <div className="overflow-x-auto overflow-y-auto p-6 flex-1">
          {compareCreators.length === 0 ? (
            <div className="py-16 text-center text-zinc-500 text-xs">
              <p>No creators selected for comparison.</p>
              <p className="mt-1">Add creators from Discovery to view metrics side by side.</p>
            </div>
          ) : (
            <table className="w-full border-collapse text-xs">
              <tbody>
                
                {/* 1. Header / Avatar Row */}
                <tr className="border-b border-zinc-800">
                  <td className="py-4 px-3 w-44 font-bold text-zinc-500 uppercase tracking-widest text-[10px] align-top">
                    Creator
                  </td>
                  {compareCreators.map(c => (
                    <td key={c.id} className="py-4 px-4 min-w-56 align-top">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <img 
                            src={c.avatar} 
                            alt={c.name} 
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              const target = e.currentTarget;
                              target.onerror = null;
                              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=2563eb&color=fff&bold=true`;
                            }}
                            className="w-12 h-12 rounded-2xl object-cover border border-zinc-800"
                          />
                          <div>
                            <div className="font-bold text-zinc-100 text-sm flex items-center gap-1.5">
                              <span>{c.name}</span>
                              {c.identityVerified && (
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                              )}
                            </div>
                            <div className="text-xs text-zinc-400">{c.handle}</div>
                            <div className="text-[10px] text-zinc-500">{c.location.city}, {c.location.country}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCompare(c.id)}
                          className="text-zinc-500 hover:text-rose-400 transition-colors p-1"
                          title="Remove from comparison"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="mt-3 flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedCreatorId(c.id);
                            setActiveTab(userRole === 'creator' ? 'creator_profile' : 'creator_profile_view');
                            setIsCompareOpen(false);
                          }}
                          className="flex-1 py-1.5 px-2 rounded-full bg-zinc-800 hover:bg-zinc-750 text-zinc-200 font-bold text-[11px] text-center transition-colors"
                        >
                          Profile
                        </button>
                        <button
                          onClick={() => {
                            setInquiryModalCreator(c);
                            setIsCompareOpen(false);
                          }}
                          className="flex-1 py-1.5 px-2 rounded-full bg-zinc-100 hover:bg-white text-zinc-950 font-bold text-[11px] text-center transition-colors shadow-sm"
                        >
                          Inquire
                        </button>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 2. AI Score */}
                <tr className="border-b border-zinc-800/80 bg-zinc-950/40">
                  <td className="py-3 px-3 font-bold text-emerald-400 text-xs uppercase tracking-wider">
                    AI Match Score
                  </td>
                  {compareCreators.map(c => (
                    <td key={c.id} className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-black text-emerald-400">
                          {c.aiScore.overall}/100
                        </span>
                        <span className="text-[10px] text-zinc-400">
                          (Audience {c.aiScore.audienceQuality})
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 3. Connected Platforms */}
                <tr className="border-b border-zinc-800/80">
                  <td className="py-3 px-3 font-medium text-zinc-400">Platforms</td>
                  {compareCreators.map(c => (
                    <td key={c.id} className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {c.platforms.map(p => (
                          <PlatformBadge key={p.id} platform={p.platform} showName size="sm" />
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 4. Total Followers & Subscribers */}
                <tr className="border-b border-zinc-800/80">
                  <td className="py-3 px-3 font-medium text-zinc-400">Total Followers</td>
                  {compareCreators.map(c => (
                    <td key={c.id} className="py-3 px-4 font-bold text-zinc-100">
                      {formatNumber(c.stats.totalFollowers)}
                    </td>
                  ))}
                </tr>

                {/* 5. Average Views */}
                <tr className="border-b border-zinc-800/80">
                  <td className="py-3 px-3 font-medium text-zinc-400">Average Video Views</td>
                  {compareCreators.map(c => {
                    const topPlatform = c.platforms[0];
                    return (
                      <td key={c.id} className="py-3 px-4 font-semibold text-zinc-200">
                        {formatNumber(topPlatform?.avgViews)} <span className="text-[10px] text-zinc-500 font-normal">({topPlatform?.platform})</span>
                      </td>
                    );
                  })}
                </tr>

                {/* 6. Engagement Rate */}
                <tr className="border-b border-zinc-800/80">
                  <td className="py-3 px-3 font-medium text-zinc-400">Engagement Rate</td>
                  {compareCreators.map(c => (
                    <td key={c.id} className="py-3 px-4 font-bold text-emerald-400">
                      {c.stats.avgEngagementRate}%
                    </td>
                  ))}
                </tr>

                {/* 7. Top Demographics */}
                <tr className="border-b border-zinc-800/80">
                  <td className="py-3 px-3 font-medium text-zinc-400">Primary Audience</td>
                  {compareCreators.map(c => (
                    <td key={c.id} className="py-3 px-4 text-zinc-300">
                      <div>{c.audience.primaryGender}</div>
                      <div className="text-[10px] text-zinc-500">
                        {c.audience.topCountries[0]?.country} ({c.audience.topCountries[0]?.percentage}%) • {c.audience.topCities[0]?.city}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 8. Starting Pricing */}
                <tr className="border-b border-zinc-800/80 bg-zinc-950/40">
                  <td className="py-3 px-3 font-medium text-zinc-400">Starting Reel/Video Rate</td>
                  {compareCreators.map(c => {
                    const firstPkg = c.pricing[0];
                    return (
                      <td key={c.id} className="py-3 px-4 font-bold text-zinc-100">
                        {firstPkg ? `${formatCurrency(firstPkg.priceMin)} - ${formatCurrency(firstPkg.priceMax)}` : 'Contact for Quote'}
                      </td>
                    );
                  })}
                </tr>

                {/* 9. Response Time & Availability */}
                <tr className="border-b border-zinc-800/80">
                  <td className="py-3 px-3 font-medium text-zinc-400">Response & Availability</td>
                  {compareCreators.map(c => (
                    <td key={c.id} className="py-3 px-4 text-zinc-300">
                      <div className="font-medium text-emerald-400">{c.availabilityStatus}</div>
                      <div className="text-[10px] text-zinc-500">Avg {c.responseTime} response</div>
                    </td>
                  ))}
                </tr>

                {/* 10. Completed Campaigns */}
                <tr className="border-b border-zinc-800/80">
                  <td className="py-3 px-3 font-medium text-zinc-400">Proven Track Record</td>
                  {compareCreators.map(c => (
                    <td key={c.id} className="py-3 px-4 text-zinc-300">
                      <div className="font-semibold text-zinc-100">{c.stats.completedCampaigns} Campaigns</div>
                      <div className="text-[10px] text-zinc-500">
                        {c.stats.brandsWorkedWith} Brands • {c.stats.onTimeDeliveryRate}% On-time
                      </div>
                    </td>
                  ))}
                </tr>

              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400 shrink-0">
          <span>Comparing up to 4 creators simultaneously</span>
          <button
            onClick={() => setIsCompareOpen(false)}
            className="px-5 py-2 rounded-full bg-zinc-100 hover:bg-white text-zinc-950 font-bold transition-colors shadow-sm"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
