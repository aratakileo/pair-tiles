import TileGrid from './components/tileGrid';
import Footer from "./components/footer";
import './App.css';
import CustomCheckbox from "./components/customCheckbox";
import {useDispatch, useSelector} from "react-redux";
import {toggleAltMode, toggleSelectedPairsDisappearance} from "./store/tileGridSlice";

const App = () => {
    const tileGridState = useSelector(state => state.tileGrid);
    const dispatch = useDispatch();

    return (
        <div className='App'>
            <TileGrid/>
            <div className='center-horizontal-content'>
                <div>
                    <CustomCheckbox
                        caption="Alternative mode (if it's hard to distinguish colors)"
                        checked={tileGridState.altMode}
                        onClick={() => dispatch(toggleAltMode())}
                        style={{marginTop: '2vh'}}
                    />
                    <CustomCheckbox
                        caption='Make the selected pairs disappear'
                        checked={tileGridState.selectedPairsDisappearance}
                        onClick={() => dispatch(toggleSelectedPairsDisappearance())}
                    />
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
