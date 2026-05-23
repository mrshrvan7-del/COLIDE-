'use client';

import { Sparkles, TrendingDown, Package, Users } from 'lucide-react';
import styles from './PromptChips.module.css';

interface PromptChipsProps {
  onSelectPrompt: (prompt: string) => void;
}

export default function PromptChips({ onSelectPrompt }: PromptChipsProps) {
  const prompts = [
    { icon: <TrendingDown size={14} />, text: 'Which branch has the lowest sales today?' },
    { icon: <Package size={14} />, text: 'Show me all out-of-stock items.' },
    { icon: <Users size={14} />, text: 'Who is the top salesperson this month?' },
    { icon: <Sparkles size={14} />, text: 'Analyze cash mismatch at Metro branch.' },
  ];

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Suggested:</span>
      <div className={styles.chipsContainer}>
        {prompts.map((prompt, idx) => (
          <button key={idx} className={styles.chip} onClick={() => onSelectPrompt(prompt.text)}>
            {prompt.icon}
            {prompt.text}
          </button>
        ))}
      </div>
    </div>
  );
}
