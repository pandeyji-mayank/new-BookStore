import React from 'react'
import { Link } from 'react-router-dom'
import Loader from '../Loader/Loader'

function BookCard({ data }) {
    return (
        <>
            <Link to={`/viewbookdetails/${data._id}`} className='bg-zinc-800 rounded p-4 flex flex-col'>

                {!data && <div className='flex items-center justify-center my-32' ><Loader /></div>}
                <div className='bg-zinc-900 rounded flex items-center justify-center'>
                    <img src={data.url} alt="/" className='h-[25vh]' />
                </div>
                <h2 className='mt-4 text-xl text-zinc-100 text-center font-semibold'> {data.title} </h2>
                <p className='mt-2 text-zinc-400 font-semibold'>by {data.author}</p>
                <p className='mt-2 text-zinc-200 '> ₹ {data.price}</p>
            </Link>
        </>
    )
}

export default BookCard