import React, { createContext, useContext, useState, useEffect } from 'react';
import { Creator, Campaign, Shortlist, SavedSearch, Conversation, UserRole, Deliverable, PlatformType, CreatorType } from '../types';
import { mockCreators } from '../data/mockCreators';
import { mockCampaigns, mockShortlists, mockSavedSearches, mockConversations } from '../data/mockBrands';

interface AppContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  creators: Creator[];
  selectedCreatorId: string;
  setSelectedCreatorId: (id: string) => void;
  selectedCreator: Creator;
  compareCreatorIds: string[];
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;
  savedCreatorIds: string[];
  toggleSaveCreator: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  // Marketplace Discovery Filters
  selectedPlatforms: PlatformType[];
  setSelectedPlatforms: React.Dispatch<React.SetStateAction<PlatformType[]>>;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCreatorTypes: CreatorType[];
  setSelectedCreatorTypes: React.Dispatch<React.SetStateAction<CreatorType[]>>;
  minFollowers: number;
  setMinFollowers: React.Dispatch<React.SetStateAction<number>>;
  maxPrice: number;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
  minEngagement: number;
  setMinEngagement: React.Dispatch<React.SetStateAction<number>>;
  selectedLocation: string;
  setSelectedLocation: React.Dispatch<React.SetStateAction<string>>;
  verifiedOnly: boolean;
  setVerifiedOnly: React.Dispatch<React.SetStateAction<boolean>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  resetFilters: () => void;
  activeFilterCount: number;
  campaigns: Campaign[];
  setCampaigns: React.Dispatch<React.SetStateAction<Campaign[]>>;
  activeCampaignId: string | null;
  setActiveCampaignId: (id: string | null) => void;
  updateDeliverableStatus: (campaignId: string, deliverableId: string, newStatus: Deliverable['status']) => void;
  shortlists: Shortlist[];
  setShortlists: React.Dispatch<React.SetStateAction<Shortlist[]>>;
  savedSearches: SavedSearch[];
  setSavedSearches: React.Dispatch<React.SetStateAction<SavedSearch[]>>;
  conversations: Conversation[];
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  sendMessage: (convId: string, text: string) => void;
  currentCreatorUser: Creator;
  updateCurrentCreatorUser: (updates: Partial<Creator>) => void;
  explainMatchCreator: Creator | null;
  setExplainMatchCreator: (c: Creator | null) => void;
  inquiryModalCreator: Creator | null;
  setInquiryModalCreator: (c: Creator | null) => void;
  connectPlatformModalOpen: boolean;
  setConnectPlatformModalOpen: (open: boolean) => void;
  globalSearchOpen: boolean;
  setGlobalSearchOpen: (open: boolean) => void;
  notificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;
  notifications: Array<{ id: string; title: string; desc: string; time: string; read: boolean; type: string }>;
  markAllNotificationsRead: () => void;
  handleCreateInquiry: (creatorId: string, brief: { title: string; budget: number; objective: string; deliverables: string; platform: string }) => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('brand_presenter_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  const setTheme = (newTheme: 'dark' | 'light') => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('brand_presenter_theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      document.documentElement.classList.toggle('theme-light', newTheme === 'light');
      document.documentElement.classList.toggle('light', newTheme === 'light');
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.classList.toggle('theme-light', theme === 'light');
      document.documentElement.classList.toggle('light', theme === 'light');
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);

  const [userRole, setUserRoleState] = useState<UserRole>('brand');
  const [activeTab, setActiveTab] = useState<string>('discover');
  const [creators, setCreators] = useState<Creator[]>(mockCreators);
  const [selectedCreatorId, setSelectedCreatorId] = useState<string>('c1');
  const [compareCreatorIds, setCompareCreatorIds] = useState<string[]>(['c1', 'c2']);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);
  const [savedCreatorIds, setSavedCreatorIds] = useState<string[]>(['c1', 'c2', 'c3']);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Marketplace Discovery Filters
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformType[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCreatorTypes, setSelectedCreatorTypes] = useState<CreatorType[]>([]);
  const [minFollowers, setMinFollowers] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [minEngagement, setMinEngagement] = useState<number>(0);
  const [selectedLocation, setSelectedLocation] = useState<string>('All Locations');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('ai_score');

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedPlatforms([]);
    setSelectedCategories([]);
    setSelectedCreatorTypes([]);
    setMinFollowers(0);
    setMaxPrice(1000000);
    setMinEngagement(0);
    setSelectedLocation('All Locations');
    setVerifiedOnly(false);
    setSortBy('ai_score');
  };

  const activeFilterCount = [
    (selectedPlatforms || []).length > 0,
    (selectedCategories || []).length > 0,
    (selectedCreatorTypes || []).length > 0,
    minFollowers > 0,
    maxPrice < 1000000,
    minEngagement > 0,
    selectedLocation !== 'All Locations',
    verifiedOnly
  ].filter(Boolean).length;

  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [activeCampaignId, setActiveCampaignId] = useState<string | null>('camp_1');
  const [shortlists, setShortlists] = useState<Shortlist[]>(mockShortlists);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>(mockSavedSearches);
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>('conv_1');
  const [currentCreatorUserId, setCurrentCreatorUserId] = useState<string>('c1');

  // Modals state
  const [explainMatchCreator, setExplainMatchCreator] = useState<Creator | null>(null);
  const [inquiryModalCreator, setInquiryModalCreator] = useState<Creator | null>(null);
  const [connectPlatformModalOpen, setConnectPlatformModalOpen] = useState<boolean>(false);
  const [globalSearchOpen, setGlobalSearchOpen] = useState<boolean>(false);
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);

  const [notifications, setNotifications] = useState([
    { id: 'n1', title: 'New Campaign Invitation', desc: 'Postman sent you an inquiry for API Microservices breakdown', time: '10m ago', read: false, type: 'campaign' },
    { id: 'n2', title: 'Instagram Metrics Synced', desc: 'Successfully imported 145K reel reach metrics (Fresh)', time: '2h ago', read: false, type: 'sync' },
    { id: 'n3', title: '14 Brands Viewed Profile', desc: 'Boat Lifestyle, Cult.fit, and Minimalist checked your media kit', time: '4h ago', read: true, type: 'view' },
    { id: 'n4', title: 'Pricing Benchmark Alert', desc: 'Reel rates in Technology category increased by 8.4% in India', time: 'Yesterday', read: true, type: 'pricing' }
  ]);

  const setUserRole = (role: UserRole) => {
    setUserRoleState(role);
    if (role === 'creator') {
      setActiveTab('creator_dashboard');
    } else if (role === 'brand') {
      setActiveTab('discover');
    } else if (role === 'admin') {
      setActiveTab('admin_overview');
    } else if (role === 'public') {
      setActiveTab('public_home');
    }
  };

  const selectedCreator = creators.find(c => c.id === selectedCreatorId) || creators[0];
  const currentCreatorUser = creators.find(c => c.id === currentCreatorUserId) || creators[0];

  const addToCompare = (id: string) => {
    if (!compareCreatorIds.includes(id)) {
      if (compareCreatorIds.length >= 4) {
        setCompareCreatorIds([...compareCreatorIds.slice(1), id]);
      } else {
        setCompareCreatorIds([...compareCreatorIds, id]);
      }
    }
    setIsCompareOpen(true);
  };

  const removeFromCompare = (id: string) => {
    setCompareCreatorIds(compareCreatorIds.filter(cid => cid !== id));
  };

  const clearCompare = () => {
    setCompareCreatorIds([]);
    setIsCompareOpen(false);
  };

  const toggleSaveCreator = (id: string) => {
    if (savedCreatorIds.includes(id)) {
      setSavedCreatorIds(savedCreatorIds.filter(sid => sid !== id));
    } else {
      setSavedCreatorIds([...savedCreatorIds, id]);
    }
  };

  const updateDeliverableStatus = (campaignId: string, deliverableId: string, newStatus: Deliverable['status']) => {
    setCampaigns(prev => prev.map(camp => {
      if (camp.id !== campaignId) return camp;
      return {
        ...camp,
        deliverables: camp.deliverables.map(del => {
          if (del.id !== deliverableId) return del;
          return { ...del, status: newStatus };
        })
      };
    }));
  };

  const updateCurrentCreatorUser = (updates: Partial<Creator>) => {
    setCreators(prev => prev.map(c => {
      if (c.id !== currentCreatorUserId) return c;
      return { ...c, ...updates };
    }));
  };

  const sendMessage = (convId: string, text: string) => {
    if (!text.trim()) return;
    const isSenderBrand = userRole === 'brand' || userRole === 'admin';
    const newMsg = {
      id: 'msg_' + Date.now(),
      senderId: isSenderBrand ? 'brand_active' : currentCreatorUser.id,
      senderName: isSenderBrand ? 'Verified Brand Team' : currentCreatorUser.name,
      senderRole: (isSenderBrand ? 'brand' : 'creator') as 'brand' | 'creator',
      text,
      timestamp: 'Just now'
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id !== convId) return conv;
      return {
        ...conv,
        lastMessage: text,
        lastTimestamp: 'Just now',
        messages: [...conv.messages, newMsg]
      };
    }));
  };

  const handleCreateInquiry = (creatorId: string, brief: { title: string; budget: number; objective: string; deliverables: string; platform: string }) => {
    const creator = creators.find(c => c.id === creatorId);
    if (!creator) return;

    const newConvId = 'conv_' + Date.now();
    const newConv: Conversation = {
      id: newConvId,
      creatorId: creator.id,
      brandId: 'brand_current',
      brandName: 'Vouchmark Verified Partner',
      creatorName: creator.name,
      creatorHandle: creator.handle,
      campaignTitle: brief.title,
      lastMessage: `Campaign Inquiry sent: ${brief.title} (₹${brief.budget.toLocaleString('en-IN')})`,
      lastTimestamp: 'Just now',
      unreadCount: 0,
      status: 'inquiry',
      messages: [
        {
          id: 'msg_init_' + Date.now(),
          senderId: 'brand_current',
          senderName: 'Vouchmark Verified Partner',
          senderRole: 'brand',
          text: `Hello ${creator.name}! We would like to invite you to collaborate on our upcoming campaign: "${brief.title}". Objective: ${brief.objective}. Deliverables: ${brief.deliverables}. Budget: ₹${brief.budget.toLocaleString('en-IN')}.`,
          timestamp: 'Just now',
          attachment: {
            type: 'brief',
            title: brief.title,
            budget: brief.budget,
            deliverables: [brief.deliverables]
          }
        }
      ]
    };

    setConversations([newConv, ...conversations]);
    setActiveConversationId(newConvId);
    setActiveTab(userRole === 'creator' ? 'creator_messages' : 'messages');
    setInquiryModalCreator(null);
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        activeTab,
        setActiveTab,
        creators,
        selectedCreatorId,
        setSelectedCreatorId,
        selectedCreator,
        compareCreatorIds,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isCompareOpen,
        setIsCompareOpen,
        savedCreatorIds,
        toggleSaveCreator,
        searchQuery,
        setSearchQuery,
        selectedPlatforms,
        setSelectedPlatforms,
        selectedCategories,
        setSelectedCategories,
        selectedCreatorTypes,
        setSelectedCreatorTypes,
        minFollowers,
        setMinFollowers,
        maxPrice,
        setMaxPrice,
        minEngagement,
        setMinEngagement,
        selectedLocation,
        setSelectedLocation,
        verifiedOnly,
        setVerifiedOnly,
        sortBy,
        setSortBy,
        resetFilters,
        activeFilterCount,
        campaigns,
        setCampaigns,
        activeCampaignId,
        setActiveCampaignId,
        updateDeliverableStatus,
        shortlists,
        setShortlists,
        savedSearches,
        setSavedSearches,
        conversations,
        setConversations,
        activeConversationId,
        setActiveConversationId,
        sendMessage,
        currentCreatorUser,
        updateCurrentCreatorUser,
        explainMatchCreator,
        setExplainMatchCreator,
        inquiryModalCreator,
        setInquiryModalCreator,
        connectPlatformModalOpen,
        setConnectPlatformModalOpen,
        globalSearchOpen,
        setGlobalSearchOpen,
        notificationsOpen,
        setNotificationsOpen,
        notifications,
        markAllNotificationsRead,
        handleCreateInquiry,
        theme,
        setTheme,
        toggleTheme
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
