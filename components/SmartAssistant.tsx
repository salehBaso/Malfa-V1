
import React, { useState, useEffect, useRef } from 'react';
import { generateAssistantResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, Bot, User, Sparkles, X } from 'lucide-react';
import { useLanguage } from '../App';

interface SmartAssistantProps {
  onClose?: () => void;
}

const SmartAssistant: React.FC<SmartAssistantProps> = ({ onClose }) => {
  const { t, language, dir } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message when language changes or first load
  useEffect(() => {
    setMessages([
      { role: 'model', text: t('assistWelcome'), timestamp: new Date() }
    ]);
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: inputText, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    // Format history for the service
    const history = messages.map(m => ({ role: m.role, text: m.text }));
    
    try {
      const responseText = await generateAssistantResponse(history, userMsg.text, language);
      const botMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
      setMessages(prev => [...prev, botMsg]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: language === 'ar' ? "حدث خطأ" : "Error occurred", timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-xl shadow-lg border border-brand-beige/30 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-primary to-brand-mauve p-4 flex items-center justify-between shadow-md z-10">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg leading-none">{t('assistTitle')}</h2>
            <p className="text-brand-beige text-xs mt-1">{t('poweredBy')}</p>
          </div>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-1"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-bg scrollbar-hide">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[85%] gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1
                ${msg.role === 'user' ? 'bg-brand-beige' : 'bg-brand-primary/10'}`}>
                {msg.role === 'user' ? <User className="w-5 h-5 text-brand-dark" /> : <Bot className="w-5 h-5 text-brand-primary" />}
              </div>
              
              <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm
                ${msg.role === 'user' 
                  ? `bg-brand-dark text-white ${dir === 'rtl' ? 'rounded-tl-none' : 'rounded-tr-none'}` 
                  : `bg-white text-slate-700 border border-brand-beige/20 ${dir === 'rtl' ? 'rounded-tr-none' : 'rounded-tl-none'}`}`}>
                {msg.text.split('\n').map((line, i) => (
                  <p key={i} className="mb-1 last:mb-0">{line}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start w-full">
             <div className={`flex gap-2 max-w-[70%] bg-white p-4 rounded-2xl border border-brand-beige/20 shadow-sm items-center ${dir === 'rtl' ? 'rounded-tr-none' : 'rounded-tl-none'}`}>
                <Bot className="w-5 h-5 text-brand-primary animate-pulse" />
                <span className="text-xs text-slate-400">{t('thinking')}</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-brand-beige/30">
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            className="flex-1 bg-brand-bg border-0 rounded-full px-5 py-3 text-slate-700 text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
            placeholder={t('typePlaceholder')}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !inputText.trim()}
            className={`bg-brand-primary hover:bg-brand-dark disabled:bg-slate-300 text-white p-3 rounded-full transition-colors shadow-sm ${dir === 'rtl' ? 'rotate-180' : ''}`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-center text-[10px] text-slate-400 mt-2">
          {t('disclaimer')}
        </p>
      </div>
    </div>
  );
};

export default SmartAssistant;
