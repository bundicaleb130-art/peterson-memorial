
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Tributes() {
  const [tributes, setTributes] = useState([]);
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [message, setMessage] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadTributes() {
      if (!supabase) {
        setNotice('Online service is not configured yet.');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('memorial_submissions')
        .select('id, name, relationship, message, created_at')
        .eq('submission_type', 'tribute')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (!active) return;

      if (error) {
        console.error('Could not load tributes:', error.message);
        setNotice('Tributes could not be loaded. Please try again later.');
      } else {
        setTributes(data || []);
      }

      setLoading(false);
    }

    loadTributes();

    return () => {
      active = false;
    };
  }, []);

  async function submit(event) {
    event.preventDefault();
    setNotice('');

    if (!supabase) {
      setNotice('Online service is not configured.');
      return;
    }

    const cleanName = name.trim();
    const cleanRelationship = relationship.trim();
    const cleanMessage = message.trim();

    if (!cleanName || !cleanMessage) {
      setNotice('Please enter your name and tribute.');
      return;
    }

    setSubmitting(true);

    const { error } = await supabase
      .from('memorial_submissions')
      .insert({
        submission_type: 'tribute',
        name: cleanName,
        relationship: cleanRelationship || null,
        message: cleanMessage,
        media_path: null,
        video_url: null,
        status: 'pending'
      });

    setSubmitting(false);

    if (error) {
      console.error('Tribute submission failed:', error.message);
      setNotice('Your tribute could not be submitted. Please try again.');
      return;
    }

    setName('');
    setRelationship('');
    setMessage('');
    setNotice(
      'Thank you for sharing this memory. Your tribute has been submitted for family approval.'
    );
  }

  return (
    <main className="feature-page">
      <span className="eyebrow">WORDS THAT KEEP LOVE ALIVE</span>
      <h1>Leave a Tribute</h1>

      <p className="feature-lead">
        Share a memory, a message of condolence, or a few words
        honouring Peterson Bundi Gachoki.
      </p>

      <form className="tribute-form" onSubmit={submit}>
        <label>
          Your name *
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={100}
            required
            placeholder="Enter your name"
          />
        </label>

        <label>
          Relationship to Peterson (optional)
          <input
            value={relationship}
            onChange={e => setRelationship(e.target.value)}
            maxLength={100}
            placeholder="Family, friend, colleague..."
          />
        </label>

        <label>
          Your tribute *
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            maxLength={3000}
            required
            rows={6}
            placeholder="Share your remembrance..."
          />
        </label>

        <button
          className="button button-dark"
          type="submit"
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit for approval'}
        </button>

        {notice && <p role="status">{notice}</p>}
      </form>

      <section className="tribute-wall">
        <span className="eyebrow">THE LEGACY WALL</span>
        <h2>Remembered with love.</h2>

        {loading ? (
          <p>Loading tributes...</p>
        ) : tributes.length === 0 ? (
          <div className="empty-state">
            <p>
              Approved tributes will appear here as family memories
              are reviewed and shared.
            </p>
          </div>
        ) : (
          tributes.map(item => (
            <article className="tribute-card" key={item.id}>
              <p>“{item.message}”</p>
              <strong>{item.name}</strong>
              {item.relationship && <span> · {item.relationship}</span>}
              <small>
                {new Date(item.created_at).toLocaleDateString()}
              </small>
            </article>
          ))
        )}
      </section>

      <p className="feature-note">
        Tributes are reviewed by the family before appearing on the
        public memorial wall.
      </p>
    </main>
  );
}
