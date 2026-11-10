import { useEffect, useState } from 'react';

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || items.length < 2) return;
    const timer = setInterval(
      () => setIndex(i => (i + 1) % items.length),
      3500
    );
    return () => clearInterval(timer);
  }, [playing, items.length]);

  useEffect(() => {
    return () => items.forEach(item => URL.revokeObjectURL(item.url));
  }, [items]);

  function selectImages(event) {
    const files = Array.from(event.target.files || []);
    const valid = files.filter(file =>
      file.type.startsWith('image/') ||
      /\.(jpe?g|png|gif|webp|avif|bmp|tiff?|heic|heif|jfif)$/i.test(file.name)
    );

    if (!valid.length) return;

    setItems(previous => [
      ...previous,
      ...valid.map(file => ({
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type
      }))
    ]);
    setIndex(0);
    setPlaying(false);
    event.target.value = '';
  }

  const current = items[index];

  return (
    <main className="feature-page">
      <span className="eyebrow">A COLLECTION OF TREASURED MOMENTS</span>
      <h1>Photographs & Memories</h1>
      <p className="feature-lead">
        Every photograph holds a story. Select family photographs below
        to test the gallery and slideshow.
      </p>

      <label className="upload-panel">
        <strong>＋ Add photographs</strong>
        <span>Select multiple image files from your device</span>
        <input
          type="file"
          accept="image/*,.heic,.heif,.tif,.tiff,.bmp,.jfif"
          multiple
          onChange={selectImages}
        />
      </label>

      {items.length > 0 ? (
        <>
          <section className="slideshow-panel">
            {current && (
              <>
                {current.type === 'image/svg+xml' ||
                current.name.toLowerCase().endsWith('.svg') ? (
                  <p>SVG preview is not enabled for safety.</p>
                ) : (
                  <img
                    className="slideshow-image"
                    src={current.url}
                    alt={current.name}
                    onError={event => {
                      event.currentTarget.style.display = 'none';
                    }}
                  />
                )}
                <p className="slideshow-caption">
                  {current.name} · {index + 1} of {items.length}
                </p>
              </>
            )}

            <div className="slideshow-controls">
              <button onClick={() => setIndex(i => (i - 1 + items.length) % items.length)}>
                Previous
              </button>
              <button onClick={() => setPlaying(p => !p)}>
                {playing ? 'Pause slideshow' : 'Play slideshow'}
              </button>
              <button onClick={() => setIndex(i => (i + 1) % items.length)}>
                Next
              </button>
            </div>
          </section>

          <div className="gallery-grid">
            {items.map((item, i) => (
              <button
                className="gallery-thumb"
                key={item.url}
                onClick={() => { setIndex(i); setPlaying(false); }}
                aria-label={`View ${item.name}`}
              >
                <img src={item.url} alt={item.name} />
                <span>{item.name}</span>
              </button>
            ))}
          </div>

          <button
            className="button button-light"
            onClick={() => {
              items.forEach(item => URL.revokeObjectURL(item.url));
              setItems([]);
              setIndex(0);
              setPlaying(false);
            }}
          >
            Clear test gallery
          </button>
        </>
      ) : (
        <div className="empty-state">
          <span className="portrait-symbol">✳</span>
          <h2>Your family memories belong here</h2>
          <p>Select a few photographs to test the slideshow.</p>
        </div>
      )}

      <p className="feature-note">
        Test mode: selected photographs remain in this browser session.
        They are not yet uploaded to shared online storage.
      </p>
    </main>
  );
}
