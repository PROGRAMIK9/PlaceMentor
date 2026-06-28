import { useNavigate } from 'react-router-dom';
import {
  Settings,
  Users,
  CalendarDays,
  FolderOpen,
  TrendingUp,
  MessageCircle,
  Upload,
  ClipboardList,
  FileText,
  MessageSquare,
  Clock,
  CheckCircle2,
  Flame
} from 'lucide-react';
import './mentor-dashboard.css';

const stats = [
  { label: 'Assigned Students', value: '6', icon: Users, color: 'purple' },
  { label: "This Week's Sessions", value: '3', icon: CalendarDays, color: 'blue' },
  { label: 'Resources Shared', value: '24', icon: FolderOpen, color: 'teal' },
  { label: 'Avg. Completion', value: '58%', icon: TrendingUp, color: 'orange' },
];

const students = [
  { name: 'Arjun Mehta', initials: 'AM', color: 'purple', branch: 'CSE 3rd Year', progress: 65, active: 'Active now', isNow: true },
  { name: 'Sneha Gupta', initials: 'SG', color: 'pink', branch: 'CSE 3rd Year', progress: 78, active: '1h ago', isNow: false },
  { name: 'Rohit Sharma', initials: 'RS', color: 'blue', branch: 'IT 3rd Year', progress: 42, active: '3h ago', isNow: false },
  { name: 'Ananya Patel', initials: 'AP', color: 'green', branch: 'CSE 3rd Year', progress: 85, active: 'Active now', isNow: true },
  { name: 'Vikram Singh', initials: 'VS', color: 'orange', branch: 'ECE 3rd Year', progress: 35, active: 'Yesterday', isNow: false },
  { name: 'Meera Joshi', initials: 'MJ', color: 'teal', branch: 'CSE 3rd Year', progress: 55, active: '2h ago', isNow: false },
];

const schedule = [
  { day: 'Mon', time: '4:00 PM', type: 'Group Session', title: 'DSA Problem Solving', meta: '6/6 attending' },
  { day: 'Wed', time: '3:00 PM', type: '1-on-1', title: 'Arjun - Resume Review', meta: 'Confirmed' },
  { day: 'Fri', time: '4:00 PM', type: 'Group Session', title: 'Mock Interview Prep', meta: '5/6 attending' },
];

const quickActions = [
  { label: 'Share Resource', icon: Upload },
  { label: 'Create Task', icon: ClipboardList },
  { label: 'Session Notes', icon: FileText },
  { label: 'Send Feedback', icon: MessageSquare },
];

const activities = [
  { text: '<strong>Arjun</strong> submitted Linked List Assignment', time: '2h ago' },
  { text: '<strong>Sneha</strong> completed DSA Module 3', time: '5h ago' },
  { text: '<strong>Ananya</strong> requested feedback on resume', time: 'Yesterday' },
];

function getProgressClass(progress) {
  if (progress >= 75) return 'high';
  if (progress <= 40) return 'low';
  return '';
}

export default function MentorDashboard() {
  const navigate = useNavigate();

  return (
    <div className="mentor-dashboard">
      {/* Header */}
      <header className="mentor-header">
        <div className="mentor-greeting">
          <h1>Hello, Priya 👋</h1>
          <p>Here's your mentoring overview</p>
        </div>
        <button
          className="mentor-header-btn"
          onClick={() => navigate('/settings')}
          aria-label="Settings"
        >
          <Settings size={20} />
        </button>
      </header>

      {/* Overview Stats */}
      <div className="mentor-stats">
        {stats.map((stat) => (
          <div className="mentor-stat-card" key={stat.label}>
            <div className={`stat-icon ${stat.color}`}>
              <stat.icon size={18} />
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Assigned Students */}
      <section className="mentor-section">
        <div className="mentor-section-header">
          <h2 className="mentor-section-title">Assigned Students</h2>
          <span className="mentor-section-link">View All</span>
        </div>
        <div className="student-cards">
          {students.map((s) => (
            <div className="student-card" key={s.name}>
              <div className={`student-avatar ${s.color}`}>
                {s.initials}
              </div>
              <div className="student-info">
                <div className="student-name">{s.name}</div>
                <div className="student-branch">{s.branch}</div>
                <div className="student-progress-row">
                  <div className="student-progress-bar">
                    <div
                      className={`student-progress-fill ${getProgressClass(s.progress)}`}
                      style={{ width: `${s.progress}%` }}
                    />
                  </div>
                  <span className="student-progress-pct">{s.progress}%</span>
                </div>
              </div>
              <div className="student-meta">
                <span className={`student-active ${s.isNow ? 'now' : ''}`}>
                  {s.active}
                </span>
                <button className="student-chat-btn" aria-label={`Chat with ${s.name}`}>
                  <MessageCircle size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Weekly Schedule */}
      <section className="mentor-section">
        <div className="mentor-section-header">
          <h2 className="mentor-section-title">Weekly Schedule</h2>
          <span className="mentor-section-link">Full Calendar</span>
        </div>
        <div className="schedule-list">
          {schedule.map((item) => (
            <div className="schedule-item" key={item.title}>
              <div className="schedule-day">
                <span className="schedule-day-name">{item.day}</span>
                <span className="schedule-day-time">{item.time}</span>
              </div>
              <div className="schedule-details">
                <div className="schedule-type">{item.type}</div>
                <div className="schedule-title">{item.title}</div>
                <div className="schedule-meta">
                  <CheckCircle2 size={12} />
                  <span>{item.meta}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mentor-section">
        <div className="mentor-section-header">
          <h2 className="mentor-section-title">Quick Actions</h2>
        </div>
        <div className="quick-actions-grid">
          {quickActions.map((action) => (
            <button className="quick-action-card" key={action.label}>
              <div className="quick-action-icon">
                <action.icon size={22} />
              </div>
              <span className="quick-action-label">{action.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="mentor-section">
        <div className="mentor-section-header">
          <h2 className="mentor-section-title">Recent Activity</h2>
        </div>
        <div className="activity-feed">
          {activities.map((a, i) => (
            <div className="activity-item" key={i}>
              <div className="activity-dot" />
              <div className="activity-content">
                <div
                  className="activity-text"
                  dangerouslySetInnerHTML={{ __html: a.text }}
                />
                <div className="activity-time">
                  <Clock size={10} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 3 }} />
                  {a.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Attendance Overview */}
      <section className="mentor-section">
        <div className="mentor-section-header">
          <h2 className="mentor-section-title">Attendance Overview</h2>
        </div>
        <div className="attendance-card">
          <div className="attendance-row">
            <span className="attendance-label">This month</span>
            <span className="attendance-value">
              <span className="highlight">22</span>/24 sessions
            </span>
          </div>
          <div className="attendance-bar-wrap">
            <div className="attendance-bar">
              <div
                className="attendance-bar-fill"
                style={{ width: '91.7%' }}
              />
            </div>
          </div>
          <div className="attendance-streak">
            <Flame size={16} className="attendance-streak-icon" />
            <span className="attendance-streak-text">🔥 4 weeks consistent attendance</span>
          </div>
        </div>
      </section>
    </div>
  );
}
