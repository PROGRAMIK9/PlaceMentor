import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  BookOpen,
  BarChart3,
  Building2,
  MessageSquare,
  Target,
  Megaphone,
  CheckCheck,
  ClipboardList,
} from 'lucide-react';
import './notifications.css';

const FILTERS = ['All', 'Unread', 'Mentoring', 'Placement'];

const initialNotifications = [
  {
    id: 1,
    icon: Bell,
    iconBg: 'primary',
    emoji: '🔔',
    title: 'Mentor Session Reminder',
    description: 'Your session with Priya Sharma starts in 30 minutes',
    time: '30 min ago',
    unread: true,
    category: 'mentoring',
  },
  {
    id: 2,
    icon: BookOpen,
    iconBg: 'accent',
    emoji: '📚',
    title: 'New Resource Shared',
    description: "Priya shared 'Top 50 DSA Questions' PDF",
    time: '1h ago',
    unread: true,
    category: 'mentoring',
  },
  {
    id: 3,
    icon: ClipboardList,
    iconBg: 'warning',
    emoji: '🔔',
    title: 'Assignment Due',
    description: "Submit 'Linked List Assignment' by tomorrow",
    time: '2h ago',
    unread: true,
    category: 'mentoring',
  },
  {
    id: 4,
    icon: BarChart3,
    iconBg: 'success',
    emoji: '📊',
    title: 'Weekly Progress Update',
    description: 'You completed 4 out of 5 goals this week. Great job!',
    time: '5h ago',
    unread: false,
    category: 'mentoring',
  },
  {
    id: 5,
    icon: Building2,
    iconBg: 'info',
    emoji: '🏢',
    title: 'Placement Drive Update',
    description: 'TCS has opened applications. Deadline: Dec 10',
    time: 'Yesterday',
    unread: false,
    category: 'placement',
  },
  {
    id: 6,
    icon: MessageSquare,
    iconBg: 'accent',
    emoji: '💬',
    title: 'Mentor Feedback',
    description: 'Priya left feedback on your resume draft',
    time: 'Yesterday',
    unread: false,
    category: 'mentoring',
  },
  {
    id: 7,
    icon: Target,
    iconBg: 'success',
    emoji: '🎯',
    title: 'Goal Achieved',
    description: "You've completed a 14-day learning streak! 🔥",
    time: '2 days ago',
    unread: false,
    category: 'mentoring',
  },
  {
    id: 8,
    icon: Megaphone,
    iconBg: 'primary',
    emoji: '📢',
    title: 'Announcement',
    description: 'Mock interview schedule released for December',
    time: '3 days ago',
    unread: false,
    category: 'placement',
  },
];

export default function Notifications() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  const filtered = notifications.filter((n) => {
    if (activeFilter === 'Unread') return n.unread;
    if (activeFilter === 'Mentoring') return n.category === 'mentoring';
    if (activeFilter === 'Placement') return n.category === 'placement';
    return true;
  });

  return (
    <div className="notifications-screen page">
      {/* Header */}
      <header className="notif-header">
        <div className="notif-header__left">
          <h1>Notifications</h1>
          {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
        </div>
        <button className="notif-mark-read" onClick={markAllRead}>
          <CheckCheck size={16} />
          Mark all read
        </button>
      </header>

      {/* Filter tabs */}
      <div className="notif-filters h-scroll">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`notif-filter-tab ${activeFilter === f ? 'active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
            {f === 'Unread' && unreadCount > 0 && (
              <span className="notif-filter-count">{unreadCount}</span>
            )}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="notif-list">
        {filtered.map((n, idx) => {
          const Icon = n.icon;
          return (
            <article
              key={n.id}
              className={`notif-item ${n.unread ? 'notif-item--unread' : ''}`}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              {n.unread && <span className="notif-item__dot" />}
              <div className={`notif-item__icon notif-item__icon--${n.iconBg}`}>
                <Icon size={18} />
              </div>
              <div className="notif-item__body">
                <h3 className="notif-item__title">{n.title}</h3>
                <p className="notif-item__desc">{n.description}</p>
                <span className="notif-item__time">{n.time}</span>
              </div>
            </article>
          );
        })}

        {filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">
              <Bell size={32} />
            </div>
            <h3>All caught up!</h3>
            <p>No notifications in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
