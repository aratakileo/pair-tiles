import {createSlice} from "@reduxjs/toolkit";
import {getRandIndex} from "../util";
import getRandBrightColors from "../util/colorGenerator";
import {AXIS_TILES_COUNT} from "../util/constants";
import {getTileInfo, isBacked, isFronted, isFrontedAndUnflippable, isTransientFronted, TileStatus} from "./tileInfo";

const getNewTileInfos = () => {
    const tileInfos = [];
    const colorPalette = getRandBrightColors(AXIS_TILES_COUNT * AXIS_TILES_COUNT / 2);
    const colors = colorPalette.concat(colorPalette);

    for (const column of Array(AXIS_TILES_COUNT).keys())
        for (const line of Array(AXIS_TILES_COUNT).keys()) {
            const colorIndex = getRandIndex(colors.length);

            tileInfos.push({line, column, color: colors[colorIndex], status: TileStatus.BACKED});
            colors.splice(colorIndex, 1);
        }

    return tileInfos;
};

const getNewState = () => {
    return {
        tileInfos: getNewTileInfos(),
            processingTilesPair: [],
            triesCount: 0,
            guessedCombinationsCount: 0
    };
};

const tileGridSlice = createSlice({
    name: 'tileGrid',
    initialState: getNewState(),
    reducers: {
        onTileClick(state, action) {
            const tilePos = [action.payload.line, action.payload.column];
            const tileInfo = getTileInfo(state.tileInfos, ...tilePos);

            if (isFrontedAndUnflippable(tileInfo) || isTransientFronted(tileInfo)) return;

            tileInfo.status = isFronted(tileInfo) ? TileStatus.BACKED : TileStatus.FRONTED;

            if (isBacked(tileInfo)) {
                state.processingTilesPair.splice(state.processingTilesPair.indexOf(tilePos), 1);
                return;
            }

            state.processingTilesPair.push(tilePos);

            if (state.processingTilesPair.length < 2) return;

            const firstTileInfo = getTileInfo(state.tileInfos, ...state.processingTilesPair[0]);
            const secondTileInfo = getTileInfo(state.tileInfos, ...state.processingTilesPair[1]);

            if (firstTileInfo.color === secondTileInfo.color) {
                firstTileInfo.status = TileStatus.FRONTED_AND_UNFLIPPABLE;
                secondTileInfo.status = TileStatus.FRONTED_AND_UNFLIPPABLE;

                state.guessedCombinationsCount++;
            } else {
                firstTileInfo.status = TileStatus.TRANSIENT_FRONTED;
                secondTileInfo.status = TileStatus.TRANSIENT_FRONTED;

                state.triesCount++;
            }

            state.processingTilesPair = [];
        },
        makeTileBacked(state, action) {
            const tileInfo = getTileInfo(state.tileInfos, action.payload.line, action.payload.column);

            tileInfo.status = TileStatus.BACKED;
        },
        restartGame(state, action) {
            return getNewState();
        }
    }
});

export default tileGridSlice.reducer;
export const {onTileClick, makeTileBacked, restartGame} = tileGridSlice.actions;
