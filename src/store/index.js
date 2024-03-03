import {configureStore} from '@reduxjs/toolkit'
import tileGridReducer from "./tileGridSlice";

export default configureStore({
    reducer: {
        tileGrid: tileGridReducer
    }
});
