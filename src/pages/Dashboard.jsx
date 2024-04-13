import React, {useRef} from "react";
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
          <div className="hidden md:block"><Sidebar /></div>
          <div className="md:hidden">{open && <Sidebar />}</div>
          <div className={`text-white relative top-[50%] ${open? "left-[222px]":"left-0"} z-0 w-[18px] h-20 rounded-r-3xl border-r-2 flex justify-end items-center pr-1 md:hidden bg-richblack-800`}
          onClick={()=>dispatch(setOpen(!open))}
          >
            {open ? <FaLessThan /> : <FaGreaterThan />}
          </div>
        </div>
  
      {/* modal hidden */}
      <div className="h-[calc(100vh-3.5rem)]  w-full ">
      
        <div className=" h-full mx-auto overflow-y-auto py-5 px-[10%] ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
