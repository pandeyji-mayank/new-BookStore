import React from 'react'
import Hero from '../components/Home/Hero'
import RecentlyAdded from '../components/Home/RecentlyAdded'

function Home() {
    return (
        <div className='bg-gradient-to-t from-zinc-700 to-zinc-900 text-white px-10 py-8'>
            <Hero />
            <RecentlyAdded />
        </div>
    )
}

export default Home