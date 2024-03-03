import {createSlice} from "@reduxjs/toolkit";
import {getTile} from "../util";
import getRandColors from "../util/colorGenerator";

export const TileState = {
    DEFAULT: 'default',
    FACED: 'faced',
    LOCKED_AND_FACED: 'locked_and_faced',
    FAIL_DEMO: 'fail_demo'
};

const getNewTileGridState = (tilesInLineCount) => {
    const state = [];
    const colorPalette = getRandColors(tilesInLineCount * tilesInLineCount / 2);
    const colors = colorPalette.concat(colorPalette);

    for (const column of Array(tilesInLineCount).keys())
        for (const line of Array(tilesInLineCount).keys()) {
            const colorIndex = Math.floor(Math.random() * colors.length);

            state.push({
                line,
                column,
                color: colors[colorIndex],
                state: TileState.DEFAULT
            });

            colors.splice(colorIndex, 1);
        }

    return state;
};

const tileGridSlice = createSlice({
    name: 'tileGrid',
    initialState: {
        tiles: getNewTileGridState(4),
        processingTilesPair: [],
        roundsCount: 0,
        facedAndLockedTilePairsCount: 0
    },
    reducers: {
        onTileSelect(state, action) {
            const tilePos = [action.payload.line, action.payload.column];
            const tile = getTile(state.tiles, ...tilePos);

            if (tile.state === TileState.LOCKED_AND_FACED || tile.state === TileState.FAIL_DEMO) return;

            if (tile.state === TileState.FACED)
                tile.state = TileState.DEFAULT;
            else tile.state = TileState.FACED;

            if (tile.state === TileState.DEFAULT) {
                state.processingTilesPair.splice(state.processingTilesPair.indexOf(tilePos), 1);
                return;
            }

            state.processingTilesPair.push(tilePos);

            if (state.processingTilesPair.length < 2) return;

            const firstTile = getTile(state.tiles, ...state.processingTilesPair[0]);
            const secondTile = getTile(state.tiles, ...state.processingTilesPair[1]);

            if (firstTile.color === secondTile.color) {
                firstTile.state = TileState.LOCKED_AND_FACED;
                secondTile.state = TileState.LOCKED_AND_FACED;

                state.facedAndLockedTilePairsCount++;
            } else {
                firstTile.state = TileState.FAIL_DEMO;
                secondTile.state = TileState.FAIL_DEMO;

                state.roundsCount++;
            }

            state.processingTilesPair = [];
        },
        finishTileFailDemoState(state, action) {
            const tile = getTile(state.tiles, action.payload.line, action.payload.column);

            tile.state = TileState.DEFAULT;
        }
    }
});

export default tileGridSlice.reducer;
export const {onTileSelect, finishTileFailDemoState} = tileGridSlice.actions;
