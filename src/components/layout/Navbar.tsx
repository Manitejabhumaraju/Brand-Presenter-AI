import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { 
  Search, 
  Bell, 
  MessageSquare, 
  Scale, 
  ShieldCheck, 
  ChevronDown, 
  Check, 
  Sparkles,
  Building2,
  UserCheck,
  Compass,
  X
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    userRole, 
    setUserRole, 
    setActiveTab, 
    compareCreatorIds, 
    setIsCompareOpen, 
    setGlobalSearchOpen,
    notifications,
    notificationsOpen,
    setNotificationsOpen,
    markAllNotificationsRead,
    currentCreatorUser
  } = useApp();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const unreadNotifications = (notifications || []).filter(n => !n.read).length;

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    setRoleMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/80 text-zinc-100 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Tag */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => setActiveTab(userRole === 'creator' ? 'creator_dashboard' : userRole === 'admin' ? 'admin_overview' : userRole === 'public' ? 'public_home' : 'discover')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-9 h-9 rounded-2xl bg-zinc-900 border border-zinc-800 group-hover:border-emerald-500/40 flex items-center justify-center text-emerald-400 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm tracking-tight text-zinc-100 group-hover:text-emerald-400 transition-colors">
                  VOUCH<span className="text-emerald-500">MARK</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  CORE
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold hidden sm:block">
                Creator Intelligence & Escrow
              </p>
            </div>
          </button>
        </div>

        {/* Global Search Bar (Trigger Cmd+K Palette) */}
        <div className="flex-1 max-w-md hidden md:block">
          <button 
            onClick={() => setGlobalSearchOpen(true)}
            className="w-full flex items-center justify-between px-4 py-2 text-xs bg-zinc-900 hover:bg-zinc-850 hover:border-zinc-700 text-zinc-400 border border-zinc-800 rounded-full transition-all group"
          >
            <div className="flex items-center gap-2.5 text-zinc-400 group-hover:text-zinc-200">
              <Search className="w-3.5 h-3.5 text-emerald-500" />
              <span>Search creators, neural filters, campaigns...</span>
            </div>
            <kbd className="hidden lg:inline-flex items-center gap-0.5 text-[10px] font-mono px-2 py-0.5 bg-zinc-800 text-zinc-300 rounded-full border border-zinc-700">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Controls: Compare, Messages, Notifications, Role Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Compare Creators Pill Button */}
          {(compareCreatorIds || []).length > 0 && (
            <button 
              onClick={() => setIsCompareOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Compare</span>
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-500 text-zinc-950 font-bold text-[10px]">
                {(compareCreatorIds || []).length}
              </span>
            </button>
          )}

          {/* Quick Messages */}
          <button
            onClick={() => setActiveTab(userRole === 'creator' ? 'creator_messages' : 'messages')}
            className="relative p-2.5 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 rounded-full transition-colors"
            title="Messages"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] ring-2 ring-zinc-950" />
          </button>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2.5 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 rounded-full transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifications > 0 && (
                <span className="absolute top-1 right-1 px-1 min-w-3.5 h-3.5 rounded-full bg-emerald-500 text-zinc-950 font-bold text-[9px] flex items-center justify-center shadow-[0_0_8px_rgba(16,185,129,0.8)]">
                  {unreadNotifications}
                </span>
              )}
            </button>

            {/* Notifications Dropdown Panel */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Events & Alerts</span>
                    {unreadNotifications > 0 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                        {unreadNotifications} new
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={markAllNotificationsRead}
                      className="text-xs text-emerald-400 hover:text-emerald-300 font-medium"
                    >
                      Mark read
                    </button>
                    <button 
                      onClick={() => setNotificationsOpen(false)}
                      className="p-1 text-zinc-500 hover:text-zinc-200"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-zinc-800/80 max-h-80 overflow-y-auto">
                  {notifications.map(n => (
                    <div key={n.id} className={`p-3.5 text-xs hover:bg-zinc-800/50 transition-colors ${!n.read ? 'bg-zinc-800/25' : ''}`}>
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-zinc-200">{n.title}</span>
                        <span className="text-[10px] text-zinc-500 shrink-0">{n.time}</span>
                      </div>
                      <p className="text-zinc-400 mt-1 leading-relaxed">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="h-5 w-px bg-zinc-800 mx-1 hidden sm:block" />

          {/* Role Mode Switcher */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-xs font-medium text-zinc-200 transition-all shadow-sm"
            >
              <div className="flex items-center gap-1.5">
                {userRole === 'brand' && <Building2 className="w-3.5 h-3.5 text-emerald-400" />}
                {userRole === 'creator' && <UserCheck className="w-3.5 h-3.5 text-emerald-400" />}
                {userRole === 'admin' && <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />}
                {userRole === 'public' && <Compass className="w-3.5 h-3.5 text-zinc-400" />}
                <span className="font-semibold">
                  {userRole === 'brand' ? 'Brand Mode' : userRole === 'creator' ? 'Creator Mode' : userRole === 'admin' ? 'Admin Center' : 'Public Portal'}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
            </button>

            {roleMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-1.5 z-50">
                <div className="px-3 py-2 border-b border-zinc-800 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  Workspace Environment
                </div>

                <div className="py-1 space-y-1">
                  <button
                    onClick={() => handleRoleSelect('brand')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                      userRole === 'brand' ? 'bg-zinc-800 text-emerald-400 font-semibold border border-zinc-700' : 'text-zinc-300 hover:bg-zinc-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                        <Building2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left">
                        <div>Brand / Agency</div>
                        <div className="text-[10px] text-zinc-500 font-normal">Discover, Shortlist & Hire</div>
                      </div>
                    </div>
                    {userRole === 'brand' && <Check className="w-4 h-4 text-emerald-400" />}
                  </button>

                  <button
                    onClick={() => handleRoleSelect('creator')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                      userRole === 'creator' ? 'bg-zinc-800 text-emerald-400 font-semibold border border-zinc-700' : 'text-zinc-300 hover:bg-zinc-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                        <UserCheck className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left">
                        <div>Creator / Freelancer</div>
                        <div className="text-[10px] text-zinc-500 font-normal">Analytics, Deliverables & Rates</div>
                      </div>
                    </div>
                    {userRole === 'creator' && <Check className="w-4 h-4 text-emerald-400" />}
                  </button>

                  <button
                    onClick={() => handleRoleSelect('admin')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                      userRole === 'admin' ? 'bg-zinc-800 text-emerald-400 font-semibold border border-zinc-700' : 'text-zinc-300 hover:bg-zinc-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left">
                        <div>Admin Command</div>
                        <div className="text-[10px] text-zinc-500 font-normal">Platform Health, Audit & Safety</div>
                      </div>
                    </div>
                    {userRole === 'admin' && <Check className="w-4 h-4 text-emerald-400" />}
                  </button>

                  <button
                    onClick={() => handleRoleSelect('public')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                      userRole === 'public' ? 'bg-zinc-800 text-emerald-400 font-semibold border border-zinc-700' : 'text-zinc-300 hover:bg-zinc-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-zinc-800 text-zinc-400 flex items-center justify-center">
                        <Compass className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left">
                        <div>Public Marketplace</div>
                        <div className="text-[10px] text-zinc-500 font-normal">Talent Roster & Pricing</div>
                      </div>
                    </div>
                    {userRole === 'public' && <Check className="w-4 h-4 text-emerald-400" />}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar with fast status */}
          <div className="flex items-center gap-2 pl-1">
            <div className="relative">
              <img 
                src={userRole === 'creator' ? currentCreatorUser.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'} 
                alt="Avatar" 
                className="w-8 h-8 rounded-full object-cover border border-zinc-700"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-zinc-950" />
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
