
export enum SafetyStatus {
  SAFE = 'SAFE',
  SUSPICIOUS = 'SUSPICIOUS',
  DANGEROUS = 'DANGEROUS',
  UNKNOWN = 'UNKNOWN'
}

export interface ScanResult {
  status: SafetyStatus;
  score: number; // 0 to 100
  threats: string[];
  recommendation: string;
  explanation: string;
}

export interface CyberTip {
  title: string;
  content: string;
  category: 'phishing' | 'passwords' | 'privacy' | 'social-media';
}

export interface ReportCategory {
  id: string;
  label: string;
  icon: string;
  url: string;
  description: string;
}
