import Tile from './tile'
import {useSelector} from "react-redux";
import './tileGrid.css'

const cssGap = '0.4vh';

const TileGrid = () => {
    const tileGridState = useSelector(state => state.tileGrid);

    // the length of `tileGridState.tiles` is always equal to `tilesInLineCount * tilesInLineCount`
    const tilesInLineCount = Math.sqrt(tileGridState.tiles.length);
    const gridSize = `calc(${cssGap} * (2 + ${tilesInLineCount}) + 10vh * ${tilesInLineCount})`;
    const winSignClassName = 'win-sign-container ' + (
        tileGridState.facedAndLockedTilePairsCount * 2 === tileGridState.tiles.length ? 'show-win-sign' : ''
    );

    return (
        <div className='grid-container'>
            <div style={{
                display: 'grid',
                placeItems: 'center',
                gridTemplateColumns: `repeat(${tilesInLineCount}, 1fr)`,
                gridTemplateRows: `repeat(${tilesInLineCount}, 1fr)`,
                gap: cssGap,
                padding: cssGap,
                width: gridSize,
            }}>
                {tileGridState.tiles.map(
                    tile => <Tile color={tile.color} line={tile.line} column={tile.column}/>
                )}
            </div>
            <div className={winSignClassName} style={{
                width: gridSize,
                height: gridSize,
                padding: cssGap
            }}>
                <p className='win-sign'><b>YOU WIN!</b></p>
            </div>
        </div>
    );
}

export default TileGrid;
