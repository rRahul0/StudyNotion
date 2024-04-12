import React from 'react'
import ChangeProfilePicture from "./ChangeProfilePicture";
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"


export default function Settings() {
  return (
    <div className=' w-full lg:w-[800px] px-20'>
      <h1 className=" mb-14 text-3xl font-medium text-richblack-5">Edit Profile</h1>
      {/* Change Profile Picture */}
      <ChangeProfilePicture />


      {/* Profile */}
      <EditProfile />


      {/* Password */}
      <UpdatePassword />


      {/* Delete Account */}
      <DeleteAccount />
    </div>
  )
}
