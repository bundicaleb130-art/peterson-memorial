import { useState } from 'react';

export default function EventDay() {
  const [streamUrl, setStreamUrl] = useState('');
  const [locationUrl, setLocationUrl] = useState('');

  return (
    <main className="feature-page event-page">
      <span className="eyebrow">FAMILY ANNOUNCEMENTS & SERVICE DETAILS</span>
      <h1>Memorial Event Day</h1>
      <p className="feature-lead">
        Tuesday, 10 November and Wednesday, 11 November 2026.
        Important information for family, friends and everyone attending.
      </p>

      <section className="event-alert">
        <span className="eyebrow">PLEASE NOTE</span>
        <h2>Check here for the latest arrangements.</h2>
        <p>
          The programme, exact times, meeting points and live links
          will be published once confirmed by the family.
        </p>
      </section>

      <div className="event-grid">
        <article className="event-card">
          <span className="eyebrow">TUESDAY · 10 NOVEMBER</span>
          <h2>Family Preparations</h2>
          <p>Updates and confirmed arrangements will appear here.</p>
          <ul>
            <li>Gathering details: to be confirmed</li>
            <li>Programme: to be confirmed</li>
            <li>Announcements: check for family updates</li>
          </ul>
        </article>

        <article className="event-card">
          <span className="eyebrow">WEDNESDAY · 11 NOVEMBER</span>
          <h2>Burial Service</h2>
          <p><strong>Venue:</strong> Links Preparatory School grounds</p>
          <p><strong>Final resting place:</strong> Family home, Kiangurwe, Kirinyaga, Kenya.</p>
          <p>Service start time and detailed programme: to be confirmed.</p>
        </article>
      </div>

      <section className="event-card">
        <span className="eyebrow">LOCATION & DIRECTIONS</span>
        <h2>Find the gathering</h2>
        <p>
          Open a map search for the venue. Confirm the exact pin with
          the family before travelling.
        </p>
        <a
          className="button button-dark"
          href="https://www.google.com/maps/search/?api=1&query=Links+Preparatory+School+Kenya"
          target="_blank"
          rel="noreferrer"
        >
          Open venue map ↗
        </a>

        <label className="event-input">
          Confirmed live location link (optional)
          <input value={locationUrl}
            onChange={e => setLocationUrl(e.target.value)}
            placeholder="Paste a Google Maps sharing link" />
        </label>
        <p>
          {/^https:\/\/(maps\.app\.goo\.gl|www\.google\.com\/maps|maps\.google\.com)\//i.test(locationUrl)
            ? <a href={locationUrl} target="_blank" rel="noreferrer">Open shared location ↗</a>
            : 'The live location link will appear here once a valid Google Maps link is entered.'}
        </p>
      </section>

      <section className="event-card">
        <span className="eyebrow">WATCH FROM ANYWHERE</span>
        <h2>Livestream</h2>
        <p>
          A livestream is being considered. The link will be added here
          if the family confirms that streaming will be available.
        </p>
        <label className="event-input">
          Confirmed livestream URL (test preview)
          <input value={streamUrl}
            onChange={e => setStreamUrl(e.target.value)}
            placeholder="Paste the confirmed YouTube or livestream link" />
        </label>
        {/^https:\/\/(www\.)?(youtube\.com|youtu\.be)\//i.test(streamUrl) ? (
          <a className="button button-dark"
            href={streamUrl} target="_blank" rel="noreferrer">
            Open livestream ↗
          </a>
        ) : (
          <p className="feature-note">No livestream has been confirmed yet.</p>
        )}
      </section>

      <section className="event-card">
        <span className="eyebrow">PROGRAMME OF THE DAY</span>
        <h2>Service schedule</h2>
        <p>
          Times and activities will be listed here when the family confirms
          the official programme. No times have been assumed.
        </p>
      </section>
    </main>
  );
}
