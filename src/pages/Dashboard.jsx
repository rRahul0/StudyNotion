import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setOpen } from "../slices/profileSlice";
import Sidebar from "../components/core/Dashboard/Sidebar";
import Loader from "../components/common/Loader";
import { FaGreaterThan } from "react-icons/fa";
import { FaLessThan } from "react-icons/fa";
import useOnClickOutside from "../hooks/useOnClickOutside";

export default function Dashboard() {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading, open } = useSelector(
    (state) => state.profile
  );
  const ref = useRef(null);
  const dispatch = useDispatch();
  if (profileLoading || authLoading) {
    return <Loader />;
  }
  useOnClickOutside(ref, () => dispatch(setOpen(false)));

  return (
    <div className="flex relative ">
      <div className="relative  md:relative flex " ref={ref}>
        <div className="hidden md:block">
          <Sidebar />
        </div> 
        
        <div className="md:hidden">{open && <Sidebar />}</div>
        
      </div>

      {/* modal hidden */}
      <div className="h-[calc(100vh-3.6rem)]  w-full  ">
        <div className="h-full mx-auto overflow-y-auto lg:overflow-x-hidden pt-5 max-[350px]:px-5 px-[10%] md:flex flex-col gap-5 items-center ">
          <div
            className="md:hidden relative -left-[10%] ">
            <div className=" text-richblack-100 flex justify-center items-center  w-10 h-10 rounded-full bg-richblack-600 "
            onClick={() => dispatch(setOpen(!open))}
            >
            <FaGreaterThan />
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
