import React from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, matchPath, useLocation } from 'react-router-dom'
import * as Icons from "react-icons/vsc";
// import { matchPath } from 'react-router-dom';

export default function SidebarLink({ link, iconName }) {
    const Icon = Icons[iconName]
    const location = useLocation();
    const dispatch = useDispatch()
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }
    return (
        <div className={` relative px-8 py-2 text-sm font-medium text-richblack-300  ${matchRoute(link.path) ? "bg-yellow-800 " : "bg-opacity-0"}`}>
            <NavLink to={link.path} >
                <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}></span>

                <div className=' flex items-center justify-start gap-x-2'>
                    <Icon className='text-lg' />
                    <span>{link.name}</span>
                </div>
            </NavLink>
        </div>
    )
}
