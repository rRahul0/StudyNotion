import React from 'react'
import { useSelector } from 'react-redux'
import {Outlet} from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';
import Loader from "../components/common/Loader"


export default function Dashboard() {
    const { loading: authLoading } = useSelector((state) => state.auth);
    const { loading: profileLoading } = useSelector((state) => state.auth);


    if (profileLoading || authLoading) {
        return (<Loader />)
    }
    return (
        <div className='flex relative '>
            <div className='hidden md:flex'><Sidebar /></div>
            {/* modal hidden */}
            <div className='h-[calc(100vh-3.5rem)]  w-full '>
                <div className=' h-full mx-auto overflow-y-auto py-10 px-[10%]'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
