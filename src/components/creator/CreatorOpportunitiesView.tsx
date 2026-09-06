import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Briefcase, 
  CheckCircle2, 
  MessageSquare, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  ArrowUpRight,
  ExternalLink,
  Layers,
  DollarSign
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { PlatformBadge } from '../common/PlatformBadge';
import { Campaign, Deliverable } from '../../types';

export const CreatorOpportunitiesView: React.FC = () => {
  const { 
    conversations, 
    setActiveConversationId, 
    setActiveTab, 
    campaigns, 
    setCampaigns,
    currentCreatorUser
  } = useApp();

  const [acceptedNotice, setAcceptedNotice] = useState<string | null>(null);

  // Initial opportunities synthesized from conversations and inbound inquiries
  const [opportunities, setOpportunities] = useState([
    {
      id: 'opp_1',
      brandName: 'Cult.fit Marketing',
      brandLogo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=120&q=80',
      campaignTitle: 'Festive D2C Fitness Launch',
      platform: 'instagram' as const,
      deliverables: '1x Dedicated 60s 4K Reel + 2x Story Set with link sticker',
      budget: 55000,
      dueDate: '2026-10-10',
      objective: 'High-Retention App Installs & Trial Signups',
      usageRights: '90-day Meta Spark Ads Whitelisting + Organic Permanent',
      status: 'pending',
      receivedTime: '2 hours ago',
      matchScore: 98,
      convoId: 'conv_1'
    },
    {
      id: 'opp_2',
      brandName: 'Postman Developer Relations',
      brandLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
      campaignTitle: 'API Workspace Architecture Breakdown',
      platform: 'youtube' as const,
      deliverables: '1x Dedicated 8-10 min Technical Workflow Deep Dive',
      budget: 85000,
      dueDate: '2026-10-24',
      objective: 'Developer Trial Activations & API Adoption',
      usageRights: 'Global digital distribution rights (12 months)',
      status: 'pending',
      receivedTime: 'Yesterday',
      matchScore: 94,
      convoId: 'conv_2'
    },
    {
      id: 'opp_3',
      brandName: 'Minimalist Skincare',
      brandLogo: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=120&q=80',
      campaignTitle: 'Clean Chemistry Everyday Routine',
      platform: 'instagram' as const,
      deliverables: '2x High-retention Reel UGC + 1x Carousel Breakdown',
      budget: 45000,
      dueDate: '2026-10-18',
      objective: 'Brand Authenticity & Product Trust',
      usageRights: 'Organic channel posting + 30-day Paid Ad Whitelisting',
      status: 'pending',
      receivedTime: '3 days ago',
      matchScore: 91,
      convoId: 'conv_1'
    }
  ]);

  const handleAcceptOffer = (opp: typeof opportunities[0]) => {
    // 1. Create contracted campaign
    const newDeliverable: Deliverable = {
      id: 'del_' + Date.now(),
      campaignId: 'camp_contract_' + Date.now(),
      creatorId: currentCreatorUser.id,
      creatorName: currentCreatorUser.name,
      payoutAmount: opp.budget,
      title: opp.deliverables,
      platform: opp.platform,
      format: 'Contracted Deliverable',
      dueDate: opp.dueDate,
      status: 'pending_submission',
      creatorNotes: 'Contract initialized via Inbound Opportunity'
    };

    const newContractedCampaign: Campaign = {
      id: 'camp_contract_' + Date.now(),
      title: opp.campaignTitle,
      brandName: opp.brandName,
      brandLogo: opp.brandLogo,
      objective: opp.objective,
      status: 'in_progress',
      totalBudget: opp.budget,
      spentBudget: opp.budget,
      startDate: new Date().toISOString().split('T')[0],
      endDate: opp.dueDate,
      targetPlatforms: [opp.platform],
      targetCategories: ['Technology', 'Lifestyle'],
      creatorIds: [currentCreatorUser.id],
      deliverables: [newDeliverable],
      usageRights: {
        organicUsage: true,
        paidWhitelisting: true,
        durationMonths: 12,
        territory: 'Global',
        exclusivityDays: 30
      }
    };

    setCampaigns([newContractedCampaign, ...campaigns]);
    setOpportunities(prev => prev.filter(o => o.id !== opp.id));
    setAcceptedNotice(`Offer from ${opp.brandName} accepted! Milestone contract generated in your Campaigns Workspace with escrow locked.`);
  };

  const handleDecline = (oppId: string) => {
    setOpportunities(prev => prev.filter(o => o.id !== oppId));
  };

  const handleOpenChat = (convoId?: string) => {
    if (convoId) {
      setActiveConversationId(convoId);
    }
    setActiveTab('creator_messages');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150 text-zinc-100">
      
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Deal Flow Intelligence</span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs text-zinc-400">Inbound Brand Offers & Escrow Inquiries</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            BRAND <span className="text-emerald-500">OPPORTUNITIES</span>
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-0.5">
            Review commercial proposals sent directly to your verified media kit. Accept to lock escrow or open terms negotiation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Accepting Q4 Deals</span>
          </div>
        </div>
      </header>

      {/* Accepted Notice Feedback Banner */}
      {acceptedNotice && (
        <div className="p-4 bg-emerald-500/15 border border-emerald-500/40 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-emerald-300">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="font-medium">{acceptedNotice}</span>
          </div>
          <button
            onClick={() => setActiveTab('creator_campaigns')}
            className="px-4 py-2 bg-emerald-500 text-zinc-950 font-bold rounded-full text-xs hover:bg-emerald-400 transition-colors shrink-0"
          >
            Go to Campaign Workspace →
          </button>
        </div>
      )}

      {/* Opportunities List Bento */}
      {opportunities.length === 0 ? (
        <div className="bg-zinc-900 p-12 rounded-[2rem] border border-zinc-800 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-zinc-800 text-zinc-500 mx-auto flex items-center justify-center">
            <Briefcase className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-zinc-100">No pending inquiries</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            All brand inquiries have been addressed. Ensure your rate card and platforms are synced to attract new sponsors.
          </p>
          <button
            onClick={() => setActiveTab('creator_profile')}
            className="px-5 py-2.5 bg-zinc-100 text-zinc-950 rounded-full text-xs font-bold hover:bg-white transition-colors"
          >
            Review Commercial Profile
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {opportunities.map(opp => (
            <div 
              key={opp.id} 
              className="bg-zinc-900 rounded-[2rem] border border-zinc-800 hover:border-zinc-700 transition-all p-6 sm:p-7 space-y-5 shadow-sm"
            >
              {/* Top Details */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
                <div className="flex items-start gap-4">
                  <img 
                    src={opp.brandLogo} 
                    alt={opp.brandName} 
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(opp.brandName)}&background=2563eb&color=fff&bold=true`;
                    }}
                    className="w-12 h-12 rounded-2xl object-cover border border-zinc-800 bg-zinc-950" 
                  />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-base text-zinc-100">{opp.campaignTitle}</h3>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase tracking-wider flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Verified Brand</span>
                      </span>
                    </div>
                    <div className="text-xs text-zinc-400 mt-1 flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-zinc-300">{opp.brandName}</span>
                      <span>•</span>
                      <span>Received {opp.receivedTime}</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-bold">{opp.matchScore}% Match Index</span>
                    </div>
                  </div>
                </div>

                {/* Offer Compensation */}
                <div className="text-left sm:text-right">
                  <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Offered Compensation</div>
                  <div className="text-2xl font-black text-emerald-400 mt-0.5">{formatCurrency(opp.budget)}</div>
                  <div className="text-[10px] text-zinc-500">Milestone Escrow Ready</div>
                </div>
              </div>

              {/* Scope & Terms Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3.5 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-1">
                  <div className="text-[10px] uppercase font-bold text-zinc-500">Deliverables Required</div>
                  <div className="font-semibold text-zinc-200 flex items-center gap-2">
                    <PlatformBadge platform={opp.platform} size="sm" />
                    <span>{opp.deliverables}</span>
                  </div>
                </div>

                <div className="p-3.5 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-1">
                  <div className="text-[10px] uppercase font-bold text-zinc-500">Objective & Deadline</div>
                  <div className="font-semibold text-zinc-200">{opp.objective}</div>
                  <div className="text-[11px] text-zinc-500">Target Delivery: <strong className="text-zinc-300">{opp.dueDate}</strong></div>
                </div>

                <div className="p-3.5 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-1">
                  <div className="text-[10px] uppercase font-bold text-zinc-500">Usage Rights & Whitelisting</div>
                  <div className="font-semibold text-zinc-300">{opp.usageRights}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <Clock className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Accepting locks funds in escrow prior to draft production</span>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={() => handleDecline(opp.id)}
                    className="px-4 py-2.5 text-xs font-semibold text-zinc-400 hover:text-rose-400 transition-colors"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => handleOpenChat(opp.convoId)}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-750 text-zinc-200 rounded-full font-bold text-xs transition-colors border border-zinc-700"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Negotiate in Chat</span>
                  </button>
                  <button
                    onClick={() => handleAcceptOffer(opp)}
                    className="flex items-center gap-1.5 px-5 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 rounded-full font-bold text-xs transition-colors shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Accept Offer & Contract</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
