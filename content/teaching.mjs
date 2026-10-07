// Courses and the research group.
// Fields set to null show as "to be added" notes on the preview; fill them in
// or delete the course's field to hide the note.

export const courses = [
  {
    name: 'Earth and the Environment',
    code: null, // e.g. 'ERSC 1302'
    level: null, // e.g. 'Undergraduate'
    description:
      'An introduction to how the Earth works: its materials, the processes that shape its surface, and the ways people depend on and alter the environment.',
    terms: null, // e.g. 'Fall 2026'
    syllabus: null, // e.g. '/assets/docs/syllabus-earth-environment.pdf'
  },
  {
    name: 'Earth and the Environment Lab',
    code: null,
    level: null,
    description:
      'The hands-on companion to the lecture: minerals and rocks, maps, and working with real environmental data.',
    terms: null,
    syllabus: null,
  },
  {
    name: 'GIS I',
    code: null,
    level: null,
    description:
      'A first course in geographic information systems: spatial data, map projections, analysis and cartography, taught through practical projects.',
    terms: null,
    syllabus: null,
  },
];

export const earlierTeaching = [
  { where: 'Southern Methodist University', what: 'Teaching assistant for remote sensing, GIS, radar and photogrammetry. Led a two-day Google Earth Engine workshop introducing students to large-scale geospatial analysis.' },
  { where: 'Leibniz University Hannover', what: 'Teaching assistant for SAR applications and geodesy.' },
  { where: 'IIT Roorkee', what: 'Teaching assistant for remote sensing and image interpretation.' },
];

export const teachingApproach =
  'Across these courses I designed hands-on labs in InSAR processing and in field surveying with GNSS and total stations.';

// Optional: a short teaching statement in your own words. Shown above the course list.
export const teachingStatement = null;

// ── Research group ─────────────────────────────────────────────────────────
export const group = {
  intro:
    'We use satellites to measure how the Earth’s surface is changing, and models to explain why. The lab works on land subsidence, fluid-driven deformation and geohazards. It is new: its computational geophysics and remote sensing facilities are being set up in the School of Physical Sciences at UA Little Rock.',
  directions: [
    { name: 'Earth observation', detail: 'InSAR, GNSS and optical time series, from single sites to whole basins.' },
    { name: 'Geospatial science', detail: 'GIS, data fusion and machine learning for mapping exposure and risk.' },
    { name: 'Natural and human-made hazards', detail: 'Subsidence, induced seismicity, failing wells, unstable slopes and mines.' },
  ],
  // People in the group. Add students as they join:
  //   { name: 'Full Name', role: 'M.S. student', topic: 'What they work on', photo: '/assets/img/people/name.jpg' }
  members: [],
  // Set to a short paragraph when you have positions to advertise. While it
  // is null, the page says there are no openings yet.
  openings: null,
  noOpenings: 'There are no student openings at the moment. When positions become available they will be posted here.',
};
