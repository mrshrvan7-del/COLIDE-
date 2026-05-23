// ============================================================
// COLIDE — Mock Data Generator
// ============================================================

import type {
  Branch,
  Employee,
  Transaction,
  CashFlowEntry,
  CashMismatch,
  KPIData,
  TopProduct,
  Alert,
  Badge,
  BranchPerformance,
} from '@/lib/types';

// ─── Branches ─────────────────────────────────────────────────

export const branches: Branch[] = [
  {
    id: 'br-001',
    name: 'Colide Central',
    location: 'Andheri West',
    city: 'Mumbai',
    state: 'Maharashtra',
    status: 'active',
    lat: 19.136,
    lng: 72.836,
    manager: 'Arjun Mehta',
    employeeCount: 22,
    todaySales: 118500,
    weekSales: 785000,
    monthSales: 3450000,
    todayTransactions: 187,
    cashBalance: 245000,
    pendingPayments: 32000,
    profitMargin: 21.5,
    rating: 4.8,
    openTime: '09:00',
    closeTime: '21:00',
  },
  {
    id: 'br-002',
    name: 'Colide Express',
    location: 'Connaught Place',
    city: 'Delhi',
    state: 'Delhi',
    status: 'active',
    lat: 28.6315,
    lng: 77.2167,
    manager: 'Priya Sharma',
    employeeCount: 18,
    todaySales: 87600,
    weekSales: 592000,
    monthSales: 2580000,
    todayTransactions: 143,
    cashBalance: 178000,
    pendingPayments: 18500,
    profitMargin: 18.2,
    rating: 4.6,
    openTime: '09:30',
    closeTime: '21:00',
  },
  {
    id: 'br-003',
    name: 'Colide Metro',
    location: 'Koramangala',
    city: 'Bangalore',
    state: 'Karnataka',
    status: 'active',
    lat: 12.9352,
    lng: 77.6245,
    manager: 'Vikram Rao',
    employeeCount: 20,
    todaySales: 105200,
    weekSales: 724000,
    monthSales: 3180000,
    todayTransactions: 168,
    cashBalance: 215000,
    pendingPayments: 24000,
    profitMargin: 19.8,
    rating: 4.7,
    openTime: '09:00',
    closeTime: '21:30',
  },
  {
    id: 'br-004',
    name: 'Colide Mall',
    location: 'T. Nagar',
    city: 'Chennai',
    state: 'Tamil Nadu',
    status: 'slow',
    lat: 13.0418,
    lng: 80.2341,
    manager: 'Kavitha Suresh',
    employeeCount: 14,
    todaySales: 34500,
    weekSales: 245000,
    monthSales: 980000,
    todayTransactions: 62,
    cashBalance: 89000,
    pendingPayments: 45000,
    profitMargin: 12.4,
    rating: 4.1,
    openTime: '10:00',
    closeTime: '21:00',
  },
  {
    id: 'br-005',
    name: 'Colide Corner',
    location: 'Banjara Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    status: 'active',
    lat: 17.4156,
    lng: 78.4347,
    manager: 'Rahul Reddy',
    employeeCount: 16,
    todaySales: 78900,
    weekSales: 536000,
    monthSales: 2340000,
    todayTransactions: 128,
    cashBalance: 156000,
    pendingPayments: 21000,
    profitMargin: 17.6,
    rating: 4.5,
    openTime: '09:30',
    closeTime: '21:00',
  },
  {
    id: 'br-006',
    name: 'Colide Mart',
    location: 'Kothrud',
    city: 'Pune',
    state: 'Maharashtra',
    status: 'inactive',
    lat: 18.5074,
    lng: 73.8077,
    manager: 'Sneha Patil',
    employeeCount: 8,
    todaySales: 0,
    weekSales: 45000,
    monthSales: 420000,
    todayTransactions: 0,
    cashBalance: 34000,
    pendingPayments: 67000,
    profitMargin: 8.2,
    rating: 3.6,
    openTime: '10:00',
    closeTime: '20:00',
  },
];

// ─── Badges ───────────────────────────────────────────────────

