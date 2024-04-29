import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import IconButton from '../../../common/IconButton';
import { deleteMessage } from '../../../../services/operations/authAPI';

export const SingleMessage = () => {
    const { token } = useSelector(state => state.auth);
    const location = useLocation();
    const message = location.state;
    const handleDelete = async() => {
            try {
                const res = await deleteMessage(token, message._id);
                if(res.success)window.history.back();
            } catch (error) {
                console.log("DELETE MESSAGE API ERROR")
            } 
        
    }
    return (
        <div className='h-[calc(100vh - 3rem)] text-richblack-200 w-full  '>
            {/* Display the message data */}
            <div className='w-full  lg:w-[800px] flex flex-col gap-5 p-10 bg-richblack-700 rounded-lg border-2 border-richblack-500'>
                <div className='flex flex-col gap-1 text-lg '>
                    <span>From: {message.firstName}</span>
                    <span>Email: {message.email}</span>
                    <span>Phone No: {`+${message.countryCode} ${message.phoneNo}`}</span>
                </div>
                <p className='w-full'>{message.message}
                  </p>

                <div className='flex gap-10'>
                    <button
                    className='border border-richblack-500 text-richblack-100 bg-richblack-800 px-4 py-2 rounded-md font-semibold hover:bg-richblack-900 transition-all duration-300 hover:text-richblack-200'
                    onClick={()=>window.history.back()}
                    >
                    Cancel
                    </button>
                    
                    <IconButton 
                    text="solve || delete"
                    onClick={handleDelete}
                    />
                </div>

            </div>

            {/* Button to delete the message */}
            {/* <button onClick={handleDelete}>Delete</button> */}
        </div>
    );
};

export default SingleMessage;
