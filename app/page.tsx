import Amenities from "@/components/Amenities";
import Contact from "@/components/Contact";
import Cursor from "@/components/Cursor";
import Hero from "@/components/Hero";
import LocationSec from "@/components/LocationSec";
import Manifesto from "@/components/Manifesto";
import Nav from "@/components/Nav";
import Preloader from "@/components/Preloader";
import Ribbon from "@/components/Ribbon";
import SmoothScroll from "@/components/SmoothScroll";
import SpaceFocus from "@/components/SpaceFocus";
import SpecsStrip from "@/components/SpecsStrip";
import Tenants from "@/components/Tenants";
import TowerExplorer from "@/components/TowerExplorer";

export default function Home() {
  return (
    <main>
      <SmoothScroll />
      <Cursor />
      <Preloader />
      <Nav />
      <Hero />
      <Ribbon />
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
