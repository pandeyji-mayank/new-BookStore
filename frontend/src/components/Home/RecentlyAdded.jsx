import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BookCard from '../BookCard/BookCard'
function RecentlyAdded() {
    const [data, setData] = useState();
    useEffect(() => {
        const fetch = async (req, res) => {
            const response = await axios.get('http://localhost:5000/api/v1/getrecentbooks')
            setData(response.data);
        }
        fetch();
    }, [])

    return (
        <div className='mt-8 px-8'>
            <h4 className='text-3xl text-yellow-100'>
                Recently Added Books
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

export default RecentlyAdded