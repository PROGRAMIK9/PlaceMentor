import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  Trash2,
  Clock,
  Bot,
  Mic,
  ArrowUp,
  MessageCircle,
  X,
  Heart,
  Smile,
  Wind,
  Info
} from 'lucide-react';
import './ai-assistant.css';

const studyQuickPrompts = [
  'Review my resume',
  'DSA questions',
  'HR interview tips',
  'Explain OOP',
  'Study plan'
];

const wellbeingQuickPrompts = [
  'Placement stress 🥺',
  'Exam anxiety 📚',
  'Just want to vent 💬',
  'Need motivation ✨',
  'Breathing exercise 💨'
];

const moodOptions = [
  { emoji: '😰', label: 'Anxious', val: 'anxious' },
  { emoji: '🥺', label: 'Overwhelmed', val: 'overwhelmed' },
  { emoji: '🥱', label: 'Exhausted', val: 'exhausted' },
  { emoji: '😐', label: 'Neutral', val: 'neutral' },
  { emoji: '🌸', label: 'Hopeful', val: 'hopeful' }
];

const studyInitialMessages = [
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

const wellbeingInitialMessages = [
  {
    id: 1,
    type: 'bot',
    text: "Hi Arjun! 🌸 I'm MindMentor, your private wellbeing space. Placement prep and college life can be tough and stressful. I'm here to listen, help you navigate your feelings, and share stress-relief techniques. Everything we discuss is confidential.\n\nHow are you feeling right now?",
    time: '10:30 AM',
    isWellbeingStart: true
  }
];

const studyHistory = [
  { id: 1, title: 'Resume Review Session', time: 'Yesterday' },
  { id: 2, title: 'DSA Concepts', time: '2 days ago' },
  { id: 3, title: 'HR Interview Practice', time: '3 days ago' }
];

const wellbeingHistory = [
  { id: 1, title: 'Dealing with Placement Stress', time: 'Yesterday' },
  { id: 2, title: 'Exam Anxiety Check-in', time: '3 days ago' },
  { id: 3, title: 'Late Night Vent Session', time: '5 days ago' }
];

function getMockReply(text, mode) {
  const query = text.toLowerCase().trim();
  
  if (mode === 'wellbeing') {
    if (query.includes('stress') || query.includes('pressure') || query.includes('overwhelm') || query.includes('overwhelmed')) {
      return "Placement and study pressure can feel overwhelming. 🥺 Remember that you are more than your grades or placement offers. Let's do a quick breathing exercise: close your eyes, take a deep breath in... hold for 4 seconds... and let it out. Doing this 3 times can really help ground you. Shall we try?";
    }
    if (query.includes('anxious') || query.includes('anxiety') || query.includes('scared') || query.includes('nervous')) {
      return "It's completely natural to feel nervous. Anxiety is just our body trying to keep us safe, but sometimes it overreacts. Try focusing on the physical space around you: name 3 things you can touch, and 2 things you can hear. This 5-4-3-2-1 technique works wonders! 🌸";
    }
    if (query.includes('vent') || query.includes('sad') || query.includes('feeling bad') || query.includes('cry') || query.includes('feelings')) {
      return "I'm right here to listen. Go ahead and let it all out. What's been happening? No judgment here, this is your private space. 💬";
    }
    if (query.includes('motivation') || query.includes('inspire') || query.includes('lazy') || query.includes('give up') || query.includes('boost')) {
      return "Hey, be kind to yourself! 🌟 Progress isn't a straight line. Every small step you take is a win, even if it's just getting out of bed or reviewing one single concept. You have got this. Let's take a deep breath and start fresh with a simple task. What's one tiny thing we can do?";
    }
    if (query.includes('tired') || query.includes('sleep') || query.includes('exhausted') || query.includes('burnout')) {
      return "You cannot pour from an empty cup! 😴 If you're feeling exhausted, studying further will have diminishing returns. I suggest setting a strict cutoff time for studies tonight, drinking a warm glass of water, and resting. Your health comes first.";
    }
    if (query.includes('fail') || query.includes('reject') || query.includes('worst')) {
      return "Rejection is just redirection to something that fits you better. It feels incredibly painful right now, and that's okay to feel. But please know this is temporary and doesn't define your abilities or future success. Take today to rest, we can try again tomorrow. ❤️";
    }
    if (query.includes('breath') || query.includes('exercise')) {
      return "Let's try a simple box breathing exercise. 💨\n\n1. Inhale slowly for 4 seconds.\n2. Hold your breath for 4 seconds.\n3. Exhale completely for 4 seconds.\n4. Pause and hold for 4 seconds.\n\nRepeat this 3 times. Focus only on the air flowing in and out of your body. Let me know if you feel a bit calmer.";
    }
    if (query.includes('thank') || query.includes('thanks') || query.includes('good') || query.includes('happy')) {
      return "You're so welcome! I'm really glad I could support you. Remember to take things one step at a time. What else is on your mind? 😊";
    }
    return "Thank you for sharing that with me. It takes courage to put your feelings into words. 🌿 Remember to take a break if you need it. What else is on your mind?";
  } else {
    // Study Mode
    if (query.includes('resume') || query.includes('cv')) {
      return "To make your resume stand out, use action verbs and quantify your results (e.g., 'Optimized query speeds by 40%'). Also, keep it to a clean 1-page layout. Try out our Resume Builder screen to create a template! 📄";
    }
    if (query.includes('dsa') || query.includes('leet') || query.includes('algorithm') || query.includes('structure')) {
      return "For Data Structures & Algorithms, master Arrays, Linked Lists, Stacks, Queues, then move to Trees, Graphs, and DP. Focus on understanding patterns rather than memorizing code. Let me know if you want a sample practice question! 💻";
    }
    if (query.includes('hr') || query.includes('interview') || query.includes('behavioral')) {
      return "In HR interviews, companies look for communication skills, adaptability, and cultural fit. Try using the STAR method (Situation, Task, Action, Result) to answer behavioral questions. Want to practice a mock HR question? 🎯";
    }
    if (query.includes('oop') || query.includes('object oriented')) {
      return "OOP is based on four main pillars: Encapsulation (hiding data), Inheritance (reusing code), Polymorphism (multiple forms), and Abstraction (hiding complexity). Let me know if you want a simple code example! 🏗️";
    }
    if (query.includes('plan') || query.includes('schedule') || query.includes('study')) {
      return "A great prep plan balances learning new concepts with practicing coding and mock interviews. Try dedicating 2 hours a day to coding, 1 hour to core subjects, and 30 minutes to aptitude. You can track this in our Roadmap module! 📅";
    }
    if (query.includes('thank') || query.includes('thanks')) {
      return "Happy to help! Let me know if you have any other study or prep questions. Good luck! 🚀";
    }
    return "That's a solid study topic. I suggest breaking it down into smaller sub-topics and practicing a few problems. Let me know if you want me to explain a specific concept or quiz you on it! 🎓";
  }
}

function renderMessageContent(message) {
  if (message.text) {
    return <p style={{ whiteSpace: 'pre-line' }}>{message.text}</p>;
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
  const location = useLocation();
  const chatEndRef = useRef(null);
  
  const [botMode, setBotMode] = useState('study'); // 'study' | 'wellbeing'
  const [inputValue, setInputValue] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  // Separate states for study and wellbeing chat messages
  const [studyMessages, setStudyMessages] = useState(studyInitialMessages);
  const [wellbeingMessages, setWellbeingMessages] = useState(wellbeingInitialMessages);
  
  // State for user's selected wellbeing mood
  const [selectedMood, setSelectedMood] = useState(null);

  // Set mode based on URL query param
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const mode = query.get('mode');
    if (mode === 'wellbeing') {
      setBotMode('wellbeing');
    } else {
      setBotMode('study');
    }
  }, [location]);

  // Scroll to bottom on message lists or mode change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [studyMessages, wellbeingMessages, isTyping, botMode]);

  const handleSend = (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = {
      id: Date.now(),
      type: 'user',
      text: text,
      time: timeNow
    };

    if (botMode === 'study') {
      setStudyMessages(prev => [...prev, userMsg]);
    } else {
      setWellbeingMessages(prev => [...prev, userMsg]);
    }

    if (!textToSend) {
      setInputValue('');
    }
    
    setIsTyping(true);

    // Simulate bot reply
    setTimeout(() => {
      setIsTyping(false);
      const botResponseText = getMockReply(text, botMode);
      const botMsg = {
        id: Date.now() + 1,
        type: 'bot',
        text: botResponseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      if (botMode === 'study') {
        setStudyMessages(prev => [...prev, botMsg]);
      } else {
        setWellbeingMessages(prev => [...prev, botMsg]);
      }
    }, 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood.val);
    
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = {
      id: Date.now(),
      type: 'user',
      text: `I'm feeling ${mood.label} ${mood.emoji}`,
      time: timeNow
    };
    
    setWellbeingMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      let replyText = "";
      switch (mood.val) {
        case 'anxious':
          replyText = "I hear you. Placement and study anxiety can feel heavy. 🥺 Let's take a slow breath together. Inhale... hold it... and exhale. Would you like to do a quick 3-2-1 grounding exercise, or just talk about what's causing the anxiety?";
          break;
        case 'overwhelmed':
          replyText = "It is completely valid to feel overwhelmed when balancing classes, projects, and interviews. 🌸 Let's try breaking things down. We can outline one simple, tiny task for today, or you can just vent to me. What sounds better?";
          break;
        case 'exhausted':
          replyText = "It sounds like you've been working extremely hard, Arjun. 😴 Running on empty makes everything feel harder. Please remember to rest. Can we discuss how to structure a proper break, or would you like a quick relaxation technique?";
          break;
        case 'neutral':
          replyText = "Neutral is a good place to be. 😐 How was your day? Is there anything you'd like to talk through, or just vent about?";
          break;
        case 'hopeful':
          replyText = "I'm so glad to hear that! 🌟 Hope is a wonderful driver. What's making you feel hopeful today? I'd love to hear about it.";
          break;
        default:
          replyText = "Thank you for sharing how you feel. I'm here to support you. What is on your mind today?";
      }
      
      const botMsg = {
        id: Date.now() + 1,
        type: 'bot',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setWellbeingMessages(prev => [...prev, botMsg]);
    }, 1200);
  };

  const handleClearChat = () => {
    if (botMode === 'study') {
      setStudyMessages([]);
    } else {
      setWellbeingMessages([]);
      setSelectedMood(null);
    }
  };

  const activeMessages = botMode === 'study' ? studyMessages : wellbeingMessages;
  const quickPrompts = botMode === 'study' ? studyQuickPrompts : wellbeingQuickPrompts;
  const activeHistory = botMode === 'study' ? studyHistory : wellbeingHistory;

  return (
    <section className={`ai-assistant ${botMode}`}>
      {/* Header */}
      <header className="ai-header">
        <div className="ai-header-left">
          <button className="ai-header-back" onClick={() => navigate('/home')} aria-label="Go back">
            <ArrowLeft size={20} />
          </button>
          <div className="ai-header-title">
            {botMode === 'study' ? (
              <>
                <h1>AI Assistant</h1>
                <Sparkles size={18} className="sparkle-icon" />
              </>
            ) : (
              <>
                <h1>MindMentor</h1>
                <Heart size={18} className="heart-icon" />
              </>
            )}
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
          <button className="ai-header-btn" onClick={handleClearChat} aria-label="Clear chat">
            <Trash2 size={19} />
          </button>
        </div>
      </header>

      {/* Segmented Mode Selector Tabs */}
      <div className="ai-mode-tabs-container">
        <div className="ai-mode-tabs">
          <button 
            className={`ai-mode-tab ${botMode === 'study' ? 'active' : ''}`}
            onClick={() => setBotMode('study')}
          >
            <Sparkles size={15} />
            <span>Study Guide</span>
          </button>
          <button 
            className={`ai-mode-tab ${botMode === 'wellbeing' ? 'active' : ''}`}
            onClick={() => setBotMode('wellbeing')}
          >
            <Heart size={15} />
            <span>MindMentor</span>
          </button>
        </div>
      </div>

      {/* Disclaimer Banner for Wellbeing Mode */}
      {botMode === 'wellbeing' && (
        <div className="ai-wellbeing-disclaimer">
          <Info size={13} className="disclaimer-info-icon" />
          <span>MindMentor is an AI peer supporter. It's private, but not a replacement for therapy.</span>
        </div>
      )}

      {/* Quick Prompts */}
      <div className="ai-quick-prompts">
        {quickPrompts.map((prompt) => (
          <button key={prompt} className="ai-prompt-chip" onClick={() => handleSend(prompt)}>
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Area */}
      <div className="ai-chat-area">
        {activeMessages.length === 0 ? (
          <div className="ai-empty-chat">
            {botMode === 'study' ? (
              <>
                <Bot size={48} className="empty-chat-icon" />
                <p>Chat cleared. Ask me any study or placement prep questions!</p>
              </>
            ) : (
              <>
                <Smile size={48} className="empty-chat-icon" />
                <p>MindMentor is listening. Tell me how you're feeling today.</p>
              </>
            )}
          </div>
        ) : (
          activeMessages.map((msg) => (
            <div key={msg.id} className={`ai-message ${msg.type}`}>
              {msg.type === 'bot' && (
                <div className="ai-message-avatar">
                  {botMode === 'study' ? <Bot size={16} /> : <Heart size={16} />}
                </div>
              )}
              <div className="ai-message-bubble-wrapper">
                <div className="ai-message-bubble">
                  {renderMessageContent(msg)}
                  
                  {/* Wellbeing Mood Selector */}
                  {msg.isWellbeingStart && !selectedMood && (
                    <div className="ai-mood-picker">
                      <p className="ai-mood-picker-title">Select your current mood:</p>
                      <div className="ai-mood-options">
                        {moodOptions.map((mood) => (
                          <button
                            key={mood.val}
                            className="ai-mood-btn"
                            onClick={() => handleMoodSelect(mood)}
                          >
                            <span className="ai-mood-emoji">{mood.emoji}</span>
                            <span className="ai-mood-label">{mood.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="ai-message-time">{msg.time}</div>
              </div>
            </div>
          ))
        )}
        {isTyping && (
          <div className="ai-message bot">
            <div className="ai-message-avatar">
              {botMode === 'study' ? <Bot size={16} /> : <Heart size={16} />}
            </div>
            <div className="ai-message-bubble-wrapper">
              <div className="ai-message-bubble typing-bubble">
                <div className="ai-typing-indicator">
                  <span className="ai-typing-dot"></span>
                  <span className="ai-typing-dot"></span>
                  <span className="ai-typing-dot"></span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="ai-input-area">
        <div className="ai-input-wrapper">
          <input
            type="text"
            className="ai-input-field"
            placeholder={botMode === 'study' ? "Ask me a study question..." : "Talk to me about your feelings..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
          />
          <div className="ai-input-actions">
            <button className="ai-mic-btn" aria-label="Voice input" disabled={isTyping}>
              <Mic size={18} />
            </button>
            <button className="ai-send-btn" onClick={() => handleSend()} aria-label="Send message" disabled={isTyping || !inputValue.trim()}>
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
            <div className="ai-history-header-row">
              <div className="ai-history-title">Chat History ({botMode === 'study' ? 'Study' : 'MindMentor'})</div>
              <button className="ai-history-close-btn" onClick={() => setShowHistory(false)} aria-label="Close history">
                <X size={18} />
              </button>
            </div>
            <div className="ai-history-list">
              {activeHistory.map((item) => (
                <div key={item.id} className="ai-history-item" onClick={() => setShowHistory(false)}>
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
