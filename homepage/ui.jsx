/* global React, window */
// j. society — homepage primitives & chrome

const { useState, useEffect } = React;

/* ---------- Scroll position of the page container ---------- */
function useScrolled(threshold) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const el = document.getElementById('page');
    if (!el) return;
    const fn = () => setPast(el.scrollTop > (threshold || 40));
    el.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => el.removeEventListener('scroll', fn);
  }, [threshold]);
  return past;
}
/* ---------- Breakpoint: 'mobile' (<768) · 'tablet' (768–1023) · 'desktop' (≥1024) ---------- */
function useBreakpoint() {
  const get = () => {
    if (typeof window === 'undefined') return 'desktop';
    const w = window.innerWidth;
    return w < 768 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop';
  };
  const [bp, setBp] = useState(get());
  useEffect(() => {
    const fn = () => setBp(get());
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return bp;
}
function scrollToId(id) {
  const page = document.getElementById('page');
  const target = document.getElementById(id);
  if (!page || !target) return;
  const top = target.getBoundingClientRect().top - page.getBoundingClientRect().top + page.scrollTop;
  page.scrollTo({ top: id === 'top' ? 0 : top, behavior: 'smooth' });
}
// Route between pages, or smooth-scroll when the target hash is on the current page.
function goNav(href) {
  const [path, hash] = href.split('#');
  const here = (location.pathname.split('/').pop() || 'index.html');
  if (hash && (path === '' || path === here)) { scrollToId(hash === 'top' ? 'top' : hash); }
  else { window.location.href = href; }
}

/* ---------- Icons (thin-stroke, Lucide-style, 1.25) ---------- */
function Icon({ name, size = 18, stroke = 1.25, style }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>,
    bag: <><path d="M6 7h12l-1 13H7L6 7z" /><path d="M9 7a3 3 0 0 1 6 0" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M5 21c0-3.9 3.1-7 7-7s7 3.1 7 7" /></>,
    menu: <><path d="M3 6h18M3 12h18M3 18h18" /></>,
    close: <><path d="M6 6l12 12M18 6L6 18" /></>,
    arrowRight: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    arrowLeft: <><path d="M19 12H5M11 6l-6 6 6 6" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    chevronDown: <><path d="M6 9l6 6 6-6" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="M3.5 6.5L12 12.5l8.5-6" /></>,
    phone: <><path d="M5 4h3.4l1.5 4-2 1.4a12 12 0 0 0 5.2 5.2l1.4-2 4 1.5V19a1.6 1.6 0 0 1-1.7 1.6A15.5 15.5 0 0 1 3.4 5.7 1.6 1.6 0 0 1 5 4z" /></>,
    pin: <><path d="M12 21s-6.5-5.4-6.5-10A6.5 6.5 0 0 1 18.5 11c0 4.6-6.5 10-6.5 10z" /><circle cx="12" cy="11" r="2.4" /></>,
    play: <><circle cx="12" cy="12" r="9" /><path d="M10 8.5l5 3.5-5 3.5z" fill="currentColor" stroke="none" /></>,
    factory: <><path d="M3 21h18" /><path d="M4 21V10l5 3V10l5 3V7l5 3v11" /></>,
    store: <><path d="M4 9V6.5L6 4h12l2 2.5V9" /><path d="M5 9v11h14V9" /><path d="M9 20v-5h6v5" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    calendar: <><rect x="3.5" y="4.5" width="17" height="16" rx="1.5" /><path d="M3.5 9h17M8 3v3M16 3v3" /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" /></>,
    facebook: <><path d="M14.5 8.5H17V5h-2.5A3.5 3.5 0 0 0 11 8.5V11H9v3h2v7h3v-7h2.2l.8-3H14V8.9c0-.3.2-.4.5-.4z" fill="currentColor" stroke="none" /></>,
    x: <><path d="M4 4l16 16M20 4L4 20" /></>,
    linkedin: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 17v-7" /></>,
    youtube: <><rect x="3" y="6" width="18" height="12" rx="3" /><path d="M10.5 9.5l4.5 2.5-4.5 2.5z" fill="currentColor" stroke="none" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={style}>
      {paths[name]}
    </svg>
  );
}

/* ---------- Eyebrow (mono locator/label) ---------- */
function Eyebrow({ children, style }) {
  return <div style={{ fontFamily: 'var(--js-mono)', fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--js-stone)', ...style }}>{children}</div>;
}

/* ---------- Button ---------- */
function Button({ children, variant = 'solid', onClick, full, style }) {
  const [hov, setHov] = useState(false);
  const base = {
    fontFamily: 'var(--js-sans)', fontWeight: 600, fontSize: 13, letterSpacing: '0.04em',
    cursor: 'pointer', border: 'none', transition: 'all var(--js-dur) var(--js-ease)',
    width: full ? '100%' : 'auto', padding: '15px 30px', display: 'inline-flex',
    alignItems: 'center', justifyContent: 'center', gap: 10, whiteSpace: 'nowrap',
    borderRadius: 'var(--js-radius-sm)',
  };
  const variants = {
    solid: { background: hov ? 'var(--js-espresso)' : 'var(--js-ink)', color: 'var(--js-paper)' },
    ghost: { background: hov ? 'var(--js-ink)' : 'transparent', color: hov ? 'var(--js-paper)' : 'var(--js-ink)', border: '1px solid var(--js-ink)', padding: '14px 29px' },
    ghostLight: { background: hov ? 'var(--js-paper)' : 'transparent', color: hov ? 'var(--js-ink)' : 'var(--js-paper)', border: '1px solid rgba(250,248,244,0.85)', padding: '14px 29px' },
    text: { background: 'transparent', color: 'var(--js-ink)', padding: '6px 2px', borderBottom: '1px solid var(--js-ink)', fontFamily: 'var(--js-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', borderRadius: 0, opacity: hov ? 0.55 : 1 },
  };
  return (
    <button style={{ ...base, ...variants[variant], ...style }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={onClick}>
      {children}
    </button>
  );
}

/* ---------- Collections dropdown items ---------- */
const COLLECTIONS = [
  ['Fall 2026', 'look-book.html'],
];

/* ---------- Pill button used in the nav (Login / Order) ---------- */
function NavButton({ children, onClick, solid, onPaper }) {
  const [hov, setHov] = useState(false);
  const base = { fontFamily: 'var(--js-sans)', fontWeight: 600, fontSize: 12.5, letterSpacing: '0.03em', cursor: 'pointer', padding: '10px 22px', borderRadius: 'var(--js-radius-sm)', transition: 'all var(--js-dur) var(--js-ease)', whiteSpace: 'nowrap', lineHeight: 1 };
  let look;
  if (solid) {
    look = onPaper
      ? { background: hov ? 'var(--js-espresso)' : 'var(--js-ink)', color: 'var(--js-paper)', border: '1px solid var(--js-ink)' }
      : { background: hov ? 'rgba(250,248,244,0.85)' : 'var(--js-paper)', color: 'var(--js-ink)', border: '1px solid var(--js-paper)' };
  } else {
    look = onPaper
      ? { background: hov ? 'var(--js-ink)' : 'transparent', color: hov ? 'var(--js-paper)' : 'var(--js-ink)', border: '1px solid var(--js-ink)' }
      : { background: hov ? 'var(--js-paper)' : 'transparent', color: hov ? 'var(--js-ink)' : 'var(--js-paper)', border: '1px solid rgba(250,248,244,0.7)' };
  }
  return <button onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={onClick} style={{ ...base, ...look }}>{children}</button>;
}

/* ---------- Nav (transparent over hero → paper on scroll) ----------
   solid=true forces the paper ground (for pages without a dark hero). */
function Nav({ solid }) {
  const scrolled = useScrolled(80);
  const bp = useBreakpoint();
  const compact = bp !== 'desktop';
  const [open, setOpen] = useState(false);
  const [colOpen, setColOpen] = useState(false);
  const onPaper = solid || scrolled || open;
  const fg = onPaper ? 'var(--js-ink)' : 'var(--js-paper)';
  const side = compact ? 20 : 44;

  if (compact) {
    return (
      <header style={{ position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `0 ${side}px`, height: 64,
          background: onPaper ? 'rgba(250,248,244,0.92)' : 'transparent',
          backdropFilter: onPaper ? 'saturate(140%) blur(12px)' : 'none',
          WebkitBackdropFilter: onPaper ? 'saturate(140%) blur(12px)' : 'none',
          borderBottom: '1px solid ' + (onPaper ? 'var(--js-mist)' : 'transparent'),
          transition: 'all var(--js-dur) var(--js-ease)', color: fg,
        }}>
          <span onClick={() => setOpen(o => !o)} style={{ display: 'flex', cursor: 'pointer', color: fg, width: 40, marginLeft: -8 }}><Icon name={open ? 'close' : 'menu'} size={24} /></span>
          <div onClick={() => goNav('index.html#top')} style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 26, letterSpacing: '0.01em', cursor: 'pointer', color: fg, lineHeight: 1 }}>j. society</div>
          <NavButton solid onPaper={onPaper} onClick={() => goNav('contact.html')}>Contact</NavButton>
        </div>
        {/* Slide-down menu */}
        {open && (
          <nav style={{
            display: 'flex', flexDirection: 'column', padding: `8px ${side}px 24px`,
            background: 'var(--js-paper)', borderBottom: '1px solid var(--js-mist)',
            animation: 'js-menu-in var(--js-dur) var(--js-ease)',
          }}>
            {[['Home', 'index.html#top'], ['About Us', 'about.html'], ['Events', 'events.html'], ['Lookbook', 'look-book.html'], ['CMS Sample Page', 'collection-item.html']].map(([t, r]) => (
              <a key={t} onClick={() => { setOpen(false); goNav(r); }} style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 28, color: 'var(--js-ink)', textDecoration: 'none', cursor: 'pointer', padding: '13px 0', borderBottom: '1px solid var(--js-mist)' }}>{t}</a>
            ))}
            <div style={{ display: 'flex', gap: 12, marginTop: 22 }}>
              <NavButton solid onPaper onClick={() => { setOpen(false); goNav('contact.html'); }}>Contact</NavButton>
            </div>
          </nav>
        )}
      </header>
    );
  }

  return (
    <header
      onMouseLeave={() => setColOpen(false)}
      style={{
        position: 'sticky', top: 0, zIndex: 40, display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: `0 ${side}px`, height: 78,
        background: onPaper ? 'rgba(250,248,244,0.85)' : 'transparent',
        backdropFilter: onPaper ? 'saturate(140%) blur(12px)' : 'none',
        WebkitBackdropFilter: onPaper ? 'saturate(140%) blur(12px)' : 'none',
        borderBottom: '1px solid ' + (onPaper ? 'var(--js-mist)' : 'transparent'),
        transition: 'all var(--js-dur) var(--js-ease)', color: fg,
      }}>
      <div onClick={() => goNav('index.html#top')} style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 30, letterSpacing: '0.01em', cursor: 'pointer', color: fg, whiteSpace: 'nowrap', lineHeight: 1, flex: 1 }}>
        j. society
      </div>
      <nav style={{ display: 'flex', gap: 34, alignItems: 'center' }}>
        <NavLink fg={fg} onClick={() => goNav('about.html')}>About Us</NavLink>
        <NavLink fg={fg} onClick={() => goNav('events.html')}>Events</NavLink>
        <div style={{ position: 'relative' }} onMouseEnter={() => setColOpen(true)}>
          <NavLink fg={fg} onClick={() => goNav('look-book.html')}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>Lookbook <Icon name="chevronDown" size={13} /></span>
          </NavLink>
          {colOpen && (
            /* Positioning wrapper owns the centering transform; the panel inside owns the
               entrance animation — js-menu-in animates transform, so putting both on one
               element made the menu jump sideways when the animation finished. */
            <div style={{ position: 'absolute', top: 'calc(100% + 18px)', left: '50%', transform: 'translateX(-50%)' }}>
              <div style={{ minWidth: 230, background: 'var(--js-paper)', border: '1px solid var(--js-mist)', boxShadow: 'var(--js-shadow-lg)', padding: '10px 0', animation: 'js-menu-in var(--js-dur) var(--js-ease)' }}>
                {COLLECTIONS.map(([t, r]) => <DropItem key={t} onClick={() => { setColOpen(false); goNav(r); }}>{t}</DropItem>)}
              </div>
            </div>
          )}
        </div>
        <NavLink fg={fg} onClick={() => goNav('collection-item.html')}>CMS Sample Page</NavLink>
      </nav>
      <div style={{ display: 'flex', gap: 12, flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
        <NavButton solid onPaper={onPaper} onClick={() => goNav('contact.html')}>Contact</NavButton>
      </div>
    </header>
  );
}
function NavLink({ children, fg, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <a onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ fontFamily: 'var(--js-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: fg, opacity: hov ? 0.55 : 1, textDecoration: 'none', cursor: 'pointer', transition: 'opacity var(--js-dur) var(--js-ease)', whiteSpace: 'nowrap' }}>
      {children}
    </a>
  );
}
function DropItem({ children, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <a onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: 'block', fontFamily: 'var(--js-sans)', fontSize: 15, color: hov ? 'var(--js-ink)' : 'var(--js-espresso)', background: hov ? 'var(--js-alabaster)' : 'transparent', textDecoration: 'none', cursor: 'pointer', padding: '11px 24px', transition: 'all var(--js-dur-fast) var(--js-ease)', whiteSpace: 'nowrap' }}>
      {children}
    </a>
  );
}

