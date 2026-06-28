import { useNavigate } from 'react-router-dom';
import {
  Bell,
  Users,
  Megaphone,
  Building,
  TrendingUp,
  Star,
  Award,
  Calendar,
  Edit3,
  Trash2,
  Plus,
  FileText,
  Download,
  BarChart3,
  ClipboardCheck
} from 'lucide-react';
import './coordinator-dashboard.css';

const metrics = [
  { label: 'Total Students', value: '480', change: '↑ 12%' },
  { label: 'Active Mentors', value: '80', change: null },
  { label: 'Sessions This Semester', value: '1,240', change: null },
  { label: 'Placement Rate', value: '78%', change: null },
];

const drives = [
  { company: 'TCS', date: 'Dec 15', eligible: 320, status: 'Applications Open', statusClass: 'chip chip-success' },
  { company: 'Infosys', date: 'Dec 20', eligible: 280, status: 'Upcoming', statusClass: 'chip chip-warning' },
  { company: 'Google', date: 'Jan 5', eligible: 45, status: 'Preparation', statusClass: 'chip' },
  { company: 'Microsoft', date: 'Jan 12', eligible: 60, status: 'Announced', statusClass: 'chip' },
];

const announcements = [
  { title: 'TCS Application Deadline Extended to Dec 18', date: 'Jun 26, 2026' },
  { title: 'Mock Interview Sessions Begin Next Week', date: 'Jun 24, 2026' },
  { title: 'Resume Submission Guidelines Updated', date: 'Jun 22, 2026' },
];

const departments = [
  { name: 'CSE', progress: 72, className: 'cse' },
  { name: 'IT', progress: 65, className: 'it' },
  { name: 'ECE', progress: 58, className: 'ece' },
];

const monthlyData = [
  { month: 'Mar', sessions: 280 },
  { month: 'Apr', sessions: 320 },
  { month: 'May', sessions: 310 },
  { month: 'Jun', sessions: 330 },
];

const reports = [
  { name: 'Student Participation Report', iconColor: 'purple' },
  { name: 'Mentoring Sessions Report', iconColor: 'teal' },
  { name: 'Placement Readiness Report', iconColor: 'warm' },
];

function getLogoInitials(company) {
  return company.slice(0, 2).toUpperCase();
}

