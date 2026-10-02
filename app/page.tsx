import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { FlagshipProject } from "@/components/sections/FlagshipProject";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { Philosophy } from "@/components/sections/Philosophy";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { personJsonLd, websiteJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = buildMetadata({ path: "/" });

export default function HomePage() {
  return (
    <>
      <JsonLd data={personJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <Hero />
      <FlagshipProject />
      <SelectedWork />
      <ExperienceTimeline />
      <Philosophy />
      <ContactCTA />
    </>
  );
}
