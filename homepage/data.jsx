/* global window */
// j. society — site data. Fall '26 wholesale positioning. Real photography in images/.

/* ===================== HOME ===================== */

// "What we offer our retail partners" — Relume 3-column partnership section.
const PARTNERSHIP = [
  {
    k: '01', img: 'images/detail-fiber.jpg', pos: '50% 35%',
    title: 'Exclusive collections',
    body: 'New designs arrive each season, available only to our partners — never the open market, never the discount floor.',
  },
  {
    k: '02', img: 'images/detail-gauge.jpg', pos: '50% 28%',
    title: 'Private label options',
    body: 'Build your own line with pieces designed and produced to your specification, made in the same New York atelier.',
  },
  {
    k: '03', img: 'images/detail-lived.jpg', pos: '50% 22%',
    title: 'Buying appointments',
    body: 'Meet with our team to plan inventory, pricing, and the season ahead — one-to-one, in the showroom or remote.',
  },
];

// "Our collection" — home gallery: two anchor categories + four featured pieces.
const GALLERY = [
  {
    id: 'essential-basics', size: 'tall', img: 'images/p-crew.jpg', pos: '50% 22%',
    title: 'Essential basics', body: 'Timeless silhouettes that anchor every retail floor.',
    tags: ['Cotton', 'Versatile', 'Core'], cta: 'View pieces',
  },
  {
    id: 'tailored-knits', size: 'wide', img: 'images/editorial-2.jpg', pos: '50% 28%',
    title: 'Tailored knits', body: 'Structured pieces that hold their line through a full day on the rack.',
    tags: ['Merino', 'Structured', 'Seasonal'], cta: 'View pieces',
  },
  {
    id: 'statement-pieces', size: 'std', img: 'images/p-jacquard.jpg', pos: '50% 22%',
    title: 'Statement pieces', body: 'Patterned knits that pull a customer across the room.',
    tags: ['Jacquard', 'Limited', 'Hero'], cta: 'View pieces',
  },
  {
    id: 'seasonal-dresses', size: 'tall', img: 'images/p-rib.jpg', pos: '50% 24%',
    title: 'Seasonal dresses', body: 'Designs that capture the moment without chasing the trend.',
    tags: ['Linen', 'Seasonal', 'Statement'], cta: 'View pieces',
  },
  {
    id: 'layering', size: 'wide', img: 'images/p-vest.jpg', pos: '50% 16%',
    title: 'Layering', body: 'Vests and open-knits built to sell alongside everything else you stock.',
    tags: ['Lambswool', 'Layer', 'Core'], cta: 'View pieces',
  },
  {
    id: 'outerwear', size: 'std', img: 'images/p-tweed.jpg', pos: '50% 16%',
    title: 'Outerwear', body: 'Heavier gauges and tweeds for the cold-weather floor.',
    tags: ['Wool', 'Outerwear', 'Hero'], cta: 'View pieces',
  },
];

// "Built for retailers who understand craft" + "Built for buyers who understand the difference".
const HOME_CRAFT = {
  heading: 'Built for retailers who understand craft',
  body: 'j. society started in New York with a simple idea: wholesale fashion should be honest. We work directly with retailers, not through layers of middlemen. Our pieces are designed to sell because they’re made to last, and we stand behind every order we ship.',
};
const HOME_BUYERS = {
  heading: 'Built for buyers who understand the difference',
  body: 'You know what sells. You know what lasts. j. society was built for retailers like you — the ones who refuse to compromise on quality or settle for generic inventory. We handle the sourcing, the design, the production. You handle what you do best: knowing your customer and moving merchandise.',
  img: 'images/editorial-2.jpg', pos: '60% 14%',
};

