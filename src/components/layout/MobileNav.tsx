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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800 px-3 py-2 flex items-center justify-around select-none">
      {userRole === 'brand' ? (
        <>
          <button
            onClick={() => setActiveTab('discover')}
            className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors ${
              activeTab === 'discover' ? 'text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Search className="w-5 h-5" />
            <span>Discover</span>
          </button>
          <button
            onClick={() => setActiveTab('brand_dashboard')}
            className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors ${
              activeTab === 'brand_dashboard' ? 'text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors ${
              activeTab === 'campaigns' ? 'text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <FolderKanban className="w-5 h-5" />
            <span>Campaigns</span>
          </button>
          <button
            onClick={() => setActiveTab('saved_creators')}
            className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors ${
              activeTab === 'saved_creators' ? 'text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Bookmark className="w-5 h-5" />
            <span>Saved</span>
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors ${
              activeTab === 'messages' ? 'text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'
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
              activeTab === 'creator_dashboard' ? 'text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('creator_profile')}
            className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors ${
              activeTab === 'creator_profile' ? 'text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </button>
          <button
            onClick={() => setActiveTab('creator_opportunities')}
            className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors relative ${
              activeTab === 'creator_opportunities' ? 'text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Briefcase className="w-5 h-5" />
            <span>Offers</span>
            <span className="absolute -top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>
          <button
            onClick={() => setActiveTab('creator_campaigns')}
            className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors ${
              activeTab === 'creator_campaigns' ? 'text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Layers className="w-5 h-5" />
            <span>Deals</span>
          </button>
          <button
            onClick={() => setActiveTab('creator_messages')}
            className={`flex flex-col items-center gap-1 text-[10px] font-semibold transition-colors ${
              activeTab === 'creator_messages' ? 'text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'
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
