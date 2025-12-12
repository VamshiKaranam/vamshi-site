export default function About() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 text-slate-800">

      {/* PAGE TITLE */}
      <h1 className="text-4xl font-bold text-center mb-6">About Me</h1>

      <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">
        Geophysicist specializing in InSAR, surface deformation monitoring, and geomechanical modeling of energy and environmental hazards.
      </p>

      {/* --- EDUCATION --- */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-3 border-b pb-2">Education</h2>
        <div className="space-y-3 text-sm">
          <p>
            <strong>Ph.D. in Geophysics</strong>, Southern Methodist University, USA (2021–Present)<br />
            NASA FINESST Fellow; Dissertation focuses on subsurface geomechanics, deformation modeling, and energy-related hazards.
          </p>

          <p>
            <strong>M.Tech. in Remote Sensing & GIS</strong>, Indian Institute of Technology Roorkee, India (2018–2020)<br />
            Research in land subsidence, coal mine fires, thermal anomaly mapping, and InSAR time-series analysis.
          </p>

          <p>
            <strong>B.Arch.</strong>, National Institute of Technology Calicut, India (2013–2018)<br />
            Background in spatial design, infrastructure, and geospatial thinking.
          </p>
        </div>
      </section>

      {/* --- RESEARCH EXPERIENCE --- */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-3 border-b pb-2">Research Experience</h2>
        <div className="space-y-3 text-sm">
          <p>
            <strong>Research Assistant</strong>, Southern Methodist University, USA (2021–Present)<br />
            InSAR processing, pressure diffusion modeling, fault slip analysis, and evaluation of energy infrastructure hazards.
          </p>

          <p>
            <strong>Research Assistant</strong>, IIT Roorkee, India (2018–2021)<br />
            Urban subsidence, groundwater extraction, and regional deformation studies using InSAR and GNSS.
          </p>

          <p>
            <strong>Research Intern</strong>, GFZ German Research Centre for Geosciences, Potsdam, Germany (2020)<br />
            Land subsidence, InSAR deformation mapping, and multi-sensor geodetic analysis.
          </p>

          <p>
            <strong>Research Intern</strong>, Leibniz University Hannover, Germany (2019–2020)<br />
            DAAD-funded research on deformation monitoring & SAR data analysis.
          </p>
        </div>
      </section>

      {/* --- RESEARCH FOCUS --- */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-3 border-b pb-2">Research Focus</h2>
        <ul className="list-disc pl-6 text-sm space-y-1">
          <li>Subsurface deformation, geomechanics, and poroelastic modeling</li>
          <li>InSAR, GNSS, and multi-sensor deformation time-series analysis</li>
          <li>Wastewater injection, hydrocarbon production, CO₂ storage & induced hazards</li>
          <li>Urban, coastal, landslide, and mining-related deformation processes</li>
          <li>Machine learning for deformation pattern detection and hazard prediction</li>
          <li>Energy infrastructure exposure & well integrity assessment</li>
        </ul>
      </section>

      {/* --- POSITIONS OF RESPONSIBILITY --- */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-3 border-b pb-2">Positions of Responsibility</h2>
        <div className="space-y-2 text-sm">
          <p>Teaching Assistant, Southern Methodist University — Remote Sensing, GIS, Radar, Photogrammetry</p>
          <p>Teaching Assistant, Leibniz University Hannover — SAR applications & geodesy</p>
          <p>Teaching Assistant, IIT Roorkee — Remote Sensing & Image Interpretation</p>
          <p>Organizing Team, International Conference on Unmanned Aerial Systems (UASG 2020), IIT Roorkee</p>
          <p>Senior Executive, National Technical Festival (TATVA), NIT Calicut</p>
        </div>
      </section>

      {/* --- AWARDS --- */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-3 border-b pb-2">Awards & Fellowships</h2>
        <div className="space-y-2 text-sm">
          <p>NASA FINESST Research Fellowship</p>
          <p>DAAD KOSPIE Research Fellowship (Germany)</p>
          <p>IEEE GRSS Travel Grant (IGARSS 2023)</p>
          <p>IEEE GRSS IDEA Microgrant (2023)</p>
          <p>Gold Medal for highest grade in M.Tech (IIT Roorkee)</p>
          <p>KoSinteF Research Grant, German Academic Exchange Service (DAAD)</p>
        </div>
      </section>

      {/* --- SOFTWARE SKILLS --- */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-3 border-b pb-2">Software Skills</h2>
        <ul className="list-disc pl-6 text-sm space-y-1">
          <li><strong>InSAR:</strong> , GAMMA, SNAP, ISCE2, MintPy, LiCSBAS</li>
          <li><strong>GIS:</strong> QGIS, ArcGIS Pro, PyQGIS</li>
          <li><strong>Modeling:</strong> Poroelastic modeling, FEM workflows, hydro-mechanical simulations</li>
          <li><strong>Programming:</strong> Python, MATLAB, Bash, Linux, SLURM HPC</li>
          <li><strong>Other:</strong> Google Earth Engine, COMSOL Multiphysics, AutoCAD</li>
        </ul>
      </section>

      {/* --- PROFESSIONAL MEMBERSHIPS --- */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-3 border-b pb-2">Professional Memberships</h2>
        <div className="space-y-2 text-sm">
          <p>IEEE Geoscience and Remote Sensing Society (GRSS)</p>
          <p>American Geophysical Union (AGU)</p>
          <p>European Geosciences Union (EGU)</p>
          <p>Registered Architect — Council of Architecture, India</p>
        </div>
      </section>

    </main>
  );
}