const allBadges: Badge[] = [
  { id: 'b-01', name: 'Sales Star', icon: '⭐', description: 'Exceeded monthly target by 20%', category: 'sales', isUnlocked: true },
  { id: 'b-02', name: 'Century Club', icon: '💯', description: '100+ transactions in a single day', category: 'sales', isUnlocked: true },
  { id: 'b-03', name: 'Iron Streak', icon: '🔥', description: '30-day attendance streak', category: 'consistency', isUnlocked: true },
  { id: 'b-04', name: 'Customer Favorite', icon: '❤️', description: '4.8+ customer rating for 3 months', category: 'customer', isUnlocked: true },
  { id: 'b-05', name: 'Upsell Master', icon: '📈', description: '30%+ upsell rate', category: 'sales', isUnlocked: true },
  { id: 'b-06', name: 'Team Player', icon: '🤝', description: 'Helped 5 new employees onboard', category: 'leadership', isUnlocked: false },
  { id: 'b-07', name: 'Early Bird', icon: '🌅', description: 'Arrived first for 20 consecutive days', category: 'consistency', isUnlocked: false },
  { id: 'b-08', name: 'Revenue King', icon: '👑', description: '₹10L+ monthly revenue', category: 'sales', isUnlocked: false },
];

// ─── Employees ────────────────────────────────────────────────

