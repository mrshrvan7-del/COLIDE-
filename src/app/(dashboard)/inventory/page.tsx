'use client';

import { Package, AlertTriangle, ArrowRightLeft, TrendingDown } from 'lucide-react';
import KPICard from '@/components/dashboard/KPICard';
import LowStockAlerts from '@/components/inventory/LowStockAlerts';
import StockTransfers from '@/components/inventory/StockTransfers';
import InventoryTable from '@/components/inventory/InventoryTable';
import { products, stockTransfers, branches } from '@/lib/mockData';
import type { KPIData } from '@/lib/types';
import styles from './page.module.css';

const lowStockCount = products.filter(p => p.status === 'low_stock' || p.status === 'out_of_stock').length;
const totalValue = products.reduce((sum, p) => sum + (p.totalStock * p.cost), 0);

const invKPIs: KPIData[] = [
  {
    label: 'Total Products',
    value: products.length,
    previousValue: products.length,
    change: 0,
    changePercent: 0,
    trend: 'neutral',
    format: 'number',
    icon: 'Package',
    color: '#3b82f6',
  },
  {
    label: 'Low Stock Alerts',
    value: lowStockCount,
    previousValue: lowStockCount + 2,
    change: -2,
    changePercent: -50,
    trend: 'down',
    format: 'number',
    icon: 'AlertTriangle',
    color: '#ef4444',
  },
  {
    label: 'Pending Transfers',
    value: stockTransfers.filter(t => t.status !== 'completed').length,
    previousValue: 2,
    change: 1,
    changePercent: 50,
    trend: 'up',
    format: 'number',
    icon: 'ArrowRightLeft',
    color: '#8b5cf6',
  },
  {
    label: 'Inventory Value',
    value: totalValue,
    previousValue: totalValue * 0.95,
    change: totalValue * 0.05,
    changePercent: 5.26,
    trend: 'up',
    format: 'currency',
    icon: 'TrendingDown',
    color: '#10b981',
  },
];

export default function InventoryPage() {
  return (
    <div className={styles.page}>
      <div className={styles.kpiGrid}>
        {invKPIs.map((kpi, index) => (
          <KPICard key={kpi.label} data={kpi} index={index} />
        ))}
      </div>

      <div className={styles.alertsGrid}>
        <LowStockAlerts products={products} />
        <StockTransfers transfers={stockTransfers} />
      </div>

      <InventoryTable products={products} branches={branches} />
    </div>
  );
}
