import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { Philosophy } from "@/components/sections/Philosophy";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <ExperienceTimeline />
      <Philosophy />
      <ContactCTA />
    </>
  );
}
