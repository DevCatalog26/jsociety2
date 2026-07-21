/* global React, ReactDOM, window, MORE_LOOKS, Eyebrow, Button, Nav, Footer, Icon, goNav, Reveal, SliderArrow, NewsletterBand, useBreakpoint, PhotoTweaks */
// j. society — CMS Sample Page (PDP wireframe: Breadcrumb · Gallery · Product info + buy box · More looks · Newsletter · Footer)
// Clicking a gallery photo selects that item; the content below (name, details, colors, sizes) follows.

const { useState, useEffect, useRef } = React;

const ITEM = {
  crumbBase: ['Fall 2026'],
  gallery: {
    main: { img: 'images/p-tweed.jpg', pos: '50% 16%' },
    thumbs: [
      { img: 'images/p-crew.jpg', pos: '50% 22%' },
      { img: 'images/detail-gauge.jpg', pos: '50% 30%' },
      { img: 'images/detail-fiber.jpg', pos: '50% 35%' },
      { img: 'images/editorial-2.jpg', pos: '50% 28%' },
    ],
  },
  tabs: {
    Shipping: 'Wholesale orders ship from our New York atelier within 10 business days. Freight and white-glove delivery are available for volume orders — your account manager will confirm timing at checkout.',
    Returns: 'Samples may be returned within 30 days in original condition. Wholesale orders are covered by our quality guarantee — any piece with a fault in material or make is replaced, no questions.',
  },
};

