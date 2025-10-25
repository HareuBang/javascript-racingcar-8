import inputView from "./console/inputView";
import outputView from "./console/outputView";
import CarFactory from "./CarFactory";
import Race from "./Race";
import RaceTrack from "./RaceTrack";
class App {
  async run() {
    const race = new Race(CarFactory.create);
    const raceTrack = new RaceTrack(inputView, race, outputView);
    raceTrack.race();
  }
}

export default App;
