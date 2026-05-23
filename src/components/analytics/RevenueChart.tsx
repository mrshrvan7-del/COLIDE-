'use client';

import { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Line, ComposedChart
} from 'recharts';
import { salesForecastingData } from '@/lib/mockData';
import { abbreviateNumber } from '@/lib/utils';
import { cn } from '@/lib/utils';
import styles from './RevenueChart.module.css';

interface TooltipPayload {
  value?: number;
  dataKey?: string;
  name?: string;
  payload?: any;
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: string }) {
  if (!active || !payload?.length) return null;

  return (
    <div className={styles.tooltip}>
      <div className={styles.tooltipDate}>{label}</div>
      {payload.map((entry, i) => {
        if (entry.dataKey === 'actual' && entry.value === 0) return null;
        
        let labelName = entry.name || entry.dataKey;
        if (entry.dataKey === 'actual') labelName = 'Actual Revenue';
        if (entry.dataKey === 'predicted') labelName = 'Predicted Revenue';
        
        let color = '#6366f1';
        if (entry.dataKey === 'predicted') color = '#a855f7';
        if (entry.dataKey === 'bounds') color = 'rgba(168, 85, 247, 0.15)';

        if (entry.dataKey === 'bounds') {
          const lower = entry.payload.lowerBound;
          const upper = entry.payload.upperBound;
          return (
            <div key={i} className={styles.tooltipRow}>
              <span className={styles.tooltipDot} style={{ background: 'rgba(168, 85, 247, 0.4)' }} />
              <span className={styles.tooltipLabel}>Confidence Range</span>
              <span className={styles.tooltipValue}>
                {abbreviateNumber(lower)} - {abbreviateNumber(upper)}
              </span>
            </div>
          );
        }

        return (
          <div key={i} className={styles.tooltipRow}>
            <span className={styles.tooltipDot} style={{ background: color }} />
            <span className={styles.tooltipLabel}>{labelName}</span>
            <span className={styles.tooltipValue}>
              {abbreviateNumber(entry.value || 0)}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function RevenueForecastChart() {
  const [showConfidence, setShowConfidence] = useState(true);

  // Recharts composed chart data mapping
  const chartData = salesForecastingData.map((d) => ({
    ...d,
    // Format bounds as a range array for Recharts Area: [lower, upper]
    bounds: d.lowerBound && d.upperBound ? [d.lowerBound, d.upperBound] : null,
  }));

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.titleBlock}>
          <h3 className={styles.title}>Predictive Revenue Forecasting</h3>
          <p className={styles.subtitle}>ML-driven actual vs. 10-day projected sales trends</p>
        </div>
        <div className={styles.controls}>
          <button
            className={cn(styles.toggleBtn, showConfidence && styles.active)}
            onClick={() => setShowConfidence(!showConfidence)}
          >
            <span className={styles.indicator} />
            Show Confidence Bounds
          </button>
        </div>
      </div>

      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 10, right: 5, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="forecastActualGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="forecastPredGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.03)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 11 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 11 }}
              tickFormatter={(v: number) => abbreviateNumber(v).replace('₹', '')}
              dx={-4}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {showConfidence && (
              <Area
                name="Confidence Range"
                dataKey="bounds"
                stroke="none"
                fill="rgba(168, 85, 247, 0.08)"
                connectNulls
                animationDuration={1500}
              />
            )}

            <Area
              name="Actual Revenue"
              type="monotone"
              dataKey="actual"
              stroke="#6366f1"
              strokeWidth={2.5}
              fill="url(#forecastActualGrad)"
              dot={false}
              activeDot={{ r: 6, stroke: 'rgba(99, 102, 241, 0.4)', strokeWidth: 4 }}
              animationDuration={2000}
            />

            <Area
              name="Predicted Revenue"
              type="monotone"
              dataKey="predicted"
              stroke="#a855f7"
              strokeWidth={showConfidence ? 2 : 1.5}
              strokeDasharray="4 4"
              fill="url(#forecastPredGrad)"
              dot={false}
              activeDot={{ r: 4, stroke: 'rgba(168, 85, 247, 0.4)', strokeWidth: 4 }}
              animationDuration={2500}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={cn(styles.legendLine, styles.actualLine)} />
          <span className={styles.legendLabel}>Actual Revenue (Historical)</span>
        </div>
        <div className={styles.legendItem}>
          <span className={cn(styles.legendLine, styles.predictedLine)} />
          <span className={styles.legendLabel}>Predicted Forecast</span>
        </div>
        {showConfidence && (
          <div className={styles.legendItem}>
            <span className={styles.legendBox} />
            <span className={styles.legendLabel}>Confidence Interval (85% range)</span>
          </div>
        )}
      </div>
    </div>
  );
}
