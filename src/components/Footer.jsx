import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { img } from '../assets/images'
import { site, addressOneLine, telHref, mailHref } from '../lib/site'
import { scrollToId } from '../lib/hooks'

const quickLinks = [
  { label: 'Products', id: 'products' },
  { label: 'Beverages', id: 'beverages' },
  { label: 'Our story', id: 'about' },
  { label: 'Inside the shop', id: 'tour' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'Bulk orders', id: 'bulk' },
  { label: 'Contact', id: 'contact' },
]

// lucide v1 dropped brand glyphs, so these are inlined rather than pulled from
// an icon package just for two marks.
const socialIcons = {
  instagram: (
    <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.23 1 .5 1.4.94.44.44.7.85.94 1.4.17.45.37 1.05.42 2.2.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.05 1.2-.25 1.8-.42 2.2-.23.6-.5 1-.94 1.4-.44.44-.85.7-1.4.94-.45.17-1.05.37-2.2.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.05-1.8-.25-2.2-.42-.6-.23-1-.5-1.4-.94-.44-.44-.7-.85-.94-1.4-.17-.45-.37-1.05-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.05-1.2.25-1.8.42-2.2.23-.6.5-1 .94-1.4.44-.44.85-.7 1.4-.94.45-.17 1.05-.37 2.2-.42C8.4 2.2 8.8 2.2 12 2.2Zm0 5.8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 6.6a2.6 2.6 0 1 1 0-5.2 2.6 2.6 0 0 1 0 5.2Zm5.1-6.7a.94.94 0 1 1-1.87 0 .94.94 0 0 1 1.87 0Z" />
  ),
  facebook: (
    <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.29-.04-1.28-.12-2.44-.12-2.42 0-4.06 1.47-4.06 4.18V9.9H7.5V13h2.2v8h3.8Z" />
  ),
}

export default function Footer() {
  const socials = Object.entries(site.social).filter(([, url]) => url)

  return (
    <footer className="border-t border-white/10 bg-inverse text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <img
                src={img.logo?.img.src}
                srcSet={img.logo?.sources?.webp}
                sizes="48px"
                width={48}
                height={48}
                alt=""
                className="h-11 w-11 rounded-full object-cover ring-1 ring-white/20"
              />
              <div>
                <p className="font-display text-lg font-semibold text-white">{site.name}</p>
                <p lang="gu" className="font-display text-sm text-gold-400">
                  {site.nameGuj}
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-sm font-body text-sm leading-relaxed text-white/55">
              A family gruhudhyog in Khoraj, Gandhinagar — homemade Gujarati farsan,
              khakhra and bakery, alongside the brands you already trust.
            </p>

            {socials.length > 0 && (
              <div className="mt-6 flex items-center gap-2.5">
                {socials.map(([network, url]) => (
                  <a
                    key={network}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${site.name} on ${network}`}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-gold-400/50 hover:text-gold-400"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      {socialIcons[network]}
                    </svg>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Links */}
          <nav aria-label="Footer" className="md:col-span-3">
            <h2 className="eyebrow text-gold-400">Explore</h2>
            <ul className="mt-5 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToId(link.id)
                    }}
                    className="font-body text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="md:col-span-4">
            <h2 className="eyebrow text-gold-400">Visit or call</h2>
            <ul className="mt-5 space-y-4">
              <li className="flex gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-white/35" />
                <a
                  href={site.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm leading-relaxed text-white/60 transition-colors hover:text-white"
                >
                  {addressOneLine}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="mt-0.5 shrink-0 text-white/35" />
                <a
                  href={telHref}
                  className="font-body text-sm text-white/60 transition-colors hover:text-white"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail size={16} className="mt-0.5 shrink-0 text-white/35" />
                <a
                  href={mailHref}
                  className="font-body text-sm break-all text-white/60 transition-colors hover:text-white"
                >
                  {site.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock size={16} className="mt-0.5 shrink-0 text-white/35" />
                <span className="font-body text-sm text-white/60">{site.hours.label}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-7 sm:flex-row">
          <p className="font-body text-xs text-white/40">
            © {new Date().getFullYear()} {site.name}. Made in Gujarat, India.
          </p>
          <p className="font-body text-xs text-white/40">
            {site.hours.label} · {site.address.city}, {site.address.region}
          </p>
        </div>
      </div>
    </footer>
  )
}
