'use client';

import { Trophy, Medal, Star } from 'lucide-react';
import type { Employee } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import styles from './TopPerformers.module.css';

interface TopPerformersProps {
  employees: Employee[];
}

export default function TopPerformers({ employees }: TopPerformersProps) {
  // Sort by rank and get top 3
  const top3 = [...employees].sort((a, b) => a.rank - b.rank).filter(e => e.role === 'salesperson').slice(0, 3);
  
  if (top3.length < 3) return null;

  // Podium order: 2nd, 1st, 3rd
  const podium = [top3[1], top3[0], top3[2]];

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <Trophy size={18} className={styles.iconGold} />
          Top Performers
        </h3>
        <span className={styles.subtitle}>This Month</span>
      </div>

      <div className={styles.podiumContainer}>
        {podium.map((emp, index) => {
          const isFirst = index === 1;
          const isSecond = index === 0;
          const isThird = index === 2;
          
          let heightClass = styles.podiumSecond;
          let rankLabel = '2nd';
          let icon = <Medal size={24} className={styles.iconSilver} />;
          
          if (isFirst) {
            heightClass = styles.podiumFirst;
            rankLabel = '1st';
            icon = <Trophy size={32} className={styles.iconGold} />;
          } else if (isThird) {
            heightClass = styles.podiumThird;
            rankLabel = '3rd';
            icon = <Medal size={24} className={styles.iconBronze} />;
          }

          return (
            <div key={emp.id} className={`${styles.podiumItem} ${heightClass}`}>
              <div className={styles.avatarWrap}>
                <div className={styles.rankIcon}>{icon}</div>
                <div className={`${styles.avatarPlaceholder} ${isFirst ? styles.avatarGold : isSecond ? styles.avatarSilver : styles.avatarBronze}`}>
                  {emp.name.charAt(0)}
                </div>
              </div>
              
              <div className={styles.podiumBlock}>
                <span className={styles.rankNumber}>{rankLabel}</span>
                <span className={styles.empName}>{emp.name}</span>
                <span className={styles.empBranch}>{emp.branchName}</span>
                <div className={styles.salesWrap}>
                  <span className={styles.salesValue}>{formatCurrency(emp.monthSales)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
