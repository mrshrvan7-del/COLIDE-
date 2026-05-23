'use client';

import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ComposedChart } from 'recharts';
import { cashFlowEntries } from '@/lib/mockData';
import { abbreviateNumber, cn } from '@/lib/utils';
import styles from './CashFlowChart.module.css';

const ranges = ['Week', 'Month', 'Quarter'];

function generateChartData(range: string) {
  const days = range === 'Week' ? 7 : range === 'Month' ? 30 : 90;
  const data = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    // Aggregate across all branches for this date
    const dayEntries = cashFlowEntries.filter((e) => e.date === dateStr);
    const inflow = dayEntries.reduce((s, e) => s + e.cashSales + e.upiPayments + e.cardPayments, 0);
    const outflow = dayEntries.reduce((s, e) => s + e.refunds + e.expenses + e.vendorPayouts + e.salaries, 0);

    data.push({
      date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      inflow: inflow || Math.round(300000 + Math.random() * 200000),
      outflow: outflow || Math.round(80000 + Math.random() * 60000),
      net: (inflow - outflow) || Math.round(200000 + Math.random() * 150000),
    });
  }
  return data;
}

interface TooltipPayload {
  value?: number;
  dataKey?: string;
  color?: string;
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.tooltip}>
      <div className={styles.tooltipDate}>{label}</div>
      {payload.map((entry, i) => (
        <div key={i} className={styles.tooltipRow}>
          <span className={styles.tooltipDot} style={{ background: entry.color }} />
          <span className={styles.tooltipLabel}>{entry.dataKey}</span>
          <span className={styles.tooltipValue}>{abbreviateNumber(entry.value || 0)}</span>
        </div>
      ))}
    </div>
  );
}

export default function CashFlowChart() {
  const [activeRange, setActiveRange] = useState('Month');
  const data = generateChartData(activeRange);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>Cash Flow Timeline</h3>
        <div className={styles.rangeButtons}>
          {ranges.map((r) => (
            <button key={r} className={cn(styles.rangeBtn, activeRange === r && styles.active)} onClick={() => setActiveRange(r)}>
              {r}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="inflowGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="outflowGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} dy={8} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 11 }} tickFormatter={(v: number) => abbreviateNumber(v).replace('₹', '')} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="inflow" stroke="#10b981" strokeWidth={2} fill="url(#inflowGrad)" dot={false} animationDuration={1500} />
            <Area type="monotone" dataKey="outflow" stroke="#ef4444" strokeWidth={1.5} fill="url(#outflowGrad)" dot={false} animationDuration={1800} />
            <Bar dataKey="net" fill="#6366f1" opacity={0.3} radius={[2, 2, 0, 0]} animationDuration={2000} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
