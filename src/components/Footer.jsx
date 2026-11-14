import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <span className="footer-star">✳</span>
          <h2>His life. His love. His legacy.</h2>
          <p>
            A place to remember, reflect, and celebrate a life cherished.
          </p>
        </div>

        <div className="footer-links">
          <Link to="/his-life">His Life</Link>
          <Link to="/gallery">Photo Gallery</Link>
          <Link to="/videos">Video Memories</Link>
          <Link to="/tributes">Tributes</Link>
          <Link to="/faith">Faith & Prayer</Link>
          <a href="/memorial-qr.png" download="peterson-memorial-qr.png">
            Download Memorial QR Code
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>Peterson Bundi Gachoki</span>
        <span>Remembered with love. Cherished forever.</span>
        <span className="production-credit">BY C-137</span>
      </div>
    </footer>
  );
}
