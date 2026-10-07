// Biography, career history, awards and service.

export const bio = [
  'I am an Assistant Professor of Geology at the University of Arkansas at Little Rock. I use satellite radar interferometry (InSAR), GNSS and GIS to study land subsidence, groundwater- and fluid-driven deformation, critical-zone processes, and the hazards they create for people and infrastructure.',
  'My research combines satellite geodesy with physics-based poroelastic modeling and geospatial analytics to understand how human activity reshapes sedimentary basins and cities. Before joining UA Little Rock I completed a Ph.D. in Geophysics at Southern Methodist University, where I studied well blowouts and ground deformation in the Permian Basin and held a NASA FINESST award.',
  'I trained first as an architect, then moved to geospatial engineering at IIT Roorkee and to radar remote sensing in Germany at Leibniz University Hannover and GFZ Potsdam. At UA Little Rock I teach remote sensing, environmental science and GIS, and I am setting up a computational geophysics and remote sensing research program.',
];

// Shown on the home page. Newest first. `url` is optional.
export const updates = [
  { year: 2026, text: 'Joined the University of Arkansas at Little Rock as Assistant Professor of Geology.' },
  { year: 2026, text: 'Named one of Geospatial World’s 50 Rising Stars.', url: 'https://geospatialworld.net/rising-stars/2026/' },
  { year: 2026, text: 'Completed a Ph.D. in Geophysics at Southern Methodist University.', url: 'https://scholar.smu.edu/hum_sci_earthsciences_etds/43' },
  { year: 2026, text: 'New paper on rock glacier motion in Southeastern Alaska, in JGR: Earth Surface.', url: 'https://doi.org/10.1029/2025JF008895' },
  { year: 2025, text: 'Research featured in Bloomberg’s “Texas Oil Boom Spawns a Toxic Crisis of the Industry’s Own Making.”', url: 'https://www.bloomberg.com/graphics/2025-permian-basin-geyser/' },
];

// The stops drawn on the career map, in the order they happened.
export const journey = [
  { id: 'calicut', lat: 11.32, lon: 75.93, place: 'Calicut, India', years: '2013–2018',
    what: 'Bachelor of Architecture, National Institute of Technology Calicut', label: 'right' },
  { id: 'roorkee', lat: 29.87, lon: 77.89, place: 'Roorkee, India', years: '2018–2021',
    what: 'M.Tech in Geospatial Engineering (Gold Medal) and Research Assistant, Indian Institute of Technology Roorkee', label: 'right' },
  { id: 'germany', lat: 52.38, lon: 11.4, place: 'Hannover and Potsdam, Germany', years: '2019–2020',
    what: 'Visiting Researcher, Leibniz University Hannover, then Research Intern, GFZ German Research Centre for Geosciences', label: 'right' },
  { id: 'dallas', lat: 32.84, lon: -96.78, place: 'Dallas, Texas', years: '2021–2025',
    what: 'Ph.D. in Geophysics and Research Assistant, SMU Radar Lab, Southern Methodist University', label: 'left' },
  { id: 'littlerock', lat: 34.72, lon: -92.34, place: 'Little Rock, Arkansas', years: '2026–present',
    what: 'Assistant Professor of Geology, University of Arkansas at Little Rock', label: 'right' },
];
// The legs drawn on the map: from, to, and how far the line bows (positive
// bows upward, negative downward; this only keeps lines clear of the labels).
export const journeyLegs = [
  ['calicut', 'roorkee', 0.5],
  ['roorkee', 'germany', 1],
  ['germany', 'roorkee', 0.5],
  ['roorkee', 'dallas', -1],
  ['dallas', 'littlerock', 0],
];

export const positions = [
  { years: '2026–present', role: 'Assistant Professor of Geology', org: 'University of Arkansas at Little Rock',
    detail: 'Teaching Earth and the Environment, its lab, and GIS I. Research on InSAR- and GNSS-based deformation monitoring and poroelastic modeling of environmental and energy-related hazards.' },
  { years: '2021–2025', role: 'Research Assistant, SMU Radar Lab', org: 'Southern Methodist University, Dallas',
    detail: 'Advisor: Dr. Zhong Lu. Long-term InSAR and GNSS deformation products for the Permian Basin; wastewater-related well blowouts; geocoded SLC offset tracking and 3D deformation workflows for NISAR; 3D poroelastic models of subsurface stress.' },
  { years: '2021', role: 'Research Assistant, Department of Geospatial Engineering', org: 'IIT Roorkee, India',
    detail: 'Advisor: Dr. Saurabh Vijay. Modeled flooding and subsidence interactions in urban systems with machine learning and GIS.' },
  { years: '2020', role: 'Research Intern', org: 'GFZ German Research Centre for Geosciences, Potsdam',
    detail: 'Advisor: Dr. Mahdi Motagh. Mapped groundwater-driven subsidence in Delhi using InSAR and in-situ data.' },
  { years: '2019–2020', role: 'Visiting Researcher', org: 'Leibniz University Hannover, Germany',
    detail: 'Advisor: Dr. Mahdi Motagh. Quantified coal fire–induced subsidence in the Jharia Coalfields by combining Landsat-8 thermal anomaly mapping with InSAR.' },
];

export const education = [
  { years: '2021–2026', degree: 'Ph.D. in Geophysics (Environmental and Applied Geoscience)', org: 'Southern Methodist University, Dallas',
    detail: 'Dissertation: Decadal-Scale InSAR Monitoring and Poroelastic Modeling of Fluid-Driven Geohazards in the Permian Basin',
    url: 'https://scholar.smu.edu/hum_sci_earthsciences_etds/43' },
  { years: '2018–2020', degree: 'M.Tech in Geospatial Engineering', org: 'Indian Institute of Technology Roorkee',
    detail: 'Gold Medal. Dissertation: Geospatial modeling of coal fires on mine subsidence in Jharia Coalfields, India' },
  { years: '2013–2018', degree: 'Bachelor of Architecture', org: 'National Institute of Technology Calicut', detail: null },
];

export const awards = [
  { year: '2026', name: 'Geospatial World 50 Rising Stars', from: 'Geospatial World Forum, Netherlands', url: 'https://geospatialworld.net/rising-stars/2026/' },
  { year: '2024–2026', name: 'NASA FINESST research grant', from: 'Future Investigators in NASA Earth and Space Science and Technology' },
  { year: '2023', name: 'IGARSS Travel Grant', from: 'IEEE Geoscience and Remote Sensing Society' },
  { year: '2023', name: 'Professional Development Microgrant', from: 'IEEE Geoscience and Remote Sensing Society' },
  { year: '2020', name: 'Gold Medal, M.Tech', from: 'Indian Institute of Technology Roorkee' },
  { year: '2019–2020', name: 'DAAD KOSPIE Fellowship', from: 'German Academic Exchange Service, at Leibniz University Hannover' },
  { year: '2018–2020', name: 'MHRD National Graduate Scholarship', from: 'Government of India' },
];

export const service = [
  { name: 'Manuscript reviewer', detail: 'IEEE Transactions on Geoscience and Remote Sensing, Engineering Geology, Advances in Space Research, Natural Hazards & Risk, Science of the Total Environment, Remote Sensing, and others' },
  { name: 'President, SEG SMU Student Chapter', detail: 'Society of Exploration Geophysicists, 2025' },
  { name: 'Organizing committee', detail: 'International Conference on Unmanned Aerial Systems in Geomatics (UASG), 2020' },
  { name: 'Member', detail: 'AGU, EGU, IEEE and AAPG' },
  { name: 'Registered Architect', detail: 'Council of Architecture, India' },
];
