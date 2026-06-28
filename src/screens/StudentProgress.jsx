import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layers,
  Target,
  Flame,
  Users,
  Play,
  CheckCircle2,
  FileText,
  ArrowLeft,
  Clock,
  BookOpen,
  Mic,
} from 'lucide-react';
import './student-progress.css';

const timeFilters = ['This Week', 'This Month', 'All Time'];

const weeklyData = [
  { day: 'Mon', hours: 3.5, max: 5 },
  { day: 'Tue', hours: 2, max: 5 },
  { day: 'Wed', hours: 4.5, max: 5 },
  { day: 'Thu', hours: 1.5, max: 5 },
  { day: 'Fri', hours: 5, max: 5 },
  { day: 'Sat', hours: 3, max: 5 },
  { day: 'Sun', hours: 0.5, max: 5 },
];

const skills = [
  'JavaScript',
  'Python',
  'SQL',
  'Arrays',
  'Trees',
  'OS Concepts',
  'Networking',
  'React',
  'Git',
  'Resume Writing',
];

const recentActivity = [
  { text: 'Completed DSA Week 2 tasks', time: '2h ago', icon: CheckCircle2 },
  { text: 'Attended mentor session', time: 'Yesterday', icon: Users },
  { text: 'Solved 5 aptitude questions', time: '2 days ago', icon: BookOpen },
  { text: 'Uploaded resume draft', time: '3 days ago', icon: FileText },
];

