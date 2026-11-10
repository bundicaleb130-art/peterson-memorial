import { Link } from 'react-router-dom';

export default function Faith() {
  return (
    <main className="feature-page faith-page">
      <section className="page-intro">
        <span className="eyebrow">FAITH · HOPE · ETERNAL LOVE</span>
        <h1>Faith & Prayer</h1>
        <p>
          A quiet space for reflection, prayer, gratitude, and comfort
          as we honour the life of Peterson Bundi Gachoki.
        </p>
      </section>

      <section className="faith-feature">
        <span className="faith-symbol" aria-hidden="true">✳</span>
        <p className="faith-quote">
          A life remembered with love leaves a legacy that time cannot erase.
        </p>
        <span className="eyebrow">IN LOVING REMEMBRANCE</span>
      </section>

      <section className="faith-section">
        <span className="eyebrow">SCRIPTURE</span>
        <h2>A Word of Comfort</h2>
        <p>
          This space is reserved for the Bible verse chosen by the family
          to reflect his faith and bring comfort to those remembering him.
        </p>
        <p className="faith-pending">Family-selected scripture to be added.</p>
      </section>

      <section className="faith-section">
        <span className="eyebrow">PRAYER</span>
        <h2>A Moment of Reflection</h2>
        <p>
          May family and friends find strength in one another, comfort in
          the memories they share, and peace in the love that remains.
          May every remembrance bring gratitude for the time shared and
          hope for the days ahead.
        </p>
      </section>

      <section className="faith-section">
        <span className="eyebrow">REMEMBER TOGETHER</span>
        <h2>Keep His Memory Close</h2>
        <p>
          Share a personal message, a cherished memory, or words of
          encouragement with the family.
        </p>
        <Link className="faith-button" to="/tributes">
          Leave a Tribute
        </Link>
      </section>
    </main>
  );
}
