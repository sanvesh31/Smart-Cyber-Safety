
import React, { useState } from 'react';
import { analyzeMessage } from '../services/geminiService';
import { ScanResult, SafetyStatus, ReportCategory } from '../types';

const REPORT_CATEGORIES: ReportCategory[] = [
  {
    id: 'financial',
    label: 'Financial Fraud',
    icon: '🏦',
    url: 'https://www.cybercrime.gov.in/', // Default global or local example
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

export const Scanner: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);

  const handleScan = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    const analysis = await analyzeMessage(inputText);
    setResult(analysis);
    setLoading(false);
    // Clear input after successful scan
    setInputText('');
  };

  const getStatusColor = (status: SafetyStatus) => {
    switch (status) {
      case SafetyStatus.SAFE: return 'bg-green-100 text-green-800 border-green-200';
      case SafetyStatus.SUSPICIOUS: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case SafetyStatus.DANGEROUS: return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="relative">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Message Scanner</h2>
          <p className="text-slate-500 text-sm mb-4">Paste an SMS, WhatsApp message, or link to check for threats.</p>
          
          <textarea
            className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none text-black placeholder:text-slate-400"
            placeholder="e.g. 'Your bank account is locked! Click here to verify: http://bit.ly/fake-bank'"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          <div className="mt-4 flex gap-3">
            <button
              onClick={handleScan}
              disabled={loading || !inputText}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                loading || !inputText 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </span>
              ) : 'Scan for Threats'}
            </button>
            <button 
              onClick={() => { setInputText(''); setResult(null); }}
              className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {result && (
          <div className={`p-6 border-t ${getStatusColor(result.status)} animate-in fade-in slide-in-from-top-2`}>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">
                    {result.status === SafetyStatus.SAFE ? '✅' : result.status === SafetyStatus.SUSPICIOUS ? '⚠️' : '🚨'}
                  </span>
                  <h3 className="font-bold text-lg">Result: {result.status}</h3>
                </div>
                <p className="font-medium mb-1">Threat Score: {result.score}/100</p>
              </div>
            </div>
            
            <div className="mt-4 space-y-3 text-sm">
              <div>
                <span className="font-bold">Detected Patterns:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {result.threats.length > 0 ? result.threats.map((t, i) => (
                    <span key={i} className="px-2 py-1 bg-white/50 rounded-md border border-black/5">{t}</span>
                  )) : <span className="text-slate-500 italic">No malicious patterns detected</span>}
                </div>
              </div>
              
              <div>
                <span className="font-bold">Recommendation:</span>
                <p className="mt-1">{result.recommendation}</p>
              </div>

              <div className="p-3 bg-white/40 rounded-lg border border-black/5 italic">
                "{result.explanation}"
              </div>
            </div>

            {result.status !== SafetyStatus.SAFE && (
              <button 
                onClick={() => setShowReportModal(true)}
                className="w-full mt-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-200 active:scale-95"
              >
                Report This Scam
              </button>
            )}
          </div>
        )}
      </div>

      {/* Report Type Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 bg-slate-50 border-b border-slate-100">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-900">What type of scam is this?</h3>
                <button onClick={() => setShowReportModal(false)} className="text-slate-400 hover:text-slate-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <p className="text-sm text-slate-500 mt-1">Select a category to be redirected to the right reporting portal.</p>
            </div>
            <div className="p-4 space-y-3">
              {REPORT_CATEGORIES.map((cat) => (
                <a 
                  key={cat.id} 
                  href={cat.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-blue-500 hover:bg-blue-50 transition-all group"
                >
                  <span className="text-3xl">{cat.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900">{cat.label}</h4>
                    <p className="text-xs text-slate-500">{cat.description}</p>
                  </div>
                  <svg className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </a>
              ))}
            </div>
            <div className="p-4 bg-slate-50 text-center">
              <button onClick={() => setShowReportModal(false)} className="text-sm font-semibold text-slate-500 hover:text-slate-700">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
