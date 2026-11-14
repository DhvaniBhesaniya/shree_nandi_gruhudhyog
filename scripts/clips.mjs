/**
 * Cuts short, muted, web-sized loops out of the raw phone footage.
 *
 *   videos-and-pics/VID*.mp4  (git-ignored, ~750 MB of 4K HEVC)
 *       → public/video/<name>.mp4  (H.264, 30 fps, 720p portrait / 1280 wide)
 *       → public/video/<name>.jpg  (poster frame)
 *
 * Audio is dropped at encode time (`-an`) — the site never plays sound.
 * Each clip is ≤ 12 s and ~1.5–3 MB so the page stays light; <Video> only
 * plays the ones on screen.
 *
 * Run with:  npm run clips          (ffmpeg comes from the ffmpeg-static dev
 *                                    dependency; set FFMPEG=/path/to/ffmpeg
 *                                    to use another build)
 *
 * Existing outputs are skipped — delete a file in public/video to redo it.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync } from 'node:fs'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const FF = process.env.FFMPEG || require('ffmpeg-static')
const SRC = 'videos-and-pics'
const OUT = 'public/video'

if (!existsSync(SRC)) {
  console.error(`No ${SRC}/ folder — copy the raw footage there first.`)
  process.exit(1)
}
mkdirSync(OUT, { recursive: true })

/** [name, source file, start (s), length (s), portrait?] */
const clips = [
  ['aisle-pan', 'VID20261112200010.mp4', 2, 12, false], // namkeen → biscuit shelves (hero, desktop)
  ['aisle-pan-2', 'VID20261112200010.mp4', 22, 10, false], // sauces / chips wall (shop tour)
  ['shelves-tall', 'VID20261112194836.mp4', 1, 10, true], // tall shelf pan (hero, phones)
  ['soda-bar', 'VID20261112194836.mp4', 18, 8, true], // soda machine
  ['freezer', 'VID20261112194836.mp4', 27, 7, true], // Hocco freezer
  ['brand-mark', 'VID20261112200311.mp4', 0, 6, true], // SNG logo on the puff box
  ['homemade-tubs', 'VID20261112200311.mp4', 42, 9, true], // homemade farsan tubs
]

for (const [name, file, ss, t, portrait] of clips) {
  const inp = `${SRC}/${file}`
  // ffmpeg honours the rotation tag, so a portrait phone file already comes
  // out 1080x1920 — scale by the long edge.
  const scale = portrait ? 'scale=720:-2' : 'scale=1280:-2'
  const mp4 = `${OUT}/${name}.mp4`
  const jpg = `${OUT}/${name}.jpg`

  if (!existsSync(mp4)) {
    execFileSync(
      FF,
      [
        '-y', '-ss', String(ss), '-t', String(t), '-i', inp, '-an',
        '-vf', `${scale},fps=30,format=yuv420p`,
        '-c:v', 'libx264', '-preset', 'slow', '-crf', '27', '-profile:v', 'high', '-level', '4.0',
        '-movflags', '+faststart', mp4,
      ],
      { stdio: 'inherit' },
    )
  }
  if (!existsSync(jpg)) {
    execFileSync(
      FF,
      ['-y', '-ss', String(ss + 0.5), '-i', inp, '-frames:v', '1', '-vf', scale, '-q:v', '4', jpg],
      { stdio: 'inherit' },
    )
  }
  console.log('✓', name)
}
