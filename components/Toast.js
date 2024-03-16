import React, { useEffect } from 'react';
import { HiOutlineXCircle } from 'react-icons/hi';

function Toast({ msg = '', closeToast }) {
    useEffect(() => {
        const timeout = setTimeout(() => {
            closeToast();
        }, 3000); // Adjust the duration (in milliseconds) as needed
        return () => clearTimeout(timeout);
    }, [closeToast]);

    return (
        <div className='z-50 fixed top-10 right-10 duration-500 transition-all ease-in-out bg-[#36d399] justify-between flex items-center p-4 rounded-md'>
            <h2>{msg}</h2>
            <button className='' onClick={closeToast}>
                <HiOutlineXCircle className='text-[22px] ml-5 text-white' />
            </button>
        </div>
    );
}

export default Toast;
