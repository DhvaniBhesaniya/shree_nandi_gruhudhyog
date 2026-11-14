import { Reveal } from './ui/Reveal'

const brands = [
  'Balaji', 'Cornitos', "Mother's Recipe", 'Hocco', 'Pringles',
  'Cadbury', 'Kissan', 'Nescafé', 'Nutella', 'Jabsons',
  "Haldiram's", 'Biscoff', 'Kinder', 'Empire Bake', 'Cravity',
  'Shantaben', 'Gopal', 'Real Bites', 'Vijay', 'Jalaram',
]

const half = Math.ceil(brands.length / 2)
const rows = [brands.slice(0, half), brands.slice(half)]

/**
 * Brand ticker. Two rows scrolling opposite ways, driven by a CSS keyframe so
 * it runs off the main thread and stops under prefers-reduced-motion.
 */
export default function BrandsMarquee() {
  return (
    <section
      aria-labelledby="brands-heading"
      className="overflow-hidden border-y border-line bg-canvas py-12 md:py-14"
    >
      <Reveal className="mx-auto mb-8 flex max-w-7xl items-center gap-3 px-5 sm:px-8 lg:px-10">
        <span aria-hidden="true" className="rule-accent" />
        <p id="brands-heading" className="eyebrow text-brand">
          Alongside our own kitchen, we stock
        </p>
      </Reveal>

      <div className="mask-edges flex flex-col gap-3">
        {rows.map((row, i) => (
          <div key={i} className="group flex overflow-hidden">
            <div
              className={`marquee-track flex w-max shrink-0 items-center gap-3 pr-3 group-hover:[animation-play-state:paused] ${
                i % 2 === 0 ? 'animate-marquee' : 'animate-marquee-slow [animation-direction:reverse]'
              }`}
            >
              {[...row, ...row, ...row, ...row].map((brand, j) => (
                <span
                  key={`${brand}-${j}`}
                  aria-hidden={j >= row.length ? 'true' : undefined}
                  className="shrink-0 rounded-full border border-line bg-surface px-5 py-2.5 font-display text-lg whitespace-nowrap text-ink-soft transition-colors duration-300 hover:border-ink hover:text-ink"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
