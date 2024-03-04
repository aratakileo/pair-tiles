import TileGrid from './components/tileGrid';
import {useSelector} from "react-redux";

const App = () => {
    const triesCount = useSelector(state => state.tileGrid.triesCount);

    return (
        <div className='App'>
            <TileGrid/>
            <p style={{color: 'white', marginLeft: '1vh'}}>
                <b>Tries: {triesCount}</b>
            </p>
        </div>
    );
}

export default App;
