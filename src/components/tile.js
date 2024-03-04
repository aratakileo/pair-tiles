import {useDispatch, useSelector} from "react-redux";
import {onTileClick, makeTileBacked} from "../store/tileGridSlice";
import {dispatchAction} from "../util";
import './tile.css'
import {useEffect} from "react";
import {getTileInfo, isBacked, isTransientFronted} from "../store/tileInfo";

const Tile = ({color, line, column}) => {
    const dispatch = useDispatch();
    const tileInfos = useSelector(state => state.tileGrid.tileInfos);
    const tileInfo = getTileInfo(tileInfos, line, column);

    useEffect(() => {
        if (!isTransientFronted(tileInfo)) return undefined;

        const timeOutId = setTimeout(() => {
            /*
             *
             * The tile status is changed in this way
             * because the state values cannot be changed outside the redux store actions
             *
             */
            dispatchAction(makeTileBacked, {line, column});
        }, 500);

        return () => clearTimeout(timeOutId);
    }, [line, column, tileInfo]);

    const isFronted = !isBacked(tileInfo);

    return (
        <div className='tile-container'>
            <div className={'tile show-tile-' + (isFronted ? 'front' : 'back')}
                 style={{backgroundColor: isFronted ? color : '#ffffff'}}
                 onClick={() => dispatch(onTileClick({line, column}))}
            />
        </div>
    );
}

export default Tile;
