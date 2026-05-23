'use client';

import { Check, X, Edit3, Image as ImageIcon, Zap } from 'lucide-react';
import { useState } from 'react';
import type { Bill } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import styles from './BillVerificationPane.module.css';

interface BillVerificationPaneProps {
  bill: Bill;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export default function BillVerificationPane({ bill, onApprove, onReject }: BillVerificationPaneProps) {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.titleWrap}>
          <h3 className={styles.title}>AI Extraction Review</h3>
          <span className={styles.confidenceBadge}>
            <Zap size={12} /> {Math.round(bill.confidence * 100)}% Confidence
          </span>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnIcon} onClick={() => setIsEditing(!isEditing)}>
            <Edit3 size={16} /> {isEditing ? 'Cancel Edit' : 'Edit Fields'}
          </button>
        </div>
      </div>

      <div className={styles.paneContainer}>
        {/* Left Pane: Image Viewer */}
        <div className={styles.imagePane}>
          <div className={styles.imageHeader}>
            <span className={styles.imageName}>{bill.id}.pdf</span>
          </div>
          <div className={styles.imageViewer}>
            {/* Using a placeholder since we don't have real uploaded images */}
            <div className={styles.imagePlaceholder}>
              <ImageIcon size={48} className={styles.placeholderIcon} />
              <p>Scanned Document</p>
            </div>
            
            {/* Simulated extraction bounding boxes */}
            <div className={styles.boundingBox} style={{ top: '20%', left: '10%', width: '40%', height: '8%' }} />
            <div className={styles.boundingBox} style={{ top: '40%', left: '10%', width: '80%', height: '5%' }} />
            <div className={styles.boundingBox} style={{ top: '80%', left: '50%', width: '40%', height: '10%' }} />
          </div>
        </div>

        {/* Right Pane: Data Form */}
        <div className={styles.dataPane}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Vendor Name</label>
            <input type="text" className={styles.input} defaultValue={bill.vendor} disabled={!isEditing} />
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Date</label>
              <input type="date" className={styles.input} defaultValue={new Date(bill.date).toISOString().split('T')[0]} disabled={!isEditing} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Category</label>
              <input type="text" className={styles.input} defaultValue={bill.category} disabled={!isEditing} />
            </div>
          </div>

          <div className={styles.itemsSection}>
            <h4 className={styles.sectionTitle}>Line Items ({bill.items.length})</h4>
            <div className={styles.itemsList}>
              {bill.items.map((item, idx) => (
                <div key={idx} className={styles.itemRow}>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemQty}>{item.quantity}x @ {formatCurrency(item.rate)}</span>
                  </div>
                  <span className={styles.itemTotal}>{formatCurrency(item.amount)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.totalsSection}>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Subtotal</span>
              <span className={styles.totalValue}>{formatCurrency(bill.amount - bill.gstAmount)}</span>
            </div>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>GST</span>
              <span className={styles.totalValue}>{formatCurrency(bill.gstAmount)}</span>
            </div>
            <div className={`${styles.totalRow} ${styles.grandTotal}`}>
              <span className={styles.totalLabel}>Total Amount</span>
              <span className={styles.totalValue}>{formatCurrency(bill.amount)}</span>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <button className={`${styles.btn} ${styles.btnReject}`} onClick={() => onReject(bill.id)}>
              <X size={16} /> Flag Issue
            </button>
            <button className={`${styles.btn} ${styles.btnApprove}`} onClick={() => onApprove(bill.id)}>
              <Check size={16} /> Approve & Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
