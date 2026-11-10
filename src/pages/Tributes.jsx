import { useState } from 'react';

const STORAGE_KEY = 'petersonMemorialTributes';

function loadTributes() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export default function Tributes() {
  const [tributes, setTributes] = useState(loadTributes);
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [message, setMessage] = useState('');
  const [notice, setNotice] = useState('');

  function submit(event) {
    event.preventDefault();

    if (!name.trim() || !message.trim()) {
      setNotice('Please enter your name and tribute.');
      return;
    }

    const entry = {
      id: Date.now(),
      name: name.trim(),
      relationship: relationship.trim(),
      message: message.trim(),
      date: new Date().toLocaleDateString()
    };

    const updated = [entry, ...tributes];

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setTributes(updated);
      setName('');
      setRelationship('');
      setMessage('');
      setNotice('Your tribute has been added on this device.');
    } catch {
      setNotice('Browser storage is full. Your tribute could not be saved.');
    }
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
          <input value={name} onChange={e => setName(e.target.value)}
            maxLength={100} required placeholder="Enter your name" />
        </label>

        <label>
          Relationship to Peterson (optional)
          <input value={relationship}
            onChange={e => setRelationship(e.target.value)}
            maxLength={100} placeholder="Family, friend, colleague..." />
        </label>

        <label>
          Your tribute *
          <textarea value={message}
            onChange={e => setMessage(e.target.value)}
            maxLength={3000} required rows={6}
            placeholder="Share your remembrance..." />
        </label>

        <button className="button button-dark" type="submit">
          Leave your tribute
        </button>
        {notice && <p role="status">{notice}</p>}
      </form>

      <section className="tribute-wall">
        <span className="eyebrow">THE LEGACY WALL</span>
        <h2>Remembered with love.</h2>

        {tributes.length === 0 ? (
          <div className="empty-state">
            <p>Your tribute wall is waiting for its first message.</p>
          </div>
        ) : tributes.map(item => (
          <article className="tribute-card" key={item.id}>
            <p>“{item.message}”</p>
            <strong>{item.name}</strong>
            {item.relationship && <span> · {item.relationship}</span>}
            <small>{item.date}</small>
          </article>
        ))}
      </section>

      <p className="feature-note">
        Prototype only: messages are saved in this browser, not shared
        with other visitors. Public submissions will need shared storage
        and family moderation before launch.
      </p>
    </main>
  );
}
