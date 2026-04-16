import HomeHero from "@/components/sections/HomeHero";
import HomeIntro from "@/components/sections/HomeIntro";
import PillarsSection from "@/components/sections/PillarsSection";
import MembershipBand from "@/components/sections/MembershipBand";
import VisitSection from "@/components/sections/VisitSection";
import PressStrip from "@/components/sections/PressStrip";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeIntro />
      <PillarsSection />
      <MembershipBand />
      <VisitSection />
      <PressStrip />
    </>
  );
}
