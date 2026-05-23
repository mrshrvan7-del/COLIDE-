'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, CheckCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import PromptChips from './PromptChips';
import type { ChatMessage } from '@/lib/types';
import styles from './ChatInterface.module.css';

interface ChatInterfaceProps {
  initialMessages: ChatMessage[];
}

export default function ChatInterface({ initialMessages }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: "I've analyzed that request. Here's a brief summary: Everything looks perfectly fine based on the latest data dump. Let me know if you need deeper analytics!",
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleAction = (msgId: string) => {
    alert(`Action executed for message ${msgId}!`);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.chatContainer}>
        {messages.map(msg => (
          <div key={msg.id} className={`${styles.messageWrapper} ${msg.role === 'user' ? styles.wrapperUser : styles.wrapperAi}`}>
            <div className={styles.avatar}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={18} />}
            </div>
            
            <div className={`${styles.messageBubble} ${msg.role === 'user' ? styles.bubbleUser : styles.bubbleAi}`}>
              <div className={styles.markdownContent}>
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
              
              {msg.isActionable && (
                <div className={styles.actionWrap}>
                  <button className={styles.btnAction} onClick={() => handleAction(msg.id)}>
                    <CheckCircle size={14} /> Execute Recommended Action
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className={`${styles.messageWrapper} ${styles.wrapperAi}`}>
            <div className={styles.avatar}><Bot size={18} /></div>
            <div className={`${styles.messageBubble} ${styles.bubbleAi} ${styles.typingIndicator}`}>
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputSection}>
        <PromptChips onSelectPrompt={(text) => handleSend(text)} />
        
        <form 
          className={styles.inputForm}
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
        >
          <input
            type="text"
            className={styles.inputField}
            placeholder="Ask anything about Colide's data..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className={styles.btnSend} disabled={!input.trim() || isTyping}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
