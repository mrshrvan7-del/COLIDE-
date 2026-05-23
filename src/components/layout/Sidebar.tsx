'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Wallet,
  Users,
  Target,
  Package,
  Receipt,
  Bot,
  Shield,
  BarChart3,
  FileText,
  Settings,
  ChevronLeft,
  ChevronDown,
} from 'lucide-react';
import { NAV_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import styles from './Sidebar.module.css';

// Map icon string names to Lucide components
const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  LayoutDashboard,
  Wallet,
  Users,
  Target,
  Package,
  Receipt,
  Bot,
  Shield,
  BarChart3,
  FileText,
  Settings,
};

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  // Determine active nav item from the current path
  const activeId = NAV_ITEMS.find((item) => pathname.startsWith(item.href))?.id || 'dashboard';

  return (
    <aside className={cn(styles.sidebar, isCollapsed && styles.collapsed)}>
      {/* Logo */}
      <div className={styles.logoSection}>
        <div className={styles.logoIcon}>C</div>
        <span className={styles.logoText}>Colide</span>
      </div>

      {/* Branch Selector */}
      <div className={styles.branchSelector}>
        <span className={styles.branchDot} />
        <span className={styles.branchName}>All Branches</span>
        <ChevronDown size={14} className={styles.branchArrow} />
      </div>

      {/* Navigation */}
      <nav className={styles.nav}>
        {NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = item.id === activeId;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(styles.navItem, isActive && styles.active)}
              title={isCollapsed ? item.label : undefined}
            >
              {Icon && <Icon size={20} />}
              <span className={styles.navLabel}>{item.label}</span>
              {item.badge && item.badge > 0 && (
                <span className={styles.navBadge}>{item.badge}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <button
        className={styles.collapseToggle}
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <ChevronLeft size={18} className={styles.collapseIcon} />
      </button>

      {/* User Profile */}
      <div className={styles.userSection}>
        <div className={styles.userAvatar}>SS</div>
        <div className={styles.userInfo}>
          <div className={styles.userName}>Saravana S.</div>
          <div className={styles.userRole}>Owner</div>
        </div>
      </div>
    </aside>
  );
}
