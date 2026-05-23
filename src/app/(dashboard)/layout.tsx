import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import styles from './DashboardLayout.module.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.appLayout}>
      <Sidebar />
      <div className={styles.mainArea}>
        <Header />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
