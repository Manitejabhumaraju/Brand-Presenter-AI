import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Send, 
  Info
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export const InquiryModal: React.FC = () => {
  const { inquiryModalCreator, setInquiryModalCreator, handleCreateInquiry } = useApp();

  const [campaignTitle, setCampaignTitle] = useState('Festive D2C Product Launch');
  const [budget, setBudget] = useState(45000);
  const [objective, setObjective] = useState('Conversions & App Downloads');
  const [platform, setPlatform] = useState('instagram');
  const [deliverables, setDeliverables] = useState('1x Dedicated Reel (60s) + 2x Story Set with link');
  const [dueDate, setDueDate] = useState('2026-09-28');
  const [organicUsage, setOrganicUsage] = useState(true);
  const [paidWhitelisting, setPaidWhitelisting] = useState(true);
  const [notes, setNotes] = useState('We will ship product samples overnight. Looking for authentic workflow breakdown.');

  if (!inquiryModalCreator) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCreateInquiry(inquiryModalCreator.id, {
      title: campaignTitle,
      budget,
      objective,
      deliverables,
      platform
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-zinc-900 rounded-[2rem] shadow-2xl border border-zinc-800 overflow-hidden text-zinc-100">
        
        {/* Modal Header */}
        <div className="px-6 py-5 bg-zinc-950 text-white flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-3.5">
            <img 
              src={inquiryModalCreator.avatar} 
              alt={inquiryModalCreator.name} 
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                target.onerror = null;
                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(inquiryModalCreator.name)}&background=2563eb&color=fff&bold=true`;
              }}
              className="w-11 h-11 rounded-2xl object-cover border border-zinc-800"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-zinc-100">Send Commercial Inquiry</h3>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase tracking-wider">
                  Verified Contact
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                To {inquiryModalCreator.name} ({inquiryModalCreator.handle}) • Avg response {inquiryModalCreator.responseTime}
              </p>
            </div>
          </div>
          <button
            onClick={() => setInquiryModalCreator(null)}
            className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          
          {/* Campaign Title */}
          <div>
            <label className="block font-semibold text-zinc-300 mb-1">Campaign Name</label>
            <input
              type="text"
              value={campaignTitle}
              onChange={(e) => setCampaignTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Objective */}
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Primary Objective</label>
              <select
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
              >
                <option value="Conversions & App Downloads">Direct Conversions & Sales</option>
                <option value="Awareness & Brand Reach">Brand Reach & Impressions</option>
                <option value="High-Retention UGC">High-Retention Performance UGC</option>
                <option value="Product Launch Event">Flagship Product Launch</option>
                <option value="Developer Trials">Technical Developer Trials</option>
              </select>
            </div>

            {/* Platform */}
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Primary Platform</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs capitalize"
              >
                {inquiryModalCreator.platforms.map(p => (
                  <option key={p.id} value={p.platform}>
                    {p.platform} ({formatCurrency(p.followers)} reach)
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Deliverables description */}
          <div>
            <label className="block font-semibold text-zinc-300 mb-1">Requested Deliverables</label>
            <input
              type="text"
              value={deliverables}
              onChange={(e) => setDeliverables(e.target.value)}
              placeholder="e.g. 1x Reel, 3x Stories, 1x YouTube mid-roll"
              className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
              required
            />
          </div>

          {/* Budget & Target Delivery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-zinc-300">Commercial Budget (₹ INR)</label>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Negotiable</span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-zinc-500 font-semibold">₹</span>
                <input
                  type="number"
                  step="1000"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full pl-8 pr-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Target Delivery Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
                required
              />
            </div>

          </div>

          {/* Usage Rights Toggles */}
          <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-2.5">
            <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              Usage Rights & Whitelisting
            </div>
            
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input 
                type="checkbox" 
                checked={organicUsage} 
                onChange={(e) => setOrganicUsage(e.target.checked)}
                className="rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
              />
              <span className="text-zinc-300 text-xs">Organic posting on creator channels (Permanent)</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input 
                type="checkbox" 
                checked={paidWhitelisting} 
                onChange={(e) => setPaidWhitelisting(e.target.checked)}
                className="rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
              />
              <span className="text-zinc-300 text-xs">Paid Ad Whitelisting / Meta Spark Ads (90 Days)</span>
            </label>
          </div>

          {/* Notes */}
          <div>
            <label className="block font-semibold text-zinc-300 mb-1">Brief Description & Notes</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
              placeholder="Outline product USP, shipping requirements, key talking points..."
            />
          </div>

          {/* Audit notice */}
          <div className="flex items-start gap-2 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-[11px] text-zinc-400">
            <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              All inquiries submitted through Vouchmark generate an audited commercial thread protected under marketplace escrow.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setInquiryModalCreator(null)}
              className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-zinc-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 rounded-full font-bold text-xs transition-colors shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Commercial Inquiry</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