// "Showroom" — upcoming-event slider on the home page.
const SHOWROOM_EVENTS = [
  { day: 'Tue', date: '06', mo: 'Feb 2026', kind: 'Showroom', title: 'Fall essentials', place: 'Manhattan', body: 'Core pieces built to last through the season.', img: 'images/p-crew.jpg', pos: '50% 22%' },
  { day: 'Wed', date: '07', mo: 'Feb 2026', kind: 'Appointment', title: 'Buying consultation', place: 'Manhattan', body: 'Work with our team to build your fall inventory.', img: 'images/detail-lived.jpg', pos: '50% 30%' },
  { day: 'Thu', date: '08', mo: 'Feb 2026', kind: 'Showroom', title: 'Outerwear collection', place: 'Manhattan', body: 'Structured jackets and layering pieces ready now.', img: 'images/p-tweed.jpg', pos: '50% 16%' },
  { day: 'Fri', date: '09', mo: 'Feb 2026', kind: 'Appointment', title: 'Private preview', place: 'Manhattan', body: 'A first look at the spring line, by appointment only.', img: 'images/editorial-2.jpg', pos: '50% 28%' },
];

// "Where to find us" — season calendar grouped by month; each month expands to its events.
// Each event: date/day = start, optional endDate/endDay = multi-day range, city = "City, ST".
const EVENTS_CALENDAR = [
  {
    month: 'August', year: '2026',
    events: [
      { date: '03', day: 'Mon', endDate: '05', endDay: 'Wed', season: 'Resort ’26–’27', title: 'Indian Wells Show', city: 'Indian Wells, CA', body: 'With The Collective — Indian Wells Resort, 76661 CA-111.' },
      { date: '04', day: 'Tue', endDate: '07', endDay: 'Fri', season: 'Resort ’26–’27 & Spring ’27', title: 'Atlanta Apparel Market', city: 'Atlanta, GA', body: 'With Ambrosia Showroom — AmericasMart, Building 3, Floor 9, Showroom #9N104, 250 Spring St NW.', href: 'https://www.atlanta-apparel.com/' },
      { date: '17', day: 'Mon', endDate: '21', endDay: 'Fri', season: 'Resort ’26–’27 & Spring ’27', title: 'Dallas Market', city: 'Dallas, TX', body: 'With Pam Martin Showroom — Dallas Apparel Market, 2050 N Stemmons Fwy, Suite #15454.', href: 'https://www.dallasmarketcenter.com/' },
      { date: '23', day: 'Sun', endDate: '25', endDay: 'Tue', season: 'Resort ’26–’27 & Spring ’27', title: 'Chicago Collective Market — Women’s', city: 'Chicago, IL', body: 'With Studio H Chicago — Kinzie Street Showrooms, 400 N Wells St, Suite 308.', href: 'https://www.chicagocollectivewomens.com' },
      { date: '25', day: 'Tue', endDate: '27', endDay: 'Thu', season: 'Resort ’26–’27', title: 'Southwest Golf Show', city: 'Mesa, AZ', body: 'With The Collective — Mesa Convention Center, 263 N. Center Street.' },
    ],
  },
  {
    month: 'September', year: '2026',
    events: [
      { date: '01', day: 'Tue', endDate: '02', endDay: 'Wed', season: 'Resort ’26–’27', title: 'Cala San Francisco', city: 'San Francisco, CA', body: 'With The Collective.', href: 'https://calashows.com/' },
      { date: '06', day: 'Sun', endDate: '09', endDay: 'Wed', season: 'Resort ’26–’27', title: 'Northwest Market Show', city: 'Tigard, OR', body: 'With The Collective — Embassy Suites, 9000 SW Washington Square Rd.', href: 'https://www.northwestmarket.org' },
      { date: '09', day: 'Wed', endDate: '11', endDay: 'Fri', season: 'Resort ’26–’27 & Spring ’27', title: 'Coterie New York', city: 'New York, NY', body: 'Javits Center, 429 11th Ave.', href: 'https://www.coteriefashionevents.com/' },
    ],
  },
  {
    month: 'October', year: '2026',
    events: [
      { date: '06', day: 'Tue', endDate: '09', endDay: 'Fri', season: 'Spring ’27', title: 'Atlanta Apparel Market', city: 'Atlanta, GA', body: 'With Ambrosia Showroom — AmericasMart, Building 3, Floor 9, Showroom #9N104, 250 Spring St NW.', href: 'https://www.atlanta-apparel.com/' },
      { date: '12', day: 'Mon', endDate: '14', endDay: 'Wed', season: 'Spring ’27', title: 'LA Market', city: 'Los Angeles, CA', body: 'With The Collective — Cooper Building, 860 S Los Angeles St, Suite 326.', href: 'https://fashiondistrict.org' },
      { date: '—', day: 'Dates TBD', season: 'Spring ’27', title: 'Cala San Francisco', city: 'TBD', body: 'With The Collective — venue to be announced.', href: 'https://calashows.com/' },
      { date: '18', day: 'Sun', endDate: '19', endDay: 'Mon', season: 'Spring ’27', title: 'Northstar Fashion Exhibitors', city: 'St Paul, MN', body: 'With Studio H Chicago — Saint Paul RiverCentre, 175 Kellogg Blvd.', href: 'https://www.northstarfashion.com/' },
      { date: '19', day: 'Mon', endDate: '23', endDay: 'Fri', season: 'Spring ’27', title: 'Dallas Market', city: 'Dallas, TX', body: 'With Pam Martin Showroom — Dallas Apparel Market, 2050 N Stemmons Fwy, Suite #15454.', href: 'https://www.dallasmarketcenter.com/' },
      { date: '26', day: 'Mon', endDate: '28', endDay: 'Wed', season: 'Spring ’27', title: 'Chicago Market', city: 'Chicago, IL', body: 'With Studio H Chicago — Kinzie Street Showrooms, 400 N Wells St, Suite 308.', href: 'https://www.kinziestreetshowrooms.com' },
    ],
  },
];

