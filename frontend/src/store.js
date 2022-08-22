import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counterSlice.js';

export default configureStore({
    reducer: {
        counter: counterReducer,
    },
});
