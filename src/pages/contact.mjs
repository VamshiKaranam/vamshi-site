import { html } from '../html.mjs';
import { pageHead } from '../layout.mjs';
import { todo } from '../components.mjs';
import { site } from '../../content/site.mjs';

export const route = '/contact';
export const file = 'contact.html';
export const title = 'Contact';
export const description = `Contact Vamshi Karanam at the ${site.institution}: email, phone and office location.`;

export function body() {
  return html`
${pageHead({
  title: 'Contact',
  lede: 'Email is the best way to reach me.',
})}

<section class="band band-first">
  <div class="wrap contact-grid">
    <div class="contact-card">
      <h2>Email</h2>
      <p class="contact-main"><a href="mailto:${site.email}">${site.email}</a></p>
      <h2>Phone</h2>
      <p class="contact-main"><a href="tel:+1${site.phone.replace(/\D/g, '')}">${site.phone}</a></p>
    </div>
    <div class="contact-card">
      <h2>Office</h2>
      <address>
        ${site.office.room}<br>
        ${site.office.lines.map((l) => html`${l}<br>`)}
      </address>
      <p><a href="${site.office.mapUrl}" target="_blank" rel="noopener">Open in Google Maps</a></p>
    </div>
    <div class="contact-card">
      <h2>Profiles</h2>
      <ul class="plain">
        ${site.profiles.map((p) => html`<li><a href="${p.url}" target="_blank" rel="noopener">${p.label}</a></li>`)}
      </ul>
      ${site.profiles.some((p) => p.label === 'ORCID') ? '' : todo('ORCID iD.')}
      <h2>Curriculum vitae</h2>
      <p><a href="${site.cv}">Download the PDF</a></p>
    </div>
  </div>
</section>
`;
}
