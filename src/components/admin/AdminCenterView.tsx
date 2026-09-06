import React, { useState } from 'react';
import { 
  Activity, 
  AlertTriangle, 
  History, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  Server
} from 'lucide-react';
import { mockPlatformHealth, mockAuditLogs, mockModerationReports } from '../../data/mockAdmin';
import { ModerationReport } from '../../types';
import { PlatformBadge } from '../common/PlatformBadge';

export const AdminCenterView: React.FC = () => {
  const [activeAdminTab, setActiveAdminTab] = useState<'health' | 'moderation' | 'logs'>('health');
  const [moderationList, setModerationList] = useState<ModerationReport[]>(mockModerationReports);

  const handleResolveReport = (reportId: string, action: ModerationReport['status']) => {
    setModerationList(prev => prev.map(r => r.id === reportId ? { ...r, status: action } : r));
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150">
      
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Security & Integrity</span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs text-zinc-400">Environment: Production (Cloud Run)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            SYSTEM <span className="text-emerald-500">OBSERVABILITY</span>
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-0.5">
            Monitor live OAuth API sync quotas, investigate creator reports, and audit system integrity.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 text-emerald-400 border border-zinc-800 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
            <span>99.98% System Uptime</span>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-zinc-900 p-1.5 rounded-full border border-zinc-800 shadow-sm flex gap-2 text-xs font-bold text-zinc-400 overflow-x-auto">
        <button
          onClick={() => setActiveAdminTab('health')}
          className={`py-2 px-5 rounded-full transition-colors flex items-center gap-2 shrink-0 ${
            activeAdminTab === 'health' ? 'bg-zinc-100 text-zinc-950 shadow-sm' : 'hover:text-zinc-200'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>API Health & Quotas</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('moderation')}
          className={`py-2 px-5 rounded-full transition-colors flex items-center gap-2 shrink-0 ${
            activeAdminTab === 'moderation' ? 'bg-zinc-100 text-zinc-950 shadow-sm' : 'hover:text-zinc-200'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Moderation Queue ({moderationList.filter(m => m.status === 'pending' || m.status === 'in_review').length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('logs')}
          className={`py-2 px-5 rounded-full transition-colors flex items-center gap-2 shrink-0 ${
            activeAdminTab === 'logs' ? 'bg-zinc-100 text-zinc-950 shadow-sm' : 'hover:text-zinc-200'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Audit Logs ({mockAuditLogs.length})</span>
        </button>
      </div>

      {/* TAB 1: API HEALTH & INTEGRATIONS (BENTO TILES) */}
      {activeAdminTab === 'health' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPlatformHealth.map(item => (
              <div key={item.platform} className="bg-zinc-900 p-6 rounded-[2rem] border border-zinc-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <PlatformBadge platform={item.platform} showName size="md" />
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    item.status === 'operational' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    item.status === 'degraded' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                    'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  }`}>
                    {item.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span className="text-[10px] uppercase font-bold tracking-wider">Health Rate</span>
                    <span className="font-bold text-zinc-100">{item.apiHealth}%</span>
                  </div>
                  <div className="w-full bg-zinc-950 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className={`h-1.5 rounded-full ${item.apiHealth < 95 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                      style={{ width: `${item.apiHealth}%` }} 
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 text-xs space-y-2 text-zinc-400">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Sync Success:</span>
                    <span className="font-bold text-zinc-200">{item.syncSuccessRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Rate Limit Status:</span>
                    <span className="font-bold text-zinc-200 text-[11px] truncate max-w-[160px]" title={item.rateLimitStatus}>
                      {item.rateLimitStatus}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Failed Accounts:</span>
                    <span className={`font-bold ${item.failedAccountsCount > 10 ? 'text-amber-400' : 'text-zinc-300'}`}>
                      {item.failedAccountsCount} accounts
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-zinc-900 p-6 sm:p-7 rounded-[2rem] border border-zinc-800 shadow-sm space-y-2">
            <h3 className="font-bold text-xs text-zinc-400 uppercase tracking-widest">Ingestion Pipeline Throttle Engine</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Vouchmark runs synchronized pull jobs with rate-limit dampening. Instagram Basic Display and YouTube Data API v3 jobs are paced at 60 requests/min max to prevent token revocation and respect upstream quotas.
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: MODERATION QUEUE */}
      {activeAdminTab === 'moderation' && (
        <div className="space-y-4">
          <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 text-xs text-zinc-400">
            Showing flagged creator accounts and suspicious metric warnings awaiting human review.
          </div>

          <div className="space-y-3">
            {moderationList.map(report => (
              <div key={report.id} className="bg-zinc-900 p-5 rounded-[2rem] border border-zinc-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-sm text-zinc-100">{report.reportedEntityName}</span>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      report.riskLevel === 'High' || report.riskLevel === 'Critical' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                      report.riskLevel === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-zinc-800 text-zinc-300'
                    }`}>
                      {report.riskLevel} Risk
                    </span>
                    <span className="text-zinc-500 text-[11px]">• Reason: {report.reason}</span>
                  </div>

                  <p className="text-zinc-300 font-medium">{report.evidenceSummary}</p>
                  <p className="text-zinc-500 text-[11px]">Reporter: {report.reporterName} • {report.timestamp}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {report.status === 'pending' || report.status === 'in_review' ? (
                    <>
                      <button
                        onClick={() => handleResolveReport(report.id, 'dismissed')}
                        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-750 text-zinc-300 rounded-full font-bold"
                      >
                        Dismiss Flag
                      </button>
                      <button
                        onClick={() => handleResolveReport(report.id, 'resolved')}
                        className="px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-full font-bold"
                      >
                        Enforce Action
                      </button>
                    </>
                  ) : (
                    <span className="text-emerald-400 font-bold uppercase text-[11px]">
                      Status: {report.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: AUDIT LOGS */}
      {activeAdminTab === 'logs' && (
        <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 shadow-sm overflow-hidden text-xs">
          <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
            <h3 className="font-bold text-zinc-100 text-sm">Immutable Security & Transaction Audit Trail</h3>
            <span className="text-emerald-400 text-[11px] font-bold uppercase tracking-wider">Live ledger</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-zinc-950 border-b border-zinc-800 text-zinc-500 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-5 text-left">Timestamp</th>
                  <th className="py-3 px-4 text-left">Actor</th>
                  <th className="py-3 px-4 text-left">Action</th>
                  <th className="py-3 px-4 text-left">Entity</th>
                  <th className="py-3 px-4 text-left">Details</th>
                  <th className="py-3 px-5 text-left">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80">
                {mockAuditLogs.map(log => (
                  <tr key={log.id} className="hover:bg-zinc-850/50">
                    <td className="py-3 px-5 font-mono text-zinc-400">{log.timestamp}</td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-zinc-200">{log.actor}</span>
                      <span className="text-zinc-500 ml-1.5 text-[10px]">({log.actorRole})</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-emerald-400 font-semibold">{log.action}</td>
                    <td className="py-3 px-4 text-zinc-300">{log.entityType} ({log.entityId})</td>
                    <td className="py-3 px-4 text-zinc-400 max-w-xs truncate">{log.details}</td>
                    <td className="py-3 px-5 text-zinc-500 font-mono text-[11px]">{log.ipAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
