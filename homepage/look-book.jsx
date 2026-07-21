/* global React, ReactDOM, window, Nav, Footer, Eyebrow, Button, Icon, goNav, Reveal, NewsletterBand, useBreakpoint */
// j. society — Fall 2026 Lookbook — faithful to the printed lookbook: 8:5 spreads,
// full-bleed lifestyle pages, two-portrait styling spreads with framed product insets,
// overlaid section titles, product tile grid.

const { useState } = React;

const SEP = '  —  ';
const SPREAD_H = 'clamp(560px, 61.5vw, 900px)';
// Strip text overlays (locators, look captions, titles, labels) from the photo
// spread sections — cover and opening statement keep their text. Flip to false
// to bring the overlays back.
const TEXTLESS = true;

function Locator({ children, color = 'var(--js-stone)', style }) {
  return (
    <span style={{ fontFamily: 'var(--js-mono)', fontSize: 11, letterSpacing: '0.26em', textTransform: 'uppercase', color, whiteSpace: 'nowrap', ...style }}>{children}</span>
  );
}

/* Garment caption block used over photos */
function LookCap({ n, name, color, onDark = true, align = 'left' }) {
  const fg = onDark ? 'var(--js-paper)' : 'var(--js-ink)';
  const mut = onDark ? 'rgba(250,248,244,0.7)' : 'var(--js-stone)';
  return (
    <div style={{ textAlign: align }}>
      {n && <Locator color={mut} style={{ fontSize: 10 }}>Look {n}</Locator>}
      <div style={{ marginTop: n ? 8 : 0, fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(19px, 2.1vw, 28px)', lineHeight: 1.08, color: fg }}>{name}</div>
      {color && <div style={{ marginTop: 7 }}><Locator color={onDark ? 'rgba(250,248,244,0.82)' : 'var(--js-stone)'} style={{ fontSize: 10.5 }}>{color}</Locator></div>}
    </div>
  );
}

/* ---------- Cover: full-bleed landscape with overlaid title ---------- */
function Cover() {
  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: 620, marginTop: -78, overflow: 'hidden', background: 'var(--js-ink)' }}>
      <img src="images/lb/cover.jpg" alt="j. society Fall 2026" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '62% 30%' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(23,19,15,0.52) 0%, rgba(23,19,15,0.08) 26%, rgba(23,19,15,0.05) 55%, rgba(23,19,15,0.62) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
        <Reveal delay={120}>
          <h1 style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(64px, 13vw, 184px)', lineHeight: 0.9, letterSpacing: '-0.02em', color: 'var(--js-paper)', margin: '18px 0 0' }}>Fall 2026</h1>
        </Reveal>
        <Reveal delay={220}>
          <p style={{ fontFamily: 'var(--js-serif)', fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(18px, 2.4vw, 27px)', color: 'rgba(250,248,244,0.94)', margin: '14px 0 0' }}>The Lookbook</p>
        </Reveal>
      </div>
      <div style={{ position: 'absolute', bottom: 'clamp(22px, 4vh, 40px)', left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <Locator color="rgba(250,248,244,0.72)" style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 8, fontSize: 10 }}>
          Scroll<Icon name="arrowRight" size={14} style={{ transform: 'rotate(90deg)', color: 'rgba(250,248,244,0.72)' }} />
        </Locator>
      </div>
    </section>
  );
}

/* ---------- Opening statement ---------- */
function Statement() {
  return (
    <section style={{ background: 'var(--js-paper)', padding: 'clamp(76px, 11vw, 140px) clamp(20px, 5vw, 44px)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <Reveal delay={90}>
          <p style={{ fontFamily: 'var(--js-serif)', fontWeight: 400, fontSize: 'clamp(26px, 3.6vw, 46px)', lineHeight: 1.24, letterSpacing: '-0.012em', color: 'var(--js-ink)', margin: '0', textWrap: 'balance' }}>
            Forty looks, sets and stripes, plaid and print &mdash; the not-so-basic basics, layered for the season and made to live in.
          </p>
        </Reveal>
        <Reveal delay={160}><div style={{ marginTop: 'clamp(34px, 4vw, 48px)', display: 'flex', justifyContent: 'center' }}><Locator>Est. 2020{SEP}New York</Locator></div></Reveal>
      </div>
    </section>
  );
}

/* ---------- Full-bleed lifestyle spread (single landscape) ---------- */
function SpreadSolo({ img, pos = '50% 40%', index, note, looks = [] }) {
  return (
    <section style={{ position: 'relative', height: SPREAD_H, overflow: 'hidden', background: 'var(--js-alabaster)' }}>
      <img onClick={() => goNav('collection-item.html')} src={img} alt={'Lifestyle ' + (index || '')} loading="lazy" style={{ cursor: 'pointer', position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(23,19,15,0.36) 0%, rgba(23,19,15,0) 22%, rgba(23,19,15,0) 50%, rgba(23,19,15,0.6) 100%)' }} />
      {!TEXTLESS && <div style={{ position: 'absolute', top: 'clamp(20px, 3vw, 40px)', left: 'clamp(20px, 5vw, 44px)', right: 'clamp(20px, 5vw, 44px)', display: 'flex', justifyContent: 'space-between' }}>
        <Locator color="rgba(250,248,244,0.92)">{index ? 'Lifestyle / ' + index : 'J. Society'}{SEP}J. Society{SEP}Fall 2026</Locator>
        {note && <Locator color="rgba(250,248,244,0.7)">{note}</Locator>}
      </div>}
      {!TEXTLESS && <div style={{ position: 'absolute', bottom: 'clamp(24px, 3.4vw, 48px)', left: 'clamp(20px, 5vw, 44px)', right: 'clamp(20px, 5vw, 44px)', display: 'flex', flexWrap: 'wrap', gap: 'clamp(20px, 4vw, 68px)' }}>
        {looks.map((l, i) => <LookCap key={i} n={String(i + 1).padStart(2, '0')} name={l.name} color={l.color} />)}
      </div>}
    </section>
  );
}

/* ---------- Section title spread (big serif over landscape) ---------- */
function SpreadTitle({ img, pos = '50% 35%', kicker, title, sub }) {
  return (
    <section style={{ position: 'relative', height: SPREAD_H, overflow: 'hidden', background: 'var(--js-ink)' }}>
      <img onClick={() => goNav('collection-item.html')} src={img} alt={title} loading="lazy" style={{ cursor: 'pointer', position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(23,19,15,0.5) 0%, rgba(23,19,15,0.18) 42%, rgba(23,19,15,0.5) 100%)' }} />
      {!TEXTLESS && <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
        <Reveal><Locator color="rgba(250,248,244,0.9)" style={{ letterSpacing: '0.3em' }}>{kicker}</Locator></Reveal>
        <Reveal delay={110}><h2 style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(46px, 8.4vw, 128px)', lineHeight: 0.94, letterSpacing: '-0.02em', color: 'var(--js-paper)', margin: '16px 0 0', textWrap: 'balance' }}>{title}</h2></Reveal>
        {sub && <Reveal delay={190}><p style={{ fontFamily: 'var(--js-serif)', fontStyle: 'italic', fontSize: 'clamp(16px, 2vw, 22px)', color: 'rgba(250,248,244,0.92)', margin: '14px 0 0' }}>{sub}</p></Reveal>}
      </div>}
    </section>
  );
}

/* ---------- Two-portrait styling spread with framed product inset ---------- */
function SpreadDuo({ index, kicker, left, right, inset, insetSide = 'left', insetLabel, insetBg = '#8a6a4a', looks = [] }) {
  const bp = useBreakpoint();
  const stack = bp === 'mobile';
  // Dominant color of the inset photo, computed live so it tracks uploaded swaps.
  // Read from an offscreen copy of the effective source (original or user override)
  // to avoid racing React/​the swap engine over the live <img>'s src.
  const insetKey = inset && inset.img;
  const [autoBg, setAutoBg] = React.useState(insetBg);
  const recolor = React.useCallback(() => {
    if (!insetKey) return;
    const src = (window.JS_PHOTOS && window.JS_PHOTOS.get(insetKey)) || insetKey;
    const im = new Image();
    im.onload = () => {
      try {
        if (!im.naturalWidth) return;
        const w = 40, h = Math.max(1, Math.round(40 * im.naturalHeight / im.naturalWidth));
        const c = document.createElement('canvas'); c.width = w; c.height = h;
        const ctx = c.getContext('2d'); ctx.drawImage(im, 0, 0, w, h);
        const d = ctx.getImageData(0, 0, w, h).data;
        let r = 0, g = 0, b = 0, n = 0;
        for (let i = 0; i < d.length; i += 4) {
          const rr = d[i], gg = d[i + 1], bb = d[i + 2];
          const sat = Math.max(rr, gg, bb) - Math.min(rr, gg, bb);
          const lum = (rr + gg + bb) / 3;
          const wgt = (sat + 8) * (lum > 30 && lum < 225 ? 1 : 0.3);
          r += rr * wgt; g += gg * wgt; b += bb * wgt; n += wgt;
        }
        if (!n) return;
        setAutoBg('#' + [r, g, b].map(x => Math.round(x / n).toString(16).padStart(2, '0')).join(''));
      } catch (e) { /* pixels unreadable — keep fallback */ }
    };
    im.src = src;
  }, [insetKey]);
  React.useEffect(() => {
    recolor();
    const onSwap = () => setTimeout(recolor, 60);
    window.addEventListener('js-photos-change', onSwap);
    return () => window.removeEventListener('js-photos-change', onSwap);
  }, [recolor]);
  if (stack) {
    return (
      <section style={{ background: 'var(--js-alabaster)' }}>
        {[left, right].map((im, i) => (
          <div key={i} style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden' }}>
            <img onClick={() => goNav('collection-item.html')} src={im.img} alt="" loading="lazy" style={{ cursor: 'pointer', position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: im.pos || '50% 22%' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(23,19,15,0.34) 0%, rgba(23,19,15,0) 26%, rgba(23,19,15,0) 55%, rgba(23,19,15,0.58) 100%)' }} />
            {!TEXTLESS && i === 0 && <div style={{ position: 'absolute', top: 18, left: 20, right: 20 }}><Locator color="rgba(250,248,244,0.92)">Lifestyle / {index}{SEP}{kicker}</Locator></div>}
            {!TEXTLESS && looks[i] && <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}><LookCap n={String(i + 1).padStart(2, '0')} name={looks[i].name} color={looks[i].color} /></div>}
          </div>
        ))}
      </section>
    );
  }
  const tilt = insetSide === 'left' ? -3.5 : 3.5;
  const insetW = 'clamp(220px, 30%, 360px)';
  const insetEl = inset && (
    <div style={{ position: 'absolute', top: '50%', [insetSide]: `calc(25% - ${insetW} / 2)`, width: insetW, zIndex: 3, transform: `translateY(-50%) rotate(${tilt}deg)`, transformOrigin: 'center' }}>
      <div style={{ position: 'relative', border: 'clamp(9px, 1vw, 13px) solid var(--js-paper)', boxShadow: '0 2px 5px rgba(23,19,15,0.20), 0 16px 34px rgba(23,19,15,0.34), 0 34px 66px rgba(23,19,15,0.22)', background: 'var(--js-paper)' }}>
        <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: 'var(--js-alabaster)' }}>
          <img onClick={() => goNav('collection-item.html')} src={inset.img} alt="" loading="lazy" style={{ cursor: 'pointer', position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: inset.pos || '50% 40%' }} />
        </div>
        {!TEXTLESS && insetLabel && <div style={{ background: 'var(--js-paper)', padding: 'clamp(10px, 1vw, 15px) 8px clamp(8px, 0.8vw, 11px)', textAlign: 'center' }}><Locator onDark={false} style={{ fontSize: 'clamp(9px, 0.78vw, 11px)', letterSpacing: '0.2em' }}>{insetLabel}</Locator></div>}
      </div>
    </div>
  );
  return (
    <section style={{ position: 'relative', height: SPREAD_H, overflow: 'hidden', background: 'var(--js-alabaster)', display: 'flex' }}>
      {[left, right].map((im, i) => {
        const side = i === 0 ? 'left' : 'right';
        const solid = inset && side === insetSide;
        return (
          <div key={i} style={{ position: 'relative', width: '50%', height: '100%', overflow: 'hidden', background: solid ? autoBg : 'var(--js-alabaster)' }}>
            {!solid && <img onClick={() => goNav('collection-item.html')} src={im.img} alt="" loading="lazy" style={{ cursor: 'pointer', position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: im.pos || '50% 20%' }} />}
            {!solid && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(23,19,15,0.3) 0%, rgba(23,19,15,0) 22%, rgba(23,19,15,0) 52%, rgba(23,19,15,0.56) 100%)' }} />}
          </div>
        );
      })}
      {!TEXTLESS && <div style={{ position: 'absolute', top: 'clamp(20px, 3vw, 40px)', left: 'clamp(20px, 5vw, 44px)', right: 'clamp(20px, 5vw, 44px)', display: 'flex', justifyContent: 'space-between' }}>
        <Locator color={inset && insetSide === 'left' ? 'var(--js-stone)' : 'rgba(250,248,244,0.92)'}>Lifestyle / {index}{SEP}J. Society{SEP}Fall 2026</Locator>
        {kicker && <Locator color={inset && insetSide === 'right' ? 'var(--js-stone)' : 'rgba(250,248,244,0.7)'}>{kicker}</Locator>}
      </div>}
      {insetEl}
      {!TEXTLESS && <div style={{ position: 'absolute', bottom: 'clamp(24px, 3.4vw, 48px)', left: 'clamp(20px, 5vw, 44px)', width: '38%' }}>{(!inset || insetSide !== 'left') && looks[0] && <LookCap n="01" name={looks[0].name} color={looks[0].color} />}</div>}
      {!TEXTLESS && <div style={{ position: 'absolute', bottom: 'clamp(24px, 3.4vw, 48px)', right: 'clamp(20px, 5vw, 44px)', width: '38%', textAlign: 'right' }}>{(!inset || insetSide !== 'right') && looks[1] && <LookCap n="02" name={looks[1].name} color={looks[1].color} align="right" />}</div>}
    </section>
  );
}

/* ---------- Half paper with three loose prints, half full-bleed image ---------- */
function SpreadPrints({ kicker = 'Fall 2026', kicker2 = 'New Collection', label, img, pos = '50% 30%', imgSide = 'right', polaroids = [] }) {
  const bp = useBreakpoint();
  const stack = bp === 'mobile';
  const rots = [-3.5, 2.2, -1.8];
  const lifts = [8, -10, 12];
  const printEls = polaroids.map((p, i) => (
    <div key={i} style={{ flex: '1 1 0', minWidth: 0, position: 'relative', zIndex: [1, 3, 2][i % 3], marginLeft: i === 0 ? 0 : 'clamp(-30px, -2.6vw, -14px)', transform: `rotate(${rots[i % 3]}deg) translateY(${stack ? 0 : lifts[i % 3]}px)`, background: 'var(--js-white)', padding: 'clamp(5px, 0.5vw, 8px)', boxShadow: '0 2px 5px rgba(23,19,15,0.16), 0 16px 30px rgba(23,19,15,0.22)' }}>
      <div style={{ position: 'relative', aspectRatio: p.ar || '3/4', overflow: 'hidden', background: 'var(--js-alabaster)' }}>
        <img onClick={() => goNav('collection-item.html')} src={p.img} alt="" loading="lazy" style={{ cursor: 'pointer', position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: p.pos || '50% 30%' }} />
      </div>
    </div>
  ));
  const paperHalf = (
    <div style={{ position: 'relative', width: stack ? '100%' : '50%', overflow: 'hidden', background: 'var(--js-paper)', ...(stack ? { padding: '64px 20px 56px' } : { height: '100%' }) }}>
      {!TEXTLESS && <div style={{ position: 'absolute', top: 'clamp(20px, 3vw, 40px)', left: 'clamp(20px, 5vw, 44px)', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
        <Locator>{kicker}</Locator>
        {kicker2 && <Locator>{kicker2}</Locator>}
      </div>}
      <div style={stack
        ? { display: 'flex', alignItems: 'center', marginTop: 32 }
        : { position: 'absolute', top: '50%', left: '-5%', right: '5%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center' }}>
        {printEls}
      </div>
      {!TEXTLESS && label && <div style={{ position: 'absolute', bottom: 'clamp(22px, 3vw, 44px)', left: 0, right: 0, textAlign: 'center' }}><Locator color="var(--js-espresso)">{label}</Locator></div>}
    </div>
  );
  const imageHalf = (
    <div style={{ position: 'relative', width: stack ? '100%' : '50%', overflow: 'hidden', background: 'var(--js-alabaster)', ...(stack ? { aspectRatio: '4/5' } : { height: '100%' }) }}>
      <img onClick={() => goNav('collection-item.html')} src={img} alt="" loading="lazy" style={{ cursor: 'pointer', position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos }} />
    </div>
  );
  if (stack) return <section style={{ background: 'var(--js-paper)' }}>{paperHalf}{imageHalf}</section>;
  return (
    <section style={{ position: 'relative', height: SPREAD_H, overflow: 'hidden', display: 'flex' }}>
      {imgSide === 'left' ? imageHalf : paperHalf}
      {imgSide === 'left' ? paperHalf : imageHalf}
    </section>
  );
}

/* ---------- New Collection tile grid (paper) — polaroid prints, no text ---------- */
function TileGrid({ items }) {
  const bp = useBreakpoint();
  const cols = bp === 'mobile' ? '1fr 1fr' : 'repeat(3, 1fr)';
  return (
    <section style={{ background: 'var(--js-alabaster)', padding: 'clamp(72px, 10vw, 128px) clamp(20px, 5vw, 44px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 'clamp(22px, 3vw, 40px)', rowGap: 'clamp(30px, 3.6vw, 52px)' }}>
          {items.map((it, i) => <Reveal key={i} delay={(i % 3) * 60}><Tile it={it} n={i + 1} /></Reveal>)}
        </div>
      </div>
    </section>
  );
}
const TILE_ROTS = [-2.4, 1.8, -1.2, 2.2, -1.8, 1.4];
function Tile({ it, n }) {
  const [hov, setHov] = useState(false);
  return (
    <figure style={{ margin: 0, cursor: 'pointer', transform: `rotate(${TILE_ROTS[(n - 1) % TILE_ROTS.length]}deg)`, background: 'var(--js-white)', padding: 'clamp(9px, 0.9vw, 13px)', paddingBottom: 'clamp(34px, 3.4vw, 52px)', boxShadow: '0 2px 5px rgba(23,19,15,0.16), 0 16px 30px rgba(23,19,15,0.2)' }} onClick={() => goNav('collection-item.html')} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: 'var(--js-alabaster)' }}>
        <img src={it.img} alt={it.name} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: it.pos || '50% 20%', transform: hov ? 'scale(1.04)' : 'scale(1)', transition: 'transform var(--js-dur-slow) var(--js-ease)' }} />
      </div>
    </figure>
  );
}

/* ---------- All in the details: three tight crops (paper) ---------- */
function Details({ items, polaroid = false }) {
  const bp = useBreakpoint();
  const cols = bp === 'mobile' ? '1fr' : 'repeat(3, 1fr)';
  const rots = [-2.4, 1.8, -1.2, 2.2, -1.8, 1.4];
  return (
    <section style={{ background: 'var(--js-paper)', padding: 'clamp(72px, 10vw, 128px) clamp(20px, 5vw, 44px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: cols, gap: polaroid ? 'clamp(22px, 3vw, 40px)' : 'clamp(14px, 2vw, 26px)', ...(polaroid ? { rowGap: 'clamp(30px, 3.6vw, 52px)' } : {}) }}>
          {items.map((it, i) => (
            <Reveal key={i} delay={(i % 3) * 90}>
              {polaroid ? (
                <figure style={{ margin: 0, transform: `rotate(${rots[i % rots.length]}deg)`, background: 'var(--js-white)', padding: 'clamp(9px, 0.9vw, 13px)', paddingBottom: 'clamp(34px, 3.4vw, 52px)', boxShadow: '0 2px 5px rgba(23,19,15,0.16), 0 16px 30px rgba(23,19,15,0.2)' }}>
                  <div style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: 'var(--js-alabaster)' }}>
                    <img onClick={() => goNav('collection-item.html')} src={it.img} alt={it.label} loading="lazy" style={{ cursor: 'pointer', position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: it.pos }} />
                  </div>
                </figure>
              ) : (
                <figure style={{ margin: 0 }}>
                  <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', background: 'var(--js-alabaster)' }}>
                    <img onClick={() => goNav('collection-item.html')} src={it.img} alt={it.label} loading="lazy" style={{ cursor: 'pointer', position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: it.pos }} />
                  </div>
                  <figcaption style={{ marginTop: 15 }}><Locator>{it.label}</Locator></figcaption>
                </figure>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Closing ---------- */
function Closing() {
  return (
    <section style={{ background: 'var(--js-ink)', padding: 'clamp(90px, 13vw, 168px) clamp(20px, 5vw, 44px)', textAlign: 'center' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <Reveal><Locator color="rgba(250,248,244,0.68)" style={{ letterSpacing: '0.3em' }}>End of Lookbook{SEP}32 Pages</Locator></Reveal>
        <Reveal delay={100}><h2 style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(38px, 5.5vw, 76px)', lineHeight: 1.02, letterSpacing: '-0.016em', color: 'var(--js-paper)', margin: '20px 0 30px' }}>Shop the collection</h2></Reveal>
        <Reveal delay={170}><div style={{ display: 'flex', justifyContent: 'center' }}><Button variant="ghostLight" onClick={() => goNav('collection-item.html')}>View the full collection</Button></div></Reveal>
      </div>
    </section>
  );
}

/* ---------- Tweaks: vertical section order ---------- */
const LB_ORDER_KEY = 'jsoc_lb_section_order_v1';
function readLbOrder() { try { const v = JSON.parse(localStorage.getItem(LB_ORDER_KEY)); return Array.isArray(v) ? v : null; } catch (e) { return null; } }
function writeLbOrder(o) { try { if (Array.isArray(o) && o.length) localStorage.setItem(LB_ORDER_KEY, JSON.stringify(o)); else localStorage.removeItem(LB_ORDER_KEY); } catch (e) {} }

const LB_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "sectionOrder": []
}/*EDITMODE-END*/;

function SectionOrderRows({ sections, order, onChange }) {
  const move = (i, d) => {
    const j = i + d;
    if (j < 0 || j >= order.length) return;
    const next = [...order];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const btn = (dis) => ({ width: 22, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(0,0,0,0.14)', background: '#fff', borderRadius: 4, cursor: dis ? 'default' : 'pointer', lineHeight: 1, color: '#444', padding: 0, opacity: dis ? 0.3 : 1 });
  // SVG (not a text glyph): the host's inline-text-edit layer wraps text nodes
  // in editable spans that swallow real clicks — an SVG with pointer-events:none
  // keeps the hit target on the <button> itself.
  const Chev = ({ up }) => (
    <svg width="9" height="9" viewBox="0 0 10 10" aria-hidden="true" style={{ pointerEvents: 'none', display: 'block' }}>
      <path d={up ? 'M1.5 6.8 5 3.2l3.5 3.6' : 'M1.5 3.2 5 6.8l3.5-3.6'} fill="none" stroke="#444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '2px 0 6px' }}>
      {order.map((id, i) => {
        const s = sections.find((x) => x.id === id);
        if (!s) return null;
        return (
          <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '2px 0' }}>
            <span style={{ width: 16, textAlign: 'right', fontSize: 9.5, color: '#9a948c', fontVariantNumeric: 'tabular-nums' }}>{i + 1}</span>
            <span style={{ flex: 1, minWidth: 0, fontSize: 11, color: '#3a352f', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.label}</span>
            <button type="button" data-omelette-chrome="" disabled={i === 0} style={btn(i === 0)} onClick={() => move(i, -1)} aria-label="Move up"><Chev up /></button>
            <button type="button" data-omelette-chrome="" disabled={i === order.length - 1} style={btn(i === order.length - 1)} onClick={() => move(i, 1)} aria-label="Move down"><Chev up={false} /></button>
          </div>
        );
      })}
    </div>
  );
}

function App() {
  const [t, setTweak] = useTweaks(LB_TWEAK_DEFAULTS);
  const sections = [
    { id: 'statement', label: 'Opening statement', el: <Statement /> },
    { id: 'tiles', label: 'Tile grid · The line', el: <TileGrid items={[
      { img: 'images/lb/t1.jpg', name: 'Track Stripe Set', color: 'Camel', pos: '50% 16%' },
      { img: 'images/lb/t2.jpg', name: 'Quilted Field Jacket', color: 'Olive', pos: '50% 16%' },
      { img: 'images/lb/t3.jpg', name: 'Bubble Bomber', color: 'Chocolate', pos: '50% 20%' },
      { img: 'images/lb/t4.jpg', name: 'Zip Utility Vest', color: 'Loden', pos: '50% 14%' },
      { img: 'images/lb/t5.jpg', name: 'Side-Stripe Trouser', color: 'Forest', pos: '50% 28%' },
      { img: 'images/lb/t6.jpg', name: 'Fringe Poncho', color: 'Rust', pos: '50% 14%' },
    ]} /> },
    { id: 'solo01', label: 'Lifestyle 01 · Bordeaux', el: <SpreadSolo img="images/lb/s01.jpg" pos="50% 32%" index="01" looks={[{ name: 'Cinched Sleeve Jacket', color: 'Bordeaux' }, { name: 'Bubble Bomber', color: 'Chocolate' }]} /> },
    { id: 'duo02', label: 'Spread 02 · Denim & Coffee', el: <SpreadDuo index="02" kicker="Denim & Coffee Bean"
      left={{ img: 'images/lb/du02a.jpg', pos: '50% 18%' }} right={{ img: 'images/lb/du02b.jpg', pos: '50% 16%' }}
      inset={{ img: 'images/lb/inset1.jpg', pos: '50% 42%' }} insetSide="left" insetLabel="Suede Trim · Detail" insetBg="#a55924"
      looks={[{ name: 'L/S Denim Collar Polo', color: 'Indigo' }, { name: 'L/S Crew Cardi', color: 'Coffee Bean' }]} /> },
    { id: 'title-sets', label: 'Title · Sets + Stripes', el: <SpreadTitle img="images/lb/sets.jpg" pos="60% 30%" kicker="Fall 2026 · New Collection" title="Sets + Stripes" sub="Knit two ways, top to toe." /> },
    { id: 'duo03', label: 'Spread 03 · Sets + Stripes', el: <SpreadDuo index="03" kicker="Sets + Stripes"
      left={{ img: 'images/lb/duSa.jpg', pos: '50% 16%' }} right={{ img: 'images/lb/duSb.jpg', pos: '50% 16%' }}
      inset={{ img: 'images/lb/du03a.jpg', pos: '50% 18%' }} insetSide="right" insetLabel="Half-Zip Knit Polo · Poppy" insetBg="#b13a2f"
      looks={[{ name: 'Striped Knit Henley', color: 'Marigold / Grey' }, { name: 'Striped Crew Set', color: 'Fern / Camel' }]} /> },
    { id: 'prints-sets', label: 'Prints · Sets + Stripes', el: <SpreadPrints kicker="Fall 2026" kicker2="New Collection" label="Sets + Stripes"
      img="images/lb/tri-main1.jpg" pos="50% 35%"
      polaroids={[
        { img: 'images/lb/tri-p1.jpg', pos: '50% 30%' },
        { img: 'images/lb/tri-p2.jpg', pos: '50% 60%', ar: '4/5' },
        { img: 'images/lb/tri-p3.jpg', pos: '50% 24%' },
      ]} /> },
    { id: 'prints-sets-2', label: 'Prints · Sets + Stripes II', el: <SpreadPrints kicker="Fall 2026" kicker2="New Collection" label="Sets + Stripes"
      img="images/lb/tri-main1.jpg" pos="50% 35%"
      polaroids={[
        { img: 'images/lb/tri-p1.jpg', pos: '50% 30%' },
        { img: 'images/lb/tri-p2.jpg', pos: '50% 60%', ar: '4/5' },
        { img: 'images/lb/tri-p3.jpg', pos: '50% 24%' },
      ]} /> },
    { id: 'title-yg', label: 'Title · Yellow + Green', el: <SpreadTitle img="images/lb/ygtitle.jpg" pos="50% 30%" kicker="Styling Guide" title="Yellow + Green" sub="Marigold against fern and moss." /> },
    { id: 'duo04', label: 'Prints · New Collection', el: <SpreadPrints kicker="Fall 2026" kicker2="New Collection" imgSide="left"
      img="images/lb/tri-main2.jpg" pos="50% 30%"
      polaroids={[
        { img: 'images/lb/tri2-p1.jpg', pos: '50% 24%' },
        { img: 'images/lb/tri2-p2.jpg', pos: '50% 26%', ar: '4/5' },
        { img: 'images/lb/tri2-p3.jpg', pos: '50% 35%', ar: '3/4' },
      ]} /> },
    { id: 'solo-cable', label: 'Lifestyle · Cable Knit Dress', el: <SpreadSolo img="images/lb/sfall.jpg" pos="50% 34%" note="Fall 2026 · New Collection" looks={[{ name: 'Cable Knit Dress', color: 'Oatmeal' }]} /> },
    { id: 'duo05', label: 'Prints · Print & Lace', el: <SpreadPrints kicker="Fall 2026" kicker2="New Collection" label="Print & Lace Trim"
      img="images/lb/du04b.jpg" pos="50% 20%"
      polaroids={[
        { img: 'images/lb/du04a.jpg', pos: '50% 18%' },
        { img: 'images/lb/tri3-p2.jpg', pos: '50% 24%', ar: '4/5' },
        { img: 'images/lb/tri3-p3.jpg', pos: '50% 22%' },
      ]} /> },
    { id: 'solo06', label: 'Spread 06 · Puffer & Plaid', el: <SpreadDuo index="06" kicker="Puffer & Plaid"
      left={{ img: 'images/lb/du06a.jpg', pos: '50% 24%' }} right={{ img: 'images/lb/du06b.jpg', pos: '50% 26%' }}
      inset={{ img: 'images/lb/inset5.jpg', pos: '50% 40%' }} insetSide="left" insetLabel="Colorblock Puffer Vest · Navy / Grey" insetBg="#6b7583"
      looks={[{ name: 'Hooded Zip Vest', color: 'Grey / Plaid' }, { name: 'Layered Plaid Look', color: 'Multi' }]} /> },
    { id: 'title-details', label: 'Spread · All in the Details', el: <SpreadDuo index="07" kicker="All in the Details"
      left={{ img: 'images/lb/du-det-a.jpg', pos: '50% 30%' }} right={{ img: 'images/lb/du-det-b.jpg', pos: '50% 30%' }}
      inset={{ img: 'images/lb/inset6.jpg', pos: '50% 35%' }} insetSide="right" insetLabel="Houndstooth Cardigan · Hand-Set" insetBg="#8a8580"
      looks={[{ name: 'Fringe-Cuff Cardigan', color: 'Taupe' }, { name: 'Houndstooth Cardigan', color: 'Ink / Chalk' }]} /> },
    { id: 'details1', label: 'Details · Polaroids I', el: <Details polaroid items={[
      { img: 'images/lb/d1.jpg', label: 'Suede Trim & Fringe Cardi', pos: '50% 30%' },
      { img: 'images/lb/d2.jpg', label: 'Studded Cardigan · Hand-Set', pos: '50% 24%' },
      { img: 'images/lb/d3.jpg', label: 'Houndstooth · 7 GG', pos: '50% 26%' },
      { img: 'images/lb/n-d4.jpg', label: 'Beaded Yoke · Hand-Set', pos: '50% 22%' },
      { img: 'images/lb/n-d5.jpg', label: 'Fair-Isle Yoke · 7 GG', pos: '50% 20%' },
      { img: 'images/lb/n-d6.jpg', label: 'Leopard Jacquard · Merino', pos: '50% 24%' },
    ]} /> },
    { id: 'solo-cognac', label: 'Lifestyle · Cognac Layers', el: <SpreadSolo img="images/lb/s06.jpg" pos="52% 36%" index="06" looks={[{ name: 'Puffer + Sweater Look', color: 'Cognac' }, { name: 'Suede Trim & Fringe Cardi', color: 'Rust' }]} /> },
    { id: 'solo07', label: 'Lifestyle 07 · Leather Cape', el: <SpreadSolo img="images/lb/ls07.jpg" pos="48% 30%" index="07" looks={[{ name: 'Leather Cape Jacket', color: 'Espresso' }, { name: 'Wrap Skirt + Vest', color: 'Layered' }]} /> },
    { id: 'title-denim', label: 'Title · Denim Hours', el: <SpreadTitle img="images/lb/n-denimtitle.jpg" pos="50% 28%" kicker="Styling Guide" title="Denim Hours" sub="Worn-in indigo, top to toe." /> },
    { id: 'duo08', label: 'Spread 08 · Denim & Plaid', el: <SpreadDuo index="08" kicker="Denim & Plaid"
      left={{ img: 'images/lb/n-du08a.jpg', pos: '50% 30%' }} right={{ img: 'images/lb/n-du08b.jpg', pos: '50% 20%' }}
      inset={{ img: 'images/lb/n-inset3.jpg', pos: '50% 20%' }} insetSide="right" insetLabel="Bouclé Knit Cardigan · Merlot" insetBg="#7a5b4a"
      looks={[{ name: 'Shirt-Jacket + Flannel', color: 'Camel / Plaid' }, { name: 'Wide-Leg Denim', color: 'Indigo' }]} /> },
    { id: 'duo08-2', label: 'Spread 08 · Denim & Plaid II', el: <SpreadDuo index="08" kicker="Denim & Plaid"
      left={{ img: 'images/lb/n-du08a.jpg', pos: '50% 30%' }} right={{ img: 'images/lb/n-du08b.jpg', pos: '50% 20%' }}
      inset={{ img: 'images/lb/n-inset3.jpg', pos: '50% 20%' }} insetSide="right" insetLabel="Bouclé Knit Cardigan · Merlot" insetBg="#7a5b4a"
      looks={[{ name: 'Shirt-Jacket + Flannel', color: 'Camel / Plaid' }, { name: 'Wide-Leg Denim', color: 'Indigo' }]} /> },
    { id: 'duo08-3', label: 'Spread 08 · Denim & Plaid III', el: <SpreadDuo index="08" kicker="Denim & Plaid"
      left={{ img: 'images/lb/n-du08a.jpg', pos: '50% 30%' }} right={{ img: 'images/lb/n-du08b.jpg', pos: '50% 20%' }}
      inset={{ img: 'images/lb/n-inset3.jpg', pos: '50% 20%' }} insetSide="right" insetLabel="Bouclé Knit Cardigan · Merlot" insetBg="#7a5b4a"
      looks={[{ name: 'Shirt-Jacket + Flannel', color: 'Camel / Plaid' }, { name: 'Wide-Leg Denim', color: 'Indigo' }]} /> },
    { id: 'solo09', label: 'Lifestyle 09 · Linen Lounge', el: <SpreadSolo img="images/lb/n-solo09.jpg" pos="50% 40%" index="09" looks={[{ name: 'Striped Boxy Tee', color: 'Sunset' }, { name: 'Pleated Linen Trouser', color: 'Sand' }]} /> },
    { id: 'duo10', label: 'Spread 10 · Tweed & Leather', el: <SpreadDuo index="10" kicker="Tweed & Leather"
      left={{ img: 'images/lb/n-du10a.jpg', pos: '50% 20%' }} right={{ img: 'images/lb/n-du10b.jpg', pos: '50% 14%' }}
      inset={{ img: 'images/lb/n-inset4.jpg', pos: '50% 18%' }} insetSide="left" insetLabel="Bouclé Tweed Jacket · Monochrome" insetBg="#8a8580"
      looks={[{ name: 'Houndstooth Cardigan', color: 'Ink / Chalk' }, { name: 'Tweed Bomber + Leather', color: 'Monochrome' }]} /> },
    { id: 'details3', label: 'Details · Polaroids', el: <Details polaroid items={[
      { img: 'images/lb/d1.jpg', label: 'Suede Trim & Fringe Cardi', pos: '50% 30%' },
      { img: 'images/lb/d2.jpg', label: 'Studded Cardigan · Hand-Set', pos: '50% 24%' },
      { img: 'images/lb/d3.jpg', label: 'Houndstooth · 7 GG', pos: '50% 26%' },
      { img: 'images/lb/n-d4.jpg', label: 'Beaded Yoke · Hand-Set', pos: '50% 22%' },
      { img: 'images/lb/n-d5.jpg', label: 'Fair-Isle Yoke · 7 GG', pos: '50% 20%' },
      { img: 'images/lb/n-d6.jpg', label: 'Leopard Jacquard · Merino', pos: '50% 24%' },
    ]} /> },
  ];
  const defaultIds = sections.map((s) => s.id);
  // Persist section order in localStorage so it survives reloads even when the
  // host doesn't rewrite the EDITMODE block (matches the PhotoSwaps pattern).
  const fromStore = readLbOrder();
  const source = (Array.isArray(t.sectionOrder) && t.sectionOrder.length) ? t.sectionOrder : fromStore;
  const saved = Array.isArray(source) ? source.filter((id) => defaultIds.includes(id)) : [];
  const order = saved.length ? [...saved] : [...defaultIds];
  defaultIds.forEach((id, i) => { if (!order.includes(id)) order.splice(Math.min(i, order.length), 0, id); });
  const applyOrder = (o) => { setTweak('sectionOrder', o); writeLbOrder(o); };
  return (
    <div>
      <Nav />
      <Cover />
      {order.map((id) => { const s = sections.find((x) => x.id === id); return s ? <React.Fragment key={id}>{s.el}</React.Fragment> : null; })}
      <NewsletterBand />
      <Footer />
      <TweaksPanel>
        <TweakSection label="Section order" />
        <SectionOrderRows sections={sections} order={order} onChange={applyOrder} />
        <TweakButton label="Reset to original order" secondary onClick={() => applyOrder([])} />
        <TweakSection label="Photos" />
        <PhotoSwaps />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
