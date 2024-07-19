import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../Loader/Loader';
import { GrLanguage } from "react-icons/gr";

function ViewBookDetail() {
    const { id } = useParams();
    console.log(id);

    const [data, setData] = useState();
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/v1/getbookbyid/${id}`);
                setData(response.data.data);
            }
            catch (error) {
                console.error(error);
            }
        }
        fetch();
    }, [])



    return (
        <>
            {!data && <div className='bg-gradient-to-t from-zinc-700 to-zinc-900 text-white h-screen flex items-center justify-center'> <Loader /></div>}
            {data && (<div className='px-12 py-8 bg-gradient-to-t from-zinc-700 to-zinc-900 text-white flex gap-8'>
                <div className='bg-zinc-800 rounded p-4 h-[85vh] w-3/6 flex items-center justify-center '>
                    <img src={data.url} alt="" className='h-[70vh]' />
                </div>
                <div className='p-4 w-3/6'>
                    <h1 className='text-xl text-zinc-300 font-semibold' > {data.title} </h1>
                    <p className='text-zinc-300 mt-1'> by {data.author} </p>
                    <p className='text-zinc-400 mt-4 text-xl'>{data.desc}</p>
                    <p className="flex mt-4 items-center justify-start text-zinc-400">
                        <GrLanguage className='me-3' /> {data.language}
                    </p>
                    <p className='mt-4 text-zinc-100 text-3xl font-semibold'>Price : ₹ {data.price}{" "} </p>
                </div>
            </div >)
            }
        </>
    )
}

export default ViewBookDetail