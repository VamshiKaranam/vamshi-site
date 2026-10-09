// Courses and the research group.
// Course number, level and terms are optional; when set they show under the
// course name.

// Photo at the top of the Teaching page. Set to null to hide.
export const fieldPhoto = {
  src: '/assets/img/guadalupe-devils-hall.jpg',
  webp: '/assets/img/guadalupe-devils-hall.webp',
  width: 1400, height: 933,
  alt: 'Vamshi Karanam standing on pale limestone boulders in a canyon, below tall layered limestone cliffs, with sotol and shrubs around him and a blue sky above.',
  caption: 'Devil’s Hall, Guadalupe Mountains National Park, Texas. The cliffs are part of the Permian Capitan Reef.',
};

export const courses = [
  {
    name: 'Earth and the Environment',
    code: 'GEOL 11203',
    level: null, // e.g. 'Undergraduate'
    description:
      'An introduction to how the Earth works: its materials, the processes that shape its surface, and the ways people depend on and alter the environment.',
    terms: 'Fall 2026',
  },
  {
    name: 'Earth and the Environment Lab',
    code: 'GEOL 11201',
    level: null,
    description:
      'The hands-on companion to the lecture: minerals and rocks, maps, and working with real environmental data.',
    terms: 'Fall 2026',
  },
  {
    name: 'GIS I',
    code: 'GEOL 42104',
    level: null,
    description:
      'A first course in geographic information systems: spatial data, map projections, analysis and cartography, taught through practical projects.',
    terms: 'Fall 2026',
  },
];

export const earlierTeaching = [
  { where: 'Southern Methodist University', what: 'Teaching assistant for remote sensing, GIS, radar and photogrammetry. Led a two-day Google Earth Engine workshop introducing students to large-scale geospatial analysis.' },
  { where: 'Leibniz University Hannover', what: 'Teaching assistant for SAR applications and geodesy.' },
  { where: 'IIT Roorkee', what: 'Teaching assistant for remote sensing and image interpretation.' },
];

export const teachingApproach =
  'Across these courses I designed hands-on labs in InSAR processing and in field surveying with GNSS and total stations.';

// ── Research group ─────────────────────────────────────────────────────────
export const group = {
  intro:
    'We use satellites to measure how the Earth’s surface is changing, and models to explain why. The lab works on fluid-driven deformation in energy basins such as the Permian, land subsidence and other geohazards. It is new: its computational geophysics and remote sensing facilities are being set up in the School of Physical Sciences at UA Little Rock.',
  directions: [
    { name: 'Earth observation', detail: 'InSAR, GNSS and optical time series, from single sites to whole basins.' },
    { name: 'Geospatial science', detail: 'GIS, data fusion and machine learning for mapping exposure and risk.' },
    { name: 'Natural and human-made hazards', detail: 'Subsidence, induced seismicity, failing wells, unstable slopes and mines.' },
  ],
  // People in the group. The People section appears on the Lab page once at
  // least one member is listed here. Add students as they join:
  //   { name: 'Full Name', role: 'M.S. student', topic: 'What they work on', photo: '/assets/img/people/name.jpg' }
  members: [],
  // Set to a short paragraph when you have positions to advertise. While it
  // is null, the page says there are no openings yet.
  openings: null,
  noOpenings: 'There are no student openings at the moment. When positions become available they will be posted here.',
};
