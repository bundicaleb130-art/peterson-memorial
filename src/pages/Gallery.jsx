
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

```jsx
<section className="event-card" style={{ margin: '24px 0', textAlign: 'center' }}>
  <h2>November 11 Photos</h2>
  <p>View the photographs commemorating this special day.</p>
  <a
    href="https://drive.google.com/drive/folders/1Csqf6hSJGLM2Mi-6H7b27kr6veIoVUWJ?usp=sharing"
    target="_blank"
    rel="noopener noreferrer"
    className="button button-dark"
  >
    View November 11 Photos
  </a>
</section>
```
export default function Gallery() {
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadPhotos() {
      if (!supabase) {
        setMessage('The online gallery is not configured yet.');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('memorial_submissions')
        .select('id, name, media_path, created_at')
        .eq('submission_type', 'photo')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (!active) return;

      if (error) {
        console.error('Gallery loading failed:', error.message);
        setMessage('Photographs could not be loaded. Please try again later.');
        setLoading(false);
        return;
      }

      const photos = await Promise.all(
        (data || []).map(async photo => {
          const { data: signed, error: imageError } =
            await supabase.storage
              .from('memorial-media')
              .createSignedUrl(photo.media_path, 3600);

          if (imageError) {
            console.error('Photo access failed:', imageError.message);
            return null;
          }

          return { ...photo, url: signed.signedUrl };
        })
      );

      if (active) {
        setItems(photos.filter(Boolean));
        setLoading(false);
      }
    }

    loadPhotos();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!playing || items.length < 2) return;

    const timer = setInterval(() => {
      setIndex(current => (current + 1) % items.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [playing, items.length]);

  useEffect(() => {
    if (index >= items.length) setIndex(0);
  }, [index, items.length]);

  function selectPhotos(event) {
    const selected = Array.from(event.target.files || []);
    setMessage('');

    const valid = [];
    const rejected = [];

    for (const file of selected) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        rejected.push(`${file.name}: use JPEG, PNG or WebP.`);
      } else if (file.size > MAX_SIZE) {
        rejected.push(`${file.name}: exceeds the 5 MB limit.`);
      } else {
        valid.push(file);
      }
    }

    setFiles(valid);
    if (rejected.length) setMessage(rejected.join(' '));
    event.target.value = '';
  }

  async function submitPhotos(event) {
    event.preventDefault();
    setMessage('');

    if (!supabase) {
      setMessage('The online service is not configured.');
      return;
    }

    if (!name.trim()) {
      setMessage('Enter your name.');
      return;
    }

    if (!files.length) {
      setMessage('Select at least one valid photograph.');
      return;
    }

    setSubmitting(true);
    let uploaded = 0;

    try {
      for (const file of files) {
        const extension = file.type === 'image/jpeg'
          ? 'jpg'
          : file.type === 'image/png'
            ? 'png'
            : 'webp';

        const path = `${crypto.randomUUID()}.${extension}`;

        const { error: uploadError } = await supabase.storage
          .from('memorial-media')
          .upload(path, file, {
            contentType: file.type,
            upsert: false
          });

        if (uploadError) {
          console.error('Photo upload failed:', uploadError.message);
          throw new Error(`Could not upload ${file.name}. Check storage permissions and try again.`);
        }

        const { error: insertError } = await supabase
          .from('memorial_submissions')
          .insert({
            submission_type: 'photo',
            name: name.trim(),
            relationship: relationship.trim() || null,
            message: null,
            media_path: path,
            video_url: null,
            status: 'pending'
          });

        if (insertError) {
          console.error('Photo submission failed:', insertError.message);
          throw new Error(
            `${file.name} uploaded, but its submission failed. The family will not see it until the submission is recorded.`
          );
        }

        uploaded++;
      }

      setFiles([]);
      setName('');
      setRelationship('');
      setMessage(
        `${uploaded} photograph${uploaded === 1 ? '' : 's'} submitted for family approval. They will appear in the gallery after approval.`
      );
    } catch (error) {
      setMessage(error.message || 'An unexpected error occurred.');
    } finally {
      setSubmitting(false);
    }
  }

  const current = items[index];

  return (
    <main className="feature-page">
      <span className="eyebrow">A COLLECTION OF TREASURED MOMENTS</span>
      <h1>Photographs & Memories</h1>
      <p className="feature-lead">
        Every photograph holds a story. Share a treasured memory
        of Rev. Captain Christopher Peterson Bundi Gachoki.
      </p>

      <form className="upload-panel" onSubmit={submitPhotos}>
        <strong>＋ Share photographs</strong>
        <span>JPEG, PNG or WebP · Maximum 5 MB per photograph</span>

        <label>
          Your name
          <input
            type="text"
            value={name}
            onChange={event => setName(event.target.value)}
            maxLength={100}
            required
            placeholder="Enter your full name"
          />
        </label>

        <label>
          Your relationship to the family (optional)
          <input
            type="text"
            value={relationship}
            onChange={event => setRelationship(event.target.value)}
            maxLength={100}
            placeholder="Family, friend, colleague..."
          />
        </label>

        <label>
          Choose photographs
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={selectPhotos}
          />
        </label>

        {files.length > 0 && (
          <p>{files.length} photograph(s) selected.</p>
        )}

        <button
          className="button"
          type="submit"
          disabled={submitting || !files.length}
        >
          {submitting ? 'Submitting...' : 'Submit for approval'}
        </button>

        {message && <p role="status" aria-live="polite">{message}</p>}
      </form>

      <p className="feature-note">
        Submitted photographs remain private until approved by the family.
      </p>

      <section aria-label="Approved memorial photographs">
        <h2>Shared memories</h2>

        {loading ? (
          <p>Loading photographs...</p>
        ) : items.length > 0 ? (
          <>
            <section className="slideshow-panel">
              {current && (
                <>
                  <img
                    className="slideshow-image"
                    src={current.url}
                    alt={`Memorial photograph shared by ${current.name}`}
                  />
                  <p className="slideshow-caption">
                    Shared by {current.name} · {index + 1} of {items.length}
                  </p>
                </>
              )}

              <div className="slideshow-controls">
                <button
                  type="button"
                  onClick={() =>
                    setIndex(i => (i - 1 + items.length) % items.length)
                  }
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setPlaying(value => !value)}
                >
                  {playing ? 'Pause slideshow' : 'Play slideshow'}
                </button>
                <button
                  type="button"
                  onClick={() => setIndex(i => (i + 1) % items.length)}
                >
                  Next
                </button>
              </div>
            </section>

            <div className="gallery-grid">
              {items.map((item, i) => (
                <button
                  className="gallery-thumb"
                  type="button"
                  key={item.id}
                  onClick={() => {
                    setIndex(i);
                    setPlaying(false);
                  }}
                  aria-label={`View photograph shared by ${item.name}`}
                >
                  <img
                    src={item.url}
                    alt={`Shared by ${item.name}`}
                    loading="lazy"
                  />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <span className="portrait-symbol">✳</span>
            <h2>Memories belong here</h2>
            <p>
              No approved photographs are available yet.
              Submitted photographs will appear after family approval.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
