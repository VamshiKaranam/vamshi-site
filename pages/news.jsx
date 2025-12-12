// pages/news.jsx
import React from "react";

const newsList = [
  { date: "2024-11-04", author: "Chowdhury, S.", title: "Well Blowouts in Texas Prompt $100M Emergency Funding Plea", outlet: "Newsweek", url: "https://www.newsweek.com/texas-oil-blowouts-emergency-funding-leak-railroad-waste-1979859" },
  { date: "2024-10-16", author: "Drane, A.", title: "Who’s to blame for the geyser still erupting in West Texas? Documents start to unravel mystery.", outlet: "Houston Chronicle", url: "https://www.houstonchronicle.com/news/investigations/article/geyser-tx-railroad-commission-kinder-morgan-apache-19824265.php" },
  { date: "2024-10-04", author: "Kelly, S.", title: "Blowout Erupts in West Texas’s Permian Basin, Creating 100-Foot Tower of Oily Water", outlet: "DeSmog", url: "https://www.desmog.com/2024/10/04/texas-railroad-commission-kinder-morgan-oil-well-blowout-erupts-in-west-texas-permian-basin/" },
  { date: "2024-08-20", author: "Fauzia, M.", title: "Is it natural or fracking? SMU study reveals cause of past Texas earthquakes.", outlet: "The Dallas Morning News", url: "https://www.dallasnews.com/news/2024/08/20/earthquakes-before-2017-tied-to-oil-and-gas-wastewater-scientists-at-smu-find/" },
  { date: "2024-08-20", author: "Tomlinson, C.", title: "A zombie well apocalypse is coming for the Permian Basin. Texas regulators are not keeping up.", outlet: "Houston Chronicle", url: "https://www.houstonchronicle.com/business/columnists/tomlinson/article/texas-oil-zombie-well-water-19664264.php" },
  { date: "2024-08-14", author: "Volcovici, V.", title: "Texas oil regulator under scrutiny as zombie wells gush back to life.", outlet: "Reuters", url: "https://www.reuters.com/business/energy/texas-oil-regulator-under-scrutiny-zombie-wells-gush-back-life-2024-08-14/" },
  { date: "2024-08-14", author: "Volcovici, V.", title: "Zombie oil wells are springing back to life in Texas. Here’s why.", outlet: "Fast Company", url: "https://www.fastcompany.com/91172863/zombie-oil-wells-springing-back-to-life-texas" },
  { date: "2024-08-08", author: "Drane, A.", title: "Study: More well blowouts to come.", outlet: "Houston Chronicle", url: "https://www.houstonchronicle.com/business/energy/article/zombie-oil-wells-west-texas-blowouts-wastewater-19628728.php" },
  { date: "2024-08-07", author: "Baddour, D.", title: "Study Links Permian Blowouts With Wastewater Injection.", outlet: "Inside Climate News", url: "https://insideclimatenews.org/news/07082024/permian-basin-oil-well-blowouts-linked-with-wastewater-injection/" },
  { date: "2024-08-07", author: "Ramos, N.C.; Baddour, D.", title: "Ranchers reported abandoned oil wells spewing wastewater. A new study blames fracking.", outlet: "The Texas Tribune", url: "https://www.texastribune.org/2024/08/07/texas-oil-fracking-wastewater-injection-blowouts-permian-basin/" },
  { date: "2024-08-07", author: "Tsiaperas, T.", title: "West Texas quakes occur near drilling sites, SMU finds.", outlet: "Axios Dallas", url: "https://www.axios.com/local/dallas/2024/08/07/west-texas-fracking-earthquakes-smu-study" },
  { date: "2024-08-06", author: "SMU Dallas", title: "Study revisits Texas seismic activity occurring before 2017, confirming connection to wastewater injection.", outlet: "SMU News", url: "https://www.smu.edu/news/research/texas-seismic-activity-and-wastewater-injection" },
  { date: "2024-02-29", author: "Ramos, N.C.; Pskowski, M.", title: "“Nobody really knows what you’re supposed to do”: Leaking, exploding abandoned wells wreak havoc in West Texas.", outlet: "The Texas Tribune", url: "https://www.texastribune.org/2024/02/28/abandoned-oil-wells-west-texas-railroad-commission/" },
  { date: "2024-02-29", author: "Pskowski, M.", title: "West Texas Orphan Wells Are Leaking With Unknown Harms.", outlet: "Inside Climate News", url: "https://insideclimatenews.org/news/29022024/abandoned-oil-wells-west-texas-railroad-commission/" },
  { date: "2023-09-07", author: "Hedden, A.", title: "Oil and gas is 'deforming' New Mexico's land, study says, as drilling set to grow.", outlet: "Carlsbad Current-Argus", url: "https://www.currentargus.com/story/news/2023/09/07/oil-gas-new-mexico-permian-basin-delaware-midland-texas-environment-souther-methodist-university/70729375007/" },
  { date: "2023-08-31", author: "Staff", title: "Permian Basin oil and gas activity is increasing geological hazards.", outlet: "Center for Western Priorities", url: "https://westernpriorities.org/2023/08/permian-basin-oil-and-gas-activity-is-increasing-geological-hazards/" },
  { date: "2023-08-30", author: "Grover, H.", title: "Researchers warn that changes in the Permian Basin surface due to oil and gas industry activities are leading to increasing number of geohazards.", outlet: "NM Political Report", url: "https://nmpoliticalreport.com/2023/08/30/researchers-warn-that-changes-in-the-permian-basin-surface-due-to-oil-and-gas-industry-activities-are-leading-to-increasing-number-of-geohazards/" },
  { date: "2023-01-22", author: "BBC", title: "How a Delhi district stopped the ground from sinking.", outlet: "BBC", url: "https://www.bbc.com/news/world-asia-india-64342196" },
  { date: "2022-05-09", author: "Alakananda, D.", title: "Groundwater pumping linked to land subsidence in India’s capital.", outlet: "Nature India", url: "https://www.nature.com/articles/d44151-022-00048-y" },
  { date: "2022-03-24", author: "Dutta, S. R.", title: "Hidden crisis in India’s capital unveiled using satellite data.", outlet: "University of Cambridge", url: "http://www.eng.cam.ac.uk/news/hidden-crisis-indias-capital-unveiled-using-satellite-data" },
  { date: "2022-03-18", author: "Garg, S.; Motagh, M.; Indu, J.; Karanam, V.", title: "Delhi, sinking?", outlet: "India Water Portal", url: "https://www.indiawaterportal.org/articles/delhi-sinking" },
  { date: "2022-01-20", author: "ऋचीक मिश्रा", title: "Delhi-NCR: जमीन से निकला जा रहा है बेहिसाब पानी, खोखली हो गई धरती, धंस सकता है 100 वर्ग KM का इलाका.", outlet: "AajTak", url: "https://www.aajtak.in/science/photo/delhi-ncr-excessive-groundwater-extraction-causing-sink-know-its-impact-tstr-1396022-2022-01-20-1" },
  { date: "2022-01-18", author: "Singh, P.", title: "Excessive groundwater extraction causing parts of Delhi-NCR to sink: Study.", outlet: "Hindustan Times", url: "https://www.hindustantimes.com/cities/delhi-news/excessive-groundwater-extraction-causing-parts-of-delhi-ncr-to-sink-study-101642441000326.html" },
  { date: "2022-01-18", author: "DNA Web Team", title: "Thousands of acres of land in parts of Delhi NCR is sinking, here’s why.", outlet: "DNA India", url: "https://www.dnaindia.com/india/report-thousands-of-acres-of-land-in-parts-of-delhi-ncr-is-sinking-here-s-why-land-subsidence-igi-airport-gurgaon-2929059" }
];

function formatDate(d) {
  // YYYY-MM-DD to Month D, YYYY
  try {
    const dt = new Date(d);
    return dt.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return d;
  }
}

export default function News() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12 text-slate-800">
      <h1 className="text-3xl font-bold mb-6">News & Media</h1>

      <p className="text-sm text-slate-600 mb-6">A selection of media coverage and news items featuring or related to my work.</p>

      <div className="grid gap-4">
        {newsList.map((n, i) => (
          <article key={i} className="p-4 border rounded-lg bg-white">
            <div className="flex items-start justify-between">
              <div>
                <a href={n.url} target="_blank" rel="noreferrer" className="text-sky-700 font-semibold hover:underline">
                  {n.title}
                </a>
                <div className="text-xs text-slate-500 mt-1">
                  {n.author} • {n.outlet} • {formatDate(n.date)}
                </div>
              </div>
              <div className="text-xs text-slate-400 ml-4">{n.outlet}</div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
