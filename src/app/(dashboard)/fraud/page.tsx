'use client';

import { useState } from 'react';
import { Shield, AlertTriangle, AlertOctagon, Info, Check, Eye, X, ArrowUpRight, ShieldAlert, Sparkles, ChevronRight, Activity } from 'lucide-react';
import { mockAnomalies } from '@/lib/mockData';
import { Anomaly, AlertSeverity } from '@/lib/types';
import { cn } from '@/lib/utils';
import styles from './page.module.css';

export default function FraudDetectionPage() {
  const [anomalies, setAnomalies] = useState<Anomaly[]>(mockAnomalies);
  const [selectedAnomalyId, setSelectedAnomalyId] = useState<string>(mockAnomalies[0]?.id || '');

  const selectedAnomaly = anomalies.find((a) => a.id === selectedAnomalyId);

  const getSeverityIcon = (severity: AlertSeverity) => {
    if (severity === 'critical') return <AlertOctagon className={styles.critIcon} size={18} />;
    if (severity === 'danger') return <ShieldAlert className={styles.dangerIcon} size={18} />;
    return <AlertTriangle className={styles.warningIcon} size={18} />;
  };

  const getSeverityBadgeClass = (severity: AlertSeverity) => {
    if (severity === 'critical') return styles.sevCritical;
    if (severity === 'danger') return styles.sevDanger;
    return styles.sevWarning;
  };

  const getStatusBadgeClass = (status: Anomaly['status']) => {
    if (status === 'detected') return styles.statusDetected;
    if (status === 'investigating') return styles.statusInvestigating;
    if (status === 'confirmed') return styles.statusConfirmed;
    if (status === 'resolved') return styles.statusResolved;
    return styles.statusFalseAlarm;
  };

  const handleUpdateStatus = (id: string, newStatus: Anomaly['status']) => {
    setAnomalies((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  // Compute metrics
  const activeCases = anomalies.filter((a) => a.status === 'detected' || a.status === 'investigating').length;
  const criticalCases = anomalies.filter((a) => a.severity === 'critical' && (a.status === 'detected' || a.status === 'investigating')).length;
  const averageRisk = Math.round(anomalies.reduce((sum, a) => sum + a.riskScore, 0) / anomalies.length);

  return (
    <div className={styles.page}>
      {/* Risk Metrics */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricTitle}>Overall Risk Index</span>
            <div className={styles.metricIconWrapper} style={{ background: 'rgba(239, 68, 68, 0.08)', color: '#ef4444' }}>
              <ShieldAlert size={20} />
            </div>
          </div>
          <div className={styles.valueRow}>
            <span className={styles.metricValue}>{averageRisk}%</span>
            <span className={cn(styles.trendBadge, styles.high)}>HIGH RISK</span>
          </div>
          <span className={styles.metricSubtext}>Calculated across active anomalies</span>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricTitle}>Active Investigations</span>
            <div className={styles.metricIconWrapper} style={{ background: 'rgba(99, 102, 241, 0.08)', color: '#6366f1' }}>
              <Activity size={20} />
            </div>
          </div>
          <div className={styles.valueRow}>
            <span className={styles.metricValue}>{activeCases}</span>
            <span className={cn(styles.trendBadge, styles.neutral)}>OPEN CASES</span>
          </div>
          <span className={styles.metricSubtext}>Requires immediate intervention</span>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricTitle}>Critical Discrepancies</span>
            <div className={styles.metricIconWrapper} style={{ background: 'rgba(245, 158, 11, 0.08)', color: '#f59e0b' }}>
              <AlertOctagon size={20} />
            </div>
          </div>
          <div className={styles.valueRow}>
            <span className={styles.metricValue}>{criticalCases}</span>
            <span className={cn(styles.trendBadge, styles.critAlert)}>CRITICAL</span>
          </div>
          <span className={styles.metricSubtext}>Refund or cash anomalies &gt; ₹10k</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className={styles.contentGrid}>
        {/* Left Side: Timeline / Table */}
        <div className={styles.listSection}>
          <div className={styles.listHeader}>
            <h3 className={styles.sectionTitle}>Real-time Anomaly Stream</h3>
            <p className={styles.sectionSubtitle}>ML-audited transaction mismatches and policy violations</p>
          </div>

          <div className={styles.anomalyList}>
            {anomalies.map((a) => (
              <div
                key={a.id}
                className={cn(
                  styles.anomalyItem,
                  selectedAnomalyId === a.id && styles.activeAnomalyItem
                )}
                onClick={() => setSelectedAnomalyId(a.id)}
              >
                <div className={styles.anomalyItemHeader}>
                  <div className={styles.anomalyTypeBlock}>
                    {getSeverityIcon(a.severity)}
                    <span className={styles.anomalyTitle}>{a.title}</span>
                  </div>
                  <span className={cn(styles.statusBadge, getStatusBadgeClass(a.status))}>
                    {a.status.replace('_', ' ')}
                  </span>
                </div>

                <div className={styles.anomalyMeta}>
                  <span>Branch: <strong>{a.branchName}</strong></span>
                  {a.employeeName && <span>• Staff: <strong>{a.employeeName}</strong></span>}
                </div>

                <p className={styles.anomalyDesc}>{a.description}</p>

                <div className={styles.anomalyFooter}>
                  <span className={styles.detectedTime}>
                    Detected: {new Date(a.detectedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <div className={styles.riskScorePill}>
                    Risk score: <strong style={{ color: a.riskScore > 80 ? '#ef4444' : '#f59e0b' }}>{a.riskScore}%</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Details / Resolution Control */}
        <div className={styles.detailsSection}>
          {selectedAnomaly ? (
            <div className={styles.detailsCard}>
              <div className={styles.detailsHeader}>
                <div>
                  <span className={cn(styles.severityBadge, getSeverityBadgeClass(selectedAnomaly.severity))}>
                    {selectedAnomaly.severity.toUpperCase()}
                  </span>
                  <h4 className={styles.detailsTitle}>{selectedAnomaly.title}</h4>
                  <p className={styles.detailsSubtitle}>Case ID: {selectedAnomaly.id}</p>
                </div>
                <div className={styles.gaugeContainer}>
                  <div className={styles.gaugeBackground}>
                    <div
                      className={styles.gaugeFill}
                      style={{
                        transform: `rotate(${(selectedAnomaly.riskScore / 100) * 180 - 90}deg)`,
                        borderColor: selectedAnomaly.riskScore > 80 ? '#ef4444' : '#f59e0b',
                      }}
                    />
                    <div className={styles.gaugeLabel}>
                      <span className={styles.gaugeValue}>{selectedAnomaly.riskScore}%</span>
                      <span className={styles.gaugeText}>Risk Score</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.divider} />

              <div className={styles.detailBlock}>
                <h5 className={styles.blockTitle}>Audit Narrative</h5>
                <p className={styles.blockText}>{selectedAnomaly.description}</p>
              </div>

              <div className={styles.detailBlock}>
                <h5 className={styles.blockTitle}>Audit Evidence & Supporting Data</h5>
                <ul className={styles.evidenceList}>
                  {selectedAnomaly.evidence.map((ev, i) => (
                    <li key={i} className={styles.evidenceItem}>
                      <ChevronRight size={14} className={styles.evidenceBullet} />
                      <span>{ev}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.divider} />

              {/* Action Controls */}
              <div className={styles.actionBlock}>
                <h5 className={styles.blockTitle}>Resolution Workflow</h5>
                <p className={styles.blockSubtext}>Acknowledge investigation state or mark reconciliation status</p>
                
                {selectedAnomaly.status !== 'resolved' && selectedAnomaly.status !== 'confirmed' ? (
                  <div className={styles.actionButtons}>
                    {selectedAnomaly.status === 'detected' && (
                      <button
                        className={styles.btnInvestigate}
                        onClick={() => handleUpdateStatus(selectedAnomaly.id, 'investigating')}
                      >
                        <Eye size={14} />
                        Investigate Case
                      </button>
                    )}
                    
                    <button
                      className={styles.btnConfirm}
                      onClick={() => handleUpdateStatus(selectedAnomaly.id, 'confirmed')}
                    >
                      <Check size={14} />
                      Confirm Fraud
                    </button>

                    <button
                      className={styles.btnFalseAlarm}
                      onClick={() => handleUpdateStatus(selectedAnomaly.id, 'false_alarm')}
                    >
                      <X size={14} />
                      False Alarm
                    </button>

                    <button
                      className={styles.btnResolve}
                      onClick={() => handleUpdateStatus(selectedAnomaly.id, 'resolved')}
                    >
                      <Check size={14} />
                      Reconcile Case
                    </button>
                  </div>
                ) : (
                  <div className={styles.completedAlert}>
                    <Check className={styles.completedIcon} size={18} />
                    <div>
                      <div className={styles.completedTitle}>
                        Case Marked as {selectedAnomaly.status.toUpperCase()}
                      </div>
                      <p className={styles.completedText}>
                        This audit log is archived. The security logs have been updated.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className={styles.selectPrompt}>
              <Shield size={48} className={styles.promptIcon} />
              <p>Select an anomaly from the stream to investigate evidence.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
