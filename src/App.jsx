import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '/src/pages/HomePage.jsx';
import AboutUsPage from '/src/pages/AboutUsPage.jsx';
import ContactPage from '/src/pages/ContactPage.jsx';
import FacturacionDigitalPage from '/src/pages/FacturacionDigitalPage.jsx';
import CondominioPage from '/src/pages/CondominioPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/facturacion-digital" element={<FacturacionDigitalPage />} />
        <Route path="/condominio" element={<CondominioPage />} />
      </Routes>
    </Router>
  );
}

export default App;
