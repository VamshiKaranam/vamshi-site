// Research themes, study sites and methods.
//
// Each theme has a `figure` slot. Until you add an image it shows a labelled
// placeholder. To add one: put the file in static/assets/img/research/ and set
//   figure: { src: '/assets/img/research/your-file.jpg', alt: '…', caption: '…' }

export const themes = [
  {
    id: 'energy',
    title: 'Fluid-driven deformation in the Permian Basin',
    place: 'West Texas and southeastern New Mexico',
    summary:
      'The Permian Basin is one of the most productive oil and gas regions in the United States. Production, wastewater disposal and a dense network of old wells have changed the pressure underground, and the ground surface records it. Using Sentinel-1 radar from 2016 onward, I map where the basin is sinking or rising and link that motion to production, injection, faults and failing wells.',
    findings: [
      'Ground motion is widespread across the basin. The Delaware Basin sinks over large areas, while the Midland Basin and the Central Basin Platform show smaller, local features.',
      'In the northern Delaware Basin, subsidence is driven mainly by oil and gas production, which analytical source models tied to production records reproduce.',
    ],
    dois: ['10.1016/j.jag.2023.103424'],
    figure: {
      src: '/assets/img/research/permian-basin-2016-2021.jpg',
      webp: '/assets/img/research/permian-basin-2016-2021.webp',
      full: '/assets/img/research/permian-basin-2016-2021-full.jpg',
      width: 1200, height: 1096,
      alt: 'Map of average vertical ground motion across the Permian Basin from 2016 to 2021. Large areas of the Delaware Basin, straddling the Texas–New Mexico line, are red (sinking up to about 3 cm a year), with a few blue patches of uplift. The Midland Basin shows scattered orange spots; the Central Basin Platform between them is mostly stable.',
      caption: 'Average vertical ground motion, 2016–2021, from Sentinel-1 InSAR. Red is sinking, blue is rising.',
    },
    studies: [
      {
        id: 'faults',
        title: 'Faults and earthquakes in the southern Delaware Basin',
        place: 'Reeves, Pecos and Ward counties, Texas',
        text: [
          'In the southern Delaware Basin the ground does not sink in smooth bowls. It breaks into narrow bands of subsidence and uplift that line up with seismic lineaments mapped from relocated TexNet earthquakes.',
          'Cross-sections show the sharpest changes in surface motion sitting above clusters of shallow earthquakes. Together they point to seismic and aseismic slip on shallow normal faults, with faults steering where fluid pressure spreads.',
        ],
        dois: ['10.1029/2024EA004027', '10.1785/0320240011'],
        figure: {
          src: '/assets/img/research/delaware-faults-earthquakes.jpg',
          webp: '/assets/img/research/delaware-faults-earthquakes.webp',
          full: '/assets/img/research/delaware-faults-earthquakes-full.jpg',
          width: 1400, height: 1244,
          alt: 'Map of cumulative InSAR displacement in the southern Delaware Basin with seismic lineaments drawn as magenta lines, subsidence features labelled S and uplift features U, and four cross-section lines. Beside and below the map, profiles along each cross-section compare surface displacement for 2016–2018 and 2016–2022 with the depths of earthquakes beneath them.',
          caption: 'Surface displacement (2016–2022) and seismic lineaments in the southern Delaware Basin, with cross-sections comparing ground motion to earthquake depths.',
        },
      },
      {
        id: 'blowout',
        title: 'Uplift before a well blowout at Tubbs Corner',
        place: 'Crane County, Texas',
        text: [
          'Before an old well at Tubbs Corner blew out in January 2022, the ground around it had risen by more than 40 cm. The uplift grew with wastewater disposal at injection wells to the northwest and spread toward the blowout site.',
          'Modeling the motion as two pressurised sills (penny-shaped cracks) places the source at about 425 m depth, far shallower than the disposal zone more than a kilometre down. Wastewater appears to have migrated upward into shallower layers. The same model reproduces the 3 cm drop of the ground as pressure escaped during the blowout.',
          'Uplift like this is visible from space before a well fails, which makes InSAR a practical way to watch for pressure building up around old wells.',
        ],
        dois: ['10.1029/2024GL109435'],
        // News coverage of this work, from content/media.mjs.
        story: 'blowouts',
        figure: {
          src: '/assets/img/research/tubbs-corner-model.jpg',
          webp: '/assets/img/research/tubbs-corner-model.webp',
          full: '/assets/img/research/tubbs-corner-model-full.jpg',
          width: 1400, height: 883,
          alt: 'Two rows of three maps around the Tubbs Corner well: InSAR observation, two-sill model and residual. Top row: subsidence of up to 3 cm during the January 2022 blowout, fitted with an RMSE of 2 mm. Bottom row: up to 40 cm of cumulative uplift from January 2020 to May 2023, fitted with an RMSE of 2 cm. Sill centres are marked alpha and beta.',
          caption: 'Two-sill model of the Tubbs Corner site: (a) the January 2022 blowout, (b) cumulative uplift from January 2020 to May 2023.',
        },
      },
    ],
  },
  {
    id: 'cities',
    title: 'Urban subsidence and groundwater',
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
    title: 'Mining, slopes and rock glaciers',
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
    title: 'Methods for new SAR missions',
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
