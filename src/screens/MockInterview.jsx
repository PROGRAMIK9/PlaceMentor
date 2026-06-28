import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Code,
  Users,
  Calculator,
  Terminal,
  ChevronRight,
  Clock,
  Star,
  MessageSquare,
  RotateCcw,
  Eye,
  Square,
} from 'lucide-react';
import './mock-interview.css';

const interviewTypes = [
  {
    id: 'technical',
    title: 'Technical',
    desc: 'DSA, System Design, Core CS',
    Icon: Code,
    gradient: 'var(--gradient-primary)',
    shadow: 'var(--shadow-primary)',
  },
  {
    id: 'hr',
    title: 'HR',
    desc: 'Behavioral, Situational',
    Icon: Users,
    gradient: 'var(--gradient-accent)',
    shadow: 'var(--shadow-accent)',
  },
  {
    id: 'aptitude',
    title: 'Aptitude',
    desc: 'Quant, Logical, Verbal',
    Icon: Calculator,
    gradient: 'var(--gradient-warm)',
    shadow: '0 4px 20px rgba(253, 121, 168, 0.25)',
  },
  {
    id: 'coding',
    title: 'Coding',
    desc: 'Live coding challenges',
    Icon: Terminal,
    gradient: 'var(--gradient-cool)',
    shadow: '0 4px 20px rgba(116, 185, 255, 0.25)',
  },
];

const recentPractice = [
  {
    title: 'Technical - Arrays & Strings',
    result: 'Score: 7/10',
    time: '2 days ago',
    color: 'var(--primary)',
  },
  {
    title: 'HR - Tell me about yourself',
    result: 'AI Feedback: Good',
    time: 'Yesterday',
    color: 'var(--accent)',
  },
  {
    title: 'Aptitude - Set 3',
    result: '85%',
    time: '3 days ago',
    color: '#FD79A8',
  },
];

const feedbackData = {
  clarity: 8,
  content: 7,
  confidence: 9,
  suggestion:
    'Try to include more specific examples and data structures comparisons.',
};

function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}

