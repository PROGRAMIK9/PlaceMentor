import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Search,
  ChevronRight,
  ChevronDown,
  MapPin,
  Calendar,
  Check,
  Square,
  MessageSquare,
  Users,
  Briefcase,
} from 'lucide-react';
import './company-prep.css';

const upcomingDrives = [
  {
    company: 'TCS',
    date: 'Dec 15',
    package: '₹7 LPA',
    chipClass: 'chip-success',
    chipLabel: 'Eligible',
  },
  {
    company: 'Infosys',
    date: 'Dec 20',
    package: '₹6.5 LPA',
    chipClass: 'chip-warning',
    chipLabel: 'Apply Soon',
  },
  {
    company: 'Google',
    date: 'Jan 5',
    package: '₹25 LPA',
    chipClass: '',
    chipLabel: 'Preparing',
  },
];

const companies = [
  {
    id: 'tcs',
    name: 'TCS',
    industry: 'IT Services',
    packageRange: '₹3.5 – 7 LPA',
    cgpa: '6.0',
    rounds: 4,
    prepProgress: 72,
    eligibility: 'Min CGPA 6.0, No active backlogs',
    process: ['Online Test', 'Technical Interview', 'HR', 'Offer'],
    pattern: '2 DSA (Easy-Medium), 1 CS Fundamentals, HR behavioral',
    faqs: [
      'Tell me about yourself and your projects.',
      'Explain OOP concepts with examples.',
      'Where do you see yourself in 5 years?',
    ],
    checklist: [
      { text: 'Aptitude practice sets', done: true },
      { text: 'Data Structures revision', done: true },
      { text: 'OS & DBMS concepts', done: false },
      { text: 'Communication practice', done: false },
      { text: 'Mock interview round', done: false },
    ],
  },
  {
    id: 'infosys',
    name: 'Infosys',
    industry: 'IT Services',
    packageRange: '₹3.6 – 6.5 LPA',
    cgpa: '6.0',
    rounds: 3,
    prepProgress: 45,
    eligibility: 'Min CGPA 6.0, No active backlogs',
    process: ['Online Test', 'Technical + HR', 'Offer'],
    pattern: '3 Coding (Easy), Aptitude, HR behavioral',
    faqs: [
      'Why do you want to join Infosys?',
      'Describe a challenging project you worked on.',
      'Explain the SDLC process.',
    ],
    checklist: [
      { text: 'InfyTQ certification', done: true },
      { text: 'Pseudo-code practice', done: false },
      { text: 'Aptitude test prep', done: false },
      { text: 'Verbal ability prep', done: false },
      { text: 'HR questions review', done: false },
    ],
  },
  {
    id: 'wipro',
    name: 'Wipro',
    industry: 'IT Services',
    packageRange: '₹3.5 – 6 LPA',
    cgpa: '6.0',
    rounds: 3,
    prepProgress: 30,
    eligibility: 'Min CGPA 6.0, No active backlogs',
    process: ['Online Assessment', 'Technical Interview', 'HR'],
    pattern: '2 Coding (Easy), Aptitude, Essay writing',
    faqs: [
      'What are your strengths and weaknesses?',
      'Explain polymorphism in Java.',
      'How do you handle pressure?',
    ],
    checklist: [
      { text: 'Coding basics', done: true },
      { text: 'Wipro previous papers', done: false },
      { text: 'Essay writing practice', done: false },
      { text: 'Technical fundamentals', done: false },
      { text: 'Mock test completion', done: false },
    ],
  },
  {
    id: 'google',
    name: 'Google',
    industry: 'Technology',
    packageRange: '₹18 – 25 LPA',
    cgpa: '7.0',
    rounds: 5,
    prepProgress: 60,
    eligibility: 'Min CGPA 7.0, No active backlogs',
    process: ['Online Test', 'Phone Screen', 'Technical Interview ×2', 'HR', 'Offer'],
    pattern: '2 DSA (Medium), 1 System Design, HR behavioral',
    faqs: [
      'Design a URL shortener system.',
      'Find the longest palindromic substring.',
      'How would you improve Google Maps?',
    ],
    checklist: [
      { text: 'LeetCode 200+ problems', done: true },
      { text: 'System Design basics', done: true },
      { text: 'Behavioral prep (STAR method)', done: true },
      { text: 'Mock coding interviews', done: false },
      { text: 'Google-specific prep guide', done: false },
    ],
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    industry: 'Technology',
    packageRange: '₹18 – 22 LPA',
    cgpa: '7.0',
    rounds: 4,
    prepProgress: 55,
    eligibility: 'Min CGPA 7.0, No active backlogs',
    process: ['Online Coding', 'Group Discussion', 'Technical Interview', 'HR'],
    pattern: '3 DSA (Medium-Hard), 1 System Design, Group Discussion',
    faqs: [
      'Design a parking lot system.',
      'Implement LRU Cache.',
      'Tell me about a time you led a team.',
    ],
    checklist: [
      { text: 'LeetCode Medium practice', done: true },
      { text: 'Group discussion prep', done: false },
      { text: 'System Design patterns', done: true },
      { text: 'Microsoft culture research', done: false },
      { text: 'Past interview experiences', done: false },
    ],
  },
  {
    id: 'amazon',
    name: 'Amazon',
    industry: 'Technology / E-commerce',
    packageRange: '₹20 – 28 LPA',
    cgpa: '7.0',
    rounds: 5,
    prepProgress: 40,
    eligibility: 'Min CGPA 7.0, No active backlogs',
    process: ['Online Assessment', 'Phone Screen', 'On-site ×2', 'Bar Raiser', 'Offer'],
    pattern: '3 DSA (Medium-Hard), Leadership Principles, System Design',
    faqs: [
      'Tell me about a time you disagreed with your manager.',
      'Design an e-commerce checkout system.',
      'Solve: Merge K Sorted Lists.',
    ],
    checklist: [
      { text: 'Leadership Principles study', done: true },
      { text: 'LeetCode Hard practice', done: false },
      { text: 'System Design deep dive', done: false },
      { text: 'Behavioral STAR stories', done: false },
      { text: 'Amazon OA practice', done: false },
    ],
  },
];

