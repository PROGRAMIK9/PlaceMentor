import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import {
  ArrowLeft,
  Moon,
  Type,
  Bell,
  CalendarClock,
  BookMarked,
  Building2,
  Eye,
  Radio,
  UserRound,
  UserCog,
  Lock,
  Link2,
  HelpCircle,
  MessageSquareHeart,
  Star,
  Info,
  LogOut,
  Trash2,
  ChevronRight,
} from 'lucide-react';
import './settings.css';

function ToggleSwitch({ on, onChange }) {
  return (
    <button
      className={`toggle-switch ${on ? 'toggle-switch--on' : ''}`}
      onClick={() => onChange(!on)}
      role="switch"
      aria-checked={on}
    >
      <span className="toggle-switch__knob" />
    </button>
  );
}

function SettingToggleItem({ icon: Icon, label, on, onChange }) {
  return (
    <div className="setting-item">
      <div className="setting-item__left">
        <Icon size={18} className="setting-item__icon" />
        <span>{label}</span>
      </div>
      <ToggleSwitch on={on} onChange={onChange} />
    </div>
  );
}

function SettingNavItem({ icon: Icon, label, value, onClick }) {
  return (
    <button className="setting-item setting-item--nav" onClick={onClick}>
      <div className="setting-item__left">
        <Icon size={18} className="setting-item__icon" />
        <span>{label}</span>
      </div>
      <div className="setting-item__right">
        {value && <span className="setting-item__value">{value}</span>}
        <ChevronRight size={16} className="setting-item__chevron" />
      </div>
    </button>
  );
}

export default function Settings() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [pushNotifs, setPushNotifs] = useState(true);
  const [sessionReminders, setSessionReminders] = useState(true);
  const [resourceUpdates, setResourceUpdates] = useState(true);
  const [placementAlerts, setPlacementAlerts] = useState(true);
  const [showOnline, setShowOnline] = useState(true);
  const [anonPosting, setAnonPosting] = useState(false);

  return (
    <div className="settings-screen page">
      {/* Header */}
      <header className="settings-header">
        <button className="btn btn-ghost btn-icon" onClick={() => navigate(-1)} aria-label="Go back">
          <ArrowLeft size={22} />
        </button>
        <h1>Settings</h1>
        <div style={{ width: 40 }} />
      </header>

      {/* Appearance */}
      <section className="settings-section">
        <h3 className="settings-section__title">Appearance</h3>
        <div className="settings-card">
          <SettingToggleItem
            icon={Moon}
            label="Dark Mode"
            on={theme === 'dark'}
            onChange={toggleTheme}
          />
          <SettingNavItem icon={Type} label="Font Size" value="Normal" />
        </div>
      </section>

      {/* Notifications */}
      <section className="settings-section">
        <h3 className="settings-section__title">Notifications</h3>
        <div className="settings-card">
          <SettingToggleItem
            icon={Bell}
            label="Push Notifications"
            on={pushNotifs}
            onChange={setPushNotifs}
          />
          <SettingToggleItem
            icon={CalendarClock}
            label="Session Reminders"
            on={sessionReminders}
            onChange={setSessionReminders}
          />
          <SettingToggleItem
            icon={BookMarked}
            label="Resource Updates"
            on={resourceUpdates}
            onChange={setResourceUpdates}
          />
          <SettingToggleItem
            icon={Building2}
            label="Placement Alerts"
            on={placementAlerts}
            onChange={setPlacementAlerts}
          />
        </div>
      </section>

      {/* Privacy */}
      <section className="settings-section">
        <h3 className="settings-section__title">Privacy</h3>
        <div className="settings-card">
          <SettingNavItem icon={Eye} label="Profile Visibility" value="Everyone" />
          <SettingToggleItem
            icon={Radio}
            label="Show Online Status"
            on={showOnline}
            onChange={setShowOnline}
          />
          <SettingToggleItem
            icon={UserRound}
            label="Anonymous Posting"
            on={anonPosting}
            onChange={setAnonPosting}
          />
        </div>
      </section>

      {/* Account */}
      <section className="settings-section">
        <h3 className="settings-section__title">Account</h3>
        <div className="settings-card">
          <SettingNavItem icon={UserCog} label="Edit Profile" />
          <SettingNavItem icon={Lock} label="Change Password" />
          <SettingNavItem icon={Link2} label="Linked Accounts" />
        </div>
      </section>

      {/* Support */}
      <section className="settings-section">
        <h3 className="settings-section__title">Support</h3>
        <div className="settings-card">
          <SettingNavItem icon={HelpCircle} label="Help Center" />
          <SettingNavItem icon={MessageSquareHeart} label="Send Feedback" />
          <SettingNavItem icon={Star} label="Rate the App" />
          <SettingNavItem icon={Info} label="About PlaceMentor" />
        </div>
      </section>

      {/* Danger Zone */}
      <section className="settings-section settings-danger">
        <h3 className="settings-section__title">Danger Zone</h3>
        <button
          className="btn btn-full btn-lg settings-logout-btn"
          onClick={() => navigate('/')}
        >
          <LogOut size={18} />
          Logout
        </button>
        <button className="settings-delete-link">
          <Trash2 size={14} />
          Delete Account
        </button>
      </section>
    </div>
  );
}
