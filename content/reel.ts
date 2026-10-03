/**
 * The homepage reel: a vertical, cinematic film of the journey and the work,
 * made with Remotion in video/ and played in the hero.
 *
 * Everything is timed in bars of music (4 beats). `bpm` sets the length of a
 * bar, so the cuts land on the beat: when the soundtrack changes, set its
 * tempo here and re-render (`cd video && npm run render`). The hero's chapter
 * list and timecode read the same chapters, so the two stay in sync.
 */

export type ReelChapter = {
  id: string;
  /** Short name for the chapter list. */
  label: string;
  /** One line the hero shows while this chapter plays. */
  caption: string;
  /** Length in bars of music. */
  bars: number;
  /** A number the hero pins beside the video while this chapter plays. */
  readout?: { value: string; label: string };
  /** Where the chapter's work lives on the site. */
  href?: string;
};

const CLASSIFIED = 2;

export const reel = {
  fps: 30,
  width: 1080,
  height: 1920,
  /** Tempo of the soundtrack (measured with video/beats.py); one bar is four beats. */
  bpm: 123.57,
  /**
   * The soundtrack, video/assets/music.mp3, or null for a silent film. The
   * film starts `offset` seconds into the track: two bars before its drop, so
   * the drop lands on the Tututor shot and the breakdown on the NDA files.
   */
  music: {
    offset: 27.105,
    credit: "“Technology Promo” by The_Mountain, Pixabay Content License",
  } as null | { offset: number; credit: string },
  src: {
    large: "/video/reel-1080.mp4",
    small: "/video/reel-720.mp4",
    /** VP9, for browsers built without H.264. */
    fallback: "/video/reel-720.webm",
    poster: "/video/reel-poster.jpg",
  },
  /** Projects under NDA, shown only as redacted files. The count is all the film says. */
  classifiedCount: CLASSIFIED,
  chapters: [
    {
      id: "hello",
      label: "Hello",
      caption: "Product engineer in Rahim Yar Khan, Pakistan. Lead engineer at Tututor.ai.",
      bars: 2,
      readout: { value: "Remote", label: "For teams in Spain & Denmark" },
    },
    {
      id: "tututor",
      label: "Tututor.ai",
      caption: "Hired to fix one bug. Rebuilt it three times. Eight products on one backend.",
      bars: 8,
      readout: { value: "20k+", label: "Students, teachers & families" },
      href: "/work/tututor",
    },
    {
      id: "illume",
      label: "Illume",
      caption: "Analytics for MedSpas that build their own dashboards. Live today as Illume.",
      bars: 2,
      readout: { value: "$250k", label: "Funding secured" },
      href: "/work/insight-x",
    },
    {
      id: "viloi",
      label: "Viloi",
      caption: "An AI writing tool I built on my own, from the model pipeline to billing.",
      bars: 2,
      readout: { value: "3", label: "Model providers" },
      href: "/work/ai-humanizer",
    },
    {
      id: "ali-foodies",
      label: "Ali Foodies",
      caption: "Rebuilding a restaurant's site for the screen its customers actually use.",
      bars: 2,
      readout: { value: "99.9%", label: "Customers on a phone" },
      href: "/work/ali-foodies",
    },
    {
      id: "earlier",
      label: "Earlier",
      caption: "Booking, storage, ordering and tools: the work that got me here.",
      bars: 2,
      readout: { value: "2022", label: "Started at Danzee Tech" },
      href: "/work",
    },
    {
      id: "nda",
      label: "Under NDA",
      caption: "My most ambitious work right now is under NDA. Ask me about it.",
      bars: 2,
      readout: { value: String(CLASSIFIED), label: "Projects in progress" },
      href: "/contact",
    },
    {
      id: "end",
      label: "Let's talk",
      caption: "Available for select work.",
      bars: 2,
      href: "/contact",
    },
  ] satisfies ReelChapter[],
};

/** Seconds per bar at the reel's tempo. */
export const secondsPerBar = (4 * 60) / reel.bpm;

/** Start and end of each chapter in seconds, plus the total length. */
export function reelTimeline() {
  let t = 0;
  const chapters = reel.chapters.map((c) => {
    const start = t;
    const seconds = c.bars * secondsPerBar;
    t += seconds;
    return { ...c, seconds, start, end: t };
  });
  return { chapters, duration: t };
}
