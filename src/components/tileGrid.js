import Tile from './tile'
import {getRandColor} from "../util";

const TileGrid = ({tilesCount, cssGap}) => {
    return (
        <div style={{
            display: 'grid',
            placeItems: 'center',
            gridTemplateColumns: `repeat(${tilesCount}, 1fr)`,
            gridTemplateRows: `repeat(${tilesCount}, 1fr)`,
            gap: cssGap,
            paddingLeft: cssGap,
            paddingTop: cssGap,
            width: `calc(${cssGap} * (2 + ${tilesCount}) + 10vh * ${tilesCount})`
        }}>{
            Array.apply(null, {length: tilesCount * tilesCount}).map((e, i) => (
                <Tile color={getRandColor()}/>
            ))
        }</div>
    );
}

export default TileGrid;
