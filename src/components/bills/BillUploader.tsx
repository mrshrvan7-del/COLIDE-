'use client';

import { UploadCloud, FileText, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import styles from './BillUploader.module.css';

export default function BillUploader() {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    simulateUpload();
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      // In a real app, this would trigger the verification pane with the uploaded image
      alert('Bill uploaded successfully! Moving to verification...');
    }, 1500);
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>
        <FileText size={18} className={styles.iconAccent} />
        Scan New Bill
      </h3>
      <p className={styles.subtitle}>Upload physical receipts or digital invoices for AI extraction.</p>

      <div 
        className={`${styles.dropzone} ${isDragging ? styles.dragging : ''} ${isUploading ? styles.uploading : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={simulateUpload}
      >
        {isUploading ? (
          <div className={styles.uploadState}>
            <div className={styles.spinner} />
            <p>Scanning document...</p>
          </div>
        ) : (
          <div className={styles.idleState}>
            <div className={styles.iconWrap}>
              <UploadCloud size={32} />
            </div>
            <p className={styles.mainText}>Drag & drop bill here</p>
            <p className={styles.subText}>or click to browse files (JPEG, PNG, PDF)</p>
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.featureItem}>
          <CheckCircle size={14} className={styles.checkIcon} /> Auto-extract Vendor & GST
        </div>
        <div className={styles.featureItem}>
          <CheckCircle size={14} className={styles.checkIcon} /> Detect Duplicates
        </div>
        <div className={styles.featureItem}>
          <CheckCircle size={14} className={styles.checkIcon} /> Map Line Items
        </div>
      </div>
    </div>
  );
}
