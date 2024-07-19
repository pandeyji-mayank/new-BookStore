import React from 'react'
import { Link, Navigate } from 'react-router-dom';
const Navbar = () => {
    const links = [
        {
            title: "Home",
            link: '/'
        },
        // {
        //     title: "About Us",
        //     link: '/aboutus'
        // },
        {
            title: "All Books",
            link: '/allbooks'
        },
        {
            title: "Cart",
            link: '/cart'
        },
        {
            title: "Profile",
            link: '/profile'
        }
    ]
    return (
        <div className='bg-zinc-900 text-white px-8 py-3 flex items-center justify-between ' >
            <div className='flex items-center'>
                <img className='h-10 me-4' src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png" alt="" />
                <h1 className='text-2xl font-semibold'>BookHeaven</h1>
            </div>
            <div className='nav-links-bookheaven flex items-center gap-4'>
                <div className='flex gap-6'>
                    {links.map((item, i) => (
                        <Link to={item.link} className='hover:text-blue-500 transition-all hover:scale-125 duration-300' key={i}>{item.title}</Link>
                    ))}
                </div>
                <div className='flex gap-6'>
                    <Link to='/login' className='px-2 py-1 border border-blue-500 rounded-md hover:bg-white hover:text-zinc-800 transition-all duration-300 '> LogIn</Link>
                    <Link to='/signup' className='px-2 py-1 bg-blue-500 border-blue-500 rounded-md hover:bg-white hover:text-zinc-800 transition-all duration-300 '>Sign Up</Link>

                </div>
            </div>
        </div>
    )
}

export default Navbar;