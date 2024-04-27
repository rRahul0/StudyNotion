import { useSelector } from "react-redux"

import frameImg from "../../../assets/Images/frame.png"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import Loader from "../../common/Loader"
import { useState } from "react"

function Template({ title, desc1, desc2, image, formtype }) {
  const { loading } = useSelector((state) => state.auth)
  const [admin, setAdmin] = useState(false)
  return (
    <>
      <div className="m-3 p-2 border-2 border-richblack-5 bg-richblack-300 w-20 rounded-3xl flex justify-center items-center text-richblack-5 cursor-pointer" onClick={()=>setAdmin(true)}>Admin</div>
      <div className="grid min-h-[calc(100vh-8.5rem)] place-items-center">
        {loading ? (
          <Loader />
        ) : (
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">

            <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
              <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                {title}
              </h1>
              <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
                <span className="text-richblack-100">{desc1}</span>{" "}
                <span className="font-edu-sa font-bold italic text-blue-100">
                  {desc2}
                </span>
              </p>
              {formtype === "signup" ? <SignupForm admin={admin} /> : <LoginForm admin={admin} />}
            </div>
            <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
              <img
                src={frameImg}
                alt="Pattern"
                width={558}
                height={504}
                loading="lazy"
              />
              <img
                src={image}
                alt="Students"
                width={558}
                height={504}
                loading="lazy"
                className="absolute -top-4 right-4 z-10"
              />
            </div>
          </div>
        )}
      </div>
    </>

  )
}

export default Template