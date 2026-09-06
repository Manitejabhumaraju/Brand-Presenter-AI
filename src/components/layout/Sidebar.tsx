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
  const { userRole, activeTab, setActiveTab, setUserRole, setConnectPlatformModalOpen } = useApp();

  const renderNavGroup = (title: string, items: { id: string; label: string; icon: React.ReactNode; badge?: string }[]) => (
    <div className="mb-6">
      <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
        {title}
      </div>
      <div className="space-y-1">
        {items.map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600/15 via-purple-600/10 to-transparent text-white border border-blue-500/30 shadow-[0_2px_12px_rgba(37,99,235,0.12)] font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <span className={isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}>
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-2 py-0.5 font-bold rounded-full ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30' 
                    : 'bg-slate-800 text-slate-400 border border-slate-700/60'
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
    <aside className="w-64 shrink-0 hidden md:block bg-[#080C14]/75 backdrop-blur-xl border-r border-slate-800/80 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto p-4 select-none">
      
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
          <div className="mt-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Sync Platform</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Import verified metrics from YouTube, Instagram, or TikTok.
            </p>
            <button
              onClick={() => setConnectPlatformModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-full text-xs font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all shadow-md shadow-blue-600/20"
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
        <div className="mb-6">
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Public Marketplace
          </div>
          <div className="space-y-1">
            <button
              onClick={() => setActiveTab('public_home')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'public_home'
                  ? 'bg-gradient-to-r from-blue-600/15 via-purple-600/10 to-transparent text-white border border-blue-500/30 shadow-[0_2px_12px_rgba(37,99,235,0.12)] font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 border border-transparent'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Marketplace Home</span>
            </button>
            {/* Entering the directory as a public visitor means committing to Brand mode - so the
                sidebar/nav and the discovery view's actions (Inquire, Save, etc.) stay consistent,
                the same way the landing page's own "Explore Marketplace as Brand" CTA behaves. */}
            <button
              onClick={() => {
                setUserRole('brand');
                setActiveTab('discover');
              }}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 border border-transparent"
            >
              <Search className="w-4 h-4" />
              <span>Creator Directory</span>
            </button>
            <button
              onClick={() => setActiveTab('public_pricing')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'public_pricing'
                  ? 'bg-gradient-to-r from-blue-600/15 via-purple-600/10 to-transparent text-white border border-blue-500/30 shadow-[0_2px_12px_rgba(37,99,235,0.12)] font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 border border-transparent'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>Pricing Plans</span>
            </button>
          </div>
        </div>
      )}

    </aside>
  );
};
