import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath } from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfilrDropDown from "../core/Auth/ProfileDropDown";
import toast from "react-hot-toast";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false)

  const fetchSubLinks = async () => {
    try {
      // const id = toast.loading("Loading...")
      setLoading(true)
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setSubLinks(result.data.allTags);
      // console.log(result.data.allTags);
      setLoading(false)
      // toast.dismiss(id)
    } catch (error) {
      console.log("Could not fetch the category list");
    }
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);

  const matchRoute = (route) => matchPath({ path: route }, location.pathname);

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="w-9/12 max-w-maxContent mx-auto flex justify-between items-center  ">
        <Link to="/">
          <img src={logo} width={160} height={42} />
        </Link>

        <nav className="hidden md:block">
          <ul className="flex gap-5 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div
                    className={`group relative flex cursor-pointer items-center gap-1 ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                  >
                    <p>{link.title}</p>
                    <IoIosArrowDropdownCircle />
                    <div className="invisible absolute box-border flex flex-col rounded-xl bg-richblack-5 p-4 text-richblack-600 opacity-0 transition-all duration-500 group-hover:visible group-hover:opacity-100 sm:w-[175px] left-[10%] translate-x-[-50%] translate-y-[25%] top-[50%] z-20 ">
                      {/* <div className='h-6 w-6 rotate-45 bg-richblack-50 absolute left-[65%] top-0 translate-x-[85%] translate-y-[-25%] '>
                                                    </div> */}
                      {loading ? (
                        <p className="text-center">Loading...</p>
                      ) : subLinks.length ? (
                        <>
                          {subLinks
                            ?.filter((subLink) => subLink?.courses?.length > 0)
                            ?.map((sublink, index) => (
                              <Link
                                to={
                                  "catalog/" + sublink.name.split(" ").join("-")
                                }
                                key={index}
                              >
                                <div className="hover:bg-richblack-50 py-2  px-3 rounded-md">
                                  <p>{sublink.name}</p>
                                </div>
                              </Link>
                            ))}
                        </>
                      ) : (
                        <p className="text-center">No Courses Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link?.path}
                    className={`${
                      matchRoute(link?.path)
                        ? "text-yellow-200"
                        : "text-richblack-100"
                    } hover:text-yellow-200 `}
                  >
                    {link.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* login/signup/dashboard/ cart*/}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null && (
            <div className="flex gap-x-4 items-center">
              <Link to="/login">
                <button className="border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100 rounded-lg   ">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100 rounded-lg">
                  Sign up
                </button>
              </Link>
            </div>
          )}
          {
            // token?console.log("yes"):console.log("no")
            token && <ProfilrDropDown />
          }
        </div>

        {/* mobile responsive nav */}
      </div>
    </div>
  );
}
export default Navbar;
