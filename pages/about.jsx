export default function About() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-slate-800">

      <h1 className="text-3xl font-bold mb-8">About</h1>

      <section className="space-y-6 text-sm leading-relaxed">

        {/* Research Focus */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Research Focus</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Subsurface deformation, geomechanics, and fluid–rock interaction</li>
            <li>InSAR, GNSS, and multi-sensor geodetic monitoring</li>
            <li>Hazards related to injection, production, CO₂ storage, and induced seismicity</li>
            <li>Urban, coastal, landslide, and mining-related deformation</li>
            <li>Machine learning and physics-based modeling for hazard prediction</li>
          </ul>
        </div>

        {/* Education */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Education</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Ph.D. in Geophysics, Southern Methodist University (NASA FINESST Fellow)</li>
            <li>M.Tech. in Remote Sensing & GIS, IIT Roorkee</li>
            <li>B.Arch., National Institute of Technology Calicut</li>
          </ul>
        </div>

        {/* Research Experience */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Research Experience</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>InSAR time-series analysis (Sentinel-1, COSMO-SkyMed, NISAR workflows)</li>
            <li>Poroelastic and geomechanical modeling of subsurface deformation</li>
            <li>Integrated analysis of wells, injection data, and surface deformation</li>
            <li>Monitoring subsidence, landslides, coastal sinking, and mining deformation</li>
            <li>Applications to CO₂ storage monitoring and infrastructure risk assessment</li>
          </ul>
        </div>

        {/* Appointments */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Research Appointments & Collaborations</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>GFZ German Research Centre for Geosciences</li>
            <li>Leibniz University Hannover (DAAD Fellow)</li>
            <li>IIT Roorkee</li>
            <li>University of Cambridge</li>
          </ul>
        </div>

        {/* Teaching */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Teaching & Mentoring</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Courses assisted: Remote Sensing, GIS, Radar Remote Sensing, Photogrammetry</li>
            <li>Developed hands-on InSAR labs and GNSS field activities</li>
            <li>Led Google Earth Engine workshops and mentored students in geospatial analysis</li>
          </ul>
        </div>

        {/* Software */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Software & Tools</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>InSAR & Geospatial: SNAP, ISCE2, MintPy, LiCSBAS, GAMMA, ArcGIS Pro, QGIS</li>
            <li>Programming: Python, MATLAB, Bash, Linux, HPC, Git</li>
            <li>Modeling: poroelastic & geomechanical workflows, numerical simulations</li>
          </ul>
        </div>

        {/* Professional Service */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Professional Service</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Reviewer for journals including IEEE TGRS, Remote Sensing, STOTEN, IJGEO, GNHR, and others</li>
          </ul>
        </div>

        {/* Awards */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Awards & Fellowships</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>NASA FINESST Fellowship</li>
            <li>DAAD KOSPIE Scholarship</li>
          </ul>
        </div>
      </section>

    </main>
  );
}
