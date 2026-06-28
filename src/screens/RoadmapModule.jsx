import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Share2,
  ChevronDown,
  CheckCircle2,
  Circle,
  Lock,
  Clock,
  PlayCircle,
  FileText,
  ExternalLink,
  Star,
} from 'lucide-react';
import './roadmap-module.css';

const moduleData = {
  name: 'DSA',
  fullName: 'Data Structures & Algorithms',
  tasksCompleted: 12,
  totalTasks: 20,
  progress: 65,
};

const weeks = [
  {
    id: 1,
    title: 'Arrays & Strings',
    status: 'completed',
    tasks: [
      { name: 'Solve 10 array problems', done: true, progress: '10/10' },
      { name: 'Watch arrays video', done: true },
      { name: 'Submit assignment', done: true },
    ],
  },
  {
    id: 2,
    title: 'Linked Lists',
    status: 'in-progress',
    tasks: [
      { name: 'Solve 8 LL problems', done: false, progress: '5/8' },
      { name: 'Watch LL concepts video', done: true },
      { name: 'Mentor session notes', done: false },
    ],
  },
  {
    id: 3,
    title: 'Stacks & Queues',
    status: 'upcoming',
    tasks: [],
  },
  {
    id: 4,
    title: 'Trees & Graphs',
    status: 'locked',
    tasks: [],
  },
];

const resources = [
  {
    id: 1,
    title: 'Arrays & Strings Masterclass',
    type: 'video',
    duration: '45 min',
    mentor: 'Prof. Sharma',
  },
  {
    id: 2,
    title: 'DSA Cheat Sheet',
    type: 'pdf',
    pages: '12 pages',
    mentor: 'Rahul Verma',
  },
  {
    id: 3,
    title: 'Linked List Visualization Tool',
    type: 'link',
    url: 'visualgo.net',
    mentor: 'Priya Patel',
  },
  {
    id: 4,
    title: 'Recursion Deep Dive',
    type: 'video',
    duration: '1h 20min',
    mentor: 'Prof. Sharma',
  },
  {
    id: 5,
    title: 'Big-O Notation Guide',
    type: 'pdf',
    pages: '8 pages',
    mentor: 'Ankit Joshi',
  },
];

