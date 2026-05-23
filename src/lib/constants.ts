// ============================================================
// COLIDE — App Constants
// ============================================================

export const APP_NAME = 'Colide';
export const CURRENCY_SYMBOL = '₹';

export interface NavItemConfig {
  id: string;
  label: string;
  icon: string;
  href: string;
  badge?: number;
}

export const NAV_ITEMS: NavItemConfig[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', href: '/dashboard' },
  { id: 'cashflow', label: 'Cash Flow', icon: 'Wallet', href: '/cashflow', badge: 3 },
  { id: 'employees', label: 'Employees', icon: 'Users', href: '/employees' },
  { id: 'incentives', label: 'Incentives', icon: 'Target', href: '/incentives' },
  { id: 'inventory', label: 'Inventory', icon: 'Package', href: '/inventory', badge: 5 },
  { id: 'bills', label: 'Bills & Invoices', icon: 'Receipt', href: '/bills' },
  { id: 'assistant', label: 'AI Assistant', icon: 'Bot', href: '/assistant' },
  { id: 'fraud', label: 'Fraud Detection', icon: 'Shield', href: '/fraud', badge: 2 },
  { id: 'analytics', label: 'Analytics', icon: 'BarChart3', href: '/analytics' },
  { id: 'reports', label: 'Reports', icon: 'FileText', href: '/reports' },
  { id: 'settings', label: 'Settings', icon: 'Settings', href: '/settings' },
];

export const TIME_RANGES = [
  { id: 'today', label: 'Today' },
  { id: 'week', label: 'Week' },
  { id: 'month', label: 'Month' },
  { id: 'quarter', label: 'Quarter' },
  { id: 'year', label: 'Year' },
] as const;

export const BRANCH_STATUSES = {
  active: { label: 'Active', color: 'var(--color-success)', bg: 'var(--color-success-bg)' },
  slow: { label: 'Slow', color: 'var(--color-warning)', bg: 'var(--color-warning-bg)' },
  inactive: { label: 'No Sales', color: 'var(--color-danger)', bg: 'var(--color-danger-bg)' },
} as const;

export const PAYMENT_METHODS = {
  cash: { label: 'Cash', color: '#10b981', icon: 'Banknote' },
  upi: { label: 'UPI', color: '#8b5cf6', icon: 'Smartphone' },
  card: { label: 'Card', color: '#06b6d4', icon: 'CreditCard' },
  netbanking: { label: 'Net Banking', color: '#f59e0b', icon: 'Globe' },
  wallet: { label: 'Wallet', color: '#ec4899', icon: 'Wallet' },
} as const;

export const EMPLOYEE_LEVELS = {
  trainee: { label: 'Trainee', color: 'var(--text-tertiary)', minPoints: 0 },
  junior: { label: 'Junior', color: 'var(--color-info)', minPoints: 500 },
  senior: { label: 'Senior', color: 'var(--color-success)', minPoints: 1500 },
  lead: { label: 'Lead', color: 'var(--color-warning)', minPoints: 3000 },
  expert: { label: 'Expert', color: 'var(--accent-primary)', minPoints: 5000 },
} as const;

export const CHART_COLORS = [
  '#6366f1', // indigo
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#10b981', // emerald
  '#f59e0b', // amber
  '#ef4444', // red
  '#f97316', // orange
  '#14b8a6', // teal
  '#a855f7', // purple
];

export const PAGE_TITLES: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Multi-Branch Overview' },
  '/cashflow': { title: 'Cash Flow', subtitle: 'Track Money Movement' },
  '/employees': { title: 'Employees', subtitle: 'Team Performance & Rankings' },
  '/incentives': { title: 'Incentives', subtitle: 'Rewards & Commissions' },
  '/inventory': { title: 'Inventory', subtitle: 'Stock Intelligence' },
  '/bills': { title: 'Bills & Invoices', subtitle: 'AI-Powered Scanning' },
  '/assistant': { title: 'AI Assistant', subtitle: 'Ask Anything' },
  '/fraud': { title: 'Fraud Detection', subtitle: 'Risk & Anomaly Monitoring' },
  '/analytics': { title: 'Analytics', subtitle: 'Forecasting & Insights' },
  '/reports': { title: 'Reports', subtitle: 'Generate & Export' },
  '/settings': { title: 'Settings', subtitle: 'Platform Configuration' },
};
