import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import './onboarding.css';

const slides = [
  {
    emoji: '🤝',
    floats: ['💬', '⭐'],
    title: 'Meet Your Mentor',
    description:
      'Get paired with experienced seniors who guide you throughout the semester with weekly sessions and personalized advice.',
  },
  {
    emoji: '📚',
    floats: ['📝', '🎯'],
    title: 'Learn & Grow Together',
    description:
      'Access curated resources, practice interviews, build your resume, and track your progress — all in one place.',
  },
  {
    emoji: '🚀',
    floats: ['💡', '🏆'],
    title: 'Ace Your Placements',
    description:
      'From aptitude to coding rounds, prepare confidently with AI assistance, mock interviews, and peer support.',
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [exiting, setExiting] = useState(false);

  const goNext = () => {
    if (current === slides.length - 1) {
      navigate('/login');
      return;
    }
    setExiting(true);
    setTimeout(() => {
      setCurrent((prev) => prev + 1);
      setExiting(false);
    }, 300);
  };

  const isLast = current === slides.length - 1;

  return (
    <section className="onboarding">
      {/* Skip */}
      {!isLast && (
        <button className="onboarding-skip" onClick={() => navigate('/login')}>
          Skip
        </button>
      )}

      {/* Slides */}
      <div className="onboarding-slides">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`onboarding-slide ${idx === current ? (exiting ? 'exiting' : 'active') : ''}`}
          >
            <div className="onboarding-illustration">
              <div className="onboarding-illustration-inner">
                <span className="onboarding-emoji" role="img" aria-label={slide.title}>
                  {slide.emoji}
                </span>
              </div>
              {/* Floating decorative icons */}
              {slide.floats.map((f, i) => (
                <span key={i} className="onboarding-float-icon" role="img" aria-hidden="true">
                  {f}
                </span>
              ))}
            </div>
            <h2 className="onboarding-title">{slide.title}</h2>
            <p className="onboarding-description">{slide.description}</p>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="onboarding-controls">
        <div className="onboarding-dots">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`onboarding-dot ${idx === current ? 'active' : ''}`}
            />
          ))}
        </div>

        <button className="onboarding-btn" onClick={goNext}>
          {isLast ? 'Get Started' : 'Next'}
          {isLast ? (
            <ArrowRight size={20} className="btn-icon-arrow" />
          ) : (
            <ChevronRight size={20} className="btn-icon-arrow" />
          )}
        </button>
      </div>
    </section>
  );
}
