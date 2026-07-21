# Lookbook photography — not yet in this repo

`look-book.html` references 46 photos in this directory. They exist in the
Claude Design project ("Jsociety Website Homepage" →
`homepage/images/lb/`) but could not be synced into this repo: each JPEG is
larger than the 256 KiB per-file read cap of the design-project API, so every
transfer came back truncated.

To finish the page, export these files from the design project (or copy them
from the original photo set) into `homepage/images/lb/` with these exact names:

```
cover.jpg
t1.jpg t2.jpg t3.jpg t4.jpg t5.jpg t6.jpg
s01.jpg s06.jpg sfall.jpg sets.jpg ygtitle.jpg
ls07.jpg
du02a.jpg du02b.jpg du03a.jpg du04a.jpg du04b.jpg du06a.jpg du06b.jpg
duSa.jpg duSb.jpg
du-det-a.jpg du-det-b.jpg
inset1.jpg inset5.jpg inset6.jpg
tri-main1.jpg tri-main2.jpg
tri-p1.jpg tri-p2.jpg tri-p3.jpg
tri2-p1.jpg tri2-p2.jpg tri2-p3.jpg
tri3-p2.jpg tri3-p3.jpg
d1.jpg d2.jpg d3.jpg
n-d4.jpg n-d5.jpg n-d6.jpg
n-denimtitle.jpg
n-du08a.jpg n-du08b.jpg n-du10a.jpg n-du10b.jpg
n-inset3.jpg n-inset4.jpg
n-solo09.jpg
```

The page renders and functions without them (each slot falls back to the
alabaster placeholder ground), and photos can also be swapped in live via the
built-in Tweaks panel (see `image-swap.js`).
