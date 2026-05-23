/* ============================================================
   COLIDE — Type Definitions
   ============================================================ */

// ─── Branch Types ─────────────────────────────────────────────

export type BranchStatus = 'active' | 'slow' | 'inactive';

export interface Branch {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  status: BranchStatus;
  lat: number;
  lng: number;
  manager: string;
  employeeCount: number;
  todaySales: number;
  weekSales: number;
  monthSales: number;
  todayTransactions: number;
  cashBalance: number;
  pendingPayments: number;
  profitMargin: number;
  rating: number;
  openTime: string;
  closeTime: string;
}

// ─── Employee Types ───────────────────────────────────────────

export type EmployeeRole = 'owner' | 'manager' | 'accountant' | 'salesperson' | 'auditor';

export type EmployeeLevel = 'trainee' | 'junior' | 'senior' | 'lead' | 'expert';

export interface Employee {
  id: string;
  name: string;
  avatar: string;
  role: EmployeeRole;
  level: EmployeeLevel;
  branchId: string;
  branchName: string;
  email: string;
  phone: string;
  joinDate: string;
  salary: number;
  totalSales: number;
  monthSales: number;
  weekSales: number;
  todaySales: number;
  conversionRate: number;
  upsellRate: number;
  attendanceRate: number;
  customerRating: number;
  targetAchieved: number;
  streak: number;
  points: number;
  rank: number;
  badges: Badge[];
  isOnDuty: boolean;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: 'sales' | 'consistency' | 'customer' | 'leadership' | 'special';
  earnedDate?: string;
  isUnlocked: boolean;
}

// ─── Transaction Types ────────────────────────────────────────

export type PaymentMethod = 'cash' | 'upi' | 'card' | 'netbanking' | 'wallet';

export type TransactionType = 'sale' | 'refund' | 'expense' | 'payout' | 'salary';

export interface Transaction {
  id: string;
  branchId: string;
  branchName: string;
  type: TransactionType;
  amount: number;
  paymentMethod: PaymentMethod;
  description: string;
  customer?: string;
  employeeId?: string;
  employeeName?: string;
  items?: TransactionItem[];
  timestamp: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
}

export interface TransactionItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

// ─── Cash Flow Types ──────────────────────────────────────────

export interface CashFlowEntry {
  id: string;
  branchId: string;
  date: string;
  cashSales: number;
  upiPayments: number;
  cardPayments: number;
  refunds: number;
  expenses: number;
  vendorPayouts: number;
  salaries: number;
  netCashFlow: number;
  closingBalance: number;
  isVerified: boolean;
  mismatchAmount: number;
}

export interface CashMismatch {
  id: string;
  branchId: string;
  branchName: string;
  date: string;
  expectedAmount: number;
  actualAmount: number;
  mismatchAmount: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'detected' | 'investigating' | 'resolved' | 'dismissed';
  description: string;
}

// ─── Inventory Types ──────────────────────────────────────────

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock' | 'overstock';

export interface Product {
  id: string;
  name: string;
  category: string;
  sku: string;
  price: number;
  cost: number;
  unit: string;
  totalStock: number;
  branchStock: Record<string, number>;
  reorderLevel: number;
  status: StockStatus;
  movementRate: 'fast' | 'medium' | 'slow' | 'dead';
  lastRestocked: string;
  imageUrl?: string;
}

export interface StockTransfer {
  id: string;
  fromBranchId: string;
  fromBranchName: string;
  toBranchId: string;
  toBranchName: string;
  productId: string;
  productName: string;
  quantity: number;
  status: 'suggested' | 'approved' | 'in_transit' | 'completed';
  reason: string;
  createdAt: string;
}

// ─── Incentive Types ──────────────────────────────────────────

export interface IncentiveScheme {
  id: string;
  name: string;
  type: 'commission' | 'bonus' | 'reward' | 'promotion';
  description: string;
  criteria: IncentiveCriteria;
  amount: number;
  isPercentage: boolean;
  isActive: boolean;
  startDate: string;
  endDate: string;
}

