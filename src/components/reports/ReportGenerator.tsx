'use client';

import { useState } from 'react';
import { Calendar, FileText, Download, Play, RefreshCw, CheckCircle2 } from 'lucide-react';
import { branches } from '@/lib/mockData';
import { Report, ReportType, ExportFormat } from '@/lib/types';
import { cn } from '@/lib/utils';
import styles from './ReportGenerator.module.css';

interface ReportGeneratorProps {
  onReportGenerated: (report: Report) => void;
}

export default function ReportGenerator({ onReportGenerated }: ReportGeneratorProps) {
  const [reportType, setReportType] = useState<ReportType>('gst');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [startDate, setStartDate] = useState<string>('2026-05-01');
  const [endDate, setEndDate] = useState<string>('2026-05-24');
  const [exportFormat, setExportFormat] = useState<ExportFormat>('pdf');
  
  // Generating state
  const [status, setStatus] = useState<'idle' | 'running' | 'success'>('idle');
  const [progress, setProgress] = useState(0);
  const [statusMsg, setStatusMsg] = useState('');

  const reportTypes = [
    { id: 'gst' as ReportType, label: 'GST Tax Filings', desc: 'Summarized sales tax collected and input tax credits' },
    { id: 'sales' as ReportType, label: 'Sales & Revenue Analysis', desc: 'Granular product movement, margins, and yield audits' },
    { id: 'payroll' as ReportType, label: 'Payroll & Incentives', desc: 'Employee commissions, base salaries, and streaks' },
    { id: 'inventory' as ReportType, label: 'Inventory Audit Log', desc: 'Dead stock, low inventory alerts, and restock transfers' },
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== 'idle') return;

    setStatus('running');
    setProgress(0);

    const steps = [
      'Fetching database transactional schemas...',
      'Computing GSTR ledger balances...',
      'Validating cross-branch compliance records...',
      'Structuring layout and compiling assets...',
      'Assembling report exports...'
    ];

    for (let i = 0; i < steps.length; i++) {
      setStatusMsg(steps[i]);
      // Increment progress
      for (let p = i * 20; p < (i + 1) * 20; p += 2) {
        setProgress(p);
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    }
    
    setProgress(100);
    setStatus('success');
    setStatusMsg('Report compiled successfully!');

    // Create a new report item
    const typeLabel = reportTypes.find((t) => t.id === reportType)?.label || 'Custom Report';
    const targetBranch = selectedBranch === 'all' 
      ? 'All Branches' 
      : branches.find((b) => b.id === selectedBranch)?.name || 'Specified Branch';

    const newReport: Report = {
      id: `rep-${Math.floor(1000 + Math.random() * 9000)}`,
      type: reportType,
      title: `${typeLabel} (${targetBranch})`,
      description: `Generated ledger data for dates ${startDate} to ${endDate}. Export format: ${exportFormat.toUpperCase()}`,
      dateRange: { start: startDate, end: endDate },
      branchId: selectedBranch === 'all' ? undefined : selectedBranch,
      generatedAt: new Date().toISOString(),
      format: exportFormat,
      downloadUrl: '#',
    };

    // Callback to append report to list
    setTimeout(() => {
      onReportGenerated(newReport);
      setStatus('idle');
      setProgress(0);
    }, 1200);
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Generate System Report</h3>
      <p className={styles.subtitle}>Configure audit-ready compliance sheets and financial summaries</p>

      <form onSubmit={handleGenerate} className={styles.form}>
        {/* Report Type Selector */}
        <div className={styles.section}>
          <label className={styles.label}>Select Report Domain</label>
          <div className={styles.typeGrid}>
            {reportTypes.map((type) => (
              <div
                key={type.id}
                className={cn(
                  styles.typeCard,
                  reportType === type.id && styles.activeTypeCard
                )}
                onClick={() => setReportType(type.id)}
              >
                <div className={styles.typeCardHeader}>
                  <FileText className={styles.typeCardIcon} size={18} />
                  <span className={styles.typeCardTitle}>{type.label}</span>
                </div>
                <p className={styles.typeCardDesc}>{type.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          {/* Branch Filter */}
          <div className={styles.col}>
            <label className={styles.label} htmlFor="branchSelect">Scope (Branch)</label>
            <select
              id="branchSelect"
              className={styles.input}
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              <option value="all">All Branches (Consolidated)</option>
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.city})
                </option>
              ))}
            </select>
          </div>

          {/* Export Format */}
          <div className={styles.col}>
            <label className={styles.label} htmlFor="formatSelect">File Format</label>
            <select
              id="formatSelect"
              className={styles.input}
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value as ExportFormat)}
            >
              <option value="pdf">Adobe PDF (.pdf)</option>
              <option value="excel">Microsoft Excel (.xlsx)</option>
              <option value="csv">Comma Separated Values (.csv)</option>
            </select>
          </div>
        </div>

        <div className={styles.row}>
          {/* Start Date */}
          <div className={styles.col}>
            <label className={styles.label} htmlFor="startDateInput">Date Range Start</label>
            <div className={styles.inputWrapper}>
              <Calendar className={styles.inputIcon} size={16} />
              <input
                id="startDateInput"
                type="date"
                className={cn(styles.input, styles.hasIcon)}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </div>

          {/* End Date */}
          <div className={styles.col}>
            <label className={styles.label} htmlFor="endDateInput">Date Range End</label>
            <div className={styles.inputWrapper}>
              <Calendar className={styles.inputIcon} size={16} />
              <input
                id="endDateInput"
                type="date"
                className={cn(styles.input, styles.hasIcon)}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Generate Button / Progress Bar */}
        <div className={styles.actions}>
          {status === 'idle' && (
            <button type="submit" className={styles.submitBtn}>
              <Play size={16} />
              Compile & Export Document
            </button>
          )}

          {status === 'running' && (
            <div className={styles.progressContainer}>
              <div className={styles.progressHeader}>
                <span className={styles.progressStatus}>
                  <RefreshCw className={styles.spin} size={14} />
                  {statusMsg}
                </span>
                <span className={styles.progressPercent}>{progress}%</span>
              </div>
              <div className={styles.progressTrack}>
                <div className={styles.progressBar} style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          {status === 'success' && (
            <div className={styles.successBlock}>
              <CheckCircle2 size={16} className={styles.successIcon} />
              <span>{statusMsg}</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
