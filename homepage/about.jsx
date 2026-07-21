/* global React, ReactDOM, window, STORY, MILESTONES, TEAM, FAQ, TESTIMONIALS, ABOUT_INTRO, Eyebrow, Button, Nav, Footer, Icon, goNav, Reveal, BuyerTestimonials, SplitIntro, ImageBand, NewsletterBand, useBreakpoint */
// j. society — About (v2 wireframe: Header · Story · Milestones · Team · Hiring · Testimonials · FAQ · CTA · Footer)

const { useState } = React;

/* ---------- Centered page header over dark image ---------- */
function CenteredHeader({ title, sub, img, pos = '50% 35%' }) {
  return (
    <header style={{ position: 'relative', minHeight: 'clamp(360px, 52vh, 520px)', marginTop: -78, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '78px clamp(20px, 5vw, 44px) 0' }}>
      <img src={img} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(23,19,15,0.6), rgba(23,19,15,0.34) 55%, rgba(23,19,15,0.5))' }} />
      <Reveal style={{ position: 'relative', maxWidth: 760 }}>
        <h1 style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(52px, 8vw, 116px)', lineHeight: 0.96, letterSpacing: '-0.014em', color: 'var(--js-paper)', margin: 0 }}>{title}</h1>
        {sub && <p style={{ fontFamily: 'var(--js-sans)', fontSize: 'clamp(16px, 2vw, 19px)', lineHeight: 1.6, color: 'rgba(250,248,244,0.9)', margin: '22px auto 0', maxWidth: 560 }}>{sub}</p>}
      </Reveal>
    </header>
  );
}