// "Pieces in motion" — home bento (5 slots) that crossfades through multiple scenes.
const MOTION = {
  scenes: [
    { big: { img: 'images/editorial-2.jpg', pos: '50% 28%' }, grid: [
      { img: 'images/p-rib.jpg', pos: '50% 24%' },
      { img: 'images/p-jacquard.jpg', pos: '50% 22%' },
      { img: 'images/detail-gauge.jpg', pos: '50% 30%' },
      { img: 'images/p-vest.jpg', pos: '50% 16%' },
    ] },
    { big: { img: 'images/p-crew.jpg', pos: '50% 22%' }, grid: [
      { img: 'images/p-tweed.jpg', pos: '50% 16%' },
      { img: 'images/p-varsity.jpg', pos: '50% 30%' },
      { img: 'images/craft.jpg', pos: '50% 24%' },
      { img: 'images/detail-fiber.jpg', pos: '50% 35%' },
    ] },
    { big: { img: 'images/look-hero.jpg', pos: '60% 30%' }, grid: [
      { img: 'images/detail-lived.jpg', pos: '50% 30%' },
      { img: 'images/p-jacquard.jpg', pos: '50% 22%' },
      { img: 'images/p-rib.jpg', pos: '50% 24%' },
      { img: 'images/detail-gauge.jpg', pos: '50% 30%' },
    ] },
  ],
};

/* ===================== COLLECTION SLIDER / LOOK BOOK ===================== */

// "What we offer" — Look Book editorial cards (text + image, alternating).
const OFFER_CARDS = [
  { title: 'Structured outerwear', tags: ['Outerwear', 'Professional', 'Versatile'], body: 'Cut from quality fabrics that hold their shape through seasons and wear.', img: 'images/p-tweed.jpg', pos: '50% 16%', cta: 'Explore', href: 'collection-item.html' },
  { title: 'Everyday knits', tags: ['Tops', 'Comfort', 'Refined'], body: 'Soft cashmere that feels as good as it looks, season after season.', img: 'images/p-crew.jpg', pos: '50% 22%', cta: 'View all', href: 'collection-item.html' },
  { title: 'Tailored bottoms', tags: ['Bottoms', 'Timeless', 'Bold'], body: 'The foundation of any wardrobe that actually works for living.', img: 'images/p-rib.jpg', pos: '50% 24%', cta: 'Shop', href: 'collection-item.html' },
];


