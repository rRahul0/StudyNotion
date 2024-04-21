import React from 'react'
import { apiConnector } from '../apiConnector';
import { settingsEndpoints } from '../apis'
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { setUser } from "../../slices/profileSlice"
import { logout } from './authAPI';
import { localStorageDelete } from "../localStorageDelete"


const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API
} = settingsEndpoints

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading ...")
    if (localStorageDelete()) { toast.dismiss(toastId); return }
    try {

      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${token}`,
        }
      )
      console.log(
        "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
        response
      )
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Display Picture Updated Successfully")
      dispatch(setUser(response.data?.data))
      localStorage.setItem("user", JSON.stringify({value:response.data?.data, expiry:Date.now()+1000*60*60*24*7}))
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API ERROR............", error)
      toast.error("Could Not Update Display Picture")
    }
    toast.dismiss(toastId)
  }
}


export function updateProfile(token, formData) {

  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    if (localStorageDelete()) { toast.dismiss(toastId); return }
    try {

      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      })
      console.log("UPDATE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const newUser = JSON.parse(localStorage.getItem("user"))

      newUser.value.additionalDetails = response.data.profileDetails
// dispatch(setUser(newUser.value))
      localStorage.setItem("user", JSON.stringify({ value: newUser.value, expiry: newUser.expiry }))
      dispatch(setUser(JSON.parse(localStorage.getItem("user")).value))

      toast.success("Profile Updated Successfully")
    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Update Profile")
    }
    toast.dismiss(toastId)
  }
}


export async function changePassword(token, formData) {
  const toastId = toast.loading("Loading...")
  if (localStorageDelete()) { toast.dismiss(toastId); return }

  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CHANGE_PASSWORD_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Password Changed Successfully")
  } catch (error) {
    console.log("CHANGE_PASSWORD_API API ERROR............", error)
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId)
}


export function deleteProfile(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      if (localStorageDelete()) { toast.dismiss(toastId); return }

      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile Deleted Successfully")
      dispatch(logout(navigate))
      localStorage.clear()

    } catch (error) {
      console.log("DELETE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Delete Profile")
    }
    toast.dismiss(toastId)
  }
}