import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Building, GraduationCap, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './signup.css';

const branches = [
  'Computer Science',
  'Information Technology',
  'Electronics & Communication',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Data Science',
];

const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: '',
    email: '',
    college: '',
    branch: '',
    year: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      name: form.name || 'New User',
      email: form.email || 'user@college.edu',
    });
    navigate('/role-select');
  };

  return (
    <section className="signup">
      {/* Header */}
      <div className="signup-header">
        <div className="signup-header-icon">
          <GraduationCap size={28} />
        </div>
        <h1 className="signup-heading">Create Account</h1>
        <p className="signup-subheading">Join PlaceMentor and start preparing</p>
      </div>

      {/* Form */}
      <form className="signup-form" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="signup-input-group">
          <label htmlFor="signup-name">Full Name</label>
          <div className="signup-input-wrapper">
            <User size={18} className="input-icon" />
            <input
              id="signup-name"
              type="text"
              placeholder="Arjun Mehta"
              value={form.name}
              onChange={update('name')}
              autoComplete="name"
            />
          </div>
        </div>

        {/* Email */}
        <div className="signup-input-group">
          <label htmlFor="signup-email">Email</label>
          <div className="signup-input-wrapper">
            <Mail size={18} className="input-icon" />
            <input
              id="signup-email"
              type="email"
              placeholder="you@college.edu"
              value={form.email}
              onChange={update('email')}
              autoComplete="email"
            />
          </div>
        </div>

        {/* College Name */}
        <div className="signup-input-group">
          <label htmlFor="signup-college">College Name</label>
          <div className="signup-input-wrapper">
            <Building size={18} className="input-icon" />
            <input
              id="signup-college"
              type="text"
              placeholder="IIIT Hyderabad"
              value={form.college}
              onChange={update('college')}
            />
          </div>
        </div>

        {/* Branch & Year — side by side */}
        <div className="signup-row">
          <div className="signup-input-group">
            <label htmlFor="signup-branch">Branch</label>
            <div className="signup-input-wrapper">
              <GraduationCap size={18} className="input-icon" />
              <select
                id="signup-branch"
                value={form.branch}
                onChange={update('branch')}
              >
                <option value="" disabled>
                  Select
                </option>
                {branches.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="signup-input-group">
            <label htmlFor="signup-year">Year</label>
            <div className="signup-input-wrapper">
              <GraduationCap size={18} className="input-icon" />
              <select
                id="signup-year"
                value={form.year}
                onChange={update('year')}
              >
                <option value="" disabled>
                  Select
                </option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Password */}
        <div className="signup-input-group">
          <label htmlFor="signup-password">Password</label>
          <div className="signup-input-wrapper">
            <Lock size={18} className="input-icon" />
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
              value={form.password}
              onChange={update('password')}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="signup-password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button type="submit" className="signup-submit">
          Create Account
        </button>
      </form>

      {/* Footer */}
      <p className="signup-footer">
        Already have an account?{' '}
        <Link to="/login">Sign In</Link>
      </p>
    </section>
  );
}