const COLLECTION = [
  { id: 'oversized-crew', name: 'The Oversized Crew', cat: 'Core', price: 245, fiber: '100% Organic Cotton', gauge: '5 GG', lot: 'LOT 052', color: 'Camel', img: 'images/p-crew.jpg', pos: '50% 22%' },
  { id: 'two-tone-rib', name: 'The Two-Tone Rib', cat: 'Dresses', price: 265, fiber: '70% Merino · 30% Cotton', gauge: '7 GG', lot: 'LOT 049', color: 'Claret / Blush', img: 'images/p-rib.jpg', pos: '50% 26%' },
  { id: 'jacquard-knit', name: 'The Jacquard Knit', cat: 'Statement', price: 255, fiber: '100% Extra-Fine Merino', gauge: '7 GG', lot: 'LOT 044', color: 'Birch / Cocoa', img: 'images/p-jacquard.jpg', pos: '50% 24%' },
  { id: 'sweater-vest', name: 'The Sweater Vest', cat: 'Layering', price: 185, fiber: '100% Lambswool', gauge: '12 GG', lot: 'LOT 038', color: 'Navy', img: 'images/p-vest.jpg', pos: '50% 18%' },
  { id: 'tweed-cardigan', name: 'The Tweed Cardigan', cat: 'Outerwear', price: 315, fiber: '60% Cotton · 40% Wool', gauge: '5 GG', lot: 'LOT 031', color: 'Salt & Pepper', img: 'images/p-tweed.jpg', pos: '50% 16%' },
  { id: 'varsity-knit', name: 'The Varsity Knit', cat: 'Statement', price: 295, fiber: '100% Virgin Wool', gauge: '7 GG', lot: 'LOT 027', color: 'Heather / Navy', img: 'images/p-varsity.jpg', pos: '50% 30%' },
];

// "What we make" — Look Book filterable grid (Relume product list).
const PIECES = [
  { id: 'oversized-crew', name: 'The Oversized Crew', cat: 'Tops', tag: 'Camel', body: 'A relaxed cotton crew that anchors any floor and sells in every size run.', img: 'images/p-crew.jpg', pos: '50% 22%' },
  { id: 'tweed-cardigan', name: 'The Tweed Cardigan', cat: 'Outerwear', tag: 'Salt & Pepper', body: 'Layered protection against the elements and the seasons — built to last.', img: 'images/p-tweed.jpg', pos: '50% 16%' },
  { id: 'two-tone-rib', name: 'The Two-Tone Rib', cat: 'Dresses', tag: 'Claret', body: 'Simple elegance that works alone or layered under anything else you stock.', img: 'images/p-rib.jpg', pos: '50% 24%' },
  { id: 'sweater-vest', name: 'The Sweater Vest', cat: 'Tops', tag: 'Navy', body: 'Cut to fit real bodies and real lives, in a 12-gauge lambswool that holds.', img: 'images/p-vest.jpg', pos: '50% 18%' },
  { id: 'jacquard-knit', name: 'The Jacquard Knit', cat: 'Dresses', tag: 'Birch', body: 'For the floor that needs a hero — a piece customers ask for by name.', img: 'images/p-jacquard.jpg', pos: '50% 22%' },
  { id: 'varsity-knit', name: 'The Varsity Knit', cat: 'Tops', tag: 'Heather', body: 'Honest virgin wool that breathes, wears well, and keeps its shape.', img: 'images/p-varsity.jpg', pos: '50% 30%' },
];
const PIECE_FILTERS = ['View all', 'Dresses', 'Outerwear', 'Tops'];

