import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import podcastReducer from "./Slices/currPodcatSlice";

const store = configureStore({
    reducer: {
        users : userReducer,
        podcast: podcastReducer
    }
});

export default store;