import Tile from './tile'
import {useSelector} from "react-redux";
import './tileGrid.css'
import {CSS_GRID_GAP, AXIS_TILES_COUNT} from "../util/constants";
import FinishGameSign from "./finishGameSign";

const TileGrid = () => {
    const tileGridState = useSelector(state => state.tileGrid);
    const isGameFinished = tileGridState.guessedCombinationsCount * 2 === tileGridState.tileInfos.length;
    const tiles = tileGridState.tileInfos.map(
        tileInfo => <Tile
            color={tileInfo.color}
            line={tileInfo.line}
            column={tileInfo.column}
            key={`${tileInfo.line}:${tileInfo.column}`}  // React recommends adding this parameter
        />
    );

    return (
        <div className='tile-grid-container'>
            <div className={isGameFinished ? 'tile-grid-blur' : ''} style={{
                display: 'grid',
                placeItems: 'center',
                gridTemplateColumns: `repeat(${AXIS_TILES_COUNT}, 1fr)`,
                gridTemplateRows: `repeat(${AXIS_TILES_COUNT}, 1fr)`,
                gap: CSS_GRID_GAP
            }}>{tiles}</div>
            {isGameFinished ? <FinishGameSign/> : null}
        </div>
    );
}

export default TileGrid;
