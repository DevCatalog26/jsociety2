/* global React, window, COLLECTION, Eyebrow, Button, Icon, goNav, scrollToId */
// j. society — shared building blocks used across every page.

const { useState, useEffect, useRef } = React;

/* ---------- Reveal (pure-CSS fade-up on mount) ----------
   Resting state is always visible (opacity 1) — the keyframe only animates
   the entrance, so content can never get stuck hidden. */
function Reveal({ children, delay = 0, style }) {
  return (
    <div style={{ ...style, animation: `js-reveal var(--js-dur-slow) var(--js-ease) ${delay}ms both` }}>
      {children}
    </div>
  );
}

/* ---------- Fiber ticker ---------- */
function Ticker() {
  const phrase = "Wholesale · New York   Built to last   Sourced fiber   For retail partners   Lot 024   Quality over everything   Est. 2020   ";
  return (
    <div style={{ background: 'var(--js-ink)', color: 'var(--js-paper)', overflow: 'hidden', whiteSpace: 'nowrap', padding: '15px 0', borderTop: '1px solid rgba(222,216,207,0.12)' }}>
      <div style={{ display: 'inline-block', fontFamily: 'var(--js-mono)', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', animation: 'js-marquee 34s linear infinite' }}>
        {Array(4).fill(phrase).join('')}
      </div>
    </div>
  );
}

/* ---------- Page header (small banner over a dark image) ---------- */
function PageHeader({ eyebrow, title, sub, img, pos = '50% 35%', height = 'clamp(340px, 46vh, 460px)' }) {
  return (
    <header style={{ position: 'relative', height, marginTop: -78, overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
      <img src={img} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(23,19,15,0.66), rgba(23,19,15,0.22) 60%, rgba(23,19,15,0.34))' }} />
      <div style={{ position: 'relative', width: '100%', padding: '0 clamp(20px, 5vw, 44px) clamp(36px, 6vw, 56px)' }}>
        <Reveal>
          {eyebrow && <Eyebrow style={{ color: 'rgba(250,248,244,0.9)' }}>{eyebrow}</Eyebrow>}
          <h1 style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(42px, 6.4vw, 92px)', lineHeight: 0.98, letterSpacing: '-0.014em', color: 'var(--js-paper)', margin: '14px 0 0', maxWidth: 1000 }}>{title}</h1>
          {sub && <p style={{ fontFamily: 'var(--js-sans)', fontSize: 18, lineHeight: 1.55, color: 'rgba(250,248,244,0.9)', margin: '18px 0 0', maxWidth: 560 }}>{sub}</p>}
        </Reveal>
      </div>
    </header>
  );
}

/* ---------- Product card ---------- */
function ProductCard({ product, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ cursor: 'pointer' }} onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: 'var(--js-alabaster)' }}>
        <img src={product.img} alt={product.name} loading="lazy" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
          objectPosition: product.pos, transform: hov ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform var(--js-dur-slow) var(--js-ease)',
        }} />
        <div style={{ position: 'absolute', left: 16, top: 16, fontFamily: 'var(--js-mono)', fontSize: 9.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(250,248,244,0.92)', textShadow: '0 1px 8px rgba(23,19,15,0.4)' }}>{product.lot}</div>
      </div>
      <div style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
          <div style={{ fontFamily: 'var(--js-serif)', fontSize: 24, fontWeight: 500, color: 'var(--js-ink)', lineHeight: 1.05 }}>{product.name}</div>
          <div style={{ fontFamily: 'var(--js-sans)', fontSize: 16, color: 'var(--js-espresso)', whiteSpace: 'nowrap' }}>${product.price}</div>
        </div>
        <div style={{ fontFamily: 'var(--js-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--js-stone)', marginTop: 10 }}>{product.fiber} · {product.gauge}</div>
      </div>
    </div>
  );
}

function SliderArrow({ dir, onClick, disabled }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} disabled={disabled} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        width: 52, height: 52, borderRadius: 999, cursor: disabled ? 'default' : 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '1px solid ' + (disabled ? 'var(--js-mist)' : 'var(--js-ink)'),
        background: !disabled && hov ? 'var(--js-ink)' : 'transparent',
        color: disabled ? 'var(--js-mist)' : (hov ? 'var(--js-paper)' : 'var(--js-ink)'),
        transition: 'all var(--js-dur) var(--js-ease)',
      }}>
      <Icon name={dir === 'left' ? 'arrowLeft' : 'arrowRight'} size={20} />
    </button>
  );
}

