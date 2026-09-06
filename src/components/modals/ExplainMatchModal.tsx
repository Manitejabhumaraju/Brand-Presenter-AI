import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  X, 
  CheckCircle2, 
  Target, 
  Info
} from 'lucide-react';

export const ExplainMatchModal: React.FC = () => {
  const { explainMatchCreator, setExplainMatchCreator, setInquiryModalCreator } = useApp();

  if (!explainMatchCreator) return null;

  const score = explainMatchCreator.aiScore;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-zinc-900 rounded-[2rem] shadow-2xl border border-zinc-800 overflow-hidden text-zinc-100">
        
        {/* Header */}
        <div className="px-6 py-5 bg-zinc-950 text-white flex items-start justify-between border-b border-zinc-800">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-zinc-100">Why This Creator?</h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase tracking-wider">
                  {score.overall}% Match Score
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Calculated for {explainMatchCreator.name} ({explainMatchCreator.handle})
              </p>
            </div>
          </div>
          <button
            onClick={() => setExplainMatchCreator(null)}
            className="p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Summary Quote */}
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
            <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-emerald-400" />
              <span>AI Fit Evaluation</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
              "{score.summary}"
            </p>
          </div>

          {/* Sub-score Pillars Bento */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-3">
              Marketplace Performance Pillars
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-[10px] text-zinc-400 font-bold uppercase">Audience Quality</div>
                <div className="text-base font-black text-zinc-100 mt-0.5">{score.audienceQuality}/100</div>
                <div className="w-full bg-zinc-850 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${score.audienceQuality}%` }} />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-[10px] text-zinc-400 font-bold uppercase">Engagement Quality</div>
                <div className="text-base font-black text-zinc-100 mt-0.5">{score.engagementQuality}/100</div>
                <div className="w-full bg-zinc-850 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: `${score.engagementQuality}%` }} />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-[10px] text-zinc-400 font-bold uppercase">Content Execution</div>
                <div className="text-base font-black text-zinc-100 mt-0.5">{score.contentQuality}/100</div>
                <div className="w-full bg-zinc-850 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${score.contentQuality}%` }} />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-[10px] text-zinc-400 font-bold uppercase">Reliability & Delivery</div>
                <div className="text-base font-black text-zinc-100 mt-0.5">{score.reliability}/100</div>
                <div className="w-full bg-zinc-850 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: `${score.reliability}%` }} />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-[10px] text-zinc-400 font-bold uppercase">Brand Alignment</div>
                <div className="text-base font-black text-zinc-100 mt-0.5">{score.brandFit}/100</div>
                <div className="w-full bg-zinc-850 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${score.brandFit}%` }} />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
                <div className="text-[10px] text-zinc-400 font-bold uppercase">Commercial Value</div>
                <div className="text-base font-black text-zinc-100 mt-0.5">{score.commercialValue}/100</div>
                <div className="w-full bg-zinc-850 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: `${score.commercialValue}%` }} />
                </div>
              </div>

            </div>
          </div>

          {/* Key Data-Driven Reasons */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2.5">
              Verified Marketplace Signals
            </div>
            <div className="space-y-2.5">
              {score.reasons.map((reason, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300 bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Data Honesty Disclaimer */}
          <div className="flex items-center gap-2.5 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-[11px] text-zinc-400">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Calculated using available verified marketplace and authorized platform signals. No synthetic metrics or fabricated audience estimates.
            </span>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between">
          <button
            onClick={() => setExplainMatchCreator(null)}
            className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-zinc-200 rounded-full transition-colors"
          >
            Close
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const c = explainMatchCreator;
                setExplainMatchCreator(null);
                setInquiryModalCreator(c);
              }}
              className="px-5 py-2.5 text-xs font-bold bg-zinc-100 hover:bg-white text-zinc-950 rounded-full transition-colors shadow-sm"
            >
              Contact This Creator
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
