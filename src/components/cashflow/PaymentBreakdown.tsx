'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { recentTransactions } from '@/lib/mockData';
import { formatCurrency, formatPercent } from '@/lib/utils';
import styles from './PaymentBreakdown.module.css';

const colors: Record<string, string> = {
  cash: '#10b981', upi: '#8b5cf6', card: '#06b6d4', netbanking: '#f59e0b', wallet: '#ec4899',
};
const labels: Record<string, string> = {
  cash: 'Cash', upi: 'UPI', card: 'Card', netbanking: 'Net Banking', wallet: 'Wallet',
};

export default function PaymentBreakdown() {
  // Aggregate from transactions
  const totals: Record<string, number> = {};
  recentTransactions.forEach((tx) => {
    if (tx.amount > 0) {
      totals[tx.paymentMethod] = (totals[tx.paymentMethod] || 0) + tx.amount;
    }
  });

  // Ensure we have all methods with some data
  if (!totals.cash) totals.cash = 185000;
  if (!totals.upi) totals.upi = 142000;
  if (!totals.card) totals.card = 118000;
  if (!totals.netbanking) totals.netbanking = 22000;
  if (!totals.wallet) totals.wallet = 15200;

  const total = Object.values(totals).reduce((s, v) => s + v, 0);
  const data = Object.entries(totals).map(([key, value]) => ({
    name: labels[key] || key,
    value,
    color: colors[key] || '#6b7280',
    percent: (value / total) * 100,
  }));

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Payment Methods</h3>

      <div className={styles.chartWrap}>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              strokeWidth={0}
              animationDuration={1200}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className={styles.centerText}>
          <span className={styles.centerAmount}>{formatCurrency(total)}</span>
          <span className={styles.centerLabel}>Total</span>
        </div>
      </div>

      <div className={styles.legend}>
        {data.map((item) => (
          <div key={item.name} className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: item.color }} />
            <span className={styles.legendName}>{item.name}</span>
            <span className={styles.legendPercent}>{formatPercent(item.percent, 0)}</span>
            <span className={styles.legendAmount}>{formatCurrency(item.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
