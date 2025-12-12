export default function About() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 text-slate-800">

      {/* HERO TITLE */}
      <h1 className="text-4xl font-bold text-center mb-6">About Me</h1>

      {/* OPTIONAL SUBTEXT */}
      <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">
        Geospatial scientist specializing in InSAR, subsurface deformation, and energy–environmental hazards.
      </p>

      {/* --- EDUCATION --- */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3 border-b pb-2">Education</h2>
        <div className="space-y-2 text-sm">
          <p><strong>Ph.D., Geophysics</strong>, Southern Methodist University (NASA FINESST Fellow)</p>
          <p><strong>M.Tech., Remote Sensing & GIS</strong>, IIT Roorkee</p>
          <p><strong>B.Arch.</strong>, National Institute of Technology Calicut</p>
        </div>
      </section>

      {/* --- RESEARCH EXPERIENCE --- */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3 border-b pb-2">Research Experience</h2>
        <div className="space-y-2 text-sm">
          <p>Research Assistant, Southern Methodist University</p>
          <p>Research Assistant, IIT Roorkee</p>
          <p>Research Intern, GFZ German Research Centre for Geosciences</p>
          <p>Research Stay, Leibniz University Hannover (DAAD Fellow)</p>
        </div>
      </section>

      {/* --- RESEARCH FOCUS --- */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3 border-b pb-2">Research Focus</h2>
        <ul className="list-disc pl-6 text-sm space-y-1">
          <li>Subsurface deformation, poroelasticity, and geomechanics</li>
          <li>InSAR, GNSS, and multi-sensor geodetic monitoring</li>
          <li>Hazards from injection, production, induced seismicity, and CO₂ storage</li>
          <li>Urban, coastal, landslide, and mining-related deformation</li>
          <li>Machine learning & physics-based modeling for hazard prediction</li>
        </ul>
      </section>

      {/* --- POSITIONS OF RESPONSIBILITY / TEACHING --- */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3 border-b pb-2">Teaching & Mentoring</h2>
        <div className="space-y-2 text-sm">
          <p>Teaching Assistant — Remote Sensing, GIS, Radar Remote Sensing</p>
          <p>Teaching Assistant — Photogrammetry & Earth Systems</p>
          <p>InSAR labs and GNSS field instruction at SMU</p>
          <p>Instructor: Google Earth Engine Workshop (2 days)</p>
        </div>
      </section>

      {/* --- AWARDS --- */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3 border-b pb-2">Awards & Fellowships</h2>
        <div className="space-y-2 text-sm">
          <p>NASA FINESST Fellowship</p>
          <p>DAAD KOSPIE Research Fellowship</p>
        </div>
      </section>

      {/* --- SOFTWARE SKILLS --- */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3 border-b pb-2">Software Skills</h2>
        <ul className="list-disc pl-6 text-sm space-y-1">
          <li>InSAR: SNAP, ISCE2, MintPy, LiCSBAS, GAMMA</li>
          <li>GIS: QGIS, ArcGIS Pro</li>
          <li>Programming: Python, MATLAB, Bash, Git</li>
          <li>Modeling: poroelastic & geomechanical workflows, numerical simulation</li>
        </ul>
      </section>

      {/* --- PROFESSIONAL MEMBERSHIPS --- */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3 border-b pb-2">Professional Memberships</h2>
        <div className="space-y-2 text-sm">
          <p>IEEE-GRSS</p>
          <p>American Geophysical Union (AGU)</p>
          <p>European Geosciences Union (EGU)</p>
          <p>Registered Architect (Council of Architecture, India)</p>
        </div>
      </section>

    </main>
  );
}
