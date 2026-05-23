'use client';

import { Bot, Sparkles } from 'lucide-react';
import ChatInterface from '@/components/assistant/ChatInterface';
import { chatMessages } from '@/lib/mockData';
import styles from './page.module.css';

export default function AssistantPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.titleWrap}>
          <Bot size={24} className={styles.iconBot} />
          <h2 className={styles.title}>Colide AI Intelligence</h2>
        </div>
        <p className={styles.subtitle}>
          Ask questions about your business, detect anomalies, or get actionable insights based on real-time data.
        </p>
      </div>

      <div className={styles.chatWrapper}>
        <ChatInterface initialMessages={chatMessages} />
      </div>

      <div className={styles.infoFooter}>
        <Sparkles size={14} className={styles.iconSparkle} />
        <span>AI-powered insights are generated from live branch data and may take a few seconds.</span>
      </div>
    </div>
  );
}
