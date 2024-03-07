import "./finishGameSign.css";
import {useSelector} from "react-redux";
import PlayAgainButton from "./playAgainButton";
import {CSS_GRID_SIZE} from "../util/constants";

const FinishGameSign = () => {
    const tileGridState = useSelector(state => state.tileGrid);

    const signStyle = tileGridState.selectedPairsDisappearance ? {
        width: CSS_GRID_SIZE,
        height: CSS_GRID_SIZE,
        border: '0.3vh solid var(--accent-color)',
        padding: 0,
        margin: '1.3vh'
    } : {
        width: CSS_GRID_SIZE,
        height: CSS_GRID_SIZE,
        border: '',
        padding: '1.3vh',
        margin: 0
    };

    return (
        <div
            className='finish-game-sign center-horizontal-content'
            style={signStyle}
        >
            <div style={{textAlign: 'center'}}>
                <p className='finish-game-title'><b>YOU WIN!</b></p>
                <p className='finish-game-score'>
                    <b>Total tries: {tileGridState.triesCount}</b>
                </p>
                <br/>
                <PlayAgainButton/>
            </div>
        </div>
    );
};

export default FinishGameSign;
