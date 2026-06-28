import { useNavigate } from 'react-router-dom';
import {
  Bell,
  Clock,
  Video,
  BookOpen,
  MessageCircle,
  Bot,
  Map,
  Mic,
  Building,
  FileText,
  PlayCircle,
  StickyNote,
  ChevronRight,
  Megaphone,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './student-home.css';

/* ---- Helpers ---- */
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
}

/* ---- Static Data ---- */
const weeklyGoals = [
  { id: 1, title: 'Complete DSA Module 3', pct: 60, variant: 'primary' },
  { id: 2, title: 'Submit Resume Draft', pct: 0, variant: 'warm' },
  { id: 3, title: 'Practice Aptitude', pct: 40, variant: 'accent' },
  { id: 4, title: 'Watch Core Subjects Video', pct: 100, variant: 'success' },
];

const quickActions = [
  { label: 'Continue Learning', icon: BookOpen, variant: 'primary', route: '/roadmap' },
  { label: 'Chat with Mentor', icon: MessageCircle, variant: 'accent', route: '/community' },
  { label: 'Ask AI Assistant', icon: Bot, variant: 'cool', route: '/ai-assistant' },
  { label: 'View Roadmap', icon: Map, variant: 'success', route: '/roadmap' },
  { label: 'Practice Interview', icon: Mic, variant: 'warm', route: '/mock-interview' },
  { label: 'Company Prep', icon: Building, variant: 'info', route: '/company-prep' },
];

const progressItems = [
  { label: 'DSA', pct: 65, variant: 'primary' },
  { label: 'Aptitude', pct: 40, variant: 'accent' },
  { label: 'Core Subjects', pct: 30, variant: 'warm' },
  { label: 'Communication', pct: 20, variant: 'cool' },
];

const resources = [
  {
    id: 1,
    title: 'Top 50 DSA Questions',
    type: 'PDF',
    typeKey: 'pdf',
    by: 'Priya Sharma',
    ago: '2h ago',
  },
  {
    id: 2,
    title: 'System Design Basics',
    type: 'Video',
    typeKey: 'video',
    by: 'Rahul Kumar',
    ago: '1d ago',
  },
  {
    id: 3,
    title: 'Aptitude Shortcuts',
    type: 'Notes',
    typeKey: 'notes',
    by: 'Priya Sharma',
    ago: '2d ago',
  },
];

const placementDrives = [
  { id: 1, company: 'TCS', date: 'Dec 15', pkg: '₹7 LPA', chip: 'Eligible', chipClass: 'chip-success' },
  { id: 2, company: 'Infosys', date: 'Dec 20', pkg: '₹6.5 LPA', chip: 'Apply by Dec 10', chipClass: 'chip-warning' },
  { id: 3, company: 'Google', date: 'Jan 5', pkg: '₹25 LPA', chip: 'Preparing', chipClass: 'chip' },
];

const announcements = [
  { id: 1, text: 'Mock interview schedule released for December', time: '3h ago' },
  { id: 2, text: 'Resume submission deadline extended to Dec 12', time: '1d ago' },
];

const resourceIcons = {
  pdf: FileText,
  video: PlayCircle,
  notes: StickyNote,
};

