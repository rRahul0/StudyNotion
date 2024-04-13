import React, { useState, useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import ProfilrDropDown from "../../core/Auth/ProfileDropDown";

import useOnClickOutside from "../../../hooks/useOnClickOutside";

export default function ResponsiveNav({ loading, subLinks }) {
  const { token } = useSelector((state) => state.auth);
  
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpen(false));


  return (
    <div className="md:hidden relative ">
      <div className="text-richblack-25 text-3xl cursor-pointer   "
      >
      {open? <RxCross2 onClick={()=>setOpen(false)} />:<FaBars onClick={()=>setOpen(true)}  />}

      </div>

      {open && (
        <div
          className={`${
            open ? "flex flex-col gap-2" : "hidden"
          } w-[180px] text-richblack-50 absolute z-30 top-[3rem] right-0 border border-richblack-600 bg-richblack-800 py-4 rounded-md items-center transition-all ease-in-out duration-200`}
          onClick={(e) => e.stopPropagation()}
          ref={ref}
        >
          {/* //   <div className="w-full flex justify-end text-3xl" onClick={() => setOpen(!open)}>
        // <RxCross2 />
        // </div> */}
          <div className="flex flex-col gap-5 items-center">
            <div>
              {token === null && (
                <div className="flex  gap-2 items-center">
                  <Link to="/login">
                    <button
                      className="border border-richblack-700 bg-richblack-700 px-3 py-2 text-richblack-100 rounded-lg"
                      onClick={() => setOpen(false)}
                    >
                      Log in
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button
                      className="border border-richblack-700 bg-richblack-700 px-3 py-2 text-richblack-100 rounded-lg"
                      onClick={() => setOpen(false)}
                    >
                      Sign up
                    </button>
                  </Link>
                </div>
              )}
              {
                // token?console.log("yes"):console.log("no")
                <div className=" flex justify-center items-center">
                  {token && (
                    <ProfilrDropDown ItemClick={() => setOpen(!open)} />
                  )}
                </div>
              }
            </div>

            <div>
              <NavItem
                loading={loading}
                subLinks={subLinks}
                open={open}
                customClass1={"flex-col"}
                customClass2={"block  md:hidden"}
                ItemClick={() => setOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
