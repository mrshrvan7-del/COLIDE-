'use client';

import { Target, Gift, Zap, TrendingUp } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import type { IncentiveScheme } from '@/lib/types';
import styles from './ActiveSchemes.module.css';

interface ActiveSchemesProps {
  schemes: IncentiveScheme[];
}

export default function ActiveSchemes({ schemes }: ActiveSchemesProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'commission': return <TrendingUp size={20} className={styles.iconBlue} />;
      case 'bonus': return <Gift size={20} className={styles.iconGreen} />;
      case 'reward': return <Target size={20} className={styles.iconPurple} />;
      case 'promotion': return <Zap size={20} className={styles.iconOrange} />;
      default: return <Target size={20} />;
    }
  };

  const activeSchemes = schemes.filter(s => s.isActive);

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Active Incentive Programs</h3>
      
      <div className={styles.grid}>
        {activeSchemes.map((scheme) => (
          <div key={scheme.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrap}>{getIcon(scheme.type)}</div>
              <span className={styles.badge}>{scheme.type}</span>
            </div>
            
            <h4 className={styles.schemeName}>{scheme.name}</h4>
            <p className={styles.description}>{scheme.description}</p>
            
            <div className={styles.rewardBox}>
              <span className={styles.rewardLabel}>Reward:</span>
              <span className={styles.rewardValue}>
                {scheme.isPercentage ? `${scheme.amount}%` : formatCurrency(scheme.amount)}
              </span>
            </div>
            
            <div className={styles.validity}>
              Valid till: {new Date(scheme.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
