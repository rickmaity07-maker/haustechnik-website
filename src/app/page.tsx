import { Intro } from "@/components/Intro";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { MobileCallBar } from "@/components/MobileCallBar";
import { Marquee } from "@/components/sections/Marquee";
import { Services } from "@/components/sections/Services";
import { KeyFacts } from "@/components/sections/KeyFacts";
import { Statement } from "@/components/sections/Statement";
import { Audience } from "@/components/sections/Audience";
import { Seasons } from "@/components/sections/Seasons";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { FAQ } from "@/components/sections/FAQ";
import { ContactPerson } from "@/components/sections/ContactPerson";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { site } from "@/content/site";

// cacheComponents is enabled, so reading the clock has to happen inside a cached scope.
async function YearsInBusiness() {
  "use cache";
  return <KeyFacts years={new Date().getFullYear() - site.founded} />;
}

export default function Home() {
  return (
    // Bottom padding on mobile keeps the fixed call bar clear of the last content.
    <div className="bg-night pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-0">
      <Intro />
      <Nav />
      <main id="inhalt" className="w-full max-w-full overflow-x-clip">
        <Hero />
        <Marquee />
        <Services />
        <YearsInBusiness />
        <Statement />
        <Audience />
        <Seasons />
        <Process />
        <Pricing />
        <ServiceArea />
        <FAQ />
        <ContactPerson />
        <Contact />
      </main>
      <Footer />
      <MobileCallBar />
    </div>
  );
}
