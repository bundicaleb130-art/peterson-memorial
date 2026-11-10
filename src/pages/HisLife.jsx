import { Link } from 'react-router-dom';

export default function HisLife() {
  return (
    <main className="feature-page">
      <section className="page-intro">
        <span className="eyebrow">HIS STORY · HIS LEGACY</span>
        <h1>A Life Remembered</h1>
        <p>
          Honouring the life, memories, and lasting legacy of
          Peterson Bundi Gachoki.
        </p>
      </section>

      <section className="life-profile">
        <div className="life-portrait">
          <img
            src="/peterson-portrait.jpg"
            alt="Peterson Bundi Gachoki"
          />
        </div>

        <div className="life-details">
          <span className="eyebrow">IN LOVING MEMORY</span>
          <h2>Peterson Bundi Gachoki</h2>
          <p className="life-dates">3 August 1968 – In Loving Memory</p>
          <p>
            This page is dedicated to preserving his story and celebrating
            the memories shared by his family, friends, and community.
          </p>
          <p>
            His biography will be completed with the family's own words,
            memories, milestones, and reflections.
          </p>
        </div>
      </section>

      <section className="life-story-section">
        <h2>His Story</h2>
        <p>
          Every life holds a story worth preserving. This space will share
          his journey, the people who mattered to him, and the moments
          that shaped his life.
        </p>
        <p className="content-pending">
          Family biography to be added.
        </p>
      </section>

      <section className="life-story-section">
        <h2>Memories That Live On</h2>
        <p>
          The stories, lessons, laughter, and moments shared with him
          remain part of the legacy he leaves behind.
        </p>
        <Link className="text-link" to="/tributes">
          Share a memory →
        </Link>
      </section>

      <section className="life-story-section">
        <h2>Celebrate His Life</h2>
        <div className="life-links">
          <Link to="/gallery">View photographs</Link>
          <Link to="/videos">Watch video memories</Link>
          <Link to="/event-day">Event information</Link>
        </div>
      </section>
    </main>
  );
}
