export default function About() {
  return (
    <section id="about" style={{ background: 'var(--espresso)', padding: '80px 0' }}>
      <div className="container" style={{ maxWidth: '650px' }}>
        <h2 style={{ color: 'var(--cream)', fontSize: '30px', marginBottom: '20px' }}>
          Our story
        </h2>
        <p style={{ color: 'var(--tan)', fontSize: '16px' }}>
          BakeCraft started in a small kitchen with one oven and a lot of stubbornness
          about doing things the slow way. We still proof our dough overnight and shape
          everything by hand — we just use a bit of AI now to help customers find exactly
          what they're craving.
        </p>
      </div>
    </section>
  );
}