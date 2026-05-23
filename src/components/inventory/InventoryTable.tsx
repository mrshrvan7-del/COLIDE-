'use client';

import { Package, Search, Filter } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import type { Product, Branch } from '@/lib/types';
import styles from './InventoryTable.module.css';

interface InventoryTableProps {
  products: Product[];
  branches: Branch[];
}

export default function InventoryTable({ products, branches }: InventoryTableProps) {
  // Only show active branches for columns
  const activeBranches = branches.filter(b => b.status === 'active' || b.status === 'slow');

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <Package size={18} className={styles.iconBox} />
          Cross-Branch Inventory
        </h3>
        <div className={styles.actions}>
          <div className={styles.searchBox}>
            <Search size={14} className={styles.iconSearch} />
            <input type="text" placeholder="Search products, SKU..." className={styles.input} />
          </div>
          <button className={styles.btnFilter}><Filter size={14}/> Filter</button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thProduct}>Product Details</th>
              <th className={styles.thStock}>Total Stock</th>
              {activeBranches.map(branch => (
                <th key={branch.id} className={styles.thBranch}>{branch.name}</th>
              ))}
              <th className={styles.thPrice}>Price / Cost</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className={styles.tr}>
                <td className={styles.tdProduct}>
                  <div className={styles.productInfo}>
                    <span className={styles.productName}>{product.name}</span>
                    <span className={styles.productSku}>{product.sku} • {product.category}</span>
                  </div>
                </td>
                
                <td className={styles.tdStock}>
                  <div className={styles.stockWrap}>
                    <span className={`${styles.totalStockBadge} ${product.status === 'low_stock' ? styles.badgeWarning : product.status === 'out_of_stock' ? styles.badgeDanger : styles.badgeSuccess}`}>
                      {product.totalStock} {product.unit}
                    </span>
                  </div>
                </td>

                {activeBranches.map(branch => {
                  const branchQty = product.branchStock[branch.id] || 0;
                  const isLow = branchQty > 0 && branchQty <= 10;
                  const isOut = branchQty === 0;
                  
                  return (
                    <td key={branch.id} className={styles.tdBranch}>
                      <span className={`${styles.branchQty} ${isOut ? styles.textDanger : isLow ? styles.textWarning : styles.textSuccess}`}>
                        {branchQty}
                      </span>
                    </td>
                  );
                })}

                <td className={styles.tdPrice}>
                  <div className={styles.priceInfo}>
                    <span className={styles.sellPrice}>{formatCurrency(product.price)}</span>
                    <span className={styles.costPrice}>{formatCurrency(product.cost)}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
