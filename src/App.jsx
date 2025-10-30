import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '/src/pages/HomePage.jsx';
import AboutUsPage from '/src/pages/AboutUsPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
