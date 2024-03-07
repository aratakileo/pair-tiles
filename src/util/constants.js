export const AXIS_TILES_COUNT = 4;
export const TILE_PAIRS_COUNT = AXIS_TILES_COUNT * AXIS_TILES_COUNT / 2;

// CSS values
export const CSS_GRID_GAP = '0.4vh';
export const CSS_GRID_SIZE = `calc(${CSS_GRID_GAP} * (2 + ${AXIS_TILES_COUNT}) + 10vh * ${AXIS_TILES_COUNT})`;
