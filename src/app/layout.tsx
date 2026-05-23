import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Colide — Smart Multi-Branch Retail Intelligence",
  description:
    "One platform to control every branch, employee, sale, bill, and business decision in real time. Monitor sales, cash flow, inventory, and employee performance across all your retail locations.",
  keywords: [
    "retail intelligence",
    "multi-branch",
    "POS",
    "business analytics",
    "inventory management",
    "employee tracking",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Background gradient glow - decorative */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 0,
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(139, 92, 246, 0.06) 0%, transparent 50%)",
          }}
          aria-hidden="true"
        />
        {children}
      </body>
    </html>
  );
}
