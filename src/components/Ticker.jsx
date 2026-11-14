/**
 * Type-led moment under the hero.
 *
 * The things the shop sells, in Gujarati and English, set large in the serif
 * and run as a slow ticker. Replaces the animated-counter stat band: the
 * numbers it showed are now in the hero's fact row, and a line of the shop's
 * own words in its own script says more about the place than "10,000+ happy
 * customers" ever did.
 */
const items = [
  ['ખાખરા', 'Khakhra'],
  ['નમકીન', 'Namkeen'],
  ['ફરસાણ', 'Farsan'],
  ['અથાણા', 'Pickles'],
  ['બેકરી', 'Bakery'],
  ['સોડા', 'Soda bar'],
  ['આઈસ્ક્રીમ', 'Ice cream'],
  ['ભાખરી', 'Bhakhri'],
]

export default function Ticker() {
  return (
    <section
      aria-label="What we sell"
      className="overflow-hidden border-y border-line bg-surface py-6 md:py-8"
    >
      <div className="mask-edges flex">
        <ul className="marquee-track animate-ticker flex w-max shrink-0 items-baseline gap-x-10 pr-10 md:gap-x-14 md:pr-14">
          {[...items, ...items].map(([gu, en], i) => (
            <li
              key={`${en}-${i}`}
              aria-hidden={i >= items.length ? 'true' : undefined}
              className="flex shrink-0 items-baseline gap-x-5 whitespace-nowrap md:gap-x-7"
            >
              <span lang="gu" className="font-display text-3xl text-ink md:text-5xl">
                {gu}
              </span>
              <span className="font-display text-3xl italic text-brand md:text-5xl">{en}</span>
              <span aria-hidden="true" className="ml-5 h-1.5 w-1.5 rounded-full bg-accent md:ml-7" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
