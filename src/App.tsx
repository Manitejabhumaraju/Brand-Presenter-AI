import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';

// Views
import { DiscoveryView } from './components/brand/DiscoveryView';
import { CreatorProfileView } from './components/creator/CreatorProfileView';
import { BrandDashboardView } from './components/brand/BrandDashboardView';
import { CampaignsWorkspaceView } from './components/brand/CampaignsWorkspaceView';
import { MessagingView } from './components/common/MessagingView';
import { ShortlistsView } from './components/brand/ShortlistsView';
import { SavedSearchesView } from './components/brand/SavedSearchesView';
import { CreatorDashboardView } from './components/creator/CreatorDashboardView';
import { AdminCenterView } from './components/admin/AdminCenterView';
import { PublicLandingView } from './components/public/PublicLandingView';
import { CreatorOpportunitiesView } from './components/creator/CreatorOpportunitiesView';
import { CreatorOnboardingWizard } from './components/creator/CreatorOnboardingWizard';
import { BrandVerificationView } from './components/brand/BrandVerificationView';
import { MarketBenchmarksView } from './components/brand/MarketBenchmarksView';

// Modals
import { CommandPaletteModal } from './components/modals/CommandPaletteModal';
import { ExplainMatchModal } from './components/modals/ExplainMatchModal';
import { InquiryModal } from './components/modals/InquiryModal';
import { CompareModal } from './components/modals/CompareModal';
import { ConnectPlatformModal } from './components/modals/ConnectPlatformModal';

const MainLayout: React.FC = () => {
  const { activeTab, setGlobalSearchOpen, userRole, currentCreatorUser } = useApp();

  // Keyboard shortcut listener for Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setGlobalSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setGlobalSearchOpen]);

  // Render the current view based on active tab & role
  const renderActiveContent = () => {
    switch (activeTab) {
      // BRAND FLOW
      case 'discover':
        return <DiscoveryView />;
      case 'brand_dashboard':
        return <BrandDashboardView />;
      case 'campaigns':
      case 'proposals':
        return <CampaignsWorkspaceView />;
      case 'messages':
        return <MessagingView />;
      case 'shortlists':
      case 'saved_creators':
        return <ShortlistsView />;
      case 'saved_searches':
        return <SavedSearchesView />;
      case 'pricing_benchmarks':
        return <MarketBenchmarksView />;
      case 'brand_verification':
      case 'brand_settings':
        return <BrandVerificationView />;
      case 'creator_profile_view':
        return <CreatorProfileView />;
      
      // CREATOR FLOW
      case 'creator_dashboard':
        return <CreatorDashboardView />;
      case 'creator_onboarding':
        return <CreatorOnboardingWizard />;
      case 'creator_profile':
        return <CreatorProfileView creatorOverride={currentCreatorUser} initialTab="overview" />;
      case 'creator_analytics':
        return <CreatorProfileView creatorOverride={currentCreatorUser} initialTab="analytics" />;
      case 'creator_platforms':
        return <CreatorProfileView creatorOverride={currentCreatorUser} initialTab="comparison" />;
      case 'creator_portfolio':
        return <CreatorProfileView creatorOverride={currentCreatorUser} initialTab="portfolio" />;
      case 'creator_pricing':
      case 'creator_privacy':
        return <CreatorProfileView creatorOverride={currentCreatorUser} initialTab="pricing" />;
      case 'creator_verification':
        return <CreatorProfileView creatorOverride={currentCreatorUser} initialTab="overview" />;
      case 'creator_campaigns':
        return <CampaignsWorkspaceView />;
      case 'creator_messages':
        return <MessagingView />;
      case 'creator_opportunities':
        return <CreatorOpportunitiesView />;
      case 'creator_profile_views':
        return <CreatorDashboardView />;

      // ADMIN FLOW
      case 'admin_overview':
      case 'admin_platforms':
      case 'admin_moderation':
      case 'admin_audit_logs':
      case 'admin_data_quality':
        return <AdminCenterView />;

      // PUBLIC FLOW
      case 'public_home':
      case 'public_pricing':
        return <PublicLandingView />;

      default:
        return userRole === 'creator' ? <CreatorDashboardView /> : <DiscoveryView />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans antialiased selection:bg-emerald-500 selection:text-zinc-950">
      
      {/* Top Navigation */}
      <Navbar />

      {/* Main Container with Sidebar + View Body */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />
        
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderActiveContent()}
        </main>
      </div>

      {/* Mobile Bottom Bar for touchscreens */}
      <MobileNav />

      {/* Global Interactive Modals */}
      <CommandPaletteModal />
      <ExplainMatchModal />
      <InquiryModal />
      <CompareModal />
      <ConnectPlatformModal />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
