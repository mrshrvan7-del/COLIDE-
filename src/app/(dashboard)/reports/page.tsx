'use client';

import { useState } from 'react';
import ReportGenerator from '@/components/reports/ReportGenerator';
import ReportHistory from '@/components/reports/ReportHistory';
import { mockReports } from '@/lib/mockData';
import { Report } from '@/lib/types';
import styles from './page.module.css';

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>(mockReports);

  const handleReportGenerated = (newReport: Report) => {
    setReports((prev) => [newReport, ...prev]);
  };

  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        <div className={styles.generatorSection}>
          <ReportGenerator onReportGenerated={handleReportGenerated} />
        </div>
        <div className={styles.historySection}>
          <ReportHistory reports={reports} />
        </div>
      </div>
    </div>
  );
}
