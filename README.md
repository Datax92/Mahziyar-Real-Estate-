# Mahziyar Real Estate Marketing — one page website

Single-page site for **Mahziyar Marketing**, a real estate marketing firm based at
Office #113, First Floor, Benazir Plaza, Jinnah Avenue, Blue Area, Islamabad 44000.

Static HTML/CSS/JS — no build step, no dependencies. Open `index.html` in a browser,
or upload the repo contents to any static host.

## Files

| Path | What it is |
| --- | --- |
| `index.html` | The whole page |
| `styles.css` | All styling. Brand tokens live in `:root` at the top |
| `script.js` | Sticky header, mobile menu, scroll reveals, WhatsApp enquiry form |
| `assets/` | Logo, favicon mark and photography |
| `mahziyar logo 001 2.pdf` | Original vector logo artwork (source for `assets/logo.png`) |

## Brand

Gold on near-black, sampled from the logo artwork:

- Gold ramp `#F9E9BC → #E6C978 → #D4AF37 → #A97F22`
- Ground `#0A0C0F`, panels `#0F1319`
- Type: **Sora** for headings, **Inter** for body (Google Fonts)

`assets/logo.png` and `assets/mark.png` were rendered from the source PDF at 12×
with a transparent background, so the logo sits on any dark surface without a plate.

## Contact points

WhatsApp and call buttons are wired to **+92 311 1555426**; the CTA band also offers
**+92 312 5772180**. The enquiry form has no backend — it composes the visitor's
answers into a prefilled `wa.me` message and opens WhatsApp.

To change the WhatsApp number, edit `WA_NUMBER` at the top of `script.js` **and** the
`wa.me/` links in `index.html`.

## Staged sections

Five sections are written and tested but **commented out** so they aren't live yet:
Projects, How it works, Reviews, the CTA band, and Contact + enquiry form.

Each sits inside its own labelled block in `index.html`:

```html
<!-- ================================================================
     STAGED SECTION: PROJECTS
     Hidden from the live page for now. To publish it, delete the
     comment-open line directly below and the comment-close line at
     the end of this block. Nothing else needs changing.
     ================================================================ -->
```

Delete the two comment lines around a block and that section goes live on its own —
they are independent, so they can be released one at a time.

Links that pointed at those sections are commented out alongside them and marked
`STAGED:` — the nav items, the hero's second button (temporarily pointing at
`#services`), and the footer's Projects column. `.ftr-grid` in `styles.css` is set to
three columns while that footer column is hidden; the comment there says what to
restore.

## Notes before going fully live

- **Office hours** (`Monday – Saturday, open until 7:00 PM, Sunday by appointment`)
  are a placeholder — Google only lists a 7 PM closing time. Confirm and correct.
- **Project photography is stock.** Replace the files in `assets/` using the same
  names and they drop straight in.
- The `RealEstateAgent` JSON-LD block at the bottom of `index.html` has no `url`
  field yet; add the live domain once the site is hosted.
