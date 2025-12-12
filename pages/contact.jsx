export default function Contact() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 text-slate-800">

      <h1 className="text-3xl font-bold mb-6">Contact</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold">Email</h2>
        <p className="mt-2">
          <a href="mailto:vkaranam@smu.edu" className="text-sky-700 underline">
            vkaranam@smu.edu
          </a>
          <br />
          <a href="mailto:ar.vamshikaranam@gmail.com" className="text-sky-700 underline">
            ar.vamshikaranam@gmail.com
          </a>
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold">Address</h2>
        <p className="mt-2">
          3225 Daniel Ave<br />
          Dallas, TX 75205
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Location</h2>
        <div className="mt-4 rounded-lg overflow-hidden shadow">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1075.218153351972!2d-96.7851418681983!3d32.84658877170152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e9919b9483a83%3A0x77e8d3be92e34052!2s3225%20Daniel%20Ave%2C%20Dallas%2C%20TX%2075205!5e0!3m2!1sen!2sus!4v1700000000000"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

    </main>
  );
}