export interface IncentiveCriteria {
  minTargetAchieved?: number;
  minAttendance?: number;
  minCustomerRating?: number;
  minConsecutiveMonths?: number;
  minSalesAmount?: number;
}

export interface IncentiveEligibility {
  employeeId: string;
  employeeName: string;
  schemeId: string;
  schemeName: string;
  currentProgress: number;
  targetProgress: number;
  estimatedAmount: number;
  isEligible: boolean;
}

// ─── Alert Types ──────────────────────────────────────────────

export type AlertSeverity = 'info' | 'warning' | 'danger' | 'critical';

export type AlertCategory = 'cash_mismatch' | 'low_stock' | 'fraud' | 'performance' | 'system' | 'achievement';

export interface Alert {
  id: string;
  branchId?: string;
  branchName?: string;
  category: AlertCategory;
  severity: AlertSeverity;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  isResolved: boolean;
  actionUrl?: string;
}

// ─── Bill/Invoice Types ───────────────────────────────────────

export interface Bill {
  id: string;
  branchId: string;
  imageUrl: string;
  vendor: string;
  amount: number;
  gstAmount: number;
  date: string;
  items: BillItem[];
  category: string;
  status: 'pending' | 'verified' | 'flagged' | 'duplicate';
  confidence: number;
  extractedAt: string;
}

export interface BillItem {
  name: string;
  quantity: number;
  rate: number;
  amount: number;
  gst: number;
}

// ─── Fraud/Anomaly Types ──────────────────────────────────────

export interface Anomaly {
  id: string;
  branchId: string;
  branchName: string;
  employeeId?: string;
  employeeName?: string;
  type: 'fake_bill' | 'suspicious_refund' | 'manipulation' | 'theft' | 'unusual_discount' | 'cash_mismatch';
  severity: AlertSeverity;
  title: string;
  description: string;
  evidence: string[];
  riskScore: number;
  detectedAt: string;
  status: 'detected' | 'investigating' | 'confirmed' | 'false_alarm' | 'resolved';
}

// ─── Analytics Types ──────────────────────────────────────────

export interface SalesDataPoint {
  date: string;
  actual: number;
  predicted?: number;
  lowerBound?: number;
  upperBound?: number;
}

export interface BranchPerformance {
  branchId: string;
  branchName: string;
  revenue: number;
  profit: number;
  transactions: number;
  avgTransactionValue: number;
  customerSatisfaction: number;
  employeeEfficiency: number;
  growthRate: number;
}

export interface TopProduct {
  id: string;
  name: string;
  category: string;
  sales: number;
  revenue: number;
  growth: number;
}

// ─── KPI Types ────────────────────────────────────────────────

export interface KPIData {
  label: string;
  value: number;
  previousValue: number;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'neutral';
  format: 'currency' | 'number' | 'percent';
  icon: string;
  color: string;
  sparklineData?: number[];
}

// ─── Report Types ─────────────────────────────────────────────

export type ReportType = 'gst' | 'sales' | 'payroll' | 'performance' | 'appraisal' | 'inventory';

export type ExportFormat = 'pdf' | 'excel' | 'csv';

export interface Report {
  id: string;
  type: ReportType;
  title: string;
  description: string;
  dateRange: { start: string; end: string };
  branchId?: string;
  generatedAt: string;
  format: ExportFormat;
  downloadUrl: string;
}

// ─── Navigation Types ─────────────────────────────────────────

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  badge?: number;
  children?: NavItem[];
}

// ─── Time Range Types ─────────────────────────────────────────

export type TimeRange = 'today' | 'week' | 'month' | 'quarter' | 'year' | 'custom';

export interface DateRange {
  start: string;
  end: string;
  label: string;
}

// ─── AI Assistant Types ───────────────────────────────────────

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  isActionable?: boolean;
}
