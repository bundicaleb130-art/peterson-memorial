import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import HisLife from './pages/HisLife';
import Gallery from './pages/Gallery';
import Videos from './pages/Videos';
import Tributes from './pages/Tributes';
import Faith from './pages/Faith';
import Eulogy from './pages/Eulogy';
import './App.css';

function ComingSoon({ title, description }) {
  return (
    <main className="coming-soon">
      <span className="eyebrow">THE MEMORIAL COLLECTION</span>
      <h1>{title}</h1>
      <div className="gold-rule" />
      <p>{description}</p>
      <p className="coming-note">
        This section is being prepared. Family-approved content will be
        added here as it becomes available.
      </p>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/life" element={<HisLife />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/tributes" element={<Tributes />} />
          <Route path="/faith" element={<Faith />} />
          <Route path="/eulogy" element={<Eulogy />} />
          <Route
            path="/admin"
            element={
              <ComingSoon
                title="Family Administration"
                description="A workspace for reviewing memorial submissions."
              />
            }
          />
          <Route
            path="*"
            element={
              <ComingSoon
                title="Page not found"
                description="This page does not exist in the memorial."
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