export const employees: Employee[] = [
  { id: 'emp-001', name: 'Ravi Kumar', avatar: '', role: 'salesperson', level: 'expert', branchId: 'br-001', branchName: 'Colide Central', email: 'ravi@colide.in', phone: '+91 98765 43210', joinDate: '2024-03-15', salary: 35000, totalSales: 4250000, monthSales: 425000, weekSales: 105000, todaySales: 18500, conversionRate: 62, upsellRate: 32, attendanceRate: 98, customerRating: 4.9, targetAchieved: 142, streak: 45, points: 4850, rank: 1, badges: [allBadges[0], allBadges[1], allBadges[2], allBadges[3], allBadges[4]], isOnDuty: true },
  { id: 'emp-002', name: 'Ananya Iyer', avatar: '', role: 'salesperson', level: 'lead', branchId: 'br-003', branchName: 'Colide Metro', email: 'ananya@colide.in', phone: '+91 98765 43211', joinDate: '2024-06-01', salary: 32000, totalSales: 3180000, monthSales: 380000, weekSales: 98000, todaySales: 16200, conversionRate: 58, upsellRate: 28, attendanceRate: 96, customerRating: 4.8, targetAchieved: 132, streak: 38, points: 4200, rank: 2, badges: [allBadges[0], allBadges[2], allBadges[3]], isOnDuty: true },
  { id: 'emp-003', name: 'Deepak Singh', avatar: '', role: 'salesperson', level: 'lead', branchId: 'br-001', branchName: 'Colide Central', email: 'deepak@colide.in', phone: '+91 98765 43212', joinDate: '2024-04-20', salary: 30000, totalSales: 2950000, monthSales: 340000, weekSales: 88000, todaySales: 14800, conversionRate: 55, upsellRate: 25, attendanceRate: 94, customerRating: 4.7, targetAchieved: 125, streak: 22, points: 3800, rank: 3, badges: [allBadges[0], allBadges[4]], isOnDuty: true },
  { id: 'emp-004', name: 'Meera Nair', avatar: '', role: 'salesperson', level: 'senior', branchId: 'br-002', branchName: 'Colide Express', email: 'meera@colide.in', phone: '+91 98765 43213', joinDate: '2024-08-10', salary: 28000, totalSales: 2450000, monthSales: 295000, weekSales: 76000, todaySales: 12400, conversionRate: 48, upsellRate: 22, attendanceRate: 92, customerRating: 4.6, targetAchieved: 115, streak: 15, points: 3200, rank: 4, badges: [allBadges[0]], isOnDuty: true },
  { id: 'emp-005', name: 'Suresh Babu', avatar: '', role: 'salesperson', level: 'senior', branchId: 'br-005', branchName: 'Colide Corner', email: 'suresh@colide.in', phone: '+91 98765 43214', joinDate: '2024-09-05', salary: 27000, totalSales: 2100000, monthSales: 268000, weekSales: 69000, todaySales: 11200, conversionRate: 45, upsellRate: 20, attendanceRate: 95, customerRating: 4.5, targetAchieved: 108, streak: 28, points: 2900, rank: 5, badges: [allBadges[2]], isOnDuty: true },
  { id: 'emp-006', name: 'Hrishitha', avatar: '', role: 'salesperson', level: 'senior', branchId: 'br-002', branchName: 'Colide Express', email: 'hrishitha@colide.in', phone: '+91 98765 43215', joinDate: '2024-07-15', salary: 27000, totalSales: 1980000, monthSales: 245000, weekSales: 63000, todaySales: 10500, conversionRate: 42, upsellRate: 18, attendanceRate: 90, customerRating: 4.4, targetAchieved: 102, streak: 10, points: 2650, rank: 6, badges: [], isOnDuty: true },
  { id: 'emp-007', name: 'Karthik Raj', avatar: '', role: 'salesperson', level: 'junior', branchId: 'br-003', branchName: 'Colide Metro', email: 'karthik@colide.in', phone: '+91 98765 43216', joinDate: '2025-01-10', salary: 22000, totalSales: 1250000, monthSales: 198000, weekSales: 52000, todaySales: 8800, conversionRate: 38, upsellRate: 15, attendanceRate: 88, customerRating: 4.3, targetAchieved: 95, streak: 8, points: 1800, rank: 7, badges: [], isOnDuty: true },
  { id: 'emp-008', name: 'Divya Menon', avatar: '', role: 'salesperson', level: 'junior', branchId: 'br-004', branchName: 'Colide Mall', email: 'divya@colide.in', phone: '+91 98765 43217', joinDate: '2025-02-01', salary: 22000, totalSales: 980000, monthSales: 165000, weekSales: 42000, todaySales: 6500, conversionRate: 32, upsellRate: 12, attendanceRate: 86, customerRating: 4.2, targetAchieved: 85, streak: 5, points: 1400, rank: 8, badges: [], isOnDuty: true },
  { id: 'emp-009', name: 'Amit Patel', avatar: '', role: 'salesperson', level: 'junior', branchId: 'br-005', branchName: 'Colide Corner', email: 'amit@colide.in', phone: '+91 98765 43218', joinDate: '2025-03-15', salary: 20000, totalSales: 750000, monthSales: 142000, weekSales: 36000, todaySales: 5800, conversionRate: 28, upsellRate: 10, attendanceRate: 84, customerRating: 4.1, targetAchieved: 78, streak: 3, points: 1100, rank: 9, badges: [], isOnDuty: false },
  { id: 'emp-010', name: 'Shreya Gupta', avatar: '', role: 'salesperson', level: 'trainee', branchId: 'br-004', branchName: 'Colide Mall', email: 'shreya@colide.in', phone: '+91 98765 43219', joinDate: '2025-11-01', salary: 18000, totalSales: 320000, monthSales: 85000, weekSales: 21000, todaySales: 3200, conversionRate: 22, upsellRate: 8, attendanceRate: 80, customerRating: 3.9, targetAchieved: 65, streak: 0, points: 450, rank: 10, badges: [], isOnDuty: true },
  { id: 'emp-011', name: 'Arjun Mehta', avatar: '', role: 'manager', level: 'expert', branchId: 'br-001', branchName: 'Colide Central', email: 'arjun.m@colide.in', phone: '+91 98765 43220', joinDate: '2023-06-01', salary: 55000, totalSales: 0, monthSales: 0, weekSales: 0, todaySales: 0, conversionRate: 0, upsellRate: 0, attendanceRate: 99, customerRating: 4.9, targetAchieved: 0, streak: 60, points: 5000, rank: 0, badges: [allBadges[2], allBadges[5]], isOnDuty: true },
  { id: 'emp-012', name: 'Priya Sharma', avatar: '', role: 'manager', level: 'lead', branchId: 'br-002', branchName: 'Colide Express', email: 'priya.s@colide.in', phone: '+91 98765 43221', joinDate: '2023-09-15', salary: 50000, totalSales: 0, monthSales: 0, weekSales: 0, todaySales: 0, conversionRate: 0, upsellRate: 0, attendanceRate: 97, customerRating: 4.7, targetAchieved: 0, streak: 42, points: 4500, rank: 0, badges: [allBadges[2]], isOnDuty: true },
  { id: 'emp-013', name: 'Nisha Jain', avatar: '', role: 'accountant', level: 'senior', branchId: 'br-001', branchName: 'Colide Central', email: 'nisha@colide.in', phone: '+91 98765 43222', joinDate: '2024-01-10', salary: 38000, totalSales: 0, monthSales: 0, weekSales: 0, todaySales: 0, conversionRate: 0, upsellRate: 0, attendanceRate: 96, customerRating: 0, targetAchieved: 0, streak: 30, points: 2800, rank: 0, badges: [allBadges[2]], isOnDuty: true },
  { id: 'emp-014', name: 'Rohan Verma', avatar: '', role: 'salesperson', level: 'senior', branchId: 'br-001', branchName: 'Colide Central', email: 'rohan@colide.in', phone: '+91 98765 43223', joinDate: '2024-05-20', salary: 28000, totalSales: 2200000, monthSales: 275000, weekSales: 71000, todaySales: 11800, conversionRate: 50, upsellRate: 24, attendanceRate: 93, customerRating: 4.5, targetAchieved: 110, streak: 18, points: 3100, rank: 5, badges: [allBadges[0]], isOnDuty: true },
  { id: 'emp-015', name: 'Lakshmi Devi', avatar: '', role: 'salesperson', level: 'junior', branchId: 'br-006', branchName: 'Colide Mart', email: 'lakshmi@colide.in', phone: '+91 98765 43224', joinDate: '2025-06-01', salary: 20000, totalSales: 450000, monthSales: 72000, weekSales: 15000, todaySales: 0, conversionRate: 20, upsellRate: 6, attendanceRate: 78, customerRating: 3.8, targetAchieved: 62, streak: 0, points: 600, rank: 14, badges: [], isOnDuty: false },
];