// PRODUCTS[0] belongs to the large photo; PRODUCTS[1..4] to the four thumbnails.
const PRODUCTS = [
  {
    name: 'Manhattan coat',
    style: '48210',
    desc: 'Cut from Italian wool with a satin lining. The Manhattan coat features a notched lapel, single back vent, and horn buttons.',
    bullets: ['Available in sizes XS through XL', 'Minimum order quantities apply', 'Wholesale pricing applied at checkout'],
    colors: ['Charcoal', 'Camel', 'Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    name: 'Boxy knit pullover',
    style: '51372',
    desc: 'A cropped, boxy pullover in brushed cotton with a ribbed collar, cut to layer cleanly over plaid and poplin.',
    bullets: ['Available in sizes XS through L', 'Minimum order quantities apply', 'Wholesale pricing applied at checkout'],
    colors: ['Apricot', 'Camel', 'Ivory'],
    sizes: ['XS', 'S', 'M', 'L'],
  },
  {
    name: 'Raglan rib sweater',
    style: '50318',
    desc: 'A fine-gauge raglan rib with a scooped neck and long cuffs — shown with the leather wrap skirt.',
    bullets: ['Available in sizes XS through XL', 'Minimum order quantities apply', 'Wholesale pricing applied at checkout'],
    colors: ['Forest', 'Ink'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    name: 'Fringe-trim cardigan',
    style: '49264',
    desc: 'A camel cardigan with hand-set fringe cuffs, worn open over a crisp collared shirt.',
    bullets: ['Available in sizes S through L', 'Minimum order quantities apply', 'Wholesale pricing applied at checkout'],
    colors: ['Camel', 'Oat'],
    sizes: ['S', 'M', 'L'],
  },
  {
    name: 'Striped fringe poncho',
    style: '52447',
    desc: 'An airy poncho striped in sunset tones, finished with a knotted fringe hem and a generous drape.',
    bullets: ['One size, made to drape', 'Minimum order quantities apply', 'Wholesale pricing applied at checkout'],
    colors: ['Sunset', 'Ivory'],
    sizes: ['One size'],
  },
];

const WRAP = { maxWidth: 1312, margin: '0 auto', padding: '0 clamp(20px, 5vw, 44px)' };

/* ---------- Breadcrumb ---------- */
function Crumbs({ name }) {
  const crumbs = [...ITEM.crumbBase, name];
  const last = crumbs.length - 1;
  return (
    <div style={{ ...WRAP, paddingTop: 'clamp(20px, 2vw, 28px)', paddingBottom: 'clamp(14px, 1.6vw, 20px)', flex: '0 0 auto' }}>
      <nav style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        {crumbs.map((c, i) => (
          <React.Fragment key={c}>
            <span onClick={i === last ? undefined : () => goNav('look-book.html')}
              style={{ fontFamily: 'var(--js-mono)', fontSize: 10.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: i === last ? 'var(--js-ink)' : 'var(--js-stone)', cursor: i === last ? 'default' : 'pointer', whiteSpace: 'nowrap' }}>{c}</span>
            {i < last && <span style={{ color: 'var(--js-stone)', fontFamily: 'var(--js-mono)', fontSize: 10.5 }}>&middot;</span>}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
}

/* ---------- Gallery: large image + 2x2 thumbs; click selects the item ---------- */
function Frame({ im, alt, selected, onClick, onHover, children, style }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => { setHov(true); onHover && onHover(true); }} onMouseLeave={() => { setHov(false); onHover && onHover(false); }}
      style={{ position: 'relative', overflow: 'hidden', background: 'var(--js-alabaster)', cursor: 'pointer',
        outline: selected ? '2px solid var(--js-ink)' : hov ? '2px solid var(--js-mist)' : '2px solid transparent',
        outlineOffset: selected ? 4 : -2,
        transition: 'outline-color var(--js-dur) var(--js-ease), outline-offset var(--js-dur) var(--js-ease)', ...style }}>
      <img src={im.img} alt={alt || ''} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: im.pos, transform: hov ? 'scale(1.03)' : 'scale(1)', transition: 'transform 900ms var(--js-ease)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(23,19,15,0.28)', opacity: hov ? 1 : 0, transition: 'opacity var(--js-dur) var(--js-ease)', pointerEvents: 'none' }} />
      {children}
    </div>
  );
}

function Gallery({ active, onSelect, onHover }) {
  const bp = useBreakpoint();
  const stack = bp === 'mobile';
  const fit = bp === 'desktop';
  const orderChip = null;
  if (stack) {
    return (
      <div style={WRAP}>
        <Frame im={ITEM.gallery.main} alt={PRODUCTS[0].name} selected={active === 0} onClick={() => onSelect(0)} onHover={(h) => onHover(h ? 0 : null)} style={{ aspectRatio: '4/5' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
          {ITEM.gallery.thumbs.map((im, i) => (
            <Frame key={i} im={im} alt={PRODUCTS[i + 1].name} selected={active === i + 1} onClick={() => onSelect(i + 1)} onHover={(h) => onHover(h ? i + 1 : null)} style={{ aspectRatio: '4/3' }}>
              {i === 3 && orderChip}
            </Frame>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div style={WRAP}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.9fr 1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 'clamp(10px, 1.2vw, 18px)', height: fit ? 'max(340px, calc(100vh - 412px))' : 'clamp(440px, 46vw, 620px)' }}>
        <Frame im={ITEM.gallery.main} alt={PRODUCTS[0].name} selected={active === 0} onClick={() => onSelect(0)} onHover={(h) => onHover(h ? 0 : null)} style={{ gridRow: '1 / span 2' }} />
        {ITEM.gallery.thumbs.map((im, i) => (
          <Frame key={i} im={im} alt={PRODUCTS[i + 1].name} selected={active === i + 1} onClick={() => onSelect(i + 1)} onHover={(h) => onHover(h ? i + 1 : null)}>
            {i === 3 && orderChip}
          </Frame>
        ))}
      </div>
    </div>
  );
}

/* ---------- Product info: copy + tabs (left), buy box (right) ---------- */
function FieldLabel({ children }) {
  return <div style={{ fontFamily: 'var(--js-mono)', fontSize: 10.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--js-stone)', marginBottom: 12 }}>{children}</div>;
}

function Chip({ children }) {
  return (
    <span style={{ fontFamily: 'var(--js-sans)', fontWeight: 500, fontSize: 13.5, padding: '11px 20px', borderRadius: 'var(--js-radius-sm)', border: '1px solid var(--js-mist)', color: 'var(--js-ink)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{children}</span>
  );
}

const SWATCHES = {
  Charcoal: '#3b3a38', Camel: '#b07d4e', Black: '#1c1a17', Apricot: '#e0956a',
  Ivory: '#efe9dc', Forest: '#3c4a3a', Ink: '#23201c', Oat: '#d8cdb8', Sunset: '#d0743f',
};

function ColorChip({ name }) {
  const hex = SWATCHES[name] || 'var(--js-mist)';
  return (
    <span style={{ fontFamily: 'var(--js-sans)', fontWeight: 500, fontSize: 13.5, padding: '10px 18px 10px 12px', borderRadius: 'var(--js-radius-sm)', border: '1px solid var(--js-mist)', color: 'var(--js-ink)', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <span style={{ width: 16, height: 16, borderRadius: '50%', background: hex, boxShadow: 'inset 0 0 0 1px rgba(23,19,15,0.14)', flex: '0 0 auto' }} />
      {name}
    </span>
  );
}

function BuyBox({ product }) {
  return (
    <div>
      <div style={{ marginTop: 0 }}>
        <FieldLabel>Available Colors</FieldLabel>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {product.colors.map(c => <ColorChip key={c} name={c} />)}
        </div>
      </div>
      <div style={{ marginTop: 26 }}>
        <FieldLabel>Available Sizes</FieldLabel>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {product.sizes.map(s => <Chip key={s}>{s}</Chip>)}
        </div>
      </div>
    </div>
  );
}

function TabBlock() {
  const names = Object.keys(ITEM.tabs);
  const [tab, setTab] = useState(names[0]);
  return (
    <div style={{ marginTop: 'clamp(34px, 4vw, 48px)' }}>
      <div style={{ display: 'flex', gap: 'clamp(20px, 3vw, 36px)', borderBottom: '1px solid var(--js-mist)' }}>
        {names.map(n => (
          <button key={n} onClick={() => setTab(n)}
            style={{ fontFamily: 'var(--js-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: tab === n ? 'var(--js-ink)' : 'var(--js-stone)', background: 'none', border: 'none', borderBottom: tab === n ? '1px solid var(--js-ink)' : '1px solid transparent', padding: '0 2px 14px', marginBottom: -1, cursor: 'pointer', transition: 'color var(--js-dur) var(--js-ease)' }}>{n}</button>
        ))}
      </div>
      <p style={{ fontFamily: 'var(--js-sans)', fontSize: 16, lineHeight: 1.62, color: 'var(--js-fg-body)', margin: '24px 0 0', maxWidth: 640 }}>{ITEM.tabs[tab]}</p>
    </div>
  );
}

function ProductInfo({ product }) {
  const bp = useBreakpoint();
  const stack = bp !== 'desktop';
  const compact = bp === 'desktop';
  return (
    <div style={{ ...WRAP, paddingTop: compact ? 28 : 'clamp(44px, 5.5vw, 80px)', paddingBottom: compact ? 36 : 'clamp(72px, 9vw, 120px)', flex: '0 0 auto' }}>
      <div key={product.name} style={{ display: 'grid', gridTemplateColumns: stack ? '1fr' : '1.4fr 1fr', gap: stack ? 48 : 'clamp(56px, 7vw, 120px)', alignItems: 'start' }}>
        <div>
          <Reveal>
            <h1 style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: compact ? 'clamp(30px, 2.9vw, 42px)' : 'clamp(40px, 4.6vw, 64px)', lineHeight: 1, letterSpacing: '-0.014em', color: 'var(--js-ink)', margin: 0 }}>{product.name}</h1>
          </Reveal>
          <Reveal delay={60}>
            <div style={{ fontFamily: 'var(--js-mono)', fontSize: 12.5, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--js-paper)', background: 'var(--js-ink)', padding: '9px 16px', borderRadius: 'var(--js-radius-sm)', marginTop: 18, display: 'inline-flex', alignItems: 'center' }}>Style # {product.style}</div>
          </Reveal>
        </div>
        <Reveal delay={120}><BuyBox product={product} /></Reveal>
      </div>
    </div>
  );
}

/* ---------- More looks: image slider ---------- */
function MoreLooks() {
  const bp = useBreakpoint();
  const items = MORE_LOOKS;
  const VISIBLE = bp === 'mobile' ? 1 : bp === 'tablet' ? 2 : 3;
  const maxIndex = Math.max(0, items.length - VISIBLE);
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(0);
  const cardRef = useRef(null);
  const gap = bp === 'mobile' ? 16 : 24;
  useEffect(() => {
    const measure = () => { if (cardRef.current) setStep(cardRef.current.getBoundingClientRect().width + gap); };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [bp]);
  useEffect(() => { setIndex(i => Math.min(i, maxIndex)); }, [maxIndex]);
  const go = (d) => setIndex(i => Math.min(maxIndex, Math.max(0, i + d)));
  return (
    <section style={{ background: 'var(--js-alabaster)', padding: 'clamp(72px, 10vw, 120px) clamp(20px, 5vw, 44px)' }}>
      <div style={{ maxWidth: 1312, margin: '0 auto' }}>
        <Reveal>
          <div style={{ maxWidth: 620, marginBottom: 'clamp(36px, 5vw, 52px)' }}>
            <Eyebrow>Explore</Eyebrow>
            <h2 style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(34px, 4.4vw, 56px)', lineHeight: 1.02, letterSpacing: '-0.014em', color: 'var(--js-ink)', margin: '14px 0 12px' }}>More looks</h2>
            <p style={{ fontFamily: 'var(--js-sans)', fontSize: 18, lineHeight: 1.55, color: 'var(--js-fg-body)', margin: 0 }}>Explore additional pieces from this collection and beyond.</p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', gap, transform: `translateX(${-index * step}px)`, transition: 'transform var(--js-dur-slow) var(--js-ease)' }}>
              {items.map((im, i) => (
                <div key={i} ref={i === 0 ? cardRef : null} style={{ flex: `0 0 calc((100% - ${gap * (VISIBLE - 1)}px) / ${VISIBLE})` }}>
                  <div onClick={() => goNav('look-book.html')} style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', background: 'var(--js-mist)', cursor: 'pointer' }}>
                    <img src={im.img} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: im.pos }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'clamp(28px, 4vw, 44px)' }}>
          <div style={{ display: 'flex', gap: 9 }}>
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} aria-label={`Slide ${i + 1}`} style={{ width: i === index ? 30 : 9, height: 9, padding: 0, border: 'none', cursor: 'pointer', borderRadius: 999, background: i === index ? 'var(--js-ink)' : 'var(--js-mist)', transition: 'all var(--js-dur) var(--js-ease)' }} />
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

function App() {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(null);
  const bp = useBreakpoint();
  const fit = bp === 'desktop';
  const product = PRODUCTS[hover != null ? hover : active];
  return (
    <div>
      <Nav solid />
      <main style={{ background: 'var(--js-paper)' }} data-screen-label="CMS Sample Page">
        <Crumbs name={product.name} />
        <Gallery active={active} onSelect={setActive} onHover={setHover} />
        <ProductInfo product={product} />
      </main>
      <MoreLooks />
      <NewsletterBand />
      <Footer />
      <PhotoTweaks />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
