import TileGrid from './components/tileGrid';
import AltModeCheckbox from "./components/altModeCheckbox";
import Footer from "./components/footer";
import './App.css';

const App = () => {
    return (
        <div className='App'>
            <TileGrid/>
            <AltModeCheckbox/>
            <Footer/>
        </div>
    );
}

export default App;
