'use client';

import { Users, Award, Briefcase, UserCheck } from 'lucide-react';
import KPICard from '@/components/dashboard/KPICard';
import TopPerformers from '@/components/employees/TopPerformers';
import EmployeeLeaderboard from '@/components/employees/EmployeeLeaderboard';
import { employees } from '@/lib/mockData';
import type { KPIData } from '@/lib/types';
import styles from './page.module.css';

const salespersons = employees.filter(e => e.role === 'salesperson');
const activeEmployees = employees.filter(e => e.isOnDuty);

const empKPIs: KPIData[] = [
  {
    label: 'Total Workforce',
    value: employees.length,
    previousValue: employees.length,
    change: 0,
    changePercent: 0,
    trend: 'neutral',
    format: 'number',
    icon: 'Users',
    color: '#3b82f6',
    sparklineData: [15, 15, 15, 15, 15, 15, 15],
  },
  {
    label: 'Avg Conversion Rate',
    value: 41.5,
    previousValue: 38.2,
    change: 3.3,
    changePercent: 8.6,
    trend: 'up',
    format: 'percent',
    icon: 'TrendingUp',
    color: '#10b981',
    sparklineData: [35, 36, 38, 38, 40, 41, 41.5],
  },
  {
    label: 'Badges Awarded',
    value: 16,
    previousValue: 12,
    change: 4,
    changePercent: 33.3,
    trend: 'up',
    format: 'number',
    icon: 'Award',
    color: '#f59e0b',
    sparklineData: [8, 10, 10, 12, 14, 15, 16],
  },
  {
    label: 'Present Today',
    value: activeEmployees.length,
    previousValue: employees.length,
    change: activeEmployees.length - employees.length,
    changePercent: ((activeEmployees.length - employees.length) / employees.length) * 100,
    trend: activeEmployees.length < employees.length ? 'down' : 'neutral',
    format: 'number',
    icon: 'UserCheck',
    color: '#06b6d4',
    sparklineData: [15, 14, 15, 15, 13, 14, activeEmployees.length],
  },
];

export default function EmployeesPage() {
  return (
    <div className={styles.page}>
      {/* KPI Cards */}
      <div className={styles.kpiGrid}>
        {empKPIs.map((kpi, index) => (
          <KPICard key={kpi.label} data={kpi} index={index} />
        ))}
      </div>

      {/* Main Content */}
      <div className={styles.contentGrid}>
        <TopPerformers employees={employees} />
        <EmployeeLeaderboard employees={employees} />
      </div>
    </div>
  );
}
