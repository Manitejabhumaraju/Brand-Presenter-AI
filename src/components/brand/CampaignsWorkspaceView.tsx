import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Campaign, Deliverable, PortfolioProject } from '../../types';
import { 
  Plus, 
  CheckCircle2, 
  ExternalLink, 
  X,
  Layers,
  FolderKanban,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Clock,
  Sparkles,
  UploadCloud,
  FileCheck,
  AlertCircle,
  Award,
  Eye,
  ArrowUpRight
} from 'lucide-react';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { PlatformBadge } from '../common/PlatformBadge';

export const CampaignsWorkspaceView: React.FC = () => {
  const {
    campaigns,
    setCampaigns,
    updateDeliverableStatus,
    userRole,
    creators,
    currentCreatorUser,
    updateCurrentCreatorUser,
    setActiveTab
  } = useApp();

  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(campaigns[0]?.id || '');
  const [workspaceTab, setWorkspaceTab] = useState<'deliverables' | 'performance'>('deliverables');
  const [newCampaignModalOpen, setNewCampaignModalOpen] = useState(false);
  
  // Deliverable Submission Modal State (for Creators)
  const [submitModalDeliverable, setSubmitModalDeliverable] = useState<Deliverable | null>(null);
  const [submittedMediaUrl, setSubmittedMediaUrl] = useState('');
  const [submittedNotes, setSubmittedNotes] = useState('');

  // Revisions Modal State (for Brands)
  const [revisionModalDeliverable, setRevisionModalDeliverable] = useState<Deliverable | null>(null);
  const [revisionFeedback, setRevisionFeedback] = useState('');

  // Portfolio publication feedback notice
  const [portfolioPublishNotice, setPortfolioPublishNotice] = useState<string | null>(null);

  // New campaign form state
  const [newTitle, setNewTitle] = useState('');
  const [newObjective, setNewObjective] = useState('Direct Conversions & Installs');
  const [newBudget, setNewBudget] = useState(150000);
  const [newDueDate, setNewDueDate] = useState('2026-10-15');
  const [newCreatorId, setNewCreatorId] = useState(creators[0]?.id || '');

  const selectedCampaign = campaigns.find(c => c.id === selectedCampaignId) || campaigns[0];

  const handleCreateNewCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const assignedCreator = creators.find(c => c.id === newCreatorId) || creators[0];
    const newCampId = 'camp_' + Date.now();
    const newCamp: Campaign = {
      id: newCampId,
      title: newTitle,
      brandName: 'Cult.fit Marketing',
      brandLogo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=120&q=80',
      objective: newObjective,
      status: 'in_progress',
      totalBudget: newBudget,
      spentBudget: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: newDueDate,
      targetPlatforms: ['instagram', 'youtube'],
      targetCategories: ['Fitness', 'Health and Wellness'],
      creatorIds: [assignedCreator.id],
      deliverables: [
        {
          id: 'del_' + Date.now(),
          campaignId: newCampId,
          creatorId: assignedCreator.id,
          creatorName: assignedCreator.name,
          payoutAmount: Math.round(newBudget * 0.4),
          title: 'Official Launch Reel + Video',
          platform: 'instagram',
          format: 'Reel (60s)',
          dueDate: newDueDate,
          status: 'pending_submission',
          creatorNotes: 'Production brief initialized'
        }
      ],
      usageRights: {
        organicUsage: true,
        paidWhitelisting: true,
        durationMonths: 12,
        territory: 'Pan-India',
        exclusivityDays: 30
      }
    };

    setCampaigns([newCamp, ...campaigns]);
    setSelectedCampaignId(newCamp.id);
    setNewCampaignModalOpen(false);
    setNewTitle('');
  };

  // Creator submits draft / media asset
  const handleCreatorSubmitAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitModalDeliverable || !submittedMediaUrl.trim()) return;

    setCampaigns(prev => prev.map(camp => {
      if (camp.id !== selectedCampaign.id) return camp;
      return {
        ...camp,
        deliverables: camp.deliverables.map(del => {
          if (del.id !== submitModalDeliverable.id) return del;
          return {
            ...del,
            status: 'in_review' as const,
            mediaUrl: submittedMediaUrl,
            creatorNotes: submittedNotes || del.creatorNotes
          };
        })
      };
    }));

    setSubmitModalDeliverable(null);
    setSubmittedMediaUrl('');
    setSubmittedNotes('');
  };

  // Brand requests revision
  const handleBrandRequestRevision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisionModalDeliverable) return;

    setCampaigns(prev => prev.map(camp => {
      if (camp.id !== selectedCampaign.id) return camp;
      return {
        ...camp,
        deliverables: camp.deliverables.map(del => {
          if (del.id !== revisionModalDeliverable.id) return del;
          return {
            ...del,
            status: 'changes_requested' as const,
            brandFeedback: revisionFeedback
          };
        })
      };
    }));

    setRevisionModalDeliverable(null);
    setRevisionFeedback('');
  };

  // Brand approves asset & releases escrow
  const handleBrandApproveDeliverable = (delivId: string) => {
    setCampaigns(prev => prev.map(camp => {
      if (camp.id !== selectedCampaign.id) return camp;
      return {
        ...camp,
        deliverables: camp.deliverables.map(del => {
          if (del.id !== delivId) return del;
          return { ...del, status: 'published' as const };
        })
      };
    }));
  };

  // Creator publishes approved deliverable to Portfolio Case Studies
  const handlePublishToPortfolio = (deliv: Deliverable) => {
    const newProject: PortfolioProject = {
      id: 'port_' + Date.now(),
      brandName: selectedCampaign.brandName,
      brandLogo: selectedCampaign.brandLogo,
      campaignName: selectedCampaign.title,
      category: 'Fitness & Lifestyle',
      platforms: [deliv.platform],
      contentFormat: deliv.format || 'Dedicated Video',
      campaignObjective: selectedCampaign.objective,
      creatorRole: 'Primary Lead Creator',
      contentUrl: deliv.mediaUrl || 'https://instagram.com/p/verified_case_study',
      publishedDate: new Date().toISOString().split('T')[0],
      reach: 142000,
      views: 98000,
      engagementRate: 6.8,
      conversions: 240,
      roi: '4.2x ROAS',
      creatorCommentary: `Delivered high-retention content for ${selectedCampaign.brandName}. The verified campaign exceeded conversion benchmarks by 28%.`,
      verifiedByBrand: true
    };

    const updatedPortfolio = [newProject, ...currentCreatorUser.portfolio];
    const updatedStats = {
      ...currentCreatorUser.stats,
      completedCampaigns: currentCreatorUser.stats.completedCampaigns + 1
    };

    updateCurrentCreatorUser({
      portfolio: updatedPortfolio,
      stats: updatedStats
    });

    setPortfolioPublishNotice(`Milestone "${deliv.title}" published to your verified Commercial Portfolio!`);
    setTimeout(() => setPortfolioPublishNotice(null), 5000);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150 text-zinc-100">
      
      {/* 1. BENTO HEADER & ACTIONS */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Milestone Management</span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs text-zinc-400">Escrow & Deliverable Status</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            CAMPAIGN <span className="text-emerald-500">WORKSPACE</span>
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-0.5">
            Full-lifecycle campaign delivery pipeline, contract milestones, escrow releases, and attribution telemetry.
          </p>
        </div>

        {userRole === 'brand' && (
          <button
            onClick={() => setNewCampaignModalOpen(true)}
            className="flex items-center gap-2 bg-zinc-100 text-zinc-950 px-5 py-2.5 rounded-full text-xs font-bold tracking-tight hover:bg-white transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Campaign</span>
          </button>
        )}
      </header>

      {/* Portfolio Publication Success Banner */}
      {portfolioPublishNotice && (
        <div className="p-4 bg-emerald-500/15 border border-emerald-500/40 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-emerald-300">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="font-semibold">{portfolioPublishNotice}</span>
          </div>
          <button
            onClick={() => setActiveTab('creator_portfolio')}
            className="px-4 py-2 bg-emerald-500 text-zinc-950 font-bold rounded-full text-xs hover:bg-emerald-400 transition-colors shrink-0"
          >
            View in Commercial Profile →
          </button>
        </div>
      )}

      {/* 2. CAMPAIGN SELECTOR & PIPELINE BENTO GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left List of Campaigns Bento Block */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-5 space-y-3">
          <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-2 pt-1 flex items-center justify-between">
            <span>Active Deals</span>
            <span className="text-emerald-400">{campaigns.length}</span>
          </div>

          <div className="space-y-2">
            {campaigns.map(camp => {
              const isSelected = camp.id === selectedCampaignId;
              return (
                <button
                  key={camp.id}
                  onClick={() => setSelectedCampaignId(camp.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-zinc-950 border-emerald-500/50 shadow-sm'
                      : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-zinc-100 truncate max-w-[140px]">{camp.title}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      camp.status === 'active' || camp.status === 'in_progress' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-zinc-800 text-zinc-300'
                    }`}>
                      {camp.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-1.5">
                    Budget: {formatCurrency(camp.totalBudget)} • {camp.creatorIds?.length || 0} Creators
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Detail Pane */}
        <div className="lg:col-span-3 space-y-6">
          {selectedCampaign && (
            <>
              {/* Campaign Overview Bento Card */}
              <div className="bg-zinc-900 p-6 sm:p-7 rounded-[2rem] border border-zinc-800 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
                  <div className="flex items-center gap-3.5">
                    <img 
                      src={selectedCampaign.brandLogo} 
                      alt={selectedCampaign.brandName} 
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.onerror = null;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedCampaign.brandName)}&background=2563eb&color=fff&bold=true`;
                      }}
                      className="w-13 h-13 rounded-2xl object-cover border border-zinc-800" 
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-zinc-100">{selectedCampaign.title}</h2>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold uppercase tracking-wider">
                          {selectedCampaign.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="text-xs text-zinc-400 mt-1">
                        {selectedCampaign.brandName} • Objective: {selectedCampaign.objective}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-xs">
                    <div>
                      <div className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Total Budget</div>
                      <div className="font-bold text-zinc-100 text-base mt-0.5">{formatCurrency(selectedCampaign.totalBudget)}</div>
                    </div>
                    <div>
                      <div className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Committed / Spent</div>
                      <div className="font-bold text-emerald-400 text-base mt-0.5">{formatCurrency(selectedCampaign.spentBudget)}</div>
                    </div>
                  </div>
                </div>

                {/* Platforms & Timeline */}
                <div className="flex items-center gap-3 text-xs flex-wrap pt-1">
                  <span className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">Platforms:</span>
                  {(selectedCampaign.targetPlatforms || ['instagram', 'youtube']).map(p => (
                    <PlatformBadge key={p} platform={p} showName size="sm" />
                  ))}
                  <span className="text-zinc-400 ml-2">Timeline: {selectedCampaign.startDate} to {selectedCampaign.endDate}</span>
                  <span className="text-emerald-400 font-semibold ml-auto">
                    {selectedCampaign.usageRights.durationMonths} Months Usage Rights ({selectedCampaign.usageRights.territory})
                  </span>
                </div>
              </div>

              {/* Sub-Tabs: Deliverables vs Performance */}
              <div className="flex items-center gap-2 border-b border-zinc-800 pb-2 text-xs font-bold">
                <button
                  onClick={() => setWorkspaceTab('deliverables')}
                  className={`px-4 py-2 rounded-full transition-colors flex items-center gap-2 ${
                    workspaceTab === 'deliverables'
                      ? 'bg-zinc-100 text-zinc-950 font-black'
                      : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Deliverables Pipeline ({selectedCampaign.deliverables?.length || 0})</span>
                </button>
                <button
                  onClick={() => setWorkspaceTab('performance')}
                  className={`px-4 py-2 rounded-full transition-colors flex items-center gap-2 ${
                    workspaceTab === 'performance'
                      ? 'bg-zinc-100 text-zinc-950 font-black'
                      : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Performance & Attribution</span>
                </button>
              </div>

              {/* VIEW 1: DELIVERABLES PIPELINE */}
              {workspaceTab === 'deliverables' && (
                <div className="bg-zinc-900 p-6 sm:p-7 rounded-[2rem] border border-zinc-800 shadow-sm space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                      Milestone Deliverables Tracker
                    </h3>
                    <span className="text-xs text-zinc-500">Escrow released upon post publication</span>
                  </div>

                  <div className="space-y-3">
                    {(selectedCampaign.deliverables?.length || 0) === 0 ? (
                      <div className="p-8 text-center text-zinc-500 text-xs">
                        No deliverables added yet. Contract creators to populate the pipeline.
                      </div>
                    ) : (
                      (selectedCampaign.deliverables || []).map(deliv => (
                        <div key={deliv.id} className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 hover:border-zinc-700 transition-colors">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <PlatformBadge platform={deliv.platform} size="sm" />
                              <div>
                                <div className="font-bold text-xs sm:text-sm text-zinc-100">
                                  {deliv.title} ({deliv.format})
                                </div>
                                <div className="text-xs text-zinc-500 mt-0.5 flex items-center gap-2 flex-wrap">
                                  <span>Due: <strong className="text-zinc-300">{deliv.dueDate}</strong></span>
                                  {deliv.payoutAmount && (
                                    <>
                                      <span>•</span>
                                      <span className="text-emerald-400 font-bold">{formatCurrency(deliv.payoutAmount)} Escrow</span>
                                    </>
                                  )}
                                  {deliv.creatorNotes && <span className="italic text-zinc-400">• Note: {deliv.creatorNotes}</span>}
                                </div>
                              </div>
                            </div>

                            {/* Actions & Status */}
                            <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
                              {/* Status Badge */}
                              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                                deliv.status === 'published' 
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                  : deliv.status === 'in_review' || deliv.status === 'review'
                                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                  : deliv.status === 'approved'
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                                  : deliv.status === 'changes_requested'
                                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                                  : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                              }`}>
                                {deliv.status.replace('_', ' ')}
                              </span>

                              {/* Creator Action: Submit Media Asset */}
                              {userRole === 'creator' && (deliv.status === 'pending_submission' || deliv.status === 'in_progress' || deliv.status === 'draft' || deliv.status === 'changes_requested') && (
                                <button
                                  onClick={() => {
                                    setSubmitModalDeliverable(deliv);
                                    setSubmittedMediaUrl(deliv.mediaUrl || '');
                                    setSubmittedNotes(deliv.creatorNotes || '');
                                  }}
                                  className="px-3.5 py-1.5 bg-zinc-100 hover:bg-white text-zinc-950 font-bold rounded-full text-xs transition-colors shadow-sm flex items-center gap-1.5"
                                >
                                  <UploadCloud className="w-3.5 h-3.5" />
                                  <span>Submit Asset</span>
                                </button>
                              )}

                              {/* Brand Actions when In Review */}
                              {userRole === 'brand' && (deliv.status === 'in_review' || deliv.status === 'review') && (
                                <>
                                  <button
                                    onClick={() => handleBrandApproveDeliverable(deliv.id)}
                                    className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold rounded-full text-xs transition-colors shadow-sm flex items-center gap-1.5"
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span>Approve & Release Escrow</span>
                                  </button>
                                  <button
                                    onClick={() => {
                                      setRevisionModalDeliverable(deliv);
                                      setRevisionFeedback(deliv.brandFeedback || '');
                                    }}
                                    className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-750 text-rose-300 rounded-full text-xs font-semibold border border-zinc-700"
                                  >
                                    Request Changes
                                  </button>
                                </>
                              )}

                              {/* Creator Action: Publish Completed Deliverable to Portfolio */}
                              {userRole === 'creator' && (deliv.status === 'published' || deliv.status === 'approved') && (
                                <button
                                  onClick={() => handlePublishToPortfolio(deliv)}
                                  className="px-3.5 py-1.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25 font-bold rounded-full text-xs transition-colors flex items-center gap-1.5"
                                >
                                  <Award className="w-3.5 h-3.5" />
                                  <span>Add to Case Studies</span>
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Media URL display if uploaded */}
                          {deliv.mediaUrl && (
                            <div className="p-3 rounded-xl bg-zinc-900 border border-emerald-500/30 text-xs flex items-center justify-between text-emerald-400">
                              <span className="font-medium flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Attached Creative Asset:</span>
                              </span>
                              <a 
                                href={deliv.mediaUrl} 
                                target="_blank" 
                                rel="noreferrer"
                                className="font-bold underline flex items-center gap-1 hover:text-emerald-300"
                              >
                                <span>Inspect Live Asset</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          )}

                          {/* Brand revision feedback notice if exists */}
                          {deliv.brandFeedback && deliv.status === 'changes_requested' && (
                            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold">Requested Revisions:</span>
                                <p className="mt-0.5 text-zinc-300">{deliv.brandFeedback}</p>
                              </div>
                            </div>
                          )}

                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* VIEW 2: PERFORMANCE & ROI ATTRIBUTION */}
              {workspaceTab === 'performance' && (
                <div className="space-y-6">
                  {/* Performance KPI Bento Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-zinc-900 p-5 rounded-[2rem] border border-zinc-800 space-y-2">
                      <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Blended Campaign ROAS</div>
                      <div className="text-3xl font-black text-emerald-400">4.2x</div>
                      <div className="text-[11px] text-zinc-400">+18% above D2C fitness median</div>
                    </div>

                    <div className="bg-zinc-900 p-5 rounded-[2rem] border border-zinc-800 space-y-2">
                      <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Total Verified Reach</div>
                      <div className="text-3xl font-black text-zinc-100">840,000</div>
                      <div className="text-[11px] text-emerald-400 font-semibold">100% human telemetry</div>
                    </div>

                    <div className="bg-zinc-900 p-5 rounded-[2rem] border border-zinc-800 space-y-2">
                      <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Attributed Signups</div>
                      <div className="text-3xl font-black text-zinc-100">3,420</div>
                      <div className="text-[11px] text-zinc-400">₹43.80 CAC per customer</div>
                    </div>

                    <div className="bg-zinc-900 p-5 rounded-[2rem] border border-zinc-800 space-y-2">
                      <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Engagement Rate</div>
                      <div className="text-3xl font-black text-emerald-400">6.4%</div>
                      <div className="text-[11px] text-zinc-400">54,200 comments & shares</div>
                    </div>
                  </div>

                  {/* Creator Performance Attribution Leaderboard */}
                  <div className="bg-zinc-900 p-6 sm:p-7 rounded-[2rem] border border-zinc-800 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                        Creator Attribution & ROI Leaderboard
                      </h3>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase">Audited In Real-Time</span>
                    </div>

                    <div className="space-y-3 text-xs">
                      {[
                        { name: 'Aarav Mehta', handle: '@aarav.creates', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80', reach: '420,000', views: '290,000', eng: '7.4%', signups: 1840, roas: '4.8x', payout: '₹55,000' },
                        { name: 'Rohan Sen', handle: '@rohan_sen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80', reach: '280,000', views: '180,000', eng: '6.1%', signups: 980, roas: '3.9x', payout: '₹45,000' },
                        { name: 'Priya Verma', handle: '@priya_tech', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80', reach: '140,000', views: '95,000', eng: '5.8%', signups: 600, roas: '3.4x', payout: '₹35,000' }
                      ].map((c, i) => (
                        <div key={i} className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
                              className="w-10 h-10 rounded-2xl object-cover border border-zinc-800" 
                            />
                            <div>
                              <div className="font-bold text-sm text-zinc-100">{c.name}</div>
                              <div className="text-zinc-500 text-xs">{c.handle}</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 text-right">
                            <div>
                              <div className="text-[10px] text-zinc-500 uppercase">Verified Views</div>
                              <div className="font-bold text-zinc-100">{c.views}</div>
                            </div>
                            <div>
                              <div className="text-[10px] text-zinc-500 uppercase">Engagement</div>
                              <div className="font-bold text-emerald-400">{c.eng}</div>
                            </div>
                            <div>
                              <div className="text-[10px] text-zinc-500 uppercase">Attributed ROAS</div>
                              <div className="font-bold text-emerald-300">{c.roas}</div>
                            </div>
                            <div className="hidden sm:block">
                              <div className="text-[10px] text-zinc-500 uppercase">Escrow Settlement</div>
                              <div className="font-bold text-zinc-200">{c.payout} (Released)</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </>
          )}
        </div>

      </div>

      {/* MODAL 1: CREATOR SUBMIT DELIVERABLE ASSET */}
      {submitModalDeliverable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-zinc-900 rounded-[2rem] shadow-2xl border border-zinc-800 overflow-hidden text-zinc-100">
            <div className="px-6 py-5 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UploadCloud className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-zinc-100">Submit Media Deliverable</h3>
              </div>
              <button onClick={() => setSubmitModalDeliverable(null)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatorSubmitAsset} className="p-6 space-y-4 text-xs">
              <div>
                <div className="text-xs font-bold text-zinc-300 mb-1">Target Deliverable</div>
                <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200">
                  {submitModalDeliverable.title} ({submitModalDeliverable.format})
                </div>
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Asset Link (Google Drive, Instagram Draft, or Unlisted YouTube)</label>
                <input
                  type="url"
                  value={submittedMediaUrl}
                  onChange={(e) => setSubmittedMediaUrl(e.target.value)}
                  placeholder="https://drive.google.com/file/d/... or https://youtube.com/watch?v=..."
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Production Notes for Brand Review</label>
                <textarea
                  rows={3}
                  value={submittedNotes}
                  onChange={(e) => setSubmittedNotes(e.target.value)}
                  placeholder="e.g. Color grade approved. Added link sticker to first 5 seconds as requested in brief."
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-3 border-t border-zinc-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSubmitModalDeliverable(null)}
                  className="px-4 py-2 text-zinc-400 hover:text-zinc-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold rounded-full transition-colors shadow-sm"
                >
                  Submit for Brand Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: BRAND REQUEST REVISION */}
      {revisionModalDeliverable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-zinc-900 rounded-[2rem] shadow-2xl border border-zinc-800 overflow-hidden text-zinc-100">
            <div className="px-6 py-5 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <h3 className="text-sm font-bold text-zinc-100">Request Deliverable Changes</h3>
              </div>
              <button onClick={() => setRevisionModalDeliverable(null)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBrandRequestRevision} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Feedback & Modification Guidance</label>
                <textarea
                  rows={4}
                  value={revisionFeedback}
                  onChange={(e) => setRevisionFeedback(e.target.value)}
                  placeholder="e.g. Please increase volume on vocal track at 0:22 and make the discount code graphic stay on screen for 4 seconds."
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  required
                />
              </div>

              <div className="pt-3 border-t border-zinc-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setRevisionModalDeliverable(null)}
                  className="px-4 py-2 text-zinc-400 hover:text-zinc-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-rose-500 hover:bg-rose-400 text-white font-bold rounded-full transition-colors shadow-sm"
                >
                  Send Feedback to Creator
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE NEW CAMPAIGN MODAL (BENTO THEMED) */}
      {newCampaignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-zinc-900 rounded-[2rem] shadow-2xl border border-zinc-800 overflow-hidden text-zinc-100">
            <div className="px-6 py-5 bg-zinc-950 border-b border-zinc-800 text-white flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-100">Create New Creator Campaign Brief</h3>
              <button onClick={() => setNewCampaignModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewCampaign} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Campaign Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Festive Diwali D2C Fitness Blitz"
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Assigned Creator</label>
                <select
                  value={newCreatorId}
                  onChange={(e) => setNewCreatorId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200"
                  required
                >
                  {creators.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.handle})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Primary Objective</label>
                <select
                  value={newObjective}
                  onChange={(e) => setNewObjective(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200"
                >
                  <option value="Direct Conversions & Installs">Direct Conversions & Installs</option>
                  <option value="Brand Reach & Buzz">Mass Reach & Video Impressions</option>
                  <option value="Performance UGC Ads">High-Retention UGC Ad Creatives</option>
                  <option value="Product Review Blitz">Product Unboxing & Review Blitz</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Total Budget (₹ INR)</label>
                  <input
                    type="number"
                    step="10000"
                    value={newBudget}
                    onChange={(e) => setNewBudget(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Target End Date</label>
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setNewCampaignModalOpen(false)}
                  className="px-4 py-2 text-zinc-400 hover:text-zinc-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 font-bold rounded-full transition-colors shadow-sm"
                >
                  Initialize Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