/* ---------- Collection slider (Relume "Gallery") ---------- */
function CollectionSlider({ id = 'collection', eyebrow = 'The Collection', title = "This season's knits", sub, items = COLLECTION, onOpen }) {
  const bp = useBreakpoint();
  const VISIBLE = bp === 'mobile' ? 1 : bp === 'tablet' ? 2 : 3;
  const maxIndex = Math.max(0, items.length - VISIBLE);
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const cardRef = useRef(null);
  useEffect(() => {
    const measure = () => { if (cardRef.current) setStep(cardRef.current.getBoundingClientRect().width + (bp === 'mobile' ? 16 : 28)); };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [bp]);
  useEffect(() => { setIndex(i => Math.min(i, maxIndex)); }, [maxIndex]);
  const go = (d) => setIndex(i => Math.min(maxIndex, Math.max(0, i + d)));
  const gap = bp === 'mobile' ? 16 : 28;
  return (
    <section id={id} style={{ background: 'var(--js-paper)', padding: 'clamp(72px, 10vw, 120px) clamp(20px, 5vw, 44px) clamp(76px, 10vw, 124px)' }}>
      <div style={{ maxWidth: 1312, margin: '0 auto' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, marginBottom: 'clamp(36px, 5vw, 52px)', flexWrap: 'wrap' }}>
            <div style={{ maxWidth: 620 }}>
              <Eyebrow>{eyebrow}</Eyebrow>
              <h2 style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(32px, 4.4vw, 56px)', lineHeight: 1.02, letterSpacing: '-0.012em', color: 'var(--js-ink)', margin: '14px 0 16px' }}>{title}</h2>
              {sub && <p style={{ fontFamily: 'var(--js-sans)', fontSize: 'clamp(16px, 2vw, 18px)', lineHeight: 1.55, color: 'var(--js-fg-body)', margin: 0 }}>{sub}</p>}
            </div>
            <Button variant="text" onClick={() => goNav('look-book.html')}>Shop all &rarr;</Button>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', gap, transform: `translateX(${-index * step}px)`, transition: 'transform var(--js-dur-slow) var(--js-ease)' }}>
              {items.map((p, i) => (
                <div key={p.id} ref={i === 0 ? cardRef : null} style={{ flex: `0 0 calc((100% - ${gap * (VISIBLE - 1)}px) / ${VISIBLE})` }}>
                  <ProductCard product={p} onClick={() => (onOpen ? onOpen(p) : goNav('look-book.html'))} />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'clamp(28px, 4vw, 44px)' }}>
          <div style={{ display: 'flex', gap: 9 }}>
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} aria-label={`Slide ${i + 1}`} style={{
                width: i === index ? 30 : 9, height: 9, padding: 0, border: 'none', cursor: 'pointer',
                borderRadius: 999, background: i === index ? 'var(--js-ink)' : 'var(--js-mist)',
                transition: 'all var(--js-dur) var(--js-ease)',
              }} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 14 }}>
            <SliderArrow dir="left" disabled={index === 0} onClick={() => go(-1)} />
            <SliderArrow dir="right" disabled={index === maxIndex} onClick={() => go(1)} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Full-bleed image CTA band (Relume CTA/31) ---------- */
function CTABanner({ eyebrow = 'The Atelier', title, sub, img, primary = 'Shop the collection', onPrimary, ghost = 'Book the showroom', onGhost }) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 'clamp(88px, 14vw, 200px) clamp(20px, 5vw, 44px)' }}>
      <img src={img} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '55% 32%' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(23,19,15,0.5), rgba(23,19,15,0.6))' }} />
      <Reveal style={{ position: 'relative', textAlign: 'center', maxWidth: 720 }}>
        <Eyebrow style={{ color: 'rgba(250,248,244,0.85)' }}>{eyebrow}</Eyebrow>
        <h2 style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(38px, 5vw, 68px)', lineHeight: 1.0, letterSpacing: '-0.014em', color: 'var(--js-paper)', margin: '16px 0 14px' }}>{title}</h2>
        {sub && <p style={{ fontFamily: 'var(--js-sans)', fontSize: 18, lineHeight: 1.55, color: 'rgba(250,248,244,0.9)', margin: '0 auto 34px', maxWidth: 520 }}>{sub}</p>}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="solid" style={{ background: 'var(--js-paper)', color: 'var(--js-ink)' }} onClick={onPrimary || (() => goNav('look-book.html'))}>{primary}</Button>
          {ghost && <Button variant="ghostLight" onClick={onGhost || (() => goNav('contact.html'))}>{ghost}</Button>}
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- Segmented control (toggle pills) ---------- */
function Segmented({ options, value, onChange, onDark }) {
  return (
    <div style={{ display: 'inline-flex', border: '1px solid ' + (onDark ? 'rgba(250,248,244,0.4)' : 'var(--js-mist)'), borderRadius: 'var(--js-radius-sm)', padding: 4, background: onDark ? 'rgba(250,248,244,0.06)' : 'var(--js-surface-raised)' }}>
      {options.map(o => {
        const active = o === value;
        return (
          <button key={o} onClick={() => onChange(o)} style={{
            fontFamily: 'var(--js-sans)', fontWeight: 600, fontSize: 13, letterSpacing: '0.03em', cursor: 'pointer', border: 'none',
            padding: '11px 28px', borderRadius: 'var(--js-radius-sm)', transition: 'all var(--js-dur) var(--js-ease)',
            background: active ? (onDark ? 'var(--js-paper)' : 'var(--js-ink)') : 'transparent',
            color: active ? (onDark ? 'var(--js-ink)' : 'var(--js-paper)') : (onDark ? 'rgba(250,248,244,0.8)' : 'var(--js-espresso)'),
          }}>{o}</button>
        );
      })}
    </div>
  );
}

