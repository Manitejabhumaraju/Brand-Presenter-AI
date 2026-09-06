import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  Sparkles, 
  Share2, 
  DollarSign, 
  Globe, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck,
  Zap,
  MapPin,
  X
} from 'lucide-react';
import { PlatformBadge } from '../common/PlatformBadge';
import { PlatformType, PricingPackage } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface CreatorOnboardingWizardProps {
  onComplete?: () => void;
  onDismiss?: () => void;
}

export const CreatorOnboardingWizard: React.FC<CreatorOnboardingWizardProps> = ({ onComplete, onDismiss }) => {
  const { currentCreatorUser, updateCurrentCreatorUser, setConnectPlatformModalOpen, setActiveTab } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Basic positioning
  const [name, setName] = useState(currentCreatorUser.name || 'Aarav Mehta');
  const [handle, setHandle] = useState(currentCreatorUser.handle || '@aarav.creates');
  const [city, setCity] = useState(currentCreatorUser.location.city || 'Bangalore');
  const [creatorType, setCreatorType] = useState(currentCreatorUser.creatorType || 'Influencer');
  const [primaryNiche, setPrimaryNiche] = useState(currentCreatorUser.niches[0] || 'DevTools');
  const [bio, setBio] = useState(currentCreatorUser.bio || 'AI Engineer & Tech Creator sharing high-retention software workflows.');

  // Step 3: Rate package
  const [rateTitle, setRateTitle] = useState('1x Dedicated Reel / Short');
  const [platform, setPlatform] = useState<PlatformType>('instagram');
  const [priceMin, setPriceMin] = useState(45000);
  const [turnaround, setTurnaround] = useState(5);

  const handleNextFromStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentCreatorUser({
      name,
      handle,
      creatorType: creatorType as any,
      bio,
      location: { ...currentCreatorUser.location, city },
      profileCompletion: Math.max(currentCreatorUser.profileCompletion || 70, 80)
    });
    setStep(2);
  };

  const handleNextFromStep2 = () => {
    updateCurrentCreatorUser({
      profileCompletion: Math.max(currentCreatorUser.profileCompletion || 80, 90)
    });
    setStep(3);
  };

  const handleNextFromStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    const newPackage: PricingPackage = {
      id: 'pkg_' + Date.now(),
      deliverableName: rateTitle,
      platform,
      priceMin,
      priceMax: Math.round(priceMin * 1.3),
      turnaroundDays: turnaround,
      typicalRevisions: 2,
      negotiable: true,
      description: 'Production-ready creative asset with organic usage license.',
      benchmarkMin: Math.round(priceMin * 0.9),
      benchmarkMax: Math.round(priceMin * 1.2),
      benchmarkStatus: 'within_market'
    };

    updateCurrentCreatorUser({
      pricing: [newPackage, ...currentCreatorUser.pricing],
      profileCompletion: Math.max(currentCreatorUser.profileCompletion || 90, 95)
    });
    setStep(4);
  };

  const handleFinalPublish = () => {
    updateCurrentCreatorUser({
      availabilityStatus: 'Available Now',
      identityVerified: true,
      professionalVerified: true,
      profileCompletion: 100
    });
    if (onComplete) {
      onComplete();
    } else {
      setActiveTab('creator_dashboard');
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden animate-in fade-in duration-150 text-zinc-100">
      
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Steps Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Creator Activation Wizard</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-zinc-100">
            Launch Your Audited Commercial Profile
          </h2>
        </div>

        {onDismiss && (
          <button onClick={onDismiss} className="p-2 text-zinc-500 hover:text-zinc-300 rounded-full hover:bg-zinc-800">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Progress Stepper Bar */}
      <div className="grid grid-cols-4 gap-2 text-xs font-bold">
        {[
          { num: 1, title: 'Identity & Bio' },
          { num: 2, title: 'Connect Accounts' },
          { num: 3, title: 'Rate Packages' },
          { num: 4, title: 'Publish Profile' }
        ].map(s => (
          <div 
            key={s.num} 
            className={`p-3 rounded-2xl border transition-all ${
              step === s.num 
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' 
                : step > s.num 
                ? 'bg-zinc-950 border-zinc-800 text-zinc-300' 
                : 'bg-zinc-950/40 border-zinc-800/60 text-zinc-500'
            }`}
          >
            <div className="flex items-center gap-1.5">
              {step > s.num ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                  step === s.num ? 'bg-emerald-500 text-zinc-950 font-black' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {s.num}
                </span>
              )}
              <span className="truncate hidden sm:inline">{s.title}</span>
            </div>
          </div>
        ))}
      </div>

      {/* STEP 1: IDENTITY & POSITIONING */}
      {step === 1 && (
        <form onSubmit={handleNextFromStep1} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Commercial Handle</label>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Creator Type</label>
              <select
                value={creatorType}
                onChange={(e: any) => setCreatorType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Influencer">Influencer</option>
                <option value="UGC Creator">UGC Creator</option>
                <option value="Educator">Technical Educator</option>
                <option value="Podcaster">Podcaster</option>
                <option value="Freelance Creative">Freelance Creative</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Primary Metro</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Primary Niche</label>
              <input
                type="text"
                value={primaryNiche}
                onChange={(e) => setPrimaryNiche(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-zinc-300 mb-1">Professional Bio & Value Proposition</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 rounded-full font-bold text-xs transition-colors shadow-sm"
            >
              <span>Continue to Connected Channels</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 2: CONNECT CHANNELS */}
      {step === 2 && (
        <div className="space-y-4 text-xs">
          <p className="text-zinc-400">
            Brand Presenter AI imports audited reach directly from official platform APIs. Connect at least 1 account to verify audience legitimacy.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {currentCreatorUser.platforms.map(p => (
              <div key={p.id} className="p-4 bg-zinc-950 border border-emerald-500/30 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PlatformBadge platform={p.platform} showName size="sm" />
                  <span className="font-bold text-zinc-200">{(p.followers / 1000).toFixed(0)}K</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold">Synced</span>
              </div>
            ))}
          </div>

          <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="font-bold text-zinc-200">Connect YouTube, Instagram, or TikTok</div>
              <div className="text-[11px] text-zinc-500">Read-only OAuth token. Zero password access.</div>
            </div>
            <button
              type="button"
              onClick={() => setConnectPlatformModalOpen(true)}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-750 text-emerald-400 font-bold rounded-full text-xs transition-colors border border-zinc-700 shrink-0 flex items-center gap-2"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Launch OAuth Connect</span>
            </button>
          </div>

          <div className="pt-4 border-t border-zinc-800 flex justify-between items-center">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={handleNextFromStep2}
              className="flex items-center gap-2 px-6 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 rounded-full font-bold text-xs transition-colors shadow-sm"
            >
              <span>Continue to Rate Packages</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: CONFIGURE RATE CARD */}
      {step === 3 && (
        <form onSubmit={handleNextFromStep3} className="space-y-4 text-xs">
          <p className="text-zinc-400">
            Set your benchmark starting package. Transparent pricing speeds up brand deals by 3.8x.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Deliverable Title</label>
              <input
                type="text"
                value={rateTitle}
                onChange={(e) => setRateTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Platform</label>
              <select
                value={platform}
                onChange={(e: any) => setPlatform(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 capitalize"
              >
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
                <option value="tiktok">TikTok</option>
                <option value="linkedin">LinkedIn</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Starting Rate (₹ INR)</label>
              <input
                type="number"
                step="5000"
                value={priceMin}
                onChange={(e) => setPriceMin(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Turnaround Days</label>
              <input
                type="number"
                min="1"
                max="30"
                value={turnaround}
                onChange={(e) => setTurnaround(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100"
                required
              />
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800 flex justify-between items-center">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 rounded-full font-bold text-xs transition-colors shadow-sm"
            >
              <span>Review & Publish Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 4: REVIEW & PUBLISH TO MARKETPLACE */}
      {step === 4 && (
        <div className="space-y-5 text-xs">
          <div className="p-5 bg-zinc-950 border border-emerald-500/30 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <ShieldCheck className="w-5 h-5" />
              <span>Profile Ready for Marketplace Publication</span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Your identity has been verified, 3 channels connected, and rate packages benchmarked against category medians.
            </p>
            <div className="flex items-center gap-4 text-zinc-300 pt-1">
              <div>Handle: <strong className="text-zinc-100">{handle}</strong></div>
              <div>Type: <strong className="text-zinc-100">{creatorType}</strong></div>
              <div>Profile Health: <strong className="text-emerald-400">100%</strong></div>
            </div>
          </div>

          <div className="pt-2 flex justify-between items-center">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={handleFinalPublish}
              className="flex items-center gap-2 px-7 py-3 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 rounded-full font-black text-xs transition-colors shadow-md"
            >
              <Zap className="w-4 h-4 fill-zinc-950" />
              <span>Publish Profile to Marketplace</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
