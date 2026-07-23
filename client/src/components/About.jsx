export default function About() {
  return (
    <section id="about" style={{ background: 'var(--rose-deep)', padding: '70px 0' }}>
      <div className="container" style={{ maxWidth: '650px' }}>
        <h2 style={{ color: '#fff', fontSize: '28px', marginBottom: '18px' }}>
          Why BakeCraft
        </h2>
        <p style={{ color: 'var(--pink-soft)', fontSize: '15px' }}>
          Custom cake orders should not require scattered messages and guesswork.
          BakeCraft brings design, ordering, tracking, and baker communication
          into one place, with AI helping you describe exactly what you want.
        </p>
      </div>
    </section>
  );
}
