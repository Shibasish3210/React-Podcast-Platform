import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    podcast: null,
    episodes: [],
    currEpisode:null
}

const podcastSlice = createSlice({
    name: "podcast",
    initialState,
    reducers: {
        setPodcast: (state, action) => {
            state.podcast = action.payload;
        },
        setEpisodes: (state, action) => {
            state.episodes = action.payload;
        },
        setCurrEpisode: (state, action) => {
            state.currEpisode = action.payload;
        }
    }
});

export const { setPodcast, setEpisodes, setCurrEpisode } = podcastSlice.actions;
export default podcastSlice.reducer;