import TileGrid from './components/tileGrid';
import AltModeCheckbox from "./components/altModeCheckbox";
import './App.css';

const App = () => {
    return (
        <div className='App'>
            <TileGrid/>
            <AltModeCheckbox/>
        </div>
    );
}

export default App;
