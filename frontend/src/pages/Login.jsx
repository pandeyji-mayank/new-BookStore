import React from 'react'
import { Link } from 'react-router-dom'
function Login() {
    return (
        <div className=' bg-gradient-to-t from-zinc-700 to-zinc-900 px-12 py-8 flex items-center justify-center h-[89vh]'>
            <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6  '>
                <p className='text-zinc-200 text-2xl text-center font-bold '>LogIn</p>
                <div className=' mt-8'>
                    <div className=''>
                        <label htmlFor="" className='text-zinc-400'>Email</label>
                        <input
                            type="text"
                            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded-md'
                            name='email'
                            placeholder='example@example.com'
                            required
                        />
                    </div>
                    <div className='mt-8'>
                        <label htmlFor="" className='text-zinc-400'>Password</label>
                        <input
                            type="text"
                            className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none rounded-md'
                            name='password'
                            placeholder='password'
                            required
                        />
                    </div>

                    <div className='mt-8 overflow-hidden rounded-md'>
                        <button className='w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-zinc-200 hover:text-zinc-900 hover:scale-110 transition-all duration-500'>
                            Login
                        </button>
                    </div>
                    <p className='flex justify-center items-center text-zinc-200 font-semibold mt-4'> Or</p>
                    <p className='flex mt-8 items-center justify-center text-zinc-500 font-semibold'>
                        New Here? &nbsp;
                        <Link to='/signup' className='hover:text-blue-600 font-bold'><u>SignUp</u></Link>
                    </p>
                </div>

            </div>
        </div>
    )
}

export default Login