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
  X,
  Sun,
  Moon
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
    currentCreatorUser,
    theme,
    toggleTheme
  } = useApp();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const unreadNotifications = (notifications || []).filter(n => !n.read).length;

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    setRoleMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-40 w-full backdrop-blur-2xl border-b select-none transition-colors ${
      theme === 'light' 
        ? 'bg-white/95 border-slate-200 text-slate-900 shadow-xs' 
        : 'bg-[#080C14]/92 border-slate-800/80 text-slate-100'
    }`}>
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
            className={`w-full flex items-center justify-between px-4 py-2 text-xs rounded-full transition-all group border ${
              theme === 'light'
                ? 'bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-500 border-slate-200 shadow-xs'
                : 'bg-slate-900/90 hover:bg-slate-850 hover:border-slate-700 text-slate-400 border border-slate-800/90 shadow-inner'
            }`}
          >
            <div className={`flex items-center gap-2.5 ${theme === 'light' ? 'text-slate-500 group-hover:text-slate-800' : 'text-slate-400 group-hover:text-slate-200'}`}>
              <Search className="w-3.5 h-3.5 text-blue-500" />
              <span>Search creators, verified reach, niches...</span>
            </div>
            <kbd className={`hidden lg:inline-flex items-center gap-0.5 text-[10px] font-mono px-2 py-0.5 rounded-full border ${
              theme === 'light'
                ? 'bg-white text-slate-600 border-slate-200'
                : 'bg-slate-800 text-slate-300 border-slate-700'
            }`}>
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
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border shadow-xs ${
                theme === 'light'
                  ? 'bg-blue-50 hover:bg-blue-100/90 text-blue-700 border-blue-200 hover:border-blue-300'
                  : 'bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 text-blue-300 border-blue-500/30 hover:border-blue-400'
              }`}
            >
              <Scale className={`w-3.5 h-3.5 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`} />
              <span>Compare</span>
              <span className={`px-1.5 py-0.2 rounded-full font-bold text-[10px] ${
                theme === 'light' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
              }`}>
                {(compareCreatorIds || []).length}
              </span>
            </button>
          )}

          {/* Quick Messages */}
          <button
            onClick={() => setActiveTab(userRole === 'creator' ? 'creator_messages' : 'messages')}
            className={`relative p-2.5 rounded-full border transition-colors ${
              theme === 'light'
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-transparent hover:border-slate-200'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/80 border-transparent hover:border-slate-700/80'
            }`}
            title="Messages"
          >
            <MessageSquare className="w-4 h-4" />
            <span className={`absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] ring-2 ${
              theme === 'light' ? 'ring-white' : 'ring-[#080C14]'
            }`} />
          </button>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className={`relative p-2.5 rounded-full border transition-colors ${
                theme === 'light'
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-transparent hover:border-slate-200'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80 border-transparent hover:border-slate-700/80'
              }`}
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
              <div className={`absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border shadow-2xl z-50 overflow-hidden ${
                theme === 'light' ? 'bg-white border-slate-200 shadow-xl' : 'bg-slate-900 border-slate-800 shadow-2xl'
              }`}>
                <div className={`px-4 py-3 border-b flex items-center justify-between ${
                  theme === 'light' ? 'border-slate-100' : 'border-slate-800'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold uppercase tracking-widest ${
                      theme === 'light' ? 'text-slate-500' : 'text-slate-400'
                    }`}>Events & Alerts</span>
                    {unreadNotifications > 0 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-500 font-bold border border-blue-500/30">
                        {unreadNotifications} new
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={markAllNotificationsRead}
                      className="text-xs text-blue-500 hover:text-blue-600 font-medium"
                    >
                      Mark read
                    </button>
                    <button 
                      onClick={() => setNotificationsOpen(false)}
                      className={`p-1 ${theme === 'light' ? 'text-slate-400 hover:text-slate-700' : 'text-slate-500 hover:text-slate-200'}`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className={`divide-y max-h-80 overflow-y-auto ${
                  theme === 'light' ? 'divide-slate-100' : 'divide-slate-800/80'
                }`}>
                  {notifications.map(n => (
                    <div key={n.id} className={`p-3.5 text-xs transition-colors ${
                      theme === 'light'
                        ? !n.read ? 'bg-blue-50/50 hover:bg-blue-50' : 'hover:bg-slate-50'
                        : !n.read ? 'bg-slate-800/30 hover:bg-slate-800/50' : 'hover:bg-slate-800/50'
                    }`}>
                      <div className="flex items-start justify-between gap-2">
                        <span className={`font-semibold ${theme === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>{n.title}</span>
                        <span className={`text-[10px] shrink-0 ${theme === 'light' ? 'text-slate-400' : 'text-slate-500'}`}>{n.time}</span>
                      </div>
                      <p className={`mt-1 leading-relaxed ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle (Small Logo / Icon Only) */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'bright' : 'dark'} theme`}
            title={`Switch to ${theme === 'dark' ? 'Bright Theme (Light)' : 'Dark Theme (Executive)'}`}
            className={`p-2.5 rounded-full border transition-all ${
              theme === 'light'
                ? 'text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100/80 border-amber-200 shadow-xs'
                : 'text-slate-400 hover:text-white bg-slate-900/90 hover:bg-slate-800 border-slate-800 hover:border-slate-700'
            }`}
          >
            {theme === 'light' ? (
              <Sun className="w-4 h-4 text-amber-600 animate-in spin-in-90 duration-200" />
            ) : (
              <Moon className="w-4 h-4 text-blue-400 animate-in spin-in-90 duration-200" />
            )}
          </button>

          <div className={`h-5 w-px mx-1 hidden sm:block ${theme === 'light' ? 'bg-slate-200' : 'bg-slate-800'}`} />

          {/* Role Mode Switcher */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all shadow-xs ${
                theme === 'light'
                  ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                  : 'bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200'
              }`}
            >
              <div className="flex items-center gap-1.5">
                {userRole === 'brand' && <Building2 className="w-3.5 h-3.5 text-blue-500" />}
                {userRole === 'creator' && <UserCheck className="w-3.5 h-3.5 text-purple-500" />}
                {userRole === 'admin' && <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />}
                {userRole === 'public' && <Compass className="w-3.5 h-3.5 text-cyan-500" />}
                <span className="font-semibold">
                  {userRole === 'brand' ? 'Brand Mode' : userRole === 'creator' ? 'Creator Mode' : userRole === 'admin' ? 'Admin Center' : 'Public Portal'}
                </span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 ${theme === 'light' ? 'text-slate-400' : 'text-slate-500'}`} />
            </button>

            {roleMenuOpen && (
              <div className={`absolute right-0 mt-2 w-64 rounded-2xl border shadow-2xl p-1.5 z-50 ${
                theme === 'light' ? 'bg-white border-slate-200 shadow-xl' : 'bg-slate-900 border-slate-800 shadow-2xl'
              }`}>
                <div className={`px-3 py-2 border-b text-[10px] font-bold uppercase tracking-widest ${
                  theme === 'light' ? 'border-slate-100 text-slate-400' : 'border-slate-800 text-slate-500'
                }`}>
                  Workspace Environment
                </div>

                <div className="py-1 space-y-1">
                  <button
                    onClick={() => handleRoleSelect('brand')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                      userRole === 'brand' 
                        ? theme === 'light' ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200' : 'bg-slate-800 text-blue-400 font-semibold border border-slate-700'
                        : theme === 'light' ? 'text-slate-700 hover:bg-slate-50' : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center border border-blue-500/20">
                        <Building2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left">
                        <div>Brand / Agency</div>
                        <div className={`text-[10px] font-normal ${theme === 'light' ? 'text-slate-500' : 'text-slate-500'}`}>Discover, Shortlist & Hire</div>
                      </div>
                    </div>
                    {userRole === 'brand' && <Check className="w-4 h-4 text-blue-500" />}
                  </button>

                  <button
                    onClick={() => handleRoleSelect('creator')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                      userRole === 'creator' 
                        ? theme === 'light' ? 'bg-purple-50 text-purple-700 font-semibold border border-purple-200' : 'bg-slate-800 text-purple-400 font-semibold border border-slate-700'
                        : theme === 'light' ? 'text-slate-700 hover:bg-slate-50' : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center border border-purple-500/20">
                        <UserCheck className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left">
                        <div>Creator / Freelancer</div>
                        <div className={`text-[10px] font-normal ${theme === 'light' ? 'text-slate-500' : 'text-slate-500'}`}>Analytics, Deliverables & Rates</div>
                      </div>
                    </div>
                    {userRole === 'creator' && <Check className="w-4 h-4 text-purple-500" />}
                  </button>

                  <button
                    onClick={() => handleRoleSelect('admin')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                      userRole === 'admin' 
                        ? theme === 'light' ? 'bg-orange-50 text-orange-700 font-semibold border border-orange-200' : 'bg-slate-800 text-orange-400 font-semibold border border-slate-700'
                        : theme === 'light' ? 'text-slate-700 hover:bg-slate-50' : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center border border-orange-500/20">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left">
                        <div>Admin Command</div>
                        <div className={`text-[10px] font-normal ${theme === 'light' ? 'text-slate-500' : 'text-slate-500'}`}>Platform Health, Audit & Safety</div>
                      </div>
                    </div>
                    {userRole === 'admin' && <Check className="w-4 h-4 text-orange-500" />}
                  </button>

                  <button
                    onClick={() => handleRoleSelect('public')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                      userRole === 'public' 
                        ? theme === 'light' ? 'bg-cyan-50 text-cyan-700 font-semibold border border-cyan-200' : 'bg-slate-800 text-cyan-400 font-semibold border border-slate-700'
                        : theme === 'light' ? 'text-slate-700 hover:bg-slate-50' : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center border border-cyan-500/20">
                        <Compass className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left">
                        <div>Public Marketplace</div>
                        <div className={`text-[10px] font-normal ${theme === 'light' ? 'text-slate-500' : 'text-slate-500'}`}>Talent Roster & Pricing</div>
                      </div>
                    </div>
                    {userRole === 'public' && <Check className="w-4 h-4 text-cyan-500" />}
                  </button>
                </div>

                {/* Appearance Theme Selector */}
                <div className={`mt-1 pt-2 border-t px-1 ${theme === 'light' ? 'border-slate-100' : 'border-slate-800'}`}>
                  <div className={`text-[10px] font-bold uppercase tracking-widest px-2 pb-1.5 flex items-center justify-between ${
                    theme === 'light' ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    <span>Appearance</span>
                    <span className="text-[9px] text-blue-500 lowercase">{theme} theme</span>
                  </div>
                  <div className={`grid grid-cols-2 gap-1 p-1 rounded-xl border ${
                    theme === 'light' ? 'bg-slate-100/70 border-slate-200' : 'bg-slate-950/80 border-slate-800/80'
                  }`}>
                    <button
                      onClick={() => toggleTheme()}
                      className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        theme === 'light'
                          ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Sun className="w-3 h-3 text-amber-500" />
                      <span>Bright</span>
                    </button>
                    <button
                      onClick={() => toggleTheme()}
                      className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        theme === 'dark'
                          ? 'bg-slate-800 text-white shadow-xs border border-slate-700'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Moon className="w-3 h-3 text-blue-400" />
                      <span>Dark</span>
                    </button>
                  </div>
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
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.onerror = null;
                  target.src = `https://ui-avatars.com/api/?name=Executive+User&background=2563eb&color=fff&bold=true`;
                }}
                className={`w-8 h-8 rounded-full object-cover border ${
                  theme === 'light' ? 'border-slate-300' : 'border-slate-700'
                }`}
              />
              <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 ${
                theme === 'light' ? 'border-white' : 'border-[#080C14]'
              }`} />
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
