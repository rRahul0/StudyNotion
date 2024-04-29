import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    category: localStorage.getItem("category")? JSON.parse(localStorage.getItem("category")): null
}
const categorySlice = createSlice({
    name: 'category',
    initialState: initialState,
    reducers:{
        setCategory(state, value){
            state.category = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
    }
})

export const {setCategory, setLoading} = categorySlice.actions;
export default categorySlice.reducer;