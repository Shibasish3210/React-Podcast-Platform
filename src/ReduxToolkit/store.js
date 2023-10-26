import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import podcastsReducer from "./Slices/podcastSlice";
import podcastReducer from "./Slices/currPodcatSlice";

const store = configureStore({
    reducer: {
        users : userReducer,
        podcasts : podcastsReducer,
        podcast: podcastReducer
    }
});

export default store;