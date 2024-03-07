export const TileStatus = {
    /**
     * Means that the color (image) of the tile is hidden. It is the default status for all tiles when the game starts
     */
    BACKED: 'backed',
    /**
     * Means that the color (image) of the tile is shown.
     * Replaces {@link TileStatus.BACKED} when the user clicks on the tile
     */
    FRONTED: 'fronted',
    /**
     * Means that the color (image) of the tile is shown and the tile can no longer be clicked by the user.
     * Depending on the settings (parameter: {@link selectedPairsDisappearance}), it may also be that instead
     * of the previously described behavior, the tile will simply disappear.
     *
     * It is the final status.
     * Replaces {@link TileStatus.FRONTED} of two identical tiles at the moment when the user selected such tiles.
     */
    FRONTED_AND_UNFLIPPABLE: 'fronted-and-unflippable',
    /**
     * This means that the color (image) of the tile will only be displayed for 0.5s.
     * During this time, the tile cannot be clicked by the user.
     * Replaces {@link TileStatus.FRONTED} of two non-identical tiles at the moment when the user selected such tiles.
     * This status is necessary to show the user that it has chosen the wrong combination
     */
    TRANSIENT_FRONTED: 'transient-fronted'
};

export const getTileInfo = (tiles, line, column) => tiles.find(
    tile => tile.line === line && tile.column === column
);

/*
 *
 * These methods below have been implemented to improve the readability of the code.
 * Instead of implementing these methods inside the class, they were implemented this way for the reason:
 * https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state
 *
 */
export const isBacked = (tileInfo) => {
    return tileInfo.status === TileStatus.BACKED;
}

export const isFronted = (tileInfo) => {
    return tileInfo.status === TileStatus.FRONTED;
}

export const isFrontedAndUnflippable = (tileInfo) => {
    return tileInfo.status === TileStatus.FRONTED_AND_UNFLIPPABLE;
}

export const isTransientFronted = (tileInfo) => {
    return tileInfo.status === TileStatus.TRANSIENT_FRONTED;
}
