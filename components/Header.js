import React from 'react';
import Image from 'next/image';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { HiOutlineArrowLeftOnRectangle } from "react-icons/hi2";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/router';

function Header() {
    const USER_IMAGE = 'https://i.imgur.com/pJxkAUB.jpeg';
    const { data: session } = useSession();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
        router.push('/');
    };

    return (
        <div className='sticky top-0 z-50 flex justify-between p-3 border-b-[2px] border-[#ff3366] bg-blue-500 text-white border-white'>
            <a href='/' onClick={() => router.push('/')} ><h2 className='logo text-[20px] font-bold'>QONNECT</h2></a>
            <div className='flex gap-5 items-center'>
                <div
                    onClick={() => router.push('/create-post')}
                    className='px-3 py-2 bg-gray-200 text-gray-700 rounded-full cursor-pointer'
                >
                    <span className='hidden sm:block'>CREATE POST</span>
                    <HiOutlinePencilSquare className='sm:hidden' />
                </div>

                <div
                    onClick={() => !session ? signIn() : signOut()}
                    className='px-3 py-2 bg-gray-200 text-gray-700 rounded-full cursor-pointer'
                >
                    {!session ?
                        <span className='hidden sm:block'>SIGN IN</span> :
                        <span className='hidden sm:block'>SIGN OUT</span>
                    }
                    <HiOutlineArrowLeftOnRectangle className='sm:hidden' />
                </div>

                <div className='w-10 h-10'>
                    {session ?
                        <Image src={session.user.image} width={40} height={40} className='rounded-full cursor-pointer' onClick={()=>router.push('/profile')} alt='user_image' />
                        : null}
                </div>
            </div>
        </div>
    );
}

export default Header;