
import React from 'react'
import { Mail, Download, Globe } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-800">


      <header className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-sm uppercase text-slate-500 tracking-wide">Architect → Geospatial Scientist</p>
            <h1 className="mt-3 text-3xl md:text-4xl font-extrabold leading-tight">
              I study how the subsurface responds to energy operations and turn satellite data into actionable intelligence.
            </h1>

            <p className="mt-4 text-slate-700 max-w-xl">
              I use InSAR, physics-based poroelastic modeling, and machine learning to detect deformation, diagnose well failures, and build predictive tools for industry and regulators. NASA FINESST fellow. 30+ publications. Global collaborations with GFZ, IIT Roorkee, and University of Cambridge.
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

            <p className="mt-6 text-xs text-slate-500">Selected media: Bloomberg • Newsweek • BBC • Houston Chronicle • The Texas Tribune</p>
          </div>

          <div className="order-first md:order-last">
            <div className="w-full h-56 md:h-72 rounded-2xl bg-gradient-to-br from-sky-50 to-white shadow-md flex items-center justify-center">
              <div className="text-center px-6">
                <div className="text-sm text-slate-500">Featured work</div>
                <h3 className="mt-2 font-semibold text-lg">Geospatially resolved characterization of wastewater-induced blowouts</h3>
                <p className="mt-2 text-sm text-slate-600">Published in Geophysical Research Letters — covered by Bloomberg and Newsweek.</p>
                <a href="/publications#grl-2024" className="mt-4 inline-block text-sm text-sky-700 hover:underline">Read the paper</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-xl font-semibold">Research highlights</h2>
        <div className="mt-4 grid md:grid-cols-3 gap-4">
          <article className="p-4 border rounded-lg bg-white">
            <h3 className="font-semibold">Permian Basin Blowouts</h3>
            <p className="mt-2 text-sm text-slate-600">First geospatially resolved study linking wastewater injection to well blowouts; policy and industry impact.</p>
          </article>
          <article className="p-4 border rounded-lg bg-white">
            <h3 className="font-semibold">Jharia Coalfields</h3>
            <p className="mt-2 text-sm text-slate-600">Thermal and InSAR-based mapping of coal-fire induced deformation; DAAD-funded work and GFZ collaboration.</p>
          </article>
          <article className="p-4 border rounded-lg bg-white">
            <h3 className="font-semibold">Infrastructure Monitoring</h3>
            <p className="mt-2 text-sm text-slate-600">Integrated InSAR, GNSS, and poroelastic modeling to assess subsidence and infrastructure exposure.</p>
          </article>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-8">
        <h2 className="text-lg font-semibold">Press & impact</h2>
        <p className="mt-3 text-sm text-slate-600">My research has been featured in:</p>
        <div className="mt-4 flex flex-wrap gap-4 items-center">
          <span className="px-3 py-2 bg-white rounded shadow text-sm">Bloomberg</span>
          <span className="px-3 py-2 bg-white rounded shadow text-sm">Newsweek</span>
          <span className="px-3 py-2 bg-white rounded shadow text-sm">BBC</span>
          <span className="px-3 py-2 bg-white rounded shadow text-sm">Houston Chronicle</span>
          <span className="px-3 py-2 bg-white rounded shadow text-sm">The Texas Tribune</span>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-8">
        <h2 className="text-lg font-semibold">Collaborations</h2>
        <div className="mt-4 flex flex-wrap gap-4 items-center">
          <span className="px-3 py-2 bg-white rounded shadow text-sm">GFZ German Research Centre for Geosciences</span>
          <span className="px-3 py-2 bg-white rounded shadow text-sm">IIT Roorkee</span>
          <span className="px-3 py-2 bg-white rounded shadow text-sm">University of Cambridge</span>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-lg font-semibold">Selected publications</h2>
        <ul className="mt-4 space-y-3 text-sm text-slate-700">
          <li>Investigation of Oil Well Blowouts Triggered by Wastewater Injection in the Permian Basin, Geophysical Research Letters (2024).</li>
          <li>Hydrocarbon production induced land deformation over Permian Basin, IJGEO (2023).</li>
          <li>Multi-sensor remote sensing analysis of coal fire induced land subsidence in Jharia, IJGEO (2021).</li>
        </ul>
        <div className="mt-4">
          <a href="/publications" className="text-sm font-medium text-sky-700 hover:underline">See all publications (30+)</a>
        </div>
      </section>
    </main>
  )
}
