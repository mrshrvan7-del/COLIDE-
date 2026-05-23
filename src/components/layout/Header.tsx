'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Search, Bell } from 'lucide-react';
import { PAGE_TITLES } from '@/lib/constants';
import { alerts } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import styles from './Header.module.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const unreadAlerts = alerts.filter((a) => !a.isRead).length;

  // Find the matching page title from constants
  const pageInfo = Object.entries(PAGE_TITLES).find(([path]) =>
    pathname.startsWith(path)
  );
  const title = pageInfo?.[1]?.title || 'Dashboard';
  const subtitle = pageInfo?.[1]?.subtitle || 'Overview';

  // Current date
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(styles.header, scrolled && styles.scrolled)}>
      {/* Page Title */}
      <div className={styles.titleSection}>
        <h1 className={styles.pageTitle}>{title}</h1>
        <span className={styles.pageSubtitle}>{subtitle}</span>
      </div>

      {/* Search Bar */}
      <div className={styles.searchWrapper}>
        <Search size={16} className={styles.searchIcon} />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search branches, employees, products..."
          aria-label="Search"
        />
      </div>

      {/* Right Actions */}
      <div className={styles.actions}>
        <span className={styles.dateDisplay}>{today}</span>

        <button className={styles.iconButton} aria-label="Notifications">
          <Bell size={20} />
          {unreadAlerts > 0 && <span className={styles.notifBadge} />}
        </button>

        <div className={styles.avatar} title="Saravana S.">SS</div>
      </div>
    </header>
  );
}
