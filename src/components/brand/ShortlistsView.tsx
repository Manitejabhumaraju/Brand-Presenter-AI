import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shortlist } from '../../types';
import { 
  ListFilter, 
  Plus, 
  Trash2, 
  Sparkles, 
  ExternalLink,
  DollarSign,
  Bookmark
} from 'lucide-react';
import { formatCurrency, formatNumber } from '../../utils/formatters';

export const ShortlistsView: React.FC = () => {
  const { 
    shortlists, 
    setShortlists, 
    creators, 
    setSelectedCreatorId, 
    setActiveTab, 
    setInquiryModalCreator,
    campaigns,
    setCampaigns
  } = useApp();

  const [activeBoardId, setActiveBoardId] = useState<string>(shortlists[0]?.id || '');
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const [showNewBoardInput, setShowNewBoardInput] = useState(false);
  const [campaignLaunchedNotice, setCampaignLaunchedNotice] = useState<string | null>(null);

  const activeBoard = shortlists.find(b => b.id === activeBoardId) || shortlists[0];

  const boardCreators = (creators || []).filter(c => (activeBoard?.creatorIds || []).includes(c.id));
  const estimatedTotalBudget = boardCreators.reduce((acc, c) => acc + (c.pricing[0]?.priceMin || 35000), 0);
  const totalCombinedAudience = boardCreators.reduce((acc, c) => acc + c.stats.totalFollowers, 0);

  const handleLaunchCampaignFromBoard = () => {
    if (!activeBoard || boardCreators.length === 0) return;

    const newCampaignId = 'camp_' + Date.now();
    const newCampaignDeliverables = boardCreators.map((c, i) => ({
      id: 'del_' + Date.now() + '_' + i,
      campaignId: newCampaignId,
      creatorId: c.id,
      creatorName: c.name,
      payoutAmount: c.pricing[0]?.priceMin || 35000,
      title: `${c.pricing[0]?.deliverableName || 'Dedicated Campaign Feature'}`,
      platform: c.pricing[0]?.platform || 'instagram',
      format: 'High-Retention Video',
      dueDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      status: 'draft' as const,
      creatorNotes: 'Sourced from Talent Board: ' + activeBoard.name
    }));

    const newCampaign = {
      id: newCampaignId,
      title: activeBoard.name + ' Campaign',
      brandName: 'Cult.fit Marketing',
      brandLogo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=120&q=80',
      objective: 'High-Retention Conversions & Brand Recall',
      status: 'in_progress' as const,
      totalBudget: estimatedTotalBudget || 150000,
      spentBudget: Math.round((estimatedTotalBudget || 150000) * 0.4),
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      targetPlatforms: ['instagram' as const, 'youtube' as const],
      targetCategories: ['Fitness & Health', 'Tech & AI'],
      creatorIds: activeBoard.creatorIds,
      deliverables: newCampaignDeliverables,
      usageRights: {
        organicUsage: true,
        paidWhitelisting: true,
        durationMonths: 6,
        territory: 'India & Global Digital',
        exclusivityDays: 14
      }
    };

    setCampaigns([newCampaign, ...campaigns]);
    setCampaignLaunchedNotice(`Campaign "${newCampaign.title}" initialized with ${boardCreators.length} creators! Redirecting to workspace...`);
    setTimeout(() => {
      setActiveTab('campaigns');
    }, 1200);
  };

  const handleCreateBoard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBoardTitle.trim()) return;

    const newBoard: Shortlist = {
      id: 'sl_' + Date.now(),
      name: newBoardTitle,
      category: 'General Talent',
      targetBudget: 150000,
      notes: 'Custom talent board for campaign planning',
      creatorIds: [],
      createdAt: 'Just now',
      status: 'researching'
    };

    setShortlists([...shortlists, newBoard]);
    setActiveBoardId(newBoard.id);
    setNewBoardTitle('');
    setShowNewBoardInput(false);
  };

  const handleRemoveCreatorFromBoard = (creatorId: string) => {
    if (!activeBoard) return;
    setShortlists(shortlists.map(b => {
      if (b.id !== activeBoard.id) return b;
      return {
        ...b,
        creatorIds: b.creatorIds.filter(id => id !== creatorId)
      };
    }));
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150">
      
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Talent Architecture</span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs text-zinc-400">Campaign Planning</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            TALENT BOARDS & <span className="text-emerald-500">SHORTLISTS</span>
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-0.5">
            Organize prospective creators by campaign, estimate combined reach, and export rosters.
          </p>
        </div>

        <button
          onClick={() => setShowNewBoardInput(true)}
          className="flex items-center gap-2 bg-zinc-100 text-zinc-950 px-5 py-2.5 rounded-full text-xs font-bold tracking-tight hover:bg-white transition-colors shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Talent Board</span>
        </button>
      </header>

      {/* New Board Inline Form */}
      {showNewBoardInput && (
        <form onSubmit={handleCreateBoard} className="p-5 bg-zinc-900 border border-zinc-800 rounded-[2rem] flex items-center gap-3">
          <input
            type="text"
            value={newBoardTitle}
            onChange={(e) => setNewBoardTitle(e.target.value)}
            placeholder="Board Name (e.g. 'Diwali UGC Blitz', 'B2B Tech Reviewers')..."
            className="flex-1 px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-full text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            autoFocus
          />
          <button type="submit" className="px-5 py-2.5 bg-zinc-100 text-zinc-950 text-xs font-bold rounded-full hover:bg-white transition-colors">
            Save Board
          </button>
          <button 
            type="button" 
            onClick={() => setShowNewBoardInput(false)}
            className="text-xs text-zinc-400 hover:text-zinc-200 px-2"
          >
            Cancel
          </button>
        </form>
      )}

      {/* Main Boards Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Board Switcher Bento Block */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-5 space-y-3">
          <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-2 pt-1 flex items-center justify-between">
            <span>Shortlists</span>
            <span className="text-emerald-400">{shortlists.length}</span>
          </div>

          <div className="space-y-2">
            {shortlists.map(board => {
              const isSelected = board.id === activeBoard?.id;
              return (
                <button
                  key={board.id}
                  onClick={() => setActiveBoardId(board.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    isSelected 
                      ? 'bg-zinc-950 border-emerald-500/50 shadow-sm'
                      : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="font-bold text-xs text-zinc-100">{board.name}</div>
                  <div className="text-[11px] text-zinc-500 mt-1.5 flex items-center justify-between">
                    <span>{board.creatorIds?.length || 0} creators</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 font-bold uppercase tracking-wider">{board.status}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Board Creator Grid & Summary */}
        <div className="lg:col-span-3 space-y-6">
          {activeBoard && (
            <>
              {/* Feedback notice */}
              {campaignLaunchedNotice && (
                <div className="p-4 bg-emerald-500/15 border border-emerald-500/40 rounded-2xl flex items-center gap-2.5 text-xs text-emerald-300 font-semibold">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>{campaignLaunchedNotice}</span>
                </div>
              )}

              {/* Board Analytics Banner Bento */}
              <div className="bg-zinc-900 p-6 sm:p-7 rounded-[2rem] border border-zinc-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-base font-bold text-zinc-100">{activeBoard.name}</h2>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase tracking-wider">
                      {activeBoard.status}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">{activeBoard.notes}</p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs">
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Combined Reach</div>
                      <div className="text-base font-bold text-zinc-100 mt-0.5">{formatNumber(totalCombinedAudience)}</div>
                    </div>
                    <div className="h-8 w-px bg-zinc-800" />
                    <div className="text-right">
                      <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Est. Budget</div>
                      <div className="text-base font-bold text-emerald-400 mt-0.5">{formatCurrency(estimatedTotalBudget)}</div>
                    </div>
                  </div>

                  {boardCreators.length > 0 && (
                    <button
                      onClick={handleLaunchCampaignFromBoard}
                      className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 rounded-full font-bold text-xs transition-colors shadow-sm flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 fill-zinc-950" />
                      <span>Launch Campaign</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Creators List on Board */}
              {boardCreators.length === 0 ? (
                <div className="bg-zinc-900 p-12 rounded-[2rem] border border-zinc-800 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 text-zinc-500 mx-auto flex items-center justify-center">
                    <ListFilter className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-100">Board is currently empty</h3>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                    Save creators to this board from the Discovery search page or Creator Profiles.
                  </p>
                  <button
                    onClick={() => setActiveTab('discover')}
                    className="px-5 py-2.5 bg-zinc-100 text-zinc-950 rounded-full text-xs font-bold hover:bg-white transition-colors"
                  >
                    Browse Creators
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {boardCreators.map(c => (
                    <div 
                      key={c.id} 
                      className="bg-zinc-900 p-4 sm:p-5 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
                    >
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
                          className="w-11 h-11 rounded-2xl object-cover border border-zinc-800" 
                        />
                        <div>
                          <div className="font-bold text-sm text-zinc-100">{c.name}</div>
                          <div className="text-xs text-zinc-500">{c.handle} • {c.location.city} • {c.categories[0]}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 self-end sm:self-auto">
                        <div className="text-right">
                          <div className="text-[10px] text-zinc-500 uppercase font-bold">Audience</div>
                          <div className="font-bold text-zinc-100 text-sm">{formatNumber(c.stats.totalFollowers)}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-zinc-500 uppercase font-bold">Starting Rate</div>
                          <div className="font-bold text-zinc-200 text-sm">{formatCurrency(c.pricing[0]?.priceMin || 25000)}</div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedCreatorId(c.id);
                              setActiveTab('creator_profile_view');
                            }}
                            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-750 text-zinc-200 rounded-full font-bold transition-colors"
                          >
                            Profile
                          </button>
                          <button
                            onClick={() => setInquiryModalCreator(c)}
                            className="px-4 py-2 bg-zinc-100 hover:bg-white text-zinc-950 rounded-full font-bold transition-colors shadow-sm"
                          >
                            Inquire
                          </button>
                          <button
                            onClick={() => handleRemoveCreatorFromBoard(c.id)}
                            className="p-2 text-zinc-500 hover:text-rose-400 rounded-full"
                            title="Remove from board"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

      </div>

    </div>
  );
};
