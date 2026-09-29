import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import HomePage from '/src/pages/HomePage.jsx';
import AboutUsPage from '/src/pages/AboutUsPage.jsx';
import ContactPage from '/src/pages/ContactPage.jsx';
import FacturacionDigitalPage from '/src/pages/FacturacionDigitalPage.jsx';
import EquiposMaquinasFiscalesPage from '/src/pages/EquiposMaquinasFiscalesPage.jsx';
import CondominioPage from '/src/pages/CondominioPage.jsx';
import SoportePage from '/src/pages/SoportePage.jsx';
import Blog from '/src/pages/Blog.jsx';
import BlogPost from '/src/pages/BlogPost.jsx';
import UnsubscribePage from '/src/pages/UnsubscribePage.jsx';
import UnsubscribeSuccessPage from '/src/pages/UnsubscribeSuccessPage.jsx';
import ScrollToTop from '/src/components/commons/ScrollToTop.jsx';

import '/src/styles/main.css';

function App() {
  return (
    < GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/facturacion-digital" element={<FacturacionDigitalPage />} />
          <Route path="/equipos-maquinas-fiscales" element={<EquiposMaquinasFiscalesPage />} />
          <Route path="/condominio" element={<CondominioPage />} />
          <Route path="/soporte" element={<SoportePage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/unsubscribe" element={<UnsubscribePage />} />
          <Route path="/unsubscribed-success" element={<UnsubscribeSuccessPage />} />
        </Routes>
      </Router>
    </GoogleReCaptchaProvider>
  );
}

export default App;
