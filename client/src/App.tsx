import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/Landingpage';
import ItemDetail from './pages/ItemDetail';
import AddItem from './pages/AddItem'; // at the top
import AdminPanel from './pages/AdminPanel'; // Add this


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/list-item" element={
            <ProtectedRoute>
              <AddItem />
            </ProtectedRoute>
          } />
          <Route path="/item/:id" element={
            <ProtectedRoute>
              <ItemDetail />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
