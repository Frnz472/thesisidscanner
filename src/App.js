import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
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
import IDScanner from "./scenes/idscannerr";
import Login from "./scenes/loginpage";
import StudentManagement from "./scenes/studentmanage";

function App() {
  const [auth, setAuth] = useState(false);

  return (
    <div className="app">
      <main className="content">
        <Routes>
          {/* Always available routes */}
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/id-scanner" element={<IDScanner />} />

          {auth ? (
            <>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/attendancerecord" element={<Attendancerecord />} />
              <Route path="/studentmanagement" element={<StudentManagement/>}/>
              <Route path="/courses" element={<Courses />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/helps" element={<Helps />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/notification" element={<NotificationPanel />} />
              <Route path="/studentprof/:name" element={<StudentProfile />} />
              <Route path="/profile-settings" element={<ProfileSettings />} />
              <Route path="/notification-preferences" element={<NotificationPreferences />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </main>
    </div>
  );
}

export default App;