export default function StudentProgress() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('This Week');

  // Circular progress for modules
  const modulesCompleted = 3;
  const modulesTotal = 8;
  const modulesPercent = Math.round((modulesCompleted / modulesTotal) * 100);
  const circumference = 2 * Math.PI * 22;
  const moduleOffset = circumference - (modulesPercent / 100) * circumference;

  return (
    <div className="sp-screen">
      {/* Header */}
      <header className="sp-header">
        <div className="sp-header-left">
          <button className="sp-back-btn" onClick={() => navigate(-1)} aria-label="Go back">
            <ArrowLeft size={22} />
          </button>
          <h1 className="sp-title">My Progress</h1>
        </div>
        <div className="sp-time-filters">
          {timeFilters.map((f) => (
            <button
              key={f}
              className={`sp-time-filter ${activeFilter === f ? 'sp-time-filter-active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      {/* Stats Grid */}
      <section className="sp-stats-grid">
        {/* Modules Completed */}
        <div className="sp-stat-card sp-stat-card-modules" style={{ animationDelay: '0s' }}>
          <div className="sp-stat-top">
            <div className="sp-stat-icon sp-stat-icon-primary">
              <Layers size={18} />
            </div>
            <div className="sp-stat-mini-ring">
              <svg viewBox="0 0 52 52" className="sp-mini-ring-svg">
                <circle cx="26" cy="26" r="22" strokeWidth="5" fill="none" className="sp-mini-ring-bg" />
                <circle
                  cx="26"
                  cy="26"
                  r="22"
                  strokeWidth="5"
                  fill="none"
                  className="sp-mini-ring-fill"
                  strokeDasharray={circumference}
                  strokeDashoffset={moduleOffset}
                  strokeLinecap="round"
                />
              </svg>
              <span className="sp-mini-ring-text">{modulesPercent}%</span>
            </div>
          </div>
          <span className="sp-stat-value">{modulesCompleted}/{modulesTotal}</span>
          <span className="sp-stat-label">Modules Completed</span>
        </div>

        {/* Weekly Goals */}
        <div className="sp-stat-card sp-stat-card-goals" style={{ animationDelay: '0.08s' }}>
          <div className="sp-stat-top">
            <div className="sp-stat-icon sp-stat-icon-accent">
              <Target size={18} />
            </div>
          </div>
          <span className="sp-stat-value">12/16</span>
          <span className="sp-stat-label">Weekly Goals</span>
          <div className="sp-stat-bar">
            <div className="sp-stat-bar-fill sp-bar-accent" style={{ width: '75%' }} />
          </div>
        </div>

        {/* Streak */}
        <div className="sp-stat-card sp-stat-card-streak" style={{ animationDelay: '0.16s' }}>
          <div className="sp-stat-top">
            <div className="sp-stat-icon sp-stat-icon-fire">
              <Flame size={18} />
            </div>
          </div>
          <span className="sp-stat-value">
            <span className="sp-fire-emoji">🔥</span> 14
          </span>
          <span className="sp-stat-label">Day Streak</span>
        </div>

        {/* Sessions */}
        <div className="sp-stat-card sp-stat-card-sessions" style={{ animationDelay: '0.24s' }}>
          <div className="sp-stat-top">
            <div className="sp-stat-icon sp-stat-icon-success">
              <Users size={18} />
            </div>
          </div>
          <span className="sp-stat-value">8/10</span>
          <span className="sp-stat-label">Sessions Attended</span>
          <div className="sp-stat-bar">
            <div className="sp-stat-bar-fill sp-bar-success" style={{ width: '80%' }} />
          </div>
        </div>
      </section>

      {/* Weekly Goals Chart */}
      <section className="sp-section sp-weekly-chart-section" style={{ animationDelay: '0.3s' }}>
        <h2 className="sp-section-title">Weekly Study Hours</h2>
        <div className="sp-weekly-chart">
          {weeklyData.map((d, idx) => (
            <div key={d.day} className="sp-chart-col">
              <div className="sp-chart-bar-wrapper">
                <div
                  className="sp-chart-bar"
                  style={{
                    height: `${(d.hours / d.max) * 100}%`,
                    animationDelay: `${0.4 + idx * 0.08}s`,
                  }}
                >
                  <span className="sp-chart-bar-value">{d.hours}h</span>
                </div>
              </div>
              <span className="sp-chart-day">{d.day}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Progress Timeline */}
      <section className="sp-section sp-progress-timeline" style={{ animationDelay: '0.4s' }}>
        <h2 className="sp-section-title">Progress Overview</h2>
        <div className="sp-timeline-items">
          <div className="sp-timeline-item">
            <div className="sp-timeline-item-top">
              <div className="sp-timeline-item-left">
                <CheckCircle2 size={16} className="sp-tl-icon-primary" />
                <span>Assignments Submitted</span>
              </div>
              <span className="sp-timeline-item-value">15/18</span>
            </div>
            <div className="sp-tl-bar">
              <div className="sp-tl-bar-fill sp-tl-fill-primary" style={{ width: '83%' }} />
            </div>
          </div>

          <div className="sp-timeline-item">
            <div className="sp-timeline-item-top">
              <div className="sp-timeline-item-left">
                <Mic size={16} className="sp-tl-icon-accent" />
                <span>Mock Interviews</span>
              </div>
              <span className="sp-timeline-item-value">2/5</span>
            </div>
            <div className="sp-tl-bar">
              <div className="sp-tl-bar-fill sp-tl-fill-accent" style={{ width: '40%' }} />
            </div>
          </div>

          <div className="sp-timeline-item">
            <div className="sp-timeline-item-top">
              <div className="sp-timeline-item-left">
                <FileText size={16} className="sp-tl-icon-warning" />
                <span>Resume Status</span>
              </div>
              <span className="sp-tl-chip sp-chip-warning">Draft Ready</span>
            </div>
          </div>

          <div className="sp-timeline-item">
            <div className="sp-timeline-item-top">
              <div className="sp-timeline-item-left">
                <Play size={16} className="sp-tl-icon-success" />
                <span>Videos Watched</span>
              </div>
              <span className="sp-timeline-item-value sp-value-highlight">24</span>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Learned */}
      <section className="sp-section sp-skills-section" style={{ animationDelay: '0.5s' }}>
        <h2 className="sp-section-title">Skills Learned</h2>
        <div className="sp-skills-cloud">
          {skills.map((skill, idx) => (
            <span
              key={skill}
              className="sp-skill-tag"
              style={{ animationDelay: `${0.55 + idx * 0.04}s` }}
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="sp-section sp-activity-section" style={{ animationDelay: '0.6s' }}>
        <h2 className="sp-section-title">Learning Activity</h2>
        <div className="sp-activity-list">
          {recentActivity.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="sp-activity-item"
                style={{ animationDelay: `${0.65 + idx * 0.07}s` }}
              >
                <div className="sp-activity-icon">
                  <Icon size={16} />
                </div>
                <div className="sp-activity-info">
                  <span className="sp-activity-text">{item.text}</span>
                  <span className="sp-activity-time">
                    <Clock size={12} /> {item.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
