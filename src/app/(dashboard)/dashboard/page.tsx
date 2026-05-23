'use client';

import KPICard from '@/components/dashboard/KPICard';
import RevenueChart from '@/components/charts/RevenueChart';
import BranchSummary from '@/components/dashboard/BranchSummary';
import BranchStatusGrid from '@/components/dashboard/BranchStatusGrid';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import TopProducts from '@/components/dashboard/TopProducts';
import { kpiData, branches, recentTransactions, topProducts } from '@/lib/mockData';
import styles from './page.module.css';

export default function DashboardPage() {
  return (
    <div className={styles.page}>
      {/* KPI Cards Row */}
      <div className={styles.kpiGrid}>
        {kpiData.map((kpi, index) => (
          <KPICard key={kpi.label} data={kpi} index={index} />
        ))}
      </div>

      {/* Revenue Chart + Branch Summary */}
      <div className={styles.chartRow}>
        <RevenueChart />
        <BranchSummary branches={branches} />
      </div>

      {/* Branch Status Grid */}
      <BranchStatusGrid branches={branches} />

      {/* Recent Transactions + Top Products */}
      <div className={styles.bottomRow}>
        <RecentTransactions transactions={recentTransactions} />
        <TopProducts products={topProducts} />
      </div>
    </div>
  );
}
