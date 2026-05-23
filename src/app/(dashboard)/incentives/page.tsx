'use client';

import { Target, Gift, Trophy, Zap } from 'lucide-react';
import KPICard from '@/components/dashboard/KPICard';
import ActiveSchemes from '@/components/incentives/ActiveSchemes';
import EligibilityTracker from '@/components/incentives/EligibilityTracker';
import { incentiveSchemes, incentiveEligibilities, employees, branches } from '@/lib/mockData';
import type { KPIData } from '@/lib/types';
import styles from './page.module.css';

const activeSchemes = incentiveSchemes.filter(s => s.isActive);
const eligibleEmployeesCount = incentiveEligibilities.filter(e => e.isEligible).length;

const incKPIs: KPIData[] = [
  {
    label: 'Active Schemes',
    value: activeSchemes.length,
    previousValue: activeSchemes.length,
    change: 0,
    changePercent: 0,
    trend: 'neutral',
    format: 'number',
    icon: 'Target',
    color: '#8b5cf6',
  },
  {
    label: 'Eligible Employees',
    value: eligibleEmployeesCount,
    previousValue: eligibleEmployeesCount - 1,
    change: 1,
    changePercent: 12.5,
    trend: 'up',
    format: 'number',
    icon: 'Trophy',
    color: '#10b981',
  },
  {
    label: 'Total Incentives Paid',
    value: 85000,
    previousValue: 72000,
    change: 13000,
    changePercent: 18.05,
    trend: 'up',
    format: 'currency',
    icon: 'Gift',
    color: '#f59e0b',
  },
  {
    label: 'Top Commission Earner',
    value: 12500,
    previousValue: 11000,
    change: 1500,
    changePercent: 13.6,
    trend: 'up',
    format: 'currency',
    icon: 'Zap',
    color: '#3b82f6',
  },
];

export default function IncentivesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.kpiGrid}>
        {incKPIs.map((kpi, index) => (
          <KPICard key={kpi.label} data={kpi} index={index} />
        ))}
      </div>

      <div className={styles.contentGrid}>
        <ActiveSchemes schemes={incentiveSchemes} />
        <EligibilityTracker eligibilities={incentiveEligibilities} employees={employees} branches={branches} />
      </div>
    </div>
  );
}
