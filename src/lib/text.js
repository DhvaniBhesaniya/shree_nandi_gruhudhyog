/**
 * Splits a heading into words, keeping track of which are italic.
 *
 * Markup is a single asterisk pair: "Farsan, khakhra, bakery. *Made in Khoraj.*"
 * The italic phrase is the site's typographic signature (DESIGN.md), so it is
 * supported here rather than making every section hand-build <em> spans.
 */
export function splitWords(text) {
  const out = []
  String(text)
    .split('*')
    .forEach((segment, i) => {
      const italic = i % 2 === 1
      segment
        .split(' ')
        .filter(Boolean)
        .forEach((word) => out.push({ word, italic }))
    })
  return out
}

/** Plain-text version for screen readers and <title>s. */
export const plainText = (text) => String(text).replace(/\*/g, '')
