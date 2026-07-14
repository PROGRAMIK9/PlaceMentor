import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import BottomNav from './components/BottomNav';

/* Onboarding & Auth */
import Splash from './screens/Splash';
import Onboarding from './screens/Onboarding';
import Login from './screens/Login';
import Signup from './screens/Signup';
import RoleSelection from './screens/RoleSelection';

/* Student Screens */
import StudentHome from './screens/StudentHome';
import Roadmap from './screens/Roadmap';
import RoadmapModule from './screens/RoadmapModule';
import StudentProgress from './screens/StudentProgress';
import AIAssistant from './screens/AIAssistant';
import Community from './screens/Community';
import MockInterview from './screens/MockInterview';
import ResumeBuilder from './screens/ResumeBuilder';
import CompanyPrep from './screens/CompanyPrep';
import Calendar from './screens/Calendar';
import Notifications from './screens/Notifications';
import Profile from './screens/Profile';
import Settings from './screens/Settings';

/* Mentor Screens */
import MentorDashboard from './screens/MentorDashboard';

/* Coordinator Screens */
import CoordinatorDashboard from './screens/CoordinatorDashboard';

function AppContent() {
  const { user } = useAuth();
  const location = useLocation();

  const hideNavPaths = ['/', '/onboarding', '/login', '/signup', '/role-select', '/ai-assistant'];
  const showNav = user && user.role && !hideNavPaths.includes(location.pathname);

  return (
    <div className="app-container">
      <Routes>
        {/* Onboarding */}
        <Route path="/" element={<Splash />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/role-select" element={<RoleSelection />} />

        {/* Student */}
        <Route path="/home" element={<StudentHome />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/roadmap/:moduleId" element={<RoadmapModule />} />
        <Route path="/progress" element={<StudentProgress />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
        <Route path="/community" element={<Community />} />
        <Route path="/mock-interview" element={<MockInterview />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/company-prep" element={<CompanyPrep />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />

        {/* Mentor */}
        <Route path="/mentor" element={<MentorDashboard />} />

        {/* Coordinator */}
        <Route path="/coordinator" element={<CoordinatorDashboard />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {showNav && <BottomNav role={user?.role} />}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
