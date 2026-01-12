
import React from 'react';
import { CyberTip } from '../types';

const tips: CyberTip[] = [
  {
    title: "The Golden Rule of Links",
    content: "If you weren't expecting a link, don't click it. Even if it looks like it's from a friend or a bank, verify through a separate channel first.",
    category: 'phishing'
  },
  {
    title: "Check the Domain",
    content: "Scammers use names like 'google-security.net' instead of 'google.com'. Always check the spelling of the website address carefully.",
    category: 'phishing'
  },
  {
    title: "Urgency is a Red Flag",
    content: "Phishing messages often create a sense of panic ('Account Blocked!', 'Immediate Action Required!'). Take a breath; real companies rarely act this way.",
    category: 'phishing'
  },
  {
    title: "OTP Security",
    content: "Never share your One-Time Password (OTP) with anyone over the phone or text, even if they claim to be from your bank.",
    category: 'passwords'
  }
];

export const SafetyTips: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-900 px-1">Cyber Safety Tips</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tips.map((tip, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                {tip.category === 'phishing' ? '🎣' : '🔑'}
              </div>
              <h3 className="font-bold text-slate-800">{tip.title}</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">{tip.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
