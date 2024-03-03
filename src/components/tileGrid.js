import Tile from './tile'
import {useSelector} from "react-redux";

const cssGap = '0.4vh';

const TileGrid = () => {
    const tiles = useSelector(state => state.tileGrid.tiles);

    // the length of `tiles` is always equal to `tilesInLineCount * tilesInLineCount`
    const tilesInLineCount = Math.sqrt(tiles.length);

    return (
        <div style={{
            display: 'grid',
            placeItems: 'center',
            gridTemplateColumns: `repeat(${tilesInLineCount}, 1fr)`,
            gridTemplateRows: `repeat(${tilesInLineCount}, 1fr)`,
            gap: cssGap,
            paddingLeft: cssGap,
            paddingTop: cssGap,
            width: `calc(${cssGap} * (2 + ${tilesInLineCount}) + 10vh * ${tilesInLineCount})`
        }}>{
            tiles.map(tile => <Tile color={tile.color} line={tile.line} column={tile.column}/>)
        }</div>
    );
}

export default TileGrid;