/* ---------- Toggle CTA band (centered heading + segmented + big image) ----------
   modes: [{ key, img, pos, caption, cta, onClick }] */
function ToggleCTA({ eyebrow, title, sub, modes, ground = 'paper', collage }) {
  const [i, setI] = useState(0);
  const m = modes[i];
  return (
    <section style={{ background: ground === 'alabaster' ? 'var(--js-alabaster)' : 'var(--js-paper)', padding: 'clamp(72px, 10vw, 120px) clamp(20px, 5vw, 44px) clamp(76px, 10vw, 120px)' }}>
      <div style={{ maxWidth: 1312, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto clamp(28px, 4vw, 40px)' }}>
            {eyebrow && <Eyebrow style={{ marginBottom: 14 }}>{eyebrow}</Eyebrow>}
            <h2 style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(34px, 4.4vw, 58px)', lineHeight: 1.02, letterSpacing: '-0.014em', color: 'var(--js-ink)', margin: 0 }}>{title}</h2>
            {sub && <p style={{ fontFamily: 'var(--js-sans)', fontSize: 18, lineHeight: 1.55, color: 'var(--js-fg-body)', margin: '16px auto 0', maxWidth: 520 }}>{sub}</p>}
          </div>
          {modes.length > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'clamp(36px, 5vw, 56px)' }}>
              <Segmented options={modes.map(x => x.key)} value={m.key} onChange={k => setI(modes.findIndex(x => x.key === k))} />
            </div>
          )}
          {modes.length === 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'clamp(36px, 5vw, 56px)' }}>
              <Button variant="solid" onClick={m.onClick || (() => goNav('contact.html'))}>{m.cta}</Button>
            </div>
          )}
        </Reveal>
        <Reveal delay={100}>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/8', overflow: 'hidden', background: 'var(--js-alabaster)' }}>
            {collage ? (
              <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: 4 }}>
                {collage.map((c, idx) => (
                  <div key={idx} style={{ position: 'relative', overflow: 'hidden', background: 'var(--js-mist)', gridColumn: idx === 0 ? 'span 2' : 'span 1', gridRow: idx === 0 ? 'span 2' : 'span 1' }}>
                    <img src={c.img} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: c.pos }} />
                  </div>
                ))}
              </div>
            ) : (
              modes.map((mm, idx) => (
                <img key={mm.key} src={mm.img} alt={mm.key} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: mm.pos, opacity: idx === i ? 1 : 0, transition: 'opacity var(--js-dur-slow) var(--js-ease)' }} />
              ))
            )}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(23,19,15,0.6), rgba(23,19,15,0.05) 55%)' }} />
            <div style={{ position: 'absolute', left: 'clamp(24px, 4vw, 48px)', right: 'clamp(24px, 4vw, 48px)', bottom: 'clamp(24px, 4vw, 44px)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
              <div style={{ maxWidth: 420 }}>
                <div style={{ fontFamily: 'var(--js-mono)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(250,248,244,0.85)' }}>{m.key}</div>
                <div style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(22px, 2.4vw, 30px)', lineHeight: 1.1, color: 'var(--js-paper)', marginTop: 8 }}>{m.caption}</div>
              </div>
              <Button variant="solid" style={{ background: 'var(--js-paper)', color: 'var(--js-ink)', display: modes.length > 1 ? 'inline-flex' : 'none' }} onClick={m.onClick || (() => goNav('contact.html'))}>{m.cta}</Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Buyer testimonials (3-column, retailer quotes) ---------- */
function BuyerTestimonials({ eyebrow = 'Testimonials', title, sub, items, ground = 'paper' }) {
  const bp = useBreakpoint();
  return (
    <section style={{ background: ground === 'alabaster' ? 'var(--js-alabaster)' : 'var(--js-paper)', padding: 'clamp(72px, 10vw, 120px) clamp(20px, 5vw, 44px)' }}>
      <div style={{ maxWidth: 1312, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto clamp(48px, 7vw, 72px)' }}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.04, letterSpacing: '-0.012em', color: 'var(--js-ink)', margin: '14px 0 16px' }}>{title}</h2>
            {sub && <p style={{ fontFamily: 'var(--js-sans)', fontSize: 18, lineHeight: 1.55, color: 'var(--js-fg-body)', margin: 0 }}>{sub}</p>}
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: bp === 'mobile' ? '1fr' : 'repeat(3, 1fr)', gap: 'clamp(32px, 4vw, 48px)' }}>
          {items.map((t, i) => (
            <Reveal key={i} delay={i * 90}>
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', borderTop: '1px solid var(--js-mist)', paddingTop: 30 }}>
                <div style={{ fontFamily: 'var(--js-serif)', fontSize: 44, lineHeight: 0.6, color: 'var(--js-mist)', height: 24 }}>&ldquo;</div>
                <p style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(20px, 1.7vw, 23px)', lineHeight: 1.32, letterSpacing: '-0.006em', color: 'var(--js-ink)', margin: '10px 0 28px', flex: 1 }}>{t.quote}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ width: 44, height: 44, borderRadius: 999, background: 'var(--js-ink)', color: 'var(--js-paper)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--js-serif)', fontSize: 17, flexShrink: 0 }}>{t.who.split(' ').map(w => w[0]).join('')}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--js-sans)', fontWeight: 600, fontSize: 15, color: 'var(--js-ink)' }}>{t.who}</div>
                    <div style={{ fontFamily: 'var(--js-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--js-stone)', marginTop: 3 }}>{t.meta}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Newsletter band (dark Ink) ---------- */
function NewsletterBand({ eyebrow = 'Stay in the loop', title = 'First notice, no noise.', sub = 'Get first notice of new arrivals and exclusive wholesale offers.' }) {
  const [val, setVal] = useState('');
  const [done, setDone] = useState(false);
  return (
    <section className="js-on-dark" style={{ background: 'var(--js-ink)', color: 'var(--js-paper)', padding: 'clamp(72px, 10vw, 120px) clamp(20px, 5vw, 44px)' }}>
      <Reveal style={{ maxWidth: 620, margin: '0 auto', textAlign: 'center' }}>
        <Eyebrow style={{ color: 'rgba(250,248,244,0.7)' }}>{eyebrow}</Eyebrow>
        <h2 style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(34px, 4.4vw, 56px)', lineHeight: 1.02, letterSpacing: '-0.012em', color: 'var(--js-paper)', margin: '16px 0 14px' }}>{title}</h2>
        <p style={{ fontFamily: 'var(--js-sans)', fontSize: 17, lineHeight: 1.55, color: 'rgba(250,248,244,0.82)', margin: '0 auto 32px', maxWidth: 460 }}>{sub}</p>
        <form onSubmit={e => { e.preventDefault(); setDone(true); }} style={{ display: 'flex', maxWidth: 480, margin: '0 auto', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <input value={val} onChange={e => setVal(e.target.value)} placeholder="Enter your email" type="email"
            style={{ flex: '1 1 240px', minWidth: 200, border: '1px solid rgba(250,248,244,0.45)', background: 'rgba(250,248,244,0.07)', outline: 'none', fontFamily: 'var(--js-sans)', fontSize: 15, color: 'var(--js-paper)', padding: '15px 18px', borderRadius: 'var(--js-radius-sm)' }} />
          <Button variant="solid" onClick={() => setDone(true)} style={{ background: 'var(--js-paper)', color: 'var(--js-ink)' }}>{done ? 'Joined ✓' : 'Subscribe'}</Button>
        </form>
        <div style={{ fontFamily: 'var(--js-sans)', fontSize: 12, color: 'rgba(250,248,244,0.6)', marginTop: 18 }}>By clicking Subscribe you confirm you agree with our Terms and Conditions.</div>
      </Reveal>
    </section>
  );
}

/* ---------- Split intro: heading left, paragraph right (Home / About) ---------- */
function SplitIntro({ heading, body, ground = 'paper' }) {
  const bp = useBreakpoint();
  const stack = bp !== 'desktop';
  const dark = ground === 'ink';
  const multi = Array.isArray(body);
  const bg = dark ? '#2A1E14' : ground === 'alabaster' ? 'var(--js-alabaster)' : 'var(--js-paper)';
  return (
    <section className={dark ? 'js-on-dark' : undefined} style={{ background: bg, borderTop: dark ? '1px solid rgba(222,216,207,0.16)' : 'none', padding: 'clamp(64px, 9vw, 110px) clamp(20px, 5vw, 44px)' }}>
      <div style={{ maxWidth: 1312, margin: '0 auto', display: 'grid', gridTemplateColumns: stack ? '1fr' : '1fr 1.1fr', gap: 'clamp(24px, 5vw, 80px)', alignItems: 'start' }}>
        <Reveal>
          <h2 style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: multi ? 'clamp(30px, 3.6vw, 44px)' : 'clamp(32px, 4.2vw, 52px)', lineHeight: 1.08, letterSpacing: '-0.014em', color: dark ? 'var(--js-paper)' : 'var(--js-ink)', margin: 0, maxWidth: multi ? 520 : 420, textWrap: 'balance' }}>{heading}</h2>
        </Reveal>
        <Reveal delay={90}>
          {multi ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {body.map((p, i) => (
                <p key={i} style={{ fontFamily: 'var(--js-sans)', fontSize: 'clamp(16px, 1.5vw, 18px)', lineHeight: 1.7, color: dark ? '#C9C2B8' : 'var(--js-fg-body)', margin: 0 }}>{p}</p>
              ))}
            </div>
          ) : (
            <p style={{ fontFamily: 'var(--js-sans)', fontSize: 'clamp(16px, 1.5vw, 18px)', lineHeight: 1.7, color: dark ? '#C9C2B8' : 'var(--js-fg-body)', margin: 0 }}>{body}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Full-bleed-within-container image band (About) ---------- */
function ImageBand({ img, pos = '50% 35%', height = 'clamp(320px, 42vw, 540px)', ground = 'paper' }) {
  return (
    <section style={{ background: ground === 'alabaster' ? 'var(--js-alabaster)' : 'var(--js-paper)', padding: '0 clamp(20px, 5vw, 44px) clamp(64px, 9vw, 110px)' }}>
      <Reveal style={{ maxWidth: 1312, margin: '0 auto' }}>
        <div style={{ position: 'relative', height, overflow: 'hidden', background: 'var(--js-alabaster)' }}>
          <img src={img} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos }} />
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- Lookbook collection slider (Home) ---------- */
function EventCard({ e }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={() => goNav('look-book.html')} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: 'var(--js-alabaster)' }}>
        <img src={e.img} alt={e.title} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: e.pos, transform: hov ? 'scale(1.04)' : 'scale(1)', transition: 'transform var(--js-dur-slow) var(--js-ease)' }} />
      </div>
      <div style={{ marginTop: 18, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 24, lineHeight: 1.1, color: 'var(--js-ink)', margin: '0 0 10px' }}>{e.title}</h3>
        <p style={{ fontFamily: 'var(--js-sans)', fontSize: 15.5, lineHeight: 1.55, color: 'var(--js-fg-body)', margin: '0 0 16px', flex: 1 }}>{e.body}</p>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--js-mono)', fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--js-ink)', borderBottom: '1px solid var(--js-ink)', paddingBottom: 4, alignSelf: 'flex-start', opacity: hov ? 0.55 : 1, transition: 'opacity var(--js-dur) var(--js-ease)' }}>View collection <Icon name="arrowRight" size={14} /></span>
      </div>
    </div>
  );
}