/* ---------- Story: tall image + 3 belief blocks ---------- */
function Story() {
  const bp = useBreakpoint();
  const stack = bp !== 'desktop';
  return (
    <section style={{ background: 'var(--js-paper)', padding: 'clamp(72px, 10vw, 120px) clamp(20px, 5vw, 44px)' }}>
      <div style={{ maxWidth: 1312, margin: '0 auto', display: 'grid', gridTemplateColumns: stack ? '1fr' : '1fr 1.05fr', gap: 'clamp(36px, 6vw, 88px)', alignItems: 'stretch' }}>
        <Reveal style={{ display: stack ? 'none' : 'block' }}>
          <div style={{ position: 'relative', height: '100%', minHeight: 520, overflow: 'hidden', background: 'var(--js-alabaster)' }}>
            <img src="images/detail-lived.jpg" alt="In the New York showroom" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 32%' }} />
          </div>
        </Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {STORY.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div style={{ display: 'flex', gap: 22, paddingBottom: 'clamp(32px, 4vw, 44px)', marginBottom: 'clamp(32px, 4vw, 44px)', borderBottom: i < STORY.length - 1 ? '1px solid var(--js-mist)' : 'none' }}>
                <span style={{ flexShrink: 0, width: 48, height: 48, border: '1px solid var(--js-mist)', borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--js-ink)' }}><Icon name={s.icon} size={22} stroke={1.4} /></span>
                <div>
                  <h3 style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(24px, 2.4vw, 30px)', lineHeight: 1.1, color: 'var(--js-ink)', margin: '4px 0 12px' }}>{s.title}</h3>
                  <p style={{ fontFamily: 'var(--js-sans)', fontSize: 16.5, lineHeight: 1.64, color: 'var(--js-fg-body)', margin: 0 }}>{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={120}>
            <div style={{ display: 'flex', gap: 14, marginTop: 8 }}>
              <Button variant="ghost" onClick={() => goNav('look-book.html')}>Explore the line</Button>
              <Button variant="text" onClick={() => goNav('contact.html')}>Talk to us &rarr;</Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Milestones (light Alabaster) ---------- */
function Milestones() {
  const bp = useBreakpoint();
  const stack = bp !== 'desktop';
  return (
    <section style={{ background: 'var(--js-alabaster)', color: 'var(--js-ink)', padding: 'clamp(72px, 10vw, 120px) clamp(20px, 5vw, 44px)' }}>
      <div style={{ maxWidth: 1312, margin: '0 auto', display: 'grid', gridTemplateColumns: stack ? '1fr' : '1fr 1fr', gap: 'clamp(40px, 6vw, 88px)', alignItems: 'center' }}>
        <Reveal>
          <h2 style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(34px, 4.4vw, 58px)', lineHeight: 1.0, letterSpacing: '-0.014em', color: 'var(--js-ink)', margin: '0 0 28px', maxWidth: 440 }}>
            From concept to showroom floor
          </h2>
          <div style={{ display: 'flex', gap: 14 }}>
            <Button variant="solid" onClick={() => goNav('contact.html')}>Partner with us</Button>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div style={{ display: 'grid', gridTemplateColumns: bp === 'mobile' ? '1fr' : '1fr 1fr', gap: 'clamp(28px, 3vw, 40px)' }}>
            {MILESTONES.map(m => (
              <div key={m.label} style={{ borderTop: '1px solid var(--js-mist)', paddingTop: 24 }}>
                <div style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(30px, 3.4vw, 42px)', lineHeight: 1.04, color: 'var(--js-ink)' }}>{m.label}</div>
                <p style={{ fontFamily: 'var(--js-sans)', fontSize: 16, lineHeight: 1.6, color: 'var(--js-fg-body)', margin: '14px 0 0' }}>{m.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Team ---------- */
function TeamMember({ p }) {
  return (
    <div>
      <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: 'var(--js-mist)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 999, maxWidth: 96 }}>
        <span style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 30, color: 'var(--js-stone)' }}>{p.name.split(' ').map(w => w[0]).join('')}</span>
      </div>
      <h3 style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 22, color: 'var(--js-ink)', margin: '18px 0 3px', lineHeight: 1.1 }}>{p.name}</h3>
      <div style={{ fontFamily: 'var(--js-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--js-stone)' }}>{p.role}</div>
      <p style={{ fontFamily: 'var(--js-sans)', fontSize: 14.5, lineHeight: 1.58, color: 'var(--js-fg-body)', margin: '12px 0 14px' }}>{p.note}</p>
      <div style={{ display: 'flex', gap: 12, color: 'var(--js-stone)' }}>
        {['linkedin', 'x', 'globe'].map(s => <span key={s} style={{ display: 'flex', cursor: 'pointer' }}><Icon name={s} size={16} stroke={1.4} /></span>)}
      </div>
    </div>
  );
}

function Team() {
  const bp = useBreakpoint();
  const cols = bp === 'mobile' ? '1fr 1fr' : bp === 'tablet' ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)';
  return (
    <section style={{ background: 'var(--js-paper)', padding: 'clamp(72px, 10vw, 120px) clamp(20px, 5vw, 44px)' }}>
      <div style={{ maxWidth: 1312, margin: '0 auto' }}>
        <Reveal>
          <div style={{ maxWidth: 640, marginBottom: 'clamp(44px, 6vw, 68px)' }}>
            <Eyebrow>People</Eyebrow>
            <h2 style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(34px, 4.4vw, 56px)', lineHeight: 1.02, letterSpacing: '-0.014em', color: 'var(--js-ink)', margin: '14px 0 16px' }}>The team</h2>
            <p style={{ fontFamily: 'var(--js-sans)', fontSize: 18, lineHeight: 1.6, color: 'var(--js-fg-body)', margin: 0 }}>We built j. society around people who understand fabric the way others understand language.</p>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 'clamp(36px, 4vw, 52px) clamp(20px, 3vw, 40px)' }}>
          {TEAM.map((p, i) => <Reveal key={p.name} delay={(i % 4) * 70}><TeamMember p={p} /></Reveal>)}
        </div>
        <Reveal delay={120}>
          <div style={{ marginTop: 'clamp(56px, 8vw, 88px)', paddingTop: 'clamp(40px, 5vw, 56px)', borderTop: '1px solid var(--js-mist)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 28, flexWrap: 'wrap' }}>
            <div style={{ maxWidth: 460 }}>
              <h3 style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.06, color: 'var(--js-ink)', margin: '0 0 12px' }}>We&rsquo;re hiring</h3>
              <p style={{ fontFamily: 'var(--js-sans)', fontSize: 17, lineHeight: 1.6, color: 'var(--js-fg-body)', margin: 0 }}>We&rsquo;re looking for people who care about the work as much as the result.</p>
            </div>
            <Button variant="ghost" onClick={() => goNav('contact.html')}>See open positions</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQitem({ item, open, onToggle }) {
  return (
    <div style={{ borderTop: '1px solid var(--js-mist)' }}>
      <button onClick={onToggle} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, padding: '26px 0', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
        <span style={{ fontFamily: 'var(--js-sans)', fontWeight: 600, fontSize: 20, color: 'var(--js-ink)', letterSpacing: '-0.01em' }}>{item.q}</span>
        <span style={{ flexShrink: 0, transition: 'transform var(--js-dur) var(--js-ease)', transform: open ? 'rotate(45deg)' : 'none', color: 'var(--js-stone)', display: 'flex' }}><Icon name="plus" size={22} /></span>
      </button>
      <div style={{ overflow: 'hidden', maxHeight: open ? 260 : 0, transition: 'max-height var(--js-dur-slow) var(--js-ease)' }}>
        <p style={{ fontFamily: 'var(--js-sans)', fontSize: 17, lineHeight: 1.64, color: 'var(--js-fg-body)', margin: '0 0 28px', maxWidth: 760 }}>{item.a}</p>
      </div>
    </div>
  );
}

function FAQSection() {
  const [open, setOpen] = useState(0);
  return (
    <section style={{ background: 'var(--js-alabaster)', padding: 'clamp(72px, 10vw, 120px) clamp(20px, 5vw, 44px)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 56px)' }}>
            <Eyebrow>Questions</Eyebrow>
            <h2 style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(34px, 4.4vw, 56px)', lineHeight: 1.02, letterSpacing: '-0.014em', color: 'var(--js-ink)', margin: '14px 0 14px' }}>Everything about working with us</h2>
            <p style={{ fontFamily: 'var(--js-sans)', fontSize: 18, lineHeight: 1.55, color: 'var(--js-fg-body)', margin: 0 }}>Everything you need to know about working with j. society.</p>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div style={{ borderBottom: '1px solid var(--js-mist)' }}>
            {FAQ.map((f, i) => <FAQitem key={i} item={f} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />)}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div style={{ textAlign: 'center', marginTop: 'clamp(48px, 7vw, 72px)' }}>
            <h3 style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(26px, 3vw, 38px)', lineHeight: 1.06, color: 'var(--js-ink)', margin: '0 0 12px' }}>Still have questions?</h3>
            <p style={{ fontFamily: 'var(--js-sans)', fontSize: 17, lineHeight: 1.55, color: 'var(--js-fg-body)', margin: '0 auto 26px', maxWidth: 420 }}>We&rsquo;re here. Send us a message and we&rsquo;ll get back to you.</p>
            <Button variant="solid" onClick={() => goNav('contact.html')}>Contact us</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function App() {
  return (
    <div>
      <Nav />
      <CenteredHeader title="j. society" sub="We dress New York with pieces that matter, built for those who know quality when they see it." img="images/craft.jpg" pos="50% 24%" />
      <SplitIntro heading={ABOUT_INTRO.heading} body={ABOUT_INTRO.body} />
      <ImageBand img={ABOUT_INTRO.img} pos={ABOUT_INTRO.pos} />
      <Milestones />
      <NewsletterBand />
      <Footer />
      <PhotoTweaks />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
