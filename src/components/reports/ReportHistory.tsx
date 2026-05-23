'use client';

import { useState } from 'react';
import { Download, FileSpreadsheet, FileText, FileDown, Search } from 'lucide-react';
import { Report, ReportType, ExportFormat } from '@/lib/types';
import { cn } from '@/lib/utils';
import styles from './ReportHistory.module.css';

interface ReportHistoryProps {
  reports: Report[];
}

export default function ReportHistory({ reports }: ReportHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');

  const filteredReports = reports.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || r.type === selectedType.toLowerCase();
    return matchesSearch && matchesType;
  });

  const getFormatBadge = (format: ExportFormat) => {
    if (format === 'pdf') return <span className={cn(styles.badge, styles.pdf)}>PDF</span>;
    if (format === 'excel') return <span className={cn(styles.badge, styles.excel)}>XLSX</span>;
    return <span className={cn(styles.badge, styles.csv)}>CSV</span>;
  };

  const getFileIcon = (format: ExportFormat) => {
    if (format === 'pdf') return <FileText size={18} className={styles.filePdf} />;
    if (format === 'excel') return <FileSpreadsheet size={18} className={styles.fileExcel} />;
    return <FileDown size={18} className={styles.fileCsv} />;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.titleBlock}>
          <h3 className={styles.title}>Export History</h3>
          <p className={styles.subtitle}>Audit logs of compiled spreadsheets and compliance forms</p>
        </div>

        <div className={styles.filters}>
          <div className={styles.searchWrapper}>
            <Search size={16} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search reports..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className={styles.typeSelect}
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="GST">GST Filings</option>
            <option value="Sales">Sales Logs</option>
            <option value="Payroll">Payroll Logs</option>
            <option value="Inventory">Inventory Audits</option>
          </select>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Report Details</th>
              <th>Date Range</th>
              <th>Generated At</th>
              <th>Format</th>
              <th className={styles.alignRight}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <tr key={report.id}>
                  <td>
                    <div className={styles.reportCell}>
                      <div className={styles.fileIconWrapper}>
                        {getFileIcon(report.format)}
                      </div>
                      <div>
                        <div className={styles.reportTitle}>{report.title}</div>
                        <div className={styles.reportDesc}>{report.description}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={styles.dateRangeText}>
                      {new Date(report.dateRange.start).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                      {' - '}
                      {new Date(report.dateRange.end).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </td>
                  <td>
                    <span className={styles.timestampText}>
                      {new Date(report.generatedAt).toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </td>
                  <td>
                    {getFormatBadge(report.format)}
                  </td>
                  <td className={styles.alignRight}>
                    <a
                      href={report.downloadUrl}
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`Downloading ${report.title}.${report.format}...`);
                      }}
                      className={styles.downloadBtn}
                      title="Download File"
                    >
                      <Download size={14} />
                      Download
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className={styles.noResults}>
                  No historical reports match the filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
