export default function About() {
  return (
    <section id="about" style={{ background: 'var(--rose-deep)', padding: '70px 0' }}>
      <div className="container" style={{ maxWidth: '650px' }}>
        <h2 style={{ color: '#fff', fontSize: '28px', marginBottom: '18px' }}>
          Why BakeCraft
        </h2>
        <p style={{ color: 'var(--pink-soft)', fontSize: '15px' }}>
          Small bakers deserve better than scattered Instagram DMs and guesswork
          orders. BakeCraft brings local bakers and customers together in one
          place, with AI helping you describe exactly what you want — so what
          you imagine is what arrives at your door.
        </p>
      </div>
    </section>
  );
}