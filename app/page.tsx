import Amenities from "@/components/Amenities";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import LocationSec from "@/components/LocationSec";
import Manifesto from "@/components/Manifesto";
import Nav from "@/components/Nav";
import Preloader from "@/components/Preloader";
import SpaceFocus from "@/components/SpaceFocus";
import SpecsStrip from "@/components/SpecsStrip";
import Tenants from "@/components/Tenants";
import TowerExplorer from "@/components/TowerExplorer";

export default function Home() {
  return (
    <main>
      <Preloader />
      <Nav />
      <Hero />
      <Manifesto />
      <SpecsStrip />
      <TowerExplorer />
      <SpaceFocus />
      <Amenities />
      <Tenants />
      <LocationSec />
      <Contact />
    </main>
  );
}
