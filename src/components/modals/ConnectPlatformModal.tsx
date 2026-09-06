import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PlatformType } from '../../types';
import { 
  X, 
  Share2, 
  CheckCircle2, 
  RefreshCw, 
  Lock, 
  Sparkles
} from 'lucide-react';
import { PlatformBadge } from '../common/PlatformBadge';

interface PlatformOption {
  platform: PlatformType;
  title: string;
  scopes: string[];
  importedData: string[];
  permissionsRequested: string[];
}

export const ConnectPlatformModal: React.FC = () => {
  const { 
    connectPlatformModalOpen, 
    setConnectPlatformModalOpen, 
    currentCreatorUser, 
    updateCurrentCreatorUser 
  } = useApp();

  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType>('tiktok');
  const [connecting, setConnecting] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');

  if (!connectPlatformModalOpen) return null;

  const platformOptions: PlatformOption[] = [
    {
      platform: 'instagram',
      title: 'Instagram Professional & Creator Account',
      scopes: ['instagram_basic', 'instagram_manage_insights', 'pages_read_engagement'],
      importedData: ['Follower metrics', 'Story & Reel reach', 'Audience age/gender distribution', 'City demographics'],
      permissionsRequested: ['Read-only account metadata', 'Read-only video & story insights']
    },
    {
      platform: 'youtube',
      title: 'YouTube Creator Channel (Google OAuth 2.0)',
      scopes: ['https://www.googleapis.com/auth/youtube.readonly', 'yt-analytics.readonly'],
      importedData: ['Subscribers count', 'Average view duration', 'Impressions click-through rate', 'Audience retention graph'],
      permissionsRequested: ['View public channel statistics', 'View YouTube Analytics reports']
    },
    {
      platform: 'tiktok',
      title: 'TikTok Creator Marketplace API',
      scopes: ['user.info.basic', 'video.list', 'creator.analytics'],
      importedData: ['Total followers', 'Average video completion rate', 'Sound performance', 'Audience geography'],
      permissionsRequested: ['Read public video list', 'Read aggregate performance analytics']
    },
    {
      platform: 'linkedin',
      title: 'LinkedIn Creator Page API',
      scopes: ['r_organization_social', 'r_basicprofile'],
      importedData: ['Professional followers', 'Industry & seniority distribution', 'Post engagement rate', 'Link clicks'],
      permissionsRequested: ['Read-only profile info', 'Read post analytics']
    },
    {
      platform: 'twitter',
      title: 'X / Twitter Creator API v2',
      scopes: ['users.read', 'tweet.read'],
      importedData: ['Verified impressions count', 'Profile clicks', 'Bookmark velocity', 'Audience interests'],
      permissionsRequested: ['Read public user profile', 'Read organic tweet analytics']
    },
    {
      platform: 'twitch',
      title: 'Twitch Partner & Affiliate API',
      scopes: ['user:read:broadcast', 'analytics:read:games'],
      importedData: ['Concurrent peak viewers', 'Average stream duration', 'Chat engagement frequency', 'VOD playback'],
      permissionsRequested: ['Read broadcast telemetry', 'Read channel analytics']
    }
  ];

  const currentOption = platformOptions.find(o => o.platform === selectedPlatform) || platformOptions[0];
  const isAlreadyConnected = currentCreatorUser.platforms.some(p => p.platform === selectedPlatform);

  const handleSimulateOAuth = () => {
    setConnecting(true);
    setSyncProgress(15);

    setTimeout(() => setSyncProgress(45), 400);
    setTimeout(() => setSyncProgress(80), 800);
    setTimeout(() => {
      setSyncProgress(100);
      setConnecting(false);

      if (!isAlreadyConnected) {
        const handleStr = `@${currentCreatorUser.name.toLowerCase().replace(/\s+/g, '_')}`;
        const followerCount = selectedPlatform === 'youtube' ? 620000 : selectedPlatform === 'instagram' ? 420000 : 280000;
        const newPlatformData: any = {
          id: 'pf_' + Date.now(),
          platform: selectedPlatform,
          username: handleStr,
          handle: handleStr,
          profileUrl: `https://${selectedPlatform}.com/${handleStr.replace('@', '')}`,
          accountType: 'Creator',
          followers: followerCount,
          subscribers: selectedPlatform === 'youtube' ? followerCount : undefined,
          avgViews: 85000,
          avgReach: 140000,
          impressions: 210000,
          contentCount: 148,
          engagementRate: 6.8,
          verifiedOnPlatform: true,
          syncStatus: 'connected',
          syncFreshness: 'updated_hours_ago',
          lastSynced: 'Just now',
          topContentFormat: selectedPlatform === 'youtube' ? 'Dedicated Video' : 'Reels'
        };

        const newTotalFollowers = (currentCreatorUser.stats?.totalFollowers || 0) + followerCount;
        const updatedPlatforms = [...currentCreatorUser.platforms, newPlatformData];
        const newCompletion = Math.min(100, Math.max(currentCreatorUser.profileCompletion || 85, 95));

        updateCurrentCreatorUser({
          platforms: updatedPlatforms,
          profileCompletion: newCompletion,
          stats: {
            ...currentCreatorUser.stats,
            totalFollowers: newTotalFollowers
          }
        });
      }

      setSuccessMessage(`Successfully authenticated and authorized ${currentOption.title}. Real-time insights telemetry is active.`);
    }, 1200);
  };

  const handleDisconnect = () => {
    updateCurrentCreatorUser({
      platforms: currentCreatorUser.platforms.filter(p => p.platform !== selectedPlatform)
    });
    setSuccessMessage(`Disconnected ${currentOption.platform}. Previous verified badge removed.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-zinc-900 rounded-[2rem] shadow-2xl border border-zinc-800 overflow-hidden text-zinc-100">
        
        {/* Header */}
        <div className="px-6 py-5 bg-zinc-950 text-white flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-100">Connect Social Platforms</h3>
              <p className="text-xs text-zinc-400">
                Direct OAuth 2.0 verification for official data freshness & verified badges
              </p>
            </div>
          </div>
          <button
            onClick={() => setConnectPlatformModalOpen(false)}
            className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[78vh] overflow-y-auto">
          
          {/* Platform Selector Tabs */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2.5">
              Select Social Platform to Manage
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {platformOptions.map(opt => {
                const connected = currentCreatorUser.platforms.some(p => p.platform === opt.platform);
                const isSelected = selectedPlatform === opt.platform;
                return (
                  <button
                    key={opt.platform}
                    onClick={() => {
                      setSelectedPlatform(opt.platform);
                      setSuccessMessage('');
                    }}
                    className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all ${
                      isSelected
                        ? 'border-emerald-500 bg-zinc-950 shadow-sm'
                        : 'border-zinc-800 bg-zinc-950/60 hover:border-zinc-700'
                    }`}
                  >
                    <PlatformBadge platform={opt.platform} size="md" />
                    <span className="text-[10px] font-bold capitalize text-zinc-300">
                      {opt.platform}
                    </span>
                    {connected && (
                      <span className="text-[9px] font-bold text-emerald-400 flex items-center gap-0.5">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        Active
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Platform Detail & OAuth Specs */}
          <div className="p-5 bg-zinc-950 rounded-2xl border border-zinc-800 text-xs space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2.5">
                <PlatformBadge platform={currentOption.platform} showName size="lg" />
                <span className="font-bold text-zinc-200">{currentOption.title}</span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                isAlreadyConnected 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                  : 'bg-zinc-800 text-zinc-400'
              }`}>
                {isAlreadyConnected ? 'Status: Active Sync' : 'Not Connected'}
              </span>
            </div>

            {/* What is imported */}
            <div>
              <div className="font-bold text-emerald-400 uppercase tracking-widest text-[10px] mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Metrics Automatically Imported</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-400">
                {currentOption.importedData.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requested Permissions */}
            <div>
              <div className="font-bold text-zinc-400 uppercase tracking-widest text-[10px] mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>API Scopes & Permissions Requested</span>
              </div>
              <p className="text-[11px] text-zinc-500 mb-2 leading-relaxed">
                Vouchmark strictly requests read-only analytics permissions. We never publish on your behalf, read private messages, or access financial credentials.
              </p>
              <div className="flex flex-wrap gap-1.5 font-mono text-[10px] text-zinc-400">
                {currentOption.scopes.map((s, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded-md">
                    {s}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Sync status feedback banner */}
          {successMessage && (
            <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Progress bar if connecting */}
          {connecting && (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-zinc-400">
                <span>Exchanging OAuth tokens & pulling analytics...</span>
                <span>{syncProgress}%</span>
              </div>
              <div className="w-full bg-zinc-950 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-2 transition-all duration-300 rounded-full" 
                  style={{ width: `${syncProgress}%` }}
                />
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-xs">
          <button
            onClick={() => setConnectPlatformModalOpen(false)}
            className="text-zinc-400 hover:text-zinc-200 font-semibold"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            {isAlreadyConnected ? (
              <>
                <button
                  onClick={handleDisconnect}
                  className="px-4 py-2 text-rose-400 hover:text-rose-300 font-semibold"
                >
                  Disconnect Platform
                </button>
                <button
                  onClick={handleSimulateOAuth}
                  disabled={connecting}
                  className="flex items-center gap-2 px-5 py-2.5 bg-zinc-800 hover:bg-zinc-750 text-zinc-100 rounded-full font-bold transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${connecting ? 'animate-spin' : ''}`} />
                  <span>Force Re-sync Now</span>
                </button>
              </>
            ) : (
              <button
                onClick={handleSimulateOAuth}
                disabled={connecting}
                className="flex items-center gap-2 px-6 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 rounded-full font-bold transition-colors shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>{connecting ? 'Connecting...' : `Connect ${currentOption.platform}`}</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
