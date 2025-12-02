import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import ToastContainer from './molecules/ToastContainer';
import HomePage from './pages/HomePage';
import CorreoPage from './pages/CorreoPage';
import ContactosPage from './pages/ContactosPage';
import MapaCalorPage from './pages/MapaCalorPage';
import ApartamentosPage from './pages/ApartamentosPage';

function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/correo" element={<CorreoPage />} />
          <Route path="/contactos" element={<ContactosPage />} />
          <Route path="/mapa" element={<MapaCalorPage />} />
          <Route path="/apartamentos" element={<ApartamentosPage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </ToastProvider>
  );
}

export default App;
