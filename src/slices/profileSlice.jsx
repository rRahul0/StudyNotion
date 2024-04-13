import { createSlice } from '@reduxjs/toolkit'
// import { set } from 'react-hook-form';
const initialState = {
    loading: false,
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")):null,
    open: true,
}
const profileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers:{
        setUser(state, value){
            state.user = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
        setOpen(state, value){
            state.open = value.payload;
        }
    }
})

export const {setUser, setLoading, setOpen} = profileSlice.actions;
export default profileSlice.reducer;