const practiceQuestions = [
  { id: 1, title: 'Two Sum', difficulty: 'Easy', solved: true },
  { id: 2, title: 'Reverse Linked List', difficulty: 'Easy', solved: true },
  { id: 3, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', solved: false },
  { id: 4, title: 'Merge K Sorted Lists', difficulty: 'Hard', solved: false },
  { id: 5, title: 'Valid Parentheses', difficulty: 'Easy', solved: true },
  { id: 6, title: 'LRU Cache', difficulty: 'Hard', solved: false },
  { id: 7, title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', solved: false },
  { id: 8, title: 'Maximum Subarray', difficulty: 'Medium', solved: true },
];

const resourceIcon = (type) => {
  switch (type) {
    case 'video':
      return <PlayCircle size={18} />;
    case 'pdf':
      return <FileText size={18} />;
    case 'link':
      return <ExternalLink size={18} />;
    default:
      return <FileText size={18} />;
  }
};

const difficultyClass = (d) => {
  switch (d) {
    case 'Easy':
      return 'diff-easy';
    case 'Medium':
      return 'diff-medium';
    case 'Hard':
      return 'diff-hard';
    default:
      return '';
  }
};

const weekStatusIcon = (status) => {
  switch (status) {
    case 'completed':
      return <CheckCircle2 size={18} className="week-icon-completed" />;
    case 'in-progress':
      return <Clock size={18} className="week-icon-inprogress" />;
    case 'upcoming':
      return <Circle size={18} className="week-icon-upcoming" />;
    case 'locked':
      return <Lock size={18} className="week-icon-locked" />;
    default:
      return <Circle size={18} />;
  }
};

export default function RoadmapModule() {
  const navigate = useNavigate();
  const { moduleId } = useParams();
  const [activeTab, setActiveTab] = useState('tasks');
  const [expandedWeek, setExpandedWeek] = useState(2);

  const tabs = [
    { id: 'tasks', label: 'Weekly Tasks' },
    { id: 'resources', label: 'Resources' },
    { id: 'practice', label: 'Practice' },
  ];

  const toggleWeek = (weekId) => {
    setExpandedWeek(expandedWeek === weekId ? null : weekId);
  };

  return (
    <div className="rm-screen">
      {/* Header */}
      <header className="rm-header">
        <button className="rm-back-btn" onClick={() => navigate(-1)} aria-label="Go back">
          <ArrowLeft size={22} />
        </button>
        <h1 className="rm-header-title">{moduleData.name}</h1>
        <button className="rm-share-btn" aria-label="Share">
          <Share2 size={20} />
        </button>
      </header>

      {/* Module Overview */}
      <section className="rm-overview-card">
        <div className="rm-overview-top">
          <h2 className="rm-overview-name">{moduleData.fullName}</h2>
          <span className="rm-overview-count">
            {moduleData.tasksCompleted} of {moduleData.totalTasks} tasks completed
          </span>
        </div>
        <div className="rm-overview-progress-wrap">
          <div className="rm-overview-progress-bar">
            <div
              className="rm-overview-progress-fill"
              style={{ width: `${moduleData.progress}%` }}
            />
          </div>
          <span className="rm-overview-pct">{moduleData.progress}%</span>
        </div>
      </section>

      {/* Tabs */}
      <nav className="rm-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`rm-tab ${activeTab === tab.id ? 'rm-tab-active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Tab Content */}
      <div className="rm-tab-content">
        {/* Weekly Tasks */}
        {activeTab === 'tasks' && (
          <div className="rm-tasks-list" key="tasks">
            {weeks.map((week, idx) => {
              const isExpanded = expandedWeek === week.id;
              const isLocked = week.status === 'locked';
              return (
                <div
                  key={week.id}
                  className={`rm-week-card ${isLocked ? 'rm-week-locked' : ''}`}
                  style={{ animationDelay: `${idx * 0.08}s` }}
                >
                  <button
                    className="rm-week-header"
                    onClick={() => !isLocked && toggleWeek(week.id)}
                    disabled={isLocked}
                  >
                    <div className="rm-week-header-left">
                      {weekStatusIcon(week.status)}
                      <div>
                        <span className="rm-week-label">Week {week.id}</span>
                        <span className="rm-week-title">{week.title}</span>
                      </div>
                    </div>
                    {!isLocked && (
                      <ChevronDown
                        size={18}
                        className={`rm-week-chevron ${isExpanded ? 'rm-week-chevron-open' : ''}`}
                      />
                    )}
                    {isLocked && <Lock size={16} className="week-icon-locked" />}
                  </button>

                  {isExpanded && week.tasks.length > 0 && (
                    <div className="rm-week-tasks">
                      {week.tasks.map((task, tIdx) => (
                        <div key={tIdx} className="rm-task-item">
                          {task.done ? (
                            <CheckCircle2 size={16} className="rm-task-done-icon" />
                          ) : (
                            <Circle size={16} className="rm-task-pending-icon" />
                          )}
                          <span
                            className={`rm-task-name ${task.done ? 'rm-task-name-done' : ''}`}
                          >
                            {task.name}
                          </span>
                          {task.progress && !task.done && (
                            <span className="rm-task-progress-badge">{task.progress}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Resources */}
        {activeTab === 'resources' && (
          <div className="rm-resources-list" key="resources">
            {resources.map((res, idx) => (
              <div
                key={res.id}
                className="rm-resource-card"
                style={{ animationDelay: `${idx * 0.07}s` }}
              >
                <div className={`rm-resource-icon rm-resource-icon-${res.type}`}>
                  {resourceIcon(res.type)}
                </div>
                <div className="rm-resource-info">
                  <h4 className="rm-resource-title">{res.title}</h4>
                  <p className="rm-resource-meta">
                    {res.duration || res.pages || res.url} · Shared by {res.mentor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Practice */}
        {activeTab === 'practice' && (
          <div className="rm-practice-list" key="practice">
            {practiceQuestions.map((q, idx) => (
              <div
                key={q.id}
                className="rm-practice-card"
                style={{ animationDelay: `${idx * 0.06}s` }}
              >
                <div className="rm-practice-left">
                  {q.solved ? (
                    <CheckCircle2 size={18} className="rm-task-done-icon" />
                  ) : (
                    <Circle size={18} className="rm-task-pending-icon" />
                  )}
                  <span className={`rm-practice-title ${q.solved ? 'rm-task-name-done' : ''}`}>
                    {q.title}
                  </span>
                </div>
                <span className={`rm-difficulty-chip ${difficultyClass(q.difficulty)}`}>
                  {q.difficulty}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
