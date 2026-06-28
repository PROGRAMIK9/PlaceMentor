import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './splash.css';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding', { replace: true });
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <section className="splash">
      {/* Floating particle decorations */}
      <div className="splash-particles">
        <div className="splash-particle" />
        <div className="splash-particle" />
        <div className="splash-particle" />
        <div className="splash-particle" />
        <div className="splash-particle" />
        <div className="splash-particle" />
        <div className="splash-particle" />
        <div className="splash-particle" />
      </div>

      {/* Glow ring */}
      <div className="splash-glow" />

      {/* Logo */}
      <div className="splash-logo-container">
        <span className="splash-icon" role="img" aria-label="Graduation cap">🎓</span>
        <h1 className="splash-title">PlaceMentor</h1>
        <p className="splash-tagline">Your placement journey starts here</p>
      </div>
    </section>
  );
}
