
import React, { useState, useEffect } from 'react';
import { analyzeMessage } from '../services/geminiService';
import { ScanResult, SafetyStatus, ReportCategory } from '../types';
import { Logo } from './Logo';

const REPORT_CATEGORIES: ReportCategory[] = [
  {
    id: 'financial',
    label: 'Financial Fraud',
    icon: '🏦',
    url: 'https://www.cybercrime.gov.in/',
    description: 'Report unauthorized bank transactions or fake banking links.'
  },
  {
    id: 'identity',
    label: 'Identity Theft',
    icon: '👤',
    url: 'https://www.identitytheft.gov/',
    description: 'Report if someone is using your personal data or photos.'
  },
  {
    id: 'social',
    label: 'Social Media Scam',
    icon: '📱',
    url: 'https://help.instagram.com/contact/383679321740945',
    description: 'Report hacked accounts or fake profiles on WhatsApp/Instagram.'
  }
];

interface HistoryEntry {
  timestamp: number;
  message: string;
  result: ScanResult;
}

export const Scanner: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showFullScreenResult, setShowFullScreenResult] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('cyber_safety_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const handleScan = async () => {
    if (!inputText.trim()) return;
    const currentMessage = inputText;
    setLoading(true);
    const analysis = await analyzeMessage(currentMessage);
    setResult(analysis);
    setLoading(false);
    setShowFullScreenResult(true);
    
    const newEntry: HistoryEntry = {
      timestamp: Date.now(),
      message: currentMessage,
      result: analysis
    };
    
    const updatedHistory = [newEntry, ...history].slice(0, 5);
    setHistory(updatedHistory);
    localStorage.setItem('cyber_safety_history', JSON.stringify(updatedHistory));
    
    setInputText('');
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('cyber_safety_history');
  };

  const getStatusBadge = (status: SafetyStatus) => {
    switch (status) {
      case SafetyStatus.SAFE: return <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 font-bold border border-green-500/20">SAFE</span>;
      case SafetyStatus.SUSPICIOUS: return <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-600 font-bold border border-yellow-500/20">SUSPICIOUS</span>;
      case SafetyStatus.DANGEROUS: return <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/10 text-red-600 font-bold border border-red-500/20">DANGEROUS</span>;
      default: return <span className="text-xs px-2 py-0.5 rounded-full bg-slate-500/10 text-slate-600 font-bold">UNKNOWN</span>;
    }
  };

  return (
    <div className="relative space-y-6">
      {/* Full Screen Scanning Overlay */}
      {loading && (
        <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center animate-in fade-in duration-300">
          <div className="relative">
             <div className="absolute inset-0 scale-150 bg-cyan-500/20 blur-[100px] rounded-full animate-pulse"></div>
             <div className="relative z-10 animate-bounce">
                <Logo size="lg" />
             </div>
             <div className="absolute inset-0 border-4 border-cyan-400/20 rounded-full scale-[2] animate-ping opacity-20"></div>
          </div>
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-black text-white tracking-widest mb-2">SCANNING NEURAL NETWORK</h2>
            <div className="flex gap-1 justify-center">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}></div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Result View */}
      {showFullScreenResult && result && (
        <div className={`fixed inset-0 z-[110] flex flex-col items-center justify-center p-6 text-white animate-in zoom-in-95 duration-500 ${
          result.status === SafetyStatus.SAFE ? 'bg-emerald-950' : 'bg-red-950'
        }`}>
          {/* Status Glows */}
          <div className={`absolute inset-0 opacity-40 ${
            result.status === SafetyStatus.SAFE ? 'bg-[radial-gradient(circle_at_center,_#10b981_0%,_transparent_70%)]' : 'bg-[radial-gradient(circle_at_center,_#ef4444_0%,_transparent_70%)]'
          }`}></div>
          
          <div className="relative z-10 flex flex-col items-center max-w-lg w-full text-center">
            <div className="mb-8 scale-125">
               <Logo size="lg" />
            </div>

            <div className="space-y-4">
              <h2 className={`text-5xl font-black tracking-tighter mb-2 ${
                result.status === SafetyStatus.SAFE ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {result.status}
              </h2>
              
              <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="flex justify-center items-center gap-4 mb-6">
                  <div className="text-4xl font-black text-white">{result.score}/100</div>
                  <div className="h-8 w-px bg-white/20"></div>
                  <div className="text-xs uppercase tracking-widest font-bold opacity-60">Threat Index</div>
                </div>

                <p className="text-lg font-medium leading-relaxed mb-6 italic opacity-90">
                  "{result.explanation}"
                </p>

                <div className="space-y-4 text-left">
                   <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                      <h4 className="text-[10px] uppercase tracking-widest font-bold text-cyan-400 mb-2">Recommendation</h4>
                      <p className="text-sm">{result.recommendation}</p>
                   </div>
                   {result.threats.length > 0 && (
                     <div className="flex flex-wrap gap-2">
                        {result.threats.map((t, i) => (
                          <span key={i} className="text-[10px] font-bold px-2 py-1 bg-white/10 rounded border border-white/10 uppercase">{t}</span>
                        ))}
                     </div>
                   )}
                </div>
              </div>

              <div className="pt-8 flex flex-col gap-4 w-full">
                {result.status !== SafetyStatus.SAFE && (
                  <button 
                    onClick={() => { setShowFullScreenResult(false); setShowReportModal(true); }}
                    className="w-full py-4 bg-white text-red-950 font-black rounded-2xl shadow-xl hover:scale-105 transition-transform"
                  >
                    REPORT INCIDENT
                  </button>
                )}
                <button 
                  onClick={() => setShowFullScreenResult(false)}
                  className="w-full py-4 bg-white/10 border border-white/20 font-black rounded-2xl hover:bg-white/20 transition-all"
                >
                  DISMISS
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <span className="p-1.5 bg-slate-900 rounded-lg"><Logo size="sm" /></span>
            Neural Scan
          </h2>
          <p className="text-slate-500 text-sm mb-4">Analyze any digital content for malicious signatures.</p>
          
          <textarea
            className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none text-black placeholder:text-slate-400"
            placeholder="Paste suspicious text or links here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          <div className="mt-4 flex gap-3">
            <button
              onClick={handleScan}
              disabled={loading || !inputText}
              className={`flex-1 py-4 px-6 rounded-xl font-black tracking-widest uppercase transition-all ${
                loading || !inputText 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-slate-900 text-white hover:bg-slate-800 active:scale-95 shadow-lg'
              }`}
            >
              Initiate Analysis
            </button>
            <button 
              onClick={() => { setInputText(''); setResult(null); }}
              className="px-6 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 font-bold transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* History Section */}
      {history.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 animate-in fade-in duration-500">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Intelligence History
            </h3>
            <button 
              onClick={clearHistory}
              className="text-xs font-semibold text-slate-400 hover:text-red-500 transition-colors"
            >
              Purge History
            </button>
          </div>
          <div className="space-y-3">
            {history.map((entry) => (
              <div 
                key={entry.timestamp} 
                onClick={() => { setResult(entry.result); setShowFullScreenResult(true); }}
                className="p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-cyan-500/30 hover:bg-cyan-50/20 transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-1">
                  {getStatusBadge(entry.result.status)}
                  <span className="text-[10px] text-slate-400 font-medium">{new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-1 group-hover:text-slate-900 transition-colors">
                  {entry.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xl">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95">
            <div className="p-8 text-center border-b border-slate-100">
              <h3 className="text-2xl font-black text-slate-900">INCIDENT REPORT</h3>
              <p className="text-sm text-slate-500 mt-2">Classify this threat to alert authorities.</p>
            </div>
            <div className="p-4 space-y-2">
              {REPORT_CATEGORIES.map((cat) => (
                <a 
                  key={cat.id} 
                  href={cat.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-3xl border border-slate-100 hover:border-red-500 hover:bg-red-50 transition-all group"
                >
                  <span className="text-3xl">{cat.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900">{cat.label}</h4>
                    <p className="text-[10px] text-slate-500 leading-tight">{cat.description}</p>
                  </div>
                </a>
              ))}
            </div>
            <div className="p-6 bg-slate-50 text-center">
              <button onClick={() => setShowReportModal(false)} className="font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest text-xs">Close Incident</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
