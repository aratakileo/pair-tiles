import Tile from './tile'
import {useSelector} from "react-redux";
import {CSS_GRID_GAP, AXIS_TILES_COUNT} from "../util/constants";
import FinishGameSign from "./finishGameSign";

const TileGrid = () => {
    const tileGridState = useSelector(state => state.tileGrid);
    const isGameFinished = tileGridState.guessedCombinationsCount * 2 === tileGridState.tileInfos.length;
    const blurGrid = isGameFinished && !tileGridState.selectedPairsDisappearance;
    const tiles = tileGridState.tileInfos.map(
        tileInfo => <Tile
            line={tileInfo.line}
            column={tileInfo.column}
            key={`${tileInfo.line}:${tileInfo.column}`}  // React recommends adding this parameter
        />
    );

    return (
        <div className='center-horizontal-content' style={{margin: '2vh 0 2vh 0'}}>
            <div className={blurGrid ? 'tile-grid-blur' : ''} style={{
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