/* ---------- Footer (paper ground, horizontal — matches v2 wireframe) ---------- */
const FOOTER_LINKS = [['Home', 'index.html#top'], ['About us', 'about.html'], ['Events', 'events.html'], ['Lookbook', 'look-book.html'], ['Contact', 'contact.html']];
const SOCIALS = ['instagram'];
const LEGAL = [['Privacy policy', 'privacy-policy.html'], ['Terms & conditions', 'terms-conditions.html']];

function Footer() {
  const bp = useBreakpoint();
  const stack = bp === 'mobile';
  return (
    <footer style={{ background: 'var(--js-paper)', color: 'var(--js-ink)', borderTop: '1px solid var(--js-mist)', padding: 'clamp(48px, 7vw, 72px) clamp(20px, 5vw, 44px) 32px' }}>
      <div style={{ maxWidth: 1312, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: stack ? 28 : 32, flexWrap: stack ? 'nowrap' : 'wrap', flexDirection: stack ? 'column' : 'row', textAlign: stack ? 'center' : 'left' }}>
          <div onClick={() => goNav('index.html#top')} style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 30, letterSpacing: '0.01em', cursor: 'pointer', lineHeight: 1, flex: stack ? 'none' : 1 }}>j. society</div>
          <nav style={{ display: stack ? 'grid' : 'flex', gridTemplateColumns: stack ? 'auto' : undefined, gap: stack ? 14 : 32, flexWrap: 'wrap', justifyContent: 'center', justifyItems: 'center' }}>
            {FOOTER_LINKS.map(([t, r]) => <FooterLink key={t} onClick={() => goNav(r)}>{t}</FooterLink>)}
          </nav>
          <div style={{ display: 'flex', gap: 18, flex: stack ? 'none' : 1, justifyContent: 'flex-end', color: 'var(--js-espresso)' }}>
            {SOCIALS.map(s => <SocialIcon key={s} name={s} />)}
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--js-mist)', marginTop: 'clamp(36px, 5vw, 52px)', paddingTop: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: stack ? 16 : 28, flexWrap: 'wrap', flexDirection: stack ? 'column' : 'row', textAlign: 'center' }}>
          {stack && <div style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>{LEGAL.map(([t, r]) => <FooterLink key={t} small onClick={() => goNav(r)}>{t}</FooterLink>)}</div>}
          <span style={{ fontFamily: 'var(--js-mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--js-stone)', lineHeight: 1.8 }}>© 2026 j. society · Est. 2020 · New York</span>
          {!stack && LEGAL.map(([t, r]) => <FooterLink key={t} small onClick={() => goNav(r)}>{t}</FooterLink>)}
        </div>
      </div>
    </footer>
  );
}
const SOCIAL_URLS = { instagram: 'https://www.instagram.com/j.societyny/' };
function SocialIcon({ name }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={SOCIAL_URLS[name] || '#'} target="_blank" rel="noopener" aria-label={name} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ display: 'flex', cursor: 'pointer', color: hov ? 'var(--js-ink)' : 'var(--js-stone)', transition: 'color var(--js-dur) var(--js-ease)' }}>
      <Icon name={name} size={18} stroke={1.4} />
    </a>
  );
}
function FooterLink({ children, onClick, small }) {
  const [hov, setHov] = useState(false);
  return <a onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ fontFamily: small ? 'var(--js-mono)' : 'var(--js-sans)', fontSize: small ? 11 : 14, letterSpacing: small ? '0.14em' : 'normal', color: hov ? 'var(--js-ink)' : (small ? 'var(--js-stone)' : 'var(--js-espresso)'), cursor: 'pointer', textDecoration: 'none', transition: 'color var(--js-dur) var(--js-ease)' }}>{children}</a>;
}

Object.assign(window, { useScrolled, useBreakpoint, scrollToId, goNav, Icon, Eyebrow, Button, NavButton, Nav, NavLink, DropItem, Footer, FooterLink, SocialIcon });
