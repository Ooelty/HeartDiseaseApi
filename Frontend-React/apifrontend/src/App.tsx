
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import HeartTest from './pages/HeartTest';
import HeartRiskPage from './pages/HeartRiskPage'; // Importez le nouveau composant

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route pour la page d'accueil/évaluation */}
        <Route path="/" element={<HeartRiskPage />} />
        
        {/* Routes existantes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/heart-test" element={<HeartTest />} />
        
        {/* Optionnel : Route de fallback */}
        <Route path="*" element={<HeartRiskPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;