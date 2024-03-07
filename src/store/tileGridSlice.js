import {createSlice} from "@reduxjs/toolkit";
import {getTileInfo, isBacked, isFronted, isFrontedAndUnflippable, isTransientFronted, TileStatus} from "./tileInfo";
import {getLoadedState, getNewState, saveState} from "./stateManager";
import {TILE_PAIRS_COUNT} from "../util/constants";

const tileGridSlice = createSlice({
    name: 'tileGrid',
    initialState: getLoadedState(),
    reducers: {
        onTileClick(state, action) {
            const tilePos = [action.payload.line, action.payload.column];
            const tileInfo = getTileInfo(state.tileInfos, ...tilePos);

            if (isFrontedAndUnflippable(tileInfo) || isTransientFronted(tileInfo)) {
                saveState(state);
                return;
            }

            tileInfo.status = isFronted(tileInfo) ? TileStatus.BACKED : TileStatus.FRONTED;

            if (isBacked(tileInfo)) {
                state.processingTilesPair.splice(state.processingTilesPair.indexOf(tilePos), 1);
                saveState(state);
                return;
            }

            state.processingTilesPair.push(tilePos);

            if (state.processingTilesPair.length < 2) {
                saveState(state);
                return;
            }

            const firstTileInfo = getTileInfo(state.tileInfos, ...state.processingTilesPair[0]);
            const secondTileInfo = getTileInfo(state.tileInfos, ...state.processingTilesPair[1]);

            if (firstTileInfo.style.color === secondTileInfo.style.color) {
                firstTileInfo.status = TileStatus.FRONTED_AND_UNFLIPPABLE;
                secondTileInfo.status = TileStatus.FRONTED_AND_UNFLIPPABLE;

                state.guessedCombinationsCount++;
            } else {
                firstTileInfo.status = TileStatus.TRANSIENT_FRONTED;
                secondTileInfo.status = TileStatus.TRANSIENT_FRONTED;

                state.triesCount.current++;
            }

            state.processingTilesPair = [];

            if (state.guessedCombinationsCount === TILE_PAIRS_COUNT) {
                state.gameFinished = true;
                state.triesCount.newRecord = state.triesCount.current < state.triesCount.best;

                if (state.triesCount.newRecord) state.triesCount.best = state.triesCount.current;
            }

            saveState(state);
        },
        makeTileBacked(state, action) {
            const tileInfo = getTileInfo(state.tileInfos, action.payload.line, action.payload.column);

            tileInfo.status = TileStatus.BACKED;

            saveState(state);
        },
        restartGame(state, action) {
            const newState = getNewState(state.triesCount.best, state.altMode, state.selectedPairsDisappearance);

            saveState(newState);

            return newState; // If an action returns a value, then that value becomes a new state
        },
        toggleAltModeEnabled(state, action) {
            state.altMode = !state.altMode;

            saveState(state);
        },
        toggleSelectedPairsDisappearanceEnabled(state, action) {
            state.selectedPairsDisappearance = !state.selectedPairsDisappearance;

            saveState(state);
        }
    }
});

export default tileGridSlice.reducer;
export const {
    onTileClick,
    makeTileBacked,
    restartGame,
    toggleAltModeEnabled,
    toggleSelectedPairsDisappearanceEnabled
} = tileGridSlice.actions;
