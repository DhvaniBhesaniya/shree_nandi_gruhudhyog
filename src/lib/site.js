/**
 * Single source of truth for business details.
 *
 * These were previously hardcoded across Navbar, Hero, Footer, Contact and the
 * floating WhatsApp button — six copies of the phone number meant a change of
 * number would silently miss some of them.
 */

export const site = {
  name: 'Shree Nandi Gruhudhyog',
  nameGuj: 'શ્રી નંદી ગૃહ ઉદ્યોગ',
  tagline: 'Taste the tradition, love every bite',
  description:
    'Authentic Gujarati farsan, namkeen, khakhra, bhakhri, pickles, bakery, soda bar and ice cream — homemade specialities plus trusted brands, in Khoraj, Gandhinagar.',

  phone: '+919998714455',
  phoneDisplay: '+91 99987 14455',
  email: 'shreenandigruhudhyog@gmail.com',

  address: {
    line1: 'Block A, Ground Floor, Shop No. A-12',
    line2: 'PANACHE, Khoraj',
    city: 'Gandhinagar',
    region: 'Gujarat',
    postalCode: '382421',
    country: 'IN',
  },

  mapsLink: 'https://maps.app.goo.gl/oJNutRSV7BzHWXP68',
  mapsEmbed:
    'https://maps.google.com/maps?q=Shree+Nandi+Gruhudhyog,+PANACHE,+Khoraj,+Gandhinagar,+Gujarat&t=&z=16&ie=UTF8&iwloc=&output=embed',

  hours: { open: '08:00', close: '23:00', label: 'Open every day, 8 AM – 11 PM' },

  // Deployed base URL — used for canonical + Open Graph absolute image URLs.
  url: 'https://dhvanibhesaniya.github.io/shree_nandi_gruhudhyog/',

  social: {
    // Left empty rather than pointing at "#" — the footer hides any blank entry
    // instead of rendering a dead link.
    instagram: '',
    facebook: '',
  },
}

export const addressOneLine = [
  site.address.line1,
  site.address.line2,
  `${site.address.city} – ${site.address.postalCode}`,
  site.address.region,
].join(', ')

/** `tel:` / `mailto:` hrefs */
export const telHref = `tel:${site.phone}`
export const mailHref = `mailto:${site.email}`

/**
 * Builds a wa.me deep link with a pre-written message.
 *
 * This is how every enquiry on the site now reaches the shop: the contact form
 * and each product's "Enquire" button compose a message and hand off to
 * WhatsApp, so nothing depends on a backend that doesn't exist.
 */
export function whatsappLink(message) {
  const num = site.phone.replace(/[^\d]/g, '')
  return message
    ? `https://wa.me/${num}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${num}`
}

/** Pre-written openers, so a tap from any surface arrives with context. */
export const waMessage = {
  general: `Hello ${site.name}! I'd like to know more about your products.`,

  product: (name) =>
    `Hello ${site.name}! I'd like to enquire about *${name}*. Could you share the price and availability?`,

  category: (name) =>
    `Hello ${site.name}! I'd like to see what you have in *${name}*.`,

  bulk: `Hello ${site.name}! I'd like a quote for a bulk / wholesale order. Please share your rate list.`,

  /** Contact-form submissions are formatted into a single readable message. */
  enquiry: ({ name, phone, email, product, message }) =>
    [
      `*New enquiry from the website*`,
      ``,
      `*Name:* ${name}`,
      `*Phone:* ${phone}`,
      email ? `*Email:* ${email}` : null,
      product ? `*Interested in:* ${product}` : null,
      message ? `\n*Message:*\n${message}` : null,
    ]
      .filter(Boolean)
      .join('\n'),
}
