import store from "../store";

export const getTile = (tiles, line, column) => tiles.find(
    tile => tile.line === line && tile.column === column
);

export const getRandInt = (min, max) => Math.floor(
    Math.random() * (max - min + 1) + min
);

export const dispatchAction = (action, payload) => store.dispatch(
    {type: action.toString(), payload}
);