function ShowroomEvents({ items = [] }) {
  const bp = useBreakpoint();
  const VISIBLE = bp === 'mobile' ? 1 : bp === 'tablet' ? 2 : 3;
  const maxIndex = Math.max(0, items.length - VISIBLE);
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const cardRef = useRef(null);
  const gap = bp === 'mobile' ? 16 : 28;
  const peek = bp === 'mobile' ? 44 : 70; // sliver of the next card to signal more
  useEffect(() => {
    const measure = () => { if (cardRef.current) setStep(cardRef.current.getBoundingClientRect().width + gap); };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [bp]);
  useEffect(() => { setIndex(i => Math.min(i, maxIndex)); }, [maxIndex]);
  const go = (d) => setIndex(i => Math.min(maxIndex, Math.max(0, i + d)));
  return (
    <section style={{ background: 'var(--js-paper)', padding: 'clamp(72px, 10vw, 120px) clamp(20px, 5vw, 44px)' }}>
      <div style={{ maxWidth: 1312, margin: '0 auto' }}>
        <Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 24, marginBottom: 'clamp(36px, 5vw, 52px)' }}>
            <div style={{ maxWidth: 620 }}>
              <Eyebrow>Fall &rsquo;26</Eyebrow>
              <h2 style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(34px, 4.4vw, 56px)', lineHeight: 1.02, letterSpacing: '-0.014em', color: 'var(--js-ink)', margin: '14px 0 12px' }}>From the lookbook</h2>
              <p style={{ fontFamily: 'var(--js-sans)', fontSize: 18, lineHeight: 1.55, color: 'var(--js-fg-body)', margin: 0 }}>Explore this season&rsquo;s collections.</p>
            </div>
            <Button variant="ghost" onClick={() => goNav('look-book.html')}>View all</Button>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', gap, transform: `translateX(${-index * step}px)`, transition: 'transform var(--js-dur-slow) var(--js-ease)' }}>
              {items.map((e, i) => (
                <div key={i} ref={i === 0 ? cardRef : null} style={{ flex: `0 0 calc((100% - ${gap * (VISIBLE - 1)}px - ${peek}px) / ${VISIBLE})` }}>
                  <EventCard e={e} />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'clamp(28px, 4vw, 44px)' }}>
          <div style={{ width: 118 }} />
          <div style={{ display: 'flex', gap: 9 }}>
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} aria-label={`Slide ${i + 1}`} style={{ width: i === index ? 30 : 9, height: 9, padding: 0, border: 'none', cursor: 'pointer', borderRadius: 999, background: i === index ? 'var(--js-ink)' : 'var(--js-mist)', transition: 'all var(--js-dur) var(--js-ease)' }} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 14, width: 118, justifyContent: 'flex-end' }}>
            <SliderArrow dir="left" disabled={index === 0} onClick={() => go(-1)} />
            <SliderArrow dir="right" disabled={index === maxIndex} onClick={() => go(1)} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Events calendar: months that expand to their events (accordion) ---------- */
