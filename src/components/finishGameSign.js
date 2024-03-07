import "./finishGameSign.css";
import {useSelector} from "react-redux";
import PlayAgainButton from "./playAgainButton";
import {CSS_GRID_SIZE} from "../util/constants";

const FinishGameSign = () => {
    const triesCount = useSelector(state => state.tileGrid.triesCount);

    return (
        <div
            className='finish-game-sign center-horizontal-content'
            style={{width: CSS_GRID_SIZE, height: CSS_GRID_SIZE}}
        >
            <div className='finish-game-sign-content'>
                <p className='finish-game-sign-title'><b>YOU WIN!</b></p>
                <p className='finish-game-sign-score'><b>Total tries: {triesCount}</b></p>
                <br/>
                <PlayAgainButton/>
            </div>
        </div>
    );
};

export default FinishGameSign;
