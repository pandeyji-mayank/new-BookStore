import React from 'react'

const Footer = () => {
    const d = new Date();
    return (
        <div className='bg-zinc-700 text-white px-8 py-4 text-center'>
            <h1 className=' font-semibold'>
                &copy; {d.getFullYear()}, Mayank Pandey | BookStore App
            </h1>
        </div>
    )
}

export default Footer