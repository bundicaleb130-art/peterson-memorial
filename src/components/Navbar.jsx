import { NavLink } from 'react-router-dom';

const links = [
  ['Home', '/'],
  ['His Life', '/life'],
  ['Eulogy', '/eulogy'],
  ['Photos', '/gallery'],
  ['Videos', '/videos'],
  ['Tributes', '/tributes'],
  ['Faith', '/faith'],
];

export default function Navbar() {
  return (
    <header className="site-header">
      <NavLink to="/" className="brand">
        <span className="brand-icon">✳</span>
        <span>
          <strong>IN LOVING MEMORY</strong>
          <small>Peterson Bundi Gachoki</small>
        </span>
      </NavLink>

      <nav className="main-nav" aria-label="Main navigation">
        {links.map(([label, path]) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <NavLink to="/tributes" className="header-cta">
        Leave a Tribute <span>↗</span>
      </NavLink>
    </header>
  );
}
