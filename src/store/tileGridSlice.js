import {createSlice} from "@reduxjs/toolkit";
import {getRandColor, getTile} from "../util";

const getNewTileGridState = (tilesInLineCount) => {
    const state = [];

    for (const column of Array(tilesInLineCount).keys())
        for (const line of Array(tilesInLineCount).keys())
            state.push({
                line,
                column,
                color: getRandColor(),
                isFaced: false
            });

    return state;
};

const tileGridSlice = createSlice({
    name: 'tileGrid',
    initialState: {
        tiles: getNewTileGridState(5)
    },
    reducers: {
        onTileSelect(state, action) {
            const tile = getTile(state.tiles, action.payload.line, action.payload.column);

            tile.isFaced = !tile.isFaced;
        }
    }
});

export default tileGridSlice.reducer;
export const {onTileSelect} = tileGridSlice.actions;
