import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    podcast: null
}

const podDetailsSlice = createSlice({
    name: "podcast",
    initialState,
    reducers: {
        setPodcast: (state, action) => {
            state.podcast = action.payload;
        }
    }
});

export const { setPodcast } = podDetailsSlice.actions;
export default podDetailsSlice.reducer;