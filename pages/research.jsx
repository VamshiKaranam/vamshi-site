// pages/research.jsx
import React from "react";

export default function Research() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12 text-slate-800">

      <h1 className="text-3xl font-bold mb-8">Research</h1>

      {/* FIGURE / VISUAL PLACEHOLDER */}
      <div className="w-full h-64 bg-slate-100 border rounded-xl flex items-center justify-center mb-12 shadow-sm">
        <span className="text-slate-500 text-sm">
          [ Insert research figure / InSAR deformation map / workflow diagram ]
        </span>
      </div>

      {/* OVERVIEW */}
      <section className="mb-12">
        <p className="text-lg leading-relaxed text-slate-700 max-w-3xl">
          My research focuses on quantifying surface and subsurface deformation using
          InSAR, geomechanical and poroelastic modeling, and machine learning. I study
          how natural and human-driven processes alter the stability of geologic and
          engineered systems, with applications across energy basins, urban regions,
          groundwater-stressed areas, coastal environments, and mining districts.
        </p>
      </section>

      {/* THEMES */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Research themes</h2>

        {/* THEME 1 */}
        <div className="mb-8 p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="text-xl font-semibold">Subsurface deformation & geomechanics</h3>
          <ul className="list-disc ml-6 mt-3 text-slate-700">
            <li>Modeling deformation from injection, production, and CO₂ storage.</li>
            <li>Integrating InSAR with poroelastic and reservoir models to estimate pressure and stress changes.</li>
            <li>Identifying mechanical drivers of land motion and subsurface instability.</li>
          </ul>
        </div>

        {/* THEME 2 */}
        <div className="mb-8 p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="text-xl font-semibold">
            Energy infrastructure & environmental hazards
          </h3>
          <ul className="list-disc ml-6 mt-3 text-slate-700">
            <li>Detecting blowouts, casing failures, and surface ruptures using InSAR time series.</li>
            <li>Evaluating risk to wells, pipelines, and industrial facilities.</li>
            <li>Characterizing induced seismicity, fault slip, and pore-pressure migration.</li>
          </ul>
        </div>

        {/* THEME 3 */}
        <div className="mb-8 p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="text-xl font-semibold">
            Urban, coastal, and environmental deformation
          </h3>
          <ul className="list-disc ml-6 mt-3 text-slate-700">
            <li>Monitoring land subsidence in Delhi, Joshimath, and coastal corridors.</li>
            <li>Mapping groundwater-driven deformation and landslide precursors.</li>
            <li>Assessing environmental hazards in rapidly developing regions.</li>
          </ul>
        </div>
      </section>

      {/* METHODS */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Methods & tools</h2>

        <ul className="list-disc ml-6 text-slate-700 leading-relaxed">
          <li>InSAR time-series analysis (SBAS, PS, distributed scatterer methods)</li>
          <li>Poroelastic and geomechanical forward / inverse modeling</li>
          <li>Integration with GNSS, well logs, and reservoir production data</li>
          <li>Machine learning for pattern detection & hazard characterization</li>
          <li>Large-scale geospatial processing with GEE, AWS, and Python workflows</li>
        </ul>
      </section>
    </main>
  );
}