// Masonry gallery on the Look Book ("The collection").
const LOOKS = [
  { k: '01', id: 'quiet-layer', title: 'The Quiet Layer', tag: 'Camel · Daylight', img: 'images/p-crew.jpg', pos: '50% 20%' },
  { k: '02', id: 'claret-hour', title: 'Claret Hour', tag: 'Two-tone rib · Interior', img: 'images/p-rib.jpg', pos: '50% 24%' },
  { k: '03', id: 'night-garden', title: 'Night Garden', tag: 'Jacquard cardigan · Floor', img: 'images/craft.jpg', pos: '50% 22%' },
  { k: '04', id: 'kept-quiet', title: 'Pattern, Kept Quiet', tag: 'Birch jacquard · Texture', img: 'images/p-jacquard.jpg', pos: '50% 22%' },
  { k: '05', id: 'schoolyard', title: 'Schoolyard', tag: 'Sweater vest · Brick', img: 'images/p-vest.jpg', pos: '50% 16%' },
  { k: '06', id: 'salt-pepper', title: 'Salt & Pepper', tag: 'Tweed cardigan · Studio', img: 'images/p-tweed.jpg', pos: '50% 14%' },
];

/* ===================== ABOUT ===================== */

// "Built on what retailers actually need" — 2-col intro + full-width image.
const ABOUT_INTRO = {
  heading: 'Our mission is to create a line of high quality “not-so-basic” basics.',
  body: [
    'At the heart of our brand is an obsession with yarn. We meticulously source the softest, most refined fibers in a curated range of colors.',
    'Season after season, J. Society continues to build on its core philosophy: creating timeless knitwear with purpose, intention, and a touch of effortless luxury.',
  ],
  img: 'images/editorial-2.jpg', pos: '50% 30%',
};

// Origin blocks (icon + heading + body) shown beside a tall image.
const STORY = [
  {
    icon: 'play', title: 'How it started',
    body: 'Our founder spent years buying for boutiques, watching what sold and what didn’t. She saw the gap. Retailers needed pieces built to last, made by people who cared about the work. That’s where j. society began — a Manhattan showroom, one simple idea: quality over everything else.',
  },
  {
    icon: 'factory', title: 'What we believe',
    body: 'A piece of clothing isn’t finished when it leaves the factory. It’s finished when it’s still in someone’s closet five years later. We build for that moment. Every fabric choice, every seam, every detail serves that single purpose — we refuse to make pieces that fade or fall apart.',
  },
  {
    icon: 'store', title: 'Why we’re here',
    body: 'Retailers deserve partners who understand their customers. We’re not here to flood the market with trends. We’re here to build collections that move through seasons, that retailers can trust, that customers will ask for by name.',
  },
];

// Dark "Milestones" timeline — two metric cards.
const MILESTONES = [
  { label: 'Growth', body: 'Expanding our reach across North American retail, one considered partnership at a time.' },
  { label: 'Impact', body: 'Pieces that stay in closets, not in clearance bins — sell-through that holds season to season.' },
];

// "The team" — 8 people with role + bio.
const TEAM = [
  { name: 'Sarah Chen', role: 'Founder', note: 'Started in wholesale after years buying for boutiques across Manhattan.' },
  { name: 'Marcus Webb', role: 'Design director', note: 'Shapes collections with an eye for pieces that move through seasons.' },
  { name: 'Elena Rossi', role: 'Production lead', note: 'Manages relationships with manufacturers who share our standards.' },
  { name: 'James Park', role: 'Sales director', note: 'Connects retailers with the pieces their customers will keep for years.' },
  { name: 'Victoria Moreno', role: 'Fabric sourcing', note: 'Travels to find materials that refuse to compromise on quality.' },
  { name: 'David Liu', role: 'Operations', note: 'Keeps everything running so designers and makers can focus on craft.' },
  { name: 'Sophia Andersen', role: 'Showroom manager', note: 'Creates the space where buyers see what quality actually looks like.' },
  { name: 'Thomas Wright', role: 'Partnerships', note: 'Builds relationships with retailers who understand what we’re building.' },
];

