'use client';

import type { Branch } from '@/lib/types';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/utils';
import { BRANCH_STATUSES } from '@/lib/constants';
import styles from './BranchStatusGrid.module.css';

interface BranchStatusGridProps {
  branches: Branch[];
}

export default function BranchStatusGrid({ branches }: BranchStatusGridProps) {
  const maxRevenue = Math.max(...branches.map((b) => b.todaySales));

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>Branch Status</h3>
      </div>
      <div className={styles.scrollArea}>
        {branches.map((branch, i) => {
          const statusConfig = BRANCH_STATUSES[branch.status];
          const revenuePercent = maxRevenue > 0 ? (branch.todaySales / maxRevenue) * 100 : 0;

          return (
            <div
              key={branch.id}
              className={styles.card}
              style={{ animationDelay: `${600 + i * 80}ms` }}
            >
              <div
                className={styles.cardBorder}
                style={{ background: statusConfig.color }}
              />
              <div className={styles.statusRow}>
                <span
                  className={styles.statusDot}
                  style={{ background: statusConfig.color, boxShadow: `0 0 8px ${statusConfig.color}` }}
                />
                <span className={styles.branchName}>{branch.name}</span>
                <span className={styles.branchCity}>{branch.city}</span>
              </div>

              <div className={styles.revenue}>{formatCurrency(branch.todaySales)}</div>

              <div className={styles.statsGrid}>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Transactions</span>
                  <span className={styles.statValue}>{formatNumber(branch.todayTransactions)}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Employees</span>
                  <span className={styles.statValue}>{branch.employeeCount}</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Profit</span>
                  <span className={styles.statValue} style={{ color: branch.profitMargin > 15 ? 'var(--color-success)' : 'var(--color-warning)' }}>
                    {formatPercent(branch.profitMargin)}
                  </span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Manager</span>
                  <span className={styles.statValue}>{branch.manager.split(' ')[0]}</span>
                </div>
              </div>

              <div className={styles.revenueBar}>
                <div
                  className={styles.revenueBarFill}
                  style={{
                    width: `${revenuePercent}%`,
                    background: `linear-gradient(90deg, ${statusConfig.color}80, ${statusConfig.color})`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
