'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import type { Branch } from '@/lib/types';
import { formatCurrency, formatPercent } from '@/lib/utils';
import styles from './BranchSummary.module.css';

interface BranchSummaryProps {
  branches: Branch[];
}

export default function BranchSummary({ branches }: BranchSummaryProps) {
  const active = branches.filter((b) => b.status === 'active').length;
  const slow = branches.filter((b) => b.status === 'slow').length;
  const inactive = branches.filter((b) => b.status === 'inactive').length;

  const sorted = [...branches].sort((a, b) => b.todaySales - a.todaySales);
  const best = sorted[0];
  const worst = sorted[sorted.length - 1];
  const avgMargin = branches.reduce((s, b) => s + b.profitMargin, 0) / branches.length;

  const pieData = [
    { name: 'Active', value: active, color: '#10b981' },
    { name: 'Slow', value: slow, color: '#f59e0b' },
    { name: 'Inactive', value: inactive, color: '#ef4444' },
  ];

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Branch Summary</h3>

      <div className={styles.chartRow}>
        <div className={styles.pieWrapper}>
          <ResponsiveContainer width={100} height={100}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={45}
                strokeWidth={0}
                animationDuration={1200}
              >
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <span className={styles.pieCenter}>{branches.length}</span>
        </div>

        <div className={styles.statusList}>
          {pieData.map((item) => (
            <div key={item.name} className={styles.statusItem}>
              <span className={styles.dot} style={{ background: item.color }} />
              <span className={styles.statusLabel}>{item.name}</span>
              <span className={styles.statusCount}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.infoList}>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Best Branch</span>
          <span className={styles.infoValue} style={{ color: 'var(--color-success)' }}>
            {best?.name} · {formatCurrency(best?.todaySales || 0)}
          </span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Needs Attention</span>
          <span className={styles.infoValue} style={{ color: 'var(--color-danger)' }}>
            {worst?.name} · {formatCurrency(worst?.todaySales || 0)}
          </span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Avg. Profit Margin</span>
          <span className={styles.infoValue}>{formatPercent(avgMargin)}</span>
        </div>
      </div>
    </div>
  );
}
