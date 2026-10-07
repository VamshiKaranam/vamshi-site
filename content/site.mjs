// Site-wide details. Edit the values here and every page updates.
// Anything set to null is left out of the site until you fill it in.

export const site = {
  // While true, the site shows "To add" notes wherever something is missing
  // (figures, course numbers, office hours). Set to false to hide them all.
  showPlaceholders: true,

  // Change this when the custom domain is live. It is used for the sitemap,
  // canonical links and the preview image shown when the site is shared.
  url: 'https://vamshikaranam.vercel.app',

  name: 'Vamshi Karanam',
  title: 'Assistant Professor of Geology',
  institution: 'University of Arkansas at Little Rock',
  institutionShort: 'UA Little Rock',
  department: 'School of Physical Sciences',
  institutionUrl: 'https://ualr.edu/',

  email: 'vkaranam1@ualr.edu',
  phone: '501.916.5769',
  office: {
    room: 'ETAS 329R',
    lines: ['School of Physical Sciences', '2801 S. University Ave.', 'Little Rock, AR 72204'],
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Engineering+Technology+and+Applied+Science+UA+Little+Rock+2801+S+University+Ave+Little+Rock+AR+72204',
  },
  officeHours: null, // e.g. 'Tuesdays and Thursdays, 2–3:30 pm, or by appointment'

  cv: '/cv.pdf',

  profiles: [
    { label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=Wh0nbK0AAAAJ&hl=en' },
    { label: 'ResearchGate', url: 'https://www.researchgate.net/profile/Vamshi-Karanam-2' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/vamshikaranam/' },
    // Add when confirmed, e.g. { label: 'ORCID', url: 'https://orcid.org/0000-0000-0000-0000' },
  ],

  // The research group. Leave name as null until it is decided; pages then
  // describe the group by what it does instead of by a name.
  group: {
    name: null,
    focus: 'Earth observation, geospatial science and natural hazards',
  },

  description:
    'Vamshi Karanam is an Assistant Professor of Geology at the University of Arkansas at Little Rock. He uses satellite radar (InSAR), GNSS and poroelastic modeling to study land subsidence, fluid-driven deformation and geohazards.',
};

export const nav = [
  { href: '/research', label: 'Research' },
  { href: '/publications', label: 'Publications' },
  { href: '/group', label: 'Group' },
  { href: '/teaching', label: 'Teaching' },
  { href: '/news', label: 'Media' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];
