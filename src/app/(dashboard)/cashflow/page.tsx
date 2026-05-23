'use client';

import { DollarSign, TrendingUp, TrendingDown, ClipboardCheck } from 'lucide-react';
import KPICard from '@/components/dashboard/KPICard';
import CashFlowChart from '@/components/cashflow/CashFlowChart';
import PaymentBreakdown from '@/components/cashflow/PaymentBreakdown';
import MismatchAlerts from '@/components/cashflow/MismatchAlerts';
import { cashMismatches } from '@/lib/mockData';
import type { KPIData } from '@/lib/types';
import styles from './page.module.css';

const cashKPIs: KPIData[] = [
  {
    label: 'Total Inflow',
    value: 482200,
    previousValue: 435000,
    change: 47200,
    changePercent: 10.85,
    trend: 'up',
    format: 'currency',
    icon: 'TrendingUp',
    color: '#10b981',
    sparklineData: [350000, 380000, 410000, 425000, 450000, 468000, 482200],
  },
  {
    label: 'Total Outflow',
    value: 98400,
    previousValue: 105000,
    change: -6600,
    changePercent: -6.29,
    trend: 'down',
    format: 'currency',
    icon: 'TrendingUp',
    color: '#ef4444',
    sparklineData: [120000, 115000, 108000, 105000, 102000, 100000, 98400],
  },
  {
    label: 'Net Cash Flow',
    value: 383800,
    previousValue: 330000,
    change: 53800,
    changePercent: 16.3,
    trend: 'up',
    format: 'currency',
    icon: 'TrendingUp',
    color: '#6366f1',
    sparklineData: [230000, 265000, 302000, 320000, 348000, 368000, 383800],
  },
  {
    label: 'Pending Verifications',
    value: 4,
    previousValue: 6,
    change: -2,
    changePercent: -33.33,
    trend: 'down',
    format: 'number',
    icon: 'TrendingUp',
    color: '#f59e0b',
    sparklineData: [8, 7, 6, 6, 5, 5, 4],
  },
];

export default function CashFlowPage() {
  return (
    <div className={styles.page}>
      {/* KPI Cards */}
      <div className={styles.kpiGrid}>
        {cashKPIs.map((kpi, index) => (
          <KPICard key={kpi.label} data={kpi} index={index} />
        ))}
      </div>

      {/* Chart + Payment Breakdown */}
      <div className={styles.chartRow}>
        <CashFlowChart />
        <PaymentBreakdown />
      </div>

      {/* Mismatch Alerts */}
      <MismatchAlerts mismatches={cashMismatches} />
    </div>
  );
}
