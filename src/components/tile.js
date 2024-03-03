import {useDispatch, useSelector} from "react-redux";
import {onTileSelect} from "../store/tileGridSlice";
import {getTile} from "../util";
import './tile.css'

const Tile = ({color, line, column}) => {
    const dispatch = useDispatch();
    const tiles = useSelector(state => state.tileGrid.tiles);
    const tile = getTile(tiles, line, column);

    return (
        <div>
            <div className="tile" style={{
                backgroundColor: tile.isFaced ? color : '#ffffff'
            }} onClick={() => dispatch(onTileSelect({line, column}))}/>
        </div>
    );
}

export default Tile;
