import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Attendancerecord from "./scenes/attendancerecord";
import Settings from "./scenes/settings";
import Helps from "./scenes/helps";
import Courses from "./scenes/courses";
import Profile from "./scenes/profile";
import NotificationPanel from "./scenes/notification";
import StudentProfile from "./scenes/studentprof";
import ProfileSettings from "./scenes/profilesettings"; 
import NotificationPreferences from "./scenes/notificationpref";

function App() {
  return (
    <div className="app"> 
      <main className="content">
        <Routes>

          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/attendancerecord" element={<Attendancerecord />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/helps" element={<Helps />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notification" element={<NotificationPanel />} />
          <Route path="/studentprof/:name" element={<StudentProfile />} />
          <Route path="/profile-settings" element={<ProfileSettings />} />
          <Route path="/notification-preferences" element={<NotificationPreferences/>}/>

        </Routes>
      </main>
    </div>
  );
}

export default App;