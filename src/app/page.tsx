import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Services } from "@/components/sections/Services";
import { Audience } from "@/components/sections/Audience";
import { Statement } from "@/components/sections/Statement";
import { Process } from "@/components/sections/Process";
import { Seasons } from "@/components/sections/Seasons";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="w-full max-w-full overflow-x-hidden">
        <Hero />
        <Marquee />
        <Services />
        <Audience />
        <Statement />
        <Process />
        <Seasons />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
