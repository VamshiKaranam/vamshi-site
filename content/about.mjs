// Biography, career history, awards and service.

export const bio = [
  'I am an Assistant Professor of Geology at the University of Arkansas at Little Rock. I use satellite radar interferometry (InSAR), GNSS and GIS to study how the ground deforms when fluids are extracted or injected, from oil and gas basins such as the Permian to cities that pump groundwater, and the hazards this creates for people and infrastructure.',
  'My research combines satellite geodesy with physics-based poroelastic modeling and geospatial analytics to understand how human activity reshapes sedimentary basins and cities. Before joining UA Little Rock I completed a Ph.D. in Geophysics at Southern Methodist University, where I studied well blowouts and ground deformation in the Permian Basin and held a NASA FINESST award.',
  'I trained first as an architect, then moved to geospatial engineering at IIT Roorkee and to radar remote sensing in Germany at Leibniz University Hannover and GFZ Potsdam. At UA Little Rock I teach Earth and the Environment and GIS, and I am setting up a computational geophysics and remote sensing research program.',
];

// A candid photo shown under the bio on the About page. Set to null to hide.
export const candid = {
  src: '/assets/img/nisar-igarss-2023.jpg',
  webp: '/assets/img/nisar-igarss-2023.webp',
  width: 800, height: 890,
  alt: 'Vamshi Karanam smiling beside a gold scale model of the NISAR satellite, with its large mesh radar antenna, at the NASA exhibit.',
  caption: 'With a model of NISAR, the NASA–ISRO radar satellite, at IGARSS 2023 in Pasadena.',
};

// Shown on the home page. Newest first. `url` is optional.
export const updates = [
  { year: 2026, text: 'Joined the University of Arkansas at Little Rock as Assistant Professor of Geology.' },
  { year: 2026, text: 'Named one of Geospatial World’s 50 Rising Stars.', url: 'https://geospatialworld.net/rising-stars/2026/' },
  { year: 2026, text: 'Completed a Ph.D. in Geophysics at Southern Methodist University.', url: 'https://scholar.smu.edu/hum_sci_earthsciences_etds/43' },
  { year: 2026, text: 'New paper on rock glacier motion in Southeastern Alaska, in JGR: Earth Surface.', url: 'https://doi.org/10.1029/2025JF008895' },
  { year: 2025, text: 'Research featured in Bloomberg’s “Texas Oil Boom Spawns a Toxic Crisis of the Industry’s Own Making.”', url: 'https://www.bloomberg.com/graphics/2025-permian-basin-geyser/' },
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

// Listed in order of significance.
export const service = [
  { name: 'Journal reviewer', detail: 'IEEE Transactions on Geoscience and Remote Sensing, Engineering Geology, Science of the Total Environment, Advances in Space Research, Natural Hazards & Risk, Remote Sensing, and others' },
  { name: 'Conference organizing committee', detail: 'International Conference on Unmanned Aerial Systems in Geomatics (UASG), 2020' },
  { name: 'President, SEG SMU Student Chapter', detail: 'Society of Exploration Geophysicists, 2025' },
  { name: 'Professional memberships', detail: 'AGU, EGU, IEEE and AAPG' },
  { name: 'Registered Architect', detail: 'Council of Architecture, India' },
];