// ─── Transactions ─────────────────────────────────────────────

const now = new Date('2026-05-24T00:30:00+05:30');

function hoursAgo(h: number): string {
  const d = new Date(now.getTime() - h * 3600000);
  return d.toISOString();
}

export const recentTransactions: Transaction[] = [
  { id: 'tx-001', branchId: 'br-001', branchName: 'Colide Central', type: 'sale', amount: 12450, paymentMethod: 'upi', description: 'Samsung Galaxy Buds + Case', customer: 'Rajesh K.', employeeId: 'emp-001', employeeName: 'Ravi Kumar', timestamp: hoursAgo(0.1), status: 'completed' },
  { id: 'tx-002', branchId: 'br-003', branchName: 'Colide Metro', type: 'sale', amount: 4580, paymentMethod: 'card', description: 'Levis Denim Jacket', customer: 'Aishwarya M.', employeeId: 'emp-002', employeeName: 'Ananya Iyer', timestamp: hoursAgo(0.3), status: 'completed' },
  { id: 'tx-003', branchId: 'br-002', branchName: 'Colide Express', type: 'sale', amount: 890, paymentMethod: 'cash', description: 'Amul Butter 500g x3', customer: 'Mohan L.', employeeId: 'emp-004', employeeName: 'Meera Nair', timestamp: hoursAgo(0.5), status: 'completed' },
  { id: 'tx-004', branchId: 'br-001', branchName: 'Colide Central', type: 'refund', amount: -2200, paymentMethod: 'upi', description: 'Returned: Wireless Mouse (defective)', customer: 'Sita R.', employeeId: 'emp-003', employeeName: 'Deepak Singh', timestamp: hoursAgo(0.8), status: 'refunded' },
  { id: 'tx-005', branchId: 'br-005', branchName: 'Colide Corner', type: 'sale', amount: 18900, paymentMethod: 'card', description: 'Nike Air Max Shoes + Socks Bundle', customer: 'Vikram T.', employeeId: 'emp-005', employeeName: 'Suresh Babu', timestamp: hoursAgo(1.2), status: 'completed' },
  { id: 'tx-006', branchId: 'br-003', branchName: 'Colide Metro', type: 'sale', amount: 3250, paymentMethod: 'upi', description: 'Prestige Pressure Cooker 5L', customer: 'Geeta P.', employeeId: 'emp-007', employeeName: 'Karthik Raj', timestamp: hoursAgo(1.5), status: 'completed' },
  { id: 'tx-007', branchId: 'br-002', branchName: 'Colide Express', type: 'expense', amount: -5500, paymentMethod: 'netbanking', description: 'Monthly electricity bill', timestamp: hoursAgo(2.0), status: 'completed' },
  { id: 'tx-008', branchId: 'br-004', branchName: 'Colide Mall', type: 'sale', amount: 1650, paymentMethod: 'cash', description: 'Himalaya Face Wash + Moisturizer', customer: 'Prerna S.', employeeId: 'emp-008', employeeName: 'Divya Menon', timestamp: hoursAgo(2.5), status: 'completed' },
  { id: 'tx-009', branchId: 'br-001', branchName: 'Colide Central', type: 'sale', amount: 24500, paymentMethod: 'card', description: 'JBL Bluetooth Speaker + Earphones', customer: 'Akash B.', employeeId: 'emp-001', employeeName: 'Ravi Kumar', timestamp: hoursAgo(3.0), status: 'completed' },
  { id: 'tx-010', branchId: 'br-005', branchName: 'Colide Corner', type: 'sale', amount: 6780, paymentMethod: 'upi', description: 'Allen Solly Formal Shirt x2', customer: 'Naveen R.', employeeId: 'emp-009', employeeName: 'Amit Patel', timestamp: hoursAgo(3.5), status: 'completed' },
];