export default function MockInterview() {
  const navigate = useNavigate();
  const [view, setView] = useState('setup'); // 'setup' | 'interview' | 'feedback'
  const [selectedType, setSelectedType] = useState(null);
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (view === 'interview') {
      setTimer(0);
      intervalRef.current = setInterval(() => {
        setTimer((t) => t + 1);
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [view]);

  const handleStartInterview = (type) => {
    setSelectedType(type);
    setView('interview');
  };

  const handleEndInterview = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setView('feedback');
  };

  const handlePracticeAgain = () => {
    setView('setup');
    setSelectedType(null);
    setTimer(0);
  };

  /* -------- INTERVIEW VIEW -------- */
  if (view === 'interview') {
    return (
      <div className="page mi-page">
        <header className="page-header">
          <button className="btn btn-icon btn-ghost" onClick={handleEndInterview}>
            <ArrowLeft size={20} />
          </button>
          <h1>{selectedType?.title} Interview</h1>
          <div className="mi-timer-badge">
            <Clock size={14} />
            <span>{formatTime(timer)}</span>
          </div>
        </header>

        <div className="mi-interview-panel">
          <div className="mi-question-card card-glass">
            <span className="chip chip-outline" style={{ marginBottom: 12 }}>
              Question 1
            </span>
            <h2 className="mi-question-text">
              Explain the difference between Stack and Queue with real-world
              examples.
            </h2>
          </div>

          <div className="mi-recording-section">
            <div className="mi-recording-indicator">
              <span className="mi-rec-dot" />
              <span className="mi-rec-label">Recording...</span>
            </div>
            <p className="mi-ai-listening">
              <MessageSquare size={16} />
              AI is listening...
            </p>
          </div>

          <div className="mi-waveform">
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={i}
                className="mi-wave-bar"
                style={{ animationDelay: `${i * 0.05}s` }}
              />
            ))}
          </div>

          <button
            className="btn btn-primary btn-lg btn-full mi-end-btn"
            onClick={handleEndInterview}
          >
            <Square size={18} />
            End Interview
          </button>
        </div>
      </div>
    );
  }

  /* -------- FEEDBACK VIEW -------- */
  if (view === 'feedback') {
    return (
      <div className="page mi-page">
        <header className="page-header">
          <button className="btn btn-icon btn-ghost" onClick={handlePracticeAgain}>
            <ArrowLeft size={20} />
          </button>
          <h1>AI Feedback</h1>
          <div style={{ width: 40 }} />
        </header>

        <div className="mi-feedback-panel">
          <div className="mi-feedback-hero card-gradient">
            <div className="mi-feedback-hero-content">
              <span style={{ fontSize: '2.5rem' }}>🎯</span>
              <div>
                <h2>Great Attempt!</h2>
                <p>Here's your performance analysis</p>
              </div>
            </div>
          </div>

          <div className="mi-score-cards">
            {[
              { label: 'Clarity', score: feedbackData.clarity, color: 'var(--primary)' },
              { label: 'Content', score: feedbackData.content, color: 'var(--accent)' },
              { label: 'Confidence', score: feedbackData.confidence, color: 'var(--success)' },
            ].map((item) => (
              <div key={item.label} className="mi-score-item">
                <div className="mi-score-item-header">
                  <span className="mi-score-label">{item.label}</span>
                  <span className="mi-score-value" style={{ color: item.color }}>
                    {item.score}/10
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${item.score * 10}%`,
                      background: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mi-suggestion card">
            <h3>💡 Suggestion</h3>
            <p>{feedbackData.suggestion}</p>
          </div>

          <div className="mi-feedback-actions">
            <button
              className="btn btn-primary btn-lg mi-fb-btn"
              onClick={handlePracticeAgain}
            >
              <RotateCcw size={18} />
              Practice Again
            </button>
            <button className="btn btn-outline btn-lg mi-fb-btn">
              <Eye size={18} />
              View All Feedback
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* -------- SETUP VIEW (default) -------- */
  return (
    <div className="page mi-page">
      <header className="page-header">
        <button className="btn btn-icon btn-ghost" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1>Mock Interview</h1>
        <div style={{ width: 40 }} />
      </header>

      {/* Hero */}
      <section className="mi-hero card-gradient">
        <div className="mi-hero-content">
          <span className="mi-hero-emoji">🎤</span>
          <h2>Practice makes perfect</h2>
          <p>Choose your interview type to begin</p>
        </div>
      </section>

      {/* Interview Type Cards */}
      <section className="section">
        <h3 className="section-title">Interview Types</h3>
        <div className="mi-types-grid">
          {interviewTypes.map((type, idx) => {
            const { Icon } = type;
            return (
              <button
                key={type.id}
                className={`mi-type-card stagger-${idx + 1}`}
                style={{ '--card-gradient': type.gradient, '--card-shadow': type.shadow }}
                onClick={() => handleStartInterview(type)}
              >
                <div className="mi-type-icon-wrap">
                  <Icon size={22} />
                </div>
                <h4>{type.title}</h4>
                <p>{type.desc}</p>
                <ChevronRight size={16} className="mi-type-arrow" />
              </button>
            );
          })}
        </div>
      </section>

      {/* Recent Practice */}
      <section className="section">
        <div className="section-header">
          <h3 className="section-title">Recent Practice</h3>
          <span className="section-link">View All</span>
        </div>
        <div className="mi-recent-list">
          {recentPractice.map((item, idx) => (
            <div
              key={idx}
              className={`mi-recent-item card stagger-${idx + 5}`}
            >
              <div
                className="mi-recent-dot"
                style={{ background: item.color }}
              />
              <div className="mi-recent-info">
                <h4>{item.title}</h4>
                <span className="mi-recent-result">{item.result}</span>
              </div>
              <span className="mi-recent-time">
                <Clock size={12} />
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
