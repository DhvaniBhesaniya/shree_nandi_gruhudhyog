import { Reveal } from './ui/Reveal'

const brands = [
  'Balaji', 'Cornitos', "Mother's Recipe", 'Hocco', 'Pringles',
  'Cadbury', 'Kissan', 'Nescafé', 'Nutella', 'Jabsons',
  "Haldiram's", 'Biscoff', 'Kinder', 'Empire Bake', 'Cravity',
  'Shantaben', 'Gopal', 'Real Bites', 'Lipton', 'Vimal Wellness',
]

const half = Math.ceil(brands.length / 2)
const rows = [brands.slice(0, half), brands.slice(half)]

/**
 * Brand ticker.
 *
 * Driven by a CSS keyframe rather than an animated Framer transform. Two
 * reasons: it runs entirely off the main thread, and the global
 * prefers-reduced-motion rule in index.css can stop it — a Framer `repeat:
 * Infinity` animation kept running regardless in the previous version.
 *
 * Two rows scrolling opposite ways reads as a texture rather than a single
 * conveyor belt.
 */
export default function BrandsMarquee() {
  return (
    <section
      aria-labelledby="brands-heading"
      className="overflow-hidden border-y border-line bg-canvas py-14 md:py-16"
    >
      <Reveal className="mx-auto mb-9 max-w-7xl px-5 text-center sm:px-8 lg:px-10">
        <p id="brands-heading" className="eyebrow text-ink-faint">
          Alongside our own kitchen, we stock
        </p>
      </Reveal>

      <div className="mask-edges flex flex-col gap-3.5">
        {rows.map((row, i) => (
          <div key={i} className="group flex overflow-hidden">
            {/*
              The keyframe translates -50%, so the track must hold two identical
              halves for the loop to be seamless. Each half is the row repeated
              twice (~2600px) rather than once — a single pass is only ~1300px
              and would leave a visible gap on wide desktops once shifted.
              aria-hidden on every repeat past the first keeps screen readers
              from announcing the whole brand list four times.
            */}
            <div
              className={`marquee-track flex w-max shrink-0 items-center gap-3.5 pr-3.5 group-hover:[animation-play-state:paused] ${
                i % 2 === 0 ? 'animate-marquee' : 'animate-marquee-slow [animation-direction:reverse]'
              }`}
            >
              {[...row, ...row, ...row, ...row].map((brand, j) => (
                <span
                  key={`${brand}-${j}`}
                  aria-hidden={j >= row.length ? 'true' : undefined}
                  className="shrink-0 rounded-full border border-line bg-surface px-5 py-2.5 font-body text-sm font-medium whitespace-nowrap text-ink-soft transition-colors duration-300 hover:border-brand/40 hover:text-ink"
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
