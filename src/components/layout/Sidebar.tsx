import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Search, 
  User, 
  BarChart3, 
  Share2, 
  FolderKanban, 
  DollarSign, 
  Briefcase, 
  MessageSquare, 
  Eye, 
  ShieldCheck, 
  Lock, 
  Bookmark, 
  ListFilter, 
  Layers, 
  FileText, 
  TrendingUp, 
  Users, 
  Activity, 
  AlertTriangle, 
  History, 
  CheckCircle2,
  Sparkles,
  PlusCircle
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { userRole, activeTab, setActiveTab, setConnectPlatformModalOpen } = useApp();

  const renderNavGroup = (title: string, items: { id: string; label: string; icon: React.ReactNode; badge?: string }[]) => (
    <div className="mb-6">
      <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
        {title}
      </div>
      <div className="space-y-1">
        {items.map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-zinc-900 text-emerald-400 border border-zinc-700/80 shadow-[0_0_12px_rgba(16,185,129,0.1)] font-semibold'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <span className={isActive ? 'text-emerald-400' : 'text-zinc-500 group-hover:text-zinc-300'}>
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-2 py-0.5 font-bold rounded-full ${
                  isActive 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'bg-zinc-800 text-zinc-400 border border-zinc-700/50'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <aside className="w-64 shrink-0 hidden md:block bg-zinc-950/40 border-r border-zinc-800/80 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto p-4 select-none">
      
      {/* CREATOR VIEW SIDEBAR */}
      {userRole === 'creator' && (
        <>
          {renderNavGroup('Creator Workspace', [
            { id: 'creator_dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
            { id: 'creator_onboarding', label: 'Onboarding Wizard', icon: <Sparkles className="w-4 h-4" />, badge: 'Setup' },
            { id: 'creator_profile', label: 'Commercial Profile', icon: <User className="w-4 h-4" />, badge: '96%' },
            { id: 'creator_analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'creator_platforms', label: 'Connected Accounts', icon: <Share2 className="w-4 h-4" />, badge: '3' },
            { id: 'creator_portfolio', label: 'Case Studies', icon: <FolderKanban className="w-4 h-4" /> },
            { id: 'creator_pricing', label: 'Rates & Benchmarks', icon: <DollarSign className="w-4 h-4" /> }
          ])}

          {renderNavGroup('Commercial Deals', [
            { id: 'creator_opportunities', label: 'Opportunities', icon: <Briefcase className="w-4 h-4" />, badge: '4 New' },
            { id: 'creator_campaigns', label: 'Active Campaigns', icon: <Layers className="w-4 h-4" />, badge: '2' },
            { id: 'creator_messages', label: 'Messages', icon: <MessageSquare className="w-4 h-4" />, badge: '1' },
            { id: 'creator_profile_views', label: 'Profile Views', icon: <Eye className="w-4 h-4" />, badge: '+18%' }
          ])}

          {renderNavGroup('Trust & Controls', [
            { id: 'creator_verification', label: 'Verification Center', icon: <ShieldCheck className="w-4 h-4" />, badge: 'Verified' },
            { id: 'creator_privacy', label: 'Privacy & Rates', icon: <Lock className="w-4 h-4" /> }
          ])}

          {/* Quick Action Bento Card to Connect Platform */}
          <div className="mt-4 p-4 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sync Platform</span>
            </div>
            <p className="text-[11px] text-zinc-500 leading-relaxed">
              Import verified metrics from YouTube, Instagram, or TikTok.
            </p>
            <button
              onClick={() => setConnectPlatformModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-full text-xs font-bold bg-zinc-100 hover:bg-white text-zinc-950 transition-colors shadow-sm"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Connect Account</span>
            </button>
          </div>
        </>
      )}

      {/* BRAND VIEW SIDEBAR */}
      {userRole === 'brand' && (
        <>
          {renderNavGroup('Discovery & Intelligence', [
            { id: 'discover', label: 'Discover Creators', icon: <Search className="w-4 h-4" /> },
            { id: 'brand_dashboard', label: 'Brand Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
            { id: 'saved_creators', label: 'Saved Creators', icon: <Bookmark className="w-4 h-4" />, badge: '3' },
            { id: 'shortlists', label: 'Shortlists & Boards', icon: <ListFilter className="w-4 h-4" />, badge: '3' },
            { id: 'saved_searches', label: 'Saved AI Searches', icon: <Sparkles className="w-4 h-4" />, badge: '14 new' }
          ])}

          {renderNavGroup('Campaign Execution', [
            { id: 'campaigns', label: 'Campaigns Workspace', icon: <FolderKanban className="w-4 h-4" />, badge: '3 Active' },
            { id: 'messages', label: 'Messages & Inquiries', icon: <MessageSquare className="w-4 h-4" />, badge: '1' },
            { id: 'proposals', label: 'Proposals & Contracts', icon: <FileText className="w-4 h-4" /> },
            { id: 'pricing_benchmarks', label: 'Market Benchmarks', icon: <TrendingUp className="w-4 h-4" /> }
          ])}

          {renderNavGroup('Organization', [
            { id: 'brand_settings', label: 'Company Profile', icon: <Users className="w-4 h-4" /> },
            { id: 'brand_verification', label: 'Brand Verification', icon: <ShieldCheck className="w-4 h-4" />, badge: 'Active' }
          ])}
        </>
      )}

      {/* ADMIN VIEW SIDEBAR */}
      {userRole === 'admin' && (
        <>
          {renderNavGroup('Command Center', [
            { id: 'admin_overview', label: 'Platform Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
            { id: 'admin_platforms', label: 'API Integrations', icon: <Activity className="w-4 h-4" />, badge: '1 Degraded' },
            { id: 'admin_moderation', label: 'Moderation & Safety', icon: <AlertTriangle className="w-4 h-4" />, badge: '3 Pending' },
            { id: 'admin_audit_logs', label: 'Security & Audit Logs', icon: <History className="w-4 h-4" /> },
            { id: 'admin_data_quality', label: 'Data Freshness', icon: <CheckCircle2 className="w-4 h-4" /> }
          ])}
        </>
      )}

      {/* PUBLIC VIEW SIDEBAR */}
      {userRole === 'public' && (
        <>
          {renderNavGroup('Public Marketplace', [
            { id: 'public_home', label: 'Marketplace Home', icon: <Sparkles className="w-4 h-4" /> },
            { id: 'discover', label: 'Creator Directory', icon: <Search className="w-4 h-4" /> },
            { id: 'public_pricing', label: 'Pricing Plans', icon: <DollarSign className="w-4 h-4" /> }
          ])}
        </>
      )}

    </aside>
  );
};
