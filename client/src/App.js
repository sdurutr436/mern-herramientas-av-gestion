import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CorreoPage from './pages/CorreoPage';
import ContactosPage from './pages/ContactosPage';
import MapaCalorPage from './pages/MapaCalorPage';
import ApartamentosPage from './pages/ApartamentosPage';
import PorQueCierraPage from './pages/PorQueCierraPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/correo" element={<CorreoPage />} />
        <Route path="/contactos" element={<ContactosPage />} />
        <Route path="/mapa" element={<MapaCalorPage />} />
        <Route path="/apartamentos" element={<ApartamentosPage />} />
        <Route path="/por-que-cierra" element={<PorQueCierraPage />} />
      </Routes>
    </Router>
  );
}

export default App;
