import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import Blog from './components/Blog';
import Chatbot from './components/Dashboard/Chatbot';
import CampLoginRegister from './components/CampLoginRegister';
import Logout from './components/Logout';
import ProtectedRoutes from './components/ProtectedRoutes';
import RescueCampDashboard from './components/RescueCampDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoutes Component={UserDashboard} />} />
        <Route path="/user/blog" element={<Blog />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/camp-auth" element={<CampLoginRegister />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/camp-dashboard" element={<RescueCampDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
