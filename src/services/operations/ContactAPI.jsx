import React from 'react'
import { setLoading, setToken } from "../../slices/authSlice"
import toast from 'react-hot-toast';

export function AboutPageForm(data) {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            console.log("Logging response: ", data);
            toast.success("Submitted")
        } catch (error) {
            console.log("Error: ", error.message);
            toast.error("Error Occured")
        }
        finally{
            dispatch(setLoading(false));            
        }
    }
}
