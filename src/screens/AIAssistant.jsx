import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  Trash2,
  Clock,
  Bot,
  Mic,
  ArrowUp,
  MessageCircle,
  X
} from 'lucide-react';
import './ai-assistant.css';

const quickPrompts = [
  'Review my resume',
  'DSA questions',
  'HR interview tips',
  'Explain OOP',
  'Study plan'
];

const chatMessages = [
  {
    id: 1,
    type: 'bot',
    text: "Hi Arjun! 👋 I'm your AI study assistant. I can help with resume reviews, interview prep, concept explanations, and more. What would you like to work on today?",
    time: '10:30 AM'
  },
  {
    id: 2,
    type: 'user',
    text: 'Can you give me some common HR interview questions?',
    time: '10:31 AM'
  },
  {
    id: 3,
    type: 'bot',
    parts: [
      { text: 'Here are some frequently asked HR questions:' },
      { heading: '1. Tell me about yourself', text: 'Start with your education, mention 1-2 projects, and your career goals.' },
      { heading: '2. Why should we hire you?', text: 'Highlight your skills, projects, and enthusiasm for learning.' },
      { heading: '3. Where do you see yourself in 5 years?', text: 'Focus on growth within the company and skill development.' },
      { text: 'Want me to do a mock HR round? 🎯' }
    ],
    time: '10:31 AM'
  },
  {
    id: 4,
    type: 'user',
    text: "Yes, let's practice!",
    time: '10:32 AM'
  },
  {
    id: 5,
    type: 'bot',
    parts: [
      { text: "Great! Let's begin. 🎤" },
      { italic: 'Imagine you\'re in an interview room. The interviewer smiles and says:' },
      { heading: 'Tell me about yourself.' },
      { text: 'Take your time and respond naturally!' }
    ],
    time: '10:32 AM'
  }
];

const chatHistory = [
  { id: 1, title: 'Resume Review Session', time: 'Yesterday' },
  { id: 2, title: 'DSA Concepts', time: '2 days ago' },
  { id: 3, title: 'HR Interview Practice', time: '3 days ago' }
];

function renderMessageContent(message) {
  if (message.text) {
    return <p>{message.text}</p>;
  }

  if (message.parts) {
    return message.parts.map((part, idx) => {
      if (part.heading && part.text) {
        return (
          <p key={idx}>
            <strong>{part.heading}</strong>
            <br />
            {part.text}
          </p>
        );
      }
      if (part.heading) {
        return <p key={idx}><strong>{part.heading}</strong></p>;
      }
      if (part.italic) {
        return <p key={idx}><em>{part.italic}</em></p>;
      }
      return <p key={idx}>{part.text}</p>;
    });
  }

  return null;
}

export default function AIAssistant() {
  const navigate = useNavigate();
  const chatEndRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleSend = () => {
    if (inputValue.trim()) {
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section className="ai-assistant">
      {/* Header */}
      <header className="ai-header">
        <div className="ai-header-left">
          <button className="ai-header-back" onClick={() => navigate(-1)} aria-label="Go back">
            <ArrowLeft size={20} />
          </button>
          <div className="ai-header-title">
            <h1>AI Assistant</h1>
            <Sparkles size={18} className="sparkle-icon" />
          </div>
        </div>
        <div className="ai-header-right">
          <button
            className="ai-header-btn"
            onClick={() => setShowHistory(true)}
            aria-label="Chat history"
          >
            <Clock size={19} />
          </button>
          <button className="ai-header-btn" aria-label="Clear chat">
            <Trash2 size={19} />
          </button>
        </div>
      </header>

      {/* Quick Prompts */}
      <div className="ai-quick-prompts">
        {quickPrompts.map((prompt) => (
          <button key={prompt} className="ai-prompt-chip">
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Area */}
      <div className="ai-chat-area">
        {chatMessages.map((msg) => (
          <div key={msg.id} className={`ai-message ${msg.type}`}>
            {msg.type === 'bot' && (
              <div className="ai-message-avatar">
                <Bot size={16} />
              </div>
            )}
            <div>
              <div className="ai-message-bubble">
                {renderMessageContent(msg)}
              </div>
              <div className="ai-message-time">{msg.time}</div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="ai-input-area">
        <div className="ai-input-wrapper">
          <input
            type="text"
            className="ai-input-field"
            placeholder="Ask me anything..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="ai-input-actions">
            <button className="ai-mic-btn" aria-label="Voice input">
              <Mic size={18} />
            </button>
            <button className="ai-send-btn" onClick={handleSend} aria-label="Send message">
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Chat History Bottom Sheet */}
      {showHistory && (
        <div className="bottom-sheet-overlay" onClick={() => setShowHistory(false)}>
          <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="bottom-sheet-handle" />
            <div className="ai-history-title">Chat History</div>
            <div className="ai-history-list">
              {chatHistory.map((item) => (
                <div key={item.id} className="ai-history-item">
                  <div className="ai-history-icon">
                    <MessageCircle size={18} />
                  </div>
                  <div className="ai-history-info">
                    <h4>{item.title}</h4>
                    <span>{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
