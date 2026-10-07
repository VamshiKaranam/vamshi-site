# vamshikaranam.vercel.app

The academic website of Vamshi Karanam, Assistant Professor of Geology at the
University of Arkansas at Little Rock.

It is a plain static site. A small script (`build.mjs`) turns the content files
into HTML. There is nothing to install and no framework to keep up to date.

## Changing the content

Everything you are likely to edit is in the `content/` folder. Each file starts
with a short note explaining its fields.

| To change…                                         | Edit                        |
| -------------------------------------------------- | --------------------------- |
| Name, title, email, office, profile links, CV link | `content/site.mjs`          |
| Publications                                       | `content/publications.mjs`  |
| News coverage                                      | `content/media.mjs`         |
| Research themes, study sites, methods, figures     | `content/research.mjs`      |
| Bio, career history, awards, service, home-page updates | `content/about.mjs`    |
| Courses and the research group                     | `content/teaching.mjs`      |

You can edit these directly on GitHub (open the file, click the pencil icon,
commit). Vercel rebuilds the site within a minute.

### Things still to fill in

The site marks missing items with a yellow "To add" note. They are:

- **Research figures**: put images in `static/assets/img/research/` and set
  `figure.src` for each theme in `content/research.mjs`.
- **Group name**: `group.name` in `content/site.mjs`.
- **Course numbers, terms and syllabi**: `content/teaching.mjs`.
- **Office hours**: `officeHours` in `content/site.mjs`.
- **ORCID**: add it to `profiles` in `content/site.mjs`.
- **Students**: `group.members` in `content/teaching.mjs`.

To hide every "To add" note at once, set `showPlaceholders: false` in
`content/site.mjs`.

### Replacing the CV or photo

- CV: replace `static/cv.pdf` with a file of the same name.
- Photo: replace the `vamshi-karanam-*.jpg` and `.webp` files in
  `static/assets/img/` (800 and 480 pixels wide, 4:5 portrait).

### Moving to a custom domain

Add the domain in Vercel, then change `url` at the top of `content/site.mjs` so
the sitemap and link previews use the new address.

## Previewing on your own computer

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
npm run preview
```

Then open http://localhost:3000. Run it again after editing content.

## How it is put together

```
content/        The words and data (edit these)
src/            Page templates and the map-drawing code
static/         Files copied to the site as they are: CSS, JavaScript, fonts, images, cv.pdf
scripts/        Local preview server; one-off helper that prepares the map coastlines
build.mjs       Builds everything into dist/
vercel.json     Tells Vercel to run build.mjs and serve dist/
```

- The interferogram on the home page is a simulation drawn in the browser
  (`static/assets/js/fringe.js`). It illustrates the method and is not data.
- Maps are drawn at build time from Natural Earth coastlines (public domain).
  They deliberately show no political boundaries.
- Fonts are Archivo and Source Serif 4, both under the SIL Open Font License,
  served from this site rather than from a third party.
