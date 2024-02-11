import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading: false,
    users: [],
    error: null
}

export const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
    return axios
        .get(`http://localhost:3000/users`)
        .then((str) => str.data)
        .catch((error) => error.message);
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (developer) => {
        developer.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
        });
        developer.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
            state.error = null;
        });
        developer.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = true;
            state.users = [];
            state.error = action.payload
        });
    }
})

// export {fetchUsers}
export default userSlice.reducer
