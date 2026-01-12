
import React, { useState, useEffect } from 'react';
import { Scanner } from './components/Scanner';
import { SafetyTips } from './components/SafetyTips';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'scan' | 'tips' | 'report'>('scan');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoadingAuth(true);
    // Simulate Google OAuth redirect/callback
    setTimeout(() => {
      setIsAuthenticated(true);
      setIsLoadingAuth(false);
    }, 1500);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('scan');
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSent(true);
    setTimeout(() => {
      setShowFeedbackModal(false);
      setFeedbackSent(false);
    }, 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-slate-50">
        <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-xl border border-slate-200 p-10 text-center animate-in fade-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-blue-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Smart Cyber Safety</h1>
          <p className="text-slate-500 mb-8">Secure your digital life with AI-powered protection. Log in to start scanning.</p>
          
          <button 
            onClick={handleGoogleLogin}
            disabled={isLoadingAuth}
            className="w-full flex items-center justify-center gap-3 py-4 border-2 border-slate-100 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-95 disabled:opacity-50"
          >
            {isLoadingAuth ? (
               <svg className="animate-spin h-5 w-5 text-blue-600" viewBox="0 0 24 24">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
            ) : (
              <>
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </>
            )}
          </button>
          
          <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col gap-3">
             <p className="text-xs text-slate-400">By continuing, you agree to our Terms of Service and Privacy Policy.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-8">
      {/* Header */}
      <header className="bg-blue-600 text-white pt-8 pb-12 px-6 rounded-b-[2rem] shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Smart Cyber Safety</h1>
            <p className="text-blue-100 text-sm mt-1">AI-Powered Phishing Protection</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowFeedbackModal(true)}
              className="bg-white/10 hover:bg-white/20 p-2 rounded-xl backdrop-blur-sm transition-colors flex items-center gap-2 border border-white/20"
            >
              <span className="hidden sm:inline text-sm font-medium">Feedback</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </button>
            <button 
              onClick={handleLogout}
              className="bg-red-500/20 hover:bg-red-500/30 p-2 rounded-xl backdrop-blur-sm transition-colors border border-red-500/30"
              title="Logout"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 -mt-6">
        {activeTab === 'scan' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Scanner />
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-md">
              <h3 className="text-lg font-bold mb-2">Protect Your Circle</h3>
              <p className="text-blue-50 opacity-90 text-sm">Found a suspicious link? Reporting it to official portals helps block it for everyone else in real-time.</p>
              <button 
                onClick={() => setActiveTab('report')}
                className="mt-4 px-6 py-2 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors"
              >
                Learn How to Report
              </button>
            </div>
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SafetyTips />
          </div>
        )}

        {activeTab === 'report' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Official Reporting Guide</h2>
            <p className="text-slate-600 mb-6">In case of financial fraud or phishing, use these direct government resources. Your report can prevent others from being scammed.</p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600 font-bold">1</div>
                <div>
                  <h4 className="font-bold text-slate-800">Screenshot Evidence</h4>
                  <p className="text-sm text-slate-500">Keep clear records of the message content and the sender number.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600 font-bold">2</div>
                <div>
                  <h4 className="font-bold text-slate-800">Contact Your Bank</h4>
                  <p className="text-sm text-slate-500">If you clicked a financial link, call your bank's official helpline to block cards immediately.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-blue-100">
                <div className="bg-blue-600 p-2 rounded-lg text-white font-bold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.823a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101" /></svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-800">Official Portals</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <a href="https://www.cybercrime.gov.in/" target="_blank" className="text-xs font-bold text-blue-600 underline">Cybercrime India</a>
                    <a href="https://www.ic3.gov/" target="_blank" className="text-xs font-bold text-blue-600 underline">IC3 (USA)</a>
                    <a href="https://www.actionfraud.police.uk/" target="_blank" className="text-xs font-bold text-blue-600 underline">Action Fraud (UK)</a>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setActiveTab('scan')}
              className="w-full mt-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
            >
              Back to Scanner
            </button>
          </div>
        )}
      </main>

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Help Us Improve</h3>
            <p className="text-sm text-slate-500 mb-6">Your feedback helps us train our AI to be more accurate against new scam patterns.</p>
            
            {feedbackSent ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h4 className="text-lg font-bold text-slate-900">Thank You!</h4>
                <p className="text-slate-500">Your feedback has been received.</p>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">How accurate was the scan?</label>
                  <div className="flex justify-between gap-2">
                    {['😞', '😐', '🙂', '🤩'].map((emoji, i) => (
                      <button key={i} type="button" className="flex-1 p-3 border border-slate-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all text-2xl">
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Additional comments</label>
                  <textarea 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-24 text-black"
                    placeholder="Tell us what we missed..."
                    required
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button 
                    type="button"
                    onClick={() => setShowFeedbackModal(false)}
                    className="flex-1 py-3 text-slate-500 font-bold"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-[2] py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200"
                  >
                    Submit Feedback
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around items-center h-20 px-4 md:hidden z-40">
        <button 
          onClick={() => setActiveTab('scan')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'scan' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-wider">Scan</span>
        </button>
        <button 
          onClick={() => setActiveTab('tips')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'tips' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-wider">Tips</span>
        </button>
        <button 
          onClick={() => setActiveTab('report')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'report' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-[10px] font-bold uppercase tracking-wider">Report</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
