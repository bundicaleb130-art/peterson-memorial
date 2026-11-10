import { useState } from 'react';

export default function Videos() {
  const [url, setUrl] = useState('');
  const [videos, setVideos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('petersonVideos') || '[]');
    } catch {
      return [];
    }
  });
  const [message, setMessage] = useState('');

  function addVideo(event) {
    event.preventDefault();

    let parsed;
    try {
      parsed = new URL(url.trim());
    } catch {
      setMessage('Enter a valid YouTube video URL.');
      return;
    }

    if (!['youtube.com', 'www.youtube.com', 'youtu.be', 'm.youtube.com'].includes(parsed.hostname)) {
      setMessage('Please use a YouTube video link.');
      return;
    }

    let id = '';
    if (parsed.hostname === 'youtu.be') {
      id = parsed.pathname.slice(1).split('/')[0];
    } else {
      id = parsed.searchParams.get('v') || parsed.pathname.match(/\/(?:embed|shorts)\/([^/]+)/)?.[1] || '';
    }

    if (!/^[\w-]{11}$/.test(id)) {
      setMessage('That does not look like a valid YouTube video link.');
      return;
    }

    const updated = [
      ...videos,
      { id, url: `https://www.youtube.com/watch?v=${id}`, addedAt: new Date().toISOString() }
    ];

    try {
      localStorage.setItem('petersonVideos', JSON.stringify(updated));
      setVideos(updated);
      setUrl('');
      setMessage('Video added in this browser.');
    } catch {
      setMessage('Browser storage is full. The video was not saved.');
    }
  }

  function removeVideo(index) {
    const updated = videos.filter((_, i) => i !== index);
    localStorage.setItem('petersonVideos', JSON.stringify(updated));
    setVideos(updated);
  }

  return (
    <main className="feature-page">
      <section className="page-intro">
        <span className="eyebrow">MEMORIES IN MOTION</span>
        <h1>Video Memories</h1>
        <p>
          Recorded moments, heartfelt tributes, and stories celebrating
          the life of Peterson Bundi Gachoki.
        </p>
      </section>

      <section className="video-add-panel">
        <h2>Add a video</h2>
        <p>Use a YouTube link to add a video to this browser's collection.</p>
        <form onSubmit={addVideo}>
          <label htmlFor="video-url">YouTube video URL</label>
          <input
            id="video-url"
            type="url"
            value={url}
            onChange={event => setUrl(event.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            required
          />
          <button type="submit">Add video</button>
        </form>
        {message && <p role="status">{message}</p>}
      </section>

      {videos.length === 0 ? (
        <section className="video-empty">
          <span className="eyebrow">THE VIDEO COLLECTION</span>
          <h2>Moments worth remembering</h2>
          <p>
            Family-approved videos will appear here. Add a YouTube link
            above to test the gallery.
          </p>
        </section>
      ) : (
        <section className="video-grid">
          {videos.map((video, index) => (
            <article className="video-card" key={`${video.id}-${index}`}>
              <div className="video-frame">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                  title={`Memorial video ${index + 1}`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
              <div className="video-card-footer">
                <span>MEMORIAL VIDEO {String(index + 1).padStart(2, '0')}</span>
                <button type="button" onClick={() => removeVideo(index)}>
                  Remove
                </button>
              </div>
            </article>
          ))}
        </section>
      )}

      <p className="video-notice">
        This collection currently saves links only in this browser. Shared
        public submissions and family approval require online storage.
      </p>
    </main>
  );
}
