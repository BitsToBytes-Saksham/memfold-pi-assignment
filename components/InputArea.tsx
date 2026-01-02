"use client";

import React, { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

type Props = {
  onSend: (text: string) => void | Promise<void>;
  disabled?: boolean;
};

export default function InputArea({ onSend, disabled }: Props) {
  const [value, setValue] = useState("");
  const taRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 192)}px`;
  }, [value]);

  const handleSend = async () => {
    const text = value.trim();
    if (!text || disabled) return;
    setValue("");
    await onSend(text);
    if (taRef.current) {
      taRef.current.style.height = "auto";
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isActive = value.trim().length > 0;

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        padding: '24px',
        pointerEvents: 'none'
      }}
    >
      {/* Background gradient */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '150px',
          background: 'linear-gradient(to top, #F3F0E7, #F3F0E7, transparent)',
          zIndex: -1
        }}
      />

      {/* Input container */}
      <div 
        style={{
          maxWidth: '724px',
          width: '100%',
          margin: '0 auto',
          backgroundColor: 'white',
          borderRadius: '9999px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          border: '1px solid #d4cfc0ff',
          padding: '12px 32px',
          display: 'flex',
          alignItems: 'flex-end',
          gap: '16px',
          pointerEvents: 'auto'
        }}
      >
        <textarea
          ref={taRef}
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Talk to Pi..."
          disabled={disabled}
          style={{
            flex: 1,
            maxHeight: '190px',
            minHeight: '28px',
            padding: '2px 0',
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            resize: 'none',
            color: '#0D3C26',
            fontSize: '20px',
            lineHeight: '1.6',
            fontFamily: 'inherit'
          }}
        />

        <button
          onClick={handleSend}
          disabled={disabled || !isActive}
          aria-label="Send message"
          style={{
            padding: '10px',
            borderRadius: '9999px',
            marginBottom: '2px',
            border: 'none',
            cursor: isActive ? 'pointer' : 'not-allowed',
            backgroundColor: isActive ? '#0D3C26' : '#f3f4f6',
            color: isActive ? 'white' : '#9ca3af',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            if (isActive) e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <Send size={24} />
        </button>
      </div>
    </div>
  );
}