// "What buyers say" — retailer testimonials.
const TESTIMONIALS = [
  { quote: 'These pieces don’t need explanation. They sell themselves because they’re built right.', who: 'Rebecca Torres', meta: 'Owner · Brooklyn boutique' },
  { quote: 'j. society understands that quality is the only thing that matters in this business.', who: 'Michael Huang', meta: 'Buyer · Manhattan retailer' },
  { quote: 'Our customers ask for j. society by name. That’s how you know you’re doing something right.', who: 'Natasha Volkov', meta: 'Founder · independent shop' },
];

// "Questions" — B2B FAQ.
const FAQ = [
  { q: 'What’s the minimum order?', a: 'We work with retailers of all sizes. Minimums are reasonable and built around what makes sense for your business. Contact us and we’ll talk through what works for you.' },
  { q: 'Can I visit the showroom?', a: 'Yes. We’re in Manhattan and open by appointment. The showroom is where you see the pieces properly — where you understand the fabric and construction that makes them different.' },
  { q: 'How often do collections drop?', a: 'We release seasonally: spring, summer, fall, and winter. Each collection is intentional, not rushed. We’d rather make fewer pieces that matter than fill a catalog with noise.' },
  { q: 'Do you work internationally?', a: 'We’re based in New York and primarily serve North American retailers. We’re open to conversations about expansion — reach out if you’re interested in partnership.' },
  { q: 'What about custom orders?', a: 'We can discuss custom work for established partners. It depends on the scope and the timeline. Let’s talk about what you need and what’s possible.' },
];

/* ===================== CONTACT ===================== */

// Showroom / rep directory by region.
const REP_DIRECTORY = [
  { region: 'New England', rep: 'Steve Hochman', emails: ['stevehochman@aol.com'], phone: '508-612-4294' },
  { region: 'Mid-Atlantic', rep: 'Lisa Conte', emails: ['lisa.agent109@gmail.com'], phone: '908-513-4144' },
  { region: 'Southeast', rep: 'Ambrosia Showroom', emails: ['erica@ambrosiaandco.com'], phone: '404-521-1863' },
  { region: 'Mid-West', rep: 'Studio H Chicago', emails: ['shannon@studiohchicago.com'], phone: '312-253-7344' },
  { region: 'Southwest', rep: 'Pam Martin Showroom', emails: ['pam@pammartinandco.com'], phone: '214-533-5413' },
  { region: 'West Coast', rep: 'Collective Showroom', emails: ['michelle.collective@gmail.com', 'cain.collective@gmail.com'], phone: '415-994-5393' },
];

const CONTACT_INFO = [
  { icon: 'clock', label: 'Working hours', note: 'Closed on major holidays', value: 'Monday–Friday, 9am–5pm EST' },
  { icon: 'phone', label: 'Phone', note: 'Mon–Fri 9am–5pm EST', value: '212-921-7650' },
  { icon: 'instagram', label: 'Instagram', note: 'Follow along', value: '@J.SOCIETYNY' },
];

const INQUIRY_TYPES = ['Wholesale order', 'Private label', 'Showroom visit', 'Press & media', 'General inquiry'];
const DESCRIBE_OPTIONS = ['Retail buyer', 'Brand partner', 'Distribution partner', 'Media inquiry', 'General inquiry', 'Other'];

const SHOWROOMS = [
  { city: 'New York', address: '245 West 29th Street, New York NY 10001', primary: true },
  { city: 'Los Angeles', address: '1247 South Hope Street, Los Angeles CA 90015' },
  { city: 'Miami', address: '401 Biscayne Boulevard, Miami FL 33132' },
];

/* ===================== COLLECTION ITEM ===================== */

