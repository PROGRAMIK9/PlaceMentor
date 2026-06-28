import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Calculator,
  Code,
  BookOpen,
  FolderOpen,
  MessageSquare,
  Mic,
  Building,
  Filter,
  Lock,
  ChevronRight,
} from 'lucide-react';
import './roadmap.css';

const modules = [
  {
    id: 'resume-building',
    name: 'Resume Building',
    description: 'Build an ATS-friendly resume',
    icon: FileText,
    progress: 85,
    status: 'In Progress',
    color: '#6C5CE7',
  },
  {
    id: 'aptitude',
    name: 'Aptitude',
    description: 'Quantitative & logical reasoning',
    icon: Calculator,
    progress: 40,
    status: 'In Progress',
    color: '#00CEC9',
  },
  {
    id: 'dsa',
    name: 'DSA',
    description: 'Data structures & algorithms',
    icon: Code,
    progress: 65,
    status: 'In Progress',
    color: '#FF7675',
  },
  {
    id: 'core-subjects',
    name: 'Core Subjects',
    description: 'OS, DBMS, CN, OOP fundamentals',
    icon: BookOpen,
    progress: 30,
    status: 'In Progress',
    color: '#FDCB6E',
  },
  {
    id: 'projects',
    name: 'Projects',
    description: 'Build portfolio projects',
    icon: FolderOpen,
    progress: 50,
    status: 'In Progress',
    color: '#00B894',
  },
  {
    id: 'communication-skills',
    name: 'Communication Skills',
    description: 'Verbal & written communication',
    icon: MessageSquare,
    progress: 20,
    status: 'Upcoming',
    color: '#A29BFE',
  },
  {
    id: 'mock-interviews',
    name: 'Mock Interviews',
    description: 'Practice with AI & peers',
    icon: Mic,
    progress: 0,
    status: 'Locked',
    color: '#636E72',
  },
  {
    id: 'company-preparation',
    name: 'Company Preparation',
    description: 'Company-specific prep',
    icon: Building,
    progress: 0,
    status: 'Locked',
    color: '#636E72',
  },
];

const statusClass = (status) => {
  switch (status) {
    case 'Completed':
      return 'chip-completed';
    case 'In Progress':
      return 'chip-inprogress';
    case 'Upcoming':
      return 'chip-upcoming';
    case 'Locked':
      return 'chip-locked';
    default:
      return '';
  }
};

export default function Roadmap() {
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);

  const overallProgress = 45;
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (overallProgress / 100) * circumference;

  return (
    <div className="roadmap-screen">
      {/* Header */}
      <header className="roadmap-header">
        <h1 className="roadmap-title">Semester Roadmap</h1>
        <button
          className="roadmap-filter-btn"
          onClick={() => setFilterOpen(!filterOpen)}
          aria-label="Filter"
        >
          <Filter size={20} />
        </button>
      </header>

      {/* Overall Progress */}
      <section className="roadmap-overall">
        <div className="roadmap-progress-ring-wrapper">
          <svg className="roadmap-progress-ring" viewBox="0 0 120 120">
            <defs>
              <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="var(--accent)" />
              </linearGradient>
            </defs>
            <circle
              className="roadmap-progress-ring__bg"
              cx="60"
              cy="60"
              r="54"
              strokeWidth="10"
              fill="none"
            />
            <circle
              className="roadmap-progress-ring__fill"
              cx="60"
              cy="60"
              r="54"
              strokeWidth="10"
              fill="none"
              stroke="url(#progressGrad)"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="roadmap-progress-ring__text">
            <span className="roadmap-progress-ring__value">{overallProgress}%</span>
            <span className="roadmap-progress-ring__label">Complete</span>
          </div>
        </div>
        <div className="roadmap-semester-info">
          <span className="roadmap-semester-badge">Semester 6</span>
          <p className="roadmap-semester-desc">
            You're making great progress! Keep up the momentum.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="roadmap-timeline">
        <h2 className="roadmap-section-title">Your Modules</h2>
        <div className="roadmap-timeline-list">
          {modules.map((mod, idx) => {
            const Icon = mod.icon;
            const isLocked = mod.status === 'Locked';
            return (
              <div
                key={mod.id}
                className={`roadmap-module-card ${isLocked ? 'roadmap-module-locked' : ''} ${
                  idx % 2 === 0 ? 'roadmap-module-even' : 'roadmap-module-odd'
                }`}
                style={{ animationDelay: `${idx * 0.07}s` }}
                onClick={() => !isLocked && navigate(`/roadmap/${mod.id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && !isLocked && navigate(`/roadmap/${mod.id}`)}
              >
                {/* Timeline connector */}
                <div className="roadmap-timeline-connector">
                  <div
                    className="roadmap-timeline-icon-circle"
                    style={{ background: isLocked ? 'var(--surface-alt)' : mod.color }}
                  >
                    {isLocked ? (
                      <Lock size={18} color="var(--text-tertiary)" />
                    ) : (
                      <Icon size={18} color="#fff" />
                    )}
                  </div>
                  {idx < modules.length - 1 && <div className="roadmap-timeline-line" />}
                </div>

                {/* Card content */}
                <div className="roadmap-module-content">
                  <div className="roadmap-module-top">
                    <div>
                      <h3 className="roadmap-module-name">{mod.name}</h3>
                      <p className="roadmap-module-desc">{mod.description}</p>
                    </div>
                    <ChevronRight size={18} className="roadmap-module-arrow" />
                  </div>

                  <div className="roadmap-module-bottom">
                    <div className="roadmap-module-progress-wrap">
                      <div className="roadmap-module-progress-bar">
                        <div
                          className="roadmap-module-progress-fill"
                          style={{
                            width: `${mod.progress}%`,
                            background: isLocked
                              ? 'var(--text-tertiary)'
                              : `linear-gradient(90deg, ${mod.color}, ${mod.color}88)`,
                          }}
                        />
                      </div>
                      <span className="roadmap-module-progress-pct">{mod.progress}%</span>
                    </div>
                    <span className={`roadmap-status-chip ${statusClass(mod.status)}`}>
                      {mod.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
