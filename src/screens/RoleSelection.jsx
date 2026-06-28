import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users, BarChart3, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './role-selection.css';

const roles = [
  {
    id: 'student',
    name: 'Student',
    description: 'Get mentored by seniors, access resources, and prepare for placements',
    icon: GraduationCap,
    variant: 'primary',
    route: '/home',
  },
  {
    id: 'mentor',
    name: 'Mentor',
    description: 'Guide 5-6 juniors through the semester with weekly sessions and resources',
    icon: Users,
    variant: 'accent',
    route: '/mentor',
  },
  {
    id: 'coordinator',
    name: 'Placement Coordinator',
    description: 'Manage mentoring programs, track progress, and coordinate placement drives',
    icon: BarChart3,
    variant: 'warm',
    route: '/coordinator',
  },
];

export default function RoleSelection() {
  const navigate = useNavigate();
  const { selectRole } = useAuth();

  const handleRoleSelect = (role) => {
    selectRole(role.id);
    navigate(role.route);
  };

  return (
    <div className="role-selection">
      <header className="role-selection__header">
        <div className="role-selection__icon-row">
          <span className="role-selection__logo-dot" />
          <span className="role-selection__logo-dot" />
          <span className="role-selection__logo-dot" />
        </div>
        <h1 className="role-selection__title">Choose Your Role</h1>
        <p className="role-selection__subtitle">
          Select how you'll use PlaceMentor
        </p>
      </header>

      <div className="role-selection__cards">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <button
              key={role.id}
              className={`role-card role-card--${role.variant}`}
              onClick={() => handleRoleSelect(role)}
              aria-label={`Select ${role.name} role`}
            >
              <div className={`role-card__icon role-card__icon--${role.variant}`}>
                <Icon size={26} />
              </div>

              <div className="role-card__content">
                <h2 className="role-card__name">{role.name}</h2>
                <p className="role-card__description">{role.description}</p>
              </div>

              <ChevronRight size={20} className="role-card__arrow" />
            </button>
          );
        })}
      </div>

      <footer className="role-selection__footer">
        <p className="role-selection__footer-text">
          You can change your role later in Settings
        </p>
      </footer>
    </div>
  );
}
