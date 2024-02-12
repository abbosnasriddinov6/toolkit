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
export const postUsers = createAsyncThunk('user/postUsers', (user) => {
    return axios
        .post('http://localhost:3000/users', user, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.data)
        .catch((err) => err.message);
});



export const deleteUsers = createAsyncThunk('user/deleteUsers', async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`http://localhost:3000/users/${id && id}`)
    } catch (error) {
        return rejectWithValue(error.message)
    }
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
        developer.addCase(postUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        developer.addCase(postUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        });
        developer.addCase(postUsers.rejected, (state, action) => {
            state.loading = false;
            state.users = [];
            state.error = action.error.payload;
        });
        developer.addCase(deleteUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        developer.addCase(deleteUsers.fulfilled, (state) => {
            state.loading = false;
        });
        developer.addCase(deleteUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

    }
})

// export {fetchUsers}
export default userSlice.reducer
