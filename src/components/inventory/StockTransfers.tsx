'use client';

import { ArrowRightLeft, Sparkles, Check, X } from 'lucide-react';
import type { StockTransfer } from '@/lib/types';
import styles from './StockTransfers.module.css';

interface StockTransfersProps {
  transfers: StockTransfer[];
}

export default function StockTransfers({ transfers }: StockTransfersProps) {
  const suggestedTransfers = transfers.filter(t => t.status === 'suggested');

  if (suggestedTransfers.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <Sparkles size={18} className={styles.iconAI} />
          AI Stock Transfer Suggestions
        </h3>
        <span className={styles.subtitle}>{suggestedTransfers.length} recommendations</span>
      </div>

      <div className={styles.list}>
        {suggestedTransfers.map(transfer => (
          <div key={transfer.id} className={styles.transferCard}>
            <div className={styles.productRow}>
              <span className={styles.productName}>{transfer.productName}</span>
              <span className={styles.qtyBadge}>{transfer.quantity} units</span>
            </div>

            <div className={styles.routeRow}>
              <div className={styles.branchCol}>
                <span className={styles.label}>From (Surplus)</span>
                <span className={styles.branchName}>{transfer.fromBranchName}</span>
              </div>
              <div className={styles.arrowWrap}>
                <ArrowRightLeft size={16} className={styles.iconArrow} />
              </div>
              <div className={styles.branchCol}>
                <span className={styles.label}>To (Deficit)</span>
                <span className={styles.branchName}>{transfer.toBranchName}</span>
              </div>
            </div>

            <p className={styles.reasonText}>{transfer.reason}</p>

            <div className={styles.actions}>
              <button className={`${styles.btn} ${styles.btnReject}`}>
                <X size={14} /> Reject
              </button>
              <button className={`${styles.btn} ${styles.btnApprove}`}>
                <Check size={14} /> Approve Transfer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
