'use client';

import { Receipt, CheckCircle, Clock, AlertTriangle, Eye } from 'lucide-react';
import type { Bill } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import styles from './RecentScans.module.css';

interface RecentScansProps {
  bills: Bill[];
  onViewBill: (bill: Bill) => void;
}

export default function RecentScans({ bills, onViewBill }: RecentScansProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle size={16} className={styles.iconVerified} />;
      case 'pending': return <Clock size={16} className={styles.iconPending} />;
      case 'flagged': return <AlertTriangle size={16} className={styles.iconFlagged} />;
      default: return <Clock size={16} />;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <Receipt size={18} className={styles.iconTitle} />
          Recent Scans
        </h3>
        <span className={styles.subtitle}>{bills.length} bills processed</span>
      </div>

      <div className={styles.grid}>
        {bills.map(bill => (
          <div key={bill.id} className={styles.card} onClick={() => onViewBill(bill)}>
            <div className={styles.cardHeader}>
              <span className={styles.vendor}>{bill.vendor}</span>
              <div className={styles.statusWrap}>
                {getStatusIcon(bill.status)}
                <span className={`${styles.statusText} ${styles[bill.status]}`}>
                  {bill.status}
                </span>
              </div>
            </div>
            
            <div className={styles.cardBody}>
              <div className={styles.infoCol}>
                <span className={styles.label}>Amount</span>
                <span className={styles.value}>{formatCurrency(bill.amount)}</span>
              </div>
              <div className={styles.infoCol}>
                <span className={styles.label}>Category</span>
                <span className={styles.valueText}>{bill.category}</span>
              </div>
            </div>
            
            <div className={styles.cardFooter}>
              <span className={styles.date}>{new Date(bill.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              <button className={styles.btnView}><Eye size={14} /> Review</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
