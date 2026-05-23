'use client';

import { useState } from 'react';
import { Settings, Shield, Bell, Save, Sparkles, Building2, Sliders, Volume2, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import styles from './page.module.css';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'notifications'>('general');
  const [anomalyThreshold, setAnomalyThreshold] = useState<number>(75);
  const [refundLimit, setRefundLimit] = useState<number>(10000);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2000);
  };

  const tabs = [
    { id: 'general' as const, label: 'General Configuration', icon: <Settings size={16} /> },
    { id: 'security' as const, label: 'Security & ML Rules', icon: <Shield size={16} /> },
    { id: 'notifications' as const, label: 'Alert Channels', icon: <Bell size={16} /> },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Sidebar Tabs */}
        <div className={styles.sidebar}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={cn(
                styles.tabBtn,
                activeTab === tab.id && styles.activeTabBtn
              )}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Settings Form Pane */}
        <form onSubmit={handleSave} className={styles.contentPane}>
          {activeTab === 'general' && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <Sliders size={18} className={styles.titleIcon} />
                General System Parameters
              </h3>
              <p className={styles.sectionDesc}>Manage localized organization settings and display options</p>
              
              <div className={styles.field}>
                <label className={styles.label}>Corporate Identity / Company Name</label>
                <input type="text" className={styles.input} defaultValue="Colide Retail Pvt Ltd" />
              </div>

              <div className={styles.row}>
                <div className={styles.col}>
                  <label className={styles.label}>Default Currency Format</label>
                  <select className={styles.input} defaultValue="INR">
                    <option value="INR">Indian Rupee (₹)</option>
                    <option value="USD">US Dollar ($)</option>
                    <option value="EUR">Euro (€)</option>
                  </select>
                </div>
                <div className={styles.col}>
                  <label className={styles.label}>Financial Year Start</label>
                  <select className={styles.input} defaultValue="April">
                    <option value="April">April 1st (India FY)</option>
                    <option value="January">January 1st (Calendar Year)</option>
                  </select>
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Display Theme Mode</label>
                <div className={styles.toggleRowClient}>
                  <div className={styles.themeBadge}>
                    <Moon size={14} />
                    <span>OLED Dark Mode (Default)</span>
                  </div>
                  <span className={styles.helperText}>Optimized for retail dashboards & eye comfort</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <Shield size={18} className={styles.titleIcon} />
                Security & Machine Learning Rules
              </h3>
              <p className={styles.sectionDesc}>Adjust sensitivity thresholds for billing scanner and refund auditing models</p>

              <div className={styles.field}>
                <div className={styles.sliderHeader}>
                  <label className={styles.label}>AI Anomaly Confidence Filter</label>
                  <span className={styles.sliderVal}>{anomalyThreshold}%</span>
                </div>
                <p className={styles.fieldHelper}>
                  Alerts with a risk confidence below this value will be automatically silenced.
                </p>
                <input
                  type="range"
                  min="50"
                  max="95"
                  step="5"
                  value={anomalyThreshold}
                  onChange={(e) => setAnomalyThreshold(Number(e.target.value))}
                  className={styles.slider}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Maximum Refund Limit (Standard Salesperson)</label>
                <p className={styles.fieldHelper}>
                  Manual refunds exceeding this value require a manager credentials bypass override.
                </p>
                <div className={styles.currencyInputWrapper}>
                  <span className={styles.currencyPrefix}>₹</span>
                  <input
                    type="number"
                    value={refundLimit}
                    onChange={(e) => setRefundLimit(Number(e.target.value))}
                    className={styles.inputWithPrefix}
                  />
                </div>
              </div>

              <div className={styles.checkboxField}>
                <input type="checkbox" id="gpsVerification" defaultChecked className={styles.checkbox} />
                <div className={styles.checkboxLabelBlock}>
                  <label htmlFor="gpsVerification" className={styles.checkboxLabel}>GPS Coordinate Distance Check</label>
                  <span className={styles.checkboxHelper}>
                    Flag attendance clock-ins occurring &gt; 500m away from the physical branch location.
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <Bell size={18} className={styles.titleIcon} />
                Alert Channels & Notification Webhooks
              </h3>
              <p className={styles.sectionDesc}>Configure how critical security cash mismatches are routed to executives</p>

              <div className={styles.notificationGroup}>
                <div className={styles.notificationItem}>
                  <div className={styles.toggleWrapper}>
                    <input type="checkbox" id="emailAlerts" defaultChecked className={styles.checkboxSwitch} />
                    <label htmlFor="emailAlerts" className={styles.switchLabel}></label>
                  </div>
                  <div>
                    <label className={styles.notificationLabel}>Email Reports</label>
                    <p className={styles.notificationSubtext}>Send weekly consolidated performance reports to the CEO and owners</p>
                  </div>
                </div>

                <div className={styles.notificationItem}>
                  <div className={styles.toggleWrapper}>
                    <input type="checkbox" id="slackAlerts" defaultChecked className={styles.checkboxSwitch} />
                    <label htmlFor="slackAlerts" className={styles.switchLabel}></label>
                  </div>
                  <div>
                    <label className={styles.notificationLabel}>Slack / Microsoft Teams webhook alerts</label>
                    <p className={styles.notificationSubtext}>Instantly broadcast critical cash shortages to executive group chats</p>
                  </div>
                </div>

                <div className={styles.notificationItem}>
                  <div className={styles.toggleWrapper}>
                    <input type="checkbox" id="smsAlerts" className={styles.checkboxSwitch} />
                    <label htmlFor="smsAlerts" className={styles.switchLabel}></label>
                  </div>
                  <div>
                    <label className={styles.notificationLabel}>SMS emergency backup alerts</label>
                    <p className={styles.notificationSubtext}>Send direct standard messaging alerts to branch managers for offline outages</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className={styles.footer}>
            <button type="submit" className={styles.saveBtn}>
              <Save size={16} />
              Save Configuration
            </button>
            
            {saveSuccess && (
              <span className={styles.successText}>
                <Sparkles size={14} />
                Settings updated!
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
