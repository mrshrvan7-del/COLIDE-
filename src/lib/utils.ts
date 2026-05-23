// ============================================================
// COLIDE — Utility Functions
// ============================================================

/**
 * Format a number as Indian Rupee currency (₹1,23,456)
 */
export function formatCurrency(amount: number): string {
  const absAmount = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';
  
  // Indian number system: last 3 digits, then groups of 2
  const formatted = absAmount.toLocaleString('en-IN', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
  
  return `${sign}₹${formatted}`;
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('en-IN');
}

/**
 * Abbreviate large numbers: 1.2K, 3.5L, 1.2Cr
 */
export function abbreviateNumber(num: number): string {
  const absNum = Math.abs(num);
  const sign = num < 0 ? '-' : '';
  
  if (absNum >= 10000000) {
    return `${sign}₹${(absNum / 10000000).toFixed(1)}Cr`;
  }
  if (absNum >= 100000) {
    return `${sign}₹${(absNum / 100000).toFixed(1)}L`;
  }
  if (absNum >= 1000) {
    return `${sign}₹${(absNum / 1000).toFixed(1)}K`;
  }
  return `${sign}₹${absNum}`;
}

/**
 * Format as percentage
 */
export function formatPercent(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format date as 'May 24, 2026'
 */
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Format time as '2:30 PM'
 */
export function formatTime(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Format relative time: '5 min ago', '2 hours ago'
 */
export function formatRelativeTime(date: string | Date): string {
  const now = new Date();
  const d = new Date(date);
  const diffMs = now.getTime() - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return 'Just now';
  if (diffMin < 60) return `${diffMin} min ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return formatDate(date);
}

/**
 * Calculate percentage change between two values
 */
export function getChangePercent(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

/**
 * Get trend direction
 */
export function getTrend(current: number, previous: number): 'up' | 'down' | 'neutral' {
  if (current > previous) return 'up';
  if (current < previous) return 'down';
  return 'neutral';
}

/**
 * Generate sparkline data points
 */
export function generateSparklineData(
  points: number,
  min: number,
  max: number,
  trend: 'up' | 'down' | 'neutral' = 'neutral'
): number[] {
  const data: number[] = [];
  let current = min + (max - min) * 0.5;

  for (let i = 0; i < points; i++) {
    const trendBias = trend === 'up' ? 0.6 : trend === 'down' ? 0.4 : 0.5;
    const change = (Math.random() - (1 - trendBias)) * (max - min) * 0.2;
    current = Math.max(min, Math.min(max, current + change));
    data.push(Math.round(current));
  }
  return data;
}

/**
 * Get CSS variable name for status
 */
export function getStatusColor(status: string): string {
  switch (status) {
    case 'active': return 'var(--color-success)';
    case 'slow': return 'var(--color-warning)';
    case 'inactive': return 'var(--color-danger)';
    default: return 'var(--text-tertiary)';
  }
}

/**
 * Get initials from a name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Join class names, filtering out falsy values
 */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Random number between min and max
 */
export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}
