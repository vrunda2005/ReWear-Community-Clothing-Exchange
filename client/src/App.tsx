import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/Landingpage';
import SwapSwiper from './pages/swapswiper';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path='/' element={ } /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/swap" element={<SwapSwiper />} />
      </Routes>
    </Router>
  );
}

export default App;
