// Renders the reel.
//
//   npm run render                      the film → out/reel-master.mp4, the web
//                                       encodes → ../public/video/, and a copy to
//                                       share → out/reel-share.mp4
//   npm run render -- --still 60 300    PNG stills → out/
//
// 3D shots render with software WebGL (SwiftShader), so a full render takes a
// while. Uses Playwright's Chromium headless shell when it's installed
// (REMOTION_BROWSER overrides it); otherwise Remotion downloads its own.

import { existsSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { bundle } from "@remotion/bundler";
import { renderMedia, renderStill, selectComposition } from "@remotion/renderer";

const here = path.dirname(new URL(import.meta.url).pathname);
const out = path.join(here, "out");
const web = path.join(here, "..", "public", "video");
mkdirSync(out, { recursive: true });

const shell = "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell";
const browserExecutable = process.env.REMOTION_BROWSER ?? (existsSync(shell) ? shell : null);
const chromiumOptions = { gl: process.env.REMOTION_GL ?? "swangle" };

const serveUrl = await bundle({
  entryPoint: path.join(here, "src/index.ts"),
  publicDir: path.join(here, "..", "public"),
});
const composition = await selectComposition({
  serveUrl,
  id: "Reel",
  browserExecutable,
  chromiumOptions,
});

const stillAt = process.argv.indexOf("--still");
if (stillAt !== -1) {
  for (const f of process.argv.slice(stillAt + 1).map(Number)) {
    const output = path.join(out, `still-${String(f).padStart(4, "0")}.png`);
    await renderStill({
      composition,
      serveUrl,
      frame: f,
      output,
      browserExecutable,
      chromiumOptions,
    });
    console.log(output);
  }
  process.exit(0);
}

const master = path.join(out, "reel-master.mp4");
let last = -1;
await renderMedia({
  composition,
  serveUrl,
  codec: "h264",
  crf: 16,
  outputLocation: master,
  browserExecutable,
  chromiumOptions,
  concurrency: Number(process.env.REMOTION_CONCURRENCY ?? os.cpus().length),
  onProgress: ({ progress }) => {
    const pct = Math.floor(progress * 20) * 5;
    if (pct !== last) (console.log(`render ${pct}%`), (last = pct));
  },
});

const ffmpeg = (args) =>
  execFileSync("npx", ["remotion", "ffmpeg", "-y", "-hide_banner", "-loglevel", "error", ...args], {
    cwd: here,
    stdio: "inherit",
  });
const hasAudio = (() => {
  try {
    const s = execFileSync(
      "npx",
      [
        "remotion",
        "ffprobe",
        "-v",
        "error",
        "-select_streams",
        "a",
        "-show_entries",
        "stream=index",
        "-of",
        "csv=p=0",
        master,
      ],
      { cwd: here },
    ).toString();
    return s.trim().length > 0;
  } catch {
    return false;
  }
})();
const aac = hasAudio ? ["-c:a", "aac", "-b:a", "128k"] : ["-an"];

// Web encodes: H.264 plays everywhere; faststart lets playback begin before the download ends.
mkdirSync(web, { recursive: true });
const h264 = (w, h, crf, file, extra = []) =>
  ffmpeg([
    "-i",
    master,
    "-vf",
    `scale=${w}:${h}:flags=lanczos`,
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
    ...aac,
    ...extra,
    file,
  ]);
h264(1080, 1920, 28, path.join(web, "reel-1080.mp4"));
h264(720, 1280, 29, path.join(web, "reel-720.mp4"));
// VP9 fallback for browsers built without H.264 (some Linux Chromium builds).
ffmpeg([
  "-i",
  master,
  "-vf",
  "scale=720:1280:flags=lanczos",
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
  ...(hasAudio ? ["-c:a", "libopus", "-b:a", "96k"] : ["-an"]),
  path.join(web, "reel-720.webm"),
]);
// Poster: the portrait with the name landed.
ffmpeg([
  "-ss",
  process.env.POSTER_AT ?? "2.6",
  "-i",
  master,
  "-frames:v",
  "1",
  "-vf",
  "scale=720:1280",
  "-q:v",
  "4",
  path.join(web, "reel-poster.jpg"),
]);
// To share: full size, higher quality.
h264(1080, 1920, 20, path.join(out, "reel-share.mp4"));
console.log("done:", web, "and", path.join(out, "reel-share.mp4"));
