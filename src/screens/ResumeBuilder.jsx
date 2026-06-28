import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Eye,
  FileEdit,
  Upload,
  Sparkles,
  CheckCircle,
  ChevronRight,
  AlertTriangle,
  FileText,
  File,
} from 'lucide-react';
import './resume-builder.css';

const actionCards = [
  {
    id: 'create',
    Icon: FileEdit,
    title: 'Create Resume',
    desc: 'Build from scratch with guided steps',
    extra: null,
  },
  {
    id: 'upload',
    Icon: Upload,
    title: 'Upload Resume',
    desc: 'Upload your existing resume for AI review',
    extra: null,
  },
  {
    id: 'ai',
    Icon: Sparkles,
    title: 'AI Suggestions',
    desc: 'Get AI-powered improvements',
    extra: { type: 'badge', value: '3 suggestions' },
  },
  {
    id: 'ats',
    Icon: CheckCircle,
    title: 'ATS Check',
    desc: 'Check ATS compatibility score',
    extra: { type: 'chip', value: '82% compatible' },
  },
];

const templates = [
  {
    name: 'Modern Clean',
    theme: 'blue',
    accent: 'var(--primary)',
    bg: 'var(--primary-bg)',
  },
  {
    name: 'Professional',
    theme: 'dark',
    accent: 'var(--text)',
    bg: 'var(--surface-alt)',
  },
  {
    name: 'Creative',
    theme: 'purple',
    accent: '#A29BFE',
    bg: 'rgba(162, 155, 254, 0.1)',
  },
];

export default function ResumeBuilder() {
  const navigate = useNavigate();
  const [activeTemplate, setActiveTemplate] = useState(0);

  return (
    <div className="page rb-page">
      {/* Header */}
      <header className="page-header">
        <button className="btn btn-icon btn-ghost" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1>Resume Builder</h1>
        <button className="btn btn-icon btn-ghost">
          <Download size={20} />
        </button>
      </header>

      {/* Status Card */}
      <section className="rb-status card-gradient">
        <div className="rb-status-content">
          <div className="rb-status-info">
            <h2>Your Resume</h2>
            <div className="rb-status-meta">
              <span className="chip" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                Draft Ready
              </span>
              <span className="rb-updated">Last updated 2 days ago</span>
            </div>
          </div>
          <button className="btn rb-preview-btn">
            <Eye size={16} />
            Preview
          </button>
        </div>
      </section>

      {/* Action Cards */}
      <section className="section">
        <h3 className="section-title">Actions</h3>
        <div className="rb-actions-list">
          {actionCards.map((item, idx) => {
            const { Icon } = item;
            return (
              <button
                key={item.id}
                className={`rb-action-card card stagger-${idx + 1}`}
              >
                <div className="rb-action-icon" style={{
                  background: idx === 0 ? 'var(--primary-bg)' :
                    idx === 1 ? 'var(--accent-bg)' :
                    idx === 2 ? 'var(--warning-bg)' :
                    'var(--success-bg)',
                  color: idx === 0 ? 'var(--primary)' :
                    idx === 1 ? 'var(--accent)' :
                    idx === 2 ? '#E17055' :
                    'var(--success)',
                }}>
                  <Icon size={20} />
                </div>
                <div className="rb-action-info">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
                {item.extra?.type === 'badge' && (
                  <span className="chip chip-warning" style={{ fontSize: 'var(--font-xs)' }}>
                    {item.extra.value}
                  </span>
                )}
                {item.extra?.type === 'chip' && (
                  <span className="chip chip-success" style={{ fontSize: 'var(--font-xs)' }}>
                    {item.extra.value}
                  </span>
                )}
                {!item.extra && <ChevronRight size={18} className="rb-action-arrow" />}
              </button>
            );
          })}
        </div>
      </section>

      {/* Templates */}
      <section className="section">
        <div className="section-header">
          <h3 className="section-title">Templates</h3>
          <span className="section-link">See All</span>
        </div>
        <div className="h-scroll rb-templates-scroll">
          {templates.map((tpl, idx) => (
            <button
              key={idx}
              className={`rb-template-card ${activeTemplate === idx ? 'rb-template-active' : ''}`}
              onClick={() => setActiveTemplate(idx)}
              style={{ '--tpl-accent': tpl.accent, '--tpl-bg': tpl.bg }}
            >
              {/* Mini resume preview */}
              <div className="rb-template-preview">
                <div className="rb-tpl-header-bar" />
                <div className="rb-tpl-line rb-tpl-line-long" />
                <div className="rb-tpl-line rb-tpl-line-med" />
                <div className="rb-tpl-divider" />
                <div className="rb-tpl-line rb-tpl-line-long" />
                <div className="rb-tpl-line rb-tpl-line-short" />
                <div className="rb-tpl-line rb-tpl-line-med" />
                <div className="rb-tpl-divider" />
                <div className="rb-tpl-line rb-tpl-line-long" />
                <div className="rb-tpl-line rb-tpl-line-short" />
              </div>
              <span className="rb-template-name">{tpl.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Grammar & Style */}
      <section className="section">
        <h3 className="section-title">Grammar & Style</h3>
        <div className="rb-quality-cards">
          <div className="rb-quality-item card">
            <div className="rb-quality-row">
              <div className="rb-quality-label">
                <AlertTriangle size={16} color="var(--warning)" />
                <span>Grammar Check</span>
              </div>
              <span className="chip chip-warning" style={{ fontSize: 'var(--font-xs)' }}>
                2 issues found
              </span>
            </div>
          </div>

          <div className="rb-quality-item card">
            <div className="rb-quality-row">
              <span className="rb-quality-label">
                <Sparkles size={16} color="var(--primary)" />
                <span>Style Score</span>
              </span>
              <span className="font-bold" style={{ color: 'var(--primary)' }}>
                85/100
              </span>
            </div>
            <div className="progress-bar" style={{ marginTop: 10 }}>
              <div
                className="progress-bar-fill"
                style={{ width: '85%' }}
              />
            </div>
          </div>

          <div className="rb-quality-item card">
            <div className="rb-quality-row">
              <span className="rb-quality-label">
                <CheckCircle size={16} color="var(--success)" />
                <span>Readability</span>
              </span>
              <span className="chip chip-success" style={{ fontSize: 'var(--font-xs)' }}>
                Good
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Download Options */}
      <section className="section rb-download-section">
        <h3 className="section-title">Download</h3>
        <div className="rb-download-btns">
          <button className="btn btn-primary btn-lg rb-dl-btn">
            <FileText size={18} />
            Download as PDF
          </button>
          <button className="btn btn-outline btn-lg rb-dl-btn">
            <File size={18} />
            Download as DOCX
          </button>
        </div>
      </section>
    </div>
  );
}