function EventRow({ e, last }) {
  const [hov, setHov] = useState(false);
  const range = !!e.endDate;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '112px 1fr', gap: 'clamp(16px, 3vw, 36px)', alignItems: 'baseline', padding: 'clamp(20px, 2.6vw, 28px) 0', borderBottom: last ? 'none' : '1px solid var(--js-mist)' }}>
      <div style={{ textAlign: 'left' }}>
        <div style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(30px, 3vw, 40px)', lineHeight: 0.9, color: 'var(--js-ink)', letterSpacing: '-0.01em' }}>{e.date}{range ? <span style={{ color: 'var(--js-stone)' }}>&ndash;{e.endDate}</span> : ''}</div>
        <div style={{ fontFamily: 'var(--js-mono)', fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--js-stone)', marginTop: 8 }}>{e.day}{range ? ` – ${e.endDay}` : ''}</div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '6px 18px' }}>
        <div style={{ flex: '1 1 320px', minWidth: 240 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--js-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--js-paper)', background: 'var(--js-ink)', padding: '4px 10px', borderRadius: 'var(--js-radius-sm)' }}>{e.season}</span>
            <h4 style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(21px, 2vw, 26px)', lineHeight: 1.12, letterSpacing: '-0.008em', color: 'var(--js-ink)', margin: 0 }}>{e.title}</h4>
          </div>
          <p style={{ fontFamily: 'var(--js-sans)', fontSize: 15.5, lineHeight: 1.55, color: 'var(--js-fg-body)', margin: '10px 0 0', maxWidth: 560 }}>{e.body}</p>
        </div>
        <div style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start', minWidth: 168 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--js-mono)', fontSize: 11, letterSpacing: '0.08em', color: 'var(--js-espresso)' }}><Icon name="pin" size={14} stroke={1.4} />{e.city}</span>
          <a href={e.href || undefined} target={e.href ? '_blank' : undefined} rel={e.href ? 'noopener noreferrer' : undefined} onClick={e.href ? undefined : () => goNav('contact.html')} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'var(--js-mono)', fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--js-ink)', borderBottom: '1px solid var(--js-ink)', paddingBottom: 3, cursor: 'pointer', marginTop: 2, opacity: hov ? 0.55 : 1, transition: 'opacity var(--js-dur) var(--js-ease)' }}>Register <Icon name="arrowRight" size={13} /></a>
        </div>
      </div>
    </div>
  );
}

