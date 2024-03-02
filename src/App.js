import './App.css';
import TileGrid from "./components/tileGrid";

function App() {
  return (
    <div className="App">
      <TileGrid tilesCount={5} cssGap={'3px'}/>
    </div>
  );
}

export default App;
