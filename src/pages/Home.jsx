import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [portrait, setPortrait] = useState('/peterson-portrait.jpg');
  const [portraitMessage, setPortraitMessage] = useState('');

  function handlePortraitChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setPortraitMessage('Please choose an image file.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setPortraitMessage('Choose an image smaller than 10 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();

      image.onload = () => {
        const canvas = document.createElement('canvas');
        const scale = Math.min(1, 1200 / image.width, 1600 / image.height);
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);

        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        const compressed = canvas.toDataURL('image/jpeg', 0.78);

        try {
          localStorage.setItem('petersonPortrait', compressed);
          setPortrait(compressed);
          setPortraitMessage('Portrait preview saved in this browser.');
        } catch {
          setPortrait(compressed);
          setPortraitMessage(
            'Preview active, but browser storage is full. Add the image to the project for permanent publishing.'
          );
        }
      };

      image.onerror = () => setPortraitMessage('Could not read that image.');
      image.src = reader.result;
    };

    reader.onerror = () => setPortraitMessage('Could not load that image.');
    reader.readAsDataURL(file);
  }

  return (
    <main>
      <section className="home-hero">
        <div className="hero-copy">
          <span className="eyebrow">A CELEBRATION OF LIFE</span>

          <h1>
            A beautiful life.
            <br />
            <em>A lasting legacy.</em>
          </h1>

          <div className="gold-rule" />

          <h2>Peterson Bundi Gachoki</h2>

          <p className="hero-date">3 August 1968</p>

          <p className="hero-description">
            Though a life cannot be measured in dates alone, the love we
            share, the memories we keep, and the lives we touch ensure
            that a legacy continues.
          </p>

          <div className="hero-buttons">
            <Link to="/his-life" className="button button-dark">
              Discover His Life <span>↗</span>
            </Link>
            <Link to="/gallery" className="button button-light">
              Explore Memories
            </Link>
          </div>

          <div className="hero-caption">
            <span className="caption-line" />
            <span>FOREVER PART OF OUR STORY</span>
          </div>
        </div>

        <div className="hero-art">
          <div className="portrait-frame">
            {portrait ? (
              <img
                className="hero-portrait-image"
                src={portrait}
                alt="Peterson Bundi Gachoki"
              />
            ) : (
              <div className="portrait-placeholder">
                <span className="portrait-symbol">✳</span>
                <span>HIS PORTRAIT</span>
                <small>Choose a family photograph below</small>
              </div>
            )}
            <div className="portrait-corner corner-tl" />
            <div className="portrait-corner corner-br" />
          </div>

          <div className="portrait-upload">
            <label htmlFor="portrait-file">Choose portrait</label>
            <input
              id="portrait-file"
              type="file"
              accept="image/*"
              onChange={handlePortraitChange}
            />
            {portraitMessage && <small role="status">{portraitMessage}</small>}
          </div>

          <div className="portrait-label">
            <span>IN REMEMBRANCE</span>
            <strong>Peterson Bundi Gachoki</strong>
          </div>

          <div className="floating-seal">A LIFE<br />CHERISHED</div>
        </div>
      </section>

      <section className="facts-strip">
        <div>
          <span className="fact-number">01</span>
          <span className="fact-label">A LIFE REMEMBERED</span>
        </div>
        <div>
          <span className="fact-number">02</span>
          <span className="fact-label">MEMORIES PRESERVED</span>
        </div>
        <div>
          <span className="fact-number">03</span>
          <span className="fact-label">A LEGACY CONTINUES</span>
        </div>
        <div>
          <span className="fact-number">04</span>
          <span className="fact-label">LOVE WITHOUT END</span>
        </div>
      </section>

      <section className="home-intro">
        <div className="intro-heading">
          <span className="eyebrow">MORE THAN A MEMORY</span>
          <h2>A legacy held<br />in many hearts.</h2>
        </div>

        <div className="intro-body">
          <p>
            This memorial brings together the people, photographs, stories,
            and prayers that help preserve Peterson's memory.
          </p>
          <p>
            Family and friends can explore his story and, once submissions
            are enabled, contribute their own memories to this shared tribute.
          </p>
          <Link to="/tributes" className="text-link">
            Share your remembrance <span>→</span>
          </Link>
        </div>
      </section>

      <section className="home-collections">
        <div className="section-heading-row">
          <div>
            <span className="eyebrow">EXPLORE THE MEMORIAL</span>
            <h2>Every memory matters.</h2>
          </div>
          <span className="section-index">01 — 04</span>
        </div>

        <div className="collection-grid">
          <Link to="/his-life" className="collection-card collection-life">
            <span className="collection-number">01 / HIS STORY</span>
            <div>
              <h3>A life remembered.</h3>
              <p>Discover his story, milestones, and legacy.</p>
              <span className="collection-arrow">↗</span>
            </div>
          </Link>

          <Link to="/gallery" className="collection-card collection-photos">
            <span className="collection-number">02 / PHOTOGRAPHS</span>
            <div>
              <h3>Moments preserved.</h3>
              <p>A visual collection of treasured memories.</p>
              <span className="collection-arrow">↗</span>
            </div>
          </Link>

          <Link to="/videos" className="collection-card collection-videos">
            <span className="collection-number">03 / VIDEO MEMORIES</span>
            <div>
              <h3>Stories in motion.</h3>
              <p>Keep meaningful moments close.</p>
              <span className="collection-arrow">↗</span>
            </div>
          </Link>

          <Link to="/tributes" className="collection-card collection-tributes">
            <span className="collection-number">04 / LEGACY WALL</span>
            <div>
              <h3>Words from the heart.</h3>
              <p>Tributes, condolences, and personal stories.</p>
              <span className="collection-arrow">↗</span>
            </div>
          </Link>
        </div>
      </section>

      <section className="home-burial">
        <div>
          <span className="eyebrow">TOGETHER IN REMEMBRANCE</span>
          <h2>Honouring his life.<br /><em>Celebrating his legacy.</em></h2>
        </div>

        <div className="burial-summary">
          <span className="fact-label">BURIAL SERVICE</span>
          <h3>Wednesday, 11 November 2026</h3>
          <p>Links Preparatory School grounds</p>
          <p>Final resting place: family home, Kiangurwe, Kirinyaga, Kenya.</p>
        </div>
      </section>

      <section className="home-faith">
        <span className="faith-symbol">✝</span>
        <span className="eyebrow">FAITH, HOPE & LOVE</span>
        <h2>Held in love.<br /><em>Remembered forever.</em></h2>
        <p>
          A dedicated space for the family's chosen scripture, prayers,
          and words of comfort.
        </p>
        <Link to="/faith" className="text-link">
          Visit Faith & Prayer <span>→</span>
        </Link>
      </section>
    </main>
  );
}
