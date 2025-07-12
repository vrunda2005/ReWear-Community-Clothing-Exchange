import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/Landingpage';
import ItemDetail from './pages/ItemDetail'; 
import AddItem from './pages/AddItem'; // at the top
import AdminPanel from './pages/AdminPanel'; // Add this

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path='/' element={ } /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/list-item" element={<AddItem />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/item/:id" element={<ItemDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