// ─── KPI Data ─────────────────────────────────────────────────

export const kpiData: KPIData[] = [
  {
    label: "Today's Revenue",
    value: 482350,
    previousValue: 430500,
    change: 51850,
    changePercent: 12.04,
    trend: 'up',
    format: 'currency',
    icon: 'IndianRupee',
    color: '#6366f1',
    sparklineData: [310000, 345000, 380000, 395000, 420000, 455000, 482350],
  },
  {
    label: 'Total Transactions',
    value: 847,
    previousValue: 784,
    change: 63,
    changePercent: 8.04,
    trend: 'up',
    format: 'number',
    icon: 'ShoppingCart',
    color: '#10b981',
    sparklineData: [620, 680, 720, 745, 790, 810, 847],
  },
  {
    label: 'Active Branches',
    value: 5,
    previousValue: 5,
    change: 0,
    changePercent: 0,
    trend: 'neutral',
    format: 'number',
    icon: 'Store',
    color: '#06b6d4',
    sparklineData: [4, 5, 5, 4, 5, 5, 5],
  },
  {
    label: 'Profit Margin',
    value: 18.5,
    previousValue: 16.8,
    change: 1.7,
    changePercent: 10.12,
    trend: 'up',
    format: 'percent',
    icon: 'TrendingUp',
    color: '#f59e0b',
    sparklineData: [14.2, 15.5, 16.1, 16.8, 17.4, 18.0, 18.5],
  },
];

// ─── Top Products ─────────────────────────────────────────────

export const topProducts: TopProduct[] = [
  { id: 'p-01', name: 'Samsung Galaxy Buds2 Pro', category: 'Electronics', sales: 145, revenue: 1812500, growth: 24.5 },
  { id: 'p-02', name: 'Nike Air Max 270', category: 'Footwear', sales: 128, revenue: 1536000, growth: 18.2 },
  { id: 'p-03', name: 'Levis 511 Slim Jeans', category: 'Clothing', sales: 112, revenue: 448000, growth: 15.8 },
  { id: 'p-04', name: 'JBL Flip 6 Speaker', category: 'Electronics', sales: 98, revenue: 882000, growth: 22.1 },
  { id: 'p-05', name: 'Prestige Pressure Cooker', category: 'Home & Kitchen', sales: 87, revenue: 304500, growth: 8.5 },
  { id: 'p-06', name: 'Amul Butter 500g', category: 'Groceries', sales: 342, revenue: 171000, growth: 5.2 },
  { id: 'p-07', name: 'Himalaya Face Wash', category: 'Beauty', sales: 215, revenue: 193500, growth: 12.3 },
  { id: 'p-08', name: 'Allen Solly Formal Shirt', category: 'Clothing', sales: 94, revenue: 329000, growth: -3.4 },
  { id: 'p-09', name: 'Boat Airdopes 141', category: 'Electronics', sales: 186, revenue: 279000, growth: 32.7 },
  { id: 'p-10', name: 'Tata Tea Gold 500g', category: 'Groceries', sales: 298, revenue: 89400, growth: 2.1 },
];

// ─── Cash Flow Entries ────────────────────────────────────────

