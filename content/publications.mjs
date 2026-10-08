// Publications. To add one, copy an entry and change the fields.
//   type:   'journal' | 'conference' | 'preparation' | 'thesis'
//   themes: any of 'energy', 'cities', 'terrain', 'methods' (see content/research.mjs)
//   note:   optional, e.g. 'Oral', 'Poster', 'Invited'
// Your own name is highlighted automatically wherever "Karanam, V." appears.

export const publications = [
  // ── Journal articles ────────────────────────────────────────────────────
  {
    type: 'journal', year: 2026, themes: ['terrain'],
    authors: 'Sui, Q.; Lu, Z.; Meng, T.; Kim, J.-W.; Higman, B.; Dai, C.; Budukumah, E.; McColl, S.; Howat, I.; Hults, C.; Karanam, V.; Liang, K.',
    title: 'Hydrometeorological and Topographic Controls Govern Spatiotemporal Heterogeneity in Rock Glacier Kinematics: Insights from Satellite Interferometry in Southeastern Alaska',
    venue: 'Journal of Geophysical Research: Earth Surface', details: '131(4)',
    doi: '10.1029/2025JF008895',
  },
  {
    type: 'journal', year: 2025, themes: ['methods'],
    authors: 'Liang, K.; Kim, J.; Lu, Z.; Fattahi, H.; Bato, M.G.; Brancato, V.; Jeong, S.; Karanam, V.',
    title: 'Offset tracking with geocoded SLC',
    venue: 'IEEE Transactions on Geoscience and Remote Sensing',
    doi: '10.1109/TGRS.2025.3570627',
  },
  {
    type: 'journal', year: 2025, themes: ['energy'],
    authors: 'Aziz Zanjani, A.; DeShon, H.R.; Karanam, V.; Savvaidis, A.',
    title: 'Insights into Temporal Evolution of Induced Earthquakes in the Southern Delaware Basin Using Calibrated Relocations from the TexNet Catalog (2017–2022)',
    venue: 'Earth and Space Science', details: '12, e2024EA004027',
    doi: '10.1029/2024EA004027',
  },
  {
    type: 'journal', year: 2024, themes: ['energy'], featured: true,
    authors: 'Karanam, V.; Lu, Z.; Kim, J.',
    title: 'Investigation of Oil Well Blowouts Triggered by Wastewater Injection in the Permian Basin, USA',
    venue: 'Geophysical Research Letters', details: '51, e2024GL109435',
    doi: '10.1029/2024GL109435',
  },
  {
    type: 'journal', year: 2024, themes: ['energy'],
    authors: 'Aziz Zanjani, A.; DeShon, H.R.; Karanam, V.; Savvaidis, A.',
    title: 'Insights into Temporal Evolution of Induced Earthquakes in the Southern Delaware Basin Using Calibrated Relocations from the TXAR Catalog (2009–2016)',
    venue: 'The Seismic Record', details: '4, 140–150',
    doi: '10.1785/0320240011',
  },
  {
    type: 'journal', year: 2023, themes: ['energy'],
    authors: 'Karanam, V.; Lu, Z.',
    title: 'Hydrocarbon production induced land deformation over Permian Basin; analysis using persistent scatterer interferometry and numerical modeling',
    venue: 'International Journal of Applied Earth Observation and Geoinformation', details: '122, 103424',
    doi: '10.1016/j.jag.2023.103424',
  },
  {
    type: 'journal', year: 2022, themes: ['cities'],
    authors: 'Garg, S.; Motagh, M.; Indu, J.; Karanam, V.',
    title: 'Tracking hidden crisis in India’s capital from space: Implications of unsustainable groundwater use',
    venue: 'Scientific Reports', details: '12(1), 651',
    doi: '10.1038/s41598-021-04193-9',
  },
  {
    type: 'journal', year: 2021, themes: ['terrain'],
    authors: 'Karanam, V.; Motagh, M.; Garg, S.; Jain, K.',
    title: 'Multi-sensor remote sensing analysis of coal fire induced land subsidence in Jharia Coalfields, Jharkhand, India',
    venue: 'International Journal of Applied Earth Observation and Geoinformation', details: '102, 102439',
    doi: '10.1016/j.jag.2021.102439',
  },

  // ── In preparation or under review ──────────────────────────────────────
  {
    type: 'preparation', year: null, themes: ['energy', 'methods'],
    authors: 'Karanam, V.; Lu, Z.',
    title: 'An Integrated Workflow for Quantifying Fluid-Induced Deformation Using InSAR and 3D Poroelastic Modeling',
  },
  {
    type: 'preparation', year: null, themes: ['energy'],
    authors: 'Karanam, V.; Lu, Z.; Kim, J.',
    title: 'Energy Infrastructure Monitoring with InSAR in Central Basin Platform, West Texas, USA',
  },

  // ── Dissertation ────────────────────────────────────────────────────────
  {
    type: 'thesis', year: 2026, themes: ['energy'],
    authors: 'Karanam, V.',
    title: 'Decadal-Scale InSAR Monitoring and Poroelastic Modeling of Fluid-Driven Geohazards in the Permian Basin',
    venue: 'Ph.D. dissertation, Southern Methodist University',
    url: 'https://scholar.smu.edu/hum_sci_earthsciences_etds/43',
  },

  // ── Conference presentations ────────────────────────────────────────────
  {
    type: 'conference', year: 2025, themes: ['energy'], note: 'Oral',
    authors: 'Karanam, V.; Lu, Z.',
    title: 'Poroelastic Modeling and InSAR Analysis of Hydrocarbon Production-Induced Surface Deformation in the Permian Basin, USA',
    venue: 'EGU General Assembly 2025', details: 'EGU25-14878',
    doi: '10.5194/egusphere-egu25-14878',
  },
  {
    type: 'conference', year: 2024, themes: ['energy'], note: 'Poster',
    authors: 'Aziz Zanjani, A.; DeShon, H.; Karanam, V.; Savvaidis, A.',
    title: 'Spatiotemporal Evolution of Induced Earthquakes in the Southern Delaware Basin, Reeves-Pecos, West Texas',
    venue: 'SSA Annual Meeting 2024',
  },
  {
    type: 'conference', year: 2024, themes: ['energy'],
    authors: 'Aziz Zanjani, A.; DeShon, H.; Karanam, V.; Savvaidis, A.',
    title: 'Insights into Spatiotemporal Evolution of the Induced Seismicity in the Southern Delaware Basin, Reeves-Pecos, Texas',
    venue: 'Research and Innovation Week, SMU',
  },
  {
    type: 'conference', year: 2023, themes: ['energy'], note: 'Oral',
    authors: 'Karanam, V.; Lu, Z.; Kim, J.',
    title: 'Geophysical Characterization of Oil Well Blowouts Triggered by Pore Pressure Propagation from Wastewater Injection Through Hydrogeologic Structures',
    venue: 'AGU Fall Meeting 2023',
  },
  {
    type: 'conference', year: 2023, themes: ['energy'], note: 'Oral',
    authors: 'Karanam, V.; Lu, Z.; Kim, J.-W.',
    title: 'Hydrocarbon Production Induced Land Deformation Over Delaware Basin, Analysed Using Persistent Scatterer Interferometry',
    venue: 'IEEE International Geoscience and Remote Sensing Symposium (IGARSS 2023), Pasadena, CA', details: 'pp. 1846–1849',
    doi: '10.1109/IGARSS52108.2023.10282973',
  },
  {
    type: 'conference', year: 2023, themes: ['energy'],
    authors: 'Karanam, V.; Lu, Z.; Kim, J.',
    title: 'Hydrocarbon Production Induced Land Deformation Over Permian Basin; Analysis Using Persistent Scatterer Interferometry and Numerical Modeling',
    venue: 'Research and Innovation Week, SMU',
  },
  {
    type: 'conference', year: 2023, themes: ['terrain'], note: 'Poster',
    authors: 'Garg, S.; Karanam, V.; Motagh, M.; Mishra, V.; Xia, Z.; Shevchenko, A.V.; Stefanova Vassileva, M.; Roessner, S.',
    title: 'Monitoring land subsidence in Joshimath, Uttarakhand using InSAR: A preliminary study',
    venue: 'XXVIII General Assembly of the International Union of Geodesy and Geophysics (IUGG), Berlin',
    doi: '10.57757/IUGG23-4938',
  },
  {
    type: 'conference', year: 2023, themes: ['terrain'],
    authors: 'Garg, S.; Karanam, V.; Motagh, M.',
    title: 'Monitoring and Understanding Land Subsidence in Joshimath: An InSAR and Ground-based Study',
    venue: 'EGU General Assembly 2023', details: 'EGU23-15976',
    doi: '10.5194/egusphere-egu23-15976',
  },
  {
    type: 'conference', year: 2023, themes: ['energy'], note: 'Invited oral',
    authors: 'Lu, Z.; Zheng, W.; Karanam, V.; Kim, J.',
    title: 'Human-induced geohazards in Permian Basin, USA revealed by InSAR and numerical modeling',
    venue: 'EGU General Assembly 2023', details: 'EGU23-2152',
    doi: '10.5194/egusphere-egu23-2152',
  },
  {
    type: 'conference', year: 2021, themes: ['terrain'], note: 'Poster',
    authors: 'Karanam, V.; Motagh, M.; Garg, S.; Jain, K.',
    title: 'Combined Effect of Mining, Subsidence and Coal Fires in Jharkhand, India Investigated using Satellite Remote Sensing and Data Fusion',
    venue: 'AGU Fall Meeting 2021', details: 'NH15D-0481',
  },
  {
    type: 'conference', year: 2021, themes: ['terrain'],
    authors: 'Karanam, V.; Garg, S.; Motagh, M.; Jain, K.',
    title: 'The Risk of Coal Fires and Land Subsidence in Jharia Coalfields, India, Analysed Using Remote Sensing Techniques',
    venue: 'EGU General Assembly 2021', details: 'EGU21-14419',
    doi: '10.5194/egusphere-egu21-14419',
  },
  {
    type: 'conference', year: 2021, themes: ['cities'],
    authors: 'Garg, S.; Karanam, V.; Motagh, M.; Jayaluxmi, I.',
    title: 'Risk of Ground Movement in Faridabad, India - Investigated using Remote Sensing and In-Situ Data',
    venue: 'EGU General Assembly 2021', details: 'EGU21-15694',
    doi: '10.5194/egusphere-egu21-15694',
  },
  {
    type: 'conference', year: 2021, themes: ['terrain'],
    authors: 'Karanam, V.; Garg, S.; Motagh, M.; Jain, K.',
    title: 'Coal Fire Induced Land Subsidence in Jharia Coalfields, India, Investigated Using Thermal Anomaly Mapping and Persistent Scatterer Interferometry',
    venue: 'FRINGE Workshop 2021',
  },
  {
    type: 'conference', year: 2021, themes: ['cities'], note: 'Poster',
    authors: 'Garg, S.; Karanam, V.; Motagh, M.',
    title: 'The continuous sinking of National Capital Region, India – Investigated using the Sentinel-1 time series InSAR approach',
    venue: 'FRINGE Workshop 2021',
  },
  {
    type: 'conference', year: 2020, themes: ['terrain'],
    authors: 'Karanam, V.; Motagh, M.; Jain, K.',
    title: 'Land Subsidence in Jharia Coalfields, Jharkhand, India – Detection, Estimation and Analysis Using Persistent Scatterer Interferometry',
    venue: 'EGU General Assembly 2020', details: 'EGU2020-21118',
    doi: '10.5194/egusphere-egu2020-21118',
  },
];

export const publicationTypes = {
  journal: 'Journal articles',
  preparation: 'In preparation or under review',
  thesis: 'Dissertation',
  conference: 'Conference presentations',
};
