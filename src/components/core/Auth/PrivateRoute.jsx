import React, { useEffect } from 'react'
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { setToken } from "../../../slices/authSlice"
import { useDispatch } from "react-redux"
import toast from 'react-hot-toast'



export default function PrivateRoute({ children }) {
  const location = useLocation()
  const { token } = useSelector((state) => state.auth)
  const expiry = JSON.parse(localStorage.getItem("data")).expire
  const dispatch = useDispatch()
  useEffect(() => {
    if (expiry<Date.now()){ 
      toast.error("Session Expired")
      dispatch(setToken(null));
    }
  }, [location]);

  if (token === null) {
    return <Navigate to="/login" />
  } else {
    return children

  }
}