function generateCashFlowEntries(): CashFlowEntry[] {
  const entries: CashFlowEntry[] = [];
  const branchIds = ['br-001', 'br-002', 'br-003', 'br-004', 'br-005', 'br-006'];

  for (let day = 29; day >= 0; day--) {
    const date = new Date(now);
    date.setDate(date.getDate() - day);
    const dateStr = date.toISOString().split('T')[0];

    for (const branchId of branchIds) {
      const isInactive = branchId === 'br-006' && day < 5;
      const multiplier = branchId === 'br-001' ? 1.2 : branchId === 'br-003' ? 1.1 : branchId === 'br-004' ? 0.5 : branchId === 'br-006' ? 0.15 : 0.85;
      const base = isInactive ? 0 : 80000 * multiplier;

      const cashSales = Math.round(base * 0.4 * (0.85 + Math.random() * 0.3));
      const upiPayments = Math.round(base * 0.3 * (0.85 + Math.random() * 0.3));
      const cardPayments = Math.round(base * 0.25 * (0.85 + Math.random() * 0.3));
      const refunds = Math.round(base * 0.03 * Math.random());
      const expenses = Math.round(base * 0.15 * (0.8 + Math.random() * 0.4));
      const vendorPayouts = Math.round(base * 0.08 * Math.random());
      const salaries = day === 0 ? Math.round(base * 0.2) : 0;
      const netCashFlow = cashSales + upiPayments + cardPayments - refunds - expenses - vendorPayouts - salaries;
      const hasMismatch = Math.random() < 0.05;
      const mismatchAmount = hasMismatch ? Math.round((Math.random() * 8000) + 2000) : 0;

      entries.push({
        id: `cf-${branchId}-${dateStr}`,
        branchId,
        date: dateStr,
        cashSales,
        upiPayments,
        cardPayments,
        refunds,
        expenses,
        vendorPayouts,
        salaries,
        netCashFlow,
        closingBalance: netCashFlow + 50000,
        isVerified: day > 1 ? Math.random() > 0.1 : false,
        mismatchAmount,
      });
    }
  }
  return entries;
}

export const cashFlowEntries = generateCashFlowEntries();

// ─── Cash Mismatches ──────────────────────────────────────────

export const cashMismatches: CashMismatch[] = [
  {
    id: 'cm-001',
    branchId: 'br-004',
    branchName: 'Colide Mall',
    date: '2026-05-23',
    expectedAmount: 34500,
    actualAmount: 22000,
    mismatchAmount: 12500,
    severity: 'critical',
    status: 'detected',
    description: 'Branch 4 has ₹12,500 mismatch between billing and cash register. Multiple refunds processed without manager approval.',
  },
  {
    id: 'cm-002',
    branchId: 'br-002',
    branchName: 'Colide Express',
    date: '2026-05-22',
    expectedAmount: 92000,
    actualAmount: 88500,
    mismatchAmount: 3500,
    severity: 'medium',
    status: 'investigating',
    description: 'Minor cash difference detected during daily closing. Possible counting error at register 2.',
  },
  {
    id: 'cm-003',
    branchId: 'br-006',
    branchName: 'Colide Mart',
    date: '2026-05-21',
    expectedAmount: 15000,
    actualAmount: 8200,
    mismatchAmount: 6800,
    severity: 'high',
    status: 'investigating',
    description: 'Significant shortfall in Pune branch. Cash drawer opening logs show 14 unmatched entries.',
  },
  {
    id: 'cm-004',
    branchId: 'br-001',
    branchName: 'Colide Central',
    date: '2026-05-20',
    expectedAmount: 125000,
    actualAmount: 123800,
    mismatchAmount: 1200,
    severity: 'low',
    status: 'resolved',
    description: 'Small discrepancy resolved. Change miscounted during busy hours.',
  },
];

// ─── Alerts ───────────────────────────────────────────────────

