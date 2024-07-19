import React from 'react'
import { Link } from 'react-router-dom'
function Hero() {
    return (
        <div className='h-[82vh] flex '>
            <div className='w-3/6 flex flex-col items-center justify-center'>
                <h1 className='text-6xl font-semibold text-yellow-100' >Discover Your Next Great Read</h1>
                <p className='mt-4 text-xl text-zinc-300'>Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books</p>
                <div className='mt-8'>
                    <Link to='/allbooks' className='text-yellow-100 text-2xl font-semibold border border-yellow-100 px-10 py-3 hover:bg-zinc-800 rounded-full' >Discover Books</Link>
                </div>
            </div>
            <div className='w-3/6'>
                <img className='w-full items-center justify-center h-auto lg:h-[100%]' src='./image.png' alt="" />

            </div>
        </div >
    )
}

export default Hero