/* ---- Component ---- */
export default function StudentHome() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'Arjun';

  return (
    <div className="student-home">
      {/* -------- Header -------- */}
      <header className="sh-header">
        <div className="sh-header__left">
          <h1>{getGreeting()}, {firstName} 👋</h1>
          <p>Let's crush your goals today!</p>
        </div>
        <button
          className="sh-header__bell"
          onClick={() => navigate('/notifications')}
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="badge">3</span>
        </button>
      </header>

      {/* -------- Upcoming Session -------- */}
      <section className="sh-section sh-section--delay-1">
        <div className="sh-session-card">
          <p className="sh-session__label">Upcoming Session</p>

          <div className="sh-session__mentor">
            <div className="sh-session__avatar">PS</div>
            <div className="sh-session__mentor-info">
              <h3>Priya Sharma</h3>
              <p>Resume Review &amp; Career Goals</p>
            </div>
          </div>

          <div className="sh-session__bottom">
            <span className="sh-session__time">
              <Clock size={14} />
              Today, 4:00 PM
            </span>
            <button className="sh-session__join-btn" onClick={() => navigate('/calendar')}>
              <Video size={14} />
              Join Session
            </button>
          </div>
        </div>
      </section>

      {/* -------- This Week's Goals -------- */}
      <section className="sh-section sh-section--delay-2">
        <div className="sh-section__header">
          <h2 className="sh-section__title">This Week's Goals</h2>
          <span className="sh-section__link" onClick={() => navigate('/progress')}>See All</span>
        </div>

        <div className="sh-goals-scroll">
          {weeklyGoals.map((goal) => {
            const isDone = goal.pct === 100;
            const notStarted = goal.pct === 0;
            let statusText = `${goal.pct}% done`;
            let statusClass = 'sh-goal-card__status--progress';
            if (isDone) { statusText = 'Done ✓'; statusClass = 'sh-goal-card__status--done'; }
            if (notStarted) { statusText = 'Not started'; statusClass = 'sh-goal-card__status--not-started'; }

            return (
              <div key={goal.id} className="sh-goal-card">
                <p className="sh-goal-card__title">{goal.title}</p>
                <p className={`sh-goal-card__status ${statusClass}`}>{statusText}</p>
                <div className="sh-goal-card__bar">
                  <div
                    className={`sh-goal-card__bar-fill sh-goal-card__bar-fill--${goal.variant}`}
                    style={{ width: `${goal.pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* -------- Quick Actions -------- */}
      <section className="sh-section sh-section--delay-3">
        <div className="sh-section__header">
          <h2 className="sh-section__title">Quick Actions</h2>
        </div>

        <div className="sh-quick-grid">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                className="sh-quick-btn"
                onClick={() => navigate(action.route)}
              >
                <div className={`sh-quick-btn__icon sh-quick-btn__icon--${action.variant}`}>
                  <Icon size={20} />
                </div>
                <span className="sh-quick-btn__label">{action.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* -------- Learning Progress -------- */}
      <section className="sh-section sh-section--delay-4">
        <div className="sh-section__header">
          <h2 className="sh-section__title">Learning Progress</h2>
          <span className="sh-section__link" onClick={() => navigate('/progress')}>Details</span>
        </div>

        <div className="card">
          <div className="sh-progress-list">
            {progressItems.map((item) => (
              <div key={item.label} className="sh-progress-item">
                <span className="sh-progress-item__label">{item.label}</span>
                <div className="sh-progress-item__bar">
                  <div
                    className={`sh-progress-item__bar-fill sh-progress-item__bar-fill--${item.variant}`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
                <span className="sh-progress-item__value">{item.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------- Recently Shared Resources -------- */}
      <section className="sh-section sh-section--delay-5">
        <div className="sh-section__header">
          <h2 className="sh-section__title">Recently Shared</h2>
          <span className="sh-section__link">View All</span>
        </div>

        <div className="sh-resources-list">
          {resources.map((res) => {
            const ResIcon = resourceIcons[res.typeKey];
            return (
              <div key={res.id} className="sh-resource-item">
                <div className={`sh-resource-item__icon sh-resource-item__icon--${res.typeKey}`}>
                  <ResIcon size={18} />
                </div>
                <div className="sh-resource-item__content">
                  <p className="sh-resource-item__title">{res.title}</p>
                  <div className="sh-resource-item__meta">
                    <span>{res.type}</span>
                    <span className="sh-resource-item__meta-dot" />
                    <span>{res.by}</span>
                    <span className="sh-resource-item__meta-dot" />
                    <span>{res.ago}</span>
                  </div>
                </div>
                <ChevronRight size={16} style={{ color: 'var(--text-tertiary)', flexShrink: 0 }} />
              </div>
            );
          })}
        </div>
      </section>

      {/* -------- Upcoming Placement Drives -------- */}
      <section className="sh-section sh-section--delay-6">
        <div className="sh-section__header">
          <h2 className="sh-section__title">Placement Drives</h2>
          <span className="sh-section__link" onClick={() => navigate('/company-prep')}>All Drives</span>
        </div>

        <div className="sh-drives-scroll">
          {placementDrives.map((drive) => (
            <div key={drive.id} className="sh-drive-card">
              <div className="sh-drive-card__header">
                <span className="sh-drive-card__company">{drive.company}</span>
                <div className="sh-drive-card__logo">
                  <Building size={18} />
                </div>
              </div>
              <p className="sh-drive-card__date">{drive.date}</p>
              <p className="sh-drive-card__package">{drive.pkg}</p>
              <span className={drive.chipClass}>{drive.chip}</span>
            </div>
          ))}
        </div>
      </section>

      {/* -------- Recent Announcements -------- */}
      <section className="sh-section sh-section--delay-7">
        <div className="sh-section__header">
          <h2 className="sh-section__title">Announcements</h2>
        </div>

        <div className="sh-announce-list">
          {announcements.map((item) => (
            <div key={item.id} className="sh-announce-item">
              <div className="sh-announce-item__dot" />
              <div className="sh-announce-item__content">
                <p className="sh-announce-item__text">{item.text}</p>
                <p className="sh-announce-item__time">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
