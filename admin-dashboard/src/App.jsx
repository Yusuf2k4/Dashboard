import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import HomePage from "./pages/HomePage.jsx";
import PlayersPage from "./pages/PlayersPage.jsx";
import AddPlayer from "./components/AddPlayers/AddPlayer.jsx";
import LeaguePage from "./pages/LeaguePage.jsx";
import UCLpage from "./pages/UCLpage.jsx";
import { AuthProvider, useAuth } from "./auth/Auth.jsx"; // Import AuthContext

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/matches/league" />;
};

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  return user?.role === "admin" ? children : <Navigate to="/matches/league" />;
};

const App = () => {
  return (
    <div className="bg-[#222222] min-h-screen">
      <Router>
        <AuthProvider>
          <Sidebar>
            <Routes>
              <Route path="/home" element={<AdminRoute><HomePage /></AdminRoute>} />
              <Route path="/players" element={<AdminRoute><PlayersPage /></AdminRoute>} />
              <Route path="/add-players" element={<AdminRoute><AddPlayer /></AdminRoute>} />
              <Route path="/matches/league" element={<ProtectedRoute><LeaguePage /></ProtectedRoute>} />
              <Route path="/matches/ucl" element={<ProtectedRoute><UCLpage /></ProtectedRoute>} />
              <Route path="/" element={<Navigate to="/matches/league" />} />
            </Routes>
          </Sidebar>
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;
