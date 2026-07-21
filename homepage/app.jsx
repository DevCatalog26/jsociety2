/* global React, ReactDOM, window, PARTNERSHIP, GALLERY, HOME_CRAFT, HOME_BUYERS, MOTION, EVENTS_CALENDAR, Eyebrow, Button, Nav, Footer, Icon, goNav, scrollToId, Reveal, Ticker, SplitIntro, ShowroomEvents, EventsCalendar, MotionBento, BuyersBand, ToggleCTA, NewsletterBand, useBreakpoint, useTweaks, TweaksPanel, TweakSection, TweakSlider, TweakText, TweakToggle, TweakRadio */
// j. society — Home (Hero · Craft intro · Showroom events · Pieces in motion · Buyers band · Partnership · Ready to stock · Newsletter · Footer)

const { useState, useEffect } = React;

/* ============ HERO ============ */
function Hero({ t }) {
  return (
    <section style={{ position: 'relative', height: '92vh', minHeight: 600, marginTop: -78, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img src="images/hero.jpg" alt="j. society Fall '26" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '62% 30%' }} />
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, rgba(23,19,15,${Math.min(0.96, t.heroDim / 100 + 0.34)}), rgba(23,19,15,${t.heroDim / 100 * 0.62}) 52%, rgba(23,19,15,${t.heroDim / 100 * 0.74}))` }} />
      <div style={{ position: 'relative', width: '100%', padding: '78px clamp(20px, 5vw, 44px) 0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <Reveal>
          <Eyebrow style={{ color: 'rgba(250,248,244,0.9)' }}>Wholesale · Est. 2020 · New York</Eyebrow>
        </Reveal>
        <Reveal delay={90}>
          <h1 style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(46px, 7vw, 104px)', lineHeight: 0.98, letterSpacing: '-0.014em', color: 'var(--js-paper)', margin: '18px 0 0', maxWidth: 1040, textWrap: 'balance' }}>
            {t.heroHeadline}
          </h1>
        </Reveal>
        <Reveal delay={180}>
          <p style={{ fontFamily: 'var(--js-sans)', fontSize: 'clamp(16px, 2vw, 19px)', lineHeight: 1.6, color: 'rgba(250,248,244,0.9)', margin: '24px 0 0', maxWidth: 600 }}>
            j. society brings quality wholesale apparel to retailers who demand excellence. We design, source, and deliver pieces that move.
          </p>
        </Reveal>
        <Reveal delay={260}>
          <div style={{ display: 'flex', gap: 16, marginTop: 36, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="solid" style={{ background: 'var(--js-paper)', color: 'var(--js-ink)' }} onClick={() => scrollToId('collection')}>Explore the collection</Button>
            <Button variant="ghostLight" onClick={() => goNav('contact.html')}>Contact us</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ PARTNERSHIP — "What we offer our retail partners" ============ */
function Partnership() {
  const bp = useBreakpoint();
  return (
    <section style={{ background: 'var(--js-alabaster)', padding: 'clamp(80px, 11vw, 132px) clamp(20px, 5vw, 44px)' }}>
      <div style={{ maxWidth: 1312, margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto clamp(48px, 7vw, 76px)' }}>
            <Eyebrow>Partnership</Eyebrow>
            <h2 style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(34px, 4.4vw, 58px)', lineHeight: 1.02, letterSpacing: '-0.014em', color: 'var(--js-ink)', margin: '14px 0 18px' }}>
              What we offer our retail partners
            </h2>
            <p style={{ fontFamily: 'var(--js-sans)', fontSize: 18, lineHeight: 1.6, color: 'var(--js-fg-body)', margin: 0 }}>
              We understand the retail business. Our collections are built for buyers who know quality when they see it — we handle the work so you can focus on selling.
            </p>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: bp === 'mobile' ? '1fr' : 'repeat(3, 1fr)', gap: 'clamp(32px, 4vw, 44px)' }}>
          {PARTNERSHIP.map((p, i) => (
            <Reveal key={p.k} delay={i * 90}>
              <div>
                <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: 'var(--js-alabaster)' }}>
                  <img src={p.img} alt={p.title} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: p.pos }} />
                  <div style={{ position: 'absolute', left: 18, top: 16, fontFamily: 'var(--js-mono)', fontSize: 11, letterSpacing: '0.2em', color: 'rgba(250,248,244,0.95)', textShadow: '0 1px 8px rgba(23,19,15,0.4)' }}>{p.k}</div>
                </div>
                <h3 style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(24px, 2.4vw, 30px)', lineHeight: 1.08, letterSpacing: '-0.01em', color: 'var(--js-ink)', margin: '22px 0 12px' }}>{p.title}</h3>
                <p style={{ fontFamily: 'var(--js-sans)', fontSize: 16, lineHeight: 1.62, color: 'var(--js-fg-body)', margin: 0 }}>{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'clamp(44px, 6vw, 64px)' }}>
            <Button variant="ghost" onClick={() => goNav('about.html')}>Learn how we work</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ APP ============ */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroHeadline": "Women’s fashion made in New York",
  "heroDim": 66,
  "showTicker": true,
  "showEvents": true,
  "showCalendar": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      setTimeout(() => scrollToId(id), 300);
    }
  }, []);
  return (
    <div>
      <Nav />
      <Hero t={t} />
      {t.showTicker && <Ticker />}
      <SplitIntro heading={HOME_CRAFT.heading} body={HOME_CRAFT.body} ground="ink" />
      {t.showEvents && <ShowroomEvents items={GALLERY} />}
      <MotionBento data={MOTION} />
      <BuyersBand data={HOME_BUYERS} />
      {t.showCalendar && <EventsCalendar items={EVENTS_CALENDAR} />}
      <NewsletterBand />
      <Footer />

      <TweaksPanel>
        <TweakSection label="Hero" />
        <TweakText label="Headline" value={t.heroHeadline} onChange={v => setTweak('heroHeadline', v)} />
        <TweakSlider label="Image dim" value={t.heroDim} min={0} max={80} unit="%" onChange={v => setTweak('heroDim', v)} />
        <TweakSection label="Sections" />
        <TweakToggle label="Marquee band" value={t.showTicker} onChange={v => setTweak('showTicker', v)} />
        <TweakToggle label="Lookbook collections" value={t.showEvents} onChange={v => setTweak('showEvents', v)} />
        <TweakToggle label="Events calendar" value={t.showCalendar} onChange={v => setTweak('showCalendar', v)} />
        <TweakSection label="Photos" />
        <PhotoSwaps />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
