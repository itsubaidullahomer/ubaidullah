import type { WritingPost } from "../types";

export const writingPosts: WritingPost[] = [
  {
    slug: "shipping-ai-features-to-real-users",
    title: "Shipping AI features to real users",
    description:
      "Notes from a year of shipping AI into a platform 17,000 people actually use. The boring parts matter more than the model.",
    publishedAt: "2026-04-22",
    readingMinutes: 6,
    tags: ["AI", "product", "engineering"],
    body: `
There's a quiet truth about shipping AI features that nobody tweets about: the model is the easy part.

When I started building the AI tools inside Tututor, I expected the hardest work to be prompt engineering. It wasn't. The hardest work was the surface area around the model — making sure teacher UX stayed responsive while the LLM was thinking, storing conversations structurally so they could be reviewed (not as opaque blobs), and designing the failure cases so a slow response didn't feel like a broken product.

A few things that turned out to matter more than picking the right model:

**Streaming, always.** The moment a user starts seeing tokens land, they forgive latency. The moment they see a spinner for three seconds, they assume the product is broken. Streaming isn't a perf trick — it's a UX primitive.

**Store the conversation, not the answer.** Teachers in Tututor review every student-bot conversation to figure out where students are stuck. That's only possible because every turn is a row, not a JSON blob. Same lesson keeps coming back: data shape determines what features you can build six months from now.

**Microservice the AI calls.** Not because microservices are cool. Because when OpenAI is having a bad day, you don't want your main API to also be having a bad day.

**Failure is a product surface.** When the model can't answer, what does the UI say? Most teams I've seen default to a generic error. That's the moment to do something specific — fall back to a previous answer, suggest a related action, anything other than "Something went wrong."

The model gets the headlines. The plumbing gets the users.
    `.trim(),
  },
];

export function getPost(slug: string): WritingPost | undefined {
  return writingPosts.find((p) => p.slug === slug);
}
