// Tells IndexNow search engines (Bing, Yandex, Seznam, Naver, Yep) that the
// live site changed, by submitting every URL in the live sitemap.
//
// Runs on its own after each production deploy
// (.github/workflows/indexnow.yml). By hand: `npm run indexnow`.
//
// The key is the file public/<key>.txt, served at the site root, which is how
// the engines check the submission is ours. Never delete or rename it.

import { readdirSync } from "node:fs";

const SITE = "https://itsubaidullahomer.com";

const keyFile = readdirSync(new URL("../public/", import.meta.url)).find((f) =>
  /^[a-f0-9]{32}\.txt$/.test(f),
);
if (!keyFile) throw new Error("No IndexNow key file (public/<32 hex>.txt) found.");
const key = keyFile.replace(/\.txt$/, "");

const sitemap = await fetch(`${SITE}/sitemap.xml`, { cache: "no-store" });
if (!sitemap.ok) throw new Error(`sitemap.xml returned ${sitemap.status}`);
const urlList = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urlList.length === 0) throw new Error("sitemap.xml has no URLs.");

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITE).host,
    key,
    keyLocation: `${SITE}/${keyFile}`,
    urlList,
  }),
});

// 200 = accepted, 202 = accepted while the engine verifies the key.
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs`);
if (!res.ok) {
  console.error(await res.text());
  process.exit(1);
}
