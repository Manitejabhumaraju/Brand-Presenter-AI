import React from 'react';
import { PlatformType } from '../../types';
import { 
  Instagram, 
  Youtube, 
  Linkedin, 
  Twitter, 
  Tv, 
  Share2, 
  Video,
  Globe
} from 'lucide-react';

interface PlatformBadgeProps {
  platform: PlatformType;
  showName?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const PlatformBadge: React.FC<PlatformBadgeProps> = ({ 
  platform, 
  showName = false,
  size = 'md',
  className = ''
}) => {
  const getIcon = () => {
    const iconSize = size === 'sm' ? 12 : size === 'lg' ? 18 : 14;
    switch (platform) {
      case 'instagram':
        return <Instagram size={iconSize} className="text-pink-600" />;
      case 'youtube':
        return <Youtube size={iconSize} className="text-red-600" />;
      case 'linkedin':
        return <Linkedin size={iconSize} className="text-blue-600" />;
      case 'twitter':
        return <Twitter size={iconSize} className="text-sky-500" />;
      case 'twitch':
        return <Tv size={iconSize} className="text-purple-600" />;
      case 'tiktok':
        return <Video size={iconSize} className="text-slate-900" />;
      default:
        return <Globe size={iconSize} className="text-slate-600" />;
    }
  };

  const getLabel = () => {
    switch (platform) {
      case 'instagram': return 'Instagram';
      case 'youtube': return 'YouTube';
      case 'tiktok': return 'TikTok';
      case 'linkedin': return 'LinkedIn';
      case 'twitter': return 'X / Twitter';
      case 'twitch': return 'Twitch';
      case 'threads': return 'Threads';
      default: return platform;
    }
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100/90 text-slate-800 border border-slate-200/80 ${className}`}>
      {getIcon()}
      {showName && <span>{getLabel()}</span>}
    </span>
  );
};
