import {CSS_GRID_GAP, CSS_GRID_SIZE} from "../util/constants";
import "./finishGameSign.css";

const FinishGameSign = () => {
    return (<div className='finish-game-sign-container' style={{
        width: CSS_GRID_SIZE,
        height: CSS_GRID_SIZE,
        padding: CSS_GRID_GAP
    }}>
        <p className='finish-game-sign'><b>YOU WIN!</b></p>
    </div>);
};

export default FinishGameSign;
