'use client';

import { TrendingUp, Percent, Users, Award, Landmark, Compass } from 'lucide-react';
import RevenueForecastChart from '@/components/analytics/RevenueChart';
import BranchCompare from '@/components/analytics/BranchCompare';
import TopProductsList from '@/components/analytics/TopProductsList';
import styles from './page.module.css';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  subtext: string;
  icon: React.ReactNode;
  color: string;
}

function MetricCard({ title, value, change, isPositive, subtext, icon, color }: MetricCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.cardTitle}>{title}</span>
        <div className={styles.iconWrapper} style={{ backgroundColor: `${color}10`, color: color }}>
          {icon}
        </div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.valueRow}>
          <span className={styles.cardValue}>{value}</span>
          <span className={`${styles.changeBadge} ${isPositive ? styles.positive : styles.negative}`}>
            {isPositive ? '+' : ''}{change}
          </span>
        </div>
        <span className={styles.subtext}>{subtext}</span>
      </div>
      <div className={styles.glow} style={{ background: `radial-gradient(circle at top right, ${color}15, transparent 60%)` }} />
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <div className={styles.page}>
      {/* Top Level Strategic Metrics */}
      <div className={styles.metricsGrid}>
        <MetricCard
          title="Gross Margin %"
          value="24.8%"
          change="1.2%"
          isPositive={true}
          subtext="vs. 23.6% average last quarter"
          icon={<Percent size={20} />}
          color="#10b981" // emerald
        />
        <MetricCard
          title="YoY Revenue Growth"
          value="18.4%"
          change="2.1%"
          isPositive={true}
          subtext="Target set: 15% annual yield"
          icon={<TrendingUp size={20} />}
          color="#6366f1" // indigo
        />
        <MetricCard
          title="Total Footfall"
          value="42,520"
          change="8.4%"
          isPositive={true}
          subtext="Unique walk-ins across all branches"
          icon={<Users size={20} />}
          color="#06b6d4" // cyan
        />
        <MetricCard
          title="Average Order Value"
          value="₹1,850"
          change="-0.5%"
          isPositive={false}
          subtext="Cart value down slightly this week"
          icon={<Compass size={20} />}
          color="#f59e0b" // amber
        />
      </div>

      {/* Primary Analytics Visualization Grid */}
      <div className={styles.chartsGrid}>
        <div className={styles.fullWidth}>
          <RevenueForecastChart />
        </div>
        <div className={styles.halfWidth}>
          <BranchCompare />
        </div>
        <div className={styles.halfWidth}>
          <TopProductsList />
        </div>
      </div>
    </div>
  );
}
