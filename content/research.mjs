// Research themes, study sites and methods.
//
// Each theme has a `figure` slot. Until you add an image it shows a labelled
// placeholder. To add one: put the file in static/assets/img/research/ and set
//   figure: { src: '/assets/img/research/your-file.jpg', alt: '…', caption: '…' }

export const themes = [
  {
    id: 'energy',
    title: 'Fluids moving under energy basins',
    place: 'Permian Basin, Texas and New Mexico',
    summary:
      'Oil and gas operations move enormous volumes of fluid through the subsurface. I use nearly a decade of Sentinel-1 radar to map where the ground of the Permian Basin is sinking or rising, and poroelastic models to connect that motion to production, wastewater injection, fault slip and failing wells.',
    findings: [
      'Pressure from wastewater injection can travel through hydrogeologic structures and reach old wells. At one blowout site the surface was rising before the well failed, which suggests uplift can warn of fluid building up underground.',
      'Subsidence in the northern Delaware Basin is driven mainly by hydrocarbon production, and a 3D poroelastic model calibrated against InSAR reproduces it.',
      'In the southern Delaware Basin, deformation lines up with relocated earthquakes, pointing to slip on shallow normal faults.',
    ],
    dois: ['10.1029/2024GL109435', '10.1016/j.jag.2023.103424', '10.1785/0320240011', '10.1029/2024EA004027'],
    figure: {
      src: null,
      suggestion: 'InSAR velocity map of the Permian Basin, or the uplift time series before the blowout',
    },
  },
  {
    id: 'cities',
    title: 'Sinking cities and groundwater',
    place: 'Delhi National Capital Region, India',
    summary:
      'When a city pumps groundwater faster than it is replenished, the aquifer compacts and the land above it sinks. With colleagues at GFZ Potsdam and in India, I mapped subsidence across Delhi and its neighbours using InSAR and in-situ data, identifying the hotspots that matter for urban safety and water management.',
    findings: [
      'Parts of the National Capital Region are sinking, and the pattern follows groundwater extraction.',
      'Faridabad, south of Delhi, shows the same risk of ground movement in both remote sensing and in-situ data.',
    ],
    dois: ['10.1038/s41598-021-04193-9', '10.5194/egusphere-egu21-15694'],
    figure: {
      src: null,
      suggestion: 'Subsidence map of Delhi NCR with the main hotspots labelled',
    },
  },
  {
    id: 'terrain',
    title: 'Mines, slopes and ice',
    place: 'Jharia, Joshimath and Southeastern Alaska',
    summary:
      'Some ground moves because of what lies beneath it or what flows across it. In the Jharia Coalfields I combined Landsat-8 thermal anomaly mapping with InSAR to measure the subsidence caused by underground coal fires. Related work tracks the sinking Himalayan town of Joshimath and the motion of rock glaciers in Southeastern Alaska.',
    findings: [
      'Underground coal fires are causing land subsidence in the Jharia Coalfields that can be measured from space.',
      'Rock glacier motion in Southeastern Alaska varies in space and time with hydrometeorology and topography.',
    ],
    dois: ['10.1016/j.jag.2021.102439', '10.57757/IUGG23-4938', '10.1029/2025JF008895'],
    figure: {
      src: null,
      suggestion: 'Thermal anomaly and subsidence maps of Jharia side by side, or a field photo',
    },
  },
  {
    id: 'methods',
    title: 'Methods for the next radar missions',
    place: null,
    summary:
      'NISAR distributes its imagery as geocoded products, which changes how ground motion has to be measured. I helped develop offset tracking on geocoded single-look complex images and 3D deformation workflows for NISAR, and I am building an integrated workflow that takes InSAR observations through to a calibrated 3D poroelastic model.',
    findings: [],
    dois: ['10.1109/TGRS.2025.3570627'],
    figure: {
      src: null,
      suggestion: 'Workflow diagram: SAR data, time series, poroelastic model, hazard map',
    },
  },
];

// Places on the two study-area maps. lat/lon in decimal degrees.
export const sites = [
  {
    id: 'permian', region: 'northAmerica', lat: 31.9, lon: -102.9, theme: 'energy',
    name: 'Permian Basin', where: 'West Texas and New Mexico, USA',
    what: 'Subsidence and uplift from oil and gas production and wastewater injection; well blowouts; induced earthquakes.',
    label: 'left',
  },
  {
    id: 'alaska', region: 'northAmerica', lat: 58.6, lon: -135.0, theme: 'terrain',
    name: 'Southeastern Alaska', where: 'USA',
    what: 'Rock glacier kinematics measured with satellite interferometry.',
    label: 'right',
  },
  {
    id: 'delhi', region: 'southAsia', lat: 28.61, lon: 77.21, theme: 'cities',
    name: 'Delhi NCR', where: 'Delhi and Faridabad, India',
    what: 'Land subsidence driven by groundwater extraction.',
    label: 'left',
  },
  {
    id: 'joshimath', region: 'southAsia', lat: 30.55, lon: 79.56, theme: 'terrain',
    name: 'Joshimath', where: 'Uttarakhand, India',
    what: 'Subsidence of a Himalayan town, from InSAR and ground surveys.',
    label: 'right',
  },
  {
    id: 'jharia', region: 'southAsia', lat: 23.74, lon: 86.41, theme: 'terrain',
    name: 'Jharia Coalfields', where: 'Jharkhand, India',
    what: 'Subsidence from underground coal fires and mining.',
    label: 'right',
  },
];

// Shown on the North America map as the home base, not as a study site.
export const home = { lat: 34.72, lon: -92.34, name: 'Little Rock', label: 'right' };

export const methods = [
  { name: 'InSAR time series', detail: 'Persistent scatterer and small-baseline analysis of Sentinel-1 and other SAR data.' },
  { name: 'GNSS and in-situ data', detail: 'Ground truth for satellite measurements: GNSS, well logs, injection and production records.' },
  { name: 'Offset tracking and 3D deformation', detail: 'Recovering the full motion vector, including where interferometry loses coherence.' },
  { name: 'Poroelastic modeling', detail: '3D finite-element models that link fluid pressure to stress and surface motion.' },
  { name: 'Geospatial data fusion', detail: 'Thermal, optical and radar imagery combined with GIS and machine learning for hazard mapping.' },
];

export const software = [
  { group: 'Radar processing', items: ['GAMMA', 'ISCE', 'SNAP', 'StaMPS', 'MintPy', 'SARscape', 'ERDAS Imagine'] },
  { group: 'GIS and modeling', items: ['ArcGIS Pro', 'QGIS', 'COMSOL Multiphysics', 'GBIS', 'AutoCAD'] },
  { group: 'Programming', items: ['Python', 'MATLAB', 'Bash', 'Google Earth Engine'] },
];

export const collaborators = [
  'the SMU Radar Lab',
  'the GFZ German Research Centre for Geosciences',
  'UT Austin',
  'IIT Roorkee',
  'the University of Cambridge',
];
