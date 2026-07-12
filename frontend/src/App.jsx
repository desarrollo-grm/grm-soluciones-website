import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '/src/pages/HomePage.jsx';
import AboutUsPage from '/src/pages/AboutUsPage.jsx';
import ContactPage from '/src/pages/ContactPage.jsx';
import FacturacionDigitalPage from '/src/pages/FacturacionDigitalPage.jsx';
import CondominioPage from '/src/pages/CondominioPage.jsx';
import SoportePage from '/src/pages/SoportePage.jsx';
import Blog from '/src/pages/Blog.jsx';
import BlogPost from '/src/pages/BlogPost.jsx';
import UnsubscribeSuccessPage from '/src/pages/UnsubscribeSuccessPage.jsx';
import ScrollToTop from '/src/components/commons/ScrollToTop.jsx';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/facturacion-digital" element={<FacturacionDigitalPage />} />
        <Route path="/condominio" element={<CondominioPage />} />
        <Route path="/soporte" element={<SoportePage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/unsubscribed-success" element={<UnsubscribeSuccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;
