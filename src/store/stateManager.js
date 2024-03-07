import getRandBrightColors from "../util/colorGenerator";
import {AXIS_TILES_COUNT, TILE_PAIRS_COUNT} from "../util/constants";
import {getRandIndex, getTileIconPath} from "../util";
import {TileStatus} from "./tileInfo";

const getNewTileInfos = () => {
    const tileInfos = [];
    const tileStylePalette = getRandBrightColors(TILE_PAIRS_COUNT).map(
        (color, index) => ({color, icon: getTileIconPath(index)})
    );
    const tileStyles = tileStylePalette.concat(tileStylePalette);

    for (const column of Array(AXIS_TILES_COUNT).keys())
        for (const line of Array(AXIS_TILES_COUNT).keys()) {
            const colorIndex = getRandIndex(tileStyles.length);

            tileInfos.push({line, column, style: tileStyles[colorIndex], status: TileStatus.BACKED});
            tileStyles.splice(colorIndex, 1);
        }

    return tileInfos;
};

export const getNewState = (
    bestTriesCount = 0,
    altMode = false,
    selectedPairsDisappearance = true
) => ({
    tileInfos: getNewTileInfos(),
    processingTilesPair: [],
    triesCount: {
        current: 0,
        best: bestTriesCount,
        newRecord: false
    },
    guessedCombinationsCount: 0,
    gameFinished: false,
    altMode,
    selectedPairsDisappearance
});

export const saveState = (state) => {
    localStorage.setItem('tileGridState', JSON.stringify(state));
};

export const getLoadedState = () => {
    const loadedState = localStorage.getItem('tileGridState');

    // `Object.assign(...)` is used to migrate to new state format in case if it is necessary
    return loadedState == null ? getNewState() : Object.assign(getNewState(), JSON.parse(loadedState));
};
