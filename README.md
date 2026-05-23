<p align="center">
  <h1 align="center">🚀 Colide</h1>
  <h3 align="center">Smart Multi-Branch Retail Intelligence Platform</h3>
</p>

<p align="center">
  <strong>One platform to control every branch, employee, sale, bill, and business decision — in real time.</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#screenshots">Screenshots</a> •
  <a href="#roadmap">Roadmap</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

---

## 🎯 What is Colide?

**Colide** is a centralized business intelligence and operations control platform designed for retail chains, franchises, restaurants, wholesalers, supermarkets, mobile stores, pharmacies, and more.

It empowers business owners to monitor **sales**, **cash flow**, **bills & invoices**, **employee performance**, **branch operations**, **incentives & rankings**, and **inventory movement** — all from a single, beautiful dashboard across multiple stores.

> Think of it as an **ERP + POS Intelligence + Retail Analytics + Workforce Management** system — all rolled into one modern SaaS platform.

---

## ✨ Features

### 🏪 Multi-Branch Live Dashboard
- Real-time KPIs: Today's sales, revenue, profit margins, active branches
- Interactive branch heatmap with performance indicators (🟢 Active / 🟡 Slow / 🔴 No Sales)
- Branch-wise comparison charts and rankings
- Live transaction feeds and top product tracking

### 💸 Smart Cash Flow Tracking
- Track Cash, UPI, Card, Refunds, Expenses, Vendor Payouts, Salaries
- Payment method breakdown with interactive charts
- Cash mismatch detection with alerts
- Daily closing verification system

### 🧾 AI Bill & Invoice Scanner
- Upload or scan bills with OCR (Tesseract.js)
- Auto-extract: amount, GST, date, product names, vendor details
- Duplicate & fake bill detection
- Automatic expense categorization

### 📊 Salesperson Ranking System
- Revenue, conversion rate, upselling, attendance, customer feedback tracking
- Interactive leaderboard with Top 3 podium display
- Branch-wise and company-wide rankings
- Gamification: achievement badges 🏅, levels, reward points

### 🎯 Smart Incentive Engine
- Auto-calculate incentives, commissions, bonuses, promotion eligibility
- Based on: sales targets, attendance, customer ratings, consistency
- AI-powered promotion recommendations

### 📦 Inventory Intelligence
- Cross-branch inventory tracking
- Low stock alerts & auto restock suggestions
- Dead stock identification & fast-moving product analysis
- AI-powered inter-branch stock transfer recommendations

### 📈 Business Analytics & Forecasting
- AI-predicted: future sales, festival demand, seasonal trends
- Customer buying pattern analysis
- Employee performance forecasting
- Predicted vs actual charts with confidence intervals

### 🤖 AI Business Assistant
- Natural language chat interface
- Ask: "Which branch performed best today?", "Who deserves promotion?"
- Data-backed responses with inline charts
- Context-aware suggestions

### 🧠 Fraud & Risk Detection
- Detect: fake bills, suspicious refunds, employee manipulation, inventory theft
- Anomaly timeline with severity indicators
- Risk scoring per branch/employee
- Investigation workflow

### 🔐 Role-Based Access Control
- Owner, Branch Manager, Accountant, Salesperson, Auditor roles
- Permission-based UI rendering
- Route protection middleware

### 📑 Automated Reports
- GST, Sales, Payroll, Branch Performance, Employee Appraisal reports
- Export: PDF, Excel, CSV
- Scheduled report generation

### 📱 Mobile-First & PWA
- Responsive across all devices
- Progressive Web App with offline capability
- Push notifications for real-time alerts

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 14+](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | Vanilla CSS + CSS Modules |
| **Charts** | [Recharts](https://recharts.org/) + Custom SVG |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Fonts** | [Inter](https://fonts.google.com/specimen/Inter) + [JetBrains Mono](https://www.jetbrains.com/lp/mono/) |
| **OCR** | [Tesseract.js](https://tesseract.projectnaptha.com/) |
| **Auth** | [NextAuth.js](https://next-auth.js.org/) |
| **Database** | PostgreSQL + Prisma ORM |
| **Real-time** | Firebase Realtime Database |
| **Offline** | Service Workers + IndexedDB |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18.17 or later
- [npm](https://www.npmjs.com/) 9+ or [pnpm](https://pnpm.io/)

### Installation

```bash
# Clone the repository
git clone https://github.com/mrshrvan7-del/COLIDE-.git
cd COLIDE-

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 🏗️ Architecture

```
COLIDE/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Landing page
│   │   ├── (dashboard)/        # Dashboard route group
│   │   │   ├── layout.tsx      # Sidebar + Header layout
│   │   │   ├── dashboard/      # Multi-branch dashboard
│   │   │   ├── cashflow/       # Cash flow tracking
│   │   │   ├── employees/      # Employee rankings
│   │   │   ├── incentives/     # Incentive engine
│   │   │   ├── inventory/      # Inventory management
│   │   │   ├── bills/          # AI bill scanner
│   │   │   ├── assistant/      # AI business assistant
│   │   │   ├── fraud/          # Fraud detection
│   │   │   ├── analytics/      # Analytics & forecasting
│   │   │   └── reports/        # Report generation
│   ├── components/
│   │   ├── layout/             # Sidebar, Header
│   │   ├── dashboard/          # Dashboard widgets
│   │   ├── charts/             # Chart components
│   │   ├── cashflow/           # Cash flow components
│   │   └── ui/                 # Shared UI components
│   ├── lib/
│   │   ├── mockData.ts         # Mock data
│   │   ├── utils.ts            # Utilities
│   │   ├── types.ts            # TypeScript types
│   │   └── constants.ts        # App constants
│   └── styles/
│       ├── globals.css         # Global styles
│       └── design-system.css   # Design tokens
├── public/                     # Static assets
├── package.json
└── tsconfig.json
```

---

## 🎨 Design

Colide features a **premium dark theme** with:

- 🌑 **Dark glassmorphism** cards with subtle gradients
- ✨ **Micro-animations** on every interaction
- 🎨 **Indigo/Violet** accent palette with neon glow effects
- 📱 **Fully responsive** layouts for all screen sizes
- 🔤 **Inter + JetBrains Mono** typography

---

## 🗺️ Roadmap

- [x] ✅ Project setup & design system
- [x] ✅ **Phase 1**: Multi-branch dashboard + Cash flow tracking
- [ ] 🔷 **Phase 2**: Employee rankings + Incentive engine + Inventory
- [ ] 🔷 **Phase 3**: AI bill scanner + Business assistant + Fraud detection + Analytics
- [ ] 🔷 **Phase 4**: RBAC + Reports + Mobile PWA + Landing page

---

## 🏆 What Category This Project Falls Under

This is a mix of:

- **ERP** (Enterprise Resource Planning)
- **POS Intelligence** (Point of Sale Analytics)
- **Retail Analytics** (Business Intelligence)
- **Workforce Management** (Employee Performance)
- **Business Intelligence SaaS** (Multi-Branch Operations)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Saravana Shrutheesh**

- GitHub: [@mrshrvan7-del](https://github.com/mrshrvan7-del)

---

<p align="center">
  Made with ❤️ for the retail industry
</p>
