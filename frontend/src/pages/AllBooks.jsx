import React, { useEffect, useState } from 'react'
import BookCard from '../components/BookCard/BookCard';
import axios from 'axios';

function AllBooks() {
    const [data, setData] = useState();
    useEffect(() => {
        const fetch = async (req, res) => {
            const response = await axios.get('http://localhost:5000/api/v1/getallbooks')
            setData(response.data);
        }
        fetch();
    }, [])

    return (
        <div className='bg-gradient-to-t from-zinc-700 to-zinc-900 text-white px-12 py-8 h-auto'>
            <h4 className='text-5xl font-semibold text-yellow-100 text-center py-10'>
                All Books
            </h4>
            <div className='my-10 grid md:grid-cols-4 '>
                {data && data.map((item, i) => (
                    <div key={i}>
                        <BookCard data={item} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllBooks