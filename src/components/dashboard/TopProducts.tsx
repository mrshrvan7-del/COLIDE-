'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import type { TopProduct } from '@/lib/types';
import { formatCurrency, formatPercent } from '@/lib/utils';
import styles from './TopProducts.module.css';

const rankColors = ['#f59e0b', '#9ca3af', '#cd7f32'];

interface TopProductsProps {
  products: TopProduct[];
}

export default function TopProducts({ products }: TopProductsProps) {
  const maxSales = Math.max(...products.map((p) => p.sales));

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>Top Products</h3>
      </div>
      <div className={styles.list}>
        {products.map((product, i) => (
          <div
            key={product.id}
            className={styles.row}
            style={{ animationDelay: `${800 + i * 60}ms` }}
          >
            <span
              className={styles.rank}
              style={i < 3 ? { color: rankColors[i], fontWeight: 700 } : undefined}
            >
              {i + 1}
            </span>
            <div className={styles.productInfo}>
              <span className={styles.productName}>{product.name}</span>
              <div className={styles.productMeta}>
                <span className={styles.category}>{product.category}</span>
                <span className={styles.sales}>{product.sales} sold</span>
              </div>
              <div className={styles.bar}>
                <div
                  className={styles.barFill}
                  style={{ width: `${(product.sales / maxSales) * 100}%` }}
                />
              </div>
            </div>
            <div className={styles.rightCol}>
              <span className={styles.revenue}>{formatCurrency(product.revenue)}</span>
              <span className={product.growth >= 0 ? styles.growthUp : styles.growthDown}>
                {product.growth >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {formatPercent(Math.abs(product.growth))}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
