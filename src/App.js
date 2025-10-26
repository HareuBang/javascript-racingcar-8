import inputView from "./console/inputView.js";
import outputView from "./console/outputView.js";
import CarFactory from "./CarFactory.js";
import Race from "./Race.js";
import RaceTrack from "./RaceTrack.js";

class App {
  async run() {
    const race = new Race(CarFactory.create);
    const raceTrack = new RaceTrack(inputView, race, outputView);

    await raceTrack.race();
  }
}

export default App;
