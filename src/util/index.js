import store from "../store";

export const getRandInt = (min, max) => Math.floor(
    Math.random() * (max - min + 1) + min
);

export const getRandIndex = (length) => Math.floor(Math.random() * length);

export const dispatchAction = (action, payload) => store.dispatch(
    {type: action.toString(), payload}
);
