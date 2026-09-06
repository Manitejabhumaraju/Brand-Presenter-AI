import { PlatformType } from '../types';

export function formatNumber(num: number | undefined): string {
  if (num === undefined || num === null) return '—';
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toLocaleString('en-IN');
}

export function formatCurrency(amount: number | undefined): string {
  if (amount === undefined || amount === null) return '—';
  return '₹' + amount.toLocaleString('en-IN');
}

export function getPlatformColor(platform: PlatformType): string {
  switch (platform) {
    case 'instagram':
      return 'text-rose-600 bg-rose-50 border-rose-200';
    case 'youtube':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'tiktok':
      return 'text-neutral-900 bg-neutral-100 border-neutral-300';
    case 'linkedin':
      return 'text-blue-700 bg-blue-50 border-blue-200';
    case 'twitter':
      return 'text-sky-600 bg-sky-50 border-sky-200';
    case 'twitch':
      return 'text-purple-600 bg-purple-50 border-purple-200';
    case 'threads':
      return 'text-neutral-800 bg-neutral-100 border-neutral-200';
    default:
      return 'text-slate-600 bg-slate-50 border-slate-200';
  }
}

export function getFreshnessLabel(freshness: string): { label: string; dotColor: string } {
  switch (freshness) {
    case 'updated_hours_ago':
      return { label: 'Updated 2h ago', dotColor: 'bg-emerald-500' };
    case 'updated_today':
      return { label: 'Updated today', dotColor: 'bg-emerald-400' };
    case 'stale':
      return { label: 'Stale (3d ago)', dotColor: 'bg-amber-500' };
    default:
      return { label: 'Unavailable', dotColor: 'bg-slate-400' };
  }
}
