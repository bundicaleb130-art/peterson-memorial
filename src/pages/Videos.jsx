
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

function getYouTubeId(value) {
  try {
    const parsed = new URL(value.trim());

    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return null;
    }

    let id = '';

    if (parsed.hostname === 'youtu.be') {
      id = parsed.pathname.split('/').filter(Boolean)[0] || '';
    } else if (
      ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtube-nocookie.com'].includes(
        parsed.hostname
      )
    ) {
      id =
        parsed.searchParams.get('v') ||
        parsed.pathname.match(/\/(?:embed|shorts)\/([^/]+)/)?.[1] ||
        '';
    }

    return /^[\w-]{11}$/.test(id) ? id : null;
  } catch {
    return null;
  }
}

export default function Videos() {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [videos, setVideos] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadVideos() {
      if (!supabase) {
        setMessage('Online service is not configured.');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('memorial_submissions')
        .select('id, name, video_url, created_at')
        .eq('submission_type', 'video')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (!active) return;

      if (error) {
        console.error('Could not load videos:', error.message);
        setMessage('Videos could not be loaded. Please try again later.');
      } else {
        setVideos(
          (data || []).map(video => ({
            ...video,
            id: getYouTubeId(video.video_url)
          })).filter(video => video.id)
        );
      }

      setLoading(false);
    }

    loadVideos();

    return () => {
      active = false;
    };
  }, []);

  async function addVideo(event) {
    event.preventDefault();
    setMessage('');

    if (!supabase) {
      setMessage('Online service is not configured.');
      return;
    }

    const id = getYouTubeId(url);

    if (!id) {
      setMessage('Enter a valid YouTube video URL using HTTPS.');
      return;
    }

    if (!name.trim()) {
      setMessage('Enter your name.');
      return;
    }

    setSubmitting(true);

    const { error } = await supabase
      .from('memorial_submissions')
      .insert({
        submission_type: 'video',
        name: name.trim(),
        video_url: `https://www.youtube.com/watch?v=${id}`,
        media_path: null,
        message: null,
        status: 'pending'
      });

    setSubmitting(false);

    if (error) {
      console.error('Video submission failed:', error.message);
      setMessage('Your video could not be submitted. Please try again.');
      return;
    }

    setUrl('');
    setName('');
    setMessage('Video submitted for family approval. It will appear after approval.');
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
        <h2>Suggest a video</h2>
        <p>Submit a YouTube link for the family to review.</p>

        <form onSubmit={addVideo}>
          <label htmlFor="video-name">Your name</label>
          <input
            id="video-name"
            value={name}
            onChange={event => setName(event.target.value)}
            maxLength={100}
            required
            placeholder="Enter your name"
          />

          <label htmlFor="video-url">YouTube video URL</label>
          <input
            id="video-url"
            type="url"
            value={url}
            onChange={event => setUrl(event.target.value)}
            maxLength={500}
            required
            placeholder="https://www.youtube.com/watch?v=..."
          />

          <button type="submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit for approval'}
          </button>
        </form>

        {message && <p role="status">{message}</p>}
      </section>

      {loading ? (
        <p>Loading approved videos...</p>
      ) : videos.length === 0 ? (
        <section className="video-empty">
          <span className="eyebrow">THE VIDEO COLLECTION</span>
          <h2>Moments worth remembering</h2>
          <p>Approved family videos will appear here.</p>
        </section>
      ) : (
        <section className="video-grid">
          {videos.map((video, index) => (
            <article className="video-card" key={video.id}>
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
              </div>
            </article>
          ))}
        </section>
      )}

      <p className="video-notice">
        Video suggestions are reviewed by the family before appearing
        in the public collection.
      </p>
    </main>
  );
}