export const alerts: Alert[] = [
  { id: 'al-001', branchId: 'br-004', branchName: 'Colide Mall', category: 'cash_mismatch', severity: 'critical', title: 'Cash Mismatch Detected', message: '₹12,500 mismatch in Colide Mall between billing and cash register.', timestamp: hoursAgo(0.5), isRead: false, isResolved: false },
  { id: 'al-002', branchId: 'br-006', branchName: 'Colide Mart', category: 'performance', severity: 'danger', title: 'Branch Inactive', message: 'Colide Mart (Pune) has reported zero sales today.', timestamp: hoursAgo(2), isRead: false, isResolved: false },
  { id: 'al-003', branchId: 'br-003', branchName: 'Colide Metro', category: 'low_stock', severity: 'warning', title: 'Low Stock Alert', message: 'Samsung Galaxy Buds stock below reorder level in Bangalore.', timestamp: hoursAgo(3), isRead: false, isResolved: false },
  { id: 'al-004', branchId: 'br-002', branchName: 'Colide Express', category: 'fraud', severity: 'warning', title: 'Unusual Refund Pattern', message: 'Employee issued 8 refunds in 3 hours at Delhi branch.', timestamp: hoursAgo(4), isRead: true, isResolved: false },
  { id: 'al-005', branchId: 'br-001', branchName: 'Colide Central', category: 'achievement', severity: 'info', title: 'Target Achieved! 🎉', message: 'Colide Central crossed today\'s revenue target of ₹1,00,000.', timestamp: hoursAgo(5), isRead: true, isResolved: true },
  { id: 'al-006', branchId: 'br-005', branchName: 'Colide Corner', category: 'low_stock', severity: 'warning', title: 'Restock Required', message: '5 products below minimum stock level at Hyderabad branch.', timestamp: hoursAgo(6), isRead: true, isResolved: false },
  { id: 'al-007', category: 'achievement', severity: 'info', title: 'Employee Milestone', message: 'Ravi Kumar completed 45-day attendance streak! 🔥', timestamp: hoursAgo(8), isRead: true, isResolved: true },
  { id: 'al-008', branchId: 'br-004', branchName: 'Colide Mall', category: 'performance', severity: 'warning', title: 'Below Target', message: 'Chennai branch at 65% of daily target with 3 hours remaining.', timestamp: hoursAgo(10), isRead: true, isResolved: false },
];

// ─── Revenue Chart Data ───────────────────────────────────────

export function generateRevenueData(range: string = 'month') {
  const data = [];
  const points = range === 'today' ? 24 : range === 'week' ? 7 : 30;

  for (let i = 0; i < points; i++) {
    const date = new Date(now);
    if (range === 'today') {
      date.setHours(i, 0, 0, 0);
    } else {
      date.setDate(date.getDate() - (points - 1 - i));
    }

    const baseRevenue = range === 'today' ? 20000 : 350000;
    const variance = baseRevenue * 0.3;
    const trendBump = (i / points) * baseRevenue * 0.15;

    data.push({
      date: range === 'today'
        ? `${i}:00`
        : date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      revenue: Math.round(baseRevenue + trendBump + (Math.random() - 0.4) * variance),
      previousRevenue: Math.round(baseRevenue * 0.88 + (Math.random() - 0.4) * variance),
    });
  }
  return data;
}

// ─── Branch Performance ───────────────────────────────────────

export const branchPerformance: BranchPerformance[] = branches.map((b) => ({
  branchId: b.id,
  branchName: b.name,
  revenue: b.monthSales,
  profit: Math.round(b.monthSales * b.profitMargin / 100),
  transactions: b.todayTransactions * 30,
  avgTransactionValue: b.todaySales > 0 ? Math.round(b.todaySales / Math.max(b.todayTransactions, 1)) : 0,
  customerSatisfaction: b.rating,
  employeeEfficiency: Math.round((b.todaySales / Math.max(b.employeeCount, 1)) / 100),
  growthRate: b.status === 'active' ? 8 + Math.random() * 15 : b.status === 'slow' ? -2 + Math.random() * 8 : -10 + Math.random() * 5,
}));

// ─── Helper Functions ─────────────────────────────────────────

export function getBranchById(id: string): Branch | undefined {
  return branches.find((b) => b.id === id);
}

export function getEmployeesByBranch(branchId: string): Employee[] {
  return employees.filter((e) => e.branchId === branchId);
}

export function getTransactionsByBranch(branchId: string): Transaction[] {
  return recentTransactions.filter((t) => t.branchId === branchId);
}

export function getTotalRevenue(): number {
  return branches.reduce((sum, b) => sum + b.todaySales, 0);
}

export function getActiveBranchCount(): number {
  return branches.filter((b) => b.status === 'active').length;
}