export default function CoordinatorDashboard() {
  const navigate = useNavigate();
  const maxSessions = Math.max(...monthlyData.map((d) => d.sessions));

  return (
    <div className="coordinator-dashboard">
      {/* Header */}
      <header className="coord-header">
        <h1>Coordinator Dashboard</h1>
        <button
          className="coord-header-btn"
          onClick={() => navigate('/notifications')}
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="coord-notif-badge" />
        </button>
      </header>

      {/* Key Metrics */}
      <div className="coord-metrics">
        {metrics.map((m) => (
          <div className="coord-metric-card" key={m.label}>
            <div className="coord-metric-value">{m.value}</div>
            <div className="coord-metric-label">{m.label}</div>
            {m.change && (
              <span className="coord-metric-change">{m.change}</span>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="coord-quick-actions">
        <button className="coord-action-btn">
          <div className="coord-action-icon purple">
            <Users size={20} />
          </div>
          <span className="coord-action-label">Assign Mentors</span>
        </button>
        <button className="coord-action-btn">
          <div className="coord-action-icon teal">
            <Megaphone size={20} />
          </div>
          <span className="coord-action-label">Create Announcement</span>
        </button>
        <button className="coord-action-btn">
          <div className="coord-action-icon warm">
            <Building size={20} />
          </div>
          <span className="coord-action-label">Manage Drives</span>
        </button>
      </div>

      {/* Mentoring Overview */}
      <section className="coord-section">
        <div className="coord-section-header">
          <h2 className="coord-section-title">Mentoring Overview</h2>
        </div>
        <div className="mentoring-overview">
          <div className="mentoring-stats-grid">
            <div className="mentoring-stat">
              <span className="mentoring-stat-value">80</span>
              <span className="mentoring-stat-label">Active Pairs</span>
            </div>
            <div className="mentoring-stat">
              <span className="mentoring-stat-value">2.4</span>
              <span className="mentoring-stat-label">Avg Sessions/Week</span>
            </div>
            <div className="mentoring-stat">
              <span className="mentoring-stat-value">
                4.6/5 <span className="mentoring-star">⭐</span>
              </span>
              <span className="mentoring-stat-label">Student Satisfaction</span>
            </div>
            <div className="mentoring-stat">
              <span className="mentoring-stat-value">
                <TrendingUp size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4, color: 'var(--success)' }} />
                85%
              </span>
              <span className="mentoring-stat-label">Avg Completion</span>
            </div>
          </div>
          <div className="mentoring-top-mentor">
            <div className="top-mentor-badge">
              <Award size={18} />
            </div>
            <div className="top-mentor-info">
              <div className="top-mentor-label">Top Performing Mentor</div>
              <div className="top-mentor-name">Priya Sharma</div>
              <div className="top-mentor-meta">6 students · 85% avg completion</div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Placement Drives */}
      <section className="coord-section">
        <div className="coord-section-header">
          <h2 className="coord-section-title">Upcoming Placement Drives</h2>
          <span className="coord-section-link">View All</span>
        </div>
        <div className="drives-list">
          {drives.map((d) => (
            <div className="drive-item" key={d.company}>
              <div className="drive-logo">{getLogoInitials(d.company)}</div>
              <div className="drive-info">
                <div className="drive-company">{d.company}</div>
                <div className="drive-meta">
                  <Calendar size={11} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 3 }} />
                  {d.date} · {d.eligible} eligible
                </div>
              </div>
              <div className="drive-status">
                <span className={d.statusClass}>{d.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Announcements */}
      <section className="coord-section">
        <div className="coord-section-header">
          <h2 className="coord-section-title">Announcements</h2>
        </div>
        <div className="announcements-list">
          {announcements.map((a, i) => (
            <div className="announcement-item" key={i}>
              <div className="announcement-icon-wrap">
                <Megaphone size={16} />
              </div>
              <div className="announcement-content">
                <div className="announcement-title">{a.title}</div>
                <div className="announcement-date">{a.date}</div>
              </div>
              <div className="announcement-actions">
                <button className="announcement-action-btn" aria-label="Edit">
                  <Edit3 size={14} />
                </button>
                <button className="announcement-action-btn delete" aria-label="Delete">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
          <button className="add-announcement-btn">
            <Plus size={18} />
            Add Announcement
          </button>
        </div>
      </section>

      {/* Analytics */}
      <section className="coord-section">
        <div className="coord-section-header">
          <h2 className="coord-section-title">Analytics</h2>
        </div>

        {/* Department Progress */}
        <div className="analytics-card">
          <div className="analytics-card-title">Department-wise Progress</div>
          <div className="dept-progress-list">
            {departments.map((d) => (
              <div className="dept-row" key={d.name}>
                <span className="dept-label">{d.name}</span>
                <div className="dept-bar-wrap">
                  <div
                    className={`dept-bar-fill ${d.className}`}
                    style={{ width: `${d.progress}%` }}
                  />
                </div>
                <span className="dept-pct">{d.progress}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Session Trend */}
        <div className="analytics-card">
          <div className="analytics-card-title">Monthly Session Trend</div>
          <div className="monthly-chart">
            {monthlyData.map((d) => (
              <div className="monthly-bar-col" key={d.month}>
                <div
                  className="monthly-bar"
                  style={{ height: `${(d.sessions / maxSessions) * 100}px` }}
                >
                  <span className="monthly-bar-value">{d.sessions}</span>
                </div>
                <span className="monthly-bar-label">{d.month}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reports */}
      <section className="coord-section">
        <div className="coord-section-header">
          <h2 className="coord-section-title">Reports</h2>
        </div>
        <div className="reports-list">
          {reports.map((r) => (
            <div className="report-item" key={r.name}>
              <div className={`report-icon-wrap ${r.iconColor}`}>
                <FileText size={18} />
              </div>
              <span className="report-name">{r.name}</span>
              <button className="report-download-btn" aria-label={`Download ${r.name}`}>
                <Download size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
