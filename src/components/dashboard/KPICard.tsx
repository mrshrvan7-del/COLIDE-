'use client';

import { useEffect, useState } from 'react';
import {
  AreaChart, Area, ResponsiveContainer,
} from 'recharts';
import { TrendingUp, TrendingDown, Minus, IndianRupee, ShoppingCart, Store, TrendingUp as TUp } from 'lucide-react';
import type { KPIData } from '@/lib/types';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/utils';
import styles from './KPICard.module.css';

const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  IndianRupee, ShoppingCart, Store, TrendingUp: TUp,
};

interface KPICardProps {
  data: KPIData;
  index: number;
}

export default function KPICard({ data, index }: KPICardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  // Animated count-up effect
  useEffect(() => {
    const duration = 1200;
    const startTime = Date.now();
    const target = data.value;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(target * eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, index * 100); // Stagger delay

    return () => clearTimeout(timer);
  }, [data.value, index]);

  const formatValue = (val: number) => {
    switch (data.format) {
      case 'currency': return formatCurrency(Math.round(val));
      case 'percent': return formatPercent(val);
      default: return formatNumber(Math.round(val));
    }
  };

  const Icon = iconMap[data.icon];
  const sparkData = data.sparklineData?.map((v, i) => ({ v, i })) || [];

  return (
    <div
      className={styles.card}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={styles.cardHeader}>
        <div
          className={styles.iconWrapper}
          style={{
            background: `${data.color}18`,
            boxShadow: `0 0 16px ${data.color}20`,
          }}
        >
          {Icon && <Icon size={20} color={data.color} />}
        </div>
        <span className={styles.label}>{data.label}</span>
      </div>

      <div className={styles.valueRow}>
        <span className={styles.value}>{formatValue(displayValue)}</span>
      </div>

      <div className={styles.changeWrapper}>
        {data.trend === 'up' && (
          <span className={styles.changeUp}>
            <TrendingUp size={14} />
            +{data.changePercent.toFixed(1)}%
          </span>
        )}
        {data.trend === 'down' && (
          <span className={styles.changeDown}>
            <TrendingDown size={14} />
            {data.changePercent.toFixed(1)}%
          </span>
        )}
        {data.trend === 'neutral' && (
          <span className={styles.changeNeutral}>
            <Minus size={14} />
            0%
          </span>
        )}
        <span className={styles.changeLabel}>vs last period</span>
      </div>

      {/* Sparkline */}
      {sparkData.length > 0 && (
        <div className={styles.sparkline}>
          <ResponsiveContainer width="100%" height={45}>
            <AreaChart data={sparkData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={`spark-${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={data.color} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={data.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke={data.color}
                strokeWidth={2}
                fill={`url(#spark-${index})`}
                dot={false}
                animationDuration={1500}
                animationBegin={index * 150}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
