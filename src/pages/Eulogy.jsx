
export default function Eulogy() {
  const pdf = '/eulogy-screen.pdf';

  return (
    <main className="eulogy-page">
      <section className="eulogy-heading">
        <span className="eyebrow">IN LOVING MEMORY</span>
        <h1>A Life Remembered</h1>
        <p>Rev. Captain Christopher Peterson Bundi Gachoki</p>
        <div className="gold-rule" />
        <p>
          Remembering his life, faith, service, and the many people
          whose lives he touched.
        </p>

        <div className="eulogy-actions">
          <a href={`${pdf}#page=3`} target="_blank" rel="noreferrer">
            Read the English Eulogy
          </a>
          <a href={pdf} download>
            Download the Full Memorial Booklet (PDF)
          </a>
        </div>
      </section>

      <section className="eulogy-document">
        <h2>Memorial Booklet</h2>
        <p>
          The original booklet includes the funeral programme, eulogy
          in English and Kikuyu, family tributes, hymns, and scripture.
        </p>

        <iframe
          title="Memorial booklet PDF"
          src={`${pdf}#page=3&view=FitH`}
          width="100%"
          height="850"
        />

        <p>
          If the document does not display on your device, use the
          download link above to read it in your PDF viewer.
        </p>
      </section>
    </main>
  );
}
