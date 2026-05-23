'use client';

import { useState } from 'react';
import { Receipt, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import KPICard from '@/components/dashboard/KPICard';
import BillUploader from '@/components/bills/BillUploader';
import BillVerificationPane from '@/components/bills/BillVerificationPane';
import RecentScans from '@/components/bills/RecentScans';
import { bills } from '@/lib/mockData';
import type { Bill, KPIData } from '@/lib/types';
import styles from './page.module.css';

const pendingCount = bills.filter(b => b.status === 'pending').length;
const flaggedCount = bills.filter(b => b.status === 'flagged').length;
const verifiedCount = bills.filter(b => b.status === 'verified').length;

const billKPIs: KPIData[] = [
  {
    label: 'Total Scans (Month)',
    value: bills.length + 42,
    previousValue: 35,
    change: 10,
    changePercent: 28.5,
    trend: 'up',
    format: 'number',
    icon: 'Receipt',
    color: '#3b82f6',
  },
  {
    label: 'Pending Verification',
    value: pendingCount,
    previousValue: pendingCount + 5,
    change: -5,
    changePercent: -10,
    trend: 'down',
    format: 'number',
    icon: 'Clock',
    color: '#8b5cf6',
  },
  {
    label: 'Flagged Issues',
    value: flaggedCount,
    previousValue: 0,
    change: flaggedCount,
    changePercent: 100,
    trend: 'up',
    format: 'number',
    icon: 'AlertTriangle',
    color: '#f59e0b',
  },
  {
    label: 'Auto-Verified',
    value: verifiedCount + 30,
    previousValue: 20,
    change: 11,
    changePercent: 55,
    trend: 'up',
    format: 'number',
    icon: 'CheckCircle',
    color: '#10b981',
  },
];

export default function BillsPage() {
  const [selectedBill, setSelectedBill] = useState<Bill | null>(bills.find(b => b.status === 'pending') || null);

  const handleApprove = (id: string) => {
    alert(`Bill ${id} approved & saved to ledger!`);
    setSelectedBill(null);
  };

  const handleReject = (id: string) => {
    alert(`Bill ${id} flagged for manual audit.`);
    setSelectedBill(null);
  };

  return (
    <div className={styles.page}>
      <div className={styles.kpiGrid}>
        {billKPIs.map((kpi, index) => (
          <KPICard key={kpi.label} data={kpi} index={index} />
        ))}
      </div>

      <div className={styles.contentLayout}>
        <div className={styles.mainContent}>
          {selectedBill ? (
            <div className={styles.verificationSection}>
              <div className={styles.backNav}>
                <button className={styles.btnBack} onClick={() => setSelectedBill(null)}>
                  ← Back to Uploader
                </button>
              </div>
              <BillVerificationPane 
                bill={selectedBill} 
                onApprove={handleApprove} 
                onReject={handleReject} 
              />
            </div>
          ) : (
            <BillUploader />
          )}
        </div>
      </div>

      <RecentScans bills={bills} onViewBill={(bill) => setSelectedBill(bill)} />
    </div>
  );
}
