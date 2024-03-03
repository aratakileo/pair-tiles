import TileGrid from './components/tileGrid';
import {useSelector} from "react-redux";
import './root.css';

const App = () => {
    const roundsCount = useSelector(state => state.tileGrid.roundsCount);

    return (
        <div className='root'>
            <TileGrid/>
            <p style={{color: 'white', marginLeft: '1vh'}}><b>Rounds: {roundsCount}</b></p>
        </div>
    );
}

export default App;
