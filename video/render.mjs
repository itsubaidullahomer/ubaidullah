// Renders the reel.
//
//   npm run render                      the site's copy → ../public/video/, and a
//                                       copy to share (with its own chrome) → out/reel-share.mp4
//   npm run render -- --still 120 450   PNG stills of the share copy → out/
//
// Uses the Chromium headless shell from Playwright when it's installed
// (REMOTION_BROWSER overrides it); otherwise Remotion downloads its own.

import { existsSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { bundle } from "@remotion/bundler";
import { renderMedia, renderStill, selectComposition } from "@remotion/renderer";

const here = path.dirname(new URL(import.meta.url).pathname);
const out = path.join(here, "out");
const web = path.join(here, "..", "public", "video");
mkdirSync(out, { recursive: true });

const shell = "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell";
const browserExecutable = process.env.REMOTION_BROWSER ?? (existsSync(shell) ? shell : null);

const serveUrl = await bundle({
  entryPoint: path.join(here, "src/index.ts"),
  publicDir: path.join(here, "..", "public"),
});
const composition = (id) => selectComposition({ serveUrl, id, browserExecutable });

const stillAt = process.argv.indexOf("--still");
if (stillAt !== -1) {
  const comp = await composition("Reel");
  for (const f of process.argv.slice(stillAt + 1).map(Number)) {
    const output = path.join(out, `still-${String(f).padStart(4, "0")}.png`);
    await renderStill({ composition: comp, serveUrl, frame: f, output, browserExecutable });
    console.log(output);
  }
  process.exit(0);
}

async function render(id, file, crf) {
  let last = -1;
  await renderMedia({
    composition: await composition(id),
    serveUrl,
    codec: "h264",
    crf,
    outputLocation: file,
    browserExecutable,
    onProgress: ({ progress }) => {
      const pct = Math.floor(progress * 10) * 10;
      if (pct !== last) (console.log(`${id} ${pct}%`), (last = pct));
    },
  });
}

const master = path.join(out, "reel-site-master.mp4");
await render("ReelSite", master, 14);
await render("Reel", path.join(out, "reel-share.mp4"), 18);

// Web encodes: H.264 plays everywhere; faststart lets playback begin before the download ends.
mkdirSync(web, { recursive: true });
const ffmpeg = (args) =>
  execFileSync("npx", ["remotion", "ffmpeg", "-y", "-hide_banner", "-loglevel", "error", ...args], {
    cwd: here,
    stdio: "inherit",
  });
const encode = (size, crf, file) =>
  ffmpeg([
    "-i",
    master,
    "-vf",
    `scale=${size}:${size}:flags=lanczos`,
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    String(crf),
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    "-an",
    path.join(web, file),
  ]);
encode(1080, 27, "reel-1080.mp4");
encode(720, 28, "reel-720.mp4");
// VP9 fallback for browsers built without H.264 (some Linux Chromium builds).
ffmpeg([
  "-i",
  master,
  "-vf",
  "scale=720:720:flags=lanczos",
  "-c:v",
  "libvpx-vp9",
  "-crf",
  "38",
  "-b:v",
  "0",
  "-deadline",
  "good",
  "-cpu-used",
  "4",
  "-row-mt",
  "1",
  "-an",
  path.join(web, "reel-720.webm"),
]);
// Poster: the moment the name has landed and the portrait is in colour.
ffmpeg([
  "-ss",
  "3.4",
  "-i",
  master,
  "-frames:v",
  "1",
  "-vf",
  "scale=1080:1080",
  "-q:v",
  "4",
  path.join(web, "reel-poster.jpg"),
]);
console.log("done:", web, "and", path.join(out, "reel-share.mp4"));
