/* global React, ReactDOM, window, CONTACT_INFO, REP_DIRECTORY, Eyebrow, Button, Nav, Footer, Icon, goNav, Reveal, useBreakpoint */
// j. society — Contact (wireframe: image + message form · Email/Phone/Office · Footer)

const { useState } = React;

const fieldInput = {
  fontFamily: 'var(--js-sans)', fontSize: 15.5, color: 'var(--js-ink)', padding: '14px 16px',
  border: '1px solid var(--js-mist)', background: 'var(--js-white)', outline: 'none',
  borderRadius: 'var(--js-radius-sm)', width: '100%',
};

function Field({ label, children }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontFamily: 'var(--js-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--js-stone)' }}>{label}</span>
      {children}
    </label>
  );
}

/* ---------- Image + message form ---------- */
function MessageForm() {
  const bp = useBreakpoint();
  const stack = bp !== 'desktop';
  const [form, setForm] = useState({ first: '', last: '', store: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  return (
    <section style={{ background: 'var(--js-paper)', padding: 'calc(78px + clamp(32px, 5vw, 56px)) clamp(20px, 5vw, 44px) clamp(40px, 6vw, 64px)' }}>
      <div style={{ maxWidth: 1312, margin: '0 auto', display: 'grid', gridTemplateColumns: stack ? '1fr' : '1fr 1fr', gap: 'clamp(32px, 6vw, 80px)', alignItems: 'stretch' }}>
        <Reveal>
          <div style={{ position: 'relative', height: '100%', minHeight: stack ? 'clamp(280px, 70vw, 420px)' : 480, overflow: 'hidden', background: 'var(--js-alabaster)' }}>
            <img src="images/detail-lived.jpg" alt="The j. society showroom" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 32%' }} />
          </div>
        </Reveal>
        <Reveal delay={90}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Eyebrow>Connect</Eyebrow>
            <h1 style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(38px, 4.8vw, 60px)', lineHeight: 1.0, letterSpacing: '-0.014em', color: 'var(--js-ink)', margin: '14px 0 16px' }}>Send us a message</h1>
            <p style={{ fontFamily: 'var(--js-sans)', fontSize: 18, lineHeight: 1.6, color: 'var(--js-fg-body)', margin: '0 0 20px', maxWidth: 440 }}>Tell us about your business and what you&rsquo;re looking for.</p>
            <a href="#reps" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, width: 'fit-content', margin: '0 0 28px', padding: '10px 16px', border: '1px solid var(--js-ink)', background: 'var(--js-ink)', textDecoration: 'none', fontFamily: 'var(--js-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--js-paper)' }} onMouseEnter={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--js-ink)'; }} onMouseLeave={e => { e.currentTarget.style.background = 'var(--js-ink)'; e.currentTarget.style.color = 'var(--js-paper)'; }}>Wholesale buyer? Find your regional rep <Icon name="arrowRight" size={13} style={{ transform: 'rotate(90deg)' }} /></a>
            {sent ? (
              <div style={{ border: '1px solid var(--js-mist)', background: 'var(--js-white)', padding: '48px 32px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--js-serif)', fontSize: 32, fontWeight: 500, color: 'var(--js-ink)' }}>Thank you.</div>
                <p style={{ fontFamily: 'var(--js-sans)', fontSize: 16, color: 'var(--js-fg-body)', marginTop: 12 }}>We&rsquo;ve received your message and will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); if (form.first && form.email) setSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                <Field label="First name"><input required value={form.first} onChange={set('first')} placeholder="First name" style={fieldInput} /></Field>
                <Field label="Last name"><input value={form.last} onChange={set('last')} placeholder="Last name" style={fieldInput} /></Field>
                <Field label="Store name"><input value={form.store} onChange={set('store')} placeholder="Store name" style={fieldInput} /></Field>
                <Field label="Email"><input required type="email" value={form.email} onChange={set('email')} placeholder="you@company.com" style={fieldInput} /></Field>
                <Field label="Message"><textarea value={form.message} onChange={set('message')} rows={5} placeholder="Type your message..." style={{ ...fieldInput, resize: 'vertical', lineHeight: 1.55 }} /></Field>
                <div><Button variant="solid" onClick={() => { if (form.first && form.email) setSent(true); }}>Send</Button></div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Email / Phone / Office ---------- */
function ContactDetails() {
  const bp = useBreakpoint();
  const cols = bp === 'mobile' ? '1fr' : 'repeat(3, 1fr)';
  return (
    <section style={{ background: 'var(--js-paper)', padding: 'clamp(48px, 7vw, 80px) clamp(20px, 5vw, 44px) clamp(80px, 11vw, 128px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: cols, gap: 'clamp(48px, 6vw, 64px)' }}>
        {CONTACT_INFO.map((c, i) => (
          <Reveal key={c.label} delay={i * 80}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <span style={{ display: 'flex', color: 'var(--js-ink)', marginBottom: 22 }}><Icon name={c.icon} size={32} stroke={1.4} /></span>
              <h2 style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(24px, 2.6vw, 30px)', lineHeight: 1.1, color: 'var(--js-ink)', margin: '0 0 10px' }}>{c.label}</h2>
              <p style={{ fontFamily: 'var(--js-sans)', fontSize: 16, lineHeight: 1.5, color: 'var(--js-fg-body)', margin: '0 0 14px' }}>{c.note}</p>
              {c.icon === 'clock' ? (
                <span style={{ fontFamily: 'var(--js-sans)', fontSize: 16, color: 'var(--js-ink)' }}>{c.value}</span>
              ) : (
                <a href="#" onClick={e => e.preventDefault()} style={{ fontFamily: 'var(--js-sans)', fontSize: 16, color: 'var(--js-ink)', textDecoration: 'underline', textUnderlineOffset: 3, textDecorationColor: 'var(--js-mist)' }}>{c.value}</a>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- Showroom & rep directory ---------- */
function RepRow({ r, last }) {
  const bp = useBreakpoint();
  const stack = bp === 'mobile';
  return (
    <div style={{ display: 'grid', gridTemplateColumns: stack ? '1fr' : '150px 1.1fr 1.5fr 150px', gap: stack ? 6 : 'clamp(16px, 3vw, 36px)', alignItems: 'baseline', padding: 'clamp(18px, 2.4vw, 26px) 0', borderBottom: last ? 'none' : '1px solid var(--js-mist)' }}>
      <span style={{ fontFamily: 'var(--js-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--js-stone)' }}>{r.region}</span>
      <span style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(20px, 2vw, 24px)', lineHeight: 1.15, letterSpacing: '-0.008em', color: 'var(--js-ink)' }}>{r.rep}</span>
      <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {r.emails.map(em => (
          <a key={em} href={'mailto:' + em} style={{ fontFamily: 'var(--js-sans)', fontSize: 15.5, color: 'var(--js-espresso)', textDecoration: 'underline', textUnderlineOffset: 3, textDecorationColor: 'var(--js-mist)', width: 'fit-content' }}>{em}</a>
        ))}
      </span>
      <a href={'tel:' + r.phone.replace(/[^0-9]/g, '')} style={{ fontFamily: 'var(--js-mono)', fontSize: 13, letterSpacing: '0.06em', color: 'var(--js-ink)', textDecoration: 'none', justifySelf: stack ? 'start' : 'end' }}>{r.phone}</a>
    </div>
  );
}

function RepDirectory() {
  return (
    <section id="reps" style={{ background: 'var(--js-alabaster)', padding: 'clamp(64px, 9vw, 110px) clamp(20px, 5vw, 44px)', scrollMarginTop: 78 }}>
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto clamp(36px, 5vw, 56px)' }}>
            <Eyebrow>Showrooms &middot; Reps</Eyebrow>
            <h2 style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(32px, 4.2vw, 52px)', lineHeight: 1.02, letterSpacing: '-0.014em', color: 'var(--js-ink)', margin: '14px 0 14px' }}>Find your regional rep</h2>
            <p style={{ fontFamily: 'var(--js-sans)', fontSize: 18, lineHeight: 1.55, color: 'var(--js-fg-body)', margin: 0 }}>Six regions, one line. Reach out to the showroom that covers your territory.</p>
          </div>
        </Reveal>
        <Reveal delay={90}>
          <div style={{ borderTop: '1px solid var(--js-ink)', borderBottom: '1px solid var(--js-ink)' }}>
            {REP_DIRECTORY.map((r, i) => <RepRow key={r.region} r={r} last={i === REP_DIRECTORY.length - 1} />)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function App() {
  return (
    <div>
      <Nav solid />
      <MessageForm />
      <RepDirectory />
      <ContactDetails />
      <Footer />
      <PhotoTweaks />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