function MonthBlock({ m, open, onToggle, first, current, past }) {
  const [hov, setHov] = useState(false);
  const headColor = past ? 'var(--js-stone)' : (open || hov ? 'var(--js-ink)' : 'var(--js-espresso)');
  return (
    <div style={{ borderTop: first ? 'none' : '1px solid var(--js-mist)' }}>
      <button onClick={onToggle} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} aria-expanded={open}
        style={{ width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, padding: 'clamp(24px, 3vw, 34px) 0', opacity: past && !hov && !open ? 0.5 : 1, transition: 'opacity var(--js-dur) var(--js-ease)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(14px, 2vw, 24px)', flexWrap: 'wrap' }}>
          <h3 style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(30px, 4vw, 50px)', lineHeight: 1, letterSpacing: '-0.012em', color: headColor, margin: 0, transition: 'color var(--js-dur) var(--js-ease)' }}>{m.month}</h3>
          <span style={{ fontFamily: 'var(--js-mono)', fontSize: 12, letterSpacing: '0.16em', color: 'var(--js-stone)' }}>{m.year}</span>
          {current && <span style={{ fontFamily: 'var(--js-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--js-paper)', background: 'var(--js-ink)', padding: '5px 11px', borderRadius: 'var(--js-radius-sm)' }}>This month</span>}
          {past && <span style={{ fontFamily: 'var(--js-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--js-stone)', border: '1px solid var(--js-mist)', padding: '4px 10px', borderRadius: 'var(--js-radius-sm)' }}>Past</span>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px, 2.4vw, 28px)' }}>
          <span style={{ fontFamily: 'var(--js-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--js-stone)', whiteSpace: 'nowrap' }}>{m.events.length} event{m.events.length === 1 ? '' : 's'}</span>
          <span style={{ display: 'flex', flexShrink: 0, width: 44, height: 44, borderRadius: 999, border: '1px solid ' + (open || hov ? 'var(--js-ink)' : 'var(--js-mist)'), alignItems: 'center', justifyContent: 'center', background: open ? 'var(--js-ink)' : 'transparent', color: open ? 'var(--js-paper)' : 'var(--js-ink)', transition: 'all var(--js-dur) var(--js-ease)' }}>
            <span style={{ display: 'flex', transform: open ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform var(--js-dur) var(--js-ease)' }}><Icon name="plus" size={20} /></span>
          </span>
        </div>
      </button>
      <div style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: 'grid-template-rows var(--js-dur-slow) var(--js-ease)' }}>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ paddingLeft: 'clamp(0px, 1vw, 12px)', paddingBottom: open ? 'clamp(12px, 2vw, 24px)' : 0 }}>
            {m.events.map((e, i) => <EventRow key={i} e={e} last={i === m.events.length - 1} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

function SingleMonth({ m }) {
  return (
    <div style={{ borderTop: '1px solid var(--js-ink)', borderBottom: '1px solid var(--js-ink)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, padding: 'clamp(24px, 3vw, 34px) 0', borderBottom: '1px solid var(--js-mist)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(12px, 2vw, 20px)', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--js-mono)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--js-stone)' }}>This month</span>
          <h3 style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(30px, 4vw, 50px)', lineHeight: 1, letterSpacing: '-0.012em', color: 'var(--js-ink)', margin: 0 }}>{m.month} <span style={{ color: 'var(--js-stone)', fontSize: '0.62em' }}>{m.year}</span></h3>
        </div>
        <span style={{ fontFamily: 'var(--js-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--js-stone)', whiteSpace: 'nowrap' }}>{m.events.length} event{m.events.length === 1 ? '' : 's'}</span>
      </div>
      <div style={{ paddingLeft: 'clamp(0px, 1vw, 12px)' }}>
        {m.events.map((e, i) => <EventRow key={i} e={e} last={i === m.events.length - 1} />)}
      </div>
    </div>
  );
}

function EventsCalendar({ items = [], eyebrow = 'Showroom · 2026', title = 'Where to find us this season', sub = 'Previews, market weeks, and buying appointments — month by month. Expand the calendar for the full season.' }) {
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const now = new Date();
  const curName = now.toLocaleString('en-US', { month: 'long' });
  const curYear = String(now.getFullYear());
  const curM = now.getMonth();
  const curY = now.getFullYear();
  const isPast = (m) => ((parseInt(m.year, 10) - curY) * 12 + (MONTHS.indexOf(m.month) - curM)) < 0;
  let curIdx = items.findIndex(m => m.month === curName && m.year === curYear);
  if (curIdx < 0) curIdx = 0;
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState(() => new Set([curIdx]));
  const toggle = (i) => setOpen(prev => {
    const next = new Set(prev);
    next.has(i) ? next.delete(i) : next.add(i);
    return next;
  });
  return (
    <section style={{ background: 'var(--js-paper)', padding: 'clamp(72px, 10vw, 120px) clamp(20px, 5vw, 44px)' }}>
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto clamp(40px, 6vw, 64px)' }}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(34px, 4.4vw, 58px)', lineHeight: 1.02, letterSpacing: '-0.014em', color: 'var(--js-ink)', margin: '14px 0 16px' }}>{title}</h2>
            <p style={{ fontFamily: 'var(--js-sans)', fontSize: 18, lineHeight: 1.55, color: 'var(--js-fg-body)', margin: 0 }}>{sub}</p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          {showAll ? (
            <div style={{ borderTop: '1px solid var(--js-ink)', borderBottom: '1px solid var(--js-ink)' }}>
              {items.map((m, i) => <MonthBlock key={i} m={m} first={i === 0} current={i === curIdx} past={isPast(m)} open={open.has(i)} onToggle={() => toggle(i)} />)}
            </div>
          ) : (
            <SingleMonth m={items[curIdx]} />
          )}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'clamp(36px, 5vw, 52px)' }}>
            <Button variant="ghost" onClick={() => setShowAll(s => !s)}>
              {showAll ? 'Show this month only' : `View the full ${curYear} calendar`}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function EventsYear({ items = [] }) {
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const now = new Date();
  const curM = now.getMonth();
  const curY = now.getFullYear();
  // Keep only the current month through 6 months into the future (chronological).
  const ordered = items.filter(m => {
    const diff = (parseInt(m.year, 10) - curY) * 12 + (MONTHS.indexOf(m.month) - curM);
    return diff >= 0 && diff <= 6;
  });
  const isCurrent = (m) => MONTHS.indexOf(m.month) === curM && parseInt(m.year, 10) === curY;
  const [open, setOpen] = useState(() => new Set([0]));
  const toggle = (i) => setOpen(prev => {
    const next = new Set(prev);
    next.has(i) ? next.delete(i) : next.add(i);
    return next;
  });
  return (
    <section style={{ background: 'var(--js-paper)', padding: 'clamp(64px, 9vw, 110px) clamp(20px, 5vw, 44px)' }}>
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        <Reveal>
          <div style={{ borderTop: '1px solid var(--js-ink)', borderBottom: '1px solid var(--js-ink)' }}>
            {ordered.map((m, i) => (
              <MonthBlock key={m.month + m.year} m={m} first={i === 0} current={isCurrent(m)} open={open.has(i)} onToggle={() => toggle(i)} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Pieces in motion: bento (5 slots) that crossfades through scenes ---------- */
function MotionSlot({ scenes, idx, pick, style }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--js-alabaster)', ...style }}>
      {scenes.map((s, si) => {
        const im = pick(s);
        return <img key={si} src={im.img} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: im.pos, opacity: si === idx ? 1 : 0, transition: 'opacity var(--js-dur-slow) var(--js-ease)' }} />;
      })}
    </div>
  );
}
function MotionBento({ data, eyebrow, title = 'Pieces in motion', sub }) {
  const bp = useBreakpoint();
  const stack = bp === 'mobile';
  const scenes = data.scenes;
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx(i => (i + 1) % scenes.length), 4200);
    return () => clearInterval(t);
  }, [paused, scenes.length]);
  const go = (d) => setIdx(i => (i + d + scenes.length) % scenes.length);
  return (
    <section onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} style={{ background: 'var(--js-alabaster)', padding: 'clamp(72px, 10vw, 120px) clamp(20px, 5vw, 44px)' }}>
      <div style={{ maxWidth: 1312, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto clamp(44px, 6vw, 64px)' }}>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h2 style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(34px, 4.4vw, 56px)', lineHeight: 1.02, letterSpacing: '-0.014em', color: 'var(--js-ink)', margin: '14px 0 14px' }}>{title}</h2>
            <p style={{ fontFamily: 'var(--js-sans)', fontSize: 18, lineHeight: 1.55, color: 'var(--js-fg-body)', margin: 0 }}>{sub || 'Watch our collections take shape across the floor.'}</p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div style={{ display: 'grid', gridTemplateColumns: stack ? '1fr' : '1.1fr 1fr', gap: 'clamp(16px, 2vw, 24px)', alignItems: 'stretch' }}>
            <MotionSlot scenes={scenes} idx={idx} pick={s => s.big} style={{ minHeight: stack ? 'clamp(420px, 100vw, 560px)' : 'auto' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridAutoRows: '1fr', gap: 'clamp(16px, 2vw, 24px)' }}>
              {[0, 1, 2, 3].map(j => (
                <MotionSlot key={j} scenes={scenes} idx={idx} pick={s => s.grid[j]} style={{ aspectRatio: stack ? '3/4' : 'auto', minHeight: stack ? 'auto' : 'clamp(230px, 25vw, 350px)' }} />
              ))}
            </div>
          </div>
        </Reveal>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'clamp(28px, 4vw, 40px)' }}>
          <div style={{ width: 120 }} />
          <div style={{ display: 'flex', gap: 9 }}>
            {scenes.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} aria-label={`Scene ${i + 1}`} style={{ width: i === idx ? 30 : 9, height: 9, padding: 0, border: 'none', cursor: 'pointer', borderRadius: 999, background: i === idx ? 'var(--js-ink)' : 'var(--js-mist)', transition: 'all var(--js-dur) var(--js-ease)' }} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 14, width: 120, justifyContent: 'flex-end' }}>
            <SliderArrow dir="left" onClick={() => go(-1)} />
            <SliderArrow dir="right" onClick={() => go(1)} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Dark "buyers" band: heading left, image + paragraph right ---------- */
