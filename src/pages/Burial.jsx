import { Link } from 'react-router-dom';

export default function Burial() {
  return (
    <main className="feature-page burial-page">
      <section className="page-intro">
        <span className="eyebrow">FAREWELL · REMEMBRANCE · LEGACY</span>
        <h1>Burial Information</h1>
        <p>
          Details for family, friends, and all those gathering
          to honour the life of Peterson Bundi Gachoki.
        </p>
      </section>

      <section className="burial-date-card">
        <span className="eyebrow">THE FINAL FAREWELL</span>
        <div className="burial-date">
          <span>WEDNESDAY</span>
          <strong>11</strong>
          <span>NOVEMBER 2026</span>
        </div>
        <p>
          A time to gather in love, share memories, and honour
          a life that will always remain part of us.
        </p>
      </section>

      <section className="burial-venue">
        <div className="burial-venue-number">01</div>
        <div>
          <span className="eyebrow">SERVICE VENUE</span>
          <h2>Links Preparatory School Grounds</h2>
          <p>
            The burial gathering will take place at Links Preparatory
            School grounds on Wednesday, 11 November 2026.
          </p>
          <a
            className="burial-map-link"
            href="https://www.google.com/maps/search/?api=1&query=Links+Preparatory+School+Kirinyaga+Kenya"
            target="_blank"
            rel="noreferrer"
          >
            Find venue on Google Maps ↗
          </a>
        </div>
      </section>

      <section className="burial-venue">
        <div className="burial-venue-number">02</div>
        <div>
          <span className="eyebrow">FINAL RESTING PLACE</span>
          <h2>Family Home, Kiangurwe</h2>
          <p>
            Following the service, Peterson Bundi Gachoki will be laid
            to rest at the family home in Kiangurwe, Kirinyaga, Kenya.
          </p>
          <a
            className="burial-map-link"
            href="https://www.google.com/maps/search/?api=1&query=Kiangurwe+Kirinyaga+Kenya"
            target="_blank"
            rel="noreferrer"
          >
            Find Kiangurwe on Google Maps ↗
          </a>
        </div>
      </section>

      <section className="burial-programme">
        <span className="eyebrow">ORDER OF EVENTS</span>
        <h2>Service Programme</h2>
        <p>
          The confirmed programme, arrival instructions, and service
          times will be published here when provided by the family.
        </p>
        <div className="burial-pending">
          Programme and exact times awaiting family confirmation.
        </div>
      </section>

      <section className="burial-note">
        <h2>For Family and Friends</h2>
        <p>
          Please confirm travel arrangements and event timings with
          the family before setting out. Map search results may not
          identify the exact entrance or private family home.
        </p>
        <Link to="/event-day">View Event Day information →</Link>
      </section>
    </main>
  );
}
