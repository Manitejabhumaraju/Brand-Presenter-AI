import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { BrandLogo } from '../common/BrandLogo';
import { 
  Search, 
  Bell, 
  MessageSquare, 
  Scale, 
  ShieldCheck, 
  ChevronDown, 
  Check, 
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
    <header className="sticky top-0 z-40 w-full bg-[#080C14]/92 backdrop-blur-2xl border-b border-slate-800/80 text-slate-100 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Official Brand Logo & Tag */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => setActiveTab(userRole === 'creator' ? 'creator_dashboard' : userRole === 'admin' ? 'admin_overview' : userRole === 'public' ? 'public_home' : 'discover')}
            className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 rounded-xl"
            aria-label="Brand Presenter AI Home"
          >
            <BrandLogo variant="header" />
          </button>
        </div>

        {/* Global Search Bar (Trigger Cmd+K Palette) */}
        <div className="flex-1 max-w-md hidden md:block">
          <button 
            onClick={() => setGlobalSearchOpen(true)}
            className="w-full flex items-center justify-between px-4 py-2 text-xs bg-slate-900/90 hover:bg-slate-850 hover:border-slate-700 text-slate-400 border border-slate-800/90 rounded-full transition-all group shadow-inner"
          >
            <div className="flex items-center gap-2.5 text-slate-400 group-hover:text-slate-200">
              <Search className="w-3.5 h-3.5 text-blue-400" />
              <span>Search creators, verified reach, niches...</span>
            </div>
            <kbd className="hidden lg:inline-flex items-center gap-0.5 text-[10px] font-mono px-2 py-0.5 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-600/15 via-purple-600/15 to-pink-600/15 text-blue-300 border border-blue-500/30 hover:border-blue-400 transition-all shadow-sm"
            >
              <Scale className="w-3.5 h-3.5 text-blue-400" />
              <span>Compare</span>
              <span className="px-1.5 py-0.2 rounded-full bg-blue-600 text-white font-bold text-[10px]">
                {(compareCreatorIds || []).length}
              </span>
            </button>
          )}

          {/* Quick Messages */}
          <button
            onClick={() => setActiveTab(userRole === 'creator' ? 'creator_messages' : 'messages')}
            className="relative p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/80 border border-transparent hover:border-slate-700/80 rounded-full transition-colors"
            title="Messages"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] ring-2 ring-[#080C14]" />
          </button>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/80 border border-transparent hover:border-slate-700/80 rounded-full transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifications > 0 && (
                <span className="absolute top-1 right-1 px-1 min-w-3.5 h-3.5 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 text-white font-bold text-[9px] flex items-center justify-center shadow-[0_0_8px_rgba(236,72,153,0.8)]">
                  {unreadNotifications}
                </span>
              )}
            </button>

            {/* Notifications Dropdown Panel */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Events & Alerts</span>
                    {unreadNotifications > 0 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30">
                        {unreadNotifications} new
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={markAllNotificationsRead}
                      className="text-xs text-blue-400 hover:text-blue-300 font-medium"
                    >
                      Mark read
                    </button>
                    <button 
                      onClick={() => setNotificationsOpen(false)}
                      className="p-1 text-slate-500 hover:text-slate-200"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-slate-800/80 max-h-80 overflow-y-auto">
                  {notifications.map(n => (
                    <div key={n.id} className={`p-3.5 text-xs hover:bg-slate-800/50 transition-colors ${!n.read ? 'bg-slate-800/30' : ''}`}>
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-slate-200">{n.title}</span>
                        <span className="text-[10px] text-slate-500 shrink-0">{n.time}</span>
                      </div>
                      <p className="text-slate-400 mt-1 leading-relaxed">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="h-5 w-px bg-slate-800 mx-1 hidden sm:block" />

          {/* Role Mode Switcher */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-200 transition-all shadow-sm"
            >
              <div className="flex items-center gap-1.5">
                {userRole === 'brand' && <Building2 className="w-3.5 h-3.5 text-blue-400" />}
                {userRole === 'creator' && <UserCheck className="w-3.5 h-3.5 text-purple-400" />}
                {userRole === 'admin' && <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />}
                {userRole === 'public' && <Compass className="w-3.5 h-3.5 text-cyan-400" />}
                <span className="font-semibold">
                  {userRole === 'brand' ? 'Brand Mode' : userRole === 'creator' ? 'Creator Mode' : userRole === 'admin' ? 'Admin Center' : 'Public Portal'}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {roleMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-1.5 z-50">
                <div className="px-3 py-2 border-b border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Workspace Environment
                </div>

                <div className="py-1 space-y-1">
                  <button
                    onClick={() => handleRoleSelect('brand')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                      userRole === 'brand' ? 'bg-slate-800 text-blue-400 font-semibold border border-slate-700' : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                        <Building2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left">
                        <div>Brand / Agency</div>
                        <div className="text-[10px] text-slate-500 font-normal">Discover, Shortlist & Hire</div>
                      </div>
                    </div>
                    {userRole === 'brand' && <Check className="w-4 h-4 text-blue-400" />}
                  </button>

                  <button
                    onClick={() => handleRoleSelect('creator')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                      userRole === 'creator' ? 'bg-slate-800 text-purple-400 font-semibold border border-slate-700' : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
                        <UserCheck className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left">
                        <div>Creator / Freelancer</div>
                        <div className="text-[10px] text-slate-500 font-normal">Analytics, Deliverables & Rates</div>
                      </div>
                    </div>
                    {userRole === 'creator' && <Check className="w-4 h-4 text-purple-400" />}
                  </button>

                  <button
                    onClick={() => handleRoleSelect('admin')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                      userRole === 'admin' ? 'bg-slate-800 text-orange-400 font-semibold border border-slate-700' : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center border border-orange-500/20">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left">
                        <div>Admin Command</div>
                        <div className="text-[10px] text-slate-500 font-normal">Platform Health, Audit & Safety</div>
                      </div>
                    </div>
                    {userRole === 'admin' && <Check className="w-4 h-4 text-orange-400" />}
                  </button>

                  <button
                    onClick={() => handleRoleSelect('public')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                      userRole === 'public' ? 'bg-slate-800 text-cyan-400 font-semibold border border-slate-700' : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
                        <Compass className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left">
                        <div>Public Marketplace</div>
                        <div className="text-[10px] text-slate-500 font-normal">Talent Roster & Pricing</div>
                      </div>
                    </div>
                    {userRole === 'public' && <Check className="w-4 h-4 text-cyan-400" />}
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
                className="w-8 h-8 rounded-full object-cover border border-slate-700"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-[#080C14]" />
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
