'use client';

import { AlertTriangle, Search, CheckCircle, XCircle } from 'lucide-react';
import type { CashMismatch } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import styles from './MismatchAlerts.module.css';

const severityColors: Record<string, string> = {
  critical: '#ef4444', high: '#f97316', medium: '#f59e0b', low: '#06b6d4',
};
const statusConfig: Record<string, { label: string; color: string }> = {
  detected: { label: 'Detected', color: '#ef4444' },
  investigating: { label: 'Investigating', color: '#f59e0b' },
  resolved: { label: 'Resolved', color: '#10b981' },
  dismissed: { label: 'Dismissed', color: '#6b7280' },
};

interface MismatchAlertsProps {
  mismatches: CashMismatch[];
}

export default function MismatchAlerts({ mismatches }: MismatchAlertsProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <AlertTriangle size={18} style={{ color: '#f59e0b' }} />
          Cash Mismatches
        </h3>
        <span className={styles.count}>{mismatches.length} alerts</span>
      </div>

      <div className={styles.list}>
        {mismatches.map((m, i) => {
          const sColor = severityColors[m.severity] || '#6b7280';
          const status = statusConfig[m.status] || statusConfig.detected;

          return (
            <div
              key={m.id}
              className={styles.alert}
              style={{ borderLeftColor: sColor, animationDelay: `${600 + i * 80}ms` }}
            >
              <div className={styles.alertHeader}>
                <span className={styles.branchName}>{m.branchName}</span>
                <span className={styles.date}>{formatDate(m.date)}</span>
              </div>

              <div className={styles.amounts}>
                <div className={styles.amountItem}>
                  <span className={styles.amountLabel}>Expected</span>
                  <span className={styles.amountValue}>{formatCurrency(m.expectedAmount)}</span>
                </div>
                <span className={styles.amountDivider}>→</span>
                <div className={styles.amountItem}>
                  <span className={styles.amountLabel}>Actual</span>
                  <span className={styles.amountValue}>{formatCurrency(m.actualAmount)}</span>
                </div>
                <div className={styles.amountItem}>
                  <span className={styles.amountLabel}>Mismatch</span>
                  <span className={styles.mismatchValue}>-{formatCurrency(m.mismatchAmount)}</span>
                </div>
              </div>

              <p className={styles.description}>{m.description}</p>

              <div className={styles.alertFooter}>
                <span className={styles.statusBadge} style={{ color: status.color, borderColor: `${status.color}40`, background: `${status.color}10` }}>
                  {status.label}
                </span>
                <span className={styles.severityBadge} style={{ color: sColor, borderColor: `${sColor}40`, background: `${sColor}10` }}>
                  {m.severity}
                </span>
                <div className={styles.actions}>
                  <button className={styles.actionBtn}><Search size={14} /> Investigate</button>
                  <button className={styles.actionBtn}><CheckCircle size={14} /> Resolve</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
