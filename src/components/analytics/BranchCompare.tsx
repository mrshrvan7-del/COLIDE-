'use client';

import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { branchPerformance } from '@/lib/mockData';
import { abbreviateNumber } from '@/lib/utils';
import { cn } from '@/lib/utils';
import styles from './BranchCompare.module.css';

type CompareMetric = 'revenue' | 'profit' | 'transactions' | 'growthRate' | 'customerSatisfaction';

interface MetricOption {
  id: CompareMetric;
  label: string;
  color: string;
  format: 'currency' | 'number' | 'percent' | 'rating';
}

const metricOptions: MetricOption[] = [
  { id: 'revenue', label: 'Monthly Revenue', color: '#6366f1', format: 'currency' },
  { id: 'profit', label: 'Monthly Profit', color: '#10b981', format: 'currency' },
  { id: 'transactions', label: 'Transactions', color: '#06b6d4', format: 'number' },
  { id: 'growthRate', label: 'Growth Rate', color: '#f59e0b', format: 'percent' },
  { id: 'customerSatisfaction', label: 'CSAT Rating', color: '#ec4899', format: 'rating' },
];

export default function BranchCompare() {
  const [selectedMetric, setSelectedMetric] = useState<CompareMetric>('revenue');

  const currentMetric = metricOptions.find((m) => m.id === selectedMetric) || metricOptions[0];

  const formatValue = (val: number, format: MetricOption['format']) => {
    if (format === 'currency') return abbreviateNumber(val);
    if (format === 'percent') return `${val.toFixed(1)}%`;
    if (format === 'rating') return `${val.toFixed(1)} ⭐`;
    return val.toLocaleString('en-IN');
  };

  function CustomTooltip({ active, payload }: { active?: boolean; payload?: any[] }) {
    if (!active || !payload?.length) return null;
    const data = payload[0].payload;
    return (
      <div className={styles.tooltip}>
        <div className={styles.tooltipBranch}>{data.branchName}</div>
        <div className={styles.tooltipRow}>
          <span className={styles.tooltipLabel}>{currentMetric.label}:</span>
          <span className={styles.tooltipValue} style={{ color: currentMetric.color }}>
            {formatValue(payload[0].value, currentMetric.format)}
          </span>
        </div>
        {selectedMetric !== 'revenue' && (
          <div className={styles.tooltipRowSub}>
            <span>Revenue:</span>
            <span>{abbreviateNumber(data.revenue)}</span>
          </div>
        )}
        {selectedMetric !== 'profit' && (
          <div className={styles.tooltipRowSub}>
            <span>Profit Margin:</span>
            <span>{((data.profit / Math.max(data.revenue, 1)) * 100).toFixed(1)}%</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.titleBlock}>
          <h3 className={styles.title}>Branch Comparison Matrix</h3>
          <p className={styles.subtitle}>Cross-examine key operational KPIs side-by-side</p>
        </div>
        <div className={styles.metricTabs}>
          {metricOptions.map((metric) => (
            <button
              key={metric.id}
              className={cn(styles.metricBtn, selectedMetric === metric.id && styles.active)}
              onClick={() => setSelectedMetric(metric.id)}
            >
              {metric.label.replace('Monthly ', '')}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={branchPerformance} margin={{ top: 10, right: 5, left: -10, bottom: 5 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.03)"
              vertical={false}
            />
            <XAxis
              dataKey="branchName"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 10 }}
              dy={6}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 10 }}
              tickFormatter={(v: number) => {
                if (currentMetric.format === 'currency') return abbreviateNumber(v).replace('₹', '');
                if (currentMetric.format === 'percent') return `${v}%`;
                return v.toString();
              }}
              dx={-4}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
            <Bar
              dataKey={selectedMetric}
              radius={[6, 6, 0, 0]}
              maxBarSize={48}
              animationDuration={1000}
            >
              {branchPerformance.map((entry, index) => {
                // Return different opacity or colors if desired
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={currentMetric.color}
                    fillOpacity={entry.revenue === 0 ? 0.25 : 0.85}
                  />
                );
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.footerNote}>
        * Colide Mart (Pune) shows inactive status with current revenue at 0.
      </div>
    </div>
  );
}
