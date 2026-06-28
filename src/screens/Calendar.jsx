import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CalendarDays,
  Plus,
  Clock,
  ChevronLeft,
  ChevronRight,
  Video,
  BookOpen,
  BrainCircuit,
  ClipboardList,
} from 'lucide-react';
import './calendar.css';

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function getWeekDates(refDate) {
  const d = new Date(refDate);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day; // Monday start
  const monday = new Date(d);
  monday.setDate(d.getDate() + diff);
  return Array.from({ length: 7 }, (_, i) => {
    const dt = new Date(monday);
    dt.setDate(monday.getDate() + i);
    return dt;
  });
}

function isSameDay(a, b) {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

const todayEvents = [
  {
    id: 1,
    time: '10:00 AM',
    title: 'DSA Practice Session',
    duration: '1 hour',
    type: 'Self Study',
    color: 'primary',
    icon: BookOpen,
  },
  {
    id: 2,
    time: '2:00 PM',
    title: 'Mentor Meeting with Priya',
    duration: '45 min',
    type: 'Video Call',
    color: 'accent',
    icon: Video,
  },
  {
    id: 3,
    time: '4:00 PM',
    title: 'Resume Review',
    duration: '30 min',
    type: 'With AI Assistant',
    color: 'success',
    icon: BrainCircuit,
  },
  {
    id: 4,
    time: '6:00 PM',
    title: 'Aptitude Practice Set 5',
    duration: '1 hour',
    type: 'Assignment',
    color: 'warning',
    icon: ClipboardList,
  },
];

const upcomingEvents = [
  { id: 1, dayLabel: 'Tomorrow', title: 'Core Subjects Study Group', time: '3:00 PM' },
  { id: 2, dayLabel: 'Wed', title: 'Mock Technical Interview', time: '11:00 AM' },
  { id: 3, dayLabel: 'Fri', title: 'Weekly Mentor Session', time: '4:00 PM' },
  { id: 4, dayLabel: 'Sat', title: 'Placement Drive Prep - TCS', time: '10:00 AM' },
];

export default function Calendar() {
  const navigate = useNavigate();
  const today = useMemo(() => new Date(), []);
  const [selectedDate, setSelectedDate] = useState(today);
  const [viewMode, setViewMode] = useState('week');

  const weekDates = useMemo(() => getWeekDates(selectedDate), [selectedDate]);

  const headerMonth = `${MONTH_NAMES[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;

  return (
    <div className="calendar-screen page">
      {/* Header */}
      <header className="calendar-header">
        <div className="calendar-header__left">
          <CalendarDays size={24} className="calendar-header__icon" />
          <h1>My Schedule</h1>
        </div>
        <div className="calendar-header__actions">
          <button
            className="btn btn-ghost btn-icon-sm"
            onClick={() => setSelectedDate(new Date())}
            title="Today"
          >
            <span className="today-badge">Today</span>
          </button>
          <button className="btn btn-primary btn-icon" aria-label="Add event">
            <Plus size={20} />
          </button>
        </div>
      </header>

      {/* Month label & nav */}
      <div className="calendar-month-nav">
        <button
          className="btn btn-ghost btn-icon-sm"
          onClick={() => {
            const d = new Date(selectedDate);
            d.setDate(d.getDate() - 7);
            setSelectedDate(d);
          }}
        >
          <ChevronLeft size={18} />
        </button>
        <span className="calendar-month-label">{headerMonth}</span>
        <button
          className="btn btn-ghost btn-icon-sm"
          onClick={() => {
            const d = new Date(selectedDate);
            d.setDate(d.getDate() + 7);
            setSelectedDate(d);
          }}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* View toggle */}
      <div className="calendar-toggle">
        <button
          className={`calendar-toggle__btn ${viewMode === 'week' ? 'active' : ''}`}
          onClick={() => setViewMode('week')}
        >
          Week
        </button>
        <button
          className={`calendar-toggle__btn ${viewMode === 'month' ? 'active' : ''}`}
          onClick={() => setViewMode('month')}
        >
          Month
        </button>
      </div>

      {/* Week strip */}
      <div className="calendar-week-strip">
        {weekDates.map((date, i) => {
          const isToday = isSameDay(date, today);
          const isSelected = isSameDay(date, selectedDate);
          return (
            <button
              key={i}
              className={`calendar-day ${isToday ? 'calendar-day--today' : ''} ${isSelected ? 'calendar-day--selected' : ''}`}
              onClick={() => setSelectedDate(date)}
            >
              <span className="calendar-day__label">{DAY_LABELS[i]}</span>
              <span className="calendar-day__number">{date.getDate()}</span>
              {isToday && <span className="calendar-day__dot" />}
            </button>
          );
        })}
      </div>

      {/* Events for selected day */}
      <section className="calendar-events">
        <h2 className="calendar-section-title">
          {isSameDay(selectedDate, today) ? "Today's Schedule" : `Schedule for ${selectedDate.getDate()} ${MONTH_NAMES[selectedDate.getMonth()]}`}
        </h2>

        <div className="calendar-events__list">
          {(isSameDay(selectedDate, today) ? todayEvents : []).map((evt, idx) => {
            const Icon = evt.icon;
            return (
              <article
                key={evt.id}
                className={`event-card event-card--${evt.color}`}
                style={{ animationDelay: `${idx * 0.07}s` }}
              >
                <div className="event-card__time-col">
                  <Clock size={13} />
                  <span>{evt.time}</span>
                </div>
                <div className="event-card__body">
                  <h3 className="event-card__title">{evt.title}</h3>
                  <div className="event-card__meta">
                    <span className="event-card__duration">{evt.duration}</span>
                    <span className="event-card__type">
                      <Icon size={13} />
                      {evt.type}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}

          {!isSameDay(selectedDate, today) && (
            <div className="empty-state" style={{ padding: '32px 16px' }}>
              <div className="empty-state-icon">
                <CalendarDays size={32} />
              </div>
              <h3>No events</h3>
              <p>Select today to see scheduled events</p>
            </div>
          )}
        </div>
      </section>

      {/* Upcoming this week */}
      <section className="calendar-upcoming">
        <h2 className="calendar-section-title">Upcoming This Week</h2>

        <div className="calendar-upcoming__list">
          {upcomingEvents.map((evt, idx) => (
            <article
              key={evt.id}
              className="upcoming-card"
              style={{ animationDelay: `${0.3 + idx * 0.06}s` }}
            >
              <div className="upcoming-card__day">{evt.dayLabel}</div>
              <div className="upcoming-card__info">
                <h4>{evt.title}</h4>
                <span className="upcoming-card__time">
                  <Clock size={12} />
                  {evt.time}
                </span>
              </div>
              <ChevronRight size={16} className="upcoming-card__chevron" />
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
