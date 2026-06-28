import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Code2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './login.css';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name: 'Arjun Mehta', email: 'arjun@college.edu' });
    navigate('/role-select');
  };

  return (
    <section className="login">
      {/* Logo */}
      <div className="login-logo">
        <span className="login-logo-icon" role="img" aria-label="Graduation cap">🎓</span>
        <span className="login-logo-text">PlaceMentor</span>
      </div>

      {/* Heading */}
      <h1 className="login-heading">Welcome Back</h1>
      <p className="login-subheading">Sign in to continue your journey</p>

      {/* Form */}
      <form className="login-form" onSubmit={handleSubmit}>
        {/* Email */}
        <div className="login-input-group">
          <label htmlFor="login-email">Email</label>
          <div className="login-input-wrapper">
            <Mail size={18} className="input-icon" />
            <input
              id="login-email"
              type="email"
              placeholder="you@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
        </div>

        {/* Password */}
        <div className="login-input-group">
          <label htmlFor="login-password">Password</label>
          <div className="login-input-wrapper">
            <Lock size={18} className="input-icon" />
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="login-password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Forgot password */}
        <div className="login-forgot">
          <a href="#forgot">Forgot Password?</a>
        </div>

        {/* Sign In */}
        <button type="submit" className="login-submit">
          Sign In
        </button>
      </form>

      {/* Divider */}
      <div className="login-divider">
        <span>or continue with</span>
      </div>

      {/* Social buttons */}
      <div className="login-socials">
        <button type="button" className="login-social-btn">
          {/* Google icon — inline SVG for brand accuracy */}
          <svg className="social-icon-google" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.97 10.97 0 0 0 1 12c0 1.77.42 3.44 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </button>
        <button type="button" className="btn btn-outline social-btn">
          <Code2 size={20} />
          GitHub
        </button>
      </div>

      {/* Footer */}
      <p className="login-footer">
        Don&apos;t have an account?{' '}
        <Link to="/signup">Sign Up</Link>
      </p>
    </section>
  );
}
