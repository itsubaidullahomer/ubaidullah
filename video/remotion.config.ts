// Remotion Studio config (`npm run studio`). Rendering goes through render.mjs.
import { Config } from "@remotion/cli/config";

// The reel uses the site's own screenshots.
Config.setPublicDir("../public");
Config.setBrowserExecutable(process.env.REMOTION_BROWSER ?? null);
