'use client';

import { Banknote, Smartphone, CreditCard, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import type { Transaction } from '@/lib/types';
import { formatCurrency, formatRelativeTime } from '@/lib/utils';
import styles from './RecentTransactions.module.css';

const paymentIcons: Record<string, { icon: React.ComponentType<{size?: number}>; color: string }> = {
  cash: { icon: Banknote, color: '#10b981' },
  upi: { icon: Smartphone, color: '#8b5cf6' },
  card: { icon: CreditCard, color: '#06b6d4' },
  netbanking: { icon: CreditCard, color: '#f59e0b' },
  wallet: { icon: CreditCard, color: '#ec4899' },
};

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>Recent Transactions</h3>
        <button className={styles.viewAll}>View All</button>
      </div>
      <div className={styles.list}>
        {transactions.map((tx, i) => {
          const pm = paymentIcons[tx.paymentMethod] || paymentIcons.cash;
          const Icon = pm.icon;
          const isNegative = tx.amount < 0;

          return (
            <div
              key={tx.id}
              className={styles.row}
              style={{ animationDelay: `${800 + i * 60}ms` }}
            >
              <div className={styles.iconWrap} style={{ background: `${pm.color}15` }}>
                <Icon size={16} />
              </div>
              <div className={styles.info}>
                <span className={styles.desc}>{tx.description}</span>
                <span className={styles.meta}>
                  <span className={styles.branch}>{tx.branchName.replace('Colide ', '')}</span>
                  <span className={styles.time}>{formatRelativeTime(tx.timestamp)}</span>
                </span>
              </div>
              <div className={styles.amountWrap}>
                <span className={isNegative ? styles.amountNeg : styles.amountPos}>
                  {isNegative ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
                  {formatCurrency(Math.abs(tx.amount))}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
