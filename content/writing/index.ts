import type { WritingPost } from "../types";

export const writingPosts: WritingPost[] = [
  {
    slug: "i-taught-my-client-to-code",
    title: "I taught my client to code",
    description:
      "He started by translating three strings. Two years later he ships whole features, and some months he commits more than I do. Why I'd do it again.",
    publishedAt: "2026-09-28",
    readingMinutes: 5,
    tags: ["clients", "teaching", "Tututor"],
    body: `
When I started working with the founder of Tututor, he couldn't read code. He knew teaching and he knew exactly what schools needed, but every change went through me, including the tiny ones. "This button should say *Compartir*, not *Share*." "This label is wrong." Lists of them, every week.

So one day I showed him how to do it himself. Open the file, find the string, change it, commit, push. That was it.

His first commit to the frontend translated three strings. His first to the backend changed three lines: which AI model the tools used. I still remember thinking that was a good sign. He wasn't just fixing copy, he was curious about how the thing worked.

**How it grew**

It didn't happen in a straight line, and I didn't plan a curriculum. He'd ask how to do something slightly bigger than last time, and I'd show him.

- A week after his first commit, he made a new AI tool by copying an existing one: 7 files, about 1,200 lines. Most of it was the copy, but he had to understand what to change.
- A few months later he was adding tools on the backend himself.
- In early 2026 he built his first complete feature across the backend and the web app: the school dining system.
- By mid-2026 he was building billing receipts, handling returned SEPA payments, and generating tax forms.
- In September 2026 he shipped an absenteeism system of about 10,000 lines.

His median commit in the AI-tools repo went from 16 lines in 2024 to 487 in 2026. His messages went from "update" to proper conventional commits. He works with an AI coding assistant now, the same way I do. In July 2026 he made more commits to the backend than I did.

**Is it a threat?**

At some level, yes. I've taught the client to do part of what he pays me for, and I'm fine with that.

A client who understands his product makes better decisions. When he asks for a feature now, he already knows roughly what it touches, so the conversation starts in a better place. He can tell a hard problem from an easy one, so he trusts the estimates. And he doesn't need me for every word on every screen, which frees me for the work that actually needs me: the backend, the architecture, the rebuilds, the store releases.

I also think it's simply fair. He's building a company on this code. He should be able to read it.

**What I'd tell another developer**

Start with the smallest real change, one that matters to them. For him it was Spanish copy. Let them push it to production themselves, because that's the moment it stops being your code and starts being theirs too. Then answer whatever they ask next.

I'd do it again with any client who wants to learn. Most of them never ask. I think we should offer.
    `.trim(),
  },
  {
    slug: "shipping-ai-features-to-real-users",
    title: "Shipping AI features to real users",
    description:
      "Notes from a year of putting AI into a platform 17,000 people use. Most of the work had nothing to do with the model.",
    publishedAt: "2026-04-22",
    readingMinutes: 6,
    tags: ["AI", "product", "engineering"],
    body: `
The model is the easy part. That's the thing nobody mentions when they talk about shipping AI features.

When I started on the AI tools inside Tututor I assumed prompt engineering would be the hard bit. It wasn't. The hard bit was everything around the model: keeping the teacher UI responsive while the model was thinking, storing conversations in a shape someone could actually read back later, and working out what the product should do when a response takes eight seconds instead of one.

A few things that mattered more than which model I picked:

**Stream everything.** As soon as someone sees tokens landing on screen, they'll wait. Show them a spinner for three seconds and they assume it's broken. It's less a performance trick than a way of telling the user the product is still with them.

**Store the conversation, not just the answer.** Teachers read back every student conversation to work out where someone got stuck, and that's only possible because each turn is its own row rather than a JSON blob. The shape you pick early decides which features are even available to you six months later.

**Put the AI calls in their own service.** Not for architectural purity. Because when OpenAI is having a bad day, you don't want your main API having one too.

**Decide what failure looks like.** When the model can't answer, what does the screen say? Most teams fall back to a generic error. That's the one moment where a specific response is worth the effort: an older answer, a related action, anything other than "Something went wrong."

The model gets the attention. The plumbing is what keeps people using it.
    `.trim(),
  },
];

export function getPost(slug: string): WritingPost | undefined {
  return writingPosts.find((p) => p.slug === slug);
}