const COLLECTION_ITEM = {
  name: 'Fall\nCollection',
  eyebrow: 'Fall ’26 · New York',
  intro: 'Clean lines and honest fabrics, built for retailers who know their customers.',
  hero: 'images/look-hero.jpg', heroPos: '60% 30%',
  tags: ['Linen', 'Cotton', 'Tailored'],
  angles: [
    { img: 'images/p-rib.jpg', pos: '50% 22%', span: 'tall' },
    { img: 'images/detail-gauge.jpg', pos: '50% 30%', span: 'std' },
    { img: 'images/detail-fiber.jpg', pos: '50% 35%', span: 'std' },
  ],
  full: [
    { img: 'images/editorial-2.jpg', pos: '50% 28%', span: 'tall' },
    { img: 'images/p-crew.jpg', pos: '50% 22%', span: 'std' },
    { img: 'images/p-jacquard.jpg', pos: '50% 22%', span: 'std' },
    { img: 'images/p-vest.jpg', pos: '50% 16%', span: 'std' },
    { img: 'images/p-tweed.jpg', pos: '50% 16%', span: 'std' },
  ],
  fabric: {
    title: 'The foundation of everything we build',
    body: 'We start with fiber, not fashion. The fabrics in this collection were chosen because they move right, wear well, and look better after fifty washes than they did at ten.',
    points: ['Linen weaves that breathe through a long day', 'Cotton weights that hold their shape', 'Yarns that age like good leather'],
    img: 'images/craft.jpg', pos: '50% 26%',
  },
};

// "See it from every angle" — Collection Item detail masonry.
const DETAILS = [
  { name: 'Linen blend shirt', body: 'Structured yet soft, moves with the body.', tags: ['Spring 2026', 'Wholesale-ready', 'Natural fibers'], img: 'images/p-crew.jpg', pos: '50% 22%' },
  { name: 'Cotton twill pants', body: 'Weight that holds without stiffness.', tags: ['Fast moving', 'Durable woven'], img: 'images/detail-gauge.jpg', pos: '50% 30%' },
  { name: 'Linen trousers', body: 'Breathes in heat, drapes with intention.', tags: ['Spring 2026', 'Retailer favorite', 'Lightweight'], img: 'images/p-rib.jpg', pos: '50% 24%' },
  { name: 'Cotton blend dress', body: 'Simple cut that works across seasons.', tags: ['Spring 2026', 'Wholesale', 'Versatile'], img: 'images/p-jacquard.jpg', pos: '50% 22%' },
  { name: 'Linen jacket', body: 'Layers well, ages better with each wear.', tags: ['New York made', 'Investment piece'], img: 'images/p-tweed.jpg', pos: '50% 16%' },
  { name: 'Cotton canvas shirt', body: 'Built to last, designed to sell.', tags: ['Spring 2026', 'Wholesale', 'Timeless'], img: 'images/p-vest.jpg', pos: '50% 16%' },
];

const MORE_LOOKS = [
  { img: 'images/p-varsity.jpg', pos: '50% 30%' },
  { img: 'images/editorial-2.jpg', pos: '50% 28%' },
  { img: 'images/craft.jpg', pos: '50% 24%' },
  { img: 'images/detail-fiber.jpg', pos: '50% 35%' },
  { img: 'images/p-jacquard.jpg', pos: '50% 22%' },
  { img: 'images/detail-lived.jpg', pos: '50% 30%' },
];

const ITEM_TESTIMONIALS = [
  { quote: 'The cuts are clean, the fabrics are honest, and customers come back for more.', who: 'Maria Chen', meta: 'Boutique owner · Brooklyn' },
  { quote: 'Quality that doesn’t apologize, pricing that makes sense.', who: 'James Mitchell', meta: 'Stylist · Manhattan' },
  { quote: 'Simple designs that sell themselves every single time.', who: 'Rachel Torres', meta: 'Retailer · Queens' },
];

Object.assign(window, {
  PARTNERSHIP, GALLERY, COLLECTION, PIECES, PIECE_FILTERS, LOOKS,
  HOME_CRAFT, HOME_BUYERS, SHOWROOM_EVENTS, EVENTS_CALENDAR, MOTION, OFFER_CARDS,
  STORY, MILESTONES, TEAM, TESTIMONIALS, FAQ, ABOUT_INTRO,
  CONTACT_INFO, REP_DIRECTORY, INQUIRY_TYPES, DESCRIBE_OPTIONS, SHOWROOMS,
  COLLECTION_ITEM, ITEM_TESTIMONIALS, DETAILS, MORE_LOOKS,
});
