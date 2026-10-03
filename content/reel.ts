/**
 * The homepage reel: a ~60s video of the journey and the work, made with
 * Remotion in video/ and played in the hero.
 *
 * Chapters are shared by both sides: the video lays its scenes out from
 * `seconds`, and the hero's chapter rail, timecode and readout tags read the
 * same list. Change a duration or add a chapter here, then re-render the video
 * (`cd video && npm run render`) so the two stay in sync.
 */

export type ReelChapter = {
  id: string;
  /** Short name for the chapter rail and the video's top bar. */
  label: string;
  /** One line the hero shows under the video while this chapter plays. */
  caption: string;
  seconds: number;
  /** A readout pinned beside the video while this chapter plays. */
  readout?: { value: string; label: string };
  /** Where the chapter's work lives on the site. */
  href?: string;
};

const CLASSIFIED = 2;

export const reel = {
  fps: 30,
  /** The video is square: it sits beside the copy on desktop and fills the width on a phone. */
  size: 1080,
  src: {
    large: "/video/reel-1080.mp4",
    small: "/video/reel-720.mp4",
    /** VP9, for browsers built without H.264. */
    fallback: "/video/reel-720.webm",
    poster: "/video/reel-poster.jpg",
  },
  /**
   * Projects under NDA, shown as redacted files. The count is all the video
   * says about them.
   */
  classifiedCount: CLASSIFIED,
  chapters: [
    {
      id: "hello",
      label: "Hello",
      caption: "Product engineer in Rahim Yar Khan, Pakistan. Lead engineer at Tututor.ai.",
      seconds: 5,
      readout: { value: "Remote", label: "For teams in Spain & Denmark" },
    },
    {
      id: "path",
      label: "The path",
      caption: "From React developer to lead engineer, one shipped product at a time.",
      seconds: 7,
      readout: { value: "2022", label: "Started at Danzee Tech" },
    },
    {
      id: "tututor",
      label: "Tututor.ai",
      caption: "Hired to fix one bug. Rebuilt it three times. Eight products on one backend.",
      seconds: 16,
      readout: { value: "20k+", label: "Students, teachers & families" },
      href: "/work/tututor",
    },
    {
      id: "illume",
      label: "Illume",
      caption: "Analytics for MedSpas that build their own dashboards. Live today as Illume.",
      seconds: 6,
      readout: { value: "$250k", label: "Funding secured" },
      href: "/work/insight-x",
    },
    {
      id: "viloi",
      label: "Viloi",
      caption: "An AI writing tool I built on my own, from the model pipeline to billing.",
      seconds: 5.5,
      readout: { value: "3", label: "Model providers" },
      href: "/work/ai-humanizer",
    },
    {
      id: "ali-foodies",
      label: "Ali Foodies",
      caption: "Rebuilding a restaurant's site for the screen its customers actually use.",
      seconds: 5,
      readout: { value: "99.9%", label: "Customers on a phone" },
      href: "/work/ali-foodies",
    },
    {
      id: "earlier",
      label: "Earlier",
      caption: "Booking, storage, ordering and tools: the work that got me here.",
      seconds: 7,
      readout: { value: "100+", label: "Clubs on Yaksport" },
      href: "/work",
    },
    {
      id: "nda",
      label: "Under NDA",
      caption: "My most ambitious work right now is under NDA. Ask me about it.",
      seconds: 7,
      readout: { value: String(CLASSIFIED), label: "Projects in progress" },
      href: "/contact",
    },
    {
      id: "end",
      label: "Let's talk",
      caption: "Available for select work.",
      seconds: 4.5,
      href: "/contact",
    },
  ] satisfies ReelChapter[],
};

/** Start time of each chapter in seconds, plus the total length. */
export function reelTimeline() {
  let t = 0;
  const chapters = reel.chapters.map((c) => {
    const start = t;
    t += c.seconds;
    return { ...c, start, end: t };
  });
  return { chapters, duration: t };
}
