import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Map, Users, Bell, User } from 'lucide-react';

const studentNav = [
  { path: '/home', icon: Home, label: 'Home' },
  { path: '/roadmap', icon: Map, label: 'Roadmap' },
  { path: '/community', icon: Users, label: 'Community' },
  { path: '/notifications', icon: Bell, label: 'Alerts' },
  { path: '/profile', icon: User, label: 'Profile' },
];

const mentorNav = [
  { path: '/mentor', icon: Home, label: 'Dashboard' },
  { path: '/roadmap', icon: Map, label: 'Roadmap' },
  { path: '/community', icon: Users, label: 'Community' },
  { path: '/notifications', icon: Bell, label: 'Alerts' },
  { path: '/profile', icon: User, label: 'Profile' },
];

const coordinatorNav = [
  { path: '/coordinator', icon: Home, label: 'Dashboard' },
  { path: '/community', icon: Users, label: 'Community' },
  { path: '/notifications', icon: Bell, label: 'Alerts' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export default function BottomNav({ role = 'student' }) {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = role === 'mentor' ? mentorNav : role === 'coordinator' ? coordinatorNav : studentNav;

  return (
    <nav className="bottom-nav" role="navigation" aria-label="Main navigation">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
        const Icon = item.icon;
        return (
          <button
            key={item.path}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
