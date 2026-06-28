import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Edit3,
  Globe,
  Download,
  Eye,
  FileText,
  Award,
  Settings,
  LogOut,
  ExternalLink,
  Flame,
  BookOpen,
  Video,
  ChevronRight,
  Code2,
  FolderGit2,
  Briefcase
} from 'lucide-react';
import './profile.css';

const stats = [
  { value: '14 Days', label: 'Learning Streak', emoji: '🔥' },
  { value: '3/8', label: 'Modules Done', emoji: '📘' },
  { value: '8', label: 'Sessions', emoji: '🎥' },
];

const academicInfo = [
  { label: 'CGPA', value: '8.2' },
  { label: 'Semester', value: '6th' },
  { label: 'Backlogs', value: 'None' },
  { label: 'Branch', value: 'Computer Science' },
];

const skills = [
  'JavaScript', 'Python', 'Java', 'React', 'SQL',
  'Git', 'Data Structures', 'Algorithms', 'HTML/CSS', 'Node.js',
];

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    tech: ['React', 'Node.js', 'MongoDB'],
    description: 'Full-stack web application with payment integration',
  },
  {
    id: 2,
    title: 'Chat Application',
    tech: ['Socket.io', 'Express'],
    description: 'Real-time messaging app with room support',
  },
];

const certificates = [
  { title: 'AWS Cloud Practitioner', issuer: 'Amazon', year: '2024' },
  { title: 'React Developer', issuer: 'Meta (Coursera)', year: '2024' },
];

const socialLinks = [
  { icon: Code2, label: 'GitHub', value: 'github.com/arjunmehta', url: 'https://github.com/arjunmehta' },
  { icon: Briefcase, label: 'LinkedIn', value: 'linkedin.com/in/arjunmehta', url: 'https://linkedin.com/in/arjunmehta' },
  { icon: Globe, label: 'Portfolio', value: 'arjunmehta.dev', url: 'https://arjunmehta.dev' },
];

export default function Profile() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="profile-screen page">
      {/* Profile Header */}
      <header className="profile-hero">
        <div className="profile-hero__bg" />
        <div className="profile-hero__content">
          <div className="profile-avatar">
            <span>AM</span>
          </div>
          <h1 className="profile-name">Arjun Mehta</h1>
          <p className="profile-college">MIT Pune</p>
          <p className="profile-branch">Computer Science - 3rd Year</p>
          <button className="btn btn-outline profile-edit-btn">
            <Edit3 size={14} />
            Edit Profile
          </button>
        </div>
      </header>

      {/* Stats */}
      <section className="profile-stats">
        {stats.map((s, i) => (
          <div key={i} className="profile-stat-card" style={{ animationDelay: `${i * 0.08}s` }}>
            <span className="profile-stat-emoji">{s.emoji}</span>
            <span className="profile-stat-value">{s.value}</span>
            <span className="profile-stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* Academic Info */}
      <section className="profile-section">
        <h2 className="profile-section__title">
          <BookOpen size={18} />
          Academic Info
        </h2>
        <div className="profile-academic-card card">
          {academicInfo.map((item, i) => (
            <div key={i} className="profile-academic-row">
              <span className="profile-academic-label">{item.label}</span>
              <span className="profile-academic-value">{item.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="profile-section">
        <h2 className="profile-section__title">
          <Code2 size={18} />
          Skills
        </h2>
        <div className="profile-skills">
          {skills.map((skill) => (
            <span key={skill} className="chip">{skill}</span>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="profile-section">
        <h2 className="profile-section__title">
          <FolderGit2 size={18} />
          Projects
        </h2>
        <div className="profile-projects">
          {projects.map((proj) => (
            <article key={proj.id} className="profile-project-card card">
              <div className="profile-project-card__header">
                <h3>{proj.title}</h3>
                <button className="btn btn-ghost btn-icon-sm" aria-label="View on GitHub">
                  <Code2 size={16} />
                </button>
              </div>
              <div className="profile-project-tags">
                {proj.tech.map((t) => (
                  <span key={t} className="chip chip-outline">{t}</span>
                ))}
              </div>
              <p className="profile-project-desc">{proj.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Resume */}
      <section className="profile-section">
        <h2 className="profile-section__title">
          <FileText size={18} />
          Resume
        </h2>
        <div className="profile-resume-card card">
          <div className="profile-resume-info">
            <FileText size={20} className="profile-resume-icon" />
            <div>
              <h4>Resume uploaded</h4>
              <span className="profile-resume-date">Last updated: Dec 5</span>
            </div>
          </div>
          <div className="profile-resume-actions">
            <button className="btn btn-ghost btn-icon-sm" aria-label="Preview">
              <Eye size={18} />
            </button>
            <button className="btn btn-ghost btn-icon-sm" aria-label="Download">
              <Download size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="profile-section">
        <h2 className="profile-section__title">
          <Award size={18} />
          Certificates
        </h2>
        <div className="profile-certificates">
          {certificates.map((cert, i) => (
            <div key={i} className="profile-cert-card card">
              <div className="profile-cert-icon">
                <Award size={20} />
              </div>
              <div className="profile-cert-info">
                <h4>{cert.title}</h4>
                <span>{cert.issuer} · {cert.year}</span>
              </div>
              <ExternalLink size={14} className="profile-cert-link" />
            </div>
          ))}
        </div>
      </section>

      {/* Social Links */}
      <section className="profile-section">
        <h2 className="profile-section__title">
          <Globe size={18} />
          Social Links
        </h2>
        <div className="profile-socials">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="profile-social-item"
              >
                <Icon size={18} className="profile-social-icon" />
                <div className="profile-social-text">
                  <span className="profile-social-label">{link.label}</span>
                  <span className="profile-social-value">{link.value}</span>
                </div>
                <ExternalLink size={14} className="profile-social-ext" />
              </a>
            );
          })}
        </div>
      </section>

      {/* Bottom actions */}
      <section className="profile-actions">
        <button className="btn btn-secondary btn-full btn-lg" onClick={() => navigate('/settings')}>
          <Settings size={18} />
          Settings
        </button>
        <button
          className="btn btn-full btn-lg profile-logout-btn"
          onClick={() => {
            logout();
            navigate('/');
          }}
        >
          <LogOut size={18} />
          Logout
        </button>
      </section>
    </div>
  );
}
