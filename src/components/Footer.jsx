import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <>
            <div className=" bg-black text-white flex flex-col justify-center items-center pb-2 font-[serif]">
                <h1 className=' flex justify-center items-center p-3'>All Right Reserved &copy; AaMeRaa Lifestyle</h1>

                <ul className='flex justify-center items-center'>
                    <li className='px-2 mx-1 cursor-pointer'><Link to={'/about'}>About</Link></li>
                    <li className='px-2 mx-1 border-l-2 cursor-pointer'><Link to={'/contact'}>Contact</Link></li>
                    <li className='px-2 mx-1 border-l-2 cursor-pointer'><Link to={'/privacy-policy'}>Privacy Policy</Link></li>
                </ul>
            </div>

        </>
    )
}

export default Footer