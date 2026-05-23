'use client';

import { AlertTriangle, TrendingDown } from 'lucide-react';
import type { Product } from '@/lib/types';
import styles from './LowStockAlerts.module.css';

interface LowStockAlertsProps {
  products: Product[];
}

export default function LowStockAlerts({ products }: LowStockAlertsProps) {
  const lowStockProducts = products.filter(p => p.status === 'low_stock' || p.status === 'out_of_stock');

  if (lowStockProducts.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>
        <AlertTriangle size={18} className={styles.iconWarning} />
        Low Stock Alerts
      </h3>
      
      <div className={styles.list}>
        {lowStockProducts.map(product => (
          <div key={product.id} className={`${styles.alertCard} ${product.status === 'out_of_stock' ? styles.critical : styles.warning}`}>
            <div className={styles.cardHeader}>
              <span className={styles.productName}>{product.name}</span>
              <span className={styles.badge}>{product.status.replace('_', ' ')}</span>
            </div>
            
            <div className={styles.stockInfo}>
              <div className={styles.stockItem}>
                <span className={styles.stockLabel}>Current Stock</span>
                <span className={styles.stockValue}>{product.totalStock} {product.unit}</span>
              </div>
              <div className={styles.stockItem}>
                <span className={styles.stockLabel}>Reorder Level</span>
                <span className={styles.stockValue}>{product.reorderLevel} {product.unit}</span>
              </div>
            </div>
            
            <p className={styles.movementText}>
              <TrendingDown size={14} /> 
              Moving {product.movementRate} - Restock suggested immediately.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
