import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import "./index.css";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>

      {/* Public Route */}
      <Route path="/" element={<Landing />} />

      {/* Protected Home */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* Protected Profile */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}