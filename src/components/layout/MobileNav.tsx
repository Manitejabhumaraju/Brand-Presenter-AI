import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  LayoutDashboard, 
  FolderKanban, 
  MessageSquare, 
  User, 
  Bookmark,
  Layers,
  Briefcase
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { userRole, activeTab, setActiveTab } = useApp();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#080C14]/95 backdrop-blur-2xl border-t border-slate-800/90 px-3 py-2 flex items-center justify-around select-none">
      {userRole === 'brand' ? (
        <>
          <button
            onClick={() => setActiveTab('discover')}
            className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors ${
              activeTab === 'discover' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Search className="w-5 h-5" />
            <span>Discover</span>
          </button>
          <button
            onClick={() => setActiveTab('brand_dashboard')}
            className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors ${
              activeTab === 'brand_dashboard' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors ${
              activeTab === 'campaigns' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FolderKanban className="w-5 h-5" />
            <span>Campaigns</span>
          </button>
          <button
            onClick={() => setActiveTab('saved_creators')}
            className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors ${
              activeTab === 'saved_creators' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bookmark className="w-5 h-5" />
            <span>Saved</span>
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors ${
              activeTab === 'messages' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>Messages</span>
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => setActiveTab('creator_dashboard')}
            className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors ${
              activeTab === 'creator_dashboard' ? 'text-purple-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('creator_profile')}
            className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors ${
              activeTab === 'creator_profile' ? 'text-purple-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </button>
          <button
            onClick={() => setActiveTab('creator_opportunities')}
            className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors relative ${
              activeTab === 'creator_opportunities' ? 'text-purple-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Briefcase className="w-5 h-5" />
            <span>Offers</span>
            <span className="absolute -top-1 right-1 w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
          </button>
          <button
            onClick={() => setActiveTab('creator_campaigns')}
            className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors ${
              activeTab === 'creator_campaigns' ? 'text-purple-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-5 h-5" />
            <span>Deals</span>
          </button>
          <button
            onClick={() => setActiveTab('creator_messages')}
            className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors ${
              activeTab === 'creator_messages' ? 'text-purple-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>Messages</span>
          </button>
        </>
      )}
    </nav>
  );
};
