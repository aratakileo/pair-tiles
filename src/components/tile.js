import {useDispatch, useSelector} from "react-redux";
import {onTileClick, makeTileBacked} from "../store/tileGridSlice";
import {dispatchAction} from "../util";
import './tile.css'
import {useEffect} from "react";
import {getTileInfo, isBacked, isTransientFronted} from "../store/tileInfo";

const Tile = ({line, column}) => {
    const dispatch = useDispatch();
    const tileGridState = useSelector(state => state.tileGrid);
    const tileInfo = getTileInfo(tileGridState.tileInfos, line, column);

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
    const showTileIcon = isFronted && tileGridState.altModeEnabled;

    let tileBgColor = '#ffffff';

    if (isFronted) tileBgColor = showTileIcon ? 'var(--accent-color)' : tileInfo.style.color;

    return (
        <div className='tile-container'>
            <div className={'tile show-tile-' + (isFronted ? 'front' : 'back')}
                 style={{backgroundColor: tileBgColor}}
                 onClick={() => dispatch(onTileClick({line, column}))}
            >
                {showTileIcon ? <img className='tile-icon' src={tileInfo.style.icon} alt='tile icon'/> : null}
            </div>
        </div>
    );
}

export default Tile;
