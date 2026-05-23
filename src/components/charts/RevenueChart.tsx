'use client';

import { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { generateRevenueData } from '@/lib/mockData';
import { abbreviateNumber } from '@/lib/utils';
import { cn } from '@/lib/utils';
import styles from './RevenueChart.module.css';

const ranges = ['Today', 'Week', 'Month', 'Year'];
const rangeMap: Record<string, string> = { Today: 'today', Week: 'week', Month: 'month', Year: 'month' };

interface TooltipPayload {
  value?: number;
  dataKey?: string;
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: string }) {
  if (!active || !payload?.length) return null;

  return (
    <div className={styles.tooltip}>
      <div className={styles.tooltipDate}>{label}</div>
      {payload.map((entry, i) => (
        <div key={i} className={styles.tooltipRow}>
          <span
            className={styles.tooltipDot}
            style={{ background: i === 0 ? '#6366f1' : '#4b5563' }}
          />
          <span className={styles.tooltipLabel}>
            {entry.dataKey === 'revenue' ? 'Revenue' : 'Previous'}
          </span>
          <span className={styles.tooltipValue}>
            {abbreviateNumber(entry.value || 0)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function RevenueChart() {
  const [activeRange, setActiveRange] = useState('Month');
  const data = generateRevenueData(rangeMap[activeRange] || 'month');

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>Revenue Overview</h3>
        <div className={styles.rangeButtons}>
          {ranges.map((range) => (
            <button
              key={range}
              className={cn(styles.rangeBtn, activeRange === range && styles.active)}
              onClick={() => setActiveRange(range)}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="prevGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4b5563" stopOpacity={0.1} />
                <stop offset="100%" stopColor="#4b5563" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 11 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 11 }}
              tickFormatter={(v: number) => abbreviateNumber(v).replace('₹', '')}
              dx={-4}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="previousRevenue"
              stroke="#4b5563"
              strokeWidth={1.5}
              strokeDasharray="5 5"
              fill="url(#prevGradient)"
              dot={false}
              animationDuration={1500}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#6366f1"
              strokeWidth={2.5}
              fill="url(#revenueGradient)"
              dot={false}
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
