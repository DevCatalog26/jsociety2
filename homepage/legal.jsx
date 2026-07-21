/* global React, ReactDOM, window, Eyebrow, Nav, Footer, goNav, Reveal, useBreakpoint */
// j. society — Legal pages (privacy policy / terms & conditions). Page picked via window.LEGAL_PAGE.

const PRIVACY = {
  eyebrow: 'Legal · Privacy',
  title: 'Privacy policy',
  updated: 'Updated 12/01/2025',
  intro: 'J. Society (“we,” “us,” or “our”) is committed to protecting your privacy. This policy explains what information we collect, how we use it, and what rights you have when using our website. By accessing or using our website, you agree to the practices described here.',
  sections: [
    { h: 'Information we collect', body: ['We may collect the following types of information.'], subs: [
      { h: 'Information you voluntarily provide', items: ['When you contact us by email or through a form', 'When you subscribe to updates or newsletters'] },
      { h: 'Automatically collected information', lead: 'Like most websites, we automatically collect limited technical information, such as:', items: ['Your IP address', 'Browser type and version', 'Pages viewed and time spent', 'Device type', 'General location (city or region, not your exact address)'], tail: 'This data helps us understand website performance and improve user experience.' },
      { h: 'Cookies', lead: 'We may use cookies or similar technologies to:', items: ['Improve site performance', 'Remember basic preferences', 'Analyze traffic and usage patterns'], tail: 'You can block cookies through your browser settings, but some features may not work properly.' },
    ]},
    { h: 'How we use your information', lead: 'We use information to:', items: ['Operate and improve the website', 'Respond to inquiries', 'Analyze traffic and trends', 'Maintain site security', 'Send optional updates or newsletters (only if you voluntarily subscribe)'], tail: 'We do not sell or rent your personal information.' },
    { h: 'Sharing of information', lead: 'We may share information only in the following limited circumstances:', items: ['Service providers — trusted partners that help us operate the website (e.g., analytics tools, hosting)', 'Legal requirements — if required by law, regulation, or court order', 'Website security — to protect our rights, prevent fraud, or address technical issues'], tail: 'We do not share your information with advertisers or unrelated third parties.' },
    { h: 'Third-party links', body: ['Our site may include links to third-party websites. We are not responsible for their content, practices, or privacy policies. Please review their policies before providing any information.'] },
    { h: 'Data retention', body: ['We keep personal information only as long as necessary for the purposes described in this policy or as required by law. Analytics data may be stored for longer periods in aggregated, non-identifiable form.'] },
    { h: 'Your choices & rights', lead: 'Depending on your location, you may have certain data rights, such as:', items: ['Accessing the information we hold', 'Requesting corrections or deletion', 'Objecting to certain types of data processing', 'Opting out of newsletters or marketing emails'], tail: 'To request changes, simply contact us.' },
    { h: 'Children’s privacy', body: ['Our website is not intended for children under 13, and we do not knowingly collect personal information from children.'] },
    { h: 'Security measures', body: ['We take reasonable steps to protect your information, but no data transmission over the internet can be guaranteed to be 100% secure.'] },
    { h: 'Changes to this privacy policy', body: ['We may update this policy from time to time. Any changes will be posted on this page with the updated date above. Continued use of the website means you accept those changes.'] },
    { h: 'Contact us', body: ['If you have questions about this privacy policy or your personal data, please contact us.'], email: 'info@jsociety.com' },
  ],
};

const TERMS = {
  eyebrow: 'Legal · Terms',
  title: 'Terms & conditions',
  updated: 'Updated 12/01/2025',
  intro: 'Welcome to J. Society. By accessing or using our website, you agree to these Terms & Conditions. If you do not agree, please discontinue use of the site.',
  sections: [
    { h: 'Use of our website', body: ['Our website provides fashion-related information, articles, images, and other editorial content. You may use the site only for personal, non-commercial purposes unless otherwise approved by us in writing.'], lead: 'You agree not to:', items: ['Copy, reproduce, or distribute our content without permission', 'Attempt to hack, disrupt, or harm the website', 'Use the site for any unlawful or abusive purposes'] },
    { h: 'Intellectual property', body: ['All content on this website — including text, images, graphics, logos, and layout — is owned by J. Society or our content partners and is protected by copyright and trademark laws. You may not reuse or republish our content without written permission.'] },
    { h: 'External links', body: ['Our site may include links to third-party websites for additional information or inspiration. We do not control or endorse these sites, and we are not responsible for their content or practices.'] },
    { h: 'Disclaimer of warranties', body: ['The website is provided “as is” and “as available”. We do not guarantee that the site will always be available, uninterrupted, error-free, or secure.'] },
    { h: 'Limitation of liability', body: ['To the fullest extent permitted by law, J. Society is not liable for any damages resulting from your use of the website or reliance on its content.'] },
    { h: 'Changes to these terms', body: ['We may update these Terms from time to time. Any changes will be posted on this page, with the updated date shown above. Continued use of the site means you accept the updated Terms.'] },
    { h: 'Contact us', body: ['If you have any questions about these Terms, feel free to contact us.'], email: 'info@jsociety.com' },
  ],
};

