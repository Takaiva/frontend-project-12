import { configureStore } from "@reduxjs/toolkit";
import channelsReducer from "./channelsSlice.js";
import messagesReducer from "./chatFieldSlice.js";

export default configureStore({
    reducer: {
        channels: channelsReducer,
        messages: messagesReducer,
    },
});
