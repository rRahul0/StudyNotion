import { createSlice } from '@reduxjs/toolkit'
import { localStorageDelete } from '../services/localStorageDelete';
const initialState = {
    signupData: null,
    loading: false,
    token: localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")).token:null,
}
const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setSignupData(state, value) {
            state.signupData = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },

        setToken(state, value) {
            state.token = value.payload
        }
    }
})

export const { setSignupData, setLoading, setToken } = authSlice.actions;
export default authSlice.reducer;