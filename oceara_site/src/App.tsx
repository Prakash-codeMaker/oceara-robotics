import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { PageEffects } from "./components/PageEffects";
import { Hero } from "./components/sections/Hero";
import { Thesis } from "./components/sections/Thesis";
import { Dive } from "./components/sections/Dive";
import { Constraints } from "./components/sections/Constraints";
import { Perception } from "./components/sections/Perception";
import { SpatialMemory } from "./components/sections/SpatialMemory";
import { MissionSimulator } from "./components/sections/MissionSimulator";
import { Missions } from "./components/sections/Missions";
import { AutonomyStack } from "./components/sections/AutonomyStack";
import { Dimensional } from "./components/sections/Dimensional";
import { Teleop } from "./components/sections/Teleop";
import { Anatomy } from "./components/sections/Anatomy";
import { Specs } from "./components/sections/Specs";
import { Roadmap } from "./components/sections/Roadmap";
import { Research } from "./components/sections/Research";
import { Status } from "./components/sections/Status";
import { Sources } from "./components/sections/Sources";
import { Contact } from "./components/sections/Contact";

export default function App() {
  return (
    <div className="page-shell bg-abyss text-foam">
      <div className="grain" aria-hidden />
      <div className="page-wash" aria-hidden />
      <PageEffects />
      <Nav />
      <main>
        <Hero />
        <Thesis />
        <Dive />
        <Constraints />
        <Perception />
        <SpatialMemory />
        <div id="simulator">
          <MissionSimulator />
        </div>
        <Missions />
        <AutonomyStack />
        <Dimensional />
        <Teleop />
        <Anatomy />
        <Specs />
        <Roadmap />
        <Research />
        <Status />
        <Sources />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
