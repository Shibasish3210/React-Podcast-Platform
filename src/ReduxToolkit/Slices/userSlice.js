import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    users: null
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        clearUsers: (state, action) => {
            state.users = null;
        }
    }
});

export const { setUsers, clearUsers } = userSlice.actions;
export default userSlice.reducer;