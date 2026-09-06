import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Send, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  DollarSign, 
  Info,
  Layers,
  Paperclip
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export const MessagingView: React.FC = () => {
  const { 
    conversations, 
    activeConversationId, 
    setActiveConversationId, 
    sendMessage, 
    userRole 
  } = useApp();

  const [replyText, setReplyText] = useState('');

  const currentId = activeConversationId || conversations[0]?.id;
  const activeConvo = conversations.find(c => c.id === currentId) || conversations[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeConvo) return;

    sendMessage(activeConvo.id, replyText);
    setReplyText('');
  };

  return (
    <div className="h-[calc(100vh-8.5rem)] flex flex-col bg-zinc-900 rounded-[2rem] border border-zinc-800 shadow-sm overflow-hidden animate-in fade-in duration-150 text-zinc-100">
      
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Conversation Threads */}
        <div className="w-80 border-r border-zinc-800 flex flex-col bg-zinc-950/60 shrink-0">
          <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Inquiries</h2>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase">
              {conversations.length} Threads
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-zinc-850">
            {conversations.map(convo => {
              const isSelected = convo.id === activeConvo?.id;
              const otherParty = userRole === 'creator' ? convo.brandName : convo.creatorName;

              return (
                <button
                  key={convo.id}
                  onClick={() => setActiveConversationId(convo.id)}
                  className={`w-full p-4 text-left flex items-start gap-3 transition-colors ${
                    isSelected ? 'bg-zinc-900 border-l-4 border-l-emerald-500' : 'hover:bg-zinc-900/60'
                  }`}
                >
                  <div className="w-10 h-10 rounded-2xl bg-zinc-800 text-emerald-400 font-bold flex items-center justify-center shrink-0 border border-zinc-700 text-xs">
                    {otherParty.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-zinc-200 truncate">{otherParty}</span>
                      <span className="text-[10px] text-zinc-500 shrink-0">{convo.lastTimestamp}</span>
                    </div>
                    {convo.campaignTitle && (
                      <div className="text-[11px] font-semibold text-emerald-400 truncate mt-0.5">
                        {convo.campaignTitle}
                      </div>
                    )}
                    <div className="text-xs text-zinc-400 truncate mt-1">
                      {convo.lastMessage}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat / Conversation Panel */}
        <div className="flex-1 flex flex-col bg-zinc-900">
          {activeConvo ? (
            <>
              {/* Header */}
              <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-800 text-zinc-100 font-bold flex items-center justify-center text-sm border border-zinc-700">
                    {(userRole === 'creator' ? activeConvo.brandName : activeConvo.creatorName).charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-zinc-100">
                        {userRole === 'creator' ? activeConvo.brandName : activeConvo.creatorName}
                      </h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase tracking-wider">
                        Verified Channel
                      </span>
                    </div>
                    {activeConvo.campaignTitle && (
                      <div className="text-xs text-zinc-400 mt-0.5">
                        Deal: <strong className="text-zinc-200">{activeConvo.campaignTitle}</strong>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <div className="px-3.5 py-1.5 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-300 font-semibold">
                    Escrow Protection Enabled
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-zinc-950/40">
                {activeConvo.messages.map((msg: any) => {
                  const isMe = (userRole === 'brand' && msg.senderRole === 'brand') ||
                               (userRole === 'creator' && msg.senderRole === 'creator');

                  return (
                    <div 
                      key={msg.id} 
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center gap-2 mb-1 px-1 text-[11px] text-zinc-500">
                        <span>{msg.senderName}</span>
                        <span>•</span>
                        <span>{msg.timestamp}</span>
                      </div>

                      <div className={`max-w-md p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isMe 
                          ? 'bg-emerald-500 text-zinc-950 font-medium rounded-tr-none' 
                          : 'bg-zinc-800 text-zinc-100 border border-zinc-700/80 rounded-tl-none'
                      }`}>
                        {msg.text}

                        {msg.dealTerms && (
                          <div className={`mt-3 p-3 rounded-xl text-xs space-y-1.5 ${
                            isMe ? 'bg-emerald-600/30 border border-emerald-600/40 text-zinc-950' : 'bg-zinc-900 border border-zinc-700 text-zinc-200'
                          }`}>
                            <div className="font-bold uppercase tracking-wider text-[10px]">Attached Commercial Proposal</div>
                            <div className="flex justify-between">
                              <span>Compensation:</span>
                              <span className="font-bold">{formatCurrency(msg.dealTerms.offerAmount)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Deliverables:</span>
                              <span>{msg.dealTerms.deliverablesSummary}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Input Area */}
              <form onSubmit={handleSend} className="p-4 border-t border-zinc-800 bg-zinc-900 flex items-center gap-3">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type a message or milestone update..."
                  className="flex-1 px-5 py-3 bg-zinc-950 border border-zinc-800 rounded-full text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="px-6 py-3 bg-zinc-100 hover:bg-white text-zinc-950 font-bold rounded-full text-xs flex items-center gap-2 disabled:opacity-40 transition-colors shadow-sm"
                >
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-zinc-500 text-xs">
              Select a conversation to inspect thread.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
