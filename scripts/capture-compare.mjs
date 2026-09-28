#!/usr/bin/env node
/**
 * Captures full-page phone screenshots of a site's previous version and
 * its new build, and wires them into the portfolio's comparison.
 *
 *   npx playwright install chromium   # once
 *   npm run capture:compare
 *
 * Writes:
 *   public/images/<slug>/compare/<side>-<screen>.jpg
 *   content/projects/<slug>.compare.json   (paths and sizes, read by the content file)
 *
 * To compare more pages, add them to SCREENS and add a matching entry to
 * `compare.screens` in content/projects/<slug>.ts.
 */
import { chromium, devices } from "playwright";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const SLUG = "ali-foodies";
const SITES = {
  before: "https://alifoodies.com",
  after: "https://alifoodiess.vercel.app",
};
/** Pages to capture on both sites. `key` must match the content file. */
const SCREENS = [{ key: "home", path: "/" }];

/** Very long pages are cut at this height, in CSS pixels. */
const MAX_HEIGHT = 9000;
/** Removed before capturing: cookie banners, chat bubbles, install prompts. */
const REMOVE = [
  '[id*="cookie" i]',
  '[class*="cookie" i]',
  '[id*="consent" i]',
  '[class*="consent" i]',
  'iframe[src*="tawk"]',
  'iframe[title*="chat" i]',
  '[id*="whatsapp" i]',
  '[class*="whatsapp" i]',
];

const PHONE = { ...devices["iPhone 13"], deviceScaleFactor: 2 };
const OUT_DIR = path.join("public", "images", SLUG, "compare");
const MANIFEST = path.join("content", "projects", `${SLUG}.compare.json`);

async function capture(page, url) {
  await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 }).catch(async () => {
    // Some sites never go network-idle (analytics, sockets). Settle for load.
    await page.goto(url, { waitUntil: "load", timeout: 60_000 });
  });
  await page.waitForTimeout(1500);

  // Walk to the bottom so lazy images load and scroll animations finish.
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.8);
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 180));
    }
    window.scrollTo(0, 0);
  });

  await page.evaluate((selectors) => {
    for (const sel of selectors) document.querySelectorAll(sel).forEach((el) => el.remove());
  }, REMOVE);
  // Freeze motion so nothing is caught half-way through a transition.
  await page.addStyleTag({
    content:
      "*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition:none!important;caret-color:transparent!important}html{scroll-behavior:auto!important}",
  });
  await page.waitForTimeout(800);

  const full = await page.evaluate(() => document.documentElement.scrollHeight);
  return Math.min(full, MAX_HEIGHT);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  let manifest = { capturedAt: null, shots: {} };
  try {
    manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
  } catch {
    // First run: start empty.
  }

  const browser = await chromium.launch();
  const context = await browser.newContext(PHONE);
  const page = await context.newPage();
  const width = PHONE.viewport.width;
  let failures = 0;

  for (const [side, origin] of Object.entries(SITES)) {
    for (const screen of SCREENS) {
      const url = new URL(screen.path, origin).toString();
      const name = `${side}-${screen.key}`;
      const file = path.join(OUT_DIR, `${name}.jpg`);
      try {
        const height = await capture(page, url);
        await page.screenshot({
          path: file,
          type: "jpeg",
          quality: 80,
          fullPage: true,
          clip: { x: 0, y: 0, width, height },
        });
        manifest.shots[name] = {
          src: `/${path.posix.join("images", SLUG, "compare", `${name}.jpg`)}`,
          width: width * PHONE.deviceScaleFactor,
          height: height * PHONE.deviceScaleFactor,
        };
        console.log(`✓ ${name}  ${url}  (${width}×${height} css px)`);
      } catch (err) {
        failures += 1;
        console.error(`✗ ${name}  ${url}\n  ${err.message.split("\n")[0]}`);
      }
    }
  }

  await browser.close();
  manifest.capturedAt = new Date().toISOString().slice(0, 10);
  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`\nWrote ${MANIFEST}`);
  if (failures) process.exitCode = 1;
}

main();