const companyInitials = {
  TCS: 'T',
  Infosys: 'I',
  Wipro: 'W',
  Google: 'G',
  Microsoft: 'M',
  Amazon: 'A',
};

const companyColors = {
  TCS: '#6C5CE7',
  Infosys: '#00CEC9',
  Wipro: '#FD79A8',
  Google: '#FDCB6E',
  Microsoft: '#74B9FF',
  Amazon: '#FF7675',
};

export default function CompanyPrep() {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [checklistState, setChecklistState] = useState({});

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const toggleChecklist = (companyId, idx) => {
    setChecklistState((prev) => {
      const key = `${companyId}-${idx}`;
      return { ...prev, [key]: !prev[key] };
    });
  };

  const isChecked = (companyId, idx, defaultDone) => {
    const key = `${companyId}-${idx}`;
    return key in checklistState ? checklistState[key] : defaultDone;
  };

  const filteredCompanies = companies.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page cp-page">
      {/* Header */}
      <header className="page-header">
        <button className="btn btn-icon btn-ghost" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h1>Company Preparation</h1>
        <button className="btn btn-icon btn-ghost">
          <Search size={20} />
        </button>
      </header>

      {/* Search */}
      <div className="input-icon-wrapper cp-search">
        <Search size={18} className="icon-left" />
        <input
          className="input"
          type="text"
          placeholder="Search companies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Upcoming Drives */}
      <section className="section">
        <div className="section-header">
          <h3 className="section-title">Upcoming Drives</h3>
          <span className="section-link">View All</span>
        </div>
        <div className="h-scroll cp-drives-scroll">
          {upcomingDrives.map((drive, idx) => (
            <div key={idx} className="cp-drive-card card-glass">
              <div
                className="cp-drive-avatar"
                style={{ background: companyColors[drive.company] }}
              >
                {companyInitials[drive.company]}
              </div>
              <h4 className="cp-drive-name">{drive.company}</h4>
              <div className="cp-drive-details">
                <span className="cp-drive-detail">
                  <Calendar size={12} />
                  {drive.date}
                </span>
                <span className="cp-drive-detail">
                  <Briefcase size={12} />
                  {drive.package}
                </span>
              </div>
              <span className={`chip ${drive.chipClass}`}>{drive.chipLabel}</span>
            </div>
          ))}
        </div>
      </section>

      {/* All Companies */}
      <section className="section">
        <div className="section-header">
          <h3 className="section-title">All Companies</h3>
          <span className="text-sm text-secondary">{filteredCompanies.length} companies</span>
        </div>
        <div className="cp-companies-list">
          {filteredCompanies.map((company, idx) => {
            const isExpanded = expandedId === company.id;
            return (
              <div
                key={company.id}
                className={`cp-company-card card stagger-${idx + 1} ${isExpanded ? 'cp-company-expanded' : ''}`}
              >
                <button
                  className="cp-company-header"
                  onClick={() => toggleExpand(company.id)}
                >
                  <div
                    className="cp-company-avatar"
                    style={{ background: companyColors[company.name] }}
                  >
                    {companyInitials[company.name]}
                  </div>
                  <div className="cp-company-info">
                    <h4>{company.name}</h4>
                    <div className="cp-company-tags">
                      <span className="chip chip-outline" style={{ fontSize: 'var(--font-xs)', padding: '3px 8px' }}>
                        {company.industry}
                      </span>
                      <span className="text-sm text-secondary">{company.packageRange}</span>
                    </div>
                  </div>
                  <div className="cp-company-meta">
                    <span className="cp-rounds">{company.rounds} rounds</span>
                    {isExpanded ? (
                      <ChevronDown size={18} className="cp-expand-icon" />
                    ) : (
                      <ChevronRight size={18} className="cp-expand-icon" />
                    )}
                  </div>
                </button>

                {/* Progress bar */}
                <div className="cp-company-progress">
                  <div className="cp-progress-header">
                    <span className="text-sm text-secondary">Prep Progress</span>
                    <span className="text-sm font-bold" style={{ color: 'var(--primary)' }}>
                      {company.prepProgress}%
                    </span>
                  </div>
                  <div className="progress-bar progress-bar-sm">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${company.prepProgress}%` }}
                    />
                  </div>
                </div>

                {/* Expanded Detail */}
                {isExpanded && (
                  <div className="cp-expanded-details">
                    <div className="divider" />

                    {/* Eligibility */}
                    <div className="cp-detail-block">
                      <h5 className="cp-detail-label">Eligibility</h5>
                      <p className="cp-detail-text">{company.eligibility}</p>
                    </div>

                    {/* Selection Process */}
                    <div className="cp-detail-block">
                      <h5 className="cp-detail-label">Selection Process</h5>
                      <div className="cp-process-steps">
                        {company.process.map((step, i) => (
                          <div key={i} className="cp-process-step">
                            <div className="cp-step-dot" />
                            <span>{step}</span>
                            {i < company.process.length - 1 && (
                              <div className="cp-step-connector" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Interview Pattern */}
                    <div className="cp-detail-block">
                      <h5 className="cp-detail-label">Interview Pattern</h5>
                      <p className="cp-detail-text">{company.pattern}</p>
                    </div>

                    {/* FAQs */}
                    <div className="cp-detail-block">
                      <h5 className="cp-detail-label">
                        <MessageSquare size={14} />
                        Frequently Asked Questions
                      </h5>
                      <div className="cp-faqs">
                        {company.faqs.map((q, i) => (
                          <div key={i} className="cp-faq-item">
                            <span className="cp-faq-num">{i + 1}</span>
                            <p>{q}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Checklist */}
                    <div className="cp-detail-block">
                      <h5 className="cp-detail-label">Preparation Checklist</h5>
                      <div className="cp-checklist">
                        {company.checklist.map((item, i) => {
                          const checked = isChecked(company.id, i, item.done);
                          return (
                            <button
                              key={i}
                              className={`cp-checklist-item ${checked ? 'cp-checked' : ''}`}
                              onClick={() => toggleChecklist(company.id, i)}
                            >
                              <span className="cp-check-box">
                                {checked && <Check size={14} />}
                              </span>
                              <span className={checked ? 'cp-checklist-done' : ''}>
                                {item.text}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Community */}
                    <div className="cp-detail-block">
                      <button className="btn btn-secondary btn-full cp-community-btn">
                        <Users size={16} />
                        View Previous Experiences
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