const legalBody = { fontFamily: 'var(--js-sans)', fontSize: 16.5, lineHeight: 1.65, color: 'var(--js-fg-body)', margin: 0 };

function LegalList({ lead, items, tail }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {lead && <p style={legalBody}>{lead}</p>}
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, margin: 0, padding: 0 }}>
        {items.map((it, i) => (
          <li key={i} style={{ ...legalBody, display: 'flex', gap: 12 }}>
            <span aria-hidden="true" style={{ fontFamily: 'var(--js-mono)', fontSize: 12, color: 'var(--js-stone)', lineHeight: '27px' }}>&middot;</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
      {tail && <p style={legalBody}>{tail}</p>}
    </div>
  );
}

function LegalSection({ n, s }) {
  return (
    <Reveal>
      <section style={{ display: 'grid', gridTemplateColumns: '56px 1fr', gap: 20, padding: '30px 0', borderTop: '1px solid var(--js-mist)' }}>
        <div style={{ fontFamily: 'var(--js-mono)', fontSize: 12, letterSpacing: '0.16em', color: 'var(--js-stone)', paddingTop: 7 }}>{String(n).padStart(2, '0')}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <h2 style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(24px, 2.6vw, 30px)', lineHeight: 1.1, letterSpacing: '-0.01em', color: 'var(--js-ink)', margin: 0 }}>{s.h}</h2>
          {(s.body || []).map((p, i) => <p key={i} style={legalBody}>{p}</p>)}
          {s.items && <LegalList lead={s.lead} items={s.items} tail={s.tail} />}
          {(s.subs || []).map((sub, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: i === 0 ? 4 : 8 }}>
              <h3 style={{ fontFamily: 'var(--js-mono)', fontSize: 11, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--js-espresso)', margin: 0 }}>{sub.h}</h3>
              {sub.items && <LegalList lead={sub.lead} items={sub.items} tail={sub.tail} />}
            </div>
          ))}
          {s.email && <a href={'mailto:' + s.email} style={{ fontFamily: 'var(--js-mono)', fontSize: 13, letterSpacing: '0.12em', color: 'var(--js-ink)', textDecoration: 'underline', textUnderlineOffset: 4, width: 'fit-content' }}>{s.email.toUpperCase()}</a>}
        </div>
      </section>
    </Reveal>
  );
}

function LegalPage({ data }) {
  const bp = useBreakpoint();
  return (
    <div>
      <Nav solid />
      <main style={{ background: 'var(--js-paper)', padding: 'calc(78px + clamp(40px, 7vw, 88px)) clamp(20px, 5vw, 44px) clamp(56px, 8vw, 104px)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Reveal>
            <header style={{ paddingBottom: 'clamp(28px, 4vw, 44px)' }}>
              <Eyebrow>{data.eyebrow}</Eyebrow>
              <h1 style={{ fontFamily: 'var(--js-serif)', fontWeight: 500, fontSize: 'clamp(40px, 5.4vw, 64px)', lineHeight: 1.0, letterSpacing: '-0.014em', color: 'var(--js-ink)', margin: '14px 0 18px', textWrap: 'balance' }}>{data.title}</h1>
              <div style={{ fontFamily: 'var(--js-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--js-stone)', marginBottom: 20 }}>{data.updated}</div>
              <p style={{ ...legalBody, fontSize: 18, lineHeight: 1.6 }}>{data.intro}</p>
            </header>
          </Reveal>
          {data.sections.map((s, i) => <LegalSection key={i} n={i + 1} s={s} />)}
        </div>
      </main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<LegalPage data={window.LEGAL_PAGE === 'terms' ? TERMS : PRIVACY} />);
