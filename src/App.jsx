import './App.css';
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

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/his-life" element={<HisLife />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/tributes" element={<Tributes />} />
        <Route path="/faith" element={<Faith />} />
        <Route path="/eulogy" element={<Eulogy />} />

        <Route
          path="*"
          element={
            <main className="feature-page">
              <section className="page-intro">
                <h1>Page Not Found</h1>
                <p>This page is unavailable.</p>
                <a href="/" className="button button-dark">
                  Return Home
                </a>
              </section>
            </main>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
