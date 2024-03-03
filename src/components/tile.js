import {useDispatch, useSelector} from "react-redux";
import {onTileSelect, finishTileFailDemoState, TileState} from "../store/tileGridSlice";
import {dispatchAction, getTile} from "../util";
import './tile.css'
import {useEffect} from "react";

const Tile = ({color, line, column}) => {
    const dispatch = useDispatch();
    const tiles = useSelector(state => state.tileGrid.tiles);
    const tile = getTile(tiles, line, column);
    const className = 'tile ' + (tile.state !== TileState.DEFAULT ? 'front' : 'back');

    useEffect(() => {
        if (tile.state !== TileState.FAIL_DEMO) return undefined;

        const timeOutId = setTimeout(() => {
            dispatchAction(finishTileFailDemoState, {line, column});
        }, 500);

        return () => clearTimeout(timeOutId);
    }, [line, column, tile.state]);

    return (
        <div className='tile-container'>
            <div className={className} style={{
                backgroundColor: tile.state !== TileState.DEFAULT ? color : '#ffffff'
            }} onClick={() => dispatch(onTileSelect({line, column}))}/>
        </div>
    );
}

export default Tile;
