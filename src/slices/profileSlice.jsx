import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast';
export const localStorageDelete = () => {
    const userToken = JSON.parse(localStorage.getItem("user"))
    console.log(userToken.expiry-Date.now())
    if (userToken?.expiry < Date.now()) {
        console.log("bdfsh")
        if(localStorage.getItem("user"))localStorage.removeItem("user")
        // if(localStorage.getItem("token"))localStorage.removeItem("token")
        toast.error("Session Expired. Please Login Again")
        return true
    }return false
}
const initialState = {
    loading: false,
    user: localStorageDelete()? null:JSON.parse(localStorage.getItem("user"))?.value,
    open: false,
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