function BuyersBand({ data }) {
  const bp = useBreakpoint();
  const stack = bp !== 'desktop';
  return (
    <section className="js-on-dark" style={{ background: 'var(--js-ink)', color: 'var(--js-paper)', padding: 'clamp(72px, 10vw, 120px) clamp(20px, 5vw, 44px)' }}>
      <div style={{ maxWidth: 1312, margin: '0 auto', display: 'grid', gridTemplateColumns: stack ? '1fr' : '1fr 1.05fr', gap: 'clamp(32px, 5vw, 80px)', alignItems: 'center' }}>
        <Reveal>
          <div>
            <h2 style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(32px, 4.2vw, 52px)', lineHeight: 1.04, letterSpacing: '-0.014em', color: 'var(--js-paper)', margin: '0 0 24px', maxWidth: 460 }}>{data.heading}</h2>
            <p style={{ fontFamily: 'var(--js-sans)', fontSize: 'clamp(15px, 1.4vw, 17px)', lineHeight: 1.7, color: '#C9C2B8', margin: 0, maxWidth: 460 }}>{data.body}</p>
          </div>
        </Reveal>
        <Reveal delay={90}>
          <div style={{ position: 'relative', width: '100%', aspectRatio: stack ? '4/3' : '4/5', overflow: 'hidden', background: 'rgba(250,248,244,0.08)' }}>
            <img src={data.img} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: data.pos }} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

Object.assign(window, { Reveal, Ticker, PageHeader, ProductCard, SliderArrow, CollectionSlider, CTABanner, Segmented, ToggleCTA, BuyerTestimonials, NewsletterBand, SplitIntro, ImageBand, ShowroomEvents, EventsCalendar, EventsYear, MotionBento, BuyersBand });
window.__SHARED_VERSION = 14;
