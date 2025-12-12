import React from 'react'
import { Mail, Download, Globe } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-800">

      {/* HERO / INTRO */}
      <header className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">

          <div>
            <p className="text-sm uppercase text-slate-500 tracking-wide">
              Geospatial Science • InSAR • Energy & Environmental Hazards
            </p>

            <h1 className="mt-3 text-3xl md:text-4xl font-extrabold leading-tight">
              I investigate how energy development and environmental processes drive deformation in the subsurface, and develop geospatial methods to quantify and forecast geohazards.
            </h1>

            <p className="mt-4 text-slate-700 max-w-xl">
              My research integrates InSAR, physics-based poroelastic modeling, and machine learning to understand fluid–rock interaction, diagnose well and infrastructure failures, and characterize induced deformation across energy-producing regions. 
              I am a NASA FINESST fellow with 30+ publications, and I collaborate extensively with GFZ, IIT Roorkee, and the University of Cambridge on satellite-based hazard monitoring.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="/publications" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-900 text-white text-sm">
                <Globe size={16} /> Publications
              </a>
              <a href="/contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-slate-200 text-sm">
                <Mail size={16} /> Contact
              </a>
              <a href="/cv.pdf" className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm bg-slate-100 hover:bg-slate-200">
                <Download size={16} /> CV
              </a>
            </div>

            <p className="mt-6 text-xs text-slate-500">
              Research featured in Bloomberg • Newsweek • BBC • Houston Chronicle • The Texas Tribune
            </p>
          </div>

          {/* FEATURED WORK */}
          <div className="order-first md:order-last">
            <div className="w-full h-56 md:h-72 rounded-2xl bg-gradient-to-br from-sky-50 to-white shadow-md flex items-center justify-center">
              <div className="text-center px-6">
                <div className="text-sm text-slate-500">Recent publication</div>
                <h3 className="mt-2 font-semibold text-lg">
                  Satellite-based analysis of wastewater-induced well blowouts
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  A high-resolution InSAR and geomechanics assessment of blowouts in the Permian Basin, published in GRL and widely cited in energy policy discussions.
                </p>
                <a href="https://doi.org/10.1029/2024GL109435" className="mt-4 inline-block text-sm text-sky-700 hover:underline">
                  Read the study
                </a>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* RESEARCH AREAS */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-xl font-semibold">Research areas</h2>

        <div className="mt-4 grid md:grid-cols-3 gap-4">

          <article className="p-4 border rounded-lg bg-white">
            <h3 className="font-semibold">Subsurface deformation & geomechanics</h3>
            <p className="mt-2 text-sm text-slate-600">
              Combining InSAR, reservoir mechanics, and poroelastic modeling to quantify deformation associated with injection, production, and stress perturbations.
            </p>
          </article>

          <article className="p-4 border rounded-lg bg-white">
            <h3 className="font-semibold">Energy infrastructure and environmental hazards</h3>
            <p className="mt-2 text-sm text-slate-600">
              Identifying blowouts, casing failures, subsidence, and fault-related deformation to evaluate vulnerabilities in wells, pipelines, and surface facilities.
            </p>
          </article>

          <article className="p-4 border rounded-lg bg-white">
            <h3 className="font-semibold">Urban deformation & environmental change</h3>
            <p className="mt-2 text-sm text-slate-600">
              Long-term monitoring of cities such as Delhi and Joshimath to assess the impacts of groundwater extraction, landslides, and anthropogenic loading.
            </p>
          </article>

        </div>
      </section>

      {/* PRESS & IMPACT */}
      <section className="max-w-5xl mx-auto px-6 py-8">
        <h2 className="text-lg font-semibold">Press & impact</h2>
        <p className="mt-3 text-sm text-slate-600">
          My work contributes to understanding geohazards in some of the world’s most active energy basins and has informed state regulatory conversations, industry decisions, and national media coverage.
        </p>

        <div className="mt-4 flex flex-wrap gap-4 items-center">
          <span className="px-3 py-2 bg-white rounded shadow text-sm">Bloomberg</span>
          <span className="px-3 py-2 bg-white rounded shadow text-sm">Newsweek</span>
          <span className="px-3 py-2 bg-white rounded shadow text-sm">BBC</span>
          <span className="px-3 py-2 bg-white rounded shadow text-sm">Houston Chronicle</span>
          <span className="px-3 py-2 bg-white rounded shadow text-sm">The Texas Tribune</span>
        </div>
      </section>

      {/* COLLABORATIONS */}
      <section className="max-w-5xl mx-auto px-6 py-8">
        <h2 className="text-lg font-semibold">Collaborations</h2>
        <p className="mt-3 text-sm text-slate-600">
          My research includes international collaborations in satellite geodesy, hazard monitoring, and deformation modeling with:
        </p>

        <div className="mt-4 flex flex-wrap gap-4 items-center">
          <span className="px-3 py-2 bg-white rounded shadow text-sm">GFZ German Research Centre for Geosciences</span>
          <span className="px-3 py-2 bg-white rounded shadow text-sm">IIT Roorkee</span>
          <span className="px-3 py-2 bg-white rounded shadow text-sm">University of Cambridge</span>
        </div>
      </section>

      {/* SELECTED Pubs */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-lg font-semibold">Selected publications</h2>

        <ul className="mt-4 space-y-3 text-sm text-slate-700">
          <li>
            Satellite-based analysis of wastewater-driven blowouts in the Permian Basin, 
            <em> Geophysical Research Letters</em> (2024).
          </li>
          <li>
            Production-induced deformation and geomechanics across the Permian Basin, 
            <em> International Journal of Applied Earth Observation and Geoinformation</em> (2023).
          </li>
          <li>
            Coal-fire-driven deformation in the Jharia Coalfields, 
            <em> International Journal of Applied Earth Observation and Geoinformation</em> (2021).
          </li>
        </ul>

        <div className="mt-4">
          <a href="/publications" className="text-sm font-medium text-sky-700 hover:underline">
            View full publication list (30+)
          </a>
        </div>
      </section>

    </main>
  )
}
