'use client';

import { ChevronDown, ChevronRight, User, CheckCircle, Clock } from 'lucide-react';
import { useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import type { IncentiveEligibility, Employee, Branch } from '@/lib/types';
import styles from './EligibilityTracker.module.css';

interface EligibilityTrackerProps {
  eligibilities: IncentiveEligibility[];
  employees: Employee[];
  branches: Branch[];
}

export default function EligibilityTracker({ eligibilities, employees, branches }: EligibilityTrackerProps) {
  const [expandedBranches, setExpandedBranches] = useState<Record<string, boolean>>({
    'br-001': true,
    'br-002': true,
  });

  const toggleBranch = (id: string) => {
    setExpandedBranches(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Group by branch
  const managers = employees.filter(e => e.role === 'manager');
  
  const totalProjectedPayout = eligibilities
    .filter(e => e.isEligible)
    .reduce((sum, e) => sum + e.estimatedAmount, 0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>Chain of Command View: Incentive Eligibility</h3>
        <div className={styles.payoutSummary}>
          <span className={styles.payoutLabel}>Total Projected Payout:</span>
          <span className={styles.payoutValue}>{formatCurrency(totalProjectedPayout)}</span>
        </div>
      </div>

      <div className={styles.hierarchyList}>
        {branches.map(branch => {
          const branchManager = managers.find(m => m.branchId === branch.id);
          const branchEmployees = employees.filter(e => e.branchId === branch.id && e.role === 'salesperson');
          const isExpanded = expandedBranches[branch.id];
          
          if (branchEmployees.length === 0) return null;

          return (
            <div key={branch.id} className={styles.branchGroup}>
              <div 
                className={styles.managerRow} 
                onClick={() => toggleBranch(branch.id)}
              >
                <div className={styles.managerInfo}>
                  {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  <div className={styles.managerAvatar}>
                    <User size={14} />
                  </div>
                  <div className={styles.managerDetails}>
                    <span className={styles.managerName}>{branchManager?.name || 'No Manager'}</span>
                    <span className={styles.managerRole}>Manager • {branch.name}</span>
                  </div>
                </div>
                <div className={styles.branchStats}>
                  {branchEmployees.length} Salespersons
                </div>
              </div>

              {isExpanded && (
                <div className={styles.employeeList}>
                  {branchEmployees.map(emp => {
                    const empEligibilities = eligibilities.filter(el => el.employeeId === emp.id);
                    
                    return (
                      <div key={emp.id} className={styles.employeeCard}>
                        <div className={styles.empHeader}>
                          <span className={styles.empName}>{emp.name}</span>
                          <span className={styles.empLevel}>{emp.level}</span>
                        </div>
                        
                        {empEligibilities.length > 0 ? (
                          <div className={styles.eligibilityList}>
                            {empEligibilities.map((elig, idx) => {
                              const percent = Math.min(100, (elig.currentProgress / elig.targetProgress) * 100);
                              return (
                                <div key={idx} className={styles.eligRow}>
                                  <div className={styles.eligDetails}>
                                    <span className={styles.schemeName}>{elig.schemeName}</span>
                                    {elig.isEligible ? (
                                      <span className={styles.statusEligible}><CheckCircle size={12}/> Eligible: {formatCurrency(elig.estimatedAmount)}</span>
                                    ) : (
                                      <span className={styles.statusPending}><Clock size={12}/> {percent.toFixed(0)}% Complete</span>
                                    )}
                                  </div>
                                  <div className={styles.progressContainer}>
                                    <div className={styles.progressBar}>
                                      <div 
                                        className={styles.progressFill} 
                                        style={{ width: `${percent}%`, background: elig.isEligible ? '#10b981' : '#3b82f6' }} 
                                      />
                                    </div>
                                    <span className={styles.progressText}>
                                      {elig.currentProgress} / {elig.targetProgress}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className={styles.noData}>No active incentive progress.</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
