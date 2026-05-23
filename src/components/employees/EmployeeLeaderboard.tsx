'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { Employee } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import styles from './EmployeeLeaderboard.module.css';

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899', '#06b6d4'];

interface EmployeeLeaderboardProps {
  employees: Employee[];
}

export default function EmployeeLeaderboard({ employees }: EmployeeLeaderboardProps) {
  const salespersons = employees
    .filter(e => e.role === 'salesperson')
    .sort((a, b) => b.monthSales - a.monthSales);
    
  // Top 5 for Pie Chart, others grouped as "Others"
  const top5 = salespersons.slice(0, 5);
  const othersSales = salespersons.slice(5).reduce((acc, curr) => acc + curr.monthSales, 0);
  
  const chartData = [
    ...top5.map((e, i) => ({ name: e.name, value: e.monthSales, color: COLORS[i] })),
  ];
  if (othersSales > 0) {
    chartData.push({ name: 'Others', value: othersSales, color: '#6b7280' });
  }

  const totalSales = chartData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Revenue Share & Leaderboard</h3>
      
      <div className={styles.content}>
        {/* Pie Chart Section */}
        <div className={styles.chartSection}>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  animationDuration={1200}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0.2)" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), 'Revenue']}
                  contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className={styles.centerText}>
              <span className={styles.centerTotal}>{formatCurrency(totalSales)}</span>
              <span className={styles.centerLabel}>Total Revenue</span>
            </div>
          </div>
          
          <div className={styles.legend}>
            {chartData.map((item, i) => (
              <div key={i} className={styles.legendItem}>
                <span className={styles.legendDot} style={{ background: item.color }} />
                <span className={styles.legendName}>{item.name}</span>
                <span className={styles.legendValue}>{((item.value / totalSales) * 100).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard List Section */}
        <div className={styles.listSection}>
          <div className={styles.listHeader}>
            <span>Rank & Name</span>
            <span>Branch</span>
            <span>Monthly Sales</span>
            <span>Conv. Rate</span>
            <span>Points</span>
          </div>
          
          <div className={styles.list}>
            {salespersons.map((emp) => (
              <div key={emp.id} className={styles.listItem}>
                <div className={styles.colName}>
                  <div className={styles.rankBadge}>{emp.rank}</div>
                  <div className={styles.empInfo}>
                    <span className={styles.name}>{emp.name}</span>
                    <span className={styles.level}>{emp.level}</span>
                  </div>
                </div>
                <div className={styles.colBranch}>{emp.branchName}</div>
                <div className={styles.colSales}>{formatCurrency(emp.monthSales)}</div>
                <div className={styles.colConv}>
                  <div className={styles.barBg}>
                    <div className={styles.barFill} style={{ width: `${emp.conversionRate}%`, background: emp.conversionRate > 50 ? '#10b981' : emp.conversionRate > 35 ? '#f59e0b' : '#ef4444' }} />
                  </div>
                  <span className={styles.convText}>{emp.conversionRate}%</span>
                </div>
                <div className={styles.colPoints}>
                  <span className={styles.pointsBadge}>{emp.points} pts</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
