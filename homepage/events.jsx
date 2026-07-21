/* global React, ReactDOM, window, EVENTS_CALENDAR, Nav, Footer, PageHeader, EventsYear, CTABanner, NewsletterBand, goNav */
// j. society — Events (full-year showroom calendar)

function App() {
  return (
    <div>
      <Nav />
      <PageHeader
        eyebrow="Showroom &middot; New York"
        title="Events & showroom calendar"
        sub="Previews, market weeks, trunk shows, and buying appointments &mdash; every date for the season, in one place."
        img="images/editorial-2.jpg"
        pos="50% 22%"
      />
      <EventsYear items={EVENTS_CALENDAR} />
      <CTABanner
        eyebrow="By appointment"
        title="Can&rsquo;t make a date?"
        sub="Book a private showroom appointment and we&rsquo;ll walk the full collection on your schedule."
        img="images/detail-lived.jpg"
        primary="Book an appointment"
        onPrimary={() => goNav('contact.html')}
        ghost="View the lookbook"
        onGhost={() => goNav('look-book.html')}
      />
      <NewsletterBand />
      <Footer />
      <PhotoTweaks />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
