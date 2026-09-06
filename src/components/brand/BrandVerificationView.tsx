import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Building2, 
  CreditCard, 
  Sparkles, 
  ArrowRight, 
  Lock, 
  ExternalLink,
  Zap,
  Clock
} from 'lucide-react';

export const BrandVerificationView: React.FC = () => {
  const { setActiveTab } = useApp();

  const [companyName, setCompanyName] = useState('Cult.fit Consumer Marketing (Curefit Healthcare Pvt Ltd)');
  const [website, setWebsite] = useState('https://cult.fit');
  const [businessEmail, setBusinessEmail] = useState('brand.collabs@cultfit.com');
  const [cinNumber, setCinNumber] = useState('U74999KA2016PTC086701');
  const [gstin, setGstin] = useState('29AAACC1234F1Z5');
  const [verified, setVerified] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150 text-zinc-100">
      
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Enterprise Credentials</span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs text-zinc-400">Brand Trust & Legal Entity Verification</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            BRAND <span className="text-emerald-500">VERIFICATION</span>
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-0.5">
            Verified enterprise brands unlock transparent creator rate cards, direct escrow contracting, and automated milestone settlements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('discover')}
            className="flex items-center gap-2 bg-zinc-100 text-zinc-950 px-5 py-2.5 rounded-full text-xs font-bold tracking-tight hover:bg-white transition-colors shadow-sm"
          >
            <span>Search Creators</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Verification Status Bento Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 sm:p-7 relative overflow-hidden shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg font-bold text-zinc-100">Marketplace Verified Enterprise</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
                  Tier 1 Verified
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                Corporate credentials, GSTIN registration, and business domain authenticated via automated ministry registry.
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Trust Integrity Index</div>
            <div className="text-2xl font-black text-emerald-400 mt-0.5">99.8 / 100</div>
            <div className="text-[10px] text-zinc-500">Escrow Protected</div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5 text-xs">
          <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-1">
            <div className="flex items-center gap-2 font-bold text-zinc-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Direct Rate Card Access</span>
            </div>
            <p className="text-zinc-400 text-[11px]">
              Access unredacted starting packages, historical commercial rates, and AI market benchmarks.
            </p>
          </div>

          <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-1">
            <div className="flex items-center gap-2 font-bold text-zinc-200">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Escrow Milestone Protection</span>
            </div>
            <p className="text-zinc-400 text-[11px]">
              Funds remain protected until creator video assets are reviewed, audited, and approved.
            </p>
          </div>

          <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-1">
            <div className="flex items-center gap-2 font-bold text-zinc-200">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Priority Creator Inquiries</span>
            </div>
            <p className="text-zinc-400 text-[11px]">
              Your campaign briefs are highlighted with an Enterprise Sponsor badge in creator workspaces.
            </p>
          </div>
        </div>
      </div>

      {/* Entity Details Form Bento */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 sm:p-7 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div>
            <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">Corporate Identification Details</h3>
            <p className="text-xs text-zinc-500 mt-0.5">Official legal information for milestone contracts and invoices</p>
          </div>
          {savedSuccess && (
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Credentials Updated Successfully</span>
            </span>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Company / Legal Entity Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Official Brand Website</label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Authorized Business Email</label>
              <input
                type="email"
                value={businessEmail}
                onChange={(e) => setBusinessEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Corporate ID (CIN)</label>
              <input
                type="text"
                value={cinNumber}
                onChange={(e) => setCinNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">GSTIN Number</label>
              <input
                type="text"
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100"
                required
              />
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
            <div className="text-[11px] text-zinc-500">
              Audit status re-validated every 90 days with government registries.
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 rounded-full font-bold text-xs transition-colors shadow-sm"
            >
              Update Credentials
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};
