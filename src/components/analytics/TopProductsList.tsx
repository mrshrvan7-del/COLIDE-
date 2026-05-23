'use client';

import { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Search, ArrowUpDown, Tag } from 'lucide-react';
import { topProducts } from '@/lib/mockData';
import { abbreviateNumber } from '@/lib/utils';
import { cn } from '@/lib/utils';
import styles from './TopProductsList.module.css';

type SortField = 'sales' | 'revenue' | 'growth';
type SortOrder = 'asc' | 'desc';

export default function TopProductsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('revenue');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // Find unique categories
  const categories = ['All', ...Array.from(new Set(topProducts.map((p) => p.category)))];

  // Filter and sort products
  const filteredProducts = topProducts
    .filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            p.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      
      if (sortOrder === 'asc') {
        return valA > valB ? 1 : -1;
      } else {
        return valA < valB ? 1 : -1;
      }
    });

  // Find max values for visual percentage bars
  const maxRevenue = Math.max(...topProducts.map((p) => p.revenue));
  const maxSales = Math.max(...topProducts.map((p) => p.sales));

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.titleBlock}>
          <h3 className={styles.title}>Product Movement Intelligence</h3>
          <p className={styles.subtitle}>High-velocity SKU rankings and revenue yield margins</p>
        </div>
        
        <div className={styles.filters}>
          <div className={styles.searchWrapper}>
            <Search size={16} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search products..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className={styles.categorySelect}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product Details</th>
              <th className={styles.alignRight} onClick={() => handleSort('sales')}>
                <div className={styles.thContent}>
                  Sales Vol.
                  <ArrowUpDown size={12} className={sortField === 'sales' ? styles.activeSort : ''} />
                </div>
              </th>
              <th className={styles.alignRight} onClick={() => handleSort('revenue')}>
                <div className={styles.thContent}>
                  Revenue Yield
                  <ArrowUpDown size={12} className={sortField === 'revenue' ? styles.activeSort : ''} />
                </div>
              </th>
              <th className={styles.alignRight} onClick={() => handleSort('growth')}>
                <div className={styles.thContent}>
                  Growth Trend (YoY)
                  <ArrowUpDown size={12} className={sortField === 'growth' ? styles.activeSort : ''} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                const growthPositive = product.growth >= 0;
                const revPercentage = (product.revenue / maxRevenue) * 100;
                
                return (
                  <tr key={product.id}>
                    <td>
                      <div className={styles.productCell}>
                        <div className={styles.productIcon}>
                          <Tag size={16} />
                        </div>
                        <div>
                          <div className={styles.productName}>{product.name}</div>
                          <span className={styles.productCategory}>{product.category}</span>
                        </div>
                      </div>
                    </td>
                    <td className={styles.alignRight}>
                      <div className={styles.numberWrapper}>
                        <span className={styles.mainValue}>{product.sales.toLocaleString('en-IN')} units</span>
                        <div className={styles.barContainer}>
                          <div 
                            className={styles.salesBar} 
                            style={{ width: `${(product.sales / maxSales) * 100}%` }} 
                          />
                        </div>
                      </div>
                    </td>
                    <td className={styles.alignRight}>
                      <div className={styles.numberWrapper}>
                        <span className={styles.mainValue}>{abbreviateNumber(product.revenue)}</span>
                        <div className={styles.barContainer}>
                          <div 
                            className={styles.revenueBar} 
                            style={{ width: `${revPercentage}%` }} 
                          />
                        </div>
                      </div>
                    </td>
                    <td className={styles.alignRight}>
                      <span className={cn(
                        styles.growthBadge,
                        growthPositive ? styles.positive : styles.negative
                      )}>
                        {growthPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                        {Math.abs(product.growth)}%
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className={styles.noResults}>
                  No products matching filters found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
